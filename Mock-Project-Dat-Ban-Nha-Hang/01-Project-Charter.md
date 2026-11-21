# 01 — Project Charter

## Problem hypothesis — chưa được xác minh
Case study giả định rằng nhà hàng tiếp nhận yêu cầu đặt bàn qua nhiều kênh và có thể ghi chép thủ công. Điều này có thể góp phần gây trùng lịch, chậm phản hồi hoặc thiếu dữ liệu điều phối, nhưng chưa có stakeholder thật, quan sát hay dữ liệu vận hành chứng minh. Trước khi xem đây là fact, cần phỏng vấn quản lý/lễ tân, quan sát ca làm và đối chiếu sổ, file, inbox cùng nhật ký sự cố.

## Proposed business objective — cần so sánh phương án
Khám phá cách giảm bỏ sót và lỗi điều phối; xem kênh đặt bàn trực tuyến có quy tắc sức chứa và trạng thái xác nhận rõ là một option cần đánh giá, song song với cải tiến quy trình không cần xây phần mềm.

## Success measures (giả định để xác nhận)
- Ít nhất 90% yêu cầu trực tuyến được xử lý trong 5 phút trong giờ hoạt động.
- Giảm 30% trường hợp trùng lịch trong 8 tuần thử nghiệm so với đường cơ sở đã đo.
- Tỷ lệ khách đến / đặt bàn được theo dõi theo tuần; mục tiêu ban đầu 80%.
- Không phát sinh đặt bàn vượt sức chứa trong kiểm thử nghiệm thu.

## Candidate scope — online MVP (draft, pending option decision)
- Khách chọn ngày, giờ, số người, thông tin liên hệ và gửi yêu cầu.
- Hệ thống kiểm tra khung giờ/sức chứa theo cấu hình.
- Nhân viên xem danh sách, xác nhận hoặc từ chối, ghi chú và cập nhật trạng thái.
- Khách nhận thông báo kết quả qua email (SMS để ngoài MVP).
- Nhân viên tra cứu và hủy đặt bàn.

## Out of scope
- Thanh toán/đặt cọc trực tuyến.
- Tối ưu xếp bàn tự động nhiều cơ sở.
- Tích điểm, khuyến mãi, loyalty.
- Tích hợp POS hoặc nền tảng giao đồ ăn.

## Actors
Khách hàng; nhân viên lễ tân; quản lý nhà hàng; dịch vụ email; quản trị viên cấu hình giờ mở cửa và sức chứa.

## Assumptions and constraints
- Một nhà hàng, một múi giờ, giờ hoạt động và sức chứa được cấu hình trước.
- Email có thể bị trễ hoặc vào spam; giao diện phải thể hiện trạng thái gửi.
- Chính sách giữ bàn, thời gian đến trễ, hủy và số người tối đa cần stakeholder xác nhận.

## Risks
- Quy tắc sức chứa không phản ánh sơ đồ bàn thực tế.
- Khách hiểu “đã gửi yêu cầu” là “đã được xác nhận”.
- Email lỗi khiến khách không nhận kết quả.
- Nhân viên không cập nhật trạng thái tại cửa.

## Open questions
1. Đặt bàn được xác nhận tự động hay cần nhân viên duyệt?
2. Một khung giờ có giới hạn số bàn hay số khách?
3. Có cần đặt cọc hoặc giới hạn thời gian giữ bàn?
4. Chính sách hủy, đến trễ và no-show là gì?



