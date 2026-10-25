import React, { useState } from 'react';
import {
  Volume2,
  Sparkles,
  Award,
  Zap,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
  VolumeX,
  HelpCircle,
} from 'lucide-react';
import { soundEffects } from '../services/audioSynthesizer';
import { TONE_COLORS } from '../services/highlightUtils';

interface PinyinMasterStudioProps {
  onOpenChatAI?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
}

type StudioTab = 'initials' | 'finals' | 'tones' | 'rules' | 'trainer';

// 1. DATA: 23 THANH MẪU (INITIALS)
interface InitialItem {
  pinyin: string;
  charName: string; // Tên âm chuẩn
  ipa: string;
  group: string;
  isAspirated?: boolean; // Bật hơi
  isRetroflex?: boolean; // Uốn lưỡi
  vietnameseEquivalent: string;
  mouthGuide: string;
  examples: { hanzi: string; pinyin: string; viet: string }[];
}

const INITIALS_DATA: { groupTitle: string; desc: string; items: InitialItem[] }[] = [
  {
    groupTitle: '1. Nhóm Âm Hai Môi & Răng Môi (双唇与唇齿音)',
    desc: 'Tập trung vào sự đóng mở của 2 môi và răng cửa trên chạm môi dưới',
    items: [
      {
        pinyin: 'b',
        charName: 'bō (波)',
        ipa: '[p]',
        group: 'Hai môi',
        vietnameseEquivalent: 'Gần giống "p" tiếng Việt nhưng KHÔNG bật hơi, không rung dây thanh',
        mouthGuide: 'Hai môi khép chặt, luồng hơi phá vỡ sức cản thoát ra tự nhiên, không bật hơi mạnh.',
        examples: [
          { hanzi: '八', pinyin: 'bā', viet: 'Số 8' },
          { hanzi: '爸爸', pinyin: 'bàba', viet: 'Bố' },
          { hanzi: '包子', pinyin: 'bāozi', viet: 'Bánh bao' },
        ],
      },
      {
        pinyin: 'p',
        charName: 'pō (坡)',
        ipa: '[pʰ]',
        group: 'Hai môi',
        isAspirated: true,
        vietnameseEquivalent: 'Âm "p" BẬT HƠI CỰC MẠNH (như bật hơi làm bay tờ giấy)',
        mouthGuide: 'Khẩu hình giống "b" nhưng nén hơi trong khoang miệng rồi bung mạnh ra ngoài.',
        examples: [
          { hanzi: '朋友', pinyin: 'péngyou', viet: 'Bạn bè' },
          { hanzi: '跑', pinyin: 'pǎo', viet: 'Chạy' },
          { hanzi: '苹果', pinyin: 'píngguǒ', viet: 'Quả táo' },
        ],
      },
      {
        pinyin: 'm',
        charName: 'mō (摸)',
        ipa: '[m]',
        group: 'Hai môi',
        vietnameseEquivalent: 'Giống chữ "m" trong tiếng Việt',
        mouthGuide: 'Hai môi khép nhẹ, luồng khí thoát ra qua khoang mũi, thanh đới rung rõ.',
        examples: [
          { hanzi: '妈妈', pinyin: 'māma', viet: 'Mẹ' },
          { hanzi: '买', pinyin: 'mǎi', viet: 'Mua' },
          { hanzi: '猫', pinyin: 'māo', viet: 'Con mèo' },
        ],
      },
      {
        pinyin: 'f',
        charName: 'fó (佛)',
        ipa: '[f]',
        group: 'Răng môi',
        vietnameseEquivalent: 'Giống chữ "ph" trong tiếng Việt',
        mouthGuide: 'Răng cửa hàm trên tiếp xúc nhẹ mép trong môi dưới, luồng hơi ma sát thoát ra.',
        examples: [
          { hanzi: '飞机', pinyin: 'fēijī', viet: 'Máy bay' },
          { hanzi: '饭', pinyin: 'fàn', viet: 'Cơm' },
          { hanzi: '非常', pinyin: 'fēicháng', viet: 'Rất, vô cùng' },
        ],
      },
    ],
  },
  {
    groupTitle: '2. Nhóm Âm Đầu Lưỡi Giữa (舌尖中音)',
    desc: 'Đầu lưỡi chạm chân răng hoặc lợi trên rồi hạ xuống',
    items: [
      {
        pinyin: 'd',
        charName: 'dé (得)',
        ipa: '[t]',
        group: 'Đầu lưỡi',
        vietnameseEquivalent: 'Giống chữ "t" trong tiếng Việt (KHÔNG phải "đ")',
        mouthGuide: 'Đầu lưỡi dán vào lợi hàm trên, bật nhẹ không bật luồng khí mạnh.',
        examples: [
          { hanzi: '大', pinyin: 'dà', viet: 'To, lớn' },
          { hanzi: '对', pinyin: 'duì', viet: 'Đúng' },
          { hanzi: '点', pinyin: 'diǎn', viet: 'Giờ / Điểm' },
        ],
      },
      {
        pinyin: 't',
        charName: 'tè (特)',
        ipa: '[tʰ]',
        group: 'Đầu lưỡi',
        isAspirated: true,
        vietnameseEquivalent: 'Gần giống chữ "th" tiếng Việt nhưng BẬT HƠI CỰC MẠNH',
        mouthGuide: 'Đầu lưỡi chạm lợi trên, nén hơi rồi bung dứt khoát luồng khí sắc nét.',
        examples: [
          { hanzi: '他', pinyin: 'tā', viet: 'Anh ấy' },
          { hanzi: '天', pinyin: 'tiān', viet: 'Trời / Ngày' },
          { hanzi: '听', pinyin: 'tīng', viet: 'Nghe' },
        ],
      },
      {
        pinyin: 'n',
        charName: 'nè (讷)',
        ipa: '[n]',
        group: 'Đầu lưỡi',
        vietnameseEquivalent: 'Giống chữ "n" trong tiếng Việt',
        mouthGuide: 'Đầu lưỡi chạm chân răng trên, hơi thoát qua khoang mũi, thanh đới rung.',
        examples: [
          { hanzi: '你', pinyin: 'nǐ', viet: 'Bạn / Cậu' },
          { hanzi: '那', pinyin: 'nà', viet: 'Kia, đó' },
          { hanzi: '年', pinyin: 'nián', viet: 'Năm' },
        ],
      },
      {
        pinyin: 'l',
        charName: 'lè (勒)',
        ipa: '[l]',
        group: 'Đầu lưỡi',
        vietnameseEquivalent: 'Giống chữ "l" trong tiếng Việt',
        mouthGuide: 'Đầu lưỡi chạm chân răng trên, hơi luồn qua hai bên mép lưỡi thoát ra.',
        examples: [
          { hanzi: '来', pinyin: 'lái', viet: 'Đến' },
          { hanzi: '冷', pinyin: 'lěng', viet: 'Lạnh' },
          { hanzi: '六', pinyin: 'liù', viet: 'Số 6' },
        ],
      },
    ],
  },
  {
    groupTitle: '3. Nhóm Âm Gốc Lưỡi / Cuống Lưỡi (舌根音)',
    desc: 'Gốc lưỡi nâng lên chạm ngạc mềm (phía sau vòm họng)',
    items: [
      {
        pinyin: 'g',
        charName: 'gē (哥)',
        ipa: '[k]',
        group: 'Cuống lưỡi',
        vietnameseEquivalent: 'Giống chữ "c/k" tiếng Việt (KHÔNG phải "g")',
        mouthGuide: 'Cuống lưỡi nâng chạm ngạc mềm, hạ xuống thoát hơi êm, KHÔNG bật hơi.',
        examples: [
          { hanzi: '高', pinyin: 'gāo', viet: 'Cao' },
          { hanzi: '个', pinyin: 'gè', viet: 'Cái / Chiếc' },
          { hanzi: '狗', pinyin: 'gǒu', viet: 'Con chó' },
        ],
      },
      {
        pinyin: 'k',
        charName: 'kē (科)',
        ipa: '[kʰ]',
        group: 'Cuống lưỡi',
        isAspirated: true,
        vietnameseEquivalent: 'Nằm giữa "kh" và "k", BẬT HƠI RẤT MẠNH từ sâu cổ họng',
        mouthGuide: 'Cuống lưỡi chạm ngạc mềm, chặn luồng khí rồi tống hơi sắc gọn ra ngoài.',
        examples: [
          { hanzi: '看', pinyin: 'kàn', viet: 'Xem / Nhìn' },
          { hanzi: '开', pinyin: 'kāi', viet: 'Mở / Lái xe' },
          { hanzi: '渴', pinyin: 'kě', viet: 'Khát nước' },
        ],
      },
      {
        pinyin: 'h',
        charName: 'hē (喝)',
        ipa: '[x]',
        group: 'Cuống lưỡi',
        vietnameseEquivalent: 'Nằm giữa "h" và "kh" nhẹ của tiếng Việt',
        mouthGuide: 'Cuống lưỡi nâng gần ngạc mềm tạo khe hở nhỏ cho luồng hơi cọ xát đi qua.',
        examples: [
          { hanzi: '好', pinyin: 'hǎo', viet: 'Tốt / Đẹp' },
          { hanzi: '和', pinyin: 'hé', viet: 'Và / Cùng' },
          { hanzi: '很', pinyin: 'hěn', viet: 'Rất' },
        ],
      },
    ],
  },
  {
    groupTitle: '4. Nhóm Âm Mặt Lưỡi / Tiền Vòm (舌面前音)',
    desc: 'Mặt lưỡi áp sát ngạc cứng trên (chỉ đi với các vận mẫu bắt đầu bằng "i" hoặc "ü")',
    items: [
      {
        pinyin: 'j',
        charName: 'jī (基/鸡)',
        ipa: '[tɕ]',
        group: 'Mặt lưỡi',
        vietnameseEquivalent: 'Gần giống "ch" nhẹ trong "chi" tiếng Việt, KHÔNG bật hơi',
        mouthGuide: 'Mặt lưỡi dán vào ngạc cứng, hai mép miệng kéo nhẹ sang hai bên, thoát hơi êm.',
        examples: [
          { hanzi: '家', pinyin: 'jiā', viet: 'Nhà' },
          { hanzi: '叫', pinyin: 'jiào', viet: 'Kêu / Gọi' },
          { hanzi: '九', pinyin: 'jiǔ', viet: 'Số 9' },
        ],
      },
      {
        pinyin: 'q',
        charName: 'qī (欺/七)',
        ipa: '[tɕʰ]',
        group: 'Mặt lưỡi',
        isAspirated: true,
        vietnameseEquivalent: 'Âm "ch" ép mặt lưỡi BẬT HƠI XÌ SẮC BÉN CỰC MẠNH',
        mouthGuide: 'Vị trí như "j" nhưng nén ép luồng khí trong miệng rồi xì bung mạnh qua kẽ lưỡi.',
        examples: [
          { hanzi: '去', pinyin: 'qù', viet: 'Đi' },
          { hanzi: '请', pinyin: 'qǐng', viet: 'Mời / Xin' },
          { hanzi: '钱', pinyin: 'qián', viet: 'Tiền' },
        ],
      },
      {
        pinyin: 'x',
        charName: 'xī (希/西)',
        ipa: '[ɕ]',
        group: 'Mặt lưỡi',
        vietnameseEquivalent: 'Gần giống "x" tiếng Việt nhưng mặt lưỡi dẹp áp sát vòm ngạc',
        mouthGuide: 'Mặt lưỡi nâng sát ngạc cứng, luồng hơi ma sát nhè nhẹ xì qua khe dẹp.',
        examples: [
          { hanzi: '谢谢', pinyin: 'xièxie', viet: 'Cảm ơn' },
          { hanzi: '想', pinyin: 'xiǎng', viet: 'Nghĩ / Muốn' },
          { hanzi: '小', pinyin: 'xiǎo', viet: 'Nhỏ' },
        ],
      },
    ],
  },
  {
    groupTitle: '5. Nhóm Âm Đầu Lưỡi Trước / Răng Thẳng (舌尖前音)',
    desc: 'Đầu lưỡi thẳng để sát mặt sau răng cửa trên (cắn hờ 2 hàm răng)',
    items: [
      {
        pinyin: 'z',
        charName: 'zī (资)',
        ipa: '[ts]',
        group: 'Đầu lưỡi trước',
        vietnameseEquivalent: 'Nằm giữa "d" và "gi" dẹt, KHÔNG bật hơi',
        mouthGuide: 'Đầu lưỡi thẳng chạm sau răng trên rồi tách nhẹ, hơi thoát ra êm ái.',
        examples: [
          { hanzi: '在', pinyin: 'zài', viet: 'Ở / Đang' },
          { hanzi: '字', pinyin: 'zì', viet: 'Chữ' },
          { hanzi: '再见', pinyin: 'zàijiàn', viet: 'Tạm biệt' },
        ],
      },
      {
        pinyin: 'c',
        charName: 'cī (疵/刺)',
        ipa: '[tsʰ]',
        group: 'Đầu lưỡi trước',
        isAspirated: true,
        vietnameseEquivalent: 'Vị trí răng như "z" nhưng BẬT HƠI XÌ NHỌN CỰC MẠNH',
        mouthGuide: 'Đầu lưỡi ép mặt sau răng trên, xì bung luồng hơi dứt khoát như tiếng "ts" sắc nhọn.',
        examples: [
          { hanzi: '菜', pinyin: 'cài', viet: 'Rau / Món ăn' },
          { hanzi: '从', pinyin: 'cóng', viet: 'Từ đâu đến' },
          { hanzi: '次', pinyin: 'cì', viet: 'Lần' },
        ],
      },
      {
        pinyin: 's',
        charName: 'sī (思/四)',
        ipa: '[s]',
        group: 'Đầu lưỡi trước',
        vietnameseEquivalent: 'Giống chữ "x" tiếng Việt (xì nhẹ thẳng đầu lưỡi)',
        mouthGuide: 'Đầu lưỡi thẳng gần sau răng trên, luồng hơi ma sát xì nhẹ qua kẽ răng.',
        examples: [
          { hanzi: '四', pinyin: 'sì', viet: 'Số 4' },
          { hanzi: '三', pinyin: 'sān', viet: 'Số 3' },
          { hanzi: '岁', pinyin: 'suì', viet: 'Tuổi' },
        ],
      },
    ],
  },
  {
    groupTitle: '6. Nhóm Âm Uốn Lưỡi Vòm Họng (舌尖后音 / 翘舌音)',
    desc: 'Đầu lưỡi uốn cong lên chạm hoặc gần chạm ngạc cứng (phía sau nướu răng)',
    items: [
      {
        pinyin: 'zh',
        charName: 'zhī (知/这)',
        ipa: '[tʂ]',
        group: 'Uốn lưỡi',
        isRetroflex: true,
        vietnameseEquivalent: 'Gần giống "tr" miền Nam nhưng cong lưỡi sâu hơn, KHÔNG bật hơi',
        mouthGuide: 'Đầu lưỡi uốn cong chạm ngạc cứng, hạ nhẹ xuống thoát khí êm.',
        examples: [
          { hanzi: '这', pinyin: 'zhè', viet: 'Đây, này' },
          { hanzi: '中', pinyin: 'zhōng', viet: 'Giữa / Trung' },
          { hanzi: '住', pinyin: 'zhù', viet: 'Sống, ở' },
        ],
      },
      {
        pinyin: 'ch',
        charName: 'chī (吃)',
        ipa: '[tʂʰ]',
        group: 'Uốn lưỡi',
        isAspirated: true,
        isRetroflex: true,
        vietnameseEquivalent: 'Uốn lưỡi cong lên và BẬT HƠI CỰC MẠNH',
        mouthGuide: 'Đầu lưỡi uốn cong ngạc cứng, nén hơi rồi bung mạnh luồng khí ra ngoài.',
        examples: [
          { hanzi: '吃', pinyin: 'chī', viet: 'Ăn' },
          { hanzi: '出', pinyin: 'chū', viet: 'Ra ngoài' },
          { hanzi: '茶', pinyin: 'chá', viet: 'Trà' },
        ],
      },
      {
        pinyin: 'sh',
        charName: 'shī (诗/是)',
        ipa: '[ʂ]',
        group: 'Uốn lưỡi',
        isRetroflex: true,
        vietnameseEquivalent: 'Gần giống chữ "s" miền Nam uốn lưỡi sâu',
        mouthGuide: 'Đầu lưỡi uốn cong gần ngạc cứng, hơi xát qua khe hẹp giữa lưỡi và vòm miệng.',
        examples: [
          { hanzi: '是', pinyin: 'shì', viet: 'Là / Vâng' },
          { hanzi: '水', pinyin: 'shuǐ', viet: 'Nước' },
          { hanzi: '书', pinyin: 'shū', viet: 'Sách' },
        ],
      },
      {
        pinyin: 'r',
        charName: 'rì (日)',
        ipa: '[ʐ]',
        group: 'Uốn lưỡi',
        isRetroflex: true,
        vietnameseEquivalent: 'Gần giống "r" tiếng Việt nhưng KHÔNG rung đầu lưỡi',
        mouthGuide: 'Đầu lưỡi uốn cong gần ngạc cứng, thanh đới rung mạnh tạo âm trầm đặc trưng.',
        examples: [
          { hanzi: '人', pinyin: 'rén', viet: 'Người' },
          { hanzi: '热', pinyin: 'rè', viet: 'Nóng' },
          { hanzi: '日', pinyin: 'rì', viet: 'Ngày / Mặt trời' },
        ],
      },
    ],
  },
  {
    groupTitle: '7. Bán Nguyên Âm / Phụ Âm Mở Đầu Đặc Biệt (零声母)',
    desc: 'Được dùng khi âm tiết bắt đầu bằng i hoặc u',
    items: [
      {
        pinyin: 'y',
        charName: 'yī (衣)',
        ipa: '[j]',
        group: 'Bán nguyên âm',
        vietnameseEquivalent: 'Đóng vai trò mở đầu cho nguyên âm "i" (ia -> ya, ie -> ye)',
        mouthGuide: 'Khẩu hình mở dẹt như đọc "i", thanh đới rung chuyển tiếp tự nhiên.',
        examples: [
          { hanzi: '一', pinyin: 'yī', viet: 'Số 1' },
          { hanzi: '有', pinyin: 'yǒu', viet: 'Có' },
          { hanzi: '月', pinyin: 'yuè', viet: 'Mặt trăng / Tháng' },
        ],
      },
      {
        pinyin: 'w',
        charName: 'wū (乌)',
        ipa: '[w]',
        group: 'Bán nguyên âm',
        vietnameseEquivalent: 'Đóng vai trò mở đầu cho nguyên âm "u" (ua -> wa, uo -> wo)',
        mouthGuide: 'Hai môi chu tròn mở đầu như phát âm "u" lướt sang nguyên âm sau.',
        examples: [
          { hanzi: '我', pinyin: 'wǒ', viet: 'Tôi' },
          { hanzi: '五', pinyin: 'wǔ', viet: 'Số 5' },
          { hanzi: '问', pinyin: 'wèn', viet: 'Hỏi' },
        ],
      },
    ],
  },
];

