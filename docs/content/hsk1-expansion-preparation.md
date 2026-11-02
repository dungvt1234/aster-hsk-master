# Chuẩn bị mở rộng HSK 1 — phần độc lập Bước C

Mốc `f234909b156c2a2e8119d529e8e110e10fe1b675`, 2026-11-02. Trạng thái **PREPARED / chưa bật mở rộng**. Người thực hiện: Codex; chưa có duyệt chuyên môn, thiết bị hay người học thật. Không đổi ID, thứ tự, mở khóa, XP, SRS, sổ lỗi hoặc backup.

## Bảng chuẩn bị theo unit

Nguồn G = `src/data/grammarDataHsk1.ts` theo lessonNumber; U = `src/data/unitGuidebookData.ts` theo unit ID; V = `src/data/hskData.ts` level 1. Nguồn nội bộ chỉ truy vết nội dung đang có, không tự chứng minh đúng chuẩn hoặc quyền xuất bản. S1–S3 là ba bài Drive đã nêu trong [kiểm kê GĐ1](hsk1-phase1-inventory.md). Mỗi dòng PENDING nguồn/ngôn ngữ/trải nghiệm; không có unit được ký nghiệm thu trong hồ sơ này.

| Unit / ID chặng cũ | Mục tiêu | Tiên quyết cần dạy/kiểm tra | Điểm chưa dạy trước hỏi / bằng chứng | Cần thêm hoặc sửa sau duyệt | Nguồn cần đối chiếu | Bài ôn / ưu tiên / trạng thái |
|---|---|---|---|---|---|---|
| `unit-hsk1-0`; `node-hsk1-0-1`, `node-hsk1-0-2`, `node-hsk1-0-3`, `node-hsk1-0-4` | Nhận diện/ghép số 1–99 | Phân biệt Hán tự/pinyin/thanh; 1–10 trước hàng chục | Popup chỉ dạy 1–5; c-0-2-1 hỏi 6–10; c-0-3-1/2 hỏi hàng chục | Bài nhập môn ngắn, dạy 6–10/hàng chục; sửa nhãn hỏi giá/100 nếu chưa dạy | V số đếm, U0, G04/G10; S1 chỉ vài chữ số, chưa đủ xác nhận cả unit | Cúp nhận diện số; P0; PENDING |
| `unit-hsk1-1`; `node-hsk1-1-1`, `node-hsk1-1-2`, `node-hsk1-1-3`, `node-hsk1-1-4` | Chào/cảm ơn/xin lỗi/tên/sức khỏe | Pinyin và thanh; 叫/什么/名字/是/吗; 也/很 | c-1-1-3-1 dùng 也/很; cúp dùng cụm xin lỗi chưa được dạy trong đường chính | Hoàn tất duyệt bài mẫu; tách mục tiêu; bổ sung phần dạy đúng thời điểm | G01–03/G08, U1; S1–S3 theo chủ đề, không theo số unit | Cúp xã giao có kiến thức cần dạy trước; P0; PENDING |
| `unit-hsk1-2`; `node-hsk1-2-1`, `node-hsk1-2-2`, `node-hsk1-2-3`, `node-hsk1-2-4` | Gia đình, nhân khẩu, sở hữu | 这/那/是; số đếm; 家/有/几/口/人/的 | c-1-2-2-1 có 口 và 个 trong câu hỏi rộng; cúp có từ người thân mới | Làm rõ đề lượng từ; dạy từ trước; bản nháp kế tiếp đính kèm, chưa thay câu gốc | G03/G04, U2, V; chưa có nguồn Drive cùng chủ đề được xác minh | Cúp em/con cần phần dạy; P0; PENDING |
| `unit-hsk1-3`; `node-hsk1-3-1`, `node-hsk1-3-2`, `node-hsk1-3-3`, `node-hsk1-3-4` | Ăn/uống, sở thích, khen món | 想/喜欢/吃/喝/吗; 太…了 | c-1-3-2-1 dùng 喜欢; c-1-3-3-1 dùng 太…了 trước sổ tay Unit5 | Dạy cấu trúc trước; nhãn gọi món phải sát bài khen ngon | G06/G10/G12, U3, V; nguồn ngoài cần bổ sung | Cúp từ ăn/uống; P1; PENDING |
| `unit-hsk1-4`; `node-hsk1-4-1`, `node-hsk1-4-2`, `node-hsk1-4-3`, `node-hsk1-4-4` | Ngày tháng/giờ/buổi/lịch trình | Số ghép; 点/分/现在/了; 不/去/学校 | c-1-4-2-1/2 hỏi giờ; cúp dùng 学校; bài lịch trình chỉ nối buổi | Dạy từ giờ và trường học trước; ví dụ lịch trình có thời gian | G05/G07/G09, U4, V; nguồn ngoài chưa xác minh | Cúp lịch trình cần đủ từ; P1; PENDING |
| `unit-hsk1-5`; `node-hsk1-5-1`, `node-hsk1-5-2`, `node-hsk1-5-3`, `node-hsk1-5-4`, `node-hsk1-5-5` | Hỏi giá, đơn vị, mua số lượng/tổng tiền | 多少钱/斤/块/钱; 想买; lượng từ | c-1-5-1-2 chỉ nhận một thứ tự; c-1-5-2-1 gợi ý trang trọng ở lựa chọn | Duyệt biến thể 苹果多少钱一斤; câu hỏi về 块/元 rõ ngữ cảnh; chưa hứa quét ví | G04/G06/G10/G12, U5, V; nguồn ngoài chưa xác minh | Cúp mua táo; P0; PENDING |
| `unit-hsk1-6`; `node-hsk1-6-1`, `node-hsk1-6-2`, `node-hsk1-6-3`, `node-hsk1-6-4`, `node-hsk1-6-5` | Trường lớp, khả năng, sách và vị trí | 都/们/会; 上/有/本; 去 + nơi + việc | c-1-6-1-2 dùng 都; c-1-6-2-1 dùng 会; c-1-6-3-2 dùng 本 | Dạy điểm mới; phân biệt ghép câu hỏi khả năng với thực hành viết; duyệt biến thể lịch trình | G04/G05/G08/G14, U6, V; nguồn ngoài chưa xác minh | Cúp bốn động từ, chưa kiểm tra bốn kỹ năng; P1; PENDING |
| `unit-hsk1-7`; `node-hsk1-7-1`, `node-hsk1-7-2`, `node-hsk1-7-3`, `node-hsk1-7-4`, `node-hsk1-7-5` | Địa điểm, vị trí, cách đi | 请问/在/哪儿; 前面/旁边/就; 怎么/坐 | c-1-7-3-2 dùng 就在; cúp có 很大的商店 | Dạy định ngữ/就 trước hỏi; nhãn trước–sau chỉ giữ khi có luyện cả hai | G08/G09/G11, U7, V; nguồn ngoài chưa xác minh | Cúp định ngữ/vị trí; P1; PENDING |
| `unit-hsk1-8`; `node-hsk1-8-1`, `node-hsk1-8-2`, `node-hsk1-8-3`, `node-hsk1-8-4`, `node-hsk1-8-5` | Thời tiết, sở thích, dự báo/rủ bạn | 天气/怎么样; 太…了; 会 dự báo; 一起/吧 | c-1-8-1-2 rất lạnh ↔ 太冷了; c-1-8-3-2 会 dự báo khác nghĩa kỹ năng; cúp chỉ lời chúc | Duyệt nghĩa rất/lạnh quá; dạy nghĩa 会 riêng; không gọi hai mùa là bốn mùa; đề xuất kiểm tra tổng hợp mới | G05/G07/G10/G12, U8, V; nguồn ngoài chưa xác minh | Cúp lời chúc không thay kiểm tra; P0; PENDING |

