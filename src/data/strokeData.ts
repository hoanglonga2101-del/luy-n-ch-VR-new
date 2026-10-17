import { StrokePath } from '../types';
import { VIETNAMESE_29_LETTERS, getLetterData } from './vietnameseAlphabetData';

// Vietnamese ă (lower) - 3 strokes: Nét cong kín, Nét móc ngược, Nét cong dưới nhỏ (dấu trăng khuyết)
export const STROKES_A_BREVE_LOWER: StrokePath[] = [
  { 
    id: 1, 
    d: 'M 62 46 C 58 38 38 38 38 60 C 38 78 58 80 62 60 C 62 53 62 46 62 46 Z', 
    label: 'Nét 1: Nét cong kín (đặt bút dưới dòng kẻ ngang 3, lượn cong sang trái xuống dòng kẻ 1 và khép kín)', 
    startPoint: { x: 62, y: 46 }, 
    direction: 'curve' 
  },
  { 
    id: 2, 
    d: 'M 62 40 L 62 74 C 62 80 70 82 76 65', 
    label: 'Nét 2: Nét móc ngược (đặt bút trên dòng kẻ ngang 3 sát nét cong, kéo thẳng xuống dòng kẻ 1 rồi uốn móc lên)', 
    startPoint: { x: 62, y: 40 }, 
    direction: 'vertical' 
  },
  { 
    id: 3, 
    d: 'M 41 26 C 44 33 56 33 59 26', 
    label: 'Nét 3: Nét cong dưới nhỏ (dấu trăng khuyết / dấu á - úp trên đầu con chữ, nằm giữa dòng kẻ 3 và 4, cân đối giữa thân chữ)', 
    startPoint: { x: 41, y: 26 }, 
    direction: 'curve' 
  }
];

// Vietnamese Ă (upper) - 3 strokes: Nét lượn nghiêng trái, Nét thẳng nghiêng phải kết hợp nét lượn ngang, Dấu trăng khuyết
export const STROKES_A_BREVE_UPPER: StrokePath[] = [
  { 
    id: 1, 
    d: 'M 26 78 C 32 75 42 50 50 24', 
    label: 'Nét 1: Nét lượn nghiêng trái (thân chữ A hoa)', 
    startPoint: { x: 26, y: 78 }, 
    direction: 'slanted_left' 
  },
  { 
    id: 2, 
    d: 'M 50 24 L 76 80 M 34 56 C 44 52 56 52 66 56', 
    label: 'Nét 2: Nét thẳng nghiêng phải kết hợp nét lượn ngang thân', 
    startPoint: { x: 50, y: 24 }, 
    direction: 'slanted_right' 
  },
  { 
    id: 3, 
    d: 'M 40 10 C 44 18 56 18 60 10', 
    label: 'Nét 3: Dấu trăng khuyết phía trên đỉnh đầu', 
    startPoint: { x: 40, y: 10 }, 
    direction: 'curve' 
  }
];

// Vietnamese x (lower) - QĐ 31/2002/QĐ-BGDĐT: 2 nét cong hở riêng biệt tựa lưng nhau
export const STROKES_X_LOWER: StrokePath[] = [
  {
    id: 1,
    d: 'M 36 45 C 40 40 49.5 48 49.5 60 C 49.5 72 40 80 35 74',
    label: 'Nét 1: Nét cong hở nửa trái (đặt bút dưới dòng 3, lượn cong xuống dòng 1 móc lên 1/2 ô ly)',
    startPoint: { x: 36, y: 45 },
    direction: 'curve'
  },
  {
    id: 2,
    d: 'M 64 45 C 60 40 50.5 48 50.5 60 C 50.5 72 60 80 65 74',
    label: 'Nét 2: Nét cong hở nửa phải (đặt bút dưới dòng 3, lưng tựa nhẹ vào nét 1 ở giữa thân trên dòng 2, xuống dòng 1 móc lên)',
    startPoint: { x: 64, y: 45 },
    direction: 'curve'
  }
];

