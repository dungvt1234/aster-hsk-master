import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Headphones,
  CheckCircle2,
  BookOpen,
  Sparkles,
  AlertTriangle,
  MessageSquare,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ListOrdered,
  Layers,
  HelpCircle,
  VolumeX,
  FileText,
  ExternalLink,
  Download,
  Search,
  X,
  RotateCcw,
  FastForward,
  Rewind,
  Eye,
  Info,
  Check,
} from 'lucide-react';
import type { HSKLevel } from '../types';
import { HSK2_GRAMMAR_DETAILS, GrammarPoint } from '../data/grammarData';
import { HSK1_GRAMMAR_DETAILS } from '../data/grammarDataHsk1';
import { HSK3_GRAMMAR_DETAILS } from '../data/grammarDataHsk3';
import {
  highlightGrammarInChinese,
  renderColoredPinyin,
  renderFormula,
  extractHighlightKeysFromFormula,
  ToneLegend,
} from '../services/highlightUtils';
import { GrammarEasyHelper } from './GrammarEasyHelper';
import { PinyinMasterStudio } from './PinyinMasterStudio';

interface Lesson {
  id: string;
  number: string;
  titleCn: string;
  titlePinyin: string;
  titleVi: string;
  tracks: {
    trackNumber: string;
    label: string;
    file: string;
  }[];
}

const HSK1_LESSONS: Lesson[] = [
  { id: 'hsk1-01', number: '01', titleCn: 'AI小语，你好！', titlePinyin: 'AI Xiǎoyǔ, nǐ hǎo!', titleVi: 'Chào AI Tiểu Ngữ! (Tổng quan Ngữ âm & Pinyin)', tracks: [] },
  { id: 'hsk1-02', number: '02', titleCn: '我叫李文', titlePinyin: 'Wǒ jiào Lǐ Wén', titleVi: 'Tên tôi là Lý Văn (Trật tự từ cơ bản tiếng Hán)', tracks: [] },
  { id: 'hsk1-03', number: '03', titleCn: '我是中国人', titlePinyin: 'Wǒ shì Zhōngguó rén', titleVi: 'Tôi là người Trung Quốc (Câu chữ 是 & Trợ từ 的, 吗)', tracks: [] },
  { id: 'hsk1-04', number: '04', titleCn: '我有两个孩子', titlePinyin: 'Wǒ yǒu liǎng gè háizi', titleVi: 'Tôi có hai đứa con (Câu chữ 有 & Danh lượng từ)', tracks: [] },
  { id: 'hsk1-05', number: '05', titleCn: '今天我休息', titlePinyin: 'Jīntiān wǒ xiūxi', titleVi: 'Hôm nay tôi nghỉ ngơi (Biểu đạt thời gian & Động từ 会)', tracks: [] },
  { id: 'hsk1-06', number: '06', titleCn: '你的手机号是多少？', titlePinyin: 'Nǐ de shǒujī hào shì duōshao?', titleVi: 'Số điện thoại của bạn là bao nhiêu? (Động từ 想 & 怎么)', tracks: [] },
  { id: 'hsk1-07', number: '07', titleCn: '我晚上六点半下班', titlePinyin: 'Wǒ wǎnshang liù diǎn bàn xiàbān', titleVi: 'Tôi tan làm lúc sáu rưỡi tối (Trợ từ 吧 & Vị trí trạng ngữ)', tracks: [] },
  { id: 'hsk1-08', number: '08', titleCn: '我爸爸也在医院工作', titlePinyin: 'Wǒ bàba yě zài yīyuàn gōngzuò', titleVi: 'Bố tôi cũng làm việc ở bệnh viện (Phương vị & Giới từ 在)', tracks: [] },
  { id: 'hsk1-09', number: '09', titleCn: '我明天上午在学校学习', titlePinyin: 'Wǒ míngtiān shàngwǔ zài xuéxiào xuéxí', titleVi: 'Sáng mai tôi học ở trường (Câu tồn hiện & Thứ tự trạng ngữ)', tracks: [] },
  { id: 'hsk1-10', number: '10', titleCn: '这儿的苹果真便宜！', titlePinyin: 'Zhèr de píngguǒ zhēn piányi!', titleVi: 'Táo ở đây rẻ thật đấy! (Câu vị ngữ tính từ & 怎么样)', tracks: [] },
  { id: 'hsk1-11', number: '11', titleCn: '我读大学呢', titlePinyin: 'Wǒ dú dàxué ne', titleVi: 'Tôi đang học đại học đấy (Câu hỏi chính phản & Tiếp diễn 正在)', tracks: [] },
  { id: 'hsk1-12', number: '12', titleCn: '昨天下雪了', titlePinyin: 'Zuótiān xiàxuě le', titleVi: 'Hôm qua tuyết rơi rồi (Trợ từ ngữ khí 了 thay đổi & 太...了)', tracks: [] },
  { id: 'hsk1-13', number: '13', titleCn: '请给我一杯茶', titlePinyin: 'Qǐng gěi wǒ yì bēi chá', titleVi: 'Làm ơn cho tôi một tách trà (Động từ 可以 & Hai tân ngữ)', tracks: [] },
  { id: 'hsk1-14', number: '14', titleCn: '我看了一个电影', titlePinyin: 'Wǒ kàn le yí gè diànyǐng', titleVi: 'Tôi đã xem một bộ phim (Trợ từ động thái 了 & Phó từ 都)', tracks: [] },
  { id: 'hsk1-15', number: '15', titleCn: '大兴机场见！', titlePinyin: 'Dàxīng jīchǎng jiàn!', titleVi: 'Hẹn gặp ở sân bay Đại Hưng! (Câu phức liên kết 还/也)', tracks: [] },
];

