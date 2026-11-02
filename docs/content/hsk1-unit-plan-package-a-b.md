# Thực hiện kế hoạch theo unit — Gói A và chuẩn bị Gói B

> Cập nhật sau khi cấp quyền Vercel: đã có preview READY được bảo vệ, source bc2a61d. Xem [báo cáo preview](hsk1-protected-preview.md) và cách mở. Các dòng BLOCKED 403 bên dưới là lịch sử Gói A–B trước khi quyền được cấp; không còn là trạng thái quyền hiện tại.

Ngày: 2026-11-02 (Việt Nam). Người thực hiện: Codex, agent kỹ thuật/biên tập bản nháp. Kế hoạch áp dụng: [hoàn thiện HSK1 theo từng unit](../ke-hoach-hoan-thien-hsk1-theo-unit.md), §12.

Baseline: `5e6ef1b2d386c13386d70b8037ea8a3ab7f50ed8`; nhánh `refactor/learning-safety-a5bb852`; PR #1 open/draft lúc bắt đầu. Head được kiểm tra qua GitHub và checkout fast-forward; không có AGENTS.md trong checkout. Một tệp chưa rõ nguồn gốc trong working tree được giữ nguyên, không đọc/sửa/xóa hoặc đưa vào commit. Không sử dụng nó để tạo bản triển khai.

## Kết quả theo chỉ thị

| Mục | Trạng thái | Đầu ra / bằng chứng | Còn chờ |
|---|---|---|---|
| A1 xác minh lại | PASS phần tự động; local browser BLOCKED | Test/build local; các ca lỗi âm thanh/lưu/ôn đã có; CI đọc trên SHA cuối sau đẩy | Không gọi DOM/CI là thiết bị thật |
| A2 tách hướng dẫn/tự làm | IMPLEMENTED / nội dung PENDING | Hai câu có hướng dẫn đổi ngữ cảnh/đáp án; pinyin giải thích cho người mới; ID giữ nguyên; test chống lặp nguyên đề/đáp án | Chuyên môn và người mới đánh giá độ tự nhiên/chuyển giao |
| A3 build preview tách biệt | IMPLEMENTED phần mã / CI cần xác minh | MODE hsk1-preview + cờ bật; build thường ẩn; script test ba tổ hợp built artifact | Cờ build không thay authentication |
| A3 preview riêng tư có URL | BLOCKED | Tìm thấy project Vercel aster-hsk-master nhưng GET project theo team trả 403 forbidden, thiếu grant scope dungvt1234s-projects | Cần quyền team và xác minh protection trước tạo preview; chưa có URL được kiểm tra |
| A4 phiếu nội dung/checklist | PREPARED / PENDING nghiệm thu | [16 mục duyệt](hsk1-pilot-content-review.md) cập nhật theo nội dung sửa; [U01–U10/D01–D07](hsk1-pilot-user-device-checklist.md) giữ đúng trạng thái chưa thử | Người/vai trò/ngày/commit và bằng chứng thật chưa có |
| B chuẩn bị Unit0 | PREPARED / DRAFT | [Bảng 4 node/12 câu](hsk1-unit0-preparation.md), [JSON nháp](../../content-drafts/hsk1-unit0-foundation.v1.json): nền tảng, số 1–5, 6–10, hàng chục, ôn số | Không import vào app; cần cổng A và nghiệm thu unit trước triển khai |
| B/C triển khai rộng, đổi tiến độ | NOT STARTED theo cổng | Không thay runtime Unit0 hoặc Unit1–8, ID/thứ tự/mở khóa, XP/SRS/sổ lỗi/backup | Chưa có nghiệm thu nội dung/quyền/trải nghiệm mẫu; chưa bật migration |

## A2 — trước và sau

