import { StrokePath, GridType, CharacterItem } from '../types';

export interface VietnameseLetterData extends CharacterItem {
  id: string;
  char: string;
  upperChar: string;
  lowerChar: string;
  display: string;
  name: string;
  totalStrokes: number;
  strokesCount: number;
  upperStrokesCount: number;
  lowerStrokesCount: number;
  tips: string;
  upperTips?: string;
  examples: string[];
  audioInstruction: string;
  upperAudioInstruction?: string;
  strokes: StrokePath[];
  upperStrokes: StrokePath[];
  lowerStrokes: StrokePath[];
  gridType: GridType;
}

// =========================================================================
// BỘ DỮ LIỆU CHUẨN HÓA 29 CHỮ CÁI TIẾNG VIỆT (SƯ PHẠM TIỂU HỌC & CHUẨN Ô LY)
// Tọa độ chuẩn hóa trên khung lưới 100x100:
// - y = 80: Dòng kẻ 1 (Baseline / Đường kẻ ngang đậm cơ sở)
// - y = 60: Dòng kẻ 2 (Độ cao 1 ô ly chuẩn: a, ă, â, c, e, ê, m, n, o, ô, ơ, u, ư, v, x)
// - y = 40: Dòng kẻ 3 (Độ cao 2 ô ly: d, đ, q)
// - y = 30: Đường 2.5 ô ly (Đỉnh nét khuyết trên: b, h, k, l và chữ hoa)
// - y = 20: Dòng kẻ 4 (Độ cao 3 ô ly)
// - y = 95: Đáy nét khuyết dưới (g, y vượt xuống 1.5 ô ly dưới dòng 1)
// =========================================================================

