# Giai đoạn 3 — Bài mẫu Chào hỏi và xin lỗi

Ngày: 2026-11-02 (Việt Nam). Baseline: `16e64a34b90c107b3c193d73c587c42aa918d285`, nhánh `refactor/learning-safety-a5bb852`, PR #1 open/draft khi bắt đầu; checkout và remote head khớp, không có thay đổi chưa commit.

## Phạm vi đã triển khai

Hoàn thiện đúng một bài thử nội bộ đang có, theo [thiết kế GĐ2](hsk1-phase2-beginner-journey.md). Vào bằng `npm ci && npm run dev`, ở Lộ Trình HSK 1 chọn **Thử bài mẫu: Chào hỏi và xin lỗi**. Nút vẫn chỉ có ở DEV; không thêm đường mở production. Không sửa 40 node hoặc 71 câu roadmap, không migration, không đổi ID/thứ tự/mở khóa, không cộng XP/gems và không merge/deploy.

| Phần | Hành vi |
|---|---|
| Mục tiêu/đầu vào | Hiện mục tiêu, cách học và điều kiện âm thanh trước khi bắt đầu |
| Học | 5 cụm từ có Hán tự/pinyin/nghĩa/cách dùng; 3 điểm học; 2 ví dụ hiện đầy đủ |
| Nghe trong phần học | Có nút nghe từ/ví dụ, ghi rõ giọng thiết bị; kiểm tra giọng tiếng Trung trước phát |
| Luyện có hướng dẫn | 2 câu có gợi ý/giải thích; không tính vào điểm tự làm |
| Tự làm | 4 câu, trong đó q-group chuyển thành nghe–chọn nghĩa; giữ ID và mục tiêu lời chào nhiều người |
| Câu nghe | Không hiện Hán tự/pinyin/câu đích trong nhãn nút khi chưa kiểm tra; lựa chọn bằng nghĩa tiếng Việt. Chỉ chấm sau nhận callback phát xong; không có giọng/lỗi phát thì báo rõ và cho thử lại/thoát |
| Ôn lỗi | Lọc đúng câu sai, luyện mỗi câu một lần; vẫn có thể kết thúc nếu còn sai, không vòng lặp bắt buộc |
| Kết quả | Điểm lần đầu và điểm ôn tách riêng; từ 3/4 ghi tự làm tốt, thấp hơn ghi cần ôn thêm; không chứng nhận HSK |
| Lưu/thoát | Chỉ ghi khi nhấn Lưu; lỗi ghi giữ màn hình và cho thử lại; thoát giữa bài cần chọn tiếp tục hoặc bỏ lượt chưa lưu; kết quả cũ giữ nguyên |
| Truy cập | Focus đầu bài/câu, giữ Tab trong modal, Escape mở xác nhận thoát, trả focus khi đóng; cuộn riêng, nút tối thiểu 46px, CSS reduced motion |

Âm thanh phát xong là tín hiệu kỹ thuật của Web Speech API, không chứng minh thiết bị có âm lượng hay người học thực sự đã nghe. Không tuyên bố giọng bản xứ hoặc đã kiểm định chất lượng phát âm.

## Dữ liệu và tương thích

- Chỉ ghi `aster_pilot_hsk1_greetings_v1`. Giữ các trường cũ completed/correct/total/completedAt; thêm hai trường tùy chọn reviewCorrect/reviewTotal. Điểm correct luôn là lần đầu.
- Validator dùng chung giữa bài mẫu và nhập backup: số nguyên không âm, correct ≤ total, reviewCorrect ≤ reviewTotal, reviewTotal = total − correct khi có dữ liệu ôn, ngày hợp lệ. Kết quả 4 câu từ pilot cũ không có trường ôn vẫn đọc được.
- Backup format v1 hiện có tiếp tục dùng: không thêm key mới hay đổi ý nghĩa trường cũ; thử round-trip cả kết quả pilot cũ và mới. Đây không phải metadata roadmap v2 của thiết kế GĐ2.
- Nếu kết quả cũ hỏng/không đọc được, vẫn cho học nhưng tạm khóa ghi kết quả để tránh ghi đè âm thầm; hướng dẫn xuất bản sao/khôi phục. Không biến dữ liệu lỗi thành kết quả trống rồi ghi đè.
- Lượt đang học chưa có lưu tạm từng câu. Đóng/tải lại giữa bài sẽ bỏ lượt chưa lưu; màn xác nhận thoát nói rõ. Lần hoàn thành đã lưu vẫn đọc được sau tải lại. Mở lại chỉ đọc, không thưởng lại.

