# Bài mẫu HSK 1 — kịch bản thử người mới và thiết bị thật

Trạng thái: **PENDING**, chưa có người học, chuyên gia hoặc thiết bị thật tham gia đợt xác minh này. Đây là phiếu trống để nghiệm thu, không phải kết quả thử. Người chuẩn bị: Codex; mốc thiết kế `f234909b156c2a2e8119d529e8e110e10fe1b675`, 2026-11-02.

## Chuẩn bị

Dùng nhánh thử nghiệm ở DEV và đúng commit cần duyệt. Không dùng dữ liệu học thật duy nhất để thử lỗi/quota. Tải bản sao nếu trình duyệt đã có dữ liệu; dùng profile trình duyệt thử riêng cho các tình huống dữ liệu hỏng. Không nhập mật khẩu, API key, họ tên học viên, email hay ngày sinh vào phiếu. Người học có thể dùng mã thử; người chịu trách nhiệm nghiệm thu ghi tên hoặc định danh công việc/vai trò và ngày.

Mở HSK1 → **Thử bài mẫu: Chào hỏi và xin lỗi**. Đây là nút DEV; website production không phải nơi nghiệm thu bài mẫu. Trong production không tìm thấy nút này là đúng giới hạn hiện tại. Nếu chưa có môi trường DEV trên điện thoại thì ghi BLOCKED, không tự mở quyền triển khai công khai để thử.

## Kịch bản cho người chưa học tiếng Trung

Người điều phối không nói trước đáp án. Ghi trợ giúp đã cung cấp thay vì sửa kết quả thành tự làm được.

| Mã | Việc người học thực hiện | Điều quan sát / bằng chứng cần ghi | Trạng thái thực tế |
|---|---|---|---|
| U01 | Tìm nút mở bài, nói lại mục tiêu bằng lời của mình | Có biết bắt đầu ở đâu; có nhầm với bài chính/điểm HSK không | PENDING |
| U02 | Xem chữ, pinyin, nghĩa và ví dụ | Thuật ngữ chưa hiểu; đọc được hướng dẫn, biết chỗ nghe | PENDING |
| U03 | Nghe một cụm và nghe ví dụ | Nghe được qua loa/tai nghe thật; không chỉ dựa vào callback kỹ thuật | PENDING |
| U04 | Làm hai câu có gợi ý | Có hiểu vì sao đúng; có chỉ ghi nhớ vị trí nút không | PENDING |
| U05 | Làm câu nghe tự trả lời | Trước kiểm tra không thấy Hán tự/pinyin/câu đích trong nhãn trợ năng; thật sự nghe rõ | PENDING |
| U06 | Chọn sai ít nhất một câu rồi tiếp tục | Hiểu phản hồi và vì sao sai; phần ôn xuất hiện đúng câu; không lặp vô hạn | PENDING |
| U07 | Xem điểm lần đầu và điểm ôn | Người học phân biệt được hai điểm; không hiểu nhầm là chứng chỉ | PENDING |
| U08 | Lưu, đóng và mở lại bài | Hiện đúng kết quả đã lưu, lộ trình chính không đổi | PENDING |
| U09 | Bắt đầu lại, thoát trước lưu; mở lại | Lượt chưa lưu bị bỏ đúng thông báo, kết quả cũ còn | PENDING |
| U10 | Thử nghe khi giọng chưa sẵn sàng hoặc phát lỗi | Thông báo hiểu được; có đường thử lại/thoát, không gán nghe đúng | PENDING |

Sau buổi thử: hỏi “Phần nào khó hiểu nhất?”, “Bạn sẽ bấm đâu để học/ôn tiếp?”, “Bạn có phân biệt được đã học và đã tự làm đúng không?”. Không đặt thời gian/điểm để giả định mọi người mới phải đạt như nhau; ghi thời gian quan sát và mức trợ giúp nếu có.

## Ma trận thiết bị/trình duyệt thật

| Mã | Thiết bị và trình duyệt phải ghi | Các ca bắt buộc | Trạng thái |
|---|---|---|---|
| D01 | iPhone, phiên bản iOS/Safari, cỡ màn hình | Mở/thoát, cuộn bài dài, chạm nút, giọng zh thật, tải lại lưu, VoiceOver nếu có người thử | BLOCKED — chưa có thiết bị |
| D02 | Android, phiên bản Android/Chrome, cỡ màn hình | Như D01; TalkBack nếu có người thử | BLOCKED — chưa có thiết bị |
| D03 | Desktop/browser, hệ điều hành | Tab/Shift+Tab, Enter, Escape, focus trở về, zoom 200%, reduced motion của hệ điều hành | PENDING thử thủ công; Chromium CI được báo riêng |
| D04 | Từng thiết bị có giọng tiếng Trung | Tên/lang giọng, âm lượng, loa/tai nghe, mẫu 你好/您好/你们好/对不起/没关系 và ví dụ | BLOCKED — chưa nghe thật |
| D05 | Từng thiết bị ở chế độ tối/sáng | Chữ đọc rõ, nút không bị cắt, không cuộn ngang, vùng cuộn có thể thoát | PENDING |
| D06 | Thiết bị ở tình huống offline sau khi đã mở app | Ghi nguồn mạng giọng nếu biết; giọng có còn phát không, lỗi có thông báo không | PENDING; không tự nhận app hỗ trợ khởi động offline/PWA |
| D07 | Thiết bị thử riêng có storage bị chặn/đầy | Kết quả cũ giữ nguyên; lỗi rõ; thử lại không đếm đôi | PENDING thử thật; fault injection tự động ghi riêng |

Không cài giọng, chỉnh thiết lập thiết bị hoặc xóa dữ liệu người khác nếu chưa được chủ thiết bị đồng ý. Không ghi âm/quay người học nếu chưa có sự đồng ý; có thể ghi chú quan sát không kèm hình cá nhân.

## Mẫu phiếu buổi thử

Mã buổi: ___; người điều phối/vai trò: ___; ngày: ___; commit/nhánh: ___

Mã học viên (không cần tên thật): ___; kinh nghiệm tiếng Trung trước buổi: ___

Thiết bị/OS/browser: ___; kích thước/zoom: ___; theme/reduced motion: ___; tên giọng/lang: ___; loa/tai nghe và âm lượng nghe thực tế: ___

| Ca | PASS / FAIL / BLOCKED | Người học tự làm hay có trợ giúp | Quan sát / bước tái hiện | Bằng chứng không chứa dữ liệu riêng | Ảnh hưởng / sửa cần làm |
|---|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ | ___ |

Kết quả lần đầu/ôn/đã lưu quan sát: ___; lỗi chặn: ___; xác minh lại sau sửa: ___

## Điều kiện đóng cổng nghiệm thu

Phải có phiếu thực tế gắn commit, người duyệt/vai trò/ngày; nội dung và quyền được xác nhận ở [phiếu chuyên môn](hsk1-pilot-content-review.md); lỗi chặn đã xử lý và kiểm tra lại. Ca chưa làm giữ PENDING/BLOCKED. Không lấy số lượng test tự động hoặc phiếu trống để ký nghiệm thu thay người học/chuyên gia.
