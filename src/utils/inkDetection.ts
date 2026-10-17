/**
 * Real Ink Density, Multi-Surface Stroke / Contour Detection & Computer Vision Module
 * Hỗ trợ nhận diện chữ viết trên BẤT KỲ MẶT PHẲNG NÀO: Giấy kẻ ô ly, bảng đen con, mặt bàn phẳng, bìa tập...
 * 
 * TIỀN KIỂM TRA PHÁT HIỆN NÉT CHỮ (PRE-VALIDATION STROKE & CONTOUR DETECTION):
 * 1. extractHandwritingStrokes(roiImage):
 *    - Sử dụng thuật toán Sobel Gradient kết hợp Adaptive Thresholding đa bề mặt.
 *    - Nhận diện phân cực: Nét tối trên nền sáng (giấy, bàn gỗ) HOẶC Nét sáng trên nền tối (bảng đen, bảng con).
 *    - Trích xuất các Contours và phân tích hình học nét: Chiều dài, độ cong, tính liên tục, loại bỏ nhiễu hạt và viền kẻ.
 *    - Nếu camera chỉ quay lên trần nhà, bóng đèn sáng lóa, hoặc mặt phẳng còn trống chưa viết chữ:
 *      => hasStrokes = false, totalLength < MIN_STROKE_LENGTH.
 *      => Lập tức dừng lượt chấm điểm, KHÔNG mở popup điểm ảo, phát tiếng bíp cảnh báo Web Audio API.
 * 
 * 2. evaluateAgainstTemplate / evaluateHandwriting:
 *    - Căn chỉnh trọng tâm Bounding Box & Scale bù trừ camera.
 *    - Chamfer Distance Transform (bán kính r = 25px - 35px).
 *    - Rút trích Centerline Skeleton (không phụ thuộc ngòi bút 0.38mm hay ngòi to).
 *    - Xóa bỏ triệt để mọi logic gán điểm mặc định ảo (65/100, 97%).
 *    - Nếu viết sai hoàn toàn mẫu chữ: Điểm < 40 điểm, thông báo rõ nét viết chưa đúng mẫu.
 */

import { StrokePath } from '../types';
import { getStrokesForCharacter } from '../data/strokeData';

// Chiều dài nét chữ tối thiểu bắt buộc trên khung chuẩn 360x360 (pixels)
export const MIN_STROKE_LENGTH = 55;

export const NO_STROKES_DETECTED_MESSAGE = 
  "⚠️ Chưa phát hiện nét chữ trên mặt phẳng! Vui lòng viết chữ theo mẫu rồi bấm Chấm điểm lại nhé.";

export const NO_INK_WARNING_MESSAGE = NO_STROKES_DETECTED_MESSAGE;

export interface DetectedContourStroke {
  id: number;
  points: Array<{ x: number; y: number }>;
  length: number;
  area: number;
  width: number;
  height: number;
  aspectRatio: number;
  isStraightGridLine: boolean;
}

export interface HandwritingStrokeDetectionResult {
  hasStrokes: boolean;
  strokes: DetectedContourStroke[];
  totalLength: number;
  totalArea: number;
  surfaceType: 'paper_white' | 'chalkboard_dark' | 'wood_desk' | 'generic_flat';
  polarity: 'dark_on_light' | 'light_on_dark';
  meanLuminance: number;
  stdDev: number;
  message?: string;
  canvasElement?: HTMLCanvasElement;
  canvasDataUrl?: string;
}

export interface InkDetectionResult {
  hasInk: boolean;
  hasStrokes?: boolean;
  message?: string;
  inkRatio: number;
  meanLuminance: number;
  stdDev: number;
  edgeCount: number;
  contrastRatio: number;
  canvasDataUrl?: string;
  canvasElement?: HTMLCanvasElement;
}

export interface StrokeEvaluationResult {
  hasInk: boolean;
  hasStrokes: boolean;
  message?: string;
  finalScore: number; // 0 - 100 (alias: finalCalculatedScore)
  finalCalculatedScore: number; // 0 - 100
  baseScore?: number;
  hitCount?: number;
  totalWaypoints?: number;
  trajectoryScore: number; // 0 - 50 (Trajectory Accuracy)
  completenessScore: number; // 0 - 30 (Centerline Completeness)
  proportionScore: number; // 0 - 20 (Height & Aspect Ratio)
  penalty: number;
  precision: number;
  recall: number;
  shapeSimilarity?: number; // 0 - 100 (%) Độ tương đồng hình dáng nội dung
  isShapeMatch?: boolean;   // true nếu độ tương đồng >= 40%
  totalInkPoints: number;
  pointsInSafeZone: number;
  centerlineCoverage: number;
  userInkPixels: number;
  inTemplatePixels: number;
  outOfBoundsPixels: number;
  status: 'PASS' | 'NEEDS_IMPROVEMENT' | 'FAIL';
  grade?: string;
  warningText?: string;
  debugOverlayUrl?: string;
}

export interface ROIBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Trích xuất ảnh vùng viết (ROI) từ thẻ <video> hoặc ảnh, căn chỉnh chính xác theo khung ô ly AR trên màn hình
 */
export function captureWritingArea(
  video: HTMLVideoElement,
  roiElement?: HTMLElement | null
): HTMLCanvasElement {
  const targetSize = 360;
  const canvas = document.createElement('canvas');
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx || !video || video.videoWidth === 0 || video.videoHeight === 0) {
    return canvas;
  }

  const vWidth = video.videoWidth;
  const vHeight = video.videoHeight;
  let cropX = 0, cropY = 0, cropW = vWidth, cropH = vHeight;

  if (roiElement && typeof HTMLElement !== 'undefined' && roiElement instanceof HTMLElement) {
    const videoRect = video.getBoundingClientRect();
    const frameRect = roiElement.getBoundingClientRect();

    if (videoRect.width > 0 && videoRect.height > 0) {
      const videoAspect = vWidth / vHeight;
      const containerAspect = videoRect.width / videoRect.height;
      let scale = 1, offsetX = 0, offsetY = 0;

      if (videoAspect > containerAspect) {
        const renderedWidth = videoRect.height * videoAspect;
        offsetX = (renderedWidth - videoRect.width) / 2;
        scale = vHeight / videoRect.height;
      } else {
        const renderedHeight = videoRect.width / videoAspect;
        offsetY = (renderedHeight - videoRect.height) / 2;
        scale = vWidth / videoRect.width;
      }

      const relX = frameRect.left - videoRect.left;
      const relY = frameRect.top - videoRect.top;

      cropX = Math.max(0, Math.floor((relX + offsetX) * scale));
      cropY = Math.max(0, Math.floor((relY + offsetY) * scale));
      cropW = Math.min(vWidth - cropX, Math.floor(frameRect.width * scale));
      cropH = Math.min(vHeight - cropY, Math.floor(frameRect.height * scale));
    }
  }

  // Fallback khung vuông trung tâm 60%
  if (cropW <= 20 || cropH <= 20) {
    const size = Math.min(vWidth, vHeight) * 0.60;
    cropX = Math.floor((vWidth - size) / 2);
    cropY = Math.floor((vHeight - size) / 2);
    cropW = Math.floor(size);
    cropH = Math.floor(size);
  }

  ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, targetSize, targetSize);
  return canvas;
}

/**
 * THUẬT TOÁN TIỀN KIỂM TRA PHÁT HIỆN NÉT CHỮ TRÊN MẶT PHẲNG (extractHandwritingStrokes)
 * 
 * Kiểm tra xem có nét chữ thật được viết trên mặt phẳng (giấy, bảng, bàn...) hay không.
 * Tách biệt hoàn toàn với trần nhà, bóng đèn, hoặc mặt phẳng trống trơn.
 */