// Vietnamese X (upper) - 2 nét cong hở hoa tựa lưng nhau
export const STROKES_X_UPPER: StrokePath[] = [
  {
    id: 1,
    d: 'M 30 28 C 36 22 49.5 36 49.5 52 C 49.5 68 36 80 28 72',
    label: 'Nét 1: Nét cong hở hoa nửa trái',
    startPoint: { x: 30, y: 28 },
    direction: 'curve'
  },
  {
    id: 2,
    d: 'M 70 28 C 64 22 50.5 36 50.5 52 C 50.5 68 64 80 72 72',
    label: 'Nét 2: Nét cong hở hoa nửa phải tựa lưng nhẹ vào nét 1 ở giữa thân',
    startPoint: { x: 70, y: 28 },
    direction: 'curve'
  }
];

// Vietnamese r (lower) - QĐ 31/2002/QĐ-BGDĐT: Nét xiên cao 1.25 ô ly, xoắn thắt nhỏ ở đỉnh, lượn ngang rồi cong xuống dòng 1 móc lên
export const STROKES_R_LOWER: StrokePath[] = [
  {
    id: 1,
    d: 'M 32 80 C 35 68 42 45 45 35 C 43 30 49 30 52 34 C 54 36 58 36 62 36 C 65 36 66 42 66 54 L 66 74 C 66 80 72 82 78 72',
    label: 'Nét 1: Nét xiên lượn lên 2.25 dòng kẻ, uốn vòng xoắn thắt tròn ở đỉnh, lượn ngang rồi cong xuống dòng 1 móc ngược lên',
    startPoint: { x: 32, y: 80 },
    direction: 'curve'
  }
];

// Vietnamese R (upper) - QĐ 31/2002/QĐ-BGDĐT: Nét móc ngược trái và nét cong trên thắt giữa móc chân phải
export const STROKES_R_UPPER: StrokePath[] = [
  {
    id: 1,
    d: 'M 38 26 C 34 26 32 30 32 36 L 32 74 C 32 80 26 80 24 74',
    label: 'Nét 1: Nét móc ngược trái (thân chữ R hoa) lượn cong đầu, kéo thẳng xuống dòng 1 và móc sang trái',
    startPoint: { x: 38, y: 26 },
    direction: 'vertical'
  },
  {
    id: 2,
    d: 'M 32 32 C 42 22 68 22 68 38 C 68 48 58 52 48 52 C 44 52 42 54 44 56 C 50 64 60 74 68 78 C 72 80 76 80 78 74',
    label: 'Nét 2: Nét cong trên tạo bụng tròn, thắt xoắn nhỏ ngang thân rồi uốn móc lượn chân phải dừng ở dòng 1',
    startPoint: { x: 32, y: 32 },
    direction: 'curve'
  }
];

// Vietnamese s (lower) - QĐ 31/2002/QĐ-BGDĐT: Xiên lượn cao 1.25 ô ly, xoắn thắt nhỏ ở đỉnh, lưng tròn mềm mại, đáy lượn vào trong sát dòng 1
export const STROKES_S_LOWER: StrokePath[] = [
  {
    id: 1,
    d: 'M 34 80 C 37 68 44 46 47 35 C 44 30 50 30 53 34 C 64 40 71 48 71 62 C 71 74 60 80 48 80 C 42 80 40 76 44 72',
    label: 'Nét 1: Nét xiên lượn từ dòng 1 lên đỉnh, uốn xoắn nhỏ ở đỉnh, lượn cong tròn đều lưng sang phải, đáy uốn vào trong sát dòng 1',
    startPoint: { x: 34, y: 80 },
    direction: 'curve'
  }
];

// Vietnamese S (upper) - QĐ 31/2002/QĐ-BGDĐT: Nét liền mềm mại kết hợp cong dưới, cong trên và cong trái tròn đều ở dưới
export const STROKES_S_UPPER: StrokePath[] = [
  {
    id: 1,
    d: 'M 40 52 C 36 38 42 24 56 24 C 68 24 70 34 62 42 C 54 50 34 54 34 68 C 34 78 46 82 58 82 C 68 82 74 76 76 70',
    label: 'Nét 1: Nét liền mềm mại kết hợp nét cong dưới, nét cong trên và nét cong trái to bản tròn đều ở dưới',
    startPoint: { x: 40, y: 52 },
    direction: 'curve'
  }
];