const HSK2_LESSONS: Lesson[] = [
  {
    id: 'lesson-01',
    number: '01',
    titleCn: '她请我们吃了北京烤鸭',
    titlePinyin: 'Tā qǐng wǒmen chīle Běijīng Kǎoyā',
    titleVi: 'Cô ấy đãi chúng tôi ăn vịt quay Bắc Kinh',
    tracks: [
      { trackNumber: '01-1', label: 'Bài khóa 1: Ở sân bay đón bạn (Khởi động & Hội thoại)', file: '01-1.mp3' },
      { trackNumber: '01-2', label: 'Từ vựng mới bài 1 (New Words 1)', file: '01-2.mp3' },
      { trackNumber: '01-3', label: 'Bài khóa 2: Nói về việc du học & ăn vịt quay Bắc Kinh', file: '01-3.mp3' },
      { trackNumber: '01-4', label: 'Từ vựng mới bài 1 (New Words 2)', file: '01-4.mp3' },
      { trackNumber: '01-5', label: 'Bài khóa 3 & 4: Giới thiệu món ăn đặc sắc Bắc Kinh', file: '01-5.mp3' },
      { trackNumber: '01-6', label: 'Tiểu Ngữ giảng đường (Luyện ngữ pháp 是...的 & 兼语句)', file: '01-6.mp3' },
      { trackNumber: '01-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '01-7.mp3' },
      { trackNumber: '01-8', label: 'Hoạt động lớp học & Trứng phục sinh Tiểu Ngữ', file: '01-8.mp3' },
    ],
  },
  {
    id: 'lesson-02',
    number: '02',
    titleCn: '还是打车去北大吧',
    titlePinyin: 'Háishì dǎchē qù Běidà ba',
    titleVi: 'Hay là bắt taxi đi Đại học Bắc Kinh đi',
    tracks: [
      { trackNumber: '02-1', label: 'Bài khóa 1: Thảo luận phương tiện giao thông', file: '02-1.mp3' },
      { trackNumber: '02-2', label: 'Từ vựng mới bài 2 (New Words 1)', file: '02-2.mp3' },
      { trackNumber: '02-3', label: 'Bài khóa 2: Trải nghiệm kẹt xe giờ cao điểm', file: '02-3.mp3' },
      { trackNumber: '02-4', label: 'Từ vựng mới bài 2 (New Words 2)', file: '02-4.mp3' },
      { trackNumber: '02-5', label: 'Bài khóa 3 & 4: Đến khuôn viên Đại học Bắc Kinh', file: '02-5.mp3' },
      { trackNumber: '02-6', label: 'Tiểu Ngữ giảng đường (Luyện định thức 还是...吧 & Số ước lượng 多)', file: '02-6.mp3' },
      { trackNumber: '02-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '02-7.mp3' },
      { trackNumber: '02-8', label: 'Hoạt động giao tiếp lớp học bài 2', file: '02-8.mp3' },
    ],
  },
  {
    id: 'lesson-03',
    number: '03',
    titleCn: '我想去西安旅游',
    titlePinyin: "Wǒ xiǎng qù Xī\'ān lǚyóu",
    titleVi: 'Tôi muốn đi Tây An du lịch',
    tracks: [
      { trackNumber: '03-1', label: 'Bài khóa 1: Lên kế hoạch du lịch thành phố Tây An', file: '03-1.mp3' },
      { trackNumber: '03-2', label: 'Từ vựng mới bài 3 (New Words 1)', file: '03-2.mp3' },
      { trackNumber: '03-3', label: 'Bài khóa 2: Tìm hiểu di tích lịch sử và danh lam thắng cảnh', file: '03-3.mp3' },
      { trackNumber: '03-4', label: 'Từ vựng mới bài 3 (New Words 2)', file: '03-4.mp3' },
      { trackNumber: '03-5', label: 'Bài khóa 3 & 4: Đặt vé tàu hỏa & chuẩn bị hành lý', file: '03-5.mp3' },
      { trackNumber: '03-6', label: 'Tiểu Ngữ giảng đường (Bổ ngữ kết quả & Lặp lại động từ)', file: '03-6.mp3' },
      { trackNumber: '03-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '03-7.mp3' },
      { trackNumber: '03-8', label: 'Hoạt động giao tiếp lớp học bài 3', file: '03-8.mp3' },
    ],
  },
  {
    id: 'lesson-04',
    number: '04',
    titleCn: '你穿红色的很好看',
    titlePinyin: 'Nǐ chuān hóngsè de hěn hǎokàn',
    titleVi: 'Bạn mặc bộ đồ màu đỏ rất đẹp',
    tracks: [
      { trackNumber: '04-1', label: 'Bài khóa 1: Chọn trang phục dạo phố', file: '04-1.mp3' },
      { trackNumber: '04-2', label: 'Từ vựng mới bài 4 (New Words 1)', file: '04-2.mp3' },
      { trackNumber: '04-3', label: 'Bài khóa 2: Thử đồ & khen ngợi thẩm mỹ màu sắc', file: '04-3.mp3' },
      { trackNumber: '04-4', label: 'Từ vựng mới bài 4 (New Words 2)', file: '04-4.mp3' },
      { trackNumber: '04-5', label: 'Bài khóa 3 & 4: Chia sẻ kinh nghiệm mua sắm trang phục', file: '04-5.mp3' },
      { trackNumber: '04-6', label: 'Tiểu Ngữ giảng đường (Trợ từ động thái 过 & Cụm từ chữ 的)', file: '04-6.mp3' },
      { trackNumber: '04-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '04-7.mp3' },
      { trackNumber: '04-8', label: 'Hoạt động giao tiếp lớp học bài 4', file: '04-8.mp3' },
    ],
  },
  {
    id: 'lesson-05',
    number: '05',
    titleCn: '第一次去中国朋友家',
    titlePinyin: 'Dì-yī cì qù Zhōngguó péngyou jiā',
    titleVi: 'Lần đầu tiên đến nhà bạn Trung Quốc',
    tracks: [
      { trackNumber: '05-1', label: 'Bài khóa 1: Chuẩn bị quà & đến thăm nhà bạn bè', file: '05-1.mp3' },
      { trackNumber: '05-2', label: 'Từ vựng mới bài 5 (New Words 1)', file: '05-2.mp3' },
      { trackNumber: '05-3', label: 'Bài khóa 2: Chào hỏi gia đình bạn & vào phòng khách', file: '05-3.mp3' },
      { trackNumber: '05-4', label: 'Từ vựng mới bài 5 (New Words 2)', file: '05-4.mp3' },
      { trackNumber: '05-5', label: 'Bài khóa 3 & 4: Phong tục làm khách văn hóa Trung Hoa', file: '05-5.mp3' },
      { trackNumber: '05-6', label: 'Tiểu Ngữ giảng đường (Bổ ngữ xu hướng đơn 来/去 & Cấu trúc 都...了)', file: '05-6.mp3' },
      { trackNumber: '05-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '05-7.mp3' },
      { trackNumber: '05-8', label: 'Hoạt động giao tiếp lớp học bài 5', file: '05-8.mp3' },
    ],
  },
  {
    id: 'lesson-06',
    number: '06',
    titleCn: '小雪，生日快乐！',
    titlePinyin: 'Xiǎoxuě, shēngrì kuàilè!',
    titleVi: 'Tiểu Tuyết, sinh nhật vui vẻ!',
    tracks: [
      { trackNumber: '06-1', label: 'Bài khóa 1: Chuẩn bị bữa tiệc sinh nhật bất ngờ', file: '06-1.mp3' },
      { trackNumber: '06-2', label: 'Từ vựng mới bài 6 (New Words 1)', file: '06-2.mp3' },
      { trackNumber: '06-3', label: 'Bài khóa 2: Tặng quà & thổi nến sinh nhật', file: '06-3.mp3' },
      { trackNumber: '06-4', label: 'Từ vựng mới bài 6 (New Words 2)', file: '06-4.mp3' },
      { trackNumber: '06-5', label: 'Bài khóa 3 & 4: Chia sẻ niềm vui ngày sinh nhật', file: '06-5.mp3' },
      { trackNumber: '06-6', label: 'Tiểu Ngữ giảng đường (Lặp lại tính từ, Cụm 什么的 & Trợ từ kết cấu 地)', file: '06-6.mp3' },
      { trackNumber: '06-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '06-7.mp3' },
      { trackNumber: '06-8', label: 'Hoạt động giao tiếp lớp học bài 6', file: '06-8.mp3' },
    ],
  },
  {
    id: 'lesson-07',
    number: '07',
    titleCn: '他篮球打得很好',
    titlePinyin: 'Tā lánqiú dǎ de hěn hǎo',
    titleVi: 'Anh ấy chơi bóng rổ rất giỏi',
    tracks: [
      { trackNumber: '07-1', label: 'Bài khóa 1: Hoạt động thể thao trên sân bóng', file: '07-1.mp3' },
      { trackNumber: '07-2', label: 'Từ vựng mới bài 7 (New Words 1)', file: '07-2.mp3' },
      { trackNumber: '07-3', label: 'Bài khóa 2: Đánh giá kỹ năng thể thao của đồng đội', file: '07-3.mp3' },
      { trackNumber: '07-4', label: 'Từ vựng mới bài 7 (New Words 2)', file: '07-4.mp3' },
      { trackNumber: '07-5', label: 'Bài khóa 3 & 4: Kế hoạch rèn luyện sức khỏe hằng ngày', file: '07-5.mp3' },
      { trackNumber: '07-6', label: 'Tiểu Ngữ giảng đường (Bổ ngữ trạng thái V+得+Adj & Câu 一...就...)', file: '07-6.mp3' },
      { trackNumber: '07-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '07-7.mp3' },
      { trackNumber: '07-8', label: 'Hoạt động giao tiếp lớp học bài 7', file: '07-8.mp3' },
    ],
  },
  {
    id: 'lesson-08',
    number: '08',
    titleCn: '虽然你忘了，但是我记得',
    titlePinyin: 'Suīrán nǐ wàng le, dànshì wǒ jìde',
    titleVi: 'Tuy bạn quên rồi nhưng tôi vẫn nhớ',
    tracks: [
      { trackNumber: '08-1', label: 'Bài khóa 1: Kỷ niệm ngày họp mặt đặc biệt', file: '08-1.mp3' },
      { trackNumber: '08-2', label: 'Từ vựng mới bài 8 (New Words 1)', file: '08-2.mp3' },
      { trackNumber: '08-3', label: 'Bài khóa 2: Bất ngờ xúc động giữa những người bạn', file: '08-3.mp3' },
      { trackNumber: '08-4', label: 'Từ vựng mới bài 8 (New Words 2)', file: '08-4.mp3' },
      { trackNumber: '08-5', label: 'Bài khóa 3 & 4: Trân trọng tình bạn chân thành', file: '08-5.mp3' },
      { trackNumber: '08-6', label: 'Tiểu Ngữ giảng đường (Câu so sánh 比 cơ bản & Câu phức 虽然...但是...)', file: '08-6.mp3' },
      { trackNumber: '08-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '08-7.mp3' },
      { trackNumber: '08-8', label: 'Hoạt động giao tiếp lớp học bài 8', file: '08-8.mp3' },
    ],
  },
  {
    id: 'lesson-09',
    number: '09',
    titleCn: '我去买杯奶茶',
    titlePinyin: 'Wǒ qù mǎi bēi nǎichá',
    titleVi: 'Tôi đi mua một ly trà sữa',
    tracks: [
      { trackNumber: '09-1', label: 'Bài khóa 1: Rủ bạn cùng đi mua đồ uống', file: '09-1.mp3' },
      { trackNumber: '09-2', label: 'Từ vựng mới bài 9 (New Words 1)', file: '09-2.mp3' },
      { trackNumber: '09-3', label: 'Bài khóa 2: Tìm quán trà sữa gần trường học', file: '09-3.mp3' },
      { trackNumber: '09-4', label: 'Từ vựng mới bài 9 (New Words 2)', file: '09-4.mp3' },
      { trackNumber: '09-5', label: 'Bài khóa 3 & 4: Thưởng thức ly trà sữa ngọt ngào', file: '09-5.mp3' },
      { trackNumber: '09-6', label: 'Tiểu Ngữ giảng đường (So sánh phủ định 没有, Cự ly 离 & Bổ ngữ thời lượng)', file: '09-6.mp3' },
      { trackNumber: '09-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '09-7.mp3' },
      { trackNumber: '09-8', label: 'Hoạt động giao tiếp lớp học bài 9', file: '09-8.mp3' },
    ],
  },
  {
    id: 'lesson-10',
    number: '10',
    titleCn: '就要考试了',
    titlePinyin: 'Jiù yào kǎoshì le',
    titleVi: 'Sắp thi rồi',
    tracks: [
      { trackNumber: '10-1', label: 'Bài khóa 1: Không khí ôn tập trước kỳ thi', file: '10-1.mp3' },
      { trackNumber: '10-2', label: 'Từ vựng mới bài 10 (New Words 1)', file: '10-2.mp3' },
      { trackNumber: '10-3', label: 'Bài khóa 2: Động viên nhau bình tĩnh làm bài thi', file: '10-3.mp3' },
      { trackNumber: '10-4', label: 'Từ vựng mới bài 10 (New Words 2)', file: '10-4.mp3' },
      { trackNumber: '10-5', label: 'Bài khóa 3 & 4: Kế hoạch thư giãn sau khi thi xong', file: '10-5.mp3' },
      { trackNumber: '10-6', label: 'Tiểu Ngữ giảng đường (Cấu trúc sắp sửa xảy ra 就要...了 & Câu hỏi 还是)', file: '10-6.mp3' },
      { trackNumber: '10-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '10-7.mp3' },
      { trackNumber: '10-8', label: 'Hoạt động giao tiếp lớp học bài 10', file: '10-8.mp3' },
    ],
  },
  {
    id: 'lesson-11',
    number: '11',
    titleCn: '我最喜欢吃中国菜',
    titlePinyin: 'Wǒ zuì xǐhuan chī Zhōngguó cài',
    titleVi: 'Tôi thích ăn món Trung Quốc nhất',
    tracks: [
      { trackNumber: '11-1', label: 'Bài khóa 1: Thảo luận hương vị món ăn yêu thích', file: '11-1.mp3' },
      { trackNumber: '11-2', label: 'Từ vựng mới bài 11 (New Words 1)', file: '11-2.mp3' },
      { trackNumber: '11-3', label: 'Bài khóa 2: Trải nghiệm ẩm thực truyền thống Trung Hoa', file: '11-3.mp3' },
      { trackNumber: '11-4', label: 'Từ vựng mới bài 11 (New Words 2)', file: '11-4.mp3' },
      { trackNumber: '11-5', label: 'Bài khóa 3 & 4: Khen ngợi tài nghệ nấu ăn', file: '11-5.mp3' },
      { trackNumber: '11-6', label: 'Tiểu Ngữ giảng đường (Trợ từ động thái 着 & Phó từ mức độ cao nhất 最)', file: '11-6.mp3' },
      { trackNumber: '11-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '11-7.mp3' },
      { trackNumber: '11-8', label: 'Hoạt động giao tiếp lớp học bài 11', file: '11-8.mp3' },
    ],
  },
  {
    id: 'lesson-12',
    number: '12',
    titleCn: '这里比北京冷多了',
    titlePinyin: 'Zhèlǐ bǐ Běijīng lěng duō le',
    titleVi: 'Ở đây lạnh hơn Bắc Kinh nhiều',
    tracks: [
      { trackNumber: '12-1', label: 'Bài khóa 1: Cảm nhận thời tiết mùa đông phương Bắc', file: '12-1.mp3' },
      { trackNumber: '12-2', label: 'Từ vựng mới bài 12 (New Words 1)', file: '12-2.mp3' },
      { trackNumber: '12-3', label: 'Bài khóa 2: So sánh khí hậu và thời tiết giữa các vùng', file: '12-3.mp3' },
      { trackNumber: '12-4', label: 'Từ vựng mới bài 12 (New Words 2)', file: '12-4.mp3' },
      { trackNumber: '12-5', label: 'Bài khóa 3 & 4: Giữ ấm cơ thể trong mùa đông giá rét', file: '12-5.mp3' },
      { trackNumber: '12-6', label: 'Tiểu Ngữ giảng đường (So sánh nâng cao 更/还 & So sánh ngang bằng 一样)', file: '12-6.mp3' },
      { trackNumber: '12-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '12-7.mp3' },
      { trackNumber: '12-8', label: 'Hoạt động giao tiếp lớp học bài 12', file: '12-8.mp3' },
    ],
  },
  {
    id: 'lesson-13',
    number: '13',
    titleCn: '我们爱上中文课',
    titlePinyin: 'Wǒmen ài shàng Zhōngwén kè',
    titleVi: 'Chúng tôi thích lên lớp tiếng Trung',
    tracks: [
      { trackNumber: '13-1', label: 'Bài khóa 1: Không khí học tập vui tươi trên lớp học', file: '13-1.mp3' },
      { trackNumber: '13-2', label: 'Từ vựng mới bài 13 (New Words 1)', file: '13-2.mp3' },
      { trackNumber: '13-3', label: 'Bài khóa 2: Thầy cô truyền đạt kiến thức mới', file: '13-3.mp3' },
      { trackNumber: '13-4', label: 'Từ vựng mới bài 13 (New Words 2)', file: '13-4.mp3' },
      { trackNumber: '13-5', label: 'Bài khóa 3 & 4: Niềm đam mê tiếng Hán & sự tiến bộ', file: '13-5.mp3' },
      { trackNumber: '13-6', label: 'Tiểu Ngữ giảng đường (Câu hai tân ngữ & So sánh hành động 早/晚/多/少)', file: '13-6.mp3' },
      { trackNumber: '13-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '13-7.mp3' },
      { trackNumber: '13-8', label: 'Hoạt động giao tiếp lớp học bài 13', file: '13-8.mp3' },
    ],
  },
  {
    id: 'lesson-14',
    number: '14',
    titleCn: '一个人过年多没意思啊',
    titlePinyin: 'Yí gè rén guò nián duō méi yìsi a',
    titleVi: 'Một mình đón Tết thật chẳng có ý nghĩa gì',
    tracks: [
      { trackNumber: '14-1', label: 'Bài khóa 1: Chuẩn bị đón Tết Nguyên Đán truyền thống', file: '14-1.mp3' },
      { trackNumber: '14-2', label: 'Từ vựng mới bài 14 (New Words 1)', file: '14-2.mp3' },
      { trackNumber: '14-3', label: 'Bài khóa 2: Rủ bạn cùng đón giao thừa sum vầy', file: '14-3.mp3' },
      { trackNumber: '14-4', label: 'Từ vựng mới bài 14 (New Words 2)', file: '14-4.mp3' },
      { trackNumber: '14-5', label: 'Bài khóa 3 & 4: Không khí ngày xuân ấm cúng rộn ràng', file: '14-5.mp3' },
      { trackNumber: '14-6', label: 'Tiểu Ngữ giảng đường (Câu tồn hiện, Cảm thán 多 & Bổ ngữ xu hướng kép)', file: '14-6.mp3' },
      { trackNumber: '14-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '14-7.mp3' },
      { trackNumber: '14-8', label: 'Hoạt động giao tiếp lớp học bài 14', file: '14-8.mp3' },
    ],
  },
  {
    id: 'lesson-15',
    number: '15',
    titleCn: '我想再去一次中国',
    titlePinyin: 'Wǒ xiǎng zài qù yí cì Zhōngguó',
    titleVi: 'Tôi muốn đi Trung Quốc một lần nữa',
    tracks: [
      { trackNumber: '15-1', label: 'Bài khóa 1: Nhìn lại hành trình học tập bổ ích', file: '15-1.mp3' },
      { trackNumber: '15-2', label: 'Từ vựng mới bài 15 (New Words 1)', file: '15-2.mp3' },
      { trackNumber: '15-3', label: 'Bài khóa 2: Chia sẻ ước muốn quay lại Trung Quốc', file: '15-3.mp3' },
      { trackNumber: '15-4', label: 'Từ vựng mới bài 15 (New Words 2)', file: '15-4.mp3' },
      { trackNumber: '15-5', label: 'Bài khóa 3 & 4: Lời chúc tốt đẹp và lời hẹn gặp lại', file: '15-5.mp3' },
      { trackNumber: '15-6', label: 'Tiểu Ngữ giảng đường (Bổ ngữ động lượng 次/遍 & Câu chữ 有 đạt mức độ)', file: '15-6.mp3' },
      { trackNumber: '15-7', label: 'Luyện tập tổng hợp: Nghe hiểu & Ngữ âm', file: '15-7.mp3' },
      { trackNumber: '15-8', label: 'Bài kiểm tra tổng hợp cuối khóa HSK 2', file: '15-8.mp3' },
    ],
  },
];

const HSK3_LESSONS: Lesson[] = [
  { id: 'hsk3-01', number: '01', titleCn: '周末你有什么打算？', titlePinyin: 'Zhōumò nǐ yǒu shénme dǎsuan?', titleVi: 'Cuối tuần bạn có dự định gì? (Câu chữ 把 & Động từ 打算)', tracks: [] },
  { id: 'hsk3-02', number: '02', titleCn: '他什么时候回来？', titlePinyin: 'Tā shénme shíhou huílái?', titleVi: 'Khi nào anh ấy quay lại? (Cấu trúc 越...越... & 虽然...但是...)', tracks: [] },
  { id: 'hsk3-03', number: '03', titleCn: '桌子上放着一杯咖啡', titlePinyin: 'Zhuōzi shang fàng zhe yì bēi kāfēi', titleVi: 'Trên bàn có để một tách cà phê (Câu chữ 被 & Trợ từ 着)', tracks: [] },
  { id: 'hsk3-04', number: '04', titleCn: '她总是笑着跟客人说话', titlePinyin: 'Tā zǒngshì xiào zhe gēn kèrén shuōhuà', titleVi: 'Cô ấy luôn cười nói với khách (Bổ ngữ khả năng 得/不)', tracks: [] },
  { id: 'hsk3-05', number: '05', titleCn: '我最近越来越胖了', titlePinyin: 'Wǒ zuìjìn yuèláiyuè pàng le', titleVi: 'Dạo này tôi càng ngày càng béo (Cấu trúc 除了...以外)', tracks: [] },
  { id: 'hsk3-06', number: '06', titleCn: '你怎么突然生病了？', titlePinyin: 'Nǐ zěnme tūrán shēngbìng le?', titleVi: 'Sao bạn đột nhiên lại ốm thế? (Phân biệt 刚 và 刚才)', tracks: [] },
  { id: 'hsk3-07', number: '07', titleCn: '我跟你一起去吧', titlePinyin: 'Wǒ gēn nǐ yìqǐ qù ba', titleVi: 'Tôi đi cùng bạn nhé (Cấu trúc 一...就...)', tracks: [] },
  { id: 'hsk3-08', number: '08', titleCn: '你去哪儿我就去哪儿', titlePinyin: 'Nǐ qù nǎr wǒ jiù qù nǎr', titleVi: 'Bạn đi đâu tôi đi đấy (Bổ ngữ xu hướng phức kép)', tracks: [] },
  { id: 'hsk3-09', number: '09', titleCn: '她的汉语说得跟中国人一样好', titlePinyin: 'Tā de Hànyǔ shuō de gēn Zhōngguó rén yíyàng hǎo', titleVi: 'Tiếng Hán của cô ấy nói hay như người Trung Quốc (只要...就...)', tracks: [] },
  { id: 'hsk3-10', number: '10', titleCn: '数学比历史难多了', titlePinyin: 'Shùxué bǐ lìshǐ nán duō le', titleVi: 'Toán học khó hơn lịch sử nhiều (Cấu trúc 又...又...)', tracks: [] },
  { id: 'hsk3-11', number: '11', titleCn: '别忘了把空调关了', titlePinyin: 'Bié wàng le bǎ kōngtiáo guān le', titleVi: 'Đừng quên tắt điều hòa đấy (Phó từ 到底)', tracks: [] },
  { id: 'hsk3-12', number: '12', titleCn: '把重要的事记在笔记本上', titlePinyin: 'Bǎ zhòngyào de shì jì zài bǐjìběn shang', titleVi: 'Ghi việc quan trọng vào sổ (So sánh 没有)', tracks: [] },
  { id: 'hsk3-13', number: '13', titleCn: '我是走回来的', titlePinyin: 'Wǒ shì zǒu huílái de', titleVi: 'Tôi đi bộ về đấy (Cấu trúc 不仅...而且...)', tracks: [] },
  { id: 'hsk3-14', number: '14', titleCn: '你把水果拿过来', titlePinyin: 'Nǐ bǎ shuǐguǒ ná guòlái', titleVi: 'Bạn mang hoa quả qua đây (Bổ ngữ thời lượng)', tracks: [] },
  { id: 'hsk3-15', number: '15', titleCn: '新年就要到了！', titlePinyin: 'Xīnnián jiù yào dào le!', titleVi: 'Năm mới sắp đến rồi! (Cấu trúc 如果...就... & Tổng kết HSK 3)', tracks: [] },
];

const STORAGE_KEY_ACTIVE = 'aster_hsk_course_active_v1';
const STORAGE_KEY_GRAMMAR = 'aster_hsk_grammar_completed_v1';
const STORAGE_KEY_AUDIO = 'aster_hsk_audio_completed_v1';

type LessonSubTab = 'context' | 'pinyin' | 'grammar' | 'audio' | 'vocab' | 'dialogue' | 'pdf';
type CourseLevel = 'HSK1' | 'HSK2' | 'HSK3';

interface SearchResultItem {
  id: string;
  courseLevel: CourseLevel;
  lesson: Lesson;
  type: 'lesson' | 'grammar' | 'vocab' | 'audio';
  typeLabel: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  snippet: string;
  targetSubTab: LessonSubTab;
}

interface LessonContextInfo {
  image: string;
  setting: string;
  characters: string;
  goal: string;
  culturalNote: string;
}

const HSK1_CONTEXT_MAP: Record<string, LessonContextInfo> = {
  '01': {
    image: '/images/lessons_hsk1/hsk1_lesson_01.jpg',
    setting: 'Phòng học tương tác kỹ thuật số cùng trợ lý AI (数字汉语课堂)',
    characters: 'AI Tiểu Ngữ (AI Xiǎoyǔ), Vương Nhất Phi (王一飞)',
    goal: 'Làm quen bảng chữ cái Pinyin, phát âm 4 thanh điệu chuẩn và chào hỏi mở đầu.',
    culturalNote: 'Khởi đầu hành trình học tiếng Hán cùng AI Tiểu Ngữ – người bạn trợ lý thông minh chuẩn HSK 3.0 FLTRP.',
  },
  '02': {
    image: '/images/lessons_hsk1/hsk1_lesson_01.jpg',
    setting: 'Giảng đường Đại học Bắc Kinh đầu năm học mới (北京大学新学期课堂)',
    characters: 'Thầy Vương (王老师), Lý Văn (李文)',
    goal: 'Tự giới thiệu bản thân, nắm vững trật tự từ cơ bản Chủ ngữ + Trạng ngữ + Động từ + Tân ngữ.',
    culturalNote: 'Trong xưng hô sư phạm Trung Hoa, người học luôn gọi Họ + Lão sư (ví dụ 王老师) để thể hiện tôn sư trọng đạo.',
  },
  '03': {
    image: '/images/lessons/lesson02_beijing_taxi.jpg',
    setting: 'Khuôn viên giao lưu sinh viên quốc tế (国际文化交流广场)',
    characters: 'Bạch Giai Nguyệt (白家月 - Mỹ), Lý Văn (李文 - Trung Quốc)',
    goal: 'Hỏi quốc tịch, dùng câu chữ 是 và trợ từ nghi vấn 吗, trợ từ sở hữu 的.',
    culturalNote: 'Đại học tại các thành phố lớn Trung Quốc là nơi hội tụ sinh viên từ hơn 180 quốc gia trên thế giới.',
  },
  '04': {
    image: '/images/lessons/lesson05_visit_family.jpg',
    setting: 'Phòng khách ấm cúng của cô giáo Vương (王老师温馨客厅)',
    characters: 'David (大卫), Cô giáo Vương (王老师)',
    goal: 'Xem ảnh gia đình, hỏi thăm con cái bằng câu chữ 有 và lượng từ 个.',
    culturalNote: 'Người Trung Quốc rất cởi mở khi chia sẻ về con cái và gia đình với những người bạn thân thiết.',
  },
  '05': {
    image: '/images/lessons/lesson06_birthday_party.jpg',
    setting: 'Quán trà & cà phê góc phố thanh bình (街角阳光茶饮馆)',
    characters: 'Lý Văn (李文), Trương Bằng (张朋)',
    goal: 'Thảo luận lịch trình cuối tuần, nói ngày thứ trong tuần và động từ năng nguyện 会.',
    culturalNote: 'Trà đạo cuối tuần là nét văn hóa thư thái được mọi thế hệ người dân Trung Quốc yêu thích.',
  },
  '06': {
    image: '/images/lessons/lesson09_milk_tea.jpg',
    setting: 'Cửa hàng dịch vụ viễn thông China Mobile (中国移动营业厅)',
    characters: 'Anna (安妮), Lý Văn (李文)',
    goal: 'Mua SIM điện thoại, trao đổi số liên lạc di động và quét mã kết bạn WeChat.',
    culturalNote: 'Số điện thoại di động Trung Quốc luôn gồm 11 chữ số, chữ số 1 khi đọc được phát âm là "yāo" để tránh nhầm với số 7.',
  },
  '07': {
    image: '/images/lessons/lesson02_beijing_taxi.jpg',
    setting: 'Văn phòng làm việc hiện đại & Giờ tan sở (写字楼傍晚下班时分)',
    characters: 'David (大卫), Trương Bằng (张朋)',
    goal: 'Hỏi giờ giấc sinh hoạt, hẹn giờ ăn tối với trợ từ ngữ khí 吧.',
    culturalNote: 'Nhịp sống công sở tại các thành phố hạng 1 thường kết thúc lúc 6:00 - 6:30 tối, sau đó là thời gian tụ họp ăn uống.',
  },
  '08': {
    image: '/images/lessons/lesson05_visit_family.jpg',
    setting: 'Khuôn viên Bệnh viện Triều Dương Bắc Kinh (北京朝阳医院门诊楼)',
    characters: 'Lý Văn (李文), Vương Nhất Phi (王一飞)',
    goal: 'Hỏi về nghề nghiệp gia đình, dùng giới từ 在 và phó từ 也.',
    culturalNote: 'Ngành y tế tại Trung Quốc được xã hội hết sức kính trọng với danh xưng "Thiên thần áo trắng" (白衣天使).',
  },
  '09': {
    image: '/images/lessons/lesson10_exam_preparation.jpg',
    setting: 'Thư viện trung tâm Đại học Bắc Kinh (大学图书馆自习室)',
    characters: 'Anna (安妮), Lý Văn (李文)',
    goal: 'Lên lịch học bài sáng mai, hẹn nhau đi tham quan Cố Cung buổi chiều.',
    culturalNote: 'Thư viện đại học là nơi sinh viên Trung Quốc dành nhiều thời gian nhất để tự học và nghiên cứu.',
  },
  '10': {
    image: '/images/lessons/lesson01_beijing_duck.jpg',
    setting: 'Quầy trái cây tươi chợ dân sinh (社区便民生鲜水果店)',
    characters: 'Khách hàng (顾客), Bác bán hoa quả (水果店老板)',
    goal: 'Hỏi giá hoa quả, mặc cả lịch sự và khen đồ rẻ bằng câu vị ngữ tính từ 真便宜.',
    culturalNote: 'Tại chợ truyền thống Trung Quốc, thanh toán bằng mã QR WeChat Pay hoặc Alipay cực kỳ phổ biến dù chỉ mua một quả táo.',
  },
  '11': {
    image: '/images/lessons/lesson10_exam_preparation.jpg',
    setting: 'Ký túc xá sinh viên quốc tế (留学生公寓自习角)',
    characters: 'Bạn cũ gọi điện thoại, Lý Văn (李文)',
    goal: 'Hỏi thăm sinh hoạt đại học, diễn đạt hành động đang tiếp diễn với 正在 và 呢.',
    culturalNote: 'Ký túc xá đại học Trung Quốc được trang bị đầy đủ tiện nghi, tạo môi trường giao lưu văn hóa đa quốc gia.',
  },
  '12': {
    image: '/images/lessons/lesson12_winter_snow.jpg',
    setting: 'Sân trường phủ đầy tuyết trắng đầu mùa đông (初冬校园雪景)',
    characters: 'Anna (安妮), Trương Bằng (张朋)',
    goal: 'Khen ngợi tuyết rơi, rủ nhau đắp người tuyết và dùng trợ từ biến đổi ngữ khí 了.',
    culturalNote: 'Trận tuyết đầu mùa (初雪) ở phương Bắc luôn mang lại niềm vui lớn, sinh viên thường rủ nhau ra sân đắp người tuyết và chụp ảnh kỷ niệm.',
  },
  '13': {
    image: '/images/lessons/lesson01_beijing_duck.jpg',
    setting: 'Quán trà Lão Bắc Kinh truyền thống (老北京传统茶馆)',
    characters: 'Nhân viên phục vụ (茶馆服务员), Khách uống trà (顾客)',
    goal: 'Gọi đồ uống và điểm tâm với câu có 2 tân ngữ (给 tôi một tách trà) và từ lịch sự 请.',
    culturalNote: 'Nghệ thuật thưởng trà Trung Hoa nhấn mạnh sự chậm rãi, tĩnh tâm và hiếu khách.',
  },
  '14': {
    image: '/images/lessons/lesson04_fashion_red.jpg',
    setting: 'Rạp chiếu phim hiện đại Wanda Cinema (万达影城休息厅)',
    characters: 'David (大卫), Lý Văn (李文)',
    goal: 'Kể về trải nghiệm xem phim cuối tuần, dùng trợ từ động thái 了 chỉ sự hoàn thành.',
    culturalNote: 'Đi xem phim cuối tuần là hình thức giải trí quen thuộc của giới trẻ đô thị Trung Quốc.',
  },
  '15': {
    image: '/images/lessons/lesson15_daxing_airport.jpg',
    setting: 'Nhà ga Sân bay Quốc tế Đại Hưng (北京大兴国际机场航站楼)',
    characters: 'AI Tiểu Ngữ (AI Xiǎoyǔ), Lý Văn và các bạn du học sinh',
    goal: 'Nói lời tạm biệt, chúc thượng lộ bình an và hẹn ngày tái ngộ.',
    culturalNote: 'Sân bay Đại Hưng do nữ kiến trúc sư Zaha Hadid thiết kế là một trong những kỳ quan kiến trúc hiện đại của thế giới.',
  },
};

const HSK2_CONTEXT_MAP: Record<string, LessonContextInfo> = {
  '01': {
    image: '/images/lessons/lesson01_beijing_duck.jpg',
    setting: 'Nhà hàng Vịt quay Bắc Kinh truyền thống (全聚德烤鸭店)',
    characters: 'Tiểu Ngữ (AI Xiǎoyǔ), Trương Bằng, David, Anna',
    goal: 'Đón bạn quốc tế tại sân bay, mời dùng bữa đặc sản Bắc Kinh, diễn đạt bằng câu chữ 是...的.',
    culturalNote: 'Vịt quay Bắc Kinh là món ăn quốc hồn quốc túy nổi tiếng, ăn kèm bánh tráng nướng mỏng, hành hoa, dưa chuột và tương đậu ngọt.',
  },
  '02': {
    image: '/images/lessons/lesson02_beijing_taxi.jpg',
    setting: 'Đại lộ Bắc Kinh & Cổng Tây Đại học Bắc Kinh (北京大学西门)',
    characters: 'Sinh viên quốc tế, Bác tài xế taxi Bắc Kinh',
    goal: 'Hỏi đường, bắt xe taxi, thảo luận phương tiện giao thông và cấu trúc 还是...吧.',
    culturalNote: 'Đại học Bắc Kinh (Bắc Đại - 北大) thành lập năm 1898, là trường đại học danh tiếng số 1 Trung Quốc với cổng trường mang đậm kiến trúc cung đình.',
  },
  '03': {
    image: '/images/lessons/lesson03_xian_travel.jpg',
    setting: 'Tháp Đại Nhạn & Tường thành Cổ Tây An (西安大雁塔与古城墙)',
    characters: 'Hướng dẫn viên du lịch Tây An, Nhóm bạn du học',
    goal: 'Lên kế hoạch du lịch, mua vé tàu hỏa, đặt phòng khách sạn, dùng bổ ngữ kết quả.',
    culturalNote: 'Tây An (Tràng An xưa) là cố đô 13 triều đại, nơi khởi đầu Con đường Tơ lụa huyền thoại và lưu giữ Đội quân đất nung Binh Mã Dũng.',
  },
  '04': {
    image: '/images/lessons/lesson04_fashion_red.jpg',
    setting: 'Cửa hàng thời trang hiện đại Bắc Kinh (服装专卖店)',
    characters: 'Hai bạn nữ sinh viên chọn trang phục dạo phố',
    goal: 'Hỏi giá, thử đồ, khen ngợi màu sắc thẩm mỹ và sử dụng trợ từ động thái 过.',
    culturalNote: 'Màu đỏ (红色) trong văn hóa Trung Hoa đại diện cho hỷ sự, may mắn, nhiệt huyết và thịnh vượng bền lâu.',
  },
  '05': {
    image: '/images/lessons/lesson05_visit_family.jpg',
    setting: 'Phòng khách gia đình người bạn Trung Quốc (中国朋友家里)',
    characters: 'Du học sinh, Bác trai và Bác gái (Bố mẹ bạn)',
    goal: 'Chào hỏi lễ phép khi đến làm khách, tặng giỏ hoa quả, dùng bổ ngữ xu hướng đơn 来/去.',
    culturalNote: 'Khi đến thăm nhà người Trung Quốc, phong tục lịch sự là mang theo giỏ hoa quả tươi hoặc trà ngon, chủ nhà sẽ nhiệt tình mời trà nhài và hoa quả.',
  },
  '06': {
    image: '/images/lessons/lesson06_birthday_party.jpg',
    setting: 'Tiệc sinh nhật ấm cúng tại quán cafe (生日庆祝聚会)',
    characters: 'Tiểu Tuyết (Xiǎoxuě) và nhóm bạn đại học',
    goal: 'Chúc mừng sinh nhật, tặng quà, khen ngợi bánh kem, sử dụng trợ từ kết cấu 地.',
    culturalNote: 'Người Trung Quốc thường ăn mì trường thọ (长寿面) và bánh sinh nhật với lời chúc "Phúc như Đông Hải, Thọ tỷ Nam Sơn".',
  },
  '07': {
    image: '/images/lessons/lesson07_basketball.jpg',
    setting: 'Sân bóng rổ khuôn viên trường đại học (大学篮球场)',
    characters: 'Các thành viên đội bóng rổ sinh viên, Khán giả cổ vũ',
    goal: 'Bình luận trận đấu thể thao, khen ngợi kỹ năng vận động bằng bổ ngữ trạng thái V+得+Adj.',
    culturalNote: 'Bóng rổ là môn thể thao học đường được giới trẻ học sinh, sinh viên Trung Quốc yêu thích cuồng nhiệt nhất.',
  },
  '08': {
    image: '/images/lessons/lesson06_birthday_party.jpg',
    setting: 'Buổi gặp gỡ kỷ niệm tình bạn bè (朋友聚会)',
    characters: 'Đôi bạn thân lâu ngày không gặp',
    goal: 'Ôn lại kỷ niệm cũ, bày tỏ cảm xúc chân thành bằng câu so sánh 比 và 虽然...但是...',
    culturalNote: 'Tình bạn bè tri kỷ ("知己") rất được người Trung Quốc coi trọng từ thời cổ đại.',
  },
  '09': {
    image: '/images/lessons/lesson09_milk_tea.jpg',
    setting: 'Quán trà sữa trân châu Momo Tea (手作奶茶店)',
    characters: 'Các bạn trẻ gọi đồ uống, Nhân viên pha chế',
    goal: 'Gọi đồ uống trà sữa, chọn lượng đường đá, dùng câu so sánh phủ định 没有 và từ 离.',
    culturalNote: 'Trà sữa trân châu ("奶茶") là một phần không thể thiếu trong nét văn hóa giới trẻ hiện đại tại các đô thị lớn.',
  },
  '10': {
    image: '/images/lessons/lesson10_exam_preparation.jpg',
    setting: 'Thư viện trường đại học yên tĩnh (大学图书馆)',
    characters: 'Nhóm sinh viên cùng ôn thi HSK',
    goal: 'Động viên nhau trước kỳ thi, dùng cấu trúc sắp sửa 就要...了 và câu hỏi 还是.',
    culturalNote: 'Kỳ thi HSK (Hán ngữ Thủy bình Khảo thí) là chứng chỉ năng lực tiếng Hán tiêu chuẩn quốc tế có giá trị toàn cầu.',
  },
  '11': {
    image: '/images/lessons/lesson01_beijing_duck.jpg',
    setting: 'Bàn ăn gia đình với các món truyền thống (中餐美食街)',
    characters: 'Gia đình và bạn bè cùng thưởng thức ẩm thực',
    goal: 'Khen ngợi món ăn, thảo luận hương vị yêu thích bằng phó từ mức độ 最 và trợ từ 着.',
    culturalNote: 'Tám trường phái ẩm thực lớn (Bát đại thái hệ) làm nên nền văn hóa ẩm thực Trung Hoa đặc sắc vang danh thế giới.',
  },
  '12': {
    image: '/images/lessons/lesson12_winter_snow.jpg',
    setting: 'Khuôn viên phủ đầy tuyết trắng mùa đông phương Bắc (北方冬日雪景)',
    characters: 'Du học sinh lần đầu thấy tuyết rơi',
    goal: 'Miêu tả thời tiết, so sánh khí hậu các miền bằng câu so sánh 更/还 và 一样.',
    culturalNote: 'Mùa đông phương Bắc Trung Quốc tuyết rơi trắng xóa, các hoạt động ngắm tuyết và trượt băng rất phổ biến.',
  },
  '13': {
    image: '/images/lessons_hsk1/hsk1_lesson_01.jpg',
    setting: 'Giảng đường tiếng Trung sinh động (国际汉语课堂)',
    characters: 'Thầy giáo dạy tiếng Trung, Học sinh quốc tế',
    goal: 'Giao tiếp trên lớp học, diễn đạt câu có hai tân ngữ và hành động 早/晚.',
    culturalNote: 'Học tiếng Trung mở ra cánh cửa giao lưu văn hóa và cơ hội việc làm rộng mở trên toàn cầu.',
  },
  '14': {
    image: '/images/lessons/lesson14_spring_festival.jpg',
    setting: 'Mâm cơm tất niên đêm Giao thừa (除夕年夜饭)',
    characters: 'Đại gia đình sum vầy cùng bạn bè đón Tết',
    goal: 'Chúc Tết, gói sủi cảo, dùng câu tồn hiện, cảm thán 多 và bổ ngữ xu hướng kép.',
    culturalNote: 'Đêm Giao thừa (除夕) là thời khắc thiêng liêng nhất trong năm, cả nhà quây quần ăn sủi cảo và xem gala mừng xuân.',
  },
  '15': {
    image: '/images/lessons/lesson15_daxing_airport.jpg',
    setting: 'Sân bay quốc tế Đại Hưng Bắc Kinh (北京大兴国际机场)',
    characters: 'Các bạn du học sinh chia tay tại cửa khởi hành',
    goal: 'Nói lời tạm biệt, chúc may mắn, bày tỏ ước nguyện bằng bổ ngữ động lượng 次/遍.',
    culturalNote: 'Sân bay Đại Hưng với kiến trúc hình sao biển kỳ vĩ là một trong những kỳ quan kiến trúc hiện đại của thế giới.',
  },
};

const HSK3_CONTEXT_MAP: Record<string, LessonContextInfo> = {
  '01': {
    image: '/images/lessons/lesson03_xian_travel.jpg',
    setting: 'Phòng sinh hoạt chung lên kế hoạch dã ngoại (周末生活规划室)',
    characters: 'Tiểu Lệ (小丽), Tiểu Cương (小刚)',
    goal: 'Lên kế hoạch cuối tuần, mời ăn cơm xem phim, sử dụng câu chữ 把 và động từ 打算.',
    culturalNote: 'Kế hoạch cuối tuần của giới trẻ thường kết hợp dã ngoại ngoài trời và thưởng thức ẩm thực.',
  },
  '02': {
    image: '/images/lessons/lesson02_beijing_taxi.jpg',
    setting: 'Chân núi Hương Sơn mùa thu (北京香山红叶风景区)',
    characters: 'Nhóm bạn leo núi dã ngoại',
    goal: 'Hỏi thăm thời gian quay về, dùng cấu trúc 越...越... và 虽然...但是...',
    culturalNote: 'Mùa thu ngắm lá đỏ Hương Sơn là một trong những hoạt động văn hóa tiêu biểu nhất của Bắc Kinh.',
  },
  '03': {
    image: '/images/lessons/lesson09_milk_tea.jpg',
    setting: 'Quầy pantry văn phòng công ty hiện đại (商务写字楼茶水间)',
    characters: 'Đồng nghiệp công sở, Lý Minh (李明)',
    goal: 'Hỏi thăm đồ uống trên bàn, sử dụng câu chữ 被 và trợ từ miêu tả trạng thái 着.',
    culturalNote: 'Văn hóa cà phê và trà chiều công sở là không gian giao lưu gắn kết quan trọng của nhân viên văn phòng.',
  },
  '04': {
    image: '/images/lessons/lesson04_fashion_red.jpg',
    setting: 'Quầy lễ tân khách sạn quốc tế 5 sao (五星级酒店大堂前台)',
    characters: 'Quản lý lễ tân, Khách hàng quốc tế',
    goal: 'Khen ngợi thái độ phục vụ khách hàng, dùng bổ ngữ khả năng 得/不.',
    culturalNote: 'Nụ cười và sự niềm nở chân thành trong ngành dịch vụ khách sạn Trung Hoa luôn để lại ấn tượng sâu đậm.',
  },
  '05': {
    image: '/images/lessons/lesson07_basketball.jpg',
    setting: 'Đường chạy công viên Rừng Olympic Bắc Kinh (奥林匹克森林公园跑步道)',
    characters: 'Tiểu Mỹ (小美), Tiểu Lâm (小林)',
    goal: 'Bàn về chế độ ăn uống lành mạnh và tập luyện giảm cân với cấu trúc 除了...以外.',
    culturalNote: 'Phong trào chạy bộ và tập gym giữ gìn vóc dáng ngày càng trở thành xu hướng phổ biến trong giới trẻ.',
  },
  '06': {
    image: '/images/lessons/lesson05_visit_family.jpg',
    setting: 'Phòng khám bệnh viện trường đại học (高校校医院内科诊室)',
    characters: 'Bác sĩ trực, Tiểu Cương (小刚)',
    goal: 'Kể triệu chứng cảm sốt, xin nghỉ ốm, phân biệt cách dùng 刚 và 刚才.',
    culturalNote: 'Khi bị cảm lạnh, người Trung Quốc thường khuyên nhau "uống nhiều nước ấm" (多喝热水) để giữ ấm cơ thể.',
  },
  '07': {
    image: '/images/lessons/lesson06_birthday_party.jpg',
    setting: 'Siêu thị bách hóa tiện lợi chuỗi Ole (大型精品生活超市)',
    characters: 'Tiểu Lệ (小丽), Tiểu Hoa (小华)',
    goal: 'Rủ nhau đi siêu thị mua sắm, diễn đạt sự việc xảy ra liền mạch với cấu trúc 一...就...',
    culturalNote: 'Siêu thị tiện ích tại các khu chung cư là nơi mua sắm sinh hoạt hàng ngày quen thuộc và tiện lợi.',
  },
  '08': {
    image: '/images/lessons/lesson03_xian_travel.jpg',
    setting: 'Ga tàu cao tốc ven biển Thanh Đảo (青岛海滨高铁站广场)',
    characters: 'Đôi bạn trẻ cùng lên kế hoạch kỳ nghỉ',
    goal: 'Bày tỏ sự đồng hành gắn bó, dùng đại từ nghi vấn phiếm chỉ (去哪儿...就去哪儿).',
    culturalNote: 'Mạng lưới đường sắt cao tốc (Gaotie) hiện đại giúp việc du lịch liên tỉnh tại Trung Quốc diễn ra nhanh chóng.',
  },
  '09': {
    image: '/images/lessons_hsk1/hsk1_lesson_01.jpg',
    setting: 'Giao lưu học thuật góc tiếng Hán (国际汉语交流沙龙)',
    characters: 'Thầy giáo dạy ngữ âm, Du học sinh Anna',
    goal: 'Khen ngợi trình độ nói tiếng Hán lưu loát, dùng cấu trúc so sánh ngang bằng và 只要...就...',
    culturalNote: 'Tham gia các buổi "Góc tiếng Hán" (Chinese Corner) là phương pháp rèn luyện phản xạ giao tiếp hữu hiệu nhất.',
  },
  '10': {
    image: '/images/lessons/lesson10_exam_preparation.jpg',
    setting: 'Khu tự học yên tĩnh thư viện đại học (大学图书馆学术自习区)',
    characters: 'Tiểu Cường (小强), Tiểu Phương (小芳)',
    goal: 'So sánh độ khó giữa các môn học, sử dụng cấu trúc liên hợp 又...又...',
    culturalNote: 'Không khí học tập chăm chỉ, miệt mài trong các kỳ thi là nét đẹp truyền thống của sinh viên đại học.',
  },
  '11': {
    image: '/images/lessons/lesson06_birthday_party.jpg',
    setting: 'Phòng hội thảo đa phương tiện công ty (公司多媒体会议室)',
    characters: 'Tổ trưởng văn phòng, Nhân viên',
    goal: 'Nhắc nhở tắt điều hòa và thiết bị điện khi ra về, sử dụng phó từ 到底.',
    culturalNote: 'Ý thức bảo vệ môi trường và tiết kiệm năng lượng xanh (绿色环保) rất được các công ty hiện đại đề cao.',
  },
  '12': {
    image: '/images/lessons/lesson10_exam_preparation.jpg',
    setting: 'Phòng họp đàm phán hợp đồng thương mại (商务谈判签约会议室)',
    characters: 'Tổng giám đốc Vương (王总), Trợ lý',
    goal: 'Ghi chép biên bản cuộc họp vào sổ tay, sử dụng câu so sánh phủ định 没有.',
    culturalNote: 'Ngạn ngữ cổ "Hảo ký tính bất như lạn bút đầu" (好记性不如烂笔头) ca ngợi giá trị bền vững của việc ghi chép cẩn thận.',
  },
  '13': {
    image: '/images/lessons/lesson02_beijing_taxi.jpg',
    setting: 'Đại lộ Trường An rợp bóng cây về đêm (北京林荫步道夜景)',
    characters: 'Tiểu Hải (小海), Bạn cùng phòng',
    goal: 'Chia sẻ thói quen đi bộ sau giờ làm, sử dụng cấu trúc 不仅...而且...',
    culturalNote: 'Thói quen tản bộ buổi tối (散步) là phương pháp thư giãn, giảm căng thẳng tinh thần được nhiều người lựa chọn.',
  },
  '14': {
    image: '/images/lessons/lesson01_beijing_duck.jpg',
    setting: 'Phòng khách phong cách truyền thống tiếp khách (中式雅致会客室)',
    characters: 'Người mẹ, Cậu con trai, Khách quý',
    goal: 'Mời khách dùng hoa quả và trà ngon, sử dụng bổ ngữ thời lượng.',
    culturalNote: 'Đĩa hoa quả tươi gọt sẵn kèm tăm là nét hiếu khách chu đáo điển hình trong mọi gia đình Trung Quốc.',
  },
  '15': {
    image: '/images/lessons/lesson14_spring_festival.jpg',
    setting: 'Đại tiệc chào đón năm mới rực rỡ sắc đỏ (迎新春联欢宴会厅)',
    characters: 'Giáo viên chủ nhiệm, Toàn thể học sinh',
    goal: 'Gửi lời chúc mừng năm mới may mắn, tổng kết cấp độ HSK 3 với cấu trúc 如果...就...',
    culturalNote: 'Năm mới là dịp tôn vinh sự nỗ lực suốt một năm và cùng chúc nhau bước sang một tầm cao mới (步步高升).',
  },
};

function getLessonContext(level: CourseLevel, lessonNumber: string): LessonContextInfo {
  if (level === 'HSK1') {
    return (
      HSK1_CONTEXT_MAP[lessonNumber] || {
        image: '/images/lessons_hsk1/hsk1_lesson_01.jpg',
        setting: `Bối cảnh bài học HSK 1 - Bài ${lessonNumber}`,
        characters: 'AI Tiểu Ngữ và các bạn học sinh',
        goal: 'Luyện tập giao tiếp tiếng Hán cơ bản',
        culturalNote: 'Chương trình chuẩn Giáo trình New HSK 1 (HSK 3.0 FLTRP).',
      }
    );
  }
  if (level === 'HSK3') {
    return (
      HSK3_CONTEXT_MAP[lessonNumber] || {
        image: '/images/lessons/lesson03_xian_travel.jpg',
        setting: `Bối cảnh bài học HSK 3 - Bài ${lessonNumber}`,
        characters: 'Sinh viên và bạn bè quốc tế',
        goal: 'Giao tiếp tiếng Hán trung cấp',
        culturalNote: 'Chương trình chuẩn HSK 3 (HSK 3.0).',
      }
    );
  }
  return (
    HSK2_CONTEXT_MAP[lessonNumber] || {
      image: '/images/lessons/lesson10_exam_preparation.jpg',
      setting: `Bối cảnh bài học HSK 2 - Bài ${lessonNumber}`,
      characters: 'Tiểu Ngữ và các bạn du học sinh',
      goal: 'Giao tiếp tiếng Hán sơ cấp nâng cao',
      culturalNote: 'Bài giảng chuẩn theo chương trình giáo trình Tân HSK 2 (HSK 3.0 FLTRP & CTI).',
    }
  );
}

interface AudioCourseViewProps {
  externalLevel?: HSKLevel;
  onLevelChange?: (lvl: HSKLevel) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenChatAI?: (prompt: string) => void;
}

export function AudioCourseView({
  externalLevel,
  onLevelChange,
  onNavigateTab,
  onOpenChatAI,
}: AudioCourseViewProps) {
  const [courseLevel, setCourseLevel] = useState<CourseLevel>(() => {
    if (externalLevel === 1) return 'HSK1';
    if (externalLevel === 2) return 'HSK2';
    if (externalLevel === 3) return 'HSK3';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (saved) return JSON.parse(saved).courseLevel || 'HSK2';
    } catch {}
    return 'HSK2';
  });

  // Đồng bộ khi header chọn cấp độ
  useEffect(() => {
    if (externalLevel === 1 && courseLevel !== 'HSK1') handleSelectCourseLevel('HSK1');
    else if (externalLevel === 2 && courseLevel !== 'HSK2') handleSelectCourseLevel('HSK2');
    else if (externalLevel === 3 && courseLevel !== 'HSK3') handleSelectCourseLevel('HSK3');
  }, [externalLevel]);

  const activeLessons =
    courseLevel === 'HSK1'
      ? HSK1_LESSONS
      : courseLevel === 'HSK2'
      ? HSK2_LESSONS
      : HSK3_LESSONS;

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (saved) {
        const parsed = JSON.parse(saved);
        const list =
          parsed.courseLevel === 'HSK1'
            ? HSK1_LESSONS
            : parsed.courseLevel === 'HSK3'
            ? HSK3_LESSONS
            : HSK2_LESSONS;
        const found = list.find((l: Lesson) => l.id === parsed.lessonId);
        if (found) return found;
      }
    } catch {}
    return HSK2_LESSONS[0];
  });

  const currentLessonIndex = Math.max(0, activeLessons.findIndex((l) => l.id === selectedLesson.id));
  const prevLesson = currentLessonIndex > 0 ? activeLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < activeLessons.length - 1 ? activeLessons[currentLessonIndex + 1] : null;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);

  const [activeSubTab, setActiveSubTab] = useState<LessonSubTab>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (saved) return JSON.parse(saved).subTab || 'grammar';
    } catch {}
    return 'grammar';
  });

  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [dialogueSpeed, setDialogueSpeed] = useState<number>(1.0);
  const [selectedImageModal, setSelectedImageModal] = useState<{ src: string; title: string; subtitle: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Thanh tìm kiếm giáo trình
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'grammar' | 'vocab' | 'audio'>('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Banner hướng dẫn lộ trình học tập
  const [showGuideBanner, setShowGuideBanner] = useState(true);
  const [isEasyMode, setIsEasyMode] = useState(true); // Chế độ học siêu dễ (mặc định bật)
  const [showLessonSidebar, setShowLessonSidebar] = useState(false); // Mặc định mở toàn màn hình (single-focus)
  const [showLessonDropdown, setShowLessonDropdown] = useState(false); // Dropdown chuyển bài nhanh

  // Lưu trữ tiến độ điểm ngữ pháp đã học (mảng grammar ID)
  const [completedGrammar, setCompletedGrammar] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GRAMMAR);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Lưu trữ danh sách file nghe đã hoàn thành (mảng trackNumber)
  const [completedTracks, setCompletedTracks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AUDIO);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Tự động lưu vị trí học tập hiện tại vào localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_ACTIVE,
        JSON.stringify({
          courseLevel,
          lessonId: selectedLesson.id,
          subTab: activeSubTab,
        })
      );
    } catch (e) {
      console.error('Lỗi lưu trạng thái bài học:', e);
    }
  }, [courseLevel, selectedLesson, activeSubTab]);

  const toggleGrammarCompleted = (grammarId: string) => {
    setCompletedGrammar((prev) => {
      const next = prev.includes(grammarId)
        ? prev.filter((id) => id !== grammarId)
        : [...prev, grammarId];
      try {
        localStorage.setItem(STORAGE_KEY_GRAMMAR, JSON.stringify(next));
      } catch (e) {
        console.error('Lỗi lưu tiến độ ngữ pháp:', e);
      }
      return next;
    });
  };

  const toggleTrackCompleted = (trackNumber: string) => {
    setCompletedTracks((prev) => {
      const next = prev.includes(trackNumber)
        ? prev.filter((t) => t !== trackNumber)
        : [...prev, trackNumber];
      try {
        localStorage.setItem(STORAGE_KEY_AUDIO, JSON.stringify(next));
      } catch (e) {
        console.error('Lỗi lưu tiến độ audio:', e);
      }
      return next;
    });
  };

  const handleResetProgress = () => {
    if (window.confirm(`Bạn có chắc muốn đặt lại toàn bộ tiến độ đã học của ${courseLevel}?`)) {
      setCompletedGrammar([]);
      setCompletedTracks([]);
      try {
        localStorage.removeItem(STORAGE_KEY_GRAMMAR);
        localStorage.removeItem(STORAGE_KEY_AUDIO);
      } catch {}
    }
  };

  const grammarDataMap =
    courseLevel === 'HSK1'
      ? HSK1_GRAMMAR_DETAILS
      : courseLevel === 'HSK2'
      ? HSK2_GRAMMAR_DETAILS
      : HSK3_GRAMMAR_DETAILS;

  const grammarDetail = grammarDataMap[selectedLesson.number];

  // Tính toán tiến độ tổng khóa học
  const allCurrentLevelGrammarIds = Object.values(grammarDataMap).flatMap((d) =>
    d.grammarPoints.map((p) => p.id)
  );
  const totalLevelGrammarCount = allCurrentLevelGrammarIds.length || 1;
  const completedLevelGrammarCount = allCurrentLevelGrammarIds.filter((id) =>
    completedGrammar.includes(id)
  ).length;
  const courseGrammarPercent = Math.round(
    (completedLevelGrammarCount / totalLevelGrammarCount) * 100
  );

  const completedLevelTracksCount = completedTracks.length;

  const currentTrack =
    selectedLesson.tracks && selectedLesson.tracks.length > 0
      ? selectedLesson.tracks[currentTrackIndex]
      : null;
  const audioSrc = currentTrack ? `/audio/hsk2/${currentTrack.file}` : '';

  const handleSelectCourseLevel = (level: CourseLevel) => {
    setCourseLevel(level);
    const newLessonList =
      level === 'HSK1'
        ? HSK1_LESSONS
        : level === 'HSK3'
        ? HSK3_LESSONS
        : HSK2_LESSONS;
    setSelectedLesson(newLessonList[0]);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
    setActiveSubTab('grammar');

    if (onLevelChange) {
      if (level === 'HSK1') onLevelChange(1);
      else if (level === 'HSK2') onLevelChange(2);
      else if (level === 'HSK3') onLevelChange(3);
    }
  };

  // Dừng phát hội thoại khi chuyển bài hoặc chuyển cấp độ
  useEffect(() => {
    stopDialogueAudio();
  }, [selectedLesson.id, activeSubTab, courseLevel]);

  const stopDialogueAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingDialogue(false);
    setActiveLineIndex(null);
    setSpeakingText(null);
  };

  const playWholeDialogue = (lines: any[]) => {
    if (!('speechSynthesis' in window) || !lines || lines.length === 0) return;
    window.speechSynthesis.cancel();
    setIsPlayingDialogue(true);

    let idx = 0;
    const runStep = () => {
      if (idx >= lines.length) {
        setIsPlayingDialogue(false);
        setActiveLineIndex(null);
        setSpeakingText(null);
        return;
      }
      const curLine = lines[idx];
      setActiveLineIndex(idx);
      setSpeakingText(curLine.cn);

      const utterance = new SpeechSynthesisUtterance(curLine.cn);
      utterance.lang = 'zh-CN';
      utterance.rate = dialogueSpeed;
      utterance.onend = () => {
        idx++;
        setTimeout(runStep, 600);
      };
      utterance.onerror = () => {
        setIsPlayingDialogue(false);
        setActiveLineIndex(null);
        setSpeakingText(null);
      };
      window.speechSynthesis.speak(utterance);
    };

    runStep();
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setSpeakingText(text);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.85;
    utterance.onend = () => setSpeakingText(null);
    utterance.onerror = () => setSpeakingText(null);
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
    }
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTimeout(() => {
        audioRef.current?.play().catch(console.error);
        setIsPlaying(true);
      }, 100);
    }
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  };

  const changeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // TÌM KIẾM TOÀN DIỆN TRONG GIÁO TRÌNH
  const searchResults: SearchResultItem[] = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: SearchResultItem[] = [];

    // Helper kiểm tra cấp độ
    const checkLessonsForLevel = (lvl: CourseLevel, list: Lesson[], gMap: Record<string, any>) => {
      list.forEach((les) => {
        const detail = gMap[les.number];

        // 1. Kiểm tra tiêu đề bài học
        if (searchFilter === 'all') {
          if (
            les.titleCn.toLowerCase().includes(q) ||
            les.titlePinyin.toLowerCase().includes(q) ||
            les.titleVi.toLowerCase().includes(q) ||
            `bài ${parseInt(les.number, 10)}`.includes(q) ||
            `lesson ${parseInt(les.number, 10)}`.includes(q)
          ) {
            results.push({
              id: `${lvl}-${les.id}-title`,
              courseLevel: lvl,
              lesson: les,
              type: 'lesson',
              typeLabel: 'Bài học',
              badgeColor: '#0284c7',
              title: `Bài ${les.number}: ${les.titleCn}`,
              subtitle: `${les.titlePinyin} · ${les.titleVi}`,
              snippet: `Giáo trình ${lvl} · Toàn bộ nội dung bài ${les.number}`,
              targetSubTab: 'grammar',
            });
          }
        }

        if (detail) {
          // 2. Kiểm tra Ngữ pháp Tiểu Ngữ
          if (searchFilter === 'all' || searchFilter === 'grammar') {
            detail.grammarPoints.forEach((gp: GrammarPoint) => {
              const matched =
                gp.title.toLowerCase().includes(q) ||
                gp.formula.toLowerCase().includes(q) ||
                gp.explanation.toLowerCase().includes(q) ||
                (gp.pitfall ? gp.pitfall.toLowerCase().includes(q) : false) ||
                gp.examples.some(
                  (ex) =>
                    ex.cn.toLowerCase().includes(q) ||
                    ex.pinyin.toLowerCase().includes(q) ||
                    ex.vi.toLowerCase().includes(q)
                );

              if (matched) {
                results.push({
                  id: `${lvl}-${gp.id}`,
                  courseLevel: lvl,
                  lesson: les,
                  type: 'grammar',
                  typeLabel: 'Ngữ pháp',
                  badgeColor: '#d93838',
                  title: gp.title,
                  subtitle: `${lvl} · Bài ${les.number} (${les.titleCn})`,
                  snippet: gp.formula || gp.explanation.slice(0, 80) + '...',
                  targetSubTab: 'grammar',
                });
              }
            });
          }

          // 3. Kiểm tra Từ vựng mới
          if (searchFilter === 'all' || searchFilter === 'vocab') {
            detail.keyVocab.forEach((kv: any, vIdx: number) => {
              if (
                kv.hanzi.toLowerCase().includes(q) ||
                kv.pinyin.toLowerCase().includes(q) ||
                kv.meaning.toLowerCase().includes(q) ||
                kv.hanViet.toLowerCase().includes(q)
              ) {
                results.push({
                  id: `${lvl}-${les.id}-vocab-${vIdx}`,
                  courseLevel: lvl,
                  lesson: les,
                  type: 'vocab',
                  typeLabel: 'Từ vựng',
                  badgeColor: '#10b981',
                  title: `${kv.hanzi} [${kv.pinyin}] - ${kv.hanViet}`,
                  subtitle: `${lvl} · Bài ${les.number} (${les.titleCn})`,
                  snippet: `Ý nghĩa: ${kv.meaning}`,
                  targetSubTab: 'vocab',
                });
              }
            });
          }
        }

        // 4. Kiểm tra Tracks Audio (HSK 2)
        if (lvl === 'HSK2' && (searchFilter === 'all' || searchFilter === 'audio')) {
          les.tracks.forEach((tr, tIdx) => {
            if (
              tr.label.toLowerCase().includes(q) ||
              tr.trackNumber.toLowerCase().includes(q) ||
              tr.file.toLowerCase().includes(q)
            ) {
              results.push({
                id: `${lvl}-${tr.trackNumber}`,
                courseLevel: lvl,
                lesson: les,
                type: 'audio',
                typeLabel: 'Audio Track',
                badgeColor: '#f59e0b',
                title: `Track ${tr.trackNumber}: ${tr.label}`,
                subtitle: `${lvl} · Bài ${les.number} · File: ${tr.file}`,
                snippet: `Bản xứ FLTRP · Nghe luyện phát âm và bài khóa`,
                targetSubTab: 'audio',
              });
            }
          });
        }
      });
    };

    checkLessonsForLevel('HSK1', HSK1_LESSONS, HSK1_GRAMMAR_DETAILS);
    checkLessonsForLevel('HSK2', HSK2_LESSONS, HSK2_GRAMMAR_DETAILS);
    checkLessonsForLevel('HSK3', HSK3_LESSONS, HSK3_GRAMMAR_DETAILS);

    return results.slice(0, 15);
  }, [searchQuery, searchFilter]);

  const handleSelectSearchResult = (item: SearchResultItem) => {
    if (courseLevel !== item.courseLevel) {
      setCourseLevel(item.courseLevel);
      if (onLevelChange) {
        if (item.courseLevel === 'HSK1') onLevelChange(1);
        else if (item.courseLevel === 'HSK2') onLevelChange(2);
        else if (item.courseLevel === 'HSK3') onLevelChange(3);
      }
    }
    setSelectedLesson(item.lesson);
    setActiveSubTab(item.targetSubTab);
    setSearchQuery('');
  };

  const pdfPath =
    courseLevel === 'HSK1'
      ? '/books/New_HSK_Course_1_HSK3.0.pdf'
      : '/books/New_HSK_Course_2_HSK3.0.pdf';

  return (
    <div className="audio-course-view" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      {/* 1. THANH TÌM KIẾM GIÁO TRÌNH THÔNG MINH */}
      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '16px 20px',
          marginBottom: '20px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              flex: 1,
              minWidth: '280px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Search
              size={18}
              color={searchQuery ? '#38bdf8' : 'var(--text-dim)'}
              style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="🔍 Tìm kiếm giáo trình: Ngữ pháp (chữ 把, 是...的, 比...), từ vựng (烤鸭, taxi), số bài (Bài 01), track audio..."
              style={{
                width: '100%',
                padding: '12px 42px 12px 42px',
                background: 'var(--surface-card)',
                border: searchQuery ? '1.5px solid #0284c7' : '1px solid var(--border)',
                borderRadius: '10px',
                color: 'var(--text-heading)',
                fontSize: '14px',
                outline: 'none',
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  color: 'var(--text-dim)',
                  padding: '4px',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Bộ lọc loại tìm kiếm */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'grammar', label: '🎓 Ngữ pháp' },
              { id: 'vocab', label: '📖 Từ vựng' },
              { id: 'audio', label: '🎧 Audio' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSearchFilter(f.id as any)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 600,
                  background: searchFilter === f.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: searchFilter === f.id ? '#38bdf8' : 'var(--text-muted)',
                  border: `1px solid ${searchFilter === f.id ? 'rgba(56, 189, 248, 0.4)' : 'transparent'}`,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Kết quả tìm kiếm trực tiếp */}
        {searchQuery.trim().length > 0 && (
          <div
            style={{
              marginTop: '14px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--text-dim)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Tìm thấy <strong>{searchResults.length}</strong> kết quả phù hợp trong toàn bộ giáo trình:</span>
              <span>Bấm vào kết quả để chuyển tới bài học ngay</span>
            </div>

            {searchResults.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                Không tìm thấy nội dung khớp với từ khóa "<strong>{searchQuery}</strong>". Thử tìm theo Hanzi, Pinyin hoặc tiếng Việt không dấu.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto' }}>
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectSearchResult(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'var(--surface-card)',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-card)')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '3px 7px',
                          borderRadius: '4px',
                          background: item.badgeColor,
                          color: '#fff',
                        }}
                      >
                        {item.typeLabel}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div style={{ fontSize: '12px', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Mở {item.targetSubTab}</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. BANNER HƯỚNG DẪN: "BẮT ĐẦU HỌC TỪ ĐÂU?" */}
      {showGuideBanner && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(5, 150, 105, 0.06) 100%)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            borderRadius: '16px',
            padding: '18px 24px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          <div style={{ flex: 1, minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Sparkles size={16} color="#0284c7" />
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)' }}>
                Lộ Trình Học Chuẩn 4 Bước (Không Lo Bị Lộn Xộn)
              </span>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span><strong style={{ color: '#0284c7' }}>Bước 1:</strong> Chọn Cấp độ (HSK 1 / HSK 2 / HSK 3)</span>
              <span>➔</span>
              <span><strong style={{ color: '#0284c7' }}>Bước 2:</strong> Chọn Bài học theo thứ tự 01..15</span>
              <span>➔</span>
              <span><strong style={{ color: '#0284c7' }}>Bước 3:</strong> Học Từ mới & Ngữ pháp Tiểu Ngữ ➔ Bấm "Đã hiểu"</span>
              <span>➔</span>
              <span><strong style={{ color: '#0284c7' }}>Bước 4:</strong> Nghe Audio 120 tracks & Ôn Flashcards</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowGuideBanner(false)}
              style={{
                fontSize: '11px',
                color: 'var(--text-dim)',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 10px',
                borderRadius: '6px',
              }}
            >
              Thu gọn
            </button>
          </div>
        </div>
      )}

      {/* 3. THANH CHỌN CẤP ĐỘ GIÁO TRÌNH RÕ RÀNG (HSK 1, HSK 2, HSK 3) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '12px 20px',
          marginBottom: '20px',
          gap: '12px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            GIÁO TRÌNH CHUẨN:
          </span>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: courseLevel === 'HSK1' ? '#0284c7' : 'var(--surface-card)',
                color: courseLevel === 'HSK1' ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${courseLevel === 'HSK1' ? '#0284c7' : 'var(--border)'}`,
                boxShadow: courseLevel === 'HSK1' ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectCourseLevel('HSK1')}
            >
              📘 HSK 1 (15 Bài · 40 Ngữ Pháp)
            </button>

            <button
              type="button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: courseLevel === 'HSK2' ? 'var(--primary)' : 'var(--surface-card)',
                color: courseLevel === 'HSK2' ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${courseLevel === 'HSK2' ? 'var(--primary)' : 'var(--border)'}`,
                boxShadow: courseLevel === 'HSK2' ? '0 2px 8px rgba(217, 56, 56, 0.3)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectCourseLevel('HSK2')}
            >
              🎧 HSK 2 (15 Bài · 45 Ngữ Pháp · 120 Audio Drive)
            </button>

            <button
              type="button"
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
                background: courseLevel === 'HSK3' ? '#10b981' : 'var(--surface-card)',
                color: courseLevel === 'HSK3' ? '#fff' : 'var(--text-heading)',
                border: `1.5px solid ${courseLevel === 'HSK3' ? '#10b981' : 'var(--border)'}`,
                boxShadow: courseLevel === 'HSK3' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectCourseLevel('HSK3')}
            >
              📗 HSK 3 (15 Bài · Câu chữ 把, 被...)
            </button>
          </div>
        </div>

        {/* Nút xem sách gốc PDF từ Drive */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {courseLevel !== 'HSK3' && (
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '8px',
                background: 'var(--surface-hover)',
                color: 'var(--text-heading)',
                fontSize: '12px',
                fontWeight: 700,
                border: '1.5px solid var(--border)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <FileText size={14} /> Xem Sách Scan PDF Gốc ({courseLevel === 'HSK1' ? '144 trang' : '162 trang'}) <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>

      {/* 4. THANH TIẾN ĐỘ TỔNG KHÓA HỌC */}
      <div
        style={{
          background: 'var(--surface)',
          borderRadius: '14px',
          padding: '14px 20px',
          border: '1px solid var(--border)',
          marginBottom: '20px',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} color="#059669" />
            <span style={{ color: 'var(--text-heading)', fontWeight: 700, fontSize: '13px' }}>
              Tiến độ {courseLevel}: {completedLevelGrammarCount}/{totalLevelGrammarCount} điểm ngữ pháp ({courseGrammarPercent}%)
            </span>
            {courseLevel === 'HSK2' && (
              <span style={{ color: '#f87171', fontSize: '12px', fontWeight: 600 }}>
                · 🎧 {completedLevelTracksCount}/120 files audio đã nghe
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetProgress}
            style={{
              fontSize: '11px',
              color: 'var(--text-dim)',
              background: 'none',
              border: 'none',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            title="Đặt lại toàn bộ tiến độ của cấp độ này"
          >
            Đặt lại tiến độ {courseLevel}
          </button>
        </div>

        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${courseGrammarPercent}%`,
              height: '100%',
              background:
                courseLevel === 'HSK1'
                  ? 'linear-gradient(90deg, #0284c7, #38bdf8)'
                  : courseLevel === 'HSK2'
                  ? 'linear-gradient(90deg, #d93838, #f87171)'
                  : 'linear-gradient(90deg, #10b981, #34d399)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* 5. GIAO DIỆN BÀI HỌC THÔNG MINH - ĐIỀU HƯỚNG ĐỈNH CAO & THOÁNG ĐÃNG */}
      {/* Thanh điều hướng bài học đỉnh cao (Top Stepper Bar) */}
      <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '14px',
                padding: '10px 16px',
                marginBottom: '16px',
                gap: '12px',
                flexWrap: 'wrap',
                boxShadow: 'var(--card-shadow)',
                position: 'relative',
              }}
            >
              <button
                type="button"
                disabled={!prevLesson}
                onClick={() => prevLesson && handleSelectLesson(prevLesson)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: 'var(--surface-card)',
                  border: '1px solid var(--border)',
                  color: prevLesson ? 'var(--text)' : 'var(--text-dim)',
                  cursor: prevLesson ? 'pointer' : 'not-allowed',
                  fontWeight: 700,
                  fontSize: '13px',
                  opacity: prevLesson ? 1 : 0.45,
                }}
              >
                <ChevronLeft size={16} /> Bài trước
              </button>

              {/* Lesson Quick Dropdown Switcher */}
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowLessonDropdown((prev) => !prev)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 18px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12) 0%, rgba(56, 189, 248, 0.08) 100%)',
                    border: '1.5px solid #0284c7',
                    color: 'var(--text-heading)',
                    cursor: 'pointer',
                    fontWeight: 800,
                    fontSize: '14px',
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.15)',
                  }}
                  title="Bấm để chọn nhanh bài học khác"
                >
                  <span style={{ color: '#0284c7', fontWeight: 900 }}>Bài {selectedLesson.number}:</span>
                  <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '15px' }}>{selectedLesson.titleCn}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({selectedLesson.titleVi})</span>
                  <ChevronDown size={14} color="#0284c7" />
                </button>

                {showLessonDropdown && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '380px',
                      maxHeight: '420px',
                      overflowY: 'auto',
                      background: 'var(--surface)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '16px',
                      padding: '8px',
                      boxShadow: 'var(--card-shadow-lg)',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 800, color: 'var(--text-dim)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>MỤC LỤC 15 BÀI {courseLevel}</span>
                      <button
                        type="button"
                        onClick={() => setShowLessonDropdown(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700 }}
                      >
                        ✕ Đóng
                      </button>
                    </div>

                    {activeLessons.map((l) => {
                      const isCur = l.id === selectedLesson.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => {
                            handleSelectLesson(l);
                            setShowLessonDropdown(false);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            borderRadius: '10px',
                            background: isCur ? 'rgba(2, 132, 199, 0.12)' : 'transparent',
                            border: `1px solid ${isCur ? '#0284c7' : 'transparent'}`,
                            color: isCur ? '#0284c7' : 'var(--text)',
                            textAlign: 'left',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: isCur ? 800 : 600,
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 800, marginRight: '6px' }}>Bài {l.number}:</span>
                            <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '14px', marginRight: '6px' }}>{l.titleCn}</span>
                            <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>{l.titleVi}</div>
                          </div>
                          {isCur && <Check size={16} color="#0284c7" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && handleSelectLesson(nextLesson)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    color: nextLesson ? 'var(--text)' : 'var(--text-dim)',
                    cursor: nextLesson ? 'pointer' : 'not-allowed',
                    fontWeight: 700,
                    fontSize: '13px',
                    opacity: nextLesson ? 1 : 0.45,
                  }}
                >
                  Bài tiếp <ChevronRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowLessonSidebar((prev) => !prev)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: showLessonSidebar ? 'rgba(2, 132, 199, 0.15)' : 'var(--surface-card)',
                    border: `1px solid ${showLessonSidebar ? '#0284c7' : 'var(--border)'}`,
                    color: showLessonSidebar ? '#0284c7' : 'var(--text-muted)',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                  title="Hiện hoặc ẩn cột mục lục 15 bài học"
                >
                  <ListOrdered size={15} /> {showLessonSidebar ? 'Thu gọn cột 15 bài' : 'Ghim cột 15 bài'}
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: showLessonSidebar ? '280px minmax(0, 1fr)' : 'minmax(0, 1fr)', gap: '20px' }}>
              {/* CỘT TRÁI: MỤC LỤC 15 BÀI HỌC (CHỈ HIỂN THỊ KHI BẬT) */}
              {showLessonSidebar && (
                <div>
                  <div
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '16px',
                      padding: '16px',
                      position: 'sticky',
                      top: '90px',
                      maxHeight: 'calc(100vh - 120px)',
                      overflowY: 'auto',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                          MỤC LỤC 15 BÀI HỌC
                        </h4>
                        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                          Chuẩn Sách FLTRP & CTI
                        </span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
                        15 Bài
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeLessons.map((lesson) => {
                        const isSelected = selectedLesson.id === lesson.id;
                        const lessonDetail = grammarDataMap[lesson.number];
                        const grammarCount = lessonDetail ? lessonDetail.grammarPoints.length : 0;
                        const lessonPoints = lessonDetail ? lessonDetail.grammarPoints.map((p) => p.id) : [];
                        const doneCount = lessonPoints.filter((id) => completedGrammar.includes(id)).length;
                        const isAllDone = lessonPoints.length > 0 && doneCount === lessonPoints.length;

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            onClick={() => handleSelectLesson(lesson)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-start',
                              padding: '10px 12px',
                              borderRadius: '10px',
                              background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'var(--surface)',
                              border: `1.5px solid ${isSelected ? '#0284c7' : 'var(--border)'}`,
                              cursor: 'pointer',
                              textAlign: 'left',
                              transition: 'all 0.15s ease',
                              width: '100%',
                              boxShadow: isSelected ? '0 2px 8px rgba(2, 132, 199, 0.15)' : 'none',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '4px' }}>
                              <span
                                style={{
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  color: isSelected ? '#0284c7' : 'var(--text-dim)',
                                }}
                              >
                                Bài {lesson.number}
                              </span>

                              {isAllDone ? (
                                <span style={{ fontSize: '10px', background: 'rgba(16, 185, 129, 0.25)', color: '#34d399', padding: '1px 6px', borderRadius: '4px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                  <Check size={10} /> Xong
                                </span>
                              ) : (
                                <span style={{ fontSize: '10px', color: doneCount > 0 ? '#38bdf8' : 'var(--text-dim)', fontWeight: 600 }}>
                                  {doneCount}/{grammarCount} ngữ pháp
                                </span>
                              )}
                            </div>

                            <div style={{ fontFamily: 'var(--font-hanzi)', fontSize: '15px', fontWeight: 700, color: isSelected ? 'var(--text-heading)' : 'var(--text)', marginBottom: '2px' }}>
                              {lesson.titleCn}
                            </div>

                            <div style={{ fontSize: '11px', color: isSelected ? '#38bdf8' : 'var(--text-muted)', lineHeight: 1.3 }}>
                              {lesson.titleVi}
                            </div>

                            {lesson.tracks && lesson.tracks.length > 0 && (
                              <div style={{ marginTop: '4px', fontSize: '10px', color: 'var(--text-dim)' }}>
                                🎧 {lesson.tracks.length} file audio
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

        {/* CỘT CHÍNH: CHI TIẾT BÀI HỌC (CHIẾM 100% DIỆN TÍCH KHI THU GỌN MỤC LỤC) */}
        <div style={{ minWidth: 0 }}>
          {/* Header Bài Học Đang Chọn */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase' }}>
                  {courseLevel} · BÀI HỌC {selectedLesson.number}
                </span>
                <h2 style={{ fontFamily: 'var(--font-hanzi)', fontSize: '28px', fontWeight: 800, color: 'var(--text-heading)', margin: '4px 0' }}>
                  {selectedLesson.titleCn}
                </h2>
                <div style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 600 }}>
                  {selectedLesson.titlePinyin}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {selectedLesson.titleVi}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => speak(selectedLesson.titleCn)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: 'var(--surface-hover)',
                    border: '1.5px solid var(--border)',
                    color: 'var(--text-heading)',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                  title="Phát âm tiêu đề bài học"
                >
                  <Volume2 size={16} /> Nghe tiêu đề
                </button>

                {courseLevel !== 'HSK3' && (
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('pdf')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: activeSubTab === 'pdf' ? 'rgba(2, 132, 199, 0.15)' : 'var(--surface-hover)',
                      border: `1.5px solid ${activeSubTab === 'pdf' ? '#0284c7' : 'var(--border)'}`,
                      color: activeSubTab === 'pdf' ? '#0284c7' : 'var(--text-heading)',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    <FileText size={16} /> Mở Sách PDF Gốc
                  </button>
                )}
              </div>
            </div>

            {/* THANH SUBTABS NỘI DUNG CHUẨN FLTRP & HÌNH ẢNH NGỮ CẢNH */}
            <div
              className="lesson-subtabs-scroll"
              style={{
                display: 'flex',
                gap: '8px',
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveSubTab('context')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeSubTab === 'context' ? '#0284c7' : 'var(--surface-card)',
                  color: activeSubTab === 'context' ? '#fff' : 'var(--text-heading)',
                  border: `1.5px solid ${activeSubTab === 'context' ? '#0284c7' : 'var(--border)'}`,
                  boxShadow: activeSubTab === 'context' ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none',
                  cursor: 'pointer',
                }}
              >
                🖼️ Ngữ Cảnh Giao Tiếp (Tranh Minh Họa)
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('pinyin')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeSubTab === 'pinyin' ? '#f97316' : 'var(--surface-card)',
                  color: activeSubTab === 'pinyin' ? '#fff' : 'var(--text-heading)',
                  border: `1.5px solid ${activeSubTab === 'pinyin' ? '#f97316' : 'var(--border)'}`,
                  boxShadow: activeSubTab === 'pinyin' ? '0 2px 8px rgba(249, 115, 22, 0.3)' : 'none',
                  cursor: 'pointer',
                }}
              >
                🗣️ Ngữ Âm & Phát Âm Pinyin
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('grammar')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeSubTab === 'grammar' ? '#d93838' : 'var(--surface-card)',
                  color: activeSubTab === 'grammar' ? '#fff' : 'var(--text-heading)',
                  border: `1.5px solid ${activeSubTab === 'grammar' ? '#d93838' : 'var(--border)'}`,
                  boxShadow: activeSubTab === 'grammar' ? '0 2px 8px rgba(217, 56, 56, 0.3)' : 'none',
                  cursor: 'pointer',
                }}
              >
                🎓 Tiểu Ngữ Giảng Đường (小语讲堂)
              </button>

              {courseLevel === 'HSK2' && (
                <button
                  type="button"
                  onClick={() => setActiveSubTab('audio')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: activeSubTab === 'audio' ? '#0284c7' : 'var(--surface-card)',
                    color: activeSubTab === 'audio' ? '#fff' : 'var(--text-heading)',
                    border: `1.5px solid ${activeSubTab === 'audio' ? '#0284c7' : 'var(--border)'}`,
                    boxShadow: activeSubTab === 'audio' ? '0 2px 8px rgba(2, 132, 199, 0.3)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  🎧 120 File Audio Bản Xứ ({selectedLesson.tracks?.length || 0} bài)
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveSubTab('vocab')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeSubTab === 'vocab' ? '#10b981' : 'var(--surface-card)',
                  color: activeSubTab === 'vocab' ? '#fff' : 'var(--text-heading)',
                  border: `1.5px solid ${activeSubTab === 'vocab' ? '#10b981' : 'var(--border)'}`,
                  boxShadow: activeSubTab === 'vocab' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none',
                  cursor: 'pointer',
                }}
              >
                📖 Sinh Từ (生词)
              </button>

              <button
                type="button"
                onClick={() => setActiveSubTab('dialogue')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: activeSubTab === 'dialogue' ? '#8b5cf6' : 'var(--surface-card)',
                  color: activeSubTab === 'dialogue' ? '#fff' : 'var(--text-heading)',
                  border: `1.5px solid ${activeSubTab === 'dialogue' ? '#8b5cf6' : 'var(--border)'}`,
                  boxShadow: activeSubTab === 'dialogue' ? '0 2px 8px rgba(139, 92, 246, 0.3)' : 'none',
                  cursor: 'pointer',
                }}
              >
                💬 Bài Khóa & Hội Thoại (课文)
              </button>

              {courseLevel !== 'HSK3' && (
                <button
                  type="button"
                  onClick={() => setActiveSubTab('pdf')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    background: activeSubTab === 'pdf' ? '#f59e0b' : 'var(--surface-card)',
                    color: activeSubTab === 'pdf' ? '#fff' : 'var(--text-heading)',
                    border: `1.5px solid ${activeSubTab === 'pdf' ? '#f59e0b' : 'var(--border)'}`,
                    boxShadow: activeSubTab === 'pdf' ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  📑 Sách Giáo Khoa Gốc PDF
                </button>
              )}
            </div>
          </div>

          {/* SUBTAB 0: HÌNH ẢNH KÈM THEO NGỮ CẢNH GIAO TIẾP */}
          {activeSubTab === 'context' && (() => {
            const ctx = getLessonContext(courseLevel, selectedLesson.number);

            return (
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* Khung Tranh Minh Họa 16:9 Chất Lượng Cao */}
                <div style={{ position: 'relative', width: '100%', maxHeight: '440px', overflow: 'hidden', background: '#0f172a' }}>
                  <img
                    src={ctx.image}
                    alt={selectedLesson.titleCn}
                    onClick={() => setSelectedImageModal({ src: ctx.image, title: selectedLesson.titleCn, subtitle: ctx.setting })}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '440px',
                      objectFit: 'cover',
                      display: 'block',
                      cursor: 'zoom-in',
                    }}
                    title="Bấm để phóng to ảnh minh họa"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.3) 60%, transparent 100%)',
                      padding: '24px 28px',
                      color: '#fff',
                    }}
                  >
                    <span style={{ fontSize: '11px', background: 'var(--primary)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase' }}>
                      BỐI CẢNH BÀI {selectedLesson.number}
                    </span>
                    <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '6px 0 2px' }}>
                      {ctx.setting}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#e2e8f0', margin: 0 }}>
                      👥 Nhân vật: {ctx.characters}
                    </p>
                  </div>
                </div>

                {/* Chi Tiết Tình Huống Giao Tiếp & Kiến Thức */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div
                      style={{
                        background: 'var(--surface-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Sparkles size={16} color="var(--primary)" />
                        <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                          Mục Tiêu Giao Tiếp Bài Học
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                        {ctx.goal}
                      </p>
                    </div>

                    <div
                      style={{
                        background: 'rgba(245, 158, 11, 0.08)',
                        border: '1px solid rgba(245, 158, 11, 0.25)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <Bookmark size={16} color="#d97706" />
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#b45309' }}>
                          Góc Tri Thức Văn Hóa Trung Hoa
                        </span>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.6, margin: 0 }}>
                        {ctx.culturalNote}
                      </p>
                    </div>
                  </div>

                  {/* Nút Chuyển Nhanh Sang Học Bài Khóa & Ngữ Pháp */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setActiveSubTab('dialogue')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px' }}
                    >
                      <MessageSquare size={16} /> Đọc Bài Khóa Ngữ Cảnh Này ➔
                    </button>

                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setActiveSubTab('grammar')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px' }}
                    >
                      <BookOpen size={16} /> Xem Ngữ Pháp "小语讲堂"
                    </button>

                    {courseLevel === 'HSK2' && (
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {
                          handleSelectTrack(0);
                          setActiveSubTab('audio');
                        }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px' }}
                      >
                        <Headphones size={16} /> Nghe Audio Bài Khóa (Track 1)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* SUBTAB PINYIN: HÁN NGỮ NGỮ ÂM & PHÁT ÂM */}
          {activeSubTab === 'pinyin' && (
            <div style={{ marginBottom: '20px' }}>
              <PinyinMasterStudio
                onOpenChatAI={onOpenChatAI}
                onNavigateTab={onNavigateTab}
              />
            </div>
          )}

          {/* SUBTAB 1: NGỮ PHÁP TIỂU NGỮ (小语讲堂) */}
          {activeSubTab === 'grammar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Easy Mode & Gamified Helper Sleek Strip */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>🦉</span>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-heading)' }}>
                    Mẹo so sánh & Phản xạ 5s
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsEasyMode((prev) => !prev)}
                    style={{
                      background: isEasyMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                      color: isEasyMode ? '#10b981' : 'var(--text-dim)',
                      border: `1px solid ${isEasyMode ? '#10b981' : 'var(--border)'}`,
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    title="Bật/Tắt giải thích mẹo tương đồng tiếng Việt"
                  >
                    {isEasyMode ? '✓ Đang Bật Mẹo' : '○ Chế độ chuẩn'}
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab('duo_path')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: '#58CC02',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '12px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      🎮 Sang Duolingo
                    </button>
                  )}

                  {onOpenChatAI && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenChatAI(
                          `Hãy tóm tắt ngắn gọn và giải thích các điểm ngữ pháp của bài "${selectedLesson.titleCn}" bằng ngôn ngữ thật đời sống, dí dỏm, dễ hiểu như kể chuyện cho người mới bắt đầu học tiếng Trung nhé!`
                        )
                      }
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'var(--surface-card)',
                        color: '#f59e0b',
                        fontWeight: 700,
                        fontSize: '12px',
                        border: '1px solid rgba(245, 158, 11, 0.4)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Sparkles size={13} color="#f59e0b" /> Hỏi AI
                    </button>
                  )}
                </div>
              </div>

              {grammarDetail?.grammarPoints.map((point: GrammarPoint, idx: number) => {
                const isPointDone = completedGrammar.includes(point.id);

                return (
                  <div
                    key={point.id}
                    style={{
                      background: 'var(--surface)',
                      border: `1.5px solid ${isPointDone ? '#10b981' : 'var(--border)'}`,
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: isPointDone ? '0 4px 16px rgba(16, 185, 129, 0.15)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            background: isPointDone ? '#10b981' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '13px',
                          }}
                        >
                          {isPointDone ? '✓' : idx + 1}
                        </span>
                        <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-heading)', margin: 0 }}>
                          {point.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleGrammarCompleted(point.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: isPointDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          color: isPointDone ? '#34d399' : 'var(--text-muted)',
                          border: `1px solid ${isPointDone ? '#10b981' : 'var(--border)'}`,
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        <CheckCircle2 size={14} color={isPointDone ? '#34d399' : 'currentColor'} />
                        {isPointDone ? 'Đã Nắm Vững (✓)' : 'Đánh dấu đã hiểu'}
                      </button>
                    </div>

                    {/* Khung công thức — Rich highlighted */}
                    {point.formula && (
                      <div
                        className="grammar-formula-box"
                        style={{
                          background: 'rgba(217, 56, 56, 0.1)',
                          borderLeft: '4px solid var(--primary)',
                          padding: '14px 18px',
                          borderRadius: '0 10px 10px 0',
                          marginBottom: '14px',
                        }}
                      >
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          📐 CÔNG THỨC CÚ PHÁP:
                        </span>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginTop: '4px', lineHeight: 1.6 }}>
                          {renderFormula(point.formula)}
                        </div>
                      </div>
                    )}

                    {/* Giải thích lý thuyết */}
                    <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6, marginBottom: '16px' }}>
                      {point.explanation}
                    </p>

                    {/* Ví dụ mẫu — với grammar highlight & pinyin tone colors */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                          📖 CÂU VÍ DỤ SONG NGỮ:
                        </span>
                        <ToneLegend compact />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(() => {
                          const grammarKeys = extractHighlightKeysFromFormula(point.formula);
                          return point.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="grammar-example-card"
                              style={{
                                background: 'var(--surface-card)',
                                borderRadius: '10px',
                                padding: '14px 16px',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'border-color 0.2s, box-shadow 0.2s',
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                {/* Chinese text with grammar keyword highlights */}
                                <div style={{ fontFamily: 'var(--font-hanzi)', fontSize: '17px', fontWeight: 700, color: 'var(--text-heading)', lineHeight: 1.5 }}>
                                  {highlightGrammarInChinese(ex.cn, grammarKeys)}
                                </div>
                                {/* Pinyin with tone-based color coding */}
                                <div style={{ marginTop: '4px' }}>
                                  {renderColoredPinyin(ex.pinyin, '13px')}
                                </div>
                                {/* Vietnamese translation */}
                                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px', lineHeight: 1.4 }}>
                                  {ex.vi}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => speak(ex.cn)}
                                className="grammar-speak-btn"
                                style={{
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: '50%',
                                  background: 'rgba(56, 189, 248, 0.12)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#38bdf8',
                                  flexShrink: 0,
                                  border: '1px solid rgba(56, 189, 248, 0.2)',
                                  cursor: 'pointer',
                                  transition: 'all 0.2s ease',
                                }}
                                title="🔊 Nghe phát âm câu này"
                              >
                                <Volume2 size={16} />
                              </button>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                    {/* Bẫy đề thi */}
                    {point.pitfall && (
                      <div
                        style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '8px',
                          padding: '12px 14px',
                          display: 'flex',
                          gap: '10px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <AlertTriangle size={18} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ fontSize: '13px', color: '#fde68a', lineHeight: 1.5 }}>
                          <strong>Lưu ý đề thi & Bẫy thường gặp:</strong> {point.pitfall}
                        </div>
                      </div>
                    )}

                    {/* BÍ KÍP HỌC SIÊU DỄ & THỬ THÁCH 5 GIÂY */}
                    {isEasyMode && (
                      <GrammarEasyHelper
                        point={point}
                        lessonNumber={selectedLesson.number}
                        lessonTitle={selectedLesson.titleCn}
                        onAskAI={onOpenChatAI}
                        onNavigateTab={onNavigateTab}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SUBTAB 2: 120 FILE AUDIO BẢN XỨ (HSK 2) */}
          {activeSubTab === 'audio' && courseLevel === 'HSK2' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Player Audio */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.98))',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                <audio
                  ref={audioRef}
                  src={audioSrc}
                  onEnded={() => {
                    setIsPlaying(false);
                    if (currentTrack) toggleTrackCompleted(currentTrack.trackNumber);
                  }}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                      ĐANG PHÁT AUDIO BẢN XỨ TỪ DRIVE:
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '2px 0' }}>
                      {currentTrack ? currentTrack.label : 'Chọn bài nghe'}
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                      Track {currentTrack?.trackNumber} · File: <code>{currentTrack?.file}</code>
                    </span>
                  </div>

                  {/* Chỉnh tốc độ */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Tốc độ:</span>
                    {[0.75, 1.0, 1.25].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => changeRate(r)}
                        style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: playbackRate === r ? '#0284c7' : 'rgba(255, 255, 255, 0.05)',
                          color: '#fff',
                        }}
                      >
                        {r}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nút điều khiển Play/Pause/Tua */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '14px 0' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime -= 5;
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                    title="Lùi lại 5 giây"
                  >
                    <Rewind size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(217, 56, 56, 0.4)',
                    }}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: '2px' }} />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (audioRef.current) audioRef.current.currentTime += 5;
                    }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                    }}
                    title="Tiến lên 5 giây"
                  >
                    <FastForward size={18} />
                  </button>
                </div>
              </div>

              {/* KHUNG LỜI THOẠI & GIẢI THÍCH NỘI DUNG AUDIO CHI TIẾT */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>📜</span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)' }}>
                        Lời Thoại & Giải Thích Chi Tiết: {currentTrack ? currentTrack.label : 'Chọn track để xem'}
                      </h4>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Đồng bộ chuẩn giáo trình CTI & Đài phát thanh Bắc Kinh
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {onOpenChatAI && currentTrack && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenChatAI(
                            `Tôi đang nghe Track Audio ${currentTrack.trackNumber}: "${currentTrack.label}" của Bài ${selectedLesson.number} ("${selectedLesson.titleCn}"). Hãy giải thích chi tiết nội dung đoạn nghe này, phân tích các từ vựng trọng tâm, điểm ngữ pháp và lưu ý phát âm/biến điệu cần nhớ!`
                          )
                        }
                        style={{
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: 'rgba(2, 132, 199, 0.1)',
                          border: '1px solid rgba(2, 132, 199, 0.3)',
                          color: '#0284c7',
                          fontWeight: 700,
                          fontSize: '12px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        <Sparkles size={14} color="#0284c7" /> Hỏi AI Phân Tích Track Này
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveSubTab('dialogue')}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: 'var(--surface-hover)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-heading)',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Mở Bài Khóa Đầy Đủ ➔
                    </button>
                  </div>
                </div>

                {/* Phân loại nội dung hiển thị theo loại Track */}
                {(() => {
                  const trackLabel = currentTrack?.label?.toLowerCase() || '';
                  const trackNum = currentTrack?.trackNumber || '';

                  // Trường hợp 1: Track Bài khóa / Hội thoại
                  if (trackLabel.includes('bài khóa') || trackLabel.includes('hội thoại') || trackNum.endsWith('-1') || trackNum.endsWith('-3') || trackNum.endsWith('-5')) {
                    const lines = grammarDetail?.dialogue?.lines || [];

                    return (
                      <div>
                        <div
                          style={{
                            background: 'rgba(56, 189, 248, 0.08)',
                            borderLeft: '4px solid #0284c7',
                            padding: '10px 14px',
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '16px',
                            fontSize: '12px',
                            color: 'var(--text-heading)',
                          }}
                        >
                          <strong>💡 Hướng Dẫn Nghe Hiệu Quả:</strong> Đoạn audio này là bài đọc hội thoại tình huống. Vừa nghe phát thanh viên đọc, bạn hãy đối chiếu từng dòng chữ Hán và Pinyin bên dưới để rèn luyện thính giác nhận diện mặt chữ!
                        </div>

                        {lines.length > 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {lines.map((l: any, idx: number) => (
                              <div
                                key={idx}
                                style={{
                                  padding: '12px 14px',
                                  background: 'var(--surface-card)',
                                  borderRadius: '10px',
                                  border: '1px solid var(--border)',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '12px',
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: '11px',
                                    fontWeight: 800,
                                    background: l.speaker === 'A' ? '#0284c7' : '#d97706',
                                    color: '#fff',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    marginTop: '2px',
                                  }}
                                >
                                  {l.name || l.speaker}
                                </span>
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontFamily: 'var(--font-hanzi)', fontSize: '17px', fontWeight: 700, color: 'var(--text-heading)' }}>
                                    {l.cn}
                                  </div>
                                  <div style={{ fontSize: '13px', marginTop: '2px' }}>
                                    {renderColoredPinyin(l.pinyin, '13px')}
                                  </div>
                                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    {l.vi}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => speak(l.cn)}
                                  style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: 'var(--surface-hover)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--text-heading)',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                  }}
                                  title="Nghe lại câu này"
                                >
                                  <Volume2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                            Đang tải lời thoại bài khóa... Bạn có thể chuyển sang tab "Bài Khóa & Hội Thoại" để đọc trọn bộ.
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Trường hợp 2: Track Từ vựng (New Words)
                  if (trackLabel.includes('từ vựng') || trackLabel.includes('new words') || trackNum.endsWith('-2') || trackNum.endsWith('-4')) {
                    const vocabList = grammarDetail?.keyVocab || [];

                    return (
                      <div>
                        <div
                          style={{
                            background: 'rgba(16, 185, 129, 0.08)',
                            borderLeft: '4px solid #10b981',
                            padding: '10px 14px',
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '16px',
                            fontSize: '12px',
                            color: 'var(--text-heading)',
                          }}
                        >
                          <strong>💡 Hướng Dẫn Nghe Từ Vựng:</strong> Phát thanh viên đọc từng từ 2 lần. Lần 1: Nghe chuẩn thanh điệu 4 thanh; Lần 2: Mở miệng đọc to lặp lại theo (Shadowing)!
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                          {vocabList.map((v: any, vIdx: number) => (
                            <div
                              key={vIdx}
                              style={{
                                padding: '10px 14px',
                                background: 'var(--surface-card)',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <div>
                                <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '18px', fontWeight: 800, color: 'var(--text-heading)' }}>
                                  {v.hanzi}
                                </span>
                                <div style={{ fontSize: '12px', fontWeight: 700 }}>
                                  {renderColoredPinyin(v.pinyin, '12px')}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                  {v.meaning}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => speak(v.hanzi)}
                                style={{
                                  width: '28px',
                                  height: '28px',
                                  borderRadius: '50%',
                                  background: 'var(--surface-hover)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text-heading)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                }}
                                title="Phát âm từ này"
                              >
                                <Volume2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Trường hợp 3: Track Ngữ pháp / Tiểu Ngữ giảng đường
                  if (trackLabel.includes('tiểu ngữ') || trackLabel.includes('ngữ pháp') || trackNum.endsWith('-6')) {
                    const points = grammarDetail?.grammarPoints || [];

                    return (
                      <div>
                        <div
                          style={{
                            background: 'rgba(217, 56, 56, 0.08)',
                            borderLeft: '4px solid #d93838',
                            padding: '10px 14px',
                            borderRadius: '0 8px 8px 0',
                            marginBottom: '16px',
                            fontSize: '12px',
                            color: 'var(--text-heading)',
                          }}
                        >
                          <strong>💡 Trọng Điểm Ngữ Pháp Đang Giảng:</strong> Audio này hướng dẫn chi tiết các cấu trúc ngữ pháp then chốt của bài.
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {points.map((pt: any, pIdx: number) => (
                            <div
                              key={pIdx}
                              style={{
                                padding: '14px',
                                background: 'var(--surface-card)',
                                borderRadius: '10px',
                                border: '1px solid var(--border)',
                              }}
                            >
                              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '4px' }}>
                                {pt.title}
                              </div>
                              {pt.formula && (
                                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', background: 'rgba(217, 56, 56, 0.06)', padding: '6px 10px', borderRadius: '6px', marginBottom: '6px' }}>
                                  📐 {pt.formula}
                                </div>
                              )}
                              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                {pt.explanation}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Mặc định: Track Luyện tập / Hoạt động
                  return (
                    <div
                      style={{
                        background: 'var(--surface-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        lineHeight: 1.6,
                        fontSize: '13px',
                        color: 'var(--text-heading)',
                      }}
                    >
                      <h5 style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)' }}>
                        🎧 Trọng Tâm Luyện Nghe Bài {selectedLesson.number}
                      </h5>
                      <p style={{ margin: '0 0 10px', color: 'var(--text-muted)' }}>
                        Track audio này chứa các bài tập nghe hiểu câu hỏi trắc nghiệm, luyện thanh điệu và mở rộng phản xạ ngữ âm của sách giáo khoa chuẩn FLTRP.
                      </p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => setActiveSubTab('dialogue')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: '#0284c7',
                            border: 'none',
                            color: '#fff',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Đọc Lời Thoại Bài Khóa
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveSubTab('pdf')}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'var(--surface-hover)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-heading)',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          Mở Sách Scan PDF để xem câu hỏi gốc
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Danh sách các Tracks của bài */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '20px',
                }}
              >
                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '14px' }}>
                  DANH SÁCH {selectedLesson.tracks?.length || 0} TRACKS AUDIO CỦA BÀI {selectedLesson.number}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedLesson.tracks?.map((track, tIdx) => {
                    const isCur = tIdx === currentTrackIndex;
                    const isDone = completedTracks.includes(track.trackNumber);

                    return (
                      <div
                        key={track.trackNumber}
                        onClick={() => handleSelectTrack(tIdx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          background: isCur ? 'rgba(2, 132, 199, 0.12)' : 'var(--surface-card)',
                          border: `1.5px solid ${isCur ? '#0284c7' : 'var(--border)'}`,
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: isCur ? '#0284c7' : 'var(--surface-hover)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: isCur ? '#fff' : 'var(--text-heading)',
                              fontWeight: 700,
                              fontSize: '12px',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {isCur && isPlaying ? '▶' : track.trackNumber.split('-')[1]}
                          </span>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 700, color: isCur ? '#0284c7' : 'var(--text-heading)' }}>
                              {track.label}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>
                              File: {track.file}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {isDone && (
                            <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                              ✓ Đã nghe
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTrackCompleted(track.trackNumber);
                            }}
                            style={{
                              padding: '4px 8px',
                              fontSize: '11px',
                              color: 'var(--text-dim)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                            }}
                            title="Đánh dấu đã nghe hoặc chưa nghe"
                          >
                            {isDone ? 'Bỏ dấu' : 'Đánh dấu'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* SUBTAB 3: TỪ VỰNG MỚI (生词) */}
          {activeSubTab === 'vocab' && (
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '24px',
              }}
            >
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)', marginBottom: '16px' }}>
                BẢNG TỪ VỰNG MỚI (生词) BÀI {selectedLesson.number}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {grammarDetail?.keyVocab.map((vocab: any, vIdx: number) => (
                  <div
                    key={vIdx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 18px',
                      background: 'var(--surface-card)',
                      borderRadius: '10px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-hanzi)',
                          fontSize: '22px',
                          fontWeight: 700,
                          color: 'var(--text-heading)',
                          minWidth: '70px',
                        }}
                      >
                        {vocab.hanzi}
                      </span>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>
                          {renderColoredPinyin(vocab.pinyin, '14px')}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
                          Âm Hán-Việt: <strong>{vocab.hanViet}</strong>
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--text)', marginLeft: '16px' }}>
                        {vocab.meaning}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => speak(vocab.hanzi)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--surface-hover)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-heading)',
                        cursor: 'pointer',
                      }}
                      title="Phát âm từ này"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTAB 4: HỘI THOẠI BÀI KHÓA (课文) - KÈM HÌNH ẢNH MINH HỌA NGỮ CẢNH RÕ RÀNG */}
          {activeSubTab === 'dialogue' && (() => {
            const ctx = getLessonContext(courseLevel, selectedLesson.number);
            const lines = grammarDetail?.dialogue?.lines || [];

            return (
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* 1. Tranh Minh Họa Ngữ Cảnh Nổi Bật của Bài Hội Thoại */}
                <div
                  style={{
                    borderRadius: '14px',
                    overflow: 'hidden',
                    marginBottom: '24px',
                    border: '1px solid var(--border)',
                    position: 'relative',
                    background: '#090d16',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '260px', overflow: 'hidden' }}>
                    <img
                      src={ctx.image}
                      alt={selectedLesson.titleCn}
                      onClick={() => setSelectedImageModal({ src: ctx.image, title: selectedLesson.titleCn, subtitle: ctx.setting })}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        cursor: 'zoom-in',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                    />

                    {/* Nút phóng to ảnh minh họa */}
                    <button
                      type="button"
                      onClick={() => setSelectedImageModal({ src: ctx.image, title: selectedLesson.titleCn, subtitle: ctx.setting })}
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        background: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(8px)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <Eye size={14} /> Phóng to tranh minh họa
                    </button>

                    {/* Overlay thông tin tình huống giao tiếp */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(10, 15, 30, 0.95) 0%, rgba(10, 15, 30, 0.6) 60%, transparent 100%)',
                        padding: '16px 22px',
                        color: '#fff',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '11px', background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>
                          {courseLevel} • BÀI {selectedLesson.number}
                        </span>
                        <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 700 }}>
                          📍 {ctx.setting}
                        </span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#f1f5f9' }}>
                        👥 Nhân vật trong tranh: <span style={{ color: '#fed7aa' }}>{ctx.characters}</span>
                      </div>
                    </div>
                  </div>

                  {/* Thanh tóm tắt mục tiêu giao tiếp */}
                  <div
                    style={{
                      background: 'rgba(15, 23, 42, 0.03)',
                      padding: '12px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={14} color="var(--primary)" />
                      <span><strong>Tình huống:</strong> {ctx.goal}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveSubTab('context')}
                      style={{
                        fontSize: '12px',
                        color: 'var(--primary)',
                        background: 'transparent',
                        border: 'none',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Xem chi tiết bối cảnh & văn hóa ➔
                    </button>
                  </div>
                </div>

                {/* 2. Thanh Điều Khiển Nghe & Phát Âm Hội Thoại */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                    marginBottom: '20px',
                    padding: '14px 18px',
                    background: 'var(--surface-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)', margin: '0 0 2px' }}>
                      {grammarDetail?.dialogue?.title || 'Bài khóa hội thoại giao tiếp'}
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Gồm {lines.length} lượt thoại chuẩn ngữ âm • Hình ảnh minh họa trực quan
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    {/* Bộ chỉnh tốc độ giọng đọc */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--surface)', padding: '4px 8px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Tốc độ:</span>
                      {[0.8, 1.0, 1.2].map((spd) => (
                        <button
                          key={spd}
                          type="button"
                          onClick={() => setDialogueSpeed(spd)}
                          style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            border: 'none',
                            fontSize: '11px',
                            fontWeight: 700,
                            background: dialogueSpeed === spd ? 'var(--primary)' : 'transparent',
                            color: dialogueSpeed === spd ? '#fff' : 'var(--text-muted)',
                            cursor: 'pointer',
                          }}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    {/* Nút phát toàn bộ hội thoại */}
                    {isPlayingDialogue ? (
                      <button
                        type="button"
                        onClick={stopDialogueAudio}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: '#ef4444',
                          color: '#fff',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <Pause size={15} /> Dừng đọc
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => playWholeDialogue(lines)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          background: 'var(--primary)',
                          color: '#fff',
                          border: 'none',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        <Play size={15} /> Phát toàn bộ bài khóa
                      </button>
                    )}

                    {courseLevel === 'HSK2' && (
                      <button
                        type="button"
                        onClick={() => {
                          handleSelectTrack(0);
                          setActiveSubTab('audio');
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          background: 'rgba(56, 189, 248, 0.12)',
                          color: '#0284c7',
                          border: '1px solid rgba(56, 189, 248, 0.3)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        <Headphones size={14} /> Nghe Audio gốc (CD)
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Danh Sách Lượt Thoại Kèm Avatar Nhân Vật & Phát Âm Từng Câu */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {lines.map((line: any, lIdx: number) => {
                    const isSpeakingThisLine = activeLineIndex === lIdx || speakingText === line.cn;
                    const isSpeakerA = line.speaker === 'A' || line.speaker === '白家月' || line.speaker === 'AI 小语' || line.speaker === 'AI Tiểu Ngữ';

                    return (
                      <div
                        key={lIdx}
                        style={{
                          display: 'flex',
                          gap: '14px',
                          alignItems: 'flex-start',
                          background: isSpeakingThisLine
                            ? 'rgba(56, 189, 248, 0.12)'
                            : isSpeakerA
                            ? 'rgba(56, 189, 248, 0.04)'
                            : 'rgba(245, 158, 11, 0.04)',
                          border: isSpeakingThisLine
                            ? '2px solid var(--primary)'
                            : `1px solid ${isSpeakerA ? 'rgba(56, 189, 248, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                          borderRadius: '14px',
                          padding: '16px',
                          transition: 'all 0.2s ease',
                          boxShadow: isSpeakingThisLine ? '0 4px 14px rgba(2, 132, 199, 0.15)' : 'none',
                        }}
                      >
                        {/* Avatar Nhân Vật */}
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: isSpeakerA ? '#0284c7' : '#d97706',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '13px',
                            flexShrink: 0,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          }}
                        >
                          {line.speaker.slice(0, 2)}
                        </div>

                        {/* Nội dung câu thoại */}
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: isSpeakerA ? '#0284c7' : '#d97706' }}>
                              {line.name || line.speaker}
                            </span>
                            {isSpeakingThisLine && (
                              <span style={{ fontSize: '10px', background: 'var(--primary)', color: '#fff', padding: '1px 6px', borderRadius: '10px', fontWeight: 700 }}>
                                Đang phát...
                              </span>
                            )}
                          </div>

                          <div
                            onClick={() => speak(line.cn)}
                            style={{
                              fontFamily: 'var(--font-hanzi)',
                              fontSize: '18px',
                              fontWeight: 700,
                              color: 'var(--text-heading)',
                              cursor: 'pointer',
                              display: 'inline-block',
                            }}
                            title="Bấm để nghe phát âm câu này"
                          >
                            {line.cn}
                          </div>

                          <div style={{ marginTop: '3px' }}>
                            {renderColoredPinyin(line.pinyin, '13px')}
                          </div>

                          <div style={{ fontSize: '13px', color: 'var(--text)', marginTop: '4px', opacity: 0.9 }}>
                            {line.vi}
                          </div>
                        </div>

                        {/* Nút phát âm từng dòng */}
                        <button
                          type="button"
                          onClick={() => speak(line.cn)}
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: isSpeakingThisLine ? 'var(--primary)' : 'var(--surface)',
                            color: isSpeakingThisLine ? '#fff' : 'var(--text-dim)',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            flexShrink: 0,
                            transition: 'all 0.2s',
                          }}
                          title="Phát âm câu này"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* SUBTAB 5: XEM SÁCH GIÁO KHOA GỐC PDF (DRIVE) */}
          {activeSubTab === 'pdf' && (
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16} color="#38bdf8" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-heading)' }}>
                    Sách Giáo Khoa Gốc: {courseLevel === 'HSK1' ? 'New HSK Course 1 (144 trang)' : 'New HSK Course 2 (162 trang)'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href={pdfPath}
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      textDecoration: 'underline',
                    }}
                  >
                    <Download size={13} /> Tải về máy
                  </a>
                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      color: '#38bdf8',
                      textDecoration: 'underline',
                    }}
                  >
                    <ExternalLink size={13} /> Mở toàn màn hình
                  </a>
                </div>
              </div>

              <div style={{ height: '680px', width: '100%', background: '#1e293b' }}>
                <iframe
                  src={`${pdfPath}#toolbar=1`}
                  title="PDF Viewer"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Lightbox Modal phóng to ảnh minh họa ngữ cảnh */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '92vw',
              maxHeight: '90vh',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0f172a',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              cursor: 'default',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImageModal(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>
            <img
              src={selectedImageModal.src}
              alt={selectedImageModal.title}
              style={{
                width: 'auto',
                maxWidth: '92vw',
                height: 'auto',
                maxHeight: '76vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div
              style={{
                padding: '16px 24px',
                background: '#0f172a',
                color: '#fff',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '17px', fontWeight: 700 }}>
                  {selectedImageModal.title}
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                  📍 {selectedImageModal.subtitle}
                </p>
              </div>
              <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.12)', padding: '5px 12px', borderRadius: '6px', fontWeight: 600 }}>
                Ảnh Minh Họa Bối Cảnh Giao Tiếp
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
