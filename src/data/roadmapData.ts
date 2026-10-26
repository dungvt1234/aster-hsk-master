import type { RoadmapUnit } from '../types';

export const ROADMAP_UNITS: RoadmapUnit[] = [
  // =========================================================================
  // HSK 1: SƠ CẤP A1 (VỠ LÒNG · GIAO TIẾP CƠ BẢN · ĐỜI SỐNG HẰNG NGÀY)
  // =========================================================================

  // HSK 1 - Unit 0: Vỡ Lòng & Số đếm
  {
    id: 'unit-hsk1-0',
    unitNumber: 0,
    level: 1,
    title: 'Unit 0: Vỡ Lòng · Đếm Số 1 - 10 & Chữ Số Cơ Bản',
    description: 'Nắm chắc số đếm từ 1 đến 10, cách ghép số hàng chục (11 - 99), và cách hỏi giá tiền cơ bản trong đời sống.',
    themeColor: '#0284c7',
    nodes: [
      {
        id: 'node-hsk1-0-1',
        unitNumber: 0,
        title: 'Số đếm 1 đến 5',
        subtitle: '一 · 二 · 三 · 四 · 五',
        type: 'lesson',
        xpReward: 15,
        status: 'completed',
        stars: 3,
        challenges: [
          {
            id: 'c-0-1-1',
            type: 'match_pairs',
            prompt: 'Nối các số Hán tự với chữ số tương ứng',
            subPrompt: 'Chạm vào 1 chữ Hán và 1 con số tương ứng.',
            matchPairs: [
              { id: 'p0-1', left: '一', right: 'Số 1' },
              { id: 'p0-2', left: '二', right: 'Số 2' },
              { id: 'p0-3', left: '三', right: 'Số 3' },
              { id: 'p0-4', left: '四', right: 'Số 4' },
            ],
            explanation: '一 (1), 二 (2), 三 (3), 四 (4) là bốn số cơ bản đầu tiên bắt buộc phải nhớ.',
          },
          {
            id: 'c-0-1-2',
            type: 'word_bank',
            prompt: 'Sắp xếp dãy số theo thứ tự tăng dần từ 1 đến 5:',
            chineseAudioText: '一 二 三 四 五',
            pinyinAudioText: 'Yī èr sān sì wǔ',
            tokens: ['五', '一', '四', '二', '三'],
            correctTokens: ['一', '二', '三', '四', '五'],
            explanation: 'Thứ tự đếm số từ 1 đến 5: 一 (1) -> 二 (2) -> 三 (3) -> 四 (4) -> 五 (5).',
          },
          {
            id: 'c-0-1-3',
            type: 'listen_choose',
            prompt: 'Nghe phát âm và chọn số chính xác',
            chineseAudioText: '三',
            pinyinAudioText: 'Sān',
            options: ['Số 3', 'Số 4', 'Số 1', 'Số 5'],
            correctAnswer: 'Số 3',
            explanation: '三 (sān) mang thanh 1 ngang dài, nghĩa là số 3.',
          },
          {
            id: 'c-0-1-4',
            type: 'multiple_choice',
            prompt: 'Chữ Hán "五" có phiên âm Pinyin và ý nghĩa là gì?',
            options: ['wǔ - Số 5', 'sì - Số 4', 'èr - Số 2', 'yī - Số 1'],
            correctAnswer: 'wǔ - Số 5',
            explanation: '五 (wǔ, thanh 3) nghĩa là số 5 (Ngũ).',
          },
        ],
      },
      {
        id: 'node-hsk1-0-2',
        unitNumber: 0,
        title: 'Số đếm 6 đến 10',
        subtitle: '六 · 七 · 八 · 九 · 十',
        type: 'lesson',
        xpReward: 15,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-0-2-1',
            type: 'match_pairs',
            prompt: 'Nối chữ Hán với số tương ứng',
            matchPairs: [
              { id: 'p0-5', left: '六', right: 'Số 6' },
              { id: 'p0-6', left: '七', right: 'Số 7' },
              { id: 'p0-7', left: '八', right: 'Số 8' },
              { id: 'p0-8', left: '九', right: 'Số 9' },
              { id: 'p0-9', left: '十', right: 'Số 10' },
            ],
            explanation: '六 (liù: 6), 七 (qī: 7), 八 (bā: 8), 九 (jiǔ: 9), 十 (shí: 10).',
          },
          {
            id: 'c-0-2-2',
            type: 'listen_choose',
            prompt: 'Nghe phát âm và chọn số đúng',
            chineseAudioText: '八',
            pinyinAudioText: 'Bā',
            options: ['Số 8', 'Số 6', 'Số 10', 'Số 7'],
            correctAnswer: 'Số 8',
            explanation: '八 (bā) là số 8 (Bát - tượng trưng may mắn, phát tài).',
          },
        ],
      },
      {
        id: 'node-hsk1-0-3',
        unitNumber: 0,
        title: 'Ghép số & Hỏi giá tiền',
        subtitle: '十一 · 二十 · 一百 · 多少钱',
        type: 'lesson',
        xpReward: 20,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-0-3-1',
            type: 'word_bank',
            prompt: 'Ghép chữ số "15" (mười lăm):',
            chineseAudioText: '十五',
            pinyinAudioText: 'Shíwǔ',
            tokens: ['五', '十', '一', '二', '块'],
            correctTokens: ['十', '五'],
            explanation: 'Quy tắc ghép số: 15 = 十 (10) + 五 (5) -> 十五 (shíwǔ).',
          },
          {
            id: 'c-0-3-2',
            type: 'multiple_choice',
            prompt: 'Câu hỏi: "这个多少钱？" (Zhège duōshao qián?) có nghĩa là gì?',
            options: ['Cái này bao nhiêu tiền?', 'Bạn có mấy người?', 'Bây giờ là mấy giờ?', 'Đây là cái gì?'],
            correctAnswer: 'Cái này bao nhiêu tiền?',
            explanation: '这个 (cái này) + 多少钱 (bao nhiêu tiền) = Câu hỏi giá tiền khi mua sắm.',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 1: Chào hỏi & Làm quen
  {
    id: 'unit-hsk1-1',
    unitNumber: 1,
    level: 1,
    title: 'Unit 1: Chào hỏi & Làm quen (问候与相识)',
    description: 'Học cách chào hỏi cơ bản, tự giới thiệu tên, đại từ nhân xưng và cảm ơn trong tiếng Trung.',
    themeColor: '#58CC02',
    nodes: [
      {
        id: 'node-hsk1-1-1',
        unitNumber: 1,
        title: 'Lời chào cơ bản',
        subtitle: '你好 · 您好 · 再见',
        type: 'lesson',
        xpReward: 15,
        status: 'completed',
        stars: 3,
        challenges: [
          {
            id: 'c-1-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu hoàn chỉnh: "Xin chào bạn!"',
            chineseAudioText: '你好',
            pinyinAudioText: 'Nǐ hǎo',
            tokens: ['好', '你', '再见', '谢谢', '我'],
            correctTokens: ['你', '好'],
            explanation: '你 (bạn) + 好 (tốt) = 你好 (Xin chào).',
          },
          {
            id: 'c-1-1-2',
            type: 'match_pairs',
            prompt: 'Nối các cặp từ đồng nghĩa',
            matchPairs: [
              { id: 'p1', left: '你好', right: 'Xin chào' },
              { id: 'p2', left: '再见', right: 'Tạm biệt' },
              { id: 'p3', left: '谢谢', right: 'Cảm ơn' },
              { id: 'p4', left: '不客气', right: 'Đừng khách sáo' },
            ],
            explanation: 'Các lời chào hỏi và cảm ơn cơ bản nhất.',
          },
        ],
      },
      {
        id: 'node-hsk1-1-2',
        unitNumber: 1,
        title: 'Giới thiệu bản thân',
        subtitle: '叫 · 是 · 中国人 · 老师',
        type: 'lesson',
        xpReward: 15,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-2-1',
            type: 'word_bank',
            prompt: 'Dịch câu: "Tôi là người Việt Nam."',
            chineseAudioText: '我是越南人。',
            pinyinAudioText: 'Wǒ shì Yuènán rén.',
            tokens: ['我', '是', '越南人', '中国人', '老师'],
            correctTokens: ['我', '是', '越南人'],
            explanation: '我 (tôi) + 是 (là) + 越南人 (người Việt Nam).',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 2: Gia đình & Đại từ sở hữu
  {
    id: 'unit-hsk1-2',
    unitNumber: 2,
    level: 1,
    title: 'Unit 2: Gia đình & Đại từ sở hữu (家与家人)',
    description: 'Xưng hô các thành viên trong gia đình, đếm nhân khẩu (几口人) và dùng trợ từ sở hữu 的 (đích).',
    themeColor: '#ec4899',
    nodes: [
      {
        id: 'node-hsk1-2-1',
        unitNumber: 2,
        title: 'Thành viên gia đình',
        subtitle: '爸爸 · 妈妈 · 哥哥 · 姐姐',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-2-1-1',
            type: 'match_pairs',
            prompt: 'Nối các thành viên trong gia đình:',
            matchPairs: [
              { id: 'fam-1', left: '爸爸', right: 'Bố / Ba' },
              { id: 'fam-2', left: '妈妈', right: 'Mẹ / Má' },
              { id: 'fam-3', left: '哥哥', right: 'Anh trai' },
              { id: 'fam-4', left: '姐姐', right: 'Chị gái' },
            ],
            explanation: '爸爸 (bàba), 妈妈 (māma), 哥哥 (gēge), 姐姐 (jiějie).',
          },
          {
            id: 'c-1-2-1-2',
            type: 'word_bank',
            prompt: 'Ghép câu: "Đây là mẹ của tôi."',
            chineseAudioText: '这是我妈妈。',
            pinyinAudioText: 'Zhè shì wǒ māma.',
            tokens: ['这', '是', '我', '妈妈', '爸爸', '那'],
            correctTokens: ['这', '是', '我', '妈妈'],
            explanation: 'Cấu trúc: 这 (đây) + 是 (là) + 我 (tôi) + 妈妈 (mẹ).',
          },
        ],
      },
      {
        id: 'node-hsk1-2-2',
        unitNumber: 2,
        title: 'Hỏi số lượng nhân khẩu',
        subtitle: '你家有几口人？· 有 · 几个',
        type: 'lesson',
        xpReward: 20,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-1-2-2-1',
            type: 'multiple_choice',
            prompt: 'Lượng từ dùng cho số lượng người trong gia đình là gì?',
            options: ['口 (kǒu)', '个 (gè)', '只 (zhī)', '本 (běn)'],
            correctAnswer: '口 (kǒu)',
            explanation: 'Trong tiếng Trung, đếm thành viên gia đình dùng lượng từ "口" (khẩu - nhân khẩu).',
          },
        ],
      },
      {
        id: 'node-hsk1-2-3',
        unitNumber: 2,
        title: 'Cúp vinh quang Gia đình',
        subtitle: 'Tổng hợp từ vựng Unit 2',
        type: 'trophy',
        xpReward: 40,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-1-2-2',
            type: 'match_pairs',
            prompt: 'Nối chữ Hán với nghĩa tương ứng',
            matchPairs: [
              { id: 'p-1-2a', left: '老师', right: 'Giáo viên' },
              { id: 'p-1-2b', left: '学生', right: 'Học sinh' },
              { id: 'p-1-2c', left: '什么', right: 'Cái gì' },
              { id: 'p-1-2d', left: '名字', right: 'Tên gọi' },
            ],
            explanation: 'Các danh từ và đại từ chỉ nhân xưng cơ bản.',
          },
          {
            id: 'c-1-2-3',
            type: 'listen_choose',
            prompt: 'Nghe phát âm và chọn ý nghĩa chính xác',
            chineseAudioText: '你叫什么名字？',
            pinyinAudioText: 'Nǐ jiào shénme míngzì?',
            options: ['Bạn tên là gì?', 'Bạn đi đâu đấy?', 'Bạn là người nước nào?', 'Bạn khỏe không?'],
            correctAnswer: 'Bạn tên là gì?',
            explanation: 'Mẫu câu hỏi tên kinh điển trong tiếng Trung.',
          },
          {
            id: 'c-1-2-4',
            type: 'multiple_choice',
            prompt: 'Điền từ thích hợp vào chỗ trống: "他___中国老师。"',
            options: ['是 (shì - Là)', '叫 (jiào - Gọi là)', '有 (yǒu - Có)', '吃 (chī - Ăn)'],
            correctAnswer: '是 (shì - Là)',
            explanation: 'Động từ 是 dùng trong câu phán đoán: Anh ấy là giáo viên Trung Quốc.',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 3: Ẩm thực & Đồ uống
  {
    id: 'unit-hsk1-3',
    unitNumber: 3,
    level: 1,
    title: 'Unit 3: Ẩm thực & Ăn uống (餐饮美食)',
    description: 'Tên gọi các món ăn, đồ uống quen thuộc, bày tỏ sở thích (喜欢) và gọi món tại quán ăn.',
    themeColor: '#f97316',
    nodes: [
      {
        id: 'node-hsk1-3-1',
        unitNumber: 3,
        title: 'Món ăn & Đồ uống',
        subtitle: '米饭 · 面条 · 吃 · 喝茶 · 水',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-3-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ vựng đồ ăn thức uống:',
            matchPairs: [
              { id: 'f-1', left: '米饭', right: 'Cơm trắng' },
              { id: 'f-2', left: '面条', right: 'Mì sợi' },
              { id: 'f-3', left: '喝茶', right: 'Uống trà' },
              { id: 'f-4', left: '苹果', right: 'Quả táo' },
            ],
            explanation: '米饭 (mǐfàn), 面条 (miàntiáo), 喝茶 (hē chá), 苹果 (píngguǒ).',
          },
        ],
      },
      {
        id: 'node-hsk1-3-2',
        unitNumber: 3,
        title: 'Sở thích & Gọi món',
        subtitle: '我想喝茶 · 喜欢 · 吃中国菜',
        type: 'lesson',
        xpReward: 20,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-1-3-2-1',
            type: 'word_bank',
            prompt: 'Dịch câu: "Bạn thích ăn món gì?"',
            chineseAudioText: '你喜欢吃什么？',
            pinyinAudioText: 'Nǐ xǐhuan chī shénme?',
            tokens: ['你', '喜欢', '吃', '什么', '想', '菜'],
            correctTokens: ['你', '喜欢', '吃', '什么'],
            explanation: '喜欢 (thích) + 吃 (ăn) + 什么 (cái gì).',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 4: Thời gian, Ngày tháng & Lịch trình
  {
    id: 'unit-hsk1-4',
    unitNumber: 4,
    level: 1,
    title: 'Unit 4: Thời gian, Ngày tháng & Lịch trình (时间与日期)',
    description: 'Hỏi giờ giấc, ngày trong tuần (星期), tháng năm và nói lịch trình sinh hoạt hàng ngày.',
    themeColor: '#8b5cf6',
    nodes: [
      {
        id: 'node-hsk1-4-1',
        unitNumber: 4,
        title: 'Hôm nay ngày mấy?',
        subtitle: '今天 · 明天 · 几月几号 · 星期',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-4-1-1',
            type: 'match_pairs',
            prompt: 'Nối các mốc thời gian:',
            matchPairs: [
              { id: 't-1', left: '今天', right: 'Hôm nay' },
              { id: 't-2', left: '明天', right: 'Ngày mai' },
              { id: 't-3', left: '昨天', right: 'Hôm qua' },
              { id: 't-4', left: '星期日', right: 'Chủ nhật' },
            ],
            explanation: 'Mốc ngày trong tiếng Trung: 昨天 (hôm qua), 今天 (hôm nay), 明天 (ngày mai).',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 5: Siêu thị & Mua sắm hoa quả
  {
    id: 'unit-hsk1-5',
    unitNumber: 5,
    level: 1,
    title: 'Unit 5: Siêu thị & Mua sắm hoa quả (超市与水果)',
    description: 'Mua hoa quả (táo, chuối), cân nặng nửa ký (斤), thanh toán tiền mặt và quét mã ví điện tử.',
    themeColor: '#14b8a6',
    nodes: [
      {
        id: 'node-hsk1-5-1',
        unitNumber: 5,
        title: 'Hoa quả tươi ngon',
        subtitle: '苹果 · 香蕉 · 水果 · 斤 · 怎么卖',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-5-1-1',
            type: 'match_pairs',
            prompt: 'Nối từ vựng hoa quả và mua bán:',
            matchPairs: [
              { id: 'fr-1', left: '苹果', right: 'Quả táo' },
              { id: 'fr-2', left: '香蕉', right: 'Quả chuối' },
              { id: 'fr-3', left: '斤', right: 'Cân (500 gram)' },
              { id: 'fr-4', left: '超市', right: 'Siêu thị' },
            ],
            explanation: 'Trong tiếng Trung, 1 斤 (cân) tương đương 500g (nửa ký).',
          },
          {
            id: 'c-1-5-1-2',
            type: 'word_bank',
            prompt: 'Dịch câu: "Táo bao nhiêu tiền một cân?"',
            chineseAudioText: '苹果一斤多少钱？',
            pinyinAudioText: 'Píngguǒ yì jīn duōshao qián?',
            tokens: ['苹果', '一斤', '多少钱', '香蕉', '买'],
            correctTokens: ['苹果', '一斤', '多少钱'],
            explanation: 'Mẫu câu hỏi giá hoa quả kinh điển: Tên hoa quả + 一斤 + 多少钱？',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 6: Trường học, Lớp học & Bạn bè
  {
    id: 'unit-hsk1-6',
    unitNumber: 6,
    level: 1,
    title: 'Unit 6: Trường học, Bạn bè & Lớp học (学校与课堂)',
    description: 'Không gian trường lớp, thầy cô, bạn cùng lớp, hỏi bài và giao tiếp trong giờ học.',
    themeColor: '#3b82f6',
    nodes: [
      {
        id: 'node-hsk1-6-1',
        unitNumber: 6,
        title: 'Giờ học tiếng Trung',
        subtitle: '学校 · 同学 · 老师 · 书包 · 听写',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-6-1-1',
            type: 'match_pairs',
            prompt: 'Nối từ vựng trường học:',
            matchPairs: [
              { id: 'sc-1', left: '学校', right: 'Trường học' },
              { id: 'sc-2', left: '同学', right: 'Bạn cùng lớp' },
              { id: 'sc-3', left: '学习', right: 'Học tập' },
              { id: 'sc-4', left: '汉字', right: 'Chữ Hán' },
            ],
            explanation: 'Các danh từ và động từ chủ chốt trong môi trường học đường HSK 1.',
          },
        ],
      },
    ],
  },

  // HSK 1 - Unit 7: Khám phá Thành phố & Nơi chốn
  {
    id: 'unit-hsk1-7',
    unitNumber: 7,
    level: 1,
    title: 'Unit 7: Khám phá Thành phố & Nơi chốn (城市与地点)',
    description: 'Nhận biết các địa điểm công cộng: bệnh viện, cửa hàng, công viên và hỏi vị trí (在哪儿).',
    themeColor: '#6366f1',
    nodes: [
      {
        id: 'node-hsk1-7-1',
        unitNumber: 7,
        title: 'Địa điểm công cộng',
        subtitle: '医院 · 商店 · 饭馆 · 在哪儿',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-1-7-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu: "Xin hỏi bệnh viện ở đâu?"',
            chineseAudioText: '请问医院在哪儿？',
            pinyinAudioText: 'Qǐngwèn yīyuàn zài nǎr?',
            tokens: ['请问', '医院', '在哪儿', '商店', '学校'],
            correctTokens: ['请问', '医院', '在哪儿'],
            explanation: '请问 (xin hỏi) + Địa điểm + 在哪儿 (ở đâu).',
          },
        ],
      },
      {
        id: 'node-hsk1-7-2',
        unitNumber: 7,
        title: 'Cúp Vinh Quang HSK 1 Toàn Diện',
        subtitle: 'Hoàn thành trọn bộ 8 Units HSK 1',
        type: 'trophy',
        xpReward: 70,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-boss-1-2-1',
            type: 'match_pairs',
            prompt: 'Vượt Ải Cúp Vinh Quang Gia Đình: Nối người thân',
            matchPairs: [
              { id: 'pb-1', left: '爸爸', right: 'Bố' },
              { id: 'pb-2', left: '妈妈', right: 'Mẹ' },
              { id: 'pb-3', left: '哥哥', right: 'Anh trai' },
              { id: 'pb-4', left: '姐姐', right: 'Chị gái' },
              { id: 'pb-5', left: '弟弟', right: 'Em trai' },
            ],
            explanation: 'Toàn bộ từ vựng xưng hô gia đình HSK 1.',
          },
          {
            id: 'c-boss-1-2-2',
            type: 'word_bank',
            prompt: 'Sắp xếp câu: "Gia đình tôi có bốn người."',
            chineseAudioText: '我家有四口人。',
            pinyinAudioText: 'Wǒ jiā yǒu sì kǒu rén.',
            tokens: ['我家', '有', '四口人', '是谁', '猫'],
            correctTokens: ['我家', '有', '四口人'],
            explanation: '我家 (Gia đình tôi) + 有 (có) + 四口人 (bốn người).',
          },
          {
            id: 'c-boss-1-2-3',
            type: 'listen_choose',
            prompt: 'Nghe và xác nhận nội dung',
            chineseAudioText: '这是我爸爸，他是医生。',
            pinyinAudioText: 'Zhè shì wǒ bàba, tā shì yīshēng.',
            options: ['Đây là bố tôi, ông ấy là bác sĩ.', 'Đây là mẹ tôi, bà ấy là giáo viên.', 'Đây là anh trai tôi, anh ấy là học sinh.', 'Đây là bạn tôi.'],
            correctAnswer: 'Đây là bố tôi, ông ấy là bác sĩ.',
            explanation: '爸爸 (bố) và 医生 (bác sĩ).',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // HSK 2: SƠ CẤP A2 (SINH HOẠT · GIAO TIẾP XÃ GIAO · MỞ RỘNG)
  // =========================================================================

  // HSK 2 - Unit 1: Mua sắm & Đời sống
  {
    id: 'unit-hsk2-1',
    unitNumber: 1,
    level: 2,
    title: 'Unit 1: Mua sắm & Đời sống hàng ngày (购物与生活)',
    description: 'Thương lượng giá cả, chọn kích cỡ, màu sắc quần áo và sử dụng câu so sánh cơ bản.',
    themeColor: '#dc2626',
    nodes: [
      {
        id: 'node-hsk2-1-1',
        unitNumber: 1,
        title: 'Mua sắm & Trả giá',
        subtitle: '买 · 贵 · 便宜 · 试一下',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-1-1',
            type: 'word_bank',
            prompt: 'Dịch câu: "Chiếc áo này hơi đắt, rẻ một chút được không?"',
            chineseAudioText: '这件衣服有点儿贵，便宜一点儿吧。',
            pinyinAudioText: 'Zhè jiàn yīfu yǒudiǎnr guì, piányi yìdiǎnr ba.',
            tokens: ['这件衣服', '有点儿', '贵', '便宜', '一点儿', '吧', '买'],
            correctTokens: ['这件衣服', '有点儿', '贵', '便宜', '一点儿', '吧'],
            explanation: 'Phân biệt 有点儿 (hơi/quá tiêu cực) và 一点儿 (một chút sau tính từ).',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 2: Hỏi đường & Phương tiện giao thông
  {
    id: 'unit-hsk2-2',
    unitNumber: 2,
    level: 2,
    title: 'Unit 2: Hỏi đường & Phương tiện giao thông (问路与交通)',
    description: 'Hỏi cách đi đến địa điểm, đón xe buýt, taxi, rẽ trái, rẽ phải và khoảng cách (离).',
    themeColor: '#0ea5e9',
    nodes: [
      {
        id: 'node-hsk2-2-1',
        unitNumber: 2,
        title: 'Phương tiện đi lại',
        subtitle: '公共汽车 · 出租车 · 坐车 · 火车站',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-2-1-1',
            type: 'match_pairs',
            prompt: 'Nối các phương tiện giao thông:',
            matchPairs: [
              { id: 'tr-1', left: '公共汽车', right: 'Xe buýt' },
              { id: 'tr-2', left: '出租车', right: 'Xe taxi' },
              { id: 'tr-3', left: '火车站', right: 'Ga tàu hỏa' },
              { id: 'tr-4', left: '自行车', right: 'Xe đạp' },
            ],
            explanation: 'Từ vựng cốt lõi khi đi lại tại Trung Quốc.',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 3: Thời tiết & Sức khỏe
  {
    id: 'unit-hsk2-3',
    unitNumber: 3,
    level: 2,
    title: 'Unit 3: Thời tiết, Khí hậu & Sức khỏe (天气与健康)',
    description: 'Miêu tả thời tiết nóng lạnh, mưa tuyết, đi khám bác sĩ và uống thuốc khi ốm.',
    themeColor: '#10b981',
    nodes: [
      {
        id: 'node-hsk2-3-1',
        unitNumber: 3,
        title: 'Thời tiết 4 mùa',
        subtitle: '冷 · 热 · 下雨 · 下雪 · 晴天',
        type: 'lesson',
        xpReward: 20,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-3-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ vựng thời tiết:',
            matchPairs: [
              { id: 'w-1', left: '下雨', right: 'Trời mưa' },
              { id: 'w-2', left: '下雪', right: 'Tuyết rơi' },
              { id: 'w-3', left: '天气', right: 'Thời tiết' },
              { id: 'w-4', left: '阴天', right: 'Trời râm mát' },
            ],
            explanation: 'Thuật ngữ thời tiết thường gặp trong các bài hội thoại HSK 2.',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 4: Sở thích, Thể thao & Giải trí
  {
    id: 'unit-hsk2-4',
    unitNumber: 4,
    level: 2,
    title: 'Unit 4: Sở thích & Thể thao (爱好与运动)',
    description: 'Bơi lội, đá bóng, nghe nhạc, xem phim và cách diễn tả thói quen rèn luyện thể chất.',
    themeColor: '#f59e0b',
    nodes: [
      {
        id: 'node-hsk2-4-1',
        unitNumber: 4,
        title: 'Các môn thể thao',
        subtitle: '游泳 · 踢足球 · 跑步 · 打篮球',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-4-1-1',
            type: 'match_pairs',
            prompt: 'Nối các môn thể thao:',
            matchPairs: [
              { id: 'sp-1', left: '踢足球', right: 'Đá bóng' },
              { id: 'sp-2', left: '游泳', right: 'Bơi lội' },
              { id: 'sp-3', left: '跑步', right: 'Chạy bộ' },
              { id: 'sp-4', left: '打篮球', right: 'Chơi bóng rổ' },
            ],
            explanation: 'Động từ: 踢 (đá bóng), 打 (chơi các môn bóng dùng tay).',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 5: Thuê nhà & Không gian sống
  {
    id: 'unit-hsk2-5',
    unitNumber: 5,
    level: 2,
    title: 'Unit 5: Thuê nhà & Không gian sống (租房与生活空间)',
    description: 'Phòng ngủ, phòng khách, tiền thuê nhà, đồ điện gia dụng (máy lạnh, tủ lạnh) và chuyển nhà.',
    themeColor: '#d946ef',
    nodes: [
      {
        id: 'node-hsk2-5-1',
        unitNumber: 5,
        title: 'Căn hộ & Tiện nghi',
        subtitle: '房租 · 卧室 · 客厅 · 冰箱 · 空调',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-5-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ vựng phòng ốc và đồ dùng:',
            matchPairs: [
              { id: 'rm-1', left: '房租', right: 'Tiền thuê nhà' },
              { id: 'rm-2', left: '卧室', right: 'Phòng ngủ' },
              { id: 'rm-3', left: '冰箱', right: 'Tủ lạnh' },
              { id: 'rm-4', left: '空调', right: 'Máy điều hòa' },
            ],
            explanation: 'Các danh từ quen thuộc khi thuê trọ hoặc ở chung cư tại Trung Quốc.',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 6: Lễ nghi giao tiếp, Cảm ơn & Xin lỗi
  {
    id: 'unit-hsk2-6',
    unitNumber: 6,
    level: 2,
    title: 'Unit 6: Lễ nghi xã giao & Chúc mừng (礼貌与社交)',
    description: 'Tặng quà sinh nhật, cảm ơn giúp đỡ, xin lỗi vì đến muộn và các phép lịch sự đời thường.',
    themeColor: '#f43f5e',
    nodes: [
      {
        id: 'node-hsk2-6-1',
        unitNumber: 6,
        title: 'Chúc mừng & Tặng quà',
        subtitle: '生日快乐 · 送礼物 · 感谢 · 没关系',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-6-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu: "Chúc bạn sinh nhật vui vẻ!"',
            chineseAudioText: '祝你生日快乐！',
            pinyinAudioText: 'Zhù nǐ shēngrì kuàilè!',
            tokens: ['祝你', '生日', '快乐', '礼物', '送'],
            correctTokens: ['祝你', '生日', '快乐'],
            explanation: '祝你 (chúc bạn) + 生日快乐 (sinh nhật vui vẻ).',
          },
        ],
      },
    ],
  },

  // HSK 2 - Unit 7: Du lịch cuối tuần & Trải nghiệm thiên nhiên
  {
    id: 'unit-hsk2-7',
    unitNumber: 7,
    level: 2,
    title: 'Unit 7: Du lịch cuối tuần & Trải nghiệm (周末出行与风景)',
    description: 'Leo núi, chụp ảnh lưu niệm, đi công viên ngắm cảnh đẹp và thư giãn cuối tuần.',
    themeColor: '#059669',
    nodes: [
      {
        id: 'node-hsk2-7-1',
        unitNumber: 7,
        title: 'Leo núi & Chụp ảnh',
        subtitle: '爬山 · 拍照 · 照相机 · 风景真美',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-2-7-1-1',
            type: 'match_pairs',
            prompt: 'Nối từ vựng dã ngoại cuối tuần:',
            matchPairs: [
              { id: 'ot-1', left: '爬山', right: 'Leo núi' },
              { id: 'ot-2', left: '拍照', right: 'Chụp ảnh' },
              { id: 'ot-3', left: '风景', right: 'Phong cảnh' },
              { id: 'ot-4', left: '公园', right: 'Công viên' },
            ],
            explanation: '爬山 (leo núi), 拍照 (chụp hình), 风景 (phong cảnh).',
          },
        ],
      },
      {
        id: 'node-hsk2-7-2',
        unitNumber: 7,
        title: 'Cúp Vinh Quang HSK 2 Toàn Diện',
        subtitle: 'Hoàn thành trọn bộ 7 Units HSK 2',
        type: 'trophy',
        xpReward: 80,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-boss-hsk1-1',
            type: 'match_pairs',
            prompt: 'Đấu Trùm Cuối HSK 1: Nối cặp đối nghĩa và đại từ',
            matchPairs: [
              { id: 'ph1-1', left: '大', right: 'Lớn/To' },
              { id: 'ph1-2', left: '小', right: 'Nhỏ/Bé' },
              { id: 'ph1-3', left: '多', right: 'Nhiều' },
              { id: 'ph1-4', left: '少', right: 'Ít' },
              { id: 'ph1-5', left: '去', right: 'Đi' },
            ],
            explanation: 'Bộ tính từ tương phản cốt lõi của HSK 1.',
          },
          {
            id: 'c-boss-hsk1-2',
            type: 'word_bank',
            prompt: 'Sắp xếp câu: "Hôm nay tôi ngồi taxi đi sân bay."',
            chineseAudioText: '我今天坐出租车去机场。',
            pinyinAudioText: 'Wǒ jīntiān zuò chūzūchē qù jīchǎng.',
            tokens: ['我', '今天', '坐', '出租车', '去', '机场', '吃'],
            correctTokens: ['我', '今天', '坐', '出租车', '去', '机场'],
            explanation: 'Thứ tự thời gian và phương tiện: Chủ ngữ + Thời gian + Phương tiện + Đi đến nơi chốn.',
          },
          {
            id: 'c-boss-hsk1-3',
            type: 'listen_choose',
            prompt: 'Nghe câu giao tiếp tổng hợp HSK 1',
            chineseAudioText: '认识你很高兴，明天见！',
            pinyinAudioText: 'Rènshi nǐ hěn gāoxìng, míngtiān jiàn!',
            options: ['Rất vui được quen biết bạn, ngày mai gặp lại!', 'Cảm ơn bạn nhiều, tôi về trước đây!', 'Hôm nay trời rất đẹp, chúng ta đi đâu?', 'Bạn có phải là người Bắc Kinh không?'],
            correctAnswer: 'Rất vui được quen biết bạn, ngày mai gặp lại!',
            explanation: '認識你很高興 + 明天見.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // HSK 3: TRUNG CẤP B1 (CÔNG SỞ · DU LỊCH · GIAO TIẾP XÃ HỘI CHUYÊN SÂU)
  // =========================================================================

  // HSK 3 - Unit 1: Phỏng vấn & Lập kế hoạch
  {
    id: 'unit-hsk3-1',
    unitNumber: 1,
    level: 3,
    title: 'Unit 1: Phỏng vấn & Lập kế hoạch (职场与规划)',
    description: 'Thảo luận về sở thích, kế hoạch tương lai, phỏng vấn xin việc và miêu tả cảm xúc.',
    themeColor: '#FFC800',
    nodes: [
      {
        id: 'node-hsk3-1-1',
        unitNumber: 1,
        title: 'Phỏng vấn & Công sở',
        subtitle: '工作 · 经理 · 打算 · 机会',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-1-1',
            type: 'word_bank',
            prompt: 'Dịch câu: "Tôi dự định tháng sau đi du lịch."',
            chineseAudioText: '我打算下个月去旅游。',
            pinyinAudioText: 'Wǒ dǎsuàn xià gè yuè qù lǚyóu.',
            tokens: ['我', '打算', '下个月', '去', '旅游', '工作'],
            correctTokens: ['我', '打算', '下个月', '去', '旅游'],
            explanation: '打算 (dǎsuàn: dự định) + Mốc thời gian + Hành động.',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 2: Du lịch, Sân bay & Khách sạn
  {
    id: 'unit-hsk3-2',
    unitNumber: 2,
    level: 3,
    title: 'Unit 2: Du lịch, Sân bay & Khách sạn (旅行与住宿)',
    description: 'Thủ tục check-in sân bay, đặt phòng khách sạn, hỏi giờ tàu chạy và chuẩn bị hành lý.',
    themeColor: '#06b6d4',
    nodes: [
      {
        id: 'node-hsk3-2-1',
        unitNumber: 2,
        title: 'Sân bay & Hành lý',
        subtitle: '飞机 · 护照 · 行李箱 · 准时',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-2-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ vựng du lịch & sân bay:',
            matchPairs: [
              { id: 'air-1', left: '护照', right: 'Hộ chiếu' },
              { id: 'air-2', left: '行李箱', right: 'Va li hành lý' },
              { id: 'air-3', left: '准时', right: 'Đúng giờ' },
              { id: 'air-4', left: '宾馆', right: 'Khách sạn' },
            ],
            explanation: '护照 (hùzhào: hộ chiếu), 行李箱 (xínglǐxiāng: va li).',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 3: Môi trường công sở & Thảo luận dự án
  {
    id: 'unit-hsk3-3',
    unitNumber: 3,
    level: 3,
    title: 'Unit 3: Môi trường công sở & Thảo luận (职场办公)',
    description: 'Họp hành, gửi email công việc, giải quyết vấn đề kỹ thuật và nâng cao năng suất.',
    themeColor: '#10b981',
    nodes: [
      {
        id: 'node-hsk3-3-1',
        unitNumber: 3,
        title: 'Họp & Giải quyết vấn đề',
        subtitle: '会议 · 发电子邮件 · 解决 · 提高',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-3-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu: "Chúng ta cần nâng cao hiệu suất làm việc."',
            chineseAudioText: '我们需要提高工作效率。',
            pinyinAudioText: 'Wǒmen xūyào tígāo gōngzuò xiàolǜ.',
            tokens: ['我们', '需要', '提高', '工作效率', '会议', '解决'],
            correctTokens: ['我们', '需要', '提高', '工作效率'],
            explanation: '提高 (tígāo: nâng cao) + Danh từ (hiệu suất/trình độ/kết quả).',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 4: Tính cách & Cảm xúc
  {
    id: 'unit-hsk3-4',
    unitNumber: 4,
    level: 3,
    title: 'Unit 4: Tính cách, Cảm xúc & Giao lưu (性格与情感)',
    description: 'Miêu tả phẩm chất con người: nhiệt tình, nghiêm túc, chu đáo và các sắc thái cảm xúc.',
    themeColor: '#a855f7',
    nodes: [
      {
        id: 'node-hsk3-4-1',
        unitNumber: 4,
        title: 'Tính cách & Phẩm chất',
        subtitle: '热情 · 认真 · 难过 · 放心',
        type: 'lesson',
        xpReward: 25,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-4-1-1',
            type: 'match_pairs',
            prompt: 'Nối các tính từ miêu tả con người:',
            matchPairs: [
              { id: 'per-1', left: '热情', right: 'Nhiệt tình' },
              { id: 'per-2', left: '认真', right: 'Chăm chỉ / Nghiêm túc' },
              { id: 'per-3', left: '难过', right: 'Buồn bã / Khó chịu' },
              { id: 'per-4', left: '放心', right: 'Yên tâm' },
            ],
            explanation: 'Các tính từ cốt lõi trong đề thi HSK 3.',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 5: Ẩm thực 8 trường phái & Thưởng thức món ngon
  {
    id: 'unit-hsk3-5',
    unitNumber: 5,
    level: 3,
    title: 'Unit 5: Ẩm thực 8 trường phái & Đi ăn nhà hàng (八大菜系与点餐)',
    description: 'Khám phá ẩm thực Tứ Xuyên, Quảng Đông, 4 vị chua cay ngọt mặn (酸甜苦辣) và gọi món theo thực đơn.',
    themeColor: '#ea580c',
    nodes: [
      {
        id: 'node-hsk3-5-1',
        unitNumber: 5,
        title: 'Mùi vị & Gọi món đặc sản',
        subtitle: '酸甜苦辣 · 菜单 · 特色菜 · 买单',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-5-1-1',
            type: 'match_pairs',
            prompt: 'Nối 4 mùi vị ẩm thực Trung Hoa:',
            matchPairs: [
              { id: 'tst-1', left: '酸', right: 'Chua' },
              { id: 'tst-2', left: '甜', right: 'Ngọt' },
              { id: 'tst-3', left: '苦', right: 'Đắng' },
              { id: 'tst-4', left: '辣', right: 'Cay' },
            ],
            explanation: 'Thành ngữ "酸甜苦辣" (toan điềm khổ lạt: chua cay mặn ngọt) vừa chỉ ẩm thực vừa chỉ hương vị cuộc đời.',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 6: Mua sắm Online & Chuyển phát nhanh
  {
    id: 'unit-hsk3-6',
    unitNumber: 6,
    level: 3,
    title: 'Unit 6: Mua sắm Online & Chuyển phát nhanh (网购与快递服务)',
    description: 'Sàn thương mại điện tử Taobao, mã bưu kiện, shipper giao hàng tận cửa, đổi trả hàng và đánh giá.',
    themeColor: '#0284c7',
    nodes: [
      {
        id: 'node-hsk3-6-1',
        unitNumber: 6,
        title: 'Đặt hàng & Nhận bưu kiện',
        subtitle: '网购 · 快递员 · 取件 · 退换货',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-6-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ ngữ mua sắm online:',
            matchPairs: [
              { id: 'shp-1', left: '网购', right: 'Mua hàng qua mạng' },
              { id: 'shp-2', left: '快递', right: 'Chuyển phát nhanh' },
              { id: 'shp-3', left: '评价', right: 'Đánh giá / Review' },
              { id: 'shp-4', left: '包装', right: 'Đóng gói bưu phẩm' },
            ],
            explanation: 'Các thuật ngữ thịnh hành trong đời sống hiện đại của người trẻ Trung Quốc.',
          },
        ],
      },
    ],
  },

  // HSK 3 - Unit 7: Thể hình, Sức khỏe & Lối sống lành mạnh
  {
    id: 'unit-hsk3-7',
    unitNumber: 7,
    level: 3,
    title: 'Unit 7: Thể hình & Lối sống lành mạnh (健身与养生)',
    description: 'Tập gym, duy trì vóc dáng, giảm cân khoa học, ăn uống điều độ và khám sức khỏe định kỳ.',
    themeColor: '#16a34a',
    nodes: [
      {
        id: 'node-hsk3-7-1',
        unitNumber: 7,
        title: 'Tập gym & Vóc dáng',
        subtitle: '健身房 · 减肥 · 坚持锻炼 · 健康习惯',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-3-7-1-1',
            type: 'word_bank',
            prompt: 'Dịch câu: "Mỗi ngày tôi đều kiên trì chạy bộ 30 phút."',
            chineseAudioText: '我每天都坚持跑步三十分钟。',
            pinyinAudioText: 'Wǒ měitiān dōu jiānchí pǎobù sānshí fēnzhōng.',
            tokens: ['我', '每天', '都', '坚持', '跑步', '三十分钟', '健身'],
            correctTokens: ['我', '每天', '都', '坚持', '跑步', '三十分钟'],
            explanation: '坚持 (kiên trì) + Hành động rèn luyện.',
          },
        ],
      },
      {
        id: 'node-hsk3-7-2',
        unitNumber: 7,
        title: 'Cúp Vinh Quang HSK 3 Toàn Diện',
        subtitle: 'Chinh phục toàn diện 7 Units HSK 3',
        type: 'trophy',
        xpReward: 90,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-boss-hsk2-1',
            type: 'match_pairs',
            prompt: 'Cúp Vinh Quang HSK 2: Nối các cặp từ chuyển tiếp & so sánh',
            matchPairs: [
              { id: 'ph2-1', left: '虽然', right: 'Tuy rằng' },
              { id: 'ph2-2', left: '但是', right: 'Nhưng mà' },
              { id: 'ph2-3', left: '因为', right: 'Bởi vì' },
              { id: 'ph2-4', left: '所以', right: 'Cho nên' },
              { id: 'ph2-5', left: '比', right: 'So sánh hơn' },
            ],
            explanation: 'Hệ thống liên từ trọng điểm của HSK 2.',
          },
          {
            id: 'c-boss-hsk2-2',
            type: 'word_bank',
            prompt: 'Sắp xếp câu: "Tuy ngoài trời rất lạnh, nhưng trong phòng rất ấm áp."',
            chineseAudioText: '虽然外面很冷，但是房间里很暖和。',
            pinyinAudioText: 'Suīrán wàimiàn hěn lěng, dànshì fángjiān lǐ hěn nuǎnhuo.',
            tokens: ['虽然', '外面', '很冷', '但是', '房间里', '很暖和', '跑'],
            correctTokens: ['虽然', '外面', '很冷', '但是', '房间里', '很暖和'],
            explanation: 'Cặp liên từ 虽然……但是…….',
          },
          {
            id: 'c-boss-hsk2-3',
            type: 'multiple_choice',
            prompt: 'Chọn câu so sánh chữ 比 đúng ngữ pháp:',
            options: ['哥哥比我大两岁。', '哥哥我比大两岁。', '哥哥比大我两岁。', '我比哥哥大两岁没有。'],
            correctAnswer: '哥哥比我大两岁。',
            explanation: 'Cấu trúc so sánh chữ 比: A + 比 + B + Tính từ + Khoảng cách chênh lệch.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // HSK 4: TRUNG CẤP B2 (ĐỌC HIỂU NGHỊ LUẬN · THƯƠNG MẠI · CÔNG NGHỆ · THÀNH NGỮ)
  // =========================================================================

  // HSK 4 - Unit 1: Liên từ logic & Câu phức
  {
    id: 'unit-hsk4-1',
    unitNumber: 1,
    level: 4,
    title: 'Unit 1: Cấu trúc liên từ logic & Câu phức (逻辑关联词)',
    description: 'Cấu trúc câu phức, liên từ nối, nghị luận ngắn và kỹ năng đọc lướt phòng thi.',
    themeColor: '#7C3AED',
    nodes: [
      {
        id: 'node-hsk4-1-1',
        unitNumber: 1,
        title: 'Liên từ logic & Câu phức',
        subtitle: '不仅...而且... · 尽管...但是...',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-1-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu: "Anh ấy không những thông minh mà còn chăm chỉ."',
            chineseAudioText: '他不仅聪明，而且很努力。',
            pinyinAudioText: 'Tā bùjǐn cōngming, érqiě hěn nǔlì.',
            tokens: ['他', '不仅', '聪明', '而且', '很', '努力', '虽然'],
            correctTokens: ['他', '不仅', '聪明', '而且', '很', '努力'],
            explanation: 'Cặp liên từ tăng tiến: 不仅……而且…… (Không những... mà còn...).',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 2: Kinh doanh, Đàm phán & Thương mại
  {
    id: 'unit-hsk4-2',
    unitNumber: 2,
    level: 4,
    title: 'Unit 2: Kinh doanh & Thương mại (商业与谈判)',
    description: 'Nghiên cứu thị trường, quảng cáo truyền thông, ký kết hợp đồng và đàm phán hợp tác.',
    themeColor: '#2563eb',
    nodes: [
      {
        id: 'node-hsk4-2-1',
        unitNumber: 2,
        title: 'Thị trường & Hợp đồng',
        subtitle: '市场 · 广告 · 竞争 · 合作 · 成功',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-2-1-1',
            type: 'match_pairs',
            prompt: 'Nối các thuật ngữ kinh doanh:',
            matchPairs: [
              { id: 'biz-1', left: '市场', right: 'Thị trường' },
              { id: 'biz-2', left: '广告', right: 'Quảng cáo' },
              { id: 'biz-3', left: '竞争', right: 'Cạnh tranh' },
              { id: 'biz-4', left: '合同', right: 'Hợp đồng' },
            ],
            explanation: 'Từ vựng thương mại bắt buộc trong bài thi Đọc HSK 4.',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 3: Khoa học công nghệ & Môi trường
  {
    id: 'unit-hsk4-3',
    unitNumber: 3,
    level: 4,
    title: 'Unit 3: Đời sống số & Bảo vệ môi trường (科技与环保)',
    description: 'Tác động của mạng xã hội, công nghệ số và trách nhiệm tiết kiệm tài nguyên môi trường.',
    themeColor: '#059669',
    nodes: [
      {
        id: 'node-hsk4-3-1',
        unitNumber: 3,
        title: 'Công nghệ số & Xã hội',
        subtitle: '互联网 · 社交网络 · 环境保护 · 节约',
        type: 'lesson',
        xpReward: 30,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-3-1-1',
            type: 'match_pairs',
            prompt: 'Nối các từ vựng công nghệ và môi trường:',
            matchPairs: [
              { id: 'tech-1', left: '互联网', right: 'Mạng Internet' },
              { id: 'tech-2', left: '保护环境', right: 'Bảo vệ môi trường' },
              { id: 'tech-3', left: '节约', right: 'Tiết kiệm' },
              { id: 'tech-4', left: '速度', right: 'Tốc độ' },
            ],
            explanation: 'Chủ đề nghị luận xã hội thường gặp trong phần thi viết câu và đoạn văn HSK 4.',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 4: Triết lý nhân sinh & Thành ngữ 4 chữ
  {
    id: 'unit-hsk4-4',
    unitNumber: 4,
    level: 4,
    title: 'Unit 4: Triết lý nhân sinh & Thành ngữ (哲理与成语)',
    description: 'Thành ngữ 4 chữ kinh điển, thái độ sống, sự kiên trì và tư duy vượt khó trong cuộc sống.',
    themeColor: '#b45309',
    nodes: [
      {
        id: 'node-hsk4-4-1',
        unitNumber: 4,
        title: 'Thành ngữ 4 chữ kinh điển',
        subtitle: '入乡随俗 · 马到成功 · 坚持 · 态度',
        type: 'lesson',
        xpReward: 35,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-4-1-1',
            type: 'match_pairs',
            prompt: 'Nối các thành ngữ Hán ngữ với ý nghĩa tương đương:',
            matchPairs: [
              { id: 'cy-1', left: '入乡随俗', right: 'Nhập gia tùy tục' },
              { id: 'cy-2', left: '马到成功', right: 'Mã đáo thành công' },
              { id: 'cy-3', left: '事半功倍', right: 'Làm nửa công gấp đôi' },
              { id: 'cy-4', left: '乱七八糟', right: 'Bừa bãi lộn xộn' },
            ],
            explanation: 'Các thành ngữ 4 chữ quan trọng nhất trong đề thi HSK 4.',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 5: Tuyển dụng, Phỏng vấn HR & Thăng tiến sự nghiệp
  {
    id: 'unit-hsk4-5',
    unitNumber: 5,
    level: 4,
    title: 'Unit 5: Tuyển dụng & Thăng tiến sự nghiệp (求职与晋升)',
    description: 'Chinh phục phỏng vấn HR, sơ yếu lý lịch CV, đàm phán đãi ngộ và lộ trình phát triển sự nghiệp.',
    themeColor: '#0891b2',
    nodes: [
      {
        id: 'node-hsk4-5-1',
        unitNumber: 5,
        title: 'Phỏng vấn HR & Lương thưởng',
        subtitle: '薪水 · 简历 · 招聘 · 优势 · 职业规划',
        type: 'lesson',
        xpReward: 35,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-5-1-1',
            type: 'match_pairs',
            prompt: 'Nối từ vựng tuyển dụng công sở:',
            matchPairs: [
              { id: 'hr-1', left: '简历', right: 'Sơ yếu lý lịch (CV)' },
              { id: 'hr-2', left: '薪水', right: 'Tiền lương / Thù lao' },
              { id: 'hr-3', left: '招聘', right: 'Tuyển dụng nhân sự' },
              { id: 'hr-4', left: '经验', right: 'Kinh nghiệm làm việc' },
            ],
            explanation: 'Từ vựng trọng tâm trong các bài đọc văn bản và đoạn hội thoại phỏng vấn HSK 4.',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 6: Tài chính cá nhân, Ngân hàng & Đầu tư
  {
    id: 'unit-hsk4-6',
    unitNumber: 6,
    level: 4,
    title: 'Unit 6: Tài chính cá nhân & Ngân hàng (金融理财与投资)',
    description: 'Thẻ ngân hàng, gửi tiết kiệm, quản lý chi tiêu cá nhân, lãi suất và tư duy quản lý tài chính.',
    themeColor: '#4f46e5',
    nodes: [
      {
        id: 'node-hsk4-6-1',
        unitNumber: 6,
        title: 'Dịch vụ ngân hàng & Lãi suất',
        subtitle: '银行卡 · 利率 · 存钱 · 信用卡 · 投资',
        type: 'lesson',
        xpReward: 35,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-6-1-1',
            type: 'match_pairs',
            prompt: 'Nối thuật ngữ tài chính ngân hàng:',
            matchPairs: [
              { id: 'fn-1', left: '银行卡', right: 'Thẻ ngân hàng' },
              { id: 'fn-2', left: '利率', right: 'Lãi suất' },
              { id: 'fn-3', left: '投资', right: 'Đầu tư' },
              { id: 'fn-4', left: '存钱', right: 'Gửi tiết kiệm' },
            ],
            explanation: 'Thuật ngữ tài chính và kinh tế vi mô trong các bài luận HSK 4.',
          },
        ],
      },
    ],
  },

  // HSK 4 - Unit 7: Trí tuệ Nhân tạo & Công nghệ Tương lai
  {
    id: 'unit-hsk4-7',
    unitNumber: 7,
    level: 4,
    title: 'Unit 7: Trí tuệ nhân tạo & Công nghệ tương lai (人工智能与未来)',
    description: 'Xe năng lượng mới, trí tuệ nhân tạo (AI), tự động hóa và những bước nhảy vọt công nghệ hiện đại.',
    themeColor: '#9333ea',
    nodes: [
      {
        id: 'node-hsk4-7-1',
        unitNumber: 7,
        title: 'Kỷ nguyên AI & Chuyển đổi số',
        subtitle: '人工智能 · 新能源 · 自动化 · 改变世界',
        type: 'lesson',
        xpReward: 40,
        status: 'active',
        stars: 0,
        challenges: [
          {
            id: 'c-4-7-1-1',
            type: 'word_bank',
            prompt: 'Ghép câu: "Trí tuệ nhân tạo đang thay đổi cuộc sống của chúng ta."',
            chineseAudioText: '人工智能正在改变我们的生活。',
            pinyinAudioText: 'Réngōng zhìnéng zhèngzài gǎibiàn wǒmen de shēnghuó.',
            tokens: ['人工智能', '正在', '改变', '我们的', '生活', '科技'],
            correctTokens: ['人工智能', '正在', '改变', '我们的', '生活'],
            explanation: '人工智能 (trí tuệ nhân tạo - AI) + 改变 (thay đổi) + 生活 (cuộc sống).',
          },
        ],
      },
      {
        id: 'node-hsk4-7-2',
        unitNumber: 7,
        title: 'Cúp Vinh Quang Toàn Năng HSK 4',
        subtitle: 'Chúc mừng bạn đã chinh phục trọn vẹn đỉnh cao HSK 4',
        type: 'trophy',
        xpReward: 120,
        status: 'locked',
        stars: 0,
        challenges: [
          {
            id: 'c-boss-hsk3-1',
            type: 'match_pairs',
            prompt: 'Cúp Vinh Quang Toàn Diện HSK 3: Nối từ vựng cao cấp',
            matchPairs: [
              { id: 'ph3-1', left: '解决', right: 'Giải quyết' },
              { id: 'ph3-2', left: '检查', right: 'Kiểm tra' },
              { id: 'ph3-3', left: '认真', right: 'Chăm chỉ, nghiêm túc' },
              { id: 'ph3-4', left: '简单', right: 'Đơn giản' },
              { id: 'ph3-5', left: '环境', right: 'Môi trường' },
            ],
            explanation: 'Từ vựng cốt lõi thường xuất hiện trong đề thi đọc hiểu HSK 3.',
          },
          {
            id: 'c-boss-hsk3-2',
            type: 'word_bank',
            prompt: 'Sắp xếp câu chữ 把: "Xin hãy tắt điện thoại trước khi cuộc họp bắt đầu."',
            chineseAudioText: '请大家先把手机关了。',
            pinyinAudioText: 'Qǐng dàjiā xiān bǎ shǒujī guān le.',
            tokens: ['请大家', '先', '把手机', '关了', '跑', '被'],
            correctTokens: ['请大家', '先', '把手机', '关了'],
            explanation: 'Cấu trúc câu chữ 把: Chủ ngữ + 先 + 把 + Tân ngữ + Động từ + 了.',
          },
          {
            id: 'c-boss-hsk3-3',
            type: 'multiple_choice',
            prompt: 'Điền cặp liên từ thích hợp: "他___汉语说得流利，___还会写漂亮的汉字。"',
            options: ['不仅……而且…… (Không chỉ... mà còn...)', '虽然……但是…… (Tuy... nhưng...)', '因为……所以…… (Bởi vì... cho nên...)', '除了……以外…… (Ngoại trừ... ra...)'],
            correctAnswer: '不仅……而且…… (Không chỉ... mà còn...)',
            explanation: 'Biểu thị sự tăng tiến cấp độ: Không những nói lưu loát mà còn viết chữ rất đẹp.',
          },
        ],
      },
    ],
  },
];