export function extractHandwritingStrokes(
  roiInput: HTMLCanvasElement | HTMLVideoElement | ImageData,
  options?: {
    minStrokeLength?: number;
    toleranceThreshold?: number;
  }
): HandwritingStrokeDetectionResult {
  const minLength = options?.minStrokeLength || MIN_STROKE_LENGTH;

  // Chuẩn hóa lấy đối tượng ImageData từ Canvas hoặc Video
  let imageData: ImageData;
  let canvasElem: HTMLCanvasElement | undefined = undefined;

  if (typeof HTMLCanvasElement !== 'undefined' && roiInput instanceof HTMLCanvasElement) {
    canvasElem = roiInput;
    const ctx = roiInput.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      return {
        hasStrokes: false,
        strokes: [],
        totalLength: 0,
        totalArea: 0,
        surfaceType: 'paper_white',
        polarity: 'dark_on_light',
        meanLuminance: 0,
        stdDev: 0,
        message: NO_STROKES_DETECTED_MESSAGE,
      };
    }
    imageData = ctx.getImageData(0, 0, roiInput.width, roiInput.height);
  } else if (typeof HTMLVideoElement !== 'undefined' && roiInput instanceof HTMLVideoElement) {
    canvasElem = captureWritingArea(roiInput);
    const ctx = canvasElem.getContext('2d', { willReadFrequently: true });
    imageData = ctx!.getImageData(0, 0, canvasElem.width, canvasElem.height);
  } else if (roiInput && 'data' in roiInput) {
    imageData = roiInput as ImageData;
  } else {
    return {
      hasStrokes: false,
      strokes: [],
      totalLength: 0,
      totalArea: 0,
      surfaceType: 'paper_white',
      polarity: 'dark_on_light',
      meanLuminance: 0,
      stdDev: 0,
      message: NO_STROKES_DETECTED_MESSAGE,
    };
  }

  const { width, height, data } = imageData;
  const totalPixels = width * height;

  if (totalPixels === 0) {
    return {
      hasStrokes: false,
      strokes: [],
      totalLength: 0,
      totalArea: 0,
      surfaceType: 'paper_white',
      polarity: 'dark_on_light',
      meanLuminance: 0,
      stdDev: 0,
      message: NO_STROKES_DETECTED_MESSAGE,
    };
  }

  // 1. Chuyển ảnh sang mức xám và tính độ sáng trung bình (Mean Luminance)
  const grays = new Float32Array(totalPixels);
  let sumLum = 0;

  for (let i = 0; i < totalPixels; i++) {
    const idx = i * 4;
    const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
    grays[i] = lum;
    sumLum += lum;
  }
  const meanLuminance = sumLum / totalPixels;

  // 2. Tính độ lệch chuẩn màu (Standard Deviation)
  let sumSq = 0;
  for (let i = 0; i < totalPixels; i++) {
    const d = grays[i] - meanLuminance;
    sumSq += d * d;
  }
  const stdDev = Math.sqrt(sumSq / totalPixels);

  // CHẶN NGAY CÁC TRƯỜNG HỢP CAMERA KHÔNG QUAY VÀO MẶT PHẲNG VIẾT BÀI:
  // a) Quay vào trần nhà hoặc bóng đèn sáng lóa (Mean cực cao, StdDev thấp/vừa)
  if (meanLuminance > 240 && stdDev < 20) {
    return {
      hasStrokes: false,
      strokes: [],
      totalLength: 0,
      totalArea: 0,
      surfaceType: 'generic_flat',
      polarity: 'dark_on_light',
      meanLuminance,
      stdDev,
      message: NO_STROKES_DETECTED_MESSAGE,
    };
  }

  // b) Bề mặt đồng nhất không có nét tương phản (Tường trắng trống trơn, mặt giấy chưa viết)
  if (stdDev < 9.0) {
    return {
      hasStrokes: false,
      strokes: [],
      totalLength: 0,
      totalArea: 0,
      surfaceType: 'generic_flat',
      polarity: 'dark_on_light',
      meanLuminance,
      stdDev,
      message: NO_STROKES_DETECTED_MESSAGE,
    };
  }

  // c) Camera bị che kín hoặc quá tối (< 22)
  if (meanLuminance < 22 && stdDev < 10) {
    return {
      hasStrokes: false,
      strokes: [],
      totalLength: 0,
      totalArea: 0,
      surfaceType: 'generic_flat',
      polarity: 'light_on_dark',
      meanLuminance,
      stdDev,
      message: NO_STROKES_DETECTED_MESSAGE,
    };
  }

  // 3. Nhận diện loại mặt phẳng & Phân cực nét vẽ (Dark-on-Light vs Light-on-Dark)
  // Xây dựng histogram độ sáng
  const hist = new Int32Array(256);
  for (let i = 0; i < totalPixels; i++) {
    hist[Math.min(255, Math.max(0, Math.floor(grays[i])))]++;
  }

  let surfaceType: 'paper_white' | 'chalkboard_dark' | 'wood_desk' | 'generic_flat' = 'paper_white';
  let polarity: 'dark_on_light' | 'light_on_dark' = 'dark_on_light';
  let surfaceBg = 200;

  if (meanLuminance < 95) {
    // Bảng đen, bảng con màu xanh/đen, mặt bàn tối: Phấn trắng / nét sáng trên nền tối
    surfaceType = 'chalkboard_dark';
    polarity = 'light_on_dark';

    let acc = 0;
    const targetDarkBg = Math.floor(totalPixels * 0.20);
    for (let b = 0; b < 256; b++) {
      acc += hist[b];
      if (acc >= targetDarkBg) {
        surfaceBg = b;
        break;
      }
    }
  } else {
    // Giấy trắng, tập ô ly, bảng trắng, bàn gỗ: Mực tối trên nền sáng
    surfaceType = meanLuminance > 185 ? 'paper_white' : 'wood_desk';
    polarity = 'dark_on_light';

    let acc = 0;
    const targetLightBg = Math.floor(totalPixels * 0.85);
    for (let b = 0; b < 256; b++) {
      acc += hist[b];
      if (acc >= targetLightBg) {
        surfaceBg = b;
        break;
      }
    }
  }

  // 4. Thuật toán phân tách biên Sobel kết hợp Adaptive Thresholding
  const binaryMask = new Uint8Array(totalPixels);
  const strokeContrastThreshold = 26;

  for (let y = 1; y < height - 1; y++) {
    const row = y * width;
    for (let x = 1; x < width - 1; x++) {
      const idx = row + x;
      const val = grays[idx];

      // Kiểm tra độ tương phản tương đối so với nền mặt phẳng
      let isContrastMatch = false;
      if (polarity === 'dark_on_light') {
        isContrastMatch = val <= (surfaceBg - strokeContrastThreshold);
      } else {
        isContrastMatch = val >= (surfaceBg + strokeContrastThreshold);
      }

      if (!isContrastMatch) continue;

      // Tính Sobel Gradient Magnitude 3x3
      // [-1 0 1]
      // [-2 0 2]
      // [-1 0 1]
      const gx = (
        grays[idx - width + 1] + 2 * grays[idx + 1] + grays[idx + width + 1]
      ) - (
        grays[idx - width - 1] + 2 * grays[idx - 1] + grays[idx + width - 1]
      );

      // [-1 -2 -1]
      // [ 0  0  0]
      // [ 1  2  1]
      const gy = (
        grays[idx + width - 1] + 2 * grays[idx + width] + grays[idx + width + 1]
      ) - (
        grays[idx - width - 1] + 2 * grays[idx - width] + grays[idx - width + 1]
      );

      const grad = Math.abs(gx) + Math.abs(gy);

      // Nét bút/phấn thật có biên cạnh sắc nét (grad >= 28)
      if (grad >= 28) {
        binaryMask[idx] = 1;
      }
    }
  }

  // 5. Trích xuất đường bao (Contours) qua thuật toán Connected Component Labeling (8-hướng)
  const visited = new Uint8Array(totalPixels);
  const detectedContours: DetectedContourStroke[] = [];
  let contourIdCounter = 1;

  for (let y = 1; y < height - 1; y++) {
    const row = y * width;
    for (let x = 1; x < width - 1; x++) {
      const startIdx = row + x;
      if (binaryMask[startIdx] === 0 || visited[startIdx] === 1) continue;

      // Bắt đầu duyệt BFS thành phần liên thông
      const queue: number[] = [startIdx];
      visited[startIdx] = 1;

      let minX = x, maxX = x, minY = y, maxY = y;
      const strokePoints: Array<{ x: number; y: number }> = [];

      let head = 0;
      while (head < queue.length) {
        const currIdx = queue[head++];
        const cy = Math.floor(currIdx / width);
        const cx = currIdx % width;

        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;

        strokePoints.push({ x: cx, y: cy });

        // 8 hướng lân cận
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const ny = cy + dy;
            const nx = cx + dx;
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
              const nIdx = ny * width + nx;
              if (binaryMask[nIdx] === 1 && visited[nIdx] === 0) {
                visited[nIdx] = 1;
                queue.push(nIdx);
              }
            }
          }
        }
      }

      const compWidth = maxX - minX + 1;
      const compHeight = maxY - minY + 1;
      const compArea = strokePoints.length;

      // Ước lượng chiều dài nét đường cong:
      // Kết hợp đường chéo bounding box và độ dài nét bút
      const diagonal = Math.sqrt(compWidth * compWidth + compHeight * compHeight);
      const estimatedLength = Math.max(diagonal, Math.round(compArea / 2.2));

      // LOẠI BỎ NHIỄU:
      // a) Hạt bụi, chấm mực li ti (diện tích < 15 hoặc dài < 12px)
      if (compArea < 15 || estimatedLength < 12) continue;

      // b) Đường viền kẻ in sẵn của trang vở kéo dài gần hết màn hình (đường thẳng tắp)
      const isStraightGridLine = (
        (compWidth > width * 0.90 && compHeight <= 3) ||
        (compHeight > height * 0.90 && compWidth <= 3)
      );
      if (isStraightGridLine) continue;

      const aspectRatio = compHeight / Math.max(1, compWidth);

      detectedContours.push({
        id: contourIdCounter++,
        points: strokePoints,
        length: estimatedLength,
        area: compArea,
        width: compWidth,
        height: compHeight,
        aspectRatio,
        isStraightGridLine: false,
      });
    }
  }

  // 6. Tính tổng độ dài nét vẽ và diện tích phát hiện
  const totalLength = detectedContours.reduce((sum, s) => sum + s.length, 0);
  const totalArea = detectedContours.reduce((sum, s) => sum + s.area, 0);

  // TIÊU CHÍ XÁC NHẬN CÓ NÉT CHỮ THỰC TẾ TRÊN MẶT PHẲNG:
  // - Có ít nhất 1 nét viết nổi bật dài >= 28px
  // - Tổng chiều dài các nét >= MIN_STROKE_LENGTH (55px)
  // - Tổng diện tích nét viết >= 45 pixels
  const hasProminentStroke = detectedContours.some(s => s.length >= 28);
  const hasStrokes = (
    detectedContours.length > 0 &&
    totalLength >= minLength &&
    totalArea >= 45 &&
    hasProminentStroke
  );

  return {
    hasStrokes,
    strokes: hasStrokes ? detectedContours : [],
    totalLength,
    totalArea,
    surfaceType,
    polarity,
    meanLuminance,
    stdDev,
    message: hasStrokes ? undefined : NO_STROKES_DETECTED_MESSAGE,
    canvasElement: canvasElem,
    canvasDataUrl: canvasElem ? canvasElem.toDataURL('image/jpeg', 0.88) : undefined,
  };
}

