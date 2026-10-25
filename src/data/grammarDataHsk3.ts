import type { LessonDetail } from './grammarData';

export const HSK3_GRAMMAR_DETAILS: Record<string, LessonDetail> = {
  '01': {
    lessonNumber: '01',
    grammarPoints: [
      {
        id: 'g-hsk3-01-1',
        title: '1. Câu chữ 把 (Biểu thị sự tác động làm thay đổi vị trí, trạng thái)',
        formula: 'Chủ ngữ (S) + 把 + Tân ngữ (O) + Động từ (V) + Thành phần khác (在/到/给/Kết quả)',
        explanation:
          'Câu chữ 把 được dùng khi người nói muốn nhấn mạnh hành động tác động lên một đối tượng cụ thể (đã xác định) và làm thay đổi vị trí hoặc trạng thái của đối tượng đó. Sau động từ bắt buộc phải có thành phần khác như 在, 到, 给 hoặc bổ ngữ kết quả.',
        examples: [
          { cn: '请把书放在桌子上。', pinyin: 'Qǐng bǎ shū fàng zài zhuōzi shang.', vi: 'Xin hãy để sách lên trên bàn.' },
          { cn: '我已经把作业做完了。', pinyin: 'Wǒ yǐjīng bǎ zuòyè zuò wán le.', vi: 'Tôi đã làm xong bài tập rồi.' },
          { cn: '你把这封信寄给李老师吧。', pinyin: 'Nǐ bǎ zhè fēng xìn jì gěi Lǐ lǎoshī ba.', vi: 'Bạn gửi bức thư này cho thầy Lý đi.' },
        ],
        pitfall:
          'Bẫy thi HSK 3: Động từ trong câu chữ 把 không được đứng trơ trọi một mình (Ví dụ sai: 我把苹果吃。-> Phải nói: 我把苹果吃了). Ngoài ra, phó từ phủ định (没/不) và động từ năng nguyện (想/要/能) phải đứng TRƯỚC chữ 把.',
      },
      {
        id: 'g-hsk3-01-2',
        title: '2. Động từ năng nguyện 打算 (Dự định, tính toán)',
        formula: 'S + 打算 + Động từ / Cụm vị ngữ',
        explanation:
          '打算 (dǎsuan) có thể làm động từ mang ý nghĩa "dự định làm gì", hoặc làm danh từ mang nghĩa "kế hoạch, dự định".',
        examples: [
          { cn: '周末你打算做什么？', pinyin: 'Zhōumò nǐ dǎsuan zuò shénme?', vi: 'Cuối tuần bạn dự định làm gì?' },
          { cn: '我打算跟朋友去爬山。', pinyin: 'Wǒ dǎsuan gēn péngyou qù páshān.', vi: 'Tôi dự định cùng bạn đi leo núi.' },
        ],
        pitfall: 'Dạng danh từ thường đi với 有 (我有新的打算 - Tôi có dự tính mới).',
      },
      {
        id: 'g-hsk3-01-3',
        title: '3. Phó từ 一直 (Liên tục, suốt)',
        formula: 'S + 一直 + Động từ / Tính từ',
        explanation:
          '一直 (yìzhí) biểu thị một hành động hoặc trạng thái diễn ra liên tục không ngừng nghỉ trong suốt một khoảng thời gian, hoặc phương hướng đi thẳng một mạch.',
        examples: [
          { cn: '他一直在北方工作。', pinyin: 'Tā yìzhí zài běifāng gōngzuò.', vi: 'Anh ấy suốt thời gian qua đều làm việc ở miền Bắc.' },
          { cn: '从这儿一直往前走。', pinyin: 'Cóng zhèr yìzhí wǎng qián zǒu.', vi: 'Từ đây cứ đi thẳng về phía trước.' },
        ],
        pitfall: 'Phân biệt 一直 (liên tục không ngắt quãng) và 总是 (thường xuyên, tần suất cao nhưng có ngắt quãng).',
      },
    ],
    keyVocab: [
      { hanzi: '打算', pinyin: 'dǎsuan', hanViet: 'Đả toán', meaning: 'Dự định, kế hoạch' },
      { hanzi: '一直', pinyin: 'yìzhí', hanViet: 'Nhất trực', meaning: 'Suốt, liên tục, thẳng' },
      { hanzi: '作业', pinyin: 'zuòyè', hanViet: 'Tác nghiệp', meaning: 'Bài tập về nhà' },
      { hanzi: '复习', pinyin: 'fùxí', hanViet: 'Phục tập', meaning: 'Ôn tập' },
      { hanzi: '着急', pinyin: 'zháojí', hanViet: 'Trước cấp', meaning: 'Sốt ruột, lo lắng' },
    ],
    dialogue: {
      title: 'Bài khóa 2: Leo núi rèn luyện sức khỏe',
      lines: [
        { speaker: 'A', cn: '你走得太快了，我的腿有点儿疼。', pinyin: 'Nǐ zǒu de tài kuài le, wǒ de tuǐ yǒudiǎnr téng.', vi: 'Bạn đi nhanh quá rồi, chân tôi hơi đau.' },
        { speaker: 'B', cn: '虽然爬山很累，但是风景越来越美了。', pinyin: 'Suīrán páshān hěn lèi, dànshì fēngjǐng yuèláiyuè měi le.', vi: 'Tuy leo núi rất mệt, nhưng phong cảnh càng lúc càng đẹp.' },
      ],
    },
  },

  '03': {
    lessonNumber: '03',
    grammarPoints: [
      {
        id: 'g-hsk3-03-1',
        title: '1. Câu chữ 被 (Câu bị động)',
        formula: 'Chủ ngữ (Người/Vật bị tác động) + 被 (叫/让) + Tác nhân gây ra + Động từ + Thành phần khác',
        explanation:
          'Biểu thị ý bị động, thường diễn tả sự việc xảy ra ngoài ý muốn hoặc gây ra hậu quả không mong đợi.',
        examples: [
          { cn: '蛋糕被弟弟吃了。', pinyin: 'Dàngāo bèi dìdi chī le.', vi: 'Bánh kem bị em trai ăn mất rồi.' },
          { cn: '我的自行车被偷了。', pinyin: 'Wǒ de zìxíngchē bèi tōu le.', vi: 'Xe đạp của tôi bị trộm rồi.' },
        ],
        pitfall: 'Trong câu chữ 被, tác nhân có thể lược bỏ (蛋糕被吃了). Nhưng với 叫 và 让 thì bắt buộc phải có tác nhân đi liền sau.',
      },
    ],
    keyVocab: [
      { hanzi: '瘦', pinyin: 'shòu', hanViet: 'Sấu', meaning: 'Gầy, ốm, chật' },
      { hanzi: '蛋糕', pinyin: 'dàngāo', hanViet: 'Đản cao', meaning: 'Bánh ngọt, bánh kem' },
      { hanzi: '衬衫', pinyin: 'chènshān', hanViet: 'Sấn sam', meaning: 'Áo sơ mi' },
    ],
    dialogue: {
      title: 'Bài khóa 3: Tách cà phê trên bàn (桌子上放着一杯咖啡)',
      lines: [
        { speaker: 'A', name: 'Đồng nghiệp', cn: '桌子上放着一杯咖啡，是谁的？', pinyin: 'Zhuōzi shang fàng zhe yì bēi kāfēi, shì shéi de?', vi: 'Trên bàn có để một tách cà phê, của ai vậy?' },
        { speaker: 'B', name: 'Lý Minh', cn: '那是王经理的，刚才被小张拿去热了一下。', pinyin: 'Nà shì Wáng jīnglǐ de, gāngcái bèi Xiǎo Zhāng ná qù rè le yíxià.', vi: 'Đó là của giám đốc Vương, lúc nãy vừa được Tiểu Trương mang đi hâm nóng lại rồi.' },
        { speaker: 'A', name: 'Đồng nghiệp', cn: '那我就不喝了，我还是去泡茶吧。', pinyin: 'Nà wǒ jiù bù hē le, wǒ háishì qù pào chá ba.', vi: 'Thế tôi không uống nữa, tôi đi pha trà vậy.' },
        { speaker: 'B', name: 'Lý Minh', cn: '柜子里放着新买的茶叶，随便喝！', pinyin: 'Guìzi lǐ fàng zhe xīn mǎi de cháyè, suíbiàn hē!', vi: 'Trong tủ có để lá trà mới mua đấy, cứ tự nhiên uống nhé!' },
      ],
    },
    },

  '04': {
    lessonNumber: '04',
    grammarPoints: [
      {
        id: 'g-hsk3-04-1',
        title: '1. Bổ ngữ khả năng (V + 得/不 + Bổ ngữ kết quả/xu hướng)',
        formula: 'Khẳng định: V + 得 + C / Phủ định: V + 不 + C',
        explanation:
          'Biểu thị năng lực chủ quan hoặc điều kiện khách quan có cho phép hành động đạt được kết quả/xu hướng nhất định hay không.',
        examples: [
          { cn: '我看得到黑板上的字。', pinyin: 'Wǒ kàn de dào hēibǎn shang de zì.', vi: 'Tôi nhìn thấy chữ trên bảng đen.' },
          { cn: '这么多菜，我吃不完。', pinyin: 'Zhème duō cài, wǒ chī bu wán.', vi: 'Nhiều món thế này, tôi ăn không hết.' },
        ],
        pitfall: 'Phủ định của bổ ngữ khả năng chỉ dùng 不, không bao giờ dùng 没 (Sai: 我没看完 -> Đây là bổ ngữ kết quả, không phải khả năng).',
      },
    ],
    keyVocab: [
      { hanzi: '清楚', pinyin: 'qīngchu', hanViet: 'Thanh sở', meaning: 'Rõ ràng' },
      { hanzi: '刚才', pinyin: 'gāngcái', hanViet: 'Cương tài', meaning: 'Vừa mới đây' },
      { hanzi: '帮忙', pinyin: 'bāngmáng', hanViet: 'Bang mang', meaning: 'Giúp đỡ' },
    ],
    dialogue: {
      title: 'Bài khóa 4: Phục vụ khách hàng nhiệt tình (她总是笑着跟客人说话)',
      lines: [
        { speaker: 'A', name: 'Khách hàng', cn: '那个新来的服务员态度真好。', pinyin: 'Nà ge xīn lái de fúwùyuán tàidu zhēn hǎo.', vi: 'Bạn nhân viên phục vụ mới đến kia thái độ tốt thật đấy.' },
        { speaker: 'B', name: 'Quản lý', cn: '是啊，她总是微笑着跟客人说话，大家都喜欢她。', pinyin: 'Shì a, tā zǒngshì wēixiào zhe gēn kèrén shuōhuà, dàjiā dōu xǐhuan tā.', vi: 'Đúng vậy, cô ấy luôn mỉm cười nói chuyện với khách, ai cũng quý mến cô ấy.' },
        { speaker: 'A', name: 'Khách hàng', cn: '无论多忙，她都能把事情安排得井井有条。', pinyin: 'Wúlùn duō máng, tā dōu néng bǎ shìqing ānpái de jǐngjǐng-yǒutiáo.', vi: 'Dù bận đến mấy, cô ấy cũng có thể sắp xếp công việc ngăn nắp chu đáo.' },
        { speaker: 'B', name: 'Quản lý', cn: '热情微笑是最好的名片！', pinyin: 'Rèqíng wēixiào shì zuì hǎo de míngpiàn!', vi: 'Nụ cười nhiệt tình chính là tấm danh thiếp tuyệt vời nhất!' },
      ],
    },
    },

  '05': {
    lessonNumber: '05',
    grammarPoints: [
      {
        id: 'g-hsk3-05-1',
        title: '1. Cấu trúc 除了...以外，还/也/都... (Ngoài... ra)',
        formula: '除了 + A + 以外，还 / 都 + B',
        explanation:
          'Mang 2 nghĩa: (1) Bao gồm: Ngoài A ra, còn có B (dùng 还/也). (2) Loại trừ: Ngoài A ra, tất cả đều B (dùng 都).',
        examples: [
          { cn: '除了汉语以外，他还会说法语。', pinyin: 'Chúle Hànyǔ yǐwài, tā hái huì shuō Fǎyǔ.', vi: 'Ngoài tiếng Hán ra, anh ấy còn biết nói tiếng Pháp.' },
          { cn: '除了小李以外，大家都要去。', pinyin: 'Chúle Xiǎo Lǐ yǐwài, dàjiā dōu yào qù.', vi: 'Ngoại trừ Tiểu Lý ra, mọi người đều muốn đi.' },
        ],
        pitfall: 'Khi mang nghĩa loại trừ, bắt buộc dùng 都 hoặc 全 ở vế sau, không dùng 还.',
      },
    ],
    keyVocab: [
      { hanzi: '除了', pinyin: 'chúle', hanViet: 'Trừ liễu', meaning: 'Ngoài ra, trừ ra' },
      { hanzi: '极了', pinyin: 'jí le', hanViet: 'Cực liễu', meaning: 'Vô cùng, cực kỳ' },
      { hanzi: '兴趣', pinyin: 'xìngqù', hanViet: 'Hứng thú', meaning: 'Sở thích, hứng thú' },
    ],
    dialogue: {
      title: 'Bài khóa 5: Chế độ tập luyện giảm cân (我最近越来越胖了)',
      lines: [
        { speaker: 'A', name: 'Tiểu Mỹ', cn: '我最近越来越胖了，以前的裤子都穿不下了。', pinyin: 'Wǒ zuìjìn yuèláiyuè pàng le, yǐqián de kùzi dōu chuān bú xià le.', vi: 'Dạo này mình càng ngày càng béo, quần trước đây đều mặc không vừa nữa rồi.' },
        { speaker: 'B', name: 'Tiểu Lâm', cn: '除了每天少吃甜食以外，你还要多运动。', pinyin: 'Chúle měitiān shǎo chī tiánshí yǐwài, nǐ hái yào duō yùndòng.', vi: 'Ngoài việc mỗi ngày bớt ăn đồ ngọt ra, bạn còn phải vận động nhiều nữa.' },
        { speaker: 'A', name: 'Tiểu Mỹ', cn: '明天早上我们一起去公园跑步，怎么样？', pinyin: 'Míngtiān zǎoshang wǒmen yìqǐ qù gōngyuán pǎobù, zěnmeyàng?', vi: 'Sáng mai chúng mình cùng đi công viên chạy bộ, thấy thế nào?' },
        { speaker: 'B', name: 'Tiểu Lâm', cn: '没问题，六点半在公园门口见！', pinyin: 'Méi wèntí, liù diǎn bàn zài gōngyuán ménkǒu jiàn!', vi: 'Không vấn đề, sáu rưỡi gặp ở cổng công viên nhé!' },
      ],
    },
    },

  '06': {
    lessonNumber: '06',
    grammarPoints: [
      {
        id: 'g-hsk3-06-1',
        title: '1. So sánh 刚才 (Vừa nãy - Danh từ thời gian) và 刚 (Vừa mới - Phó từ)',
        formula: '刚才: Đứng trước/sau chủ ngữ | 刚: Luôn đứng sau chủ ngữ trước động từ',
        explanation:
          '刚才 là danh từ chỉ thời gian gần đây (vài phút trước), có thể làm định ngữ (刚才的事情). Còn 刚 là phó từ chỉ hành động vừa mới xảy ra, không làm định ngữ được.',
        examples: [
          { cn: '我刚才去洗手间了。', pinyin: 'Wǒ gāngcái qù xǐshǒujiān le.', vi: 'Vừa nãy tôi đi nhà vệ sinh rồi.' },
          { cn: '我们刚来中国两个月。', pinyin: 'Wǒmen gāng lái Zhōngguó liǎng gè yuè.', vi: 'Chúng tôi vừa mới đến Trung Quốc được 2 tháng.' },
        ],
        pitfall: 'Không nói: 刚的事情 (Sai). Phải nói: 刚才的事情 (Đúng).',
      },
    ],
    keyVocab: [
      { hanzi: '眼镜', pinyin: 'yǎnjìng', hanViet: 'Nhãn kính', meaning: 'Kính mắt' },
      { hanzi: '特别', pinyin: 'tèbié', hanViet: 'Đặc biệt', meaning: 'Đặc biệt, vô cùng' },
      { hanzi: '突然', pinyin: 'tūrán', hanViet: 'Đột nhiên', meaning: 'Đột nhiên, bất ngờ' },
    ],
    dialogue: {
      title: 'Bài khóa 6: Đột nhiên bị cảm lạnh (你怎么突然生病了？)',
      lines: [
        { speaker: 'A', name: 'Đồng nghiệp', cn: '你看上去脸色不太好，怎么突然生病了？', pinyin: 'Nǐ kàn shàngqu liǎnsè bú tài hǎo, zěnme tūrán shēngbìng le?', vi: 'Sắc mặt cậu trông không tốt lắm, sao tự nhiên lại ốm thế?' },
        { speaker: 'B', name: 'Tiểu Cương', cn: '昨天吹了一晚上空调，刚起来就觉得头疼发烧。', pinyin: 'Zuótiān chuī le yì wǎnshang kōngtiáo, gāng qǐlái jiù juéde tóuténg fāshāo.', vi: 'Hôm qua bật điều hòa cả đêm, vừa mới dậy là thấy đau đầu sốt luôn.' },
        { speaker: 'A', name: 'Đồng nghiệp', cn: '快去医院看医生吧，吃了药多休息。', pinyin: 'Kuài qù yīyuàn kàn yīshēng ba, chī le yào duō xiūxi.', vi: 'Mau đi bệnh viện khám bác sĩ đi, uống thuốc xong nghỉ ngơi nhiều vào.' },
        { speaker: 'B', name: 'Tiểu Cương', cn: '好的，我已经向经理请假了，谢谢关照。', pinyin: 'Hǎo de, wǒ yǐjīng xiàng jīnglǐ qǐngjià le, xièxie guānzhào.', vi: 'Được rồi, mình đã xin phép quản lý nghỉ rồi, cảm ơn bạn quan tâm nhé.' },
      ],
    },
    },

  '07': {
    lessonNumber: '07',
    grammarPoints: [
      {
        id: 'g-hsk3-07-1',
        title: '1. Cấu trúc 一...就... (Hễ... là... / Vừa... liền...)',
        formula: 'S + 一 + Hành động 1 + 就 + Hành động 2',
        explanation:
          'Biểu thị hai hành động nối tiếp nhau xảy ra rất mau lẹ, hoặc biểu thị điều kiện - kết quả tất yếu.',
        examples: [
          { cn: '他一听这首歌就想家。', pinyin: 'Tā yì tīng zhè shǒu gē jiù xiǎngjiā.', vi: 'Anh ấy hễ nghe bài hát này là lại nhớ nhà.' },
          { cn: '我一下课就给你打电话。', pinyin: 'Wǒ yí xiàkè jiù gěi nǐ dǎ diànhuà.', vi: 'Tôi vừa tan học là gọi điện cho bạn liền.' },
        ],
        pitfall: 'Nếu hai vế câu có hai chủ ngữ khác nhau, 就 phải đứng sau chủ ngữ thứ hai (你一来，我们就走).',
      },
    ],
    keyVocab: [
      { hanzi: '习惯', pinyin: 'xíguàn', hanViet: 'Tập quán', meaning: 'Thói quen, quen với' },
      { hanzi: '环境', pinyin: 'huánjìng', hanViet: 'Hoàn cảnh', meaning: 'Môi trường sống' },
      { hanzi: '饱', pinyin: 'bǎo', hanViet: 'Bão', meaning: 'No bụng' },
    ],
    dialogue: {
      title: 'Bài khóa 7: Cùng nhau đi siêu thị (我跟你一起去吧)',
      lines: [
        { speaker: 'A', name: 'Tiểu Lệ', cn: '冰箱里没有牛奶了，我打算去一趟超市。', pinyin: 'Bīngxiāng lǐ méiyǒu niúnǎi le, wǒ dǎsuan qù yí tàng chāoshì.', vi: 'Trong tủ lạnh hết sữa rồi, mình tính đi siêu thị một chuyến.' },
        { speaker: 'B', name: 'Tiểu Hoa', cn: '外面风大，我跟你一起去吧，顺便买点水果。', pinyin: 'Wàimiàn fēng dà, wǒ gēn nǐ yìqǐ qù ba, shùnbiàn mǎi diǎn shuǐguǒ.', vi: 'Bên ngoài gió to, mình đi cùng bạn nhé, tiện thể mua ít hoa quả.' },
        { speaker: 'A', name: 'Tiểu Lệ', cn: '我一出门就觉得冷，记得把大衣穿上。', pinyin: 'Wǒ yì chūmén jiù juéde lěng, jìde bǎ dàyī chuān shang.', vi: 'Mình hễ bước ra cửa là thấy lạnh buốt, nhớ mặc áo khoác dày vào nhé.' },
        { speaker: 'B', name: 'Tiểu Hoa', cn: '好嘞，穿好了，我们走吧！', pinyin: 'Hǎolei, chuān hǎo le, wǒmen zǒu ba!', vi: 'Được rồi, mặc xong rồi, chúng mình đi thôi!' },
      ],
    },
    },

  '08': {
    lessonNumber: '08',
    grammarPoints: [
      {
        id: 'g-hsk3-08-1',
        title: '1. Bổ ngữ xu hướng phức (Động từ + 上来/下去/进来/出来/回去/起来...)',
        formula: 'Động từ + Bổ ngữ xu hướng kép',
        explanation:
          'Kết hợp giữa động từ chỉ động tác và bổ ngữ xu hướng kép để biểu đạt hướng di chuyển cụ thể đối với người nói.',
        examples: [
          { cn: '请大家走进来。', pinyin: 'Qǐng dàjiā zǒu jìnlái.', vi: 'Xin mời mọi người bước vào đây.' },
          { cn: '太阳从东方升起来了。', pinyin: 'Tàiyáng cóng dōngfāng shēng qǐlái le.', vi: 'Mặt trời mọc lên từ hướng Đông rồi.' },
        ],
        pitfall: 'Nếu tân ngữ là từ chỉ nơi chốn, tân ngữ bắt buộc phải đứng trước 来/去 (Ví dụ: 走进教室来, không nói: 走进来教室).',
      },
    ],
    keyVocab: [
      { hanzi: '树', pinyin: 'shù', hanViet: 'Thụ', meaning: 'Cây cối' },
      { hanzi: '鸟', pinyin: 'niǎo', hanViet: 'Điểu', meaning: 'Chim chóc' },
      { hanzi: '绿', pinyin: 'lǜ', hanViet: 'Lục', meaning: 'Màu xanh lá' },
    ],
    dialogue: {
      title: 'Bài khóa 8: Lựa chọn địa điểm du lịch (你去哪儿我就去哪儿)',
      lines: [
        { speaker: 'A', name: 'Bạn trai', cn: '今年国庆节假期，你想去海边还是爬山？', pinyin: 'Jīnnián Guóqìngjié jiàqī, nǐ xiǎng qù hǎibiān háishì páshān?', vi: 'Kỳ nghỉ Quốc khánh năm nay, em muốn đi biển hay đi leo núi?' },
        { speaker: 'B', name: 'Bạn gái', cn: '只要跟你在一起，你去哪儿我就去哪儿。', pinyin: 'Zhǐyào gēn nǐ zài yìqǐ, nǐ qù nǎr wǒ jiù qù nǎr.', vi: 'Chỉ cần ở bên anh, anh đi đâu thì em đi đó.' },
        { speaker: 'A', name: 'Bạn trai', cn: '那我们先买高铁票去青岛看大海吧！', pinyin: 'Nà wǒmen xiān mǎi gāotiě piào qù Qīngdǎo kàn dàhǎi ba!', vi: 'Thế chúng ta mua vé tàu cao tốc đi Thanh Đảo ngắm biển trước nhé!' },
        { speaker: 'B', name: 'Bạn gái', cn: '太棒了！我把酒店也定下来。', pinyin: 'Tài bàng le! Wǒ bǎ jiǔdiàn yě dìng xiàlái.', vi: 'Tuyệt quá! Em sẽ đặt luôn phòng khách sạn.' },
      ],
    },
    },

  '09': {
    lessonNumber: '09',
    grammarPoints: [
      {
        id: 'g-hsk3-09-1',
        title: '1. Cặp từ quan hệ 只要...就... (Chỉ cần... là...)',
        formula: '只要 + Điều kiện cần thiết, 就 + Kết quả',
        explanation:
          'Biểu thị chỉ cần thỏa mãn một điều kiện nhất định là sẽ có kết quả tương ứng xảy ra.',
        examples: [
          { cn: '只要坚持努力，就一定能通过 HSK 3。', pinyin: 'Zhǐyào jiānchí nǔlì, jiù yídìng néng tōngguò HSK 3.', vi: 'Chỉ cần kiên trì nỗ lực là nhất định có thể đỗ HSK 3.' },
        ],
        pitfall: 'Phân biệt 只要...就... (chỉ cần là đủ) và 只有...才... (duy nhất điều kiện này mới được).',
      },
    ],
    keyVocab: [
      { hanzi: '坚持', pinyin: 'jiānchí', hanViet: 'Kiên trì', meaning: 'Kiên trì, bền bỉ' },
      { hanzi: '成功', pinyin: 'chénggōng', hanViet: 'Thành công', meaning: 'Thành công' },
      { hanzi: '努力', pinyin: 'nǔlì', hanViet: 'Nỗ lực', meaning: 'Cố gắng, nỗ lực' },
    ],
    dialogue: {
      title: 'Bài khóa 9: Luyện nói tiếng Trung thành thạo (她的汉语说得跟中国人一样好)',
      lines: [
        { speaker: 'A', name: 'Thầy giáo', cn: '安妮在中国只学了一年，汉语说得真流利。', pinyin: 'Ānnī zài Zhōngguó zhǐ xué le yì nián, Hànyǔ shuō de zhēn liúlì.', vi: 'Annie mới học ở Trung Quốc một năm mà nói tiếng Hán lưu loát thật.' },
        { speaker: 'B', name: 'Học sinh', cn: '是啊，她的发音跟中国人一样好，几乎听不出外国口音。', pinyin: 'Shì a, tā de fāyīn gēn Zhōngguó rén yíyàng hǎo, jīhū tīng bù chū wàiguó kǒuyīn.', vi: 'Đúng vậy ạ, phát âm của bạn ấy chuẩn như người bản xứ, hầu như không nghe ra giọng nước ngoài.' },
        { speaker: 'A', name: 'Thầy giáo', cn: '只要每天大声朗读，多跟当地人聊天，大家都能做到。', pinyin: 'Zhǐyào měitiān dàshēng lǎngdú, duō gēn dāngdì rén liáotiān, dàjiā dōu néng zuòdào.', vi: 'Chỉ cần mỗi ngày đọc to bài khóa, chăm trò chuyện với người bản địa thì ai cũng làm được thôi.' },
        { speaker: 'B', name: 'Học sinh', cn: '老师说得对，我们也要像她一样努力！', pinyin: 'Lǎoshī shuō de duì, wǒmen yě yào xiàng tā yíyàng nǔlì!', vi: 'Thầy nói rất đúng, chúng em cũng sẽ chăm chỉ như bạn ấy ạ!' },
      ],
    },
    },

  '10': {
    lessonNumber: '10',
    grammarPoints: [
      {
        id: 'g-hsk3-10-1',
        title: '1. Cấu trúc 又...又... (Vừa... lại vừa...)',
        formula: '又 + Tính từ 1 + 又 + Tính từ 2',
        explanation:
          'Dùng để miêu tả hai đặc điểm tính chất cùng song song tồn tại, hai tính chất này phải cùng mang nghĩa tích cực hoặc cùng tiêu cực.',
        examples: [
          { cn: '这儿的西瓜又大又甜。', pinyin: 'Zhèr de xīguā yòu dà yòu tián.', vi: 'Dưa hấu ở đây vừa to lại vừa ngọt.' },
          { cn: '这家饭馆的菜又便宜又好吃。', pinyin: 'Zhè jiā fànguǎn de cài yòu piányi yòu hǎochī.', vi: 'Món ăn của quán này vừa rẻ lại vừa ngon.' },
        ],
        pitfall: 'Không ghép 2 từ có ý nghĩa mâu thuẫn (Ví dụ sai: 又贵又便宜).',
      },
    ],
    keyVocab: [
      { hanzi: '甜', pinyin: 'tián', hanViet: 'Điềm', meaning: 'Ngọt ngào' },
      { hanzi: '新鲜', pinyin: 'xīnxiān', hanViet: 'Tân tiên', meaning: 'Tươi mới' },
      { hanzi: '便宜', pinyin: 'piányi', hanViet: 'Tiện nghi', meaning: 'Rẻ tiền' },
    ],
    dialogue: {
      title: 'Bài khóa 10: Lựa chọn môn học (数学比历史难多了)',
      lines: [
        { speaker: 'A', name: 'Tiểu Cường', cn: '这次期末考试，你觉得哪门课最难？', pinyin: 'Zhè cì qīmò kǎoshì, nǐ juéde nǎ mén kè zuì nán?', vi: 'Kỳ thi cuối kỳ đợt này, cậu thấy môn nào khó nhất?' },
        { speaker: 'B', name: 'Tiểu Phương', cn: '我觉得高等数学比中国历史难多了，公式又多又复杂。', pinyin: 'Wǒ juéde gāoděng shùxué bǐ Zhōngguó lìshǐ nán duō le, gōngshì yòu duō yòu fùzá.', vi: 'Mình thấy toán cao cấp khó hơn lịch sử Trung Quốc nhiều, công thức vừa nhiều vừa phức tạp.' },
        { speaker: 'A', name: 'Tiểu Cường', cn: '历史虽然要背很多年代，但是故事很有趣。', pinyin: 'Lìshǐ suīrán yào bèi hěn duō niándài, dànshì gùshi hěn yǒuqù.', vi: 'Lịch sử tuy phải học thuộc nhiều mốc thời gian nhưng các câu chuyện rất thú vị.' },
        { speaker: 'B', name: 'Tiểu Phương', cn: '今天下午去图书馆，你帮我补习数学好不好？', pinyin: 'Jīntiān xiàwǔ qù túshūguǎn, nǐ bāng wǒ bǔxí shùxué hǎo bù hǎo?', vi: 'Chiều nay ra thư viện, cậu phụ đạo toán cho mình được không?' },
      ],
    },
    },

  '11': {
    lessonNumber: '11',
    grammarPoints: [
      {
        id: 'g-hsk3-11-1',
        title: '1. Phó từ biểu thị ngữ khí 到底 (Rốt cuộc, cuối cùng)',
        formula: 'Chủ ngữ + 到底 + Câu hỏi',
        explanation:
          'Dùng trong câu hỏi để nhấn mạnh việc truy cứu đến cùng sự thật hoặc sự kiên nhẫn.',
        examples: [
          { cn: '你到底去不去？', pinyin: 'Nǐ dàodǐ qù bu qù?', vi: 'Rốt cuộc bạn có đi hay không?' },
          { cn: '这到底是怎么回事？', pinyin: 'Zhè dàodǐ shì zěnme huí shì?', vi: 'Chuyện này rốt cuộc là thế nào?' },
        ],
        pitfall: '到底 không được dùng trong câu hỏi lựa chọn có từ 吗 (Sai: 你到底去吗？-> Phải dùng dạng chính phản hoặc có từ nghi vấn).',
      },
    ],
    keyVocab: [
      { hanzi: '到底', pinyin: 'dàodǐ', hanViet: 'Đáo để', meaning: 'Rốt cuộc, đến cùng' },
      { hanzi: '决定', pinyin: 'juédìng', hanViet: 'Quyết định', meaning: 'Quyết định' },
      { hanzi: '选择', pinyin: 'xuǎnzé', hanViet: 'Tuyển trạch', meaning: 'Lựa chọn' },
    ],
    dialogue: {
      title: 'Bài khóa 11: Ý thức tiết kiệm điện văn phòng (别忘了把空调关了)',
      lines: [
        { speaker: 'A', name: 'Tổ trưởng', cn: '大家都下班了，别忘了把会议室的空调关了。', pinyin: 'Dàjiā dōu xiàbān le, bié wàng le bǎ huìyìshì de kōngtiáo guān le.', vi: 'Mọi người tan làm hết rồi, đừng quên tắt điều hòa phòng họp nhé.' },
        { speaker: 'B', name: 'Nhân viên', cn: '好的，我已经把灯和空调都关好了，窗户也关上了。', pinyin: 'Hǎo de, wǒ yǐjīng bǎ dēng hé kōngtiáo dōu guān hǎo le, chuānghu yě guān shang le.', vi: 'Vâng ạ, em đã tắt đèn và điều hòa xong xuôi, cửa sổ cũng đóng lại rồi.' },
        { speaker: 'A', name: 'Tổ trưởng', cn: '很好，下班早点回家，明天见！', pinyin: 'Hěn hǎo, xiàbān zǎodiǎn huíjiā, míngtiān jiàn!', vi: 'Rất tốt, tan làm về nhà sớm nhé, mai gặp lại!' },
        { speaker: 'B', name: 'Nhân viên', cn: '主任明天见，路上小心！', pinyin: 'Zhǔrèn míngtiān jiàn, lùshang xiǎoxīn!', vi: 'Em chào chủ nhiệm, chúc anh đi đường cẩn thận!' },
      ],
    },
    },

  '12': {
    lessonNumber: '12',
    grammarPoints: [
      {
        id: 'g-hsk3-12-1',
        title: '1. Câu so sánh không ngang bằng 没有 (A 没有 B + Tính từ)',
        formula: 'A + 没有 + B + Tính từ / Vị ngữ',
        explanation:
          'Dạng phủ định của so sánh, biểu thị A không đạt đến mức độ như B.',
        examples: [
          { cn: '今天没有昨天冷。', pinyin: 'Jīntiān méiyǒu zuótiān lěng.', vi: 'Hôm nay không lạnh bằng hôm qua.' },
          { cn: '我跑得没有他快。', pinyin: 'Wǒ pǎo de méiyǒu tā kuài.', vi: 'Tôi chạy không nhanh bằng anh ấy.' },
        ],
        pitfall: 'Sau tính từ không được dùng thêm từ chỉ sự khác biệt cụ thể như 一点儿 hay 多了 (Sai: 今天没有昨天冷得多).',
      },
    ],
    keyVocab: [
      { hanzi: '历史', pinyin: 'lìshǐ', hanViet: 'Lịch sử', meaning: 'Lịch sử' },
      { hanzi: '文化', pinyin: 'wénhuà', hanViet: 'Văn hóa', meaning: 'Văn hóa' },
      { hanzi: '有名', pinyin: 'yǒumíng', hanViet: 'Hữu danh', meaning: 'Nổi tiếng' },
    ],
    dialogue: {
      title: 'Bài khóa 12: Thói quen ghi chép công việc (把重要的事记在笔记本上)',
      lines: [
        { speaker: 'A', name: 'Giám đốc', cn: '明天的客户会议很重要，资料都准备好了吗？', pinyin: 'Míngtiān de kèhù huìyì hěn zhòngyào, zīliào dōu zhǔnbèi hǎo le ma?', vi: 'Cuộc họp khách hàng ngày mai rất quan trọng, tài liệu đã chuẩn bị xong chưa?' },
        { speaker: 'B', name: 'Trợ lý', cn: '我已经把会议要点都记在笔记本上了，随时可以开始。', pinyin: 'Wǒ yǐjīng bǎ huìyì yàodiǎn dōu jì zài bǐjìběn shang le, suíshí kěyǐ kāishǐ.', vi: 'Tôi đã ghi toàn bộ điểm trọng tâm vào sổ tay rồi, bất cứ lúc nào cũng có thể bắt đầu.' },
        { speaker: 'A', name: 'Giám đốc', cn: '好习惯！好记性不如烂笔头。', pinyin: 'Hǎo xíguàn! Hǎo jìxing bùrú làn bǐtóu.', vi: 'Thói quen tốt đấy! Trí nhớ tốt không bằng ngòi bút cùn.' },
        { speaker: 'B', name: 'Trợ lý', cn: '谢谢王总夸奖，我会继续努力的！', pinyin: 'Xièxie Wáng zǒng kuājiǎng, wǒ huì jìxù nǔlì de!', vi: 'Cảm ơn tổng giám đốc Vương đã khen, tôi sẽ tiếp tục cố gắng ạ!' },
      ],
    },
    },

  '13': {
    lessonNumber: '13',
    grammarPoints: [
      {
        id: 'g-hsk3-13-1',
        title: '1. Cấu trúc liên kết 不仅...而且... (Không những... mà còn...)',
        formula: '不仅 + Vế 1, 而且 + Vế 2',
        explanation:
          'Biểu thị quan hệ tăng tiến về mặt ý nghĩa.',
        examples: [
          { cn: '他不仅会说汉语，而且说得非常流利。', pinyin: 'Tā bùjǐn huì shuō Hànyǔ, érqiě shuō de fēicháng liúlì.', vi: 'Anh ấy không những biết nói tiếng Hán, mà còn nói rất lưu loát.' },
        ],
        pitfall: 'Nếu hai vế câu có cùng một chủ ngữ, 不仅 phải đứng SAU chủ ngữ (他不仅...). Nếu khác chủ ngữ, 不仅 đứng TRƯỚC chủ ngữ 1.',
      },
    ],
    keyVocab: [
      { hanzi: '流利', pinyin: 'liúlì', hanViet: 'Lưu lợi', meaning: 'Lưu loát, trôi chảy' },
      { hanzi: '翻译', pinyin: 'fānyì', hanViet: 'Phiên dịch', meaning: 'Dịch thuật, thông dịch' },
      { hanzi: '水平', pinyin: 'shuǐpíng', hanViet: 'Thủy bình', meaning: 'Trình độ' },
    ],
    dialogue: {
      title: 'Bài khóa 13: Thói quen đi bộ sau giờ làm (我是走回来的)',
      lines: [
        { speaker: 'A', name: 'Bạn cùng phòng', cn: '今天怎么回来得这么晚？坐公交车堵车了吗？', pinyin: 'Jīntiān zěnme huílái de zhème wǎn? Zuò gōngjiāochē dǔchē le ma?', vi: 'Hôm nay sao về muộn thế này? Đi xe buýt bị kẹt xe à?' },
        { speaker: 'B', name: 'Tiểu Hải', cn: '今天天气不错，我是走回来的，不仅锻炼身体，而且心情特别舒畅。', pinyin: 'Jīntiān tiānqì búcuò, wǒ shì zǒu huílái de, bùjǐn duànliàn shēntǐ, érqiě xīnqíng tèbié shūchàng.', vi: 'Hôm nay thời tiết đẹp, mình đi bộ về đấy, không chỉ rèn luyện sức khỏe mà tâm trạng còn cực kỳ sảng khoái.' },
        { speaker: 'A', name: 'Bạn cùng phòng', cn: '从公司走到这里要半个多小时吧？真佩服你！', pinyin: 'Cóng gōngsī zǒu dào zhèlǐ yào bàn ge duō xiǎoshí ba? Zhēn pèifú nǐ!', vi: 'Từ công ty đi bộ đến đây mất hơn nửa tiếng nhỉ? Thật khâm phục cậu!' },
        { speaker: 'B', name: 'Tiểu Hải', cn: '走习惯了就不觉得累了，明天你也试试！', pinyin: 'Zǒu xíguàn le jiù bù juéde lèi le, míngtiān nǐ yě shìshi!', vi: 'Đi quen rồi là không thấy mệt đâu, mai cậu cũng thử xem!' },
      ],
    },
    },

  '14': {
    lessonNumber: '14',
    grammarPoints: [
      {
        id: 'g-hsk3-14-1',
        title: '1. Bổ ngữ thời lượng (Chỉ khoảng thời gian hành động kéo dài)',
        formula: 'S + V + Khoảng thời gian + (của) + Tân ngữ (Hoặc V + O + V + Khoảng thời gian)',
        explanation:
          'Biểu thị hành động kéo dài trong bao lâu (ví dụ 3 tiếng, nửa năm, hai ngày).',
        examples: [
          { cn: '我学了三年中文。', pinyin: 'Wǒ xué le sān nián Zhōngwén.', vi: 'Tôi đã học tiếng Trung 3 năm.' },
          { cn: '他每天跑步跑半个小时。', pinyin: 'Tā měitiān pǎobù pǎo bàn gè xiǎoshí.', vi: 'Mỗi ngày anh ấy chạy bộ nửa tiếng đồng hồ.' },
        ],
        pitfall: 'Nếu cuối câu có thêm trợ từ 了 (我学了三年中文了), biểu thị hành động đó VẪN ĐANG TIẾP TỤC ở hiện tại.',
      },
    ],
    keyVocab: [
      { hanzi: '留学', pinyin: 'liúxué', hanViet: 'Lưu học', meaning: 'Du học' },
      { hanzi: '毕业', pinyin: 'bìyè', hanViet: 'Tất nghiệp', meaning: 'Tốt nghiệp' },
      { hanzi: '经验', pinyin: 'jīngyàn', hanViet: 'Kinh nghiệm', meaning: 'Kinh nghiệm sống/làm việc' },
    ],
    dialogue: {
      title: 'Bài khóa 14: Đãi khách hoa quả tươi (你把水果拿过来)',
      lines: [
        { speaker: 'A', name: 'Mẹ', cn: '家里来客人了，你把洗好的水果拿过来。', pinyin: 'Jiālǐ lái kèrén le, nǐ bǎ xǐ hǎo de shuǐguǒ ná guòlái.', vi: 'Nhà có khách đến chơi, con mang đĩa hoa quả đã rửa sạch qua đây nhé.' },
        { speaker: 'B', name: 'Con trai', cn: '好的妈妈，西瓜和葡萄都切好了，我马上端过去。', pinyin: 'Hǎo de māma, xīguā hé pútao dōu qiē hǎo le, wǒ mǎshàng duān guòqù.', vi: 'Vâng ạ mẹ ơi, dưa hấu và nho đều cắt xong rồi, con bưng qua ngay đây ạ.' },
        { speaker: 'A', name: 'Mẹ', cn: '把牙签和纸巾也带上，别忘了给叔叔倒茶。', pinyin: 'Bǎ yáqiān hé zhǐjīn yě dài shang, bié wàng le gěi shūshu dào chá.', vi: 'Mang cả tăm và khăn giấy theo nhé, đừng quên rót trà cho chú.' },
        { speaker: 'B', name: 'Con trai', cn: '知道了，叔叔请用茶，吃点儿水果！', pinyin: 'Zhīdào le, shūshu qǐng yòng chá, chī diǎnr shuǐguǒ!', vi: 'Con biết rồi ạ, cháu mời chú dùng trà và xơi chút hoa quả ạ!' },
      ],
    },
    },

  '15': {
    lessonNumber: '15',
    grammarPoints: [
      {
        id: 'g-hsk3-15-1',
        title: '1. Cặp liên từ 如果...就... (Nếu... thì... - Điều kiện giả thiết)',
        formula: '如果 (要是) + Giả thiết, 就 + Kết quả',
        explanation:
          'Dùng để đưa ra giả định về một tình huống có thể xảy ra trong tương lai hoặc hiện tại.',
        examples: [
          { cn: '如果你有时间，我们就一起去看京剧。', pinyin: 'Rúguǒ nǐ yǒu shíjiān, wǒmen jiù yìqǐ qù kàn jīngjù.', vi: 'Nếu bạn có thời gian, chúng ta cùng đi xem kinh kịch nhé.' },
        ],
        pitfall: 'Vế sau bắt buộc phải có phó từ 就 kết nối, không để vế câu trơ trọi.',
      },
      {
        id: 'g-hsk3-15-2',
        title: '2. Tổng kết Ngữ pháp HSK 3 & Bổ ngữ trạng thái / khả năng',
        formula: 'V + 得 + Tính từ',
        explanation:
          'Hệ thống hóa toàn bộ các mẫu bổ ngữ quan trọng nhất của bậc Trung cấp HSK 3 để chuẩn bị bước sang HSK 4.',
        examples: [
          { cn: '祝贺大家顺利学完 HSK 3！', pinyin: 'Zhùhè dàjiā shùnlì xué wán HSK 3!', vi: 'Chúc mừng mọi người đã hoàn thành thuận lợi HSK 3!' },
        ],
        pitfall: 'Ôn tập toàn bộ 600 từ vựng và 45 điểm ngữ pháp cốt lõi để đạt 260+ điểm HSK 3.',
      },
    ],
    keyVocab: [
      { hanzi: '京剧', pinyin: 'jīngjù', hanViet: 'Kinh kịch', meaning: 'Kịch truyền thống Bắc Kinh' },
      { hanzi: '表演', pinyin: 'biǎoyǎn', hanViet: 'Biểu diễn', meaning: 'Biểu diễn, trình diễn' },
      { hanzi: '精彩', pinyin: 'jīngcǎi', hanViet: 'Tinh thải', meaning: 'Đặc sắc, tuyệt vời' },
    ],
    dialogue: {
      title: 'Bài khóa 15: Chào đón năm mới rực rỡ (新年就要到了！)',
      lines: [
        { speaker: 'A', name: 'Giáo viên', cn: '新年就要到了，如果大家假期有空，就一起来老师家包饺子吧！', pinyin: 'Xīnnián jiù yào dào le, rúguǒ dàjiā jiàqī yǒu kòng, jiù yìqǐ lái lǎoshī jiā bāo jiǎozi ba!', vi: 'Năm mới sắp đến rồi, nếu kỳ nghỉ các em rảnh thì cùng đến nhà cô gói sủi cảo nhé!' },
        { speaker: 'B', name: 'Học sinh cả lớp', cn: '太好啦！祝老师新年快乐，身体健康，万事如意！', pinyin: 'Tài hǎo la! Zhù lǎoshī xīnnián kuàilè, shēntǐ jiànkāng, wànshì rúyì!', vi: 'Tuyệt quá ạ! Chúng em chúc cô năm mới vui vẻ, dồi dào sức khỏe, vạn sự như ý!' },
        { speaker: 'A', name: 'Giáo viên', cn: '也祝你们新的一年汉语水平步步高升，顺利通过 HSK！', pinyin: 'Yě zhù nǐmen xīn de yì nián Hànyǔ shuǐpíng bùbù gāoshēng, shùnlì tōngguò HSK!', vi: 'Cô cũng chúc các em sang năm mới trình độ tiếng Hán ngày càng thăng tiến, thuận lợi thi đỗ HSK nhé!' },
        { speaker: 'B', name: 'Học sinh cả lớp', cn: '新的一年，我们一定会更加努力！', pinyin: 'Xīn de yì nián, wǒmen yídìng huì gèngjiā nǔlì!', vi: 'Năm mới, chúng em nhất định sẽ nỗ lực hơn nữa ạ!' },
      ],
    },
    },
};
