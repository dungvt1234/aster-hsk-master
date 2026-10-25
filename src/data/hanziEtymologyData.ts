/**
 * ASTER HANZI ETYMOLOGY & MNEMONIC KNOWLEDGE BASE
 * Cơ sở dữ liệu Chiết tự Lục thư (六书), Nguồn gốc cấu tạo và Câu chuyện mẹo nhớ chữ Hán.
 */

export interface HanziEtymology {
  hanzi: string;
  category: 'Tượng hình' | 'Chỉ sự' | 'Hội ý' | 'Hình thanh';
  categoryCn: string;
  decomposed: { part: string; meaning: string }[];
  memoryStory: string;
  strokeSteps: string[];
  culturalInsight: string;
}

export const HANZI_ETYMOLOGY_MAP: Record<string, HanziEtymology> = {
  '爱': {
    hanzi: '爱',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '爫', meaning: 'Móng vuốt / Bàn tay nâng niu' },
      { part: '冖', meaning: 'Mái nhà che chở' },
      { part: '友', meaning: 'Bạn bè, bạn hữu' },
    ],
    memoryStory: 'Tình yêu (爱) là dùng bàn tay (爫) dịu dàng che chở (冖) cho người bạn tri kỷ (友) dưới một mái nhà bình yên.',
    strokeSteps: ['Phẩy', 'Chấm', 'Chấm', 'Phẩy', 'Ngang móc', 'Ngang phẩy', 'Mác'],
    culturalInsight: 'Trong chữ Hán phồn thể 愛 có chữ Tâm (心) ở giữa - yêu bằng cả trái tim. Chữ giản thể dùng chữ Hữu (友) - yêu thương và tôn trọng nhau như người bạn đời đồng hành.',
  },
  '八': {
    hanzi: '八',
    category: 'Tượng hình',
    categoryCn: '象形字',
    decomposed: [
      { part: '丿', meaning: 'Nét phẩy mở sang trái' },
      { part: '乀', meaning: 'Nét mác mở sang phải' },
    ],
    memoryStory: 'Hai nét mở rộng sang hai bên như hai cánh tay dang ra đón tài lộc và may mắn vào nhà.',
    strokeSteps: ['Nét phẩy trước (trái)', 'Nét mác sau (phải)'],
    culturalInsight: 'Số 8 (八 - bā) có âm đọc đồng âm với Phát (发 - fā trong phát tài phát lộc). Người Trung Quốc đặc biệt chuộng biển số xe, số điện thoại có nhiều số 8.',
  },
  '爸': {
    hanzi: '爸',
    category: 'Hình thanh',
    categoryCn: '形声字',
    decomposed: [
      { part: '父', meaning: 'Bộ Phụ - Người cha (biểu ý)' },
      { part: '巴', meaning: 'Chữ Ba - cái đuôi / dính bám (biểu âm bà)' },
    ],
    memoryStory: 'Người cha (父) cõng đứa con nhỏ dính chặt trên lưng (巴) chính là hình ảnh người Bố (爸爸) vĩ đại.',
    strokeSteps: ['Phẩy', 'Chấm', 'Phẩy', 'Mác', 'Ngang gập', 'Sổ', 'Ngang', 'Sổ cong móc'],
    culturalInsight: 'Chữ 爸 kết hợp giữa bộ Phụ (chỉ ý nghĩa người cha) và chữ 巴 (mang âm đọc bā). Đây là cấu trúc chữ Hình Thanh chiếm hơn 80% trong hệ thống chữ Hán.',
  },
  '人': {
    hanzi: '人',
    category: 'Tượng hình',
    categoryCn: '象形字',
    decomposed: [
      { part: '丿', meaning: 'Nét phẩy bên trái' },
      { part: '乀', meaning: 'Nét mác bên phải' },
    ],
    memoryStory: 'Hình ảnh một con người đứng choãi chân vững chãi trên mặt đất, hai nét tựa vào nhau thể hiện con người sống cần nương tựa nhau.',
    strokeSteps: ['Phẩy bên trái', 'Mác bên phải'],
    culturalInsight: 'Chữ Nhân thể hiện triết lý tương trợ nhân văn phương Đông: một nét đơn độc sẽ ngã, hai nét nương tựa mới đứng vững.',
  },
  '大': {
    hanzi: '大',
    category: 'Chỉ sự',
    categoryCn: '指事字',
    decomposed: [
      { part: '人', meaning: 'Con người' },
      { part: '一', meaning: 'Hai tay dang ngang' },
    ],
    memoryStory: 'Một người (人) dang rộng cả hai cánh tay hết cỡ (一) để diễn tả vật gì đó vô cùng to lớn (大).',
    strokeSteps: ['Ngang', 'Phẩy', 'Mác'],
    culturalInsight: 'Trong tư tưởng cổ đại, trời đất bao la nhưng con người đứng sừng sững giữa trời đất cũng là một thực thể vĩ đại (đại).',
  },
  '天': {
    hanzi: '天',
    category: 'Chỉ sự',
    categoryCn: '指事字',
    decomposed: [
      { part: '一', meaning: 'Khoảng không bao la trên đỉnh' },
      { part: '大', meaning: 'Con người to lớn' },
    ],
    memoryStory: 'Ở phía trên đầu con người to lớn (大) có một vòm trời vô tận (一), đó chính là Bầu Trời / Ông Trời (天).',
    strokeSteps: ['Ngang ngắn trên', 'Ngang dài dưới', 'Phẩy', 'Mác'],
    culturalInsight: 'Trời (天 - Thiên) là khái niệm tối cao trong văn hóa Nho giáo: Thiên mệnh, Thiên thời, Thiên hạ.',
  },
  '明': {
    hanzi: '明',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '日', meaning: 'Mặt trời (Thái dương)' },
      { part: '月', meaning: 'Mặt trăng (Thái âm)' },
    ],
    memoryStory: 'Mặt trời (日) chiếu sáng ban ngày, mặt trăng (月) toả sáng ban đêm. Hai nguồn sáng vĩ đại nhất vũ trụ kết hợp tạo nên sự Sáng sủa, Quang minh (明).',
    strokeSteps: ['Sổ', 'Ngang gập móc', 'Ngang', 'Ngang (xong 日)', 'Phẩy', 'Ngang gập móc', 'Ngang', 'Ngang (xong 月)'],
    culturalInsight: 'Chữ 明 xuất hiện trong "Minh bạch" (rõ ràng), "Thông minh" (sáng dạ), "Nhật nguyệt đồng huy" - sự hòa hợp tuyệt đối giữa âm và dương.',
  },
  '休': {
    hanzi: '休',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '亻', meaning: 'Bộ Nhân đứng (con người)' },
      { part: '木', meaning: 'Cái cây, bóng mát' },
    ],
    memoryStory: 'Sau buổi lao động mệt nhọc, người nông dân (亻) tựa lưng vào gốc cây to (木) hóng mát để Nghỉ ngơi (休 trong nghỉ hưu, hưu trí).',
    strokeSteps: ['Phẩy', 'Sổ đứng', 'Ngang', 'Sổ', 'Phẩy', 'Mác'],
    culturalInsight: 'Chữ 休 gợi lên bức tranh điền viên thanh bình, khuyên con người biết cân bằng giữa làm việc cật lực và nghỉ ngơi dưỡng tâm.',
  },
  '好': {
    hanzi: '好',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '女', meaning: 'Phụ nữ / Người mẹ' },
      { part: '子', meaning: 'Đứa con' },
    ],
    memoryStory: 'Người mẹ hiền (女) ôm đứa con thơ (子) vào lòng ấm áp, gia đình đủ nếp đủ tẻ là điều Tốt đẹp, Hảo (好) nhất trên đời.',
    strokeSteps: ['Phẩy chấm', 'Phẩy', 'Ngang (xong 女)', 'Ngang móc', 'Cong móc', 'Ngang (xong 子)'],
    culturalInsight: 'Trong tiếng Trung, "Hảo" (好) dùng cho hầu hết lời chào (你好), lời khen (很好) và sự đồng thuận (好的).',
  },
  '茶': {
    hanzi: '茶',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '艹', meaning: 'Bộ Thảo - búp trà, hoa cỏ' },
      { part: '人', meaning: 'Con người' },
      { part: '木', meaning: 'Cây cối rừng xanh' },
    ],
    memoryStory: 'Con người (人) sống hòa mình, tĩnh tại giữa ngọn cỏ xanh (艹) và tán cây rừng (木) chính là thưởng Trà (茶).',
    strokeSteps: ['Ngang', 'Sổ', 'Sổ (xong 艹)', 'Phẩy', 'Mác (xong 人)', 'Ngang', 'Sổ móc', 'Phẩy', 'Chấm (xong 木)'],
    culturalInsight: 'Trà đạo Trung Hoa không chỉ là thức uống mà là nghệ thuật dưỡng sinh, tĩnh tâm kết nối giữa con người và thiên nhiên.',
  },
  '家': {
    hanzi: '家',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '宀', meaning: 'Bộ Miên - Mái nhà ấm cúng' },
      { part: '豕', meaning: 'Bộ Thỉ - Con lợn, gia súc' },
    ],
    memoryStory: 'Thời xưa, dưới mái nhà (宀) có nuôi một chú lợn béo tốt (豕) chứng tỏ gia đình sung túc, no ấm. Đó chính là Nhà, Gia đình (家).',
    strokeSteps: ['Chấm', 'Chấm', 'Ngang phẩy', 'Ngang', 'Phẩy cong', 'Uốn móc', 'Phẩy', 'Phẩy', 'Phẩy', 'Mác'],
    culturalInsight: 'Khái niệm "Gia" (家) vô cùng thiêng liêng: Gia đình (家庭), Quốc gia (国家 - Nước gắn liền với Nhà).',
  },
  '学': {
    hanzi: '学',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '⺍', meaning: 'Hai bàn tay nâng sách hoặc kiến thức' },
      { part: '冖', meaning: 'Mái trường, thư viện' },
      { part: '子', meaning: 'Đứa trẻ, học trò' },
    ],
    memoryStory: 'Đứa trẻ (子) ngồi dưới mái trường (冖), hai tay chăm chỉ mở sách lĩnh hội tri thức chính là Học (学 trong học tập, trường học).',
    strokeSteps: ['Chấm', 'Chấm', 'Phẩy', 'Chấm', 'Ngang móc', 'Ngang móc', 'Cong móc', 'Ngang'],
    culturalInsight: 'Tinh thần tôn sư trọng đạo và hiếu học là giá trị cốt lõi của văn hóa Á Đông hàng ngàn năm.',
  },
  '书': {
    hanzi: '书',
    category: 'Tượng hình',
    categoryCn: '象形字',
    decomposed: [
      { part: '乛', meaning: 'Bàn tay cầm bút' },
      { part: '丨', meaning: 'Cán bút lông thẳng đứng' },
      { part: '丶', meaning: 'Giọt mực rớt xuống trang giấy' },
    ],
    memoryStory: 'Bàn tay cầm cán bút lông ngay ngắn viết từng nét mực xuống mặt giấy tạo nên cuốn Sách (书 trong sách vở, thư pháp).',
    strokeSteps: ['Ngang gập móc', 'Ngang gập', 'Ngang', 'Sổ', 'Chấm'],
    culturalInsight: 'Chữ phồn thể là 書 (Thư), gồm bàn tay cầm bút trên thẻ tre. Thư pháp (书法) được tôn vinh là đỉnh cao nghệ thuật thị giác.',
  },
  '国': {
    hanzi: '国',
    category: 'Hội ý',
    categoryCn: '会意字',
    decomposed: [
      { part: '囗', meaning: 'Bộ Vi - Biên giới, tường thành bao quanh' },
      { part: '玉', meaning: 'Ngọc quý / Ngọc tỷ truyền quốc' },
    ],
    memoryStory: 'Bên trong bốn bức tường thành kiên cố (囗) cất giữ viên ngọc quý báu (玉) tượng trưng cho lãnh thổ và chủ quyền của Quốc Gia (国).',
    strokeSteps: ['Sổ trái', 'Ngang gập móc', 'Ngang', 'Ngang', 'Sổ', 'Ngang', 'Chấm (xong 玉)', 'Ngang đáy đóng lại'],
    culturalInsight: 'Quy tắc bút thuận "Vào trước đóng sau": vẽ 3 cạnh thành trì, đặt ngọc quý vào trong rồi mới kẻ nét đáy đóng cửa thành lại.',
  },
};