| ID / mục tiêu | Trước | Sau | Trạng thái |
|---|---|---|---|
| guided-greet / lời chào | Cùng câu chào lịch sự người lớn tuổi và đáp án 您好 như q-greet | Gặp bạn cùng tuổi, chọn 你好; tự làm vẫn hỏi chào lịch sự bằng 您好 | ID/pointId giữ; PENDING chuyên môn |
| guided-apology / cặp xin lỗi | Cùng câu đáp 没关系 như q-apology | Mình làm phiền người khác, chọn lời xin lỗi 对不起; tự làm hỏi lời đáp 没关系 | ID/pointId giữ; PENDING chuyên môn |
| p-tones / cách ghi và đọc | Bắt đầu trực tiếp từ nǐ hǎo | Giải thích pinyin ghi cách đọc, dấu ˇ là thanh3, sau đó thanh gốc/3+3; nói rõ chưa phải toàn bộ phát âm | Không tạo mục tiêu chứng nhận phát âm |

Bốn câu tự làm và ID của chúng giữ nguyên. Bài hướng dẫn có gợi ý, không tính điểm; phần tự làm không còn sao chép nguyên câu/đáp án hướng dẫn của cùng điểm học. Việc hai khóa số học cùng rơi ở vị trí 0/1 chưa được coi là đoán vị trí: cần thử người mới và có thể cân nhắc xáo lựa chọn riêng sau, không suy điểm 4/4 thành khả năng hiểu tự do.

Nguồn vẫn S1 văn bản bài1 và G01 nội bộ; cách dùng 你好/您好 và 对不起/没关系 đã có trong phần dạy. Chỉ biên soạn lại ngữ cảnh tiếng Việt và nhiễu từ các cụm đã dạy, không nhập hình/slide/MP3. publication.enabled=false, ngôn ngữ/quyền vẫn pending. Phiếu duyệt 16 mục đã đồng bộ, không giữ câu cũ làm bằng chứng cho câu mới.

## A3 — đường mở preview và production

`DuolingoPathView.tsx` chỉ mở bài mẫu khi:

- Môi trường DEV, hoặc
- Build có MODE `hsk1-preview` **và** `VITE_HSK1_PILOT_PREVIEW=true`.

Build mode production không mở bài mẫu kể cả cờ true. MODE preview không cờ cũng không mở. Query `?pilot=1` không vượt điều kiện này. Script `tests/browser/pilotBuildBoundary.smoke.mjs` build và kiểm tra cả ba trường hợp bằng Chromium; không dùng test DEV thay cho kiểm tra production artifact.

**Giới hạn:** đây là cách tạo artifact nội bộ, không phải bảo mật. Không host artifact preview trên URL công khai. Muốn triển khai phải xác minh project/team/commit và protection hiện có; không thay protection, tạo share link hay deploy production để né 403. Không có deployment/URL preview mới trong đợt này; chưa thử truy cập qua điện thoại, không ghi A3 hosted preview PASS.

Vercel đã được đọc bằng connector: lọc repo trả rỗng, tìm tên aster trả project hiện có; GET chi tiết project với team được quan sát trả **403 forbidden / not authorized**. Vì chưa đọc được protection, không gọi create_deployment. Quy trình cấp grant phải do chủ tài khoản xác nhận trong Vercel; không yêu cầu token hay mật khẩu. Link cấp quyền có thời hạn chỉ trả trong hội thoại, không lưu vào repo.

### Chạy local trên desktop

Từ checkout đúng nhánh/SHA đã bàn giao (không ghi đè thay đổi local):

```sh
npm ci
npm run dev -- --host 127.0.0.1
```

Mở `http://127.0.0.1:3000/`, chọn HSK1 → **Thử bài mẫu: Chào hỏi và xin lỗi**. Địa chỉ này chỉ dành cho máy đang chạy; đây là hướng dẫn local, không phải URL preview được kiểm tra trên điện thoại.

Kiểm tra artifact preview bằng shell Linux/macOS:

```sh
VITE_HSK1_PILOT_PREVIEW=true npm run build:pilot-preview
npx --no-install vite preview --outDir dist-pilot-preview --host 127.0.0.1 --port 4176 --strictPort
```

PowerShell trên Windows:

