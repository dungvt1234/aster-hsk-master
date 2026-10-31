import type { RoadmapUnit } from '../types';

export const HSK2_ROADMAP_UNITS: RoadmapUnit[] = [
  {
    "id": "unit-hsk2-1",
    "unitNumber": 1,
    "level": 2,
    "title": "Unit 1: Mua sắm & Đời sống hàng ngày (购物与生活)",
    "description": "Mua sắm tại trung tâm thương mại, hỏi kích cỡ màu sắc quần áo và so sánh giá cả bằng câu chữ 比.",
    "themeColor": "#0ea5e9",
    "nodes": [
      {
        "id": "node-hsk2-1-1",
        "unitNumber": 1,
        "title": "Mua sắm & Trả giá",
        "subtitle": "买 · 贵 · 便宜 · 试一下",
        "type": "lesson",
        "xpReward": 20,
        "status": "active",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-1-1-1",
            "type": "match_pairs",
            "prompt": "Nối các từ vựng mua sắm cơ bản:",
            "matchPairs": [
              {
                "id": "p2-1",
                "left": "便宜",
                "right": "Rẻ"
              },
              {
                "id": "p2-2",
                "left": "贵",
                "right": "Đắt"
              },
              {
                "id": "p2-3",
                "left": "买",
                "right": "Mua"
              },
              {
                "id": "p2-4",
                "left": "卖",
                "right": "Bán"
              }
            ],
            "explanation": "便宜 (piányi: rẻ), 贵 (guì: đắt), 买 (mǎi: mua), 卖 (mài: bán)."
          },
          {
            "id": "c-2-1-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chiếc áo này có đắt không?\"",
            "chineseAudioText": "这件衣服贵不贵？",
            "pinyinAudioText": "Zhè jiàn yīfu guì bu guì?",
            "tokens": [
              "这件衣服",
              "贵不贵",
              "便宜",
              "买"
            ],
            "correctTokens": [
              "这件衣服",
              "贵不贵"
            ],
            "explanation": "Cấu trúc nghi vấn chính phản: Tính từ + 不 + Tính từ (贵不贵)."
          },
          {
            "id": "c-2-1-1-3",
            "type": "listen_choose",
            "prompt": "Nghe phát âm và chọn nghĩa đúng:",
            "chineseAudioText": "我可以试一下吗？",
            "pinyinAudioText": "Wǒ kěyǐ shì yíxià ma?",
            "options": [
              "Tôi có thể thử một chút không?",
              "Cái này bao nhiêu tiền?",
              "Có màu đen không?",
              "Tôi muốn mua chiếc này."
            ],
            "correctAnswer": "Tôi có thể thử một chút không?",
            "explanation": "试一下 (shì yíxià) là thử một chút / mặc thử."
          }
        ]
      },
      {
        "id": "node-hsk2-1-2",
        "unitNumber": 1,
        "title": "Màu sắc & Kích cỡ",
        "subtitle": "红 · 白 · 黑 · 大小 · 合适",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-1-2-1",
            "type": "match_pairs",
            "prompt": "Nối màu sắc và kích cỡ:",
            "matchPairs": [
              {
                "id": "col-1",
                "left": "红色",
                "right": "Màu đỏ"
              },
              {
                "id": "col-2",
                "left": "白色",
                "right": "Màu trắng"
              },
              {
                "id": "col-3",
                "left": "黑色",
                "right": "Màu đen"
              },
              {
                "id": "col-4",
                "left": "合适",
                "right": "Vừa vặn / Thích hợp"
              }
            ],
            "explanation": "Màu sắc cơ bản HSK 2: 红色, 白色, 黑色."
          },
          {
            "id": "c-2-1-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Kích cỡ chiếc này rất vừa vặn.\"",
            "chineseAudioText": "这件大小非常合适。",
            "pinyinAudioText": "Zhè jiàn dàxiǎo fēicháng héshì.",
            "tokens": [
              "这件",
              "大小",
              "非常合适",
              "红色",
              "太贵"
            ],
            "correctTokens": [
              "这件",
              "大小",
              "非常合适"
            ],
            "explanation": "大小 (dàxiǎo: kích cỡ) + 合适 (héshì: vừa vặn)."
          }
        ]
      },
      {
        "id": "node-hsk2-1-3",
        "unitNumber": 1,
        "title": "So sánh cơ bản 比 (Tỉ)",
        "subtitle": "A 比 B + Tính từ",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-1-3-1",
            "type": "word_bank",
            "prompt": "Ghép câu so sánh hơn: \"Chiếc áo màu trắng rẻ hơn chiếc áo màu đen.\"",
            "chineseAudioText": "白色的比黑色的便宜。",
            "pinyinAudioText": "Báisè de bǐ hēisè de piányi.",
            "tokens": [
              "白色的",
              "比",
              "黑色的",
              "便宜",
              "贵"
            ],
            "correctTokens": [
              "白色的",
              "比",
              "黑色的",
              "便宜"
            ],
            "explanation": "Cấu trúc câu chữ 比: A + 比 + B + Tính từ."
          },
          {
            "id": "c-2-1-3-2",
            "type": "multiple_choice",
            "prompt": "Câu nào sau đây đúng ngữ pháp so sánh 比?",
            "options": [
              "苹果比西瓜便宜。",
              "苹果比西瓜很便宜。",
              "苹果便宜比西瓜。",
              "比苹果西瓜便宜。"
            ],
            "correctAnswer": "苹果比西瓜便宜。",
            "explanation": "Trong câu chữ 比 tuyệt đối KHÔNG dùng các phó từ chỉ mức độ như 很, 非常, 十分 trước tính từ."
          }
        ]
      },
      {
        "id": "node-hsk2-1-4",
        "unitNumber": 1,
        "title": "Cúp Vinh Quang Mua Sắm HSK 2",
        "subtitle": "Hoàn thành Unit 1 HSK 2",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-1-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu tổng kết: \"Chiếc áo này vừa đẹp lại vừa rẻ.\"",
            "chineseAudioText": "这件衣服又漂亮又便宜。",
            "pinyinAudioText": "Zhè jiàn yīfu yòu piàoliang yòu piányi.",
            "tokens": [
              "这件衣服",
              "又漂亮",
              "又便宜",
              "比",
              "试一下"
            ],
            "correctTokens": [
              "这件衣服",
              "又漂亮",
              "又便宜"
            ],
            "explanation": "Cấu trúc tương quan 又... 又... (vừa... lại vừa...)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-2",
    "unitNumber": 2,
    "level": 2,
    "title": "Unit 2: Hỏi đường & Phương tiện giao thông (问路与交通)",
    "description": "Hỏi đường đi các địa điểm, phương tiện công cộng (xe buýt, tàu điện ngầm) và chỉ dẫn rẽ trái, rẽ phải.",
    "themeColor": "#10b981",
    "nodes": [
      {
        "id": "node-hsk2-2-1",
        "unitNumber": 2,
        "title": "Phương tiện công cộng",
        "subtitle": "出租车 · 地铁 · 公共汽车 · 坐",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-2-1-1",
            "type": "match_pairs",
            "prompt": "Nối tên các phương tiện giao thông:",
            "matchPairs": [
              {
                "id": "v-1",
                "left": "出租车",
                "right": "Xe taxi"
              },
              {
                "id": "v-2",
                "left": "公共汽车",
                "right": "Xe buýt công cộng"
              },
              {
                "id": "v-3",
                "left": "地铁",
                "right": "Tàu điện ngầm"
              },
              {
                "id": "v-4",
                "left": "坐",
                "right": "Ngồi / Đi (xe)"
              }
            ],
            "explanation": "出租车 (chūzūchē: taxi), 公共汽车 (gōnggòng qìchē: xe buýt), 地铁 (dìtiě: tàu điện ngầm)."
          },
          {
            "id": "c-2-2-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chúng ta đi tàu điện ngầm đi nhé.\"",
            "chineseAudioText": "我们坐地铁去吧。",
            "pinyinAudioText": "Wǒmen zuò dìtiě qù ba.",
            "tokens": [
              "我们",
              "坐地铁",
              "去吧",
              "出租车",
              "路"
            ],
            "correctTokens": [
              "我们",
              "坐地铁",
              "去吧"
            ],
            "explanation": "Động từ 坐 + Phương tiện + 去: 坐地铁去 (đi bằng tàu điện ngầm)."
          }
        ]
      },
      {
        "id": "node-hsk2-2-2",
        "unitNumber": 2,
        "title": "Chỉ dẫn hướng đi",
        "subtitle": "往左拐 · 往右 · 往前走 · 怎么走",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-2-2-1",
            "type": "match_pairs",
            "prompt": "Nối các hướng chỉ đường:",
            "matchPairs": [
              {
                "id": "d-1",
                "left": "往左拐",
                "right": "Rẽ trái"
              },
              {
                "id": "d-2",
                "left": "往右拐",
                "right": "Rẽ phải"
              },
              {
                "id": "d-3",
                "left": "往前走",
                "right": "Đi thẳng về phía trước"
              },
              {
                "id": "d-4",
                "left": "路口",
                "right": "Ngã tư / Ngã ba đường"
              }
            ],
            "explanation": "往 + Phương hướng + 走/拐: 往前走 (đi thẳng), 往左拐 (rẽ trái)."
          },
          {
            "id": "c-2-2-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Xin hỏi đi đến bệnh viện như thế nào?\"",
            "chineseAudioText": "请问去医院怎么走？",
            "pinyinAudioText": "Qǐngwèn qù yīyuàn zěnme zǒu?",
            "tokens": [
              "请问",
              "去医院",
              "怎么走",
              "离这里",
              "远"
            ],
            "correctTokens": [
              "请问",
              "去医院",
              "怎么走"
            ],
            "explanation": "Mẫu câu hỏi đường kinh điển: Đi đâu + 怎么走？"
          }
        ]
      },
      {
        "id": "node-hsk2-2-3",
        "unitNumber": 2,
        "title": "Khoảng cách & Thời gian",
        "subtitle": "离这里很远 · 近 · 分钟",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-2-3-1",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Trường học cách đây không xa.\"",
            "chineseAudioText": "学校离这里不太远。",
            "pinyinAudioText": "Xuéxiào lí zhèlǐ bú tài yuǎn.",
            "tokens": [
              "学校",
              "离这里",
              "不太远",
              "近",
              "分钟"
            ],
            "correctTokens": [
              "学校",
              "离这里",
              "不太远"
            ],
            "explanation": "Cấu trúc chỉ cự ly: A + 离 + B + 近/远."
          }
        ]
      },
      {
        "id": "node-hsk2-2-4",
        "unitNumber": 2,
        "title": "Cúp Vinh Quang Giao Thông",
        "subtitle": "Thông thạo bản đồ thành phố",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-2-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu hoàn chỉnh:",
            "chineseAudioText": "从这里往前走五分钟就到了。",
            "pinyinAudioText": "Cóng zhèlǐ wǎng qián zǒu wǔ fēnzhōng jiù dào le.",
            "tokens": [
              "从这里",
              "往前走",
              "五分钟",
              "就到了",
              "离"
            ],
            "correctTokens": [
              "从这里",
              "往前走",
              "五分钟",
              "就到了"
            ],
            "explanation": "Chỉ đường hoàn chỉnh kết hợp thời lượng."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-3",
    "unitNumber": 3,
    "level": 2,
    "title": "Unit 3: Khí hậu 4 mùa & Sức khỏe (天气与健康)",
    "description": "Bốn mùa Xuân - Hạ - Thu - Đông, triệu chứng cảm sốt, dặn dò uống thuốc của bác sĩ và chăm sóc sức khỏe.",
    "themeColor": "#f59e0b",
    "nodes": [
      {
        "id": "node-hsk2-3-1",
        "unitNumber": 3,
        "title": "Bốn mùa & Khí hậu",
        "subtitle": "春天 · 夏天 · 秋天 · 冬天 · 刮风",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-3-1-1",
            "type": "match_pairs",
            "prompt": "Nối 4 mùa trong năm:",
            "matchPairs": [
              {
                "id": "s-1",
                "left": "春天",
                "right": "Mùa xuân"
              },
              {
                "id": "s-2",
                "left": "夏天",
                "right": "Mùa hè"
              },
              {
                "id": "s-3",
                "left": "秋天",
                "right": "Mùa thu"
              },
              {
                "id": "s-4",
                "left": "冬天",
                "right": "Mùa đông"
              }
            ],
            "explanation": "Bốn mùa trong tiếng Trung: 春, 夏, 秋, 冬."
          },
          {
            "id": "c-2-3-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Mùa thu ở Bắc Kinh là mùa đẹp nhất.\"",
            "chineseAudioText": "北京的秋天是最美丽的季节。",
            "pinyinAudioText": "Běijīng de qiūtiān shì zuì měilì de jìjié.",
            "tokens": [
              "北京的秋天",
              "是最美丽的",
              "季节",
              "春天",
              "刮风"
            ],
            "correctTokens": [
              "北京的秋天",
              "是最美丽的",
              "季节"
            ],
            "explanation": "季节 (jìjié: mùa) + 最美丽 (đẹp nhất)."
          }
        ]
      },
      {
        "id": "node-hsk2-3-2",
        "unitNumber": 3,
        "title": "Triệu chứng ốm & Đi khám",
        "subtitle": "生病 · 感冒 · 发烧 · 吃药 · 休息",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-3-2-1",
            "type": "match_pairs",
            "prompt": "Nối triệu chứng bệnh thông thường:",
            "matchPairs": [
              {
                "id": "ill-1",
                "left": "感冒",
                "right": "Cảm cúm"
              },
              {
                "id": "ill-2",
                "left": "发烧",
                "right": "Phát sốt"
              },
              {
                "id": "ill-3",
                "left": "吃药",
                "right": "Uống thuốc"
              },
              {
                "id": "ill-4",
                "left": "生病",
                "right": "Bị ốm"
              }
            ],
            "explanation": "生病 (shēngbìng: ốm), 发烧 (fāshāo: sốt), 吃药 (chīyào: uống thuốc)."
          },
          {
            "id": "c-2-3-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Anh ấy bị sốt rồi, cần phải nghỉ ngơi thật tốt.\"",
            "chineseAudioText": "他发烧了，需要好好休息。",
            "pinyinAudioText": "Tā fāshāo le, xūyào hǎohāo xiūxi.",
            "tokens": [
              "他发烧了",
              "需要",
              "好好休息",
              "生病",
              "秋天"
            ],
            "correctTokens": [
              "他发烧了",
              "需要",
              "好好休息"
            ],
            "explanation": "好好休息 (hǎohāo xiūxi: nghỉ ngơi cho khỏe)."
          }
        ]
      },
      {
        "id": "node-hsk2-3-3",
        "unitNumber": 3,
        "title": "Lời dặn bác sĩ & Uống thuốc",
        "subtitle": "按时吃药 · 休息两天 · 多喝温水 · 医生说",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-3-3-1",
            "type": "match_pairs",
            "prompt": "Nối lời dặn dò của bác sĩ:",
            "matchPairs": [
              {
                "id": "dc-1",
                "left": "按时吃药",
                "right": "Uống thuốc đúng giờ"
              },
              {
                "id": "dc-2",
                "left": "多喝温水",
                "right": "Uống nhiều nước ấm"
              },
              {
                "id": "dc-3",
                "left": "量体温",
                "right": "Đo nhiệt độ cơ thể"
              },
              {
                "id": "dc-4",
                "left": "检查",
                "right": "Kiểm tra sức khỏe"
              }
            ],
            "explanation": "按时 (đúng giờ) + 吃药 (uống thuốc)."
          },
          {
            "id": "c-2-3-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Bác sĩ bảo tôi mỗi ngày uống thuốc ba lần.\"",
            "chineseAudioText": "医生让我每天吃三次药。",
            "pinyinAudioText": "Yīshēng ràng wǒ měitiān chī sān cì yào.",
            "tokens": [
              "医生让我",
              "每天",
              "吃三次药",
              "发烧",
              "感冒"
            ],
            "correctTokens": [
              "医生让我",
              "每天",
              "吃三次药"
            ],
            "explanation": "吃三次药 (uống thuốc 3 lần)."
          }
        ]
      },
      {
        "id": "node-hsk2-3-4",
        "unitNumber": 3,
        "title": "Chăm sóc cơ thể & Bảo vệ mắt",
        "subtitle": "身体 · 眼睛 · 累 · 别看手机 · 早点睡觉",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-3-4-1",
            "type": "match_pairs",
            "prompt": "Nối bộ phận và thói quen giữ gìn:",
            "matchPairs": [
              {
                "id": "bd-1",
                "left": "眼睛",
                "right": "Đôi mắt"
              },
              {
                "id": "bd-2",
                "left": "身体",
                "right": "Cơ thể / Sức khỏe"
              },
              {
                "id": "bd-3",
                "left": "累",
                "right": "Mệt mỏi"
              },
              {
                "id": "bd-4",
                "left": "早点睡觉",
                "right": "Đi ngủ sớm"
              }
            ],
            "explanation": "眼睛 (yǎnjing: mắt), 身体 (shēntǐ: thân thể)."
          },
          {
            "id": "c-2-3-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Mắt mệt rồi, đừng nhìn điện thoại nữa nhé.\"",
            "chineseAudioText": "眼睛累了，别看手机了。",
            "pinyinAudioText": "Yǎnjing lèi le, bié kàn shǒujī le.",
            "tokens": [
              "眼睛累了",
              "别看手机了",
              "身体",
              "吃药"
            ],
            "correctTokens": [
              "眼睛累了",
              "别看手机了"
            ],
            "explanation": "别...了 (đừng... nữa)."
          }
        ]
      },
      {
        "id": "node-hsk2-3-5",
        "unitNumber": 3,
        "title": "Cúp Vinh Quang Sức Khỏe",
        "subtitle": "Bảo vệ cơ thể khỏe mạnh & Tươi trẻ mỗi ngày",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-3-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu chúc sức khỏe:",
            "chineseAudioText": "祝你身体健康，快点好起来！",
            "pinyinAudioText": "Zhù nǐ shēntǐ jiànkāng, kuài diǎn hǎo qǐlái!",
            "tokens": [
              "祝你身体健康",
              "快点",
              "好起来",
              "发烧",
              "感冒"
            ],
            "correctTokens": [
              "祝你身体健康",
              "快点",
              "好起来"
            ],
            "explanation": "快点好起来 (mau chóng bình phục khỏe lại nhé)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-4",
    "unitNumber": 4,
    "level": 2,
    "title": "Unit 4: Thể thao & Giải trí (运动与爱好)",
    "description": "Các môn thể thao vận động (bóng đá, bơi lội), âm nhạc nghệ thuật và hoạt động thư giãn cuối tuần.",
    "themeColor": "#84cc16",
    "nodes": [
      {
        "id": "node-hsk2-4-1",
        "unitNumber": 4,
        "title": "Môn thể thao sôi động",
        "subtitle": "踢足球 · 游泳 · 跑步 · 篮球",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-4-1-1",
            "type": "match_pairs",
            "prompt": "Nối các môn thể thao:",
            "matchPairs": [
              {
                "id": "sp-1",
                "left": "踢足球",
                "right": "Đá bóng"
              },
              {
                "id": "sp-2",
                "left": "游泳",
                "right": "Bơi lội"
              },
              {
                "id": "sp-3",
                "left": "跑步",
                "right": "Chạy bộ"
              },
              {
                "id": "sp-4",
                "left": "打篮球",
                "right": "Chơi bóng rổ"
              }
            ],
            "explanation": "踢 (đá bằng chân: 踢足球), 打 (chơi bằng tay: 打篮球)."
          },
          {
            "id": "c-2-4-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Anh ấy thích chạy bộ vào mỗi buổi sáng.\"",
            "chineseAudioText": "他喜欢每天早上跑步。",
            "pinyinAudioText": "Tā xǐhuan měitiān zǎoshang pǎobù.",
            "tokens": [
              "他喜欢",
              "每天早上",
              "跑步",
              "踢足球",
              "唱歌"
            ],
            "correctTokens": [
              "他喜欢",
              "每天早上",
              "跑步"
            ],
            "explanation": "跑步 (pǎobù: chạy bộ rèn sức khỏe)."
          }
        ]
      },
      {
        "id": "node-hsk2-4-2",
        "unitNumber": 4,
        "title": "Năng khiếu & Văn nghệ",
        "subtitle": "唱歌 · 跳舞 · 听音乐 · 很好听",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-4-2-1",
            "type": "match_pairs",
            "prompt": "Nối các hoạt động văn nghệ:",
            "matchPairs": [
              {
                "id": "art-1",
                "left": "唱歌",
                "right": "Ca hát"
              },
              {
                "id": "art-2",
                "left": "跳舞",
                "right": "Khiêu vũ / Múa"
              },
              {
                "id": "art-3",
                "left": "听音乐",
                "right": "Nghe nhạc"
              },
              {
                "id": "art-4",
                "left": "弹吉他",
                "right": "Đánh đàn guitar"
              }
            ],
            "explanation": "唱歌 (hát), 跳舞 (nhảy múa), 听音乐 (nghe nhạc)."
          },
          {
            "id": "c-2-4-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Bài hát này nghe rất hay.\"",
            "chineseAudioText": "这首歌非常好听。",
            "pinyinAudioText": "Zhè shǒu gē fēicháng hǎotīng.",
            "tokens": [
              "这首歌",
              "非常",
              "好听",
              "跳舞",
              "打篮球"
            ],
            "correctTokens": [
              "这首歌",
              "非常",
              "好听"
            ],
            "explanation": "好听 (hǎotīng: nghe hay). Lượng từ của bài hát là 首 (shǒu)."
          }
        ]
      },
      {
        "id": "node-hsk2-4-3",
        "unitNumber": 4,
        "title": "Trận đấu kịch tính & Cổ vũ",
        "subtitle": "比赛 · 赢 · 输 · 加油 · 第一名",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-4-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng thi đấu:",
            "matchPairs": [
              {
                "id": "mt-1",
                "left": "比赛",
                "right": "Trận thi đấu"
              },
              {
                "id": "mt-2",
                "left": "赢",
                "right": "Thắng"
              },
              {
                "id": "mt-3",
                "left": "输",
                "right": "Thua"
              },
              {
                "id": "mt-4",
                "left": "加油",
                "right": "Cố lên! / Cổ vũ"
              }
            ],
            "explanation": "赢 (yíng: thắng), 输 (shū: thua), 加油 (jiāyóu: cố lên)."
          },
          {
            "id": "c-2-4-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu cổ vũ: \"Đội chúng tôi đã giành chiến thắng trận đấu hôm nay!\"",
            "chineseAudioText": "我们队赢了今天的比赛！",
            "pinyinAudioText": "Wǒmen duì yíng le jīntiān de bǐsài!",
            "tokens": [
              "我们队",
              "赢了",
              "今天的比赛",
              "输",
              "唱歌"
            ],
            "correctTokens": [
              "我们队",
              "赢了",
              "今天的比赛"
            ],
            "explanation": "赢了比赛 (thắng trận đấu)."
          }
        ]
      },
      {
        "id": "node-hsk2-4-4",
        "unitNumber": 4,
        "title": "Sở thích cuối tuần & Giải trí",
        "subtitle": "看电影 · 玩游戏 · 弹吉他 · 很有意思",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-4-4-1",
            "type": "match_pairs",
            "prompt": "Nối thú tiêu khiển:",
            "matchPairs": [
              {
                "id": "hb-1",
                "left": "看电影",
                "right": "Xem phim rạp"
              },
              {
                "id": "hb-2",
                "left": "玩游戏",
                "right": "Chơi game"
              },
              {
                "id": "hb-3",
                "left": "有意思",
                "right": "Thú vị / Hay ho"
              },
              {
                "id": "hb-4",
                "left": "周末",
                "right": "Cuối tuần"
              }
            ],
            "explanation": "有意思 (yǒu yìsi: thú vị)."
          },
          {
            "id": "c-2-4-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Bộ phim này rất thú vị, bạn nên đi xem.\"",
            "chineseAudioText": "这部电影很有意思，你应该去看看。",
            "pinyinAudioText": "Zhè bù diànyǐng hěn yǒu yìsi, nǐ yīnggāi qù kànkan.",
            "tokens": [
              "这部电影",
              "很有意思",
              "你应该去看看",
              "打篮球",
              "输"
            ],
            "correctTokens": [
              "这部电影",
              "很有意思",
              "你应该去看看"
            ],
            "explanation": "去看看 (đi xem thử một chút)."
          }
        ]
      },
      {
        "id": "node-hsk2-4-5",
        "unitNumber": 4,
        "title": "Cúp Vinh Quang Thể Thao",
        "subtitle": "Nhà vô địch năng động & Yêu đời",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-4-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu châm ngôn năng động:",
            "chineseAudioText": "运动让人充满活力，天天都有好心情。",
            "pinyinAudioText": "Yùndòng ràng rén chōngmǎn huólì, tiāntiān dōu yǒu hǎo xīnqíng.",
            "tokens": [
              "运动让人",
              "充满活力",
              "天天都有好心情",
              "输",
              "生病"
            ],
            "correctTokens": [
              "运动让人",
              "充满活力",
              "天天都有好心情"
            ],
            "explanation": "充满活力 (tràn đầy sức sống) + 好心情 (tâm trạng vui vẻ)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-5",
    "unitNumber": 5,
    "level": 2,
    "title": "Unit 5: Thuê nhà & Không gian sống (租房与居住)",
    "description": "Tìm phòng trọ, xem nội thất tiện nghi, ký hợp đồng thuê nhà và làm quen với hàng xóm thân thiện.",
    "themeColor": "#14b8a6",
    "nodes": [
      {
        "id": "node-hsk2-5-1",
        "unitNumber": 5,
        "title": "Các phòng trong nhà",
        "subtitle": "房间 · 厨房 · 洗手间 · 搬家",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-5-1-1",
            "type": "match_pairs",
            "prompt": "Nối các khu vực trong căn nhà:",
            "matchPairs": [
              {
                "id": "rm-1",
                "left": "房间",
                "right": "Căn phòng"
              },
              {
                "id": "rm-2",
                "left": "厨房",
                "right": "Nhà bếp"
              },
              {
                "id": "rm-3",
                "left": "洗手间",
                "right": "Nhà vệ sinh"
              },
              {
                "id": "rm-4",
                "left": "搬家",
                "right": "Chuyển nhà"
              }
            ],
            "explanation": "房间 (phòng), 厨房 (bếp), 洗手间 (nhà vệ sinh), 搬家 (chuyển nhà)."
          },
          {
            "id": "c-2-5-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Căn phòng này rất sạch sẽ và sáng sủa.\"",
            "chineseAudioText": "这个房间非常干净明亮。",
            "pinyinAudioText": "Zhège fángjiān fēicháng gānjìng míngliàng.",
            "tokens": [
              "这个房间",
              "非常干净",
              "明亮",
              "搬家",
              "厨房"
            ],
            "correctTokens": [
              "这个房间",
              "非常干净",
              "明亮"
            ],
            "explanation": "干净 (gānjìng: sạch sẽ) + 明亮 (míngliàng: sáng sủa)."
          }
        ]
      },
      {
        "id": "node-hsk2-5-2",
        "unitNumber": 5,
        "title": "Tiện nghi nội thất",
        "subtitle": "床 · 门 · 灯 · 电视 · 桌椅 · 干净",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-5-2-1",
            "type": "match_pairs",
            "prompt": "Nối đồ dùng gia đình:",
            "matchPairs": [
              {
                "id": "frn-1",
                "left": "床",
                "right": "Giường ngủ"
              },
              {
                "id": "frn-2",
                "left": "灯",
                "right": "Đèn chiếu sáng"
              },
              {
                "id": "frn-3",
                "left": "电视",
                "right": "Ti vi"
              },
              {
                "id": "frn-4",
                "left": "空调",
                "right": "Máy điều hòa"
              }
            ],
            "explanation": "床 (chuáng: giường), 空调 (kōngtiáo: điều hòa)."
          },
          {
            "id": "c-2-5-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Trong phòng có sẵn giường lớn và máy điều hòa.\"",
            "chineseAudioText": "房间里有一张大床和空调。",
            "pinyinAudioText": "Fángjiān lǐ yǒu yì zhāng dà chuáng hé kōngtiáo.",
            "tokens": [
              "房间里有",
              "一张大床",
              "和空调",
              "搬家",
              "洗手间"
            ],
            "correctTokens": [
              "房间里有",
              "一张大床",
              "和空调"
            ],
            "explanation": "一张大床 (yì zhāng dà chuáng: một chiếc giường lớn)."
          }
        ]
      },
      {
        "id": "node-hsk2-5-3",
        "unitNumber": 5,
        "title": "Hợp đồng & Tiền thuê nhà",
        "subtitle": "房租 · 多少钱一个月 · 押金 · 房东",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-5-3-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ thuê trọ:",
            "matchPairs": [
              {
                "id": "rn-1",
                "left": "房租",
                "right": "Tiền thuê nhà"
              },
              {
                "id": "rn-2",
                "left": "房东",
                "right": "Chủ nhà trọ"
              },
              {
                "id": "rn-3",
                "left": "押金",
                "right": "Tiền đặt cọc"
              },
              {
                "id": "rn-4",
                "left": "水电费",
                "right": "Tiền điện nước"
              }
            ],
            "explanation": "房东 (chủ nhà), 房租 (tiền thuê), 押金 (tiền cọc)."
          },
          {
            "id": "c-2-5-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Xin hỏi tiền thuê phòng này một tháng là bao nhiêu?\"",
            "chineseAudioText": "请问这个房间一个月房租是多少？",
            "pinyinAudioText": "Qǐngwèn zhège fángjiān yí gè yuè fángzū shì duōshao?",
            "tokens": [
              "请问这个房间",
              "一个月房租",
              "是多少",
              "押金",
              "电视"
            ],
            "correctTokens": [
              "请问这个房间",
              "一个月房租",
              "是多少"
            ],
            "explanation": "一个月房租是多少 (tiền thuê một tháng là bao nhiêu)."
          }
        ]
      },
      {
        "id": "node-hsk2-5-4",
        "unitNumber": 5,
        "title": "Khu dân cư & Hàng xóm",
        "subtitle": "邻居 · 安静 · 交通方便 · 超市很近",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-5-4-1",
            "type": "match_pairs",
            "prompt": "Nối môi trường khu dân cư:",
            "matchPairs": [
              {
                "id": "nb-1",
                "left": "邻居",
                "right": "Hàng xóm láng giềng"
              },
              {
                "id": "nb-2",
                "left": "安静",
                "right": "Yên tĩnh"
              },
              {
                "id": "nb-3",
                "left": "方便",
                "right": "Tiện lợi"
              },
              {
                "id": "nb-4",
                "left": "安全",
                "right": "An toàn an ninh"
              }
            ],
            "explanation": "邻居 (línjū: hàng xóm), 安静 (ānjìng: yên tĩnh)."
          },
          {
            "id": "c-2-5-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Ở đây giao thông vô cùng thuận tiện.\"",
            "chineseAudioText": "这里的交通非常方便。",
            "pinyinAudioText": "Zhèlǐ de jiāotōng fēicháng fāngbiàn.",
            "tokens": [
              "这里的交通",
              "非常方便",
              "安静",
              "邻居"
            ],
            "correctTokens": [
              "这里的交通",
              "非常方便"
            ],
            "explanation": "交通非常方便 (giao thông rất thuận tiện)."
          }
        ]
      },
      {
        "id": "node-hsk2-5-5",
        "unitNumber": 5,
        "title": "Cúp Vinh Quang Nhà Ở",
        "subtitle": "Không gian sống ấm cúng & An cư lạc nghiệp",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-5-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chúc mừng bạn đã tìm được căn phòng ưng ý!\"",
            "chineseAudioText": "祝贺你找到了满意的房子！",
            "pinyinAudioText": "Zhùhè nǐ zhǎodào le mǎnyì de fángzi!",
            "tokens": [
              "祝贺你",
              "找到了",
              "满意的房子",
              "搬家",
              "邻居"
            ],
            "correctTokens": [
              "祝贺你",
              "找到了",
              "满意的房子"
            ],
            "explanation": "满意的房子 (ngôi nhà ưng ý, hài lòng)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-6",
    "unitNumber": 6,
    "level": 2,
    "title": "Unit 6: Sinh nhật & Chúc mừng (生日与祝贺)",
    "description": "Tổ chức sinh nhật, tặng quà và chúc tụng nhau trong các dịp lễ tết đặc biệt trong năm.",
    "themeColor": "#f43f5e",
    "nodes": [
      {
        "id": "node-hsk2-6-1",
        "unitNumber": 6,
        "title": "Tiệc sinh nhật & Quà tặng",
        "subtitle": "生日快乐 · 礼物 · 送 · 快乐",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-6-1-1",
            "type": "match_pairs",
            "prompt": "Nối các từ vựng chúc mừng sinh nhật:",
            "matchPairs": [
              {
                "id": "b-1",
                "left": "生日快乐",
                "right": "Chúc mừng sinh nhật"
              },
              {
                "id": "b-2",
                "left": "礼物",
                "right": "Món quà"
              },
              {
                "id": "b-3",
                "left": "送",
                "right": "Tặng"
              },
              {
                "id": "b-4",
                "left": "高兴",
                "right": "Vui vẻ / Phấn khởi"
              }
            ],
            "explanation": "生日快乐 (sinh nhật vui vẻ), 礼物 (món quà), 送 (tặng)."
          },
          {
            "id": "c-2-6-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Đây là món quà sinh nhật tôi tặng bạn.\"",
            "chineseAudioText": "这是我送给你的生日礼物。",
            "pinyinAudioText": "Zhè shì wǒ sòng gěi nǐ de shēngrì lǐwù.",
            "tokens": [
              "这是",
              "我送给你的",
              "生日礼物",
              "蛋糕",
              "快乐"
            ],
            "correctTokens": [
              "这是",
              "我送给你的",
              "生日礼物"
            ],
            "explanation": "送给 (sòng gěi: tặng cho ai)."
          }
        ]
      },
      {
        "id": "node-hsk2-6-2",
        "unitNumber": 6,
        "title": "Bánh kem & Thắp nến",
        "subtitle": "蛋糕 · 点蜡烛 · 聚会 · 邀请朋友",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-6-2-1",
            "type": "match_pairs",
            "prompt": "Nối hoạt động tiệc sinh nhật:",
            "matchPairs": [
              {
                "id": "ck-1",
                "left": "蛋糕",
                "right": "Bánh kem gato"
              },
              {
                "id": "ck-2",
                "left": "点蜡烛",
                "right": "Thắp nến sinh nhật"
              },
              {
                "id": "ck-3",
                "left": "许愿",
                "right": "Ước nguyện điều ước"
              },
              {
                "id": "ck-4",
                "left": "聚会",
                "right": "Bữa tiệc liên hoan"
              }
            ],
            "explanation": "蛋糕 (dàngāo: bánh kem), 许愿 (xǔyuàn: ước nguyện)."
          },
          {
            "id": "c-2-6-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chúng ta cùng nhau thổi nến và cắt bánh kem nào.\"",
            "chineseAudioText": "我们一起吹蜡烛切蛋糕吧。",
            "pinyinAudioText": "Wǒmen yìqǐ chuī làzhú qiē dàngāo ba.",
            "tokens": [
              "我们一起",
              "吹蜡烛",
              "切蛋糕吧",
              "礼物",
              "送"
            ],
            "correctTokens": [
              "我们一起",
              "吹蜡烛",
              "切蛋糕吧"
            ],
            "explanation": "吹蜡烛 (thổi nến) + 切蛋糕 (cắt bánh kem)."
          }
        ]
      },
      {
        "id": "node-hsk2-6-3",
        "unitNumber": 6,
        "title": "Các ngày lễ lớn & Lời chúc",
        "subtitle": "新年 · 春节 · 节日 · 祝你万事如意",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-6-3-1",
            "type": "match_pairs",
            "prompt": "Nối ngày lễ và lời chúc:",
            "matchPairs": [
              {
                "id": "hl-1",
                "left": "新年快乐",
                "right": "Chúc mừng năm mới"
              },
              {
                "id": "hl-2",
                "left": "春节",
                "right": "Tết Nguyên Đán"
              },
              {
                "id": "hl-3",
                "left": "万事如意",
                "right": "Vạn sự như ý"
              },
              {
                "id": "hl-4",
                "left": "节日",
                "right": "Ngày lễ tết"
              }
            ],
            "explanation": "春节 (chūnjié: Tết cổ truyền), 万事如意 (vạn sự như ý)."
          },
          {
            "id": "c-2-6-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu chúc Tết: \"Chúc bạn năm mới vui vẻ, vạn sự như ý!\"",
            "chineseAudioText": "祝你新年快乐，万事如意！",
            "pinyinAudioText": "Zhù nǐ xīnnián kuàilè, wànshì rúyì!",
            "tokens": [
              "祝你",
              "新年快乐",
              "万事如意",
              "蛋糕",
              "礼物"
            ],
            "correctTokens": [
              "祝你",
              "新年快乐",
              "万事如意"
            ],
            "explanation": "Lời chúc Tết quen thuộc nhất trong tiếng Trung."
          }
        ]
      },
      {
        "id": "node-hsk2-6-4",
        "unitNumber": 6,
        "title": "Lời cảm ơn & Tỏ lòng trân trọng",
        "subtitle": "非常感谢 · 很高兴 · 照顾 · 热情",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-6-4-1",
            "type": "match_pairs",
            "prompt": "Nối cách diễn đạt lòng biết ơn:",
            "matchPairs": [
              {
                "id": "th-1",
                "left": "非常感谢",
                "right": "Vô cùng cảm ơn"
              },
              {
                "id": "th-2",
                "left": "照顾",
                "right": "Chăm sóc / Giúp đỡ chu đáo"
              },
              {
                "id": "th-3",
                "left": "热情",
                "right": "Nhiệt tình hiếu khách"
              },
              {
                "id": "th-4",
                "left": "不用客气",
                "right": "Không cần khách sáo"
              }
            ],
            "explanation": "非常感谢 (vô cùng biết ơn), 照顾 (zhàogù: chăm sóc)."
          },
          {
            "id": "c-2-6-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Cảm ơn sự tiếp đón nhiệt tình của các bạn hôm nay.\"",
            "chineseAudioText": "非常感谢你们今天的热情招待。",
            "pinyinAudioText": "Fēicháng gǎnxiè nǐmen jīntiān de rèqíng zhāodài.",
            "tokens": [
              "非常感谢",
              "你们今天的",
              "热情招待",
              "新年",
              "蜡烛"
            ],
            "correctTokens": [
              "非常感谢",
              "你们今天的",
              "热情招待"
            ],
            "explanation": "热情招待 (rèqíng zhāodài: tiếp đón nhiệt tình nồng hậu)."
          }
        ]
      },
      {
        "id": "node-hsk2-6-5",
        "unitNumber": 6,
        "title": "Cúp Vinh Quang Lễ Nghi",
        "subtitle": "Giao tiếp ấm áp, chân thành & Trọn vẹn nghĩa tình",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-6-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Món quà tuy nhỏ nhưng chứa đựng tất cả tấm lòng của tôi.\"",
            "chineseAudioText": "礼轻情意重，祝你天天开心。",
            "pinyinAudioText": "Lǐ qīng qíngyì zhòng, zhù nǐ tiāntiān kāixīn.",
            "tokens": [
              "礼轻情意重",
              "祝你",
              "天天开心",
              "招待",
              "春节"
            ],
            "correctTokens": [
              "礼轻情意重",
              "祝你",
              "天天开心"
            ],
            "explanation": "礼轻情意重 (của ít lòng nhiều - thành ngữ văn hóa tặng quà)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-7",
    "unitNumber": 7,
    "level": 2,
    "title": "Unit 7: Du lịch cuối tuần & Trải nghiệm (周末旅游)",
    "description": "Lên kế hoạch du lịch dã ngoại, chụp ảnh lưu niệm phong cảnh và chia sẻ cảm xúc sau chuyến đi.",
    "themeColor": "#6366f1",
    "nodes": [
      {
        "id": "node-hsk2-7-1",
        "unitNumber": 7,
        "title": "Đi du lịch vui vẻ",
        "subtitle": "旅游 · 准备 · 票 · 好玩儿",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-7-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng đi du lịch:",
            "matchPairs": [
              {
                "id": "tv-1",
                "left": "旅游",
                "right": "Đi du lịch"
              },
              {
                "id": "tv-2",
                "left": "准备",
                "right": "Chuẩn bị"
              },
              {
                "id": "tv-3",
                "left": "票",
                "right": "Vé (tàu, xe, vé vào cổng)"
              },
              {
                "id": "tv-4",
                "left": "好玩儿",
                "right": "Vui vẻ / Thú vị"
              }
            ],
            "explanation": "旅游 (lǚyóu: du lịch), 准备 (zhǔnbèi: chuẩn bị), 好玩儿 (hǎowánr: vui)."
          },
          {
            "id": "c-2-7-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Cuối tuần này chúng tôi dự định đi du lịch.\"",
            "chineseAudioText": "这个周末我们打算去旅游。",
            "pinyinAudioText": "Zhège zhōumò wǒmen dǎsuàn qù lǚyóu.",
            "tokens": [
              "这个周末",
              "我们打算",
              "去旅游",
              "准备",
              "票"
            ],
            "correctTokens": [
              "这个周末",
              "我们打算",
              "去旅游"
            ],
            "explanation": "打算 (dǎsuàn: dự định) + 去旅游 (đi du lịch)."
          }
        ]
      },
      {
        "id": "node-hsk2-7-2",
        "unitNumber": 7,
        "title": "Chuẩn bị hành lý & Mua vé",
        "subtitle": "买票 · 行李箱 · 照相机 · 准备好了",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-7-2-1",
            "type": "match_pairs",
            "prompt": "Nối đồ dùng du lịch:",
            "matchPairs": [
              {
                "id": "pk-1",
                "left": "行李箱",
                "right": "Vali hành lý"
              },
              {
                "id": "pk-2",
                "left": "照相机",
                "right": "Máy ảnh"
              },
              {
                "id": "pk-3",
                "left": "买票",
                "right": "Mua vé"
              },
              {
                "id": "pk-4",
                "left": "出发",
                "right": "Xuất phát"
              }
            ],
            "explanation": "行李箱 (xínglixiāng: vali), 照相机 (zhàoxiàngjī: máy ảnh)."
          },
          {
            "id": "c-2-7-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Hành lý của bạn đã chuẩn bị xong chưa?\"",
            "chineseAudioText": "你的行李准备好了吗？",
            "pinyinAudioText": "Nǐ de xíngli zhǔnbèi hǎo le ma?",
            "tokens": [
              "你的行李",
              "准备好了吗",
              "买票",
              "照相机"
            ],
            "correctTokens": [
              "你的行李",
              "准备好了吗"
            ],
            "explanation": "准备好了 (zhǔnbèi hǎo le: đã chuẩn bị xong)."
          }
        ]
      },
      {
        "id": "node-hsk2-7-3",
        "unitNumber": 7,
        "title": "Khám phá danh lam & Chụp ảnh",
        "subtitle": "爬山 · 风景 · 拍照 · 太漂亮了",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-7-3-1",
            "type": "match_pairs",
            "prompt": "Nối hoạt động tham quan:",
            "matchPairs": [
              {
                "id": "sc-1",
                "left": "爬山",
                "right": "Leo núi"
              },
              {
                "id": "sc-2",
                "left": "风景",
                "right": "Phong cảnh"
              },
              {
                "id": "sc-3",
                "left": "拍照",
                "right": "Chụp hình"
              },
              {
                "id": "sc-4",
                "left": "漂亮",
                "right": "Xinh đẹp"
              }
            ],
            "explanation": "爬山 (páshān: leo núi), 风景 (fēngjǐng: cảnh sắc)."
          },
          {
            "id": "c-2-7-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Phong cảnh trên đỉnh núi thật là tuyệt đẹp!\"",
            "chineseAudioText": "山上的风景太漂亮了！",
            "pinyinAudioText": "Shān shang de fēngjǐng tài piàoliang le!",
            "tokens": [
              "山上的风景",
              "太漂亮了",
              "爬山",
              "拍照"
            ],
            "correctTokens": [
              "山上的风景",
              "太漂亮了"
            ],
            "explanation": "太...了 (quá... rồi - biểu thị sự tán thưởng nhiệt liệt)."
          }
        ]
      },
      {
        "id": "node-hsk2-7-4",
        "unitNumber": 7,
        "title": "Cảm nhận sau chuyến đi",
        "subtitle": "好玩儿 · 有意思 · 下次还要去",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-7-4-1",
            "type": "match_pairs",
            "prompt": "Nối cảm xúc sau hành trình:",
            "matchPairs": [
              {
                "id": "fe-1",
                "left": "好玩儿",
                "right": "Rất vui"
              },
              {
                "id": "fe-2",
                "left": "虽然累但是很高兴",
                "right": "Tuy mệt nhưng rất vui"
              },
              {
                "id": "fe-3",
                "left": "下次",
                "right": "Lần sau"
              },
              {
                "id": "fe-4",
                "left": "难忘",
                "right": "Khó quên / Đáng nhớ"
              }
            ],
            "explanation": "虽然...但是... (tuy... nhưng...)."
          },
          {
            "id": "c-2-7-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chuyến đi này tuy mệt nhưng rất vui, lần sau tôi lại muốn đi tiếp.\"",
            "chineseAudioText": "这次旅行虽然很累，但是非常好玩儿。",
            "pinyinAudioText": "Zhè cì lǚxíng suīrán hěn lèi, dànshì fēicháng hǎowánr.",
            "tokens": [
              "这次旅行",
              "虽然很累",
              "但是",
              "非常好玩儿",
              "下次"
            ],
            "correctTokens": [
              "这次旅行",
              "虽然很累",
              "但是",
              "非常好玩儿"
            ],
            "explanation": "Cấu trúc chuyển ngoặt 虽然...但是... (tuy... nhưng...)."
          }
        ]
      },
      {
        "id": "node-hsk2-7-5",
        "unitNumber": 7,
        "title": "Cúp Vinh Quang Du Lịch",
        "subtitle": "Hành trình khám phá thế giới tươi đẹp muôn màu",
        "type": "trophy",
        "xpReward": 35,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-7-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu đúc kết hành trình:",
            "chineseAudioText": "读万卷书，行万里路，旅行让生活更加美好。",
            "pinyinAudioText": "Dú wàn juǎn shū, xíng wàn lǐ lù, lǚxíng ràng shēnghuó gèngjiā měihǎo.",
            "tokens": [
              "读万卷书行万里路",
              "旅行让生活",
              "更加美好",
              "行李",
              "风景"
            ],
            "correctTokens": [
              "读万卷书行万里路",
              "旅行让生活",
              "更加美好"
            ],
            "explanation": "Đi một ngày đàng học một sàng khôn."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk2-8",
    "unitNumber": 8,
    "level": 2,
    "title": "Unit 8: Văn phòng & Công việc thường nhật (办公室与日常工作)",
    "description": "Giao tiếp nơi công sở, nghe gọi điện thoại đối tác, lập báo cáo công việc và giao lưu với đồng nghiệp.",
    "themeColor": "#059669",
    "nodes": [
      {
        "id": "node-hsk2-8-1",
        "unitNumber": 2,
        "title": "Môi trường làm việc",
        "subtitle": "上班 · 下班 · 公司 · 同事 · 事情",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-8-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng làm việc văn phòng:",
            "matchPairs": [
              {
                "id": "of-1",
                "left": "上班",
                "right": "Đi làm"
              },
              {
                "id": "of-2",
                "left": "下班",
                "right": "Tan làm"
              },
              {
                "id": "of-3",
                "left": "同事",
                "right": "Đồng nghiệp"
              },
              {
                "id": "of-4",
                "left": "事情",
                "right": "Sự việc / Công việc"
              }
            ],
            "explanation": "上班 (đi làm), 下班 (tan sở), 同事 (đồng nghiệp)."
          },
          {
            "id": "c-2-8-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Buổi sáng tôi 8 giờ rưỡi bắt đầu đi làm.\"",
            "chineseAudioText": "我早上八点半开始上班。",
            "pinyinAudioText": "Wǒ zǎoshang bā diǎn bàn kāishǐ shàngbān.",
            "tokens": [
              "我早上",
              "八点半",
              "开始上班",
              "下班",
              "同事"
            ],
            "correctTokens": [
              "我早上",
              "八点半",
              "开始上班"
            ],
            "explanation": "八点半 (8 giờ 30 phút) + 开始上班 (bắt đầu đi làm)."
          }
        ]
      },
      {
        "id": "node-hsk2-8-2",
        "unitNumber": 8,
        "title": "Nghe gọi điện thoại",
        "subtitle": "喂 · 请问哪一位 · 找谁 · 稍等",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-8-2-1",
            "type": "match_pairs",
            "prompt": "Nối câu giao tiếp nghe điện thoại:",
            "matchPairs": [
              {
                "id": "ph-1",
                "left": "喂，您好",
                "right": "Alo, xin chào"
              },
              {
                "id": "ph-2",
                "left": "请问您找哪一位？",
                "right": "Xin hỏi bạn tìm ai ạ?"
              },
              {
                "id": "ph-3",
                "left": "请稍等一下",
                "right": "Xin vui lòng chờ một chút"
              },
              {
                "id": "ph-4",
                "left": "他正在开会",
                "right": "Anh ấy đang họp"
              }
            ],
            "explanation": "Mẫu câu đàm thoại điện thoại chuẩn mực trong công sở."
          },
          {
            "id": "c-2-8-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Xin hỏi Trương giám đốc có ở đó không?\"",
            "chineseAudioText": "请问张经理在吗？",
            "pinyinAudioText": "Qǐngwèn Zhāng jīnglǐ zài ma?",
            "tokens": [
              "请问",
              "张经理",
              "在吗",
              "稍等",
              "上班"
            ],
            "correctTokens": [
              "请问",
              "张经理",
              "在吗"
            ],
            "explanation": "经理 (jīnglǐ: giám đốc)."
          }
        ]
      },
      {
        "id": "node-hsk2-8-3",
        "unitNumber": 8,
        "title": "Báo cáo công việc & Hạn chót",
        "subtitle": "报表 · 完成 · 忙 · 马上 · 准备好",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-8-3-1",
            "type": "match_pairs",
            "prompt": "Nối từ xử lý tiến độ:",
            "matchPairs": [
              {
                "id": "dd-1",
                "left": "完成",
                "right": "Hoàn thành"
              },
              {
                "id": "dd-2",
                "left": "马上",
                "right": "Ngay lập tức"
              },
              {
                "id": "dd-3",
                "left": "忙",
                "right": "Bận rộn"
              },
              {
                "id": "dd-4",
                "left": "准备好",
                "right": "Chuẩn bị sẵn sàng"
              }
            ],
            "explanation": "马上 (ngay lập tức), 完成 (hoàn thành)."
          },
          {
            "id": "c-2-8-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Báo cáo công việc tôi đã chuẩn bị xong xuôi rồi.\"",
            "chineseAudioText": "工作汇报我已经准备好了。",
            "pinyinAudioText": "Gōngzuò huìbào wǒ yǐjīng zhǔnbèi hǎo le.",
            "tokens": [
              "工作汇报",
              "我已经",
              "准备好了",
              "马上",
              "忙"
            ],
            "correctTokens": [
              "工作汇报",
              "我已经",
              "准备好了"
            ],
            "explanation": "准备好了 (đã chuẩn bị xong)."
          }
        ]
      },
      {
        "id": "node-hsk2-8-4",
        "unitNumber": 8,
        "title": "Ăn trưa & Giao lưu đồng nghiệp",
        "subtitle": "一起吃午饭 · 聊聊天 · 休息一下",
        "type": "lesson",
        "xpReward": 20,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-8-4-1",
            "type": "match_pairs",
            "prompt": "Nối hoạt động nghỉ trưa:",
            "matchPairs": [
              {
                "id": "ln-1",
                "left": "一起吃午饭",
                "right": "Cùng nhau ăn cơm trưa"
              },
              {
                "id": "ln-2",
                "left": "聊聊天",
                "right": "Trò chuyện tán gẫu"
              },
              {
                "id": "ln-3",
                "left": "休息一下",
                "right": "Nghỉ ngơi một lát"
              },
              {
                "id": "ln-4",
                "left": "喝咖啡",
                "right": "Uống cà phê"
              }
            ],
            "explanation": "一起 (yìqǐ: cùng nhau), 聊聊天 (liáo liáo tiān: nói chuyện)."
          },
          {
            "id": "c-2-8-4-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Trưa nay chúng mình cùng nhau đi ăn cơm nhé.\"",
            "chineseAudioText": "中午我们一起去吃午饭吧。",
            "pinyinAudioText": "Zhōngwǔ wǒmen yìqǐ qù chī wǔfàn ba.",
            "tokens": [
              "中午",
              "我们一起",
              "去吃午饭吧",
              "上班",
              "完成"
            ],
            "correctTokens": [
              "中午",
              "我们一起",
              "去吃午饭吧"
            ],
            "explanation": "去吃午饭 (đi ăn cơm trưa)."
          }
        ]
      },
      {
        "id": "node-hsk2-8-5",
        "unitNumber": 8,
        "title": "Đại Cúp Vinh Quang HSK 2 Toàn Diện",
        "subtitle": "Tốt nghiệp toàn bộ Lộ Trình HSK 2 Sơ Cấp Nâng Cao",
        "type": "trophy",
        "xpReward": 60,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-2-8-5-1",
            "type": "word_bank",
            "prompt": "Ghép câu chúc mừng tốt nghiệp HSK 2:",
            "chineseAudioText": "恭喜你圆满完成HSK 2全部课程，继续加油！",
            "pinyinAudioText": "Gōngxǐ nǐ yuánmǎn wánchéng HSK 2 quánbù kèchéng, jìxù jiāyóu!",
            "tokens": [
              "恭喜你",
              "圆满完成",
              "HSK 2全部课程",
              "继续加油",
              "工作"
            ],
            "correctTokens": [
              "恭喜你",
              "圆满完成",
              "HSK 2全部课程",
              "继续加油"
            ],
            "explanation": "Chúc mừng bạn hoàn thành xuất sắc toàn bộ HSK 2!"
          }
        ]
      }
    ]
  }
];
