export interface GrammarPoint {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  examples: {
    cn: string;
    pinyin: string;
    vi: string;
  }[];
  pitfall?: string;
}

export interface LessonDetail {
  lessonNumber: string;
  grammarPoints: GrammarPoint[];
  keyVocab: {
    hanzi: string;
    pinyin: string;
    hanViet: string;
    meaning: string;
  }[];
  dialogue?: {
    title: string;
    lines: {
      speaker: string;
      name?: string;
      cn: string;
      pinyin: string;
      vi: string;
    }[];
  };
}

export const HSK2_GRAMMAR_DETAILS: Record<string, LessonDetail> = {
  '01': {
    lessonNumber: '01',
    grammarPoints: [
      {
        id: 'g-hsk2-01-1',
        title: '1. Trợ từ ngữ khí "吧" (2) - Phỏng đoán, ước lượng',
        formula: 'Câu trần thuật + 吧？',
        explanation: 'Trợ từ "吧" đặt cuối câu hỏi khi người nói đã có suy đoán hoặc nhận định trong đầu, nhằm mục đích hỏi đối phương để xác nhận độ tin cậy.',
        examples: [
          { cn: '你们就是王老师的学生吧？', pinyin: 'Nǐmen jiù shì Wáng lǎoshī de xuésheng ba?', vi: 'Các bạn chính là học trò của cô giáo Vương nhỉ?' },
          { cn: '今天天气很冷吧？', pinyin: 'Jīntiān tiānqì hěn lěng ba?', vi: 'Hôm nay trời rất lạnh phải không?' },
          { cn: '他也是法国人吧？', pinyin: 'Tā yě shì Fǎguórén ba?', vi: 'Anh ấy cũng là người Pháp đúng không?' },
        ],
        pitfall: 'Phân biệt "吧" (đã có dự đoán ngầm, hỏi xác nhận) với "吗" (câu hỏi thông thường, hoàn toàn chưa rõ thông tin).',
      },
      {
        id: 'g-hsk2-01-2',
        title: '2. Cấu trúc "是……的" nhấn mạnh thời gian, địa điểm, phương thức',
        formula: 'Chủ ngữ + 是 + [Thời gian / Địa điểm / Phương thức] + Động từ + 的',
        explanation: 'Khi hành động đã xảy ra trong quá khứ và cả hai bên cùng biết, cấu trúc "是……的" dùng để nhấn mạnh các chi tiết xoay quanh hành động: xảy ra khi nào, ở đâu, bằng cách nào.',
        examples: [
          { cn: '一飞是上个月去法国的。', pinyin: 'Yīfēi shì shàng ge yuè qù Fǎguó de.', vi: 'Nhất Phi sang Pháp vào tháng trước (nhấn mạnh thời gian).' },
          { cn: '我们是坐飞机来北京的。', pinyin: 'Wǒmen shì zuò fēijī lái Běijīng de.', vi: 'Chúng tôi đến Bắc Kinh bằng máy bay (nhấn mạnh phương tiện).' },
          { cn: '这本书是在中国买的。', pinyin: 'Zhè běn shū shì zài Zhōngguó mǎi de.', vi: 'Quyển sách này được mua tại Trung Quốc (nhấn mạnh địa điểm).' },
        ],
        pitfall: 'Trong thể phủ định, bắt buộc đặt "不" trước "是": "不是……的" (Tuyệt đối không nói "是没……的").',
      },
      {
        id: 'g-hsk2-01-3',
        title: '3. Câu kiêm ngữ (Pivotal Sentences)',
        formula: 'Chủ ngữ + Động từ cầu khiến (请 / 让 / 叫) + Tân ngữ 1 (kiêm Chủ ngữ 2) + Động từ 2',
        explanation: 'Vị ngữ gồm hai cụm động từ, trong đó tân ngữ của động từ thứ nhất đóng vai trò là chủ ngữ của động từ thứ hai. Thường dùng với các động từ cầu khiến: 请 (mời, đãi), 让 (cho phép, bảo), 叫 (bảo, gọi).',
        examples: [
          { cn: '她请我们吃了北京烤鸭。', pinyin: 'Tā qǐng wǒmen chīle Běijīng Kǎoyā.', vi: 'Cô ấy đã đãi chúng tôi ăn vịt quay Bắc Kinh.' },
          { cn: '老师让我们听录音。', pinyin: 'Lǎoshī ràng wǒmen tīng lùyīn.', vi: 'Thầy giáo bảo chúng tôi nghe đoạn ghi âm.' },
          { cn: '妈妈叫我回家吃饭。', pinyin: 'Māma jiào wǒ huíjiā chīfàn.', vi: 'Mẹ bảo tôi về nhà ăn cơm.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '烤鸭', pinyin: 'kǎoyā', hanViet: 'Khảo áp', meaning: 'Vịt quay' },
      { hanzi: '请', pinyin: 'qǐng', hanViet: 'Thỉnh', meaning: 'Mời, đãi, xin' },
      { hanzi: '让', pinyin: 'ràng', hanViet: 'Nhượng', meaning: 'Để cho, bảo' },
      { hanzi: '叫', pinyin: 'jiào', hanViet: 'Khiếu', meaning: 'Kêu, gọi, bảo' },
      { hanzi: '接', pinyin: 'jiē', hanViet: 'Tiếp', meaning: 'Đón, tiếp nhận' },
      { hanzi: '帮忙', pinyin: 'bāngmáng', hanViet: 'Bang mang', meaning: 'Giúp đỡ' },
    ],
    dialogue: {
      title: 'Bài khóa 1: Ở sân bay đón bạn',
      lines: [
        { speaker: '白家月', cn: '请问，您是王一飞老师的姐姐吗？', pinyin: 'Qǐngwèn, nín shì Wáng Yīfēi lǎoshī de jiějie ma?', vi: 'Xin hỏi, chị có phải là chị gái của cô Vương Nhất Phi không ạ?' },
        { speaker: '王一雪', cn: '是的，你们就是她的学生吧？', pinyin: 'Shì de, nǐmen jiù shì tā de xuésheng ba?', vi: 'Đúng rồi, các em chắc là học sinh của cô ấy nhỉ?' },
        { speaker: '白家月', cn: '对。我是白家月，她是安妮。', pinyin: 'Duì. Wǒ shì Bái Jiāyuè, tā shì Ānnī.', vi: 'Vâng ạ. Em là Bạch Gia Nguyệt, còn đây là Annie.' },
        { speaker: '王一雪', cn: '你们好，我叫王一雪。一飞给我打电话了，让我来接你们。', pinyin: 'Nǐmen hǎo, wǒ jiào Wáng Yīxuě. Yīfēi gěi wǒ dǎ diànhuà le, ràng wǒ lái jiē nǐmen.', vi: 'Chào hai em, chị là Vương Nhất Tuyết. Nhất Phi gọi điện cho chị bảo chị đến đón các em.' },
      ],
    },
  },

  '02': {
    lessonNumber: '02',
    grammarPoints: [
      {
        id: 'g-hsk2-02-1',
        title: '1. Định thức "还是……吧" (Lựa chọn phương án tối ưu)',
        formula: '还是 + Hành động / Phương án + 吧',
        explanation: 'Dùng sau khi cân nhắc, so sánh giữa hai hay nhiều lựa chọn để đưa ra đề xuất phương án được xem là hợp lý hơn.',
        examples: [
          { cn: '我们还是打车去北大吧。', pinyin: 'Wǒmen háishì dǎchē qù Běidà ba.', vi: 'Chúng ta hay là bắt taxi đến Đại học Bắc Kinh đi.' },
          { cn: '外面下大雨，还是在家看书吧。', pinyin: 'Wàimiàn xià dàyǔ, háishì zài jiā kàn shū ba.', vi: 'Ngoài trời mưa to, hay là ở nhà đọc sách đi.' },
        ],
        pitfall: 'Phân biệt "还是……吧" (đưa ra đề nghị lựa chọn) với "还是" trong câu hỏi lựa chọn (A 还是 B?).',
      },
      {
        id: 'g-hsk2-02-2',
        title: '2. Dùng "多" biểu thị số lượng ước lượng (Approximate Numbers)',
        formula: 'Số tròn chục (10, 20...) + 多 + Lượng từ + Danh từ | Số không tròn chục + Lượng từ + 多 + Danh từ',
        explanation: '"多" đứng sau số từ biểu thị số lẻ vượt hơn con số gốc.',
        examples: [
          { cn: '二十多个学生', pinyin: 'èrshí duō gè xuésheng', vi: 'Hơn hai mươi học sinh (21-29)' },
          { cn: '三年多', pinyin: 'sān nián duō', vi: 'Hơn ba năm (3 năm mấy tháng)' },
          { cn: '十多块钱', pinyin: 'shí duō kuài qián', vi: 'Hơn mười tệ' },
        ],
      },
      {
        id: 'g-hsk2-02-3',
        title: '3. Động từ, cụm động từ, cụm chủ - vị làm định ngữ',
        formula: '[Động từ / Cụm động từ / Cụm C-V] + 的 + Trung tâm ngữ (Danh từ)',
        explanation: 'Khi định ngữ là động từ hoặc cụm từ dài miêu tả đặc điểm, hành động của danh từ, bắt buộc phải có trợ từ "的" ở giữa.',
        examples: [
          { cn: '新来的同学很热情。', pinyin: 'Xīn lái de tóngxué hěn rèqíng.', vi: 'Bạn học sinh mới đến rất nhiệt tình.' },
          { cn: '他买的书很有意思。', pinyin: 'Tā mǎi de shū hěn yǒu yìsi.', vi: 'Quyển sách anh ấy mua rất thú vị.' },
          { cn: '我妈妈做的菜最好吃。', pinyin: 'Wǒ māma zuò de cài zuì hǎochī.', vi: 'Món ăn mẹ tôi nấu là ngon nhất.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '打车', pinyin: 'dǎchē', hanViet: 'Đả xa', meaning: 'Bắt taxi, đi taxi' },
      { hanzi: '北大', pinyin: 'Běidà', hanViet: 'Bắc Đại', meaning: 'Đại học Bắc Kinh' },
      { hanzi: '还是', pinyin: 'háishì', hanViet: 'Hoàn thị', meaning: 'Hay là, vẫn là' },
      { hanzi: '堵车', pinyin: 'dǔchē', hanViet: 'Đổ xa', meaning: 'Tắc đường, kẹt xe' },
      { hanzi: '地铁', pinyin: 'dìtiě', hanViet: 'Địa thiết', meaning: 'Tàu điện ngầm' },
    ],
    dialogue: {
      title: 'Bài khóa: Chọn phương tiện đi Đại học Bắc Kinh',
      lines: [
        { speaker: '白家月', cn: '今天去北大，坐地铁还是坐公共汽车？', pinyin: 'Jīntiān qù Běidà, zuò dìtiě háishì zuò gōnggòng qìchē?', vi: 'Hôm nay đi Đại học Bắc Kinh, đi tàu điện ngầm hay xe buýt?' },
        { speaker: '王一雪', cn: '现在路上堵车，坐地铁要换乘，我们还是打车去吧。', pinyin: 'Xiànzài lùshang dǔchē, zuò dìtiě yào huànchéng, wǒmen háishì dǎchē qù ba.', vi: 'Bây giờ trên đường kẹt xe, đi tàu điện thì phải chuyển tuyến, chúng ta hay là bắt taxi đi đi.' },
      ],
    },
  },

  '03': {
    lessonNumber: '03',
    grammarPoints: [
      {
        id: 'g-hsk2-03-1',
        title: '1. Bổ ngữ kết quả (Complement of Result)',
        formula: 'Chủ ngữ + Động từ + Bổ ngữ kết quả (完 / 懂 / 见 / 到 / 开 / 错) + Tân ngữ',
        explanation: 'Bổ ngữ kết quả đứng ngay sau động từ để biểu thị kết quả của hành động đó đã hoàn tất, thấu hiểu, gặp gỡ hay sai sót.',
        examples: [
          { cn: '我看完了这本小说。', pinyin: 'Wǒ kàn wán le zhè běn xiǎoshuō.', vi: 'Tôi đã xem xong quyển tiểu thuyết này.' },
          { cn: '你听懂老师的话了吗？', pinyin: 'Nǐ tīng dǒng lǎoshī de huà le ma?', vi: 'Bạn nghe hiểu lời cô giáo nói chưa?' },
          { cn: '我找到我的钥匙了。', pinyin: 'Wǒ zhǎodào wǒ de yàoshi le.', vi: 'Tôi đã tìm thấy chìa khóa của mình rồi.' },
        ],
        pitfall: 'Thể phủ định dùng "没" hoặc "没有" trước động từ, KHÔNG dùng "不", và bỏ "了": "我没看完" (Sai: 我不看完 / 我没看完了).',
      },
      {
        id: 'g-hsk2-03-2',
        title: '2. Lặp lại động từ đơn âm tiết (Verb Reduplication 1)',
        formula: 'AA hoặc A一A (看 / 看看 / 看一看 | 听 / 听听 / 听一听)',
        explanation: 'Biểu thị hành động diễn ra trong thời gian ngắn, động tác nhẹ nhàng, thư giãn hoặc mang tính thử làm xem sao.',
        examples: [
          { cn: '我想去西安旅游，你帮我看看这个路线。', pinyin: 'Wǒ xiǎng qù Xī\'ān lǚyóu, nǐ bāng wǒ kànkan zhège lùxiàn.', vi: 'Tôi muốn đi Tây An du lịch, bạn xem giúp tôi lộ trình này với.' },
          { cn: '你尝尝这个菜，好吃吗？', pinyin: 'Nǐ chángchang zhège cài, hǎochī ma?', vi: 'Bạn nếm thử món này xem, có ngon không?' },
        ],
      },
      {
        id: 'g-hsk2-03-3',
        title: '3. Lặp lại động từ song âm tiết (Verb Reduplication 2)',
        formula: 'ABAB (准备准备 / 介绍介绍 / 学习学习)',
        explanation: 'Động từ hai âm tiết lặp lại theo hình thức ABAB để diễn đạt ý định nhẹ nhàng, lịch sự hoặc chuẩn bị thử.',
        examples: [
          { cn: '去西安之前，我们要好好准备准备。', pinyin: 'Qù Xī\'ān zhīqián, wǒmen yào hǎohāo zhǔnbèi zhǔnbèi.', vi: 'Trước khi đi Tây An, chúng ta cần chuẩn bị chu đáo một chút.' },
          { cn: '请你给我们介绍介绍西安的历史。', pinyin: 'Qǐng nǐ gěi wǒmen jièshào jièshào Xī\'ān de lìshǐ.', vi: 'Xin bạn giới thiệu qua cho chúng tôi về lịch sử Tây An.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '西安', pinyin: 'Xī\'ān', hanViet: 'Tây An', meaning: 'Thành phố Tây An' },
      { hanzi: '旅游', pinyin: 'lǚyóu', hanViet: 'Lữ du', meaning: 'Du lịch' },
      { hanzi: '结果', pinyin: 'jiéguǒ', hanViet: 'Kết quả', meaning: 'Kết quả' },
      { hanzi: '完', pinyin: 'wán', hanViet: 'Hoàn', meaning: 'Xong, hết' },
      { hanzi: '准备', pinyin: 'zhǔnbèi', hanViet: 'Chuẩn bị', meaning: 'Chuẩn bị' },
    ],
    dialogue: {
      title: 'Bài khóa: Bàn về chuyến du lịch Tây An',
      lines: [
        { speaker: '安妮', cn: '下个月放假，我想去西安旅游。', pinyin: 'Xià ge yuè fàngjià, wǒ xiǎng qù Xī\'ān lǚyóu.', vi: 'Tháng sau nghỉ lễ, tôi muốn đi Tây An du lịch.' },
        { speaker: '白家月', cn: '太好了！我听说西安有很多名胜古迹，你买好火车票了吗？', pinyin: 'Tài hǎo le! Wǒ tīngshuō Xī\'ān yǒu hěn duō míngshèng gǔjī, nǐ mǎihǎo huǒchēpiào le ma?', vi: 'Tuyệt quá! Tôi nghe nói Tây An có nhiều danh lam thắng cảnh, bạn mua xong vé tàu chưa?' },
      ],
    },
  },

  '04': {
    lessonNumber: '04',
    grammarPoints: [
      {
        id: 'g-hsk2-04-1',
        title: '1. Trợ từ động thái "过" - Trải nghiệm trong quá khứ (Aspect Particle "过")',
        formula: 'Chủ ngữ + Động từ + 过 + Tân ngữ | Phủ định: 没(有) + Động từ + 过',
        explanation: 'Nhấn mạnh hành động đã từng xảy ra và kết thúc trong quá khứ, biểu thị một trải nghiệm hay kinh nghiệm bản thân đã có.',
        examples: [
          { cn: '你去过中国吗？我没去过。', pinyin: 'Nǐ qùguo Zhōngguó ma? Wǒ méi qùguo.', vi: 'Bạn đã từng đến Trung Quốc chưa? Tôi chưa từng đi.' },
          { cn: '这件红衣服我穿过一次。', pinyin: 'Zhè jiàn hóng yīfu wǒ chuānguo yí cì.', vi: 'Bộ quần áo đỏ này tôi từng mặc một lần.' },
        ],
        pitfall: 'Trong câu có "过", phủ định chỉ dùng "没" hoặc "没有", không dùng "不".',
      },
      {
        id: 'g-hsk2-04-2',
        title: '2. Câu phức nguyên nhân - kết quả "因为……，所以……"',
        formula: '因为 + [Nguyên nhân]，所以 + [Kết quả]',
        explanation: 'Liên từ "因为" giới thiệu lý do, "所以" đưa ra kết quả phát sinh. Trong văn nói có thể lược bớt một trong hai vế.',
        examples: [
          { cn: '因为你穿红色的很好看，所以就买这件吧。', pinyin: 'Yīnwèi nǐ chuān hóngsè de hěn hǎokàn, suǒyǐ jiù mǎi zhè jiàn ba.', vi: 'Bởi vì bạn mặc đồ màu đỏ rất đẹp, cho nên mua bộ này đi.' },
          { cn: '因为下雨，所以今天没有体育课。', pinyin: 'Yīnwèi xià yǔ, suǒyǐ jīntiān méiyǒu tǐyùkè.', vi: 'Vì trời mưa nên hôm nay không có tiết thể dục.' },
        ],
      },
      {
        id: 'g-hsk2-04-3',
        title: '3. Cụm từ mang chữ "的" ("的" Phrase)',
        formula: 'Tính từ / Động từ / Danh từ + 的 -> Tạo thành cụm danh từ',
        explanation: 'Khi danh từ trung tâm đã được biết rõ hoặc được ngầm hiểu theo ngữ cảnh, ta lược bỏ danh từ và giữ lại phần mang chữ "的".',
        examples: [
          { cn: '这件衣服是红色的，那件是白色的。', pinyin: 'Zhè jiàn yīfu shì hóngsè de, nà jiàn shì báisè de.', vi: 'Bộ quần áo này là bộ màu đỏ, bộ kia là bộ màu trắng.' },
          { cn: '大的便宜，小的贵。', pinyin: 'Dà de piányi, xiǎo de guì.', vi: 'Cái to thì rẻ, cái nhỏ thì đắt.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '穿', pinyin: 'chuān', hanViet: 'Xuyên', meaning: 'Mặc, xỏ' },
      { hanzi: '好看', pinyin: 'hǎokàn', hanViet: 'Hảo khán', meaning: 'Đẹp mắt, ưa nhìn' },
      { hanzi: '红', pinyin: 'hóng', hanViet: 'Hồng', meaning: 'Đỏ, màu đỏ' },
      { hanzi: '因为', pinyin: 'yīnwèi', hanViet: 'Nhân vị', meaning: 'Bởi vì' },
      { hanzi: '所以', pinyin: 'suǒyǐ', hanViet: 'Sở dĩ', meaning: 'Cho nên' },
    ],
    dialogue: {
      title: 'Bài khóa 4: Chọn trang phục dạo phố (你穿红色的很好看)',
      lines: [
        { speaker: 'A', name: 'Tiểu Tuyết', cn: '这件红色的衣服怎么样？', pinyin: 'Zhè jiàn hóngsè de yīfu zěnmeyàng?', vi: 'Bộ quần áo màu đỏ này trông thế nào?' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '你穿红色的很好看，显得特别有精神。', pinyin: 'Nǐ chuān hóngsè de hěn hǎokàn, xiǎnde tèbié yǒu jīngshén.', vi: 'Bạn mặc bộ đồ màu đỏ rất đẹp, trông vô cùng có sức sống.' },
        { speaker: 'A', name: 'Tiểu Tuyết', cn: '我以前没穿过红色的，我想去试衣间试一下。', pinyin: 'Wǒ yǐqián méi chuānguo hóngsè de, wǒ xiǎng qù shìyījiān shì yíxià.', vi: 'Trước giờ mình chưa từng mặc màu đỏ, mình muốn vào phòng thay đồ thử một chút.' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '好啊，我觉得这件真的很适合你！', pinyin: 'Hǎo a, wǒ juéde zhè jiàn zhēn de hěn shìhé nǐ!', vi: 'Được chứ, mình thấy bộ này thật sự rất hợp với bạn!' },
      ],
    },
  },

  '05': {
    lessonNumber: '05',
    grammarPoints: [
      {
        id: 'g-hsk2-05-1',
        title: '1. Bổ ngữ xu hướng đơn (1) - V + 来 / 去',
        formula: 'Động từ + 来 (hướng về phía người nói) | Động từ + 去 (hướng rời xa người nói)',
        explanation: 'Dùng sau động từ chỉ phương hướng chuyển động của hành động so với vị trí hiện tại của người nói.',
        examples: [
          { cn: '他在楼下，你快下来吧。', pinyin: 'Tā zài lóuxià, nǐ kuài xiàlai ba.', vi: 'Anh ấy đang ở dưới lầu, bạn mau xuống đây đi.' },
          { cn: '老师在教室里，请大家进去。', pinyin: 'Lǎoshī zài jiàoshì lǐ, qǐng dàjiā jìnqu.', vi: 'Cô giáo đang ở trong lớp, xin mời mọi người vào trong.' },
        ],
      },
      {
        id: 'g-hsk2-05-2',
        title: '2. Bổ ngữ xu hướng đơn với tân ngữ chỉ nơi chốn (2)',
        formula: 'Động từ + Địa điểm (Tân ngữ) + 来 / 去',
        explanation: 'Nếu tân ngữ là từ chỉ nơi chốn, bắt buộc phải đặt tân ngữ ở TRƯỚC "来" hoặc "去", không được đặt sau.',
        examples: [
          { cn: '他回中国去了。', pinyin: 'Tā huí Zhōngguó qù le.', vi: 'Anh ấy về Trung Quốc rồi (Không được nói: 他回去中国了).' },
          { cn: '请你进房间来。', pinyin: 'Qǐng nǐ jìn fángjiān lái.', vi: 'Xin mời bạn vào trong phòng này.' },
        ],
        pitfall: 'Quy tắc vàng: Nơi chốn luôn kẹp giữa Động từ và 来/去 (V + Nơi chốn + 来/去).',
      },
      {
        id: 'g-hsk2-05-3',
        title: '3. Định thức "都……了" nhấn mạnh mức độ đã muộn, đã cao',
        formula: '都 + Thời gian / Số lượng + 了',
        explanation: 'Nhấn mạnh thời gian đã trôi qua nhiều hoặc mức độ đã cao hơn bình thường, thường mang sắc thái giục giã hoặc ngạc nhiên.',
        examples: [
          { cn: '都十二点了，快去睡觉吧！', pinyin: 'Dōu shí\'èr diǎn le, kuài qù shuìjiào ba!', vi: 'Đã mười hai giờ rồi, mau đi ngủ đi!' },
          { cn: '第一次去朋友家，礼物我都准备好了。', pinyin: 'Dì-yī cì qù péngyou jiā, lǐwù wǒ dōu zhǔnbèi hǎo le.', vi: 'Lần đầu tiên đến nhà bạn, quà cáp tôi đều đã chuẩn bị xong rồi.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '第一次', pinyin: 'dì-yī cì', hanViet: 'Đệ nhất thứ', meaning: 'Lần đầu tiên' },
      { hanzi: '朋友', pinyin: 'péngyou', hanViet: 'Bằng hữu', meaning: 'Bạn bè' },
      { hanzi: '进', pinyin: 'jìn', hanViet: 'Tiến', meaning: 'Vào' },
      { hanzi: '出', pinyin: 'chū', hanViet: 'Xuất', meaning: 'Ra' },
      { hanzi: '礼物', pinyin: 'lǐwù', hanViet: 'Lễ vật', meaning: 'Quà tặng' },
    ],
    dialogue: {
      title: 'Bài khóa 5: Đến thăm nhà người bạn Trung Quốc (第一次去中国朋友家)',
      lines: [
        { speaker: 'A', name: 'Du học sinh', cn: '叔叔、阿姨好！这是送给你们的水果。', pinyin: 'Shūshu, āyí hǎo! Zhè shì sòng gěi nǐmen de shuǐguǒ.', vi: 'Cháu chào chú, chào dì ạ! Đây là chút hoa quả cháu biếu cô chú ạ.' },
        { speaker: 'B', name: 'Mẹ bạn', cn: '快请进，快请进！来就来嘛，还带什么东西呀。', pinyin: 'Kuài qǐng jìn, kuài qǐng jìn! Lái jiù lái ma, hái dài shénme dōngxi ya.', vi: 'Mau vào nhà đi cháu! Đến chơi là quý rồi, còn mang quà cáp làm gì nữa.' },
        { speaker: 'A', name: 'Du học sinh', cn: '这是我第一次来中国人家里做客，非常高兴。', pinyin: 'Zhè shì wǒ dì-yī cì lái Zhōngguó rén jiālǐ zuòkè, fēicháng gāoxìng.', vi: 'Đây là lần đầu tiên cháu đến làm khách tại nhà người Trung Quốc, cháu vui lắm ạ.' },
        { speaker: 'B', name: 'Bố bạn', cn: '坐坐坐，先喝杯热茶，别客气！', pinyin: 'Zuò zuò zuò, xiān hē bēi rè chá, bié kèqi!', vi: 'Ngồi ngồi đi cháu, uống chén trà nóng trước đã, đừng khách sáo nhé!' },
      ],
    },
  },

  '06': {
    lessonNumber: '06',
    grammarPoints: [
      {
        id: 'g-hsk2-06-1',
        title: '1. Lặp lại tính từ đơn âm tiết (Adjective Reduplication)',
        formula: 'AA + 的 + Danh từ (红红的 / 高高的 / 大大的)',
        explanation: 'Tăng cường sắc thái miêu tả, tạo cảm giác sinh động, dễ thương và gần gũi.',
        examples: [
          { cn: '小雪长着一双大大的眼睛。', pinyin: 'Xiǎoxuě zhǎng zhe yì shuāng dàdà de yǎnjing.', vi: 'Tiểu Tuyết có một đôi mắt to tròn long lanh.' },
          { cn: '桌子上放着红红的苹果。', pinyin: 'Zhuōzi shang fàng zhe hónghóng de píngguǒ.', vi: 'Trên bàn đặt những quả táo đỏ au.' },
        ],
        pitfall: 'Tính từ khi đã lặp lại thì KHÔNG dùng kèm phó từ chỉ mức độ như 很, 非常, 太 (Sai: 很红红的).',
      },
      {
        id: 'g-hsk2-06-2',
        title: '2. Cụm cố định "什么的" (Set Phrase "什么的")',
        formula: 'Danh từ 1 + Danh từ 2 + 什么的',
        explanation: 'Đứng ở cuối câu sau khi liệt kê vài đối tượng, mang nghĩa "vân vân", "những thứ tương tự như thế".',
        examples: [
          { cn: '今天小雪生日，我们买了蛋糕、水果什么的。', pinyin: 'Jīntiān Xiǎoxuě shēngrì, wǒmen mǎi le dàngāo, shuǐguǒ shénmede.', vi: 'Hôm nay sinh nhật Tiểu Tuyết, bọn mình mua bánh kem, trái cây vân vân.' },
          { cn: '周末我在家看书、听音乐什么的。', pinyin: 'Zhōumò wǒ zài jiā kàn shū, tīng yīnyuè shénmede.', vi: 'Cuối tuần tôi ở nhà đọc sách, nghe nhạc các thứ.' },
        ],
      },
      {
        id: 'g-hsk2-06-3',
        title: '3. Trợ từ kết cấu "地" - Nối trạng ngữ và động từ (Structural Particle "地")',
        formula: 'Tính từ / Cụm miêu tả + 地 + Động từ',
        explanation: 'Đứng sau tính từ làm trạng ngữ để bổ nghĩa cho động từ, diễn tả phương thức, thần thái hay cách thức mà hành động diễn ra.',
        examples: [
          { cn: '大家高兴地祝她生日快乐。', pinyin: 'Dàjiā gāoxìng de zhù tā shēngrì kuàilè.', vi: 'Mọi người vui vẻ chúc cô ấy sinh nhật vui vẻ.' },
          { cn: '同学们认真地听老师讲课。', pinyin: 'Tóngxuémen rènzhēn de tīng lǎoshī jiǎngkè.', vi: 'Các bạn học sinh chăm chú lắng nghe cô giáo giảng bài.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '生日', pinyin: 'shēngrì', hanViet: 'Sinh nhật', meaning: 'Sinh nhật' },
      { hanzi: '快乐', pinyin: 'kuàilè', hanViet: 'Khoái lạc', meaning: 'Vui vẻ, hạnh phúc' },
      { hanzi: '蛋糕', pinyin: 'dàngāo', hanViet: 'Đản cao', meaning: 'Bánh gato, bánh kem' },
      { hanzi: '高兴', pinyin: 'gāoxìng', hanViet: 'Cao hứng', meaning: 'Vui mừng, hứng khởi' },
      { hanzi: '送', pinyin: 'sòng', hanViet: 'Tống', meaning: 'Tặng, tiễn' },
    ],
    dialogue: {
      title: 'Bài khóa 6: Chúc mừng sinh nhật Tiểu Tuyết (小雪，生日快乐！)',
      lines: [
        { speaker: 'A', name: 'Trương Bằng', cn: '小雪，生日快乐！祝你越来越漂亮！', pinyin: 'Xiǎoxuě, shēngrì kuàilè! Zhù nǐ yuèláiyuè piàoliang!', vi: 'Tiểu Tuyết, sinh nhật vui vẻ! Chúc bạn ngày càng xinh đẹp!' },
        { speaker: 'B', name: 'Tiểu Tuyết', cn: '谢谢大家！今天能和你们一起过生日，我太高兴了。', pinyin: 'Xièxie dàjiā! Jīntiān néng hé nǐmen yìqǐ guò shēngrì, wǒ tài gāoxìng le.', vi: 'Cảm ơn mọi người! Hôm nay được đón sinh nhật cùng các bạn, mình vui quá.' },
        { speaker: 'A', name: 'Vương Nhất Phi', cn: '快许个愿，然后我们一起吹蜡烛吃蛋糕！', pinyin: 'Kuài xǔ ge yuàn, ránhòu wǒmen yìqǐ chuī làzhú chī dàngāo!', vi: 'Mau ước một điều ước đi, rồi chúng mình cùng thổi nến ăn bánh kem!' },
        { speaker: 'B', name: 'Tiểu Tuyết', cn: '好，希望我们大家都能顺利通过考试！', pinyin: 'Hǎo, xīwàng wǒmen dàjiā dōu néng shùnlì tōngguò kǎoshì!', vi: 'Được rồi, mình ước tất cả chúng ta đều thuận lợi vượt qua kỳ thi!' },
      ],
    },
  },

  '07': {
    lessonNumber: '07',
    grammarPoints: [
      {
        id: 'g-hsk2-07-1',
        title: '1. Câu phức rút gọn "一……就……" (Contracted Complex Sentence)',
        formula: 'Chủ ngữ + 一 + Hành động 1 + 就 + Hành động 2',
        explanation: 'Biểu thị hai hành động nối tiếp nhau xảy ra tức thì ("hễ... là...", "vừa mới... đã...").',
        examples: [
          { cn: '他一放学就去打篮球。', pinyin: 'Tā yí fàngxué jiù qù dǎ lánqiú.', vi: 'Cậu ấy hễ tan học là đi chơi bóng rổ ngay.' },
          { cn: '我一听这首歌就很高兴。', pinyin: 'Wǒ yì tīng zhè shǒu gē jiù hěn gāoxìng.', vi: 'Tôi hễ nghe bài hát này là cảm thấy rất vui.' },
        ],
      },
      {
        id: 'g-hsk2-07-2',
        title: '2. Bổ ngữ trạng thái (1) - Đánh giá trình độ hành động',
        formula: 'Động từ + 得 + Phó từ chỉ mức độ (很 / 非常 / 真) + Tính từ',
        explanation: 'Dùng để miêu tả, phán đoán hoặc đánh giá về kết quả, tình trạng hay mức độ của hành động diễn ra thường xuyên hoặc đã xảy ra.',
        examples: [
          { cn: '他篮球打得很好。', pinyin: 'Tā lánqiú dǎ de hěn hǎo.', vi: 'Anh ấy chơi bóng rổ rất giỏi.' },
          { cn: '大卫汉字写得非常漂亮。', pinyin: 'Dàwèi hànzì xiě de fēicháng piàoliang.', vi: 'David viết chữ Hán vô cùng đẹp.' },
        ],
      },
      {
        id: 'g-hsk2-07-3',
        title: '3. Bổ ngữ trạng thái thể phủ định (2)',
        formula: 'Động từ + 得 + 不 + Tính từ',
        explanation: 'Trong thể phủ định của bổ ngữ trạng thái, phó từ phủ định "不" bắt buộc phải đứng SAU trợ từ "得", ngay trước tính từ.',
        examples: [
          { cn: '他跑得不快。', pinyin: 'Tā pǎo de bú kuài.', vi: 'Anh ấy chạy không nhanh.' },
          { cn: '我昨天晚上睡得不好。', pinyin: 'Wǒ zuótiān wǎnshang shuì de bù hǎo.', vi: 'Tối qua tôi ngủ không ngon.' },
        ],
        pitfall: 'Tuyệt đối không đặt "不" trước động từ: Sai: 他不跑得快 -> Đúng: 他跑得不快.',
      },
    ],
    keyVocab: [
      { hanzi: '篮球', pinyin: 'lánqiú', hanViet: 'Lam cầu', meaning: 'Bóng rổ' },
      { hanzi: '打', pinyin: 'dǎ', hanViet: 'Đả', meaning: 'Chơi (thể thao bằng tay), đánh' },
      { hanzi: '跑', pinyin: 'pǎo', hanViet: 'Bào', meaning: 'Chạy' },
      { hanzi: '快', pinyin: 'kuài', hanViet: 'Khoái', meaning: 'Nhanh' },
      { hanzi: '慢', pinyin: 'màn', hanViet: 'Mạn', meaning: 'Chậm' },
    ],
    dialogue: {
      title: 'Bài khóa 7: Xem trận thi đấu bóng rổ (他们打得真好)',
      lines: [
        { speaker: 'A', name: 'David', cn: '你看，7号队员跑得真快！', pinyin: 'Nǐ kàn, qī hào duìyuán pǎo de zhēn kuài!', vi: 'Bạn nhìn kìa, cầu thủ số 7 chạy nhanh thật đấy!' },
        { speaker: 'B', name: 'Lý Văn', cn: '是啊，他投篮投得非常准，他们打得真好！', pinyin: 'Shì a, tā tóulán tóu de fēicháng zhǔn, tāmen dǎ de zhēn hǎo!', vi: 'Đúng vậy, cậu ấy ném rổ chuẩn xác dã man, bọn họ chơi hay thật đấy!' },
        { speaker: 'A', name: 'David', cn: '你平时常常打篮球吗？', pinyin: 'Nǐ píngshí chángcháng dǎ lánqiú ma?', vi: 'Bình thường bạn có hay chơi bóng rổ không?' },
        { speaker: 'B', name: 'Lý Văn', cn: '我打得不好，我更喜欢踢足球。', pinyin: 'Wǒ dǎ de bù hǎo, wǒ gèng xǐhuan tī zúqiú.', vi: 'Mình chơi không tốt lắm, mình thích đá bóng hơn.' },
      ],
    },
  },

  '08': {
    lessonNumber: '08',
    grammarPoints: [
      {
        id: 'g-hsk2-08-1',
        title: '1. Câu so sánh chữ "比" cơ bản (Comparative Sentences 1)',
        formula: 'A + 比 + B + Tính từ',
        explanation: 'Biểu thị đối tượng A có mức độ về một tính chất nào đó cao hơn đối tượng B.',
        examples: [
          { cn: '今天比昨天热。', pinyin: 'Jīntiān bǐ zuótiān rè.', vi: 'Hôm nay nóng hơn hôm qua.' },
          { cn: '他哥哥比他高。', pinyin: 'Tā gēge bǐ tā gāo.', vi: 'Anh trai anh ấy cao hơn anh ấy.' },
        ],
        pitfall: 'Trong câu so sánh chữ "比", tính từ KHÔNG được đi kèm với các phó từ chỉ mức độ như 很, 非常, 太 (Sai: 今天比昨天很热).',
      },
      {
        id: 'g-hsk2-08-2',
        title: '2. Câu so sánh chữ "比" có mức độ chênh lệch (Comparative Sentences 2)',
        formula: 'A + 比 + B + Tính từ + (一点儿 / 得多 / 多了 / Số lượng cụ thể)',
        explanation: 'Dùng để bổ sung mức độ chênh lệch ít ("一点儿"), chênh lệch nhiều ("得多 / 多了") hoặc con số chênh lệch cụ thể.',
        examples: [
          { cn: '这件衣服比那件贵一点儿。', pinyin: 'Zhè jiàn yīfu bǐ nà jiàn guì yìdiǎnr.', vi: 'Bộ quần áo này đắt hơn bộ kia một chút.' },
          { cn: '他比我大三岁。', pinyin: 'Tā bǐ wǒ dà sān suì.', vi: 'Anh ấy lớn hơn tôi ba tuổi.' },
        ],
      },
      {
        id: 'g-hsk2-08-3',
        title: '3. Câu phức chuyển tiếp "虽然……，但是……" (Adversative Complex Sentence)',
        formula: '虽然 + [Vế nhượng bộ]，但是 + [Vế chuyển ngoặt]',
        explanation: 'Biểu thị ý tương phản giữa hai vế câu ("Tuy... nhưng...").',
        examples: [
          { cn: '虽然你忘了，但是我记得。', pinyin: 'Suīrán nǐ wàng le, dànshì wǒ jìde.', vi: 'Mặc dù bạn đã quên rồi, nhưng tôi vẫn nhớ.' },
          { cn: '虽然汉语有点儿难，但是很有意思。', pinyin: 'Suīrán Hànyǔ yǒudiǎnr nán, dànshì hěn yǒu yìsi.', vi: 'Tuy tiếng Hán hơi khó nhưng rất thú vị.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '虽然', pinyin: 'suīrán', hanViet: 'Tuy nhiên', meaning: 'Tuy rằng, mặc dù' },
      { hanzi: '但是', pinyin: 'dànshì', hanViet: 'Đãn thị', meaning: 'Nhưng, thế nhưng' },
      { hanzi: '记得', pinyin: 'jìde', hanViet: 'Ký đắc', meaning: 'Nhớ, còn nhớ' },
      { hanzi: '忘', pinyin: 'wàng', hanViet: 'Vong', meaning: 'Quên' },
      { hanzi: '比', pinyin: 'bǐ', hanViet: 'Tỷ', meaning: 'So với' },
    ],
    dialogue: {
      title: 'Bài khóa 8: Trò chuyện về người bạn thân (我比你更了解他)',
      lines: [
        { speaker: 'A', name: 'Tiểu Tuyết', cn: '你觉得张朋会同意参加这次旅行吗？', pinyin: 'Nǐ juéde Zhāng Péng huì tóngyì cānjiā zhè cì lǚxíng ma?', vi: 'Bạn nghĩ Trương Bằng có đồng ý tham gia chuyến đi lần này không?' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '我比你更了解他，他最喜欢旅行了，一定会去的。', pinyin: 'Wǒ bǐ nǐ gèng liǎojiě tā, tā zuì xǐhuan lǚxíng le, yídìng huì qù de.', vi: 'Mình hiểu anh ấy hơn bạn đấy, anh ấy mê du lịch nhất, chắc chắn sẽ đi.' },
        { speaker: 'A', name: 'Tiểu Tuyết', cn: '虽然他最近工作很忙，但是周末应该有时间。', pinyin: 'Suīrán tā zuìjìn gōngzuò hěn máng, dànshì zhōumò yīnggāi yǒu shíjiān.', vi: 'Tuy dạo này anh ấy rất bận việc, nhưng cuối tuần chắc có thời gian.' },
        { speaker: 'B', name: 'Vương Nhất Phi', cn: '没错，我现在就给他打电话！', pinyin: 'Méicuò, wǒ xiànzài jiù gěi tā dǎ diànhuà!', vi: 'Chuẩn luôn, mình gọi điện cho anh ấy ngay đây!' },
      ],
    },
  },

  '09': {
    lessonNumber: '09',
    grammarPoints: [
      {
        id: 'g-hsk2-09-1',
        title: '1. Câu so sánh dạng phủ định "A 没有 B + Tính từ"',
        formula: 'A + 没有 + B + (这么 / 那么) + Tính từ',
        explanation: 'Biểu thị A không bằng B về mặt tính chất nào đó.',
        examples: [
          { cn: '奶茶没有咖啡那么苦。', pinyin: 'Nǎichá méiyǒu kāfēi nàme kǔ.', vi: 'Trà sữa không đắng như cà phê.' },
          { cn: '今天没有昨天冷。', pinyin: 'Jīntiān méiyǒu zuótiān lěng.', vi: 'Hôm nay không lạnh bằng hôm qua.' },
        ],
      },
      {
        id: 'g-hsk2-09-2',
        title: '2. Giới từ / Động từ "离" biểu thị cự ly, khoảng cách',
        formula: 'Địa điểm A + 离 + Địa điểm B + (很远 / 很近 / Khoảng cách cụ thể)',
        explanation: 'Dùng để đo lường khoảng cách về không gian hoặc thời gian giữa hai mốc điểm.',
        examples: [
          { cn: '我家离奶茶店很近。', pinyin: 'Wǒ jiā lí nǎichá diàn hěn jìn.', vi: 'Nhà tôi cách quán trà sữa rất gần.' },
          { cn: '学校离机场有三十公里。', pinyin: 'Xuéxiào lí jīchǎng yǒu sānshí gōnglǐ.', vi: 'Trường học cách sân bay ba mươi cây số.' },
        ],
      },
      {
        id: 'g-hsk2-09-3',
        title: '3. Bổ ngữ thời lượng (1) - Complement of Duration',
        formula: 'Chủ ngữ + Động từ + (了) + Khoảng thời gian + Tân ngữ',
        explanation: 'Biểu thị độ dài thời gian mà hành động kéo dài hoặc được duy trì.',
        examples: [
          { cn: '我在奶茶店坐了一个小时。', pinyin: 'Wǒ zài nǎichá diàn zuò le yí gè xiǎoshí.', vi: 'Tôi đã ngồi ở quán trà sữa một tiếng đồng hồ.' },
          { cn: '他学了两年汉语。', pinyin: 'Tā xué le liǎng nián Hànyǔ.', vi: 'Anh ấy đã học tiếng Hán hai năm.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '奶茶', pinyin: 'nǎichá', hanViet: 'Nãi trà', meaning: 'Trà sữa' },
      { hanzi: '离', pinyin: 'lí', hanViet: 'Ly', meaning: 'Cách, rời khỏi' },
      { hanzi: '近', pinyin: 'jìn', hanViet: 'Cận', meaning: 'Gần' },
      { hanzi: '远', pinyin: 'yuǎn', hanViet: 'Viễn', meaning: 'Xa' },
      { hanzi: '小时', pinyin: 'xiǎoshí', hanViet: 'Tiểu thời', meaning: 'Giờ, tiếng đồng hồ' },
    ],
    dialogue: {
      title: 'Bài khóa 9: Gọi trà sữa ở tiệm Momo Tea (这杯奶茶没有那杯甜)',
      lines: [
        { speaker: 'A', name: 'Anna', cn: '这家店离学校真近，你想喝哪种奶茶？', pinyin: 'Zhè jiā diàn lí xuéxiào zhēn jìn, nǐ xiǎng hē nǎ zhǒng nǎichá?', vi: 'Quán này gần trường thật đấy, bạn muốn uống loại trà sữa nào?' },
        { speaker: 'B', name: 'Tiểu Tuyết', cn: '我要少糖的乌龙奶茶，这杯奶茶没有那杯甜，更好喝。', pinyin: 'Wǒ yào shǎotáng de wūlóng nǎichá, zhè bēi nǎichá méiyǒu nà bēi tián, gèng hǎohē.', vi: 'Mình lấy trà ô long sữa ít đường, cốc này không ngọt bằng cốc kia, uống ngon hơn.' },
        { speaker: 'A', name: 'Anna', cn: '那我也要一杯一样的，加一份珍珠！', pinyin: 'Nà wǒ yě yào yì bēi yíyàng de, jiā yí fèn zhēnzhū!', vi: 'Thế mình cũng lấy một cốc giống vậy, thêm một phần trân châu!' },
        { speaker: 'B', name: 'Tiểu Tuyết', cn: '好的，服务员，我们要两杯半糖乌龙奶茶！', pinyin: 'Hǎo de, fúwùyuán, wǒmen yào liǎng bēi bàntáng wūlóng nǎichá!', vi: 'Được rồi, bạn phục vụ ơi, cho chúng mình 2 cốc ô long sữa 50% đường nhé!' },
      ],
    },
  },

  '10': {
    lessonNumber: '10',
    grammarPoints: [
      {
        id: 'g-hsk2-10-1',
        title: '1. Câu có cụm chủ - vị làm vị ngữ (Sentences with S-P Predicate)',
        formula: 'Chủ ngữ lớn + [Chủ ngữ nhỏ + Vị ngữ nhỏ]',
        explanation: 'Cụm chủ vị nhỏ đóng vai trò giải thích, miêu tả một phương diện cụ thể của chủ ngữ lớn.',
        examples: [
          { cn: '他身体很好。', pinyin: 'Tā shēntǐ hěn hǎo.', vi: 'Sức khỏe của anh ấy rất tốt.' },
          { cn: '这门考试题很多。', pinyin: 'Zhè mén kǎoshì tí hěn duō.', vi: 'Môn thi này đề bài rất nhiều.' },
        ],
      },
      {
        id: 'g-hsk2-10-2',
        title: '2. Câu hỏi lựa chọn với "还是" (Alternative Questions)',
        formula: 'Lựa chọn A + 还是 + Lựa chọn B？',
        explanation: 'Đưa ra hai phương án để người nghe lựa chọn một trong hai.',
        examples: [
          { cn: '你明天上午考试还是下午考试？', pinyin: 'Nǐ míngtiān shàngwǔ kǎoshì háishì xiàwǔ kǎoshì?', vi: 'Bạn thi sáng mai hay thi chiều mai?' },
          { cn: '你想喝热茶还是凉茶？', pinyin: 'Nǐ xiǎng hē rè chá háishì liáng chá?', vi: 'Bạn muốn uống trà nóng hay trà đá?' },
        ],
      },
      {
        id: 'g-hsk2-10-3',
        title: '3. Định thức sắp sửa xảy ra: "就要……了 / 快要……了"',
        formula: 'Chủ ngữ + (快 / 快要 / 就要 / 要) + Động từ + 了',
        explanation: 'Biểu thị sự việc sẽ xảy ra trong một tương lai rất gần.',
        examples: [
          { cn: '就要考试了，大家都在复习。', pinyin: 'Jiù yào kǎoshì le, dàjiā dōu zài fùxí.', vi: 'Sắp thi rồi, mọi người đều đang ôn tập.' },
          { cn: '火车快要开了。', pinyin: 'Huǒchē kuàiyào kāi le.', vi: 'Xe lửa sắp chạy rồi.' },
        ],
        pitfall: 'Khi câu có từ chỉ thời gian cụ thể (như 明天, 下周), chỉ dùng "就要……了", KHÔNG dùng "快要……了" (Ví dụ đúng: 明天下课后我们就要回国了).',
      },
    ],
    keyVocab: [
      { hanzi: '考试', pinyin: 'kǎoshì', hanViet: 'Khảo thí', meaning: 'Kỳ thi, thi cử' },
      { hanzi: '复习', pinyin: 'fùxí', hanViet: 'Phục tập', meaning: 'Ôn tập' },
      { hanzi: '题', pinyin: 'tí', hanViet: 'Đề', meaning: 'Câu hỏi thi, đề bài' },
      { hanzi: '快', pinyin: 'kuài', hanViet: 'Khoái', meaning: 'Sắp sửa, nhanh' },
    ],
    dialogue: {
      title: 'Bài khóa 10: Ôn tập trước giờ thi ở thư viện (考试快要开始了)',
      lines: [
        { speaker: 'A', name: 'Trương Bằng', cn: '考试快要开始了，你复习好了吗？', pinyin: 'Kǎoshì kuàiyào kāishǐ le, nǐ fùxí hǎo le ma?', vi: 'Kỳ thi sắp bắt đầu rồi, bạn đã ôn tập kỹ chưa?' },
        { speaker: 'B', name: 'David', cn: '词汇我都记住了，就是听力还是有点儿担心。', pinyin: 'Cíhuì wǒ dōu jìzhù le, jiùshì tīnglì háishì yǒudiǎnr dānxīn.', vi: 'Từ vựng thì mình nhớ hết rồi, chỉ là phần nghe hiểu vẫn hơi lo lắng.' },
        { speaker: 'A', name: 'Trương Bằng', cn: '别紧张，放轻松！只要听懂关键词就没问题。', pinyin: 'Bié jǐnzhāng, fàng qīngsōng! Zhǐyào tīng dǒng guānjiàn cí jiù méi wèntí.', vi: 'Đừng căng thẳng, thả lỏng ra! Chỉ cần nghe hiểu từ khóa là không sao đâu.' },
        { speaker: 'B', name: 'David', cn: '谢谢你鼓励我，我们一起加油！', pinyin: 'Xièxie nǐ gǔlì wǒ, wǒmen yìqǐ jiāyóu!', vi: 'Cảm ơn bạn đã động viên mình, chúng mình cùng cố lên nhé!' },
      ],
    },
  },

  '11': {
    lessonNumber: '11',
    grammarPoints: [
      {
        id: 'g-hsk2-11-1',
        title: '1. Trợ từ động thái "着" (1) - Duy trì trạng thái',
        formula: 'Địa điểm / Chủ ngữ + Động từ + 着 + Tân ngữ',
        explanation: 'Biểu thị một trạng thái tĩnh đang tiếp diễn hoặc một tư thế hành động đang được duy trì.',
        examples: [
          { cn: '门开着呢，请进。', pinyin: 'Mén kāi zhe ne, qǐng jìn.', vi: 'Cửa đang mở đấy, xin mời vào.' },
          { cn: '墙上挂着一张中国地图。', pinyin: 'Qiáng shang guà zhe yì zhāng Zhōngguó dìtú.', vi: 'Trên tường đang treo một tấm bản đồ Trung Quốc.' },
        ],
      },
      {
        id: 'g-hsk2-11-2',
        title: '2. Trợ từ động thái "着" (2) - Phương thức hành động kèm theo',
        formula: 'Động từ 1 + 着 + Động từ 2',
        explanation: 'Động từ 1 biểu thị phương thức, tư thế hoặc trạng thái khi thực hiện động từ 2.',
        examples: [
          { cn: '他们坐着聊中国菜。', pinyin: 'Tāmen zuò zhe liáo Zhōngguó cài.', vi: 'Họ ngồi tán gẫu về các món ăn Trung Hoa.' },
          { cn: '老师笑着对我说："欢迎你！"', pinyin: 'Lǎoshī xiào zhe duì wǒ shuō: "Huānyíng nǐ!"', vi: 'Cô giáo cười nói với tôi: "Hoan nghênh em!"' },
        ],
      },
      {
        id: 'g-hsk2-11-3',
        title: '3. Phó từ chỉ mức độ cao nhất "最" (Adverb of Degree "最")',
        formula: '最 + Tính từ / Động từ tâm lý (喜欢, 爱, 想)',
        explanation: 'Xác định đối tượng đứng đầu tuyệt đối trong một phạm vi đánh giá.',
        examples: [
          { cn: '我最喜欢吃中国菜。', pinyin: 'Wǒ zuì xǐhuan chī Zhōngguó cài.', vi: 'Tôi thích ăn món ăn Trung Quốc nhất.' },
          { cn: '秋天去北京最合适。', pinyin: 'Qiūtiān qù Běijīng zuì héshì.', vi: 'Mùa thu đến Bắc Kinh là thích hợp nhất.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '中国菜', pinyin: 'Zhōngguó cài', hanViet: 'Trung Quốc thái', meaning: 'Món ăn Trung Hoa' },
      { hanzi: '最', pinyin: 'zuì', hanViet: 'Tối', meaning: 'Nhất' },
      { hanzi: '着', pinyin: 'zhe', hanViet: 'Trước', meaning: 'Đang (duy trì trạng thái)' },
      { hanzi: '笑', pinyin: 'xiào', hanViet: 'Tiếu', meaning: 'Cười' },
      { hanzi: '味道', pinyin: 'wèidao', hanViet: 'Vị đạo', meaning: 'Hương vị, mùi vị' },
    ],
    dialogue: {
      title: 'Bài khóa 11: Bữa tiệc ẩm thực Trung Hoa (桌子上放着很多菜)',
      lines: [
        { speaker: 'A', name: 'Chủ nhà', cn: '快坐快坐，桌子上放着很多菜，大家多吃点儿！', pinyin: 'Kuài zuò kuài zuò, zhuōzi shang fàngzhe hěn duō cài, dàjiā duō chī diǎnr!', vi: 'Mau ngồi xuống, trên bàn bày rất nhiều món ăn, mọi người ăn nhiều vào nhé!' },
        { speaker: 'B', name: 'Khách', cn: '哇，有北京烤鸭、宫保鸡丁，太丰盛了！', pinyin: 'Wā, yǒu Běijīng kǎoyā, Gōngbǎo jīdīng, tài fēngshèng le!', vi: 'Oa, có vịt quay Bắc Kinh, gà Cung Bảo, thịnh soạn quá!' },
        { speaker: 'A', name: 'Chủ nhà', cn: '你最喜欢吃哪道菜？尝尝这个麻婆豆腐。', pinyin: 'Nǐ zuì xǐhuan chī nǎ dào cài? Chángchang zhège Mápó dòufu.', vi: 'Bạn thích ăn món nào nhất? Nếm thử món đậu phụ Ma Bà này xem.' },
        { speaker: 'B', name: 'Khách', cn: '味道好极了，又香又辣，真地道！', pinyin: 'Wèidào hǎo jí le, yòu xiāng yòu là, zhēn dìdao!', vi: 'Vị ngon tuyệt đỉnh, vừa thơm vừa cay, chuẩn vị thật đấy!' },
      ],
    },
  },

  '12': {
    lessonNumber: '12',
    grammarPoints: [
      {
        id: 'g-hsk2-12-1',
        title: '1. Câu so sánh chữ "比" kết hợp "更 / 还" (Comparative Sentences 4)',
        formula: 'A + 比 + B + 更 / 还 + Tính từ',
        explanation: 'Nhấn mạnh bản thân B đã mang tính chất đó ở mức độ cao, nhưng A lại "càng... hơn nữa".',
        examples: [
          { cn: '这里比北京冷得多，冬天更冷。', pinyin: 'Zhèlǐ bǐ Běijīng lěng de duō, dōngtiān gèng lěng.', vi: 'Ở đây lạnh hơn Bắc Kinh nhiều, mùa đông lại càng lạnh hơn.' },
          { cn: '他比我跑得更快。', pinyin: 'Tā bǐ wǒ pǎo de gèng kuài.', vi: 'Cậu ấy chạy còn nhanh hơn tôi.' },
        ],
      },
      {
        id: 'g-hsk2-12-2',
        title: '2. So sánh ngang bằng "A 跟 / 和 B 一样 (+ Tính từ)"',
        formula: 'A + 跟 / 和 + B + 一样 (+ Tính từ)',
        explanation: 'Biểu thị sự tương đồng hoặc ngang bằng giữa hai đối tượng so sánh.',
        examples: [
          { cn: '这里的冬天跟北京一样冷。', pinyin: 'Zhèlǐ de dōngtiān gēn Běijīng yíyàng lěng.', vi: 'Mùa đông ở đây cũng lạnh giống như Bắc Kinh.' },
          { cn: '他的爱好跟我一样。', pinyin: 'Tā de àihào gēn wǒ yíyàng.', vi: 'Sở thích của anh ấy giống như tôi.' },
        ],
      },
      {
        id: 'g-hsk2-12-3',
        title: '3. So sánh khác biệt "A 跟 / 和 B 不一样 (+ Tính từ)"',
        formula: 'A + 跟 / 和 + B + 不一样 (+ Tính từ)',
        explanation: 'Biểu thị hai đối tượng có sự khác biệt hoặc không tương đồng.',
        examples: [
          { cn: '这里的气候跟北京不一样。', pinyin: 'Zhèlǐ de qìhòu gēn Běijīng bù yíyàng.', vi: 'Khí hậu ở đây không giống với Bắc Kinh.' },
          { cn: '他的想法跟我不一样。', pinyin: 'Tā de xiǎngfǎ gēn wǒ bù yíyàng.', vi: 'Suy nghĩ của anh ấy khác tôi.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '冷', pinyin: 'lěng', hanViet: 'Lãnh', meaning: 'Lạnh' },
      { hanzi: '热', pinyin: 'rè', hanViet: 'Nhiệt', meaning: 'Nóng' },
      { hanzi: '更', pinyin: 'gèng', hanViet: 'Canh', meaning: 'Càng, hơn nữa' },
      { hanzi: '一样', pinyin: 'yíyàng', hanViet: 'Nhất dạng', meaning: 'Giống nhau' },
      { hanzi: '气候', pinyin: 'qìhòu', hanViet: 'Khí hậu', meaning: 'Khí hậu' },
    ],
    dialogue: {
      title: 'Bài khóa 12: Thời tiết mùa đông Bắc Kinh (今天比昨天还冷)',
      lines: [
        { speaker: 'A', name: 'Anna', cn: '今天真冷啊，风刮得好大！', pinyin: 'Jīntiān zhēn lěng a, fēng guā de hǎo dà!', vi: 'Hôm nay lạnh thật đấy, gió thổi mạnh quá!' },
        { speaker: 'B', name: 'Lý Văn', cn: '气象预报说今天零下十度，今天比昨天还冷。', pinyin: 'Qìxiàng yùbào shuō jīntiān língxià shí dù, jīntiān bǐ zuótiān hái lěng.', vi: 'Dự báo thời tiết nói hôm nay âm 10 độ, hôm nay còn rét hơn hôm qua nữa.' },
        { speaker: 'A', name: 'Anna', cn: '这里的冬天和我们国家完全不一样，太神奇了。', pinyin: 'Zhèlǐ de dōngtiān hé wǒmen guójiā wánquán bù yíyàng, tài shénqí le.', vi: 'Mùa đông ở đây hoàn toàn khác với đất nước mình, kỳ diệu thật đấy.' },
        { speaker: 'B', name: 'Lý Văn', cn: '走，我们去吃热气腾腾的火锅暖暖身子！', pinyin: 'Zǒu, wǒmen qù chī rèqì téngténg de huǒguō nuǎnnuan shēnzi!', vi: 'Đi nào, chúng mình đi ăn lẩu nghi ngút khói cho ấm người!' },
      ],
    },
  },

  '13': {
    lessonNumber: '13',
    grammarPoints: [
      {
        id: 'g-hsk2-13-1',
        title: '1. Câu mang hai tân ngữ (2) - Double-Object Sentences',
        formula: 'Chủ ngữ + Động từ (送 / 教 / 借 / 问 / 给) + Tân ngữ 1 (Người) + Tân ngữ 2 (Vật)',
        explanation: 'Tân ngữ gián tiếp chỉ người đứng trước, tân ngữ trực tiếp chỉ sự vật đứng sau.',
        examples: [
          { cn: '王老师教我们中文。', pinyin: 'Wáng lǎoshī jiāo wǒmen Zhōngwén.', vi: 'Cô giáo Vương dạy chúng tôi tiếng Trung.' },
          { cn: '朋友送给我一本中文词典。', pinyin: 'Péngyou sòng gěi wǒ yì běn Zhōngwén cídiǎn.', vi: 'Bạn bè tặng cho tôi một cuốn từ điển tiếng Trung.' },
        ],
      },
      {
        id: 'g-hsk2-13-2',
        title: '2. Câu so sánh phản bác "A 不比 B + Tính từ"',
        formula: 'A + 不比 + B + Tính từ',
        explanation: 'Dùng trong ngữ cảnh phản bác lại nhận định của đối phương, mang ý nghĩa: "A chẳng kém gì B / A cũng chẳng thua kém B đâu".',
        examples: [
          { cn: '学中文不比学法文难。', pinyin: 'Xué Zhōngwén bù bǐ xué Fǎwén nán.', vi: 'Học tiếng Trung đâu có khó hơn học tiếng Pháp.' },
          { cn: '这台电脑不比那台差。', pinyin: 'Zhè tái diànnǎo bù bǐ nà tái chà.', vi: 'Chiếc máy tính này đâu có thua kém chiếc kia.' },
        ],
      },
      {
        id: 'g-hsk2-13-3',
        title: '3. So sánh mức độ thực hiện hành động: A 比 B + 早/晚/多/少 + Động từ',
        formula: 'A + 比 + B + (早 / 晚 / 多 / 少) + Động từ + (Số lượng)',
        explanation: 'Dùng khi muốn so sánh sự chênh lệch về thời điểm hoặc mức độ thực hiện động tác.',
        examples: [
          { cn: '他今天比我早到了十分钟。', pinyin: 'Tā jīntiān bǐ wǒ zǎo dào le shí fēnzhōng.', vi: 'Hôm nay cậu ấy đến sớm hơn tôi mười phút.' },
          { cn: '你应该比昨天多学半个小时。', pinyin: 'Nǐ yīnggāi bǐ zuótiān duō xué bàn ge xiǎoshí.', vi: 'Bạn nên học nhiều hơn hôm qua nửa tiếng.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '爱', pinyin: 'ài', hanViet: 'Ái', meaning: 'Yêu, say mê, thích' },
      { hanzi: '教', pinyin: 'jiāo', hanViet: 'Giáo', meaning: 'Dạy học' },
      { hanzi: '借', pinyin: 'jiè', hanViet: 'Tá', meaning: 'Mượn, vay' },
      { hanzi: '早', pinyin: 'zǎo', hanViet: 'Tảo', meaning: 'Sớm' },
      { hanzi: '晚', pinyin: 'wǎn', hanViet: 'Vãn', meaning: 'Muộn' },
    ],
    dialogue: {
      title: 'Bài khóa 13: Giờ học tiếng Trung trên giảng đường (老师让我们读课文)',
      lines: [
        { speaker: 'A', name: 'Thầy giáo', cn: '同学们，请打开书，翻到第80页。', pinyin: 'Tóngxuémen, qǐng dǎkāi shū, fāndào dì-bāshí yè.', vi: 'Các em học sinh, xin mời mở sách, lật đến trang số 80.' },
        { speaker: 'B', name: 'Sinh viên', cn: '老师，今天我们要学哪篇课文？', pinyin: 'Lǎoshī, jīntiān wǒmen yào xué nǎ piān kèwén?', vi: 'Thưa thầy, hôm nay chúng ta học bài khóa nào ạ?' },
        { speaker: 'A', name: 'Thầy giáo', cn: '今天我们读第三篇课文，大家跟着我读一遍。', pinyin: 'Jīntiān wǒmen dú dì-sān piān kèwén, dàjiā gēnzhe wǒ dú yí biàn.', vi: 'Hôm nay chúng ta đọc bài khóa số 3, cả lớp đọc theo thầy một lượt nhé.' },
        { speaker: 'B', name: 'Sinh viên', cn: '好的老师，我们已经准备好了！', pinyin: 'Hǎo de lǎoshī, wǒmen yǐjīng zhǔnbèi hǎo le!', vi: 'Vâng thưa thầy, chúng em đã sẵn sàng rồi ạ!' },
      ],
    },
  },

  '14': {
    lessonNumber: '14',
    grammarPoints: [
      {
        id: 'g-hsk2-14-1',
        title: '1. Câu tồn hiện (2) - Nơi chốn + Động từ + 着 / 了 + Danh từ',
        formula: 'Từ chỉ nơi chốn + Động từ + (着 / 了) + Danh từ (Sự vật tồn tại hoặc xuất hiện)',
        explanation: 'Dùng để diễn tả sự tồn tại, xuất hiện hoặc biến mất của người/sự vật tại một không gian xác định.',
        examples: [
          { cn: '桌子上摆着很多好吃的年货。', pinyin: 'Zhuōzi shang bǎi zhe hěn duō hǎochī de niánhuò.', vi: 'Trên bàn bày biện rất nhiều đồ Tết ngon lành.' },
          { cn: '门口贴着一张红色的福字。', pinyin: 'Ménkǒu tiē zhe yì zhāng hóngsè de fú zì.', vi: 'Trước cửa dán một chữ Phúc màu đỏ.' },
        ],
      },
      {
        id: 'g-hsk2-14-2',
        title: '2. Phó từ cảm thán "多" trong câu cảm thán (Adverb "多")',
        formula: '多 + Tính từ + (啊)！',
        explanation: 'Nhấn mạnh mức độ cao trong cảm xúc người nói (tương tự "Biết bao!", "Thật là...!").',
        examples: [
          { cn: '一个人过年多没意思啊！', pinyin: 'Yí gè rén guò nián duō méi yìsi a!', vi: 'Một mình ăn Tết thật là tẻ nhạt biết bao!' },
          { cn: '这里的风景多美啊！', pinyin: 'Zhèlǐ de fēngjǐng duō měi a!', vi: 'Phong cảnh nơi này đẹp biết nhường nào!' },
        ],
      },
      {
        id: 'g-hsk2-14-3',
        title: '3. Bổ ngữ xu hướng kép (Compound Complement of Direction)',
        formula: 'Động từ + (上来 / 下来 / 进来 / 出来 / 回来 / 过来 / 起来 | 上去 / 下去 / 进去 / 出去 / 回去 / 过去)',
        explanation: 'Gồm hai thành tố chỉ xu hướng ghép lại để biểu thị hướng chuyển động phức hợp của động tác.',
        examples: [
          { cn: '他们从房间里走出来了。', pinyin: 'Tāmen cóng fángjiān lǐ zǒu chūlai le.', vi: 'Họ từ trong phòng bước ra ngoài.' },
          { cn: '天冷了，大家都穿上了厚衣服。', pinyin: 'Tiān lěng le, dàjiā dōu chuān shang le hòu yīfu.', vi: 'Trời lạnh rồi, ai nấy đều mặc áo ấm vào.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '过年', pinyin: 'guònián', hanViet: 'Quá niên', meaning: 'Đón Tết, ăn Tết' },
      { hanzi: '意思', pinyin: 'yìsi', hanViet: 'Ý tư', meaning: 'Ý nghĩa, điều thú vị' },
      { hanzi: '春联', pinyin: 'chūnlián', hanViet: 'Xuân liên', meaning: 'Câu đối Tết' },
      { hanzi: '热闹', pinyin: 'rènao', hanViet: 'Nhiệt náo', meaning: 'Náo nhiệt, rộn ràng' },
    ],
    dialogue: {
      title: 'Bài khóa 14: Không khí Tết Nguyên Đán (外面挂着大红灯笼)',
      lines: [
        { speaker: 'A', name: 'David', cn: '门外挂着大红灯笼，贴着春联，真喜庆！', pinyin: 'Mén wài guàzhe dà hóng dēnglong, tiēzhe chūnlián, zhēn xǐqìng!', vi: 'Ngoài cửa treo đèn lồng đỏ lớn, dán câu đối xuân, rực rỡ vui tươi quá!' },
        { speaker: 'B', name: 'Trương Bằng', cn: '过年了嘛！在中国，红色代表吉祥和幸福。', pinyin: 'Guò nián le ma! Zài Zhōngguó, hóngsè dàibiǎo jíxiáng hé xìngfú.', vi: 'Tết đến rồi mà! Ở Trung Quốc, màu đỏ tượng trưng cho cát tường và hạnh phúc.' },
        { speaker: 'A', name: 'David', cn: '一家人一起包饺子过年，多有意思啊！', pinyin: 'Yì jiā rén yìqǐ bāo jiǎozi guò nián, duō yǒu yìsi a!', vi: 'Cả gia đình cùng nhau gói sủi cảo đón Tết, ý nghĩa biết bao!' },
        { speaker: 'B', name: 'Trương Bằng', cn: '来，洗洗手，我教你包元宝形状的饺子！', pinyin: 'Lái, xǐxi shǒu, wǒ jiāo nǐ bāo yuánbǎo xíngzhuàng de jiǎozi!', vi: 'Nào, rửa tay đi, mình dạy bạn gói sủi cảo hình đĩnh vàng nhé!' },
      ],
    },
  },

  '15': {
    lessonNumber: '15',
    grammarPoints: [
      {
        id: 'g-hsk2-15-1',
        title: '1. Bổ ngữ động lượng (1) - Complement of Frequency',
        formula: 'Chủ ngữ + Động từ + (Số từ + Lượng từ: 次 / 遍 / 趟)',
        explanation: 'Biểu thị số lần diễn ra của hành động (次: lần chung chung, 遍: lượt từ đầu đến cuối, 趟: chuyến đi lại).',
        examples: [
          { cn: '我想再去一次中国。', pinyin: 'Wǒ xiǎng zài qù yí cì Zhōngguó.', vi: 'Tôi muốn đến Trung Quốc thêm một lần nữa.' },
          { cn: '这篇课文我读了三遍。', pinyin: 'Zhè piān kèwén wǒ dú le sān biàn.', vi: 'Bài khóa này tôi đã đọc ba lượt.' },
        ],
      },
      {
        id: 'g-hsk2-15-2',
        title: '2. Vị trí tân ngữ trong bổ ngữ động lượng (2)',
        formula: 'Tân ngữ chỉ người: V + Tân ngữ + Bổ ngữ động lượng | Tân ngữ chỉ vật: V + Bổ ngữ động lượng + Tân ngữ',
        explanation: 'Nếu tân ngữ là đại từ chỉ người, tân ngữ đứng TRƯỚC số lần; nếu là danh từ chỉ sự vật/nơi chốn, số lần thường đứng trước tân ngữ.',
        examples: [
          { cn: '我找过他三次。', pinyin: 'Wǒ zhǎo guo tā sān cì.', vi: 'Tôi từng tìm cậu ấy ba lần (tân ngữ chỉ người đứng trước).' },
          { cn: '我看过两次那个电影。', pinyin: 'Wǒ kàn guo liǎng cì nàge diànyǐng.', vi: 'Tôi đã xem bộ phim đó hai lần (tân ngữ chỉ vật đứng sau).' },
        ],
        pitfall: 'Quy tắc: Đại từ nhân xưng (tôi, anh ấy, thầy giáo...) luôn đứng trước từ chỉ số lần (找过他两次, không nói 找过两次他).',
      },
      {
        id: 'g-hsk2-15-3',
        title: '3. Câu chữ "有" biểu thị đạt đến mức độ/kích thước: "有……这么/那么"',
        formula: 'A + 有 + B + (这么 / 那么) + Tính từ',
        explanation: 'Biểu thị sự việc hoặc đối tượng A đã đạt đến mức độ, trình độ hoặc quy mô tương đương với B.',
        examples: [
          { cn: '这棵树有三层楼那么高。', pinyin: 'Zhè kē shù yǒu sān céng lóu nàme gāo.', vi: 'Cây này cao bằng cả tòa nhà ba tầng.' },
          { cn: '他的汉语有中国老师那么好。', pinyin: 'Tā de Hànyǔ yǒu Zhōngguó lǎoshī nàme hǎo.', vi: 'Tiếng Hán của bạn ấy giỏi như thầy giáo Trung Quốc.' },
        ],
      },
    ],
    keyVocab: [
      { hanzi: '再', pinyin: 'zài', hanViet: 'Tái', meaning: 'Lại, lần nữa' },
      { hanzi: '次', pinyin: 'cì', hanViet: 'Thứ', meaning: 'Lần, lượt' },
      { hanzi: '遍', pinyin: 'biàn', hanViet: 'Biến', meaning: 'Lượt (từ đầu đến cuối)' },
      { hanzi: '进步', pinyin: 'jìnbù', hanViet: 'Tiến bộ', meaning: 'Tiến bộ' },
      { hanzi: '希望', pinyin: 'xīwàng', hanViet: 'Hy vọng', meaning: 'Hy vọng' },
    ],
    dialogue: {
      title: 'Bài khóa 15: Chia tay tại sân bay Đại Hưng (祝大家一路平安！)',
      lines: [
        { speaker: 'A', name: 'Tiểu Ngữ', cn: '你们的行李都托运好了吗？', pinyin: 'Nǐmen de xíngli dōu tuōyùn hǎo le ma?', vi: 'Hành lý của các bạn đã gửi ký gửi xong hết chưa?' },
        { speaker: 'B', name: 'Sinh viên quốc tế', cn: '都办好了。这一年在中国学习，真舍不得离开！', pinyin: 'Dōu bàn hǎo le. Zhè yì nián zài Zhōngguó xuéxí, zhēn shěbude líkāi!', vi: 'Xong xuôi hết rồi. Một năm học tập tại Trung Quốc này, thật không nỡ rời xa!' },
        { speaker: 'A', name: 'Tiểu Ngữ', cn: '欢迎你们再来中国！祝大家一路平安！', pinyin: 'Huānyíng nǐmen zài lái Zhōngguó! Zhù dàjiā yílù píng\'ān!', vi: 'Hoan nghênh các bạn quay trở lại Trung Quốc! Chúc mọi người thuận buồm xuôi gió, bình an!' },
        { speaker: 'B', name: 'Sinh viên quốc tế', cn: '谢谢小语老师，我们一定会再回来的！', pinyin: 'Xièxie Xiǎoyǔ lǎoshī, wǒmen yídìng huì zài huílái de!', vi: 'Cảm ơn cô giáo Tiểu Ngữ, chúng em nhất định sẽ quay lại!' },
      ],
    },
  },
};