// 2. DATA: 36 VẬN MẪU (FINALS)
interface FinalItem {
  pinyin: string;
  charName: string;
  vietGuide: string;
  warningNote?: string;
  examples: { hanzi: string; pinyin: string; viet: string }[];
}

const FINALS_DATA: { category: string; desc: string; items: FinalItem[] }[] = [
  {
    category: '1. Vận Mẫu Đơn (6 Nguyên Âm Cơ Bản)',
    desc: 'Nền tảng của toàn bộ hệ thống phát âm tiếng Trung - Khẩu hình phải giữ nguyên từ đầu đến cuối',
    items: [
      {
        pinyin: 'a',
        charName: '啊 (ā)',
        vietGuide: 'Miệng mở to hết cỡ, lưỡi nằm tự nhiên đáy miệng (giống "a" tiếng Việt).',
        examples: [
          { hanzi: '八', pinyin: 'bā', viet: 'Số 8' },
          { hanzi: '妈', pinyin: 'mā', viet: 'Mẹ' },
        ],
      },
      {
        pinyin: 'o',
        charName: '喔 (ō)',
        vietGuide: 'Môi chu tròn, nằm giữa "ô" và "ua" tiếng Việt.',
        examples: [
          { hanzi: '波', pinyin: 'bō', viet: 'Sóng' },
          { hanzi: '坡', pinyin: 'pō', viet: 'Con dốc' },
        ],
      },
      {
        pinyin: 'e',
        charName: '鹅 (é)',
        vietGuide: 'Đọc là "ưa" (miệng mở rộng khóe môi kéo sang 2 bên như đang mỉm cười, không tròn môi).',
        warningNote: 'Rất nhiều người Việt đọc nhầm thành "e" hoặc "ơ" tròn môi.',
        examples: [
          { hanzi: '鹅', pinyin: 'é', viet: 'Con ngỗng' },
          { hanzi: '车', pinyin: 'chē', viet: 'Chiếc xe' },
        ],
      },
      {
        pinyin: 'i',
        charName: '衣 (yī)',
        vietGuide: 'Hai mép kéo dẹt sang hai bên, răng trên dưới đối nhau (giống "i" tiếng Việt).',
        warningNote: 'Khi đi với z, c, s, zh, ch, sh, r thì đọc là "ư" nhẹ!',
        examples: [
          { hanzi: '你', pinyin: 'nǐ', viet: 'Bạn' },
          { hanzi: '是', pinyin: 'shì', viet: 'Là (đọc là "sư")' },
        ],
      },
      {
        pinyin: 'u',
        charName: '乌 (wū)',
        vietGuide: 'Môi chu tròn thật nhỏ đưa về phía trước (giống "u" tiếng Việt).',
        examples: [
          { hanzi: '不', pinyin: 'bù', viet: 'Không' },
          { hanzi: '路', pinyin: 'lù', viet: 'Con đường' },
        ],
      },
      {
        pinyin: 'ü',
        charName: '迂 (yū)',
        vietGuide: 'Miệng chu tròn huýt sáo đọc "uy", KHẨU HÌNH TRÒN CỐ ĐỊNH KHÔNG THAY ĐỔI.',
        warningNote: 'Cực kỳ quan trọng: Phát âm "i" nhưng giữ nguyên môi tròn huýt sáo như "u".',
        examples: [
          { hanzi: '鱼', pinyin: 'yú', viet: 'Con cá' },
          { hanzi: '绿', pinyin: 'lǜ', viet: 'Màu xanh lá' },
        ],
      },
    ],
  },
  {
    category: '2. Vận Mẫu Kép (14 Nguyên Âm Ghép)',
    desc: 'Chuyển dịch khẩu hình từ âm trước lướt nhẹ sang âm sau',
    items: [
      { pinyin: 'ai', charName: '哀 (āi)', vietGuide: 'Đọc giống "ai" tiếng Việt.', examples: [{ hanzi: '爱', pinyin: 'ài', viet: 'Yêu' }, { hanzi: '白', pinyin: 'bái', viet: 'Trắng' }] },
      { pinyin: 'ei', charName: '诶 (ēi)', vietGuide: 'Đọc giống "ây" trong tiếng Việt.', examples: [{ hanzi: '累', pinyin: 'lèi', viet: 'Mệt' }, { hanzi: '黑', pinyin: 'hēi', viet: 'Đen' }] },
      { pinyin: 'ao', charName: '熬 (áo)', vietGuide: 'Đọc giống "ao" tiếng Việt.', examples: [{ hanzi: '高', pinyin: 'gāo', viet: 'Cao' }, { hanzi: '好', pinyin: 'hǎo', viet: 'Tốt' }] },
      { pinyin: 'ou', charName: '欧 (ōu)', vietGuide: 'Đọc giống "âu" hoặc "ô" trong tiếng Việt.', examples: [{ hanzi: '狗', pinyin: 'gǒu', viet: 'Con chó' }, { hanzi: '头', pinyin: 'tóu', viet: 'Cái đầu' }] },
      { pinyin: 'ia', charName: '呀 (yā)', vietGuide: 'Đọc là "i-a" lướt nhanh.', examples: [{ hanzi: '家', pinyin: 'jiā', viet: 'Gia đình' }, { hanzi: '下', pinyin: 'xià', viet: 'Dưới' }] },
      { pinyin: 'ie', charName: '耶 (yē)', vietGuide: 'Đọc là "i-ê" (không đọc i-e).', examples: [{ hanzi: '谢', pinyin: 'xiè', viet: 'Cảm ơn' }, { hanzi: '别', pinyin: 'bié', viet: 'Đừng' }] },
      { pinyin: 'iao', charName: '腰 (yāo)', vietGuide: 'Đọc là "i-ao" lướt nhanh.', examples: [{ hanzi: '小', pinyin: 'xiǎo', viet: 'Nhỏ' }, { hanzi: '叫', pinyin: 'jiào', viet: 'Gọi' }] },
      { pinyin: 'iu', charName: '优 (yōu)', vietGuide: 'Viết tắt của "iou", đọc là "i-âu".', examples: [{ hanzi: '六', pinyin: 'liù', viet: 'Số 6' }, { hanzi: '九', pinyin: 'jiǔ', viet: 'Số 9' }] },
      { pinyin: 'ua', charName: '蛙 (wā)', vietGuide: 'Đọc là "u-a" (oa).', examples: [{ hanzi: '花', pinyin: 'huā', viet: 'Hoa' }, { hanzi: '画', pinyin: 'huà', viet: 'Vẽ' }] },
      { pinyin: 'uo', charName: '窝 (wō)', vietGuide: 'Đọc là "u-ô" (uô).', examples: [{ hanzi: '桌', pinyin: 'zhuō', viet: 'Cái bàn' }, { hanzi: '过', pinyin: 'guò', viet: 'Đã qua' }] },
      { pinyin: 'uai', charName: '歪 (wāi)', vietGuide: 'Đọc là "u-ai" (oai).', examples: [{ hanzi: '快', pinyin: 'kuài', viet: 'Nhanh' }, { hanzi: '怪', pinyin: 'guài', viet: 'Kỳ quái' }] },
      { pinyin: 'ui', charName: '微 (wēi)', vietGuide: 'Viết tắt của "uei", đọc là "u-ây".', examples: [{ hanzi: '对', pinyin: 'duì', viet: 'Đúng' }, { hanzi: '水', pinyin: 'shuǐ', viet: 'Nước' }] },
      { pinyin: 'üe', charName: '约 (yuē)', vietGuide: 'Đọc là "uy-ê" (giữ tròn môi).', examples: [{ hanzi: '月', pinyin: 'yuè', viet: 'Tháng' }, { hanzi: '学', pinyin: 'xué', viet: 'Học' }] },
      { pinyin: 'er', charName: '儿 (ér)', vietGuide: 'Âm uốn lưỡi đặc trưng Bắc Kinh: đọc "ơ" rồi uốn cong lưỡi sâu vào trong họng.', examples: [{ hanzi: '二', pinyin: 'èr', viet: 'Số 2' }, { hanzi: '儿子', pinyin: 'érzi', viet: 'Con trai' }] },
    ],
  },
  {
    category: '3. Vận Mẫu Mũi (16 Âm Mũi Trước -n & Mũi Sau -ng)',
    desc: 'Hơi thoát qua khoang mũi tạo âm vang đặc trưng',
    items: [
      { pinyin: 'an', charName: '安 (ān)', vietGuide: 'Đọc giống "an" tiếng Việt.', examples: [{ hanzi: '看', pinyin: 'kàn', viet: 'Xem' }, { hanzi: '晚', pinyin: 'wǎn', viet: 'Muộn' }] },
      { pinyin: 'en', charName: '恩 (ēn)', vietGuide: 'Đọc giống "ân" tiếng Việt.', examples: [{ hanzi: '很', pinyin: 'hěn', viet: 'Rất' }, { hanzi: '门', pinyin: 'mén', viet: 'Cửa' }] },
      { pinyin: 'in', charName: '因 (yīn)', vietGuide: 'Đọc giống "in" tiếng Việt.', examples: [{ hanzi: '您', pinyin: 'nín', viet: 'Ngài' }, { hanzi: '新', pinyin: 'xīn', viet: 'Mới' }] },
      { pinyin: 'ün', charName: '晕 (yūn)', vietGuide: 'Đọc là "uyn" (giữ môi tròn huýt sáo).', examples: [{ hanzi: '云', pinyin: 'yún', viet: 'Mây' }, { hanzi: '裙子', pinyin: 'qúnzi', viet: 'Váy' }] },
      { pinyin: 'ian', charName: '烟 (yān)', vietGuide: 'LƯU Ý ĐẶC BIỆT: Đọc là "I-EN" (thiên tiān = thi-en, KHÔNG đọc thi-an).', warningNote: 'Lỗi phát âm phổ biến nhất của người học Việt Nam!', examples: [{ hanzi: '天', pinyin: 'tiān', viet: 'Trời' }, { hanzi: '见', pinyin: 'jiàn', viet: 'Gặp' }] },
      { pinyin: 'uan', charName: '弯 (wān)', vietGuide: 'Đọc là "u-an" (oan).', examples: [{ hanzi: '关', pinyin: 'guān', viet: 'Đóng' }, { hanzi: '短', pinyin: 'duǎn', viet: 'Ngắn' }] },
      { pinyin: 'üan', charName: '冤 (yuān)', vietGuide: 'Đọc là "uy-en" (giữ tròn môi).', examples: [{ hanzi: '远', pinyin: 'yuǎn', viet: 'Xa' }, { hanzi: '院', pinyin: 'yuàn', viet: 'Viện' }] },
      { pinyin: 'un', charName: '温 (wēn)', vietGuide: 'Viết tắt của "uen", đọc là "u-ân".', examples: [{ hanzi: '春', pinyin: 'chūn', viet: 'Mùa xuân' }, { hanzi: '准', pinyin: 'zhǔn', viet: 'Chuẩn' }] },
      { pinyin: 'ang', charName: '昂 (áng)', vietGuide: 'Đọc giống "ang" tiếng Việt.', examples: [{ hanzi: '忙', pinyin: 'máng', viet: 'Bận' }, { hanzi: '旁', pinyin: 'páng', viet: 'Bên cạnh' }] },
      { pinyin: 'eng', charName: '鞥 (ēng)', vietGuide: 'Đọc giống "âng" tiếng Việt.', examples: [{ hanzi: '冷', pinyin: 'lěng', viet: 'Lạnh' }, { hanzi: '朋', pinyin: 'péng', viet: 'Bạn' }] },
      { pinyin: 'ing', charName: '英 (yīng)', vietGuide: 'Đọc giống "ing" tiếng Việt.', examples: [{ hanzi: '明', pinyin: 'míng', viet: 'Sáng' }, { hanzi: '听', pinyin: 'tīng', viet: 'Nghe' }] },
      { pinyin: 'ong', charName: '轰 (hōng)', vietGuide: 'Đọc giống "ung" hoặc "ông".', examples: [{ hanzi: '中', pinyin: 'zhōng', viet: 'Trung' }, { hanzi: '红', pinyin: 'hóng', viet: 'Đỏ' }] },
      { pinyin: 'iang', charName: '央 (yāng)', vietGuide: 'Đọc là "i-ang" lướt nhanh.', examples: [{ hanzi: '想', pinyin: 'xiǎng', viet: 'Nghĩ' }, { hanzi: '亮', pinyin: 'liàng', viet: 'Sáng' }] },
      { pinyin: 'iong', charName: '庸 (yōng)', vietGuide: 'Đọc là "i-ung" lướt nhanh.', examples: [{ hanzi: '穷', pinyin: 'qióng', viet: 'Nghèo' }, { hanzi: '熊', pinyin: 'xióng', viet: 'Gấu' }] },
      { pinyin: 'uang', charName: '汪 (wāng)', vietGuide: 'Đọc là "u-ang" (oang).', examples: [{ hanzi: '光', pinyin: 'guāng', viet: 'Ánh sáng' }, { hanzi: '黄', pinyin: 'huáng', viet: 'Màu vàng' }] },
      { pinyin: 'ueng', charName: '翁 (wēng)', vietGuide: 'Đọc là "u-âng" (thường chỉ đứng độc lập viết thành weng).', examples: [{ hanzi: '翁', pinyin: 'wēng', viet: 'Ông lão' }] },
    ],
  },
];

