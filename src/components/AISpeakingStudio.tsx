import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Award,
  ChevronRight,
  Zap,
  Target,
  MessageSquare,
  BookOpen,
  HelpCircle,
  Flame,
  VolumeX,
  Users,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { soundEffects } from '../services/audioSynthesizer';
import { renderColoredPinyin } from '../services/highlightUtils';
import { Practice1on1Studio } from './Practice1on1Studio';

interface SpeakingPhrase {
  id: string;
  level: HSKLevel;
  unitTag?: string;
  chinese: string;
  pinyin: string;
  vietnamese: string;
  category: string;
  situationContext: string;
  tip?: string;
}

const SPEAKING_BANK: SpeakingPhrase[] = [
  // ==================== HSK 1 ====================
  // Số đếm & Ngày giờ
  {
    id: 'sp-1-num1',
    level: 1,
    unitTag: 'HSK 1 · Unit 0: Số đếm cơ bản',
    chinese: '一、二、三、四、五、六、七、八、九、十。',
    pinyin: 'Yī, èr, sān, sì, wǔ, liù, qī, bā, jiǔ, shí.',
    vietnamese: 'Một, hai, ba, bốn, năm, sáu, bảy, tám, chín, mười.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Luyện đếm số cơ bản từ 1 đến 10 chuẩn thanh điệu Bắc Kinh.',
    tip: 'Luyện đọc thanh 1 cao đều (yī, sān, qī, bā), thanh 4 dứt khoát (èr, sì), thanh 3 xuống sâu (wǔ, jiǔ).',
  },
  {
    id: 'sp-1-num2',
    level: 1,
    unitTag: 'HSK 1 · Unit 4: Ngày tháng & Lịch',
    chinese: '今天几月几号？今天十月二十五号。',
    pinyin: 'Jīntiān jǐ yuè jǐ hào? Jīntiān shí yuè èrshíwǔ hào.',
    vietnamese: 'Hôm nay là ngày mấy tháng mấy? Hôm nay là ngày 25 tháng 10.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Hỏi và trả lời về ngày tháng trong giao tiếp thường nhật.',
    tip: 'Trong khẩu ngữ tiếng Trung thường dùng "号" (hào) thay cho "日" (rì).',
  },
  {
    id: 'sp-1-num3',
    level: 1,
    unitTag: 'HSK 1 · Unit 4: Thời gian & Giờ giấc',
    chinese: '现在几点？现在是下午三点整。',
    pinyin: 'Xiànzài jǐ diǎn? Xiànzài shì xiàwǔ sān diǎn zhěng.',
    vietnamese: 'Bây giờ là mấy giờ? Bây giờ là đúng 3 giờ chiều.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Hỏi giờ giấc khi hẹn gặp hoặc xem đồng hồ.',
  },
  {
    id: 'sp-1-num4',
    level: 1,
    unitTag: 'HSK 1 · Unit 0: Số đếm & Liên lạc',
    chinese: '请问，你的电话号码是多少？',
    pinyin: 'Qǐngwèn, nǐ de diànhuà hàomǎ shì duōshao?',
    vietnamese: 'Xin hỏi, số điện thoại của bạn là bao nhiêu?',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Hỏi xin số điện thoại để liên lạc, kết bạn.',
    tip: 'Khi đọc dãy số điện thoại hoặc phòng, số 1 đọc là "yāo" để tránh nhầm với số 7 (qī).',
  },
  {
    id: 'sp-1-num5',
    level: 1,
    unitTag: 'HSK 1 · Unit 5: Mua sắm hoa quả',
    chinese: '一个苹果三块钱，五个十五块。',
    pinyin: 'Yí gè píngguǒ sān kuài qián, wǔ gè shíwǔ kuài.',
    vietnamese: 'Một quả táo ba tệ, năm quả mười lăm tệ.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Tính tiền mua hoa quả, đồ ăn vặt hàng ngày.',
  },
  // Giao tiếp hàng ngày
  {
    id: 'sp-1-1',
    level: 1,
    unitTag: 'HSK 1 · Unit 1: Chào hỏi & Làm quen',
    chinese: '你好，很高兴认识你！',
    pinyin: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!',
    vietnamese: 'Xin chào, rất vui được làm quen với bạn!',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Chào hỏi làm quen lần đầu tiên gặp gỡ đối tác hoặc bạn bè mới.',
    tip: 'Nhớ biến âm hai thanh 3 "Nǐ hǎo" -> đọc thành "Ní hǎo".',
  },
  {
    id: 'sp-1-6',
    level: 1,
    unitTag: 'HSK 1 · Unit 1: Họ tên & Quốc tịch',
    chinese: '你叫什么名字？我叫大卫。',
    pinyin: 'Nǐ jiào shénme míngzi? Wǒ jiào Dàwèi.',
    vietnamese: 'Bạn tên là gì? Tôi tên là David.',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Giới thiệu bản thân và hỏi tên đối phương.',
  },
  {
    id: 'sp-1-7',
    level: 1,
    unitTag: 'HSK 1 · Unit 6: Lễ phép & Ứng xử',
    chinese: '对不起，没关系。',
    pinyin: 'Duìbuqǐ, méi guānxi.',
    vietnamese: 'Xin lỗi, không có chi / không sao đâu.',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Xin lỗi lịch sự và đáp lại lời xin lỗi.',
  },
  {
    id: 'sp-1-5',
    level: 1,
    unitTag: 'HSK 1 · Unit 6: Khen ngợi & Cảm ơn',
    chinese: '太漂亮了，谢谢你！',
    pinyin: 'Tài piàoliang le, xièxie nǐ!',
    vietnamese: 'Đẹp quá đi mất, cảm ơn bạn nhé!',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Khen ngợi trang phục, phong cảnh hoặc món quà được tặng.',
  },
  // Mua sắm & Ăn uống
  {
    id: 'sp-1-2',
    level: 1,
    unitTag: 'HSK 1 · Unit 5: Mua sắm & Hỏi giá',
    chinese: '这个多少钱一斤？',
    pinyin: 'Zhège duōshao qián yì jīn?',
    vietnamese: 'Cái này bao nhiêu tiền một cân (500g)?',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Hỏi giá hoa quả hoặc thực phẩm ở chợ và siêu thị.',
    tip: 'Chữ "钱" (qián) mang thanh 2, lên giọng dứt khoát.',
  },
  {
    id: 'sp-1-3',
    level: 1,
    unitTag: 'HSK 1 · Unit 3: Ăn uống & Gọi nước',
    chinese: '我想喝一杯热茶。',
    pinyin: 'Wǒ xiǎng hē yì bēi rè chá.',
    vietnamese: 'Tôi muốn uống một cốc trà nóng.',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Gọi đồ uống tại quán trà hoặc tiệm cà phê.',
    tip: '"热" (rè) là thanh 4, rơi giọng dứt khoát từ cao xuống thấp.',
  },
  {
    id: 'sp-1-8',
    level: 1,
    unitTag: 'HSK 1 · Unit 3: Ẩm thực & Cơm nước',
    chinese: '老板，我要一碗热米饭和一杯水。',
    pinyin: 'Lǎobǎn, wǒ yào yì wǎn rè mǐfàn hé yì bēi shuǐ.',
    vietnamese: 'Chủ quán ơi, tôi muốn một bát cơm nóng và một cốc nước.',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Gọi món ăn giản dị tại quán cơm bình dân.',
  },
  // Hỏi đường & Du lịch
  {
    id: 'sp-1-4',
    level: 1,
    unitTag: 'HSK 1 · Unit 2: Vị trí & Phương hướng',
    chinese: '请问，洗手间在哪儿？',
    pinyin: 'Qǐngwèn, xǐshǒujiān zài nǎr?',
    vietnamese: 'Xin hỏi, nhà vệ sinh ở đâu ạ?',
    category: 'Hỏi đường & Du lịch',
    situationContext: 'Cứu cánh khi đi du lịch, tại nhà hàng hoặc trung tâm thương mại.',
    tip: '"哪儿" (nǎr) có âm uốn lưỡi "r" ở cuối câu.',
  },

  // ==================== HSK 2 ====================
  // Số đếm & Ngày giờ
  {
    id: 'sp-2-num1',
    level: 2,
    unitTag: 'HSK 2 · Unit 1: Mua sắm & Mặc cả',
    chinese: '这件衣服一百八十块，太贵了，便宜点儿吧。',
    pinyin: 'Zhè jiàn yīfu yì bǎi bāshí kuài, tài guì le, piányi diǎnr ba.',
    vietnamese: 'Chiếc áo này 180 tệ, đắt quá rồi, bớt một chút đi mà.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Mặc cả giá tiền khi mua sắm ngoài chợ hoặc cửa hàng thời trang.',
  },
  {
    id: 'sp-2-num2',
    level: 2,
    unitTag: 'HSK 2 · Unit 5: Thói quen sinh hoạt',
    chinese: '我每天早上七点半起床，晚上十一点睡觉。',
    pinyin: 'Wǒ měitiān zǎoshang qī diǎn bàn qǐchuáng, wǎnshang shíyī diǎn shuìjiào.',
    vietnamese: 'Mỗi ngày tôi thức dậy lúc 7 giờ rưỡi sáng, 11 giờ đêm đi ngủ.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Miêu tả thói quen sinh hoạt và thời gian biểu trong ngày.',
  },
  {
    id: 'sp-2-num3',
    level: 2,
    unitTag: 'HSK 2 · Unit 2: Khoảng cách & Giao thông',
    chinese: '从这里到火车站大概需要四十五分钟。',
    pinyin: 'Cóng zhèlǐ dào huǒchēzhàn dàgài xūyào sìshíwǔ fēnzhōng.',
    vietnamese: 'Từ đây tới ga tàu hỏa mất khoảng chừng 45 phút.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Ước lượng thời gian di chuyển khi đi đường hoặc đón xe.',
  },
  // Giao tiếp hàng ngày
  {
    id: 'sp-2-3',
    level: 2,
    unitTag: 'HSK 2 · Unit 4: Thời tiết & Ngoài trời',
    chinese: '今天天气真好，我们去公园散步吧。',
    pinyin: 'Jīntiān tiānqì zhēn hǎo, wǒmen qù gōngyuán sànbù ba.',
    vietnamese: 'Hôm nay thời tiết đẹp thật, chúng mình đi công viên dạo bộ đi.',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Rủ bạn bè hoặc người thân ra ngoài tận hưởng ngày nghỉ cuối tuần.',
  },
  {
    id: 'sp-2-4',
    level: 2,
    unitTag: 'HSK 2 · Unit 3: Sức khỏe & Thăm hỏi',
    chinese: '你身体好点儿了吗？记得按时吃药。',
    pinyin: 'Nǐ shēntǐ hǎo diǎnr le ma? Jìde ànshí chīyào.',
    vietnamese: 'Sức khỏe của bạn đã đỡ hơn chưa? Nhớ uống thuốc đúng giờ nhé.',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Hỏi thăm bạn bè hoặc đồng nghiệp đang bị ốm.',
  },
  // Mua sắm & Ăn uống
  {
    id: 'sp-2-2',
    level: 2,
    unitTag: 'HSK 2 · Unit 1: Mua sắm & Trả giá',
    chinese: '这件衣服有点儿贵，便宜一点儿吧。',
    pinyin: 'Zhè jiàn yīfu yǒudiǎnr guì, piányi yìdiǎnr ba.',
    vietnamese: 'Bộ quần áo này hơi đắt, giảm giá một chút được không ạ?',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Trả giá mua sắm quần áo tại chợ đêm hoặc khu mua sắm.',
  },
  {
    id: 'sp-2-5',
    level: 2,
    unitTag: 'HSK 2 · Unit 1: Thanh toán điện tử',
    chinese: '服务员，买单，可以微信支付吗？',
    pinyin: 'Fúwùyuán, mǎidān, kěyǐ wēixìn zhīfù ma?',
    vietnamese: 'Phục vụ ơi tính tiền, tôi có thể thanh toán bằng WeChat được không?',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Thanh toán tiền bữa ăn bằng ví điện tử phổ biến tại Trung Quốc.',
  },
  {
    id: 'sp-2-6',
    level: 2,
    unitTag: 'HSK 2 · Unit 7: Khẩu vị ẩm thực',
    chinese: '请少放点儿辣，我不太能吃辣。',
    pinyin: 'Qǐng shǎo fàng diǎnr là, wǒ bú tài néng chī là.',
    vietnamese: 'Xin cho ít cay thôi, tôi không ăn được cay lắm.',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Yêu cầu khẩu vị khi gọi các món ăn Trung Hoa nhiều ớt cay.',
  },
  // Hỏi đường & Du lịch
  {
    id: 'sp-2-1',
    level: 2,
    unitTag: 'HSK 2 · Unit 2: Bắt xe & Di chuyển',
    chinese: '师傅，我去火车站，请开快点儿。',
    pinyin: 'Shīfu, wǒ qù huǒchēzhàn, qǐng kāi kuài diǎnr.',
    vietnamese: 'Bác tài ơi, tôi đi ga tàu hỏa, xin lái nhanh một chút nhé.',
    category: 'Hỏi đường & Du lịch',
    situationContext: 'Bắt taxi di chuyển đến bến xe hoặc nhà ga.',
    tip: 'Gọi tài xế taxi là "师傅" (shīfu - sư phụ) nghe rất bản xứ và thân thiện.',
  },
  {
    id: 'sp-2-7',
    level: 2,
    unitTag: 'HSK 2 · Unit 2: Tàu điện ngầm',
    chinese: '请问去故宫博物院坐地铁几号线？',
    pinyin: 'Qǐngwèn qù Gùgōng Bówùyuàn zuò dìtiě jǐ hào xiàn?',
    vietnamese: 'Xin hỏi đi Bảo tàng Cố Cung thì ngồi tàu điện ngầm tuyến số mấy?',
    category: 'Hỏi đường & Du lịch',
    situationContext: 'Hỏi đường di chuyển bằng hệ thống tàu điện ngầm ngầm đô thị.',
  },
  // Môi trường công sở
  {
    id: 'sp-2-8',
    level: 2,
    unitTag: 'HSK 2 · Unit 6: Động viên & Đồng đội',
    chinese: '别担心，大家一起努力，一定能完成工作。',
    pinyin: 'Bié dānxīn, dàjiā yìqǐ nǔlì, yídìng néng wánchéng gōngzuò.',
    vietnamese: 'Đừng lo lắng, mọi người cùng nỗ lực thì nhất định hoàn thành công việc.',
    category: 'Môi trường công sở',
    situationContext: 'Động viên tinh thần đồng đội trong nhóm làm việc.',
  },

  // ==================== HSK 3 ====================
  // Số đếm & Ngày giờ
  {
    id: 'sp-3-num1',
    level: 3,
    unitTag: 'HSK 3 · Unit 1: Mua sắm & Chiết khấu',
    chinese: '商场正在搞周年庆活动，全场商品打七折。',
    pinyin: 'Shāngchǎng zhèngzài gǎo zhōuniánqìng huódòng, quán chǎng shāngpǐn dǎ qī zhé.',
    vietnamese: 'Trung tâm thương mại đang tổ chức lễ kỷ niệm năm, toàn bộ hàng hóa giảm 30%.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Mua sắm săn ưu đãi giảm giá lớn trong các dịp lễ hội.',
    tip: 'Lưu ý: "打七折" trong tiếng Trung nghĩa là bán 70% giá gốc (tương đương giảm giá 30%).',
  },
  {
    id: 'sp-3-num2',
    level: 3,
    unitTag: 'HSK 3 · Unit 4: Điểm số & Thi cử',
    chinese: '这次考试的总分是一百二十分，他考了一百一十五分。',
    pinyin: 'Zhè cì kǎoshì de zǒngfēn shì yì bǎi èrshí fēn, tā kǎo le yì bǎi yīshíwǔ fēn.',
    vietnamese: 'Tổng điểm bài thi lần này là 120 điểm, cậu ấy đạt 115 điểm.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Trao đổi về điểm số và kết quả học tập, thi cử.',
  },
  // Giao tiếp hàng ngày
  {
    id: 'sp-3-7',
    level: 3,
    unitTag: 'HSK 3 · Unit 5: Trải nghiệm học tập',
    chinese: '虽然汉语的发音很难，但是我越学越感兴趣。',
    pinyin: 'Suīrán Hànyǔ de fāyīn hěn nán, dànshì wǒ yuè xué yuè gǎn xìngqù.',
    vietnamese: 'Tuy phát âm tiếng Hán rất khó, nhưng tôi càng học lại càng cảm thấy hứng thú.',
    category: 'Giao tiếp hàng ngày',
    situationContext: 'Chia sẻ đam mê và kinh nghiệm học ngoại ngữ với mọi người.',
  },
  // Mua sắm & Ăn uống
  {
    id: 'sp-3-3',
    level: 3,
    unitTag: 'HSK 3 · Unit 6: Ẩm thực truyền thống',
    chinese: '这家饭馆的特色菜味道非常地道！',
    pinyin: 'Zhè jiā fànguǎn de tèsècài wèidao fēicháng dìdao!',
    vietnamese: 'Món đặc sản của quán này hương vị cực kỳ chuẩn vị bản xứ!',
    category: 'Mua sắm & Ăn uống',
    situationContext: 'Khen ngợi tài nấu nướng hoặc giới thiệu quán ăn ngon cho bạn bè.',
  },
  // Hỏi đường & Du lịch
  {
    id: 'sp-3-2',
    level: 3,
    unitTag: 'HSK 3 · Unit 2: Du lịch & Chuẩn bị hành lý',
    chinese: '我们已经把行李箱准备好了，随时可以出发。',
    pinyin: 'Wǒmen yǐjīng bǎ xínglǐxiāng zhǔnbèi hǎo le, suíshí kěyǐ chūfā.',
    vietnamese: 'Chúng tôi đã chuẩn bị xong va li hành lý, bất cứ lúc nào cũng có thể xuất phát.',
    category: 'Hỏi đường & Du lịch',
    situationContext: 'Chuẩn bị bắt đầu chuyến du lịch hoặc công tác xa.',
    tip: 'Chú ý cấu trúc câu chữ "把" (bǎ): Chủ ngữ + 把 + Tân ngữ + Động từ + Kết quả.',
  },
  {
    id: 'sp-3-6',
    level: 3,
    unitTag: 'HSK 3 · Unit 2: Tắc đường & Xin lỗi',
    chinese: '路上有点儿堵车，我大概迟到十分钟，真是不好意思！',
    pinyin: 'Lùshang yǒudiǎnr dǔchē, wǒ dàgài chídào shí fēnzhōng, zhēn shì bù hǎoyìsi!',
    vietnamese: 'Trên đường hơi tắc xe, tôi có thể đến muộn khoảng 10 phút, thật lòng xin lỗi!',
    category: 'Hỏi đường & Du lịch',
    situationContext: 'Gọi điện thông báo khi bị kẹt xe trên đường đến cuộc hẹn.',
  },
  // Môi trường công sở
  {
    id: 'sp-3-1',
    level: 3,
    unitTag: 'HSK 3 · Unit 3: Thảo luận & Ý kiến',
    chinese: '对于这个问题，我的看法有点儿不一样。',
    pinyin: 'Duìyú zhè gè wèntí, wǒ de kànfǎ yǒudiǎnr bù yíyàng.',
    vietnamese: 'Đối với vấn đề này, quan điểm của tôi có đôi chút khác biệt.',
    category: 'Môi trường công sở',
    situationContext: 'Đóng góp ý kiến chuyên nghiệp, khéo léo trong cuộc họp công ty.',
  },
  {
    id: 'sp-3-4',
    level: 3,
    unitTag: 'HSK 3 · Unit 3: Hợp tác viên mãn',
    chinese: '希望我们的合作能够取得圆满成功。',
    pinyin: 'Xīwàng wǒmen de hézuò nénggòu qǔdé yuánmǎn chénggōng.',
    vietnamese: 'Hy vọng sự hợp tác của chúng ta sẽ gặt hái thành công viên mãn.',
    category: 'Môi trường công sở',
    situationContext: 'Phát biểu khi kết thúc buổi gặp gỡ đàm phán hoặc nâng ly chúc mừng đối tác.',
  },
  {
    id: 'sp-3-5',
    level: 3,
    unitTag: 'HSK 3 · Unit 3: Báo cáo công việc tuần',
    chinese: '我已经把本周的工作总结发到您的邮箱了，请查收。',
    pinyin: 'Wǒ yǐjīng bǎ běn zhōu de gōngzuò zǒngjié fā dào nín de yóuxiāng le, qǐng cháchōu.',
    vietnamese: 'Tôi đã gửi tổng kết công việc tuần này vào hòm thư điện tử của bạn, xin hãy kiểm tra.',
    category: 'Môi trường công sở',
    situationContext: 'Báo cáo tiến độ công việc hàng tuần với cấp trên qua email.',
  },

  // ==================== HSK 4 ====================
  // Số đếm & Kinh tế nâng cao
  {
    id: 'sp-4-num1',
    level: 4,
    unitTag: 'HSK 4 · Unit 1: Bất động sản & Thuê nhà',
    chinese: '这套公寓的建筑面积是一百三十五平方米，月租金五千元。',
    pinyin: 'Zhè tào gōngyù de jiànzhù miànjī shì yì bǎi sānshíwǔ píngfāngmǐ, yuè zūjīn wǔqiān yuán.',
    vietnamese: 'Diện tích xây dựng của căn hộ này là 135 mét vuông, tiền thuê hàng tháng là 5000 tệ.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Thảo luận về thuê nhà, giá trị bất động sản và các thông số diện tích.',
  },
  {
    id: 'sp-4-num2',
    level: 4,
    unitTag: 'HSK 4 · Unit 2: Báo cáo tài chính doanh nghiệp',
    chinese: '今年我们公司的年营业额成功突破了两千五百万美元。',
    pinyin: 'Jīnnián wǒmen gōngsī de nián yíngyè’é chénggōng tūpò le liǎngqiān wǔbǎi wàn měiyuán.',
    vietnamese: 'Năm nay doanh thu hàng năm của công ty chúng tôi đã đột phá thành công mốc 25 triệu USD.',
    category: 'Số đếm & Ngày giờ',
    situationContext: 'Báo cáo tài chính doanh nghiệp và số liệu kinh tế vĩ mô trong đại hội thường niên.',
  },
  // Môi trường công sở & Kinh tế
  {
    id: 'sp-4-3',
    level: 4,
    unitTag: 'HSK 4 · Unit 7: Trí tuệ nhân tạo & Công nghệ',
    chinese: '随着人工智能的发展，未来的工作模式将发生巨大变化。',
    pinyin: 'Suízhe réngōng zhìnéng de fāzhǎn, wèilái de gōngzuò móshì jiāng fāshēng jùdà biànhuà.',
    vietnamese: 'Cùng với sự phát triển của trí tuệ nhân tạo, phương thức làm việc tương lai sẽ có sự thay đổi to lớn.',
    category: 'Môi trường công sở',
    situationContext: 'Thảo luận về công nghệ, xu hướng việc làm và chuyển đổi số.',
  },
  {
    id: 'sp-4-5',
    level: 4,
    unitTag: 'HSK 4 · Unit 2: Đàm phán kinh doanh',
    chinese: '在商务谈判中，建立互信与互利共赢才是最核心的原则。',
    pinyin: 'Zài shāngwù tánpàn zhōng, jiànlì hùxìn yǔ hùlì gòngyíng cái shì zuì héxīn de yuánzé.',
    vietnamese: 'Trong đàm phán thương mại, việc tạo dựng lòng tin và đôi bên cùng có lợi mới là nguyên tắc cốt lõi nhất.',
    category: 'Môi trường công sở',
    situationContext: 'Khẳng định lập trường trong giao dịch đối tác chiến lược.',
  },
  // Triết lý & Thành ngữ
  {
    id: 'sp-4-1',
    level: 4,
    unitTag: 'HSK 4 · Unit 4: Triết lý nhân sinh & Tâm thái',
    chinese: '生活不仅需要努力，更需要乐观积极的心态。',
    pinyin: 'Shēnghuó bùjǐn xūyào nǔlì, gèng xūyào lèguān jījí de xīntài.',
    vietnamese: 'Cuộc sống không chỉ cần sự nỗ lực, mà càng cần thái độ lạc quan và tích cực.',
    category: 'Triết lý & Thành ngữ',
    situationContext: 'Bày tỏ quan điểm sống, thuyết trình hoặc viết bài thi nghị luận HSK 4.',
  },
  {
    id: 'sp-4-2',
    level: 4,
    unitTag: 'HSK 4 · Unit 4: Thành ngữ 4 chữ: Nhập gia tùy tục',
    chinese: '俗话说“入乡随俗”，来到新的环境要学会适应。',
    pinyin: 'Súhuà shuō “rù xiāng suí sú”, lái dào xīn de huánjìng yào xuéhuì shìyìng.',
    vietnamese: 'Tục ngữ có câu "Nhập gia tùy tục", đến môi trường mới cần học cách thích nghi.',
    category: 'Triết lý & Thành ngữ',
    situationContext: 'Sử dụng thành ngữ bốn chữ để chia sẻ kinh nghiệm sống hoặc hội nhập văn hóa.',
  },
  {
    id: 'sp-4-4',
    level: 4,
    unitTag: 'HSK 4 · Unit 4: Thành ngữ 4 chữ: Hành trình ngàn dặm',
    chinese: '千里之行，始于足下。只要坚持不懈，就一定能成功。',
    pinyin: 'Qiān lǐ zhī xíng, shǐ yú zú xià. Zhǐyào jiānchí bú xiè, jiù yídìng néng chénggōng.',
    vietnamese: 'Hành trình ngàn dặm khởi đầu từ một bước chân. Chỉ cần kiên trì không nản chí thì nhất định thành công.',
    category: 'Triết lý & Thành ngữ',
    situationContext: 'Thành ngữ kinh điển của Lão Tử cổ vũ sự kiên trì từng bước một.',
  },
  {
    id: 'sp-4-6',
    level: 4,
    unitTag: 'HSK 4 · Unit 6: Tri thức & Đọc sách',
    chinese: '阅读不仅能够丰富知识，更能开阔我们的眼界与胸怀。',
    pinyin: 'Yuèdú bùjǐn nénggòu fēngfù zhīshi, gèng néng kāikuò wǒmen de yǎnjiè yǔ xiōnghuái.',
    vietnamese: 'Đọc sách không chỉ bồi dưỡng kiến thức, mà càng mở rộng tầm mắt và tấm lòng của chúng ta.',
    category: 'Triết lý & Thành ngữ',
    situationContext: 'Nói về lợi ích của việc đọc sách và phát triển bản thân.',
  },
];

