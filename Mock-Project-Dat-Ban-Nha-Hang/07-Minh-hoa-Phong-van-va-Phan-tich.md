# Ví dụ minh họa — Phỏng vấn và phân tích vấn đề

> **Dữ liệu giả lập để học.** Nhà hàng, lời thoại và con số trong ví dụ này không phải dữ liệu thực tế. Trong dự án thật, BA cần xác minh bằng tài liệu, quan sát hoặc số liệu vận hành.

## 1. Phỏng vấn mẫu

**BA:** Anh/chị kể lần gần nhất khách đặt bàn được không?

**Chủ nhà hàng (giả lập):** Khách thường gọi điện hoặc nhắn Facebook. Lễ tân ghi vào sổ; những yêu cầu Facebook đôi khi được chép vào file Excel cuối ca. Khách gọi thì thường được trả lời ngay, nhưng tin nhắn buổi tối có thể đến sáng hôm sau mới được đọc.

**BA:** Gần đây có tình huống nào gây khó khăn cụ thể?

**Chủ nhà hàng:** Tháng trước có hai lần khách đến nhưng sổ và file không khớp. Có một bàn bị hứa cho hai nhóm. Chúng tôi xin lỗi một nhóm và phải xếp lại chỗ.

**BA:** Anh/chị biết có bao nhiêu yêu cầu đến ngoài giờ hoặc bị trả lời chậm không?

**Chủ nhà hàng:** Tôi chưa thống kê. Tôi chỉ thấy chuyện đó hay xảy ra cuối tuần.

**BA:** Khi xử lý yêu cầu, lễ tân kiểm tra bàn trống bằng cách nào?

**Chủ nhà hàng:** Bạn ấy nhìn sổ đặt bàn và hỏi quản lý ca. File Excel không cập nhật tức thời.

**BA:** Nếu cải thiện được một điều trước tiên, anh/chị muốn thay đổi kết quả nào?

**Chủ nhà hàng:** Tôi muốn giảm nhầm lịch và không bỏ sót khách nhắn tin. Tôi chưa biết nên làm website, biểu mẫu hay cách nào khác.

## 2. Phân loại ghi chép

| Loại | Ví dụ trong cuộc phỏng vấn | Cần làm tiếp |
|---|---|---|
| Stated solution | Ban đầu chủ quán muốn chức năng đặt bàn trên website | Tạm ghi nhận là đề xuất, chưa cam kết xây website |
| Fact được stakeholder báo cáo | Yêu cầu đến qua điện thoại và Facebook; sổ giấy và Excel được dùng; Excel cập nhật cuối ca | Quan sát quy trình và kiểm tra sổ/file |
| Symptom | Trả lời tin nhắn buổi tối có thể đến sáng hôm sau; hai lần sổ và file không khớp theo lời kể | Xin timestamp tin nhắn, lịch sử đặt bàn và xác nhận ngày xảy ra |
| Desired outcome | Giảm nhầm lịch, không bỏ sót yêu cầu | Hỏi định nghĩa “bỏ sót”, đo baseline và xác nhận mục tiêu |
| Assumption chưa xác minh | Website sẽ giảm nhầm lịch; hai lần sai có liên quan tới việc dùng nhiều nơi ghi chép | Kiểm tra bằng quan sát, dữ liệu và nguyên nhân cụ thể |
| Open question | Tần suất thực tế? Ai cập nhật file? Bàn được phân bổ theo bàn hay sức chứa? | Lập danh sách câu hỏi cần follow-up |

**Điểm quan trọng:** “Hai lần trong tháng” là lời chủ nhà hàng kể, chưa phải số liệu đã được xác minh. “Dùng nhiều nơi ghi chép gây nhầm” là giả thuyết nguyên nhân, chưa nên viết như kết luận.

## 3. Problem statement bản nháp

