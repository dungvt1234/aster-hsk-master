# Bản nháp kế tiếp — Unit 2: hỏi nhân khẩu gia đình

**DRAFT / NOT PUBLISHED / NOT BUNDLED.** Mốc tham chiếu `f234909b156c2a2e8119d529e8e110e10fe1b675`, 2026-11-02. Người biên soạn đề xuất: Codex, chưa được người có chuyên môn duyệt. Đây là bản phác thảo một bài trong Unit2, không phải toàn bộ unit đã hoàn thiện. Không import tài liệu này vào app, không thay câu gốc hoặc kết quả cũ.

## Ánh xạ và nguồn

| Đích hiện có | Đề xuất | Tác động hiện tại |
|---|---|---|
| node-hsk1-2-1 | Giới thiệu người thân; cần phần dạy 这/是/我 trước | Không thay |
| node-hsk1-2-2 | Tái dùng ID cho bài hỏi nhân khẩu; thêm phần dạy và luyện theo mục tiêu | Chỉ phác thảo dưới đây |
| c-1-2-2-1 | Giữ mục tiêu nhận diện lượng từ nhưng làm rõ đề; không hỏi chung rồi bác bỏ 个 | Không sửa câu runtime |
| c-1-2-2-2 | Giữ câu ghép 你家有几口人; dạy trước khi hỏi và duyệt ngữ cảnh/biến thể | Không sửa câu runtime |
| node-hsk1-2-3 / node-hsk1-2-4 | Giữ bài 的 và từ người thân; dạy từ của cúp trước khi đổi vai trò cúp | Không thay |

Nguồn nội bộ truy vết: `src/data/unitGuidebookData.ts`, `unit-hsk1-2` công thức 我家有…口人; `src/data/grammarDataHsk1.ts`, G04 về 有 và danh lượng từ; V có 家/有/几/口/人. Ba slide nguồn S1–S3 chưa đủ xác nhận chủ đề gia đình. Nguồn ngoài cho bài này, ngôn ngữ và quyền: **PENDING**; không ghi đã đối chiếu giáo trình gia đình hoặc đã được cấp phép.

## Mục tiêu và phần dạy đề xuất

Mục tiêu: nhận ra/hiểu câu hỏi số người trong gia đình theo mẫu `你家有几口人？`, và trả lời với số đã học. Tiên quyết: biết 你/我, số nhỏ 1–5; nếu chưa nhớ mở đoạn học lại, không dùng kết quả lưu để suy ra mọi từ đã biết.

| ID nháp | Chữ / pinyin / nghĩa | Cách dùng cần duyệt |
|---|---|---|
| draft-family-jia | 家 · jiā · nhà/gia đình | 你家: nhà/gia đình bạn; 我家: gia đình tôi |
| draft-family-you | 有 · yǒu · có | Đứng sau chủ thể nói có bao nhiêu người |
| draft-family-ji | 几 · jǐ · mấy/bao nhiêu | Dùng trong câu hỏi số lượng nhỏ, không coi là quy tắc tuyệt đối cho mọi ngữ cảnh |
| draft-family-kou | 口 · kǒu · lượng từ trong mẫu đếm nhân khẩu | Thường gặp trong 几口人; không nói 个 luôn sai khi đếm người |
| draft-family-ren | 人 · rén · người | Đi sau cụm số/lượng từ |

Giải thích mẫu đề xuất: `你家 + 有 + 几口人？`; trả lời `我家 + 有 + 三口人。`. Chỉ dạy mục tiêu nhân khẩu; 的 và các từ người thân mở rộng để bài khác, không hỏi bất ngờ trong bài này.

Ví dụ biên soạn cần duyệt:

- `你家有几口人？` — `Nǐ jiā yǒu jǐ kǒu rén?` — Gia đình bạn có mấy người?
- `我家有三口人。` — `Wǒ jiā yǒu sān kǒu rén.` — Gia đình tôi có ba người.

Pinyin ghi thanh gốc. Nếu dùng TTS để đọc liền, cần thử biến điệu thực tế; không tự ghi âm chuẩn/giọng bản xứ. Không gán track MP3 nguồn khác.

