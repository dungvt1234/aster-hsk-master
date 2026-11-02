# Gói B — Unit 0 và nền tảng: hồ sơ chuẩn bị

Ngày 2026-11-02; baseline `5e6ef1b2d386c13386d70b8037ea8a3ab7f50ed8`. **DRAFT/PENDING**, chưa triển khai hoặc xuất bản. Bản nháp máy đọc được: [hsk1-unit0-foundation.v1.json](../../content-drafts/hsk1-unit0-foundation.v1.json), không import vào app. Người soạn: Codex, chưa có người duyệt chuyên môn/quyền/người mới.

## Ánh xạ bốn chặng

| ID cũ | Mục tiêu và điều kiện | Phần dạy/ví dụ/luyện trước tự làm | Nguồn / ôn / duyệt |
|---|---|---|---|
| `node-hsk1-0-1` — Số đếm 1 đến 5 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. Tiên quyết: Đã xem phần chữ Hán/pinyin/nghĩa và dấu thanh ở bản nháp nền tảng. | Mỗi dòng cho chữ, pinyin và số tương ứng. Xem/nghe từng số rồi ghép lại dãy 1–5. Không gọi người học thành thạo chỉ từ một lượt đúng. Ví dụ: 一、二、三 · yī, èr, sān · Một, hai, ba.; 四、五 · sì, wǔ · Bốn, năm.. 2 lượt có gợi ý đề xuất. | V/G01/U0; S1 chỉ một phần chữ số/phát âm. Luyện lại từng chữ/âm nhầm; báo riêng điểm tự làm và lượt ôn, không lặp vô hạn. PENDING |
| `node-hsk1-0-2` — Số đếm 6 đến 10 | Nhận diện, nghe và sắp xếp số 6–10. Tiên quyết: Nhận diện số 1–5; biết chỗ nghe lại và cách chọn đáp án. | Giới thiệu từng số 六/七/八/九/十 kèm pinyin/nghĩa trước câu hỏi. So sánh dãy 6–10 với 1–5 bằng nghĩa số, không học bằng vị trí nút. Ví dụ: 六、七、八 · liù, qī, bā · Sáu, bảy, tám.; 九、十 · jiǔ, shí · Chín, mười.. 2 lượt có gợi ý đề xuất. | V/G01/U0; S1 chỉ một phần chữ số/phát âm. Nếu nhầm 六/九 hoặc 七/十, quay về bảng chữ–âm–số rồi làm lại một lượt có giới hạn. PENDING |
| `node-hsk1-0-3` — Ghép số hàng chục | Hiểu và ghép số 11–99 theo mẫu chục và đơn vị đã dạy. Tiên quyết: Đã học 1–10; nhận ra 十 và các chữ số đơn vị. | 11–19: 十 + đơn vị. 20–99: hàng chục + 十, thêm đơn vị khi khác 0. Dạy 十四 và 二十七 bằng ví dụ; tự làm vẫn lấy 15 và 99 hiện có để đổi ngữ cảnh. Chưa có phần dạy 100 hoặc hỏi giá trong phạm vi này; đề xuất bỏ 一百/giá khỏi nhãn mô tả sau khi được duyệt. Ví dụ: 十四 · shísì · 14 = mười + bốn.; 二十七 · èrshíqī · 27 = hai chục + bảy.. 2 lượt có gợi ý đề xuất. | V/G01/U0; S1 chỉ một phần chữ số/phát âm. Giải thích đúng chỗ 十 và số đơn vị; mỗi câu sai ôn một lượt, không coi hai câu là bằng chứng bao phủ mọi số. PENDING |
| `node-hsk1-0-4` — Cúp Vinh Quang Số Đếm | Ôn nhận diện một số chữ số đã học, giữ vai trò mở khóa cũ. Tiên quyết: Đã được dạy số 1–10; bài trước mở khóa theo cơ chế hiện tại. | Nhắc cách quay về bảng số khi chưa nhớ; không dạy kiến thức mới bất ngờ trong bài ôn. Ví dụ: 三、七 · sān, qī · 3 và 7; ví dụ ôn chữ đã học.. 0 lượt có gợi ý đề xuất. | V/G01/U0; S1 chỉ một phần chữ số/phát âm. Nêu các số nhầm và chỗ ôn; không tạo thêm completion hoặc thưởng do tự đánh dấu hoàn thành. PENDING |

## Toàn bộ câu đang hỏi (12 lượt)

Các ID và đáp án dưới đây là hiện trạng, **chưa sửa runtime**. Phần dạy/draft chỉ là đề xuất chuẩn bị, không chứng minh người đang dùng app đã được học trước.

