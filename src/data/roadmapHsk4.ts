import type { RoadmapUnit } from '../types';

export const HSK4_ROADMAP_UNITS: RoadmapUnit[] = [
  {
    "id": "unit-hsk4-1",
    "unitNumber": 1,
    "level": 4,
    "title": "Unit 1: Cấu trúc liên từ logic & Câu phức (逻辑连词与复句)",
    "description": "Thành thạo các liên từ phức hợp diễn đạt lập luận chặt chẽ: tăng tiến, nhượng bộ, điều kiện và phản biện sắc sảo.",
    "themeColor": "#7c3aed",
    "nodes": [
      {
        "id": "node-hsk4-1-1",
        "unitNumber": 1,
        "title": "Liên từ tăng tiến & Nhượng bộ",
        "subtitle": "不仅...而且... · 尽管 · 哪怕 · 即使",
        "type": "lesson",
        "xpReward": 30,
        "status": "active",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-1-1-1",
            "type": "match_pairs",
            "prompt": "Nối các cặp liên từ nâng cao HSK 4:",
            "matchPairs": [
              {
                "id": "cj-1",
                "left": "不仅...而且...",
                "right": "Không những... mà còn..."
              },
              {
                "id": "cj-2",
                "left": "尽管...但是...",
                "right": "Cho dù / Dẫu rằng... nhưng..."
              },
              {
                "id": "cj-3",
                "left": "哪怕...也...",
                "right": "Dẫu cho / Cho dù thế nào... cũng..."
              },
              {
                "id": "cj-4",
                "left": "即使...也...",
                "right": "Ngay cả khi... vẫn..."
              }
            ],
            "explanation": "Bộ liên từ phức hợp thiết yếu trong nghị luận và bài đọc hiểu HSK 4."
          },
          {
            "id": "c-4-1-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Anh ấy không những nói tiếng Trung lưu loát mà chữ Hán viết cũng rất đẹp.\"",
            "chineseAudioText": "他不仅汉语说得流利，而且汉字也写得很漂亮。",
            "pinyinAudioText": "Tā bùjǐn hànyǔ shuō de liúlì, érqiě hànzì yě xiě de hěn piàoliang.",
            "tokens": [
              "他不仅",
              "汉语说得流利",
              "而且汉字",
              "也写得很漂亮",
              "尽管",
              "哪怕"
            ],
            "correctTokens": [
              "他不仅",
              "汉语说得流利",
              "而且汉字",
              "也写得很漂亮"
            ],
            "explanation": "Cấu trúc tăng tiến: 不仅...而且... (không chỉ... mà còn...)."
          },
          {
            "id": "c-4-1-1-3",
            "type": "listen_choose",
            "prompt": "Nghe và xác định ý nghĩa câu nhượng bộ:",
            "chineseAudioText": "尽管任务非常艰巨，但我们一定会按时完成。",
            "pinyinAudioText": "Jǐnguǎn rènwù fēicháng jiānjù, dàn wǒmen yídìng huì ànshí wánchéng.",
            "options": [
              "Dẫu nhiệm vụ rất gian nan, nhưng chúng tôi nhất định sẽ hoàn thành đúng hạn.",
              "Nhiệm vụ quá khó nên chúng tôi xin hoãn.",
              "Vì thời gian gấp rút nên nhiệm vụ bị hủy.",
              "Mọi người đã hoàn thành trước thời hạn."
            ],
            "correctAnswer": "Dẫu nhiệm vụ rất gian nan, nhưng chúng tôi nhất định sẽ hoàn thành đúng hạn.",
            "explanation": "尽管...但... (cho dù... nhưng...). 艰巨 (jiānjù: gian nan), 按时完成 (hoàn thành đúng giờ)."
          }
        ]
      },
      {
        "id": "node-hsk4-1-2",
        "unitNumber": 1,
        "title": "Quan hệ điều kiện & Giả thiết",
        "subtitle": "只要...就... · 只有...才... · 除非 · 假使",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-1-1-4",
            "type": "match_pairs",
            "prompt": "Nối cấu trúc điều kiện:",
            "matchPairs": [
              {
                "id": "cd-1",
                "left": "只有...才...",
                "right": "Chỉ có... thì mới..."
              },
              {
                "id": "cd-2",
                "left": "只要...就...",
                "right": "Chỉ cần... là..."
              },
              {
                "id": "cd-3",
                "left": "除非...否则...",
                "right": "Trừ phi... nếu không..."
              },
              {
                "id": "cd-4",
                "left": "假使",
                "right": "Giả sử / Nếu như"
              }
            ],
            "explanation": "只有...才... biểu thị điều kiện duy nhất; 只要...就... biểu thị điều kiện đầy đủ."
          },
          {
            "id": "c-4-1-1-5",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chỉ có kiên trì không ngừng mới có thể đạt được thành công cuối cùng.\"",
            "chineseAudioText": "只有坚持不懈，才能取得最终的成功。",
            "pinyinAudioText": "Zhǐyǒu jiānchíbúxiè, cáinéng qǔdé zuìzhōng de chénggōng.",
            "tokens": [
              "只有",
              "坚持不懈",
              "才能",
              "取得",
              "最终的成功",
              "只要"
            ],
            "correctTokens": [
              "只有",
              "坚持不懈",
              "才能",
              "取得",
              "最终的成功"
            ],
            "explanation": "坚持不懈 (kiên trì bền bỉ không ngừng) + 取得成功 (giành lấy thành công)."
          }
        ]
      },
      {
        "id": "node-hsk4-1-3",
        "unitNumber": 1,
        "title": "Quan hệ chuyển ngoặt & Nhân quả",
        "subtitle": "与其...不如... · 既然...就... · 因而 · 反而",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-1-1-6",
            "type": "match_pairs",
            "prompt": "Nối cấu trúc lựa chọn & nguyên nhân:",
            "matchPairs": [
              {
                "id": "cs-1",
                "left": "与其...不如...",
                "right": "Thà rằng... còn hơn là..."
              },
              {
                "id": "cs-2",
                "left": "既然...就...",
                "right": "Đã... thì hãy..."
              },
              {
                "id": "cs-3",
                "left": "因而",
                "right": "Vì thế / Do đó"
              },
              {
                "id": "cs-4",
                "left": "反而",
                "right": "Ngược lại / Trái lại"
              }
            ],
            "explanation": "与其...不如... thể hiện sự so sánh và chọn phương án tối ưu hơn."
          },
          {
            "id": "c-4-1-1-7",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Thay vì ngồi lo lắng, chi bằng hãy bắt tay vào hành động.\"",
            "chineseAudioText": "与其在这里担心，不如立刻开始行动。",
            "pinyinAudioText": "Yǔqí zài zhèlǐ dānxīn, bùrú lìkè kāishǐ xíngdòng.",
            "tokens": [
              "与其在这里担心",
              "不如",
              "立刻开始行动",
              "既然",
              "反而"
            ],
            "correctTokens": [
              "与其在这里担心",
              "不如",
              "立刻开始行动"
            ],
            "explanation": "与其...不如... (thay vì... chi bằng hãy...)."
          }
        ]
      },
      {
        "id": "node-hsk4-1-4",
        "unitNumber": 1,
        "title": "Cúp Vinh Quang Cấu Trúc Phức",
        "subtitle": "Lập luận sắc sảo, mạch lạc & Đỉnh cao văn phong HSK 4",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-1-1-8",
            "type": "word_bank",
            "prompt": "Ghép câu hoàn chỉnh:",
            "chineseAudioText": "既然选择了远方，哪怕风雨兼程也要走下去。",
            "pinyinAudioText": "Jìrán xuǎnzé le yuǎnfāng, nǎpà fēngyǔjiānchéng yě yào zǒu xiàqù.",
            "tokens": [
              "既然选择了远方",
              "哪怕风雨兼程",
              "也要走下去",
              "与其",
              "因此"
            ],
            "correctTokens": [
              "既然选择了远方",
              "哪怕风雨兼程",
              "也要走下去"
            ],
            "explanation": "Một câu danh ngôn giàu chất thơ kết hợp 既然 và 哪怕."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-2",
    "unitNumber": 2,
    "level": 4,
    "title": "Unit 2: Kinh doanh & Thương mại (商业谈判与合作)",
    "description": "Đàm phán hợp đồng, phân tích thị trường, nghiên cứu lợi thế cạnh tranh và ký kết hợp tác quốc tế.",
    "themeColor": "#0ea5e9",
    "nodes": [
      {
        "id": "node-hsk4-2-1",
        "unitNumber": 2,
        "title": "Đàm phán hợp đồng & Lợi nhuận",
        "subtitle": "合同 · 谈判 · 合作 · 盈利 · 投资",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-2-1-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ thương mại quốc tế:",
            "matchPairs": [
              {
                "id": "bs-1",
                "left": "合同",
                "right": "Hợp đồng"
              },
              {
                "id": "bs-2",
                "left": "谈判",
                "right": "Đàm phán / Thương lượng"
              },
              {
                "id": "bs-3",
                "left": "盈利",
                "right": "Thu lợi nhuận"
              },
              {
                "id": "bs-4",
                "left": "投资",
                "right": "Đầu tư"
              }
            ],
            "explanation": "合同 (hétong: hợp đồng), 谈判 (tánpàn: đàm phán)."
          },
          {
            "id": "c-4-2-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Hai bên đã đạt được nhận thức chung sau cuộc đàm phán hợp đồng.\"",
            "chineseAudioText": "双方在合同谈判中达成了共识。",
            "pinyinAudioText": "Shuāngfāng zài hétong tánpàn zhōng dáchéng le gòngshí.",
            "tokens": [
              "双方在",
              "合同谈判中",
              "达成了共识",
              "投资",
              "盈利"
            ],
            "correctTokens": [
              "双方在",
              "合同谈判中",
              "达成了共识"
            ],
            "explanation": "达成共识 (dáchéng gòngshí: đạt được đồng thuận/nhất trí)."
          }
        ]
      },
      {
        "id": "node-hsk4-2-2",
        "unitNumber": 2,
        "title": "Nghiên cứu thị trường & Tiếp thị",
        "subtitle": "市场调查 · 竞争优势 · 吸引客户 · 品牌价值",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-2-2-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ kinh doanh:",
            "matchPairs": [
              {
                "id": "mk-1",
                "left": "市场调查",
                "right": "Khảo sát / Nghiên cứu thị trường"
              },
              {
                "id": "mk-2",
                "left": "竞争优势",
                "right": "Lợi thế cạnh tranh"
              },
              {
                "id": "mk-3",
                "left": "吸引客户",
                "right": "Thu hút khách hàng"
              },
              {
                "id": "mk-4",
                "left": "品牌价值",
                "right": "Giá trị thương hiệu"
              }
            ],
            "explanation": "市场调查 (khảo sát thị trường), 竞争优势 (lợi thế cạnh tranh)."
          },
          {
            "id": "c-4-2-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Chúng ta cần nâng cao chất lượng sản phẩm để thu hút thêm nhiều khách hàng.\"",
            "chineseAudioText": "我们需要提高产品质量来吸引更多客户。",
            "pinyinAudioText": "Wǒmen xūyào tígāo chǎnpǐn zhìliàng lái xīyǐn gèng duō kèhù.",
            "tokens": [
              "我们需要",
              "提高产品质量",
              "来吸引",
              "更多客户",
              "合同"
            ],
            "correctTokens": [
              "我们需要",
              "提高产品质量",
              "来吸引",
              "更多客户"
            ],
            "explanation": "提高产品质量 (nâng cao chất lượng sản phẩm) + 吸引客户 (thu hút khách hàng)."
          },
          {
            "id": "c-4-2-2-3",
            "type": "listen_choose",
            "prompt": "Nghe và nhận định chiến lược kinh doanh:",
            "chineseAudioText": "通过市场调研，我们发现了新的商业机会。",
            "pinyinAudioText": "Tōngguò shìchǎng diàoyán, wǒmen fāxiàn le xīn de shāngyè jīhuì.",
            "options": [
              "Thông qua khảo sát thị trường, chúng tôi đã phát hiện cơ hội kinh doanh mới.",
              "Chúng tôi quyết định ngừng bán sản phẩm này.",
              "Giá cả thị trường đang giảm mạnh.",
              "Khách hàng không hài lòng về dịch vụ."
            ],
            "correctAnswer": "Thông qua khảo sát thị trường, chúng tôi đã phát hiện cơ hội kinh doanh mới.",
            "explanation": "市场调研 (khảo sát thị trường) + 商业机会 (cơ hội thương mại)."
          }
        ]
      },
      {
        "id": "node-hsk4-2-3",
        "unitNumber": 2,
        "title": "Quản lý rủi ro & Ký kết hợp tác",
        "subtitle": "控制风险 · 保证质量 · 签字盖章 · 遵守规定",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-2-3-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ pháp lý hợp đồng:",
            "matchPairs": [
              {
                "id": "lg-1",
                "left": "控制风险",
                "right": "Kiểm soát rủi ro"
              },
              {
                "id": "lg-2",
                "left": "签字盖章",
                "right": "Ký tên và đóng dấu"
              },
              {
                "id": "lg-3",
                "left": "遵守规定",
                "right": "Tuân thủ quy định"
              },
              {
                "id": "lg-4",
                "left": "保证质量",
                "right": "Đảm bảo chất lượng"
              }
            ],
            "explanation": "签字盖章 (ký tên đóng dấu), 控制风险 (kiểm soát rủi ro)."
          },
          {
            "id": "c-4-2-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Cả hai bên đại diện đã chính thức ký tên và đóng dấu vào hợp đồng.\"",
            "chineseAudioText": "双方代表已经在合同上正式签字盖章。",
            "pinyinAudioText": "Shuāngfāng dàibiǎo yǐjīng zài hétong shang zhèngshì qiānzì gàizhāng.",
            "tokens": [
              "双方代表",
              "已经在合同上",
              "正式签字盖章",
              "风险",
              "竞争"
            ],
            "correctTokens": [
              "双方代表",
              "已经在合同上",
              "正式签字盖章"
            ],
            "explanation": "正式签字盖章 (chính thức ký tên đóng dấu)."
          }
        ]
      },
      {
        "id": "node-hsk4-2-4",
        "unitNumber": 2,
        "title": "Cúp Vinh Quang Thương Trường",
        "subtitle": "Bản lĩnh đàm phán quốc tế & Tầm nhìn chiến lược vươn xa",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-2-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu tuyên ngôn hợp tác song thắng (Win-Win):",
            "chineseAudioText": "诚信为本，合作共赢是商业成功的基石。",
            "pinyinAudioText": "Chéngxìn wéi běn, hézuò gòngyíng shì shāngyè chénggōng de jīshí.",
            "tokens": [
              "诚信为本",
              "合作共赢是",
              "商业成功的基石",
              "风险",
              "合同"
            ],
            "correctTokens": [
              "诚信为本",
              "合作共赢是",
              "商业成功的基石"
            ],
            "explanation": "诚信为本 (lấy chữ tín làm gốc) + 合作共赢 (hợp tác cùng có lợi/Win-Win)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-3",
    "unitNumber": 3,
    "level": 4,
    "title": "Unit 3: Đời sống số & Môi trường sinh thái (数字生活与生态)",
    "description": "Thanh toán di động, mạng xã hội, phân tích tác động công nghệ và thúc đẩy chuyển đổi xanh bền vững.",
    "themeColor": "#0284c7",
    "nodes": [
      {
        "id": "node-hsk4-3-1",
        "unitNumber": 3,
        "title": "Xã hội số & Thanh toán di động",
        "subtitle": "移动支付 · 扫码 · 互联网 · 方便 · 普及",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-3-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng thanh toán số:",
            "matchPairs": [
              {
                "id": "dg-1",
                "left": "移动支付",
                "right": "Thanh toán di động"
              },
              {
                "id": "dg-2",
                "left": "扫码",
                "right": "Quét mã QR"
              },
              {
                "id": "dg-3",
                "left": "普及",
                "right": "Phổ biến rộng rãi"
              },
              {
                "id": "dg-4",
                "left": "互联网",
                "right": "Mạng Internet"
              }
            ],
            "explanation": "移动支付 (yídòng zhīfù: thanh toán di động), 普及 (pǔjí: phổ cập/phổ biến)."
          },
          {
            "id": "c-4-3-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Ở Trung Quốc, thanh toán di động đã vô cùng phổ biến.\"",
            "chineseAudioText": "在中国，移动支付已经非常普及了。",
            "pinyinAudioText": "Zài Zhōngguó, yídòng zhīfù yǐjīng fēicháng pǔjí le.",
            "tokens": [
              "在中国",
              "移动支付",
              "已经非常普及了",
              "扫码",
              "网络"
            ],
            "correctTokens": [
              "在中国",
              "移动支付",
              "已经非常普及了"
            ],
            "explanation": "非常普及 (fēicháng pǔjí: vô cùng phổ biến khắp nơi)."
          }
        ]
      },
      {
        "id": "node-hsk4-3-2",
        "unitNumber": 3,
        "title": "Mạng xã hội & Tương tác thông tin",
        "subtitle": "社交网络 · 随着 · 影响 · 效率 · 沟通",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-3-2-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng truyền thông xã hội:",
            "matchPairs": [
              {
                "id": "sc-1",
                "left": "社交网络",
                "right": "Mạng xã hội"
              },
              {
                "id": "sc-2",
                "left": "随着",
                "right": "Cùng với / Theo đà phát triển của"
              },
              {
                "id": "sc-3",
                "left": "效率",
                "right": "Hiệu suất / Hiệu quả"
              },
              {
                "id": "sc-4",
                "left": "沟通",
                "right": "Giao tiếp tương tác"
              }
            ],
            "explanation": "随着 (suízhe: cùng với), 效率 (xiàolǜ: hiệu suất)."
          },
          {
            "id": "c-4-3-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Cùng với sự phát triển của công nghệ, phương thức giao tiếp của con người đã thay đổi rất nhiều.\"",
            "chineseAudioText": "随着科技的发展，人们沟通的方式发生了很大改变。",
            "pinyinAudioText": "Suízhe kējì de fāzhǎn, rénmen gōutōng de fāngshì fāshēng le hěn dà gǎibiàn.",
            "tokens": [
              "随着科技的发展",
              "人们沟通的方式",
              "发生了很大改变",
              "移动支付",
              "普及"
            ],
            "correctTokens": [
              "随着科技的发展",
              "人们沟通的方式",
              "发生了很大改变"
            ],
            "explanation": "随着...的发展 (cùng với sự phát triển của...)."
          }
        ]
      },
      {
        "id": "node-hsk4-3-3",
        "unitNumber": 3,
        "title": "Cân bằng công nghệ & Bảo vệ môi trường",
        "subtitle": "绿色科技 · 节能减排 · 可持续发展 · 责任",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-3-3-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ phát triển bền vững:",
            "matchPairs": [
              {
                "id": "gr-1",
                "left": "绿色科技",
                "right": "Công nghệ xanh"
              },
              {
                "id": "gr-2",
                "left": "节能减排",
                "right": "Tiết kiệm năng lượng, giảm khí thải"
              },
              {
                "id": "gr-3",
                "left": "可持续发展",
                "right": "Phát triển bền vững"
              },
              {
                "id": "gr-4",
                "left": "生态平衡",
                "right": "Cân bằng sinh thái"
              }
            ],
            "explanation": "可持续发展 (kěchíxù fāzhǎn: phát triển bền vững)."
          },
          {
            "id": "c-4-3-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Phát triển kinh tế phải đi đôi với bảo vệ môi trường sinh thái.\"",
            "chineseAudioText": "发展经济必须与保护生态环境相结合。",
            "pinyinAudioText": "Fāzhǎn jīngjì bìxū yǔ bǎohù shēngtài huánjìng xiāng jiéhé.",
            "tokens": [
              "发展经济",
              "必须与",
              "保护生态环境",
              "相结合",
              "社交网络"
            ],
            "correctTokens": [
              "发展经济",
              "必须与",
              "保护生态环境",
              "相结合"
            ],
            "explanation": "与...相结合 (kết hợp đồng hành cùng...)."
          }
        ]
      },
      {
        "id": "node-hsk4-3-4",
        "unitNumber": 3,
        "title": "Cúp Vinh Quang Kỷ Nguyên Xanh",
        "subtitle": "Hòa nhịp cùng công nghệ hiện đại & Môi trường bền vững",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-3-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu cam kết tương lai xanh:",
            "chineseAudioText": "绿水青山就是金山银山，人与自然应当和谐共生。",
            "pinyinAudioText": "Lǜshuǐ qīngshān jiù shì jīnshān yínshān, rén yǔ zìrán yīngdāng héxié gòngshēng.",
            "tokens": [
              "绿水青山就是金山银山",
              "人与自然",
              "应当和谐共生",
              "发展",
              "扫码"
            ],
            "correctTokens": [
              "绿水青山就是金山银山",
              "人与自然",
              "应当和谐共生"
            ],
            "explanation": "Triết lý nổi tiếng: non xanh nước biếc chính là núi vàng núi bạc."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-4",
    "unitNumber": 4,
    "level": 4,
    "title": "Unit 4: Triết lý nhân sinh & Thành ngữ (人生哲学与成语)",
    "description": "Thấu hiểu thành ngữ bốn chữ kinh điển, thái độ đón nhận thử thách thất bại và bài học khiêm tốn học hỏi.",
    "themeColor": "#d97706",
    "nodes": [
      {
        "id": "node-hsk4-4-1",
        "unitNumber": 4,
        "title": "Thành ngữ ngụ ngôn kinh điển",
        "subtitle": "亡羊补牢 · 塞翁失马 · 坚持到底 · 顺其自然",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-4-1-1",
            "type": "match_pairs",
            "prompt": "Nối thành ngữ bốn chữ với ý nghĩa thâm thúy:",
            "matchPairs": [
              {
                "id": "id-1",
                "left": "亡羊补牢",
                "right": "Mất bò mới lo làm chuồng (chưa muộn)"
              },
              {
                "id": "id-2",
                "left": "塞翁失马",
                "right": "Tái ông mất ngựa (họa phúc khôn lường)"
              },
              {
                "id": "id-3",
                "left": "坚持到底",
                "right": "Kiên trì đến cùng"
              },
              {
                "id": "id-4",
                "left": "顺其自然",
                "right": "Thuận theo tự nhiên"
              }
            ],
            "explanation": "Thành ngữ bốn chữ (成语) là tinh hoa biểu đạt trong HSK 4."
          },
          {
            "id": "c-4-4-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Mặc dù gặp thất bại nhưng sửa chữa kịp thời vẫn chưa muộn.\"",
            "chineseAudioText": "亡羊补牢，未为迟也。",
            "pinyinAudioText": "Wángyángbǔláo, wèi wéi chí yě.",
            "tokens": [
              "亡羊补牢",
              "未为迟也",
              "塞翁失马",
              "顺其自然"
            ],
            "correctTokens": [
              "亡羊补牢",
              "未为迟也"
            ],
            "explanation": "亡羊补牢，未为迟也 (biết sửa chữa lỗi lầm thì không bao giờ là muộn)."
          }
        ]
      },
      {
        "id": "node-hsk4-4-2",
        "unitNumber": 4,
        "title": "Thái độ đối diện khó khăn & Thử thách",
        "subtitle": "面对困难 · 勇气 · 积累经验 · 失败是成功之母",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-4-2-1",
            "type": "match_pairs",
            "prompt": "Nối quan niệm sống tích cực:",
            "matchPairs": [
              {
                "id": "at-1",
                "left": "面对困难",
                "right": "Đối diện với khó khăn"
              },
              {
                "id": "at-2",
                "left": "勇气",
                "right": "Lòng dũng cảm"
              },
              {
                "id": "at-3",
                "left": "积累经验",
                "right": "Tích lũy kinh nghiệm"
              },
              {
                "id": "at-4",
                "left": "坚强",
                "right": "Kiên cường mạnh mẽ"
              }
            ],
            "explanation": "面对 (miànduì: đối diện), 勇气 (yǒngqì: dũng khí/can đảm)."
          },
          {
            "id": "c-4-4-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu châm ngôn: \"Thất bại là mẹ thành công, mỗi lần ngã xuống là một lần trưởng thành.\"",
            "chineseAudioText": "失败是成功之母，每一次挫折都是成长的财富。",
            "pinyinAudioText": "Shībài shì chénggōng zhī mǔ, měi yí cì cuòzhé dōu shì chéngzhǎng de cáifù.",
            "tokens": [
              "失败是成功之母",
              "每一次挫折",
              "都是成长的财富",
              "顺其自然",
              "亡羊补牢"
            ],
            "correctTokens": [
              "失败是成功之母",
              "每一次挫折",
              "都是成长的财富"
            ],
            "explanation": "挫折 (cuòzhé: trắc trở/thử thách) + 财富 (tài sản)."
          }
        ]
      },
      {
        "id": "node-hsk4-4-3",
        "unitNumber": 4,
        "title": "Sự khiêm tốn & Học hỏi không ngừng",
        "subtitle": "谦虚谨慎 · 发现他人优点 · 丰富阅历 · 学无止境",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-4-3-1",
            "type": "match_pairs",
            "prompt": "Nối phẩm chất người học thức:",
            "matchPairs": [
              {
                "id": "hm-1",
                "left": "谦虚",
                "right": "Khiêm tốn"
              },
              {
                "id": "hm-2",
                "left": "骄傲",
                "right": "Kiêu ngạo / Tự phụ"
              },
              {
                "id": "hm-3",
                "left": "学无止境",
                "right": "Học tập không bao giờ có điểm dừng"
              },
              {
                "id": "hm-4",
                "left": "三人行必有我师",
                "right": "Ba người cùng đi ắt có người là thầy ta"
              }
            ],
            "explanation": "谦虚使人进步，骄傲使人落后 (khiêm tốn giúp tiến bộ, kiêu ngạo làm thụt lùi)."
          },
          {
            "id": "c-4-4-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Khiêm tốn giúp con người tiến bộ, kiêu căng khiến con người thụt lùi.\"",
            "chineseAudioText": "谦虚使人进步，骄傲使人落后。",
            "pinyinAudioText": "Qiānxū shǐ rén jìnbù, jiāo'ào shǐ rén luòhòu.",
            "tokens": [
              "谦虚使人进步",
              "骄傲",
              "使人落后",
              "亡羊补牢",
              "勇气"
            ],
            "correctTokens": [
              "谦虚使人进步",
              "骄傲",
              "使人落后"
            ],
            "explanation": "Câu nói kinh điển về tinh thần học hỏi và tu dưỡng đạo đức."
          }
        ]
      },
      {
        "id": "node-hsk4-4-4",
        "unitNumber": 4,
        "title": "Cúp Vinh Quang Trí Tuệ Cổ Nhân",
        "subtitle": "Đốn ngộ triết lý phương Đông & Chiêm nghiệm sâu sắc",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-4-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu đúc kết triết lý nhân sinh:",
            "chineseAudioText": "千里之行，始于足下，唯有脚踏实地才能行稳致远。",
            "pinyinAudioText": "Qiānlǐ zhī xíng, shǐ yú zú xià, wéiyǒu jiǎotàshídì cáinéng xíng wěn zhì yuǎn.",
            "tokens": [
              "千里之行始于足下",
              "唯有脚踏实地",
              "才能行稳致远",
              "骄傲",
              "失败"
            ],
            "correctTokens": [
              "千里之行始于足下",
              "唯有脚踏实地",
              "才能行稳致远"
            ],
            "explanation": "千里之行始于足下 (đường vạn dặm bắt đầu từ một bước chân)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-5",
    "unitNumber": 5,
    "level": 4,
    "title": "Unit 5: Tuyển dụng & Thăng tiến sự nghiệp (职业发展与晋升)",
    "description": "Nâng cao năng lực chuyên môn, quản lý thời gian hiệu quả, kỹ năng lãnh đạo và tinh thần làm việc nhóm gắn kết.",
    "themeColor": "#16a34a",
    "nodes": [
      {
        "id": "node-hsk4-5-1",
        "unitNumber": 5,
        "title": "Năng lực chuyên môn & Cạnh tranh",
        "subtitle": "能力 · 竞争 · 负责 · 态度 · 晋升",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-5-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng phát triển sự nghiệp:",
            "matchPairs": [
              {
                "id": "cr-1",
                "left": "晋升",
                "right": "Thăng tiến chức vụ"
              },
              {
                "id": "cr-2",
                "left": "竞争",
                "right": "Cạnh tranh"
              },
              {
                "id": "cr-3",
                "left": "负责",
                "right": "Chịu trách nhiệm"
              },
              {
                "id": "cr-4",
                "left": "态度",
                "right": "Thái độ làm việc"
              }
            ],
            "explanation": "晋升 (jìnshēng: thăng chức), 竞争 (jìngzhēng: cạnh tranh)."
          },
          {
            "id": "c-4-5-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Thái độ làm việc nghiêm túc là yếu tố then chốt để được thăng tiến.\"",
            "chineseAudioText": "认真的工作态度是获得晋升的关键。",
            "pinyinAudioText": "Rènzhēn de gōngzuò tàidù shì huòdé jìnshēng de guānjiàn.",
            "tokens": [
              "认真的工作态度",
              "是获得晋升的",
              "关键",
              "竞争",
              "能力"
            ],
            "correctTokens": [
              "认真的工作态度",
              "是获得晋升的",
              "关键"
            ],
            "explanation": "获得晋升的关键 (yếu tố then chốt để được thăng quan tiến chức)."
          }
        ]
      },
      {
        "id": "node-hsk4-5-2",
        "unitNumber": 5,
        "title": "Quản lý thời gian & Cân bằng cuộc sống",
        "subtitle": "安排时间 · 明确优先级 · 提高效率 · 缓解压力",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-5-2-1",
            "type": "match_pairs",
            "prompt": "Nối kỹ năng quản trị công việc:",
            "matchPairs": [
              {
                "id": "tm-1",
                "left": "合理安排时间",
                "right": "Sắp xếp thời gian hợp lý"
              },
              {
                "id": "tm-2",
                "left": "明确优先级",
                "right": "Xác định rõ việc ưu tiên"
              },
              {
                "id": "tm-3",
                "left": "缓解压力",
                "right": "Xoa dịu / Giải tỏa áp lực"
              },
              {
                "id": "tm-4",
                "left": "工作生活平衡",
                "right": "Cân bằng giữa công việc & cuộc sống"
              }
            ],
            "explanation": "优先级 (yōuxiānjí: mức độ ưu tiên), 缓解压力 (giảm nhẹ stress)."
          },
          {
            "id": "c-4-5-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Học cách sắp xếp thời gian hợp lý giúp nâng cao hiệu suất công việc rất nhiều.\"",
            "chineseAudioText": "学会合理安排时间能极大提高工作效率。",
            "pinyinAudioText": "Xuéhuì hélǐ ānpái shíjiān néng jídà tígāo gōngzuò xiàolǜ.",
            "tokens": [
              "学会合理安排时间",
              "能极大提高",
              "工作效率",
              "压力",
              "晋升"
            ],
            "correctTokens": [
              "学会合理安排时间",
              "能极大提高",
              "工作效率"
            ],
            "explanation": "极大提高效率 (nâng cao hiệu suất một cách tối đa)."
          }
        ]
      },
      {
        "id": "node-hsk4-5-3",
        "unitNumber": 5,
        "title": "Kỹ năng lãnh đạo & Tinh thần đồng đội",
        "subtitle": "团队精神 · 领导力 · 激励团队 · 达成目标",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-5-3-1",
            "type": "match_pairs",
            "prompt": "Nối năng lực quản lý:",
            "matchPairs": [
              {
                "id": "ld-1",
                "left": "领导力",
                "right": "Khả năng lãnh đạo"
              },
              {
                "id": "ld-2",
                "left": "团队精神",
                "right": "Tinh thần đồng đội"
              },
              {
                "id": "ld-3",
                "left": "激励员工",
                "right": "Khích lệ tinh thần nhân viên"
              },
              {
                "id": "ld-4",
                "left": "达成目标",
                "right": "Đạt được mục tiêu đề ra"
              }
            ],
            "explanation": "领导力 (lǐngdǎolì: năng lực lãnh đạo), 激励 (jīlì: khích lệ)."
          },
          {
            "id": "c-4-5-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Một nhà lãnh đạo xuất sắc luôn biết cách khích lệ tinh thần mọi người.\"",
            "chineseAudioText": "优秀的领导总是善于激励团队成员。",
            "pinyinAudioText": "Yōuxiù de lǐngdǎo zǒngshì shànyú jīlì tuánduì chéngyuán.",
            "tokens": [
              "优秀的领导",
              "总是善于",
              "激励团队成员",
              "时间",
              "安排"
            ],
            "correctTokens": [
              "优秀的领导",
              "总是善于",
              "激励团队成员"
            ],
            "explanation": "善于 (shànyú: giỏi về, thành thạo) + 激励 (khích lệ)."
          }
        ]
      },
      {
        "id": "node-hsk4-5-4",
        "unitNumber": 5,
        "title": "Cúp Vinh Quang Thăng Tiến",
        "subtitle": "Bước lên đỉnh cao sự nghiệp & Khẳng định giá trị bản thân",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-5-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu châm ngôn sự nghiệp:",
            "chineseAudioText": "机会永远留给有准备的人，全力以赴追求卓越。",
            "pinyinAudioText": "Jīhuì yǒngyuǎn liú gěi yǒu zhǔnbèi de rén, quánlìyǐfù zhuīqiú zhuóyuè.",
            "tokens": [
              "机会永远留给",
              "有准备的人",
              "全力以赴追求卓越",
              "竞争",
              "压力"
            ],
            "correctTokens": [
              "机会永远留给",
              "有准备的人",
              "全力以赴追求卓越"
            ],
            "explanation": "全力以赴 (quánlì yǐ fù: dốc toàn lực) + 追求卓越 (theo đuổi sự xuất chúng)."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-6",
    "unitNumber": 6,
    "level": 4,
    "title": "Unit 6: Tài chính cá nhân & Ngân hàng (个人财务与投资)",
    "description": "Dịch vụ ngân hàng, quản lý thu chi cá nhân, đầu tư quỹ cổ phiếu và quản trị rủi ro tài chính an toàn.",
    "themeColor": "#2563eb",
    "nodes": [
      {
        "id": "node-hsk4-6-1",
        "unitNumber": 6,
        "title": "Dịch vụ ngân hàng & Giao dịch",
        "subtitle": "银行卡 · 存钱 · 汇款 · 密码 · 投资",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-6-1-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ tài chính ngân hàng:",
            "matchPairs": [
              {
                "id": "bk-1",
                "left": "汇款",
                "right": "Chuyển tiền / Gửi tiền liên ngân hàng"
              },
              {
                "id": "bk-2",
                "left": "存钱",
                "right": "Gửi tiết kiệm"
              },
              {
                "id": "bk-3",
                "left": "密码",
                "right": "Mật khẩu bảo mật"
              },
              {
                "id": "bk-4",
                "left": "利息",
                "right": "Tiền lãi / Lãi suất"
              }
            ],
            "explanation": "汇款 (huìkuǎn: chuyển khoản), 利息 (lìxī: tiền lãi)."
          },
          {
            "id": "c-4-6-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Xin vui lòng nhập mật khẩu 6 chữ số trên bàn phím.\"",
            "chineseAudioText": "请在键盘上输入六位数密码。",
            "pinyinAudioText": "Qǐng zài jiànpán shang shūrù liù wèi shù mìmǎ.",
            "tokens": [
              "请在键盘上",
              "输入",
              "六位数密码",
              "汇款",
              "利息"
            ],
            "correctTokens": [
              "请在键盘上",
              "输入",
              "六位数密码"
            ],
            "explanation": "输入密码 (shūrù mìmǎ: nhập mật khẩu)."
          }
        ]
      },
      {
        "id": "node-hsk4-6-2",
        "unitNumber": 6,
        "title": "Quản lý chi tiêu & Tiết kiệm thông minh",
        "subtitle": "合理规划 · 记账 · 避免浪费 · 稳健理财",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-6-2-1",
            "type": "match_pairs",
            "prompt": "Nối thói quen tài chính lành mạnh:",
            "matchPairs": [
              {
                "id": "fn-1",
                "left": "记账",
                "right": "Ghi chép sổ thu chi"
              },
              {
                "id": "fn-2",
                "left": "避免浪费",
                "right": "Tránh lãng phí tiền bạc"
              },
              {
                "id": "fn-3",
                "left": "稳健理财",
                "right": "Quản lý tài chính vững chắc"
              },
              {
                "id": "fn-4",
                "left": "应急资金",
                "right": "Quỹ dự phòng khẩn cấp"
              }
            ],
            "explanation": "记账 (jìzhàng: ghi sổ chi tiêu), 应急资金 (quỹ khẩn cấp)."
          },
          {
            "id": "c-4-6-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Mỗi tháng ghi chép các khoản chi tiêu giúp tránh lãng phí tiền không cần thiết.\"",
            "chineseAudioText": "每月记账有助于避免不必要的消费浪费。",
            "pinyinAudioText": "Měiyuè jìzhàng yǒuzhùyú bìmiǎn bú bìyào de xiāofèi làngfèi.",
            "tokens": [
              "每月记账",
              "有助于避免",
              "不必要的消费浪费",
              "密码",
              "汇款"
            ],
            "correctTokens": [
              "每月记账",
              "有助于避免",
              "不必要的消费浪费"
            ],
            "explanation": "避免不必要的浪费 (tránh lãng phí không cần thiết)."
          }
        ]
      },
      {
        "id": "node-hsk4-6-3",
        "unitNumber": 6,
        "title": "Đầu tư dài hạn & Đánh giá rủi ro",
        "subtitle": "股票市场 · 基金定投 · 长期收益 · 谨慎决策",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-6-3-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ thị trường tài chính:",
            "matchPairs": [
              {
                "id": "iv-1",
                "left": "股票",
                "right": "Cổ phiếu"
              },
              {
                "id": "iv-2",
                "left": "基金",
                "right": "Chứng chỉ quỹ đầu tư"
              },
              {
                "id": "iv-3",
                "left": "长期收益",
                "right": "Lợi nhuận dài hạn"
              },
              {
                "id": "iv-4",
                "left": "谨慎决策",
                "right": "Quyết định thận trọng"
              }
            ],
            "explanation": "股票 (gǔpiào: cổ phiếu), 收益 (shōuyì: lợi nhuận thu về)."
          },
          {
            "id": "c-4-6-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Đầu tư tài chính luôn đi kèm với rủi ro, cần phải thận trọng.\"",
            "chineseAudioText": "投资理财伴随着风险，必须保持谨慎。",
            "pinyinAudioText": "Tóuzī lǐcái bànsuí zhe fēngxiǎn, bìxū bǎochí jǐnshèn.",
            "tokens": [
              "投资理财",
              "伴随着风险",
              "必须保持谨慎",
              "记账",
              "存钱"
            ],
            "correctTokens": [
              "投资理财",
              "伴随着风险",
              "必须保持谨慎"
            ],
            "explanation": "保持谨慎 (bǎochí jǐnshèn: giữ sự thận trọng)."
          }
        ]
      },
      {
        "id": "node-hsk4-6-4",
        "unitNumber": 6,
        "title": "Cúp Vinh Quang Tài Chính",
        "subtitle": "Làm chủ tài chính cá nhân & Vững bước thịnh vượng",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-6-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu triết lý quản lý tài sản:",
            "chineseAudioText": "合理配置资产，不把鸡蛋放在同一个篮子里。",
            "pinyinAudioText": "Hélǐ pèizhì zīchǎn, bù bǎ jīdàn fàng zài tóng yí gè lánzi lǐ.",
            "tokens": [
              "合理配置资产",
              "不把鸡蛋",
              "放在同一个篮子里",
              "投资",
              "股票"
            ],
            "correctTokens": [
              "合理配置资产",
              "不把鸡蛋",
              "放在同一个篮子里"
            ],
            "explanation": "Không bỏ hết trứng vào một giỏ - quy tắc vàng phân bổ tài sản."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-7",
    "unitNumber": 7,
    "level": 4,
    "title": "Unit 7: Trí tuệ nhân tạo & Công nghệ (人工智能与未来科技)",
    "description": "Kỷ nguyên AI, robot tự động hóa, phân tích dữ liệu lớn và đạo đức công nghệ bảo vệ quyền riêng tư.",
    "themeColor": "#4f46e5",
    "nodes": [
      {
        "id": "node-hsk4-7-1",
        "unitNumber": 7,
        "title": "Kỷ nguyên AI thông minh & Robot",
        "subtitle": "人工智能 · 科技 · 创新 · 机器人 · 自动",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-7-1-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ công nghệ tiên phong:",
            "matchPairs": [
              {
                "id": "ai-1",
                "left": "人工智能",
                "right": "Trí tuệ nhân tạo (AI)"
              },
              {
                "id": "ai-2",
                "left": "创新",
                "right": "Đổi mới sáng tạo"
              },
              {
                "id": "ai-3",
                "left": "自动化",
                "right": "Tự động hóa"
              },
              {
                "id": "ai-4",
                "left": "机器人",
                "right": "Người máy / Robot"
              }
            ],
            "explanation": "人工智能 (réngōng zhìnéng: AI), 创新 (chuàngxīn: đổi mới sáng tạo)."
          },
          {
            "id": "c-4-7-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Công nghệ trí tuệ nhân tạo đang thay đổi sâu sắc cuộc sống của chúng ta.\"",
            "chineseAudioText": "人工智能技术正在深刻改变我们的生活。",
            "pinyinAudioText": "Réngōng zhìnéng jìshù zhèngzài shēnkè gǎibiàn wǒmen de shēnghuó.",
            "tokens": [
              "人工智能技术",
              "正在深刻改变",
              "我们的生活",
              "自动化",
              "创新"
            ],
            "correctTokens": [
              "人工智能技术",
              "正在深刻改变",
              "我们的生活"
            ],
            "explanation": "深刻改变 (shēnkè gǎibiàn: thay đổi sâu sắc)."
          }
        ]
      },
      {
        "id": "node-hsk4-7-2",
        "unitNumber": 7,
        "title": "Dữ liệu lớn & Tự động hóa sản xuất",
        "subtitle": "大数据分析 · 自动化流水线 · 改变生活 · 发展趋势",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-7-2-1",
            "type": "match_pairs",
            "prompt": "Nối thuật ngữ công nghệ 4.0:",
            "matchPairs": [
              {
                "id": "bd-1",
                "left": "大数据",
                "right": "Dữ liệu lớn (Big Data)"
              },
              {
                "id": "bd-2",
                "left": "云计算",
                "right": "Điện toán đám mây"
              },
              {
                "id": "bd-3",
                "left": "发展趋势",
                "right": "Xu hướng phát triển tất yếu"
              },
              {
                "id": "bd-4",
                "left": "算法",
                "right": "Thuật toán"
              }
            ],
            "explanation": "大数据 (dàshùjù: big data), 发展趋势 (xu thế phát triển)."
          },
          {
            "id": "c-4-7-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Dữ liệu lớn giúp doanh nghiệp đưa ra những quyết định chuẩn xác hơn.\"",
            "chineseAudioText": "大数据帮助企业做出更加准确的决策。",
            "pinyinAudioText": "Dàshùjù bāngzhù qǐyè zuòchū gèngjiā zhǔnquè de juécè.",
            "tokens": [
              "大数据帮助企业",
              "做出更加准确的",
              "决策",
              "机器人",
              "网络"
            ],
            "correctTokens": [
              "大数据帮助企业",
              "做出更加准确的",
              "决策"
            ],
            "explanation": "准确的决策 (zhǔnquè de juécè: quyết sách chuẩn xác)."
          }
        ]
      },
      {
        "id": "node-hsk4-7-3",
        "unitNumber": 7,
        "title": "Trách nhiệm đạo đức & Tương lai nhân loại",
        "subtitle": "道德伦理 · 隐私保护 · 科技向善 · 共同繁荣",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-7-3-1",
            "type": "match_pairs",
            "prompt": "Nối giá trị nhân văn trong công nghệ:",
            "matchPairs": [
              {
                "id": "et-1",
                "left": "隐私保护",
                "right": "Bảo vệ quyền riêng tư cá nhân"
              },
              {
                "id": "et-2",
                "left": "科技向善",
                "right": "Công nghệ phục vụ điều tốt đẹp"
              },
              {
                "id": "et-3",
                "left": "伦理道德",
                "right": "Luân lý và đạo đức"
              },
              {
                "id": "et-4",
                "left": "安全保障",
                "right": "Bảo đảm an toàn bảo mật"
              }
            ],
            "explanation": "科技向善 (kējì xiàngshàn: công nghệ phụng sự con người)."
          },
          {
            "id": "c-4-7-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Phát triển công nghệ cao phải luôn đặt sự an toàn và quyền riêng tư của con người lên hàng đầu.\"",
            "chineseAudioText": "发展高科技必须始终把人类安全与隐私放在第一位。",
            "pinyinAudioText": "Fāzhǎn gāo kējì bìxū shǐzhōng bǎ rénlèi ānquán yǔ yǐnsī fàng zài dì-yī wèi.",
            "tokens": [
              "发展高科技",
              "必须始终把",
              "人类安全与隐私",
              "放在第一位",
              "大数据"
            ],
            "correctTokens": [
              "发展高科技",
              "必须始终把",
              "人类安全与隐私",
              "放在第一位"
            ],
            "explanation": "放在第一位 (fàng zài dì-yī wèi: đặt lên vị trí số một)."
          }
        ]
      },
      {
        "id": "node-hsk4-7-4",
        "unitNumber": 7,
        "title": "Cúp Vinh Quang Kỹ Thuật Số",
        "subtitle": "Tiên phong làm chủ công nghệ tương lai thông minh",
        "type": "trophy",
        "xpReward": 50,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-7-4-1",
            "type": "word_bank",
            "prompt": "Ghép câu khẩu hiệu đổi mới sáng tạo:",
            "chineseAudioText": "科技赋能未来，智慧照亮世界。",
            "pinyinAudioText": "Kējì fùnéng wèilái, zhìhuì zhàoliàng shìjiè.",
            "tokens": [
              "科技赋能未来",
              "智慧",
              "照亮世界",
              "隐私",
              "决策"
            ],
            "correctTokens": [
              "科技赋能未来",
              "智慧",
              "照亮世界"
            ],
            "explanation": "Công nghệ tiếp sức tương lai, trí tuệ soi sáng thế giới."
          }
        ]
      }
    ]
  },
  {
    "id": "unit-hsk4-8",
    "unitNumber": 8,
    "level": 4,
    "title": "Unit 8: Nghệ thuật giao tiếp & Tâm lý ứng xử (人际交往与沟通艺术)",
    "description": "Nghệ thuật lắng nghe tích cực, kỹ năng từ chối khéo léo, hóa giải bất đồng và phong thái ứng xử đĩnh đạc.",
    "themeColor": "#e11d48",
    "nodes": [
      {
        "id": "node-hsk4-8-1",
        "unitNumber": 8,
        "title": "Lắng nghe chân thành & Đồng cảm",
        "subtitle": "交流 · 倾听 · 尊重 · 鼓励 · 共同 · 态度",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-8-1-1",
            "type": "match_pairs",
            "prompt": "Nối từ vựng giao tiếp tâm lý:",
            "matchPairs": [
              {
                "id": "cm-1",
                "left": "倾听",
                "right": "Lắng nghe chân thành"
              },
              {
                "id": "cm-2",
                "left": "尊重",
                "right": "Tôn trọng"
              },
              {
                "id": "cm-3",
                "left": "理解",
                "right": "Thấu hiểu / Cảm thông"
              },
              {
                "id": "cm-4",
                "left": "鼓励",
                "right": "Khích lệ / Động viên"
              }
            ],
            "explanation": "倾听 (qīngtīng: chăm chú lắng nghe), 尊重 (zūnzhòng: tôn trọng)."
          },
          {
            "id": "c-4-8-1-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Học cách lắng nghe người khác là bước đầu tiên của giao tiếp tốt đẹp.\"",
            "chineseAudioText": "学会倾听是良好沟通的第一步。",
            "pinyinAudioText": "Xuéhuì qīngtīng shì liánghǎo gōutōng de dì-yī bù.",
            "tokens": [
              "学会倾听",
              "是良好沟通的",
              "第一步",
              "尊重",
              "幽默"
            ],
            "correctTokens": [
              "学会倾听",
              "是良好沟通的",
              "第一步"
            ],
            "explanation": "良好沟通 (liánghǎo gōutōng: giao tiếp tốt đẹp)."
          }
        ]
      },
      {
        "id": "node-hsk4-8-2",
        "unitNumber": 8,
        "title": "Nghệ thuật từ chối & Hóa giải mâu thuẫn",
        "subtitle": "委婉拒绝 · 换位思考 · 化解误会 · 保持修养",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-8-2-1",
            "type": "match_pairs",
            "prompt": "Nối kỹ năng ứng xử tinh tế:",
            "matchPairs": [
              {
                "id": "rj-1",
                "left": "委婉拒绝",
                "right": "Từ chối khéo léo"
              },
              {
                "id": "rj-2",
                "left": "换位思考",
                "right": "Đặt mình vào vị trí người khác"
              },
              {
                "id": "rj-3",
                "left": "化解误会",
                "right": "Hóa giải hiểu lầm"
              },
              {
                "id": "rj-4",
                "left": "保持修养",
                "right": "Giữ gìn phẩm cách tu dưỡng"
              }
            ],
            "explanation": "委婉 (wěiwǎn: khéo léo, uyển chuyển), 换位思考 (đặt mình vào người khác)."
          },
          {
            "id": "c-4-8-2-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Khi xảy ra bất đồng quan điểm, hãy bình tĩnh đổi vị trí suy nghĩ cho đối phương.\"",
            "chineseAudioText": "发生意见分歧时，学会换位思考非常重要。",
            "pinyinAudioText": "Fāshēng yìjiàn fēnqí shí, xuéhuì huànwèi sīkǎo fēicháng zhòngyào.",
            "tokens": [
              "发生意见分歧时",
              "学会换位思考",
              "非常重要",
              "倾听",
              "拒绝"
            ],
            "correctTokens": [
              "发生意见分歧时",
              "学会换位思考",
              "非常重要"
            ],
            "explanation": "意见分歧 (ý kiến bất đồng) + 换位思考 (đặt mình vào vị trí đối phương)."
          }
        ]
      },
      {
        "id": "node-hsk4-8-3",
        "unitNumber": 8,
        "title": "Ngôn ngữ hài hước & Sức hút cá nhân",
        "subtitle": "幽默感 · 活跃气氛 · 留下深刻印象 · 人格魅力",
        "type": "lesson",
        "xpReward": 30,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-8-3-1",
            "type": "match_pairs",
            "prompt": "Nối phẩm chất thu hút trong giao tiếp:",
            "matchPairs": [
              {
                "id": "hm-1",
                "left": "幽默感",
                "right": "Khiếu hài hước dí dỏm"
              },
              {
                "id": "hm-2",
                "left": "活跃气氛",
                "right": "Khuấy động bầu không khí"
              },
              {
                "id": "hm-3",
                "left": "人格魅力",
                "right": "Sức hút nhân cách"
              },
              {
                "id": "hm-4",
                "left": "留下深刻印象",
                "right": "Để lại ấn tượng sâu sắc"
              }
            ],
            "explanation": "幽默感 (yōumògǎn: khiếu hài hước), 人格魅力 (sức hút cá nhân)."
          },
          {
            "id": "c-4-8-3-2",
            "type": "word_bank",
            "prompt": "Ghép câu: \"Một chút hài hước đúng lúc có thể khiến cuộc trò chuyện thêm vui vẻ.\"",
            "chineseAudioText": "恰当的幽默能让谈话更加轻松愉快。",
            "pinyinAudioText": "Qiàdàng de yōumò néng ràng tánhuà gèngjiā qīngsōng yúkuài.",
            "tokens": [
              "恰当的幽默",
              "能让谈话",
              "更加轻松愉快",
              "倾听",
              "误会"
            ],
            "correctTokens": [
              "恰当的幽默",
              "能让谈话",
              "更加轻松愉快"
            ],
            "explanation": "恰当的幽默 (hài hước vừa đúng mực) + 轻松愉快 (thoải mái vui vẻ)."
          }
        ]
      },
      {
        "id": "node-hsk4-8-4",
        "unitNumber": 8,
        "title": "Đại Cúp Vinh Quang HSK 4 Toàn Diện",
        "subtitle": "Tốt nghiệp toàn bộ Lộ Trình HSK 4 Cao Cấp · Chinh Phục Cảnh Giới Mới",
        "type": "trophy",
        "xpReward": 80,
        "status": "locked",
        "stars": 0,
        "challenges": [
          {
            "id": "c-4-8-4-1",
            "type": "word_bank",
            "prompt": "Ghép lời chúc tốt nghiệp vinh quang HSK 4:",
            "chineseAudioText": "学无止境，勇攀高峰，祝贺你成功征服HSK 4全级别！",
            "pinyinAudioText": "Xuéwúzhǐjìng, yǒng pān gāofēng, zhùhè nǐ chénggōng zhēngfú HSK 4 quán jíbié!",
            "tokens": [
              "学无止境勇攀高峰",
              "祝贺你成功征服",
              "HSK 4全级别",
              "沟通",
              "倾听"
            ],
            "correctTokens": [
              "学无止境勇攀高峰",
              "祝贺你成功征服",
              "HSK 4全级别"
            ],
            "explanation": "勇攀高峰 (dũng cảm leo lên đỉnh cao mới) + 征服全级别 (chinh phục trọn vẹn toàn cấp độ)."
          }
        ]
      }
    ]
  }
];