/**
 * Hàm phân tích tương thích ngược phát hiện mực từ video
 */
export function detectInkFromVideo(
  video: HTMLVideoElement,
  roi?: ROIBox | HTMLElement | null
): InkDetectionResult {
  const roiCanvas = captureWritingArea(video, roi as HTMLElement);
  const strokeCheck = extractHandwritingStrokes(roiCanvas);

  return {
    hasInk: strokeCheck.hasStrokes,
    hasStrokes: strokeCheck.hasStrokes,
    message: strokeCheck.hasStrokes ? undefined : NO_STROKES_DETECTED_MESSAGE,
    inkRatio: strokeCheck.totalArea / (roiCanvas.width * roiCanvas.height),
    meanLuminance: strokeCheck.meanLuminance,
    stdDev: strokeCheck.stdDev,
    edgeCount: strokeCheck.totalLength,
    contrastRatio: strokeCheck.stdDev / 100,
    canvasElement: roiCanvas,
    canvasDataUrl: roiCanvas.toDataURL('image/jpeg', 0.88),
  };
}

/**
 * Trích xuất nét chữ từ nguồn ảnh chuỗi base64 hoặc URL
 */
export async function detectInkFromImage(
  imageSrc: string
): Promise<InkDetectionResult> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const targetSize = 360;
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve({
          hasInk: false,
          hasStrokes: false,
          message: NO_STROKES_DETECTED_MESSAGE,
          inkRatio: 0,
          meanLuminance: 0,
          stdDev: 0,
          edgeCount: 0,
          contrastRatio: 0,
        });
        return;
      }

      ctx.drawImage(img, 0, 0, targetSize, targetSize);
      const strokeCheck = extractHandwritingStrokes(canvas);

      resolve({
        hasInk: strokeCheck.hasStrokes,
        hasStrokes: strokeCheck.hasStrokes,
        message: strokeCheck.hasStrokes ? undefined : NO_STROKES_DETECTED_MESSAGE,
        inkRatio: strokeCheck.totalArea / (targetSize * targetSize),
        meanLuminance: strokeCheck.meanLuminance,
        stdDev: strokeCheck.stdDev,
        edgeCount: strokeCheck.totalLength,
        contrastRatio: strokeCheck.stdDev / 100,
        canvasElement: canvas,
        canvasDataUrl: canvas.toDataURL('image/jpeg', 0.88),
      });
    };
    img.onerror = () => {
      resolve({
        hasInk: false,
        hasStrokes: false,
        message: NO_STROKES_DETECTED_MESSAGE,
        inkRatio: 0,
        meanLuminance: 0,
        stdDev: 0,
        edgeCount: 0,
        contrastRatio: 0,
      });
    };
    img.src = imageSrc;
  });
}

/**
 * Trích xuất danh sách các điểm trục xương sống (Centerline Points) của chữ mẫu
 */