// Vietnamese K (upper) - QĐ 31/2002/QĐ-BGDĐT: Nét 1 móc ngược trái thân đứng; Nét 2 móc hai đầu thắt giữa xoắn sát thân nét 1 rồi móc ngược phải
export const STROKES_K_UPPER: StrokePath[] = [
  {
    id: 1,
    d: 'M 36 28 C 30 28 29 34 29 42 L 29 72 C 29 78 23 80 20 74',
    label: 'Nét 1: Nét cong lượn kết hợp nét móc ngược trái (thân chữ K hoa cao 2.5 ô ly)',
    startPoint: { x: 36, y: 28 },
    direction: 'vertical'
  },
  {
    id: 2,
    d: 'M 68 28 C 58 32 46 44 38 52 C 33 50 33 46 37 46 C 42 46 44 51 40 56 C 46 64 56 76 64 78 C 70 80 74 76 74 66',
    label: 'Nét 2: Nét móc hai đầu thắt giữa: từ đỉnh lượn xuống tạo vòng xoắn thắt nhỏ sát thân nét 1 rồi lượn chéo xuống dòng 1 móc ngược lên',
    startPoint: { x: 68, y: 28 },
    direction: 'curve'
  }
];

// Pre-defined detailed stroke order paths for key representative characters in each script
// Coordinates normalized to 100x100 box
export const CHARACTER_STROKE_DATA: Record<string, StrokePath[]> = {
  // Vietnamese Primary Letter Exports
  'ă': STROKES_A_BREVE_LOWER,
  'Ă': STROKES_A_BREVE_UPPER,
  'Ăă': STROKES_A_BREVE_LOWER,
  'x': STROKES_X_LOWER,
  'X': STROKES_X_UPPER,
  'Xx': STROKES_X_LOWER,
  'r': STROKES_R_LOWER,
  'R': STROKES_R_UPPER,
  'Rr': STROKES_R_LOWER,
  's': STROKES_S_LOWER,
  'S': STROKES_S_UPPER,
  'Ss': STROKES_S_LOWER,
  'K': STROKES_K_UPPER,
  'Kk': STROKES_K_UPPER,

  // Chinese Basic Strokes (Vĩnh Tự Bát Pháp)
  '一': [
    { id: 1, d: 'M 18 50 C 35 48 65 48 82 50', label: 'Nét 1: 横 (Héng) - Ngang từ trái sang phải', startPoint: { x: 18, y: 50 }, direction: 'horizontal' }
  ],
  '二': [
    { id: 1, d: 'M 30 36 L 70 36', label: 'Nét 1: 横 (Héng ngắn trên)', startPoint: { x: 30, y: 36 }, direction: 'horizontal' },
    { id: 2, d: 'M 18 64 L 82 64', label: 'Nét 2: 横 (Héng dài dưới)', startPoint: { x: 18, y: 64 }, direction: 'horizontal' }
  ],
  '三': [
    { id: 1, d: 'M 28 28 L 72 28', label: 'Nét 1: 横 (Héng trên)', startPoint: { x: 28, y: 28 }, direction: 'horizontal' },
    { id: 2, d: 'M 35 50 L 65 50', label: 'Nét 2: 横 (Héng giữa ngắn)', startPoint: { x: 35, y: 50 }, direction: 'horizontal' },
    { id: 3, d: 'M 18 72 L 82 72', label: 'Nét 3: 横 (Héng dưới dài nhất)', startPoint: { x: 18, y: 72 }, direction: 'horizontal' }
  ],
  '人': [
    { id: 1, d: 'M 50 18 C 45 42 35 65 18 82', label: 'Nét 1: 撇 (Piě) - Phẩy từ trên chếch xuống trái', startPoint: { x: 50, y: 18 }, direction: 'slanted_left' },
    { id: 2, d: 'M 42 42 C 55 58 68 72 84 82', label: 'Nét 2: 捺 (Nà) - Mác từ trái chếch xuống phải', startPoint: { x: 42, y: 42 }, direction: 'slanted_right' }
  ],
  '大': [
    { id: 1, d: 'M 18 40 L 82 40', label: 'Nét 1: 横 (Héng) - Ngang', startPoint: { x: 18, y: 40 }, direction: 'horizontal' },
    { id: 2, d: 'M 50 20 C 48 45 38 68 20 84', label: 'Nét 2: 撇 (Piě) - Phẩy dài qua nét ngang', startPoint: { x: 50, y: 20 }, direction: 'slanted_left' },
    { id: 3, d: 'M 46 44 C 58 60 70 74 84 84', label: 'Nét 3: 捺 (Nà) - Mác choãi chân phải', startPoint: { x: 46, y: 44 }, direction: 'slanted_right' }
  ],
  '中': [
    { id: 1, d: 'M 25 32 L 25 68', label: 'Nét 1: 竖 (Shù) - Sổ thân trái', startPoint: { x: 25, y: 32 }, direction: 'vertical' },
    { id: 2, d: 'M 25 32 L 75 32 L 75 68', label: 'Nét 2: 横折 (Héngzhé) - Ngang gập', startPoint: { x: 25, y: 32 }, direction: 'hook' },
    { id: 3, d: 'M 25 68 L 75 68', label: 'Nét 3: 横 (Héng) - Ngang đáy đóng khung', startPoint: { x: 25, y: 68 }, direction: 'horizontal' },
    { id: 4, d: 'M 50 14 L 50 86', label: 'Nét 4: 竖 (Shù dài) - Sổ xuyên tâm ở giữa', startPoint: { x: 50, y: 14 }, direction: 'vertical' }
  ],
  '日': [
    { id: 1, d: 'M 28 20 L 28 80', label: 'Nét 1: 竖 (Shù) - Sổ trái', startPoint: { x: 28, y: 20 }, direction: 'vertical' },
    { id: 2, d: 'M 28 20 L 72 20 L 72 80', label: 'Nét 2: 横折 (Héngzhé) - Ngang gập', startPoint: { x: 28, y: 20 }, direction: 'hook' },
    { id: 3, d: 'M 28 50 L 72 50', label: 'Nét 3: 横 (Héng) - Ngang giữa', startPoint: { x: 28, y: 50 }, direction: 'horizontal' },
    { id: 4, d: 'M 28 80 L 72 80', label: 'Nét 4: 横 (Héng) - Ngang đóng đáy', startPoint: { x: 28, y: 80 }, direction: 'horizontal' }
  ],
  '月': [
    { id: 1, d: 'M 30 20 C 30 45 28 72 20 85', label: 'Nét 1: 撇 (Piě) - Phẩy thân trái', startPoint: { x: 30, y: 20 }, direction: 'slanted_left' },
    { id: 2, d: 'M 30 20 L 72 20 L 72 82 C 72 85 68 85 64 80', label: 'Nét 2: 横折钩 (Héngzhégōu) - Ngang gập móc', startPoint: { x: 30, y: 20 }, direction: 'hook' },
    { id: 3, d: 'M 30 42 L 72 42', label: 'Nét 3: 横 (Héng) - Ngang trên', startPoint: { x: 30, y: 42 }, direction: 'horizontal' },
    { id: 4, d: 'M 30 62 L 72 62', label: 'Nét 4: 横 (Héng) - Ngang dưới', startPoint: { x: 30, y: 62 }, direction: 'horizontal' }
  ],
  '学': [
    { id: 1, d: 'M 32 20 L 38 28', label: 'Nét 1: 点 (Diǎn trái)', startPoint: { x: 32, y: 20 }, direction: 'slanted_right' },
    { id: 2, d: 'M 50 16 L 50 26', label: 'Nét 2: 点 (Diǎn giữa)', startPoint: { x: 50, y: 16 }, direction: 'vertical' },
    { id: 3, d: 'M 68 18 L 62 26', label: 'Nét 3: 撇 (Piě phải)', startPoint: { x: 68, y: 18 }, direction: 'slanted_left' },
    { id: 4, d: 'M 24 36 L 24 44', label: 'Nét 4: 点/竖 (Mái nhà trái)', startPoint: { x: 24, y: 36 }, direction: 'vertical' },
    { id: 5, d: 'M 24 38 L 76 38 L 72 46', label: 'Nét 5: 横撇/横钩 (Mái nhà gập)', startPoint: { x: 24, y: 38 }, direction: 'hook' },
    { id: 6, d: 'M 45 46 L 55 46 L 42 62 L 56 62 C 58 62 60 64 60 70 C 60 84 48 86 36 80', label: 'Nét 6: 横折弯钩 (Bộ Tử cong móc)', startPoint: { x: 45, y: 46 }, direction: 'curve' },
    { id: 7, d: 'M 22 66 L 78 66', label: 'Nét 7: 横 (Ngang dài bộ Tử)', startPoint: { x: 22, y: 66 }, direction: 'horizontal' }
  ],

  // Japanese Hiragana
  'あ': [
    { id: 1, d: 'M 28 32 C 45 28 65 30 72 32', label: 'Nét 1: Nét ngang trên (trái sang phải)', startPoint: { x: 28, y: 32 }, direction: 'horizontal' },
    { id: 2, d: 'M 50 18 C 50 45 48 70 45 84', label: 'Nét 2: Nét sổ hơi uốn lượn xuyên qua nét ngang', startPoint: { x: 50, y: 18 }, direction: 'vertical' },
    { id: 3, d: 'M 60 44 C 45 38 25 50 30 70 C 35 84 62 88 74 72 C 84 58 75 45 60 48', label: 'Nét 3: Nét xoắn vòng cung tròn mềm mại', startPoint: { x: 60, y: 44 }, direction: 'curve' }
  ],
  'い': [
    { id: 1, d: 'M 35 28 C 30 48 30 65 36 78 C 38 82 42 80 44 74', label: 'Nét 1: Nét cong trái có móc hất ngược', startPoint: { x: 35, y: 28 }, direction: 'hook' },
    { id: 2, d: 'M 68 34 C 70 48 68 62 64 70', label: 'Nét 2: Nét cong ngắn bên phải', startPoint: { x: 68, y: 34 }, direction: 'curve' }
  ],
  'う': [
    { id: 1, d: 'M 44 22 C 50 22 56 26 52 30', label: 'Nét 1: Nét phẩy cong nhỏ phía trên', startPoint: { x: 44, y: 22 }, direction: 'curve' },
    { id: 2, d: 'M 38 42 C 65 38 72 58 68 72 C 62 84 45 86 36 82', label: 'Nét 2: Nét vòng cung lớn như chiếc tai', startPoint: { x: 38, y: 42 }, direction: 'curve' }
  ],
  'え': [
    { id: 1, d: 'M 46 20 C 50 20 54 24 50 28', label: 'Nét 1: Nét phẩy ngắn trên đỉnh', startPoint: { x: 46, y: 20 }, direction: 'curve' },
    { id: 2, d: 'M 32 44 L 66 44 L 38 72 C 55 68 72 68 76 78', label: 'Nét 2: Nét zic-zac uốn lượn phía dưới', startPoint: { x: 32, y: 44 }, direction: 'hook' }
  ],
  'お': [
    { id: 1, d: 'M 28 35 L 68 35', label: 'Nét 1: Nét ngang ngắn', startPoint: { x: 28, y: 35 }, direction: 'horizontal' },
    { id: 2, d: 'M 48 20 L 48 55 C 38 52 30 62 34 74 C 40 84 62 85 70 70 C 76 60 74 50 64 52', label: 'Nét 2: Nét sổ xoắn vòng tròn đáy', startPoint: { x: 48, y: 20 }, direction: 'curve' },
    { id: 3, d: 'M 72 32 C 76 34 78 40 74 44', label: 'Nét 3: Nét chấm bên phải', startPoint: { x: 72, y: 32 }, direction: 'curve' }
  ],

  // Katakana
  'ア': [
    { id: 1, d: 'M 30 30 L 70 30 L 60 55', label: 'Nét 1: Ngang gập ngắn nghiêng sang trái', startPoint: { x: 30, y: 30 }, direction: 'hook' },
    { id: 2, d: 'M 45 42 C 40 58 32 74 22 84', label: 'Nét 2: Phẩy dài cong từ giữa xuống trái', startPoint: { x: 45, y: 42 }, direction: 'slanted_left' }
  ],
  'カ': [
    { id: 1, d: 'M 28 32 L 68 32 C 70 42 66 54 58 60', label: 'Nét 1: Ngang gập có móc hất', startPoint: { x: 28, y: 32 }, direction: 'hook' },
    { id: 2, d: 'M 48 20 C 45 45 35 70 20 84', label: 'Nét 2: Phẩy dài cắt qua nét 1', startPoint: { x: 48, y: 20 }, direction: 'slanted_left' }
  ]
};