// 3. DATA: 5 THANH ĐIỆU (TONES)
const TONES_DATA = [
  {
    tone: 1,
    name: 'Thanh 1 (Âm Bình - 阴平)',
    pitch: '5-5',
    color: '#ef4444',
    symbol: '— (mā)',
    char: '妈',
    pinyin: 'mā',
    meaning: 'Mẹ',
    description: 'Độ cao đỉnh 5 giữ bằng phẳng đến cuối, ngân dài trong trẻo như nốt Sol cao.',
    tip: 'Hãy giữ hơi đều, cao độ không được hạ xuống hay chao đảo!',
  },
  {
    tone: 2,
    name: 'Thanh 2 (Dương Bình - 阳平)',
    pitch: '3-5',
    color: '#f59e0b',
    symbol: '／ (má)',
    char: '麻',
    pinyin: 'má',
    meaning: 'Cây gai / Tê dại',
    description: 'Bắt đầu từ độ cao trung bình 3 vút thẳng lên đỉnh cao 5 (như giọng hỏi ngạc nhiên: "Hả?!").',
    tip: 'Tương tự dấu sắc tiếng Việt nhưng nhẹ hơn và âm điệu đi từ thấp vút lên cao.',
  },
  {
    tone: 3,
    name: 'Thanh 3 (Thượng Thanh - 上声)',
    pitch: '2-1-4',
    color: '#10b981',
    symbol: '∨ (mǎ)',
    char: '马',
    pinyin: 'mǎ',
    meaning: 'Con ngựa',
    description: 'Hạ sâu xuống đáy vực 1 rồi mới ngoắc vút lên cao 4 (đường cong hình chiếc võng).',
    tip: 'Trong thực tế giao tiếp, nếu đi trước thanh khác, người ta chỉ đọc nửa đầu hạ trầm (2-1) gọi là Nửa Thanh 3!',
  },
  {
    tone: 4,
    name: 'Thanh 4 (Khứ Thanh - 去声)',
    pitch: '5-1',
    color: '#0284c7',
    symbol: '＼ (mà)',
    char: '骂',
    pinyin: 'mà',
    meaning: 'Mắng / Chửi',
    description: 'Từ đỉnh cao 5 giáng thẳng dứt khoát xuống đáy 1 (như một nhát chém dứt khoát).',
    tip: 'KHÔNG PHẢI dấu huyền tiếng Việt! Dấu huyền đọc êm ái, còn Thanh 4 phải rơi cực mạnh và dứt khoát!',
  },
  {
    tone: 5,
    name: 'Thanh Nhẹ (Khinh Thanh - 轻声)',
    pitch: '· (ma)',
    color: '#64748b',
    symbol: '· (ma)',
    char: '吗',
    pinyin: 'ma',
    meaning: 'Hả / Chăng (Trợ từ nghi vấn)',
    description: 'Không mang dấu thanh điệu, phát âm ngắn, nhẹ như hạt sương rơi nhẹ trên lá.',
    tip: 'Thường gặp ở trợ từ (吗, 呢, 的, 了) hoặc âm tiết thứ hai của từ láy (bàba, māma).',
  },
];

