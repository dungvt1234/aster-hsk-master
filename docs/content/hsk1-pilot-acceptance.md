# Nghiệm thu bài mẫu HSK 1 — Bước A, B và phần độc lập C

Ngày thực hiện: **2026-11-02 (Việt Nam)**. Người thực hiện: **Codex, agent kỹ thuật/chuẩn bị hồ sơ**; không tự nhận là chuyên gia tiếng Trung hoặc người học thử.

Nhánh: `refactor/learning-safety-a5bb852`; baseline được kiểm tra `f234909b156c2a2e8119d529e8e110e10fe1b675`. PR #1 open/draft; checkout đầu sạch, fast-forward từ a45be77 chỉ thêm kế hoạch mới; không có AGENTS.md trong checkout. Đã đọc kế hoạch nghiệm thu mới và đối chiếu sáu tài liệu trong §2 với mã hiện tại; nội dung sáu tài liệu không đổi so với lượt bàn giao trước.

## Kết luận và giới hạn

**Kỹ thuật tự động: PASS trong phạm vi DOM + Chromium CI đã quan sát; local browser: BLOCKED. Cổng mở rộng nội dung/trải nghiệm: PENDING.** Không có lỗi kỹ thuật nghiêm trọng mới được tái hiện trong đợt này; không cần sửa source runtime để vượt test. Bổ sung ba test hồi quy kiểm tra các góc âm thanh/ôn/lượt chưa lưu còn thiếu bằng chứng.

Chưa được phép suy nghiệm thu ngôn ngữ/quyền/người học/thiết bị thật từ kết luận kỹ thuật. Chưa mở rộng nội dung xuất bản, chưa đổi thứ tự/mở khóa hoặc bật migration. Nội dung cần duyệt được chuẩn bị đầy đủ, không dừng ở việc ghi “chờ người duyệt”.

## Môi trường và cách tái hiện

