# Giai đoạn 1 — Kiểm kê lộ trình HSK 1

Ngày kiểm tra: 2026-11-02 (Việt Nam). Trạng thái: **hoàn tất kiểm kê mã nguồn, chờ duyệt sư phạm/ngôn ngữ và nguồn gốc tài nguyên**.

## Mốc kiểm tra và phạm vi

- Repository: `dungvt1234/aster-hsk-master`; nhánh `refactor/learning-safety-a5bb852`.
- Commit được kiểm kê: `9a58b71a83dfdca509637da38e3751b5f7ab0b43`. Mọi số dòng trong báo cáo thuộc commit này.
- [PR #1](https://github.com/dungvt1234/aster-hsk-master/pull/1): open, draft, chưa merge khi bắt đầu; head khớp commit trên. Checkout ban đầu sạch, không có AGENTS.md trong checkout.
- Đọc kế hoạch, `roadmap-review.md`, `hsk1-pilot-review.md`, roadmap HSK1, kho từ HSK1, 15 bài ngữ pháp HSK1, 9 sổ tay unit và mã popup/chấm bài. Đọc lại văn bản trích xuất 3 bài Drive S1–S3.
- Chỉ thêm báo cáo. Không sửa dữ liệu/app, ID, thứ tự mở khóa, lưu trữ hoặc tiến độ; không merge, không triển khai. Không kiểm kê sâu HSK2–4 trong GĐ1.
- Mục tiêu/điều kiện trước trong bảng là **nhận định sư phạm từ bài hiện có**, không phải trường prerequisite có sẵn hoặc thiết kế hành trình GĐ2 đã duyệt. Quyết định giữ/sửa/bổ sung/phụ chỉ là đề xuất cho giai đoạn sau.

## Nguồn và mức xác nhận

| Mã | Nguồn / vị trí | Phạm vi đã xác nhận | Chưa xác nhận |
|---|---|---|---|
| R | `src/data/roadmapHsk1.ts` | Đủ ID, thứ tự, câu, token, đáp án cấu hình | Tính đúng ngôn ngữ chuyên môn/đủ chuẩn kỳ thi |
| V | `src/data/hskData.ts`, lọc `level === 1` | 123 mục từ, ID và pinyin/nghĩa đang lưu | Chuẩn/phiên bản HSK; bao phủ từ vựng chính thức |
| G | `src/data/grammarDataHsk1.ts` | 15 bài `01`–`15`, 45 điểm ngữ pháp | Không suy bài 01 là source lesson 1 hay Unit 1 |
| U | `src/data/unitGuidebookData.ts` + `UnitGuidebookModal.tsx` | Có sổ tay cho đủ 9 unit | Người học có đọc trước hay không; độ chính xác toàn bộ giải thích |
| S1 | [HSK标准教程1-第1课.pptx](https://docs.google.com/presentation/d/1tHJE-3G-83SAlmWYs14XBOlKZ1zVwVaA/edit), `教学内容和目标`, `两个三声音节的连续变调`, `课文1–3` | Văn bản: chào hỏi, xin lỗi, âm đầu/vần/thanh, 3+3, nét chữ | Hình, audio, số slide thật, quyền tái bản, phiên bản/ISBN |
| S2 | [HSK标准教程1-第2课.pptx](https://docs.google.com/presentation/d/1W70kBsAlRy-DAUmhcPYgJhMxmei0_Hci/edit), `教学内容和目标`, `汉语的轻声`, `拼音规则`, `课文1` | Văn bản: cảm ơn/đáp lại/tạm biệt, thanh nhẹ, đánh dấu thanh, viết tắt | Như S1; lỗi dịch trích xuất cần xem bản gốc |
| S3 | [HSK标准教程1-第3课.pptx](https://docs.google.com/presentation/d/1Q_k89yFRKc2KV26PLTU0zis0eWSrFdEe/edit), `教学内容和目标`, `语言点1–3`, `课文1–3`, `不的变调` | Văn bản: tên, nghề/quốc tịch, 什么/是/吗, biến điệu 不, phân biệt âm | Như S1; pinyin trích xuất mâu thuẫn cần xem bản gốc |
| P | [Rà soát cũ](roadmap-review.md), [đối chiếu mẫu](hsk1-pilot-review.md), `content-drafts/hsk1-greetings.v1.json` | Lịch sử đối chiếu, bản nháp chưa bundle | Không coi nháp là bài đang dạy; không coi số câu cũ là số hiện tại |

Không đối chiếu đơn thuần theo số thứ tự. S1/S2 gắn chủ đề với Unit 1 và G01; S3 với Unit 1 và G02/G03. S1 có nhận diện/viết vài chữ số nhưng không chứng minh toàn bộ Unit 0 đã được đối chiếu. Unit 2–8 chưa có nguồn Drive cùng chủ đề được kiểm tra trong đợt này. Không mặc định chủ đề trùng HSK1–2 là lỗi. Chưa có căn cứ kết luận đủ HSK 1, chuẩn 2.0/3.0 hay tương đương A1.

## Số lượng xác minh

| Hạng mục | Kết quả |
|---|---:|
| Unit | 9 |
| Chặng | 40 |
| Câu/lượt bài | 71 |
| match_pairs | 25 |
| word_bank | 33 |
| listen_choose | 5 |
| multiple_choice | 8 |
| Chặng 1 câu | 16 |
| Chặng 2 câu | 21 |
| Chặng 3 câu | 1 |
| Chặng 4 câu | 1 |
| Chặng 6 câu | 1 |
| Mục từ HSK1 | 123 |

Một `match_pairs` tính 1 câu dù có nhiều cặp. Số 67 ở báo cáo cũ là **trước** bốn câu bổ sung; hiện tại là 71, không phải mất/trùng câu.

## Vấn đề theo ảnh hưởng

### I01 — Cao

**Trạng thái:** Đã xác nhận cấu trúc; hệ quả sư phạm là nhận định.

Chưa có chuỗi dạy trước khi hỏi cho từng chặng. Chỉ popup node-hsk1-0-1 có phần nhập môn. Sổ tay là tùy chọn, không có quan hệ prerequisite với câu hỏi. Ví dụ c-1-1-3-1 dùng 也/很, c-1-6-1-2 dùng 都, c-1-8-3-2 dùng 会 theo nghĩa dự báo. Có kiến thức ở kho ngữ pháp khác không chứng minh người học đã học trước.

**Bằng chứng:** src/components/DuolingoPathView.tsx:809–817; src/components/DuolingoLessonModal.tsx:46–79; g-hsk1-08-3, g-hsk1-14-2, g-hsk1-05-2.

**Đề xuất:** Thiết kế điều kiện đầu vào và phần dạy, nối tới nội dung có sẵn trong GĐ2; chưa đổi thứ tự.

### I02 — Cao

**Trạng thái:** Đã xác nhận số lượng; chưa đặt chuẩn tối thiểu.

16/40 chặng chỉ có 1 câu, 21 chặng có 2; chỉ 3 chặng có từ 3 câu trở lên. Một câu ghép cặp gồm nhiều cặp nhưng vẫn chỉ là một lượt bài, không tương đương nhiều bài luyện độc lập. Không có căn cứ dùng số lượng này để chứng nhận đủ luyện tập.

**Bằng chứng:** Bảng 40 chặng và phụ lục 71 câu bên dưới.

**Đề xuất:** Bổ sung bài luyện theo mục tiêu sau GĐ2/3; không tự đặt ngưỡng số câu đạt chuẩn HSK.

### I03 — Vừa

**Trạng thái:** Đã xác nhận dạng/nội dung; giá trị ôn cần thử người học.

Cả 9 cúp có đúng 1 câu; 5 cúp là match_pairs và 4 là word_bank. Không phải tất cả là bản sao: cúp gia đình có từ mới, cúp thời gian ghép lịch trình, cúp thành phố có định ngữ. Cúp 0 chỉ quay lại 3/7/8/10; cúp ăn uống ôn từ đã gặp, có thêm 吃 dưới dạng ghép.

**Bằng chứng:** node-hsk1-0-4 đến node-hsk1-8-5; ID câu theo bảng.

**Đề xuất:** Giữ ID; phân biệt ôn/từ mới/bài phụ ở GĐ4 sau phương án bảo toàn tiến độ.

### I04 — Cao

**Trạng thái:** Đã xác nhận.

Đại Cúp “HSK 1 Toàn Diện” chỉ có c-1-8-5-1 ghép lời chúc 祝贺你顺利学完HSK 1全部课程. Không có lấy mẫu kỹ năng hay chủ đề trước. Prompt không cho câu tiếng Việt cần dịch; audio lại đọc nguyên đáp án. Đây chưa phải kiểm tra đầu ra.

**Bằng chứng:** c-1-8-5-1; node-hsk1-8-5.

**Đề xuất:** Thiết kế kiểm tra cuối khóa và điều chỉnh nhãn sau khi thống nhất mục tiêu; chưa tuyên bố bao phủ HSK.

### I05 — Cao

**Trạng thái:** Nghi ngờ về đáp án duy nhất; cần duyệt ngôn ngữ.

c-1-2-2-1 hỏi chung lượng từ cho số người gia đình, cho cả 口 và 个 nhưng chỉ nhận 口. 口 là cách thường dạy trong 几口人; 个 cũng có thể dùng đếm người, nên cách hỏi hiện tại thiếu ngữ cảnh ép dùng mẫu đã học. Chưa kết luận mọi cách dùng 个 trong ngữ cảnh đều đúng.

**Bằng chứng:** c-1-2-2-1; sổ tay unit-hsk1-2, công thức 我家有…口人.

**Đề xuất:** Viết rõ yêu cầu hoàn thành mẫu 几口人 hoặc duyệt lại lựa chọn; không sửa trong GĐ1.

### I06 — Cao

**Trạng thái:** Đã xác nhận chấm so chuỗi; tính chấp nhận ngôn ngữ cần duyệt.

c-1-5-1-2 chỉ nhận 苹果一斤多少钱; cùng token có thể ghép 苹果多少钱一斤, một cách hỏi đơn giá hợp lý cần duyệt. c-1-6-4-2 có thể đặt 我去图书馆 ở đầu rồi 下午 trước 看书; các bài ghép hội thoại 2 khối chỉ thử được thứ tự khối. Không nên đồng nhất một chuỗi duy nhất với mọi câu đúng.

**Bằng chứng:** c-1-5-1-2; c-1-6-4-2; c-1-7-4-2; src/components/DuolingoLessonModal.tsx:219–222.

**Đề xuất:** GĐ2 ghi quy tắc chấm và tập biến thể được duyệt; GĐ3 kiểm thử một bài mẫu.

### I07 — Vừa

**Trạng thái:** Đã xác nhận gợi ý chữ; câu hỏi đơn nghĩa còn nghi ngờ.

c-1-5-2-1 đặt đáp án 元 kèm nhãn “trang trọng” trong câu hỏi “khẩu ngữ”, trong khi 块 không có nhãn. Điều này gợi ý bằng tiếng Việt và câu hỏi rộng có thể khiến 元 bị loại tuyệt đối. Không phải lỗi thiếu đáp án cấu trúc. c-0-1-5 lặp èr ở prompt và đáp án giúp đoán bằng pinyin; chưa phải lộ trực tiếp nghĩa số.

**Bằng chứng:** c-1-5-2-1; c-0-1-5.

**Đề xuất:** Duyệt cách hỏi/lựa chọn và tách mục tiêu nhận diện chữ với nghe/hiểu nghĩa.

### I08 — Vừa

**Trạng thái:** Đã xác nhận khác biệt câu nguồn và câu đích.

c-1-8-1-2 yêu cầu “trời rất lạnh” nhưng chuỗi đúng là 今天太冷了 (“lạnh quá”). Cấu trúc 太…了 đã có ở kho ngữ pháp và sổ tay unit 5; vẫn cần thống nhất nghĩa mục tiêu và đáp án.

**Bằng chứng:** c-1-8-1-2; g-hsk1-12-2.

**Đề xuất:** Duyệt lại cặp nghĩa–đáp án, chưa tự thay nội dung.

### I09 — Vừa

**Trạng thái:** Đã xác nhận chênh lệch phạm vi nhãn và câu hỏi.

Unit 0 mô tả hỏi giá nhưng không có câu hỏi giá; subtitle node-hsk1-0-3 có 一百 nhưng chỉ hỏi 15/99. “Hỏi thăm sức khỏe” chỉ ghép lời đáp; “Gọi món” chỉ khen ngon; “Lịch trình” chỉ ghép buổi; Unit 5 nói quét ví nhưng chưa có câu; “Khen ngợi” không có câu khen; “Phương vị trước & sau” chỉ hỏi trước; “Bốn mùa & Nhiệt độ” chỉ có xuân/hè, mưa tuyết/gió, không đo nhiệt độ; “ngoài trời” không đủ bằng chứng phân loại mọi hoạt động.

**Bằng chứng:** Các node mang I09 trong bảng; mô tả unit-hsk1-0/5/8.

**Đề xuất:** GĐ2 chọn thu hẹp nhãn hoặc bổ sung mục tiêu thực; không suy từ nhãn ra năng lực đã dạy.

### I10 — Cao

**Trạng thái:** Đã xác nhận kiểm tra mã; chưa kiểm tra thiết bị.

Đã có điều kiện ẩn chineseAudioText và pinyinAudioText lúc answering cho listen_choose/word_bank; không ghi lại lỗi lộ chữ cũ như lỗi còn tồn tại. Tuy nhiên 33/33 word_bank có audio đọc đúng câu đích trước khi chấm: người học có thể nghe rồi chép. Hợp lý nếu mục tiêu nghe–sắp xếp, làm sai lệch đánh giá nếu gắn nhãn dịch tự lực. Chưa kiểm tra DOM/accessibility/audio thật trong GĐ1.

**Bằng chứng:** src/components/DuolingoLessonModal.tsx:130–133,453–503; toàn bộ word_bank tại phụ lục.

**Đề xuất:** GĐ2 phân biệt bài có hướng dẫn/nghe với tự dịch; GĐ3 kiểm tra hiển thị, accessible name và TTS trên thiết bị.

### I11 — Vừa

**Trạng thái:** Đã xác nhận tách kho; mức đủ chuẩn chưa kiểm tra.

Kho HSK1 có 123 mục từ và 15 bài ngữ pháp, không có ánh xạ bắt buộc từ node tới vocabId/grammarId trong RoadmapNode. Các cụm 你好/您好/你们好, 哥哥/姐姐/弟弟/妹妹, 面条, 香蕉, 图书馆 không có mục từ HSK1 khớp nguyên chuỗi trong kho hiện tại. Đây không tự chứng minh chưa dạy hay vượt cấp: chúng có thể nằm trong sổ tay/ngữ pháp hoặc là cụm ghép.

**Bằng chứng:** src/types.ts:RoadmapNode; src/data/hskData.ts; src/data/grammarDataHsk1.ts; bảng ánh xạ bên dưới.

**Đề xuất:** GĐ2 tái sử dụng mục từ/ngữ pháp và chốt liên kết; không tạo ID trùng hoặc gán cấp theo cảm tính.

### I12 — Vừa

**Trạng thái:** Đã đối chiếu văn bản ba nguồn; hình/audio/quyền chưa kiểm tra.

Nguồn S2 trích xuất có dịch 不谢 bất thường; S3 có 吗 ghi mā ở một số vị trí nhưng ma ở bài khóa. Nguồn có phần pinyin tuần tự mà đường học chưa nối bắt buộc. Không lấy lỗi trích xuất làm đáp án và không nhập nguyên slide.

**Bằng chứng:** S2: 课文 1; S3: 生词/语言点3 so với 课文2; docs/content/hsk1-pilot-review.md.

**Đề xuất:** Giữ ghi chú nguồn; cần bản gốc và người duyệt trước khi xuất bản nội dung/âm thanh.

## Kiểm kê đủ 9 unit và 40 chặng

Dạng bài: `match_pairs` = nối; `word_bank` = ghép; `listen_choose` = nghe chọn; `multiple_choice` = chọn. “Ít câu” chỉ là mô tả số lượng, không phải một tiêu chuẩn HSK được xác nhận.

### unit-hsk1-0 — Unit 0: Vỡ Lòng · Đếm Số 1 - 10 & Chữ Số Cơ Bản

**Mục tiêu được mô tả:** Nắm chắc số đếm từ 1 đến 10, cách ghép số hàng chục (11 - 99), và cách hỏi giá tiền cơ bản trong đời sống.

**Kiến thức trong sổ tay hiện có (U):** 1. Quy tắc ghép số từ 11 đến 99 trong tiếng Trung — 11 - 19: 十 + [Số đơn vị] | 20 - 99: [Số hàng chục] + 十 (+ [Số đơn vị]); 2. Phân biệt số 2: 二 (èr) và 两 (liǎng) — Đếm số thứ tự: dùng 二 | Đếm số lượng + Lượng từ: dùng 两; 3. Cách hỏi và trả lời giá tiền với 多少钱 — [Đồ vật] + 多少钱？ -> ... 块 (tiền tệ).

**Nguồn đối chiếu:** R [L10](../../src/data/roadmapHsk1.ts#L10); U `unit-hsk1-0`; G `04`, `10` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1 chỉ một số chữ số; chưa đối chiếu bài ghép số/giá.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-0-1` — Số đếm 1 đến 5 [L18](../../src/data/roadmapHsk1.ts#L18) | Nhận diện/đếm 1–5 | Phân biệt chữ Hán, pinyin, nghĩa và nghe âm | 一；二；三；四；一二三四五 | match_pairs × 1; word_bank × 1; listen_choose × 1; multiple_choice × 3; tổng 6 | I01 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-0-2` — Số đếm 6 đến 10 [L83](../../src/data/roadmapHsk1.ts#L83) | Nhận diện/đếm 6–10 | Số 1–5; cách đọc pinyin 6–10 | 六；七；八；九；十；六七八九十 | match_pairs × 1; listen_choose × 1; word_bank × 1; tổng 3 | I01 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-0-3` — Ghép số hàng chục [L128](../../src/data/roadmapHsk1.ts#L128) | Ghép 15 và nhận diện 99 | Số 1–10; quy tắc hàng chục | 十五 | word_bank × 1; multiple_choice × 1; tổng 2 | I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-0-4` — Cúp Vinh Quang Số Đếm [L158](../../src/data/roadmapHsk1.ts#L158) | Ôn mặt chữ 3,7,8,10 | Hai bài số đơn | 三；七；八；十 | match_pairs × 1; tổng 1 | I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-1 — Unit 1: Chào hỏi & Làm quen (问候与交际)

**Mục tiêu được mô tả:** Các mẫu câu chào hỏi mở đầu kinh điển: 你好, 谢谢, 再见, xưng hô lịch sự và tự giới thiệu bản thân.

**Kiến thức trong sổ tay hiện có (U):** 1. Câu phán đoán với động từ 是 (Là) — Chủ ngữ + 是 + Danh từ / Phủ định: 不是; 2. Câu hỏi nghi vấn với trợ từ 吗 — Câu trần thuật + 吗？.

**Nguồn đối chiếu:** R [L186](../../src/data/roadmapHsk1.ts#L186); U `unit-hsk1-1`; G `01`, `02`, `03`, `08` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1/S2 chào/cảm ơn; S3 tên/是/吗.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-1-1` — Chào hỏi cơ bản [L194](../../src/data/roadmapHsk1.ts#L194) | Chào, cảm ơn, tạm biệt; chào lịch sự | Pinyin/thanh điệu; 你好/您/老师/谢谢 | 你好；谢谢；再见；不客气；老师好 | match_pairs × 1; word_bank × 1; multiple_choice × 2; tổng 4 | I01 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-1-2` — Hỏi tên & Giới thiệu [L240](../../src/data/roadmapHsk1.ts#L240) | Hỏi tên; nghe quốc tịch | 你/我/叫/什么/名字/是; tên nước | 你叫什么名字；我是越南人。 | word_bank × 1; listen_choose × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-1-3` — Hỏi thăm sức khỏe [L272](../../src/data/roadmapHsk1.ts#L272) | Đáp lời hỏi sức khỏe | 我/也/很/好; phân biệt hỏi và đáp | 我也很好谢谢 | word_bank × 1; tổng 1 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-1-4` — Cúp Vinh Quang Chào Hỏi [L294](../../src/data/roadmapHsk1.ts#L294) | Nhận diện xin lỗi/đáp lại/cảm ơn | 对不起/没关系/不用谢 cần được dạy trước | 对不起；没关系；谢谢你；不用谢 | match_pairs × 1; tổng 1 | I01,I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-2 — Unit 2: Gia đình & Đại từ sở hữu (家与家人)

**Mục tiêu được mô tả:** Xưng hô các thành viên trong gia đình, đếm nhân khẩu (几口人) và dùng trợ từ sở hữu 的 (đích).

**Kiến thức trong sổ tay hiện có (U):** 1. Trợ từ kết cấu 的 (Biểu thị quan hệ sở hữu) — Người sở hữu + 的 + Vật sở hữu; 2. Lượng từ 口 (kǒu) dùng cho nhân khẩu gia đình — 我家有 + [Số] + 口 + 人.

**Nguồn đối chiếu:** R [L322](../../src/data/roadmapHsk1.ts#L322); U `unit-hsk1-2`; G `03`, `04` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-2-1` — Thành viên gia đình [L330](../../src/data/roadmapHsk1.ts#L330) | Gọi tên người thân; giới thiệu mẹ | 这/是/我; từ thân thuộc và thanh nhẹ | 爸爸；妈妈；哥哥；姐姐；这是我妈妈 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-2-2` — Hỏi số lượng nhân khẩu [L364](../../src/data/roadmapHsk1.ts#L364) | Hỏi nhân khẩu với 几口人 | 有/几/口/家; số đếm | 你家有几口人 | multiple_choice × 1; word_bank × 1; tổng 2 | I02,I05 | Sửa yêu cầu/chấm sau duyệt; giữ ID |
| `node-hsk1-2-3` — Trợ từ sở hữu 的 [L394](../../src/data/roadmapHsk1.ts#L394) | Dùng 的 nói sở hữu | 那/是/老师/书; sở hữu 的 | 那是老师的书 | word_bank × 1; tổng 1 | I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-2-4` — Cúp vinh quang Gia đình [L416](../../src/data/roadmapHsk1.ts#L416) | Nhận diện em và con | 弟弟/妹妹/儿子/女儿 cần được giới thiệu | 弟弟；妹妹；儿子；女儿 | match_pairs × 1; tổng 1 | I01,I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-3 — Unit 3: Ẩm thực & Ăn uống (餐饮美食)

**Mục tiêu được mô tả:** Tên gọi các món ăn, đồ uống quen thuộc, bày tỏ sở thích (喜欢) và gọi món tại quán ăn.

**Kiến thức trong sổ tay hiện có (U):** 1. Động từ năng nguyện 想 (Muốn, dự định) — Chủ ngữ + 想 + Động từ + Tân ngữ.

**Nguồn đối chiếu:** R [L444](../../src/data/roadmapHsk1.ts#L444); U `unit-hsk1-3`; G `06`, `10`, `12` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-3-1` — Món ăn & Đồ uống [L452](../../src/data/roadmapHsk1.ts#L452) | Nhận diện đồ ăn/uống; nghe câu muốn uống | 米饭/面条/喝/茶/水/想 | 米饭；面条；喝茶；喝水；我想喝茶。 | match_pairs × 1; listen_choose × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-3-2` — Sở thích ẩm thực [L486](../../src/data/roadmapHsk1.ts#L486) | Hỏi sở thích ăn uống | 喜欢/吃/中国菜/吗 | 你喜欢吃中国菜吗 | word_bank × 1; tổng 1 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-3-3` — Gọi món tại nhà hàng [L508](../../src/data/roadmapHsk1.ts#L508) | Khen món ăn với 太…了 | 好吃; 太…了; khác với giao dịch gọi món | 中国菜太好吃了 | word_bank × 1; tổng 1 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-3-4` — Cúp Vinh Quang Ẩm Thực [L530](../../src/data/roadmapHsk1.ts#L530) | Ôn động từ ăn/uống và vị ngon | 菜/好吃/喝/吃 | 菜；好吃；喝；吃 | match_pairs × 1; tổng 1 | I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-4 — Unit 4: Thời gian, Ngày tháng & Lịch trình (时间与日期)

**Mục tiêu được mô tả:** Hỏi giờ giấc, ngày trong tuần (星期), tháng năm và nói lịch trình sinh hoạt hàng ngày.

**Kiến thức trong sổ tay hiện có (U):** 1. Diễn đạt Ngày, Tháng, Thứ trong tiếng Trung — [Năm] 年 + [Tháng] 月 + [Ngày] 号/日 + 星期 [Thứ].

**Nguồn đối chiếu:** R [L558](../../src/data/roadmapHsk1.ts#L558); U `unit-hsk1-4`; G `05`, `07`, `09` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-4-1` — Hôm nay ngày mấy? [L566](../../src/data/roadmapHsk1.ts#L566) | Hỏi ngày tháng; mốc hôm qua/nay/mai | Số đếm; 几月/几号; 星期 | 今天；明天；昨天；星期日；今天几月几号 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-4-2` — Hỏi giờ giấc chính xác [L600](../../src/data/roadmapHsk1.ts#L600) | Hỏi giờ; nghe 8:30 | Số ghép; 点/分/现在/了 | 现在几点了；现在八点三十分。 | word_bank × 1; listen_choose × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-4-3` — Lịch trình trong ngày [L632](../../src/data/roadmapHsk1.ts#L632) | Phân biệt buổi trong ngày | 早上/上午/中午/下午/晚上 | 早上；上午；中午；下午；晚上 | match_pairs × 1; tổng 1 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-4-4` — Cúp Vinh Quang Thời Gian [L657](../../src/data/roadmapHsk1.ts#L657) | Ghép lịch trình thứ Bảy | 星期六/不/去/学校 và trật tự câu | 明天是星期六我不去学校 | word_bank × 1; tổng 1 | I01,I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-5 — Unit 5: Siêu thị & Mua sắm hoa quả (超市与水果)

**Mục tiêu được mô tả:** Mua hoa quả (táo, chuối), cân nặng nửa ký (斤), thức uống đồ hộp và thanh toán tiền mặt/quét mã ví điện tử.

**Kiến thức trong sổ tay hiện có (U):** 1. Cấu trúc cảm thán 太……了 (Quá, lắm) — 太 + Tính từ + 了.

**Nguồn đối chiếu:** R [L683](../../src/data/roadmapHsk1.ts#L683); U `unit-hsk1-5`; G `04`, `06`, `10`, `12` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-5-1` — Hoa quả tươi ngon [L691](../../src/data/roadmapHsk1.ts#L691) | Nhận diện hoa quả; hỏi đơn giá | 苹果/香蕉/斤/多少钱; số đếm | 苹果；香蕉；斤；超市；苹果一斤多少钱 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02,I06 | Sửa yêu cầu/chấm sau duyệt; giữ ID |
| `node-hsk1-5-2` — Đơn vị tiền tệ & Mua bán [L725](../../src/data/roadmapHsk1.ts#L725) | Nói giá tiền theo cân | 块/钱/一斤; đơn giá | 这个三块钱一斤 | multiple_choice × 1; word_bank × 1; tổng 2 | I02,I07 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-5-3` — Thức uống & Hàng tiêu dùng [L755](../../src/data/roadmapHsk1.ts#L755) | Nhận diện đồ uống/lượng từ; mua sữa | 想买; 牛奶/咖啡/杯/瓶 | 牛奶；咖啡；杯；瓶；我想买一瓶牛奶 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-5-4` — Thanh toán & Trả giá [L789](../../src/data/roadmapHsk1.ts#L789) | Tổng tiền; nhận diện mặc cả/tiền mặt | 一共/太贵了/便宜一点/现金 | 一共；太贵了；便宜一点；现金；一共二十块钱 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-5-5` — Cúp Vinh Quang Mua Sắm [L823](../../src/data/roadmapHsk1.ts#L823) | Ghép yêu cầu mua ba cân táo | 想买/斤/苹果; số đếm | 我想买三斤苹果 | word_bank × 1; tổng 1 | I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-6 — Unit 6: Trường học, Bạn bè & Lớp học (学校与课堂)

**Mục tiêu được mô tả:** Không gian trường lớp, thầy cô, bạn cùng lớp, dụng cụ học tập và giờ tự học thư viện.

**Kiến thức trong sổ tay hiện có (U):** 1. Giới từ chỉ nơi chốn 在 (Ở, tại) — Chủ ngữ + 在 + Địa điểm + Động từ + Tân ngữ.

**Nguồn đối chiếu:** R [L849](../../src/data/roadmapHsk1.ts#L849); U `unit-hsk1-6`; G `04`, `05`, `08`, `14` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-6-1` — Giờ học tiếng Trung [L857](../../src/data/roadmapHsk1.ts#L857) | Nhận diện trường lớp; nói đều là bạn học | 我们/都/是/同学 | 学校；同学；学习；汉字；我们都是同学 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-6-2` — Khen ngợi & Đọc viết chữ Hán [L891](../../src/data/roadmapHsk1.ts#L891) | Hỏi khả năng viết chữ | 会 + động từ; 这个/汉字/吗 | 你会写这个汉字吗 | word_bank × 1; tổng 1 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-6-3` — Dụng cụ học tập & Bàn ghế [L913](../../src/data/roadmapHsk1.ts#L913) | Gọi tên bàn ghế/vở; nói vị trí sách | 桌子/上/有/一本书; lượng từ 本 | 书；桌子；椅子；本子；桌子上有一本书 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-6-4` — Thư viện & Giờ tự học [L947](../../src/data/roadmapHsk1.ts#L947) | Từ vựng thư viện; đi đâu làm gì | 下午/去/图书馆/看书; liên động | 看书；哪本书；很安静；图书馆；下午我去图书馆看书 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-6-5` — Cúp Vinh Quang Trường Học [L981](../../src/data/roadmapHsk1.ts#L981) | Nhận diện bốn kỹ năng | 听/说/读/写 | 听；说；读；写 | match_pairs × 1; tổng 1 | I01,I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-7 — Unit 7: Khám phá Thành phố & Nơi chốn (城市与地点)

**Mục tiêu được mô tả:** Nhận biết địa điểm công cộng (bệnh viện, cửa hàng, nhà ga), phương vị trái phải trước sau và phương tiện đi lại.

**Kiến thức trong sổ tay hiện có (U):** 1. Câu liên động biểu thị mục đích với 去 — Chủ ngữ + 去 + Nơi chốn + Động từ / Mục đích.

**Nguồn đối chiếu:** R [L1009](../../src/data/roadmapHsk1.ts#L1009); U `unit-hsk1-7`; G `08`, `09`, `11` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-7-1` — Địa điểm công cộng [L1017](../../src/data/roadmapHsk1.ts#L1017) | Hỏi bệnh viện ở đâu; gọi tên địa điểm | 请问/医院/在/哪儿 | 请问医院在哪儿；医院；商店；饭馆；火车站 | word_bank × 1; match_pairs × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-7-2` — Phương vị trước & sau [L1051](../../src/data/roadmapHsk1.ts#L1051) | Nói vị trí phía trước | 在; địa điểm + 前面 | 商店在医院前面 | word_bank × 1; tổng 1 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-7-3` — Phương vị trái phải & Khoảng cách [L1073](../../src/data/roadmapHsk1.ts#L1073) | Trái/phải/bên cạnh/gần; định vị trường | 左边/右边/旁边/就在 | 左边；右边；旁边；很近；学校就在饭馆旁边 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-7-4` — Phương tiện di chuyển cơ bản [L1107](../../src/data/roadmapHsk1.ts#L1107) | Hỏi cách đi; nói đi máy bay | 怎么去/北京/坐飞机/开车 | 坐飞机；开车；怎么去；车站；你怎么去北京我坐飞机去 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-7-5` — Cúp Vinh Quang Thành Phố [L1141](../../src/data/roadmapHsk1.ts#L1141) | Ghép câu tồn tại có định ngữ | 前面/有/个; 很大 + 的 + danh từ | 前面有一个很大的商店 | word_bank × 1; tổng 1 | I01,I02,I03 | Giữ ID; xem xét ôn/phụ ở GĐ4 |

### unit-hsk1-8 — Unit 8: Thời tiết 4 mùa & Sở thích (天气与爱好)

**Mục tiêu được mô tả:** Nói về thời tiết nóng lạnh mưa tuyết, xem phim nghe nhạc, bốn mùa và rủ bạn tham gia thể thao.

**Kiến thức trong sổ tay hiện có (U):** 1. Mẫu câu hỏi và miêu tả thời tiết với 天气 (tiānqì) — 今天天气 + [Tính từ: 很好 / 很冷 / 不热] | 今天天气怎么样？; 2. Bày tỏ sở thích giải trí: 喜欢 + Động từ — 我喜欢 + [看电影 / 听音乐 / 看书].

**Nguồn đối chiếu:** R [L1167](../../src/data/roadmapHsk1.ts#L1167); U `unit-hsk1-8`; G `05`, `07`, `10`, `12` (liên quan chủ đề; không là liên kết bắt buộc trong app). S1–S3 không đủ xác nhận chủ đề unit này; nguồn bên ngoài chưa kiểm tra.

| ID / tên / bằng chứng | Mục tiêu đánh giá suy ra | Cần biết trước (đề xuất) | Từ/cụm/mẫu thực sự hỏi | Dạng × số câu | Vấn đề | Quyết định đề xuất |
|---|---|---|---|---|---|---|
| `node-hsk1-8-1` — Thời tiết hôm nay [L1175](../../src/data/roadmapHsk1.ts#L1175) | Hỏi và nói thời tiết | 天气/怎么样/冷/热/下雨/太…了 | 天气；冷；热；下雨；今天天气怎么样今天太冷了 | match_pairs × 1; word_bank × 1; tổng 2 | I02,I08 | Sửa yêu cầu/chấm sau duyệt; giữ ID |
| `node-hsk1-8-2` — Sở thích xem phim & nghe nhạc [L1209](../../src/data/roadmapHsk1.ts#L1209) | Bày tỏ sở thích giải trí | 喜欢 + động từ; 看电影/听音乐 | 看电影；听音乐；看书；喜欢；我喜欢看中国电影 | match_pairs × 1; word_bank × 1; tổng 2 | I02 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-8-3` — Bốn mùa & Nhiệt độ [L1243](../../src/data/roadmapHsk1.ts#L1243) | Nhận diện mùa/hiện tượng; dự báo tuyết | 春天/夏天/下雪/刮风; 会 dự báo | 下雪；刮风；春天；夏天；明天会下雪 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-8-4` — Thể thao & Hoạt động ngoài trời [L1277](../../src/data/roadmapHsk1.ts#L1277) | Nhận diện thể thao; rủ đi chơi | 一起/去/玩儿/吧 | 游泳；跑步；玩儿；一起去；明天我们一起去玩儿吧 | match_pairs × 1; word_bank × 1; tổng 2 | I01,I02,I09 | Bổ sung dạy/luyện; giữ ID |
| `node-hsk1-8-5` — Đại Cúp Vinh Quang HSK 1 Toàn Diện [L1311](../../src/data/roadmapHsk1.ts#L1311) | Ghép lời chúc hoàn thành khóa | 祝贺/顺利/学完/全部课程 | 祝贺你顺利学完HSK 1全部课程 | word_bank × 1; tổng 1 | I01,I02,I04 | Sửa mục tiêu kiểm tra; lời chúc xem xét phần phụ |

## Đối chiếu kho từ và ngữ pháp hiện có

Đối chiếu theo **chuỗi nguyên vẹn** của từ/cụm đang hỏi với `hanzi` trong V; không phân đoạn từ tự động, không dùng phép so này để kết luận toàn bộ từ mới/vượt cấp. Mỗi mục trong V còn có ví dụ dài hơn bản thân từ. Không tính ví dụ dài là bằng chứng đã dạy trong đường học.

| Nhóm / vị trí roadmap | Có trong V (ví dụ ID) | Thiếu mục từ khớp nguyên chuỗi (ví dụ) | Ngữ pháp liên quan trong G | Kết luận giới hạn |
|---|---|---|---|---|
| Unit 0 | 一 `hsk1-001`; 五 `hsk1-005`; 十 `hsk1-010`; 钱 `hsk1-016` | 十五 / 九十九 | 04, 10 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 1 | 你 `hsk1-037`; 谢谢 `hsk1-112`; 对不起 `hsk1-109`; 没关系 `hsk1-110` | 你好 / 您好 / 你们好 / 越南 | 01, 02, 03, 08 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 2 | 爸爸 `hsk1-070`; 妈妈 `hsk1-071`; 儿子 `hsk1-072`; 女儿 `hsk1-073` | 哥哥 / 姐姐 / 弟弟 / 妹妹 | 03, 04 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 3 | 米饭 `hsk1-083`; 喝 `hsk1-081`; 茶 `hsk1-082`; 喜欢 `hsk1-090` | 面条 / 中国菜 / 好吃 | 06, 10, 12 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 4 | 今天 `hsk1-093`; 明天 `hsk1-094`; 昨天 `hsk1-095`; 现在 `hsk1-098` | 星期日 / 早上 / 上午 / 中午 / 下午 / 晚上 | 05, 07, 09 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 5 | 苹果 `hsk1-085`; 买 `hsk1-086`; 块 `hsk1-015`; 钱 `hsk1-016` | 香蕉 / 斤 / 牛奶 / 咖啡 / 瓶 / 现金 | 04, 06, 10, 12 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 6 | 学校 `hsk1-078`; 学习 `hsk1-077`; 书 `hsk1-032`; 写 `hsk1-055` | 同学 / 汉字 / 桌子 / 椅子 / 本子 / 图书馆 | 04, 05, 08, 14 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 7 | 火车站 `hsk1-122`; 飞机 `hsk1-106`; 坐 `hsk1-067`; 前 `hsk1-065` | 医院 / 商店 / 饭馆 / 左边 / 右边 / 旁边 | 08, 09, 11 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |
| Unit 8 | 冷 `hsk1-099`; 热 `hsk1-100`; 喜欢 `hsk1-090`; 电影 `hsk1-105` | 天气 / 下雨 / 春天 / 夏天 / 游泳 / 音乐 | 05, 07, 10, 12 | Có thể tái dùng; chưa có ánh xạ ID bắt buộc |

Ngữ pháp G01 đã có hệ pinyin, kính ngữ và cặp xã giao; G02 có 什么/们; G03 có 是/的/吗. Vì vậy không đề xuất nhập lại toàn bộ S1–S3. Thiếu đường dẫn dạy đúng thời điểm khác với thiếu dữ liệu. G05 mô tả 会 là khả năng qua học, không tự đủ cho 会 dự báo tuyết. U3 chủ yếu 想 nhưng hỏi 喜欢 và 太…了; U5 dạy 太…了 khi cấu trúc đã xuất hiện ở Unit 3; U6 dạy 在 nhưng câu đầu dùng 都, câu tiếp dùng 会. Đây là bằng chứng về thứ tự gợi ý, chưa chứng minh người dùng chưa học ở phần khác.

## Phụ lục — 71 câu và đáp án cấu hình

Đã đọc prompt, pool và khóa đáp án của toàn bộ 71 câu. Kiểm tra cấu trúc: ID unit/node/câu duy nhất; đáp án lựa chọn có trong options; token đủ theo số lần xuất hiện; cặp nối có ID và hai phía không trùng; câu nghe có stimulus. **Không tìm thấy thiếu đáp án đúng về cấu trúc**. Những nghi ngờ về nghĩa/ngôn ngữ ở I05–I08 vẫn cần người duyệt. Không coi cấu trúc PASS là đáp án đã được chuyên gia duyệt.

| ID / vị trí | Dạng | Yêu cầu | Khóa đáp án cấu hình | Vấn đề của chặng |
|---|---|---|---|---|
| `c-0-1-1` [L28](../../src/data/roadmapHsk1.ts#L28) | match_pairs | Nối các số Hán tự với chữ số tương ứng | 一 → Số 1; 二 → Số 2; 三 → Số 3; 四 → Số 4 | I01 |
| `c-0-1-2` [L41](../../src/data/roadmapHsk1.ts#L41) | word_bank | Sắp xếp dãy số theo thứ tự tăng dần từ 1 đến 5: | 一 二 三 四 五 | I01 |
| `c-0-1-3` [L51](../../src/data/roadmapHsk1.ts#L51) | listen_choose | Nghe phát âm và chọn số chính xác | Số 3 | I01 |
| `c-0-1-4` [L61](../../src/data/roadmapHsk1.ts#L61) | multiple_choice | Chữ Hán "五" có phiên âm Pinyin và ý nghĩa là gì? | wǔ - Số 5 | I01 |
| `c-0-1-5` [L69](../../src/data/roadmapHsk1.ts#L69) | multiple_choice | Chữ 二 (èr) là số mấy? | Số 2 (èr) | I01 |
| `c-0-1-6` [L75](../../src/data/roadmapHsk1.ts#L75) | multiple_choice | Số 4 được viết bằng chữ Hán nào? | 四 | I01 |
| `c-0-2-1` [L93](../../src/data/roadmapHsk1.ts#L93) | match_pairs | Nối chữ Hán với số tương ứng | 六 → Số 6; 七 → Số 7; 八 → Số 8; 九 → Số 9; 十 → Số 10 | I01 |
| `c-0-2-2` [L106](../../src/data/roadmapHsk1.ts#L106) | listen_choose | Nghe phát âm và chọn số đúng | Số 8 | I01 |
| `c-0-2-3` [L116](../../src/data/roadmapHsk1.ts#L116) | word_bank | Sắp xếp dãy số theo thứ tự từ 6 đến 10: | 六 七 八 九 十 | I01 |
| `c-0-3-1` [L138](../../src/data/roadmapHsk1.ts#L138) | word_bank | Ghép số "Mười lăm" (15) bằng tiếng Trung: | 十 五 | I02,I09 |
| `c-0-3-2` [L148](../../src/data/roadmapHsk1.ts#L148) | multiple_choice | Số "99" trong tiếng Trung được viết và đọc là: | 九十九 (jiǔshíjiǔ) | I02,I09 |
| `c-0-4-1` [L168](../../src/data/roadmapHsk1.ts#L168) | match_pairs | Thử thách trùm cuối: Nối số đếm ngẫu nhiên | 三 → 3; 七 → 7; 八 → 8; 十 → 10 | I02,I03 |
| `c-1-1-1` [L204](../../src/data/roadmapHsk1.ts#L204) | match_pairs | Nối các lời chào quen thuộc: | 你好 → Chào bạn; 谢谢 → Cảm ơn; 再见 → Tạm biệt; 不客气 → Đừng khách sáo | I01 |
| `c-1-1-2` [L216](../../src/data/roadmapHsk1.ts#L216) | word_bank | Ghép câu: "Xin chào thầy giáo!" | 老师 好 | I01 |
| `c-1-1-3` [L226](../../src/data/roadmapHsk1.ts#L226) | multiple_choice | Chào một người lớn tuổi một cách lịch sự, bạn nói gì? | 您好！ | I01 |
| `c-1-1-4` [L232](../../src/data/roadmapHsk1.ts#L232) | multiple_choice | Muốn cảm ơn người khác, bạn chọn câu nào? | 谢谢！ | I01 |
| `c-1-1-2-1` [L250](../../src/data/roadmapHsk1.ts#L250) | word_bank | Dịch câu: "Bạn tên là gì?" | 你 叫 什么 名字 | I01,I02 |
| `c-1-1-2-2` [L260](../../src/data/roadmapHsk1.ts#L260) | listen_choose | Nghe và chọn câu trả lời đúng: | Tôi là người Việt Nam. | I01,I02 |
| `c-1-1-3-1` [L282](../../src/data/roadmapHsk1.ts#L282) | word_bank | Ghép câu: "Tôi cũng rất khỏe, cảm ơn bạn!" | 我 也 很 好 谢谢 | I01,I02,I09 |
| `c-1-1-4-1` [L304](../../src/data/roadmapHsk1.ts#L304) | match_pairs | Nối các mẫu câu giao tiếp cơ bản: | 对不起 → Xin lỗi; 没关系 → Không sao đâu; 谢谢你 → Cảm ơn bạn; 不用谢 → Không có chi | I01,I02,I03 |
| `c-1-2-1-1` [L340](../../src/data/roadmapHsk1.ts#L340) | match_pairs | Nối các thành viên trong gia đình: | 爸爸 → Bố / Ba; 妈妈 → Mẹ / Má; 哥哥 → Anh trai; 姐姐 → Chị gái | I01,I02 |
| `c-1-2-1-2` [L352](../../src/data/roadmapHsk1.ts#L352) | word_bank | Ghép câu: "Đây là mẹ của tôi." | 这 是 我 妈妈 | I01,I02 |
| `c-1-2-2-1` [L374](../../src/data/roadmapHsk1.ts#L374) | multiple_choice | Lượng từ dùng cho số lượng người trong gia đình là gì? | 口 (kǒu) | I02,I05 |
| `c-1-2-2-2` [L382](../../src/data/roadmapHsk1.ts#L382) | word_bank | Ghép câu: "Nhà bạn có mấy người?" | 你家 有 几口人 | I02,I05 |
| `c-1-2-3-1` [L404](../../src/data/roadmapHsk1.ts#L404) | word_bank | Ghép câu: "Kia là sách của thầy giáo." | 那 是 老师 的 书 | I02 |
| `c-1-2-4-1` [L426](../../src/data/roadmapHsk1.ts#L426) | match_pairs | Nối các em trong nhà: | 弟弟 → Em trai; 妹妹 → Em gái; 儿子 → Con trai; 女儿 → Con gái | I01,I02,I03 |
| `c-1-3-1-1` [L462](../../src/data/roadmapHsk1.ts#L462) | match_pairs | Nối các từ vựng đồ ăn thức uống: | 米饭 → Cơm trắng; 面条 → Mì sợi; 喝茶 → Uống trà; 喝水 → Uống nước | I01,I02 |
| `c-1-3-1-2` [L474](../../src/data/roadmapHsk1.ts#L474) | listen_choose | Nghe phát âm và chọn nghĩa đúng: | Tôi muốn uống trà. | I01,I02 |
| `c-1-3-2-1` [L496](../../src/data/roadmapHsk1.ts#L496) | word_bank | Dịch câu: "Bạn thích ăn món Trung Quốc không?" | 你 喜欢 吃 中国菜 吗 | I01,I02 |
| `c-1-3-3-1` [L518](../../src/data/roadmapHsk1.ts#L518) | word_bank | Ghép câu: "Món ăn Trung Quốc quá ngon!" | 中国菜 太 好吃 了 | I01,I02,I09 |
| `c-1-3-4-1` [L540](../../src/data/roadmapHsk1.ts#L540) | match_pairs | Nối các từ vựng gọi món: | 菜 → Món ăn / Rau; 好吃 → Ngon miệng; 喝 → Uống; 吃 → Ăn | I02,I03 |
| `c-1-4-1-1` [L576](../../src/data/roadmapHsk1.ts#L576) | match_pairs | Nối các mốc thời gian: | 今天 → Hôm nay; 明天 → Ngày mai; 昨天 → Hôm qua; 星期日 → Chủ nhật | I01,I02 |
| `c-1-4-1-2` [L588](../../src/data/roadmapHsk1.ts#L588) | word_bank | Dịch câu: "Hôm nay là ngày mấy tháng mấy?" | 今天 几月 几号 | I01,I02 |
| `c-1-4-2-1` [L610](../../src/data/roadmapHsk1.ts#L610) | word_bank | Ghép câu: "Bây giờ là mấy giờ rồi?" | 现在 几点 了 | I01,I02 |
| `c-1-4-2-2` [L620](../../src/data/roadmapHsk1.ts#L620) | listen_choose | Nghe giờ và chọn đáp án chính xác: | 8 giờ 30 phút (8 rưỡi) | I01,I02 |
| `c-1-4-3-1` [L642](../../src/data/roadmapHsk1.ts#L642) | match_pairs | Nối các buổi trong ngày: | 早上 → Sáng sớm; 上午 → Buổi sáng; 中午 → Buổi trưa; 下午 → Buổi chiều; 晚上 → Buổi tối | I01,I02,I09 |
| `c-1-4-4-1` [L667](../../src/data/roadmapHsk1.ts#L667) | word_bank | Ghép câu: "Ngày mai là Thứ Bảy, tôi không đi học." | 明天 是 星期六 我 不去 学校 | I01,I02,I03 |
| `c-1-5-1-1` [L701](../../src/data/roadmapHsk1.ts#L701) | match_pairs | Nối từ vựng hoa quả và mua bán: | 苹果 → Quả táo; 香蕉 → Quả chuối; 斤 → Cân (500 gram); 超市 → Siêu thị | I01,I02,I06 |
| `c-1-5-1-2` [L713](../../src/data/roadmapHsk1.ts#L713) | word_bank | Dịch câu: "Táo bao nhiêu tiền một cân?" | 苹果 一斤 多少钱 | I01,I02,I06 |
| `c-1-5-2-1` [L735](../../src/data/roadmapHsk1.ts#L735) | multiple_choice | Trong khẩu ngữ thường ngày, đồng Nhân Dân Tệ (Tệ) được gọi là: | 块 (kuài) | I02,I07 |
| `c-1-5-2-2` [L743](../../src/data/roadmapHsk1.ts#L743) | word_bank | Ghép câu: "Cái này ba đồng một cân." | 这个 三块钱 一斤 | I02,I07 |
| `c-1-5-3-1` [L765](../../src/data/roadmapHsk1.ts#L765) | match_pairs | Nối thức uống và lượng từ: | 牛奶 → Sữa tươi; 咖啡 → Cà phê; 杯 → Ly / Tách; 瓶 → Chai / Bình | I01,I02 |
| `c-1-5-3-2` [L777](../../src/data/roadmapHsk1.ts#L777) | word_bank | Ghép câu: "Tôi muốn mua một chai sữa tươi." | 我想买 一瓶牛奶 | I01,I02 |
| `c-1-5-4-1` [L799](../../src/data/roadmapHsk1.ts#L799) | match_pairs | Nối từ vựng thanh toán: | 一共 → Tổng cộng; 太贵了 → Đắt quá rồi; 便宜一点 → Rẻ hơn một chút; 现金 → Tiền mặt | I01,I02,I09 |
| `c-1-5-4-2` [L811](../../src/data/roadmapHsk1.ts#L811) | word_bank | Ghép câu: "Tổng cộng hết hai mươi đồng." | 一共 二十块钱 | I01,I02,I09 |
| `c-1-5-5-1` [L833](../../src/data/roadmapHsk1.ts#L833) | word_bank | Ghép câu: "Tôi muốn mua ba cân táo." | 我 想买 三斤 苹果 | I02,I03 |
| `c-1-6-1-1` [L867](../../src/data/roadmapHsk1.ts#L867) | match_pairs | Nối từ vựng trường học: | 学校 → Trường học; 同学 → Bạn cùng lớp; 学习 → Học tập; 汉字 → Chữ Hán | I01,I02 |
| `c-1-6-1-2` [L879](../../src/data/roadmapHsk1.ts#L879) | word_bank | Ghép câu: "Chúng tôi đều là bạn học." | 我们 都 是 同学 | I01,I02 |
| `c-1-6-2-1` [L901](../../src/data/roadmapHsk1.ts#L901) | word_bank | Ghép câu: "Bạn biết viết chữ Hán này không?" | 你 会写 这个汉字 吗 | I01,I02,I09 |
| `c-1-6-3-1` [L923](../../src/data/roadmapHsk1.ts#L923) | match_pairs | Nối dụng cụ học tập: | 书 → Quyển sách; 桌子 → Cái bàn; 椅子 → Cái ghế; 本子 → Vở ghi chép | I01,I02 |
| `c-1-6-3-2` [L935](../../src/data/roadmapHsk1.ts#L935) | word_bank | Ghép câu: "Trên bàn có một quyển sách." | 桌子上 有一本书 | I01,I02 |
| `c-1-6-4-1` [L957](../../src/data/roadmapHsk1.ts#L957) | match_pairs | Nối hoạt động thư viện: | 看书 → Đọc sách; 哪本书 → Quyển sách nào; 很安静 → Rất yên tĩnh; 图书馆 → Thư viện | I01,I02 |
| `c-1-6-4-2` [L969](../../src/data/roadmapHsk1.ts#L969) | word_bank | Ghép câu: "Buổi chiều tôi đi thư viện đọc sách." | 下午 我去图书馆 看书 | I01,I02 |
| `c-1-6-5-1` [L991](../../src/data/roadmapHsk1.ts#L991) | match_pairs | Nối các kỹ năng học tập: | 听 → Nghe; 说 → Nói; 读 → Đọc; 写 → Viết | I01,I02,I03 |
| `c-1-7-1-1` [L1027](../../src/data/roadmapHsk1.ts#L1027) | word_bank | Ghép câu: "Xin hỏi bệnh viện ở đâu?" | 请问 医院 在哪儿 | I01,I02 |
| `c-1-7-1-2` [L1037](../../src/data/roadmapHsk1.ts#L1037) | match_pairs | Nối các địa điểm thành phố: | 医院 → Bệnh viện; 商店 → Cửa hàng; 饭馆 → Quán ăn; 火车站 → Ga xe lửa | I01,I02 |
| `c-1-7-2-1` [L1061](../../src/data/roadmapHsk1.ts#L1061) | word_bank | Ghép câu: "Cửa hàng ở phía trước bệnh viện." | 商店 在 医院 前面 | I01,I02,I09 |
| `c-1-7-3-1` [L1083](../../src/data/roadmapHsk1.ts#L1083) | match_pairs | Nối phương hướng và cự ly: | 左边 → Bên trái; 右边 → Bên phải; 旁边 → Bên cạnh; 很近 → Rất gần | I01,I02 |
| `c-1-7-3-2` [L1095](../../src/data/roadmapHsk1.ts#L1095) | word_bank | Ghép câu: "Trường học ở ngay bên cạnh quán ăn." | 学校 就在 饭馆旁边 | I01,I02 |
| `c-1-7-4-1` [L1117](../../src/data/roadmapHsk1.ts#L1117) | match_pairs | Nối cách thức đi lại: | 坐飞机 → Đi máy bay; 开车 → Lái xe ô tô; 怎么去 → Đi bằng cách nào; 车站 → Bến xe / Trạm đón | I01,I02 |
| `c-1-7-4-2` [L1129](../../src/data/roadmapHsk1.ts#L1129) | word_bank | Ghép câu: "Bạn đi Bắc Kinh bằng cách nào? Tôi đi máy bay." | 你怎么去北京 我坐飞机去 | I01,I02 |
| `c-1-7-5-1` [L1151](../../src/data/roadmapHsk1.ts#L1151) | word_bank | Ghép câu: "Phía trước có một cửa hàng rất lớn." | 前面 有一个 很大的商店 | I01,I02,I03 |
| `c-1-8-1-1` [L1185](../../src/data/roadmapHsk1.ts#L1185) | match_pairs | Nối từ vựng thời tiết: | 天气 → Thời tiết; 冷 → Lạnh; 热 → Nóng; 下雨 → Trời mưa | I02,I08 |
| `c-1-8-1-2` [L1197](../../src/data/roadmapHsk1.ts#L1197) | word_bank | Ghép câu: "Hôm nay thời tiết thế nào? Hôm nay trời rất lạnh." | 今天天气怎么样 今天太冷了 | I02,I08 |
| `c-1-8-2-1` [L1219](../../src/data/roadmapHsk1.ts#L1219) | match_pairs | Nối các sở thích cá nhân: | 看电影 → Xem phim; 听音乐 → Nghe nhạc; 看书 → Đọc sách; 喜欢 → Thích | I02 |
| `c-1-8-2-2` [L1231](../../src/data/roadmapHsk1.ts#L1231) | word_bank | Ghép câu: "Tôi thích xem phim Trung Quốc." | 我喜欢 看中国电影 | I02 |
| `c-1-8-3-1` [L1253](../../src/data/roadmapHsk1.ts#L1253) | match_pairs | Nối các hiện tượng thời tiết: | 下雪 → Tuyết rơi; 刮风 → Gió thổi; 春天 → Mùa xuân ấm áp; 夏天 → Mùa hè | I01,I02,I09 |
| `c-1-8-3-2` [L1265](../../src/data/roadmapHsk1.ts#L1265) | word_bank | Ghép câu: "Ngày mai trời sẽ có tuyết rơi." | 明天 会下雪 | I01,I02,I09 |
| `c-1-8-4-1` [L1287](../../src/data/roadmapHsk1.ts#L1287) | match_pairs | Nối hoạt động vui chơi: | 游泳 → Bơi lội; 跑步 → Chạy bộ; 玩儿 → Vui chơi; 一起去 → Cùng nhau đi | I01,I02,I09 |
| `c-1-8-4-2` [L1299](../../src/data/roadmapHsk1.ts#L1299) | word_bank | Ghép câu rủ rê bạn bè: "Ngày mai chúng mình cùng nhau đi chơi nhé!" | 明天 我们一起 去玩儿吧 | I01,I02,I09 |
| `c-1-8-5-1` [L1321](../../src/data/roadmapHsk1.ts#L1321) | word_bank | Ghép câu chúc mừng tốt nghiệp HSK 1: | 祝贺你 顺利学完 HSK 1全部课程 | I01,I02,I04 |

## Xác minh và giới hạn bàn giao

- Kiểm kê được tái tính bằng cách import các hằng TypeScript từ commit nguồn, đếm unit/node/challenge và đối chiếu từng ID về dòng định nghĩa. Đọc thủ công nội dung cả 71 câu; không chạy màn hình trên mobile trong GĐ1.
- `npm test`: **23/23 PASS**, 0 lỗi/skip. `npm run build`: **PASS** (TypeScript + Vite). Build có cảnh báo chunk chính 734.40 kB > 500 kB và npm có cảnh báo cấu hình http-proxy; không sửa hạ tầng trong GĐ1.
- Kiểm tra độc lập bằng import dữ liệu: đủ 9 unit / 40 node / 71 câu; ID duy nhất; pool đáp án hợp lệ; 33/33 câu ghép có audio; cặp nối không trùng ID/hai phía. Bảng báo cáo có đủ 9 phần unit, 40 dòng chặng và 71 dòng câu. `git diff --check`: PASS.
- Backend không đổi; không yêu cầu build backend cho thay đổi báo cáo.
- Chưa kiểm tra trực tiếp browser/mobile, accessible name, âm thanh TTS/microphone; chưa đối chiếu hình/audio gốc hoặc quyền sử dụng; chưa được chuyên gia duyệt ngôn ngữ; chưa đối chiếu danh mục kỳ thi chính thức.
- GitHub Actions: kiểm tra trên commit báo cáo cuối sau khi đẩy; trạng thái cuối được báo trong bàn giao/PR, không ghi SHA tự tham chiếu trong cùng commit.

## Bước tiếp theo được đề xuất

GĐ2 thiết kế hành trình người mới dựa trên I01/I04/I05/I06/I10 trước, tái dùng dữ liệu V/G/U. Cần chốt chuẩn/chương trình và bản đồ prerequisite, rồi lập bảng ID cũ → bài mới cùng phương án sao lưu/chuyển đổi/khôi phục. **Chưa thực hiện GĐ2, chưa sửa bài mẫu và chưa đổi dữ liệu người học trong GĐ1.**