function extractTemplateCenterlinePoints(
  characterTemplate: string | StrokePath[],
  width: number,
  height: number
): Array<{ x: number; y: number; strokeId?: number }> {
  let strokes: StrokePath[] = [];
  let textLabel = '';

  if (Array.isArray(characterTemplate)) {
    strokes = characterTemplate;
  } else if (typeof characterTemplate === 'string') {
    textLabel = characterTemplate;
    strokes = getStrokesForCharacter(characterTemplate);
  }

  const points: Array<{ x: number; y: number; strokeId?: number }> = [];

  // Lấy mẫu đều dọc theo vector SVG bằng getPointAtLength
  if (strokes && strokes.length > 0 && typeof document !== 'undefined') {
    try {
      const scaleX = width / 100;
      const scaleY = height / 100;

      for (const stroke of strokes) {
        if (!stroke.d) continue;
        const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        svgPath.setAttribute('d', stroke.d);
        const totalLen = svgPath.getTotalLength ? svgPath.getTotalLength() : 100;
        
        const sampleStep = 2.0;
        const steps = Math.max(15, Math.ceil(totalLen / sampleStep));

        for (let i = 0; i <= steps; i++) {
          const l = (i / steps) * totalLen;
          const pt = svgPath.getPointAtLength(l);
          points.push({
            x: pt.x * scaleX,
            y: pt.y * scaleY,
            strokeId: stroke.id,
          });
        }
      }
    } catch {
      // ignore
    }
  }

  // Fallback: Vẽ text font lên canvas nếu không có SVG path
  if (points.length === 0) {
    const skelCanvas = document.createElement('canvas');
    skelCanvas.width = width;
    skelCanvas.height = height;
    const sCtx = skelCanvas.getContext('2d', { willReadFrequently: true });

    if (sCtx) {
      sCtx.clearRect(0, 0, width, height);
      sCtx.strokeStyle = '#FFFFFF';
      sCtx.lineWidth = 4;
      sCtx.lineCap = 'round';
      sCtx.lineJoin = 'round';

      const fontSize = Math.round(height * 0.65);
      sCtx.font = `bold ${fontSize}px 'Be Vietnam Pro', cursive, sans-serif`;
      sCtx.textAlign = 'center';
      sCtx.textBaseline = 'middle';
      sCtx.strokeText(textLabel || 'a', width / 2, height / 2);

      const sImg = sCtx.getImageData(0, 0, width, height);
      const sData = sImg.data;

      for (let y = 0; y < height; y += 3) {
        for (let x = 0; x < width; x += 3) {
          const idx = (y * width + x) * 4;
          if (sData[idx + 3] > 60) {
            points.push({ x, y });
          }
        }
      }
    }
  }

  return points;
}

/**
 * Lấy mẫu đều chữ mẫu thành đúng 100 điểm mốc (Waypoints) trải dài từ điểm đầu đến điểm cuối,
 * bảo toàn chỉ số strokeId của từng nét thành phần để phân tích độ hoàn thiện cấu trúc.
 */
export function sampleTemplateTo100Waypoints(
  rawPoints: Array<{ x: number; y: number; strokeId?: number }>,
  targetCount: number = 100
): Array<{ x: number; y: number; index: number; strokeId: number }> {
  if (!rawPoints || rawPoints.length === 0) return [];
  if (rawPoints.length === 1) {
    return Array.from({ length: targetCount }, (_, i) => ({
      x: rawPoints[0].x,
      y: rawPoints[0].y,
      index: i,
      strokeId: rawPoints[0].strokeId || 1,
    }));
  }

  // Phân nhóm theo strokeId để chia đều điểm theo từng nét, tránh sinh nét nối ảo giữa 2 nét riêng biệt
  const strokesMap = new Map<number, Array<{ x: number; y: number; strokeId?: number }>>();
  for (const pt of rawPoints) {
    const sId = pt.strokeId || 1;
    let list = strokesMap.get(sId);
    if (!list) {
      list = [];
      strokesMap.set(sId, list);
    }
    list.push(pt);
  }

  const distinctStrokes = Array.from(strokesMap.entries());

  if (distinctStrokes.length <= 1) {
    // Trường hợp 1 nét đơn
    const cumDist: number[] = [0];
    let totalLength = 0;
    for (let i = 1; i < rawPoints.length; i++) {
      const dist = Math.hypot(rawPoints[i].x - rawPoints[i - 1].x, rawPoints[i].y - rawPoints[i - 1].y);
      totalLength += dist;
      cumDist.push(totalLength);
    }

    if (totalLength < 1e-4) {
      return Array.from({ length: targetCount }, (_, i) => ({
        x: rawPoints[0].x,
        y: rawPoints[0].y,
        index: i,
        strokeId: rawPoints[0].strokeId || 1,
      }));
    }

    const waypoints: Array<{ x: number; y: number; index: number; strokeId: number }> = [];
    let segIdx = 0;

    for (let i = 0; i < targetCount; i++) {
      const targetDist = (i / (targetCount - 1)) * totalLength;
      while (segIdx < cumDist.length - 2 && cumDist[segIdx + 1] < targetDist) {
        segIdx++;
      }
      const segStartDist = cumDist[segIdx];
      const segEndDist = cumDist[segIdx + 1];
      const segLen = Math.max(1e-5, segEndDist - segStartDist);
      const t = Math.max(0, Math.min(1, (targetDist - segStartDist) / segLen));
      const pA = rawPoints[segIdx];
      const pB = rawPoints[segIdx + 1];

      waypoints.push({
        x: pA.x + t * (pB.x - pA.x),
        y: pA.y + t * (pB.y - pA.y),
        index: i,
        strokeId: pA.strokeId || 1,
      });
    }

    return waypoints;
  }

  // Trường hợp nhiều nét: phân bổ 100 điểm mốc theo tỷ lệ độ dài từng nét
  const strokeLengths: number[] = [];
  let totalAllStrokesLength = 0;

  for (const [, pts] of distinctStrokes) {
    let sLen = 0;
    for (let i = 1; i < pts.length; i++) {
      sLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    }
    sLen = Math.max(5, sLen);
    strokeLengths.push(sLen);
    totalAllStrokesLength += sLen;
  }

  const allWaypoints: Array<{ x: number; y: number; index: number; strokeId: number }> = [];
  let currentGlobalIdx = 0;

  for (let s = 0; s < distinctStrokes.length; s++) {
    const [sId, pts] = distinctStrokes[s];
    const sLen = strokeLengths[s];
    // Phân bổ số waypoint tối thiểu 15 điểm cho mỗi nét để nhận dạng nét nhỏ (dấu trăng, nét gạch ngang...)
    const countForStroke = s === distinctStrokes.length - 1
      ? Math.max(15, targetCount - allWaypoints.length)
      : Math.max(15, Math.round((sLen / totalAllStrokesLength) * targetCount));

    const cumDist: number[] = [0];
    let strokeAccum = 0;
    for (let i = 1; i < pts.length; i++) {
      strokeAccum += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      cumDist.push(strokeAccum);
    }

    let segIdx = 0;
    for (let i = 0; i < countForStroke; i++) {
      const targetDist = countForStroke > 1 ? (i / (countForStroke - 1)) * strokeAccum : 0;
      while (segIdx < cumDist.length - 2 && cumDist[segIdx + 1] < targetDist) {
        segIdx++;
      }
      const segStartDist = cumDist[segIdx];
      const segEndDist = cumDist[segIdx + 1] || (segStartDist + 1);
      const segLen = Math.max(1e-5, segEndDist - segStartDist);
      const t = Math.max(0, Math.min(1, (targetDist - segStartDist) / segLen));
      const pA = pts[segIdx] || pts[0];
      const pB = pts[segIdx + 1] || pA;

      allWaypoints.push({
        x: pA.x + t * (pB.x - pA.x),
        y: pA.y + t * (pB.y - pA.y),
        index: currentGlobalIdx++,
        strokeId: sId,
      });
    }
  }

  return allWaypoints.slice(0, targetCount);
}

