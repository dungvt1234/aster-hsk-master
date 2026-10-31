import type { RoadmapUnit } from '../types';

export const HSK3_ROADMAP_UNITS: RoadmapUnit[] = [
  {
    "id": "unit-hsk3-1",
    "unitNumber": 1,
    "level": 3,
    "title": "Unit 1: Phỏng vấn & Lập kế hoạch (面试与规划)",
    "description": "Chuẩn bị phỏng vấn xin việc (面试), thương lượng đãi ngộ, sở trường cá nhân và kế hoạch phát triển 3-5 năm tới.",
    "themeColor": "#059669",
    "nodes": [
      {
        "id": "node-hsk3-1-1",
        "unitNumber": 1,
        "title": "Buổi phỏng vấn xin việc",
        "subtitle": "面试 · 简历 · 机会 · 努力 · 经验",
        "type": "lesson",
        "xpReward": 25,
        "status": "active",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-1-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng phỏng vấn tuyển dụng:",
            "matchPairs": [
              {
                "id": "iv-1",
                "left": "面试",
                "right": "Phỏng vấn"
              },
              {
                "id": "iv-2",
                "left": "简历",
                "right": "Hồ sơ xin việc / CV"
              },
              {
                "id": "iv-3",
                "left": "机会",
                "right": "Cơ hội"
              },
              {
                "id": "iv-4",
                "left": "经验",
                "right": "Kinh nghiệm"
              }
            ],
            "explanation": "面试 (miànshì: phỏng vấn), 简历 (jiǎnlì: lý lịch/CV), 经验 (jīngyàn: kinh nghiệm)."
          },
          {
            "id": "c-3-1-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Tôi rất trân trọng cơ hội phỏng vấn lần này.\"",
            "chineseAudioText": "我非常珍惜这次面试机会。",
            "pinyinAudioText": "Wǒ fēicháng zhēnxī zhè cì miànshì jīhuì.",
            "tokens": [
              "我",
              "非常珍惜",
              "这次",
              "面试机会",
              "工作",
              "努力"
            ],
            "correctTokens": [
              "我",
              "非常珍惜",
              "这次",
              "面试机会"
            ],
            "explanation": "珍惜 (zhēnxī: trân trọng) + 面试机会 (cơ hội phỏng vấn)."
          },
          {
            "id": "c-3-1-1-3",
            "type": "listen_choose",
            "prompt": "Nghe và chọn câu diễn đạt đúng:",
            "chineseAudioText": "这是我的个人简历。",
            "pinyinAudioText": "Zhè shì wǒ de gèrén jiǎnlì.",
            "options": [
              "Đây là hồ sơ cá nhân của tôi.",
              "Đây là kế hoạch công tác.",
              "Tôi muốn xin nghỉ phép.",
              "Tôi chưa có kinh nghiệm."
            ],
            "correctAnswer": "Đây là hồ sơ cá nhân của tôi.",
            "explanation": "个人简历 (gèrén jiǎnlì) nghĩa là sơ yếu lý lịch cá nhân."
          },
          {
            "id": "c-3-1-1-4",
            "type": "multiple_choice",
            "prompt": "Khi nhà tuyển dụng hỏi \"你为什么想来我们公司?\" nghĩa là gì?",
            "options": [
              "Tại sao bạn muốn đến công ty chúng tôi?",
              "Bạn đã làm ở công ty bao lâu rồi?",
              "Mức lương bạn mong muốn là bao nhiêu?",
              "Khi nào bạn có thể bắt đầu đi làm?"
            ],
            "correctAnswer": "Tại sao bạn muốn đến công ty chúng tôi?",
            "explanation": "为什么 (tại sao) + 想来 (muốn đến) + 我们公司 (công ty chúng tôi)."
          }
        ]
      },
      {
        "id": "node-hsk3-1-2",
        "unitNumber": 1,
        "title": "Đãi ngộ & Môi trường làm việc",
        "subtitle": "工资 · 福利 · 加班 · 试用期 · 满意",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-1-2-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng về chế độ công ty:",
            "matchPairs": [
              {
                "id": "sal-1",
                "left": "工资",
                "right": "Tiền lương"
              },
              {
                "id": "sal-2",
                "left": "加班",
                "right": "Tăng ca / Làm thêm giờ"
              },
              {
                "id": "sal-3",
                "left": "满意",
                "right": "Hài lòng / Thỏa mãn"
              },
              {
                "id": "sal-4",
                "left": "环境",
                "right": "Môi trường làm việc"
              }
            ],
            "explanation": "工资 (gōngzī: lương), 加班 (jiābān: tăng ca), 满意 (mǎnyì: hài lòng)."
          },
          {
            "id": "c-3-1-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Tôi rất hài lòng với môi trường làm việc ở đây.\"",
            "chineseAudioText": "我对这里的工作环境很满意。",
            "pinyinAudioText": "Wǒ duì zhèlǐ de gōngzuò huánjìng hěn mǎnyì.",
            "tokens": [
              "我对",
              "这里的工作环境",
              "很满意",
              "工资",
              "加班"
            ],
            "correctTokens": [
              "我对",
              "这里的工作环境",
              "很满意"
            ],
            "explanation": "Cấu trúc đối tượng cảm xúc: 对...很满意 (rất hài lòng đối với...)."
          },
          {
            "id": "c-3-1-2-3",
            "type": "listen_choose",
            "prompt": "Nghe và chọn ý nghĩa câu:",
            "chineseAudioText": "这个周末需要加班吗？",
            "pinyinAudioText": "Zhège zhōumò xūyào jiābān ma?",
            "options": [
              "Cuối tuần này có cần tăng ca không?",
              "Cuối tuần này bạn đi đâu chơi?",
              "Tuần sau bạn có rảnh không?",
              "Công ty có hỗ trợ ăn trưa không?"
            ],
            "correctAnswer": "Cuối tuần này có cần tăng ca không?",
            "explanation": "加班 (jiābān) là làm thêm giờ, tăng ca."
          },
          {
            "id": "c-3-1-2-4",
            "type": "multiple_choice",
            "prompt": "Cụm từ \"试用期\" (shìyòngqī) trong hợp đồng lao động có nghĩa là gì?",
            "options": [
              "Thời gian thử việc",
              "Thời hạn thanh toán lương",
              "Thời gian nghỉ thai sản",
              "Hạn mức công tác phí"
            ],
            "correctAnswer": "Thời gian thử việc",
            "explanation": "试用 (dùng thử/thử việc) + 期 (kỳ hạn) = thời gian thử việc."
          }
        ]
      },
      {
        "id": "node-hsk3-1-3",
        "unitNumber": 1,
        "title": "Kế hoạch mục tiêu 3 năm tới",
        "subtitle": "计划 · 目标 · 提高 · 发展 · 成功",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-1-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng mục tiêu nghề nghiệp:",
            "matchPairs": [
              {
                "id": "pl-1",
                "left": "计划",
                "right": "Kế hoạch"
              },
              {
                "id": "pl-2",
                "left": "目标",
                "right": "Mục tiêu"
              },
              {
                "id": "pl-3",
                "left": "提高",
                "right": "Nâng cao / Cải thiện"
              },
              {
                "id": "pl-4",
                "left": "完成",
                "right": "Hoàn thành"
              }
            ],
            "explanation": "计划 (jìhuà: kế hoạch), 提高 (tígāo: nâng cao)."
          },
          {
            "id": "c-3-1-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Mục tiêu tương lai của tôi là không ngừng nâng cao năng lực bản thân.\"",
            "chineseAudioText": "我的目标是不断提高自己的能力。",
            "pinyinAudioText": "Wǒ de mùbiāo shì búduàn tígāo zìjǐ de nénglì.",
            "tokens": [
              "我的目标是",
              "不断提高",
              "自己的能力",
              "计划",
              "工资"
            ],
            "correctTokens": [
              "我的目标是",
              "不断提高",
              "自己的能力"
            ],
            "explanation": "不断 (búduàn: không ngừng) + 提高能力 (nâng cao năng lực)."
          },
          {
            "id": "c-3-1-3-3",
            "type": "multiple_choice",
            "prompt": "Từ nào đồng nghĩa với \"nâng cao trình độ tiếng Trung\"?",
            "options": [
              "提高汉语水平",
              "完成汉语作业",
              "忘记汉字",
              "开始学汉语"
            ],
            "correctAnswer": "提高汉语水平",
            "explanation": "提高 (nâng cao) + 水平 (trình độ)."
          }
        ]
      },
      {
        "id": "node-hsk3-1-4",
        "unitNumber": 1,
        "title": "Cúp Vinh Quang Phỏng Vấn",
        "subtitle": "Giành lấy cơ hội việc làm mơ ước",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-1-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chỉ cần cố gắng, nhất định sẽ thành công.\"",
            "chineseAudioText": "只要努力，就一定会成功。",
            "pinyinAudioText": "Zhǐyào nǔlì, jiù yídìng huì chénggōng.",
            "tokens": [
              "只要",
              "努力",
              "就",
              "一定会",
              "成功",
              "如果"
            ],
            "correctTokens": [
              "只要",
              "努力",
              "就",
              "一定会",
              "成功"
            ],
            "explanation": "Cặp liên từ điều kiện thiết yếu: 只要... 就... (chỉ cần... thì...)."
          },
          {
            "id": "c-3-1-4-2",
            "type": "listen_choose",
            "prompt": "Nghe và xác nhận nội dung:",
            "chineseAudioText": "祝贺你被我们公司录用了！",
            "pinyinAudioText": "Zhùhè nǐ bèi wǒmen gōngsī lùyòng le!",
            "options": [
              "Chúc mừng bạn đã được công ty chúng tôi tuyển dụng!",
              "Hẹn gặp lại bạn vào buổi phỏng vấn tới.",
              "Hồ sơ của bạn chưa đủ điều kiện.",
              "Bạn có muốn thay đổi vị trí không?"
            ],
            "correctAnswer": "Chúc mừng bạn đã được công ty chúng tôi tuyển dụng!",
            "explanation": "录用 (lùyòng) là tuyển dụng, trúng tuyển."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-2",
    "unitNumber": 2,
    "level": 3,
    "title": "Unit 2: Du lịch, Sân bay & Khách sạn (旅行与住宿)",
    "description": "Thủ tục check-in sân bay, đặt phòng khách sạn, giải quyết các sự cố phát sinh và chuẩn bị chu đáo chuyến đi.",
    "themeColor": "#06b6d4",
    "nodes": [
      {
        "id": "node-hsk3-2-1",
        "unitNumber": 2,
        "title": "Sân bay & Hành lý",
        "subtitle": "飞机 · 护照 · 行李箱 · 准时",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-2-1-1",
            "type": "match_pairs",
            "prompt": "Nối các từ vựng du lịch & sân bay:",
            "matchPairs": [
              {
                "id": "air-1",
                "left": "护照",
                "right": "Hộ chiếu"
              },
              {
                "id": "air-2",
                "left": "行李箱",
                "right": "Vali hành lý"
              },
              {
                "id": "air-3",
                "left": "准时",
                "right": "Đúng giờ"
              },
              {
                "id": "air-4",
                "left": "起飞",
                "right": "Cất cánh"
              }
            ],
            "explanation": "护照 (hùzhào: hộ chiếu), 行李箱 (xínglixiāng: vali), 准时 (zhǔnshí: đúng giờ)."
          },
          {
            "id": "c-3-2-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chuyến bay hôm nay cất cánh rất đúng giờ.\"",
            "chineseAudioText": "今天的航班起飞非常准时。",
            "pinyinAudioText": "Jīntiān de hángbān qǐfēi fēicháng zhǔnshí.",
            "tokens": [
              "今天的航班",
              "起飞",
              "非常准时",
              "行李",
              "晚点"
            ],
            "correctTokens": [
              "今天的航班",
              "起飞",
              "非常准时"
            ],
            "explanation": "航班 (hángbān: chuyến bay) + 起飞 (cất cánh) + 准时 (đúng giờ)."
          },
          {
            "id": "c-3-2-1-3",
            "type": "listen_choose",
            "prompt": "Nghe và nhận biết thông tin sân bay:",
            "chineseAudioText": "请出示您的登机牌和护照。",
            "pinyinAudioText": "Qǐng chūshì nín de dēngjīpái hé hùzhào.",
            "options": [
              "Xin vui lòng xuất trình thẻ lên máy bay và hộ chiếu.",
              "Xin vui lòng cân lại hành lý ký gửi.",
              "Cửa lên máy bay đã thay đổi.",
              "Máy bay chuẩn bị hạ cánh."
            ],
            "correctAnswer": "Xin vui lòng xuất trình thẻ lên máy bay và hộ chiếu.",
            "explanation": "登机牌 (thẻ lên máy bay) + 护照 (hộ chiếu)."
          }
        ]
      },
      {
        "id": "node-hsk3-2-2",
        "unitNumber": 2,
        "title": "Nhận phòng khách sạn",
        "subtitle": "预订 · 房卡 · 入住 · 退房 · 服务",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-2-2-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ khách sạn:",
            "matchPairs": [
              {
                "id": "ht-1",
                "left": "预订",
                "right": "Đặt trước"
              },
              {
                "id": "ht-2",
                "left": "房卡",
                "right": "Thẻ phòng"
              },
              {
                "id": "ht-3",
                "left": "入住",
                "right": "Nhận phòng (Check-in)"
              },
              {
                "id": "ht-4",
                "left": "退房",
                "right": "Trả phòng (Check-out)"
              }
            ],
            "explanation": "预订 (yùdìng: đặt trước), 入住 (rùzhù: nhận phòng), 退房 (tuìfáng: trả phòng)."
          },
          {
            "id": "c-3-2-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Tôi đã đặt trước một phòng tiêu chuẩn trên mạng.\"",
            "chineseAudioText": "我在网上预订了一间标准间。",
            "pinyinAudioText": "Wǒ zài wǎngshang yùdìng le yì jiān biāozhǔnjiān.",
            "tokens": [
              "我在网上",
              "预订了",
              "一间标准间",
              "退房",
              "护照"
            ],
            "correctTokens": [
              "我在网上",
              "预订了",
              "一间标准间"
            ],
            "explanation": "预订 (yùdìng: đặt trước) + 标准间 (phòng tiêu chuẩn)."
          },
          {
            "id": "c-3-2-2-3",
            "type": "multiple_choice",
            "prompt": "Khi muốn hỏi mật khẩu Wi-Fi tại quầy lễ tân khách sạn, bạn nói:",
            "options": [
              "请问这里的无线网络密码是多少？",
              "现在几点了？",
              "去机场怎么走？",
              "今天天气怎么样？"
            ],
            "correctAnswer": "请问这里的无线网络密码是多少？",
            "explanation": "无线网络密码 (wúxiàn wǎngluò mìmǎ) là mật khẩu Wi-Fi."
          }
        ]
      },
      {
        "id": "node-hsk3-2-3",
        "unitNumber": 2,
        "title": "Sự cố chuyến đi & Giải quyết",
        "subtitle": "晚点 · 迷路 · 换房间 · 顺利 · 放心",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-2-3-1",
            "type": "match_pairs",
            "prompt": "Nối tình huống và cách xử lý:",
            "matchPairs": [
              {
                "id": "tr-1",
                "left": "晚点",
                "right": "Trễ giờ / Hoãn chuyến"
              },
              {
                "id": "tr-2",
                "left": "迷路",
                "right": "Lạc đường"
              },
              {
                "id": "tr-3",
                "left": "换房间",
                "right": "Đổi phòng khác"
              },
              {
                "id": "tr-4",
                "left": "顺利",
                "right": "Thuận lợi / Suôn sẻ"
              }
            ],
            "explanation": "晚点 (wǎndiǎn: trễ), 迷路 (mílù: lạc đường), 顺利 (shùnlì: suôn sẻ)."
          },
          {
            "id": "c-3-2-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Đừng lo, mọi chuyện sẽ diễn ra rất thuận lợi.\"",
            "chineseAudioText": "别担心，一切都会很顺利的。",
            "pinyinAudioText": "Bié dānxīn, yíqiè dōu huì hěn shùnlì de.",
            "tokens": [
              "别担心",
              "一切都会",
              "很顺利的",
              "晚点",
              "迷路"
            ],
            "correctTokens": [
              "别担心",
              "一切都会",
              "很顺利的"
            ],
            "explanation": "一切 (yíqiè: mọi thứ) + 顺利 (shùnlì: thuận lợi)."
          },
          {
            "id": "c-3-2-3-3",
            "type": "listen_choose",
            "prompt": "Nghe và nắm thông báo khẩn:",
            "chineseAudioText": "因为天气原因，航班推迟一小时。",
            "pinyinAudioText": "Yīnwèi tiānqì yuányīn, hángbān tuīchí yì xiǎoshí.",
            "options": [
              "Do thời tiết, chuyến bay hoãn 1 tiếng.",
              "Do thời tiết, chuyến bay bị hủy.",
              "Máy bay sẽ đến sớm hơn dự kiến.",
              "Hành khách lên máy bay ngay."
            ],
            "correctAnswer": "Do thời tiết, chuyến bay hoãn 1 tiếng.",
            "explanation": "推迟 (tuīchí: lùi lại, hoãn) + 一小时 (1 tiếng)."
          }
        ]
      },
      {
        "id": "node-hsk3-2-4",
        "unitNumber": 2,
        "title": "Cúp Vinh Quang Sân Bay",
        "subtitle": "Chuyến bay an toàn & Hành trình suôn sẻ",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-2-4-1",
            "type": "word_bank",
            "prompt": "Ghép lời chúc lên đường bình an:",
            "chineseAudioText": "祝你旅途愉快，一路平安！",
            "pinyinAudioText": "Zhù nǐ lǚtú yúkuài, yílù píng'ān!",
            "tokens": [
              "祝你",
              "旅途愉快",
              "一路平安",
              "恭喜",
              "早日康复"
            ],
            "correctTokens": [
              "祝你",
              "旅途愉快",
              "一路平安"
            ],
            "explanation": "旅途愉快 (chuyến đi vui vẻ) + 一路平安 (thượng lộ bình an)."
          },
          {
            "id": "c-3-2-4-2",
            "type": "multiple_choice",
            "prompt": "Ý nghĩa của thành ngữ \"一路顺风\" (Yílù shùnfēng) là gì?",
            "options": [
              "Thuận buồm xuôi gió / Lên đường bình an",
              "Đi chậm rãi cẩn thận",
              "Gió to cẩn thận cảm lạnh",
              "Chào mừng bạn đã trở về"
            ],
            "correctAnswer": "Thuận buồm xuôi gió / Lên đường bình an",
            "explanation": "一路顺风 là lời chúc quen thuộc khi tiễn người đi xa."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-3",
    "unitNumber": 3,
    "level": 3,
    "title": "Unit 3: Môi trường công sở & Thảo luận (职场办公)",
    "description": "Tổ chức cuộc họp, thuyết trình báo cáo số liệu, hợp tác nhóm giải quyết công việc hiệu quả.",
    "themeColor": "#3b82f6",
    "nodes": [
      {
        "id": "node-hsk3-3-1",
        "unitNumber": 3,
        "title": "Họp & Phân công công việc",
        "subtitle": "会议 · 发电子邮件 · 解决 · 提高",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-3-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng văn phòng:",
            "matchPairs": [
              {
                "id": "of-1",
                "left": "会议",
                "right": "Cuộc họp"
              },
              {
                "id": "of-2",
                "left": "电子邮件",
                "right": "Thư điện tử / Email"
              },
              {
                "id": "of-3",
                "left": "解决",
                "right": "Giải quyết"
              },
              {
                "id": "of-4",
                "left": "负责",
                "right": "Phụ trách / Chịu trách nhiệm"
              }
            ],
            "explanation": "会议 (huìyì: cuộc họp), 解决 (jiějué: giải quyết), 负责 (fùzé: phụ trách)."
          },
          {
            "id": "c-3-3-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Cuộc họp sáng mai dời sang 10 giờ.\"",
            "chineseAudioText": "明天的会议推迟到十点。",
            "pinyinAudioText": "Míngtiān de huìyì tuīchí dào shí diǎn.",
            "tokens": [
              "明天的会议",
              "推迟到",
              "十点",
              "解决",
              "负责"
            ],
            "correctTokens": [
              "明天的会议",
              "推迟到",
              "十点"
            ],
            "explanation": "推迟到 (tuīchí dào: dời/hoãn đến lúc)."
          },
          {
            "id": "c-3-3-1-3",
            "type": "multiple_choice",
            "prompt": "Khi đồng nghiệp nói \"这件事情由我来负责\", họ muốn truyền đạt điều gì?",
            "options": [
              "Việc này để tôi phụ trách.",
              "Việc này ai muốn làm thì làm.",
              "Tôi không liên quan đến việc này.",
              "Việc này đã bị hủy bỏ."
            ],
            "correctAnswer": "Việc này để tôi phụ trách.",
            "explanation": "由...来负责 (do ai đó đứng ra phụ trách)."
          }
        ]
      },
      {
        "id": "node-hsk3-3-2",
        "unitNumber": 3,
        "title": "Thuyết trình & Báo cáo số liệu",
        "subtitle": "汇报 · 数据 · 进度 · 满意 · 分析",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-3-2-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng báo cáo công việc:",
            "matchPairs": [
              {
                "id": "rp-1",
                "left": "汇报",
                "right": "Báo cáo cấp trên"
              },
              {
                "id": "rp-2",
                "left": "数据",
                "right": "Số liệu / Dữ liệu"
              },
              {
                "id": "rp-3",
                "left": "进度",
                "right": "Tiến độ"
              },
              {
                "id": "rp-4",
                "left": "分析",
                "right": "Phân tích"
              }
            ],
            "explanation": "汇报 (huìbào: báo cáo), 数据 (shùjù: số liệu), 进度 (jìndù: tiến độ)."
          },
          {
            "id": "c-3-3-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Tiến độ dự án hiện tại diễn ra rất tốt.\"",
            "chineseAudioText": "目前项目进度非常理想。",
            "pinyinAudioText": "Mùqián xiàngmù jìndù fēicháng lǐxiǎng.",
            "tokens": [
              "目前",
              "项目进度",
              "非常理想",
              "会议",
              "推迟"
            ],
            "correctTokens": [
              "目前",
              "项目进度",
              "非常理想"
            ],
            "explanation": "目前 (mùqián: hiện tại) + 项目进度 (tiến độ dự án) + 理想 (lý tưởng/rất tốt)."
          },
          {
            "id": "c-3-3-2-3",
            "type": "listen_choose",
            "prompt": "Nghe và nhận định nội dung thuyết trình:",
            "chineseAudioText": "请大家看大屏幕上的数据分析。",
            "pinyinAudioText": "Qǐng dàjiā kàn dà píngmù shang de shùjù fēnxī.",
            "options": [
              "Xin mời mọi người xem phân tích số liệu trên màn hình lớn.",
              "Xin mọi người mở email để kiểm tra.",
              "Hôm nay chúng ta không cần báo cáo.",
              "Dự án đã hoàn thành vượt mức."
            ],
            "correctAnswer": "Xin mời mọi người xem phân tích số liệu trên màn hình lớn.",
            "explanation": "大屏幕 (màn hình lớn) + 数据分析 (phân tích số liệu)."
          }
        ]
      },
      {
        "id": "node-hsk3-3-3",
        "unitNumber": 3,
        "title": "Hợp tác nhóm & Tương trợ",
        "subtitle": "合作 · 互相帮助 · 解决矛盾 · 信任",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-3-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng tinh thần làm việc nhóm:",
            "matchPairs": [
              {
                "id": "tm-1",
                "left": "合作",
                "right": "Hợp tác"
              },
              {
                "id": "tm-2",
                "left": "互相帮助",
                "right": "Giúp đỡ lẫn nhau"
              },
              {
                "id": "tm-3",
                "left": "信任",
                "right": "Tin tưởng"
              },
              {
                "id": "tm-4",
                "left": "团结",
                "right": "Đoàn kết"
              }
            ],
            "explanation": "合作 (hézuò: hợp tác), 互相帮助 (hùxiāng bāngzhù: giúp nhau)."
          },
          {
            "id": "c-3-3-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chúng ta cần hợp tác chặt chẽ để hoàn thành công việc.\"",
            "chineseAudioText": "我们需要密切合作完成这项工作。",
            "pinyinAudioText": "Wǒmen xūyào mìqiè hézuò wánchéng zhè xiàng gōngzuò.",
            "tokens": [
              "我们需要",
              "密切合作",
              "完成这项工作",
              "推迟",
              "工资"
            ],
            "correctTokens": [
              "我们需要",
              "密切合作",
              "完成这项工作"
            ],
            "explanation": "密切合作 (mìqiè hézuò: hợp tác chặt chẽ)."
          },
          {
            "id": "c-3-3-3-3",
            "type": "multiple_choice",
            "prompt": "Từ nào thể hiện tinh thần \"hỗ trợ lẫn nhau\"?",
            "options": [
              "互相支持",
              "独自解决",
              "各自离开",
              "不再联系"
            ],
            "correctAnswer": "互相支持",
            "explanation": "互相 (lẫn nhau) + 支持 (ủng hộ, hỗ trợ)."
          }
        ]
      },
      {
        "id": "node-hsk3-3-4",
        "unitNumber": 3,
        "title": "Cúp Vinh Quang Công Sở",
        "subtitle": "Chuyên gia công sở năng động & chuyên nghiệp",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-3-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu khẳng định sự hoàn thành xuất sắc:",
            "chineseAudioText": "大家辛苦了，任务圆满完成！",
            "pinyinAudioText": "Dàjiā xīnkǔ le, rènwù yuánmǎn wánchéng!",
            "tokens": [
              "大家辛苦了",
              "任务",
              "圆满完成",
              "加班",
              "生病"
            ],
            "correctTokens": [
              "大家辛苦了",
              "任务",
              "圆满完成"
            ],
            "explanation": "大家辛苦了 (mọi người vất vả rồi) + 圆满完成 (hoàn thành mỹ mãn)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-4",
    "unitNumber": 4,
    "level": 3,
    "title": "Unit 4: Tính cách, Cảm xúc & Giao lưu (性格与情感)",
    "description": "Miêu tả phẩm chất tính cách, chia sẻ vui buồn cảm xúc và xây dựng tình bạn chân thành.",
    "themeColor": "#ec4899",
    "nodes": [
      {
        "id": "node-hsk3-4-1",
        "unitNumber": 4,
        "title": "Tính cách & Phẩm chất con người",
        "subtitle": "热情 · 认真 · 难过 · 放心 · 诚实",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-4-1-1",
            "type": "match_pairs",
            "prompt": "Nối tính từ miêu tả tính cách:",
            "matchPairs": [
              {
                "id": "pe-1",
                "left": "热情",
                "right": "Nhiệt tình"
              },
              {
                "id": "pe-2",
                "left": "认真",
                "right": "Nghiêm túc / Cẩn thận"
              },
              {
                "id": "pe-3",
                "left": "诚实",
                "right": "Thành thật"
              },
              {
                "id": "pe-4",
                "left": "聪明",
                "right": "Thông minh"
              }
            ],
            "explanation": "热情 (rèqíng: nhiệt tình), 认真 (rènzhēn: nghiêm túc, chăm chỉ)."
          },
          {
            "id": "c-3-4-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Anh ấy là một người làm việc rất nghiêm túc.\"",
            "chineseAudioText": "他是一个工作非常认真的人。",
            "pinyinAudioText": "Tā shì yí gè gōngzuò fēicháng rènzhēn de rén.",
            "tokens": [
              "他是一个",
              "工作非常认真",
              "的人",
              "热情",
              "难过"
            ],
            "correctTokens": [
              "他是一个",
              "工作非常认真",
              "的人"
            ],
            "explanation": "认真 (rènzhēn: cẩn thận, tận tụy)."
          }
        ]
      },
      {
        "id": "node-hsk3-4-2",
        "unitNumber": 4,
        "title": "Cảm xúc vui buồn & Chia sẻ",
        "subtitle": "担心 · 激动 · 生气 · 难过 · 鼓励",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-4-2-1",
            "type": "match_pairs",
            "prompt": "Nối các trạng thái cảm xúc:",
            "matchPairs": [
              {
                "id": "em-1",
                "left": "激动",
                "right": "Kích động / Hào hứng"
              },
              {
                "id": "em-2",
                "left": "难过",
                "right": "Buồn bã / Khó chịu trong lòng"
              },
              {
                "id": "em-3",
                "left": "生气",
                "right": "Tức giận"
              },
              {
                "id": "em-4",
                "left": "鼓励",
                "right": "Cổ vũ / Động viên"
              }
            ],
            "explanation": "激动 (jīdòng: kích động, phấn khởi), 难过 (nánguò: buồn)."
          },
          {
            "id": "c-3-4-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Đừng buồn nữa, lần sau bạn nhất định sẽ làm tốt hơn.\"",
            "chineseAudioText": "别难过了，下次你一定会做得更好。",
            "pinyinAudioText": "Bié nánguò le, xià cì nǐ yídìng huì zuò de gèng hǎo.",
            "tokens": [
              "别难过了",
              "下次你一定会",
              "做得更好",
              "生气",
              "激动"
            ],
            "correctTokens": [
              "别难过了",
              "下次你一定会",
              "做得更好"
            ],
            "explanation": "做得更好 (zuò de gèng hǎo: làm tốt hơn nữa)."
          },
          {
            "id": "c-3-4-2-3",
            "type": "listen_choose",
            "prompt": "Nghe và nhận diện tâm trạng người nói:",
            "chineseAudioText": "听到这个好消息，大家都很激动。",
            "pinyinAudioText": "Tīngdào zhège hǎo xiāoxi, dàjiā dōu hěn jīdòng.",
            "options": [
              "Nghe thấy tin tốt này, mọi người đều rất phấn khởi hào hứng.",
              "Mọi người đều cảm thấy rất lo lắng.",
              "Tin tức này làm mọi người tức giận.",
              "Mọi người muốn nghỉ ngơi."
            ],
            "correctAnswer": "Nghe thấy tin tốt này, mọi người đều rất phấn khởi hào hứng.",
            "explanation": "好消息 (tin tốt) + 激动 (phấn chấn, hào hứng)."
          }
        ]
      },
      {
        "id": "node-hsk3-4-3",
        "unitNumber": 4,
        "title": "Kết bạn & Mối quan hệ thân thiết",
        "subtitle": "真诚 · 信任 · 互相了解 · 交流 · 友谊",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-4-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng về tình bạn:",
            "matchPairs": [
              {
                "id": "fr-1",
                "left": "友谊",
                "right": "Tình bạn"
              },
              {
                "id": "fr-2",
                "left": "真诚",
                "right": "Chân thành"
              },
              {
                "id": "fr-3",
                "left": "交流",
                "right": "Giao lưu / Trao đổi"
              },
              {
                "id": "fr-4",
                "left": "了解",
                "right": "Hiểu rõ / Thấu hiểu"
              }
            ],
            "explanation": "友谊 (yǒuyì: tình bạn), 真诚 (zhēnchéng: chân thành)."
          },
          {
            "id": "c-3-4-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Tình bạn chân thành quý giá hơn bất cứ thứ gì.\"",
            "chineseAudioText": "真诚的友谊比什么都珍贵。",
            "pinyinAudioText": "Zhēnchéng de yǒuyì bǐ shénme dōu zhēnguì.",
            "tokens": [
              "真诚的友谊",
              "比什么都",
              "珍贵",
              "难过",
              "生气"
            ],
            "correctTokens": [
              "真诚的友谊",
              "比什么都",
              "珍贵"
            ],
            "explanation": "珍贵 (zhēnguì: trân quý, quý giá)."
          },
          {
            "id": "c-3-4-3-3",
            "type": "multiple_choice",
            "prompt": "Thành ngữ \"互相了解\" nghĩa là gì?",
            "options": [
              "Thấu hiểu lẫn nhau",
              "Tranh cãi lẫn nhau",
              "Không quen biết nhau",
              "Tìm kiếm bạn mới"
            ],
            "correctAnswer": "Thấu hiểu lẫn nhau",
            "explanation": "互相 (lẫn nhau) + 了解 (hiểu rõ)."
          }
        ]
      },
      {
        "id": "node-hsk3-4-4",
        "unitNumber": 4,
        "title": "Cúp Vinh Quang Cảm Xúc",
        "subtitle": "Hiểu người, thấu hiểu lòng mình & Trọn vẹn tình bạn",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-4-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu châm ngôn tình bạn:",
            "chineseAudioText": "患难见真情，好朋友是一辈子的财富。",
            "pinyinAudioText": "Huànnàn jiàn zhēnqíng, hǎo péngyou shì yíbèizi de cáifù.",
            "tokens": [
              "患难见真情",
              "好朋友是",
              "一辈子的财富",
              "工作",
              "工资"
            ],
            "correctTokens": [
              "患难见真情",
              "好朋友是",
              "一辈子的财富"
            ],
            "explanation": "患难见真情 (gian nan mới hiểu bạn hiền) + 财富 (tài sản)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-5",
    "unitNumber": 5,
    "level": 3,
    "title": "Unit 5: Ẩm thực 8 trường phái & Đi ăn nhà hàng (八大菜系与点餐)",
    "description": "Khám phá văn hóa ẩm thực Trung Hoa, khẩu vị chua cay mặn ngọt, nghi thức bàn tiệc và đánh giá món ăn.",
    "themeColor": "#f59e0b",
    "nodes": [
      {
        "id": "node-hsk3-5-1",
        "unitNumber": 5,
        "title": "Mùi vị & Gọi món đặc sản",
        "subtitle": "酸甜苦辣 · 菜单 · 特色菜 · 买单 · 新鲜",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-5-1-1",
            "type": "match_pairs",
            "prompt": "Nối các vị cơ bản trong ẩm thực:",
            "matchPairs": [
              {
                "id": "ts-1",
                "left": "酸",
                "right": "Chua"
              },
              {
                "id": "ts-2",
                "left": "甜",
                "right": "Ngọt"
              },
              {
                "id": "ts-3",
                "left": "苦",
                "right": "Đắng"
              },
              {
                "id": "ts-4",
                "left": "辣",
                "right": "Cay"
              }
            ],
            "explanation": "酸 (suān: chua), 甜 (tián: ngọt), 苦 (kǔ: đắng), 辣 (là: cay)."
          },
          {
            "id": "c-3-5-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Xin vui lòng giới thiệu vài món đặc sắc của quán.\"",
            "chineseAudioText": "请介绍一下你们店的特色菜。",
            "pinyinAudioText": "Qǐng jièshào yíxià nǐmen diàn de tèsècài.",
            "tokens": [
              "请介绍一下",
              "你们店的",
              "特色菜",
              "买单",
              "苦"
            ],
            "correctTokens": [
              "请介绍一下",
              "你们店的",
              "特色菜"
            ],
            "explanation": "特色菜 (tèsècài: món đặc sản/món tiêu biểu của quán)."
          },
          {
            "id": "c-3-5-1-3",
            "type": "listen_choose",
            "prompt": "Nghe và xác định yêu cầu về món ăn:",
            "chineseAudioText": "请少放一点辣椒，我不太能吃辣。",
            "pinyinAudioText": "Qǐng shǎo fàng yìdiǎn làjiāo, wǒ bú tài néng chī là.",
            "options": [
              "Xin cho ít ớt thôi, tôi không ăn cay được nhiều.",
              "Cho thật nhiều ớt cay vào nhé.",
              "Món này quá ngọt tôi không thích.",
              "Hôm nay tôi muốn ăn chay."
            ],
            "correctAnswer": "Xin cho ít ớt thôi, tôi không ăn cay được nhiều.",
            "explanation": "少放 (cho ít lại) + 辣椒 (ớt) + 不太能吃辣 (không giỏi ăn cay)."
          }
        ]
      },
      {
        "id": "node-hsk3-5-2",
        "unitNumber": 5,
        "title": "Văn hóa bàn tiệc & Nghi thức mời trà",
        "subtitle": "请客 · 倒茶 · 慢慢吃 · 干杯 · 礼貌",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-5-2-1",
            "type": "match_pairs",
            "prompt": "Nối phong tục trên bàn ăn:",
            "matchPairs": [
              {
                "id": "tbl-1",
                "left": "请客",
                "right": "Mời khách / Đãi cơm"
              },
              {
                "id": "tbl-2",
                "left": "倒茶",
                "right": "Rót trà"
              },
              {
                "id": "tbl-3",
                "left": "干杯",
                "right": "Cạn ly / Nâng chén"
              },
              {
                "id": "tbl-4",
                "left": "慢慢吃",
                "right": "Ăn từ từ ngon miệng"
              }
            ],
            "explanation": "请客 (qǐngkè: mời cơm), 干杯 (gānbēi: cạn ly), 倒茶 (dào chá: rót trà)."
          },
          {
            "id": "c-3-5-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu lịch sự: \"Hôm nay để tôi đãi, mọi người cứ ăn tự nhiên nhé!\"",
            "chineseAudioText": "今天我请客，大家随意吃！",
            "pinyinAudioText": "Jīntiān wǒ qǐngkè, dàjiā suíyì chī!",
            "tokens": [
              "今天我请客",
              "大家",
              "随意吃",
              "买单",
              "苦"
            ],
            "correctTokens": [
              "今天我请客",
              "大家",
              "随意吃"
            ],
            "explanation": "我请客 (hôm nay tôi đãi) + 随意 (tùy ý/tự nhiên)."
          },
          {
            "id": "c-3-5-2-3",
            "type": "multiple_choice",
            "prompt": "Khi được chủ nhà rót trà, hành động lịch sự của người nhận là gì?",
            "options": [
              "Dùng ngón trỏ và ngón giữa gõ nhẹ mặt bàn để cảm ơn",
              "Uống một hơi hết chén trà ngay lập tức",
              "Đứng dậy bỏ đi chỗ khác",
              "Yêu cầu đổi sang nước ngọt"
            ],
            "correctAnswer": "Dùng ngón trỏ và ngón giữa gõ nhẹ mặt bàn để cảm ơn",
            "explanation": "Đây là phong tục \"Khấu trà lễ\" (叩手礼) nổi tiếng của người Hoa."
          }
        ]
      },
      {
        "id": "node-hsk3-5-3",
        "unitNumber": 5,
        "title": "Nhận xét món ăn & Khẩu vị cá nhân",
        "subtitle": "清淡 · 鲜美 · 地道 · 味道好 · 满意",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-5-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ đánh giá hương vị:",
            "matchPairs": [
              {
                "id": "fv-1",
                "left": "清淡",
                "right": "Thanh đạm / Ít dầu mỡ"
              },
              {
                "id": "fv-2",
                "left": "地道",
                "right": "Chuẩn vị / Chính gốc"
              },
              {
                "id": "fv-3",
                "left": "鲜美",
                "right": "Tươi ngọt / Đậm đà"
              },
              {
                "id": "fv-4",
                "left": "香",
                "right": "Thơm phức"
              }
            ],
            "explanation": "地道 (dìdao: chuẩn vị), 清淡 (qīngdàn: thanh đạm)."
          },
          {
            "id": "c-3-5-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Hương vị món Vịt quay Bắc Kinh này rất chuẩn vị!\"",
            "chineseAudioText": "这道北京烤鸭的味道非常地道！",
            "pinyinAudioText": "Zhè dào Běijīng kǎoyā de wèidao fēicháng dìdao!",
            "tokens": [
              "这道北京烤鸭",
              "的味道",
              "非常地道",
              "清淡",
              "苦"
            ],
            "correctTokens": [
              "这道北京烤鸭",
              "的味道",
              "非常地道"
            ],
            "explanation": "味道地道 (wèidao dìdao: hương vị rất chuẩn, chính gốc)."
          }
        ]
      },
      {
        "id": "node-hsk3-5-4",
        "unitNumber": 5,
        "title": "Cúp Vinh Quang Mỹ Vị",
        "subtitle": "Bậc thầy ẩm thực & Tinh hoa bàn tiệc Trung Hoa",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-5-4-1",
            "type": "word_bank",
            "prompt": "Ghép thành ngữ văn hóa ẩm thực Trung Hoa:",
            "chineseAudioText": "民以食为天，享受生活从美食开始。",
            "pinyinAudioText": "Mín yǐ shí wéi tiān, xiǎngshòu shēnghuó cóng měishí kāishǐ.",
            "tokens": [
              "民以食为天",
              "享受生活",
              "从美食开始",
              "买单",
              "倒茶"
            ],
            "correctTokens": [
              "民以食为天",
              "享受生活",
              "从美食开始"
            ],
            "explanation": "民以食为天 (dân dĩ thực vi thiên - cái ăn là điều quan trọng nhất)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-6",
    "unitNumber": 6,
    "level": 3,
    "title": "Unit 6: Mua sắm Online & Chuyển phát nhanh (网购与快递)",
    "description": "Trải nghiệm mua hàng trực tuyến, thanh toán điện tử, nhận bưu kiện chuyển phát nhanh và đánh giá đổi trả hàng hóa.",
    "themeColor": "#8b5cf6",
    "nodes": [
      {
        "id": "node-hsk3-6-1",
        "unitNumber": 6,
        "title": "Mua sắm qua mạng",
        "subtitle": "网购 · 购物车 · 优惠 · 便宜 · 评价",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-6-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng mua sắm online:",
            "matchPairs": [
              {
                "id": "on-1",
                "left": "网购",
                "right": "Mua hàng qua mạng"
              },
              {
                "id": "on-2",
                "left": "购物车",
                "right": "Giỏ hàng"
              },
              {
                "id": "on-3",
                "left": "优惠",
                "right": "Ưu đãi / Giảm giá"
              },
              {
                "id": "on-4",
                "left": "支付",
                "right": "Thanh toán"
              }
            ],
            "explanation": "网购 (wǎnggòu: mua online), 购物车 (gòuwùchē: giỏ hàng)."
          },
          {
            "id": "c-3-6-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Hôm nay trên mạng có rất nhiều chương trình ưu đãi.\"",
            "chineseAudioText": "今天网上有很多优惠活动。",
            "pinyinAudioText": "Jīntiān wǎngshang yǒu hěn duō yōuhuì huódòng.",
            "tokens": [
              "今天网上",
              "有很多",
              "优惠活动",
              "快递",
              "包裹"
            ],
            "correctTokens": [
              "今天网上",
              "有很多",
              "优惠活动"
            ],
            "explanation": "优惠活动 (yōuhuì huódòng: hoạt động ưu đãi, khuyến mãi)."
          },
          {
            "id": "c-3-6-1-3",
            "type": "multiple_choice",
            "prompt": "Khi muốn thanh toán đơn hàng online, người dùng bấm vào nút nào?",
            "options": [
              "立即支付 (Thanh toán ngay)",
              "加入购物车 (Thêm vào giỏ)",
              "查看评价 (Xem đánh giá)",
              "联系卖家 (Nhắn người bán)"
            ],
            "correctAnswer": "立即支付 (Thanh toán ngay)",
            "explanation": "立即支付 (lìjí zhīfù: thanh toán ngay)."
          }
        ]
      },
      {
        "id": "node-hsk3-6-2",
        "unitNumber": 6,
        "title": "Nhận hàng & Bưu kiện chuyển phát",
        "subtitle": "快递员 · 取包裹 · 拆开 · 检查 · 准时",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-6-2-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng chuyển phát nhanh:",
            "matchPairs": [
              {
                "id": "kd-1",
                "left": "快递",
                "right": "Chuyển phát nhanh"
              },
              {
                "id": "kd-2",
                "left": "包裹",
                "right": "Bưu kiện / Gói hàng"
              },
              {
                "id": "kd-3",
                "left": "取件码",
                "right": "Mã lấy hàng"
              },
              {
                "id": "kd-4",
                "left": "签收",
                "right": "Ký nhận bưu kiện"
              }
            ],
            "explanation": "快递 (kuàidì: chuyển phát nhanh), 包裹 (bāoguǒ: gói hàng)."
          },
          {
            "id": "c-3-6-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Bưu kiện của bạn đã được chuyển đến trạm chuyển phát dưới nhà.\"",
            "chineseAudioText": "你的包裹已经送到楼下的快递站了。",
            "pinyinAudioText": "Nǐ de bāoguǒ yǐjīng sòng dào lóuxià de kuàidìzhàn le.",
            "tokens": [
              "你的包裹",
              "已经送到",
              "楼下的快递站了",
              "优惠",
              "退货"
            ],
            "correctTokens": [
              "你的包裹",
              "已经送到",
              "楼下的快递站了"
            ],
            "explanation": "快递站 (kuàidìzhàn: điểm lấy hàng chuyển phát)."
          },
          {
            "id": "c-3-6-2-3",
            "type": "listen_choose",
            "prompt": "Nghe shipper gọi điện:",
            "chineseAudioText": "您好，您的快递到了，请下来签收一下。",
            "pinyinAudioText": "Nín hǎo, nín de kuàidì dào le, qǐng xiàlái qiānshōu yíxià.",
            "options": [
              "Xin chào, hàng của bạn đã tới, xin vui lòng xuống ký nhận.",
              "Hàng của bạn bị thất lạc.",
              "Bạn có muốn hủy đơn hàng không?",
              "Đơn hàng chưa được thanh toán."
            ],
            "correctAnswer": "Xin chào, hàng của bạn đã tới, xin vui lòng xuống ký nhận.",
            "explanation": "签收 (qiānshōu: ký nhận kiện hàng)."
          }
        ]
      },
      {
        "id": "node-hsk3-6-3",
        "unitNumber": 6,
        "title": "Đánh giá 5 sao & Đổi trả hàng",
        "subtitle": "好评 · 质量好 · 退货 · 换货 · 满意",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-6-3-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ dịch vụ sau mua:",
            "matchPairs": [
              {
                "id": "af-1",
                "left": "好评",
                "right": "Đánh giá tốt (5 sao)"
              },
              {
                "id": "af-2",
                "left": "退货",
                "right": "Trả lại hàng"
              },
              {
                "id": "af-3",
                "left": "换货",
                "right": "Đổi hàng mới"
              },
              {
                "id": "af-4",
                "left": "质量",
                "right": "Chất lượng"
              }
            ],
            "explanation": "好评 (hǎopíng: khen ngợi/5 sao), 退货 (tuìhuò: trả hàng)."
          },
          {
            "id": "c-3-6-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chất lượng chiếc áo này rất tốt, tôi cho người bán 5 sao.\"",
            "chineseAudioText": "这件衣服质量很好，我给卖家五星好评。",
            "pinyinAudioText": "Zhè jiàn yīfu zhìliàng hěn hǎo, wǒ gěi màijiā wǔxīng hǎopíng.",
            "tokens": [
              "这件衣服",
              "质量很好",
              "我给卖家",
              "五星好评",
              "包裹"
            ],
            "correctTokens": [
              "这件衣服",
              "质量很好",
              "我给卖家",
              "五星好评"
            ],
            "explanation": "五星好评 (wǔxīng hǎopíng: đánh giá 5 sao tuyệt đối)."
          }
        ]
      },
      {
        "id": "node-hsk3-6-4",
        "unitNumber": 6,
        "title": "Cúp Vinh Quang Thương Mại Số",
        "subtitle": "Chinh phục nhịp sống công nghệ số hiện đại",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-6-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu nhận định về thời đại số:",
            "chineseAudioText": "互联网改变了人们的消费习惯。",
            "pinyinAudioText": "Hùliánwǎng gǎibiàn le rénmen de xiāofèi xíguàn.",
            "tokens": [
              "互联网",
              "改变了",
              "人们的",
              "消费习惯",
              "快递"
            ],
            "correctTokens": [
              "互联网",
              "改变了",
              "人们的",
              "消费习惯"
            ],
            "explanation": "消费习惯 (xiāofèi xíguàn: thói quen tiêu dùng)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-7",
    "unitNumber": 7,
    "level": 3,
    "title": "Unit 7: Thể hình & Lối sống lành mạnh (健身与健康)",
    "description": "Tập luyện thể thao nâng cao sức bền, chế độ ăn dinh dưỡng cân bằng và xây dựng thói quen sinh hoạt khoa học.",
    "themeColor": "#10b981",
    "nodes": [
      {
        "id": "node-hsk3-7-1",
        "unitNumber": 7,
        "title": "Rèn luyện thân thể & Phòng gym",
        "subtitle": "锻炼 · 健身房 · 习惯 · 坚持 · 强壮",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-7-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng thể hình:",
            "matchPairs": [
              {
                "id": "ft-1",
                "left": "锻炼",
                "right": "Rèn luyện thân thể"
              },
              {
                "id": "ft-2",
                "left": "健身房",
                "right": "Phòng tập gym"
              },
              {
                "id": "ft-3",
                "left": "坚持",
                "right": "Kiên trì / Bền bỉ"
              },
              {
                "id": "ft-4",
                "left": "习惯",
                "right": "Thói quen"
              }
            ],
            "explanation": "锻炼 (duànliàn: rèn luyện), 坚持 (jiānchí: kiên trì)."
          },
          {
            "id": "c-3-7-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Kiên trì tập thể dục giúp cơ thể thêm khỏe mạnh.\"",
            "chineseAudioText": "坚持锻炼让身体更加健康。",
            "pinyinAudioText": "Jiānchí duànliàn ràng shēntǐ gèngjiā jiànkāng.",
            "tokens": [
              "坚持锻炼",
              "让身体",
              "更加健康",
              "生病",
              "吃药"
            ],
            "correctTokens": [
              "坚持锻炼",
              "让身体",
              "更加健康"
            ],
            "explanation": "坚持 (jiānchí) + 让...更加 (khiến cho... càng thêm)."
          }
        ]
      },
      {
        "id": "node-hsk3-7-2",
        "unitNumber": 7,
        "title": "Chế độ ăn dinh dưỡng & Uống nước",
        "subtitle": "健康饮食 · 蔬菜水果 · 少油少盐 · 喝水",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-7-2-1",
            "type": "match_pairs",
            "prompt": "Nối thói quen ăn uống khoa học:",
            "matchPairs": [
              {
                "id": "nt-1",
                "left": "蔬菜",
                "right": "Rau xanh"
              },
              {
                "id": "nt-2",
                "left": "少油少盐",
                "right": "Ít dầu ít muối"
              },
              {
                "id": "nt-3",
                "left": "喝温水",
                "right": "Uống nước ấm"
              },
              {
                "id": "nt-4",
                "left": "营养",
                "right": "Dinh dưỡng"
              }
            ],
            "explanation": "营养 (yíngyǎng: dinh dưỡng), 少油少盐 (ăn thanh đạm ít dầu muối)."
          },
          {
            "id": "c-3-7-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Hằng ngày nên ăn nhiều rau quả và uống đủ nước.\"",
            "chineseAudioText": "每天应该多吃蔬菜和多喝水。",
            "pinyinAudioText": "Měitiān yīnggāi duō chī shūcài hé duō hē shuǐ.",
            "tokens": [
              "每天应该",
              "多吃蔬菜",
              "和",
              "多喝水",
              "垃圾"
            ],
            "correctTokens": [
              "每天应该",
              "多吃蔬菜",
              "和",
              "多喝水"
            ],
            "explanation": "多吃 (ăn nhiều) + 多喝水 (uống nhiều nước)."
          },
          {
            "id": "c-3-7-2-3",
            "type": "listen_choose",
            "prompt": "Nghe lời khuyên của chuyên gia dinh dưỡng:",
            "chineseAudioText": "晚上尽量不要吃太油腻的食物。",
            "pinyinAudioText": "Wǎnshang jǐnliàng bú yào chī tài yóunì de shíwù.",
            "options": [
              "Buổi tối cố gắng đừng ăn thực phẩm quá nhiều dầu mỡ.",
              "Buổi tối không được uống nước lọc.",
              "Buổi tối phải chạy bộ 10km.",
              "Nên ăn đồ ngọt trước khi đi ngủ."
            ],
            "correctAnswer": "Buổi tối cố gắng đừng ăn thực phẩm quá nhiều dầu mỡ.",
            "explanation": "尽量 (cố gắng hết sức) + 油腻 (dầu mỡ, ngấy)."
          }
        ]
      },
      {
        "id": "node-hsk3-7-3",
        "unitNumber": 7,
        "title": "Thói quen ngủ nghỉ & Giảm áp lực",
        "subtitle": "早睡早起 · 散步 · 放松 · 精神饱满 · 压力",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-7-3-1",
            "type": "match_pairs",
            "prompt": "Nối thói quen nghỉ ngơi:",
            "matchPairs": [
              {
                "id": "rl-1",
                "left": "早睡早起",
                "right": "Ngủ sớm dậy sớm"
              },
              {
                "id": "rl-2",
                "left": "散步",
                "right": "Đi dạo bộ"
              },
              {
                "id": "rl-3",
                "left": "放松",
                "right": "Thư giãn thả lỏng"
              },
              {
                "id": "rl-4",
                "left": "压力",
                "right": "Áp lực / Stress"
              }
            ],
            "explanation": "早睡早起 (zǎoshuì zǎoqǐ: ngủ sớm dậy sớm), 放松 (fàngsōng: thư giãn)."
          },
          {
            "id": "c-3-7-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Buổi tối đi dạo trong công viên giúp giảm bớt áp lực công việc.\"",
            "chineseAudioText": "晚上在公园散步能减轻工作压力。",
            "pinyinAudioText": "Wǎnshang zài gōngyuán sànbù néng jiǎnqīng gōngzuò yālì.",
            "tokens": [
              "晚上在公园散步",
              "能减轻",
              "工作压力",
              "迟到",
              "生病"
            ],
            "correctTokens": [
              "晚上在公园散步",
              "能减轻",
              "工作压力"
            ],
            "explanation": "减轻压力 (jiǎnqīng yālì: giảm nhẹ áp lực)."
          }
        ]
      },
      {
        "id": "node-hsk3-7-4",
        "unitNumber": 7,
        "title": "Cúp Vinh Quang Thể Lực",
        "subtitle": "Cơ thể dẻo dai, tinh thần sảng khoái tràn đầy sức sống",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-7-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu châm ngôn sức khỏe:",
            "chineseAudioText": "身体是革命的本钱，健康就是最大的财富。",
            "pinyinAudioText": "Shēntǐ shì gémìng de běnqián, jiànkāng jiù shì zuì dà de cáifù.",
            "tokens": [
              "身体是革命的本钱",
              "健康就是",
              "最大的财富",
              "散步",
              "压力"
            ],
            "correctTokens": [
              "身体是革命的本钱",
              "健康就是",
              "最大的财富"
            ],
            "explanation": "Sức khỏe là vốn quý nhất của con người."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk3-8",
    "unitNumber": 8,
    "level": 3,
    "title": "Unit 8: Bảo vệ môi trường & Đời sống xanh (绿色生活与环保)",
    "description": "Phân loại rác thải, tiết kiệm năng lượng điện nước, đi phương tiện công cộng và chung tay xây dựng hành tinh xanh.",
    "themeColor": "#047857",
    "nodes": [
      {
        "id": "node-hsk3-8-1",
        "unitNumber": 8,
        "title": "Phân loại rác & Hạn chế đồ nhựa",
        "subtitle": "环境 · 保护 · 垃圾分类 · 塑料袋 · 责任",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-8-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng bảo vệ môi trường:",
            "matchPairs": [
              {
                "id": "ev-1",
                "left": "环境保护",
                "right": "Bảo vệ môi trường"
              },
              {
                "id": "ev-2",
                "left": "垃圾分类",
                "right": "Phân loại rác thải"
              },
              {
                "id": "ev-3",
                "left": "塑料袋",
                "right": "Túi nilon / Túi nhựa"
              },
              {
                "id": "ev-4",
                "left": "少用",
                "right": "Hạn chế sử dụng"
              }
            ],
            "explanation": "环境保护 (huánjìng bǎohù: bảo vệ môi trường), 垃圾分类 (lājī fēnlèi: phân loại rác)."
          },
          {
            "id": "c-3-8-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Khi đi siêu thị, chúng ta nên hạn chế sử dụng túi nilon.\"",
            "chineseAudioText": "去超市买东西时，我们应该少用塑料袋。",
            "pinyinAudioText": "Qù chāoshì mǎi dōngxi shí, wǒmen yīnggāi shǎo yòng sùliàodài.",
            "tokens": [
              "去超市买东西时",
              "我们应该",
              "少用塑料袋",
              "浪费",
              "乱扔"
            ],
            "correctTokens": [
              "去超市买东西时",
              "我们应该",
              "少用塑料袋"
            ],
            "explanation": "少用塑料袋 (shǎo yòng sùliàodài: ít dùng túi nhựa nilon)."
          },
          {
            "id": "c-3-8-1-3",
            "type": "multiple_choice",
            "prompt": "Hành động nào thể hiện ý thức bảo vệ môi trường?",
            "options": [
              "垃圾分类投放 (Phân loại rác đúng thùng)",
              "随手扔垃圾 (Vứt rác bừa bãi)",
              "一直开着灯 (Để đèn bật liên tục)",
              "每天用十个塑料袋 (Mỗi ngày dùng 10 túi nilon)"
            ],
            "correctAnswer": "垃圾分类投放 (Phân loại rác đúng thùng)",
            "explanation": "垃圾分类投放 là hành động chuẩn mực bảo vệ môi trường."
          }
        ]
      },
      {
        "id": "node-hsk3-8-2",
        "unitNumber": 8,
        "title": "Tiết kiệm tài nguyên điện nước",
        "subtitle": "节约用水 · 关灯 · 步行 · 坐地铁 · 低碳",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-8-2-1",
            "type": "match_pairs",
            "prompt": "Nối hành động sống xanh:",
            "matchPairs": [
              {
                "id": "gr-1",
                "left": "节约用水",
                "right": "Tiết kiệm nước"
              },
              {
                "id": "gr-2",
                "left": "随手关灯",
                "right": "Tắt đèn khi ra khỏi phòng"
              },
              {
                "id": "gr-3",
                "left": "乘公共交通",
                "right": "Đi xe bus/tàu điện công cộng"
              },
              {
                "id": "gr-4",
                "left": "低碳出行",
                "right": "Di chuyển giảm phát thải carbon"
              }
            ],
            "explanation": "随手关灯 (tiện tay tắt đèn), 低碳 (dī tàn: ít phát thải carbon)."
          },
          {
            "id": "c-3-8-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Rời khỏi phòng làm việc hãy nhớ tắt đèn và máy lạnh.\"",
            "chineseAudioText": "离开办公室时请记得关灯和空调。",
            "pinyinAudioText": "Líkāi bàngōngshì shí qǐng jìde guān dēng hé kōngtiáo.",
            "tokens": [
              "离开办公室时",
              "请记得",
              "关灯和空调",
              "浪费",
              "塑料袋"
            ],
            "correctTokens": [
              "离开办公室时",
              "请记得",
              "关灯和空调"
            ],
            "explanation": "关灯和空调 (tắt đèn và điều hòa)."
          },
          {
            "id": "c-3-8-2-3",
            "type": "listen_choose",
            "prompt": "Nghe khẩu hiệu sống xanh:",
            "chineseAudioText": "多骑自行车，绿色低碳健康生活。",
            "pinyinAudioText": "Duō qí zìxíngchē, lǜsè dītàn jiànkāng shēnghuó.",
            "options": [
              "Tích cực đạp xe, sống xanh ít carbon và khỏe mạnh.",
              "Nên mua xe hơi mới.",
              "Không nên ra ngoài khi trời nắng.",
              "Đi taxi là nhanh nhất."
            ],
            "correctAnswer": "Tích cực đạp xe, sống xanh ít carbon và khỏe mạnh.",
            "explanation": "骑自行车 (đạp xe đạp) + 绿色低碳 (sống xanh ít carbon)."
          }
        ]
      },
      {
        "id": "node-hsk3-8-3",
        "unitNumber": 8,
        "title": "Yêu quý động vật & Trồng cây xanh",
        "subtitle": "动物保护 · 种树 · 大自然 · 责任 · 美好",
        "type": "lesson",
        "xpReward": 25,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-8-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng thiên nhiên:",
            "matchPairs": [
              {
                "id": "ntr-1",
                "left": "保护动物",
                "right": "Bảo vệ động vật"
              },
              {
                "id": "ntr-2",
                "left": "种树",
                "right": "Trồng cây xanh"
              },
              {
                "id": "ntr-3",
                "left": "大自然",
                "right": "Thiên nhiên tươi đẹp"
              },
              {
                "id": "ntr-4",
                "left": "共同家园",
                "right": "Mái nhà chung của muôn loài"
              }
            ],
            "explanation": "种树 (zhòngshù: trồng cây), 共同家园 (mái nhà chung)."
          },
          {
            "id": "c-3-8-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Trái Đất là mái nhà chung của tất cả chúng ta.\"",
            "chineseAudioText": "地球是我们所有人共同的家园。",
            "pinyinAudioText": "Dìqiú shì wǒmen suǒyǒu rén gòngtóng de jiāyuán.",
            "tokens": [
              "地球是我们",
              "所有人",
              "共同的家园",
              "垃圾",
              "塑料袋"
            ],
            "correctTokens": [
              "地球是我们",
              "所有人",
              "共同的家园"
            ],
            "explanation": "共同的家园 (gòngtóng de jiāyuán: mái nhà chung)."
          }
        ]
      },
      {
        "id": "node-hsk3-8-4",
        "unitNumber": 8,
        "title": "Đại Cúp Vinh Quang HSK 3 Toàn Diện",
        "subtitle": "Tốt nghiệp toàn bộ Lộ Trình HSK 3 Trung Cấp",
        "type": "trophy",
        "xpReward": 60,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-3-8-4-1",
            "type": "word_bank",
            "prompt": "Ghép lời tuyên ngôn tốt nghiệp HSK 3:",
            "chineseAudioText": "保护地球环境，从身边的小事做起！",
            "pinyinAudioText": "Bǎohù dìqiú huánjìng, cóng shēnbiān de xiǎoshì zuò qǐ!",
            "tokens": [
              "保护地球环境",
              "从身边的",
              "小事做起",
              "面试",
              "请客"
            ],
            "correctTokens": [
              "保护地球环境",
              "从身边的",
              "小事做起"
            ],
            "explanation": "从身边的小事做起 (bắt đầu từ những việc nhỏ quanh mình)."
          }
        ]
      }
    ]
  }
];