- Local: Linux x64 container, Node.js 24.22.1; React 19, TypeScript/Vite theo lockfile hiện có; test DOM bằng jsdom. Chỉ dữ liệu thử được tạo trong test; không đụng storage của người dùng.
- Vào bài: `npm ci`, `npm run dev`, mở HSK1 → **Thử bài mẫu: Chào hỏi và xin lỗi**. Mở bằng DEV, không triển khai production. Guard DEV hiện tại trong `DuolingoPathView.tsx` được giữ nguyên.
- Tự chạy: `npm test` **34/34 PASS**, 0 fail/skip; `npm run build` **PASS**; `git diff --check` PASS. Cảnh báo sẵn có: npm http-proxy và bundle chính 735.10 kB > 500 kB. Không sửa backend; không mở rộng bundle refactor.
- Tự thử browser local: `PLAYWRIGHT_MODULE_DIR=/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node tests/browser/greetingsPilot.smoke.mjs` → exit 1 vì thiếu `/root/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell`. **BLOCKED môi trường**, không coi là bài học runtime FAIL hoặc browser PASS.
- Đọc CI trên đúng baseline: [Learning checks #12](https://github.com/dungvt1234/aster-hsk-master/actions/runs/41380917812), SHA f234909…, success; job 125071333729 gồm test/build frontend/backend và Chromium scripts. Đây là **đọc log CI**, không phải tự điều khiển thiết bị hay browser local. CI kiểm tra 320/390/1280 px, dark theme ở 390px, keyboard và reduced motion; speech bị stub có chủ ý.
- Commit hồ sơ cuối thêm tài liệu và test, không thay runtime. CI trên SHA cuối được kiểm tra riêng sau khi đẩy; link/trạng thái chính xác được ghi trong bàn giao, không tự tham chiếu một SHA chưa được tạo trong cùng commit.

## Ma trận nghiệm thu

PASS ở bảng chỉ có nghĩa đúng trong lớp bằng chứng ghi cùng dòng. Các dòng PENDING/BLOCKED chưa được ký đạt.

| ID | Tiêu chí / bước tái hiện | Trạng thái | Bằng chứng thực hiện | Mức ảnh hưởng / xử lý còn lại |
|---|---|---|---|---|
| A01 | Mở đúng nút DEV từ HSK1; không tạo nút production | PASS đọc mã + build | Guard DEV trong DuolingoPathView; build local | Chưa browser production; không deploy để thử |
| A02 | Intro có mục tiêu/điều kiện trước bài; phần học có 5 cụm/3 điểm/2 ví dụ | PASS hiện diện | JSON và component; test contentDraft; DOM hành trình | Tính đúng/tự nhiên là B01, không PASS ngôn ngữ |
| A03 | Hai câu có hướng dẫn trước bốn câu tự làm, không cộng điểm hướng dẫn | PASS tự chạy DOM | greetingsPilot.test: hành trình 4/4 và bản ghi đúng | Cần người mới đánh giá độ lặp/đoán đáp án |
| A04 | Chưa chọn không chấm; lựa chọn và giải thích khớp khóa cấu hình | PASS cấu trúc/DOM | contentDraft + test nghe/chọn; câu chưa chọn disabled | Không chứng minh khóa đúng chuyên môn |
| A05 | Câu nghe không hiện câu đích/pinyin/nhãn nút chứa đáp án trước kiểm tra | PASS DOM + đọc CI | Test listening; smoke có kiểm tra accessible button/text | Cần VoiceOver/TalkBack thực tế, chưa kiểm toàn bộ accessibility tree |
| A06 | Không giọng/error/API thiếu/timeout/callback muộn | PASS fault injection DOM | Test mới API undefined, timer timeout rồi callback muộn; test voice missing/error cũ | Không chấm nghe khi chưa có callback thành công; âm lượng thật vẫn chưa kiểm |
| A07 | Hủy nghe khi thoát; callback sau hủy không mở chấm | PASS tự chạy DOM | Test mới pending speech → thoát → onend muộn → tiếp tục, Kiểm tra vẫn disabled | Không xác nhận mọi OS voice engine |
| A08 | Một/bốn câu sai ôn đúng một lượt; điểm lần đầu không bị nâng bởi ôn | PASS tự chạy DOM | Test review 3/4 và test mới 0/4, vẫn tới kết quả dù ôn sai | Không chứng minh người học ghi nhớ dài hạn |
| A09 | Lưu, mở lại, giữ kết quả cũ, nhập/xuất pilot cũ và mới | PASS DOM/service | Tests pilot round-trip + backup/recovery toàn dự án | Chưa thử import trên Safari/thiết bị thật |
| A10 | Dữ liệu cũ hỏng không bị âm thầm thay bằng trống | PASS tự chạy DOM | Seed `{broken`, học vẫn được, nút lưu khóa, raw giữ nguyên | Cần thử quyền storage bị chặn thật |
| A11 | Quota khi lưu: giữ kết quả cũ, báo lỗi, thử lại không đếm đôi | PASS fault injection + đọc CI | Mock setItem throw; kiểm raw cũ; retry đúng 4/4 | Hoạt động của localStorage không bảo đảm sao lưu ngoài thiết bị |
| A12 | Thoát/hủy thoát/tải lại giữa bài; lượt chưa lưu không thay lần cũ | PASS DOM | Unmount/remount sau 0/4 chưa lưu, đọc lại 2/4 cũ; confirm exit test | DOM remount là mô phỏng tải lại; CI reload sau lưu là browser thật |
| A13 | Focus/Tab/Shift+Tab/Enter/Escape/reduced motion | PASS DOM + đọc CI | Exit focus/trap tests; Chromium smoke, CSS giảm chuyển động | Chưa kiểm screen reader/keyboard trên iOS/Android |
| A14 | 320/390/1280 px, cuộn, nút ≥44px, không tràn vùng bài, contrast chữ chính | PASS đọc CI | Baseline #12 smoke; ảnh artifact trong Actions | Không gọi là thử điện thoại thật; final CI phải đọc riêng |
| A15 | Browser local | BLOCKED | Lệnh launch thất bại do thiếu Chromium, xem môi trường trên | Cài browser phù hợp ở môi trường cho phép hoặc dùng CI; không bypass mạng |
| A16 | iOS/Safari, Android/Chrome thật, giọng zh thật/âm lượng | BLOCKED | Không có thiết bị/giọng thật trong môi trường thực hiện | Thử theo checklist D01–D07, ghi người/ngày/thiết bị |
| A17 | Nguồn và trạng thái pending hiện trong bài | PASS hiện diện | details nguồn và publication=false trong JSON | Quyền tài nguyên/chuyên môn vẫn PENDING |
| B01 | Từng cụm/điểm/ví dụ/đề/đáp án được chuyên môn duyệt | PENDING | Phiếu 16 mục đã chuẩn bị, chưa có reviewer thực tế | Chặn cổng mở rộng nội dung |
| B02 | Nguồn/quyền và chương trình được xác nhận | PENDING | S1 đã đọc văn bản ở lượt trước; quyền chưa được xác nhận; HSK version chưa chốt | Không xuất bản tài nguyên mới/chưa rõ quyền |
| B03 | Người mới thật học và phản hồi có quan sát | PENDING | Kịch bản U01–U10 và phiếu trống đã chuẩn bị | Chặn cổng trải nghiệm; không giả định test agent là người học |
| C01 | Chuẩn bị đủ unit và khoảng thiếu phát âm | PASS hồ sơ | Bảng 9 unit/40 ID trong expansion-preparation, đối soát bằng script | Không đồng nghĩa unit đã biên tập/xuất bản |
| C02 | Phác thảo bài tiếp theo xử lý vấn đề cụ thể | PASS hồ sơ / PENDING nội dung | Unit2 hỏi nhân khẩu, sửa cách hỏi 口/个 ở mức đề xuất | Không import vào app; cần duyệt và nghiệm thu từng unit |

## Hồ sơ B và C đã tạo

1. [Phiếu duyệt nội dung](hsk1-pilot-content-review.md): 5 cụm từ + 3 điểm học + 2 ví dụ + 2 câu hướng dẫn + 4 câu tự làm; ID, chữ/pinyin/nghĩa, đáp án, nguồn, vấn đề và mẫu người/ngày duyệt. Tất cả nội dung giữ PENDING.
2. [Kịch bản người mới và thiết bị](hsk1-pilot-user-device-checklist.md): U01–U10, D01–D07, ghi nhận thiết bị/giọng/điểm khó/giúp đỡ; tránh dữ liệu cá nhân không cần thiết.
3. [Chuẩn bị mở rộng](hsk1-expansion-preparation.md): 9 unit/40 ID, mục tiêu, tiên quyết, vấn đề, nguồn, ưu tiên/bài ôn; pinyin hiện có và khoảng thiếu; migration tham chiếu GĐ2 chưa bật.
4. [Bản nháp Unit2](hsk1-unit2-family-draft.md): hỏi nhân khẩu và 口/个, có phần dạy/ví dụ/hướng dẫn/tự làm/ôn và ánh xạ ID cũ; NOT PUBLISHED/NOT BUNDLED.

## Tác động và các cổng còn chờ

Thay đổi lần này: tài liệu nghiệm thu/biên tập và ba test ý nghĩa cho bài mẫu. Không sửa source app, runtime content JSON, storage schema, ID/thứ tự/mở khóa, XP/SRS/sổ lỗi/backup; không nhập tài liệu Drive hàng loạt, không thêm tài khoản/AI/backend/thư viện. PR giữ open/draft, không merge/deploy hoặc thay quyền truy cập.

Cổng mở rộng vẫn **PENDING** đến khi có reviewer thực tế (định danh/vai trò/ngày/commit), kết quả nội dung/nguồn/quyền và trải nghiệm, xử lý xong lỗi chặn. Thiếu thiết bị/người duyệt được ghi BLOCKED/PENDING, không chuyển thành PASS vì CI xanh. Việc độc lập tiếp theo: reviewer dùng phiếu để ghi nhận, bổ sung nguồn cùng chủ đề Unit2 và bằng chứng quyền; cập nhật bản nháp theo phản hồi. Triển khai/migration/xuất bản unit mới cần cổng tương ứng và xem xét riêng theo kế hoạch.