/**
 * THUẬT TOÁN ĐỐI SOÁT ĐỘ TƯƠNG ĐỒNG HÌNH DÁNG NỘI DUNG (Shape & Character Similarity Check)
 * Phục vụ loại bỏ triệt để điểm ảo 70/100 khi người dùng viết sai chữ hoặc sai cấu trúc nét:
 * 
 * 1. Ma trận chiếm dụng không gian nhị phân (Binary Spatial Occupancy Grid 28x28):
 *    - Tính chỉ số tương đồng đường bao IoU = (Intersection / Union).
 * 2. Khoảng cách Chamfer Distance 2 chiều (Bidirectional Chamfer Distance):
 *    - Đo trung bình khoảng cách hình học từ nét mực người dùng đến mẫu và ngược lại.
 * 3. Kiểm tra độ hoàn thiện từng nét cấu trúc (Per-Stroke Integrity Check):
 *    - Đối với chữ nhiều nét (ví dụ: 'a' gồm nét cong kín + nét móc ngược; 'p' gồm nét sổ + nét móc):
 *      Nếu người dùng chỉ vẽ 1 hình tròn 'o' thay cho chữ 'a', nét móc ngược có độ phủ = 0%.
 *      Khi đó, cấu trúc nét chữ bị khiếm khuyết nghiêm trọng!
 * 4. Ngưỡng chặn bắt buộc:
 *    - Nếu Độ tương đồng hình dáng < 40%:
 *      => Điểm tổng tối đa BẮT BUỘC <= 28 - 32 điểm (Đánh rớt / FAIL).
 *      => TUYỆT ĐỐI KHÔNG ĐƯỢC CHO 70 ĐIỂM!
 *      => Nhận xét rõ: "Phát hiện viết sai chữ cái hoặc sai cấu trúc nét nghiêm trọng so với chữ mẫu".
 */
export function computeShapeAndCharacterSimilarity(
  alignedUserPoints: Array<{ x: number; y: number }>,
  waypoints100: Array<{ x: number; y: number; index: number; strokeId?: number }>,
  width: number,
  height: number,
  toleranceR: number
): {
  similarity: number;          // 0 - 100 (%)
  iou: number;                 // 0.0 - 1.0
  chamferSim: number;          // 0.0 - 1.0
  minStrokeCoverage: number;   // 0.0 - 1.0
  strokeCoverages: number[];
  isMatch: boolean;            // true if similarity >= 40%
  failureReason?: string;
} {
  if (!alignedUserPoints || alignedUserPoints.length === 0 || !waypoints100 || waypoints100.length === 0) {
    return {
      similarity: 0,
      iou: 0,
      chamferSim: 0,
      minStrokeCoverage: 0,
      strokeCoverages: [],
      isMatch: false,
      failureReason: "Không có nét vẽ để so khớp hình dáng",
    };
  }

  // 1. Phân nhóm Waypoints theo từng Stroke và tính độ phủ (Coverage) riêng từng nét
  const strokeMap = new Map<number, Array<{ x: number; y: number }>>();
  for (const wp of waypoints100) {
    const sId = wp.strokeId || 1;
    let arr = strokeMap.get(sId);
    if (!arr) {
      arr = [];
      strokeMap.set(sId, arr);
    }
    arr.push(wp);
  }

  const strokeCoverages: number[] = [];
  const rSq = toleranceR * toleranceR;

  strokeMap.forEach((pts) => {
    let hitCount = 0;
    for (const wp of pts) {
      let isHit = false;
      for (let i = 0; i < alignedUserPoints.length; i += 2) {
        const up = alignedUserPoints[i];
        const dx = wp.x - up.x;
        const dy = wp.y - up.y;
        if (dx * dx + dy * dy <= rSq) {
          isHit = true;
          break;
        }
      }
      if (isHit) hitCount++;
    }
    const cov = pts.length > 0 ? (hitCount / pts.length) : 0;
    strokeCoverages.push(cov);
  });

  const numStrokes = strokeCoverages.length;
  const minStrokeCoverage = numStrokes > 0 ? Math.min(...strokeCoverages) : 0;

  // 2. Ma trận chiếm dụng không gian nhị phân 28x28 (Binary Spatial Occupancy Grid)
  const GRID_SIZE = 28;
  const userGrid = new Uint8Array(GRID_SIZE * GRID_SIZE);
  const tmplGrid = new Uint8Array(GRID_SIZE * GRID_SIZE);

  // Điền template vào grid (kèm vùng đệm lân cận bán kính 1 cell)
  for (const wp of waypoints100) {
    const gx = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((wp.x / width) * GRID_SIZE)));
    const gy = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((wp.y / height) * GRID_SIZE)));
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
          tmplGrid[ny * GRID_SIZE + nx] = 1;
        }
      }
    }
  }

  // Điền user ink vào grid
  for (const up of alignedUserPoints) {
    const gx = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((up.x / width) * GRID_SIZE)));
    const gy = Math.max(0, Math.min(GRID_SIZE - 1, Math.floor((up.y / height) * GRID_SIZE)));
    userGrid[gy * GRID_SIZE + gx] = 1;
  }

  // Tính IoU giữa User Grid và Template Grid
  let intersectionCount = 0;
  let unionCount = 0;
  const totalCells = GRID_SIZE * GRID_SIZE;
  for (let i = 0; i < totalCells; i++) {
    const u = userGrid[i];
    const t = tmplGrid[i];
    if (u === 1 && t === 1) intersectionCount++;
    if (u === 1 || t === 1) unionCount++;
  }
  const iou = unionCount > 0 ? (intersectionCount / unionCount) : 0;

  // 3. Khoảng cách Chamfer 2 chiều (Bidirectional Chamfer Distance)
  // Lấy mẫu con tối đa 50 điểm để tính nhanh trong 0.2ms
  const userStep = Math.max(1, Math.floor(alignedUserPoints.length / 50));
  const userSamples: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < alignedUserPoints.length; i += userStep) {
    userSamples.push(alignedUserPoints[i]);
  }

  const tmplStep = Math.max(1, Math.floor(waypoints100.length / 50));
  const tmplSamples: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < waypoints100.length; i += tmplStep) {
    tmplSamples.push(waypoints100[i]);
  }

  let sumDistUserToTmpl = 0;
  for (const up of userSamples) {
    let minDist = Infinity;
    for (const tp of tmplSamples) {
      const d = Math.hypot(up.x - tp.x, up.y - tp.y);
      if (d < minDist) minDist = d;
    }
    sumDistUserToTmpl += minDist;
  }
  const avgDistUserToTmpl = userSamples.length > 0 ? (sumDistUserToTmpl / userSamples.length) : 50;

  let sumDistTmplToUser = 0;
  for (const tp of tmplSamples) {
    let minDist = Infinity;
    for (const up of userSamples) {
      const d = Math.hypot(tp.x - up.x, tp.y - up.y);
      if (d < minDist) minDist = d;
    }
    sumDistTmplToUser += minDist;
  }
  const avgDistTmplToUser = tmplSamples.length > 0 ? (sumDistTmplToUser / tmplSamples.length) : 50;

  const meanChamferDist = (avgDistUserToTmpl + avgDistTmplToUser) / 2;
  const chamferSim = Math.max(0, Math.min(1, 1 - meanChamferDist / 38));

  // 4. Tổng hợp độ tương đồng hình dáng nội dung (0 - 100%)
  // Tỷ trọng: 40% IoU ma trận không gian, 35% khoảng cách Chamfer, 25% độ bám nét cấu trúc
  const strokeScore = numStrokes > 1 ? minStrokeCoverage : (intersectionCount / Math.max(1, unionCount));
  let rawSimilarity = 0.40 * iou + 0.35 * chamferSim + 0.25 * strokeScore;
  let similarity = Math.round(rawSimilarity * 100);

  // ANTI-WRONG-CHARACTER GUARDS:
  // Trường hợp 1: Chữ nhiều nét nhưng thiếu hẳn một nét chính (ví dụ: mẫu chữ 'a' nhưng chỉ viết hình tròn 'o')
  // Nét móc ngược có minStrokeCoverage < 20% => BẮT BUỘC bóp điểm tương đồng xuống dưới 30%!
  if (numStrokes > 1 && minStrokeCoverage < 0.20) {
    similarity = Math.min(similarity, 28);
  }

  // Trường hợp 2: Viết chữ khác hẳn (ví dụ: mẫu 'a' nhưng vẽ chữ 'z', 'm' hoặc nguệch ngoạc)
  // IoU thấp (< 0.22) hoặc khoảng cách Chamfer xa (> 25px)
  if (iou < 0.22 || chamferSim < 0.30) {
    similarity = Math.min(similarity, 26);
  }

  const isMatch = similarity >= 40;
  const failureReason = isMatch 
    ? undefined 
    : "Phát hiện viết sai chữ cái hoặc sai cấu trúc nét nghiêm trọng so với chữ mẫu";

  return {
    similarity,
    iou,
    chamferSim,
    minStrokeCoverage,
    strokeCoverages,
    isMatch,
    failureReason,
  };
}

