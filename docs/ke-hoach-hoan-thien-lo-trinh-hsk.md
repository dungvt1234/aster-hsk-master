# KẾ HOẠCH HOÀN THIỆN LỘ TRÌNH HỌC — ASTER HSK

## 1. Mục tiêu

Rà soát và nâng cấp lộ trình để người mới học theo trình tự: làm quen phát âm → học từ và câu cơ bản → thực hành → ôn tập → kiểm tra.

Ưu tiên hoàn thiện HSK 1. HSK 2–4 chỉ kiểm kê và lập danh sách việc cần làm, chưa tự mở rộng nội dung.

## 2. Phạm vi và trạng thái

- Repository: https://github.com/dungvt1234/aster-hsk-master
- Nhánh thử nghiệm: `refactor/learning-safety-a5bb852`; PR: https://github.com/dungvt1234/aster-hsk-master/pull/1
- Báo cáo hiện có: `docs/content/roadmap-review.md`.
- Tài liệu tham khảo: https://drive.google.com/drive/folders/1npnanhcHdnK7GyIuueKPvcttOwcX35D4
- Lần kiểm kê trước ghi nhận HSK 1 có 9 unit, 40 chặng; xác minh lại theo commit thực tế.
- Nhánh đã có hướng dẫn trước bài số đếm, một số câu luyện bổ sung và sửa việc hiện sẵn đáp án câu nghe/ghép. Chưa xác nhận toàn bộ nội dung đạt chuẩn HSK hoặc kiểm tra đầy đủ trên điện thoại thật.

## 3. Nguyên tắc bắt buộc

1. Kiểm tra commit, nhánh, PR và thay đổi chưa commit trước khi sửa; không ghi đè hoặc xóa thay đổi chưa rõ nguồn gốc.
2. Giữ tiến độ người học. Không đổi ID, xóa chặng hoặc thay thứ tự mở khóa nếu chưa có phương án chuyển dữ liệu và kiểm thử.
3. Phân biệt nội dung thực và mô phỏng. Không ghi “chuẩn đề thi”, “giọng bản xứ”, “AI” hoặc “đồng bộ” nếu chưa xác minh.
4. Không sao chép toàn bộ Drive vào app. Ghi nguồn; chỉ xuất bản tài nguyên có quyền sử dụng.
5. Không khẳng định lộ trình đủ chuẩn HSK nếu chưa xác định phiên bản/chương trình HSK và có bằng chứng đối chiếu.
6. Ưu tiên mobile; không tự thêm tài khoản, mạng xã hội, AI hoặc hạ tầng mới.
7. Không triển khai production hoặc gộp PR trong kế hoạch này. Hoàn thiện trên nhánh thử nghiệm và báo kết quả trước.
8. Dừng đúng phạm vi từng giai đoạn.

## 4. Giai đoạn 1 — Kiểm kê lộ trình HSK 1

Lập bảng cho từng unit và chặng: ID, tên, mục tiêu, kiến thức cần biết trước, từ vựng/mẫu câu/ngữ pháp, dạng bài, số câu, vấn đề, nguồn đối chiếu và quyết định giữ/sửa/bổ sung/đưa xuống phần phụ.

Đối chiếu mã nguồn, `docs/content/roadmap-review.md`, ba bài HSK 1 đã đối chiếu trong Drive và dữ liệu từ vựng, ngữ pháp hiện có. Tách rõ đã xác nhận, nghi ngờ và chưa kiểm tra. Kiểm tra câu lộ đáp án, thiếu đáp án đúng, nhiều đáp án hợp lý, kiến thức chưa dạy, chặng ít câu và bài cúp lặp. Không mặc định trùng chủ đề giữa HSK 1–2 là lỗi.

Đầu ra: báo cáo kiểm kê HSK 1 trong repo, xếp vấn đề theo mức ảnh hưởng. Đạt khi liệt kê đủ unit/chặng của commit được kiểm tra, mỗi vấn đề quan trọng có ID và vị trí bằng chứng. Chưa sửa nội dung học ở giai đoạn này.

## 5. Giai đoạn 2 — Thiết kế hành trình người mới