interface AISpeakingStudioProps {
  currentLevel: HSKLevel;
  onSelectLevel?: (lvl: HSKLevel) => void;
  onAddXp?: (xp: number) => void;
  onOpenChatAI?: (prompt: string) => void;
}

interface CharMatchResult {
  char: string;
  status: 'correct' | 'missing';
}

export function AISpeakingStudio({
  currentLevel,
  onSelectLevel,
  onAddXp,
  onOpenChatAI,
}: AISpeakingStudioProps) {
  const [studioMode, setStudioMode] = useState<'single' | 'practice_1on1'>('single');
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel>(currentLevel);
  const [activeCategory, setActiveCategory] = useState<string>('Tất cả');
  const [selectedPhrase, setSelectedPhrase] = useState<SpeakingPhrase>(() => {
    return SPEAKING_BANK.find((p) => p.level === currentLevel) || SPEAKING_BANK[0];
  });

  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [scoreFeedback, setScoreFeedback] = useState<string>('');
  const [charBreakdown, setCharBreakdown] = useState<CharMatchResult[]>([]);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [playbackAudioUrl, setPlaybackAudioUrl] = useState<string | null>(null);

  // Audio recording ref
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const spokenTextRef = useRef<string>('');

  // Filter phrases
  const filteredPhrases = SPEAKING_BANK.filter((p) => {
    const matchLevel = p.level === selectedLevel;
    const matchCat = activeCategory === 'Tất cả' || p.category === activeCategory;
    return matchLevel && matchCat;
  });

  const categories = [
    'Tất cả',
    'Số đếm & Ngày giờ',
    'Giao tiếp hàng ngày',
    'Mua sắm & Ăn uống',
    'Hỏi đường & Du lịch',
    'Môi trường công sở',
    'Triết lý & Thành ngữ',
  ];

  // Initialize Web Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Update selected phrase when category or level changes
  useEffect(() => {
    if (filteredPhrases.length > 0 && !filteredPhrases.some((p) => p.id === selectedPhrase.id)) {
      setSelectedPhrase(filteredPhrases[0]);
      resetState();
    }
  }, [selectedLevel, activeCategory]);

  const resetState = () => {
    spokenTextRef.current = '';
    setSpokenText('');
    setScore(null);
    setScoreFeedback('');
    setCharBreakdown([]);
    setPlaybackAudioUrl(null);
    if (isRecording) {
      stopRecording();
    }
  };

  const handleSelectPhrase = (phrase: SpeakingPhrase) => {
    soundEffects.playTap();
    setSelectedPhrase(phrase);
    resetState();
    // Auto speak
    soundEffects.speakChinese(phrase.chinese, 0.85);
  };

  // Play native audio
  const handlePlayNative = (speed: number = 0.85) => {
    soundEffects.speakChinese(selectedPhrase.chinese, speed);
  };

  // Start speech recognition & voice recording
  const startRecording = async () => {
    resetState();
    setIsRecording(true);
    soundEffects.playTap();

    // 1. Microphone audio recording for playback
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setPlaybackAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
    } catch (micErr) {
      console.warn('[Microphone Warning]:', micErr);
    }

    // 2. Real Speech Recognition for Standard Mandarin
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let fullTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            fullTranscript += event.results[i][0].transcript;
          }
          const text = fullTranscript.trim();
          spokenTextRef.current = text;
          setSpokenText(text);
        };

        recognition.onend = () => {
          // Handled on manual stop or natural end
        };

        recognition.onerror = (err: any) => {
          console.warn('[Speech Recognition Error]:', err);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn('[Recognition start error]:', err);
      }
    } else {
      setSpeechSupported(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      try {
        mediaRecorderRef.current.stop();
      } catch {}
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    // Calculate honest score based strictly on actual captured voice text
    setTimeout(() => {
      evaluatePronunciation(spokenTextRef.current);
    }, 400);
  };

  // Evaluate speech accuracy against target sentence with REAL mathematical Levenshtein distance
  const evaluatePronunciation = (rawInput?: string) => {
    const rawSpoken = (rawInput !== undefined ? rawInput : spokenTextRef.current).trim();
    const targetClean = selectedPhrase.chinese.replace(/[，。！？、“”"'\s.,!?;:·]/g, '');
    const spokenClean = rawSpoken.replace(/[，。！？、“”"'\s.,!?;:·]/g, '');

    // Case 1: Absolutely no Chinese speech captured
    if (!spokenClean || spokenClean.length === 0) {
      setScore(0);
      setCharBreakdown(targetClean.split('').map((c) => ({ char: c, status: 'missing' })));
      soundEffects.playIncorrect();
      setScoreFeedback(
        'AI chưa nhận diện được giọng tiếng Trung của bạn. Vui lòng kiểm tra quyền Micro, nói to và đọc rõ ràng theo câu mẫu!'
      );
      return;
    }

    // Case 2: Compute real Levenshtein Distance & Character Alignment
    const m = targetClean.length;
    const n = spokenClean.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (targetClean[i - 1] === spokenClean[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(
            dp[i - 1][j], // deletion
            dp[i][j - 1], // insertion
            dp[i - 1][j - 1] // substitution
          );
        }
      }
    }

    const editDist = dp[m][n];
    const maxLen = Math.max(m, n);
    // Strict mathematical accuracy score (0 - 100%)
    const calculatedScore = Math.max(0, Math.round(((maxLen - editDist) / maxLen) * 100));

    // Character-by-character analysis
    const breakdown: CharMatchResult[] = [];
    const missingChars: string[] = [];
    let correctCount = 0;

    for (let i = 0; i < targetClean.length; i++) {
      const targetChar = targetClean[i];
      if (i < spokenClean.length && spokenClean[i] === targetChar) {
        breakdown.push({ char: targetChar, status: 'correct' });
        correctCount++;
      } else if (spokenClean.includes(targetChar)) {
        breakdown.push({ char: targetChar, status: 'correct' });
        correctCount++;
      } else {
        breakdown.push({ char: targetChar, status: 'missing' });
        missingChars.push(targetChar);
      }
    }

    setCharBreakdown(breakdown);
    setScore(calculatedScore);

    // Honest feedback without fabrication
    if (calculatedScore >= 95) {
      soundEffects.playFanfare();
      setScoreFeedback(
        `Xuất sắc! Bạn phát âm chuẩn xác toàn bộ ${correctCount}/${targetClean.length} chữ (${calculatedScore}%). Khẩu âm rất tự nhiên! 🎉`
      );
      if (onAddXp) onAddXp(25);
    } else if (calculatedScore >= 80) {
      soundEffects.playCorrect();
      setScoreFeedback(
        `Rất tốt (${calculatedScore}%)! Bạn đọc đúng ${correctCount}/${targetClean.length} chữ.` +
        (missingChars.length > 0 ? ` Cần chú ý thêm chữ: "${missingChars.join(', ')}".` : '')
      );
      if (onAddXp) onAddXp(15);
    } else if (calculatedScore >= 50) {
      soundEffects.playIncorrect();
      setScoreFeedback(
        `Đạt ${calculatedScore}%. Bạn phát âm đúng được ${correctCount}/${targetClean.length} chữ, nhưng còn đọc sai hoặc thiếu: [${missingChars.join(', ')}]. Hãy bấm nghe mẫu chậm 0.7x để luyện lại từng âm!`
      );
    } else {
      soundEffects.playIncorrect();
      setScoreFeedback(
        `Phát âm chưa chính xác (${calculatedScore}%). AI nhận diện bạn đọc là: "${rawSpoken}", khác so với câu mẫu "${selectedPhrase.chinese}". Hãy nghe kỹ và đọc lại chậm rãi!`
      );
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '10px 10px 80px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(5, 150, 105, 0.1) 100%)',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          borderRadius: '24px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
            }}
          >
            <Mic size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  background: '#10b981',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  letterSpacing: '0.5px',
                }}
              >
                AI SPEECH 2.0
              </span>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: 'var(--text-heading)' }}>
                Studio Luyện Nói & Khẩu Ngữ AI 🎙️
              </h2>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
              Chấm điểm phát âm thời gian thực, rèn ngữ điệu Bắc Kinh và phản xạ khẩu ngữ HSK 1 - 4
            </p>
          </div>
        </div>

        {/* HSK Level Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {([1, 2, 3, 4] as HSKLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => {
                soundEffects.playTap();
                setSelectedLevel(lvl);
                if (onSelectLevel) onSelectLevel(lvl);
              }}
              style={{
                padding: '7px 14px',
                borderRadius: '12px',
                fontWeight: 900,
                fontSize: '12px',
                cursor: 'pointer',
                background: selectedLevel === lvl ? '#10b981' : 'var(--surface-card)',
                color: selectedLevel === lvl ? '#ffffff' : 'var(--text-muted)',
                border: `1.5px solid ${selectedLevel === lvl ? '#059669' : 'var(--border)'}`,
                transition: 'all 0.15s ease',
              }}
            >
              HSK {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Studio Mode Segmented Controller */}
      <div
        style={{
          display: 'flex',
          background: 'var(--surface)',
          padding: '4px',
          borderRadius: '16px',
          border: '1.5px solid var(--border)',
          gap: '6px',
          marginBottom: '24px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <button
          type="button"
          onClick={() => {
            soundEffects.playTap();
            setStudioMode('single');
          }}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: '12px',
            border: 'none',
            background: studioMode === 'single' ? '#10b981' : 'transparent',
            color: studioMode === 'single' ? '#ffffff' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            boxShadow: studioMode === 'single' ? '0 2px 10px rgba(16, 185, 129, 0.35)' : 'none',
          }}
        >
          <Target size={16} />
          <span>🎯 Luyện Phát Âm Từng Câu (Chuẩn Âm HSK)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playTap();
            setStudioMode('practice_1on1');
          }}
          style={{
            flex: 1,
            padding: '10px 18px',
            borderRadius: '12px',
            border: 'none',
            background: studioMode === 'practice_1on1' ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
            color: studioMode === 'practice_1on1' ? '#ffffff' : 'var(--text-muted)',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s ease',
            boxShadow: studioMode === 'practice_1on1' ? '0 2px 10px rgba(99, 102, 241, 0.4)' : 'none',
          }}
        >
          <Users size={16} />
          <span>👥 Phòng Đối Thoại 1:1 Cùng AI (Tình Huống Thực Tế)</span>
          <span
            style={{
              fontSize: '10px',
              padding: '2px 7px',
              borderRadius: '8px',
              background: studioMode === 'practice_1on1' ? '#ffffff' : '#6366f1',
              color: studioMode === 'practice_1on1' ? '#4f46e5' : '#ffffff',
              fontWeight: 900,
            }}
          >
            MỚI
          </span>
        </button>
      </div>

      {/* Render Submode */}
      {studioMode === 'practice_1on1' ? (
        <Practice1on1Studio
          currentLevel={selectedLevel}
          onAddXp={onAddXp}
          onOpenChatAI={onOpenChatAI}
        />
      ) : (
        /* Main Studio Grid: Left = Phrase Bank, Right = Active Speaking Arena */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '24px',
            alignItems: 'start',
          }}
          className="speaking-studio-grid"
        >
        {/* LEFT COLUMN: Phrase Bank List */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            padding: '18px',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '15px', fontWeight: 900, color: 'var(--text-heading)' }}>
              Ngân Hàng Câu Khẩu Ngữ ({filteredPhrases.length})
            </h3>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    background: activeCategory === cat ? 'rgba(16, 185, 129, 0.15)' : 'var(--surface-card)',
                    color: activeCategory === cat ? '#10b981' : 'var(--text-muted)',
                    border: `1px solid ${activeCategory === cat ? '#10b981' : 'var(--border)'}`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of Phrases */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '580px', overflowY: 'auto' }}>
            {filteredPhrases.map((phrase) => {
              const isSelected = selectedPhrase.id === phrase.id;
              return (
                <div
                  key={phrase.id}
                  onClick={() => handleSelectPhrase(phrase)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface-card)',
                    border: `1.5px solid ${isSelected ? '#10b981' : 'var(--border)'}`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', textTransform: 'uppercase' }}>
                      {phrase.category}
                    </span>
                    <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '6px', background: 'var(--surface-hover)', color: '#6366f1' }}>
                      {phrase.unitTag || `HSK ${phrase.level}`}
                    </span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-heading)', fontFamily: 'var(--font-hanzi)' }}>
                    {phrase.chinese}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {phrase.vietnamese}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive AI Speaking Arena */}
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '32px 36px',
            boxShadow: 'var(--card-shadow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Situation Context Badge */}
          <div
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={18} color="#10b981" />
              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>
                Bối cảnh: {selectedPhrase.situationContext}
              </span>
            </div>
            {selectedPhrase.tip && (
              <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 700 }}>
                💡 Mẹo: {selectedPhrase.tip}
              </span>
            )}
          </div>

          {/* Sentence Display Box */}
          <div
            style={{
              textAlign: 'center',
              padding: '30px 20px',
              background: 'var(--surface-card)',
              border: '2px dashed var(--border)',
              borderRadius: '20px',
            }}
          >
            {/* Chinese Hanzi */}
            <h1
              style={{
                fontSize: '38px',
                fontWeight: 900,
                color: 'var(--text-heading)',
                margin: '0 0 10px',
                letterSpacing: '1px',
                fontFamily: 'var(--font-hanzi)',
              }}
            >
              {selectedPhrase.chinese}
            </h1>

            {/* Pinyin with colored tones */}
            <div
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#10b981',
                marginBottom: '10px',
              }}
            >
              {renderColoredPinyin(selectedPhrase.pinyin)}
            </div>

            {/* Vietnamese Meaning */}
            <div
              style={{
                fontSize: '15px',
                color: 'var(--text-muted)',
                fontWeight: 600,
              }}
            >
              "{selectedPhrase.vietnamese}"
            </div>

            {/* Audio Listen Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginTop: '20px',
              }}
            >
              <button
                type="button"
                onClick={() => handlePlayNative(0.85)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '12px',
                  background: '#10b981',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '13px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(16, 185, 129, 0.35)',
                }}
                title="Nghe phát âm chuẩn tốc độ tự nhiên"
              >
                <Volume2 size={16} /> Nghe Chuẩn (1.0x)
              </button>

              <button
                type="button"
                onClick={() => handlePlayNative(0.65)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  background: 'var(--surface)',
                  color: 'var(--text-heading)',
                  fontWeight: 700,
                  fontSize: '13px',
                  border: '1.5px solid var(--border)',
                  cursor: 'pointer',
                }}
                title="Nghe phát âm chậm để bắt chước từng thanh điệu"
              >
                <span>🐢 Nghe Chậm (0.7x)</span>
              </button>
            </div>
          </div>

          {/* Interactive Microphone & Realtime Feedback */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              padding: '10px 0',
            }}
          >
            {/* Mic Button with Glowing Pulse */}
            <button
              type="button"
              onClick={isRecording ? stopRecording : startRecording}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: isRecording
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: '#ffffff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isRecording
                  ? '0 0 35px rgba(239, 68, 68, 0.65)'
                  : '0 8px 24px rgba(16, 185, 129, 0.45)',
                transform: isRecording ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              title={isRecording ? 'Bấm để dừng ghi âm & chấm điểm' : 'Bấm để bắt đầu luyện nói'}
            >
              {isRecording ? <MicOff size={38} /> : <Mic size={38} />}
            </button>

            <span style={{ fontSize: '13px', fontWeight: 800, color: isRecording ? '#ef4444' : 'var(--text-muted)' }}>
              {isRecording ? '🔴 Đang lắng nghe giọng bạn nói... Bấm lại để chấm điểm!' : 'Chạm vào Micro & Đọc to câu trên'}
            </span>

            {/* Recognized Speech Live Text */}
            {spokenText && (
              <div
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 700 }}>
                  AI đã nhận diện giọng của bạn:
                </span>
                <div style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-heading)', marginTop: '4px' }}>
                  "{spokenText}"
                </div>
              </div>
            )}

            {/* Score & AI Pronunciation Feedback Card */}
            {score !== null && (
              <div
                style={{
                  background:
                    score >= 85
                      ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))'
                      : score >= 70
                      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.1))'
                      : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
                  border: `1.5px solid ${score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444'}`,
                  borderRadius: '18px',
                  padding: '18px 24px',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  animation: 'fadeIn 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '22px',
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {score}%
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-heading)' }}>
                      {score >= 85 ? 'Phát Âm Tuyệt Hảo! 🎉' : score >= 70 ? 'Khá Tốt! 👍' : 'Cần Chỉnh Thanh Điệu 💪'}
                    </h4>
                    <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                      {scoreFeedback}
                    </p>
                  </div>
                </div>

                {/* Playback Recorded Voice */}
                {playbackAudioUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      const audio = new Audio(playbackAudioUrl);
                      void audio.play();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: 'var(--surface)',
                      border: '1.5px solid var(--border)',
                      fontWeight: 800,
                      fontSize: '12px',
                      cursor: 'pointer',
                      color: 'var(--text-heading)',
                    }}
                    title="Nghe lại bản thu giọng nói của bạn"
                  >
                    <Play size={14} fill="currentColor" /> Nghe Lại Giọng Tôi
                  </button>
                )}
              </div>
            )}

            {/* Visual Character Breakdown (Chi Tiết Đối Chiếu Từng Chữ) */}
            {charBreakdown.length > 0 && (
              <div
                style={{
                  width: '100%',
                  background: 'var(--surface-card)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  marginTop: '4px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '10px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    🔍 Đánh giá chi tiết từng chữ (AI Phân Tích Thực Tế):
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Xanh = Đọc chuẩn • Đỏ = Đọc sai hoặc thiếu
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {charBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        background:
                          item.status === 'correct'
                            ? 'rgba(16, 185, 129, 0.12)'
                            : 'rgba(239, 68, 68, 0.12)',
                        border: `1.5px solid ${item.status === 'correct' ? '#10b981' : '#ef4444'}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: '22px',
                          fontWeight: 900,
                          color: item.status === 'correct' ? '#059669' : '#dc2626',
                          fontFamily: 'var(--font-hanzi)',
                        }}
                      >
                        {item.char}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          color: item.status === 'correct' ? '#059669' : '#dc2626',
                          marginTop: '2px',
                        }}
                      >
                        {item.status === 'correct' ? 'Đúng ✓' : 'Sai / Thiếu ✗'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ask AI Tutor Helper Strip */}
          {onOpenChatAI && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 18px',
                borderRadius: '14px',
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1px solid rgba(2, 132, 199, 0.25)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#0284c7" />
                <span style={{ fontSize: '12px', color: 'var(--text-heading)', fontWeight: 700 }}>
                  Muốn hiểu sâu về biến điệu hoặc cách dùng câu này trong giao tiếp thực tế?
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenChatAI(`Hãy giải thích chi tiết ngữ pháp, quy tắc biến âm thanh điệu và mở rộng các câu khẩu ngữ liên quan đến câu: "${selectedPhrase.chinese}" (${selectedPhrase.pinyin})`)
                }
                style={{
                  background: '#0284c7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Hỏi Trợ Lý AI 💬
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