## Nguồn và phần chưa duyệt

Tái dùng bản biên tập `content-drafts/hsk1-greetings.v1.json`, nguồn bài 1 S1 được đối chiếu văn bản trong GĐ1, và nội dung dạy/giải thích đã có. Thêm hai câu hướng dẫn từ cùng mục tiêu; không nhập hình/slide/audio nguyên bản. Hiện nguồn và trạng thái pending ngay trong bài. `publication.enabled=false`, languageReview=pending, assetRights=unverified; chưa duyệt ngôn ngữ chuyên môn hay quyền tài nguyên để phát hành. TTS lấy từ giọng sẵn có trên thiết bị, không gán track MP3 từ bộ khác.

## Xác minh

### Tự động local

- `npm test`: **28/28 PASS** sau thay đổi; 23 test cũ được điều chỉnh thành 22 test chung + 6 ca pilot chuyên biệt. Không phải tăng từ 23 lên 29 vì ca pilot cũ được thay bằng bộ test mới.
- Bộ test pilot kiểm tra hết hành trình, không chọn, đúng/sai, ôn lại sai vẫn kết thúc, không lộ câu nghe, giọng chưa có/phát lỗi, lưu lỗi/thử lại không đếm đôi, thoát/hủy thoát, focus bàn phím, giữ kết quả cũ, dữ liệu hỏng, backup cũ/mới và không đổi các key roadmap/XP/sổ lỗi.
- `npm run build`: **PASS**, TypeScript + Vite. Cảnh báo chunk chính ~734 kB > 500 kB và cấu hình npm http-proxy còn tồn tại; không mở rộng refactor bundle.
- `node --check tests/browser/greetingsPilot.smoke.mjs`: PASS. `git diff --check`: PASS.

### Trình duyệt tự động trong CI

Chromium không có sẵn trong môi trường local; lần tải bằng Playwright thất bại do gói tải không phải ZIP hợp lệ. Dev server chạy được ở 127.0.0.1; chưa chạy browser local. Không ghi ca browser local là PASS.

Workflow hiện có được bổ sung bước cài Playwright **1.62.1** vào thư mục tạm của runner, không đổi dependency/lockfile ứng dụng. Script `tests/browser/greetingsPilot.smoke.mjs` chạy Vite DEV và Chromium ở **320px, 390px, 1280px**, kiểm tra hành trình dạy/hướng dẫn/tự làm/nghe lỗi/ôn/lưu lỗi/thử lại/tải lại, Tab/Escape, nút ≥44px, không cuộn ngang, reduced motion và không đổi key tiến độ khác. Audio là stub có chủ ý: chỉ xác minh giao diện và đường xử lý, không kiểm tra phát âm thật.

Chạy lại script sau khi có Chromium:

```sh
npm install --prefix /tmp/aster-pilot-browser --no-package-lock playwright@1.62.1
/tmp/aster-pilot-browser/node_modules/.bin/playwright install chromium
PLAYWRIGHT_MODULE_DIR=/tmp/aster-pilot-browser/node_modules/playwright node tests/browser/greetingsPilot.smoke.mjs
```

Workflow giữ screenshot từng kích thước ở artifact `pilot-browser-screenshots`. Kết quả browser/CI phải đọc trên commit cuối và báo ở bàn giao; việc thêm script không tự chứng minh browser đã PASS.

### Chưa xác nhận

Chưa thử iPhone/Android thật, Safari/WebKit, bàn phím ảo, giọng đọc tiếng Trung thật hoặc microphone. Bài không dùng microphone/chấm phát âm. Chưa được người duyệt ngôn ngữ nghiệm thu; chưa thử với người học mới. Kết quả lưu trên thiết bị, chưa đồng bộ. Đối với kiểm thử trình duyệt CI, screenshot tự động không thay thế việc xem xét bố cục bằng mắt hoặc thử thiết bị thật.

## Bước tiếp theo

Nghiệm thu bài mẫu và các giới hạn trên trước khi áp dụng nhiều bài. GĐ4 chỉ phân loại/đề xuất phần ôn và phần phụ, không tự bật migration của GĐ2. Không mở rộng HSK2–4 hoặc đổi production trong giai đoạn này.