export const VIETNAMESE_29_LETTERS: VietnameseLetterData[] = [
  // 1. CHỮ A (Aa)
  {
    id: 'a',
    char: 'Aa',
    upperChar: 'A',
    lowerChar: 'a',
    display: 'Chữ A (Aa)',
    name: 'Chữ A (Aa)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 3,
    lowerStrokesCount: 2,
    tips: 'Nét cong kín cao 2 ô ly rộng 1.5 ô ly, rê bút viết nét móc ngược sát nét cong.',
    upperTips: 'Chữ A hoa cao 2.5 ô ly gồm 3 nét: Nét cong lượn từ dòng 1 lên đỉnh, nét thẳng xiên phải kéo xuống dòng 1 móc nhẹ sang trái và nét lượn ngang thân.',
    examples: ['an', 'ba', 'cá', 'Ánh sáng'],
    audioInstruction: 'Nét 1: Đặt bút dưới đường kẻ 3, viết nét cong kín. Nét 2: Lia bút lên đường kẻ 3, kéo thẳng xuống viết nét móc ngược phải.',
    upperAudioInstruction: 'Nét 1: Đặt bút trên dòng kẻ 1, viết nét cong lượn từ dưới lên đỉnh. Nét 2: Kéo thẳng xiên phải xuống dòng kẻ 1 rồi móc nhẹ sang trái. Nét 3: Viết nét lượn ngang ở giữa thân chữ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 26 78 C 30 76 40 54 48 30', label: 'Nét 1: Nét cong lượn từ dưới lên đỉnh (xiên lượn trái)', startPoint: { x: 26, y: 78 }, direction: 'slanted_left' },
      { id: 2, d: 'M 48 30 L 74 78 C 74 80 70 82 66 76', label: 'Nét 2: Nét thẳng xiên phải kéo từ đỉnh xuống dòng 1 móc nhẹ sang trái', startPoint: { x: 48, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 34 56 C 44 50 56 60 66 56', label: 'Nét 3: Nét lượn ngang ở giữa thân chữ', startPoint: { x: 34, y: 56 }, direction: 'horizontal' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' }
    ]
  },

  // 2. CHỮ Ă (Ăă)
  {
    id: 'ă',
    char: 'Ăă',
    upperChar: 'Ă',
    lowerChar: 'ă',
    display: 'Chữ Ă (Ăă)',
    name: 'Chữ Ă (Ăă)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 4,
    lowerStrokesCount: 3,
    tips: 'Viết thân chữ a rồi lia bút viết dấu trăng khuyết nhỏ cong ngửa cân đối trên đầu chữ.',
    upperTips: 'Viết thân chữ A hoa cao 2.5 ô ly rồi lia bút lên trên đỉnh đầu viết dấu trăng khuyết cong ngửa cân đối.',
    examples: ['ăn', 'măng', 'tắm', 'Ăn học'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Nét móc ngược phải. Nét 3: Lia bút lên giữa dòng 3 và 4 viết nét cong dưới nhỏ.',
    upperAudioInstruction: 'Nét 1, 2, 3: Viết thân chữ A hoa. Nét 4: Lia bút lên phía trên đỉnh đầu viết dấu trăng khuyết cong ngửa cân đối.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 41 26 C 44 33 56 33 59 26', label: 'Nét 3: Nét cong dưới nhỏ (dấu trăng khuyết)', startPoint: { x: 41, y: 26 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 26 78 C 30 76 40 54 48 30', label: 'Nét 1: Nét cong lượn từ dưới lên đỉnh (xiên lượn trái)', startPoint: { x: 26, y: 78 }, direction: 'slanted_left' },
      { id: 2, d: 'M 48 30 L 74 78 C 74 80 70 82 66 76', label: 'Nét 2: Nét thẳng xiên phải kéo từ đỉnh xuống dòng 1 móc nhẹ sang trái', startPoint: { x: 48, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 34 56 C 44 50 56 60 66 56', label: 'Nét 3: Nét lượn ngang ở giữa thân chữ', startPoint: { x: 34, y: 56 }, direction: 'horizontal' },
      { id: 4, d: 'M 42 18 C 45 24 53 24 56 18', label: 'Nét 4: Dấu trăng khuyết cong ngửa cân đối phía trên đỉnh đầu', startPoint: { x: 42, y: 18 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 41 26 C 44 33 56 33 59 26', label: 'Nét 3: Nét cong dưới nhỏ (dấu trăng khuyết)', startPoint: { x: 41, y: 26 }, direction: 'curve' }
    ]
  },

  // 3. CHỮ Â (Ââ)
  {
    id: 'â',
    char: 'Ââ',
    upperChar: 'Â',
    lowerChar: 'â',
    display: 'Chữ Â (Ââ)',
    name: 'Chữ Â (Ââ)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 4,
    strokesCount: 4,
    upperStrokesCount: 5,
    lowerStrokesCount: 4,
    tips: 'Viết thân chữ a rồi lia bút viết dấu mũ nón gồm 2 nét xiên nhọn đỉnh ở giữa.',
    upperTips: 'Viết thân chữ A hoa rồi lia bút lên phía trên viết dấu mũ nhọn đỉnh cân đối.',
    examples: ['ấm', 'sân', 'cây', 'Âm nhạc'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Nét móc ngược phải. Nét 3: Nét xiên trái của dấu mũ. Nét 4: Nét xiên phải của dấu mũ.',
    upperAudioInstruction: 'Nét 1, 2, 3: Viết thân chữ A hoa. Nét 4: Viết nét xiên trái của dấu mũ. Nét 5: Viết nét xiên phải của dấu mũ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 40 32 L 50 22', label: 'Nét 3: Nét xiên trái của dấu mũ', startPoint: { x: 40, y: 32 }, direction: 'slanted_right' },
      { id: 4, d: 'M 50 22 L 60 32', label: 'Nét 4: Nét xiên phải của dấu mũ', startPoint: { x: 50, y: 22 }, direction: 'slanted_left' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 26 78 C 30 76 40 54 48 30', label: 'Nét 1: Nét cong lượn từ dưới lên đỉnh (xiên lượn trái)', startPoint: { x: 26, y: 78 }, direction: 'slanted_left' },
      { id: 2, d: 'M 48 30 L 74 78 C 74 80 70 82 66 76', label: 'Nét 2: Nét thẳng xiên phải kéo từ đỉnh xuống dòng 1 móc nhẹ sang trái', startPoint: { x: 48, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 34 56 C 44 50 56 60 66 56', label: 'Nét 3: Nét lượn ngang ở giữa thân chữ', startPoint: { x: 34, y: 56 }, direction: 'horizontal' },
      { id: 4, d: 'M 42 22 L 49 14', label: 'Nét 4: Nét xiên trái của dấu mũ hoa', startPoint: { x: 42, y: 22 }, direction: 'slanted_right' },
      { id: 5, d: 'M 49 14 L 56 22', label: 'Nét 5: Nét xiên phải của dấu mũ hoa', startPoint: { x: 49, y: 14 }, direction: 'slanted_left' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 62, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 40 32 L 50 22', label: 'Nét 3: Nét xiên trái của dấu mũ', startPoint: { x: 40, y: 32 }, direction: 'slanted_right' },
      { id: 4, d: 'M 50 22 L 60 32', label: 'Nét 4: Nét xiên phải của dấu mũ', startPoint: { x: 50, y: 22 }, direction: 'slanted_left' }
    ]
  },

  // 4. CHỮ B (Bb)
  {
    id: 'b',
    char: 'Bb',
    upperChar: 'B',
    lowerChar: 'b',
    display: 'Chữ B (Bb)',
    name: 'Chữ B (Bb)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Nét 1 là nét khuyết trên cao 2.5 ô ly kéo thẳng xuống dòng kẻ 1. Nét 2 lượn cong lên tạo nét móc ngược chạm dòng kẻ 2 rồi uốn một vòng thắt nhỏ sang phải ở góc trên.',
    upperTips: 'Chữ B hoa gồm 2 nét: Nét 1 là nét móc ngược trái. Nét 2 là nét cong lượn tạo 2 bụng cong (bụng dưới to hơn bụng trên một chút, thắt nhỏ ở giữa).',
    examples: ['bà', 'bố', 'bạn', 'Bình minh'],
    audioInstruction: 'Nét 1: Đặt bút trên dòng kẻ 2, viết nét khuyết trên cao 2.5 ô ly kéo thẳng xuống dòng kẻ 1. Nét 2: Không nhấc bút, lượn cong lên tạo nét móc ngược chạm dòng kẻ 2 rồi uốn vòng thắt nhỏ sang phải.',
    upperAudioInstruction: 'Nét 1: Viết nét móc ngược trái từ trên xuống dòng kẻ 1. Nét 2: Đặt bút từ thân chữ viết nét cong lượn tạo 2 bụng tròn, thắt xoắn nhỏ ở giữa thân.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 35 60 C 40 46 48 34 48 28 C 48 24 43 24 38 32 L 38 80', label: 'Nét 1: Nét khuyết trên cao 2.5 ô ly kéo thẳng xuống dòng kẻ 1', startPoint: { x: 35, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 38 80 C 42 81 52 81 58 74 C 62 68 62 60 58 58 C 55 57 54 60 58 61 C 62 62 66 61 70 60', label: 'Nét 2: Nét móc ngược chạm dòng 2 uốn vòng thắt nhỏ sang phải ở góc trên', startPoint: { x: 38, y: 80 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 36 30 C 33 30 32 34 32 40 L 32 76 C 32 80 26 80 24 74', label: 'Nét 1: Nét móc ngược trái hơi lượn cong ở đầu, kéo thẳng xuống dòng 1 và móc sang trái', startPoint: { x: 36, y: 30 }, direction: 'vertical' },
      { id: 2, d: 'M 32 34 C 44 26 64 26 64 42 C 64 50 54 52 44 52 C 58 52 68 56 68 68 C 68 80 50 80 34 76', label: 'Nét 2: Nét cong lượn tạo 2 bụng cong (bụng dưới to hơn bụng trên một chút, thắt nhỏ ở giữa)', startPoint: { x: 32, y: 34 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 35 60 C 40 46 48 34 48 28 C 48 24 43 24 38 32 L 38 80', label: 'Nét 1: Nét khuyết trên cao 2.5 ô ly kéo thẳng xuống dòng kẻ 1', startPoint: { x: 35, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 38 80 C 42 81 52 81 58 74 C 62 68 62 60 58 58 C 55 57 54 60 58 61 C 62 62 66 61 70 60', label: 'Nét 2: Nét móc ngược chạm dòng 2 uốn vòng thắt nhỏ sang phải ở góc trên', startPoint: { x: 38, y: 80 }, direction: 'curve' }
    ]
  },

  // 5. CHỮ C (Cc)
  {
    id: 'c',
    char: 'Cc',
    upperChar: 'C',
    lowerChar: 'c',
    display: 'Chữ C (Cc)',
    name: 'Chữ C (Cc)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 1,
    lowerStrokesCount: 1,
    tips: 'Nét cong hở phải, lưng tựa nhẹ vào đường dọc, uốn đầu tròn trịa cao 2 ô ly.',
    upperTips: 'Chữ C hoa cao 2.5 ô ly gồm 1 nét liền lượn cong từ đỉnh, vòng sang trái tạo lưng cong tròn đều xuống dòng 1 rồi uốn móc nhẹ vào trong.',
    examples: ['cá', 'cờ', 'con', 'Cần cù'],
    audioInstruction: 'Đặt bút dưới đường kẻ 3, lượn cong sang trái chạm đường 3, vòng xuống chạm đường 1 rồi hất nhẹ lên dừng ở giữa dòng 1 và 2.',
    upperAudioInstruction: 'Đặt bút giữa dòng 2 và 3, lượn cong lên đỉnh, vòng sang trái tạo lưng cong tròn đều xuống dòng 1 rồi uốn móc nhẹ vào trong.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 68 46 C 62 38 36 38 36 60 C 36 78 60 80 70 72', label: 'Nét 1: Nét cong hở phải', startPoint: { x: 68, y: 46 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 70 36 C 66 26 48 26 38 36 C 28 48 28 66 36 74 C 44 82 62 82 70 72', label: 'Nét 1: Nét cong liền lượn từ đỉnh, vòng sang trái tạo lưng cong tròn đều xuống dòng 1 rồi uốn móc nhẹ vào trong', startPoint: { x: 70, y: 36 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 68 46 C 62 38 36 38 36 60 C 36 78 60 80 70 72', label: 'Nét 1: Nét cong hở phải', startPoint: { x: 68, y: 46 }, direction: 'curve' }
    ]
  },

  // 6. CHỮ D (Dd)
  {
    id: 'd',
    char: 'Dd',
    upperChar: 'D',
    lowerChar: 'd',
    display: 'Chữ D (Dd)',
    name: 'Chữ D (Dd)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 1,
    lowerStrokesCount: 2,
    tips: 'Nét cong kín cao 2 ô ly kết hợp nét móc ngược dài vươn cao 4 ô ly (2 tầng ô ly).',
    upperTips: 'Chữ D hoa là 1 nét liền mềm mại gồm nét lượn đứng, thắt nhỏ ở chân đáy, lượn cong tròn lưng sang phải lên đỉnh rồi khép vào thân.',
    examples: ['da', 'dê', 'dòng', 'Dịu dàng'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Lia bút lên đường kẻ 4, kéo thẳng xuống đường kẻ 1 rồi uốn móc ngược phải.',
    upperAudioInstruction: 'Đặt bút ở đỉnh, lượn đứng xuống dòng kẻ 1, tạo vòng thắt nhỏ ở chân rồi uốn cong tròn lưng sang phải vươn lên đỉnh khép vào thân chữ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 22 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược dài (2 tầng ô ly)', startPoint: { x: 62, y: 22 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 46 30 C 40 30 34 36 34 48 L 34 74 C 34 78 28 80 26 76 C 24 72 30 72 36 78 C 44 82 72 80 72 54 C 72 30 56 26 36 32', label: 'Nét 1: Một nét liền mềm mại gồm nét lượn đứng, thắt nhỏ ở chân đáy, lượn cong tròn lưng sang phải lên đỉnh rồi khép vào thân', startPoint: { x: 46, y: 30 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 22 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược dài (2 tầng ô ly)', startPoint: { x: 62, y: 22 }, direction: 'vertical' }
    ]
  },

  // 7. CHỮ Đ (Đđ)
  {
    id: 'đ',
    char: 'Đđ',
    upperChar: 'Đ',
    lowerChar: 'đ',
    display: 'Chữ Đ (Đđ)',
    name: 'Chữ Đ (Đđ)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 2,
    lowerStrokesCount: 3,
    tips: 'Viết thân d rồi lia bút viết nét gạch ngang ngắn cân đối qua thân chữ ở dòng kẻ 3.',
    upperTips: 'Chữ Đ hoa gồm 2 nét: Nét 1 là thân chữ D hoa liền khối. Nét 2 là nét gạch ngang ngắn ở giữa thân chữ.',
    examples: ['đi', 'đò', 'đồng', 'Đất nước'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Nét móc ngược dài. Nét 3: Nét gạch ngang ngắn ở dòng kẻ 3.',
    upperAudioInstruction: 'Nét 1: Viết thân chữ D hoa liền khối. Nét 2: Lia bút viết nét gạch ngang ngắn ở giữa thân chữ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 22 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược dài', startPoint: { x: 62, y: 22 }, direction: 'vertical' },
      { id: 3, d: 'M 52 32 L 72 32', label: 'Nét 3: Nét gạch ngang ngắn', startPoint: { x: 52, y: 32 }, direction: 'horizontal' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 46 30 C 40 30 34 36 34 48 L 34 74 C 34 78 28 80 26 76 C 24 72 30 72 36 78 C 44 82 72 80 72 54 C 72 30 56 26 36 32', label: 'Nét 1: Thân D hoa liền khối', startPoint: { x: 46, y: 30 }, direction: 'curve' },
      { id: 2, d: 'M 22 52 L 44 52', label: 'Nét 2: Nét gạch ngang ngắn ở giữa thân chữ', startPoint: { x: 22, y: 52 }, direction: 'horizontal' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 22 L 62 74 C 62 80 70 82 76 65', label: 'Nét 2: Nét móc ngược dài', startPoint: { x: 62, y: 22 }, direction: 'vertical' },
      { id: 3, d: 'M 52 32 L 72 32', label: 'Nét 3: Nét gạch ngang ngắn', startPoint: { x: 52, y: 32 }, direction: 'horizontal' }
    ]
  },

  // 8. CHỮ E (Ee)
  {
    id: 'e',
    char: 'Ee',
    upperChar: 'E',
    lowerChar: 'e',
    display: 'Chữ E (Ee)',
    name: 'Chữ E (Ee)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 1,
    lowerStrokesCount: 1,
    tips: 'Khởi bút trên dòng 1, lượn xiên chéo lên rồi vòng cung lưng cong chạm dòng 3 uốn xuống dòng 1.',
    upperTips: 'Chữ E hoa gồm 1 nét liền: Nét lượn trên kết hợp vòng xoắn nhỏ ở ngang thân đường kẻ 2, uốn lưng cong xuống tạo vòng xoắn đáy tròn đều.',
    examples: ['em', 'mẹ', 'bé', 'Êm đềm'],
    audioInstruction: 'Đặt bút trên dòng kẻ 1, lia xiên lên dòng 2 rồi lượn vòng cung sang trái chạm dòng 3, uốn cong xuống dòng 1 hất lên.',
    upperAudioInstruction: 'Đặt bút lượn lên đỉnh, uốn cong tạo vòng thắt nhỏ ở ngang thân, sau đó lượn cong tròn lưng dưới xuống dòng 1 rồi móc vào trong.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 36 68 L 66 56 C 68 40 40 38 36 58 C 36 76 56 80 68 72', label: 'Nét 1: Nét cong liền mạch chữ e', startPoint: { x: 36, y: 68 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 66 34 C 62 26 46 26 38 34 C 32 42 38 48 44 48 C 48 48 44 50 40 52 C 30 58 30 72 40 78 C 48 82 62 82 70 72', label: 'Nét 1: Nét lượn trên kết hợp vòng xoắn nhỏ ở ngang thân, uốn lưng cong xuống tạo vòng xoắn đáy tròn đều', startPoint: { x: 66, y: 34 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 36 68 L 66 56 C 68 40 40 38 36 58 C 36 76 56 80 68 72', label: 'Nét 1: Nét cong liền mạch chữ e', startPoint: { x: 36, y: 68 }, direction: 'curve' }
    ]
  },

  // 9. CHỮ Ê (Êê)
  {
    id: 'ê',
    char: 'Êê',
    upperChar: 'Ê',
    lowerChar: 'ê',
    display: 'Chữ Ê (Êê)',
    name: 'Chữ Ê (Êê)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 3,
    lowerStrokesCount: 3,
    tips: 'Viết thân chữ e rồi lia bút viết dấu mũ nhọn cân đối phía trên.',
    upperTips: 'Viết thân chữ E hoa rồi lia bút lên phía trên đỉnh viết dấu mũ nón cân đối.',
    examples: ['con bê', 'búp bê', 'con dê', 'Êm ái'],
    audioInstruction: 'Nét 1: Viết chữ e. Nét 2: Lia bút lên đầu viết nét xiên trái của dấu mũ. Nét 3: Viết nét xiên phải của dấu mũ.',
    upperAudioInstruction: 'Nét 1: Viết thân chữ E hoa. Nét 2: Viết nét xiên trái của dấu mũ. Nét 3: Viết nét xiên phải của dấu mũ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 36 68 L 66 56 C 68 40 40 38 36 58 C 36 76 56 80 68 72', label: 'Nét 1: Thân chữ e', startPoint: { x: 36, y: 68 }, direction: 'curve' },
      { id: 2, d: 'M 42 30 L 51 20', label: 'Nét 2: Nét xiên trái của dấu mũ', startPoint: { x: 42, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 51 20 L 60 30', label: 'Nét 3: Nét xiên phải của dấu mũ', startPoint: { x: 51, y: 20 }, direction: 'slanted_left' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 66 34 C 62 26 46 26 38 34 C 32 42 38 48 44 48 C 48 48 44 50 40 52 C 30 58 30 72 40 78 C 48 82 62 82 70 72', label: 'Nét 1: Thân E hoa uốn thắt giữa', startPoint: { x: 66, y: 34 }, direction: 'curve' },
      { id: 2, d: 'M 42 20 L 50 12', label: 'Nét 2: Nét xiên trái của dấu mũ hoa', startPoint: { x: 42, y: 20 }, direction: 'slanted_right' },
      { id: 3, d: 'M 50 12 L 58 20', label: 'Nét 3: Nét xiên phải của dấu mũ hoa', startPoint: { x: 50, y: 12 }, direction: 'slanted_left' }
    ],
    strokes: [
      { id: 1, d: 'M 36 68 L 66 56 C 68 40 40 38 36 58 C 36 76 56 80 68 72', label: 'Nét 1: Thân chữ e', startPoint: { x: 36, y: 68 }, direction: 'curve' },
      { id: 2, d: 'M 42 30 L 51 20', label: 'Nét 2: Nét xiên trái của dấu mũ', startPoint: { x: 42, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 51 20 L 60 30', label: 'Nét 3: Nét xiên phải của dấu mũ', startPoint: { x: 51, y: 20 }, direction: 'slanted_left' }
    ]
  },

  // 10. CHỮ G (Gg)
  {
    id: 'g',
    char: 'Gg',
    upperChar: 'G',
    lowerChar: 'g',
    display: 'Chữ G (Gg)',
    name: 'Chữ G (Gg)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Nét cong kín 2 ô ly kết hợp nét khuyết dưới dài 2.5 ô ly vươn xuống dòng dưới.',
    upperTips: 'Chữ G hoa gồm 2 nét: Nét 1 lượn cong như chữ C hoa kéo dài xuống dòng 2. Nét 2 kéo thẳng xuống dưới dòng 1 sâu 1.5 ô ly tạo nét khuyết dưới thanh thoát.',
    examples: ['gà', 'gỗ', 'gần', 'Gắn bó'],
    audioInstruction: 'Nét 1: Viết nét cong kín. Nét 2: Lia bút lên dòng 3, kéo thẳng xuống sâu 1.5 ô ly dưới dòng 1, uốn khuyết sang trái hất lên.',
    upperAudioInstruction: 'Nét 1: Viết nét cong lượn thân trên giống chữ C hoa. Nét 2: Lia bút viết nét khuyết dưới dài 2.5 ô ly vươn xuống dòng dưới.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 90 C 62 98 48 98 42 90 C 38 82 52 72 70 65', label: 'Nét 2: Nét khuyết dưới dài 2.5 ô ly', startPoint: { x: 62, y: 40 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 70 36 C 66 26 48 26 38 36 C 28 48 28 66 36 74 C 44 82 60 80 66 66 L 66 56', label: 'Nét 1: Nét cong hở thân trên chữ G hoa', startPoint: { x: 70, y: 36 }, direction: 'curve' },
      { id: 2, d: 'M 66 56 L 66 90 C 66 98 50 98 44 90 C 40 82 54 72 72 65', label: 'Nét 2: Nét khuyết dưới dài 2.5 ô ly vươn sâu xuống dưới dòng 1', startPoint: { x: 66, y: 56 }, direction: 'vertical' }
    ],
    strokes: [
      { id: 1, d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 62, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 62 40 L 62 90 C 62 98 48 98 42 90 C 38 82 52 72 70 65', label: 'Nét 2: Nét khuyết dưới dài 2.5 ô ly', startPoint: { x: 62, y: 40 }, direction: 'vertical' }
    ]
  },

  // 11. CHỮ H (Hh)
  {
    id: 'h',
    char: 'Hh',
    upperChar: 'H',
    lowerChar: 'h',
    display: 'Chữ H (Hh)',
    name: 'Chữ H (Hh)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 3,
    lowerStrokesCount: 2,
    tips: 'Nét khuyết trên cao 2.5 ô ly nối liền nét móc hai đầu mềm mại.',
    upperTips: 'Chữ H hoa gồm 3 nét: Thân đứng trái uốn móc, thân đứng phải uốn móc và nét lượn sóng ngang nối giữa thân.',
    examples: ['hoa', 'học', 'hát', 'Hạnh phúc'],
    audioInstruction: 'Nét 1: Viết nét khuyết trên cao 2.5 ô ly kéo thẳng xuống dòng 1. Nét 2: Rê bút lên gần dòng 2, viết nét móc hai đầu cao 1 ô ly.',
    upperAudioInstruction: 'Nét 1: Viết thân đứng trái. Nét 2: Viết thân đứng phải. Nét 3: Viết nét lượn sóng ngang nối giữa hai thân.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 34 60 C 40 45 46 28 46 20 C 46 14 38 14 34 22 L 34 80', label: 'Nét 1: Nét khuyết trên cao 2.5 ô ly', startPoint: { x: 34, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 34 56 C 40 42 58 42 58 56 L 58 74 C 58 80 66 82 72 68', label: 'Nét 2: Nét móc hai đầu', startPoint: { x: 34, y: 56 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 34 30 C 30 30 28 34 28 42 L 28 76 C 28 80 24 80 22 74', label: 'Nét 1: Nét móc ngược trái thân đứng bên trái', startPoint: { x: 34, y: 30 }, direction: 'vertical' },
      { id: 2, d: 'M 70 30 C 68 30 68 34 68 42 L 68 76 C 68 80 72 82 76 74', label: 'Nét 2: Nét móc ngược phải thân đứng bên phải', startPoint: { x: 70, y: 30 }, direction: 'vertical' },
      { id: 3, d: 'M 28 54 C 38 48 58 60 68 54', label: 'Nét 3: Nét lượn sóng ngang nối giữa thân chữ H hoa', startPoint: { x: 28, y: 54 }, direction: 'horizontal' }
    ],
    strokes: [
      { id: 1, d: 'M 34 60 C 40 45 46 28 46 20 C 46 14 38 14 34 22 L 34 80', label: 'Nét 1: Nét khuyết trên cao 2.5 ô ly', startPoint: { x: 34, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 34 56 C 40 42 58 42 58 56 L 58 74 C 58 80 66 82 72 68', label: 'Nét 2: Nét móc hai đầu', startPoint: { x: 34, y: 56 }, direction: 'curve' }
    ]
  },

  // 12. CHỮ I (Ii)
  {
    id: 'i',
    char: 'Ii',
    upperChar: 'I',
    lowerChar: 'i',
    display: 'Chữ I (Ii)',
    name: 'Chữ I (Ii)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 2,
    lowerStrokesCount: 3,
    tips: 'Nét hất ngắn, nét móc ngược rộng 1 ô ly và dấu chấm tròn nhỏ phía trên.',
    upperTips: 'Chữ I hoa cao 2.5 ô ly gồm 2 nét: Nét 1 lượn ngang đầu mềm mại, Nét 2 kéo thẳng từ đỉnh xuống dòng 1 rồi uốn móc sang trái.',
    examples: ['in', 'chim', 'kim', 'Im lặng'],
    audioInstruction: 'Nét 1: Viết nét hất từ dòng 2 lên dòng 3. Nét 2: Kéo thẳng xuống dòng 1 viết nét móc ngược. Nét 3: Chấm nhẹ trên đầu.',
    upperAudioInstruction: 'Nét 1: Viết nét lượn ngang đầu. Nét 2: Đặt bút từ giữa nét 1 kéo thẳng xuống dòng 1 rồi móc ngược sang trái.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 34 60 L 46 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 34, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 46 40 L 46 74 C 46 80 54 82 60 68', label: 'Nét 2: Nét móc ngược', startPoint: { x: 46, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 46 27 A 1.5 1.5 0 1 1 46 29 A 1.5 1.5 0 1 1 46 27', label: 'Nét 3: Dấu chấm nhỏ trên đầu', startPoint: { x: 46, y: 27 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 32 28 C 45 24 58 24 68 28', label: 'Nét 1: Nét lượn ngang mềm mại ở đầu chữ', startPoint: { x: 32, y: 28 }, direction: 'horizontal' },
      { id: 2, d: 'M 50 26 L 50 76 C 50 80 42 82 34 76', label: 'Nét 2: Nét móc ngược trái kéo thẳng từ đỉnh xuống dòng 1 và lượn móc sang trái', startPoint: { x: 50, y: 26 }, direction: 'vertical' }
    ],
    strokes: [
      { id: 1, d: 'M 34 60 L 46 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 34, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 46 40 L 46 74 C 46 80 54 82 60 68', label: 'Nét 2: Nét móc ngược', startPoint: { x: 46, y: 40 }, direction: 'vertical' },
      { id: 3, d: 'M 46 27 A 1.5 1.5 0 1 1 46 29 A 1.5 1.5 0 1 1 46 27', label: 'Nét 3: Dấu chấm nhỏ trên đầu', startPoint: { x: 46, y: 27 }, direction: 'curve' }
    ]
  },

  // 13. CHỮ K (Kk)
  {
    id: 'k',
    char: 'Kk',
    upperChar: 'K',
    lowerChar: 'k',
    display: 'Chữ K (Kk)',
    name: 'Chữ K (Kk)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Nét khuyết trên cao 2.5 ô ly nối nét thắt giữa ở lưng chừng ô thứ hai.',
    upperTips: 'Chữ K hoa cao 2.5 ô ly gồm 2 nét chính: Nét 1 là nét cong lượn kết hợp nét móc ngược trái (thân chữ K hoa). Nét 2 là nét móc hai đầu thắt giữa: từ đỉnh lượn xuống tạo vòng xoắn thắt nhỏ sát thân nét 1 rồi kéo chéo xuống dòng 1 móc ngược lên sang phải.',
    examples: ['kem', 'kéo', 'kính', 'Kiên trì'],
    audioInstruction: 'Nét 1: Viết nét khuyết trên cao 2.5 ô ly. Nét 2: Rê bút lên dòng 3 viết nét móc thắt giữa rồi uốn móc ngược sang phải.',
    upperAudioInstruction: 'Nét 1: Đặt bút trên đỉnh cao 2.5 ô ly, lượn cong sang trái kéo thẳng xuống dòng 1 uốn móc nhẹ sang trái. Nét 2: Đặt bút bên phải nét 1 lượn cong xuống giữa thân tạo vòng xoắn thắt nhỏ sát thân nét 1, kéo lượn chéo xuống dòng 1 rồi uốn móc ngược lên.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 34 60 C 40 45 46 28 46 20 C 46 14 38 14 34 22 L 34 80', label: 'Nét 1: Nét khuyết trên', startPoint: { x: 34, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 34 54 C 42 42 56 42 56 50 C 56 56 46 56 46 58 C 48 64 56 72 64 78 C 66 80 70 80 74 74', label: 'Nét 2: Nét móc thắt giữa', startPoint: { x: 34, y: 54 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 36 28 C 30 28 29 34 29 42 L 29 72 C 29 78 23 80 20 74', label: 'Nét 1: Nét cong lượn kết hợp nét móc ngược trái (thân chữ K hoa cao 2.5 ô ly)', startPoint: { x: 36, y: 28 }, direction: 'vertical' },
      { id: 2, d: 'M 68 28 C 58 32 46 44 38 52 C 33 50 33 46 37 46 C 42 46 44 51 40 56 C 46 64 56 76 64 78 C 70 80 74 76 74 66', label: 'Nét 2: Nét móc hai đầu thắt giữa: từ đỉnh lượn xuống tạo vòng xoắn thắt nhỏ sát thân nét 1 rồi lượn chéo xuống dòng 1 móc ngược lên', startPoint: { x: 68, y: 28 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 34 60 C 40 45 46 28 46 20 C 46 14 38 14 34 22 L 34 80', label: 'Nét 1: Nét khuyết trên', startPoint: { x: 34, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 34 54 C 42 42 56 42 56 50 C 56 56 46 56 46 58 C 48 64 56 72 64 78 C 66 80 70 80 74 74', label: 'Nét 2: Nét móc thắt giữa', startPoint: { x: 34, y: 54 }, direction: 'curve' }
    ]
  },

  // 14. CHỮ L (Ll)
  {
    id: 'l',
    char: 'Ll',
    upperChar: 'L',
    lowerChar: 'l',
    display: 'Chữ L (Ll)',
    name: 'Chữ L (Ll)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 1,
    lowerStrokesCount: 1,
    tips: 'Nét khuyết trên uốn liền nét móc ngược, cao 2.5 ô ly thanh thoát.',
    upperTips: 'Chữ L hoa cao 2.5 ô ly gồm 1 nét liền: Đặt bút trên đỉnh lượn sang phải, lượn cong xuống thân, tạo vòng xoắn thắt nhỏ ở đáy rồi lượn ngang mềm mại sang phải.',
    examples: ['lá', 'lớp', 'lửa', 'Lạc quan'],
    audioInstruction: 'Đặt bút trên dòng 2, viết nét khuyết trên cao 2.5 ô ly, kéo thẳng xuống dòng 1 rồi uốn móc ngược lên dòng 2.',
    upperAudioInstruction: 'Đặt bút trên đỉnh lượn sang phải, lượn cong xuống dòng 1, tạo vòng thắt nhỏ ở đáy rồi lượn ngang sang phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 36 60 C 42 45 50 28 50 20 C 50 14 42 14 38 22 L 38 74 C 38 80 46 82 54 72', label: 'Nét 1: Nét khuyết trên liền nét móc ngược', startPoint: { x: 36, y: 60 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 38 28 C 46 26 54 30 48 40 L 34 74 C 34 78 28 80 26 76 C 24 72 32 72 40 78 C 48 82 58 82 68 76', label: 'Nét 1: Nét lượn từ trên xuống, xoắn nhỏ ở đáy rồi lượn ngang mềm mại sang phải', startPoint: { x: 38, y: 28 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 36 60 C 42 45 50 28 50 20 C 50 14 42 14 38 22 L 38 74 C 38 80 46 82 54 72', label: 'Nét 1: Nét khuyết trên liền nét móc ngược', startPoint: { x: 36, y: 60 }, direction: 'vertical' }
    ]
  },

  // 15. CHỮ M (Mm)
  {
    id: 'm',
    char: 'Mm',
    upperChar: 'M',
    lowerChar: 'm',
    display: 'Chữ M (Mm)',
    name: 'Chữ M (Mm)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 4,
    lowerStrokesCount: 3,
    tips: 'Gồm 2 nét móc xuôi và 1 nét móc hai đầu đều đặn, nhịp nhàng cao 1 ô ly.',
    upperTips: 'Chữ M hoa cao 2.5 ô ly gồm 4 nét: Nét 1 móc ngược trái từ dòng 1 lượn lên đỉnh, Nét 2 xiên chéo xuống dòng 1, Nét 3 xiên chéo lên đỉnh, Nét 4 kéo thẳng xuống dòng 1 và uốn móc ngược phải.',
    examples: ['mẹ', 'mai', 'mưa', 'Mùa xuân'],
    audioInstruction: 'Nét 1: Nét móc xuôi trái. Nét 2: Nét móc xuôi rộng. Nét 3: Nét móc hai đầu kết thúc ở dòng 2.',
    upperAudioInstruction: 'Nét 1: Đặt bút trên dòng kẻ 1, viết nét móc ngược trái lên đỉnh. Nét 2: Kéo xiên thẳng xuống dòng 1. Nét 3: Viết nét xiên lên đỉnh. Nét 4: Kéo thẳng xuống dòng 1 rồi uốn móc ngược phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 24 50 C 26 40 34 40 34 48 L 34 80', label: 'Nét 1: Nét móc xuôi trái', startPoint: { x: 24, y: 50 }, direction: 'curve' },
      { id: 2, d: 'M 34 52 C 38 40 50 40 50 50 L 50 80', label: 'Nét 2: Nét móc xuôi rộng', startPoint: { x: 34, y: 52 }, direction: 'curve' },
      { id: 3, d: 'M 50 52 C 54 40 68 40 68 50 L 68 74 C 68 80 74 82 80 70', label: 'Nét 3: Nét móc hai đầu', startPoint: { x: 50, y: 52 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 24 78 C 22 72 26 50 30 36 C 32 30 35 28 38 30', label: 'Nét 1: Nét móc ngược trái từ dòng 1 lượn lên đỉnh 2.5 ô ly', startPoint: { x: 24, y: 78 }, direction: 'curve' },
      { id: 2, d: 'M 38 30 L 50 78', label: 'Nét 2: Nét thẳng xiên kéo từ đỉnh xuống chân dòng 1', startPoint: { x: 38, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 50 78 L 62 30', label: 'Nét 3: Nét xiên chéo kéo từ chân dòng 1 lên đỉnh', startPoint: { x: 50, y: 78 }, direction: 'slanted_left' },
      { id: 4, d: 'M 62 30 L 62 74 C 62 80 68 82 74 72', label: 'Nét 4: Nét kéo thẳng xuống dòng 1 uốn móc ngược phải', startPoint: { x: 62, y: 30 }, direction: 'vertical' }
    ],
    strokes: [
      { id: 1, d: 'M 24 50 C 26 40 34 40 34 48 L 34 80', label: 'Nét 1: Nét móc xuôi trái', startPoint: { x: 24, y: 50 }, direction: 'curve' },
      { id: 2, d: 'M 34 52 C 38 40 50 40 50 50 L 50 80', label: 'Nét 2: Nét móc xuôi rộng', startPoint: { x: 34, y: 52 }, direction: 'curve' },
      { id: 3, d: 'M 50 52 C 54 40 68 40 68 50 L 68 74 C 68 80 74 82 80 70', label: 'Nét 3: Nét móc hai đầu', startPoint: { x: 50, y: 52 }, direction: 'curve' }
    ]
  },

  // 16. CHỮ N (Nn)
  {
    id: 'n',
    char: 'Nn',
    upperChar: 'N',
    lowerChar: 'n',
    display: 'Chữ N (Nn)',
    name: 'Chữ N (Nn)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 3,
    lowerStrokesCount: 2,
    tips: '1 nét móc xuôi và 1 nét móc hai đầu rộng 1.5 ô ly đều đặn.',
    upperTips: 'Chữ N hoa cao 2.5 ô ly gồm 3 nét: Nét 1 móc ngược trái từ dòng 1 lượn lên đỉnh, Nét 2 xiên chéo thẳng xuống dòng 1, Nét 3 lượn vươn lên đỉnh và uốn cong nhẹ sang phải.',
    examples: ['nụ', 'non', 'nắng', 'Nghị lực'],
    audioInstruction: 'Nét 1: Nét móc xuôi trái. Nét 2: Rê bút lên dòng 3 viết nét móc hai đầu.',
    upperAudioInstruction: 'Nét 1: Đặt bút trên dòng kẻ 1, viết nét móc ngược trái lên đỉnh. Nét 2: Viết nét xiên chéo thẳng xuống dòng 1. Nét 3: Lượn bút từ dòng 1 vươn lên đỉnh uốn cong nhẹ sang phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 32 50 C 35 40 44 40 44 48 L 44 80', label: 'Nét 1: Nét móc xuôi', startPoint: { x: 32, y: 50 }, direction: 'curve' },
      { id: 2, d: 'M 44 52 C 50 40 66 40 66 50 L 66 74 C 66 80 72 82 78 70', label: 'Nét 2: Nét móc hai đầu', startPoint: { x: 44, y: 52 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 26 78 C 24 72 28 50 32 36 C 34 30 37 28 40 30', label: 'Nét 1: Nét móc ngược trái từ dòng 1 lượn lên đỉnh', startPoint: { x: 26, y: 78 }, direction: 'curve' },
      { id: 2, d: 'M 40 30 L 66 78', label: 'Nét 2: Nét xiên chéo thẳng từ đỉnh xuống chân dòng 1', startPoint: { x: 40, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 66 78 C 66 60 67 42 68 30 C 69 26 73 26 76 30', label: 'Nét 3: Nét lượn lên đỉnh uốn cong nhẹ sang phải', startPoint: { x: 66, y: 78 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 32 50 C 35 40 44 40 44 48 L 44 80', label: 'Nét 1: Nét móc xuôi', startPoint: { x: 32, y: 50 }, direction: 'curve' },
      { id: 2, d: 'M 44 52 C 50 40 66 40 66 50 L 66 74 C 66 80 72 82 78 70', label: 'Nét 2: Nét móc hai đầu', startPoint: { x: 44, y: 52 }, direction: 'curve' }
    ]
  },

  // 17. CHỮ O (Oo)
  {
    id: 'o',
    char: 'Oo',
    upperChar: 'O',
    lowerChar: 'o',
    display: 'Chữ O (Oo)',
    name: 'Chữ O (Oo)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 1,
    lowerStrokesCount: 1,
    tips: 'Nét cong kín tròn đều hình quả trứng gà, rộng 1.5 ô ly, cao 2 ô ly.',
    upperTips: 'Chữ O hoa là một nét cong kín hình bầu dục thuôn đều cao 2.5 ô ly, rộng 2 ô ly, nét lia bút trơn tru khép kín.',
    examples: ['ong', 'bò', 'cỏ', 'Ôn hòa'],
    audioInstruction: 'Đặt bút dưới dòng kẻ 3, lượn cong sang trái chạm dòng 3, vòng xuống chạm dòng 1 rồi uốn lên khép kín.',
    upperAudioInstruction: 'Đặt bút ở đỉnh 2.5 ô ly, lượn cong đều sang trái chạm dòng 1, vòng sang phải lên đỉnh rồi khép kín.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín tròn quả trứng', startPoint: { x: 60, y: 46 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 52 28 C 38 28 30 42 30 54 C 30 72 40 80 52 80 C 64 80 70 72 70 54 C 70 42 64 28 52 28 Z', label: 'Nét 1: Thân O hoa tròn đều cao 2.5 ô ly rộng 2 ô ly', startPoint: { x: 52, y: 28 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín tròn quả trứng', startPoint: { x: 60, y: 46 }, direction: 'curve' }
    ]
  },

  // 18. CHỮ Ô (Ôô)
  {
    id: 'ô',
    char: 'Ôô',
    upperChar: 'Ô',
    lowerChar: 'ô',
    display: 'Chữ Ô (Ôô)',
    name: 'Chữ Ô (Ôô)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 3,
    lowerStrokesCount: 3,
    tips: 'Viết thân chữ o rồi thêm dấu mũ nón cân đối không quá to trên đỉnh.',
    upperTips: 'Chữ Ô hoa gồm thân O hoa cao 2.5 ô ly và 2 nét xiên tạo dấu nón nhọn cân đối phía trên đỉnh đầu.',
    examples: ['ô', 'cô', 'bột', 'Ôm ấp'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Nét xiên trái của dấu mũ. Nét 3: Nét xiên phải của dấu mũ.',
    upperAudioInstruction: 'Nét 1: Viết thân chữ O hoa. Nét 2: Viết nét xiên trái của dấu mũ hoa. Nét 3: Viết nét xiên phải của dấu mũ hoa.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín (thân o)', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 40 30 L 50 20', label: 'Nét 2: Nét xiên trái của dấu mũ', startPoint: { x: 40, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 50 20 L 60 30', label: 'Nét 3: Nét xiên phải của dấu mũ', startPoint: { x: 50, y: 20 }, direction: 'slanted_left' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 52 28 C 38 28 30 42 30 54 C 30 72 40 80 52 80 C 64 80 70 72 70 54 C 70 42 64 28 52 28 Z', label: 'Nét 1: Thân O hoa', startPoint: { x: 52, y: 28 }, direction: 'curve' },
      { id: 2, d: 'M 44 20 L 52 12', label: 'Nét 2: Nét xiên trái của dấu mũ hoa', startPoint: { x: 44, y: 20 }, direction: 'slanted_right' },
      { id: 3, d: 'M 52 12 L 60 20', label: 'Nét 3: Nét xiên phải của dấu mũ hoa', startPoint: { x: 52, y: 12 }, direction: 'slanted_left' }
    ],
    strokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín (thân o)', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 40 30 L 50 20', label: 'Nét 2: Nét xiên trái của dấu mũ', startPoint: { x: 40, y: 30 }, direction: 'slanted_right' },
      { id: 3, d: 'M 50 20 L 60 30', label: 'Nét 3: Nét xiên phải của dấu mũ', startPoint: { x: 50, y: 20 }, direction: 'slanted_left' }
    ]
  },

  // 19. CHỮ Ơ (Ơơ)
  {
    id: 'ơ',
    char: 'Ơơ',
    upperChar: 'Ơ',
    lowerChar: 'ơ',
    display: 'Chữ Ơ (Ơơ)',
    name: 'Chữ Ơ (Ơơ)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Viết thân chữ o rồi thêm nét râu nhỏ ở góc 1 giờ trên lưng chữ.',
    upperTips: 'Chữ Ơ hoa gồm thân O hoa cao 2.5 ô ly và nét râu nhỏ uốn cong ở góc 1 giờ trên đỉnh chữ.',
    examples: ['ơi', 'mơ', 'bơ', 'Ơn nghĩa'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Lia bút lên góc 1 giờ của đường kẻ 3 viết nét râu móc nhỏ.',
    upperAudioInstruction: 'Nét 1: Viết thân chữ O hoa. Nét 2: Lia bút lên góc 1 giờ trên đỉnh viết nét râu móc cong nhỏ.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 60 42 C 64 36 68 38 68 42 C 68 46 63 47 61 46', label: 'Nét 2: Nét râu nhỏ ở góc 1 giờ', startPoint: { x: 60, y: 42 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 52 28 C 38 28 30 42 30 54 C 30 72 40 80 52 80 C 64 80 70 72 70 54 C 70 42 64 28 52 28 Z', label: 'Nét 1: Thân O hoa', startPoint: { x: 52, y: 28 }, direction: 'curve' },
      { id: 2, d: 'M 64 28 C 70 20 76 22 76 26 C 76 30 70 32 67 30', label: 'Nét 2: Nét râu chữ hoa ở góc 1 giờ', startPoint: { x: 64, y: 28 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 60 42 C 64 36 68 38 68 42 C 68 46 63 47 61 46', label: 'Nét 2: Nét râu nhỏ ở góc 1 giờ', startPoint: { x: 60, y: 42 }, direction: 'curve' }
    ]
  },

  // 20. CHỮ P (Pp)
  {
    id: 'p',
    char: 'Pp',
    upperChar: 'P',
    lowerChar: 'p',
    display: 'Chữ P (Pp)',
    name: 'Chữ P (Pp)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Nét 1 gồm nét xiên kết hợp nét thẳng kéo xuống dòng kẻ dưới 2 ô ly. Dừng 0.5s rồi viết tiếp nét 2 là nét móc hai đầu.',
    upperTips: 'Chữ P hoa cao 2.5 ô ly gồm 2 nét: Nét 1 là nét móc ngược trái kéo từ đỉnh xuống dòng 1 uốn móc sang trái; Nét 2 là nét cong trên khép kín ở giữa thân chữ.',
    examples: ['pin', 'phố', 'phù', 'Phong trào'],
    audioInstruction: 'Nét 1: Đặt bút trên dòng kẻ 2, viết nét xiên lên dòng 3 rồi kéo thẳng xuống dưới dòng kẻ 1 hai ô ly. Nét 2: Lia bút lên thân sổ gần dòng 2 viết nét móc hai đầu.',
    upperAudioInstruction: 'Nét 1: Đặt bút ở đỉnh viết nét móc ngược trái xuống dòng 1. Nét 2: Đặt bút từ thân chữ viết nét cong trên khép kín ở giữa thân.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 30 60 L 42 40 L 42 90', label: 'Nét 1: Nét xiên ngắn kết hợp nét sổ thẳng dài xuống dòng dưới', startPoint: { x: 30, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 42 54 C 46 42 64 42 64 54 L 64 74 C 64 80 70 82 76 70', label: 'Nét 2: Nét móc hai đầu dừng ở giữa dòng 1 và 2', startPoint: { x: 42, y: 54 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 36 30 C 33 30 32 34 32 40 L 32 76 C 32 80 26 80 24 74', label: 'Nét 1: Nét móc ngược trái (thân đứng) kéo từ đỉnh xuống dòng 1 và móc sang trái', startPoint: { x: 36, y: 30 }, direction: 'vertical' },
      { id: 2, d: 'M 32 34 C 44 26 66 26 66 42 C 66 52 52 54 32 54', label: 'Nét 2: Nét cong trên khép kín ở giữa thân chữ', startPoint: { x: 32, y: 34 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 30 60 L 42 40 L 42 90', label: 'Nét 1: Nét xiên ngắn kết hợp nét sổ thẳng dài xuống dòng dưới', startPoint: { x: 30, y: 60 }, direction: 'vertical' },
      { id: 2, d: 'M 42 54 C 46 42 64 42 64 54 L 64 74 C 64 80 70 82 76 70', label: 'Nét 2: Nét móc hai đầu dừng ở giữa dòng 1 và 2', startPoint: { x: 42, y: 54 }, direction: 'curve' }
    ]
  },

  // 21. CHỮ Q (Qq)
  {
    id: 'q',
    char: 'Qq',
    upperChar: 'Q',
    lowerChar: 'q',
    display: 'Chữ Q (Qq)',
    name: 'Chữ Q (Qq)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Nét cong kín và nét sổ thẳng dài vươn xuống 2 ô ly dưới dòng kẻ 1.',
    upperTips: 'Chữ Q hoa gồm 2 nét: Nét 1 là thân chữ O hoa cao 2.5 ô ly. Nét 2 là nét lượn sóng mềm mại nằm ngang cắt chân chữ O ở dòng kẻ 1.',
    examples: ['quê', 'quạt', 'quả', 'Quê hương'],
    audioInstruction: 'Nét 1: Nét cong kín. Nét 2: Lia bút lên đường 3, kéo thẳng vượt xuống dưới đường 1 hai ô ly.',
    upperAudioInstruction: 'Nét 1: Viết thân chữ O hoa. Nét 2: Đặt bút trong bụng dưới chữ O, viết nét lượn sóng mềm mại cắt qua chân chữ O ở dòng kẻ 1.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 60 40 L 60 90', label: 'Nét 2: Nét sổ thẳng dài vượt xuống dòng dưới', startPoint: { x: 60, y: 40 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 52 28 C 38 28 30 42 30 54 C 30 72 40 80 52 80 C 64 80 70 72 70 54 C 70 42 64 28 52 28 Z', label: 'Nét 1: Thân O hoa chuẩn 2.5 ô ly', startPoint: { x: 52, y: 28 }, direction: 'curve' },
      { id: 2, d: 'M 44 74 C 48 78 54 83 60 83 C 66 83 70 76 76 74', label: 'Nét 2: Nét lượn sóng mềm mại nằm ngang cắt chân chữ O ở dòng kẻ 1', startPoint: { x: 44, y: 74 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 60 46 C 56 38 34 38 34 60 C 34 78 56 80 60 60 C 60 53 60 46 60 46 Z', label: 'Nét 1: Nét cong kín', startPoint: { x: 60, y: 46 }, direction: 'curve' },
      { id: 2, d: 'M 60 40 L 60 90', label: 'Nét 2: Nét sổ thẳng dài vượt xuống dòng dưới', startPoint: { x: 60, y: 40 }, direction: 'vertical' }
    ]
  },

  // 22. CHỮ R (Rr)
  {
    id: 'r',
    char: 'Rr',
    upperChar: 'R',
    lowerChar: 'r',
    display: 'Chữ R (Rr)',
    name: 'Chữ R (Rr)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 2,
    lowerStrokesCount: 1,
    tips: 'Chữ r thường (cao 1.25 ô ly = 2.25 dòng kẻ): Đặt bút trên dòng kẻ 1, viết nét xiên lượn lên quá dòng kẻ 2, tạo vòng xoắn thắt tròn rõ ràng ở góc trên bên trái, lượn ngang một đoạn ngắn sát đường kẻ rồi uốn cong xuống dòng kẻ 1 và móc ngược lên dừng ở giữa ô ly. Chữ R hoa: Gồm nét móc ngược trái và nét cong trên thắt giữa móc chân phải.',
    examples: ['ra', 'rừng', 'rùa', 'Rạng rỡ'],
    audioInstruction: 'Đặt bút trên dòng kẻ 1, viết nét xiên lượn lên quá dòng kẻ 2, tạo vòng xoắn thắt tròn rõ nét ở góc trên bên trái, lượn ngang một đoạn ngắn sát đường kẻ, rồi uốn lượn cong xuống dòng kẻ 1 và móc ngược lên dừng ở giữa ô ly.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 32 80 C 35 68 42 45 45 35 C 43 30 49 30 52 34 C 54 36 58 36 62 36 C 65 36 66 42 66 54 L 66 74 C 66 80 72 82 78 72', label: 'Nét 1: Nét xiên lượn lên 2.25 dòng kẻ, uốn vòng xoắn thắt tròn ở đỉnh, lượn ngang rồi cong xuống dòng 1 móc ngược lên', startPoint: { x: 32, y: 80 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 38 26 C 34 26 32 30 32 36 L 32 74 C 32 80 26 80 24 74', label: 'Nét 1: Nét móc ngược trái (thân chữ R hoa) lượn cong đầu, kéo thẳng xuống dòng 1 và móc sang trái', startPoint: { x: 38, y: 26 }, direction: 'vertical' },
      { id: 2, d: 'M 32 32 C 42 22 68 22 68 38 C 68 48 58 52 48 52 C 44 52 42 54 44 56 C 50 64 60 74 68 78 C 72 80 76 80 78 74', label: 'Nét 2: Nét cong trên tạo bụng tròn, thắt xoắn nhỏ ngang thân rồi uốn móc lượn chân phải dừng ở dòng 1', startPoint: { x: 32, y: 32 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 32 80 C 35 68 42 45 45 35 C 43 30 49 30 52 34 C 54 36 58 36 62 36 C 65 36 66 42 66 54 L 66 74 C 66 80 72 82 78 72', label: 'Nét 1: Nét xiên lượn lên 2.25 dòng kẻ, uốn vòng xoắn thắt tròn ở đỉnh, lượn ngang rồi cong xuống dòng 1 móc ngược lên', startPoint: { x: 32, y: 80 }, direction: 'curve' }
    ]
  },

  // 23. CHỮ S (Ss)
  {
    id: 's',
    char: 'Ss',
    upperChar: 'S',
    lowerChar: 's',
    display: 'Chữ S (Ss)',
    name: 'Chữ S (Ss)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 1,
    lowerStrokesCount: 1,
    tips: 'Chữ s thường (cao 1.25 ô ly): Đặt bút ở dòng 1, viết nét xiên lượn lên đỉnh cao 1.25 ô ly, tạo vòng xoắn thắt nhỏ rõ nét, lượn cong tròn phồng phần lưng sang phải (bụng tròn đầy mềm mại), đáy uốn lượn cong sang trái sát dòng 1 và dừng bút lượn vào trong. Chữ S hoa: Nét liền mềm mại uốn lượn hình chữ S cổ điển.',
    examples: ['sen', 'sao', 'suối', 'Sáng tạo'],
    audioInstruction: 'Đặt bút ở dòng kẻ 1, viết nét xiên lượn lên đỉnh, tạo một vòng xoắn nhỏ rõ nét, sau đó lượn cong tròn phồng phần lưng sang phải mềm mại, rồi uốn lượn cong đáy sang trái sát dòng kẻ 1 và dừng bút lượn vào trong.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 34 80 C 37 68 44 46 47 35 C 44 30 50 30 53 34 C 64 40 71 48 71 62 C 71 74 60 80 48 80 C 42 80 40 76 44 72', label: 'Nét 1: Nét xiên lượn từ dòng 1 lên đỉnh, uốn xoắn nhỏ ở đỉnh, lượn cong tròn đều lưng sang phải, đáy uốn vào trong sát dòng 1', startPoint: { x: 34, y: 80 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 40 52 C 36 38 42 24 56 24 C 68 24 70 34 62 42 C 54 50 34 54 34 68 C 34 78 46 82 58 82 C 68 82 74 76 76 70', label: 'Nét 1: Nét liền mềm mại kết hợp nét cong dưới, nét cong trên và nét cong trái to bản tròn đều ở dưới', startPoint: { x: 40, y: 52 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 34 80 C 37 68 44 46 47 35 C 44 30 50 30 53 34 C 64 40 71 48 71 62 C 71 74 60 80 48 80 C 42 80 40 76 44 72', label: 'Nét 1: Nét xiên lượn từ dòng 1 lên đỉnh, uốn xoắn nhỏ ở đỉnh, lượn cong tròn đều lưng sang phải, đáy uốn vào trong sát dòng 1', startPoint: { x: 34, y: 80 }, direction: 'curve' }
    ]
  },

  // 24. CHỮ T (Tt)
  {
    id: 't',
    char: 'Tt',
    upperChar: 'T',
    lowerChar: 't',
    display: 'Chữ T (Tt)',
    name: 'Chữ T (Tt)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 1,
    lowerStrokesCount: 3,
    tips: 'Nét hất, nét móc ngược cao 1.5 ô ly và nét gạch ngang ngắn.',
    upperTips: 'Chữ T hoa là một nét liền mềm mại kết hợp nét cong trái nhỏ, nét lượn ngang ở đỉnh và nét lượn dọc kéo xuống dòng 1 rồi uốn móc sang trái.',
    examples: ['tay', 'to', 'tre', 'Tương lai'],
    audioInstruction: 'Nét 1: Nét hất ngắn. Nét 2: Nét móc ngược cao 1.5 ô ly. Nét 3: Nét gạch ngang ngắn ở dòng kẻ 3.',
    upperAudioInstruction: 'Đặt bút giữa dòng 2 và 3, lượn cong lên đỉnh tạo nét lượn ngang mềm mại, sau đó đổi chiều lượn dọc xuống dòng kẻ 1 rồi uốn móc ngược sang trái.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 34 60 L 48 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 34, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 48 30 L 48 74 C 48 80 56 82 62 68', label: 'Nét 2: Nét móc ngược cao 1.5 ô ly', startPoint: { x: 48, y: 30 }, direction: 'vertical' },
      { id: 3, d: 'M 38 40 L 58 40', label: 'Nét 3: Nét gạch ngang ngắn', startPoint: { x: 38, y: 40 }, direction: 'horizontal' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 34 38 C 36 30 44 28 50 28 C 58 28 66 28 72 32 C 64 34 52 34 50 42 L 50 74 C 50 80 42 82 34 76', label: 'Nét 1: Nét lượn ngang đầu và thân móc ngược hoa cao 2.5 ô ly', startPoint: { x: 34, y: 38 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 34 60 L 48 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 34, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 48 30 L 48 74 C 48 80 56 82 62 68', label: 'Nét 2: Nét móc ngược cao 1.5 ô ly', startPoint: { x: 48, y: 30 }, direction: 'vertical' },
      { id: 3, d: 'M 38 40 L 58 40', label: 'Nét 3: Nét gạch ngang ngắn', startPoint: { x: 38, y: 40 }, direction: 'horizontal' }
    ]
  },

  // 25. CHỮ U (Uu)
  {
    id: 'u',
    char: 'Uu',
    upperChar: 'U',
    lowerChar: 'u',
    display: 'Chữ U (Uu)',
    name: 'Chữ U (Uu)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 2,
    lowerStrokesCount: 3,
    tips: 'Nét hất và 2 nét móc ngược nối liền liên tục, nhịp nhàng.',
    upperTips: 'Chữ U hoa cao 2.5 ô ly gồm 2 nét: Nét 1 là nét móc hai đầu lượn từ đỉnh xuống dòng 1 vươn lên đỉnh. Nét 2 là nét móc ngược phải kéo từ đỉnh xuống dòng 1 móc nhẹ lên.',
    examples: ['uống', 'vui', 'bụi', 'Uốn nắn'],
    audioInstruction: 'Nét 1: Nét hất ngắn. Nét 2: Nét móc ngược 1. Nét 3: Nét móc ngược 2 kết thúc ở dòng 2.',
    upperAudioInstruction: 'Nét 1: Đặt bút giữa dòng 2 và 3 lượn lên đỉnh, kéo xuống dòng 1 uốn lượn đáy rộng vươn lên đỉnh. Nét 2: Từ đỉnh kéo thẳng xuống dòng 1 viết nét móc ngược phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 48 82 56 74 L 56 40', label: 'Nét 2: Nét móc ngược 1', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 56 40 L 56 74 C 56 80 64 82 70 68', label: 'Nét 3: Nét móc ngược 2', startPoint: { x: 56, y: 40 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 30 38 C 32 30 36 28 40 30 L 36 68 C 36 78 44 80 52 80 C 60 80 64 74 64 54 L 64 28', label: 'Nét 1: Thân lượn móc chữ U hoa cao 2.5 ô ly', startPoint: { x: 30, y: 38 }, direction: 'curve' },
      { id: 2, d: 'M 64 28 L 64 74 C 64 80 70 82 76 72', label: 'Nét 2: Nét móc ngược phải từ đỉnh xuống dòng 1', startPoint: { x: 64, y: 28 }, direction: 'vertical' }
    ],
    strokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 48 82 56 74 L 56 40', label: 'Nét 2: Nét móc ngược 1', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 56 40 L 56 74 C 56 80 64 82 70 68', label: 'Nét 3: Nét móc ngược 2', startPoint: { x: 56, y: 40 }, direction: 'vertical' }
    ]
  },

  // 26. CHỮ Ư (Ưư)
  {
    id: 'ư',
    char: 'Ưư',
    upperChar: 'Ư',
    lowerChar: 'ư',
    display: 'Chữ Ư (Ưư)',
    name: 'Chữ Ư (Ưư)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 4,
    strokesCount: 4,
    upperStrokesCount: 3,
    lowerStrokesCount: 4,
    tips: 'Viết thân chữ u rồi thêm nét râu nhỏ ở góc trên bên phải con chữ.',
    upperTips: 'Chữ Ư hoa gồm thân chữ U hoa cao 2.5 ô ly và nét râu nhỏ ở góc trên bên phải con chữ.',
    examples: ['ưa', 'mực', 'thư', 'Ước mơ'],
    audioInstruction: 'Nét 1: Nét hất ngắn. Nét 2: Nét móc ngược 1. Nét 3: Nét móc ngược 2. Nét 4: Nét râu nhỏ ở góc trên bên phải.',
    upperAudioInstruction: 'Nét 1: Viết thân lượn móc của chữ U. Nét 2: Viết nét móc ngược phải. Nét 3: Viết nét râu nhỏ ở góc trên bên phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 48 82 56 74 L 56 40', label: 'Nét 2: Nét móc ngược 1', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 56 40 L 56 74 C 56 80 64 82 70 68', label: 'Nét 3: Nét móc ngược 2', startPoint: { x: 56, y: 40 }, direction: 'vertical' },
      { id: 4, d: 'M 56 40 C 60 34 64 36 64 40 C 64 44 59 45 57 44', label: 'Nét 4: Nét râu nhỏ ở góc trên phải', startPoint: { x: 56, y: 40 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 30 38 C 32 30 36 28 40 30 L 36 68 C 36 78 44 80 52 80 C 60 80 64 74 64 54 L 64 28', label: 'Nét 1: Thân lượn móc chữ U hoa', startPoint: { x: 30, y: 38 }, direction: 'curve' },
      { id: 2, d: 'M 64 28 L 64 74 C 64 80 70 82 76 72', label: 'Nét 2: Nét móc ngược phải', startPoint: { x: 64, y: 28 }, direction: 'vertical' },
      { id: 3, d: 'M 65 28 C 71 20 77 22 77 26 C 77 30 71 32 68 30', label: 'Nét 3: Nét râu chữ hoa ở góc trên bên phải', startPoint: { x: 65, y: 28 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 48 82 56 74 L 56 40', label: 'Nét 2: Nét móc ngược 1', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 56 40 L 56 74 C 56 80 64 82 70 68', label: 'Nét 3: Nét móc ngược 2', startPoint: { x: 56, y: 40 }, direction: 'vertical' },
      { id: 4, d: 'M 56 40 C 60 34 64 36 64 40 C 64 44 59 45 57 44', label: 'Nét 4: Nét râu nhỏ ở góc trên phải', startPoint: { x: 56, y: 40 }, direction: 'curve' }
    ]
  },

  // 27. CHỮ V (Vv)
  {
    id: 'v',
    char: 'Vv',
    upperChar: 'V',
    lowerChar: 'v',
    display: 'Chữ V (Vv)',
    name: 'Chữ V (Vv)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 1,
    strokesCount: 1,
    upperStrokesCount: 2,
    lowerStrokesCount: 1,
    tips: 'Nét móc xuôi nối nét móc ngược uốn lượn thắt nhỏ ở dòng 3.',
    upperTips: 'Chữ V hoa cao 2.5 ô ly gồm 2 nét uốn lượn mềm mại: Nét 1 lượn cong từ đỉnh xuống dòng 1; Nét 2 lượn nghiêng từ chân dòng 1 vươn lên đỉnh uốn móc nhẹ sang phải.',
    examples: ['vui', 'vườn', 've', 'Việt Nam'],
    audioInstruction: 'Đặt bút giữa dòng 2 và 3, uốn cong chạm dòng 3, kéo thẳng xuống dòng 1 rồi uốn móc ngược lên dòng 3 thắt nhỏ.',
    upperAudioInstruction: 'Nét 1: Đặt bút giữa dòng 2 và 3 lượn lên đỉnh rồi lượn nghiêng xuống dòng kẻ 1. Nét 2: Từ chân dòng 1 lượn nghiêng vươn lên đỉnh uốn móc nhẹ sang phải.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 32 50 C 36 40 46 40 46 54 L 46 72 C 46 80 54 82 60 74 L 64 44 C 65 40 70 40 72 44', label: 'Nét 1: Nét móc xuôi nối móc ngược uốn thắt nhỏ', startPoint: { x: 32, y: 50 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 28 38 C 30 30 36 28 40 30 C 44 32 46 54 48 80', label: 'Nét 1: Nét lượn nghiêng trái từ đỉnh xuống dòng 1', startPoint: { x: 28, y: 38 }, direction: 'curve' },
      { id: 2, d: 'M 48 80 C 50 78 58 54 66 32 C 68 28 72 28 74 34', label: 'Nét 2: Nét lượn nghiêng phải vươn lên đỉnh uốn móc nhẹ', startPoint: { x: 48, y: 80 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 32 50 C 36 40 46 40 46 54 L 46 72 C 46 80 54 82 60 74 L 64 44 C 65 40 70 40 72 44', label: 'Nét 1: Nét móc xuôi nối móc ngược uốn thắt nhỏ', startPoint: { x: 32, y: 50 }, direction: 'curve' }
    ]
  },

  // 28. CHỮ X (Xx)
  {
    id: 'x',
    char: 'Xx',
    upperChar: 'X',
    lowerChar: 'x',
    display: 'Chữ X (Xx)',
    name: 'Chữ X (Xx)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 2,
    strokesCount: 2,
    upperStrokesCount: 2,
    lowerStrokesCount: 2,
    tips: 'Chữ x thường gồm đúng 2 nét cong hở riêng biệt tựa lưng nhau: Nét 1 (nửa trái) đặt bút dưới dòng kẻ ngang 3, lượn cong sang trái rồi lượn xuống dòng kẻ 1, móc lên 1/2 ô ly. Nét 2 (nửa phải) lia bút sang phải, đặt bút dưới dòng kẻ ngang 3, lượn cong tựa nhẹ phần lưng vào nét 1 ở đúng giữa thân chữ trên dòng kẻ 2 rồi lượn xuống dòng kẻ 1 móc lên. Chữ X hoa gồm 2 nét cong hở hoa tựa lưng nhau tương tự.',
    upperTips: 'Chữ X hoa gồm 2 nét cong hở hoa tựa lưng nhau trên đường kẻ 2: Nét 1 lượn cong hở phải từ đỉnh xuống dòng 1; Nét 2 đặt bút ở đỉnh lượn cong tựa nhẹ phần lưng vào nét 1 ở đúng giữa thân chữ rồi xuống dòng 1 móc lên.',
    examples: ['xe', 'xuân', 'xanh', 'Xinh xắn'],
    audioInstruction: 'Nét 1: Đặt bút dưới đường kẻ ngang 3, uốn cong lượn tròn sang trái rồi lượn xuống dòng kẻ 1, móc lên dừng ở giữa ô ly. Nét 2: Lia bút sang phải, đặt bút dưới đường kẻ ngang 3, viết nét cong tựa nhẹ phần lưng vào nét 1 ở đúng giữa thân chữ trên đường kẻ 2 rồi lượn xuống dòng 1 móc lên.',
    upperAudioInstruction: 'Nét 1: Đặt bút ở đỉnh 2.5 ô ly viết nét cong hở phải xuống dòng 1. Nét 2: Lia bút sang phải, viết nét cong tựa lưng nhẹ vào nét 1 ở đúng giữa thân chữ trên dòng 2 rồi uốn xuống dòng 1.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 36 45 C 40 40 49.5 48 49.5 60 C 49.5 72 40 80 35 74', label: 'Nét 1: Nét cong hở nửa trái (đặt bút dưới dòng 3, lượn cong xuống dòng 1 móc lên)', startPoint: { x: 36, y: 45 }, direction: 'curve' },
      { id: 2, d: 'M 64 45 C 60 40 50.5 48 50.5 60 C 50.5 72 60 80 65 74', label: 'Nét 2: Nét cong hở nửa phải (đặt bút dưới dòng 3, lưng tựa nhẹ vào nét 1 ở giữa thân trên dòng 2, xuống dòng 1 móc lên)', startPoint: { x: 64, y: 45 }, direction: 'curve' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 30 30 C 36 24 49.5 38 49.5 54 C 49.5 70 36 80 28 74', label: 'Nét 1: Nét cong hở hoa nửa trái', startPoint: { x: 30, y: 30 }, direction: 'curve' },
      { id: 2, d: 'M 70 30 C 64 24 50.5 38 50.5 54 C 50.5 70 64 80 72 74', label: 'Nét 2: Nét cong hở hoa nửa phải tựa lưng vào nét 1 ở giữa thân', startPoint: { x: 70, y: 30 }, direction: 'curve' }
    ],
    strokes: [
      { id: 1, d: 'M 36 45 C 40 40 49.5 48 49.5 60 C 49.5 72 40 80 35 74', label: 'Nét 1: Nét cong hở nửa trái (đặt bút dưới dòng 3, lượn cong xuống dòng 1 móc lên)', startPoint: { x: 36, y: 45 }, direction: 'curve' },
      { id: 2, d: 'M 64 45 C 60 40 50.5 48 50.5 60 C 50.5 72 60 80 65 74', label: 'Nét 2: Nét cong hở nửa phải (đặt bút dưới dòng 3, lưng tựa nhẹ vào nét 1 ở giữa thân trên dòng 2, xuống dòng 1 móc lên)', startPoint: { x: 64, y: 45 }, direction: 'curve' }
    ]
  },

  // 29. CHỮ Y (Yy)
  {
    id: 'y',
    char: 'Yy',
    upperChar: 'Y',
    lowerChar: 'y',
    display: 'Chữ Y (Yy)',
    name: 'Chữ Y (Yy)',
    language: 'vi',
    category: 'letters',
    totalStrokes: 3,
    strokesCount: 3,
    upperStrokesCount: 2,
    lowerStrokesCount: 3,
    tips: 'Nét hất, nét móc ngược và nét khuyết dưới dài 2.5 ô ly.',
    upperTips: 'Chữ Y hoa gồm 2 nét: Nét 1 là thân lượn trên cao 2.5 ô ly dừng ở dòng 2. Nét 2 là nét khuyết dưới dài kéo sâu 1.5 ô ly dưới dòng kẻ 1 rồi lượn móc lên.',
    examples: ['yêu', 'ngày', 'mây', 'Ý chí'],
    audioInstruction: 'Nét 1: Nét hất ngắn. Nét 2: Nét móc ngược. Nét 3: Nét khuyết dưới dài 2.5 ô ly vươn xuống dưới dòng 1.',
    upperAudioInstruction: 'Nét 1: Viết thân lượn trên dừng ở dòng kẻ 2. Nét 2: Từ đỉnh kéo thẳng xuống sâu 1.5 ô ly dưới dòng kẻ 1, uốn khuyết sang trái hất lên.',
    gridType: 'oly_vi',
    lowerStrokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 50 82 58 74 L 58 40', label: 'Nét 2: Nét móc ngược', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 58 40 L 58 90 C 58 98 44 98 38 90 C 34 82 48 72 66 65', label: 'Nét 3: Nét khuyết dưới dài 2.5 ô ly', startPoint: { x: 58, y: 40 }, direction: 'vertical' }
    ],
    upperStrokes: [
      { id: 1, d: 'M 30 38 C 32 30 36 28 40 30 L 36 52 C 36 60 44 64 50 64 C 58 64 64 58 64 48 L 64 28', label: 'Nét 1: Thân lượn trên chữ Y hoa', startPoint: { x: 30, y: 38 }, direction: 'curve' },
      { id: 2, d: 'M 64 28 L 64 90 C 64 98 48 98 44 90 C 40 82 54 72 74 68', label: 'Nét 2: Nét khuyết dưới dài 2.5 ô ly vươn sâu dưới dòng 1', startPoint: { x: 64, y: 28 }, direction: 'vertical' }
    ],
    strokes: [
      { id: 1, d: 'M 28 60 L 40 40', label: 'Nét 1: Nét hất ngắn', startPoint: { x: 28, y: 60 }, direction: 'slanted_right' },
      { id: 2, d: 'M 40 40 L 40 74 C 40 80 50 82 58 74 L 58 40', label: 'Nét 2: Nét móc ngược', startPoint: { x: 40, y: 40 }, direction: 'curve' },
      { id: 3, d: 'M 58 40 L 58 90 C 58 98 44 98 38 90 C 34 82 48 72 66 65', label: 'Nét 3: Nét khuyết dưới dài 2.5 ô ly', startPoint: { x: 58, y: 40 }, direction: 'vertical' }
    ]
  }
];

// =========================================================================
// TỪ ĐIỂN TRA CỨU CHUẨN HÓA UNICODE NFC (VIETNAMESE_ALPHABET_DICT)
// =========================================================================
export const VIETNAMESE_ALPHABET_DICT: Record<string, VietnameseLetterData> = {};

VIETNAMESE_29_LETTERS.forEach((item) => {
  const lowerKey = item.lowerChar.normalize('NFC');
  const upperKey = item.upperChar.normalize('NFC');
  const comboKey = item.char.normalize('NFC');

  VIETNAMESE_ALPHABET_DICT[item.id] = item;
  VIETNAMESE_ALPHABET_DICT[lowerKey] = item;
  VIETNAMESE_ALPHABET_DICT[upperKey] = item;
  VIETNAMESE_ALPHABET_DICT[comboKey] = item;

  // Also index NFD variants to protect against input encoding inconsistencies
  VIETNAMESE_ALPHABET_DICT[lowerKey.normalize('NFD')] = item;
  VIETNAMESE_ALPHABET_DICT[upperKey.normalize('NFD')] = item;
  VIETNAMESE_ALPHABET_DICT[comboKey.normalize('NFD')] = item;
});

// Alias according to user specification
export const vietnameseAlphabet = VIETNAMESE_ALPHABET_DICT;
export const vietnameseAlphabetData = VIETNAMESE_29_LETTERS;

/**
 * Tra cứu thông tin ký tự tiếng Việt chuẩn xác theo Unicode NFC.
 * TUYỆT ĐỐI KHÔNG fallback về chữ "ă" hay "I" khi tìm không thấy!
 */
export function getLetterData(char?: string | null): VietnameseLetterData | null {
  if (!char || typeof char !== 'string') {
    console.warn('[Luyện Chữ AR] getLetterData: Ký tự rỗng hoặc không hợp lệ:', char);
    return null;
  }

  const trimmed = char.trim();
  if (!trimmed) return null;

  const nfc = trimmed.normalize('NFC');
  const lowerNFC = nfc.toLowerCase();

  // 1. Direct lowercase match
  if (VIETNAMESE_ALPHABET_DICT[lowerNFC]) {
    return VIETNAMESE_ALPHABET_DICT[lowerNFC];
  }

  // 2. Direct exact match
  if (VIETNAMESE_ALPHABET_DICT[nfc]) {
    return VIETNAMESE_ALPHABET_DICT[nfc];
  }

  // 3. First code point match
  const firstChar = Array.from(lowerNFC)[0];
  if (firstChar && VIETNAMESE_ALPHABET_DICT[firstChar]) {
    return VIETNAMESE_ALPHABET_DICT[firstChar];
  }

  // 4. In case character is not found, log clear warning without deceptive fallbacks!
  console.warn(`[Luyện Chữ AR] Không tìm thấy dữ liệu nét cho ký tự: "${char}" (NFC: "${nfc}")`);
  return null;
}