> Nhân viên lễ tân đang xử lý yêu cầu đặt bàn qua điện thoại và Facebook bằng sổ giấy cùng file Excel cập nhật cuối ca. Chủ nhà hàng báo cáo đã có trường hợp thông tin giữa hai nguồn không khớp và tin nhắn ngoài giờ được trả lời chậm. Cần xác minh tần suất, nguyên nhân và tác động bằng cách đối chiếu sổ, file, tin nhắn và quan sát một ca làm trước khi chọn giải pháp. Mục tiêu là giảm yêu cầu bị bỏ sót và lỗi điều phối; mục tiêu định lượng sẽ được chốt sau khi đo baseline.

Đây là bản nháp tốt hơn câu “cần website đặt bàn” vì mô tả quy trình/vấn đề trước và chưa khóa giải pháp.

## 4. Chỉ số cần định nghĩa trước khi đặt mục tiêu

| Chỉ số | Định nghĩa ban đầu | Nguồn dữ liệu cần có |
|---|---|---|
| Tỷ lệ yêu cầu được phản hồi trong SLA | Số yêu cầu có phản hồi trong X phút / tổng yêu cầu hợp lệ | Timestamp tin nhắn/cuộc gọi và phản hồi |
| Tỷ lệ yêu cầu bị bỏ sót | Số yêu cầu không có trạng thái/kết quả xử lý / tổng yêu cầu | Sổ, file, inbox và đối chiếu mẫu |
| Số lỗi điều phối | Số trường hợp trùng/hứa quá sức chứa trong kỳ | Nhật ký sự cố và lịch đặt bàn |
| Tỷ lệ no-show | Số đặt bàn đã xác nhận nhưng khách không đến / số đặt bàn đã xác nhận | Trạng thái đến/không đến theo từng đặt bàn |

Chọn một khoảng thời gian và một quy tắc đếm thống nhất. Đo baseline trước, rồi mới thống nhất target với chủ nhà hàng.

## 5. As-Is flow bản chữ

1. Khách gọi điện hoặc nhắn Facebook.
2. Lễ tân đọc yêu cầu và ghi vào sổ giấy.
3. Lễ tân kiểm tra sổ; khi cần thì hỏi quản lý ca.
4. Tin nhắn Facebook có thể được chép sang Excel cuối ca.
5. Khách nhận phản hồi; thời gian phản hồi phụ thuộc vào lúc nhân viên xem tin.
6. Khi khách đến, nhân viên tra cứu thông tin để đón và xếp chỗ.

Các bước trên là **flow giả lập**. Khi thực hành thật, xác minh từng bước với lễ tân và quan sát ca làm; bổ sung nhánh ngoại lệ như hết chỗ, đổi giờ, hủy, khách đến trễ.

## 6. Bài tập nâng cấp

Dựa trên ví dụ, hãy tự trả lời:
1. Câu nào là fact do stakeholder báo cáo? Câu nào là giả thuyết của BA?
2. Bạn sẽ xin những dữ liệu/tài liệu nào để xác minh “hai lần trong tháng”?
3. Bạn cần phỏng vấn thêm ai ngoài chủ nhà hàng, và vì sao?
4. Hãy viết 2 câu hỏi follow-up để hiểu cách kiểm tra sức chứa.
5. Nêu một giải pháp không phải website cần được xem xét.

## 7. Kỹ thuật và công cụ BA tương ứng
- **Interview guide:** chuẩn bị câu hỏi và ghi câu trả lời có cấu trúc.
- **Miro/FigJam:** gom pain point, actor và câu hỏi mở trong workshop.
- **draw.io:** vẽ As-Is flow sau khi xác minh các bước.
- **Jira/Confluence:** theo dõi open questions, quyết định và liên kết yêu cầu với nguồn.
- **AI:** có thể giúp phân loại ghi chú hoặc tìm câu hỏi follow-up; BA phải kiểm chứng đầu ra với stakeholder và dữ liệu.
