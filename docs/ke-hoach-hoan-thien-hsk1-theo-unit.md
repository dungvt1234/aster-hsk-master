# Kế hoạch hoàn thiện lộ trình HSK 1 theo từng unit

## 1. Mục tiêu

Biến lộ trình hiện có thành một hành trình cho người mới: biết bắt đầu ở đâu, được giải thích trước khi làm bài, có luyện tập, phản hồi, ôn lỗi và đánh giá cuối. Ưu tiên nội dung hữu ích và chính xác, không tăng số câu chỉ để đạt chỉ tiêu.

Repository: `dungvt1234/aster-hsk-master`. Nhánh: `refactor/learning-safety-a5bb852`. [PR #1](https://github.com/dungvt1234/aster-hsk-master/pull/1) vẫn là draft tại thời điểm lập kế hoạch. Mốc tham khảo `75abc30c09de07ffff5b90077a06070691a76d52`; cần kiểm tra head thực tế trước khi làm, không mặc định mốc vẫn mới nhất.

Kế hoạch này chi tiết hóa, không xóa hay thay thế:
- [Kế hoạch ban đầu](ke-hoach-hoan-thien-lo-trinh-hsk.md).
- [Kế hoạch nghiệm thu bài mẫu](ke-hoach-nghiem-thu-va-mo-rong-hsk1.md).
- [Kiểm kê HSK1 và 71 câu](content/hsk1-phase1-inventory.md).
- [Thiết kế hành trình và phương án tiến độ](content/hsk1-phase2-beginner-journey.md).
- [Báo cáo bài mẫu](content/hsk1-pilot-acceptance.md).
- [Bảng chuẩn bị 9 unit](content/hsk1-expansion-preparation.md) và [bản nháp Unit 2](content/hsk1-unit2-family-draft.md).

## 2. Hiện trạng và giới hạn kết luận

Kiểm kê tại commit được ghi trong báo cáo: HSK1 có 9 unit, 40 chặng, 71 lượt câu; 16 chặng một câu, 21 chặng hai câu. Một lượt ghép có thể chứa nhiều cặp. Có 123 mục từ trong kho, 15 bài ngữ pháp và sổ tay 9 unit, nhưng kho hay sổ tay tùy chọn không chứng minh người học đã được dạy trước câu hỏi. Mỗi số liệu cần được xác minh lại trên head.

Bài mẫu chào hỏi hiện mở DEV, có kiểm thử kỹ thuật; chưa có duyệt chuyên môn, người học thật, âm thanh trên thiết bị thật và quyền tài nguyên. HSK2–4 mới kiểm kê cấu trúc. Phiên bản chương trình HSK chưa được xác định; không tuyên bố bao phủ hay đạt chuẩn thi chỉ dựa vào tên cấp, số từ hoặc test.

## 3. Nguyên tắc và quyền hạn

1. Đọc AGENTS.md nếu có; kiểm tra nhánh, head, PR, working tree và thay đổi đang có. Không ghi đè hoặc xóa công việc không rõ nguồn gốc.
2. Làm trên nhánh thử nghiệm; bảo toàn tiến độ, node/challenge ID, thứ tự, điều kiện mở khóa, XP, SRS, sổ lỗi và backup. Nội dung nháp chưa duyệt không mở cho người dùng production.
3. Không đổi thứ tự hoặc xóa node, thay cơ chế mở khóa, bật migration, merge hay deploy production theo kế hoạch này. Nếu cần thay, thiết kế riêng kèm đánh giá và bằng chứng trước.
4. Có thể biên soạn, sửa mã và thử nội bộ trên nhánh theo từng gói công việc; không đợi duyệt chuyên môn để chuẩn bị nội dung hoặc kiểm thử kỹ thuật độc lập. Chưa duyệt phải ghi PENDING; không thay bằng tuyên bố hoàn thành.
5. Không sao chép hàng loạt Drive; truy vết nguồn và tình trạng quyền của tài nguyên. Không khẳng định giọng bản xứ, chấm phát âm, chứng chỉ hay đồng bộ thật khi chưa có. TTS ghi rõ giọng thiết bị, có đường xử lý không phát được.
6. Mobile, bàn phím, khả năng đọc và reduced motion là yêu cầu cơ bản. Không thêm backend, tài khoản, AI, dịch vụ trả phí hoặc dependency lớn ngoài nhu cầu đã được chấp thuận.
7. Không tự xác nhận nội dung bằng tên người duyệt giả. Bài tập và nguồn cần người có chuyên môn rà, trải nghiệm cần người mới thật thử; khi chưa thể thì ghi điều kiện và tiếp tục phần độc lập.
8. Người dùng đã yêu cầu hoàn thiện HSK1: tiến hành tuần tự trong phạm vi được giao, báo cáo từng unit. Việc phát hành công khai và thay đổi tiến độ nằm ngoài phạm vi ở đây.

## 4. Khuôn bài học cho người mới

Mỗi mục tiêu cần một hành trình phù hợp, có thể gộp bước để tránh dài:
1. Mục tiêu và kiến thức cần biết trước, dùng lời dễ hiểu.
2. Giải thích kiến thức mới trước khi hỏi; từ/câu có Hán tự, pinyin, nghĩa, ngữ cảnh và âm thanh khi phù hợp.
3. Ví dụ ngắn và luyện có hướng dẫn; phản hồi giải thích vì sao đúng/sai.
4. Tự làm bằng ngữ cảnh hoặc biến thể khác phần vừa hướng dẫn; không lộ đáp án khi đang kiểm tra nghe/dịch.
5. Tóm tắt, ôn câu sai, kết quả trung thực và cách học lại. Không bắt lặp vô hạn.

Không bắt buộc mọi bài đủ mọi dạng câu; số lượng theo mục tiêu, nhưng mỗi mục tiêu cần bằng chứng luyện tập có ý nghĩa, không lấy một câu đơn làm bằng chứng thành thạo. Phân biệt nhận diện từ “nghe/nói/đọc/viết” với thực hành bốn kỹ năng. Với câu có nhiều cách đúng, dùng biến thể được duyệt hoặc câu hỏi rõ giới hạn; không tự nhận mọi hoán vị hợp lệ.

## 5. Gói A — Xác minh và hoàn thiện bài mẫu

A1. Đọc báo cáo, chạy bài mẫu và test hiện có, xác nhận trên commit thực tế. Ghi test nào tự chạy, test nào chỉ đọc CI, điều kiện audio/thiết bị.

A2. Hai câu hướng dẫn hiện lặp câu tự làm: đề xuất và sửa ngữ cảnh/đáp án nhiễu để không kiểm tra việc nhớ vị trí, vẫn giữ mục tiêu và trạng thái nội dung chưa duyệt. Rà giải thích pinyin cho người chưa học; ưu tiên giải thích ngắn, không kết luận đủ phát âm. Ghi thay đổi/nguồn và test hồi quy.

A3. Chuẩn bị bản xem thử cho anh trên desktop/mobile: ưu tiên bản preview được bảo vệ, tách production, gắn chính xác commit, không dùng dữ liệu thật. Kiểm tra truy cập thực tế bằng phương thức có thể dùng trên điện thoại và ghi URL/hướng dẫn. Không giả định một build production hiện nút DEV: thiết kế đường mở bài mẫu chỉ cho preview, kiểm tra production không mở. Nếu không có quyền/công cụ triển khai riêng tư phù hợp, báo BLOCKED kèm cách chạy local cụ thể, không làm công khai hoặc thay protection. Không ghi preview PASS nếu chưa kiểm tra truy cập.

A4. Cập nhật phiếu 16 mục, checklist U01–U10/D01–D07, các điểm chuyên môn/nguồn/quyền; ghi người, ngày, commit khi có kết quả thực. Kiểm tra giọng thật trên thiết bị khi có điều kiện, không xem stub là nghe thật.

**Đầu ra:** bài mẫu đã sửa trong nhánh; báo cáo so sánh trước/sau, test, preview hoặc lý do bị chặn; phiếu duyệt. **Cổng mở rộng:** chỉ coi bài mẫu đã được nghiệm thu khi có bằng chứng nội dung, quyền và trải nghiệm thực, mọi lỗi chặn xử lý; không chuyển trạng thái PENDING thành PASS bằng test.

## 6. Gói B — Chuẩn bị Unit 0 và nền tảng cho người mới

Làm độc lập với việc chờ người duyệt:
- Lập bảng mục tiêu, kiến thức trước, nguồn, ánh xạ ID `node-hsk1-0-1` đến `node-hsk1-0-4`, nội dung dạy và từng câu đang hỏi.
- Biên soạn bản nháp ngắn: chữ Hán là gì, pinyin là cách ghi âm, bốn thanh và thanh nhẹ; vài mẫu nghe/nhận diện đã dạy. Không tuyên bố học hết phát âm trong một bài.
- Dạy 1–5, 6–10, sau đó cách ghép số phù hợp phạm vi bài. Bổ sung ví dụ và luyện nhận diện/nghe/ghép phù hợp trước câu hỏi. Chỉ nhắc giá hoặc 100 khi có phần dạy tương ứng, hoặc sửa nhãn theo nội dung thực.
- Thiết kế ôn số và giải thích lỗi. Không xem một câu ghép là bài đánh giá tổng hợp.
- Tái sử dụng kho/guidebook hiện có khi phù hợp; chuẩn bị nội dung có nguồn và trạng thái duyệt, không bật thay đổi lộ trình cho production.

Sau cổng A, triển khai Unit 0 trên nhánh theo khuôn bài, giữ ID/tiến độ cũ. Kiểm tra người mới, đang học dở, đã hoàn tất, free mode, học lại; không cấp lại thưởng do tự ý đánh dấu hoàn thành. Nêu rõ chính sách replay hiện có và tác động nếu chưa thay.

## 7. Gói C — Các unit HSK1 tiếp theo

Dùng đúng ID trong bảng kiểm kê. Với từng unit, tạo bảng **ID cũ → mục tiêu → cần biết trước → phần dạy → ví dụ → luyện → ôn → nguồn/trạng thái → test**. Không coi từ hiện diện trong kho là đã được dạy.

| Thứ tự | Unit | Nội dung và việc cần làm |
|---|---|---|
| 1 | Unit 1 — chào hỏi, tên, sức khỏe | Dùng kết quả A; bổ sung cảm ơn, tạm biệt, tên và hỏi thăm theo kiến thức đã dạy; dạy cụm xin lỗi trước bài ôn. |
| 2 | Unit 2 — gia đình | Dạy 这/那/是, từ người thân, 有/几/口/人 và 的 theo mục tiêu; rà câu hỏi 口/个, bản nháp không được coi là đã duyệt. |
| 3 | Unit 3 — ăn uống | Dạy 想/喜欢/吃/喝/吗 và 太…了 trước khi dùng; thêm tình huống gần gũi, rà tên bài sát nội dung. |
| 4 | Unit 4 — ngày giờ | Dạy ngày, số ghép, giờ, buổi và từ cần cho lịch trình; ví dụ giờ và ôn trước câu kiểm tra. |
| 5 | Unit 5 — mua sắm | Dạy hỏi giá, tiền và lượng từ; rà biến thể câu hỏi giá, 块/元 và đáp án; không hứa tính năng thanh toán chưa có. |
| 6 | Unit 6 — trường lớp | Dạy từ trường lớp, 都/们/会, vị trí và lượng từ liên quan; không gọi ghép từ là đã luyện đủ bốn kỹ năng. |
| 7 | Unit 7 — địa điểm | Dạy hỏi nơi, trước/sau/bên cạnh, phương tiện và định ngữ trước câu hỏi; bảo đảm nhãn khớp phần luyện. |
| 8 | Unit 8 — thời tiết/sở thích | Rà 太冷了 và nghĩa tiếng Việt, 会 dự báo, mùa/hoạt động; chỉnh nhãn hoặc bổ sung nội dung tương ứng. |

Với mỗi unit: xác minh phạm vi, soạn bản nháp và đối chiếu nguồn, thực hiện trên nhánh sau cổng A, kiểm tra theo §9, tạo báo cáo riêng ghi PASS/FAIL/PENDING và bằng chứng. Có thể chuẩn bị unit sau dưới dạng nháp khi chờ duyệt unit trước, nhưng không xem unit trước đã được nghiệm thu nếu thiếu bằng chứng.

## 8. Ôn tập và tổng kết

- Rà đủ 9 bài cúp: xác định thực sự ôn gì, từ nào chưa được dạy và nhãn có khớp không; giữ nguyên vai trò mở khóa đến khi có migration được duyệt.
- Thiết kế bài cuối khóa lấy mẫu các mục tiêu quan trọng đã dạy: nhận diện, đọc hiểu ngắn, nghe khi thiết bị hỗ trợ, câu tình huống. Cân đối nhiều unit, phản hồi minh bạch, không gọi kết quả là chứng chỉ hay đề thi chính thức.
- Bài “toàn diện” hiện chỉ ghép câu chúc: đề xuất sửa tên/nội dung và sơ đồ ánh xạ bảo toàn tiến độ; không tự thay node, khóa hay trạng thái người học khi chưa có phương án được xem xét.
- Chưa triển khai lịch ôn thông minh mới hay khẳng định ghi nhớ dài hạn nếu chưa có thiết kế và bằng chứng.

## 9. Tiêu chí kiểm thử và nghiệm thu mỗi unit

**Nội dung:** mỗi câu có mục tiêu và kiến thức được dạy trước trong đường học hoặc có đường dẫn ôn rõ; ngữ cảnh và đáp án có cơ sở, nguồn/trạng thái quyền rõ; người duyệt tiếng Trung ghi kết luận theo ID. Nếu chưa có reviewer: PENDING, giữ nháp/thử nội bộ.

**Kỹ thuật:** đúng/sai/chưa chọn; các biến thể đã duyệt; ôn sai; thoát và quay lại; lưu thành công, lỗi ghi và thử lại; bảo toàn dữ liệu cũ; backup cũ, học lại; âm thanh không có giọng/lỗi/đọc xong trễ, không lộ đáp án nghe. Test có ý nghĩa, tránh chỉ kiểm tra khớp mã.

**Trải nghiệm:** 320/390/1280 px và tương tác chạm, bàn phím/focus, reduced motion, không cuộn ngang; kiểm thử thật iPhone/Safari và Android/Chrome khi có thiết bị. Thử với người mới không tiết lộ đáp án, ghi điểm chưa hiểu, mức trợ giúp, thời gian và kết quả; âm thanh thật ghi thiết bị/giọng. CI/giả lập không thay thiết bị thật.

**Đầu ra:** báo cáo unit kèm SHA, file/ID, từng mục PASS/FAIL/BLOCKED/PENDING, bằng chứng và lỗi; tự chạy `npm test`, `npm run build`, test browser phù hợp; backend build nếu sửa backend. Kiểm tra GitHub Actions ở SHA cuối và nêu rõ local khác CI.

## 10. HSK2–4 và đối chiếu chuẩn

Không sửa hàng loạt HSK2–4 trong đợt HSK1; cập nhật [backlog](content/hsk2-4-backlog.md) nếu phát hiện dữ kiện liên quan. Về sau xác định nguồn và phiên bản/chương trình HSK, phạm vi từ/cấu trúc/kỹ năng, quyền sử dụng, rồi lập ma trận đối chiếu có nguồn theo ID. Nếu không có nguồn đủ tin cậy ghi UNKNOWN; không tự kết luận thiếu/đủ chuẩn hoặc tự tạo đề chính thức.

## 11. Bảo toàn tiến độ nếu sau này cần đổi cấu trúc

Lập thiết kế và thử nghiệm riêng: manifest ID cũ → mới, quyền truy cập cũ, bản sao lưu, preview, migration chạy lại an toàn, dữ liệu thiếu/hỏng, nhiều tab, rollback không mất dữ liệu mới và tương thích backup. Bao phủ người mới, học dở, rải rác, hoàn thành hết, free mode. Không bật trước khi được xem xét riêng; không tạo completion hay thưởng giả.

## 12. Chỉ thị bắt đầu cho Codex

1. Kiểm tra repo/PR/head, đọc các tài liệu và tình trạng công việc; bảo toàn thay đổi hiện có.
2. Thực hiện Gói A; đồng thời hoàn thành phần chuẩn bị độc lập của Gói B. Tạo preview riêng tư nếu hạ tầng và quyền hiện có cho phép; nếu bị chặn, nêu chính xác và tiếp tục việc khác.
3. Khi có bằng chứng nghiệm thu bài mẫu, triển khai Unit 0 rồi lần lượt các unit theo §7; khi phải chờ người duyệt, tiếp tục chuẩn bị các bản nháp và kiểm thử độc lập. Không tự tuyên bố đạt cổng.
4. Commit theo các gói rõ ràng lên nhánh thử nghiệm; không merge/deploy production. Cập nhật PR hoặc báo cáo cho dễ theo dõi nếu được phép.
5. Bàn giao: commit/nhánh, việc đã làm, links preview và báo cáo, test/lệnh/CI, kết quả nghiệm thu từng mục, vấn đề còn chờ và bước thực hiện tiếp theo.
