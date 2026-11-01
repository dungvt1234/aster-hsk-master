# Aster HSK Master

Ứng dụng học và luyện tập tiếng Trung. Bản hiện tại lưu tiến độ trên trình duyệt của thiết bị; chưa có tài khoản hoặc đồng bộ đám mây thật.

## Chạy dự án

Yêu cầu Node.js 20.19+ hoặc 22.12+.

```sh
npm ci
npm run dev
npm test
npm run build
```

Backend thử nghiệm: `cd backend && npm ci && npm run build && npm start`. API sao lưu và nộp bài trả lỗi 503 cho tới khi có lưu trữ thật; không dựa vào chúng để bảo quản dữ liệu.

## Dữ liệu và giới hạn

- Không xóa dữ liệu trình duyệt nếu chưa lưu tiến độ ở nơi khác. Trong hồ sơ, chọn **Xuất tiến độ** để tải bản sao JSON. Bản sao bao gồm hồ sơ và dữ liệu học, không bao gồm kho mật khẩu cũ, khóa API hay cấu hình theo dõi. Chức năng nhập lại bản sao chưa được tích hợp; giữ tệp an toàn để có thể hỗ trợ khôi phục sau.
- Các tài khoản trên thiết bị từ phiên bản trước chưa phải tài khoản xác thực. Tạo tài khoản và đăng nhập Google được tạm dừng, không xóa kho dữ liệu cũ. Người từng dùng mật khẩu thật trong phiên bản cũ nên đổi mật khẩu đó ở những nơi đã dùng lại.
- AI dùng chung chưa được cấu hình; nếu nhập khóa Gemini cá nhân, khóa được lưu trên thiết bị và gọi trực tiếp Google. Chỉ dùng thiết bị tin cậy.
- Đề thi và bảng xếp hạng là luyện tập mô phỏng. Điểm là tham khảo, không phải điểm chứng chỉ HSK.
- Trước khi phát hành công khai cần xác nhận quyền sử dụng tài liệu và âm thanh, kiểm tra trên các trình duyệt/điện thoại, và cấu hình dịch vụ xác thực và sao lưu thật.
