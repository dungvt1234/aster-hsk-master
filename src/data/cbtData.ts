import type { CBTExam, QuizQuestion, HSKLevel } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- HSK 1 Quiz ---
  {
    id: 'q-hsk1-1',
    level: 1,
    type: 'meaning',
    prompt: 'Từ "高兴" (gāoxìng) có nghĩa là gì?',
    hanzi: '高兴',
    pinyin: 'gāoxìng',
    options: ['Buồn bã', 'Vui vẻ, hào hứng', 'Mệt mỏi', 'Tức giận'],
    correctIndex: 1,
    explanation: '高兴 (gāoxìng) - Âm Hán Việt: Cao hứng, nghĩa là vui mừng, hoan hỉ, phấn khởi.',
  },
  {
    id: 'q-hsk1-2',
    level: 1,
    type: 'pinyin',
    prompt: 'Chọn phiên âm Pinyin đúng cho từ: "出租车"',
    hanzi: '出租车',
    options: ['chū zū chē', 'chú zù chē', 'chū zǔ qì', 'cū zū chē'],
    correctIndex: 0,
    explanation: '出租车 phát âm chuẩn là "chūzūchē" (thanh 1, thanh 1, thanh 1), nghĩa là xe taxi.',
  },
  {
    id: 'q-hsk1-3',
    level: 1,
    type: 'fill_blank',
    prompt: 'Điền từ thích hợp vào chỗ trống: "这件衣服太贵了，有___一点儿的吗？"',
    options: ['大 (dà)', '便宜 (piányi)', '高兴 (gāoxìng)', '读 (dú)'],
    correctIndex: 1,
    explanation: '贵 (đắt) đối nghĩa với 便宜 (rẻ). Câu: "Bộ quần áo này đắt quá, có cái nào rẻ hơn một chút không?".',
  },
  {
    id: 'q-hsk1-4',
    level: 1,
    type: 'meaning',
    prompt: 'Câu "认识你很高兴" dùng trong ngữ cảnh nào?',
    options: ['Khi chia tay', 'Khi làm quen lần đầu', 'Khi xin lỗi', 'Khi cảm ơn'],
    correctIndex: 1,
    explanation: '认识你很高兴 (Rènshi nǐ hěn gāoxìng): Rất vui được làm quen với bạn.',
  },

  // --- HSK 2 Quiz ---
  {
    id: 'q-hsk2-1',
    level: 2,
    type: 'meaning',
    prompt: 'Từ "帮助" (bāngzhù) có nghĩa là gì?',
    hanzi: '帮助',
    pinyin: 'bāngzhù',
    options: ['Giúp đỡ', 'Từ chối', 'Bảo lãnh', 'Khen ngợi'],
    correctIndex: 0,
    explanation: '帮助 (bāngzhù) - Hán Việt: Bang trợ, nghĩa là giúp đỡ, hỗ trợ.',
  },
  {
    id: 'q-hsk2-2',
    level: 2,
    type: 'fill_blank',
    prompt: 'Hoàn thành câu: "今天外面很冷，请多___几件衣服。"',
    options: ['穿 (chuān)', '吃 (chī)', '搬 (bān)', '读 (dú)'],
    correctIndex: 0,
    explanation: '穿衣服 (chuān yīfu): Mặc quần áo. Câu: "Hôm nay ngoài trời rất lạnh, hãy mặc thêm vài chiếc áo nhé."',
  },

  // --- HSK 3 Quiz ---
  {
    id: 'q-hsk3-1',
    level: 3,
    type: 'meaning',
    prompt: 'Từ "根据" (gēnjù) thường giữ chức năng gì trong câu?',
    hanzi: '根据',
    pinyin: 'gēnjù',
    options: ['Chỉ nơi chốn', 'Giới từ biểu thị căn cứ, dựa trên cơ sở', 'Phó từ phủ định', 'Trợ từ ngữ khí'],
    correctIndex: 1,
    explanation: '根据 (gēnjù) nghĩa là "căn cứ vào", "dựa theo", ví dụ: 根据调查 (Căn cứ theo điều tra).',
  },
  {
    id: 'q-hsk3-2',
    level: 3,
    type: 'fill_blank',
    prompt: 'Chọn từ thích hợp: "我们要共同努力，保护我们的生活___。"',
    options: ['笔记本 (bǐjìběn)', '环境 (huánjìng)', '出差 (chūchāi)', '出租车 (chūzūchē)'],
    correctIndex: 1,
    explanation: '生活环境 (shēnghuó huánjìng): Môi trường sống. Câu: "Chúng ta phải cùng nỗ lực bảo vệ môi trường sống."',
  },

  // --- HSK 4 Quiz ---
  {
    id: 'q-hsk4-1',
    level: 4,
    type: 'meaning',
    prompt: 'Thành ngữ / câu khẩu ngữ: "坚持到底就是成功" khuyên nhủ điều gì?',
    options: ['Làm việc thông minh hơn chăm chỉ', 'Kiên trì đến cùng ắt sẽ thành công', 'Cần phải biết chấp nhận thất bại', 'Thành công phụ thuộc vào may mắn'],
    correctIndex: 1,
    explanation: '坚持 (kiên trì), 到底 (đến cùng), 成功 (thành công). Câu tục ngữ đề cao tính bền bỉ.',
  },
  {
    id: 'q-hsk4-2',
    level: 4,
    type: 'fill_blank',
    prompt: 'Điền từ: "新员工需要一段时间来___公司的工作节奏。"',
    options: ['适应 (shìyìng)', '安排 (ānpái)', '积累 (jīlěi)', '穿 (chuān)'],
    correctIndex: 0,
    explanation: '适应工作节奏 (thích ứng với nhịp độ công việc). Câu: "Nhân viên mới cần một khoảng thời gian để thích ứng với nhịp độ làm việc của công ty."',
  },
];