export const MIN_INK_THRESHOLD = 50; // Ngưỡng tối thiểu số pixel nét vẽ thực tế

/**
 * Trích xuất danh sách pixel nét vẽ thực tế của người dùng từ canvas
 */
export function extractUserInkPixels(canvas: HTMLCanvasElement): Array<{ x: number; y: number }> {
  if (!canvas || canvas.width === 0 || canvas.height === 0) return [];
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return [];

  const { width, height } = canvas;
  let imgData: ImageData;
  try {
    imgData = ctx.getImageData(0, 0, width, height);
  } catch {
    return [];
  }
  const data = imgData.data;
  const totalPixels = width * height;

  // Kiểm tra canvas kỹ thuật số có kênh alpha trong suốt (Digital Canvas)
  let transparentPixelCount = 0;
  for (let i = 3; i < data.length; i += 4) {
    if (data[i] < 220) {
      transparentPixelCount++;
    }
  }

  const isDigitalCanvas = transparentPixelCount > totalPixels * 0.08;
  const inkPoints: Array<{ x: number; y: number }> = [];

  if (isDigitalCanvas) {
    // Canvas vẽ điện tử: lọc các pixel có nét cọ (alpha > 40 và không phải màu trắng)
    for (let y = 0; y < height; y++) {
      const row = y * width;
      for (let x = 0; x < width; x++) {
        const idx = (row + x) * 4;
        const a = data[idx + 3];
        if (a > 40) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          // Loại trừ màu trắng nền
          if (r < 245 || g < 245 || b < 245) {
            inkPoints.push({ x, y });
          }
        }
      }
    }
    return inkPoints;
  }

  // Canvas chụp thực tế từ camera (ảnh chụp vở, mặt bàn, bảng con...)
  const strokeCheck = extractHandwritingStrokes(canvas);
  if (!strokeCheck.hasStrokes) {
    return [];
  }

  for (const stroke of strokeCheck.strokes) {
    for (const pt of stroke.points) {
      inkPoints.push(pt);
    }
  }

  return inkPoints;
}

function createZeroInkResult(detectedPixels: number = 0): StrokeEvaluationResult {
  return {
    hasInk: false,
    hasStrokes: false,
    finalScore: 0,
    finalCalculatedScore: 0,
    baseScore: 0,
    hitCount: 0,
    totalWaypoints: 100,
    trajectoryScore: 0,
    completenessScore: 0,
    proportionScore: 0,
    penalty: 0,
    precision: 0,
    recall: 0,
    shapeSimilarity: 0,
    isShapeMatch: false,
    totalInkPoints: detectedPixels,
    pointsInSafeZone: 0,
    centerlineCoverage: 0,
    userInkPixels: detectedPixels,
    inTemplatePixels: 0,
    outOfBoundsPixels: 0,
    status: 'FAIL',
    grade: "Chưa đúng mẫu! Hãy xem lại hướng đi của nét",
    message: NO_STROKES_DETECTED_MESSAGE,
    warningText: NO_STROKES_DETECTED_MESSAGE,
  };
}

/**
 * HÀM CHẤM ĐIỂM CHỮ VIẾT TAY THEO NGUYÊN LÝ "ĐO ĐỘ BAO PHỦ CHỦ ĐỘNG" (Positive Matching Logic)
 * 
 * 1. ĐIỀU KIỆN TIÊN QUYẾT: PHẢI CÓ NÉT MỰC MỚI TÍNH ĐIỂM (Zero-Ink Lock)
 *    - Đếm tổng số pixel nét vẽ thực tế (User Ink Points).
 *    - Nếu tổng pixel nét vẽ < MIN_INK_THRESHOLD: Điểm số = 0, chặn lại và thông báo:
 *      "⚠️ Chưa phát hiện nét chữ trên mặt phẳng! Vui lòng viết chữ trước khi chấm điểm."
 * 
 * 2. CÔNG THỨC CHẤM ĐIỂM: TÍNH ĐIỂM KHỚP (POSITIVE MATCHING):
 *    - Vùng đệm dung sai Tolerance Buffer bán kính R = 25px - 30px (chuẩn 28px).
 *    - Chia nét chữ mẫu thành 100 điểm mốc (Waypoints) trải đều từ điểm bắt đầu đến điểm kết thúc.
 *    - Với mỗi điểm mốc, kiểm tra xem có nét mực người dùng trong bán kính R.
 *    - Hit_Count = số điểm mốc được đồ trúng.
 *    - Base Score = (Hit_Count / 100) * 100.
 * 
 * 3. XỬ LÝ NÉT BÚT MẢNH VÀ ĐỘ LỆCH TỰ NHIÊN:
 *    - Không phạt điểm nếu nét bút mảnh hơn nét mẫu (chỉ cần có mực chạm bán kính R).
 *    - Cho phép dung sai góc nghiêng và xê dịch nhẹ (±15%).
 *    - Chỉ trừ điểm phạt khi có nét vẽ nguệch ngoạc văng hẳn ra ngoài khung ô ly cho phép.
 * 
 * 4. BẢNG PHÂN LOẠI KẾT QUẢ RÕ RÀNG:
 *    - Từ 85 - 100 điểm: "Xuất sắc! Nét chữ đúng chuẩn"
 *    - Từ 65 - 84 điểm:  "Khá tốt! Cần nắn nót thêm đường cong/độ cao"
 *    - Dưới 65 điểm:     "Chưa đúng mẫu! Hãy xem lại hướng đi của nét"
 */
