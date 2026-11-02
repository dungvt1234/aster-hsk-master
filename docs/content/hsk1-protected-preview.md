# Preview bài mẫu HSK1 được bảo vệ

Ngày kiểm tra: 2026-11-02 (Việt Nam). Người thực hiện: Codex, triển khai/kỹ thuật; không phải nghiệm thu chuyên môn/người mới/thiết bị thật.

## Kết quả

- URL: https://aster-hsk-master-nwtlp1pv0-dungvt1234s-projects.vercel.app
- Deployment: `dpl_FdmCv9HZK5rWA8fWt8s2565rgqom`, **READY**, môi trường preview (API target=null, mặc định preview), không phải production.
- Source: `dungvt1234/aster-hsk-master`, nhánh `refactor/learning-safety-a5bb852`, SHA **bc2a61dfe44661ad9b3859eceeba93db65adae73**. Metadata deployment đã đọc lại khớp SHA này.
- Framework Vite, Node24; log build có mode hsk1-preview và Build Completed.
- Protection hiện có: ssoProtection enabled, all_except_custom_domains. Giữ nguyên; không tạo share token, automation bypass, public tunnel hoặc thay quyền truy cập.
- HTTP không có phiên đăng nhập: tự gửi request không theo redirect, nhận **302 → vercel.com/sso-api**. Không dùng URL với tham số bỏ qua protection.

## Mở bài mẫu

1. Mở URL trên desktop hoặc điện thoại và đăng nhập tài khoản Vercel có quyền project.
2. Chọn **HSK 1**.
3. Chọn **Thử bài mẫu: Chào hỏi và xin lỗi**, rồi **Học bài mẫu**.

Điện thoại cần đăng nhập Vercel bằng tài khoản có quyền, không chỉ mở URL. URL yêu cầu đăng nhập là hành vi dự kiến. Chưa xác minh thao tác đăng nhập/âm thanh trên điện thoại thật trong đợt này; người dùng có thể ghi kết quả theo checklist U01–U10/D01–D07.

## Thay đổi cấu hình và kiểm thử

Commit bc2a61d chỉ thêm lệnh build có điều kiện trong vercel.json và test thực thi lệnh bằng npm giả lập. Không dùng projectSettings override của API để tránh thay thiết lập build chung của project.

- VERCEL_ENV=preview: VITE_HSK1_PILOT_PREVIEW=true npm run build -- --mode hsk1-preview.
- Production hoặc không có VERCEL_ENV: npm run build như cũ.
- Test lệnh kiểm ba trường hợp; test built artifact kiểm production luôn ẩn pilot ngay cả flag=true, preview thiếu flag vẫn ẩn, preview có flag mới mở.
- Local: **36/36 test, build PASS**. Browser local vẫn thiếu Chromium, không được ghi PASS.
- [GitHub Actions #16](https://github.com/dungvt1234/aster-hsk-master/actions/runs/41416340062): **success** trên SHA triển khai bc2a61d; gồm frontend/backend build, test và smoke Chromium 320/390/1280px, bàn phím/reduced motion, ranh giới build. Đây là đọc log CI, không phải giọng hoặc điện thoại thật.
- Browser extension báo không có originating browser context, nên chưa điều khiển được phiên Vercel đã đăng nhập để kiểm thử trực tiếp bản được bảo vệ. Không tạo share link để né giới hạn này. Đã kiểm tra deployed state, SHA, log build, protection và HTTP không đăng nhập; UI với tài khoản thật còn PENDING.

## Production và dữ liệu

Đọc lại project sau triển khai: domains và protection giữ nguyên. Deployment production mới nhất vẫn là `dpl_Bivfca4mbGBoiT9LTZgQo5HrQMbW`, source master @ b70dd8e17d5803bd042bd0d2573fe458e0b05b1c. Không alias preview vào domain production, không merge PR và không deploy/promote production.

Không đổi bài học chính, ID, thứ tự, mở khóa, XP/SRS/backup hoặc dữ liệu người học. Preview dùng dữ liệu trên trình duyệt của chính URL preview; không yêu cầu nhập dữ liệu thật. File chưa rõ nguồn gốc trong checkout không được đưa vào source Git của deployment.

## Cổng còn chờ

Preview READY không phải nghiệm thu nội dung. Ngôn ngữ, nguồn/quyền, người mới, giọng thiết bị thật và iOS/Android thật vẫn PENDING/BLOCKED theo hồ sơ nghiệm thu. Unit0 vẫn là bản nháp không bundle; chưa mở rộng nội dung runtime hay bật migration.

Báo cáo này có thể được commit sau SHA triển khai để ghi đúng deployment/URL quan sát được. URL cố định ở trên trỏ bản **bc2a61d**, không tự suy nó chạy SHA của commit tài liệu mới hơn.