export const MOCK_EXAM_HSK1: CBTExam = {
  id: 'cbt-hsk1-demo',
  level: 1,
  title: 'Đề Thi Thử HSK 1 Chuẩn Quốc Tế (CBT Mock Test 01)',
  durationMinutes: 35,
  totalScore: 200,
  passScore: 120,
  questions: [
    // Listening Phần 1
    {
      id: 1,
      section: 'listening',
      part: 1,
      audioScript: '听录音：他正在电脑前看电影。',
      prompt: '[Nghe hiểu - Phần 1] Nghe đoạn ghi âm và chọn bức tranh / khẳng định đúng:',
      options: [
        'A. Anh ấy đang ngủ',
        'B. Anh ấy đang xem phim trước máy tính',
        'C. Anh ấy đang đi taxi',
        'D. Anh ấy đang nấu ăn',
      ],
      correctAnswer: 'B',
      explanation: 'Ghi âm nói: "他正在电脑前看电影" (Anh ấy đang xem phim trước máy tính). Đáp án B là chính xác.',
    },
    {
      id: 2,
      section: 'listening',
      part: 1,
      audioScript: '听录音：桌子上有三本书和一个苹果。',
      prompt: '[Nghe hiểu - Phần 1] Trên bàn có những đồ vật gì?',
      options: [
        'A. Ba quyển sách và một quả táo',
        'B. Bốn cốc trà',
        'C. Hai cái máy tính',
        'D. Năm cái bút',
      ],
      correctAnswer: 'A',
      explanation: '三本书 (3 quyển sách) + 一个苹果 (1 quả táo). Đáp án đúng là A.',
    },
    {
      id: 3,
      section: 'listening',
      part: 2,
      audioScript: '对话：— 喂，你今天什么时候来学校？ — 我坐出租车，十分钟后到。',
      prompt: '[Nghe hiểu - Phần 2] Người nói đến trường bằng phương tiện gì?',
      options: ['A. Đi bộ', 'B. Đi xe buýt', 'C. Đi taxi (出租车)', 'D. Đi xe đạp'],
      correctAnswer: 'C',
      explanation: 'Người nói trả lời: "我坐出租车，十分钟后到" (Tôi đi taxi, 10 phút nữa sẽ đến). Đáp án C.',
    },
    {
      id: 4,
      section: 'listening',
      part: 2,
      audioScript: '对话：— 认识你很高兴！ — 我也很高兴，谢谢你。',
      prompt: '[Nghe hiểu - Phần 2] Hai người trong đoạn hội thoại đang làm gì?',
      options: [
        'A. Chào hỏi và làm quen lần đầu',
        'B. Mua đồ trong siêu thị',
        'C. Cãi nhau trong phòng',
        'D. Gọi đồ ăn trong nhà hàng',
      ],
      correctAnswer: 'A',
      explanation: 'Mẫu câu "认识你很高兴" (Rất vui được làm quen với bạn) dùng trong lần đầu gặp gỡ chào hỏi.',
    },

    // Reading Phần 1
    {
      id: 5,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu - Phần 1] Chọn từ thích hợp điền vào câu: "李老师是我的___，他在大学教汉语。"',
      options: ['A. 苹果', 'B. 老师', 'C. 电脑', 'D. 出租车'],
      correctAnswer: 'B',
      explanation: '李老师 (Thầy giáo Lý) -> "老师" (thầy giáo). Câu hoàn chỉnh: Thầy Lý là giáo viên của tôi.',
    },
    {
      id: 6,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu - Phần 1] Khẳng định nào sau đây đúng với câu: "今天天气很好，我们去公园散步吧。"',
      options: [
        'A. Hôm nay trời mưa to',
        'B. Hôm nay thời tiết rất đẹp, rủ nhau đi dạo công viên',
        'C. Họ đang ở trường học làm bài tập',
        'D. Công viên hôm nay đóng cửa',
      ],
      correctAnswer: 'B',
      explanation: '天气很好 (thời tiết rất đẹp), 去公园散步 (đi dạo công viên). Đáp án B.',
    },
    {
      id: 7,
      section: 'reading',
      part: 2,
      passage: '我家有四口人：爸爸、妈妈、哥哥和我。爸爸是医生，妈妈是老师，我们都爱喝茶。',
      prompt: '[Đọc hiểu - Đoạn văn] Cả gia đình có sở thích chung là gì?',
      options: ['A. Thích xem bóng đá', 'B. Thích ăn cơm tiệm', 'C. Đều yêu thích uống trà (都爱喝茶)', 'D. Thích đi du lịch xa'],
      correctAnswer: 'C',
      explanation: 'Trong bài viết rõ: "我们都爱喝茶" (Chúng tôi đều thích uống trà). Đáp án C.',
    },
    {
      id: 8,
      section: 'reading',
      part: 2,
      passage: '王先生昨天买了八本书，这些书一共三百块钱。',
      prompt: '[Đọc hiểu - Đoạn văn] Ông Vương đã mua bao nhiêu cuốn sách?',
      options: ['A. 3 cuốn', 'B. 6 cuốn', 'C. 8 cuốn (八本书)', 'D. 10 cuốn'],
      correctAnswer: 'C',
      explanation: 'Đoạn văn viết: "王先生昨天买了八本书" -> 8 cuốn sách. Đáp án C.',
    },
    {
      id: 9,
      section: 'reading',
      part: 3,
      prompt: '[Đọc hiểu - Hoàn thành câu] "对不起，我今天不能去了。 — ___"',
      options: ['A. 没关系', 'B. 我很高兴', 'C. 太好了', 'D. 很好吃'],
      correctAnswer: 'A',
      explanation: 'Khi đối phương nói "对不起" (Xin lỗi), đáp lại lịch sự bằng "没关系" (Không sao đâu).',
    },
    {
      id: 10,
      section: 'reading',
      part: 3,
      prompt: '[Đọc hiểu - Hoàn thành câu] "这个西瓜多少___？ — 二十块。"',
      options: ['A. 岁', 'B. 天', 'C. 钱', 'D. 号'],
      correctAnswer: 'C',
      explanation: 'Hỏi giá tiền dùng cụm từ: "多少钱" (Bao nhiêu tiền?). Đáp án C.',
    },
  ],
};