Đối soát: đủ 9 unit / 40 ID cũ, không xóa hoặc tạo completion. P0 = cần giải quyết trước nhóm sửa liên quan; P1 = nhóm tiếp sau; không phải phê duyệt thứ tự phát hành. Mỗi unit chỉ bắt đầu triển khai sau cổng bài mẫu và phải báo riêng/chờ nghiệm thu unit trước khi sang unit khác.

## Nhập môn đã có và khoảng thiếu

| Vị trí hiện có | Có gì theo đọc mã | Khoảng thiếu cần duyệt | Đề xuất, chưa triển khai |
|---|---|---|---|
| `PinyinMasterStudio.tsx`: StudioTab/INITIALS_DATA | Tab thanh mẫu, vận mẫu, thanh điệu, quy tắc, luyện, coach; ví dụ và nút nghe | Studio là công cụ tùy chọn, chưa là chuỗi prerequisite trong roadmap; nhận định/nhãn phát âm cần duyệt | Tái dùng đoạn âm phù hợp, không ép học cả studio trước chào hỏi |
| `PinyinMasterStudio.tsx`: TONES_DATA/handlePlayAllTones | 4 thanh và thanh nhẹ, phát các mẫu bằng thiết bị | Có nút phát không chứng minh nghe đúng/nhận diện được; chưa nghe giọng thật | Bộ nghe nhận diện rất ngắn từ từ đã dạy |
| G01 `g-hsk1-01-1` và U1 toneRules | Khái niệm âm tiết, thanh, 3+3 | Cách đếm thanh mẫu 21 trong G01 và nhãn 23 ở Studio có thể theo phân loại khác (y/w); chưa kết luận lỗi nếu chưa chốt quy ước | Chốt cách giải thích cho người mới, phân biệt thanh nhẹ với bốn thanh gốc |
| `DuolingoPathView.tsx` popup node-hsk1-0-1 | Chữ/pinyin/nghĩa số 1–5 và nghe TTS | Chưa dạy tuần tự chữ → pinyin → thanh → nhận diện âm; chưa có bài nền tảng có đánh giá độc lập | C01/C02/C03 của GĐ2 làm ba bài nhỏ với ID mới khi được duyệt |
| Bài mẫu `p-tones`, `q-tones` | Phân biệt nǐ hǎo viết gốc với cách đọc 3+3 | Chỉ một cặp, không xác nhận toàn bộ phát âm | Tái dùng giải thích đã duyệt; mở rộng từng trường hợp theo bài thật |

