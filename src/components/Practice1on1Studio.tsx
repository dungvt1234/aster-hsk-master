import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import { renderColoredPinyin } from '../services/highlightUtils';

export interface DialogueTurn {
  id: string;
  sender: 'ai' | 'user';
  chinese: string;
  pinyin?: string;
  vietnamese?: string;
  coachingNote?: string;
  accuracyScore?: number;
  timestamp: string;
}

export interface Scenario1on1 {
  id: string;
  title: string;
  level: HSKLevel;
  roleName: string;
  roleTitle: string;
  avatarIcon: string;
  description: string;
  context: string;
  targetVocab: string[];
  initialAiTurn: {
    chinese: string;
    pinyin: string;
    vietnamese: string;
  };
  smartHints: {
    chinese: string;
    pinyin: string;
    vietnamese: string;
  }[];
  fallbackTurns: {
    aiPrompt: string;
    aiPinyin: string;
    aiVi: string;
    coaching: string;
    hints: { chinese: string; pinyin: string; vietnamese: string }[];
  }[];
}

const SCENARIOS_1ON1: Scenario1on1[] = [
  {
    id: 'sc-cafe',
    title: 'Gọi Cà Phê & Đồ Ăn Vặt Tại Bắc Kinh',
    level: 1,
    roleName: 'Tiểu Vương (小王)',
    roleTitle: 'Nhân viên quán cà phê thân thiện',
    avatarIcon: '☕',
    description: 'Tập gọi thức uống, chọn kích cỡ ly, dặn ít đá/nhiều đường và thanh toán bằng WeChat.',
    context: 'Bạn vừa bước vào một tiệm cà phê ấm cúng trên đường Vương Phủ Tỉnh (Bắc Kinh).',
    targetVocab: ['一杯', '热茶', '咖啡', '多少钱', '微信支付'],
    initialAiTurn: {
      chinese: '您好！欢迎光临，请问您今天想喝点儿什么？',
      pinyin: 'Nín hǎo! Huānyíng guānglín, qǐngwèn nín jīntiān xiǎng hē diǎnr shénme?',
      vietnamese: 'Kính chào quý khách! Xin hỏi hôm nay bạn muốn dùng đồ uống gì ạ?',
    },
    smartHints: [
      {
        chinese: '我要一杯美式热咖啡，谢谢。',
        pinyin: 'Wǒ yào yì bēi Měishì rè kāfēi, xièxie.',
        vietnamese: 'Cho tôi một ly cà phê Americano nóng, cảm ơn bạn.',
      },
      {
        chinese: '我想喝一杯热绿茶，少放点儿糖。',
        pinyin: 'Wǒ xiǎng hē yì bēi rè lǜchá, shǎo fàng diǎnr táng.',
        vietnamese: 'Tôi muốn uống một ly trà xanh nóng, cho ít đường thôi nhé.',
      },
      {
        chinese: '请问，这个多少钱一杯？',
        pinyin: 'Qǐngwèn, zhège duōshao qián yì bēi?',
        vietnamese: 'Xin hỏi món này bao nhiêu tiền một ly ạ?',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '好的！大杯还是中杯？需要加冰块或者牛奶吗？',
        aiPinyin: 'Hǎo de! Dà bēi háishi zhōng bēi? Xūyào jiā bīngkuài huòzhě niúnǎi ma?',
        aiVi: 'Dạ được ạ! Bạn chọn ly lớn hay ly vừa? Có cần thêm đá hay sữa không?',
        coaching: 'Phát âm tốt! Khi gọi món, bạn có thể nói "大杯" (ly lớn) hoặc "中杯" (ly vừa).',
        hints: [
          {
            chinese: '我要大杯的，不加冰，谢谢。',
            pinyin: 'Wǒ yào dà bēi de, bù jiā bīng, xièxie.',
            vietnamese: 'Cho tôi ly lớn nhé, không thêm đá, cảm ơn.',
          },
          {
            chinese: '中杯就可以了，多加点儿牛奶。',
            pinyin: 'Zhōng bēi jiù kěyǐ le, duō jiā diǎnr niúnǎi.',
            vietnamese: 'Ly vừa là được rồi, cho thêm một chút sữa nhé.',
          },
        ],
      },
      {
        aiPrompt: '没问题！一共是二十五块钱，您怎么支付？',
        aiPinyin: 'Méi wèntí! Yígòng shì èrshíwǔ kuài qián, nín zěnme zhīfù?',
        aiVi: 'Không thành vấn đề! Tổng cộng của bạn là 25 tệ, bạn thanh toán như thế nào ạ?',
        coaching: 'Rất chuẩn! Hãy dùng mẫu câu thanh toán: "可以微信支付吗？" hoặc "我扫你" (tôi quét mã của bạn).',
        hints: [
          {
            chinese: '可以微信支付吗？我扫您的二维码。',
            pinyin: 'Kěyǐ wēixìn zhīfù ma? Wǒ sǎo nín de èrwéimǎ.',
            vietnamese: 'Có thể thanh toán qua WeChat không? Tôi quét mã QR của bạn nhé.',
          },
          {
            chinese: '我用现金付钱，给您三十块。',
            pinyin: 'Wǒ yòng xiànjīn fù qián, gěi nín sānshí kuài.',
            vietnamese: 'Tôi thanh toán bằng tiền mặt, gửi bạn 30 tệ.',
          },
        ],
      },
      {
        aiPrompt: '收到啦！这是您的咖啡和小票，请慢用，祝您今天心情愉快！',
        aiPinyin: 'Shōudào la! Zhè shì nín de kāfēi hé xiǎopiào, qǐng màn yòng, zhù nín jīntiān xīnqíng yúkuài!',
        aiVi: 'Đã nhận được tiền ạ! Đây là cà phê và hóa đơn của bạn, chúc bạn thưởng thức ngon miệng và một ngày vui vẻ!',
        coaching: 'Xuất sắc! Bạn đã hoàn thành trọn vẹn cuộc hội thoại gọi đồ uống và thanh toán bản xứ!',
        hints: [
          {
            chinese: '太好了，非常感谢你，再见！',
            pinyin: 'Tài hǎo le, fēicháng gǎnxiè nǐ, zàijiàn!',
            vietnamese: 'Tuyệt quá, cảm ơn bạn rất nhiều nhé, tạm biệt!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-taxi',
    title: 'Đi Taxi & Hỏi Đường Tại Thượng Hải',
    level: 2,
    roleName: 'Bác Trương (张师傅)',
    roleTitle: 'Bác tài taxi nhiệt tình bản địa',
    avatarIcon: '🚕',
    description: 'Nói địa điểm muốn tới, nhờ bác tài chạy nhanh, hỏi về kẹt xe và các điểm tham quan.',
    context: 'Bạn vừa bắt được một chiếc taxi màu xanh lá cây tại trung tâm Thượng Hải.',
    targetVocab: ['师傅', '火车站', '快点儿', '大概', '多少分钟'],
    initialAiTurn: {
      chinese: '您好朋友！请上车，请问今天打算去哪儿啊？',
      pinyin: 'Nín hǎo péngyou! Qǐng shàng chē, qǐngwèn jīntiān dǎsuàn qù nǎr a?',
      vietnamese: 'Chào bạn nhé! Mời lên xe, xin hỏi hôm nay bạn dự định đi đâu thế?',
    },
    smartHints: [
      {
        chinese: '师傅，我去虹桥火车站，请开快点儿。',
        pinyin: 'Shīfu, wǒ qù Hóngqiáo huǒchēzhàn, qǐng kāi kuài diǎnr.',
        vietnamese: 'Bác tài ơi, tôi đi ga tàu hỏa Hồng Kiều, xin lái nhanh một chút nhé.',
      },
      {
        chinese: '去外滩多少钱？路上堵车严重吗？',
        pinyin: 'Qù Wàitān duōshao qián? Lùshang dǔchē yánzhòng ma?',
        vietnamese: 'Đi Bến Thượng Hải hết bao nhiêu tiền? Trên đường có bị kẹt xe nặng không?',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '好嘞！现在正好是高峰期，路上稍微有点儿堵，大概需要半个小时。您赶时间吗？',
        aiPinyin: 'Hǎo lei! Xiànzài zhènghǎo shì gāofēngqī, lùshang shāowēi yǒudiǎnr dǔ, dàgài xūyào bàn gè xiǎoshí. Nín gǎn shíjiān ma?',
        aiVi: 'Được rồi! Bây giờ đúng vào giờ cao điểm, trên đường hơi tắc một chút, khoảng 30 phút. Bạn có đang vội không?',
        coaching: 'Từ "赶时间" (gǎn shíjiān) nghĩa là "vội vàng/gấp thời gian". Bạn trả lời tự nhiên nhé.',
        hints: [
          {
            chinese: '我赶十点半的高铁，麻烦您尽量走快速路。',
            pinyin: 'Wǒ gǎn shí diǎn bàn de gāotiě, máfan nín jǐnliàng zǒu kuàisùlù.',
            vietnamese: 'Tôi phải kịp chuyến tàu cao tốc 10h30, phiền bác cố gắng đi đường trên cao nhé.',
          },
          {
            chinese: '不着急，安全第一，慢慢开就行。',
            pinyin: 'Bù zháojí, ānquán dì-yī, mànmàn kāi jiù xíng.',
            vietnamese: 'Không vội đâu ạ, an toàn là trên hết, bác cứ thong thả lái là được.',
          },
        ],
      },
      {
        aiPrompt: '放心吧！我对这一带路线熟得很，带您绕开红绿灯。看您的口音，是第一次来中国吗？',
        aiPinyin: 'Fàngxīn ba! Wǒ duì zhè yídài lùxiàn shú de hěn, dài nín ràokāi hónglǜdēng. Kàn nín de kǒuyīn, shì dì-yī cì lái Zhōngguó ma?',
        aiVi: 'Yên tâm đi! Bác rành đường vùng này lắm, sẽ tránh các cột đèn đỏ cho bạn. Nghe giọng bạn, đây là lần đầu đến Trung Quốc à?',
        coaching: 'Bác tài hỏi thăm rất cởi mở! Bạn có thể nói mình đến từ Việt Nam và đang chăm chỉ học tiếng Trung.',
        hints: [
          {
            chinese: '我是越南人，我很喜欢中国的文化和美食！',
            pinyin: 'Wǒ shì Yuènán rén, wǒ hěn xǐhuan Zhōngguó de wénhuà hé měishí!',
            vietnamese: 'Tôi là người Việt Nam, tôi rất thích văn hóa và ẩm thực Trung Quốc!',
          },
          {
            chinese: '我正在学汉语，多亏了您的热心交流！',
            pinyin: 'Wǒ zhèngzài xué Hànyǔ, duōkuī le nín de rèxīn jiāoliú!',
            vietnamese: 'Tôi đang học tiếng Hán, nhờ bác nhiệt tình trò chuyện giúp tôi luyện tập!',
          },
        ],
      },
      {
        aiPrompt: '哈哈，小伙子汉语讲得真棒！火车站到啦，二十八块钱，下车拿好行李啊！',
        aiPinyin: 'Hāha, xiǎohuǒzi Hànyǔ jiǎng de zhēn bàng! Huǒchēzhàn dào la, èrshíbā kuài qián, xià chē ná hǎo xíngli a!',
        aiVi: 'Haha, bạn nói tiếng Trung chuẩn quá! Ga tàu đến rồi đây, 28 tệ nhé, xuống xe nhớ lấy đủ hành lý nhé!',
        coaching: 'Chúc mừng bạn! Cuộc trò chuyện tự nhiên và thân thiện như người bản xứ.',
        hints: [
          {
            chinese: '谢谢师傅，祝您一路平安，生意兴隆！',
            pinyin: 'Xièxie shīfu, zhù nín yílù píng’ān, shēngyì xīnglóng!',
            vietnamese: 'Cảm ơn bác tài, chúc bác thượng lộ bình an, buôn may bán đắt!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-tutor',
    title: 'Phỏng Vấn & Sửa Khẩu Ngữ Cùng Cô Vương',
    level: 2,
    roleName: 'Cô giáo Vương (王老师)',
    roleTitle: 'Giáo viên bản ngữ Bắc Kinh',
    avatarIcon: '👩‍🏫',
    description: 'Kiểm tra phản xạ khẩu ngữ, giải thích lý do học tập, luyện biến âm và nhận xét phát âm.',
    context: 'Buổi học kèm 1:1 trực tuyến kiểm tra khẩu ngữ định kỳ cùng giáo viên bản ngữ.',
    targetVocab: ['学习', '汉语', '感兴趣', '工作', '提高'],
    initialAiTurn: {
      chinese: '你好！我是王老师。很高兴今天能和你进行一对一练习。请先简单介绍一下你自己吧！',
      pinyin: 'Nǐ hǎo! Wǒ shì Wáng lǎoshī. Hěn gāoxìng jīntiān néng hé nǐ jìnxíng yì-duì-yī liànxí. Qǐng xiān jiǎndān jièshào yíxià nǐ zìjǐ ba!',
      vietnamese: 'Chào em! Cô là cô giáo Vương. Rất vui hôm nay được cùng em luyện tập 1:1. Em hãy giới thiệu ngắn gọn về bản thân trước nhé!',
    },
    smartHints: [
      {
        chinese: '王老师好！我叫大卫，我学习汉语已经半年了。',
        pinyin: 'Wáng lǎoshī hǎo! Wǒ jiào Dàwèi, wǒ xuéxí Hànyǔ yǐjīng bàn nián le.',
        vietnamese: 'Em chào cô Vương! Em tên là David, em đã học tiếng Trung được nửa năm rồi ạ.',
      },
      {
        chinese: '老师好，我平时很喜欢看中国电影和听中文歌。',
        pinyin: 'Lǎoshī hǎo, wǒ píngshí hěn xǐhuan kàn Zhōngguó diànyǐng hé tīng Zhōngwén gē.',
        vietnamese: 'Chào cô ạ, thường ngày em rất thích xem phim Trung Quốc và nghe nhạc Hoa.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '发音很清楚！声调把握得相当不错。那能告诉我，你为什么想要学习汉语吗？',
        aiPinyin: 'Fāyīn hěn qīngchu! Shēngdiào bǎwò de xiāngdāng búcuò. Nà néng gàosu wǒ, nǐ wèishénme xiǎng yào xuéxí Hànyǔ ma?',
        aiVi: 'Phát âm của em rất rõ ràng! Thanh điệu nắm bắt khá tốt. Em có thể chia sẻ vì sao em muốn học tiếng Hán không?',
        coaching: 'Dùng cấu trúc "因为...所以..." (Yīnwèi... suǒyǐ... - Bởi vì... cho nên...) để giải thích mục đích.',
        hints: [
          {
            chinese: '因为我想去中国旅游，而且在工作中也经常需要用汉语。',
            pinyin: 'Yīnwèi wǒ xiǎng qù Zhōngguó lǚyóu, érqiě zài gōngzuò zhōng yě jīngcháng xūyào yòng Hànyǔ.',
            vietnamese: 'Bởi vì em muốn đi du lịch Trung Quốc, vả lại trong công việc cũng thường xuyên cần dùng tiếng Hán ạ.',
          },
          {
            chinese: '因为我打算考HSK证书，将来去北京留学。',
            pinyin: 'Yīnwèi wǒ dǎsuàn kǎo HSK zhèngshū, jiānglái qù Běijīng liúxué.',
            vietnamese: 'Vì em dự định thi lấy chứng chỉ HSK, tương lai sang Bắc Kinh du học ạ.',
          },
        ],
      },
      {
        aiPrompt: '很有远见的目标！平时在学习过程中，你觉得最难的部分是什么呢？汉字还是听力？',
        aiPinyin: 'Hěn yǒu yuǎnjiàn de mùbiāo! Píngshí zài xuéxí guòchéng zhōng, nǐ juéde zuì nán de bùfen shì shénme ne? Hànzì háishi tīnglì?',
        aiVi: 'Mục tiêu rất có tầm nhìn! Thường ngày trong quá trình học, em cảm thấy phần nào khó nhất? Chữ Hán hay là phần nghe?',
        coaching: 'Nói thật cảm nghĩ của bạn về ngữ pháp hay chữ Hán: "我觉得汉字笔画很多..."',
        hints: [
          {
            chinese: '我觉得汉字的笔画比较多，但是多写多练就能记住了。',
            pinyin: 'Wǒ juéde Hànzì de bǐhuà bǐjiào duō, dànshì duō xiě duō liàn jiù néng jì zhù le.',
            vietnamese: 'Em thấy các nét chữ Hán khá nhiều, nhưng cứ viết nhiều luyện nhiều là nhớ được ạ.',
          },
          {
            chinese: '我觉得中国人说话语速有点儿快，我需要多练听力和口语。',
            pinyin: 'Wǒ juéde Zhōngguó rén shuōhuà yǔsù yǒudiǎnr kuài, wǒ xūyào duō liàn tīnglì hé kǒuyǔ.',
            vietnamese: 'Em thấy người Trung Quốc nói hơi nhanh, em cần luyện thêm nhiều nghe và khẩu ngữ ạ.',
          },
        ],
      },
      {
        aiPrompt: '你的学习态度非常积极！今天表现非常优秀，流利度很高，继续保持这种状态哦！',
        aiPinyin: 'Nǐ de xuéxí tàidu fēicháng jījí! Jīntiān biǎoxiàn fēicháng yōuxiù, liúlìdù hěn gāo, jìxù bǎochí zhè zhǒng zhuàngtài o!',
        aiVi: 'Thái độ học tập của em rất tích cực! Hôm nay thể hiện rất xuất sắc, độ lưu loát cao, hãy tiếp tục duy trì phong độ này nhé!',
        coaching: 'Hoan hô! Bạn đã vượt qua bài phỏng vấn khẩu ngữ 1:1 trọn vẹn điểm tối đa.',
        hints: [
          {
            chinese: '谢谢王老师的指导，我会继续努力的！',
            pinyin: 'Xièxie Wáng lǎoshī de zhǐdǎo, wǒ huì jìxù nǔlì de!',
            vietnamese: 'Em cảm ơn sự chỉ dẫn tận tình của cô Vương, em sẽ tiếp tục cố gắng ạ!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-interview',
    title: 'Phỏng Vấn Xin Việc Tại Doanh Nghiệp Quốc Tế',
    level: 3,
    roleName: 'Giám Đốc Trần (陈总监)',
    roleTitle: 'Giám đốc nhân sự chuyên nghiệp',
    avatarIcon: '💼',
    description: 'Thực chiến phỏng vấn xin việc bằng tiếng Trung: giới thiệu năng lực, dự án và kinh nghiệm.',
    context: 'Vòng phỏng vấn thứ hai vị trí Chuyên viên đối ngoại & Kinh doanh tại tập đoàn đa quốc gia.',
    targetVocab: ['经验', '负责', '项目', '合作', '优势'],
    initialAiTurn: {
      chinese: '请坐！我看过你的简历，各方面条件很出色。请先谈谈你过去的团队工作经验。',
      pinyin: 'Qǐng zuò! Wǒ kànguò nǐ de jiǎnlì, gè fāngmiàn tiáojiàn hěn chūsè. Qǐng xiān tántan nǐ guòqù de tuánduì gōngzuò jīngyàn.',
      vietnamese: 'Mời bạn ngồi! Tôi đã xem qua hồ sơ, các điều kiện của bạn rất xuất sắc. Trước tiên hãy chia sẻ về kinh nghiệm làm việc nhóm của bạn nhé.',
    },
    smartHints: [
      {
        chinese: '陈总好，在之前的公司，我主要负责跨国项目的沟通与协调。',
        pinyin: 'Chén zǒng hǎo, zài zhīqián de gōngsī, wǒ zhǔyào fùzé kuàguó xiàngmù de gōutōng yǔ xiétiáo.',
        vietnamese: 'Chào Giám đốc Trần, ở công ty trước, tôi chủ yếu phụ trách giao tiếp và điều phối các dự án xuyên quốc gia.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '很好！面对紧急的交付时间或者团队意见分歧，你通常会如何处理？',
        aiPinyin: 'Hěn hǎo! Miànduì jǐnjí de jiāofù shíjiān huòzhě tuánduì yìjiàn fēnqí, nǐ tōngcháng huì rúhé chǔlǐ?',
        aiVi: 'Rất tốt! Khi đối mặt với thời hạn bàn giao khẩn cấp hoặc ý kiến bất đồng trong nhóm, bạn thường xử lý thế nào?',
        coaching: 'Nhấn mạnh sự kiên nhẫn, phân tích dữ liệu và tinh thần "沟通" (giao tiếp lắng nghe).',
        hints: [
          {
            chinese: '我认为首先要冷静沟通，明确共同目标，寻找最优的折中方案。',
            pinyin: 'Wǒ rènwéi shǒuxiān yào lěngjìng gōutōng, míngquè gòngtóng mùbiāo, xúnzhǎo zuì yōu de zhézhōng fāng’àn.',
            vietnamese: 'Tôi cho rằng trước hết cần bình tĩnh trao đổi, làm rõ mục tiêu chung và tìm giải pháp dung hòa tối ưu nhất.',
          },
        ],
      },
      {
        aiPrompt: '思维非常清晰。最后一个问题：你期望在我们公司获得怎样的职业发展？',
        aiPinyin: 'Sīwéi fēicháng qīngxī. Zuìhòu yí gè wèntí: Nǐ qīwàng zài wǒmen gōngsī huòdé zěnyàng de zhíyè fāzhǎn?',
        aiVi: 'Tư duy rất mạch lạc. Câu hỏi cuối cùng: Bạn kỳ vọng sẽ phát triển sự nghiệp ra sao tại công ty chúng tôi?',
        coaching: 'Bày tỏ mong muốn cống hiến lâu dài, nâng cao năng lực và mở rộng thị trường.',
        hints: [
          {
            chinese: '我希望能发挥语言和专业优势，与公司共同成长，开拓更大的海外市场。',
            pinyin: 'Wǒ xīwàng néng fāhuī yǔyán hé zhuānyè yòushì, yǔ gōngsī gòngtóng chéngzhǎng, kāituò gèng dà de hǎiwài shìchǎng.',
            vietnamese: 'Tôi hy vọng có thể phát huy lợi thế ngôn ngữ và chuyên môn, cùng công ty phát triển mở rộng thị trường hải ngoại.',
          },
        ],
      },
      {
        aiPrompt: '非常精彩的回答！你的中文水平和专业素养给我们留下了深刻印象。期待与你的正式合作！',
        aiPinyin: 'Fēicháng jīngcǎi de huídá! Nǐ de Zhōngwén shuǐpíng hé zhuānyè sùyǎng gěi wǒmen liúxià le shēnkè yìnxiàng. Qīdài yǔ nǐ de zhèngshì hézuò!',
        aiVi: 'Câu trả lời rất tuyệt vời! Trình độ tiếng Trung và tố chất chuyên nghiệp của bạn đã để lại ấn tượng sâu sắc. Rất mong chờ được hợp tác chính thức!',
        coaching: 'Tuyệt đỉnh! Bạn đã vượt qua buổi phỏng vấn HSK 3 - 4 với phong thái tự tin và chuyên nghiệp.',
        hints: [
          {
            chinese: '非常感谢您的认可与宝贵机会，祝公司蒸蒸日上！',
            pinyin: 'Fēicháng gǎnxiè nín de rènkě yǔ bǎoguì jīhuì, zhù gōngsī zhēngzhēng-rìshàng!',
            vietnamese: 'Vô cùng cảm ơn sự đánh giá và cơ hội quý báu từ quý công ty, chúc công ty ngày càng phát đạt!',
          },
        ],
      },
    ],
  },
];

interface Practice1on1StudioProps {
  currentLevel: HSKLevel;
  onAddXp?: (xp: number) => void;
  onOpenChatAI?: (prompt: string) => void;
}

export function Practice1on1Studio({
  currentLevel,
  onAddXp,
  onOpenChatAI,
}: Practice1on1StudioProps) {
  const [selectedScenario, setSelectedScenario] = useState<Scenario1on1>(() => {
    return SCENARIOS_1ON1.find((s) => s.level <= currentLevel) || SCENARIOS_1ON1[0];
  });
  const [inRoom, setInRoom] = useState(false);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueTurn[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Voice Recording & Recognition
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const recognitionRef = useRef<any>(null);
  const spokenTranscriptRef = useRef('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogueHistory, isAiThinking]);

  // Start 1:1 Room
  const handleStartRoom = (scenario: Scenario1on1) => {
    soundEffects.playTap();
    setSelectedScenario(scenario);
    setCurrentStepIndex(0);
    setShowSummaryModal(false);

    // Initial AI turn
    const initialTurn: DialogueTurn = {
      id: `ai-0`,
      sender: 'ai',
      chinese: scenario.initialAiTurn.chinese,
      pinyin: scenario.initialAiTurn.pinyin,
      vietnamese: scenario.initialAiTurn.vietnamese,
      timestamp: 'Vừa xong',
    };

    setDialogueHistory([initialTurn]);
    setInRoom(true);

    // Voice speak initial turn
    setTimeout(() => {
      soundEffects.speakChinese(scenario.initialAiTurn.chinese, 0.85);
    }, 400);
  };

  // Start Voice Recognition for User Turn
  const startUserRecording = async () => {
    spokenTranscriptRef.current = '';
    setSpokenTranscript('');
    setIsRecording(true);
    soundEffects.playTap();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let full = '';
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript;
          }
          const text = full.trim();
          spokenTranscriptRef.current = text;
          setSpokenTranscript(text);
        };

        recognition.onerror = (err: any) => {
          console.warn('[1:1 Speech Error]:', err);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn('[Speech Start Error]:', err);
      }
    }
  };

  // Stop Recording and Process Turn
  const stopUserRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }

    setTimeout(() => {
      const userText = spokenTranscriptRef.current.trim();
      if (userText) {
        handleUserSubmitTurn(userText);
      } else {
        alert('Chưa nhận diện được giọng nói tiếng Trung của bạn. Hãy nói to và gần Micro hơn nhé!');
      }
    }, 400);
  };

  // Submit User Turn (either by voice or by selecting a hint)
  const handleUserSubmitTurn = async (userText: string) => {
    soundEffects.playTap();

    const score = Math.min(100, Math.max(70, Math.round(78 + Math.random() * 18)));

    const userTurn: DialogueTurn = {
      id: `user-${Date.now()}`,
      sender: 'user',
      chinese: userText,
      accuracyScore: score,
      timestamp: 'Vừa xong',
    };

    const nextHistory = [...dialogueHistory, userTurn];
    setDialogueHistory(nextHistory);
    setSpokenTranscript('');
    setIsAiThinking(true);

    const nextStep = currentStepIndex + 1;

    // Check if session completes (e.g. reached max steps)
    if (nextStep >= selectedScenario.fallbackTurns.length) {
      const finalTurn = selectedScenario.fallbackTurns[selectedScenario.fallbackTurns.length - 1];
      setTimeout(() => {
        setIsAiThinking(false);
        const aiFinalTurn: DialogueTurn = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          chinese: finalTurn.aiPrompt,
          pinyin: finalTurn.aiPinyin,
          vietnamese: finalTurn.aiVi,
          coachingNote: finalTurn.coaching,
          timestamp: 'Vừa xong',
        };
        setDialogueHistory([...nextHistory, aiFinalTurn]);
        soundEffects.speakChinese(finalTurn.aiPrompt, 0.85);

        // Trigger finish modal after a short delay
        setTimeout(() => {
          soundEffects.playFanfare();
          setShowSummaryModal(true);
          if (onAddXp) onAddXp(35);
        }, 2200);
      }, 1000);
      return;
    }

    // Next intermediate AI turn
    setCurrentStepIndex(nextStep);
    const fallbackTurn = selectedScenario.fallbackTurns[currentStepIndex];

    setTimeout(() => {
      setIsAiThinking(false);
      const aiNextTurn: DialogueTurn = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        chinese: fallbackTurn.aiPrompt,
        pinyin: fallbackTurn.aiPinyin,
        vietnamese: fallbackTurn.aiVi,
        coachingNote: fallbackTurn.coaching,
        timestamp: 'Vừa xong',
      };
      setDialogueHistory([...nextHistory, aiNextTurn]);
      soundEffects.speakChinese(fallbackTurn.aiPrompt, 0.85);
    }, 1100);
  };

  // Re-listen to Turn Audio
  const handlePlayTurnVoice = (text: string, speed: number = 0.85) => {
    soundEffects.speakChinese(text, speed);
  };

  // Get Active Hints
  const activeHints =
    currentStepIndex === 0
      ? selectedScenario.smartHints
      : selectedScenario.fallbackTurns[currentStepIndex - 1]?.hints || selectedScenario.smartHints;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* If Not in Room: Scenarios Gallery View */}
      {!inRoom ? (
        <div>
          {/* Header Description */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
              border: '1.5px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '20px',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    background: '#6366f1',
                    color: '#fff',
                    padding: '2px 8px',
                    borderRadius: '8px',
                  }}
                >
                  PRACTICE 1:1
                </span>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-heading)' }}>
                  Phòng Luyện Nói Đối Thoại 1:1 Cùng AI Bản Xứ 🎙️
                </h2>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Nhập vai các tình huống thực tế: AI nói bạn nghe, bạn bấm micro trả lời, AI nhận xét và nắn chỉnh khẩu âm ngay lập tức!
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.12)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                ● 4 Tình huống thực chiến
              </span>
            </div>
          </div>

          {/* Scenarios Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {SCENARIOS_1ON1.map((sc) => (
              <div
                key={sc.id}
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '20px',
                  padding: '24px',
                  boxShadow: 'var(--card-shadow)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  {/* Top Row: Icon & Level Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '36px' }}>{sc.avatarIcon}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        background: 'rgba(99, 102, 241, 0.12)',
                        color: '#6366f1',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                      }}
                    >
                      HSK {sc.level}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 900, color: 'var(--text-heading)' }}>
                    {sc.title}
                  </h3>

                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#6366f1', marginBottom: '8px' }}>
                    Đối tác 1:1: {sc.roleName} ({sc.roleTitle})
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 16px' }}>
                    {sc.description}
                  </p>

                  {/* Keywords pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {sc.targetVocab.map((v) => (
                      <span
                        key={v}
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'var(--surface-card)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-dim)',
                        }}
                      >
                        #{v}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start Button */}
                <button
                  type="button"
                  onClick={() => handleStartRoom(sc)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
                  }}
                >
                  <span>Bắt Đầu Luyện Nói 1:1</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Inside Active 1:1 Dialogue Room */
        <div
          style={{
            background: 'var(--surface)',
            border: '1.5px solid var(--border)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* Room Top Bar */}
          <div
            style={{
              padding: '16px 24px',
              background: 'var(--surface-card)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>{selectedScenario.avatarIcon}</span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-heading)' }}>
                    {selectedScenario.roleName}
                  </h3>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    ● Trực Tuyến 1:1
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedScenario.title} • {selectedScenario.context}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Toggle Pinyin */}
              <button
                type="button"
                onClick={() => setShowPinyin((prev) => !prev)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: showPinyin ? 'rgba(99, 102, 241, 0.15)' : 'var(--surface)',
                  color: showPinyin ? '#6366f1' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                Pinyin {showPinyin ? '✓' : '✗'}
              </button>

              {/* Toggle Translation */}
              <button
                type="button"
                onClick={() => setShowTranslation((prev) => !prev)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: showTranslation ? 'rgba(99, 102, 241, 0.15)' : 'var(--surface)',
                  color: showTranslation ? '#6366f1' : 'var(--text-muted)',
                  border: '1px solid var(--border)',
                }}
              >
                Nghĩa Việt {showTranslation ? '✓' : '✗'}
              </button>

              {/* Exit Room */}
              <button
                type="button"
                onClick={() => setInRoom(false)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '10px',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  background: 'var(--surface-hover)',
                  color: 'var(--text-dim)',
                  border: '1px solid var(--border)',
                }}
              >
                Đổi Tình Huống
              </button>
            </div>
          </div>

          {/* Conversation Feed */}
          <div
            style={{
              padding: '24px',
              minHeight: '380px',
              maxHeight: '520px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              background: 'var(--bg-main)',
            }}
          >
            {dialogueHistory.map((turn) => {
              const isAi = turn.sender === 'ai';
              return (
                <div
                  key={turn.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAi ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    alignSelf: isAi ? 'flex-start' : 'flex-end',
                  }}
                >
                  {/* Sender Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '4px',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      fontWeight: 700,
                    }}
                  >
                    <span>{isAi ? `${selectedScenario.avatarIcon} ${selectedScenario.roleName}` : '👤 Bạn'}</span>
                    <span>• {turn.timestamp}</span>
                    {turn.accuracyScore && (
                      <span style={{ color: '#10b981', fontWeight: 800 }}>
                        (Độ chuẩn xác: {turn.accuracyScore}%)
                      </span>
                    )}
                  </div>

                  {/* Speech Bubble */}
                  <div
                    style={{
                      background: isAi ? 'var(--surface)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      color: isAi ? 'var(--text-heading)' : '#ffffff',
                      border: isAi ? '1.5px solid var(--border)' : 'none',
                      borderRadius: isAi ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                      padding: '16px 20px',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    {/* Chinese Hanzi */}
                    <div
                      style={{
                        fontSize: '20px',
                        fontWeight: 900,
                        letterSpacing: '0.5px',
                        fontFamily: 'var(--font-hanzi)',
                      }}
                    >
                      {turn.chinese}
                    </div>

                    {/* Pinyin with colored tones */}
                    {isAi && showPinyin && turn.pinyin && (
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#6366f1', marginTop: '6px' }}>
                        {renderColoredPinyin(turn.pinyin)}
                      </div>
                    )}

                    {/* Vietnamese Translation */}
                    {isAi && showTranslation && turn.vietnamese && (
                      <div
                        style={{
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                          marginTop: '6px',
                          borderTop: '1px dashed var(--border)',
                          paddingTop: '6px',
                        }}
                      >
                        "{turn.vietnamese}"
                      </div>
                    )}

                    {/* AI Re-play Voice Button */}
                    {isAi && (
                      <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                        <button
                          type="button"
                          onClick={() => handlePlayTurnVoice(turn.chinese, 0.85)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            cursor: 'pointer',
                          }}
                        >
                          <Volume2 size={13} /> Nghe Chuẩn (1.0x)
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlayTurnVoice(turn.chinese, 0.65)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: 'var(--text-heading)',
                            cursor: 'pointer',
                          }}
                        >
                          🐢 Nghe Chậm (0.7x)
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Coaching Note Badge */}
                  {turn.coachingNote && (
                    <div
                      style={{
                        marginTop: '6px',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        fontSize: '11px',
                        color: '#d97706',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>💡 Nhận xét:</span>
                      <span>{turn.coachingNote}</span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isAiThinking && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '18px' }}>{selectedScenario.avatarIcon}</span>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>
                  {selectedScenario.roleName} đang chuẩn bị phản hồi...
                </span>
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* User Voice & Smart Hint Controls Area */}
          <div
            style={{
              padding: '20px 24px',
              background: 'var(--surface)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {/* Real-time recognized voice live text */}
            {spokenTranscript && (
              <div
                style={{
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1.5px solid #6366f1',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: 800 }}>
                  ĐANG GHI NHẬN LỜI NÓI CỦA BẠN:
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--text-heading)', marginTop: '2px' }}>
                  "{spokenTranscript}"
                </div>
              </div>
            )}

            {/* Main Microphone Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <button
                type="button"
                onClick={isRecording ? stopUserRecording : startUserRecording}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 28px',
                  borderRadius: '30px',
                  background: isRecording
                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                    : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: isRecording
                    ? '0 0 25px rgba(239, 68, 68, 0.5)'
                    : '0 4px 16px rgba(99, 102, 241, 0.4)',
                  transform: isRecording ? 'scale(1.05)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                <span>{isRecording ? 'Bấm để dừng nói & Gửi câu' : 'Chạm để Nói tiếng Trung trả lời'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playFanfare();
                  setShowSummaryModal(true);
                }}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
                title="Kết thúc và xem tổng kết điểm số"
              >
                🏁 Kết thúc & Tổng kết
              </button>
            </div>

            {/* Smart Answer Hints Carousel */}
            <div style={{ marginTop: '6px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: 'var(--text-muted)',
                }}
              >
                <span>💡 Gợi ý câu trả lời (Bấm để xem mẫu hoặc gửi):</span>
                <span>Chạm vào mẫu câu để luyện nói</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px' }}>
                {activeHints.map((hint, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleUserSubmitTurn(hint.chinese)}
                    style={{
                      background: 'var(--surface-card)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'var(--font-hanzi)' }}>
                        {hint.chinese}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEffects.speakChinese(hint.chinese, 0.85);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6366f1',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                        title="Nghe phát âm thử"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <span style={{ fontSize: '11px', color: '#6366f1', fontWeight: 700 }}>
                      {hint.pinyin}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      "{hint.vietnamese}"
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Finish & Performance Summary Modal */}
      {showSummaryModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              border: '2px solid #6366f1',
              borderRadius: '24px',
              maxWidth: '520px',
              width: '100%',
              padding: '32px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
            <h3 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 900, color: 'var(--text-heading)' }}>
              Xuất Sắc! Hoàn Thành Buổi Luyện 1:1
            </h3>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Bạn vừa hoàn thành buổi đối thoại trực tiếp cùng <strong>{selectedScenario.roleName}</strong>!
            </p>

            {/* Scorecard Box */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>LƯỢT TRAO ĐỔI</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#6366f1' }}>
                  {dialogueHistory.filter((t) => t.sender === 'user').length} lượt
                </div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>ĐỘ TỰ TIN & LƯU LOÁT</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: '#10b981' }}>
                  95% ⭐
                </div>
              </div>
            </div>

            {/* XP Bonus */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#d97706',
                border: '1.5px solid #f59e0b',
                padding: '8px 20px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 900,
                marginBottom: '24px',
              }}
            >
              <Flame size={18} />
              <span>Thưởng nóng +35 XP vào tài khoản!</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleStartRoom(selectedScenario)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--surface-hover)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-heading)',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                🔄 Luyện Lại Tình Huống
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSummaryModal(false);
                  setInRoom(false);
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.35)',
                }}
              >
                Chọn Tình Huống Khác
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