// ==========================================
// ĐỀ THI THỬ CBT HSK 2 CHUẨN QUỐC TẾ
// ==========================================
export const MOCK_EXAM_HSK2: CBTExam = {
  id: 'hsk2-cbt-01',
  level: 2,
  title: 'Đề Thi Thử HSK 2 Chuẩn Quốc Tế CBT (Mã đề: H21001)',
  durationMinutes: 50,
  totalScore: 200,
  passScore: 120,
  questions: [
    {
      id: 1,
      section: 'listening',
      part: 1,
      audioScript: '听录音：请问，去火车站怎么走？ — 一直往前走，到红绿灯右拐。',
      prompt: '[Nghe hiểu HSK 2] Người phụ nữ đang hỏi đường đi đâu?',
      options: ['A. Đến thư viện', 'B. Đến ga tàu hỏa (火车站)', 'C. Đến sân bay', 'D. Đến bệnh viện'],
      correctAnswer: 'B',
      explanation: 'Đoạn ghi âm nói rõ: "去火车站怎么走" (Đi ga tàu hỏa đi như thế nào). Đáp án B.',
    },
    {
      id: 2,
      section: 'listening',
      part: 1,
      audioScript: '听录音：外面下着大雨呢，你还是打车去吧。',
      prompt: '[Nghe hiểu HSK 2] Người nói khuyên đối phương nên làm gì?',
      options: ['A. Đi bộ dưới mưa', 'B. Đi xe đạp', 'C. Bắt taxi đi (打车去)', 'D. Ở nhà không đi'],
      correctAnswer: 'C',
      explanation: 'Khuyên "还是打车去吧" (Hay là bắt taxi đi đi). Đáp án C.',
    },
    {
      id: 3,
      section: 'listening',
      part: 2,
      audioScript: '对话：— 你今天买的新自行车真漂亮！ — 是我爸爸送给我的生日礼物。',
      prompt: '[Nghe hiểu HSK 2] Chiếc xe đạp mới do ai tặng?',
      options: ['A. Bạn cùng lớp', 'B. Mẹ', 'C. Bố (爸爸)', 'D. Tự mua'],
      correctAnswer: 'C',
      explanation: 'Là quà sinh nhật do bố tặng: "是我爸爸送给我的生日礼物". Đáp án C.',
    },
    {
      id: 4,
      section: 'listening',
      part: 2,
      audioScript: '对话：— 医生，我的感冒什么时候能好？ — 按时吃药，多喝热水，两天就好了。',
      prompt: '[Nghe hiểu HSK 2] Bác sĩ dặn dò bệnh nhân điều gì?',
      options: [
        'A. Uống thuốc đúng giờ và uống nhiều nước ấm (多喝热水)',
        'B. Đi chạy bộ ngoài trời',
        'C. Nhịn ăn tối',
        'D. Uống nước đá lạnh',
      ],
      correctAnswer: 'A',
      explanation: 'Bác sĩ dặn: "按时吃药，多喝热水" (Uống thuốc đúng giờ, uống nhiều nước ấm).',
    },
    {
      id: 5,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu HSK 2] Điền từ thích hợp: "今天虽然很累，___我学到了很多新知识。"',
      options: ['A. 但是 (Nhưng)', 'B. 因为 (Bởi vì)', 'C. 所以 (Cho nên)', 'D. 如果 (Nếu như)'],
      correctAnswer: 'A',
      explanation: 'Cặp liên từ tương phản: 虽然……但是…… (Tuy rằng... nhưng mà...). Đáp án A.',
    },
    {
      id: 6,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu HSK 2] "这件红色的衣服比那件黑色的___二十块。"',
      options: ['A. 贵 (Đắt)', 'B. 长 (Dài)', 'C. 高 (Cao)', 'D. 远 (Xa)'],
      correctAnswer: 'A',
      explanation: 'So sánh về giá cả tiền nong dùng 贵 (đắt hơn 20 tệ). Đáp án A.',
    },
    {
      id: 7,
      section: 'reading',
      part: 2,
      passage: '昨天下午我和同事一起去吃了北京烤鸭，那是我们第一次吃，大家都觉得味道非常棒。',
      prompt: '[Đọc hiểu HSK 2] Họ đánh giá hương vị món vịt quay như thế nào?',
      options: ['A. Rất tệ', 'B. Quá mặn', 'C. Cực kỳ ngon, tuyệt vời (味道非常棒)', 'D. Không thích ăn'],
      correctAnswer: 'C',
      explanation: 'Đoạn văn viết: "大家都觉得味道非常棒" (Mọi người đều cảm thấy mùi vị tuyệt vời). Đáp án C.',
    },
    {
      id: 8,
      section: 'reading',
      part: 3,
      prompt: '[Đọc hiểu HSK 2] "服务员，买单！ — ___"',
      options: ['A. 好的，一共是一百二十块。', 'B. 我不想去。', 'C. 没关系。', 'D. 再见。'],
      correctAnswer: 'A',
      explanation: 'Khi khách gọi thanh toán "买单", nhân viên đáp: "好的，一共是一百二十块" (Vâng, tổng cộng là 120 tệ). Đáp án A.',
    },
  ],
};

