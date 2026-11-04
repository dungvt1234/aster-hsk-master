export type Hsk1PracticeSkill = 'listen' | 'speak' | 'read' | 'write';

export interface Hsk1TextbookPlan {
  outcome: string;
  practice: Record<Hsk1PracticeSkill, string>;
}

/**
 * Original practice prompts aligned to the 15-lesson New HSK 1 sequence.
 * These are learning activities, not copied textbook exercises.
 */
export const HSK1_TEXTBOOK_PLAN: Record<string, Hsk1TextbookPlan> = {
  '01': {
    outcome: 'Chào hỏi, cảm ơn, xin lỗi và chọn cách xưng hô lịch sự.',
    practice: {
      listen: 'Nghe và phân biệt 你好, 您好, 谢谢 và 再见.',
      speak: 'Tự chào giáo viên và một người bạn bằng hai cách khác nhau.',
      read: 'Đọc đúng bốn thanh trong các cụm chào hỏi ngắn.',
      write: 'Viết một đoạn chào hỏi hai lượt bằng chữ Hán.',
    },
  },
  '02': {
    outcome: 'Nói tên, hỏi tên và giới thiệu mình là người học tiếng Trung.',
    practice: {
      listen: 'Nghe để xác định tên và vai trò của từng người.',
      speak: 'Trả lời trọn câu cho câu hỏi 你叫什么名字？',
      read: 'Đọc một thẻ giới thiệu có tên, quốc tịch và ngôn ngữ.',
      write: 'Viết ba câu tự giới thiệu theo trật tự chủ ngữ – vị ngữ.',
    },
  },
  '03': {
    outcome: 'Hỏi và trả lời về quốc tịch bằng 是, 不是 và 吗.',
    practice: {
      listen: 'Nghe và chọn đúng quốc tịch của người nói.',
      speak: 'Hỏi một bạn có phải người Việt Nam hay không.',
      read: 'Nhận biết quan hệ sở hữu trong cụm có 的.',
      write: 'Viết hai câu khẳng định và một câu phủ định với 是.',
    },
  },
  '04': {
    outcome: 'Nói về gia đình, số lượng người và dùng đúng lượng từ.',
    practice: {
      listen: 'Nghe và ghi số người trong một gia đình.',
      speak: 'Giới thiệu gia đình bằng 有 và 没有.',
      read: 'Phân biệt 二 và 两 trong các cụm số lượng.',
      write: 'Viết bốn câu về người thân, tuổi và nghề nghiệp.',
    },
  },
  '05': {
    outcome: 'Nói ngày, giờ, lịch nghỉ và một kỹ năng đã học được.',
    practice: {
      listen: 'Nghe lịch làm việc và chọn đúng ngày nghỉ.',
      speak: 'Nói hôm nay là thứ mấy và bạn biết làm gì.',
      read: 'Đọc lịch theo thứ tự năm – tháng – ngày – giờ.',
      write: 'Viết lịch ngắn cho một ngày bằng ba mốc thời gian.',
    },
  },
  '06': {
    outcome: 'Đọc số điện thoại, nói mong muốn và hỏi cách thực hiện.',
    practice: {
      listen: 'Nghe rồi chép lại một số điện thoại ngắn.',
      speak: 'Nói bạn muốn đi đâu để làm gì.',
      read: 'Đọc câu liên động và xác định hành động mục đích.',
      write: 'Viết câu hỏi với 怎么 và câu trả lời tương ứng.',
    },
  },
  '07': {
    outcome: 'Hỏi giờ làm, nói giờ rưỡi và đưa ra một lời rủ nhẹ nhàng.',
    practice: {
      listen: 'Nghe và chọn đúng giờ bắt đầu hoặc kết thúc.',
      speak: 'Rủ một người bạn gặp nhau bằng 吧.',
      read: 'Đọc lịch trình và tìm trạng ngữ chỉ thời gian.',
      write: 'Viết lịch sáng, chiều, tối bằng ba câu ngắn.',
    },
  },
  '08': {
    outcome: 'Nói nghề nghiệp, nơi làm việc và khả năng bằng 在 và 能.',
    practice: {
      listen: 'Nghe để nối người, nghề nghiệp và nơi làm việc.',
      speak: 'Giới thiệu nơi làm việc của hai người trong gia đình.',
      read: 'Đọc sơ đồ vị trí có 上, 下, 前, 后 và 里.',
      write: 'Viết ba câu với 在 và một câu với 能.',
    },
  },
  '09': {
    outcome: 'Sắp xếp thời gian – nơi chốn – hành động và mô tả sự tồn tại.',
    practice: {
      listen: 'Nghe lịch học và chọn đúng thời gian, địa điểm.',
      speak: 'Nói kế hoạch sáng mai theo đúng trật tự câu.',
      read: 'Đọc thông báo lớp và tìm số thứ tự với 第.',
      write: 'Viết một câu tồn hiện với 有 và một câu chỉ lịch học.',
    },
  },
  '10': {
    outcome: 'Hỏi giá, nhận xét hàng hóa và nói số tiền.',
    practice: {
      listen: 'Nghe hội thoại mua hàng và ghi giá, số lượng.',
      speak: 'Hỏi giá một món đồ và nhận xét đắt hoặc rẻ.',
      read: 'Đọc nhãn giá bằng 块, 元, 角 và 分.',
      write: 'Viết đoạn mua hàng ba lượt có 怎么样.',
    },
  },
  '11': {
    outcome: 'Hỏi việc đang làm, nói dự định và dùng câu hỏi chính phản.',
    practice: {
      listen: 'Nghe và xác định ai đang làm hoạt động nào.',
      speak: 'Hỏi và trả lời bằng mẫu V 不 V.',
      read: 'Đọc câu có 在, 正在 và 呢 để nhận ra hành động tiếp diễn.',
      write: 'Viết hai việc đang làm và một việc muốn làm với 要.',
    },
  },
  '12': {
    outcome: 'Nói về thời tiết, thay đổi trạng thái và cảm thán.',
    practice: {
      listen: 'Nghe dự báo và chọn đúng hiện tượng thời tiết.',
      speak: 'Miêu tả thời tiết hôm qua và hôm nay.',
      read: 'Phân biệt 了 chỉ thay đổi với 了 chỉ hoàn thành.',
      write: 'Viết ba câu thời tiết, trong đó có một câu 太…了.',
    },
  },
  '13': {
    outcome: 'Gọi đồ uống, xin phép và đưa ra yêu cầu lịch sự.',
    practice: {
      listen: 'Nghe đơn gọi món và ghi loại đồ uống, số lượng.',
      speak: 'Gọi một đồ uống bằng 请给我… và xin phép bằng 可以吗？',
      read: 'Đọc câu hai tân ngữ và xác định người nhận, vật nhận.',
      write: 'Viết hội thoại gọi món bốn lượt ngắn.',
    },
  },
  '14': {
    outcome: 'Kể một việc đã làm và dùng đúng 了 với động từ ly hợp.',
    practice: {
      listen: 'Nghe và chọn hoạt động đã hoàn thành.',
      speak: 'Kể hai việc bạn đã làm hôm qua.',
      read: 'Nhận biết vị trí của 了 trong câu có số lượng.',
      write: 'Viết câu khẳng định, phủ định và câu hỏi “đã…chưa?”.',
    },
  },
  '15': {
    outcome: 'Hẹn thời gian, địa điểm và nối hai ý bằng 还 hoặc 也.',
    practice: {
      listen: 'Nghe thông báo chuyến bay và ghi giờ, địa điểm hẹn.',
      speak: 'Chốt một cuộc hẹn ở sân bay bằng câu hoàn chỉnh.',
      read: 'Đọc lịch trình và xác định hai hoạt động song song.',
      write: 'Viết tin nhắn hẹn gặp có thời gian, địa điểm và 还.',
    },
  },
};