export function evaluateHandwriting(
  userInkCanvas: HTMLCanvasElement,
  templatePoints: Array<{ x: number; y: number }> | string | StrokePath[],
  options?: {
    tolerancePx?: number;
    minInkThreshold?: number;
    logDebug?: boolean;
    preValidatedStrokes?: DetectedContourStroke[];
  }
): StrokeEvaluationResult {
  const minInkThreshold = options?.minInkThreshold || MIN_INK_THRESHOLD;
  const toleranceR = options?.tolerancePx || 28; // Bán kính dung sai R = 25px đến 30px

  // 1. ĐIỀU KIỆN TIÊN QUYẾT: PHẢI CÓ NÉT MỰC MỚI TÍNH ĐIỂM (Zero-Ink Lock)
  if (!userInkCanvas || userInkCanvas.width === 0 || userInkCanvas.height === 0) {
    return createZeroInkResult();
  }

  const width = userInkCanvas.width;
  const height = userInkCanvas.height;

  // Bước 1: Đếm tổng số pixel nét vẽ thực tế (User Ink Points)
  const userInkPoints = extractUserInkPixels(userInkCanvas);
  const totalInkPoints = userInkPoints.length;

  // Nếu tổng số pixel nét vẽ < MIN_INK_THRESHOLD: KHÔNG ĐƯỢC CHẤM ĐIỂM. Điểm số = 0!
  if (totalInkPoints < minInkThreshold) {
    return createZeroInkResult(totalInkPoints);
  }

  // Bước 2: Chuẩn bị 100 điểm mốc của nét chữ mẫu (Template Waypoints)
  let rawWaypoints: Array<{ x: number; y: number }> = [];

  if (Array.isArray(templatePoints) && templatePoints.length > 0 && typeof (templatePoints[0] as any).x === 'number') {
    rawWaypoints = templatePoints as Array<{ x: number; y: number }>;
  } else {
    rawWaypoints = extractTemplateCenterlinePoints(
      templatePoints as string | StrokePath[],
      width,
      height
    );
  }

  if (rawWaypoints.length === 0) {
    rawWaypoints = [
      { x: width * 0.5, y: height * 0.2 },
      { x: width * 0.5, y: height * 0.8 },
    ];
  }

  // Chia nét chữ mẫu thành 100 điểm mốc (Waypoints) trải đều từ điểm bắt đầu đến điểm kết thúc
  const waypoints100 = sampleTemplateTo100Waypoints(rawWaypoints, 100);

  // Tính Bounding Box & Trọng tâm chữ mẫu
  let tMinX = Infinity, tMaxX = -Infinity, tMinY = Infinity, tMaxY = -Infinity;
  let tSumX = 0, tSumY = 0;
  for (const pt of waypoints100) {
    if (pt.x < tMinX) tMinX = pt.x;
    if (pt.x > tMaxX) tMaxX = pt.x;
    if (pt.y < tMinY) tMinY = pt.y;
    if (pt.y > tMaxY) tMaxY = pt.y;
    tSumX += pt.x;
    tSumY += pt.y;
  }
  const tCentroidX = tSumX / 100;
  const tCentroidY = tSumY / 100;
  const tWidth = Math.max(1, tMaxX - tMinX);
  const tHeight = Math.max(1, tMaxY - tMinY);

  // Tính Bounding Box & Trọng tâm nét vẽ người dùng
  let uMinX = Infinity, uMaxX = -Infinity, uMinY = Infinity, uMaxY = -Infinity;
  let uSumX = 0, uSumY = 0;
  for (const pt of userInkPoints) {
    if (pt.x < uMinX) uMinX = pt.x;
    if (pt.x > uMaxX) uMaxX = pt.x;
    if (pt.y < uMinY) uMinY = pt.y;
    if (pt.y > uMaxY) uMaxY = pt.y;
    uSumX += pt.x;
    uSumY += pt.y;
  }
  const uCentroidX = uSumX / totalInkPoints;
  const uCentroidY = uSumY / totalInkPoints;
  const uWidth = Math.max(1, uMaxX - uMinX);
  const uHeight = Math.max(1, uMaxY - uMinY);

  // Bước 3: Cho phép dung sai góc nghiêng và độ xê dịch nhẹ (±15%)
  const maxShiftX = width * 0.15;
  const maxShiftY = height * 0.15;
  const shiftX = Math.max(-maxShiftX, Math.min(maxShiftX, tCentroidX - uCentroidX));
  const shiftY = Math.max(-maxShiftY, Math.min(maxShiftY, tCentroidY - uCentroidY));

  const scaleRatio = Math.sqrt((tWidth / uWidth) * (tHeight / uHeight));
  const normScale = Math.max(0.85, Math.min(1.15, scaleRatio));

  // Tọa độ người dùng sau khi bù trừ dung sai tự nhiên ±15%
  const alignedUserPoints: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < totalInkPoints; i++) {
    const pt = userInkPoints[i];
    alignedUserPoints.push({
      x: (uCentroidX + shiftX) + (pt.x - uCentroidX) * normScale,
      y: (uCentroidY + shiftY) + (pt.y - uCentroidY) * normScale,
    });
  }

  // Xây dựng Spatial Hash Grid cho nét mực người dùng để tăng tốc tra cứu O(1)
  const cellSize = toleranceR;
  const gridCols = Math.ceil(width / cellSize) + 4;
  const spatialGrid = new Map<number, Array<{ x: number; y: number }>>();

  for (let i = 0; i < alignedUserPoints.length; i++) {
    const pt = alignedUserPoints[i];
    const col = Math.floor(pt.x / cellSize);
    const row = Math.floor(pt.y / cellSize);
    const key = row * gridCols + col;
    let bucket = spatialGrid.get(key);
    if (!bucket) {
      bucket = [];
      spatialGrid.set(key, bucket);
    }
    bucket.push(pt);
  }

  // TÍNH ĐIỂM DỰA TRÊN TỶ LỆ NÉT MẪU ĐƯỢC ĐỒ TRÚNG (Coverage of Template):
  // Với mỗi điểm mốc của mẫu, kiểm tra xem có nét mực người dùng trong bán kính R (toleranceR) hay không
  const rSq = toleranceR * toleranceR;
  let hitCount = 0;
  const waypointHitFlags = new Uint8Array(100);

  for (let i = 0; i < 100; i++) {
    const wp = waypoints100[i];
    const wpCol = Math.floor(wp.x / cellSize);
    const wpRow = Math.floor(wp.y / cellSize);

    let isHit = false;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const key = (wpRow + dy) * gridCols + (wpCol + dx);
        const bucket = spatialGrid.get(key);
        if (bucket) {
          for (let k = 0; k < bucket.length; k++) {
            const up = bucket[k];
            const distSq = (wp.x - up.x) * (wp.x - up.x) + (wp.y - up.y) * (wp.y - up.y);
            if (distSq <= rSq) {
              isHit = true;
              break;
            }
          }
        }
        if (isHit) break;
      }
      if (isHit) break;
    }

    if (isHit) {
      waypointHitFlags[i] = 1;
      hitCount++;
    }
  }

  // Điểm bám nét cơ bản (Base Score) = (Hit_Count / 100) * 100
  const baseScore = Math.round((hitCount / 100) * 100);

  // Chỉ trừ điểm phạt khi phát hiện có nét vẽ nguệch ngoạc nằm văng hẳn ra ngoài khung ô ly cho phép
  // Bán kính vùng an toàn mở rộng: R_OUT = toleranceR * 2.5 (~ 70px)
  const rOutSq = (toleranceR * 2.5) * (toleranceR * 2.5);
  let outOfBoundsCount = 0;

  for (let i = 0; i < alignedUserPoints.length; i++) {
    const up = alignedUserPoints[i];
    let minWpDistSq = Infinity;
    for (let j = 0; j < 100; j++) {
      const wp = waypoints100[j];
      const dSq = (up.x - wp.x) * (up.x - wp.x) + (up.y - wp.y) * (up.y - wp.y);
      if (dSq < minWpDistSq) {
        minWpDistSq = dSq;
        if (minWpDistSq <= rOutSq) break; // Nằm trong vùng an toàn ô ly cho phép
      }
    }
    if (minWpDistSq > rOutSq) {
      outOfBoundsCount++;
    }
  }

  const outOfBoundsRatio = alignedUserPoints.length > 0 ? (outOfBoundsCount / alignedUserPoints.length) : 0;
  let penalty = 0;
  // Chỉ trừ điểm khi có nét vẽ nguệch ngoạc văng hẳn ra ngoài (> 15% tổng số nét vẽ)
  if (outOfBoundsRatio > 0.15) {
    penalty = Math.min(25, Math.round((outOfBoundsRatio - 0.15) * 35));
  }

  // 4. TIÊU CHÍ BẮT BUỘC: ĐỘ TƯƠNG ĐỒNG HÌNH DÁNG NỘI DUNG (Shape & Character Similarity Check)
  const shapeCheck = computeShapeAndCharacterSimilarity(
    alignedUserPoints,
    waypoints100,
    width,
    height,
    toleranceR
  );

  let finalScore = Math.max(0, Math.min(100, Math.round(baseScore - penalty)));

  // BẢNG PHÂN LOẠI KẾT QUẢ VÀ BẢO VỆ CHỐNG ĐIỂM ẢO KHI VIẾT SAI CHỮ:
  let grade = "";
  let status: 'PASS' | 'NEEDS_IMPROVEMENT' | 'FAIL' = 'PASS';
  let warningText: string | undefined = undefined;

  // QUY TẮC BẮT BUỘC THEO ĐẶC TẢ SƯ PHẠM:
  // Nếu người dùng viết sai chữ cái (ví dụ: mẫu yêu cầu chữ 'a' nhưng viết chữ 'o' hoặc viết nguệch ngoạc hình tròn):
  // Độ tương đồng hình dáng < 40% -> ĐIỂM TỔNG TỐI ĐA CHỈ ĐƯỢC < 30 - 35 điểm (Đánh rớt / FAIL),
  // TUYỆT ĐỐI KHÔNG ĐƯỢC CHO 70 ĐIỂM!
  if (!shapeCheck.isMatch || shapeCheck.similarity < 40) {
    finalScore = Math.min(28, Math.max(10, Math.round(shapeCheck.similarity * 0.7)));
    status = 'FAIL';
    grade = "Chưa đúng mẫu! Phát hiện viết sai chữ cái hoặc sai cấu trúc nét nghiêm trọng so với chữ mẫu";
    warningText = "⚠️ Phát hiện viết sai chữ cái hoặc sai cấu trúc nét nghiêm trọng so với chữ mẫu! Vui lòng nhìn kỹ nét chữ mẫu màu hồng để đồ đúng con chữ nhé.";
  } else if (finalScore >= 85) {
    grade = "Xuất sắc! Nét chữ đúng chuẩn";
    status = 'PASS';
  } else if (finalScore >= 65) {
    grade = "Khá tốt! Cần nắn nót thêm đường cong/độ cao";
    status = 'NEEDS_IMPROVEMENT';
    warningText = "Khá tốt! Cần nắn nót thêm đường cong/độ cao.";
  } else {
    grade = "Chưa đúng mẫu! Hãy xem lại hướng đi của nét";
    status = 'FAIL';
    warningText = "Chưa đúng mẫu! Hãy xem lại hướng đi của nét và đồ chậm lại theo nét mẫu nhé.";
  }

  // Các điểm thành phần trực quan
  const trajectoryScore = shapeCheck.similarity < 40
    ? Math.min(15, Math.round(shapeCheck.similarity * 0.35))
    : Math.round((hitCount / 100) * 50);
  const completenessScore = shapeCheck.similarity < 40
    ? Math.min(10, Math.round(shapeCheck.minStrokeCoverage * 25))
    : Math.round((hitCount / 100) * 30);
  const proportionScore = shapeCheck.similarity < 40 ? 5 : Math.max(0, 20 - penalty);
  const inTemplatePixels = alignedUserPoints.length - outOfBoundsCount;

  // Tạo Debug Overlay Canvas trực quan
  let debugOverlayUrl: string | undefined = undefined;
  if (typeof document !== 'undefined') {
    try {
      const debugCanvas = document.createElement('canvas');
      debugCanvas.width = width;
      debugCanvas.height = height;
      const dbgCtx = debugCanvas.getContext('2d');
      if (dbgCtx) {
        dbgCtx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        dbgCtx.fillRect(0, 0, width, height);

        // Vẽ 100 waypoints mẫu: Xanh lá nếu Trúng (Hit), Đỏ hồng nếu Chưa trúng
        for (let i = 0; i < 100; i++) {
          const wp = waypoints100[i];
          const isHit = waypointHitFlags[i] === 1;

          // Vùng đệm dung sai bán kính R
          dbgCtx.beginPath();
          dbgCtx.arc(wp.x, wp.y, toleranceR, 0, Math.PI * 2);
          dbgCtx.fillStyle = isHit ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.08)';
          dbgCtx.fill();

          // Điểm mốc chính
          dbgCtx.beginPath();
          dbgCtx.arc(wp.x, wp.y, 3, 0, Math.PI * 2);
          dbgCtx.fillStyle = isHit ? '#10b981' : '#f43f5e';
          dbgCtx.fill();
        }

        // Vẽ các nét mực người dùng
        for (let i = 0; i < alignedUserPoints.length; i += 2) {
          const pt = alignedUserPoints[i];
          dbgCtx.fillStyle = 'rgba(56, 189, 248, 0.75)';
          dbgCtx.fillRect(Math.round(pt.x), Math.round(pt.y), 2, 2);
        }

        debugOverlayUrl = debugCanvas.toDataURL('image/png');
      }
    } catch {
      // ignore
    }
  }

  return {
    hasInk: true,
    hasStrokes: true,
    finalScore,
    finalCalculatedScore: finalScore,
    baseScore,
    hitCount,
    totalWaypoints: 100,
    trajectoryScore,
    completenessScore,
    proportionScore,
    penalty,
    precision: alignedUserPoints.length > 0 ? (inTemplatePixels / alignedUserPoints.length) : 0,
    recall: hitCount / 100,
    shapeSimilarity: shapeCheck.similarity,
    isShapeMatch: shapeCheck.isMatch,
    totalInkPoints,
    pointsInSafeZone: inTemplatePixels,
    centerlineCoverage: hitCount / 100,
    userInkPixels: totalInkPoints,
    inTemplatePixels,
    outOfBoundsPixels: outOfBoundsCount,
    status,
    grade,
    warningText,
    debugOverlayUrl,
  };
}