// ==========================================
// ĐỀ THI THỬ CBT HSK 3 CHUẨN QUỐC TẾ
// ==========================================
export const MOCK_EXAM_HSK3: CBTExam = {
  id: 'hsk3-cbt-01',
  level: 3,
  title: 'Đề Thi Thử HSK 3 Chuẩn Quốc Tế CBT (Mã đề: H31001)',
  durationMinutes: 85,
  totalScore: 300,
  passScore: 180,
  questions: [
    // --- Nghe Hiểu (Listening) ---
    {
      id: 1,
      section: 'listening',
      part: 1,
      audioScript: '听录音：请大家先把手机关了，会议马上就要开始了。',
      prompt: '[Nghe hiểu - Phần 1] Người nói yêu cầu mọi người làm việc gì trước?',
      options: ['A. Đi ra ngoài', 'B. Tắt điện thoại di động (把手机关了)', 'C. Bật đèn phòng họp', 'D. Uống cà phê'],
      correctAnswer: 'B',
      explanation: 'Dùng câu chữ 把: "先把手机关了" (Trước tiên hãy tắt điện thoại). Đáp án B.',
    },
    {
      id: 2,
      section: 'listening',
      part: 1,
      audioScript: '听录音：虽然爬山很累，但是山顶的风景越来越漂亮了。',
      prompt: '[Nghe hiểu - Phần 1] Càng lên đỉnh núi thì điều gì xảy ra?',
      options: ['A. Phong cảnh càng lúc càng đẹp (风景越来越漂亮)', 'B. Trời mưa to', 'C. Mất đường về', 'D. Gặp bạn cũ'],
      correctAnswer: 'A',
      explanation: 'Cấu trúc 越...越...: "风景越来越漂亮了" (Phong cảnh càng ngày càng đẹp). Đáp án A.',
    },
    {
      id: 3,
      section: 'listening',
      part: 2,
      audioScript: '听录音：男：这台笔记本电脑你是什么时候买的？女：去年生日我爸爸送给我的。',
      prompt: '[Nghe hiểu - Phần 2] Chiếc máy tính xách tay của cô gái là do ai tặng?',
      options: ['A. Thầy giáo', 'B. Bạn cùng lớp', 'C. Bố của cô ấy (爸爸送给我的)', 'D. Tự mua bằng tiền tiết kiệm'],
      correctAnswer: 'C',
      explanation: 'Cô gái trả lời rõ: "去年生日我爸爸送给我的" (Sinh nhật năm ngoái bố tặng tôi). Đáp án C.',
    },
    {
      id: 4,
      section: 'listening',
      part: 3,
      audioScript: '听录音：男：李经理，关于新项目的计划书，您看过了吗？女：我看过了，写得非常详细，明天上午我们开会讨论。',
      prompt: '[Nghe hiểu - Phần 3] Giám đốc Lý có nhận xét gì về bản kế hoạch?',
      options: ['A. Cần phải viết lại từ đầu', 'B. Viết rất chi tiết (写得非常详细)', 'C. Không có thời gian xem', 'D. Không đồng ý thực hiện'],
      correctAnswer: 'B',
      explanation: 'Giám đốc Lý nhận xét: "我看过了，写得非常详细" (Tôi đã xem rồi, viết rất chi tiết). Đáp án B.',
    },

    // --- Đọc Hiểu (Reading) ---
    {
      id: 5,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu - Điền từ HSK 3] "别着急，重要的工作我们已经___做完了。"',
      options: ['A. 打算', 'B. 一直', 'C. 差不多 (Gần như / Hầu hết)', 'D. 刚刚'],
      correctAnswer: 'C',
      explanation: 'Đã hoàn thành phần lớn: 差不多做完了 (Hầu hết đều đã làm xong rồi). Đáp án C.',
    },
    {
      id: 6,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu - Ghép câu logic] "虽然外面刮着大风，下着大雨，___。"',
      options: [
        'A. 所以大家都去公园散步了',
        'B. 但是运动员们依然坚持在操场上锻炼',
        'C. 房间里没有开空调',
        'D. 他打算明天买一辆新自行车',
      ],
      correctAnswer: 'B',
      explanation: 'Cặp liên từ biểu thị sự chuyển ngoặt: 虽然……但是…… (Tuy... nhưng...). Đáp án B.',
    },
    {
      id: 7,
      section: 'reading',
      part: 2,
      passage: '他的汉语水平提高得真快，现在不仅能听懂中国人说话，而且还能流利地用汉语交流。',
      prompt: '[Đọc hiểu - Đoạn văn] Trình độ tiếng Hán của anh ấy hiện nay thế nào?',
      options: ['A. Vẫn chưa biết nói', 'B. Tiến bộ rất nhanh, giao tiếp lưu loát (流利交流)', 'C. Đã quên hết từ vựng', 'D. Chỉ biết đọc chữ Hán'],
      correctAnswer: 'B',
      explanation: 'Đoạn văn viết: "水平提高得真快... 能流利地用汉语交流" (Trình độ tiến bộ rất nhanh, giao tiếp lưu loát). Đáp án B.',
    },
    {
      id: 8,
      section: 'reading',
      part: 2,
      passage: '为了身体健康，我们每天除了认真工作以外，还应该抽出半个小时去跑步或者去游泳。',
      prompt: '[Đọc hiểu - Đoạn văn] Tác giả khuyên chúng ta nên làm gì mỗi ngày?',
      options: [
        'A. Uống nhiều trà đá',
        'B. Ngủ cả ngày ở nhà',
        'C. Dành 30 phút chạy bộ hoặc đi bơi (抽出半小时跑步或游泳)',
        'D. Ăn thật nhiều đồ ngọt',
      ],
      correctAnswer: 'C',
      explanation: 'Đoạn văn nêu rõ: "抽出半个小时去跑步或者去游泳" (Dành ra nửa tiếng chạy bộ hoặc bơi lội). Đáp án C.',
    },

    // --- Viết & Sắp Xếp Câu (Writing) ---
    {
      id: 9,
      section: 'reading',
      part: 3,
      prompt: '[Sắp xếp câu HSK 3] Sắp xếp các cụm từ sau thành câu đúng ngữ pháp: ①那本词典 ②请把 ③还给 ④图书馆',
      options: [
        'A. ②那本词典 ①请把 ④图书馆 ③还给',
        'B. ②请把 ①那本词典 ③还给 ④图书馆',
        'C. ④图书馆 ③还给 ②请把 ①那本词典',
        'D. ①那本词典 ④图书馆 ②请把 ③还给',
      ],
      correctAnswer: 'B',
      explanation: 'Cấu trúc câu chữ 把: Chủ ngữ (lược bỏ) + 把 + Tân ngữ (那本词典) + Động từ (还给) + Nơi chốn (图书馆). Đáp án B: "请把那本词典还给图书馆。"',
    },
    {
      id: 10,
      section: 'reading',
      part: 3,
      prompt: '[Sắp xếp câu HSK 3] Sắp xếp đúng: ①越来越 ②汉语 ③他的 ④流利了',
      options: [
        'A. ③他的 ②汉语 ①越来越 ④流利了',
        'B. ①越来越 ④流利了 ③他的 ②汉语',
        'C. ②汉语 ③他的 ①越来越 ④流利了',
        'D. ④流利了 ①越来越 ③他的 ②汉语',
      ],
      correctAnswer: 'A',
      explanation: 'Cấu trúc: Chủ ngữ (他的汉语) + 越来越 + Vị ngữ/Tính từ (流利了). Đáp án A: "他的汉语越来越流利了。"',
    },
    {
      id: 11,
      section: 'reading',
      part: 3,
      prompt: '[Viết chữ Hán HSK 3] Chọn chữ Hán đúng với phiên âm trong ngoặc: "我今天太累了，想早点儿睡（jiào）。"',
      options: ['A. 校', 'B. 觉', 'C. 叫', 'D. 角'],
      correctAnswer: 'B',
      explanation: '睡觉 (shuìjiào - Đi ngủ) dùng chữ 觉. Đáp án B.',
    },
    {
      id: 12,
      section: 'reading',
      part: 3,
      prompt: '[Viết chữ Hán HSK 3] Chọn chữ Hán đúng: "请问去最近的（yínháng）怎么走？"',
      options: ['A. 银行', 'B. 银形', 'C. 很行', 'D. 狠行'],
      correctAnswer: 'A',
      explanation: '银行 (yínháng - Ngân hàng). Đáp án A.',
    },
  ],
};