| Node / câu | Dạng / yêu cầu | Khóa hiện tại | Kiến thức cần dạy trước | Nguồn/trạng thái |
|---|---|---|---|---|
| `node-hsk1-0-1` / `c-0-1-1` | match_pairs; Nối các số Hán tự với chữ số tương ứng | 一 → Số 1; 二 → Số 2; 三 → Số 3; 四 → Số 4 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-1` / `c-0-1-2` | word_bank; Sắp xếp dãy số theo thứ tự tăng dần từ 1 đến 5: | 一 二 三 四 五 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-1` / `c-0-1-3` | listen_choose; Nghe phát âm và chọn số chính xác | Số 3 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-1` / `c-0-1-4` | multiple_choice; Chữ Hán "五" có phiên âm Pinyin và ý nghĩa là gì? | wǔ - Số 5 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-1` / `c-0-1-5` | multiple_choice; Chữ 二 (èr) là số mấy? | Số 2 (èr) | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-1` / `c-0-1-6` | multiple_choice; Số 4 được viết bằng chữ Hán nào? | 四 | Nhận diện, nghe và sắp xếp số 1–5 trong phạm vi đã học. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-2` / `c-0-2-1` | match_pairs; Nối chữ Hán với số tương ứng | 六 → Số 6; 七 → Số 7; 八 → Số 8; 九 → Số 9; 十 → Số 10 | Nhận diện, nghe và sắp xếp số 6–10. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-2` / `c-0-2-2` | listen_choose; Nghe phát âm và chọn số đúng | Số 8 | Nhận diện, nghe và sắp xếp số 6–10. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-2` / `c-0-2-3` | word_bank; Sắp xếp dãy số theo thứ tự từ 6 đến 10: | 六 七 八 九 十 | Nhận diện, nghe và sắp xếp số 6–10. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-3` / `c-0-3-1` | word_bank; Ghép số "Mười lăm" (15) bằng tiếng Trung: | 十 五 | Hiểu và ghép số 11–99 theo mẫu chục và đơn vị đã dạy. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-3` / `c-0-3-2` | multiple_choice; Số "99" trong tiếng Trung được viết và đọc là: | 九十九 (jiǔshíjiǔ) | Hiểu và ghép số 11–99 theo mẫu chục và đơn vị đã dạy. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |
| `node-hsk1-0-4` / `c-0-4-1` | match_pairs; Thử thách trùm cuối: Nối số đếm ngẫu nhiên | 三 → 3; 七 → 7; 八 → 8; 十 → 10 | Ôn nhận diện một số chữ số đã học, giữ vai trò mở khóa cũ. | V/U0; câu do repo biên soạn, quyền/chuyên môn PENDING |

## Giới hạn và bước sau cổng A

- Phần nền tảng có chữ Hán/pinyin/nghĩa, bốn dấu thanh và thanh nhẹ trong ngữ cảnh; chỉ vài mẫu nhận diện. Không tạo node mới, ID tiến độ hay tự nhận học xong phát âm.
- Nội dung 1–5, 6–10 và ghép chục có ví dụ/gợi ý khác câu tự làm; cúp chỉ ôn số. Đề xuất thu hẹp nhãn giá/100 vì hiện chưa dạy, nhưng nhãn runtime chưa đổi.
- V = kho từ HSK1, U0 = sổ tay Unit0, G01 = ngữ pháp bài01. Đây là nguồn nội bộ, cần nguồn đối chiếu độc lập; S1 đã đọc văn bản ở lượt trước chỉ hỗ trợ một phần, chưa có quyền xuất bản/ISBN được xác nhận. Tất cả nguồn và nội dung giữ PENDING.
- Giữ nguyên 4 node / 12 challenge ID, thứ tự và vai trò mở khóa. Không bỏ cúp, không bật migration. Sau cổng A: triển khai đúng một unit, test người mới/học dở/rải rác/hoàn thành/free mode, backup cũ, lưu lỗi, replay; báo riêng và chờ nghiệm thu unit.
- Replay hiện có đi qua callback thưởng của DuolingoPathView; chưa sửa chống nhận thưởng lặp. Không auto-complete để cấp thưởng, không hứa replay không có XP nếu mã hiện tại còn cộng.
- Tiêu chí chất lượng: mỗi câu có phần dạy trước/đường ôn rõ; không lộ đáp án nghe/dịch; điểm lần đầu khác ôn; TTS có lỗi/thoát; không thêm câu chỉ để đủ số.
