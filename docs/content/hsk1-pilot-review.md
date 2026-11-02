# Đối chiếu 3 bài đầu và bản mẫu bài 1

Trạng thái: bản nháp biên tập, chưa nhập vào giao diện. Nguồn đã đọc là văn bản trích xuất của 3 PowerPoint trong thư mục [HSK标准教程1](https://drive.google.com/drive/folders/180qHUaRAFd1ewta7sj_unUb1bkcvArdJ). Chưa kiểm tra từng hình/âm thanh và chưa xác nhận quyền xuất bản. Các vị trí P37/P49… trong bản trích xuất là nhãn của tài liệu; không coi đó là số trang PDF hay chỉ số slide đã kiểm chứng.

## Ánh xạ theo nội dung

| Bài nguồn | Nội dung xác nhận từ bản trích xuất | Trong app hiện tại | Hành động biên tập |
|---|---|---|---|
| 1 — 你好 | Chào hỏi 你好 / 您好 / 你们好; xin lỗi–đáp lại; 4 thanh; biến điệu 3+3; nhận diện nét/chữ đơn giản | `grammarDataHsk1.ts:01` có chào hỏi, biến điệu và cả cảm ơn; `roadmapHsk1.ts` có chào hỏi trong Unit 1, số đếm trong Unit 0 | Tách cảm ơn sang bài mẫu 2; không thêm lại số đếm. Giữ liên kết sang phần Pinyin và tập viết thay vì nhân đôi cả giáo trình. |
| 2 — 谢谢你 | Cảm ơn, đáp lại, tạm biệt; thanh nhẹ; vị trí dấu thanh; quy tắc viết tắt pinyin | Bài app `01` đã có cảm ơn–xin lỗi, `02` lại là giới thiệu tên. Có `再见` trong bài app `01` | Không gán nguồn 2 vào app 02 theo số thứ tự. Bổ sung nhóm cảm ơn và thanh nhẹ sau khi kiểm duyệt. Tái dùng từ đã có, không tạo ID mới cho cùng một mục từ. |
| 3 — 你叫什么名字 | Hỏi tên với 什么, 叫; câu 是 / 不是; câu hỏi 吗; nghề nghiệp/quốc tịch; biến điệu 不 | Bài app `02` có hỏi tên/什么; `03` có 是, 的, 吗; roadmap Unit 1 có giới thiệu bản thân | Ánh xạ sang các mục hiện có ở app 02/03. Không nhập lặp 是/吗. 的 nằm ngoài phạm vi bản mẫu nguồn 3 này, giữ nguyên bài cũ và đánh dấu cần xem nguồn riêng. |

Nguồn từng bài:

- [Bài 1](https://docs.google.com/presentation/d/1tHJE-3G-83SAlmWYs14XBOlKZ1zVwVaA/edit)
- [Bài 2](https://docs.google.com/presentation/d/1W70kBsAlRy-DAUmhcPYgJhMxmei0_Hci/edit)
- [Bài 3](https://docs.google.com/presentation/d/1Q_k89yFRKc2KV26PLTU0zis0eWSrFdEe/edit)

## Những chỗ cần đối chiếu bản gốc

Bản trích xuất bài 2 có `不谢` đi với bản dịch “Chắc chắn”; cần kiểm tra slide gốc, không dùng bản dịch này làm đáp án. Bài 3 có vị trí gán `吗` với `mā`, trong khi cách dùng trợ từ hỏi trong bản mẫu cần `ma` thanh nhẹ. Có nhiều câu giải thích phát âm tiếng Việt khó hiểu trong cả ba bản trích xuất; cần viết lại và duyệt chuyên môn, không nhập tự động. Đây là phát hiện trên văn bản trích xuất, chưa kết luận lỗi nằm trong hình gốc hay trong quá trình trích xuất.

Trong app, phần `您` đang có lời giải thích mang tính kể chuyện cấu tạo chữ; không dùng câu chuyện đó như bằng chứng về nguồn gốc chữ. Bản mẫu chỉ diễn đạt cách dùng lịch sự. Pinyin thanh gốc và cách đọc sau biến điệu cần được ghi tách biệt.

## Bản mẫu bài 1

Tệp `content-drafts/hsk1-greetings.v1.json` là nội dung biên soạn mới theo mục tiêu của bài nguồn, chưa được bundle vào app. Gồm 3 mục tiêu, 5 mục từ/cụm từ, 3 giải thích ngắn, 2 ví dụ và 4 bài chọn đáp án có giải thích. Audio chưa gán. Không đưa hình, slide hoặc sách nguyên bản vào GitHub.

Luồng đề xuất: giới thiệu mục tiêu → chào một người/nhiều người → đáp lời xin lỗi → ghi/đọc pinyin → luyện 4 câu → kết quả và ôn lại câu sai. Chưa đặt thời lượng hoặc điểm đạt giả định trước khi thử với người học.

## Tiêu chí để chuyển từ nháp sang bài thử nghiệm

- Đối chiếu bản gốc và duyệt Hán tự, pinyin, nghĩa, cách dùng; ghi người duyệt và ngày duyệt.
- Xác nhận quyền dùng mọi hình/âm thanh hoặc dùng tài nguyên tự tạo/được cấp phép.
- Ghép audio đúng bài nếu có; không dùng MP3 cùng số track từ bộ sách khác để suy ra nội dung.
- Gắn với các ID hiện có sau khi xác định chỗ tái dùng; không đổi ID làm mất tiến độ.
- Kiểm tra câu hỏi có đáp án duy nhất hợp lý và giải thích không trái với đáp án.
- Kiểm thử học → kết quả → lưu → tải lại trên nhánh thử nghiệm, sau đó kiểm tra điện thoại thật.

Bước kế tiếp: duyệt bản biên tập bài 1; xây hai bản nháp 2/3 theo bảng ánh xạ; sau đó tích hợp một bài vào nhánh thử nghiệm. Không tự nhập 83 thư mục hay thêm HSK cấp khác trong đợt mẫu.
