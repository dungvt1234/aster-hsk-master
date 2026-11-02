# Phiếu duyệt nội dung bài mẫu HSK 1

Mốc trước sửa Gói A: `5e6ef1b2d386c13386d70b8037ea8a3ab7f50ed8`; nội dung trong phiếu đã cập nhật theo candidate Gói A của cùng đợt, SHA cuối xem báo cáo bàn giao; ngày chuẩn bị 2026-11-02. Người chuẩn bị: Codex (agent, rà cấu trúc và biên tập hồ sơ), **không phải người nghiệm thu chuyên môn**. Toàn bộ mục bên dưới: **PENDING người duyệt tiếng Trung**. Không có chữ ký/phê duyệt thực tế được suy từ test xanh.

## Nguồn và quyền

- S1: [HSK标准教程1-第1课.pptx](https://docs.google.com/presentation/d/1tHJE-3G-83SAlmWYs14XBOlKZ1zVwVaA/edit), nhãn `教学内容和目标`, `课文1–3`, `两个三声音节的连续变调`. Đây là nguồn chủ đề đã đọc văn bản trong đợt trước; lần này chưa xem lại slide gốc hoặc nghe bản thu gốc. Nhãn trích xuất không được coi là số slide đã xác minh.
- G01: `src/data/grammarDataHsk1.ts`, `01`, các điểm `g-hsk1-01-1/2/3`; nguồn nội bộ để truy vết, không thay nguồn chuyên môn độc lập.
- D: `content-drafts/hsk1-greetings.v1.json`; phần diễn đạt tiếng Việt/câu hỏi biên tập trong repo, chưa có xác nhận quyền tài nguyên để phát hành.
- Không đính kèm hình/MP3 gốc. TTS là giọng thiết bị, không phải bản thu người thật được đối chiếu. Chất lượng/điều kiện dùng của giọng cụ thể chưa được kiểm tra trên thiết bị thật.
- Phiên bản HSK/ISBN/chương trình: **chưa xác định**. Duyệt bài nhỏ này không đồng nghĩa đủ chuẩn kỳ thi.

## Từng mục cần duyệt

Chỉ số đáp án dưới đây tính từ **1**, khác answerIndex trong JSON tính từ 0. “Có thể hợp lý” là gợi ý cần xem xét, không tự mở rộng khóa chấm. Cột trạng thái chỉ được đổi khi có bằng chứng/người duyệt/ngày.

| ID / mục tiêu | Hán tự / pinyin / nghĩa hoặc yêu cầu | Đáp án / cách dùng / điều cần xét | Nguồn có thể kiểm tra | Trạng thái |
|---|---|---|---|---|
| `v-nihao` — nhận diện/cách dùng | 你好 · nǐ hǎo · Xin chào | Chào một người trong tình huống thông thường. Duyệt thanh nhẹ, ngắt từ và độ tự nhiên. | S1: 课文1; D.vocabulary | PENDING |
| `v-ninhao` — nhận diện/cách dùng | 您好 · nín hǎo · Xin chào (lịch sự) | Dùng khi muốn thể hiện sự kính trọng với người đối diện. Duyệt thanh nhẹ, ngắt từ và độ tự nhiên. | S1: 课文2; D.vocabulary | PENDING |
| `v-nimenhao` — nhận diện/cách dùng | 你们好 · nǐmen hǎo · Chào các bạn | Chào nhiều người. Duyệt thanh nhẹ, ngắt từ và độ tự nhiên. | S1: 课文2; D.vocabulary | PENDING |
| `v-duibuqi` — nhận diện/cách dùng | 对不起 · duìbuqǐ · Xin lỗi | Dùng khi mình gây phiền hoặc mắc lỗi. Duyệt thanh nhẹ, ngắt từ và độ tự nhiên. | S1: 课文3; D.vocabulary | PENDING |
| `v-meiguanxi` — nhận diện/cách dùng | 没关系 · méi guānxi · Không sao | Có thể đáp lại lời xin lỗi. Duyệt thanh nhẹ, ngắt từ và độ tự nhiên. | S1: 课文3; D.vocabulary | PENDING |
| `p-greet` — Chọn cách chào | Chào một người có thể dùng 你好. Khi muốn nói lịch sự hơn, dùng 您好. Khi chào nhiều người, dùng 你们好. | Kiểm tra diễn đạt đơn giản; phân biệt thanh gốc với biến điệu khi nói. | S1: 课文1–3; G01; D.points | PENDING |
| `p-apology` — Xin lỗi và đáp lại | Khi mình mắc lỗi, có thể nói 对不起. Người nghe có thể đáp 没关系: không sao. Đây là một cặp lời nói khác với cảm ơn và đáp lại lời cảm ơn. | Kiểm tra diễn đạt đơn giản; phân biệt thanh gốc với biến điệu khi nói. | S1: 课文1–3; G01; D.points | PENDING |
| `p-tones` — Viết nǐ hǎo, đọc gần như ní hǎo | Pinyin dùng chữ cái Latin để ghi cách đọc tiếng Trung. Dấu ˇ trong nǐ và hǎo là dấu thanh 3. 你好 được ghi theo thanh gốc là nǐ hǎo; khi nói liền hai âm tiết thanh 3, âm đầu đọc thành thanh 2, gần như ní hǎo. Đây chỉ là một quy tắc cần dùng trong bài, chưa phải toàn bộ phát âm. | Kiểm tra diễn đạt đơn giản; phân biệt thanh gốc với biến điệu khi nói. | S1: 两个三声音节的连续变调; G01; D.points | PENDING |
| `e-greet` — p-greet | 你们好！ · Nǐmen hǎo! · Chào các bạn! | Duyệt dấu câu, cách đọc tự nhiên và dịch trong ngữ cảnh. | S1: 课文2/3; D.examples | PENDING |
| `e-apology` — p-apology | 对不起。— 没关系。 · Duìbuqǐ. — Méi guānxi. · Xin lỗi. — Không sao. | Duyệt dấu câu, cách đọc tự nhiên và dịch trong ngữ cảnh. | S1: 课文2/3; D.examples | PENDING |
| `guided-greet` — p-greet | Bạn gặp một người bạn cùng tuổi. Chọn lời chào thông thường. / Pinyin theo các cụm đã dạy. Lựa chọn: 1. 你好！; 2. 没关系。; 3. 对不起。 | Đáp án 1: 你好！. 你好 dùng để chào một người. 没关系 đáp lời xin lỗi; 对不起 dùng để xin lỗi. | S1 theo điểm học; D.guidedExercises (biên soạn lại ngữ cảnh) | PENDING |
| `guided-apology` — p-apology | Bạn vô ý làm phiền người khác. Muốn nói xin lỗi, bạn chọn câu nào? / Pinyin theo các cụm đã dạy. Lựa chọn: 1. 您好！; 2. 对不起。; 3. 你们好！ | Đáp án 2: 对不起。. 对不起 là lời xin lỗi. Khi nghe lời xin lỗi, người kia có thể đáp 没关系. | S1 theo điểm học; D.guidedExercises (biên soạn lại ngữ cảnh) | PENDING |
| `q-greet` — p-greet | Muốn chào lịch sự một người lớn tuổi, bạn chọn câu nào?  / Xem các cụm từ đã dạy ở trên; không hiện pinyin riêng trong đề hiện tại. Lựa chọn: 1. 您好！; 2. 你们好！; 3. 对不起。 | Đáp án 1: 您好！. 您好 là cách chào thể hiện sự kính trọng. 你们好 dùng để chào nhiều người. Chỉ chấm lựa chọn trong ngữ cảnh đề, không bác bỏ mọi cách diễn đạt ngoài đề. | S1 theo điểm học; D.guidedExercises/exercises (câu biên soạn) | PENDING |
| `q-group` — p-greet | Nghe lời chào và chọn nghĩa đúng. 你们好 / nǐmen hǎo Lựa chọn: 1. Không sao; 2. Chào các bạn; 3. Xin lỗi | Đáp án 2: Chào các bạn. 你们好 (nǐmen hǎo) là lời chào dành cho nhiều người. Không có câu chữ đích trên màn hình trước kiểm tra; duyệt nghe thật riêng. | S1 theo điểm học; D.guidedExercises/exercises (câu biên soạn) | PENDING |
| `q-apology` — p-apology | Một người nói 对不起. Bạn muốn đáp không sao, nên chọn câu nào?  / Xem các cụm từ đã dạy ở trên; không hiện pinyin riêng trong đề hiện tại. Lựa chọn: 1. 你好。; 2. 没关系。; 3. 您。 | Đáp án 2: 没关系。. 没关系 là cách đáp không sao trong tình huống này. Chỉ chấm lựa chọn trong ngữ cảnh đề, không bác bỏ mọi cách diễn đạt ngoài đề. | S1 theo điểm học; D.guidedExercises/exercises (câu biên soạn) | PENDING |
| `q-tones` — p-tones | Khi ghi pinyin theo thanh gốc cho 你好, chọn cách viết nào?  / nǐ hǎo (thanh gốc), ní hǎo (cách đọc liên tiếp) Lựa chọn: 1. ní hǎo; 2. nǐ hǎo; 3. nǐ háo | Đáp án 2: nǐ hǎo. Viết nǐ hǎo theo thanh gốc; khi nói liền, âm đầu biến thành thanh 2. Chỉ chấm lựa chọn trong ngữ cảnh đề, không bác bỏ mọi cách diễn đạt ngoài đề. | S1 theo điểm học; D.guidedExercises/exercises (câu biên soạn) | PENDING |

## Những điểm cần quyết định rõ

1. `v-meiguanxi` ghi `méi guānxi`; nguồn trích xuất có cách tách âm khác. Chốt quy ước cách viết từ, thanh nhẹ, rồi áp dụng nhất quán; không suy mọi khoảng trắng là lỗi ngôn ngữ.
2. `p-tones`, `q-tones`: xác nhận viết thanh gốc `nǐ hǎo`, đọc biến điệu 3+3. Không dùng TTS như bằng chứng nó thực hiện đúng mọi trường hợp biến điệu.
3. `q-apology` có lựa chọn nhiễu `您。`: xem có quá dễ/đoán bằng hình thức hay chứa yếu tố chưa dạy đủ. Đáp “không sao” là 没关系 trong bộ lựa chọn này; các cách đáp khác ngoài đề cần chuyên gia xác nhận trước khi chấm nhận.
4. Gói A đã đổi hướng dẫn sang chào bạn cùng tuổi (你好) và người nói lời xin lỗi (对不起). Tự làm vẫn chào lịch sự (您好), nghe lời chào nhóm và đáp không sao (没关系). Không còn lặp nguyên đề/đáp án theo cùng điểm học; vẫn cần người mới/chuyên gia xác nhận tính chuyển giao, chưa đánh dấu PASS trải nghiệm.
5. 5 cụm từ, 3 điểm học có vừa sức người mới chưa biết pinyin không? Thử với người mới trước; đề xuất giảm/tách nếu quá tải. Không coi khung số lượng là chuẩn bắt buộc.
6. Các câu chọn không nhận văn bản tự gõ: chưa có bộ biến thể viết/đọc được phép, chưa có kiểm tra nói. Không tuyên bố chấm phát âm hoặc hiểu tự do.

## Checklist chuyên môn và quyền

- [ ] Hán tự, dấu câu, nghĩa/cách dùng tự nhiên theo ngữ cảnh.
- [ ] Pinyin, thanh nhẹ, thanh gốc và biến điệu chính xác, nhất quán.
- [ ] Đề có một lựa chọn đúng rõ; nhiễu hợp lý; không dùng chữ khó chưa dạy để đánh đố.
- [ ] Mỗi mục tiêu được dạy và có ví dụ trước phần tự làm.
- [ ] Bản dịch tiếng Việt ngắn, dễ hiểu; không giải thích nguồn gốc chữ bằng câu chuyện thiếu bằng chứng.
- [ ] Phạm vi chương trình/nguồn ghi đúng, không tự gắn chuẩn HSK.
- [ ] Ghi nguồn gốc/cách biên soạn nội dung; chứng cứ quyền cần thiết cho mọi tài nguyên dự kiến xuất bản.
- [ ] Nghe giọng thiết bị thật, đánh giá từng cụm/câu; ghi thiết bị, giọng và các âm có vấn đề.

## Mẫu ghi nhận (chưa điền, không phải phê duyệt)

Người duyệt / vai trò chuyên môn: ___; ngày: ___; commit: ___; nguồn gốc đã xem/nghe: ___

| ID | PASS / FAIL / cần sửa | Lý do và bằng chứng | Bản sửa/cách trả lời được chấp nhận | Mức ảnh hưởng | Người xác nhận lại / ngày |
|---|---|---|---|---|---|
| ___ | ___ | ___ | ___ | ___ | ___ |

Bằng chứng quyền / chủ thể / tài nguyên / phạm vi sử dụng / ngày / tài liệu chứng minh: ___

Kết luận chuyên môn: ___; quyền xuất bản: ___; điều kiện còn lại: ___
