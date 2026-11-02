# Giai đoạn 4 — Bài ôn và phần phụ

Ngày: 2026-11-02 (Việt Nam). Baseline `1cb7315924c98ee0bf776283016df17f4bef6e06`; nhánh `refactor/learning-safety-a5bb852`; PR #1 open/draft khi bắt đầu, remote head khớp checkout sạch.

## Đã thực hiện

- Đưa **Bài tiếp theo**, tiến độ thực theo ID đã lưu, nút **Ôn câu đã sai** và danh sách **Bài đã học và bài ôn** lên đầu HSK1.
- Bài tiếp theo dùng đúng hàm `roadmapNodeStatus` và thứ tự gốc. Người hoàn thành hết thấy lời mời ôn thay vì bài chưa tồn tại. Người có tiến độ rải rác/free mode không bị gán thêm completion.
- Nút ôn lỗi mở chính modal sổ lỗi hiện có; không tạo bộ đếm hoặc lịch ôn giả.
- Học lại mở bài gốc; xem danh sách chỉ đọc dữ liệu. Bài khóa giữ khóa, bài cúp đang là bước kế tiếp vẫn được gợi ý đúng.
- Thu gọn công cụ (ôn thẻ, ghép tốc độ, viết, nói, học vượt) trong details; thay thẻ div có onClick bằng nút thật. Thu gọn rương, nhiệm vụ, bảng xếp hạng mô phỏng và streak trong nhóm bổ trợ; vẫn truy cập được trên mobile. HSK2–4 giữ nhóm công cụ/bổ trợ mở mặc định.
- Phân loại đủ 9 cúp trong `src/data/hsk1ReviewCatalog.ts`: mục đích đang có và quyết định biên tập dự kiến; giao diện không gọi cúp là kiểm tra toàn diện khi chỉ ghép lời chúc.
- Thêm [backlog HSK2–4](hsk2-4-backlog.md) từ dữ liệu thực; chưa sửa nội dung các cấp đó.

## Quyết định về 9 cúp

| ID | Giá trị hiện tại | Quyết định trước khi chuyển thành tùy chọn |
|---|---|---|
| node-hsk1-0-4 | Nhận diện lại số | Có thể đưa thành ôn từ tùy chọn |
| node-hsk1-1-4 | Xã giao, có xin lỗi/đáp lại chưa được dạy trong đường chính | Dạy các cụm trước; chưa giấu bài |
| node-hsk1-2-4 | Từ người thân mới | Đưa phần dạy vào cụm gia đình trước |
| node-hsk1-3-4 | Ôn từ ăn/uống | Có thể thành ôn từ tùy chọn |
| node-hsk1-4-4 | Ghép lịch trình | Giữ giá trị ứng dụng, dạy đủ từ trước |
| node-hsk1-5-5 | Ghép yêu cầu mua số lượng | Giữ làm ôn ứng dụng |
| node-hsk1-6-5 | Nhận diện bốn động từ kỹ năng | Ôn từ; không coi là thực hiện bốn kỹ năng |
| node-hsk1-7-5 | Câu vị trí có định ngữ | Dạy định ngữ trước khi ôn |
| node-hsk1-8-5 | Lời chúc cuối khóa | Đề xuất xuống phụ; cần bài kiểm tra mới riêng |

**Chưa bỏ cúp khỏi chuỗi mở khóa.** Đây là thay đổi cách tìm bài và thu gọn phần phụ; mảng dữ liệu, thứ tự, ID, hàm mở khóa và lưu trữ không đổi. Phương án migration trong thiết kế GĐ2 còn cần triển khai/test trước khi bật trình tự 37 bài. Giao diện nêu rõ các bài ôn cuối unit vẫn giữ điều kiện mở khóa hiện tại, không gắn nhãn tùy chọn sai thực tế.

## Bảo toàn dữ liệu

Không thêm khóa storage, không chạy migration hoặc sửa schema backup trong GĐ4. Không xóa/gán completion, XP, SRS, sổ lỗi. Kiểm thử xác nhận xem danh sách/gợi ý không ghi dữ liệu và quyền từng cúp bằng quy tắc gốc, gồm completion rải rác/free mode/40 chặng hoàn thành. Replay vẫn đi qua luồng hoàn thành/thưởng hiện có; không tuyên bố đây là bản sửa chính sách thưởng replay.

Mọi thay đổi source dùng cho nhánh thử nghiệm. Không merge/deploy. Kỹ năng React best-practices được dùng để rà hooks, derived state, nút thao tác, keys ổn định và phạm vi CSS; không thêm thư viện giao diện.

## Xác minh

- `npm test`: **31/31 PASS**, gồm ba test mới cho gợi ý/ôn bài/bảo toàn trạng thái. Bộ test App cũ vẫn hoàn thành bài đầu và tải lại tiến độ đúng.
- `npm run build`: **PASS**; chunk chính khoảng 735 kB còn cảnh báo >500 kB. Backend không đổi.
- `node --check tests/browser/pathFocus.smoke.mjs`, `git diff --check`: PASS.
- CI bổ sung thử giao diện lộ trình ở 320/390/1280px: chặng kế tiếp cũ là cúp, khóa ôn, học lại bằng bàn phím, mở sổ lỗi, thu gọn/mở công cụ, tải lại không đổi ID. Chạy cùng test bài mẫu GĐ3. Kết quả CI và xem screenshot phải báo theo commit cuối; không tính thêm script là đã PASS.
- Chưa thử điện thoại thật, Safari hoặc phát âm thật; chưa thay thế duyệt nội dung của GĐ3 bằng test DOM/Chromium.

## Trạng thái Giai đoạn 5

Phần độc lập đã làm: kiểm kê HSK2–4 thành backlog. Chưa áp dụng hàng loạt bài mẫu sang các unit HSK1: nội dung mẫu vẫn pending ngôn ngữ và tài nguyên, chưa có nghiệm thu với người học/giọng thiết bị thật. Kế hoạch gốc quy định “Sau khi bài mẫu được nghiệm thu” mới áp dụng tiếp và kiểm duyệt từng unit.

GĐ4 không tự coi test phần mềm thành nghiệm thu ngôn ngữ. Để tiếp tục GĐ5 an toàn: hoàn tất duyệt bài mẫu, rồi biên tập HSK1 từng unit theo bảng GĐ1/GĐ2, có nguồn, phần dạy, ví dụ, luyện có hướng dẫn, tự làm và ôn; thực hiện/test migration trước thay thứ tự và đưa cúp thành tùy chọn. Không tuyên bố HSK1 đã đủ chuẩn khi chưa xác định chương trình và bằng chứng bao phủ.
