# Aster HSK Master

Ứng dụng học và luyện tập tiếng Trung. Bản hiện tại lưu tiến độ trên trình duyệt của thiết bị; chưa có tài khoản hoặc đồng bộ đám mây thật.

## Chạy dự án

Môi trường phát triển và kiểm thử: Node.js 22.22.2+, 24.15+ (nhánh 24), hoặc 26+. CI dùng Node.js 24.

```sh
npm ci
npm run dev
npm test
npm run build
```

Backend thử nghiệm: `cd backend && npm ci && npm run build && npm start`. API sao lưu và nộp bài trả lỗi 503 cho tới khi có lưu trữ thật; không dựa vào chúng để bảo quản dữ liệu.

## Dữ liệu và giới hạn

- Không xóa dữ liệu trình duyệt nếu chưa lưu tiến độ ở nơi khác. Trong hồ sơ, chọn **Xuất tiến độ** để tải bản sao JSON. Bản sao bao gồm hồ sơ và dữ liệu học, không bao gồm kho mật khẩu cũ, khóa API hay cấu hình theo dõi. Có thể chọn tệp để khôi phục trong hồ sơ. Ứng dụng kiểm tra toàn bộ tệp, yêu cầu tải bản sao hiện tại trước khi thay các mục trùng và tải lại trang. Nếu ghi lỗi, ứng dụng thử khôi phục các giá trị cũ. Tệp sai định dạng hoặc chứa khóa ngoài dữ liệu học bị từ chối.
- Các tài khoản trên thiết bị từ phiên bản trước chưa phải tài khoản xác thực. Tạo tài khoản và đăng nhập Google được tạm dừng, không xóa kho dữ liệu cũ. Người từng dùng mật khẩu thật trong phiên bản cũ nên đổi mật khẩu đó ở những nơi đã dùng lại.
- AI dùng chung chưa được cấu hình; nếu nhập khóa Gemini cá nhân, khóa được lưu trên thiết bị và gọi trực tiếp Google. Chỉ dùng thiết bị tin cậy.
- Đề thi và bảng xếp hạng là luyện tập mô phỏng. Điểm là tham khảo, không phải điểm chứng chỉ HSK.
- Trước khi phát hành công khai cần xác nhận quyền sử dụng tài liệu và âm thanh, kiểm tra trên các trình duyệt/điện thoại, và cấu hình dịch vụ xác thực và sao lưu thật.

## Phạm vi kiểm thử

`npm test` kiểm tra xuất/nhập dữ liệu, từ chối tệp lỗi, hoàn tác khi hết dung lượng, điểm luyện tập, lịch ôn và thống kê, trạng thái lộ trình, và luồng tương tác của bài số đếm đầu tiên bằng DOM mô phỏng. Kiểm thử này chưa thay thế kiểm tra trên Safari/iPhone, Chrome/Android hoặc kiểm tra microphone/âm thanh thật.

Số người và hoạt động trong phòng học là mô phỏng. Không dùng chúng để đánh giá số người dùng thật. GitHub Actions được cấu hình chạy kiểm thử và build trên mỗi Pull Request; trạng thái CI phải được kiểm tra trước khi gộp mã.

Bài mẫu nội bộ Giai đoạn 3: chạy `npm run dev`, trong HSK 1 chọn **Thử bài mẫu: Chào hỏi và xin lỗi**. Bài lưu kết quả riêng, không cộng XP hay thay tiến độ lộ trình. Xem phạm vi, kiểm thử và giới hạn tại [báo cáo bài mẫu](docs/content/hsk1-phase3-pilot-review.md).