// Đăng ký đồng bộ đầy đủ 29 chữ cái Tiếng Việt (cả hoa và thường) vào từ điển nét
VIETNAMESE_29_LETTERS.forEach((item) => {
  const lowerNFC = item.lowerChar.normalize('NFC');
  const upperNFC = item.upperChar.normalize('NFC');
  const comboNFC = item.char.normalize('NFC');

  CHARACTER_STROKE_DATA[item.id] = item.lowerStrokes;
  CHARACTER_STROKE_DATA[lowerNFC] = item.lowerStrokes;
  CHARACTER_STROKE_DATA[upperNFC] = item.upperStrokes;
  CHARACTER_STROKE_DATA[comboNFC] = item.lowerStrokes;

  // Dạng NFD để tương thích tuyệt đối mọi kiểu gõ bàn phím
  CHARACTER_STROKE_DATA[lowerNFC.normalize('NFD')] = item.lowerStrokes;
  CHARACTER_STROKE_DATA[upperNFC.normalize('NFD')] = item.upperStrokes;
});

/**
 * Lấy danh sách nét bút cho ký tự bất kỳ.
 * TUYỆT ĐỐI KHÔNG fallback về chữ "ă" hay "I" khi không tìm thấy!
 */
export function getStrokesForCharacter(char?: string | null): StrokePath[] {
  if (!char || typeof char !== 'string') {
    return [];
  }

  const raw = char.trim();
  if (!raw) return [];

  const nfc = raw.normalize('NFC');
  const nfd = raw.normalize('NFD');

  // 1. Kiểm tra trực tiếp trong CHARACTER_STROKE_DATA (chính xác cả hoa và thường)
  if (CHARACTER_STROKE_DATA[nfc]) {
    return CHARACTER_STROKE_DATA[nfc];
  }
  if (CHARACTER_STROKE_DATA[raw]) {
    return CHARACTER_STROKE_DATA[raw];
  }
  if (CHARACTER_STROKE_DATA[nfd]) {
    return CHARACTER_STROKE_DATA[nfd];
  }

  // 2. Tra cứu qua từ điển 29 chữ cái Tiếng Việt
  const viLetter = getLetterData(nfc);
  if (viLetter) {
    const isUpper = nfc === nfc.toUpperCase() && nfc !== nfc.toLowerCase();
    return isUpper ? viLetter.upperStrokes : viLetter.lowerStrokes;
  }

  // 3. Tra cứu chữ thường / chữ hoa
  const lowerNFC = nfc.toLowerCase();
  if (CHARACTER_STROKE_DATA[lowerNFC]) {
    return CHARACTER_STROKE_DATA[lowerNFC];
  }
  const upperNFC = nfc.toUpperCase();
  if (CHARACTER_STROKE_DATA[upperNFC]) {
    return CHARACTER_STROKE_DATA[upperNFC];
  }

  // 4. Ký tự đầu tiên trong chuỗi
  const firstChar = Array.from(nfc)[0];
  if (firstChar && CHARACTER_STROKE_DATA[firstChar]) {
    return CHARACTER_STROKE_DATA[firstChar];
  }

  // 5. Cảnh báo rõ ràng và không trả về nét giả mạo chữ khác
  console.warn(`[Luyện Chữ AR] getStrokesForCharacter: Không tìm thấy nét mẫu cho ký tự: "${char}"`);
  return [];
}

