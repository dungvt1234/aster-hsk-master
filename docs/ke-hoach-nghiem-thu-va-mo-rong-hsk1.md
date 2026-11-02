# Kế hoạch tiếp tục: nghiệm thu bài mẫu và hoàn thiện HSK 1

## 1. Mục tiêu và phạm vi

Tạo một lộ trình dễ bắt đầu: biết học gì, được học trước khi làm bài, có phản hồi và có thể ôn lại. Tiếp nối [kế hoạch gốc](ke-hoach-hoan-thien-lo-trinh-hsk.md); nếu có khác biệt, giữ các giới hạn an toàn và điều kiện nghiệm thu của kế hoạch gốc.

- Repository: dungvt1234/aster-hsk-master; nhánh làm việc `refactor/learning-safety-a5bb852`; [PR #1](https://github.com/dungvt1234/aster-hsk-master/pull/1).
- Mốc đã xem xét: commit `a45be77ccb62b1078c517e20bec5760131c44906`. Mốc này có thể đã cũ: luôn kiểm tra head và trạng thái thực tế trước khi làm.
- Ưu tiên HSK 1. HSK 2–4 chỉ duy trì backlog đã có; không tự mở rộng nội dung.
- Không merge PR, triển khai production, thay đổi quyền truy cập hoặc xóa dữ liệu người học trong kế hoạch này.

## 2. Tài liệu phải đọc trước

1. [Kế hoạch gốc](ke-hoach-hoan-thien-lo-trinh-hsk.md).
2. [Kiểm kê HSK 1](content/hsk1-phase1-inventory.md).
3. [Thiết kế hành trình người mới](content/hsk1-phase2-beginner-journey.md).
4. [Báo cáo bài mẫu](content/hsk1-phase3-pilot-review.md).
5. [Báo cáo lộ trình và bài ôn](content/hsk1-phase4-review-and-focus.md).
6. [Backlog HSK 2–4](content/hsk2-4-backlog.md).

Trước khi thay đổi, xem AGENTS.md nếu có, git status, nhánh, head và thay đổi chưa commit. Tôn trọng công việc đang có; nếu không rõ nguồn gốc thì tránh ghi đè. Đối chiếu nhận định dưới đây với mã và kiểm thử trên head thực tế.

## 3. Điểm xuất phát sau nghiệm thu

Tại mốc trên: bài mẫu “Chào hỏi và xin lỗi” chỉ mở trong môi trường DEV; đã có phần học, luyện, làm bài, ôn sai và lưu kết quả riêng. Phần HSK 1 đã đưa bài tiếp theo và ôn tập dễ tìm hơn nhưng vẫn dùng quy tắc mở khóa cũ. Bài mẫu chưa được duyệt chuyên môn tiếng Trung, quyền tài nguyên, trải nghiệm với người mới và âm thanh thật. HSK 1 chưa được chuyển đổi toàn bộ; HSK 2–4 mới có backlog.

CI ở mốc đó đã chạy test, build và smoke Chromium ở 320/390/1280 px. Kết quả CI không thay thế nghiệm thu nội dung, thử trên thiết bị thật hoặc kiểm tra Safari. Không coi đây là xác nhận cho các commit về sau.

## 4. Nguyên tắc thực hiện

- Học trước khi hỏi; ví dụ ngắn, dễ hiểu, có Hán tự, pinyin, nghĩa và giải thích khi cần. Không thêm bài chỉ để tăng số lượng.
- Xác định nguồn cho từng nội dung; không chép tài liệu Drive hàng loạt và không xuất bản hình/âm thanh chưa rõ quyền.
- Ghi rõ giọng thiết bị khi dùng TTS. Không tuyên bố có giọng bản xứ, đánh giá phát âm, đồng bộ hoặc chứng nhận nếu chưa có bằng chứng.
- Không tự khẳng định “đủ chuẩn HSK”. Ghi rõ chương trình/phiên bản và nguồn đối chiếu nếu xác minh được; nếu không, đánh dấu chưa xác định và tiếp tục công việc độc lập.
- Giữ ID, thứ tự, quy tắc mở khóa, XP, SRS, sổ lỗi và backup hiện có, trừ khi có thiết kế migration, kiểm thử và quyết định cho phép thay đổi. Không tự chuyển cúp thành tùy chọn khi vẫn là điều kiện mở khóa.
- Ưu tiên mobile, thao tác bàn phím và reduced motion. Không thêm tài khoản, AI, backend hay thư viện lớn chỉ để thực hiện kế hoạch.
- Không tự nhận đã được chuyên gia hoặc người dùng thật phê duyệt. Ghi rõ người thực hiện, bằng chứng, chưa kiểm tra và điều kiện chặn.
- Nếu cần chuyên gia, người học hoặc thiết bị thật mà không có, tạo checklist và mẫu ghi nhận; đánh dấu BLOCKED/PENDING, tiếp tục phần độc lập. Không tự vượt qua cổng mở rộng hoặc xuất bản nội dung.

## 5. Bước A — Xác minh lại và nghiệm thu kỹ thuật bài mẫu

1. Chạy bài mẫu hiện có từ nhánh thực tế; kiểm tra điều kiện mở DEV và dữ liệu ban đầu. Không chuyển sang production.
2. Rà từng mục: mục tiêu; 5 cụm từ và ví dụ; hướng dẫn; tự làm; nghe; ôn câu sai; kết quả; lưu, thoát và tải lại; trạng thái dữ liệu cũ/hỏng. Kiểm tra hiển thị nguồn và trạng thái duyệt.
3. Chạy `npm test`, `npm run build` và kiểm thử browser sẵn có nếu môi trường hỗ trợ. Kiểm tra trên mobile viewport 320/390, desktop, bàn phím, reduced motion; kiểm tra giọng thiết bị thật nếu thực sự có thể. Nếu không chạy được, ghi lý do và không đánh dấu PASS.
4. Ghi kết quả vào `docs/content/hsk1-pilot-acceptance.md`: commit, môi trường, từng tiêu chí PASS/FAIL/BLOCKED, bước tái hiện, bằng chứng, mức ảnh hưởng và cách khắc phục. Phân biệt tự chạy với đọc log CI.
5. Sửa lỗi kỹ thuật phát hiện trong phạm vi bài mẫu; bổ sung test có ý nghĩa cho lỗi. Không tự viết lại toàn bộ hệ thống.

**Đạt kỹ thuật:** luồng hoạt động và lưu/khôi phục đúng; không lộ đáp án nghe trước khi trả lời; lỗi âm thanh/lưu được thông báo; không làm mất tiến độ cũ; test/build và browser phù hợp có bằng chứng. Nếu còn lỗi nghiêm trọng: báo FAIL, không đề xuất mở rộng.

## 6. Bước B — Chuẩn bị duyệt nội dung và trải nghiệm

Lập bảng cho từng cụm từ, ví dụ, câu hỏi và đáp án: ID, mục tiêu, Hán tự, pinyin, nghĩa, nguồn có thể kiểm tra, điều kiện sử dụng, các cách trả lời hợp lý và trạng thái duyệt. Đánh dấu điều chưa chắc, không tự tạo bằng chứng hoặc xác nhận quyền.

Tạo checklist ngắn cho người có chuyên môn tiếng Trung: tính đúng, tự nhiên, pinyin/thanh điệu, đáp án và tính phù hợp người mới. Tạo kịch bản thử cho người mới: tìm bài, học, nghe, làm sai, ôn, lưu và quay lại; ghi nhận thiết bị, điểm khó hiểu và kết quả. Kèm checklist iOS/Safari và Android/Chrome, âm lượng/giọng thật, mất kết nối nếu liên quan. Không yêu cầu người dùng cung cấp dữ liệu cá nhân không cần thiết.

**Cổng mở rộng:** chỉ đánh dấu bài mẫu được nghiệm thu nội dung/trải nghiệm khi có bằng chứng duyệt thực tế, danh tính/vai trò người duyệt và ngày, nguồn/quyền phù hợp và các lỗi chặn đã xử lý. Thiếu bằng chứng thì PENDING; không chuyển PENDING thành PASS vì test tự động xanh.

## 7. Bước C — Chuẩn bị mở rộng HSK 1 có kiểm soát

Trong khi chờ nghiệm thu, làm các việc độc lập:

1. Dựa vào kiểm kê và thiết kế hiện có, lập bảng cho từng unit: ID cũ, mục tiêu, kiến thức tiên quyết, điểm chưa được dạy trước khi hỏi, nội dung cần thêm/sửa, nguồn, trạng thái duyệt, bài ôn và mức ưu tiên.
2. Xác định bài nhập môn pinyin/thanh điệu hiện có và khoảng thiếu; đề xuất thứ tự dễ học. Không tự đổi thứ tự mở khóa đang chạy.
3. Phác thảo nội dung và ánh xạ cho unit tiếp theo trong tài liệu hoặc dữ liệu nháp không xuất bản; ghi rõ chưa duyệt. Ưu tiên câu hỏi/đáp án có vấn đề cụ thể trong kiểm kê.
4. Nếu cần thay ID/thứ tự/mở khóa: trước hết lập bản đồ cũ → mới, dự đoán tác động, backup, migration có thể chạy lại an toàn, xử lý dữ liệu thiếu/hỏng, rollback và test cho người mới, người học dở, hoàn thành hết và free mode. Chỉ triển khai/bật sau khi được xem xét riêng; nếu không cần thì giữ nguyên.

Sau khi cổng bài mẫu thực sự đạt: mở rộng **từng unit**, không thay đổi hàng loạt. Với mỗi unit, có nội dung dạy → ví dụ → luyện có hướng dẫn → tự làm → ôn, nguồn và trạng thái duyệt; test đầy đủ, báo cáo riêng và chờ nghiệm thu unit trước khi tiếp tục. Nội dung chưa duyệt không xuất bản.

## 8. Bước D — Chuẩn bị bàn giao

- Tổng hợp các việc đã hoàn thành, chưa hoàn thành và các cổng đang chặn trong báo cáo nghiệm thu.
- Chạy lại test/build trên commit cuối; nếu sửa backend thì chạy thêm `cd backend && npm run build`. Kiểm tra Actions trên đúng SHA.
- Phân biệt kết quả thực chạy, đọc mã/log và những gì chưa thử; đính kèm đường dẫn báo cáo, lỗi, ảnh/log nếu có.
- Báo trạng thái PR, commit và các thay đổi liên quan; không tự merge/deploy.

## 9. Mẫu báo cáo

```text
Phạm vi / commit / nhánh:
Đã thực hiện:
Tiêu chí PASS:
Tiêu chí FAIL/BLOCKED/PENDING và lý do:
Kiểm thử: lệnh, môi trường, kết quả, link CI:
Bằng chứng nội dung / nguồn / quyền:
Tác động dữ liệu và việc chưa kiểm tra:
Việc tiếp theo có thể làm độc lập:
Quyết định cần người có thẩm quyền hoặc chuyên môn:
```

## Chỉ thị cho Codex

Bắt đầu từ **Bước A**, sau đó thực hiện Bước B và phần độc lập của Bước C trong cùng phạm vi. Không dừng chỉ vì thiếu người duyệt: chuẩn bị đầy đủ bằng chứng, checklist và bản nháp để việc duyệt có thể thực hiện. Không tự mở rộng nội dung được xuất bản trước khi đáp ứng cổng nghiệm thu. Báo cáo trung thực, cập nhật nhánh và để PR ở trạng thái hiện có.