Đề xuất trình tự: chữ Hán/pinyin/thanh điệu → nghe và nhận diện âm → chào hỏi/cảm ơn/xin lỗi/giới thiệu → số đếm/thời gian/tình huống gần gũi → ôn lỗi và kiểm tra ngắn.

Mỗi bài: mục tiêu → kiến thức mới → ví dụ → luyện có hướng dẫn → bài tự làm → ôn lại.

Lập sơ đồ và bảng bài cũ → bài mới, chỉ rõ ID tái sử dụng, bài mới, tác động tới người đã hoàn thành và mở khóa, cách sao lưu/chuyển đổi/khôi phục. Đề xuất phần đưa xuống phụ hoặc ôn tập tùy chọn.

Đạt khi người mới biết bắt đầu ở đâu, học gì tiếp và ôn ở đâu; không thay đổi dữ liệu người học trong giai đoạn thiết kế.

## 6. Giai đoạn 3 — Hoàn thiện một bài mẫu

Chọn một bài nhập môn hoặc chào hỏi HSK 1 theo kết quả giai đoạn 2. Chưa triển khai đồng loạt.

Bài có mục tiêu, kiến thức trước câu hỏi, Hán tự/pinyin/nghĩa, ví dụ đúng trình độ, nghe/nhận diện và bài tự trả lời, giải thích khi sai, kết quả, ôn lại và lưu tiến độ. Audio ghi rõ bản thu thật có quyền sử dụng hoặc giọng đọc thiết bị; không ghép MP3 chỉ theo số track.

Kiểm thử đúng/sai, chưa chọn đáp án, không lộ đáp án nghe, thoát giữa bài, hoàn thành/tải lại, lỗi lưu, thao tác và cuộn mobile, bàn phím và giảm chuyển động khi có animation. Đạt khi học hết, kết quả và tiến độ khớp; ghi nguồn và phần chưa duyệt.

## 7. Giai đoạn 4 — Bài ôn và phần phụ

Phân loại cúp cuối unit theo giá trị ôn tập; đề xuất phần lặp thành tùy chọn. Cân nhắc gom rương, giải đấu mô phỏng và quảng bá khỏi đường học chính. Chỉ đổi điều hướng/mở khóa sau khi có phương án bảo toàn tiến độ. Đạt khi dễ thấy bài tiếp theo và bài ôn, tiến độ cũ còn nguyên.

## 8. Giai đoạn 5 — Mở rộng có kiểm soát

Sau khi bài mẫu được nghiệm thu: áp dụng cho các bài HSK 1 tiếp theo, kiểm duyệt từng unit, kiểm kê HSK 2–4 thành backlog riêng. Đề thi và audio thật làm giai đoạn riêng sau khi xác nhận nguồn, phiên bản và quyền sử dụng.

## 9. Kiểm tra trước bàn giao

Chạy `npm test`, `npm run build`. Nếu thay đổi backend, chạy `cd backend && npm run build`.

Báo riêng test tự động, luồng thử trực tiếp, phần chỉ đọc mã, phần chưa kiểm tra được, lỗi và tác động; kiểm tra trạng thái GitHub Actions trên đúng commit cuối.

## 10. Mẫu báo cáo sau từng giai đoạn

```text
Giai đoạn:
Commit / nhánh:

Đã làm:
- ...

Bằng chứng:
- File hoặc liên kết:
- Test đã chạy và kết quả:

Chưa hoàn thành / rủi ro:
- ...

Đề xuất bước tiếp theo:
- ...
```

Nếu cần thay đổi tiến độ cũ, chuẩn bị phương án chuyển đổi và bản sao lưu để xem xét. Nếu bị chặn, tiếp tục phần độc lập và báo rõ.

## Chỉ thị bắt đầu cho Codex

Bắt đầu với Giai đoạn 1 — kiểm kê lộ trình HSK 1. Kiểm tra PR #1 và nhánh hiện tại trước, giữ nguyên các thay đổi đã có. Lập báo cáo bằng chứng theo từng unit và chặng; chưa sửa, xóa hoặc sắp xếp lại bài học. Sau khi hoàn thành, cập nhật báo cáo và trình kết quả Giai đoạn 1.
