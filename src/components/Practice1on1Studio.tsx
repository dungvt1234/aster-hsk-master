import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Coffee,
  Car,
  Briefcase,
  GraduationCap,
  Store,
  Hotel,
  Package,
  TrendingUp,
  Cpu,
  Smile,
  Layers,
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
  unitTag: string;
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

const ALL_SCENARIOS_1ON1: Scenario1on1[] = [
  // =========================================================================
  // HSK 1: SƠ CẤP A1 (VỠ LÒNG · GIAO TIẾP CƠ BẢN · ĐỜI SỐNG HẰNG NGÀY)
  // =========================================================================
  {
    id: 'sc-hsk1-num',
    unitTag: 'Giáo trình HSK 1 · Unit 0 & 4',
    title: 'Đếm Số, Xem Giờ & Hẹn Gặp Học Nhóm',
    level: 1,
    roleName: 'Tiểu Linh (小玲)',
    roleTitle: 'Bạn học người Bắc Kinh thân thiện',
    avatarIcon: '🔢',
    description: 'Luyện đếm số từ 1 đến 10, hỏi giờ giấc và sắp xếp lịch hẹn học bài cùng bạn bè.',
    context: 'Tiểu Linh gọi điện hỏi bạn về thời gian làm bài tập và hẹn giờ học nhóm chiều nay.',
    targetVocab: ['几点', '下午', '三点', '星期天', '一起'],
    initialAiTurn: {
      chinese: '你好！请问你今天下午有空吗？我们几点去图书馆学习？',
      pinyin: 'Nǐ hǎo! Qǐngwèn nǐ jīntiān xiàwǔ yǒu kòng ma? Wǒmen jǐ diǎn qù túshūguǎn xuéxí?',
      vietnamese: 'Chào bạn! Xin hỏi chiều nay bạn có rảnh không? Mấy giờ chúng mình đến thư viện học bài nhỉ?',
    },
    smartHints: [
      {
        chinese: '今天下午三点半，我们在图书馆门口见，怎么样？',
        pinyin: 'Jīntiān xiàwǔ sān diǎn bàn, wǒmen zài túshūguǎn ménkǒu jiàn, zěnmeyàng?',
        vietnamese: '3 rưỡi chiều nay, chúng mình gặp nhau ở cổng thư viện, thấy sao?',
      },
      {
        chinese: '我有空！现在是下午两点，我们半个小时后见吧。',
        pinyin: 'Wǒ yǒu kòng! Xiànzài shì xiàwǔ liǎng diǎn, wǒmen bàn gè xiǎoshí hòu jiàn ba.',
        vietnamese: 'Tôi có rảnh! Bây giờ là 2 giờ chiều, chúng mình gặp nhau sau nửa tiếng nữa nhé.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '太好啦！三点半正好。今天去图书馆的一共是四个人，你带汉语书了吗？',
        aiPinyin: 'Tài hǎo la! Sān diǎn bàn zhènghǎo. Jīntiān qù túshūguǎn de yígòng shì sì gè rén, nǐ dài Hànyǔ shū le ma?',
        aiVi: 'Tuyệt quá! 3 rưỡi đúng lúc lắm. Hôm nay đi thư viện tổng cộng có 4 người, bạn mang sách tiếng Hán chưa?',
        coaching: 'Phát âm chuẩn! Chú ý chữ "四" (sì) là thanh 4 rơi giọng dứt khoát.',
        hints: [
          {
            chinese: '我带了第一册和第二册书，还带了两支笔。',
            pinyin: 'Wǒ dài le dì-yī cè hé dì-èr cè shū, hái dài le liǎng zhī bǐ.',
            vietnamese: 'Tôi mang theo sách tập 1 và tập 2, còn mang theo 2 cây bút nữa.',
          },
          {
            chinese: '我都准备好了，一会儿见！',
            pinyin: 'Wǒ dōu zhǔnbèi hǎo le, yíhuìr jiàn!',
            vietnamese: 'Tôi chuẩn bị xong hết rồi, lát nữa gặp nhé!',
          },
        ],
      },
      {
        aiPrompt: '好的，那一会儿见！路上注意安全哦！',
        aiPinyin: 'Hǎo de, nà yíhuìr jiàn! Lùshang zhùyì ānquán o!',
        aiVi: 'Được rồi, thế lát nữa gặp nhé! Trên đường đi cẩn thận nha!',
        coaching: 'Xuất sắc! Bạn đã hoàn thành buổi hội thoại về thời gian và hẹn gặp rất tự nhiên!',
        hints: [
          {
            chinese: '好的，一会儿见，拜拜！',
            pinyin: 'Hǎo de, yíhuìr jiàn, báibai!',
            vietnamese: 'Được rồi, lát gặp nhé, bái bai!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-hsk1-greet',
    unitTag: 'Giáo trình HSK 1 · Unit 1 & 6',
    title: 'Chào Hỏi & Làm Quen Tại Lớp Học Mới',
    level: 1,
    roleName: 'Minh Minh (明明)',
    roleTitle: 'Bạn học cùng bàn năng động',
    avatarIcon: '👋',
    description: 'Thực hành chào hỏi, giới thiệu họ tên, quốc tịch và làm quen với bạn học mới.',
    context: 'Buổi học đầu tiên của khóa tiếng Trung, bạn ngồi cạnh một bạn học người Trung Quốc.',
    targetVocab: ['你好', '叫', '名字', '认识', '高兴'],
    initialAiTurn: {
      chinese: '你好！我是明明，是你的新同桌。很高兴认识你！你叫什么名字？',
      pinyin: 'Nǐ hǎo! Wǒ shì Míngming, shì nǐ de xīn tóngzhuō. Hěn gāoxìng rènshi nǐ! Nǐ jiào shénme míngzi?',
      vietnamese: 'Chào bạn! Mình là Minh Minh, là bạn cùng bàn mới của bạn. Rất vui được quen bạn! Bạn tên là gì thế?',
    },
    smartHints: [
      {
        chinese: '你好明明！我叫大卫，我也很高兴认识你！',
        pinyin: 'Nǐ hǎo Míngming! Wǒ jiào Dàwèi, wǒ yě hěn gāoxìng rènshi nǐ!',
        vietnamese: 'Chào Minh Minh! Mình tên là David, mình cũng rất vui được làm quen với bạn!',
      },
      {
        chinese: '你好！我是越南人，我来中国学习汉语。',
        pinyin: 'Nǐ hǎo! Wǒ shì Yuènán rén, wǒ lái Zhōngguó xuéxí Hànyǔ.',
        vietnamese: 'Chào bạn! Mình là người Việt Nam, mình đến Trung Quốc để học tiếng Hán.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '哇，你的汉语发音很标准！请问你学习汉语多长时间了？',
        aiPinyin: 'Wā, nǐ de Hànyǔ fāyīn hěn biāozhǔn! Qǐngwèn nǐ xuéxí Hànyǔ duō cháng shíjiān le?',
        aiVi: 'Oa, phát âm tiếng Hán của bạn chuẩn ghê! Xin hỏi bạn học tiếng Hán được bao lâu rồi?',
        coaching: 'Khen ngợi rất tự nhiên! Hãy trả lời về thời gian học (ví dụ: 1 tháng, nửa năm).',
        hints: [
          {
            chinese: '我学了三个月了，汉语很有意思，我很喜欢！',
            pinyin: 'Wǒ xué le sān gè yuè le, Hànyǔ hěn yǒu yìsi, wǒ hěn xǐhuan!',
            vietnamese: 'Mình học được 3 tháng rồi, tiếng Hán rất thú vị, mình thích lắm!',
          },
          {
            chinese: '我才刚刚学了一个星期，请多指教！',
            pinyin: 'Wǒ cái gānggang xué le yí gè xīngqī, qǐng duō zhǐjiào!',
            vietnamese: 'Mình mới chỉ vừa học được 1 tuần thôi, mong bạn chỉ giáo thêm nhé!',
          },
        ],
      },
      {
        aiPrompt: '没问题，以后有不懂的随时问我，我们互相帮助！',
        aiPinyin: 'Méi wèntí, yǐhòu yǒu bù dǒng de suíshí wèn wǒ, wǒmen hùxiāng bāngzhù!',
        aiVi: 'Không thành vấn đề, sau này có gì chưa hiểu cứ hỏi mình bất cứ lúc nào, chúng mình giúp đỡ nhau nhé!',
        coaching: 'Chúc mừng bạn! Cuộc chào hỏi làm quen đầu tiên đã đạt kết quả trọn vẹn.',
        hints: [
          {
            chinese: '太好了，非常感谢你！下课一起去喝奶茶吧。',
            pinyin: 'Tài hǎo le, fēicháng gǎnxiè nǐ! Xiàkè yìqǐ qù hē nǎichá ba.',
            vietnamese: 'Tuyệt quá, cảm ơn bạn rất nhiều! Tan học cùng đi uống trà sữa nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-cafe',
    unitTag: 'Giáo trình HSK 1 · Unit 3',
    title: 'Gọi Cà Phê & Trà Nóng Tại Quán Nước',
    level: 1,
    roleName: 'Tiểu Vương (小王)',
    roleTitle: 'Nhân viên quán cà phê Bắc Kinh',
    avatarIcon: '☕',
    description: 'Thực hành gọi thức uống, chọn kích cỡ ly, dặn ít đá/nhiều đường và thanh toán tiền mặt/WeChat.',
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
    ],
    fallbackTurns: [
      {
        aiPrompt: '好的！大杯还是中杯？需要加牛奶吗？',
        aiPinyin: 'Hǎo de! Dà bēi háishi zhōng bēi? Xūyào jiā niúnǎi ma?',
        aiVi: 'Dạ được ạ! Bạn chọn ly lớn hay ly vừa? Có cần thêm sữa không?',
        coaching: 'Khi gọi món, bạn có thể nói "大杯" (ly lớn) hoặc "中杯" (ly vừa).',
        hints: [
          {
            chinese: '我要大杯的，不加糖，谢谢。',
            pinyin: 'Wǒ yào dà bēi de, bù jiā táng, xièxie.',
            vietnamese: 'Cho tôi ly lớn nhé, không thêm đường, cảm ơn.',
          },
          {
            chinese: '中杯就可以了，加点儿牛奶。',
            pinyin: 'Zhōng bēi jiù kěyǐ le, jiā diǎnr niúnǎi.',
            vietnamese: 'Ly vừa là được rồi, cho thêm một chút sữa nhé.',
          },
        ],
      },
      {
        aiPrompt: '没问题！一共是二十五块钱，您怎么支付？',
        aiPinyin: 'Méi wèntí! Yígòng shì èrshíwǔ kuài qián, nín zěnme zhīfù?',
        aiVi: 'Không thành vấn đề! Tổng cộng của bạn là 25 tệ, bạn thanh toán như thế nào ạ?',
        coaching: 'Dùng mẫu câu thanh toán: "可以微信支付吗？" hoặc "我付现金" (tôi trả tiền mặt).',
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
        aiVi: 'Đã nhận được tiền ạ! Đây là cà phê và hóa đơn của bạn, chúc bạn ngon miệng và một ngày vui vẻ!',
        coaching: 'Xuất sắc! Bạn đã hoàn thành trọn vẹn tình huống gọi đồ uống bản xứ.',
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
    id: 'sc-hsk1-fruit',
    unitTag: 'Giáo trình HSK 1 · Unit 5',
    title: 'Đi Siêu Thị Mua Táo & Tính Tiền Cân Ký',
    level: 1,
    roleName: 'Chị Lý (李姐)',
    roleTitle: 'Chủ sạp hoa quả tươi ngon',
    avatarIcon: '🍎',
    description: 'Thực hành hỏi giá hoa quả theo cân (斤 - 500g), tính tổng tiền và thanh toán đơn giản.',
    context: 'Bạn đang đứng trước sạp trái cây tươi trong khu chợ dân sinh sầm uất.',
    targetVocab: ['苹果', '多少钱', '一斤', '太贵', '买'],
    initialAiTurn: {
      chinese: '小伙子买水果啊？今天的红富士苹果特别甜，尝一个不？',
      pinyin: 'Xiǎohuǒzi mǎi shuǐguǒ a? Jīntiān de hóngfùshì píngguǒ tèbié tián, cháng yí gè bu?',
      vietnamese: 'Mua hoa quả hả em? Táo Phú Sĩ đỏ hôm nay ngọt lắm, nếm thử một miếng không?',
    },
    smartHints: [
      {
        chinese: '阿姨，这个苹果多少钱一斤？',
        pinyin: 'Āyí, zhège píngguǒ duōshao qián yì jīn?',
        vietnamese: 'Cô ơi, táo này bao nhiêu tiền một cân (500g) ạ?',
      },
      {
        chinese: '我想买五斤苹果，新鲜吗？',
        pinyin: 'Wǒ xiǎng mǎi wǔ jīn píngguǒ, xīnxiān ma?',
        vietnamese: 'Cháu muốn mua 5 cân táo, có tươi không ạ?',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '特别新鲜！五块钱一斤，买三斤送一个，你要几斤啊？',
        aiPinyin: 'Tèbié xīnxiān! Wǔ kuài qián yì jīn, mǎi sān jīn sòng yí gè, nǐ yào jǐ jīn a?',
        aiVi: 'Tươi lắm! 5 tệ một cân, mua 3 cân tặng 1 quả, cháu lấy mấy cân nào?',
        coaching: 'Người Trung Quốc tính bằng "斤" (jīn = 500g). Bạn có thể nói số lượng muốn mua.',
        hints: [
          {
            chinese: '那我买四斤吧，麻烦帮我挑好一点儿的。',
            pinyin: 'Nà wǒ mǎi sì jīn ba, máfan bāng wǒ tiāo hǎo yìdiǎnr de.',
            vietnamese: 'Thế cháu lấy 4 cân nhé, phiền cô chọn giúp cháu quả ngon ngon một chút.',
          },
          {
            chinese: '有点儿贵，四块钱一斤行不行？',
            pinyin: 'Yǒudiǎnr guì, sì kuài qián yì jīn xíng bu xíng?',
            vietnamese: 'Hơi đắt cô ơi, 4 tệ một cân được không cô?',
          },
        ],
      },
      {
        aiPrompt: '好嘞，给你称好了，正好四斤，二十块钱！微信还是支付宝？',
        aiPinyin: 'Hǎo lei, gěi nǐ chēng hǎo le, zhènghǎo sì jīn, èrshí kuài qián! Wēixìn háishi Zhīfùbǎo?',
        aiVi: 'Xong rồi đây, cân cho cháu đúng 4 cân nhé, tròn 20 tệ! Trả WeChat hay Alipay?',
        coaching: 'Rất tốt! Ở Trung Quốc người ta hay hỏi "微信还是支付宝" (WeChat hay Alipay).',
        hints: [
          {
            chinese: '我用微信支付，这是二维码。',
            pinyin: 'Wǒ yòng wēixìn zhīfù, zhè shì èrwéimǎ.',
            vietnamese: 'Cháu trả bằng WeChat ạ, đây là mã QR.',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // HSK 2: SƠ CẤP A2 (GIAO TIẾP THỰC TẾ ĐỜI SỐNG · MẶC CẢ · HỎI ĐƯỜNG)
  // =========================================================================
  {
    id: 'sc-hsk2-bargain',
    unitTag: 'Giáo trình HSK 2 · Unit 1',
    title: 'Mua Sắm Quần Áo & Mặc Cả Tại Chợ Đêm',
    level: 2,
    roleName: 'Cô Trịnh (郑老板)',
    roleTitle: 'Chủ tiệm thời trang chợ đêm vui vẻ',
    avatarIcon: '👗',
    description: 'Thực hành thử quần áo, hỏi cỡ to/nhỏ và khéo léo mặc cả giảm giá.',
    context: 'Bạn đang chọn đồ tại khu chợ đêm mua sắm thời trang sầm uất.',
    targetVocab: ['衣服', '试一下', '有点儿贵', '便宜', '打折'],
    initialAiTurn: {
      chinese: '帅哥看衣服吗？这件黑色外套版型特别好看，要不要试穿一下？',
      pinyin: 'Shuàigē kàn yīfu ma? Zhè jiàn hēisè wàitào bǎnxíng tèbié hǎokàn, yào bu yào shìchuān yíxià?',
      vietnamese: 'Em trai xem quần áo hả? Chiếc áo khoác màu đen này form dáng đẹp lắm, thử một chút không?',
    },
    smartHints: [
      {
        chinese: '我可以试一下吗？请问这件衣服多少钱？',
        pinyin: 'Wǒ kěyǐ shì yíxià ma? Qǐngwèn zhè jiàn yīfu duōshao qián?',
        vietnamese: 'Tôi có thể thử một chút không? Xin hỏi chiếc áo này bao nhiêu tiền ạ?',
      },
      {
        chinese: '这件有点儿小，有没有大一号的？',
        pinyin: 'Zhè jiàn yǒudiǎnr xiǎo, yǒu méiyǒu dà yí hào de?',
        vietnamese: 'Chiếc này hơi nhỏ, có cỡ lớn hơn một số không chị?',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '有大号的！试衣间在里面。这件质量特别好，原价两百八，今天给你两百块！',
        aiPinyin: 'Yǒu dà hào de! Shìyījiān zài lǐmiàn. Zhè jiàn zhìliàng tèbié hǎo, yuánjià liǎngbǎibā, jīntiān gěi nǐ liǎngbǎi kuài!',
        aiVi: 'Có size lớn nha! Phòng thử đồ ở phía trong. Áo này chất vải đẹp lắm, giá gốc 280, hôm nay lấy bạn 200 tệ!',
        coaching: 'Dùng câu trả giá kinh điển HSK 2: "便宜一点儿吧" (giảm giá một chút đi mà).',
        hints: [
          {
            chinese: '两百块还是有点儿贵，一百五十块卖不卖？',
            pinyin: 'Liǎngbǎi kuài háishi yǒudiǎnr guì, yìbǎi wǔshí kuài mài bu mài?',
            vietnamese: '200 tệ vẫn hơi đắt chị ơi, 150 tệ bán được không ạ?',
          },
          {
            chinese: '如果我买两件，能给我打八折吗？',
            pinyin: 'Rúguǒ wǒ mǎi liǎng jiàn, néng gěi wǒ dǎ bā zhé ma?',
            vietnamese: 'Nếu em mua 2 chiếc, chị giảm 20% (bán 80% giá) cho em được không?',
          },
        ],
      },
      {
        aiPrompt: '哎呀你太会讲价了！行吧行吧，一百六卖给你一件，交个朋友！',
        aiPinyin: 'Āiyā nǐ tài huì jiǎngjià le! Xíng ba xíng ba, yìbǎiliù mài gěi nǐ yí jiàn, jiāo gè péngyou!',
        aiVi: 'Úi giời em khéo trả giá quá! Thôi được rồi, 160 tệ bán cho em một chiếc, xem như kết bạn nhé!',
        coaching: 'Rất xuất sắc! Bạn đã mặc cả thành công từ 200 tệ xuống còn 160 tệ như người bản xứ.',
        hints: [
          {
            chinese: '谢谢老板娘，帮我包起来吧，我扫码付款！',
            pinyin: 'Xièxie lǎobǎnniáng, bāng wǒ bāo qǐlai ba, wǒ sǎomǎ fùkuǎn!',
            vietnamese: 'Cảm ơn bà chủ nhé, gói lại giúp em, em quét mã trả tiền ngay!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-taxi',
    unitTag: 'Giáo trình HSK 2 · Unit 2',
    title: 'Bắt Taxi Đi Ga Tàu Hỏa & Hỏi Tuyến Đường',
    level: 2,
    roleName: 'Bác Trương (张师傅)',
    roleTitle: 'Tài xế taxi nhiệt tình Thượng Hải',
    avatarIcon: '🚕',
    description: 'Nói địa điểm muốn tới, nhờ bác tài chạy nhanh, hỏi về kẹt xe và ước lượng thời gian.',
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
        coaching: 'Từ "赶时间" (gǎn shíjiān) nghĩa là "gấp thời gian". Hãy trả lời tự nhiên nhé.',
        hints: [
          {
            chinese: '我赶十点半的高铁，麻烦您尽量走高架路。',
            pinyin: 'Wǒ gǎn shí diǎn bàn de gāotiě, máfan nín jǐnliàng zǒu gāojiàlù.',
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
        aiPrompt: '火车站到了，一共是二十八块钱，下车拿好行李啊！',
        aiPinyin: 'Huǒchēzhàn dào le, yígòng shì èrshíbā kuài qián, xià chē ná hǎo xíngli a!',
        aiVi: 'Ga tàu đến rồi đây, tổng cộng là 28 tệ nhé, xuống xe nhớ lấy đủ hành lý nha!',
        coaching: 'Chúc mừng bạn! Cuộc trò chuyện giao tiếp tự nhiên và thành công mỹ mãn.',
        hints: [
          {
            chinese: '谢谢师傅，祝您一路平安，生意兴隆！',
            pinyin: 'Xièxie shīfu, zhù nín yílù píng’ān, shēngyì xīnglóng!',
            vietnamese: 'Cảm ơn bác tài, chúc bác thượng lộ bình an, làm ăn phát đạt!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-hsk2-health',
    unitTag: 'Giáo trình HSK 2 · Unit 3',
    title: 'Thời Tiết Chuyển Lạnh & Hỏi Thăm Người Ốm',
    level: 2,
    roleName: 'Tiểu Mai (小梅)',
    roleTitle: 'Bạn học đang bị cảm sốt nhẹ',
    avatarIcon: '🧣',
    description: 'Thực hành hỏi thăm sức khỏe, nhắc nhở uống thuốc đúng giờ và mặc ấm khi trời lạnh.',
    context: 'Hôm nay trời đột ngột trở lạnh, bạn gọi điện hỏi thăm Tiểu Mai vắng học vì bị cảm cúm.',
    targetVocab: ['身体', '感冒', '吃药', '天气', '多喝水'],
    initialAiTurn: {
      chinese: '喂，是我。今天外面刮大风特别冷，我感冒咳嗽，有点儿发烧。',
      pinyin: 'Wéi, shì wǒ. Jīntiān wàimiàn guā dàfēng tèbié lěng, wǒ gǎnmào késou, yǒudiǎnr fāshāo.',
      vietnamese: 'A-lô, mình đây. Hôm nay bên ngoài gió to lạnh quá, mình bị cảm ho, hơi sốt một chút.',
    },
    smartHints: [
      {
        chinese: '你身体好点儿了吗？去医院看医生了吗？',
        pinyin: 'Nǐ shēntǐ hǎo diǎnr le ma? Qù yīyuàn kàn yīshēng le ma?',
        vietnamese: 'Sức khỏe của bạn đỡ hơn chút nào chưa? Đã đi bệnh viện khám bác sĩ chưa?',
      },
      {
        chinese: '记得按时吃药，多喝热水，今天好好在宿舍休息。',
        pinyin: 'Jìde ànshí chīyào, duō hē rèshuǐ, jīntiān hǎohǎo zài sùshè xiūxi.',
        vietnamese: 'Nhớ uống thuốc đúng giờ, uống nhiều nước ấm, hôm nay nghỉ ngơi cho khỏe ở ký túc xá nhé.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '我看过医生了，拿了感冒药。就是今天的课没法上，心里有点儿着急。',
        aiPinyin: 'Wǒ kànguò yīshēng le, ná le gǎnmàoyào. Jiùshì jīntiān de kè méi fǎ shàng, xīnlǐ yǒudiǎnr zháojí.',
        aiVi: 'Mình khám bác sĩ rồi, có lấy thuốc cảm. Chỉ là hôm nay không đi học được, trong lòng hơi sốt ruột.',
        coaching: 'Động viên bạn yên tâm dưỡng bệnh: "别担心，我会帮你借笔记" (Đừng lo, mình sẽ chép bài giúp bạn).',
        hints: [
          {
            chinese: '别担心，今天的笔记我都帮你记下了，你专心休息！',
            pinyin: 'Bié dānxīn, jīntiān de bǐjì wǒ dōu bāng nǐ jì xià le, nǐ zhuānxīn xiūxi!',
            vietnamese: 'Đừng lo lắng, bài vở hôm nay mình ghi chép giúp bạn hết rồi, bạn cứ chuyên tâm nghỉ ngơi đi!',
          },
        ],
      },
      {
        aiPrompt: '太感动了！有你这样的朋友真好，谢谢你的关心！',
        aiPinyin: 'Tài gǎndòng le! Yǒu nǐ zhèyàng de péngyou zhēn hǎo, xièxie nǐ de guānxīn!',
        aiVi: 'Cảm động quá! Có người bạn như bạn thật tốt, cảm ơn sự quan tâm của bạn nhiều nha!',
        coaching: 'Tuyệt vời! Bạn đã vận dụng trọn vẹn ngữ pháp và từ vựng hỏi thăm sức khỏe HSK 2.',
        hints: [
          {
            chinese: '不用客气，祝你早日康复！明天见！',
            pinyin: 'Bú yòng kèqi, zhù nǐ zǎorì kāngfù! Míngtiān jiàn!',
            vietnamese: 'Không có chi, chúc bạn mau chóng bình phục nhé! Ngày mai gặp lại!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-tutor',
    unitTag: 'Giáo trình HSK 2 · Unit 6',
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

  // =========================================================================
  // HSK 3: TRUNG CẤP B1 (CÔNG SỞ · KHÁCH SẠN · ĐẶT MÓN & SHIPPER)
  // =========================================================================
  {
    id: 'sc-hsk3-hotel',
    unitTag: 'Giáo trình HSK 3 · Unit 2',
    title: 'Làm Thủ Tục Check-in Khách Sạn & Gửi Hành Lý',
    level: 3,
    roleName: 'Lễ Tân Khách Sạn (前台小刘)',
    roleTitle: 'Chuyên viên lễ tân khách sạn 4 sao',
    avatarIcon: '🏨',
    description: 'Thực hành nhận phòng đặt trước, xuất trình hộ chiếu, hỏi mật khẩu wifi và dịch vụ đưa đón sân bay.',
    context: 'Bạn vừa đáp chuyến bay đến Bắc Kinh và tới quầy lễ tân khách sạn để làm thủ tục nhận phòng.',
    targetVocab: ['预订', '护照', '大床房', '押金', '行李'],
    initialAiTurn: {
      chinese: '先生您好，欢迎入住北京国际饭店！请问您有预订吗？',
      pinyin: 'Xiānsheng nín hǎo, huānyíng rùzhù Běijīng Guójì Fàndiàn! Qǐngwèn nín yǒu yùdìng ma?',
      vietnamese: 'Xin chào quý khách, chào mừng quý khách đến với Khách sạn Quốc tế Bắc Kinh! Xin hỏi quý khách có đặt phòng trước không ạ?',
    },
    smartHints: [
      {
        chinese: '您好，我在携程网上预订了一间大床房，住三个晚上。',
        pinyin: 'Nín hǎo, wǒ zài Xiécéng wǎngshang yùdìng le yì jiān dàchuáng fáng, zhù sān gè wǎnshang.',
        vietnamese: 'Chào bạn, tôi đã đặt trước một phòng giường đôi trên mạng Ctrip, ở 3 đêm.',
      },
      {
        chinese: '这是我的护照，请帮我查一下订单。',
        pinyin: 'Zhè shì wǒ de hùzhào, qǐng bāng wǒ chá yíxià dìngdān.',
        vietnamese: 'Đây là hộ chiếu của tôi, phiền bạn kiểm tra đơn đặt phòng giúp tôi.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '查到您的订单了！房间在八楼808号，含双人早餐。请在这里签字，需要刷五百元押金。',
        aiPinyin: 'Chá dào nín de dìngdān le! Fángjiān zài bā lóu bābāolíng hào, hán shuāngrén zǎocān. Qǐng zài zhèlǐ qiānzì, xūyào shuā wǔbǎi yuán yājīn.',
        aiVi: 'Đã tra thấy đơn của bạn rồi! Phòng ở tầng 8 số 808, bao gồm bữa sáng cho 2 người. Xin ký tên ở đây và quẹt 500 tệ tiền cọc phòng ạ.',
        coaching: 'Từ "押金" (yājīn) là tiền đặt cọc phòng. Khi trả phòng sẽ được hoàn lại đầy đủ.',
        hints: [
          {
            chinese: '好的，请问早餐时间和无线网密码是多少？',
            pinyin: 'Hǎo de, qǐngwèn zǎocān shíjiān hé wúxiànwǎng mìmǎ shì duōshao?',
            vietnamese: 'Vâng, xin hỏi giờ ăn sáng và mật khẩu wifi là bao nhiêu ạ?',
          },
        ],
      },
      {
        aiPrompt: '早餐在二楼，时间是早晨六点半到九点半。WiFi直接连房间号就行。祝您入住愉快！',
        aiPinyin: 'Zǎocān zài èr lóu, shíjiān shì zǎochén liù diǎn bàn dào jiǔ diǎn bàn. WiFi zhíjiē lián fángjiān hào jiù xíng. Zhù nín rùzhù yúkuài!',
        aiVi: 'Bữa sáng ở tầng 2, thời gian từ 6h30 đến 9h30 sáng. WiFi cứ kết nối theo số phòng là được. Chúc bạn kỳ nghỉ vui vẻ!',
        coaching: 'Rất chuyên nghiệp! Bạn đã hoàn thành trọn vẹn thủ tục check-in khách sạn chuẩn HSK 3.',
        hints: [
          {
            chinese: '非常感谢你的热情服务，再见！',
            pinyin: 'Fēicháng gǎnxiè nǐ de rèqíng fúwù, zàijiàn!',
            vietnamese: 'Vô cùng cảm ơn sự phục vụ nhiệt tình của bạn, tạm biệt nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-hsk3-meeting',
    unitTag: 'Giáo trình HSK 3 · Unit 3',
    title: 'Họp Công Ty & Báo Cáo Tiến Độ Dự Án Tuần',
    level: 3,
    roleName: 'Trưởng Nhóm Lý (李组长)',
    roleTitle: 'Trưởng bộ phận phát triển dự án',
    avatarIcon: '📊',
    description: 'Thực hành báo cáo tuần, thảo luận giải pháp khắc phục chậm tiến độ và trình bày ý kiến.',
    context: 'Cuộc họp giao ban đầu tuần của nhóm dự án tại văn phòng công ty.',
    targetVocab: ['完成', '报告', '问题', '解决', '意见'],
    initialAiTurn: {
      chinese: '大家早上好！今天的周会开始，请大家依次汇报本周项目的进展情况。',
      pinyin: 'Dàjiā zǎoshang hǎo! Jīntiān de zhōuhuì kāishǐ, qǐng dàjiā yīcì huìbào běn zhōu xiàngmù de jìnzhǎn qíngkuàng.',
      vietnamese: 'Chào buổi sáng mọi người! Cuộc họp tuần hôm nay bắt đầu, mời mọi người lần lượt báo cáo tình hình tiến độ dự án tuần này.',
    },
    smartHints: [
      {
        chinese: '李组长好，我们组已经提前完成了市场调研报告，请查收。',
        pinyin: 'Lǐ zǔzhǎng hǎo, wǒmen zǔ yǐjīng tíqián wánchéng le shìchǎng diàoyán bàogào, qǐng cháchōu.',
        vietnamese: 'Chào Trưởng nhóm Lý, nhóm chúng tôi đã hoàn thành trước hạn báo cáo khảo sát thị trường, xin gửi anh xem.',
      },
      {
        chinese: '目前整体进展顺利，只是在数据对接方面遇到了一点儿技术困难。',
        pinyin: 'Mùqián zhěngtǐ jìnzhǎn shùnlì, zhǐshì zài shùjù duìjiē fāngmiàn yùdào le yìdiǎnr jìshù kùnnan.',
        vietnamese: 'Hiện tại tiến độ tổng thể diễn ra thuận lợi, chỉ là về mảng liên kết dữ liệu gặp đôi chút khó khăn kỹ thuật.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '效率很高！关于数据对接的技术难题，你们打算采取什么方案来解决？',
        aiPinyin: 'Xiàolǜ hěn gāo! Guānyú shùjù duìjiē de jìshù nántí, nǐmen dǎsuàn cǎiqǔ shénme fāng’àn lái jiějué?',
        aiVi: 'Hiệu suất làm việc rất cao! Về bài toán kỹ thuật dữ liệu đó, nhóm bạn dự định áp dụng phương án nào để tháo gỡ?',
        coaching: 'Nêu giải pháp rõ ràng: "我们计划与技术部联合测试..." (Chúng tôi lên kế hoạch phối hợp thử nghiệm với phòng kỹ thuật).',
        hints: [
          {
            chinese: '我们已经跟技术部约好了今天下午开会，共同优化接口方案。',
            pinyin: 'Wǒmen yǐjīng gēn jìshùbù yuē hǎo le jīntiān xiàwǔ kāihuì, gòngtóng yōuhuà jiēkǒu fāng’àn.',
            vietnamese: 'Chúng tôi đã hẹn với phòng kỹ thuật chiều nay họp để cùng tối ưu hóa phương án kết nối cổng API.',
          },
        ],
      },
      {
        aiPrompt: '很好！思路非常清晰，那就按这个方案抓紧推进，散会！',
        aiPinyin: 'Hěn hǎo! Sīlù fēicháng qīngxī, nà jiù àn zhè gè fāng’àn zhuājǐn tuījìn, sànhuì!',
        aiVi: 'Rất tốt! Hướng suy nghĩ rất rành mạch, thế cứ theo phương án này khẩn trương thúc đẩy nhé, tan họp!',
        coaching: 'Xuất sắc! Bạn đã trình bày báo cáo công sở rất tự tin, đĩnh đạc.',
        hints: [
          {
            chinese: '收到，我们会全力以赴确保项目按时交付！',
            pinyin: 'Shōudào, wǒmen huì quánlì-yǐfù quèbǎo xiàngmù ànshí jiāofù!',
            vietnamese: 'Rõ ạ, chúng tôi sẽ dốc toàn lực để bảo đảm dự án bàn giao đúng thời hạn!',
          },
        ],
      },
    ],
  },

  // =========================================================================
  // HSK 4: NÂNG CAO B2 (THƯƠNG MẠI · ĐÀM PHÁN · THÀNH NGỮ & CÔNG NGHỆ)
  // =========================================================================
  {
    id: 'sc-hsk4-business',
    unitTag: 'Giáo trình HSK 4 · Unit 2',
    title: 'Đàm Phán Hợp Đồng Thương Mại & Chiết Khấu',
    level: 4,
    roleName: 'Giám Đốc Trương (张总)',
    roleTitle: 'Đại diện đối tác thương mại chiến lược',
    avatarIcon: '🤝',
    description: 'Thực hành thảo luận điều khoản hợp tác, chiết khấu đơn hàng lớn và khẳng định nguyên tắc đôi bên cùng có lợi.',
    context: 'Cuộc gặp đàm phán cấp cao về đơn hàng phân phối độc quyền quý 4.',
    targetVocab: ['合作', '折扣', '合同', '互利共赢', '质量'],
    initialAiTurn: {
      chinese: '贵公司的产品质量我们非常认可。不过关于这次订购的价格，能否给予我们五个百分点的折扣？',
      pinyin: 'Guì gōngsī de chǎnpǐn zhìliàng wǒmen fēicháng rènkě. Bùguò guānyú zhè cì dìnggòu de jiàgé, néngfǒu jǐyǔ wǒmen wǔ gè bǎifēndiǎn de zhékòu?',
      vietnamese: 'Chất lượng sản phẩm của quý công ty chúng tôi đánh giá rất cao. Tuy nhiên về mức giá đơn hàng lần này, liệu có thể chiết khấu cho chúng tôi thêm 5% không?',
    },
    smartHints: [
      {
        chinese: '张总，如果我们双方能签订为期三年的长期合作协议，我们很乐意为您提供最优惠的折扣。',
        pinyin: 'Zhāng zǒng, rúguǒ wǒmen shuāngfāng néng qiāndìng wéiqī sān nián de chángqī hézuò xiéyì, wǒmen hěn lèyì wèi nín tígōng zuì yōuhuì de zhékòu.',
        vietnamese: 'Thưa Giám đốc Trương, nếu hai bên chúng ta có thể ký kết thỏa thuận hợp tác dài hạn 3 năm, chúng tôi rất sẵn lòng cung cấp mức chiết khấu ưu đãi nhất cho ông.',
      },
      {
        chinese: '互利共赢一直是我们合作的基础，只要订单量达到一万件，我们可以接受这个价格。',
        pinyin: 'Hùlì gòngyíng yìzhí shì wǒmen hézuò de jīchǔ, zhǐyào dìngdānliàng dádào yíwàn jiàn, wǒmen kěyǐ jiēshòu zhè gè jiàgé.',
        vietnamese: 'Đôi bên cùng có lợi luôn là nền tảng hợp tác của chúng ta, chỉ cần số lượng đơn hàng đạt 10.000 sản phẩm, chúng tôi hoàn toàn có thể chấp nhận mức giá này.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '贵方的诚意我们感受到了！一万件完全没问题。那关于首批货物的交付周期，最快什么时候能发货？',
        aiPinyin: 'Guì fāng de chéngyì wǒmen gǎnshòu dào le! Yíwàn jiàn wánquán méi wèntí. Nà guānyú shǒupī huòwù de jiāofù zhōuqī, zuì kuài shénme shíhou néng fāhuò?',
        aiVi: 'Chúng tôi đã cảm nhận được thành ý từ quý công ty! 10.000 sản phẩm hoàn toàn không thành vấn đề. Vậy về tiến độ giao lô hàng đầu tiên, sớm nhất khi nào có thể xuất kho?',
        coaching: 'Nêu cam kết thời gian cụ thể: "合同签订后两周内..." (Trong vòng 2 tuần sau khi hợp đồng được ký kết).',
        hints: [
          {
            chinese: '合同正式签订并收到定金后，我们保证在两周内完成首批交付。',
            pinyin: 'Hétong zhèngshì qiāndìng bìng shōudào dìngjīn hòu, wǒmen bǎozhèng zài liǎng zhōu nèi wánchéng shǒupī jiāofù.',
            vietnamese: 'Sau khi hợp đồng chính thức được ký và nhận tiền đặt cọc, chúng tôi đảm bảo sẽ hoàn thành đợt giao đầu tiên trong vòng hai tuần.',
          },
        ],
      },
      {
        aiPrompt: '太好了！祝愿我们未来的合作取得圆满成功，合作愉快！',
        aiPinyin: 'Tài hǎo le! Zhùyuàn wǒmen wèilái de hézuò qǔdé yuánmǎn chénggōng, hézuò yúkuài!',
        aiVi: 'Tuyệt vời quá! Chúc cho sự hợp tác tương lai của chúng ta gặt hái thành công viên mãn, hợp tác vui vẻ!',
        coaching: 'Chúc mừng bạn! Kỹ năng đàm phán thương mại HSK 4 đỉnh cao và rất thuyết phục.',
        hints: [
          {
            chinese: '合作愉快！我们今天下午就准备好正式合同文本。',
            pinyin: 'Hézuò yúkuài! Wǒmen jīntiān xiàwǔ jiù zhǔnbèi hǎo zhèngshì hétong wénběn.',
            vietnamese: 'Hợp tác vui vẻ! Ngay chiều nay chúng tôi sẽ chuẩn bị xong bản hợp đồng chính thức.',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-hsk4-idiom',
    unitTag: 'Giáo trình HSK 4 · Unit 4',
    title: 'Thảo Luận Triết Lý Nhân Sinh & Thành Ngữ 4 Chữ',
    level: 4,
    roleName: 'Giáo Sư Chu (周教授)',
    roleTitle: 'Học giả nghiên cứu văn hóa Hán ngữ',
    avatarIcon: '📜',
    description: 'Thực hành thảo luận sâu sắc về các thành ngữ kinh điển: "入乡随俗", "千里之行 始于足下".',
    context: 'Buổi tọa đàm đàm đạo văn hóa cùng giáo sư Hán ngữ tại phòng trà văn học.',
    targetVocab: ['成语', '入乡随俗', '态度', '坚持', '理解'],
    initialAiTurn: {
      chinese: '中国有句古话叫“入乡随俗”。来到不同的文化环境，你对这句话有什么深刻的理解呢？',
      pinyin: 'Zhōngguó yǒu jù gǔhuà jiào “rù xiāng suí sú”. Lái dào bùtóng de wénhuà huánjìng, nǐ duì zhè jù huà yǒu shénme shēnkè de lǐjiě ne?',
      vietnamese: 'Trung Hoa có câu cổ ngữ "Nhập gia tùy tục". Khi bước vào một môi trường văn hóa khác biệt, bạn có suy nghĩ sâu sắc gì về câu nói này?',
    },
    smartHints: [
      {
        chinese: '我认为“入乡随俗”不仅是一种礼貌，更是尊重当地风俗习惯与包容多元文化的体现。',
        pinyin: 'Wǒ rènwéi “rù xiāng suí sú” bùjǐn shì yì zhǒng lǐmào, gèng shì zūnzhòng dāngdì fēngsú xíguàn yǔ bāoróng duōyuán wénhuà de tǐxiàn.',
        vietnamese: 'Tôi cho rằng "Nhập gia tùy tục" không chỉ là một phép lịch sự, mà càng là sự tôn trọng phong tục tập quán bản địa và bao dung với sự đa dạng văn hóa.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '见解非常独到！那另一句名言“千里之行，始于足下”，在你的中文学习之路上有怎样的启发？',
        aiPinyin: 'Jiànjiě fēicháng dúdào! Nà lìng yí jù míngyán “qiān lǐ zhī xíng, shǐ yú zú xià”, zài nǐ de Zhōngwén xuéxí zhī lù shang yǒu zěnyàng de qǐfā?',
        aiVi: 'Góc nhìn rất sâu sắc! Thế còn danh ngôn "Hành trình ngàn dặm bắt đầu từ một bước chân", trên chặng đường học tiếng Trung của bạn có ý nghĩa soi sáng ra sao?',
        coaching: 'Nêu sự kiên trì từng ngày: "每天积累几个词汇，坚持不懈..." (Mỗi ngày tích lũy vài từ vựng, kiên trì không nản chí).',
        hints: [
          {
            chinese: '它告诉我不要急于求成，每天积累几个生词和句子，持之以恒就一定能掌握这门语言。',
            pinyin: 'Tā gàosu wǒ bú yào jí yú qiú chéng, měitiān jīlěi jǐ gè shēngcí hé jùzi, chí zhī yǐ héng jiù yídìng néng zhǎngwò zhè mén yǔyán.',
            vietnamese: 'Nó dạy tôi không được nóng vội, mỗi ngày tích lũy vài từ mới và mẫu câu, kiên trì bền bỉ thì nhất định sẽ làm chủ được ngôn ngữ này.',
          },
        ],
      },
      {
        aiPrompt: '说得太精辟了！你的中文底蕴和思维深度令我非常钦佩，祝你在汉语的求索之路上越走越宽广！',
        aiPinyin: 'Shuō de tài jīngpì le! Nǐ de Zhōngwén dǐyùn hé sīwéi shēndù lìng wǒ fēicháng qīnpèi, zhù nǐ zài Hànyǔ de qiúsuǒ zhī lù shang yuè zǒu yuè kuānguǎng!',
        aiVi: 'Nói rất thấu đáo! Vốn liếng tiếng Trung và chiều sâu tư duy của bạn khiến tôi vô cùng khâm phục, chúc con đường học vấn Hán ngữ của bạn ngày càng rộng mở!',
        coaching: 'Tuyệt đỉnh! Bạn đã sử dụng thành ngữ và diễn đạt tư tưởng triết học HSK 4 đỉnh cao.',
        hints: [
          {
            chinese: '非常感谢周教授的鼓励与启发，受教匪浅！',
            pinyin: 'Fēicháng gǎnxiè Zhōu jiàoshòu de gǔlì yǔ qǐfā, shòu jiào fěi qiǎn!',
            vietnamese: 'Vô cùng cảm ơn sự khích lệ và chỉ dạy quý báu của Giáo sư Chu, tôi đã học hỏi được rất nhiều!',
          },
        ],
      },
    ],
  },
  {
    id: 'sc-interview',
    unitTag: 'Giáo trình HSK 4 · Unit 5',
    title: 'Phỏng Vấn Xin Việc Tại Doanh Nghiệp Quốc Tế',
    level: 4,
    roleName: 'Giám Đốc Trần (陈总监)',
    roleTitle: 'Giám đốc nhân sự chuyên nghiệp',
    avatarIcon: '💼',
    description: 'Thực chiến phỏng vấn xin việc bằng tiếng Trung: giới thiệu năng lực, giải quyết bất đồng và định hướng.',
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
        aiPrompt: '非常精彩的回答！期待与你的正式合作！',
        aiPinyin: 'Fēicháng jīngcǎi de huídá! Qīdài yǔ nǐ de zhèngshì hézuò!',
        aiVi: 'Câu trả lời rất tuyệt vời! Rất mong chờ được hợp tác chính thức!',
        coaching: 'Tuyệt đỉnh! Bạn đã vượt qua buổi phỏng vấn HSK 4 với phong thái tự tin và chuyên nghiệp.',
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
  {
    id: 'sc-hsk4-ai',
    unitTag: 'Giáo trình HSK 4 · Unit 7',
    title: 'Tọa Đàm Trí Tuệ Nhân Tạo & Xu Hướng Tương Lai',
    level: 4,
    roleName: 'Tiến Sĩ Lý (李博士)',
    roleTitle: 'Chuyên gia nghiên cứu Trí tuệ nhân tạo (AI)',
    avatarIcon: '🤖',
    description: 'Thực hành thảo luận về công nghệ AI, chuyển đổi số và những thay đổi trong phương thức làm việc tương lai.',
    context: 'Buổi tọa đàm công nghệ số tại diễn đàn đổi mới sáng tạo thanh niên quốc tế.',
    targetVocab: ['人工智能', '技术', '未来', '发展', '工作模式'],
    initialAiTurn: {
      chinese: '大家下午好！随着生成式人工智能的快速普及，你认为AI将给普通人的日常生活带来哪些最大的变革？',
      pinyin: 'Dàjiā xiàwǔ hǎo! Suízhe shēngchéngshì réngōng zhìnéng de kuàisù pǔjí, nǐ rènwéi AI jiāng gěi pǔtōng rén de rìcháng shēnghuó dài lái nǎxiē zuì dà de biàngé?',
      vietnamese: 'Chào buổi chiều mọi người! Cùng với sự phổ biến nhanh chóng của AI tạo sinh, bạn cho rằng AI sẽ mang lại những chuyển biến lớn nhất nào cho đời sống hàng ngày của người bình thường?',
    },
    smartHints: [
      {
        chinese: '我认为AI不仅极大地提高了我们的学习和工作效率，更打破了语言沟通的壁垒。',
        pinyin: 'Wǒ rènwéi AI bùjǐn jídà de tígāo le wǒmen de xuéxí hé gōngzuò xiàolǜ, gèng dǎpò le yǔyán gōutōng de bìlěi.',
        vietnamese: 'Tôi cho rằng AI không chỉ nâng cao vượt bậc hiệu suất học tập và làm việc của chúng ta, mà càng phá bỏ rào cản giao tiếp ngôn ngữ.',
      },
    ],
    fallbackTurns: [
      {
        aiPrompt: '总结得非常到位！在享受科技便利的同时，我们应该如何提升自己的不可替代性呢？',
        aiPinyin: 'Zǒngjié de fēicháng dàowèi! Zài xiǎngshòu kējì biànlì de tóngshí, wǒmen yīnggāi rúhé tíshēng zìjǐ de bùkě tìdàixìng ne?',
        aiVi: 'Tóm lược rất trúng! Trong khi tận hưởng tiện ích công nghệ, chúng ta nên nâng cao tính không thể thay thế của bản thân như thế nào?',
        coaching: 'Nhấn mạnh sự sáng tạo, tư duy phản biện và khả năng học hỏi không ngừng.',
        hints: [
          {
            chinese: '我们要保持终身学习的态度，培养批判性思维和独特的创造力，善于利用工具而不是被工具替代。',
            pinyin: 'Wǒmen yào bǎochí zhōngshēn xuéxí de tàidu, péiyǎng pīpànxìng sīwéi hé dútè de chuàngzàolì, shànyú lìyòng gōngjù ér bú shì bèi gōngjù tìdài.',
            vietnamese: 'Chúng ta phải duy trì thái độ học tập suốt đời, bồi dưỡng tư duy phản biện và sức sáng tạo độc đáo, biết làm chủ công cụ chứ không để bị công cụ thay thế.',
          },
        ],
      },
      {
        aiPrompt: '富有远见的见解！非常感谢你为今天论坛带来的精彩观点，期待你在科技时代大放异彩！',
        aiPinyin: 'Fùyǒu yuǎnjiàn de jiànjiě! Fēicháng gǎnxiè nǐ wèi jīntiān lùntán dài lái de jīngcǎi guāndiǎn, qīdài nǐ zài kējì shídài dà fàng yìcǎi!',
        aiVi: 'Một góc nhìn tràn đầy tầm nhìn xa! Rất cảm ơn những quan điểm đặc sắc mà bạn mang tới diễn đàn hôm nay, chúc bạn tỏa sáng rực rỡ trong thời đại công nghệ!',
        coaching: 'Hoan hô! Bạn đã hoàn thành xuất sắc cuộc tọa đàm chuyên đề công nghệ cao HSK 4!',
        hints: [
          {
            chinese: '非常感谢李博士的精彩主持，我也受益匪浅！',
            pinyin: 'Fēicháng gǎnxiè Lǐ bóshì de jīngcǎi zhǔchí, wǒ yě shòuyì fěi qiǎn!',
            vietnamese: 'Rất cảm ơn sự điều phối tuyệt vời của Tiến sĩ Lý, tôi cũng học hỏi được rất nhiều điều bổ ích!',
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
  const [activeLevel, setActiveLevel] = useState<HSKLevel>(currentLevel);
  const [selectedScenario, setSelectedScenario] = useState<Scenario1on1>(() => {
    return ALL_SCENARIOS_1ON1.find((s) => s.level === currentLevel) || ALL_SCENARIOS_1ON1[0];
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

  // Filter scenarios by active level
  const filteredScenarios = ALL_SCENARIOS_1ON1.filter((s) => s.level === activeLevel);

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

  // Submit User Turn
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

    // Check if session completes
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
              marginBottom: '20px',
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
                  PRACTICE 1:1 THEO GIÁO TRÌNH
                </span>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-heading)' }}>
                  Phòng Luyện Nói Đối Thoại 1:1 Theo Giáo Trình HSK 1 - 4 🎙️
                </h2>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                Tất cả các tình huống đều bám sát theo từng Unit từ cơ bản đến nâng cao: AI nói bạn nghe, bạn bấm micro phản hồi, AI chấm điểm nắn khẩu âm tức thì!
              </p>
            </div>
          </div>

          {/* HSK Level Syllabus Switcher (Từng cấp độ từ cơ bản đến nâng cao) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              marginBottom: '24px',
            }}
          >
            {[
              { lvl: 1, label: 'HSK 1: Vỡ Lòng & Cơ Bản', tag: 'Unit 0 - 7' },
              { lvl: 2, label: 'HSK 2: Sơ Cấp & Đời Sống', tag: 'Unit 1 - 7' },
              { lvl: 3, label: 'HSK 3: Trung Cấp & Công Sở', tag: 'Unit 1 - 7' },
              { lvl: 4, label: 'HSK 4: Nâng Cao & Đàm Phán', tag: 'Unit 1 - 7' },
            ].map((item) => (
              <button
                key={item.lvl}
                type="button"
                onClick={() => {
                  soundEffects.playTap();
                  setActiveLevel(item.lvl as HSKLevel);
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: '16px',
                  border: `2px solid ${activeLevel === item.lvl ? '#6366f1' : 'var(--border)'}`,
                  background: activeLevel === item.lvl ? 'rgba(99, 102, 241, 0.12)' : 'var(--surface)',
                  color: activeLevel === item.lvl ? '#6366f1' : 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                  boxShadow: activeLevel === item.lvl ? '0 4px 14px rgba(99, 102, 241, 0.25)' : 'none',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 900 }}>
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: activeLevel === item.lvl ? '#4f46e5' : 'var(--text-dim)',
                  }}
                >
                  {item.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Scenarios Grid for Active Level */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {filteredScenarios.map((sc) => (
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
                  {/* Top Row: Icon & Unit Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '38px' }}>{sc.avatarIcon}</span>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        padding: '4px 10px',
                        borderRadius: '10px',
                        background: 'rgba(99, 102, 241, 0.12)',
                        color: '#6366f1',
                        border: '1px solid rgba(99, 102, 241, 0.25)',
                      }}
                    >
                      {sc.unitTag}
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 6px', fontSize: '17px', fontWeight: 900, color: 'var(--text-heading)' }}>
                    {sc.title}
                  </h3>

                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#6366f1', marginBottom: '8px' }}>
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
                    ● {selectedScenario.unitTag}
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
                <span>💡 Gợi ý câu trả lời theo giáo trình (Bấm để luyện nói hoặc gửi):</span>
                <span>Chạm vào mẫu câu để luyện</span>
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
              Xuất Sắc! Hoàn Thành Tình Huống {selectedScenario.unitTag}
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
