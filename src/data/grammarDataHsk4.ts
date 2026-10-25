import type { LessonDetail } from './grammarData';

export const HSK4_GRAMMAR_DETAILS: Record<string, LessonDetail> = {
  '01': {
    lessonNumber: '01',
    grammarPoints: [
      {
        id: 'g-hsk4-01-1',
        title: '1. Liên từ tăng tiến 不仅……而且…… (Không những... mà còn...)',
        formula: 'S + 不仅……，而且/并且/也/还…… | 不仅 + S1……，S2也……',
        explanation:
          'Liên từ 不仅 (bùjǐn) dùng kết hợp với 而且 (érqiě), 还 (hái), 也 (yě) để biểu thị quan hệ tăng tiến. Nếu hai phân câu cùng chung một chủ ngữ, chủ ngữ đứng TRƯỚC 不仅. Nếu hai phân câu khác chủ ngữ, 不仅 phải đứng ĐẦU câu thứ nhất.',
        examples: [
          { cn: '他不仅长得帅，而且学习非常好。', pinyin: 'Tā bùjǐn zhǎng de shuài, érqiě xuéxí fēicháng hǎo.', vi: 'Anh ấy không những đẹp trai mà học tập còn rất giỏi.' },
          { cn: '不仅我知道这件事，全班同学也都知道了。', pinyin: 'Bùjǐn wǒ zhīdào zhè jiàn shì, quán bān tóngxué yě dōu zhīdào le.', vi: 'Không những tôi biết chuyện này mà cả lớp ai cũng đều biết rồi.' },
        ],
        pitfall:
          'Bẫy đề thi HSK 4: Đảo vị trí chủ ngữ! Khi hai vế khác chủ ngữ, thí sinh rất hay nhầm lẫn đặt chủ ngữ trước 不仅 (Sai: 我不仅知道... -> Đúng: 不仅我知道...).',
      },
      {
        id: 'g-hsk4-01-2',
        title: '2. Động từ/Phó từ 看来 (Xem ra, theo đó mà thấy)',
        formula: '看来 + Nhận xét / Phán đoán | 在 S 看来，……',
        explanation:
          '看来 (kànlai) dùng để đưa ra phán đoán, kết luận dựa trên tình hình thực tế quan sát được. Cấu trúc 在...看来 mang ý nghĩa "Theo quan điểm của ai đó".',
        examples: [
          { cn: '天阴得厉害，看来要下大雨了。', pinyin: 'Tiān yīn de lìhai, kànlai yào xià dàyǔ le.', vi: 'Trời u ám dữ dội, xem ra sắp mưa to rồi.' },
          { cn: '在他看来，家庭比事业更重要。', pinyin: 'Zài tā kànlai, jiātíng bǐ shìyè gèng zhòngyào.', vi: 'Theo quan điểm của anh ấy, gia đình quan trọng hơn sự nghiệp.' },
        ],
        pitfall: 'Phân biệt 看来 (đưa ra suy đoán khách quan từ hiện tượng) và 觉得/认为 (suy nghĩ chủ quan).',
      },
      {
        id: 'g-hsk4-01-3',
        title: '3. Phó từ 甚至 (Thậm chí, ngay cả)',
        formula: 'A，甚至 + B (B là trường hợp cá biệt, cực đoan)',
        explanation:
          '甚至 (shènzhì) dùng để nhấn mạnh trường hợp nổi bật hoặc vượt quá lẽ thường, nâng cao mức độ so với vế trước.',
        examples: [
          { cn: '他太忙了，甚至连午饭都没时间吃。', pinyin: 'Tā tài máng le, shènzhì lián wǔfàn dōu méi shíjiān chī.', vi: 'Anh ấy bận quá, thậm chí ngay cả cơm trưa cũng không có thời gian ăn.' },
          { cn: '很多外国人甚至比中国人更了解京剧。', pinyin: 'Hěnduō wàiguórén shènzhì bǐ Zhōngguórén gèng liǎojiě jīngjù.', vi: 'Rất nhiều người nước ngoài thậm chí còn hiểu rõ Kinh kịch hơn cả người Trung Quốc.' },
        ],
        pitfall: 'Thường kết hợp với 连……也/都…… để tăng sức biểu cảm.',
      },
    ],
    keyVocab: [
      { hanzi: '法律', pinyin: 'fǎlǜ', hanViet: 'Pháp luật', meaning: 'Luật pháp' },
      { hanzi: '俩', pinyin: 'liǎ', hanViet: 'Lưỡng', meaning: 'Hai người (hai chúng ta)' },
      { hanzi: '印象', pinyin: 'yìnxiàng', hanViet: 'Ấn tượng', meaning: 'Ấn tượng' },
      { hanzi: '深', pinyin: 'shēn', hanViet: 'Thâm', meaning: 'Sâu, đậm' },
      { hanzi: '熟悉', pinyin: 'shúxī', hanViet: 'Thục tất', meaning: 'Quen thuộc' },
      { hanzi: '性格', pinyin: 'xìnggé', hanViet: 'Tính cách', meaning: 'Tính tình, tính cách' },
    ],
    dialogue: {
      title: 'Bài khóa: Bàn về tình yêu & hôn nhân',
      lines: [
        { speaker: '孙月', cn: '听说你跟丈夫是大学同学？', pinyin: 'Tīngshuō nǐ gēn zhàngfu shì dàxué tóngxué?', vi: 'Nghe nói bạn và chồng là bạn học đại học à?' },
        { speaker: '王静', cn: '是的，我们俩不仅是同学，而且还是同桌呢。', pinyin: 'Shì de, wǒmen liǎ bùjǐn shì tóngxué, érqiě hái shì tóngzhuō ne.', vi: 'Đúng vậy, hai chúng tôi không những là bạn học mà còn cùng bàn nữa đấy.' },
        { speaker: '孙月', cn: '那你们一定非常了解对方吧！', pinyin: 'Nà nǐmen yídìng fēicháng liǎojiě duìfāng ba!', vi: 'Thế thì hai người chắc chắn rất thấu hiểu đối phương!' },
        { speaker: '王静', cn: '其实两个人在一起，性格合适才是最重要的。', pinyin: 'Qíshí liǎng gè rén zài yìqǐ, xìnggé héshì cái shì zuì zhòngyào de.', vi: 'Thực ra hai người bên nhau, tính cách hòa hợp mới là điều quan trọng nhất.' },
      ],
    },
  },

  '02': {
    lessonNumber: '02',
    grammarPoints: [
      {
        id: 'g-hsk4-02-1',
        title: '1. Cấu trúc điều kiện cần 只要……就…… (Chỉ cần... thì...)',
        formula: '只要 + Điều kiện đủ + 就 + Kết quả',
        explanation:
          '只要 (zhǐyào) biểu thị chỉ cần đáp ứng một điều kiện duy nhất này là sẽ dẫn đến kết quả mong muốn.',
        examples: [
          { cn: '只要坚持努力，就一定能通过HSK 4级考试。', pinyin: 'Zhǐyào jiānchí nǔlì, jiù yídìng néng tōngguò HSK 4 jí kǎoshì.', vi: 'Chỉ cần kiên trì nỗ lực thì nhất định có thể vượt qua kỳ thi HSK cấp 4.' },
          { cn: '只要你愿意来，我们随时欢迎。', pinyin: 'Zhǐyào nǐ yuànyì lái, wǒmen suíshí huānyíng.', vi: 'Chỉ cần bạn sẵn lòng đến, chúng tôi lúc nào cũng hoan nghênh.' },
        ],
        pitfall: 'Phân biệt 只要...就... (điều kiện đủ) với 只有...才... (điều kiện duy nhất cần có).',
      },
      {
        id: 'g-hsk4-02-2',
        title: '2. Giới từ/Phó từ 顺便 (Nhân tiện, tiện thể)',
        formula: '顺便 + Động từ (nhân tiện làm việc gì phụ khi đang làm việc chính)',
        explanation:
          '顺便 (shùnbiàn) dùng khi tiện đường hoặc tiện thể đang thực hiện một hành động chính thì làm thêm một việc phụ mà không tốn nhiều công sức.',
        examples: [
          { cn: '你去超市的时候，顺便帮我买瓶牛奶吧。', pinyin: 'Nǐ qù chāoshì de shíhou, shùnbiàn bāng wǒ mǎi píng niúnǎi ba.', vi: 'Khi bạn đi siêu thị, nhân tiện mua giúp tôi hộp sữa nhé.' },
          { cn: '下楼倒垃圾，顺便取个快递。', pinyin: 'Xià lóu dào lājī, shùnbiàn qǔ gè kuàidì.', vi: 'Xuống lầu đổ rác, tiện thể lấy bưu kiện chuyển phát nhanh.' },
        ],
        pitfall: 'Không nhầm lẫn với 随便 (suíbiàn: tùy tiện, sao cũng được).',
      },
    ],
    keyVocab: [
      { hanzi: '陪', pinyin: 'péi', hanViet: 'Bồi', meaning: 'Cùng, đi kèm' },
      { hanzi: '专门', pinyin: 'zhuānmén', hanViet: 'Chuyên môn', meaning: 'Đặc biệt, chuyên biệt' },
      { hanzi: '毕业', pinyin: 'bìyè', hanViet: 'Tất nghiệp', meaning: 'Tốt nghiệp' },
      { hanzi: '丰富', pinyin: 'fēngfù', hanViet: 'Phong phú', meaning: 'Đa dạng, phong phú' },
    ],
    dialogue: {
      title: 'Bài khóa: Tình bạn tri kỷ thời đại học',
      lines: [
        { speaker: '小明', cn: '毕业这么多年，大家还能聚在一起真不容易。', pinyin: 'Bìyè zhème duō nián, dàjiā hái néng jù zài yìqǐ zhēn bù róngyì.', vi: 'Tốt nghiệp bao nhiêu năm như vậy, mọi người vẫn có thể tụ họp lại thật không dễ dàng.' },
        { speaker: '小李', cn: '只要大家心里有彼此，距离再远也不是问题。', pinyin: 'Zhǐyào dàjiā xīnli yǒu bǐcǐ, jùlí zài yuǎn yě bú shì wèntí.', vi: 'Chỉ cần trong lòng mọi người luôn có nhau, khoảng cách xa xôi cũng không thành vấn đề.' },
      ],
    },
  },

  '03': {
    lessonNumber: '03',
    grammarPoints: [
      {
        id: 'g-hsk4-03-1',
        title: '1. Cấu trúc 对……印象 (Có ấn tượng đối với...)',
        formula: 'S + 对 + Đối tượng + 印象 + (很深 / 很好 / 不太深)',
        explanation: 'Dùng để diễn tả cảm nhận, dấu ấn đọng lại trong tâm trí sau khi tiếp xúc với ai hoặc việc gì.',
        examples: [
          { cn: '经理对我面试的表现印象很好。', pinyin: 'Jīnglǐ duì wǒ miànshì de biǎoxiàn yìnxiàng hěn hǎo.', vi: 'Giám đốc có ấn tượng rất tốt về biểu hiện phỏng vấn của tôi.' },
          { cn: '我对北京这座城市的印象非常深刻。', pinyin: 'Wǒ duì Běijīng zhè zuò chéngshì de yìnxiàng fēicháng shēnkè.', vi: 'Tôi có ấn tượng vô cùng sâu sắc về thành phố Bắc Kinh.' },
        ],
        pitfall: 'Dạng bị động: 给 + S + 留下 + 印象 (Bắc Kinh để lại cho tôi ấn tượng sâu sắc).',
      },
      {
        id: 'g-hsk4-03-2',
        title: '2. Động từ năng nguyện 不得不 (Không thể không, buộc phải)',
        formula: 'S + 不得不 + Động từ',
        explanation: 'Dùng cấu trúc phủ định kép để nhấn mạnh tính bắt buộc, do hoàn cảnh khách quan đưa đẩy không còn lựa chọn nào khác.',
        examples: [
          { cn: '雨下得太大了，我们不得不推迟比赛。', pinyin: 'Yǔ xià de tài dà le, wǒmen bùdébù tuīchí bǐsài.', vi: 'Mưa to quá rồi, chúng tôi buộc phải hoãn trận đấu.' },
          { cn: '为了生活，他不得不身兼数职。', pinyin: 'Wèile shēnghuó, tā bùdébù shēn jiān shù zhí.', vi: 'Vì cuộc sống mưu sinh, anh ấy buộc phải làm nhiều nghề cùng lúc.' },
        ],
        pitfall: '不得不 mang sắc thái bất đắc dĩ, miễn cưỡng hơn so with 必须 (bắt buộc theo nguyên tắc).',
      },
    ],
    keyVocab: [
      { hanzi: '招聘', pinyin: 'zhāopìn', hanViet: 'Chiêu sính', meaning: 'Tuyển dụng' },
      { hanzi: '简历', pinyin: 'jiǎnlì', hanViet: 'Giản lịch', meaning: 'Sơ yếu lý lịch (CV)' },
      { hanzi: '面试', pinyin: 'miànshì', hanViet: 'Diện thí', meaning: 'Phỏng vấn' },
      { hanzi: '负责', pinyin: 'fùzé', hanViet: 'Phụ trách', meaning: 'Chịu trách nhiệm, phụ trách' },
    ],
    dialogue: {
      title: 'Bài khóa: Phỏng vấn xin việc tại công ty đa quốc gia',
      lines: [
        { speaker: '面试官', cn: '你对我们公司了解多少？', pinyin: 'Nǐ duì wǒmen gōngsī liǎojiě duōshao?', vi: 'Bạn hiểu bao nhiêu về công ty chúng tôi?' },
        { speaker: '应聘者', cn: '我研究过贵公司的产品，印象非常深刻，希望能有机会在此发展。', pinyin: 'Wǒ yánjiū guò guì gōngsī de chǎnpǐn, yìnxiàng fēicháng shēnkè, xīwàng néng yǒu jīhuì zài cǐ fāzhǎn.', vi: 'Tôi đã nghiên cứu các sản phẩm của quý công ty, ấn tượng vô cùng sâu sắc, hy vọng có cơ hội phát triển tại đây.' },
      ],
    },
  },

  '04': {
    lessonNumber: '04',
    grammarPoints: [
      {
        id: 'g-hsk4-04-1',
        title: '1. Phó từ phản vấn 难道 (Chẳng lẽ, há lẽ nào)',
        formula: '难道……吗？ / 难道……不成？',
        explanation: '难道 (nándào) đứng đầu hoặc sau chủ ngữ trong câu hỏi tu từ để tăng cường ngữ khí chất vấn hoặc khẳng định một sự thật hiển nhiên.',
        examples: [
          { cn: '这件事你难道不知道吗？', pinyin: 'Zhè jiàn shì nǐ nándào bù zhīdào ma?', vi: 'Chuyện này chẳng lẽ bạn lại không biết sao?' },
          { cn: '难道钱真能买到一切吗？', pinyin: 'Nándào qián zhēn néng mǎi dào yíqiè ma?', vi: 'Chẳng lẽ tiền bạc thực sự có thể mua được tất cả sao?' },
        ],
        pitfall: 'Câu dùng 难道 câu hỏi khẳng định thì mang nghĩa phủ định và ngược lại.',
      },
      {
        id: 'g-hsk4-04-2',
        title: '2. Phó từ 并 (Nhấn mạnh phủ định: Hoàn toàn không/chưa)',
        formula: 'S + 并 + 不 / 没 + Động từ / Tính từ',
        explanation: '并 (bìng) đứng trước 不 hoặc 没 để nhấn mạnh sự phủ định, nhằm bác bỏ một quan điểm sai lầm hoặc làm rõ sự thật.',
        examples: [
          { cn: '学汉语并不难，关键是要多开口说。', pinyin: 'Xué Hànyǔ bìng bù nán, guānjiàn shì yào duō kāikǒu shuō.', vi: 'Học tiếng Hán hoàn toàn không khó, then chốt là phải chịu khó mở miệng nói.' },
          { cn: '这件事情我并不知情。', pinyin: 'Zhè jiàn shìqing wǒ bìng bù zhīqíng.', vi: 'Chuyện này tôi hoàn toàn không hay biết gì.' },
        ],
        pitfall: 'Tránh dùng 并 trước các câu khẳng định thông thường.',
      },
    ],
    keyVocab: [
      { hanzi: '工资', pinyin: 'gōngzī', hanViet: 'Công tư', meaning: 'Tiền lương' },
      { hanzi: '奖金', pinyin: 'jiǎngjīn', hanViet: 'Tưởng kim', meaning: 'Tiền thưởng' },
      { hanzi: '成功', pinyin: 'chénggōng', hanViet: 'Thành công', meaning: 'Thành công' },
      { hanzi: '条件', pinyin: 'tiáojiàn', hanViet: 'Điều kiện', meaning: 'Điều kiện, tiêu chuẩn' },
    ],
    dialogue: {
      title: 'Bài khóa: Bàn về giá trị của đồng tiền và hạnh phúc',
      lines: [
        { speaker: '张经理', cn: '换了新工作，工资高了不少吧？', pinyin: 'Huàn le xīn gōngzuò, gōngzī gāo le bù shǎo ba?', vi: 'Đổi việc mới rồi, lương cao hơn nhiều rồi chứ?' },
        { speaker: '李明', cn: '虽然工资多了，但我发现有钱并不等于快乐。', pinyin: 'Suīrán gōngzī duō le, dàn wǒ fāxiàn yǒu qián bìng bù děngyú kuàilè.', vi: 'Tuy lương nhiều hơn, nhưng tôi nhận ra có tiền hoàn toàn không đồng nghĩa với hạnh phúc.' },
      ],
    },
  },

  '05': {
    lessonNumber: '05',
    grammarPoints: [
      {
        id: 'g-hsk4-05-1',
        title: '1. Liên từ liệt kê 首先……其次…… (Trước hết... tiếp theo là...)',
        formula: '首先……，其次……，最后……',
        explanation: 'Dùng trong văn phong nghị luận, thuyết trình hoặc viết bài để sắp xếp các ý theo trật tự logic chặt chẽ.',
        examples: [
          { cn: '要想学好外语，首先要培养兴趣，其次要每天坚持练习。', pinyin: 'Yào xiǎng xué hǎo wàiyǔ, shǒuxiān yào péiyǎng xìngqù, qícì yào měitiān jiānchí liànxí.', vi: 'Muốn học giỏi ngoại ngữ, trước hết phải nuôi dưỡng đam mê, tiếp theo là phải kiên trì luyện tập mỗi ngày.' },
        ],
        pitfall: 'Chuẩn điểm ngữ pháp ăn điểm tuyệt đối trong phần viết HSK 4!',
      },
      {
        id: 'g-hsk4-05-2',
        title: '2. Liên từ điều kiện vô điều kiện 无论……都/也…… (Bất luận... đều...)',
        formula: '无论 + Đại từ nghi vấn / Quan hệ lựa chọn (还是) + S + 都/也……',
        explanation: 'Biểu thị trong bất kỳ điều kiện hay tình huống nào, kết quả hoặc hành động vẫn không thay đổi.',
        examples: [
          { cn: '无论遇到多大的困难，我们都不能轻言放弃。', pinyin: 'Wúlùn yù dào duō dà de kùnnan, wǒmen dōu bù néng qīngyán fàngqì.', vi: 'Bất luận gặp phải khó khăn lớn đến đâu, chúng ta đều không thể dễ dàng từ bỏ.' },
          { cn: '无论晴天还是下雨，他都去公园跑步。', pinyin: 'Wúlùn qíngtiān háishi xiàyǔ, tā dōu qù gōngyuán pǎobù.', vi: 'Bất luận trời nắng hay mưa, anh ấy đều đến công viên chạy bộ.' },
        ],
        pitfall: 'Sau 无论 bắt buộc phải có từ nghi vấn (什么, 谁, 怎么) hoặc kết cấu lựa chọn (A 还是 B).',
      },
    ],
    keyVocab: [
      { hanzi: '购物', pinyin: 'gòuwù', hanViet: 'Cấu vật', meaning: 'Mua sắm' },
      { hanzi: '打折', pinyin: 'dǎzhé', hanViet: 'Đả chiết', meaning: 'Giảm giá' },
      { hanzi: '质量', pinyin: 'zhìliàng', hanViet: 'Chất lượng', meaning: 'Chất lượng' },
      { hanzi: '现金', pinyin: 'xiànjīn', hanViet: 'Hiện kim', meaning: 'Tiền mặt' },
    ],
    dialogue: {
      title: 'Bài khóa: Trải nghiệm mua sắm thông minh',
      lines: [
        { speaker: '顾客', cn: '这件大衣打完折还要两千块，太贵了吧？', pinyin: 'Zhè jiàn dàyī dǎ wán zhé hái yào liǎng qiān kuài, tài guì le ba?', vi: 'Chiếc áo khoác này giảm giá rồi mà vẫn hai nghìn tệ, đắt quá nhỉ?' },
        { speaker: '售货员', cn: '一分钱一分货，无论面料还是做工，它都是最顶级的。', pinyin: 'Yì fēn qián yì fēn huò, wúlùn miànliào háishi zuògōng, tā dōu shì zuì dǐngjí de.', vi: 'Tiền nào của nấy mà anh, bất luận chất vải hay đường may, nó đều là hàng đỉnh cấp nhất.' },
      ],
    },
  },
};
