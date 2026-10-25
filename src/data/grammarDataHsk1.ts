import type { LessonDetail } from './grammarData';

export const HSK1_GRAMMAR_DETAILS: Record<string, LessonDetail> = {
  '01': {
    lessonNumber: '01',
    grammarPoints: [
      {
        id: 'g-hsk1-01-1',
        title: '1. Hệ thống Ngữ âm & Thanh điệu tiếng Hán (Pinyin & 4 Tones)',
        formula: 'Thanh mẫu (21 phụ âm) + Vận mẫu (36 nguyên âm) + Thanh điệu (4 thanh)',
        explanation:
          'Một âm tiết tiếng Hán gồm 3 phần: Thanh mẫu, Vận mẫu và Thanh điệu. Tiếng Hán có 4 thanh điệu cơ bản (Thanh 1 ngang cao 55, Thanh 2 đi lên 35, Thanh 3 xuống rồi lên 214, Thanh 4 rơi dứt khoát 51) và khinh thanh (thanh nhẹ).',
        examples: [
          { cn: '你好！', pinyin: 'Nǐ hǎo!', vi: 'Xin chào!' },
          { cn: '谢谢！', pinyin: 'Xièxie!', vi: 'Cảm ơn!' },
          { cn: '再见！', pinyin: 'Zàijiàn!', vi: 'Tạm biệt!' },
        ],
        pitfall:
          'Quy tắc biến điệu hai thanh 3: Khi 2 âm tiết thanh 3 đi liền nhau, âm thứ nhất đọc biến thành thanh 2 (Ví dụ: Nǐ hǎo đọc thành Ní hǎo).',
      },
      {
        id: 'g-hsk1-01-2',
        title: '2. Kính ngữ tôn trọng "您" (Nín) đối lập với "你" (Nǐ)',
        formula: '您 (Kính ngữ, ngôi thứ hai số ít trang trọng)',
        explanation:
          'Chữ "您" gồm chữ "你" (bạn) ở trên và bộ "Tâm" (心 - trái tim) ở dưới, biểu thị sự tôn kính từ tận đáy lòng đối với người lớn tuổi, thầy cô giáo, cấp trên hoặc đối tác.',
        examples: [
          { cn: '老师，您好！', pinyin: 'Lǎoshī, nín hǎo!', vi: 'Em chào thầy/cô ạ!' },
          { cn: '您早！', pinyin: 'Nín zǎo!', vi: 'Chào buổi sáng bác/thầy ạ!' },
        ],
      },
      {
        id: 'g-hsk1-01-3',
        title: '3. Cặp lời cảm ơn & xin lỗi chuẩn mực xã giao',
        formula: '谢谢 ➔ 不客气 / 不用谢 | 对不起 ➔ 没关系',
        explanation:
          'Khi ai đó nói lời cảm ơn "谢谢", ta đáp lại lịch sự bằng "不客气" (đừng khách sáo) hoặc "不用谢" (không cần cảm ơn). Khi ai đó xin lỗi "对不起", ta đáp "没关系" (không sao/không có gì).',
        examples: [
          { cn: '谢谢你！— 不客气。', pinyin: 'Xièxie nǐ! — Bù kèqi.', vi: 'Cảm ơn bạn! — Đừng khách sáo nhé.' },
          { cn: '对不起！— 没关系。', pinyin: 'Duìbuqǐ! — Méi guānxi.', vi: 'Xin lỗi bạn! — Không sao đâu.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '你', pinyin: 'nǐ', hanViet: 'Nhĩ', meaning: 'Bạn, anh, chị (ngôi thứ 2)' },
      { hanzi: '好', pinyin: 'hǎo', hanViet: 'Hảo', meaning: 'Tốt, khỏe, hay' },
      { hanzi: '您', pinyin: 'nín', hanViet: 'Nâm', meaning: 'Ngài, ông, bà, thầy (kính ngữ)' },
      { hanzi: '老师', pinyin: 'lǎoshī', hanViet: 'Lão sư', meaning: 'Thầy giáo, cô giáo' },
      { hanzi: '谢谢', pinyin: 'xièxie', hanViet: 'Tạ tạ', meaning: 'Cảm ơn' },
      { hanzi: '不', pinyin: 'bù', hanViet: 'Bất', meaning: 'Không, chẳng' },
      { hanzi: '客气', pinyin: 'kèqi', hanViet: 'Khách khí', meaning: 'Khách sáo, lịch sự' },
      { hanzi: '再见', pinyin: 'zàijiàn', hanViet: 'Tái kiến', meaning: 'Tạm biệt, hẹn gặp lại' },
      { hanzi: '对不起', pinyin: 'duìbuqǐ', hanViet: 'Đối bất khởi', meaning: 'Xin lỗi' },
      { hanzi: '没关系', pinyin: 'méi guānxi', hanViet: 'Một quan hệ', meaning: 'Không sao, không có chi' },
    ],
    dialogue: {
      title: 'Bài khóa 1: AI Tiểu Ngữ, xin chào! (AI小语，你好！)',
      lines: [
        { speaker: 'A', name: 'AI Tiểu Ngữ', cn: '你好！我是AI小语。', pinyin: 'Nǐ hǎo! Wǒ shì AI Xiǎoyǔ.', vi: 'Chào bạn! Tôi là AI Tiểu Ngữ.' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '老师好，您好！很高兴认识您。', pinyin: 'Lǎoshī hǎo, nín hǎo! Hěn gāoxìng rènshi nín.', vi: 'Em chào cô giáo ạ! Rất vui được làm quen với cô.' },
        { speaker: 'A', name: 'AI Tiểu Ngữ', cn: '我也很高兴认识你。我们开始学中文吧！', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ. Wǒmen kāishǐ xué Zhōngwén ba!', vi: 'Cô cũng rất vui được làm quen với em. Chúng mình bắt đầu học tiếng Trung nhé!' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '好的，谢谢老师！— 不客气。', pinyin: 'Hǎo de, xièxie lǎoshī! — Bù kèqi.', vi: 'Dạ vâng, em cảm ơn cô! — Không có chi em.' },
      ],
    },
  },

  '02': {
    lessonNumber: '02',
    grammarPoints: [
      {
        id: 'g-hsk1-02-1',
        title: '1. Trật tự từ cơ bản trong câu tiếng Hán (S + Adv + V + O)',
        formula: 'Chủ ngữ (S) + Trạng ngữ (Thời gian / Nơi chốn) + Động từ (V) + Tân ngữ (O)',
        explanation:
          'Khác với tiếng Việt, trạng từ chỉ thời gian và nơi chốn trong tiếng Hán luôn đứng TRƯỚC động từ chính, không được đặt sau động từ.',
        examples: [
          { cn: '我叫李文。', pinyin: 'Wǒ jiào Lǐ Wén.', vi: 'Tôi tên là Lý Văn.' },
          { cn: '李文在北京学习中文。', pinyin: 'Lǐ Wén zài Běijīng xuéxí Zhōngwén.', vi: 'Lý Văn học tiếng Trung ở Bắc Kinh.' },
        ],
        pitfall: 'Tuyệt đối không nói theo trật tự tiếng Việt: "Lý Văn học tiếng Trung ở Bắc Kinh" -> Sai: 李文学习中文在北京.',
      },
      {
        id: 'g-hsk1-02-2',
        title: '2. Đại từ nghi vấn "什么" (Cái gì / Gì)',
        formula: 'Động từ + 什么 (+ Danh từ)?',
        explanation:
          'Dùng để hỏi về đồ vật, tên gọi hoặc sự việc. Khi hỏi tên người: 叫什么名字 (gọi là tên gì?).',
        examples: [
          { cn: '你叫什么名字？', pinyin: 'Nǐ jiào shénme míngzi?', vi: 'Bạn tên là gì?' },
          { cn: '这是什么？— 这是汉语书。', pinyin: 'Zhè shì shénme? — Zhè shì Hànyǔ shū.', vi: 'Đây là cái gì? — Đây là sách tiếng Hán.' },
        ],
      },
      {
        id: 'g-hsk1-02-3',
        title: '3. Hậu tố số nhiều "们" (men) sau đại từ nhân xưng',
        formula: '我 (tôi) ➔ 我们 (chúng tôi) | 你 ➔ 你们 | 他/她 ➔ 他们/她们',
        explanation:
          'Thêm "们" sau đại từ nhân xưng hoặc danh từ chỉ người (như 学生们, 老师们) để tạo dạng số nhiều. Lưu ý: khi đã có số từ cụ thể thì không dùng 们 (không nói: 三个学生们).',
        examples: [
          { cn: '我们都是学生。', pinyin: 'Wǒmen dōu shì xuésheng.', vi: 'Chúng tôi đều là học sinh/sinh viên.' },
          { cn: '你们好！', pinyin: 'Nǐmen hǎo!', vi: 'Chào các bạn!' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '我', pinyin: 'wǒ', hanViet: 'Ngã', meaning: 'Tôi, mình (ngôi thứ nhất)' },
      { hanzi: '叫', pinyin: 'jiào', hanViet: 'Khiếu', meaning: 'Gọi là, tên là' },
      { hanzi: '什么', pinyin: 'shénme', hanViet: 'Thập ma', meaning: 'Cái gì, gì' },
      { hanzi: '名字', pinyin: 'míngzi', hanViet: 'Danh tự', meaning: 'Tên gọi' },
      { hanzi: '学生', pinyin: 'xuésheng', hanViet: 'Học sinh', meaning: 'Học sinh, sinh viên' },
      { hanzi: '留学生', pinyin: 'liúxuéshēng', hanViet: 'Lưu học sinh', meaning: 'Du học sinh' },
      { hanzi: '学习', pinyin: 'xuéxí', hanViet: 'Học tập', meaning: 'Học, học tập' },
      { hanzi: '中文', pinyin: 'Zhōngwén', hanViet: 'Trung văn', meaning: 'Tiếng Trung' },
      { hanzi: '汉语', pinyin: 'Hànyǔ', hanViet: 'Hán ngữ', meaning: 'Tiếng Hán' },
      { hanzi: '认识', pinyin: 'rènshi', hanViet: 'Nhận thức', meaning: 'Quen biết, làm quen' },
    ],
    dialogue: {
      title: 'Bài khóa 2: Tôi tên là Lý Văn (我叫李文)',
      lines: [
        { speaker: 'A', name: 'Thầy Vương', cn: '你好，请问你叫什么名字？', pinyin: 'Nǐ hǎo, qǐngwèn nǐ jiào shénme míngzi?', vi: 'Xin chào, xin hỏi em tên là gì?' },
        { speaker: 'B', name: 'Lý Văn', cn: '老师好，我叫李文。我是新来的学生。', pinyin: 'Lǎoshī hǎo, wǒ jiào Lǐ Wén. Wǒ shì xīn lái de xuésheng.', vi: 'Em chào thầy, em tên là Lý Văn. Em là học sinh mới đến ạ.' },
        { speaker: 'A', name: 'Thầy Vương', cn: '认识你很高兴，你学习中文吗？', pinyin: 'Rènshi nǐ hěn gāoxìng, nǐ xuéxí Zhōngwén ma?', vi: 'Rất vui được quen biết em, em học tiếng Trung phải không?' },
        { speaker: 'B', name: 'Lý Văn', cn: '是的，我们都在北京大学学习中文。', pinyin: 'Shì de, wǒmen dōu zài Běijīng Dàxué xuéxí Zhōngwén.', vi: 'Dạ vâng, chúng em đều học tiếng Trung ở Đại học Bắc Kinh ạ.' },
      ],
    },
  },

  '03': {
    lessonNumber: '03',
    grammarPoints: [
      {
        id: 'g-hsk1-03-1',
        title: '1. Câu chữ "是" (Định nghĩa & Đồng nhất hóa)',
        formula: 'Khẳng định: A 是 B | Phủ định: A 不是 B',
        explanation: 'Dùng để nối hai danh từ hoặc đại từ, biểu thị A chính là B (hoặc A không phải là B).',
        examples: [
          { cn: '我是中国人。', pinyin: 'Wǒ shì Zhōngguó rén.', vi: 'Tôi là người Trung Quốc.' },
          { cn: '他不是老师，他是医生。', pinyin: 'Tā bú shì lǎoshī, tā shì yīshēng.', vi: 'Anh ấy không phải là giáo viên, anh ấy là bác sĩ.' },
        ],
        pitfall: 'Trước thanh 4 (như 是), phó từ "不" (bù) phải biến âm thành "bú" (bú shì).',
      },
      {
        id: 'g-hsk1-03-2',
        title: '2. Trợ từ kết cấu "的" (Biểu thị quan hệ sở hữu & định ngữ)',
        formula: 'Định ngữ (Chủ sở hữu) + 的 + Danh từ trung tâm',
        explanation:
          'Tương đương chữ "của" trong tiếng Việt. Khi biểu thị quan hệ thân thuộc (bố mẹ, gia đình) có thể lược bỏ "的".',
        examples: [
          { cn: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', vi: 'Đây là sách của tôi.' },
          { cn: '我妈妈是医生。', pinyin: 'Wǒ māma shì yīshēng.', vi: 'Mẹ (của) tôi là bác sĩ (lược bỏ 的).' },
        ],
      },
      {
        id: 'g-hsk1-03-3',
        title: '3. Câu hỏi Có/Không dùng trợ từ nghi vấn "吗" (ma)',
        formula: 'Câu trần thuật + 吗?',
        explanation: 'Thêm "吗" vào cuối câu trần thuật để biến thành câu hỏi Đúng/Sai (Có phải không?).',
        examples: [
          { cn: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguó rén ma?', vi: 'Bạn có phải là người Trung Quốc không?' },
          { cn: '这本书是你的吗？', pinyin: 'Zhè běn shū shì nǐ de ma?', vi: 'Quyển sách này là của bạn phải không?' },
        ],
        pitfall: 'Trong câu đã có đại từ nghi vấn (như 什么, 谁, 哪) thì KHÔNG được thêm "吗".',
      },
    ],
    keyVocab: [
      { hanzi: '是', pinyin: 'shì', hanViet: 'Thị', meaning: 'Là, phải, đúng' },
      { hanzi: '人', pinyin: 'rén', hanViet: 'Nhân', meaning: 'Người, con người' },
      { hanzi: '中国', pinyin: 'Zhōngguó', hanViet: 'Trung Quốc', meaning: 'Nước Trung Quốc' },
      { hanzi: '美国', pinyin: 'Měiguó', hanViet: 'Mỹ quốc', meaning: 'Nước Mỹ' },
      { hanzi: '越南', pinyin: 'Yuènán', hanViet: 'Việt Nam', meaning: 'Nước Việt Nam' },
      { hanzi: '的', pinyin: 'de', hanViet: 'Đích', meaning: 'Của (trợ từ sở hữu)' },
      { hanzi: '吗', pinyin: 'ma', hanViet: 'Ma', meaning: 'Không? (trợ từ nghi vấn)' },
      { hanzi: '哪', pinyin: 'nǎ', hanViet: 'Nả', meaning: 'Nào, đâu' },
      { hanzi: '国', pinyin: 'guó', hanViet: 'Quốc', meaning: 'Nước, quốc gia' },
      { hanzi: '朋友', pinyin: 'péngyou', hanViet: 'Bằng hữu', meaning: 'Bạn bè' },
    ],
    dialogue: {
      title: 'Bài khóa 3: Tôi là người Trung Quốc (我是中国人)',
      lines: [
        { speaker: 'A', name: 'Bạch Giai Nguyệt', cn: '你好，请问你是哪国人？你是中国人吗？', pinyin: 'Nǐ hǎo, qǐngwèn nǐ shì nǎ guó rén? Nǐ shì Zhōngguó rén ma?', vi: 'Xin chào, xin hỏi bạn là người nước nào? Bạn là người Trung Quốc phải không?' },
        { speaker: 'B', name: 'Lý Văn', cn: '是的，我是中国人。你也是中国人吗？', pinyin: 'Shì de, wǒ shì Zhōngguó rén. Nǐ yě shì Zhōngguó rén ma?', vi: 'Đúng vậy, mình là người Trung Quốc. Bạn cũng là người Trung Quốc à?' },
        { speaker: 'A', name: 'Bạch Giai Nguyệt', cn: '我不是中国人，我是美国留学生，她是我的越南朋友。', pinyin: 'Wǒ bú shì Zhōngguó rén, wǒ shì Měiguó liúxuéshēng, tā shì wǒ de Yuènán péngyou.', vi: 'Mình không phải người Trung Quốc, mình là du học sinh Mỹ, còn cô ấy là bạn người Việt Nam của mình.' },
        { speaker: 'B', name: 'Lý Văn', cn: '欢迎你们来北京！', pinyin: 'Huānyíng nǐmen lái Běijīng!', vi: 'Hoan nghênh các bạn đến Bắc Kinh!' },
      ],
    },
  },

  '04': {
    lessonNumber: '04',
    grammarPoints: [
      {
        id: 'g-hsk1-04-1',
        title: '1. Câu chữ "有" biểu thị sở hữu & Phủ định "没有"',
        formula: 'Khẳng định: Chủ ngữ + 有 + Tân ngữ | Phủ định: Chủ ngữ + 没有 + Tân ngữ',
        explanation: 'Dùng để diễn đạt quyền sở hữu hoặc sự tồn tại (có cái gì). Phủ định bắt buộc dùng "没有", tuyệt đối không dùng "不有".',
        examples: [
          { cn: '我有两个孩子。', pinyin: 'Wǒ yǒu liǎng gè háizi.', vi: 'Tôi có hai đứa con.' },
          { cn: '他没有汉语词典。', pinyin: 'Tā méiyǒu Hànyǔ cídiǎn.', vi: 'Anh ấy không có từ điển tiếng Hán.' },
        ],
        pitfall: 'Lỗi cực kỳ phổ biến trong đề thi: Dùng "不有" là sai ngữ pháp nghiêm trọng.',
      },
      {
        id: 'g-hsk1-04-2',
        title: '2. Cấu trúc Danh Lượng Từ [Số từ + Lượng từ + Danh từ]',
        formula: 'Số từ + Lượng từ (个, 本, 位, 张...) + Danh từ',
        explanation: 'Trong tiếng Hán, giữa số từ và danh từ bắt buộc phải có lượng từ thích hợp.',
        examples: [
          { cn: '一个人', pinyin: 'yí gè rén', vi: 'Một người' },
          { cn: '两本书', pinyin: 'liǎng běn shū', vi: 'Hai quyển sách' },
        ],
        pitfall: 'Khi đếm số lượng "2", phải dùng "两" (liǎng) kèm lượng từ, không dùng "二" (èr) (Nói: 两个人, không nói: 二个人).',
      },
      {
        id: 'g-hsk1-04-3',
        title: '3. Trợ từ ngữ khí "呢" hỏi vị trí hoặc sự tình',
        formula: 'Danh từ / Đại từ + 呢?',
        explanation: 'Dùng để hỏi ngắn gọn: "...đâu rồi? / Còn... thì sao?" mà không cần nhắc lại câu hỏi dài dòng.',
        examples: [
          { cn: '我的手机呢？', pinyin: 'Wǒ de shǒujī ne?', vi: 'Điện thoại của tôi đâu rồi?' },
          { cn: '我是学生，你呢？', pinyin: 'Wǒ shì xuésheng, nǐ ne?', vi: 'Tôi là học sinh, còn bạn thì sao?' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '有', pinyin: 'yǒu', hanViet: 'Hữu', meaning: 'Có' },
      { hanzi: '没', pinyin: 'méi', hanViet: 'Một', meaning: 'Chưa, không (phủ định của 有)' },
      { hanzi: '个', pinyin: 'gè', hanViet: 'Cá', meaning: 'Cái, chiếc, người (lượng từ chung)' },
      { hanzi: '本', pinyin: 'běn', hanViet: 'Bản', meaning: 'Quyển, cuốn (lượng từ sách)' },
      { hanzi: '两', pinyin: 'liǎng', hanViet: 'Lưỡng', meaning: 'Hai (dùng trước lượng từ)' },
      { hanzi: '孩子', pinyin: 'háizi', hanViet: 'Hài tử', meaning: 'Con cái, đứa trẻ' },
      { hanzi: '儿子', pinyin: 'érzi', hanViet: 'Nhi tử', meaning: 'Con trai' },
      { hanzi: '女儿', pinyin: 'nǚ\'ér', hanViet: 'Nữ nhi', meaning: 'Con gái' },
      { hanzi: '几', pinyin: 'jǐ', hanViet: 'Kỷ', meaning: 'Mấy (số lượng dưới 10)' },
      { hanzi: '家', pinyin: 'jiā', hanViet: 'Gia', meaning: 'Nhà, gia đình' },
    ],
    dialogue: {
      title: 'Bài khóa 4: Tôi có hai đứa con (我有两个孩子)',
      lines: [
        { speaker: 'A', name: 'David', cn: '王老师，您家有几口人？', pinyin: 'Wáng lǎoshī, nín jiā yǒu jǐ kǒu rén?', vi: 'Cô Vương ơi, nhà cô có mấy người ạ?' },
        { speaker: 'B', name: 'Cô Vương', cn: '我家有四口人。我有两个孩子，一个儿子和一个女儿。', pinyin: 'Wǒ jiā yǒu sì kǒu rén. Wǒ yǒu liǎng gè háizi, yí gè érzi hé yí gè nǚ\'ér.', vi: 'Nhà cô có bốn người. Cô có hai đứa con, một con trai và một con gái.' },
        { speaker: 'A', name: 'David', cn: '他们几岁了？', pinyin: 'Tāmen jǐ suì le?', vi: 'Các cháu mấy tuổi rồi ạ?' },
        { speaker: 'B', name: 'Cô Vương', cn: '儿子八岁，女儿五岁。你有孩子吗？', pinyin: 'Érzi bā suì, nǚ\'ér wǔ suì. Nǐ yǒu háizi ma?', vi: 'Con trai 8 tuổi, con gái 5 tuổi. Em có con chưa?' },
        { speaker: 'A', name: 'David', cn: '我没有孩子，我还是学生呢。', pinyin: 'Wǒ méiyǒu háizi, wǒ hái shì xuésheng ne.', vi: 'Dạ em chưa có con, em vẫn còn là sinh viên mà.' },
      ],
    },
  },

  '05': {
    lessonNumber: '05',
    grammarPoints: [
      {
        id: 'g-hsk1-05-1',
        title: '1. Quy tắc diễn đạt thời gian trong tiếng Hán',
        formula: 'Năm (年) + Tháng (月) + Ngày (日/号) + Thứ (星期) + Giờ (点) + Phút (分)',
        explanation: 'Trật tự thời gian tiếng Hán đi từ đơn vị LỚN NHẤT đến NHỎ NHẤT (Ngược hoàn toàn với tiếng Việt: Ngày/Tháng/Năm).',
        examples: [
          { cn: '今天星期五，我休息。', pinyin: 'Jīntiān xīngqīwǔ, wǒ xiūxi.', vi: 'Hôm nay thứ Sáu, tôi được nghỉ.' },
          { cn: '明天上午八点半上课。', pinyin: 'Míngtiān shàngwǔ bā diǎn bàn shàngkè.', vi: 'Sáng mai tám rưỡi vào lớp.' },
        ],
      },
      {
        id: 'g-hsk1-05-2',
        title: '2. Động từ năng nguyện "会" (Biết qua học hỏi)',
        formula: 'Chủ ngữ + 会 / 不会 + Động từ',
        explanation: 'Biểu thị một kỹ năng có được qua quá trình rèn luyện, học tập (biết nói tiếng Trung, biết bơi, biết nấu ăn).',
        examples: [
          { cn: '你会说汉语吗？', pinyin: 'Nǐ huì shuō Hànyǔ ma?', vi: 'Bạn biết nói tiếng Hán không?' },
          { cn: '我会写汉字，不会说中文。', pinyin: 'Wǒ huì xiě hànzì, bú huì shuō Zhōngwén.', vi: 'Tôi biết viết chữ Hán, không biết nói tiếng Trung.' },
        ],
      },
      {
        id: 'g-hsk1-05-3',
        title: '3. Cách hỏi thời gian: 几点 (Mấy giờ) & 什么时候 (Khi nào)',
        formula: '现在几点？ | Chủ ngữ + 什么时候 + Động từ?',
        explanation: 'Dùng "几点" khi hỏi giờ giấc cụ thể trong ngày; dùng "什么时候" khi hỏi thời điểm chung chung (khi nào, lúc nào).',
        examples: [
          { cn: '现在几点？— 现在十点十分。', pinyin: 'Xiànzài jǐ diǎn? — Xiànzài shí diǎn shí fēn.', vi: 'Bây giờ là mấy giờ? — Bây giờ là 10 giờ 10 phút.' },
          { cn: '你什么时候去中国？', pinyin: 'Nǐ shénme shíhou qù Zhōngguó?', vi: 'Khi nào bạn đi Trung Quốc?' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '今天', pinyin: 'jīntiān', hanViet: 'Kim thiên', meaning: 'Hôm nay' },
      { hanzi: '明天', pinyin: 'míngtiān', hanViet: 'Minh thiên', meaning: 'Ngày mai' },
      { hanzi: '昨天', pinyin: 'zuótiān', hanViet: 'Tạc thiên', meaning: 'Hôm qua' },
      { hanzi: '星期', pinyin: 'xīngqī', hanViet: 'Tinh kỳ', meaning: 'Thứ, tuần lễ' },
      { hanzi: '年', pinyin: 'nián', hanViet: 'Niên', meaning: 'Năm' },
      { hanzi: '月', pinyin: 'yuè', hanViet: 'Nguyệt', meaning: 'Tháng' },
      { hanzi: '号', pinyin: 'hào', hanViet: 'Hào', meaning: 'Ngày, số' },
      { hanzi: '点', pinyin: 'diǎn', hanViet: 'Điểm', meaning: 'Giờ (thời gian)' },
      { hanzi: '分', pinyin: 'fēn', hanViet: 'Phân', meaning: 'Phút' },
      { hanzi: '会', pinyin: 'huì', hanViet: 'Hội', meaning: 'Biết (qua học hỏi)' },
    ],
    dialogue: {
      title: 'Bài khóa 5: Hôm nay tôi nghỉ ngơi (今天我休息)',
      lines: [
        { speaker: 'A', name: 'Lý Văn', cn: '今天星期六，你上班吗？', pinyin: 'Jīntiān xīngqīliù, nǐ shàngbān ma?', vi: 'Hôm nay thứ Bảy, bạn có đi làm không?' },
        { speaker: 'B', name: 'Trương Bằng', cn: '今天我不上班，今天我休息。', pinyin: 'Jīntiān wǒ bú shàngbān, jīntiān wǒ xiūxi.', vi: 'Hôm nay mình không đi làm, hôm nay mình được nghỉ.' },
        { speaker: 'A', name: 'Lý Văn', cn: '你会做中国菜吗？今天中午去我家吧。', pinyin: 'Nǐ huì zuò Zhōngguó cài ma? Jīntiān zhōngwǔ qù wǒ jiā ba.', vi: 'Bạn biết nấu món ăn Trung Quốc không? Trưa nay đến nhà mình nhé.' },
        { speaker: 'B', name: 'Trương Bằng', cn: '我会做一点儿。太好了，中午十二点见！', pinyin: 'Wǒ huì zuò yìdiǎnr. Tài hǎo le, zhōngwǔ shí\'èr diǎn jiàn!', vi: 'Mình biết làm một chút. Tuyệt quá, 12 giờ trưa gặp nhé!' },
      ],
    },
  },

  '06': {
    lessonNumber: '06',
    grammarPoints: [
      {
        id: 'g-hsk1-06-1',
        title: '1. Động từ năng nguyện "想" (Muốn, mong ước, nhớ)',
        formula: 'Chủ ngữ + 想 + Động từ',
        explanation: 'Biểu thị ý định, nguyện vọng chủ quan (muốn làm gì, dự định làm gì). Phủ định dùng "不想".',
        examples: [
          { cn: '我想买一个新手机。', pinyin: 'Wǒ xiǎng mǎi yí gè xīn shǒujī.', vi: 'Tôi muốn mua một chiếc điện thoại mới.' },
          { cn: '明天你想去哪儿？', pinyin: 'Míngtiān nǐ xiǎng qù nǎr?', vi: 'Ngày mai bạn muốn đi đâu?' },
        ],
      },
      {
        id: 'g-hsk1-06-2',
        title: '2. Câu liên động (1) - Đi đâu làm gì',
        formula: 'Chủ ngữ + 去 / 来 + Địa điểm + Động từ mục đích',
        explanation: 'Hai động từ cùng liên kết một chủ ngữ, trong đó hành động 1 là di chuyển tới một địa điểm để thực hiện hành động 2.',
        examples: [
          { cn: '我去商店买东西。', pinyin: 'Wǒ qù shāngdiàn mǎi dōngxi.', vi: 'Tôi đi cửa hàng mua đồ.' },
          { cn: '我们去中国饭馆吃米饭。', pinyin: 'Wǒmen qù Zhōngguó fànguǎn chī mǐfàn.', vi: 'Chúng tôi đến nhà hàng Trung Quốc ăn cơm.' },
        ],
      },
      {
        id: 'g-hsk1-06-3',
        title: '3. Đại từ nghi vấn "多少" & "几" hỏi số lượng',
        formula: '多少 + Danh từ? (Số lượng bất kỳ, trên 10) | 几 + Lượng từ + Danh từ? (Dưới 10)',
        explanation: 'Dùng "多少" khi hỏi số điện thoại, giá tiền, hoặc số lượng lớn. Dùng "几" khi hỏi số lượng ít (thường dưới 10) và bắt buộc có lượng từ.',
        examples: [
          { cn: '你的手机号是多少？', pinyin: 'Nǐ de shǒujī hào shì duōshao?', vi: 'Số điện thoại của bạn là bao nhiêu?' },
          { cn: '你有几个中国朋友？', pinyin: 'Nǐ yǒu jǐ gè Zhōngguó péngyou?', vi: 'Bạn có mấy người bạn Trung Quốc?' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '想', pinyin: 'xiǎng', hanViet: 'Tưởng', meaning: 'Muốn, nghĩ, nhớ' },
      { hanzi: '买', pinyin: 'mǎi', hanViet: 'Mãi', meaning: 'Mua' },
      { hanzi: '手机', pinyin: 'shǒujī', hanViet: 'Thủ cơ', meaning: 'Điện thoại di động' },
      { hanzi: '号', pinyin: 'hào', hanViet: 'Hào', meaning: 'Số, ngày' },
      { hanzi: '多少', pinyin: 'duōshao', hanViet: 'Đa thiếu', meaning: 'Bao nhiêu' },
      { hanzi: '去', pinyin: 'qù', hanViet: 'Khứ', meaning: 'Đi' },
      { hanzi: '吃', pinyin: 'chī', hanViet: 'Ngật', meaning: 'Ăn' },
      { hanzi: '饭馆', pinyin: 'fànguǎn', hanViet: 'Phạn quán', meaning: 'Nhà hàng, quán ăn' },
      { hanzi: '米饭', pinyin: 'mǐfàn', hanViet: 'Mễ phạn', meaning: 'Cơm trắng' },
      { hanzi: '怎么', pinyin: 'zěnme', hanViet: 'Chẩm ma', meaning: 'Như thế nào, làm sao' },
    ],
    dialogue: {
      title: 'Bài khóa 6: Số điện thoại của bạn là bao nhiêu? (你的手机号是多少？)',
      lines: [
        { speaker: 'A', name: 'Anna', cn: '李文，我想去商店买一个新手机。', pinyin: 'Lǐ Wén, wǒ xiǎng qù shāngdiàn mǎi yí gè xīn shǒujī.', vi: 'Lý Văn ơi, mình muốn đi cửa hàng mua một chiếc điện thoại mới.' },
        { speaker: 'B', name: 'Lý Văn', cn: '好啊，我陪你去。你的新手机号是多少？', pinyin: 'Hǎo a, wǒ péi nǐ qù. Nǐ de xīn shǒujī hào shì duōshao?', vi: 'Được thôi, mình đi cùng bạn. Số điện thoại mới của bạn là bao nhiêu?' },
        { speaker: 'A', name: 'Anna', cn: '我的手机号是 138-0013-8000。', pinyin: 'Wǒ de shǒujī hào shì yāo-sān-bā líng-líng-yāo-sān bā-líng-líng-líng.', vi: 'Số điện thoại của mình là 138-0013-8000.' },
        { speaker: 'B', name: 'Lý Văn', cn: '买完手机我们去饭馆吃中国菜吧！', pinyin: 'Mǎi wán shǒujī wǒmen qù fànguǎn chī Zhōngguó cài ba!', vi: 'Mua xong điện thoại chúng mình đi nhà hàng ăn món Trung Quốc nhé!' },
      ],
    },
  },

  '07': {
    lessonNumber: '07',
    grammarPoints: [
      {
        id: 'g-hsk1-07-1',
        title: '1. Trợ từ ngữ khí "吧" đề xuất, rủ rê & thương lượng',
        formula: 'Câu đề xuất / Gợi ý + 吧。',
        explanation: 'Đứng cuối câu biểu thị sự bàn bạc, rủ rê hoặc thúc giục nhẹ nhàng (nhé, nha, đi thôi).',
        examples: [
          { cn: '我们一起去吧。', pinyin: 'Wǒmen yìqǐ qù ba.', vi: 'Chúng mình cùng đi nhé.' },
          { cn: '请喝茶吧。', pinyin: 'Qǐng hē chá ba.', vi: 'Mời bạn uống trà đi.' },
        ],
      },
      {
        id: 'g-hsk1-07-2',
        title: '2. Vị trí của trạng ngữ thời gian & Phó từ tần suất',
        formula: 'Chủ ngữ + [Thời gian / Phó từ: 常常/每天] + Vị ngữ',
        explanation: 'Trạng ngữ luôn đứng trước vị ngữ động từ để bổ nghĩa về thời điểm hoặc tần suất diễn ra.',
        examples: [
          { cn: '我晚上六点半下班。', pinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān.', vi: 'Tôi tan làm lúc sáu rưỡi tối.' },
          { cn: '他常常去图书馆看书。', pinyin: 'Tā chángcháng qù túshūguǎn kàn shū.', vi: 'Anh ấy thường đến thư viện đọc sách.' },
        ],
      },
      {
        id: 'g-hsk1-07-3',
        title: '3. Cách nói thời gian với "半" (Rưỡi / 30 phút) & "刻" (15 phút)',
        formula: 'Số giờ + 点 + 半 (Rưỡi) | Số giờ + 点 + 一刻 (15 phút)',
        explanation: 'Trong khẩu ngữ: sáu rưỡi nói là 六点半 (liù diǎn bàn); bảy giờ mười lăm nói là 七点一刻 (qī diǎn yí kè).',
        examples: [
          { cn: '现在七点半。', pinyin: 'Xiànzài qī diǎn bàn.', vi: 'Bây giờ là bảy rưỡi.' },
          { cn: '八点一刻见。', pinyin: 'Bā diǎn yí kè jiàn.', vi: 'Tám giờ mười lăm gặp nhau nhé.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '晚上', pinyin: 'wǎnshang', hanViet: 'Vãn thượng', meaning: 'Buổi tối' },
      { hanzi: '早上', pinyin: 'zǎoshang', hanViet: 'Tảo thượng', meaning: 'Buổi sáng' },
      { hanzi: '中午', pinyin: 'zhōngwǔ', hanViet: 'Trung ngọ', meaning: 'Buổi trưa' },
      { hanzi: '半', pinyin: 'bàn', hanViet: 'Bán', meaning: 'Rưỡi, nửa (30 phút)' },
      { hanzi: '下班', pinyin: 'xiàbān', hanViet: 'Hạ ban', meaning: 'Tan làm' },
      { hanzi: '上班', pinyin: 'shàngbān', hanViet: 'Thượng ban', meaning: 'Đi làm' },
      { hanzi: '吧', pinyin: 'ba', hanViet: 'Ba', meaning: 'Nhé, đi (trợ từ)' },
      { hanzi: '常常', pinyin: 'chángcháng', hanViet: 'Thường thường', meaning: 'Thường xuyên, thường hay' },
      { hanzi: '看书', pinyin: 'kànshū', hanViet: 'Khán thư', meaning: 'Đọc sách' },
      { hanzi: '图书馆', pinyin: 'túshūguǎn', hanViet: 'Đồ thư quán', meaning: 'Thư viện' },
    ],
    dialogue: {
      title: 'Bài khóa 7: Tôi tan làm lúc sáu rưỡi tối (我晚上六点半下班)',
      lines: [
        { speaker: 'A', name: 'David', cn: '你每天几点下班？', pinyin: 'Nǐ měitiān jǐ diǎn xiàbān?', vi: 'Mỗi ngày bạn tan làm lúc mấy giờ?' },
        { speaker: 'B', name: 'Trương Bằng', cn: '我晚上六点半下班。', pinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān.', vi: 'Mình tan làm lúc sáu rưỡi tối.' },
        { speaker: 'A', name: 'David', cn: '下班以后我们去图书馆看书吧？', pinyin: 'Xiàbān yǐhòu wǒmen qù túshūguǎn kànshū ba?', vi: 'Tan làm xong chúng mình đến thư viện đọc sách nhé?' },
        { speaker: 'B', name: 'Trương Bằng', cn: '好啊，七点一刻在图书馆门口见吧！', pinyin: 'Hǎo a, qī diǎn yí kè zài túshūguǎn ménkǒu jiàn ba!', vi: 'Được chứ, bảy giờ mười lăm gặp ở cổng thư viện nhé!' },
      ],
    },
  },

  '08': {
    lessonNumber: '08',
    grammarPoints: [
      {
        id: 'g-hsk1-08-1',
        title: '1. Từ chỉ phương vị không gian (上, 下, 前, 后, 里)',
        formula: 'Danh từ + 上 / 下 / 前 / 后 / 里 / 外',
        explanation: 'Biểu thị vị trí không gian tương đối của sự vật (trên bàn: 桌子上; trong phòng: 房间里; dưới ghế: 椅子下).',
        examples: [
          { cn: '电脑在桌子上。', pinyin: 'Diànnǎo zài zhuōzi shang.', vi: 'Máy tính ở trên bàn.' },
          { cn: '小狗在椅子下面。', pinyin: 'Xiǎogǒu zài yǐzi xiàmian.', vi: 'Chú chó nhỏ ở dưới gầm ghế.' },
        ],
      },
      {
        id: 'g-hsk1-08-2',
        title: '2. Giới từ "在" chỉ nơi chốn hành động diễn ra',
        formula: 'Chủ ngữ + 在 + Địa điểm + Động từ',
        explanation: 'Diễn tả ai đó làm một hành động ở đâu (Ở đâu làm gì).',
        examples: [
          { cn: '我爸爸也在医院工作。', pinyin: 'Wǒ bàba yě zài yīyuàn gōngzuò.', vi: 'Bố tôi cũng làm việc ở bệnh viện.' },
          { cn: '我们在教室听课。', pinyin: 'Wǒmen zài jiàoshì tīngkè.', vi: 'Chúng tôi nghe giảng trong lớp học.' },
        ],
        pitfall: 'Tuyệt đối không xếp thứ tự theo tiếng Việt "Làm gì ở đâu" (Sai: 我爸爸工作在医院).',
      },
      {
        id: 'g-hsk1-08-3',
        title: '3. Phó từ liên kết "也" (Cũng) & "都" (Đều)',
        formula: 'Chủ ngữ + 也 / 都 + Vị ngữ',
        explanation: 'Chữ "也" biểu thị sự tương đồng (cũng vậy); "都" biểu thị toàn bộ tổng thể (đều như thế). Nếu cùng xuất hiện: 也 + 都.',
        examples: [
          { cn: '我也去。', pinyin: 'Wǒ yě qù.', vi: 'Tôi cũng đi.' },
          { cn: '我们也都想去中国。', pinyin: 'Wǒmen yě dōu xiǎng qù Zhōngguó.', vi: 'Chúng tôi cũng đều muốn đi Trung Quốc.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '在', pinyin: 'zài', hanViet: 'Tại', meaning: 'Ở, tại' },
      { hanzi: '医院', pinyin: 'yīyuàn', hanViet: 'Y viện', meaning: 'Bệnh viện' },
      { hanzi: '工作', pinyin: 'gōngzuò', hanViet: 'Công tác', meaning: 'Công việc, làm việc' },
      { hanzi: '医生', pinyin: 'yīshēng', hanViet: 'Y sinh', meaning: 'Bác sĩ' },
      { hanzi: '也', pinyin: 'yě', hanViet: 'Dã', meaning: 'Cũng' },
      { hanzi: '上', pinyin: 'shàng', hanViet: 'Thượng', meaning: 'Trên' },
      { hanzi: '下', pinyin: 'xià', hanViet: 'Hạ', meaning: 'Dưới' },
      { hanzi: '前', pinyin: 'qián', hanViet: 'Tiền', meaning: 'Trước' },
      { hanzi: '后', pinyin: 'hòu', hanViet: 'Hậu', meaning: 'Sau' },
      { hanzi: '桌子', pinyin: 'zhuōzi', hanViet: 'Trác tử', meaning: 'Cái bàn' },
    ],
    dialogue: {
      title: 'Bài khóa 8: Bố tôi cũng làm việc ở bệnh viện (我爸爸也在医院工作)',
      lines: [
        { speaker: 'A', name: 'Lý Văn', cn: '你爸爸在哪儿工作？', pinyin: 'Nǐ bàba zài nǎr gōngzuò?', vi: 'Bố bạn làm việc ở đâu?' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '我爸爸在朝阳医院工作，他是医生。', pinyin: 'Wǒ bàba zài Cháoyáng Yīyuàn gōngzuò, tā shì yīshēng.', vi: 'Bố mình làm việc ở Bệnh viện Triều Dương, ông ấy là bác sĩ.' },
        { speaker: 'A', name: 'Lý Văn', cn: '真巧！我妈妈也在医院工作，她是护士。', pinyin: 'Zhēn qiǎo! Wǒ māma yě zài yīyuàn gōngzuò, tā shì hùshi.', vi: 'Thật trùng hợp! Mẹ mình cũng làm việc ở bệnh viện, bà ấy là y tá.' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '桌子上的那本书是你爸爸的吗？', pinyin: 'Zhuōzi shang de nà běn shū shì nǐ bàba de ma?', vi: 'Quyển sách ở trên bàn kia là của bố bạn phải không?' },
      ],
    },
  },

  '09': {
    lessonNumber: '09',
    grammarPoints: [
      {
        id: 'g-hsk1-09-1',
        title: '1. Thứ tự chuẩn khi trạng ngữ Thời gian & Nơi chốn cùng xuất hiện',
        formula: 'Chủ ngữ + [Thời gian] + [Nơi chốn] + Động từ + Tân ngữ',
        explanation: 'Quy tắc vàng trong ngữ pháp HSK: THỜI GIAN LUÔN ĐỨNG TRƯỚC NƠI CHỐN.',
        examples: [
          { cn: '我明天上午在学校学习。', pinyin: 'Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí.', vi: 'Sáng mai tôi học ở trường.' },
          { cn: '他昨天下午在家看电视。', pinyin: 'Tā zuótiān xiàwǔ zài jiā kàn diànshì.', vi: 'Chiều hôm qua anh ấy ở nhà xem tivi.' },
        ],
      },
      {
        id: 'g-hsk1-09-2',
        title: '2. Tiền tố biểu thị số thứ tự "第" (Thứ...)',
        formula: '第 + Số từ + (Lượng từ) + Danh từ',
        explanation: 'Thêm chữ "第" trước số từ để chuyển thành số thứ tự (thứ nhất, thứ hai, bài học thứ ba...).',
        examples: [
          { cn: '这是第一课。', pinyin: 'Zhè shì dì-yī kè.', vi: 'Đây là bài học số 1.' },
          { cn: '他得了第一名。', pinyin: 'Tā dé le dì-yī míng.', vi: 'Anh ấy giành vị trí thứ nhất.' },
        ],
      },
      {
        id: 'g-hsk1-09-3',
        title: '3. Động từ "去" (Đi xa người nói) & "来" (Đến gần người nói)',
        formula: '去 / 来 + Địa điểm (+ Động từ)',
        explanation: 'Phân biệt hướng di chuyển: "去" là đi ra xa khỏi vị trí người nói; "来" là đi lại gần vị trí của người nói.',
        examples: [
          { cn: '你来我家吧。', pinyin: 'Nǐ lái wǒ jiā ba.', vi: 'Bạn đến nhà tôi chơi nhé (người nói đang ở nhà).' },
          { cn: '明天我们去北京大学。', pinyin: 'Míngtiān wǒmen qù Běijīng Dàxué.', vi: 'Ngày mai chúng mình đi Đại học Bắc Kinh.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '上午', pinyin: 'shàngwǔ', hanViet: 'Thượng ngọ', meaning: 'Buổi sáng' },
      { hanzi: '下午', pinyin: 'xiàwǔ', hanViet: 'Hạ ngọ', meaning: 'Buổi chiều' },
      { hanzi: '学校', pinyin: 'xuéxiào', hanViet: 'Học hiệu', meaning: 'Trường học' },
      { hanzi: '学习', pinyin: 'xuéxí', hanViet: 'Học tập', meaning: 'Học tập' },
      { hanzi: '第', pinyin: 'dì', hanViet: 'Đệ', meaning: 'Thứ (thứ tự)' },
      { hanzi: '来', pinyin: 'lái', hanViet: 'Lai', meaning: 'Đến, tới' },
      { hanzi: '有空', pinyin: 'yǒu kòng', hanViet: 'Hữu không', meaning: 'Rảnh rỗi, có thời gian' },
      { hanzi: '地铁', pinyin: 'dìtiě', hanViet: 'Địa thiết', meaning: 'Tàu điện ngầm' },
      { hanzi: '站', pinyin: 'zhàn', hanViet: 'Trạm', meaning: 'Trạm, bến, ga' },
      { hanzi: '见', pinyin: 'jiàn', hanViet: 'Kiến', meaning: 'Gặp, thấy' },
    ],
    dialogue: {
      title: 'Bài khóa 9: Sáng mai tôi học ở trường (我明天上午在学校学习)',
      lines: [
        { speaker: 'A', name: 'Anna', cn: '明天上午你有空吗？', pinyin: 'Míngtiān shàngwǔ nǐ yǒu kòng ma?', vi: 'Sáng mai bạn có rảnh không?' },
        { speaker: 'B', name: 'Lý Văn', cn: '明天上午我要在学校学习中文。', pinyin: 'Míngtiān shàngwǔ wǒ yào zài xuéxiào xuéxí Zhōngwén.', vi: 'Sáng mai mình phải học tiếng Trung ở trường.' },
        { speaker: 'A', name: 'Anna', cn: '下午呢？我们去故宫好吗？', pinyin: 'Xiàwǔ ne? Wǒmen qù Gùgōng hǎo ma?', vi: 'Buổi chiều thì sao? Chúng mình đi Cố Cung được không?' },
        { speaker: 'B', name: 'Lý Văn', cn: '下午我有空，下午两点在地铁站见！', pinyin: 'Xiàwǔ wǒ yǒu kòng, xiàwǔ liǎng diǎn zài dìtiězhàn jiàn!', vi: 'Chiều mình rảnh, hai giờ chiều gặp ở ga tàu điện ngầm nhé!' },
      ],
    },
  },

  '10': {
    lessonNumber: '10',
    grammarPoints: [
      {
        id: 'g-hsk1-10-1',
        title: '1. Câu vị ngữ tính từ (Miêu tả tính chất, đặc điểm)',
        formula: 'Chủ ngữ + (Phó từ mức độ: 很 / 真 / 非常) + Tính từ',
        explanation: 'Trong câu vị ngữ tính từ, KHÔNG dùng động từ "是". Thường cần phó từ mức độ như "很" đi kèm để cân bằng ngữ khí.',
        examples: [
          { cn: '这儿的苹果真便宜！', pinyin: 'Zhèr de píngguǒ zhēn piányi!', vi: 'Táo ở đây rẻ thật đấy!' },
          { cn: '今天天气很好。', pinyin: 'Jīntiān tiānqì hěn hǎo.', vi: 'Thời tiết hôm nay rất tốt.' },
        ],
        pitfall: 'Tuyệt đối không nói "今天天气是好" (thừa chữ 是).',
      },
      {
        id: 'g-hsk1-10-2',
        title: '2. Đại từ nghi vấn "怎么样" (Hỏi thăm ý kiến & tình hình)',
        formula: 'Đối tượng + 怎么样?',
        explanation: 'Dùng để hỏi ý kiến đánh giá hoặc tình hình sức khỏe, thời tiết của một đối tượng (như thế nào, ra sao).',
        examples: [
          { cn: '你最近身体怎么样？', pinyin: 'Nǐ zuìjìn shēntǐ zěnmeyàng?', vi: 'Dạo này sức khỏe của bạn thế nào?' },
          { cn: '这个电影怎么样？', pinyin: 'Zhège diànyǐng zěnmeyàng?', vi: 'Bộ phim này thế nào?' },
        ],
      },
      {
        id: 'g-hsk1-10-3',
        title: '3. Cách hỏi giá tiền và đơn vị tiền tệ Trung Quốc (块 / 元)',
        formula: '多少钱？ | ……怎么卖？ | Đơn vị: 块 (kuài) / 元 (yuán)',
        explanation: 'Trong khẩu ngữ thường dùng "块" (kuài) thay cho "元" (yuán) để chỉ đơn vị đồng Nhân Dân Tệ (NDT).',
        examples: [
          { cn: '这个苹果多少钱一斤？', pinyin: 'Zhège píngguǒ duōshao qián yì jīn?', vi: 'Táo này bao nhiêu tiền một cân?' },
          { cn: '五块钱一斤。', pinyin: 'Wǔ kuài qián yì jīn.', vi: 'Năm tệ một cân.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '这儿', pinyin: 'zhèr', hanViet: 'Giá nhi', meaning: 'Ở đây, chỗ này' },
      { hanzi: '那儿', pinyin: 'nàr', hanViet: 'Na nhi', meaning: 'Ở kia, chỗ đó' },
      { hanzi: '苹果', pinyin: 'píngguǒ', hanViet: 'Bình quả', meaning: 'Quả táo' },
      { hanzi: '真', pinyin: 'zhēn', hanViet: 'Chân', meaning: 'Thật, thật là' },
      { hanzi: '便宜', pinyin: 'piányi', hanViet: 'Tiện nghi', meaning: 'Rẻ' },
      { hanzi: '贵', pinyin: 'guì', hanViet: 'Quý', meaning: 'Đắt' },
      { hanzi: '钱', pinyin: 'qián', hanViet: 'Tiền', meaning: 'Tiền' },
      { hanzi: '块', pinyin: 'kuài', hanViet: 'Khối', meaning: 'Đồng, tệ (khẩu ngữ tiền tệ)' },
      { hanzi: '斤', pinyin: 'jīn', hanViet: 'Cân', meaning: 'Cân Trung Quốc (0.5 kg)' },
      { hanzi: '怎么样', pinyin: 'zěnmeyàng', hanViet: 'Chẩm ma dạng', meaning: 'Thế nào, ra sao' },
    ],
    dialogue: {
      title: 'Bài khóa 10: Táo ở đây rẻ thật đấy! (这儿的苹果真便宜！)',
      lines: [
        { speaker: 'A', name: 'Khách hàng', cn: '老板，这个红苹果怎么卖？多少钱一斤？', pinyin: 'Lǎobǎn, zhège hóng píngguǒ zěnme mài? Duōshao qián yì jīn?', vi: 'Ông chủ ơi, táo đỏ này bán thế nào? Bao nhiêu tiền một cân?' },
        { speaker: 'B', name: 'Chủ sạp quả', cn: '五块钱一斤，很甜很新鲜！', pinyin: 'Wǔ kuài qián yì jīn, hěn tián hěn xīnxiān!', vi: 'Năm tệ một cân, ngọt và tươi lắm!' },
        { speaker: 'A', name: 'Khách hàng', cn: '这儿的苹果真便宜，那儿的太贵了！给我来三斤。', pinyin: 'Zhèr de píngguǒ zhēn piányi, nàr de tài guì le! Gěi wǒ lái sān jīn.', vi: 'Táo ở đây rẻ thật, đằng kia đắt quá! Lấy cho tôi ba cân.' },
        { speaker: 'B', name: 'Chủ sạp quả', cn: '好嘞，一共十五块钱，慢走！', pinyin: 'Hǎolei, yígòng shíwǔ kuài qián, màn zǒu!', vi: 'Dạ được ngay, tổng cộng 15 tệ, quý khách đi thong thả!' },
      ],
    },
  },

  '11': {
    lessonNumber: '11',
    grammarPoints: [
      {
        id: 'g-hsk1-11-1',
        title: '1. Biểu thị hành động đang tiếp diễn: "在 / 正在 …… 呢"',
        formula: 'Chủ ngữ + 在 / 正在 + Động từ + (Tân ngữ) + (呢)',
        explanation: 'Diễn tả hành động đang xảy ra tại thời điểm nói (Đang làm gì đó).',
        examples: [
          { cn: '我读大学呢。', pinyin: 'Wǒ dú dàxué ne.', vi: 'Tôi đang học đại học đấy.' },
          { cn: '他正在听音乐呢。', pinyin: 'Tā zhèngzài tīng yīnyuè ne.', vi: 'Anh ấy đang nghe nhạc.' },
        ],
      },
      {
        id: 'g-hsk1-11-2',
        title: '2. Câu hỏi chính phản (V-not-V Question)',
        formula: 'Động từ + 不 + Động từ? | Tính từ + 不 + Tính từ?',
        explanation: 'Ghép dạng khẳng định và phủ định lại với nhau để tạo thành câu hỏi lựa chọn mà KHÔNG cần dùng "吗".',
        examples: [
          { cn: '你去不去学校？', pinyin: 'Nǐ qù bu qù xuéxiào?', vi: 'Bạn có đi trường học không?' },
          { cn: '这个苹果甜不甜？', pinyin: 'Zhège píngguǒ tián bu tián?', vi: 'Quả táo này có ngọt không?' },
        ],
        pitfall: 'Trong câu hỏi chính phản đã có sẵn tính chất nghi vấn, tuyệt đối KHÔNG được thêm "吗" ở cuối câu.',
      },
      {
        id: 'g-hsk1-11-3',
        title: '3. Đại từ nghi vấn "谁" (Shéi - Ai) & "哪儿" (Nǎr - Ở đâu)',
        formula: '谁 + Động từ? | 是谁? | 在哪儿?',
        explanation: 'Dùng để hỏi thông tin nhân thân (ai) và vị trí địa lý (ở đâu).',
        examples: [
          { cn: '他是谁？— 他是我的大学老师。', pinyin: 'Tā shì shéi? — Tā shì wǒ de dàxué lǎoshī.', vi: 'Thầy ấy là ai? — Thầy ấy là giảng viên đại học của tôi.' },
          { cn: '你在哪儿呢？', pinyin: 'Nǐ zài nǎr ne?', vi: 'Bạn đang ở đâu đấy?' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '读', pinyin: 'dú', hanViet: 'Độc', meaning: 'Đọc, học' },
      { hanzi: '大学', pinyin: 'dàxué', hanViet: 'Đại học', meaning: 'Trường đại học' },
      { hanzi: '在', pinyin: 'zài', hanViet: 'Tại', meaning: 'Đang (tiếp diễn)' },
      { hanzi: '正在', pinyin: 'zhèngzài', hanViet: 'Chính tại', meaning: 'Đang làm gì đó' },
      { hanzi: '听', pinyin: 'tīng', hanViet: 'Thính', meaning: 'Nghe' },
      { hanzi: '音乐', pinyin: 'yīnyuè', hanViet: 'Âm nhạc', meaning: 'Âm nhạc' },
      { hanzi: '谁', pinyin: 'shéi', hanViet: 'Thùy', meaning: 'Ai' },
      { hanzi: '准备', pinyin: 'zhǔnbèi', hanViet: 'Chuẩn bị', meaning: 'Chuẩn bị' },
      { hanzi: '考试', pinyin: 'kǎoshì', hanViet: 'Khảo thí', meaning: 'Thi cử, bài thi' },
      { hanzi: '忙', pinyin: 'máng', hanViet: 'Mang', meaning: 'Bận rộn' },
    ],
    dialogue: {
      title: 'Bài khóa 11: Tôi đang học đại học đấy (我读大学呢)',
      lines: [
        { speaker: 'A', name: 'Bạn cũ', cn: '喂，李文，你现在在做什么呢？', pinyin: 'Wèi, Lǐ Wén, nǐ xiànzài zài zuò shénme ne?', vi: 'A lô, Lý Văn à, cậu hiện giờ đang làm gì đấy?' },
        { speaker: 'B', name: 'Lý Văn', cn: '我在北京读大学呢，正在准备期末考试。你忙不忙？', pinyin: 'Wǒ zài Běijīng dú dàxué ne, zhèngzài zhǔnbèi qīmò kǎoshì. Nǐ máng bu máng?', vi: 'Mình đang học đại học ở Bắc Kinh nè, đang chuẩn bị thi cuối kỳ. Cậu có bận không?' },
        { speaker: 'A', name: 'Bạn cũ', cn: '我不忙，正在听音乐呢。那是谁的声音？', pinyin: 'Wǒ bù máng, zhèngzài tīng yīnyuè ne. Nà shì shéi de shēngyīn?', vi: 'Mình không bận, đang nghe nhạc nè. Tiếng ai ở đó thế?' },
        { speaker: 'B', name: 'Lý Văn', cn: '是我的大学同学，我们一起复习呢。', pinyin: 'Shì wǒ de dàxué tóngxué, wǒmen yìqǐ fùxí ne.', vi: 'Là bạn cùng lớp đại học của mình, bọn mình đang ôn tập cùng nhau.' },
      ],
    },
  },

  '12': {
    lessonNumber: '12',
    grammarPoints: [
      {
        id: 'g-hsk1-12-1',
        title: '1. Trợ từ ngữ khí "了" biểu thị sự thay đổi hoặc tình huống mới xuất hiện',
        formula: 'Mệnh đề / Vị ngữ + 了',
        explanation: 'Đặt ở cuối câu, báo hiệu một trạng thái mới vừa xảy ra hoặc biến đổi so với trước kia.',
        examples: [
          { cn: '昨天下雪了。', pinyin: 'Zuótiān xiàxuě le.', vi: 'Hôm qua tuyết rơi rồi (trước đó chưa rơi).' },
          { cn: '春天来了，天气暖和了。', pinyin: 'Chūntiān lái le, tiānqì nuǎnhuo le.', vi: 'Mùa xuân đến rồi, thời tiết ấm lên rồi.' },
        ],
      },
      {
        id: 'g-hsk1-12-2',
        title: '2. Cấu trúc cảm thán "太……了"',
        formula: '太 + Tính từ + 了！',
        explanation: 'Dùng để khen ngợi hoặc biểu thị sự cảm thán mức độ rất cao (Quá... rồi!).',
        examples: [
          { cn: '这个菜太好吃了！', pinyin: 'Zhège cài tài hǎochī le!', vi: 'Món ăn này ngon quá đi mất!' },
          { cn: '今天太冷了！', pinyin: 'Jīntiān tài lěng le!', vi: 'Hôm nay lạnh quá!' },
        ],
      },
      {
        id: 'g-hsk1-12-3',
        title: '3. Cách miêu tả thời tiết & trạng thái tự nhiên (下雨, 下雪, 冷, 热)',
        formula: '天气 + 很 / 太 + 冷 / 热 | 下雨 / 下雪 + 了',
        explanation: 'Thời tiết tiếng Hán dùng các cặp từ đối lập: 冷 (lạnh) vs 热 (nóng); 下雨 (mưa rơi) vs 下雪 (tuyết rơi).',
        examples: [
          { cn: '明天会下雨吗？', pinyin: 'Míngtiān huì xiàyǔ ma?', vi: 'Ngày mai trời có mưa không?' },
          { cn: '北京的冬天很冷。', pinyin: 'Běijīng de dōngtiān hěn lěng.', vi: 'Mùa đông Bắc Kinh rất lạnh.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '昨天', pinyin: 'zuótiān', hanViet: 'Tạc thiên', meaning: 'Hôm qua' },
      { hanzi: '天气', pinyin: 'tiānqì', hanViet: 'Thiên khí', meaning: 'Thời tiết' },
      { hanzi: '下雪', pinyin: 'xiàxuě', hanViet: 'Hạ tuyết', meaning: 'Tuyết rơi' },
      { hanzi: '下雨', pinyin: 'xiàyǔ', hanViet: 'Hạ vũ', meaning: 'Mưa rơi' },
      { hanzi: '冷', pinyin: 'lěng', hanViet: 'Lãnh', meaning: 'Lạnh, rét' },
      { hanzi: '热', pinyin: 'rè', hanViet: 'Nhiệt', meaning: 'Nóng' },
      { hanzi: '太', pinyin: 'tài', hanViet: 'Thái', meaning: 'Quá, lắm' },
      { hanzi: '了', pinyin: 'le', hanViet: 'Liễu', meaning: 'Rồi (trợ từ)' },
      { hanzi: '穿', pinyin: 'chuān', hanViet: 'Xuyên', meaning: 'Mặc (quần áo)' },
      { hanzi: '衣服', pinyin: 'yīfu', hanViet: 'Y phục', meaning: 'Quần áo' },
    ],
    dialogue: {
      title: 'Bài khóa 12: Hôm qua tuyết rơi rồi (昨天下雪了)',
      lines: [
        { speaker: 'A', name: 'Anna', cn: '哇，昨天下雪了，外面好漂亮！', pinyin: 'Wā, zuótiān xiàxuě le, wàimiàn hǎo piàoliang!', vi: 'Oa, hôm qua tuyết rơi rồi, bên ngoài đẹp quá!' },
        { speaker: 'B', name: 'Trương Bằng', cn: '是啊，今天天气太冷了，你要多穿衣服。', pinyin: 'Shì a, jīntiān tiānqì tài lěng le, nǐ yào duō chuān yīfu.', vi: 'Đúng vậy, hôm nay trời rét quá rồi, cậu phải mặc nhiều áo ấm vào nhé.' },
        { speaker: 'A', name: 'Anna', cn: '明天还会下雪吗？', pinyin: 'Míngtiān hái huì xiàxuě ma?', vi: 'Ngày mai trời có còn rơi tuyết nữa không?' },
        { speaker: 'B', name: 'Trương Bằng', cn: '明天不下雪了，但是也很冷。', pinyin: 'Míngtiān bú xiàxuě le, dànshì yě hěn lěng.', vi: 'Ngày mai không rơi tuyết nữa, nhưng cũng rất lạnh đấy.' },
      ],
    },
  },

  '13': {
    lessonNumber: '13',
    grammarPoints: [
      {
        id: 'g-hsk1-13-1',
        title: '1. Động từ năng nguyện "可以" (Biểu thị sự cho phép hoặc khả năng)',
        formula: 'Chủ ngữ + 可以 + Động từ',
        explanation: 'Dùng để xin phép hoặc diễn đạt điều kiện cho phép làm một việc gì đó (Có thể...).',
        examples: [
          { cn: '请给我一杯茶，我可以坐这儿吗？', pinyin: 'Qǐng gěi wǒ yì bēi chá, wǒ kěyǐ zuò zhèr ma?', vi: 'Làm ơn cho tôi một chén trà, tôi có thể ngồi ở đây không?' },
          { cn: '你可以在这里等他。', pinyin: 'Nǐ kěyǐ zài zhèlǐ děng tā.', vi: 'Bạn có thể đợi anh ấy ở đây.' },
        ],
      },
      {
        id: 'g-hsk1-13-2',
        title: '2. Cấu trúc [Động từ + 一下] làm nhẹ ngữ khí',
        formula: 'Động từ + 一下 (yíxià)',
        explanation: 'Biểu thị hành động diễn ra trong thời gian ngắn hoặc thử làm, giúp câu nói hòa nhã, lịch sự hơn.',
        examples: [
          { cn: '请看一下这个句子。', pinyin: 'Qǐng kàn yíxià zhège jùzi.', vi: 'Xin hãy xem qua câu này một chút.' },
          { cn: '我想介绍一下我的朋友。', pinyin: 'Wǒ xiǎng jièshào yíxià wǒ de péngyou.', vi: 'Tôi muốn giới thiệu một chút về bạn tôi.' },
        ],
      },
      {
        id: 'g-hsk1-13-3',
        title: '3. Câu mang hai tân ngữ (Double-Object Sentences)',
        formula: 'Chủ ngữ + 给 / 送 / 教 + Tân ngữ 1 (Người) + Tân ngữ 2 (Vật)',
        explanation: 'Một số động từ mang hai tân ngữ: tân ngữ chỉ người đứng trước (tiếp nhận), tân ngữ chỉ sự vật đứng sau.',
        examples: [
          { cn: '请给我一杯茶。', pinyin: 'Qǐng gěi wǒ yì bēi chá.', vi: 'Làm ơn cho tôi (người) một ly trà (vật).' },
          { cn: '王老师教我们中文。', pinyin: 'Wáng lǎoshī jiāo wǒmen Zhōngwén.', vi: 'Thầy Vương dạy chúng tôi (người) tiếng Trung (vật).' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '请', pinyin: 'qǐng', hanViet: 'Thỉnh', meaning: 'Xin, mời, làm ơn' },
      { hanzi: '给', pinyin: 'gěi', hanViet: 'Cấp', meaning: 'Cho, đưa cho, tặng' },
      { hanzi: '杯', pinyin: 'bēi', hanViet: 'Bôi', meaning: 'Cốc, chén, ly' },
      { hanzi: '茶', pinyin: 'chá', hanViet: 'Trà', meaning: 'Trà, chè' },
      { hanzi: '水', pinyin: 'shuǐ', hanViet: 'Thủy', meaning: 'Nước' },
      { hanzi: '可以', pinyin: 'kěyǐ', hanViet: 'Khả dĩ', meaning: 'Có thể' },
      { hanzi: '坐', pinyin: 'zuò', hanViet: 'Tọa', meaning: 'Ngồi' },
      { hanzi: '点心', pinyin: 'diǎnxin', hanViet: 'Điểm tâm', meaning: 'Điểm tâm, bánh kẹo' },
      { hanzi: '服务员', pinyin: 'fúwùyuán', hanViet: 'Phục vụ viên', meaning: 'Nhân viên phục vụ' },
      { hanzi: '等', pinyin: 'děng', hanViet: 'Đẳng', meaning: 'Đợi, chờ' },
    ],
    dialogue: {
      title: 'Bài khóa 13: Làm ơn cho tôi một tách trà (请给我一杯茶)',
      lines: [
        { speaker: 'A', name: 'Phục vụ', cn: '您好，请问喝点儿什么？', pinyin: 'Nín hǎo, qǐngwèn hē diǎnr shénme?', vi: 'Kính chào quý khách, xin hỏi quý khách uống gì ạ?' },
        { speaker: 'B', name: 'Khách hàng', cn: '服务员，请给我一杯茶和一杯水。我可以坐这儿吗？', pinyin: 'Fúwùyuán, qǐng gěi wǒ yì bēi chá hé yì bēi shuǐ. Wǒ kěyǐ zuò zhèr ma?', vi: 'Phục vụ ơi, làm ơn cho tôi một tách trà và một cốc nước. Tôi có thể ngồi đây được không?' },
        { speaker: 'A', name: 'Phục vụ', cn: '当然可以，请坐！请稍等一下。', pinyin: 'Dāngrán kěyǐ, qǐng zuò! Qǐng shāo děng yíxià.', vi: 'Dạ đương nhiên được, mời ngồi ạ! Xin đợi một lát nhé.' },
        { speaker: 'B', name: 'Khách hàng', cn: '好的，谢谢你！', pinyin: 'Hǎo de, xièxie nǐ!', vi: 'Được rồi, cảm ơn bạn!' },
      ],
    },
  },

  '14': {
    lessonNumber: '14',
    grammarPoints: [
      {
        id: 'g-hsk1-14-1',
        title: '1. Trợ từ động thái "了" biểu thị hành động đã hoàn thành',
        formula: 'Chủ ngữ + Động từ + 了 + [Số lượng + Danh từ]',
        explanation: 'Đứng ngay sau động từ để biểu thị hành động đã được thực hiện và kết thúc trong thực tế.',
        examples: [
          { cn: '我看了一个电影。', pinyin: 'Wǒ kàn le yí gè diànyǐng.', vi: 'Tôi đã xem một bộ phim.' },
          { cn: '他买了两本书。', pinyin: 'Tā mǎi le liǎng běn shū.', vi: 'Anh ấy đã mua hai quyển sách.' },
        ],
        pitfall:
          'Phủ định của động tác chưa hoàn thành phải dùng "没 + Động từ" và tuyệt đối KHÔNG dùng "了" (Sai: 我没看了一个电影 -> Đúng: 我没看电影).',
      },
      {
        id: 'g-hsk1-14-2',
        title: '2. Phó từ phạm vi "都" (Đều, tất cả)',
        formula: 'Chủ ngữ (Số nhiều) + 都 + Động từ / Tính từ',
        explanation: 'Dùng để tổng kết hoặc bao quát toàn bộ đối tượng được nhắc đến phía trước (đều, tất cả).',
        examples: [
          { cn: '我们都是留学生。', pinyin: 'Wǒmen dōu shì liúxuéshēng.', vi: 'Chúng tôi đều là lưu học sinh.' },
          { cn: '这些菜都很好吃。', pinyin: 'Zhèxiē cài dōu hěn hǎochī.', vi: 'Những món ăn này đều rất ngon.' },
        ],
      },
      {
        id: 'g-hsk1-14-3',
        title: '3. Câu hỏi hoàn thành với "...了没有？" (Đã... chưa?)',
        formula: 'Mệnh đề + 了没有? | Mệnh đề + 了吗?',
        explanation: 'Dùng để hỏi một hành động hay sự việc đã được hoàn thành hay chưa.',
        examples: [
          { cn: '你吃饭了没有？— 我吃了。', pinyin: 'Nǐ chīfàn le méiyǒu? — Wǒ chī le.', vi: 'Bạn đã ăn cơm chưa? — Tôi ăn rồi.' },
          { cn: '你买书了没有？— 还没买。', pinyin: 'Nǐ mǎi shū le méiyǒu? — Hái méi mǎi.', vi: 'Bạn đã mua sách chưa? — Vẫn chưa mua.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '看', pinyin: 'kàn', hanViet: 'Khán', meaning: 'Xem, nhìn, đọc' },
      { hanzi: '电影', pinyin: 'diànyǐng', hanViet: 'Điện ảnh', meaning: 'Phim, điện ảnh' },
      { hanzi: '都', pinyin: 'dōu', hanViet: 'Đô', meaning: 'Đều, tất cả' },
      { hanzi: '字', pinyin: 'zì', hanViet: 'Tự', meaning: 'Chữ, ký tự' },
      { hanzi: '写', pinyin: 'xiě', hanViet: 'Tả', meaning: 'Viết' },
      { hanzi: '听懂', pinyin: 'tīngdǒng', hanViet: 'Thính đổng', meaning: 'Nghe hiểu' },
      { hanzi: '做', pinyin: 'zuò', hanViet: 'Tác', meaning: 'Làm' },
      { hanzi: '完', pinyin: 'wán', hanViet: 'Hoàn', meaning: 'Xong, hết' },
      { hanzi: '没', pinyin: 'méi', hanViet: 'Một', meaning: 'Chưa (phủ định hoàn thành)' },
      { hanzi: '还', pinyin: 'hái', hanViet: 'Hoàn', meaning: 'Vẫn, còn' },
    ],
    dialogue: {
      title: 'Bài khóa 14: Tôi đã xem một bộ phim (我看了一个电影)',
      lines: [
        { speaker: 'A', name: 'David', cn: '昨天周末你做了什么？', pinyin: 'Zuótiān zhōumò nǐ zuò le shénme?', vi: 'Cuối tuần hôm qua bạn đã làm gì?' },
        { speaker: 'B', name: 'Lý Văn', cn: '昨天下午我和朋友看了一个中国电影。', pinyin: 'Zuótiān xiàwǔ wǒ hé péngyou kàn le yí gè Zhōngguó diànyǐng.', vi: 'Chiều hôm qua mình và bạn đã xem một bộ phim Trung Quốc.' },
        { speaker: 'A', name: 'David', cn: '你看懂了没有？', pinyin: 'Nǐ kàn dǒng le méiyǒu?', vi: 'Bạn đã xem hiểu chưa?' },
        { speaker: 'B', name: 'Lý Văn', cn: '非常有意思！有中文字幕，我们都看懂了。', pinyin: 'Fēicháng yǒu yìsi! Yǒu zhōngwén zìmù, wǒmen dōu kàn dǒng le.', vi: 'Rất hay luôn! Có phụ đề chữ Hán nên bọn mình đều xem hiểu hết.' },
      ],
    },
  },

  '15': {
    lessonNumber: '15',
    grammarPoints: [
      {
        id: 'g-hsk1-15-1',
        title: '1. Câu phức đẳng lập: "……，还 / 也……" (Ngoài ra... còn...)',
        formula: 'Phân câu 1，Chủ ngữ + 还 / 也 + Phân câu 2',
        explanation: 'Biểu thị sự bổ sung thêm thông tin bên cạnh điều đã nêu ở phân câu trước (ngoài việc A ra, còn làm thêm việc B).',
        examples: [
          { cn: '明天我要去机场接朋友，还要去超市买东西。', pinyin: 'Míngtiān wǒ yào qù jīchǎng jiē péngyou, hái yào qù chāoshì mǎi dōngxi.', vi: 'Ngày mai tôi phải đi sân bay đón bạn, còn phải đi siêu thị mua đồ.' },
          { cn: '他会说汉语，还会说英语。', pinyin: 'Tā huì shuō Hànyǔ, hái huì shuō Yīngyǔ.', vi: 'Anh ấy biết nói tiếng Hán, còn biết nói tiếng Anh.' },
        ],
      },
      {
        id: 'g-hsk1-15-2',
        title: '2. Cấu trúc hẹn gặp mặt: [Thời gian + 在 + Địa điểm + 见]',
        formula: 'Thời gian + 在 + Địa điểm + 见！',
        explanation: 'Cách diễn đạt hẹn gặp nhau chuẩn xác trong tiếng Hán: Mốc thời gian trước, địa điểm ở giữa, chữ 见 (gặp) ở cuối.',
        examples: [
          { cn: '明天早上在校门口见！', pinyin: 'Míngtiān zǎoshang zài xiàomén kǒu jiàn!', vi: 'Sáng mai gặp nhau ở cổng trường nhé!' },
          { cn: '十点在机场见！', pinyin: 'Shí diǎn zài jīchǎng jiàn!', vi: 'Mười giờ gặp nhau ở sân bay nhé!' },
        ],
      },
      {
        id: 'g-hsk1-15-3',
        title: '3. Tổng kết toàn diện cấu trúc & chuẩn bị thi chứng chỉ HSK 1',
        formula: 'Tổng kết 15 bài · Nắm vững 150 từ vựng cốt lõi & Ngữ pháp nền tảng',
        explanation:
          'Hoàn thành bài 15 đồng nghĩa với việc học viên đã thành thạo 150 từ vựng cơ bản, các trật tự câu S+Adv+V+O, câu chữ 是/有, câu liên động, các trợ từ 的/吗/呢/吧/了 và sẵn sàng thi đạt điểm tối đa CBT HSK 1.',
        examples: [
          { cn: '大兴机场见！祝你考试顺利！', pinyin: 'Dàxīng jīchǎng jiàn! Zhù nǐ kǎoshì shùnlì!', vi: 'Hẹn gặp ở sân bay Đại Hưng! Chúc bạn thi cử thuận lợi!' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '机场', pinyin: 'jīchǎng', hanViet: 'Cơ tràng', meaning: 'Sân bay' },
      { hanzi: '飞机', pinyin: 'fēijī', hanViet: 'Phi cơ', meaning: 'Máy bay' },
      { hanzi: '还', pinyin: 'hái', hanViet: 'Hoàn', meaning: 'Còn, vẫn còn' },
      { hanzi: '见', pinyin: 'jiàn', hanViet: 'Kiến', meaning: 'Gặp, thấy' },
      { hanzi: '送', pinyin: 'sòng', hanViet: 'Tống', meaning: 'Tiễn, tặng' },
      { hanzi: '朋友', pinyin: 'péngyou', hanViet: 'Bằng hữu', meaning: 'Bạn bè' },
      { hanzi: '回国', pinyin: 'huíguó', hanViet: 'Hồi quốc', meaning: 'Về nước' },
      { hanzi: '再见', pinyin: 'zàijiàn', hanViet: 'Tái kiến', meaning: 'Tạm biệt' },
      { hanzi: '感谢', pinyin: 'gǎnxiè', hanViet: 'Cảm tạ', meaning: 'Cảm ơn, cảm tạ' },
      { hanzi: '祝', pinyin: 'zhù', hanViet: 'Chúc', meaning: 'Chúc mừng' },
    ],
    dialogue: {
      title: 'Bài khóa 15: Hẹn gặp ở sân bay Đại Hưng! (大兴机场见！)',
      lines: [
        { speaker: 'A', name: 'Tiểu Ngữ', cn: '你们明天几点的飞机？', pinyin: 'Nǐmen míngtiān jǐ diǎn de fēijī?', vi: 'Ngày mai chuyến bay của các bạn lúc mấy giờ?' },
        { speaker: 'B', name: 'Lý Văn', cn: '我们明天下午两点的飞机，回国看爸爸妈妈。', pinyin: 'Wǒmen míngtiān xiàwǔ liǎng diǎn de fēijī, huíguó kàn bàba māma.', vi: 'Bọn mình bay chuyến hai giờ chiều mai, về nước thăm bố mẹ.' },
        { speaker: 'A', name: 'Tiểu Ngữ', cn: '明天早上十点，我们在大兴机场见！我送你们。', pinyin: 'Míngtiān zǎoshang shí diǎn, wǒmen zài Dàxīng jīchǎng jiàn! Wǒ sòng nǐmen.', vi: 'Mười giờ sáng mai, chúng mình gặp nhau ở sân bay Đại Hưng nhé! Mình sẽ tiễn các bạn.' },
        { speaker: 'B', name: 'Lý Văn', cn: '好的，太感谢你了，祝大家一切顺利，大兴机场见！', pinyin: 'Hǎo de, tài gǎnxiè nǐ le, zhù dàjiā yíqiè shùnlì, Dàxīng jīchǎng jiàn!', vi: 'Vâng, cảm ơn bạn nhiều lắm, chúc mọi người mọi sự thuận lợi, hẹn gặp ở sân bay Đại Hưng!' },
      ],
    },
  },
};