// 4. DATA: QUY TẮC BIẾN ĐIỆU (TONE SANDHI)
const SANDHI_RULES = [
  {
    title: '1. Quy Tắc Hai Thanh 3 Đi Liền Nhau (3 + 3 ➔ 2 + 3)',
    formula: '∨ + ∨ ➔ ／ + ∨',
    desc: 'Khi hai âm tiết mang thanh 3 đi sát nhau, âm đầu tiên BẮT BUỘC biến thành thanh 2 (dấu sắc), âm sau giữ nguyên thanh 3.',
    examples: [
      { origin: 'nǐ hǎo (你好)', speakText: '你好', pronounced: 'ní hǎo', vi: 'Xin chào' },
      { origin: 'kěyǐ (可以)', speakText: '可以', pronounced: 'kéyǐ', vi: 'Có thể' },
      { origin: 'shǒubiǎo (手表)', speakText: '手表', pronounced: 'shóubiǎo', vi: 'Đồng hồ đeo tay' },
    ],
  },
  {
    title: '2. Quy Tắc Biến Điệu Của Chữ "不" (bù)',
    formula: '不 (bù) + Thanh 4 ➔ 不 (bú)',
    desc: 'Nguyên gốc chữ "不" là thanh 4 (bù). Khi đứng trước một từ cũng mang THANH 4, chữ "不" biến thành THANH 2 (bú) để tránh 2 nhát giáng liên tiếp.',
    examples: [
      { origin: 'bù shì (不是)', speakText: '不是', pronounced: 'bú shì', vi: 'Không phải' },
      { origin: 'bù yào (不要)', speakText: '不要', pronounced: 'bú yào', vi: 'Đừng / Không muốn' },
      { origin: 'bù duì (不对)', speakText: '不对', pronounced: 'bú duì', vi: 'Không đúng' },
      { origin: 'bù hǎo (不好 - trước thanh 3)', speakText: '不好', pronounced: 'bù hǎo (giữ nguyên)', vi: 'Không tốt' },
    ],
  },
  {
    title: '3. Quy Tắc Biến Điệu Của Chữ "一" (yī)',
    formula: '一: Đứng trước Thanh 4 ➔ yí; Đứng trước Thanh 1,2,3 ➔ yì',
    desc: 'Chữ "一" đọc đơn lẻ hoặc số đếm là thanh 1 (yī). Trước thanh 4 biến thành thanh 2 (yí). Trước thanh 1, 2, 3 biến thành thanh 4 (yì).',
    examples: [
      { origin: 'yī gè (一个 - trước thanh 4)', speakText: '一个', pronounced: 'yí gè', vi: 'Một cái' },
      { origin: 'yī yàng (一样 - trước thanh 4)', speakText: '一样', pronounced: 'yíyàng', vi: 'Giống nhau' },
      { origin: 'yī tiān (一天 - trước thanh 1)', speakText: '一天', pronounced: 'yì tiān', vi: 'Một ngày' },
      { origin: 'yī qǐ (一起 - trước thanh 3)', speakText: '一起', pronounced: 'yìqǐ', vi: 'Cùng nhau' },
    ],
  },
  {
    title: '4. Quy Tắc Bỏ Hai Dấu Chấm Của "ü"',
    formula: 'j, q, x, y + ü ➔ ju, qu, xu, yu (bỏ 2 chấm nhưng đọc vẫn là ü tròn môi)',
    desc: 'Khi vận mẫu "ü" ghép với "j, q, x" hoặc đi với bán nguyên âm "y", trên chữ viết bỏ hai dấu chấm nhưng khi ĐỌC VẪN PHẢI GIỮ NGUYÊN KHẨU HÌNH TRÒN MÔI HUÝT SÁO!',
    examples: [
      { origin: 'j + ü ➔ 居', speakText: '居', pronounced: 'jū (nghe như jüy)', vi: 'Cư trú' },
      { origin: 'q + ü ➔ 去', speakText: '去', pronounced: 'qù (nghe như qùy bật hơi)', vi: 'Đi' },
      { origin: 'x + ü ➔ 需', speakText: '需', pronounced: 'xū (nghe như xüy)', vi: 'Cần thiết' },
      { origin: 'y + ü ➔ 雨', speakText: '雨', pronounced: 'yǔ (nghe như yǚ)', vi: 'Cơn mưa' },
    ],
  },
  {
    title: '5. Thứ Tự Ưu Tiên Đánh Dấu Thanh Điệu',
    formula: 'a ➔ o ➔ e ➔ i ➔ u ➔ ü (Có a đánh a, không a tìm o, e; i và u đi liền thì đánh âm sau)',
    desc: 'Dấu thanh luôn đánh trên nguyên âm. Thứ tự ưu tiên mở khẩu hình: a > o > e > i > u > ü. Nếu cặp "iu" hoặc "ui" đi liền nhau thì dấu đánh ở âm đứng sau cùng (liù, duì).',
    examples: [
      { origin: 'hǎo (có a)', speakText: '好', pronounced: 'hǎo (dấu trên a)', vi: 'Tốt' },
      { origin: 'duì (cặp ui)', speakText: '对', pronounced: 'duì (dấu trên i)', vi: 'Đúng' },
      { origin: 'xiūxi (cặp iu)', speakText: '休息', pronounced: 'xiūxi (dấu trên u)', vi: 'Nghỉ ngơi' },
    ],
  },
];