## Hai lượt luyện có hướng dẫn (ID chỉ là nháp)

1. `draft-family-guided-1`: “Trong mẫu 几口人, chữ 口 làm nhiệm vụ gì?”; gợi ý mẫu hỏi nhân khẩu. Chọn: **lượng từ** / đại từ hỏi / tên người. Giải thích: 口 là lượng từ trong mẫu đang học.
2. `draft-family-guided-2`: “Gia đình tôi có ba người” → chọn **我家有三口人。** / 你家有几口人？. Hiện mẫu trả lời và giải thích trước, không tính điểm tự làm.

## Tự làm và đáp án đề xuất

| ID/ánh xạ | Dạng và đề | Lựa chọn/token | Khóa đề xuất / giải thích | Trạng thái |
|---|---|---|---|---|
| c-1-2-2-1 (đề xuất sửa cùng mục tiêu) | Chọn: Trong cụm hỏi nhân khẩu 几口人, chữ nào là lượng từ? | 口 / 几 / 人 / 有 | 口; câu hỏi xác định vai trò trong mẫu đã học, không loại 个 khỏi mọi cách đếm người | PENDING |
| c-1-2-2-2 (giữ ID) | Ghép câu “Gia đình bạn có mấy người?” | 你家 / 有 / 几口人 / 是谁 / 多大 | 你家有几口人; ví dụ/giải thích đã có trước; tự dịch không có nút đọc câu đích | PENDING |
| draft-family-listen (chưa tạo runtime ID) | Nghe rồi chọn nghĩa; không hiện chữ/pinyin câu đích trước kiểm tra | Gia đình tôi có ba người / Gia đình tôi có năm người / Gia đình bạn có mấy người | Audio dự kiến 我家有三口人。; chọn nghĩa ba người; lỗi giọng thì thử lại/thoát, không tự chấm | PENDING |
| draft-family-meaning (chưa tạo runtime ID) | 你家有几口人？ dùng để hỏi điều gì? | Số người trong gia đình bạn / Tên của bạn / Nhà bạn ở đâu | Số người trong gia đình bạn; tránh yêu cầu dữ liệu cá nhân thật để trả lời | PENDING |

Bốn câu là phác thảo theo hai mục tiêu, chưa chốt số câu/thời lượng. Reviewer cần xét độ lặp và độ khó, đặc biệt câu nghĩa sau câu ghép; không thêm câu chỉ để đạt quota.

## Biến thể, ôn và lưu

- `你家有几个人？` có thể hợp lý tùy ngữ cảnh; cần chuyên gia xác nhận. Bài nhận diện vai trò trong **mẫu 几口人** không dùng biến thể đó để kết luận sai ngữ pháp.
- Câu ghép chỉ có các khối token đã cho; nếu sau này nhận văn bản tự gõ phải có danh sách biến thể được duyệt riêng. Không nhận mọi hoán vị.
- Ôn đúng câu sai một lần, tách điểm lần đầu với ôn, giải thích lại mẫu; không ép lặp vô hạn. Có quyền thoát trước lưu và giữ kết quả cũ.
- Chưa chọn khóa lưu hoặc cách gắn hoàn thành cho bản nháp. Khi triển khai phải giữ ID node cũ và tiến độ/XP/SRS/backup theo hợp đồng đã duyệt; không lấy kết quả pilot chào hỏi để hoàn thành bài gia đình.

## Tiêu chí trước triển khai một unit

- [ ] Cổng bài mẫu đạt bằng chứng thực tế.
- [ ] Chuyên môn/nguồn/quyền cho toàn bộ Unit2, không chỉ phác thảo này, được ghi người duyệt và ngày.
- [ ] Mỗi kiến thức mới được dạy trước khi hỏi; không bỏ mất từ của cúp.
- [ ] Duyệt lại câu 口/个, pinyin, nghĩa và các biến thể được nhận.
- [ ] Test đúng/sai/không chọn/nghe lỗi/lưu lỗi/thoát/khôi phục/mobile/bàn phím/reduced motion, giữ tiến độ cũ.
- [ ] Báo cáo riêng Unit2 và nghiệm thu trước khi mở rộng unit khác; không tự thay thứ tự hoặc bật migration.