Thứ tự đề xuất vẫn là: nhận diện chữ/cách đọc/nghĩa → dấu thanh/thanh nhẹ → nghe vài mẫu đã dạy → chào hỏi và cặp xã giao → tên/sức khỏe → số/thời gian/tình huống → ôn lỗi. Phân đoạn thanh nhẹ/不/一/ü đưa vào đúng bài cần dùng. Chưa sửa thứ tự đang chạy.

## Bản nháp kế tiếp và migration

Chọn **Unit 2, bài hỏi nhân khẩu `node-hsk1-2-2`**, vì đây là cụm ngay sau nhóm xã giao và có vấn đề cụ thể I05. Đây là lựa chọn biên tập theo chủ đề sau pilot Unit1; không bỏ qua Unit0 đang đứng đầu đường cũ hoặc tự mở khóa Unit2. Xem [bản nháp](hsk1-unit2-family-draft.md).

Không cần migration để chuẩn bị phiếu và bản nháp tài liệu: không thay runtime, storage, ID, thứ tự hoặc mở khóa. Khi sau này muốn bật trình tự mới/chuyển cúp thành tùy chọn, áp dụng thiết kế [GĐ2 §8–9](hsk1-phase2-beginner-journey.md): manifest cũ cố định, bảo lưu quyền cũ, không completion giả, backup/preview/candidate/readback, chạy lại an toàn, dữ liệu thiếu/hỏng, nhiều tab, rollback không mất lần học mới, tương thích backup v1/v2; các ca người mới/học dở/rải rác/40/40/free mode. **Chưa triển khai hoặc bật migration; cần xem xét riêng.**