/**
 * Cấu trúc định nghĩa Canvas Bézier Curves chuẩn QĐ 31/2002/QĐ-BGDĐT cho các chữ cái X, R, S
 * Hỗ trợ vẽ trực tiếp lên CanvasRenderingContext2D (moveTo, bezierCurveTo, quadraticCurveTo, lineTo)
 */
export interface CanvasBezierCommand {
  type: 'moveTo' | 'bezierCurveTo' | 'quadraticCurveTo' | 'lineTo';
  params: number[];
  description?: string;
}

export interface LetterBezierDefinition {
  char: string;
  isUpper: boolean;
  strokes: Array<{
    strokeId: number;
    name: string;
    commands: CanvasBezierCommand[];
  }>;
}

export const CANVAS_BEZIER_LETTERS: Record<string, LetterBezierDefinition> = {
  'x': {
    char: 'x',
    isUpper: false,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Nét cong hở nửa trái (hở phải)',
        commands: [
          { type: 'moveTo', params: [36, 45], description: 'Đặt bút dưới đường kẻ ngang 3' },
          { type: 'bezierCurveTo', params: [40, 40, 49.5, 48, 49.5, 60], description: 'Lượn cong lên dòng 3 và lượn sang phải chạm giữa thân' },
          { type: 'bezierCurveTo', params: [49.5, 72, 40, 80, 35, 74], description: 'Lượn cong xuống dòng kẻ 1 và móc lên 1/2 ô ly' },
        ],
      },
      {
        strokeId: 2,
        name: 'Nét 2: Nét cong hở nửa phải (hở trái tựa lưng vào nét 1)',
        commands: [
          { type: 'moveTo', params: [64, 45], description: 'Lia bút sang phải, đặt bút dưới đường kẻ ngang 3' },
          { type: 'bezierCurveTo', params: [60, 40, 50.5, 48, 50.5, 60], description: 'Lượn cong sang trái, lưng tựa nhẹ vào nét 1 ở giữa thân trên dòng 2' },
          { type: 'bezierCurveTo', params: [50.5, 72, 60, 80, 65, 74], description: 'Lượn cong xuống dòng kẻ 1 và móc lên 1/2 ô ly' },
        ],
      },
    ],
  },
  'X': {
    char: 'X',
    isUpper: true,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Nét cong hở hoa nửa trái',
        commands: [
          { type: 'moveTo', params: [30, 28] },
          { type: 'bezierCurveTo', params: [36, 22, 49.5, 36, 49.5, 52] },
          { type: 'bezierCurveTo', params: [49.5, 68, 36, 80, 28, 72] },
        ],
      },
      {
        strokeId: 2,
        name: 'Nét 2: Nét cong hở hoa nửa phải tựa lưng',
        commands: [
          { type: 'moveTo', params: [70, 28] },
          { type: 'bezierCurveTo', params: [64, 22, 50.5, 36, 50.5, 52] },
          { type: 'bezierCurveTo', params: [50.5, 68, 64, 80, 72, 72] },
        ],
      },
    ],
  },
  'r': {
    char: 'r',
    isUpper: false,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Xiên lượn, xoắn thắt nhỏ ở đỉnh, lượn ngang rồi cong xuống móc lên',
        commands: [
          { type: 'moveTo', params: [32, 80], description: 'Đặt bút trên dòng kẻ 1' },
          { type: 'bezierCurveTo', params: [35, 68, 42, 45, 45, 35], description: 'Viết nét xiên lượn lên 2.25 dòng kẻ' },
          { type: 'bezierCurveTo', params: [43, 30, 49, 30, 52, 34], description: 'Tạo vòng xoắn thắt tròn nhỏ ở đỉnh góc trái' },
          { type: 'bezierCurveTo', params: [54, 36, 58, 36, 62, 36], description: 'Lượn ngang một đoạn ngắn sát đường kẻ' },
          { type: 'bezierCurveTo', params: [65, 36, 66, 42, 66, 54], description: 'Uốn cong vai chữ xuống' },
          { type: 'lineTo', params: [66, 74], description: 'Kéo thẳng xuống dòng kẻ 1' },
          { type: 'bezierCurveTo', params: [66, 80, 72, 82, 78, 72], description: 'Móc ngược lên dừng ở giữa ô ly' },
        ],
      },
    ],
  },
  'R': {
    char: 'R',
    isUpper: true,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Nét móc ngược trái thân chữ R hoa',
        commands: [
          { type: 'moveTo', params: [38, 26] },
          { type: 'bezierCurveTo', params: [34, 26, 32, 30, 32, 36] },
          { type: 'lineTo', params: [32, 74] },
          { type: 'bezierCurveTo', params: [32, 80, 26, 80, 24, 74] },
        ],
      },
      {
        strokeId: 2,
        name: 'Nét 2: Nét cong trên tạo bụng tròn, thắt giữa và móc lượn chân phải',
        commands: [
          { type: 'moveTo', params: [32, 32] },
          { type: 'bezierCurveTo', params: [42, 22, 68, 22, 68, 38] },
          { type: 'bezierCurveTo', params: [68, 48, 58, 52, 48, 52] },
          { type: 'bezierCurveTo', params: [44, 52, 42, 54, 44, 56] },
          { type: 'bezierCurveTo', params: [50, 64, 60, 74, 68, 78] },
          { type: 'bezierCurveTo', params: [72, 80, 76, 80, 78, 74] },
        ],
      },
    ],
  },
  's': {
    char: 's',
    isUpper: false,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Xiên lượn, xoắn nhỏ ở đỉnh, lưng cong tròn đều sang phải, đáy lượn vào trong',
        commands: [
          { type: 'moveTo', params: [34, 80], description: 'Đặt bút ở dòng kẻ 1' },
          { type: 'bezierCurveTo', params: [37, 68, 44, 46, 47, 35], description: 'Viết nét xiên lượn lên dòng trên cao 1.25 ô ly' },
          { type: 'bezierCurveTo', params: [44, 30, 50, 30, 53, 34], description: 'Tạo vòng xoắn thắt nhỏ rõ nét ở đỉnh' },
          { type: 'bezierCurveTo', params: [64, 40, 71, 48, 71, 62], description: 'Lưng chữ tròn đầy mềm mại sang phải (không góc nhọn tam giác)' },
          { type: 'bezierCurveTo', params: [71, 74, 60, 80, 48, 80], description: 'Đáy uốn cong tròn sang trái sát dòng 1' },
          { type: 'bezierCurveTo', params: [42, 80, 40, 76, 44, 72], description: 'Dừng bút lượn vào trong sát dòng 1' },
        ],
      },
    ],
  },
  'S': {
    char: 'S',
    isUpper: true,
    strokes: [
      {
        strokeId: 1,
        name: 'Nét 1: Nét liền mềm mại uốn lượn chữ S hoa cổ điển',
        commands: [
          { type: 'moveTo', params: [40, 52] },
          { type: 'bezierCurveTo', params: [36, 38, 42, 24, 56, 24] },
          { type: 'bezierCurveTo', params: [68, 24, 70, 34, 62, 42] },
          { type: 'bezierCurveTo', params: [54, 50, 34, 54, 34, 68] },
          { type: 'bezierCurveTo', params: [34, 78, 46, 82, 58, 82] },
          { type: 'bezierCurveTo', params: [68, 82, 74, 76, 76, 70] },
        ],
      },
    ],
  },
};