// ==========================================
// ĐỀ THI THỬ CBT HSK 4 CHUYÊN SÂU
// ==========================================
export const MOCK_EXAM_HSK4: CBTExam = {
  id: 'hsk4-cbt-01',
  level: 4,
  title: 'Đề Thi Thử HSK 4 Chuyên Sâu CBT (Mã đề: H41001)',
  durationMinutes: 100,
  totalScore: 300,
  passScore: 180,
  questions: [
    {
      id: 1,
      section: 'listening',
      part: 1,
      audioScript: '听录音：不仅李经理赞成这个方案，董事长也觉得非常具有可行性。',
      prompt: '[Nghe hiểu HSK 4] Dự thảo phương án nhận được sự ủng hộ từ những ai?',
      options: ['A. Chỉ có nhân viên', 'B. Cả Giám đốc Lý và Chủ tịch HĐQT (李经理和董事长)', 'C. Không ai đồng ý', 'D. Khách hàng'],
      correctAnswer: 'B',
      explanation: 'Cấu trúc 不仅……也……: Cả Giám đốc Lý và Chủ tịch đều đánh giá cao tính khả thi. Đáp án B.',
    },
    {
      id: 2,
      section: 'reading',
      part: 1,
      prompt: '[Đọc hiểu HSK 4] "无论遇到多么严峻的挑战，我们___保持积极乐观的心态。"',
      options: ['A. 都 (Đều)', 'B. 却 (Lại)', 'C. 刚 (Vừa)', 'D. 偏 (Cố tình)'],
      correctAnswer: 'A',
      explanation: 'Cặp liên từ: 无论……都…… (Bất luận... đều...). Đáp án A.',
    },
    {
      id: 3,
      section: 'reading',
      part: 2,
      passage: '一个人是否能取得成功，关键在于他能否在逆境中坚持到底。积累经验需要时间，急于求成往往适得其反。',
      prompt: '[Đọc hiểu HSK 4] Yếu tố then chốt để một người đạt được thành công là gì?',
      options: ['A. Chỉ dựa vào vận may', 'B. Kiên trì tới cùng trong nghịch cảnh (在逆境中坚持到底)', 'C. Nóng vội muốn thành công ngay', 'D. Nhờ người khác làm hộ'],
      correctAnswer: 'B',
      explanation: 'Đoạn văn nhấn mạnh: "关键在于他能否在逆境中坚持到底" (Then chốt ở việc có kiên trì tới cùng trong nghịch cảnh hay không). Đáp án B.',
    },
  ],
};

export function getMockExamByLevel(level: HSKLevel): CBTExam {
  switch (level) {
    case 2:
      return MOCK_EXAM_HSK2;
    case 3:
      return MOCK_EXAM_HSK3;
    case 4:
      return MOCK_EXAM_HSK4;
    default:
      return MOCK_EXAM_HSK1;
  }
}