// 5. EAR-TRAINING QUIZ DATA
interface EarQuizItem {
  audioText: string;
  char: string;
  correctPinyin: string;
  options: string[];
  meaning: string;
  explanation: string;
}

const EAR_TRAINING_QUESTIONS: EarQuizItem[] = [
  {
    audioText: '七',
    char: '七',
    correctPinyin: 'qī',
    options: ['jī', 'qī', 'xī', 'chī'],
    meaning: 'Số 7',
    explanation: '"q" là âm mặt lưỡi BẬT HƠI xì nhọn. Trong khi "j" không bật hơi, "ch" là âm uốn lưỡi.',
  },
  {
    audioText: '跑',
    char: '跑',
    correctPinyin: 'pǎo',
    options: ['bǎo', 'pǎo', 'tǎo', 'kǎo'],
    meaning: 'Chạy',
    explanation: '"p" là âm 2 môi bật hơi rất mạnh, phân biệt rõ với "b" (không bật hơi).',
  },
  {
    audioText: '吃',
    char: '吃',
    correctPinyin: 'chī',
    options: ['zhī', 'chī', 'shī', 'cī'],
    meaning: 'Ăn',
    explanation: '"ch" là âm uốn cong lưỡi và bật luồng hơi mạnh ra ngoài.',
  },
  {
    audioText: '天',
    char: '天',
    correctPinyin: 'tiān',
    options: ['tiān', 'diān', 'tān', 'kān'],
    meaning: 'Trời / Ngày',
    explanation: '"ian" đọc là "i-en", "t" là âm đầu lưỡi bật hơi mạnh.',
  },
  {
    audioText: '四',
    char: '四',
    correctPinyin: 'sì',
    options: ['shì', 'sì', 'cì', 'zì'],
    meaning: 'Số 4',
    explanation: '"s" là âm đầu lưỡi trước thẳng răng xì nhẹ, thanh 4 giáng mạnh dứt khoát.',
  },
  {
    audioText: '热',
    char: '热',
    correctPinyin: 'rè',
    options: ['lè', 'rè', 'yè', 'zhè'],
    meaning: 'Nóng',
    explanation: '"r" là âm uốn cong đầu lưỡi lên vòm họng, thanh đới rung không rung đầu lưỡi.',
  },
  {
    audioText: '鱼',
    char: '鱼',
    correctPinyin: 'yú',
    options: ['yú', 'yí', 'wú', 'lǘ'],
    meaning: 'Con cá',
    explanation: '"ü" là nguyên âm giữ nguyên khẩu hình môi tròn huýt sáo từ đầu đến cuối.',
  },
];