/**
 * Vẽ nét Bézier của chữ cái trực tiếp lên CanvasRenderingContext2D theo đúng kích thước Canvas
 */
export function drawLetterToBezierCanvas(
  ctx: CanvasRenderingContext2D,
  char: string,
  width: number,
  height: number,
  options?: { strokeId?: number; color?: string; lineWidth?: number }
): boolean {
  const normChar = char.normalize('NFC');
  const def = CANVAS_BEZIER_LETTERS[normChar];

  if (def) {
    const scaleX = width / 100;
    const scaleY = height / 100;

    ctx.save();
    ctx.strokeStyle = options?.color || '#2563eb';
    ctx.lineWidth = options?.lineWidth || 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const strokesToDraw = typeof options?.strokeId === 'number'
      ? def.strokes.filter((s) => s.strokeId === options.strokeId)
      : def.strokes;

    for (const stroke of strokesToDraw) {
      ctx.beginPath();
      for (const cmd of stroke.commands) {
        if (cmd.type === 'moveTo') {
          ctx.moveTo(cmd.params[0] * scaleX, cmd.params[1] * scaleY);
        } else if (cmd.type === 'bezierCurveTo') {
          ctx.bezierCurveTo(
            cmd.params[0] * scaleX,
            cmd.params[1] * scaleY,
            cmd.params[2] * scaleX,
            cmd.params[3] * scaleY,
            cmd.params[4] * scaleX,
            cmd.params[5] * scaleY
          );
        } else if (cmd.type === 'lineTo') {
          ctx.lineTo(cmd.params[0] * scaleX, cmd.params[1] * scaleY);
        } else if (cmd.type === 'quadraticCurveTo') {
          ctx.quadraticCurveTo(
            cmd.params[0] * scaleX,
            cmd.params[1] * scaleY,
            cmd.params[2] * scaleX,
            cmd.params[3] * scaleY
          );
        }
      }
      ctx.stroke();
    }

    ctx.restore();
    return true;
  }

  // Hỗ trợ vẽ nét Bézier chuẩn ô ly cho mọi chữ hoa và chữ thường trong bảng 29 chữ cái Tiếng Việt
  const strokes = getStrokesForCharacter(char);
  if (strokes && strokes.length > 0) {
    ctx.save();
    ctx.strokeStyle = options?.color || '#2563eb';
    ctx.lineWidth = (options?.lineWidth || 4) * (100 / Math.max(width, 1));
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.scale(width / 100, height / 100);

    const strokesToDraw = typeof options?.strokeId === 'number'
      ? strokes.filter((s) => s.id === options.strokeId)
      : strokes;

    for (const s of strokesToDraw) {
      try {
        const p = new Path2D(s.d);
        ctx.stroke(p);
      } catch (err) {
        console.warn('[Luyện Chữ AR] Lỗi vẽ Path2D:', err);
      }
    }

    ctx.restore();
    return true;
  }

  return false;
}