/**
 * Các alias đồng bộ theo luồng chuẩn của đề bài
 */
export const evaluateAgainstTemplate = evaluateHandwriting;
export const evaluateDrawingOnPaper = evaluateHandwriting;
export const computeStrokeScore = evaluateHandwriting;
export const analyzeImageDataForInk = extractHandwritingStrokes;

/**
 * Hàm bao tương thích ngược (Không gán điểm ảo)
 */
export function calculateRealisticCVScore(metrics: {
  inkRatio: number;
  stdDev: number;
  edgeCount: number;
  contrastRatio: number;
  targetChar?: string;
  canvasElement?: HTMLCanvasElement;
}) {
  if (metrics.canvasElement) {
    const result = evaluateHandwriting(metrics.canvasElement, metrics.targetChar || 'a');
    return {
      overallScore: result.finalCalculatedScore,
      trajectoryScore: result.trajectoryScore,
      proportionScore: result.proportionScore,
      smoothnessScore: Math.round(result.precision * 100),
      startEndAccuracy: result.finalCalculatedScore < 40 ? 25 : Math.round(result.recall * 100),
      debugOverlayUrl: result.debugOverlayUrl,
      warningText: result.warningText,
      evaluation: result,
    };
  }

  return {
    overallScore: 0,
    trajectoryScore: 0,
    proportionScore: 0,
    smoothnessScore: 0,
    startEndAccuracy: 0,
  };
}