```powershell
$env:VITE_HSK1_PILOT_PREVIEW = 'true'
npm run build:pilot-preview
npx --no-install vite preview --outDir dist-pilot-preview --host 127.0.0.1 --port 4176 --strictPort
```

Mở `http://127.0.0.1:4176/` trên máy đang chạy. Khi cần thử điện thoại cùng LAN tin cậy, chủ máy có thể tự chạy DEV với `--host 0.0.0.0`, rồi mở `http://<IP-LAN-của-PC>:3000/` trên điện thoại; phải dùng IP thật của PC, cùng mạng và quyền firewall phù hợp. Không có URL LAN thật nào đã được kiểm tra ở đây; không mở router/public tunnel hoặc đổi quyền mạng trong đợt này.

## Kiểm thử và bằng chứng

- `npm test`: **35/35 PASS** sau sửa, gồm test mới ngăn hướng dẫn lặp nguyên đề/đáp án của tự làm; các test chấm điểm/ôn/giọng thiếu/error/timeout/callback muộn/lưu lỗi/backup cũ vẫn giữ.
- `npm run build`: PASS. `VITE_HSK1_PILOT_PREVIEW=true npm run build:pilot-preview`: **PASS** (đã chạy local), artifact nằm riêng ở dist-pilot-preview. Cảnh báo bundle >500kB/http-proxy ghi riêng, không mở refactor ngoài phạm vi.
- `node --check tests/browser/pilotBuildBoundary.smoke.mjs`, `git diff --check`: PASS.
- Browser local: tự chạy script boundary, BLOCKED do thiếu Chromium headless executable tại môi trường. Không dùng lỗi môi trường để ghi bài mẫu FAIL, không ghi browser local PASS.
- CI theo SHA cuối: chạy lại test/build/frontend/backend, smoke bài mẫu đã sửa ở 320/390/1280, smoke lộ trình và ba tổ hợp built artifact. Trạng thái/link và log chính xác được báo khi bàn giao, sau khi đọc kết quả. Audio CI dùng stub; không gọi là nghe giọng thật.
- Đối soát hồ sơ nháp bằng script: đủ 4 node/12 challenge Unit0, ID tồn tại trong roadmap hiện tại; publication=false và mode=not-bundled; src không import bản nháp Unit0; đủ 16 ID trong phiếu duyệt. Đây là xác minh cấu trúc, không duyệt ngôn ngữ.

## Nội dung Unit0 đã chuẩn bị và điều kiện tiếp theo

Bản nháp có phần nhận diện Hán tự/pinyin/nghĩa; bốn dấu thanh và thanh nhẹ có ngữ cảnh; số 1–5/6–10; mẫu 11–99; ví dụ 14/27 trước tự làm 15/99; bài ôn số chỉ nhận diện chữ đã học. Có ánh xạ đủ từng câu đang hỏi, giải thích lỗi, nguồn nội bộ và phần S1 chưa đủ đối chiếu. Đề xuất thu hẹp nhãn giá/100 nhưng chưa sửa nhãn đang chạy.

Chưa tạo node nền tảng mới, chưa chuyển cúp thành tùy chọn. Khi cổng A đạt thực tế: triển khai Unit0 trên nhánh giữ ID/tiến độ, test người mới/học dở/rải rác/hoàn tất/free mode/học lại/backup cũ; báo unit riêng rồi chờ nghiệm thu trước unit tiếp. Replay vẫn dùng callback thưởng cũ; không tự đánh dấu hoàn thành hay hứa không có thưởng lặp nếu chưa sửa chính sách riêng.

Còn **PENDING/BLOCKED**: ngôn ngữ, nguồn/quyền, chương trình HSK, người mới, giọng thật, iOS/Safari và Android/Chrome thật, quyền Vercel team/protection/access preview. Chưa có reviewer/vai trò/ngày thực tế; các checklist không phải giấy phê duyệt. Không mở rộng nội dung xuất bản, merge PR, deploy production, thay quyền hoặc bật migration trong phạm vi này.
