export interface GrammarExample {
  chinese: string;
  pinyin: string;
  vietnamese: string;
  highlights?: string[];
}

export interface GrammarPoint {
  title: string;
  formula: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface ToneRuleItem {
  ruleTitle: string;
  desc: string;
  examples: { chinese: string; pinyin: string; note: string }[];
}

export interface DialogueLine {
  speaker: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  highlights?: string[];
}

export interface UnitGuideContent {
  grammars: GrammarPoint[];
  toneRules: ToneRuleItem[];
  dialogue: DialogueLine[];
}

export const UNIT_GUIDE_DATA: Record<string, UnitGuideContent> = {
  // ==================== HSK 1 ====================
  'unit-hsk1-0': {
    grammars: [
      {
        title: '1. Quy tắc ghép số từ 11 đến 99 trong tiếng Trung',
        formula: '11 - 19: 十 + [Số đơn vị] | 20 - 99: [Số hàng chục] + 十 (+ [Số đơn vị])',
        explanation: 'Quy tắc số học tiếng Trung hoàn toàn trực quan: 11 là 十一 (10 + 1), 20 là 二十 (2 x 10), 25 là 二十五 (2 x 10 + 5).',
        examples: [
          { chinese: '十一，十五，十九。', pinyin: 'Shíyī, shíwǔ, shíjiǔ.', vietnamese: 'Mười một, mười lăm, mười chín.', highlights: ['十'] },
          { chinese: '二十，三十五，九十九。', pinyin: 'Èrshí, sānshíwǔ, jiǔshíjiǔ.', vietnamese: 'Hai mươi, ba mươi lăm, chín mươi chín.', highlights: ['十'] }
        ]
      },
      {
        title: '2. Phân biệt số 2: 二 (èr) và 两 (liǎng)',
        formula: 'Đếm số thứ tự: dùng 二 | Đếm số lượng + Lượng từ: dùng 两',
        explanation: 'Khi đếm số (1, 2, 3), số phòng, số điện thoại dùng 二 (èr). Khi đứng trước lượng từ chỉ số lượng người/vật (hai cái, hai người) bắt buộc dùng 两 (liǎng).',
        examples: [
          { chinese: '我有两只猫。', pinyin: 'Wǒ yǒu liǎng zhī māo.', vietnamese: 'Tôi có hai con mèo (trước lượng từ 只 dùng 两).', highlights: ['两'] },
          { chinese: '一、二、三，开始！', pinyin: 'Yī, èr, sān, kāishǐ!', vietnamese: 'Một, hai, ba, bắt đầu! (Đếm số dùng 二).', highlights: ['二'] }
        ]
      },
      {
        title: '3. Cách hỏi và trả lời giá tiền với 多少钱',
        formula: '[Đồ vật] + 多少钱？ -> ... 块 (tiền tệ)',
        explanation: 'Trong khẩu ngữ, người bản xứ dùng 块 (kuài) thay cho 元 (yuán).',
        examples: [
          { chinese: '这个苹果多少钱？', pinyin: 'Zhège píngguǒ duōshao qián?', vietnamese: 'Quả táo này bao nhiêu tiền?', highlights: ['多少钱'] },
          { chinese: '三块钱一个。', pinyin: 'Sān kuài qián yí gè.', vietnamese: 'Ba tệ một quả.', highlights: ['块', '钱'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc biến điệu của chữ "一" (Yī)',
        desc: 'Nguyên bản đọc thanh 1 (yī) khi đếm số. Trước thanh 4 đổi thành thanh 2 (yí). Trước thanh 1, 2, 3 đổi thành thanh 4 (yì).',
        examples: [
          { chinese: '一个 (yí gè)', pinyin: 'Yí gè', note: 'Đứng trước thanh 4 (个 - gè), 一 đổi thành thanh 2: yí' },
          { chinese: '一天 (yì tiān)', pinyin: 'Yì tiān', note: 'Đứng trước thanh 1 (天 - tiān), 一 đổi thành thanh 4: yì' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你好！请问这个西瓜多少钱？', pinyin: 'Nǐ hǎo! Qǐngwèn zhège xīguā duōshao qián?', vietnamese: 'Xin chào! Xin hỏi quả dưa hấu này bao nhiêu tiền?', highlights: ['多少钱'] },
      { speaker: 'B', chinese: '十块钱一个。', pinyin: 'Shí kuài qián yí gè.', vietnamese: 'Mười tệ một quả.', highlights: ['十', '块'] }
    ]
  },

  'unit-hsk1-1': {
    grammars: [
      {
        title: '1. Câu phán đoán với động từ 是 (Là)',
        formula: 'Chủ ngữ + 是 + Danh từ / Phủ định: 不是',
        explanation: 'Động từ 是 dùng để biểu thị danh tính, nghề nghiệp, quốc tịch. Phủ định dùng 不是.',
        examples: [
          { chinese: '我是越南人。', pinyin: 'Wǒ shì Yuènán rén.', vietnamese: 'Tôi là người Việt Nam.', highlights: ['是'] },
          { chinese: '他不是老师，他是学生。', pinyin: 'Tā bú shì lǎoshī, tā shì xuésheng.', vietnamese: 'Anh ấy không phải là giáo viên, anh ấy là học sinh.', highlights: ['不是', '是'] }
        ]
      },
      {
        title: '2. Câu hỏi nghi vấn với trợ từ 吗',
        formula: 'Câu trần thuật + 吗？',
        explanation: 'Thêm 吗 vào cuối câu trần thuật để biến câu thành câu hỏi Yes/No.',
        examples: [
          { chinese: '你是中国人吗？', pinyin: 'Nǐ shì Zhōngguó rén ma?', vietnamese: 'Bạn có phải là người Trung Quốc không?', highlights: ['吗'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc biến điệu 2 thanh 3 (3 + 3 → 2 + 3)',
        desc: 'Khi hai âm tiết thanh 3 đi liền nhau, âm thứ nhất đọc thành thanh 2.',
        examples: [
          { chinese: '你好 (nǐ + hǎo)', pinyin: 'Ní hǎo', note: 'Phát âm là Ní hǎo' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzì?', vietnamese: 'Xin chào! Bạn tên là gì?', highlights: ['叫', '什么'] },
      { speaker: 'B', chinese: '我叫李明。你是越南人吗？', pinyin: 'Wǒ jiào Lǐ Míng. Nǐ shì Yuènán rén ma?', vietnamese: 'Tôi tên là Lý Minh. Bạn là người Việt Nam phải không?', highlights: ['叫', '吗'] }
    ]
  },

  'unit-hsk1-2': {
    grammars: [
      {
        title: '1. Trợ từ kết cấu 的 (Biểu thị quan hệ sở hữu)',
        formula: 'Người sở hữu + 的 + Vật sở hữu',
        explanation: '的 (de) biểu thị "của". Với người thân ruột thịt (bố, mẹ, anh, em) có thể lược bỏ 的.',
        examples: [
          { chinese: '这是我的书。', pinyin: 'Zhè shì wǒ de shū.', vietnamese: 'Đây là sách của tôi.', highlights: ['我的'] },
          { chinese: '我妈妈很漂亮。', pinyin: 'Wǒ māma hěn piàoliang.', vietnamese: 'Mẹ của tôi rất xinh đẹp (lược bỏ 的).', highlights: ['我妈妈'] }
        ]
      },
      {
        title: '2. Lượng từ 口 (kǒu) dùng cho nhân khẩu gia đình',
        formula: '我家有 + [Số] + 口 + 人',
        explanation: 'Đếm số lượng thành viên trong gia đình dùng 口.',
        examples: [
          { chinese: '你家有几口人？', pinyin: 'Nǐ jiā yǒu jǐ kǒu rén?', vietnamese: 'Gia đình bạn có mấy người?', highlights: ['几口人'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Thanh nhẹ trong từ xưng hô gia đình lặp âm',
        desc: 'Các từ lặp âm như 爸爸, 妈妈, 哥哥, 姐姐 âm sau luôn đọc thanh nhẹ.',
        examples: [
          { chinese: '爸爸', pinyin: 'Bàba', note: 'Âm ba sau nhẹ và lướt' },
          { chinese: '妈妈', pinyin: 'Māma', note: 'Âm ma sau nhẹ và lướt' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '那是你姐姐吗？', pinyin: 'Nà shì nǐ jiějie ma?', vietnamese: 'Kia có phải là chị gái của bạn không?', highlights: ['姐姐', '吗'] },
      { speaker: 'B', chinese: '是的，她是我姐姐，她是医生。', pinyin: 'Shì de, tā shì wǒ jiějie, tā shì yīshēng.', vietnamese: 'Đúng vậy, chị ấy là chị gái tôi, chị ấy là bác sĩ.', highlights: ['姐姐', '医生'] }
    ]
  },

  'unit-hsk1-3': {
    grammars: [
      {
        title: '1. Động từ năng nguyện 想 (Muốn, dự định)',
        formula: 'Chủ ngữ + 想 + Động từ + Tân ngữ',
        explanation: '想 (xiǎng) biểu thị mong muốn chủ quan làm điều gì đó.',
        examples: [
          { chinese: '我想喝中国茶。', pinyin: 'Wǒ xiǎng hē Zhōngguó chá.', vietnamese: 'Tôi muốn uống trà Trung Quốc.', highlights: ['想', '喝'] },
          { chinese: '中午你想吃什么？', pinyin: 'Zhōngwǔ nǐ xiǎng chī shénme?', vietnamese: 'Buổi trưa bạn muốn ăn gì?', highlights: ['想', '吃'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Biến điệu của 不 (Bù)',
        desc: '不 nguyên bản đọc thanh 4 (bù). Nhưng đứng trước một âm tiết thanh 4 khác thì chuyển thành thanh 2 (bú)!',
        examples: [
          { chinese: '不是 (bú shì)', pinyin: 'Bú shì', note: 'Đọc thanh 2 trước 是 (shì - thanh 4)' },
          { chinese: '不吃 (bù chī)', pinyin: 'Bù chī', note: 'Giữ nguyên thanh 4 trước 吃 (chī - thanh 1)' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '今天中午你想吃米饭还是面条？', pinyin: 'Jīntiān zhōngwǔ nǐ xiǎng chī mǐfàn háishi miàntiáo?', vietnamese: 'Trưa nay bạn muốn ăn cơm hay mì sợi?', highlights: ['想', '吃'] },
      { speaker: 'B', chinese: '我想吃米饭，还想喝一杯茶。', pinyin: 'Wǒ xiǎng chī mǐfàn, hái xiǎng hē yì bēi chá.', vietnamese: 'Tôi muốn ăn cơm, và còn muốn uống một ly trà.', highlights: ['想', '喝'] }
    ]
  },

  'unit-hsk1-4': {
    grammars: [
      {
        title: '1. Diễn đạt Ngày, Tháng, Thứ trong tiếng Trung',
        formula: '[Năm] 年 + [Tháng] 月 + [Ngày] 号/日 + 星期 [Thứ]',
        explanation: 'Quy tắc vàng: Thứ tự thời gian tiếng Trung luôn đi từ lớn đến nhỏ (Năm -> Tháng -> Ngày -> Giờ).',
        examples: [
          { chinese: '今天十月二十六号，星期一。', pinyin: 'Jīntiān shí yuè èrshíliù hào, xīngqīyī.', vietnamese: 'Hôm nay là ngày 26 tháng 10, thứ Hai.', highlights: ['月', '号', '星期'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc nhấn trọng âm thời gian',
        desc: 'Trong cụm từ chỉ ngày tháng, trọng âm thường rơi vào con số cụ thể.',
        examples: [
          { chinese: '星期五', pinyin: 'Xīngqīwǔ', note: 'Nhấn rõ chữ 五' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '今天几月几号？', pinyin: 'Jīntiān jǐ yuè jǐ hào?', vietnamese: 'Hôm nay là ngày mấy tháng mấy?', highlights: ['几月几号'] },
      { speaker: 'B', chinese: '今天十月一号，是国庆节。', pinyin: 'Jīntiān shí yuè yī hào, shì guóqìngjié.', vietnamese: 'Hôm nay ngày 1 tháng 10, là ngày Quốc khánh.', highlights: ['十月', '一号'] }
    ]
  },

  'unit-hsk1-5': {
    grammars: [
      {
        title: '1. Cấu trúc cảm thán 太……了 (Quá, lắm)',
        formula: '太 + Tính từ + 了',
        explanation: 'Dùng để nhấn mạnh mức độ cao của tính từ (khen ngợi hoặc phàn nàn).',
        examples: [
          { chinese: '这个苹果太甜了！', pinyin: 'Zhège píngguǒ tài tián le!', vietnamese: 'Quả táo này ngọt quá!', highlights: ['太', '了'] },
          { chinese: '太贵了，便宜一点吧。', pinyin: 'Tài guì le, piányi yìdiǎn ba.', vietnamese: 'Đắt quá rồi, rẻ hơn một chút đi.', highlights: ['太贵了'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Trợ từ 了 phát âm thanh nhẹ',
        desc: 'Chữ 了 (le) luôn đọc nhẹ và dứt khoát.',
        examples: [
          { chinese: '太好了 (Tài hǎo le)', pinyin: 'Tài hǎo le', note: 'Âm le đọc lướt nhanh' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '老板，苹果多少钱一斤？', pinyin: 'Lǎobǎn, píngguǒ duōshao qián yì jīn?', vietnamese: 'Ông chủ, táo bao nhiêu tiền một cân?', highlights: ['多少钱', '一斤'] },
      { speaker: 'B', chinese: '八块钱一斤。', pinyin: 'Bā kuài qián yì jīn.', vietnamese: 'Tám tệ một cân.', highlights: ['八块'] }
    ]
  },

  'unit-hsk1-6': {
    grammars: [
      {
        title: '1. Giới từ chỉ nơi chốn 在 (Ở, tại)',
        formula: 'Chủ ngữ + 在 + Địa điểm + Động từ + Tân ngữ',
        explanation: 'Khác với tiếng Việt (nói hành động trước địa điểm), tiếng Trung bắt buộc đặt "ở đâu" (在 + Nơi chốn) TRƯỚC hành động!',
        examples: [
          { chinese: '我们在学校学习汉语。', pinyin: 'Wǒmen zài xuéxiào xuéxí Hànyǔ.', vietnamese: 'Chúng tôi học tiếng Hán ở trường (Tại trường học tiếng Hán).', highlights: ['在学校', '学习'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc thanh 4 dứt khoát của 在 (zài)',
        desc: 'Trong câu chỉ địa điểm, giới từ 在 hạ giọng dứt khoát từ cao độ 5 xuống 1.',
        examples: [
          { chinese: '在家里', pinyin: 'Zài jiā lǐ', note: 'Zài nhấn dứt khoát' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '王老师现在在哪儿？', pinyin: 'Wáng lǎoshī xiànzài zài nǎr?', vietnamese: 'Thầy giáo Vương hiện đang ở đâu?', highlights: ['在哪儿'] },
      { speaker: 'B', chinese: '他在三楼教室教中文呢。', pinyin: 'Tā zài sān lóu jiàoshì jiāo Zhōngwén ne.', vietnamese: 'Thầy đang ở phòng học tầng ba dạy tiếng Trung.', highlights: ['在', '教室'] }
    ]
  },

  'unit-hsk1-7': {
    grammars: [
      {
        title: '1. Câu liên động biểu thị mục đích với 去',
        formula: 'Chủ ngữ + 去 + Nơi chốn + Động từ / Mục đích',
        explanation: 'Mẫu câu "Đi đâu làm gì": đi đến địa điểm nào để thực hiện mục đích gì.',
        examples: [
          { chinese: '我明天去医院看医生。', pinyin: 'Wǒ míngtiān qù yīyuàn kàn yīshēng.', vietnamese: 'Ngày mai tôi đi bệnh viện khám bác sĩ.', highlights: ['去医院', '看医生'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chuẩn âm vần "ü" trong 去 (qù)',
        desc: 'Âm ü tròn môi, giữ khẩu hình nguyên vị trí khi phát âm.',
        examples: [
          { chinese: '去 (qù)', pinyin: 'Qù', note: 'Tròn môi như huýt sáo' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你坐出租车还是乘公共汽车去？', pinyin: 'Nǐ zuò chūzūchē háishi chéng gōnggòng qìchē qù?', vietnamese: 'Bạn đi xe taxi hay đi xe buýt vậy?', highlights: ['出租车', '公共汽车'] },
      { speaker: 'B', chinese: '我坐出租车，很快就能到。', pinyin: 'Wǒ zuò chūzūchē, hěn kuài jiù néng dào.', vietnamese: 'Tôi đi taxi, rất nhanh là tới.', highlights: ['坐', '快'] }
    ]
  },

  // ==================== HSK 2 ====================
  'unit-hsk2-1': {
    grammars: [
      {
        title: '1. Câu so sánh chữ 比 (Bǐ - Hơn)',
        formula: 'A + 比 + B + Tính từ (+ Số lượng chênh lệch)',
        explanation: 'Dùng 比 để so sánh mức độ giữa hai đối tượng A và B.',
        examples: [
          { chinese: '哥哥比我高五厘米。', pinyin: 'Gēge bǐ wǒ gāo wǔ límǐ.', vietnamese: 'Anh trai cao hơn tôi năm xăng-ti-mét.', highlights: ['比', '高'] },
          { chinese: '今天比昨天冷一点儿。', pinyin: 'Jīntiān bǐ zuótiān lěng yìdiǎnr.', vietnamese: 'Hôm nay lạnh hơn hôm qua một chút.', highlights: ['比', '冷'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm thanh 3 của chữ 比 (bǐ)',
        desc: 'Khi đứng trước danh từ thanh 4 hoặc thanh 1, thanh 3 của 比 đọc đầy đủ trầm xuống.',
        examples: [
          { chinese: '比昨天', pinyin: 'Bǐ zuótiān', note: 'Bǐ đọc trầm sâu' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '这件红色的衣服比那件便宜吗？', pinyin: 'Zhè jiàn hóngsè de yīfu bǐ nà jiàn piányi ma?', vietnamese: 'Chiếc áo đỏ này có rẻ hơn chiếc kia không?', highlights: ['比', '便宜'] },
      { speaker: 'B', chinese: '是的，而且质量非常好。', pinyin: 'Shì de, érqiě zhìliàng fēicháng hǎo.', vietnamese: 'Đúng vậy, mà chất lượng còn rất tốt nữa.', highlights: ['而且', '好'] }
    ]
  },

  'unit-hsk2-2': {
    grammars: [
      {
        title: '1. Giới từ khoảng cách 离 (Lí - Cách)',
        formula: 'A + 离 + B + 很远 / 很近 / Có số đo khoảng cách',
        explanation: '离 biểu thị khoảng cách không gian hoặc thời gian giữa hai mốc.',
        examples: [
          { chinese: '学校离我家很近。', pinyin: 'Xuéxiào lí wǒ jiā hěn jìn.', vietnamese: 'Trường học cách nhà tôi rất gần.', highlights: ['离', '近'] }
        ]
      },
      {
        title: '2. Giới từ chỉ phương hướng 往 (Hướng về phía)',
        formula: '往 + Hướng (东/南/西/北/左/右) + 走/拐',
        explanation: 'Chỉ dẫn hướng di chuyển: 往左拐 (rẽ trái), 往前走 (đi thẳng về phía trước).',
        examples: [
          { chinese: '从这里往前走一百米。', pinyin: 'Cóng zhèlǐ wǎng qián zǒu yìbǎi mǐ.', vietnamese: 'Từ đây đi thẳng về phía trước 100 mét.', highlights: ['往前走'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm âm uốn lưỡi 儿 (r)',
        desc: 'Trong khẩu ngữ phương bắc: 这儿 (nơi này), 那儿 (nơi kia), 哪儿 (ở đâu).',
        examples: [
          { chinese: '在哪儿', pinyin: 'Zài nǎr', note: 'Uốn cong đầu lưỡi chạm ngạc mềm' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '请问，地铁站离这儿远不远？', pinyin: 'Qǐngwèn, dìtiězhàn lí zhèr yuǎn bù yuǎn?', vietnamese: 'Xin hỏi, ga tàu điện ngầm cách đây có xa không?', highlights: ['离', '远'] },
      { speaker: 'B', chinese: '不远，往前走五分钟就到了。', pinyin: 'Bù yuǎn, wǎng qián zǒu wǔ fēnzhōng jiù dào le.', vietnamese: 'Không xa, đi thẳng năm phút là tới.', highlights: ['往前走', '到了'] }
    ]
  },

  'unit-hsk2-3': {
    grammars: [
      {
        title: '1. Cặp liên từ chỉ nguyên nhân kết quả 因为……所以……',
        formula: '因为 + [Nguyên nhân], 所以 + [Kết quả]',
        explanation: 'Biểu thị vì lý do A nên dẫn đến kết quả B.',
        examples: [
          { chinese: '因为今天下雨，所以我没去跑步。', pinyin: 'Yīnwèi jīntiān xià yǔ, suǒyǐ wǒ méi qù pǎobù.', vietnamese: 'Bởi vì hôm nay trời mưa, cho nên tôi không đi chạy bộ.', highlights: ['因为', '所以'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Quy tắc thanh nhẹ của từ 生病 (shēngbìng)',
        desc: 'Nhấn rõ thanh 1 của 生 và thanh 4 dứt khoát của 病.',
        examples: [
          { chinese: '生病', pinyin: 'Shēngbìng', note: 'Nhấn mạnh cả 2 âm' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你脸色不太好，怎么了？', pinyin: 'Nǐ liǎnsè bú tài hǎo, zěnme le?', vietnamese: 'Sắc mặt bạn không tốt lắm, bị sao vậy?', highlights: ['不太好'] },
      { speaker: 'B', chinese: '我感冒发烧了，头很疼。', pinyin: 'Wǒ gǎnmào fāshāo le, tóu hěn téng.', vietnamese: 'Tôi bị cảm sốt rồi, đầu rất đau.', highlights: ['感冒', '发烧'] }
    ]
  },

  'unit-hsk2-4': {
    grammars: [
      {
        title: '1. Động từ năng nguyện 可以 và 能 (Có thể)',
        formula: 'Chủ ngữ + 能/可以 + Động từ',
        explanation: '能 biểu thị năng lực bẩm sinh hoặc điều kiện khách quan. 可以 biểu thị sự cho phép hoặc khả năng.',
        examples: [
          { chinese: '你现在能来吗？', pinyin: 'Nǐ xiànzài néng lái ma?', vietnamese: 'Bây giờ bạn có thể đến được không?', highlights: ['能'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chuẩn từ 游泳 (yóuyǒng)',
        desc: 'Âm 游 thanh 2 vút lên, 泳 thanh 3 trầm xuống.',
        examples: [
          { chinese: '游泳', pinyin: 'Yóuyǒng', note: 'Thanh 2 + Thanh 3' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '周末你喜欢做什么运动？', pinyin: 'Zhōumò nǐ xǐhuan zuò shénme yùndòng?', vietnamese: 'Cuối tuần bạn thích chơi môn thể thao nào?', highlights: ['喜欢', '运动'] },
      { speaker: 'B', chinese: '我最喜欢游泳和踢足球。', pinyin: 'Wǒ zuì xǐhuan yóuyǒng hé tī zúqiú.', vietnamese: 'Tôi thích nhất là bơi lội và đá bóng.', highlights: ['游泳', '踢足球'] }
    ]
  },

  'unit-hsk2-5': {
    grammars: [
      {
        title: '1. Trợ từ động thái 过 (Đã từng trải qua)',
        formula: 'Chủ ngữ + Động từ + 过 + Tân ngữ',
        explanation: 'Nhấn mạnh một kinh nghiệm, trải nghiệm đã từng xảy ra trong quá khứ.',
        examples: [
          { chinese: '我去过北京两次。', pinyin: 'Wǒ qù guo Běijīng liǎng cì.', vietnamese: 'Tôi đã từng đi Bắc Kinh hai lần.', highlights: ['去过'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: '过 (guo) là trợ từ đọc thanh nhẹ',
        desc: 'Đứng ngay sau động từ, đọc nhẹ lướt.',
        examples: [
          { chinese: '吃过 (chī guo)', pinyin: 'Chī guo', note: 'Đọc lướt chữ guo' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你想租什么样的房子？', pinyin: 'Nǐ xiǎng zū shénmeyàng de fángzi?', vietnamese: 'Bạn muốn thuê căn nhà như thế nào?', highlights: ['租', '房子'] },
      { speaker: 'B', chinese: '我想找一个离公司近、环境干净的房间。', pinyin: 'Wǒ xiǎng zhǎo yí gè lí gōngsī jìn, huánjìng gānjìng de fángjiān.', vietnamese: 'Tôi muốn tìm phòng gần công ty và môi trường sạch sẽ.', highlights: ['离', '近', '干净'] }
    ]
  },

  'unit-hsk2-6': {
    grammars: [
      {
        title: '1. Câu biểu thị hành động đang diễn ra 正在……呢',
        formula: 'Chủ ngữ + 正在 + Động từ + (Tân ngữ) + 呢',
        explanation: 'Nhấn mạnh hành động đang diễn ra tại thời điểm nói (tương đương V-ing).',
        examples: [
          { chinese: '他正在准备生日礼物呢。', pinyin: 'Tā zhèngzài zhǔnbèi shēngrì lǐwù ne.', vietnamese: 'Anh ấy đang chuẩn bị quà sinh nhật đấy.', highlights: ['正在', '呢'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Trợ từ ngữ khí 呢 (ne) đọc thanh nhẹ',
        desc: 'Treo nhẹ giọng ở cuối câu cảm giác thân thiện.',
        examples: [
          { chinese: '看书呢', pinyin: 'Kàn shū ne', note: 'Âm ne nhẹ nhàng' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '喂，小王你在做什么呢？', pinyin: 'Wèi, Xiǎo Wáng nǐ zài zuò shénme ne?', vietnamese: 'Alo, Tiểu Vương bạn đang làm gì đấy?', highlights: ['在', '呢'] },
      { speaker: 'B', chinese: '我正在做晚饭呢，快来一起吃吧！', pinyin: 'Wǒ zhèngzài zuò wǎnfàn ne, kuài lái yìqǐ chī ba!', vietnamese: 'Tôi đang nấu cơm tối đây, mau sang ăn cùng nhé!', highlights: ['正在', '做晚饭'] }
    ]
  },

  'unit-hsk2-7': {
    grammars: [
      {
        title: '1. Bổ ngữ kết quả: Động từ + 完 / 好 / 到 / 见',
        formula: 'Động từ + [完/好/到/见] + Tân ngữ',
        explanation: 'Biểu thị kết quả đạt được của hành động: 做完 (làm xong), 准备好 (chuẩn bị tốt), 看到 (nhìn thấy).',
        examples: [
          { chinese: '作业我已经做完了。', pinyin: 'Zuòyè wǒ yǐjīng zuò wán le.', vietnamese: 'Bài tập tôi đã làm xong rồi.', highlights: ['做完'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Nhấn trọng âm vào bổ ngữ kết quả',
        desc: 'Trong cụm Động từ + Bổ ngữ, nhấn mạnh rõ vào từ kết quả (完, 好).',
        examples: [
          { chinese: '吃好了', pinyin: 'Chī hǎo le', note: 'Nhấn mạnh chữ 好' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '明天周末我们去爬山，照相机准备好了吗？', pinyin: 'Míngtiān zhōumò wǒmen qù páshān, zhàoxiàngjī zhǔnbèi hǎo le ma?', vietnamese: 'Mai cuối tuần đi leo núi, máy ảnh chuẩn bị xong chưa?', highlights: ['爬山', '准备好'] },
      { speaker: 'B', chinese: '早就准备好了，明天早上七点出发！', pinyin: 'Zǎo jiù zhǔnbèi hǎo le, míngtiān zǎoshang qī diǎn chūfā!', vietnamese: 'Đã chuẩn bị xong từ sớm rồi, mai 7 giờ sáng xuất phát!', highlights: ['准备好'] }
    ]
  },

  // ==================== HSK 3 ====================
  'unit-hsk3-1': {
    grammars: [
      {
        title: '1. Câu chữ 把 (Bả - Xử lý tân ngữ cụ thể)',
        formula: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (了/到/在/给)',
        explanation: 'Dùng khi muốn nhấn mạnh sự xử lý, tác động làm biến đổi vị trí hoặc trạng thái của tân ngữ xác định.',
        examples: [
          { chinese: '请把手机关了。', pinyin: 'Qǐng bǎ shǒujī guān le.', vietnamese: 'Xin hãy tắt điện thoại đi.', highlights: ['把', '关了'] },
          { chinese: '请把计划书交给李经理。', pinyin: 'Qǐng bǎ jìhuàshū jiāo gěi Lǐ jīnglǐ.', vietnamese: 'Xin hãy giao bản kế hoạch cho Giám đốc Lý.', highlights: ['把', '交给'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chữ 把 (bǎ) trong câu',
        desc: '把 mang thanh 3 lướt nhanh sang tân ngữ để giữ mạch câu tự nhiên.',
        examples: [
          { chinese: '把门关上', pinyin: 'Bǎ mén guānshang', note: 'Bǎ nói liền mạch sang mén' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '张经理，面试者的简历您看了吗？', pinyin: 'Zhāng jīnglǐ, miànshìzhě de jiǎnlì nín kàn le ma?', vietnamese: 'Giám đốc Trương, hồ sơ ứng viên phỏng vấn ông đã xem chưa?', highlights: ['经理', '面试'] },
      { speaker: 'B', chinese: '我看过了，请把这几份材料复印一下，下午两点开会。', pinyin: 'Wǒ kàn guo le, qǐng bǎ zhè jǐ fèn cáiliào fùyìn yíxià, xiàwǔ liǎng diǎn kāihuì.', vietnamese: 'Tôi xem rồi, hãy photo vài bản tài liệu này, 2 giờ chiều họp.', highlights: ['把', '复印', '开会'] }
    ]
  },

  'unit-hsk3-2': {
    grammars: [
      {
        title: '1. Cấu trúc 越来越…… (Càng ngày càng...)',
        formula: 'Chủ ngữ + 越来越 + Tính từ / Động từ tâm lý',
        explanation: 'Biểu thị mức độ thay đổi dần dần tăng tiến theo thời gian.',
        examples: [
          { chinese: '山顶的风景越来越漂亮了。', pinyin: 'Shāndǐng de fēngjǐng yuè lái yuè piàoliang le.', vietnamese: 'Phong cảnh đỉnh núi càng ngày càng đẹp.', highlights: ['越来越漂亮'] },
          { chinese: '他的汉语说得越来越流利了。', pinyin: 'Tā de Hànyǔ shuō de yuè lái yuè liúlì le.', vietnamese: 'Tiếng Hán của anh ấy nói càng ngày càng lưu loát.', highlights: ['越来越流利'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Nhịp điệu cấu trúc 越来越 (yuè lái yuè)',
        desc: 'Thanh 4 + Thanh 2 + Thanh 4: dứt khoát -> vút -> dứt khoát.',
        examples: [
          { chinese: '越来越好', pinyin: 'Yuè lái yuè hǎo', note: 'Âm điệu nhịp nhàng' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '飞机马上就要起飞了，你的护照和登机牌拿好了吗？', pinyin: 'Fēijī mǎshàng jiù yào qǐfēi le, nǐ de hùzhào hé dēngjīpái ná hǎo le ma?', vietnamese: 'Máy bay sắp sửa cất cánh rồi, hộ chiếu và vé máy bay bạn cầm chắc chưa?', highlights: ['飞机', '起飞', '护照'] },
      { speaker: 'B', chinese: '都在行李箱前袋里呢，放心吧！', pinyin: 'Dōu zài xínglǐxiāng qiándài lǐ ne, fàngxīn ba!', vietnamese: 'Đều ở ngăn trước va li hành lý cả rồi, yên tâm đi!', highlights: ['行李箱', '放心'] }
    ]
  },

  'unit-hsk3-3': {
    grammars: [
      {
        title: '1. Cặp liên từ 不但……而且…… (Không những... mà còn...)',
        formula: 'Chủ ngữ + 不但 + [Điểm tốt 1], 而且 + [Điểm tốt 2]',
        explanation: 'Biểu thị mức độ tiến thêm một bước trong câu nối tiếp.',
        examples: [
          { chinese: '他不但认真负责，而且工作效率极高。', pinyin: 'Tā búdàn rènzhēn fùzé, érqiě gōngzuò xiàolǜ jí gāo.', vietnamese: 'Anh ấy không những nghiêm túc trách nhiệm, mà hiệu quả công việc còn cực kỳ cao.', highlights: ['不但', '而且'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Trọng âm trong liên từ 而且 (érqiě)',
        desc: 'Nhấn mạnh chữ 且 (qiě) với thanh 3 rõ nét.',
        examples: [
          { chinese: '而且', pinyin: 'Érqiě', note: 'Thanh 2 + Thanh 3' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '这次项目的技术难题解决了吗？', pinyin: 'Zhè cì xiàngmù de jìshù nántí jiějué le ma?', vietnamese: 'Khó khăn kỹ thuật của dự án lần này đã giải quyết xong chưa?', highlights: ['难题', '解决'] },
      { speaker: 'B', chinese: '经过同事们共同努力，终于顺利完成了！', pinyin: 'Jīngguò tóngshìmen gòngtóng nǔlì, zhōngyú shùnlì wánchéng le!', vietnamese: 'Qua nỗ lực chung của đồng nghiệp, cuối cùng đã hoàn thành suôn sẻ!', highlights: ['同事', '终于', '完成'] }
    ]
  },

  'unit-hsk3-4': {
    grammars: [
      {
        title: '1. Câu bị động với chữ 被 (Bèi - Bị, được)',
        formula: 'Chủ ngữ + 被 (+ Tác nhân) + Động từ + Thành phần khác',
        explanation: 'Biểu thị chủ ngữ chịu sự tác động không mong muốn hoặc chịu kết quả từ bên ngoài.',
        examples: [
          { chinese: '桌上的西瓜被弟弟吃完了。', pinyin: 'Zhuō shang de xīguā bèi dìdi chī wán le.', vietnamese: 'Dưa hấu trên bàn đã bị em trai ăn hết rồi.', highlights: ['被', '吃完了'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm dứt khoát chữ 被 (bèi)',
        desc: 'Thanh 4 mạnh mẽ, dứt khoát.',
        examples: [
          { chinese: '被发现了', pinyin: 'Bèi fāxiàn le', note: 'Bèi thanh 4 chắc chắn' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你怎么看起来这么着急？', pinyin: 'Nǐ zěnme kàn qǐlai zhème zháojí?', vietnamese: 'Sao trông bạn có vẻ sốt ruột thế?', highlights: ['着急'] },
      { speaker: 'B', chinese: '我的自行车被别人骑走了，我找不到钥匙！', pinyin: 'Wǒ de zìxíngchē bèi biéren qí zǒu le, wǒ zhǎo bù dào yàoshi!', vietnamese: 'Xe đạp của tôi bị người khác đi mất rồi, tôi không tìm thấy chìa khóa!', highlights: ['被', '别人'] }
    ]
  },

  'unit-hsk3-5': {
    grammars: [
      {
        title: '1. Cấu trúc 除了……以外，都/还…… (Ngoài... ra)',
        formula: '除了 + A + 以外，(Chủ ngữ) + 都 / 还 + [Vị ngữ]',
        explanation: 'Ngoài A ra thì tất cả đều... (loại trừ với 都) hoặc ngoài A ra vẫn còn có thêm B (bổ sung với 还).',
        examples: [
          { chinese: '除了他以外，大家都按时到了。', pinyin: 'Chúle tā yǐwài, dàjiā dōu ànshí dào le.', vietnamese: 'Ngoại trừ anh ấy ra, mọi người đều đã đến đúng giờ.', highlights: ['除了', '以外', '都'] },
          { chinese: '除了汉语以外，他还会说法语。', pinyin: 'Chúle Hànyǔ yǐwài, tā hái huì shuō Fǎyǔ.', vietnamese: 'Ngoài tiếng Trung ra, anh ấy còn biết nói tiếng Pháp.', highlights: ['除了', '还'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm cụm 除了 (chúle)',
        desc: 'Chú thanh 2 vút lên, le thanh nhẹ.',
        examples: [
          { chinese: '除了', pinyin: 'Chúle', note: 'Thanh 2 + Thanh nhẹ' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '服务员，请给我们拿一下菜单和两双筷子。', pinyin: 'Fúwùyuán, qǐng gěi wǒmen ná yíxià càidān hé liǎng shuāng kuàizi.', vietnamese: 'Phục vụ ơi, xin lấy giúp chúng tôi thực đơn và hai đôi đũa.', highlights: ['菜单', '筷子'] },
      { speaker: 'B', chinese: '好的，请问两位能吃辣吗？', pinyin: 'Hǎo de, qǐngwèn liǎng wèi néng chī là ma?', vietnamese: 'Vâng ạ, xin hỏi hai vị có ăn cay được không?', highlights: ['能', '辣'] }
    ]
  },

  'unit-hsk3-6': {
    grammars: [
      {
        title: '1. Cấu trúc 一边……一边…… (Vừa... vừa...)',
        formula: 'Chủ ngữ + 一边 + [Hành động 1] + 一边 + [Hành động 2]',
        explanation: 'Biểu thị hai hành động xảy ra song song đồng thời cùng lúc.',
        examples: [
          { chinese: '他喜欢一边听音乐一边看书。', pinyin: 'Tā xǐhuan yìbiān tīng yīnyuè yìbiān kàn shū.', vietnamese: 'Anh ấy thích vừa nghe nhạc vừa đọc sách.', highlights: ['一边', '一边'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Biến điệu của 一边 (yìbiān)',
        desc: 'Trước 边 (biān - thanh 1), chữ 一 đổi thành thanh 4: yìbiān.',
        examples: [
          { chinese: '一边', pinyin: 'Yìbiān', note: 'Đọc thanh 4 yì' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你在网上买的笔记本电脑送到了吗？', pinyin: 'Nǐ zài wǎngshang mǎi de bǐjìběn diànnǎo sòng dào le ma?', vietnamese: 'Máy tính xách tay bạn mua qua mạng đã giao tới chưa?', highlights: ['笔记本电脑', '送到'] },
      { speaker: 'B', chinese: '今天刚送到，快递小哥非常负责！', pinyin: 'Jīntiān gāng sòng dào, kuàidì xiǎogē fēicháng fùzé!', vietnamese: 'Hôm nay vừa giao tới, anh shipper rất có trách nhiệm!', highlights: ['刚', '负责'] }
    ]
  },

  'unit-hsk3-7': {
    grammars: [
      {
        title: '1. Cặp liên từ 虽然……但是…… (Tuy... nhưng...)',
        formula: '虽然 + [Sự thật đối lập], 但是 + [Kết quả thực tế]',
        explanation: 'Biểu thị mối quan hệ nhượng bộ, chuyển tiếp.',
        examples: [
          { chinese: '虽然锻炼身体很累，但是对健康很有好处。', pinyin: 'Suīrán duànliàn shēntǐ hěn lèi, dànshì duì jiànkāng hěn yǒu hǎochù.', vietnamese: 'Tuy rèn luyện thân thể rất mệt, nhưng rất có lợi cho sức khỏe.', highlights: ['虽然', '但是'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chuẩn cụm 虽然 (suīrán)',
        desc: 'Suī thanh 1 cao đều, rán thanh 2 vút lên.',
        examples: [
          { chinese: '虽然', pinyin: 'Suīrán', note: 'Thanh 1 + Thanh 2' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你坚持每天早上跑步多长时间了？', pinyin: 'Nǐ jiānchí měitiān zǎoshang pǎobù duō cháng shíjiān le?', vietnamese: 'Bạn kiên trì chạy bộ mỗi sáng được bao lâu rồi?', highlights: ['跑步', '多长时间'] },
      { speaker: 'B', chinese: '已经有半年了，现在不仅体重下降了，而且精神特别好！', pinyin: 'Yǐjīng yǒu bàn nián le, xiànzài bùjǐn tǐzhòng xiàjiàng le, érqiě jīngshen tèbié hǎo!', vietnamese: 'Đã được nửa năm rồi, giờ không chỉ cân nặng giảm mà tinh thần còn đặc biệt sảng khoái!', highlights: ['半年', '不仅', '而且'] }
    ]
  },

  'unit-hsk1-8': {
    grammars: [
      {
        title: '1. Mẫu câu hỏi và miêu tả thời tiết với 天气 (tiānqì)',
        formula: '今天天气 + [Tính từ: 很好 / 很冷 / 不热] | 今天天气怎么样？',
        explanation: 'Hỏi thời tiết dùng "怎么样" (thế nào). Miêu tả thời tiết trực tiếp bằng tính từ.',
        examples: [
          { chinese: '今天天气很好，不冷也不热。', pinyin: 'Jīntiān tiānqì hěn hǎo, bù lěng yě bú rè.', vietnamese: 'Hôm nay thời tiết rất đẹp, không lạnh cũng không nóng.', highlights: ['天气', '很好'] }
        ]
      },
      {
        title: '2. Bày tỏ sở thích giải trí: 喜欢 + Động từ',
        formula: '我喜欢 + [看电影 / 听音乐 / 看书]',
        explanation: 'Động từ 喜欢 (xǐhuan: thích) có thể kết hợp trực tiếp với cụm động từ chỉ hành động.',
        examples: [
          { chinese: '明天我想去看电影。', pinyin: 'Míngtiān wǒ xiǎng qù kàn diànyǐng.', vietnamese: 'Ngày mai tôi muốn đi xem phim.', highlights: ['看电影'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm biến điệu của 不 (bù)',
        desc: 'Đứng trước từ mang thanh 4, 不 đọc thành thanh 2 (bú). Ví dụ: 不热 (bú rè), 不去 (bú qù).',
        examples: [
          { chinese: '不热', pinyin: 'Bú rè', note: 'Biến điệu thanh 2 + 4' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '今天天气怎么样？', pinyin: 'Jīntiān tiānqì zěnmeyàng?', vietnamese: 'Hôm nay thời tiết thế nào?', highlights: ['天气'] },
      { speaker: 'B', chinese: '今天天气很好，下午我们一起去公园散步吧！', pinyin: 'Jīntiān tiānqì hěn hǎo, xiàwǔ wǒmen yìqǐ qù gōngyuán sànbù ba!', vietnamese: 'Hôm nay thời tiết rất đẹp, chiều nay chúng ta cùng đi công viên đi dạo nhé!', highlights: ['一起', '公园'] }
    ]
  },

  'unit-hsk2-8': {
    grammars: [
      {
        title: '1. Động từ năng nguyện 要 (yào: cần phải / sẽ)',
        formula: 'Chủ ngữ + 要 + Động từ',
        explanation: 'Biểu thị ý định hoặc sự cần thiết phải thực hiện công việc.',
        examples: [
          { chinese: '今天事情很多，我要加班。', pinyin: 'Jīntiān shìqing hěn duō, wǒ yào jiābān.', vietnamese: 'Hôm nay nhiều việc quá, tôi cần phải tăng ca.', highlights: ['要', '加班'] }
        ]
      },
      {
        title: '2. Mẫu câu nghe gọi điện thoại chuẩn công sở',
        formula: '喂，请问 + [Người muốn tìm] + 在吗？',
        explanation: 'Khẩu ngữ gọi điện thoại lịch thiệp mở đầu bằng 喂 (wèi: a lô).',
        examples: [
          { chinese: '喂，请问王经理在吗？', pinyin: 'Wèi, qǐngwèn Wáng jīnglǐ zài ma?', vietnamese: 'A lô, xin hỏi Giám đốc Vương có ở đó không ạ?', highlights: ['喂', '请问'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Thanh điệu từ 加班 (jiābān)',
        desc: 'Hai âm tiết thanh 1 đi liền nhau: ngân cao và đều.',
        examples: [
          { chinese: '加班', pinyin: 'Jiābān', note: 'Thanh 1 + Thanh 1' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '李明，你今天几点下班？', pinyin: 'Lǐ Míng, nǐ jīntiān jǐ diǎn xiàbān?', vietnamese: 'Lý Minh, hôm nay mấy giờ bạn tan làm?', highlights: ['几点', '下班'] },
      { speaker: 'B', chinese: '今天事情有点儿多，估计要加班到八点。', pinyin: 'Jīntiān shìqing yǒudiǎnr duō, gūjì yào jiābān dào bā diǎn.', vietnamese: 'Hôm nay có hơi nhiều việc, dự tính phải tăng ca đến 8 giờ tối.', highlights: ['加班', '八点'] }
    ]
  },

  'unit-hsk3-8': {
    grammars: [
      {
        title: '1. Cấu trúc câu vị ngữ là danh từ: 是……的责任 (Là trách nhiệm của...)',
        formula: '[Hành động] + 是 + [Đối tượng] + 的责任',
        explanation: 'Nhấn mạnh nghĩa vụ và ý thức công dân.',
        examples: [
          { chinese: '保护环境是每个人的责任。', pinyin: 'Bǎohù huánjìng shì měi gè rén de zérèn.', vietnamese: 'Bảo vệ môi trường là trách nhiệm của mỗi người.', highlights: ['保护环境', '责任'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chuẩn từ 环境 (huánjìng)',
        desc: 'Huán thanh 2 vút lên, jìng thanh 4 dứt khoát.',
        examples: [
          { chinese: '环境', pinyin: 'Huánjìng', note: 'Thanh 2 + Thanh 4' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '你去超市怎么自己带布袋子？', pinyin: 'Nǐ qù chāoshì zěnme zìjǐ dài bù dàizi?', vietnamese: 'Sao bạn đi siêu thị lại tự đem theo túi vải thế?', highlights: ['超市', '自己'] },
      { speaker: 'B', chinese: '少用塑料袋，不仅节约，还能保护环境！', pinyin: 'Shǎo yòng sùliàodài, bùjǐn jiéyuē, hái néng bǎohù huánjìng!', vietnamese: 'Ít dùng túi nilon, không những tiết kiệm mà còn bảo vệ môi trường!', highlights: ['节约', '保护环境'] }
    ]
  },

  'unit-hsk4-8': {
    grammars: [
      {
        title: '1. Cụm từ 学会 + [Kỹ năng] (Học cách làm gì đó)',
        formula: '学会 + [倾听 / 沟通 / 尊重]',
        explanation: 'Nhấn mạnh sự rèn luyện năng lực tâm lý và kỹ năng mềm.',
        examples: [
          { chinese: '学会倾听他人是良好沟通的第一步。', pinyin: 'Xuéhuì qīngtīng tārén shì liánghǎo gōutōng de dì yí bù.', vietnamese: 'Học cách lắng nghe người khác là bước đầu tiên của giao tiếp tốt.', highlights: ['学会', '倾听'] }
        ]
      }
    ],
    toneRules: [
      {
        ruleTitle: 'Phát âm chuẩn từ 沟通 (gōutōng)',
        desc: 'Hai âm tiết thanh 1 cao đều.',
        examples: [
          { chinese: '沟通', pinyin: 'Gōutōng', note: 'Thanh 1 + Thanh 1' }
        ]
      }
    ],
    dialogue: [
      { speaker: 'A', chinese: '在工作中遇到意见不同时，应该怎么处理？', pinyin: 'Zài gōngzuò zhōng yù dào yìjiàn bùtóng shí, yīnggāi zěnme chǔlǐ?', vietnamese: 'Khi gặp ý kiến bất đồng trong công việc thì nên xử lý thế nào?', highlights: ['意见不同', '处理'] },
      { speaker: 'B', chinese: '多换位思考，学会尊重并倾听对方的想法，才能达成共识。', pinyin: 'Duō huànwèi sīkǎo, xuéhuì zūnzhòng bìng qīngtīng duìfāng de xiǎngfǎ, cái néng dáchéng gòngshí.', vietnamese: 'Hãy đặt mình vào vị trí đối phương, học cách tôn trọng và lắng nghe suy nghĩ của họ thì mới đạt được đồng thuận.', highlights: ['换位思考', '倾听', '共识'] }
    ]
  }
};