/**
 * Trả về chiết tự mặc định hoặc phân tích thông minh cho các chữ chưa có trong map
 */
export function getHanziEtymology(hanzi: string, meaning: string, radical: string): HanziEtymology {
  if (HANZI_ETYMOLOGY_MAP[hanzi]) {
    return HANZI_ETYMOLOGY_MAP[hanzi];
  }

  // Tự động phân tích cấu trúc chữ cho các từ khác
  return {
    hanzi,
    category: 'Hình thanh',
    categoryCn: '形声 / 会意字',
    decomposed: [
      { part: radical.split(' ')[0] || 'Bộ thủ', meaning: radical },
      { part: 'Thân chữ', meaning: `Thành phần tạo âm & ý nghĩa bổ trợ cho "${meaning}"` },
    ],
    memoryStory: `Chữ "${hanzi}" lấy nghĩa nền tảng từ bộ ${radical}, gắn liền với khái niệm "${meaning}" trong đời sống giao tiếp hàng ngày.`,
    strokeSteps: ['Viết theo quy tắc bút thuận vàng: Trên trước dưới sau, Trái trước phải sau.'],
    culturalInsight: `Từ vựng cốt lõi thường xuyên xuất hiện trong các đề thi năng lực Hán ngữ HSK và giao tiếp thực tế.`,
  };
}