export function PinyinMasterStudio({ onOpenChatAI, onNavigateTab }: PinyinMasterStudioProps) {
  const [activeTab, setActiveTab] = useState<StudioTab>('initials');
  const [slowAudio, setSlowAudio] = useState(false);
  const [activePlaying, setActivePlaying] = useState<string | null>(null);

  // Ear training state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const curQuiz = EAR_TRAINING_QUESTIONS[quizIndex];

  const handlePlaySound = (text: string, rateMultiplier: number = 1.0) => {
    setActivePlaying(text);
    const rate = slowAudio ? 0.55 * rateMultiplier : 0.85 * rateMultiplier;
    soundEffects.speakChinese(text, rate);
    setTimeout(() => {
      setActivePlaying(null);
    }, 1200);
  };

  const handlePlayAllTones = () => {
    const tones = ['mā', 'má', 'mǎ', 'mà', 'ma'];
    tones.forEach((t, i) => {
      setTimeout(() => {
        handlePlaySound(t);
      }, i * 900);
    });
  };

  const handleAnswerQuiz = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    if (opt === curQuiz.correctPinyin) {
      soundEffects.playCorrect();
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
    } else {
      soundEffects.playIncorrect();
      setStreak(0);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setQuizIndex((idx) => (idx + 1) % EAR_TRAINING_QUESTIONS.length);
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* 1. HERO HEADER BANNER */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(2, 132, 199, 0.08) 100%)',
          border: '1.5px solid rgba(249, 115, 22, 0.3)',
          borderRadius: '20px',
          padding: '24px 28px',
          marginBottom: '24px',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f97316', color: '#fff', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
            <Zap size={13} /> NỀN TẢNG SỐ 1 TRƯỚC KHI HỌC CHỮ HÁN
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 900, color: 'var(--text-heading)' }}>
            Hán Ngữ Ngữ Âm & Phát Âm Pinyin Chuẩn Bắc Kinh 🗣️
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Trọn bộ <strong>23 Thanh mẫu</strong>, <strong>36 Vận mẫu</strong>, <strong>5 Thanh điệu</strong>, <strong>Quy tắc biến âm sống còn</strong> cùng phòng luyện tai nghe nhận diện âm thanh. Bấm vào bất kỳ thẻ nào để nghe phát âm mẫu!
          </p>
        </div>

        {/* Global Sound Speed Controller & AI helper */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setSlowAudio(!slowAudio)}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              border: `1.5px solid ${slowAudio ? '#f97316' : 'var(--border)'}`,
              background: slowAudio ? 'rgba(249, 115, 22, 0.15)' : 'var(--surface-card)',
              color: slowAudio ? '#ea580c' : 'var(--text-heading)',
              fontWeight: 800,
              fontSize: '13px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: slowAudio ? '0 2px 8px rgba(249, 115, 22, 0.2)' : 'none',
            }}
            title="Nghe ở tốc độ chậm 0.55x để nhận rõ chuyển động khẩu hình"
          >
            🐢 {slowAudio ? 'Đang bật Chế độ Rùa (Chậm 0.55x)' : 'Bật chế độ phát âm chậm'}
          </button>

          {onOpenChatAI && (
            <button
              type="button"
              onClick={() => onOpenChatAI('Hãy giải thích chi tiết cho tôi phương pháp luyện phát âm tiếng Trung chuẩn Bắc Kinh, cách uốn lưỡi các âm zh, ch, sh, r và cách phân biệt các âm bật hơi!')}
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                border: '1px solid rgba(2, 132, 199, 0.4)',
                background: 'rgba(2, 132, 199, 0.1)',
                color: '#0284c7',
                fontWeight: 800,
                fontSize: '13px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={16} /> Hỏi AI Hướng Dẫn Phát Âm
            </button>
          )}
        </div>
      </div>

      {/* 2. TAB CONTROLLER */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '20px',
        }}
      >
        {[
          { id: 'initials', label: '1. Thanh Mẫu (23 Phụ Âm)', icon: '👄' },
          { id: 'finals', label: '2. Vận Mẫu (36 Nguyên Âm)', icon: '🎶' },
          { id: 'tones', label: '3. 5 Thanh Điệu & Cao Độ', icon: '📈' },
          { id: 'rules', label: '4. Bí Kíp Biến Điệu', icon: '⚡' },
          { id: 'trainer', label: '5. Thử Thách Luyện Tai Nghe', icon: '🎧' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as StudioTab)}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                border: `1.5px solid ${isActive ? '#f97316' : 'var(--border)'}`,
                background: isActive ? '#f97316' : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-heading)',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 23 THANH MẪU (INITIALS) */}
      {/* ========================================================================= */}
      {activeTab === 'initials' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              background: 'rgba(2, 132, 199, 0.08)',
              borderLeft: '4px solid #0284c7',
              padding: '14px 18px',
              borderRadius: '0 12px 12px 0',
              fontSize: '13px',
              color: 'var(--text-heading)',
              lineHeight: 1.6,
            }}
          >
            <strong>💡 Mẹo Vàng Cốt Tử:</strong> Trong tiếng Trung, sự khác biệt sống còn nằm ở <strong>Âm Bật Hơi (💨)</strong> và <strong>Âm Uốn Lưỡi (👅)</strong>. Hãy để một mẩu giấy ăn trước miệng: khi phát âm <em>p, t, k, q, ch, c</em> giấy phải bay phần phật; khi phát âm <em>b, d, g, j, zh, z</em> giấy phải đứng yên!
          </div>

          {INITIALS_DATA.map((group, gIdx) => (
            <div
              key={gIdx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  {group.groupTitle}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                  {group.desc}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                {group.items.map((item) => {
                  const isPlayingThis = activePlaying === item.charName;
                  return (
                    <div
                      key={item.pinyin}
                      style={{
                        background: 'var(--surface-card)',
                        border: `1.5px solid ${item.isAspirated ? 'rgba(239, 68, 68, 0.4)' : item.isRetroflex ? 'rgba(168, 85, 247, 0.4)' : 'var(--border)'}`,
                        borderRadius: '14px',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <div>
                        {/* Header card with Badges */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                            <span style={{ fontSize: '28px', fontWeight: 900, color: '#f97316', fontFamily: 'monospace' }}>
                              {item.pinyin}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                              [{item.charName}]
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {item.isAspirated && (
                              <span style={{ fontSize: '10px', background: 'rgba(239, 68, 68, 0.15)', color: '#dc2626', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                💨 BẬT HƠI MẠNH
                              </span>
                            )}
                            {item.isRetroflex && (
                              <span style={{ fontSize: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#7c3aed', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>
                                👅 UỐN LƯỠI
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Vietnamese Equivalent & Mouth Guide */}
                        <div style={{ fontSize: '12px', color: 'var(--text-heading)', fontWeight: 600, marginBottom: '6px' }}>
                          🔹 {item.vietnameseEquivalent}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5, background: 'var(--surface)', padding: '8px 10px', borderRadius: '8px' }}>
                          🗣️ <em>Khẩu hình:</em> {item.mouthGuide}
                        </div>

                        {/* Words Examples */}
                        <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {item.examples.map((ex, exIdx) => (
                            <button
                              key={exIdx}
                              type="button"
                              onClick={() => handlePlaySound(ex.hanzi)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'var(--surface-hover)',
                                border: '1px solid var(--border)',
                                borderRadius: '6px',
                                padding: '4px 8px',
                                fontSize: '11px',
                                cursor: 'pointer',
                                color: 'var(--text-heading)',
                              }}
                              title={`Bấm để nghe từ: ${ex.hanzi} (${ex.pinyin})`}
                            >
                              <span style={{ fontFamily: 'var(--font-hanzi)', fontWeight: 700 }}>{ex.hanzi}</span>
                              <span style={{ color: '#0284c7' }}>{ex.pinyin}</span>
                              <Volume2 size={11} color="var(--text-dim)" />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Main Audio Play Button */}
                      <button
                        type="button"
                        onClick={() => handlePlaySound(item.charName)}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '10px',
                          border: 'none',
                          background: isPlayingThis ? '#0284c7' : '#f97316',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(249, 115, 22, 0.25)',
                        }}
                      >
                        <Volume2 size={16} /> Nghe Phát Âm Chuẩn Bắc Kinh
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 36 VẬN MẪU (FINALS) */}
      {/* ========================================================================= */}
      {activeTab === 'finals' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              borderLeft: '4px solid #10b981',
              padding: '14px 18px',
              borderRadius: '0 12px 12px 0',
              fontSize: '13px',
              color: 'var(--text-heading)',
              lineHeight: 1.6,
            }}
          >
            <strong>💡 Quy Tắc Vận Mẫu Quan Trọng:</strong> Vận mẫu đơn <strong>ü</strong> luôn giữ nguyên khẩu hình tròn môi huýt sáo. Khi đọc <strong>ian</strong>, hãy luôn đọc là <em>"i-en"</em> (tiān đọc như thi-en, miàn đọc như mi-en), không bao giờ đọc thành thi-an hay mi-an!
          </div>

          {FINALS_DATA.map((cat, cIdx) => (
            <div
              key={cIdx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h4 style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)' }}>
                {cat.category}
              </h4>
              <p style={{ margin: '0 0 16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                {cat.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
                {cat.items.map((item) => (
                  <div
                    key={item.pinyin}
                    style={{
                      background: 'var(--surface-card)',
                      border: item.warningNote ? '1.5px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '24px', fontWeight: 900, color: '#10b981', fontFamily: 'monospace' }}>
                          {item.pinyin}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                          [{item.charName}]
                        </span>
                      </div>

                      <div style={{ fontSize: '12px', color: 'var(--text-heading)', lineHeight: 1.4, marginBottom: '6px' }}>
                        {item.vietGuide}
                      </div>

                      {item.warningNote && (
                        <div style={{ fontSize: '11px', color: '#b45309', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 8px', borderRadius: '6px', fontWeight: 700 }}>
                          ⚠️ {item.warningNote}
                        </div>
                      )}

                      <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {item.examples.map((ex, exIdx) => (
                          <button
                            key={exIdx}
                            type="button"
                            onClick={() => handlePlaySound(ex.hanzi)}
                            style={{
                              background: 'var(--surface)',
                              border: '1px solid var(--border)',
                              borderRadius: '6px',
                              padding: '3px 6px',
                              fontSize: '11px',
                              cursor: 'pointer',
                              color: 'var(--text-heading)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <span style={{ fontFamily: 'var(--font-hanzi)', fontWeight: 700 }}>{ex.hanzi}</span>
                            <span style={{ color: '#0284c7' }}>{ex.pinyin}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlaySound(item.charName)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#10b981',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '11px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Volume2 size={14} /> Nghe Mẫu Âm Này
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: 5 THANH ĐIỆU (TONES & PITCH CONTOUR) */}
      {/* ========================================================================= */}
      {activeTab === 'tones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pitch Chart Banner */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: 900, color: 'var(--text-heading)' }}>
                  📈 Mô Hình Cao Độ 5 Vạch Của Thanh Điệu (Pitch Contour 5-4-3-2-1)
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
                  Cao độ thanh điệu trong tiếng Trung là tương đối nhưng tuân thủ nghiêm ngặt theo thang 5 bậc
                </p>
              </div>

              <button
                type="button"
                onClick={handlePlayAllTones}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 25%, #10b981 50%, #0284c7 75%, #64748b 100%)',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)',
                }}
              >
                🔊 Bấm Phát Âm Liên Hoàn: mā - má - mǎ - mà - ma
              </button>
            </div>

            {/* Pitch Diagram Visual */}
            <div
              style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px',
              }}
            >
              {TONES_DATA.map((t) => (
                <div
                  key={t.tone}
                  style={{
                    background: 'var(--surface)',
                    border: `2px solid ${t.color}`,
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: t.color }}>
                        {t.name}
                      </span>
                      <span style={{ fontSize: '12px', fontWeight: 800, background: `${t.color}20`, color: t.color, padding: '2px 8px', borderRadius: '4px' }}>
                        Bậc: {t.pitch}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 0' }}>
                      <span style={{ fontFamily: 'var(--font-hanzi)', fontSize: '32px', fontWeight: 900, color: t.color }}>
                        {t.char}
                      </span>
                      <div>
                        <div style={{ fontSize: '20px', fontWeight: 900, color: t.color }}>
                          {t.pinyin}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          Nghĩa: {t.meaning}
                        </div>
                      </div>
                    </div>

                    <p style={{ margin: '0 0 8px', fontSize: '12px', color: 'var(--text-heading)', lineHeight: 1.5 }}>
                      {t.description}
                    </p>
                    <div style={{ fontSize: '11px', color: '#ea580c', background: 'rgba(234, 88, 12, 0.08)', padding: '6px 8px', borderRadius: '6px' }}>
                      💡 {t.tip}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePlaySound(t.pinyin)}
                    style={{
                      marginTop: '14px',
                      padding: '8px',
                      borderRadius: '8px',
                      border: 'none',
                      background: t.color,
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    <Volume2 size={15} /> Nghe Âm Điệu ({t.pinyin})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: QUY TẮC BIẾN ĐIỆU (TONE SANDHI RULES) */}
      {/* ========================================================================= */}
      {activeTab === 'rules' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              background: 'rgba(249, 115, 22, 0.08)',
              borderLeft: '4px solid #f97316',
              padding: '14px 18px',
              borderRadius: '0 12px 12px 0',
              fontSize: '13px',
              color: 'var(--text-heading)',
              lineHeight: 1.6,
            }}
          >
            <strong>Tại sao phải biến điệu?</strong> Trong khẩu ngữ tiếng Trung tự nhiên, các âm thanh điệu xung khắc nhau khi phát liên tục sẽ làm cơ miệng mệt mỏi. Quy tắc biến điệu sinh ra để dòng chảy âm thanh trở nên trôi chảy, nhịp nhàng và du dương!
          </div>

          {SANDHI_RULES.map((rule, rIdx) => (
            <div
              key={rIdx}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: 'var(--text-heading)' }}>
                  {rule.title}
                </h4>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#f97316', background: 'rgba(249, 115, 22, 0.1)', padding: '4px 10px', borderRadius: '6px' }}>
                  📐 {rule.formula}
                </span>
              </div>

              <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {rule.desc}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {rule.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    style={{
                      background: 'var(--surface-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-heading)' }}>
                        {ex.origin}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>
                        ➔ Thực đọc: {ex.pronounced}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        ({ex.vi})
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePlaySound(ex.speakText)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(2, 132, 199, 0.1)',
                        border: '1px solid rgba(2, 132, 199, 0.3)',
                        color: '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                      title="Bấm nghe biến điệu chuẩn"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PHÒNG THỬ THÁCH LUYỆN TAI NGHE (EAR-TRAINING TRAINER) */}
      {/* ========================================================================= */}
      {activeTab === 'trainer' && (
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: 'var(--card-shadow)',
              textAlign: 'center',
            }}
          >
            {/* Score & Streak Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontWeight: 800, fontSize: '14px' }}>
                <Flame size={18} /> Chuỗi đúng: {streak} 🔥
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)' }}>
                Câu {quizIndex + 1} / {EAR_TRAINING_QUESTIONS.length}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 800, fontSize: '14px' }}>
                <Award size={18} /> Điểm: {score} XP
              </div>
            </div>

            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 900, color: 'var(--text-heading)' }}>
              🎧 Nghe Phát Âm & Chọn Phiên Âm Pinyin Đúng
            </h3>
            <p style={{ margin: '0 0 24px', fontSize: '13px', color: 'var(--text-muted)' }}>
              Bấm vào nút loa lớn bên dưới để nghe âm bản xứ, sau đó chọn đáp án Pinyin chuẩn xác.
            </p>

            {/* Giant Speaker Button */}
            <button
              type="button"
              onClick={() => handlePlaySound(curQuiz.audioText)}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                border: 'none',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
                marginBottom: '28px',
                transition: 'transform 0.15s ease',
              }}
              title="Bấm để phát lại âm thanh"
            >
              <Volume2 size={44} />
            </button>

            {/* 4 Options Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              {curQuiz.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === curQuiz.correctPinyin;

                let btnBg = 'var(--surface-card)';
                let btnBorder = 'var(--border)';
                let btnColor = 'var(--text-heading)';

                if (selectedOption !== null) {
                  if (isCorrect) {
                    btnBg = 'rgba(16, 185, 129, 0.15)';
                    btnBorder = '#10b981';
                    btnColor = '#16a34a';
                  } else if (isSelected) {
                    btnBg = 'rgba(239, 68, 68, 0.15)';
                    btnBorder = '#ef4444';
                    btnColor = '#dc2626';
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleAnswerQuiz(opt)}
                    style={{
                      padding: '18px',
                      borderRadius: '14px',
                      border: `2px solid ${btnBorder}`,
                      background: btnBg,
                      color: btnColor,
                      fontSize: '20px',
                      fontWeight: 900,
                      cursor: selectedOption !== null ? 'default' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 size={18} color="#16a34a" />}
                    {selectedOption !== null && isSelected && !isCorrect && <XCircle size={18} color="#dc2626" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback & Explanation */}
            {selectedOption !== null && (
              <div
                style={{
                  background: selectedOption === curQuiz.correctPinyin ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  border: `1.5px solid ${selectedOption === curQuiz.correctPinyin ? '#10b981' : '#ef4444'}`,
                  borderRadius: '14px',
                  padding: '16px',
                  textAlign: 'left',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '15px', color: selectedOption === curQuiz.correctPinyin ? '#16a34a' : '#dc2626', marginBottom: '6px' }}>
                  {selectedOption === curQuiz.correctPinyin ? '🎉 Chính xác tuyệt đối!' : '❌ Chưa chính xác!'}
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    (Từ phát âm: <strong>{curQuiz.char}</strong> - {curQuiz.meaning})
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-heading)', lineHeight: 1.5 }}>
                  {curQuiz.explanation}
                </div>
              </div>
            )}

            {/* Next Button */}
            {selectedOption !== null && (
              <button
                type="button"
                onClick={handleNextQuiz}
                style={{
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#0284c7',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '15px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.3)',
                }}
              >
                Tiếp Tục Câu Tiếp Theo <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
