# Rà soát lộ trình Duolingo — 2026-11-02

## Phạm vi

Kiểm kê dữ liệu lộ trình trong repo; đọc sâu phần HSK 1, bài đầu và bài chào hỏi. Không coi đây là kiểm định đầy đủ tính chính xác, phân cấp hoặc mức độ bao phủ của kỳ thi HSK. Chưa xác nhận phiên bản chuẩn HSK mà từng đơn vị nội dung cần tuân theo. Chưa nghe toàn bộ audio hoặc thử trên điện thoại thật.

| Cấp | Unit | Chặng | Câu trước thay đổi | Nhận xét |
|---|---:|---:|---:|---|
| 1 | 9 | 40 | 67 | Có chủ đề đời sống, nhưng nhiều chặng rất ngắn; thiếu bước dạy trước khi hỏi ở bài đầu. |
| 2 | 8 | 38 | 68 | Theo kiểm kê chỉ 1 câu nghe và 1 câu trắc nghiệm; còn lại chủ yếu là ghép. Cần tăng dạng nghe và kiểm duyệt. |
| 3 | 8 | 32 | 78 | Có các dạng nghe, ghép và trắc nghiệm; chưa đánh giá toàn bộ độ khó. |
| 4 | 8 | 32 | 58 | Theo kiểm kê có 2 câu nghe và không có câu trắc nghiệm; nhiều chặng chỉ có ít câu. Chưa đủ cơ sở nói đã bao phủ HSK 4. |

Các số trên là câu/kiểu bài theo dữ liệu, không phải số từ hoặc bằng chứng đủ chuẩn thi. Test cấu trúc kiểm tra ID duy nhất, có câu hỏi và đáp án nằm trong các lựa chọn; không xác nhận đáp án đúng về mặt chuyên môn.

## Người mới gặp khó khăn ở đâu

- Unit 0 hỏi ghép chữ/số ngay; một người chưa biết pinyin và thanh điệu có thể không biết bắt đầu thế nào. Đã thêm phần xem chữ, pinyin, nghĩa và nút nghe giọng thiết bị trước bài đầu. Pinyin chuyên sâu vẫn cần bài nhập môn riêng sau khi thống nhất phạm vi.
- Văn bản đáp án trước đây xuất hiện ngay trên câu nghe hoặc câu ghép. Đã ẩn chữ và pinyin cho tới khi kiểm tra. Câu nghe vẫn phụ thuộc giọng đọc trên thiết bị; chưa thay bằng bản thu đã đối chiếu.
- Bài chào hỏi có nội dung cơ bản nhưng ít câu. Đã thêm 2 câu về chào lịch sự và cảm ơn; bài số đếm có thêm 2 câu nhận diện chữ và nghĩa. Không đổi ID các chặng/câu cũ.
- Bài học phần lớn là bài kiểm tra ngắn. Cần bổ sung phần dạy, luyện có hướng dẫn, lặp lại từ đã sai và kiểm tra lại sau một khoảng thời gian, thay vì chỉ tăng số câu.
- Phòng thi, bộ thủ, viết chữ và AI là công cụ bổ trợ; người mới cần một đường dẫn rõ ràng từ phát âm → từ/câu cơ bản → thực hành → ôn tập. Việc tái sắp xếp cả lộ trình cần thiết kế migration vì thứ tự hiện tại tham gia mở khóa.

## Phần có thể giản lược

- Cúp cuối unit thường lặp lại nhận diện đã luyện. Nên cân nhắc chuyển thành bài ôn tùy chọn sau khi có dữ liệu người học, nhưng chưa xóa hay đổi vị trí vì có thể ảnh hưởng tiến độ mở khóa.
- Điểm, rương, giải đấu mô phỏng, nhãn miễn phí và quảng bá AI xuất hiện dày đặc. Có thể gom về khu vực phụ để bài học nổi bật hơn; không xóa chức năng trong đợt này.
- Trùng chủ đề giữa HSK 1 và 2 (thời tiết, mua sắm) không tự động là thừa: cần phân biệt ôn cơ bản với tình huống mở rộng trước khi cắt.

## Ưu tiên tiếp theo

1. Duyệt nội dung HSK 1 theo phiên bản giáo trình được chọn, lập bảng mục tiêu, từ, mẫu câu và nguồn; xác định khoảng trống so với chuẩn đã chọn.
2. Thiết kế bài nhập môn pinyin, thanh điệu và nghe, có giọng thu được cấp phép hoặc ghi rõ TTS; bổ sung ví dụ trước các câu luyện.
3. Chỉnh các chặng ít câu theo mục tiêu học; tách câu nghe và câu hiểu nghĩa, kiểm duyệt đáp án. Không tự nhận đạt chuẩn HSK khi chưa đối chiếu.
4. Thiết kế thử thay đổi thứ tự/mở khóa, có migration và sao lưu, kiểm tra người mới lẫn người đã học trước khi triển khai.
5. Thử luồng trên iPhone và Android, ghi nhận việc phát âm, khả năng nghe và kích thước nút, rồi mới đánh giá hoàn thành.
