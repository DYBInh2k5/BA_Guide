# 10 — Phân tích khoảng cách và thiết kế To-Be

## Mục tiêu bài học
Đi từ mô hình quy trình hiện tại (As-Is) đến quy trình mục tiêu (To-Be), chuyển pain point thành thay đổi có thể truy vết tới yêu cầu và tiêu chí nghiệm thu. Mọi nội dung về nhà hàng trong case này là giả lập để học.

## 1. Phân tích khoảng cách
Đọc [ví dụ phỏng vấn](./07-Minh-hoa-Phong-van-va-Phan-tich.md), [As-Is BPMN](./09-Reservation-As-Is.drawio) và yêu cầu hiện có. Với mỗi vấn đề, ghi bằng chứng, tác động, nguyên nhân cần xác minh và cơ hội cải tiến.

| Pain point giả lập | Tác động có thể có | Cơ hội To-Be | Câu hỏi cần xác minh |
|---|---|---|---|
| Yêu cầu ở nhiều kênh/sổ | Khó tìm, có thể bỏ sót | Một hàng đợi yêu cầu tập trung | Kênh nào cần hỗ trợ ở MVP? |
| Kiểm tra sức chứa thủ công | Có thể nhận quá sức chứa | Kiểm tra khả năng nhận theo slot | Sức chứa theo bàn, ghế hay quy tắc kết hợp? |
| Khách không biết trạng thái | Gọi hỏi lại, trải nghiệm kém | Mã yêu cầu và thông báo khi đổi trạng thái | Email, SMS hay kênh khác? |
| Không rõ ai đổi trạng thái | Khó kiểm tra và bàn giao ca | Lưu lịch sử trạng thái, người thao tác và thời điểm | Thời hạn lưu lịch sử là bao lâu? |

Không được kết luận nguyên nhân chỉ từ triệu chứng. Dùng phỏng vấn, quan sát, dữ liệu và tài liệu vận hành để kiểm chứng.

## 2. Luồng To-Be đề xuất (để stakeholder xác nhận)
1. Khách nhập ngày giờ, số người và thông tin liên hệ.
2. Hệ thống kiểm tra dữ liệu và giờ hoạt động; lỗi thì yêu cầu sửa.
3. Hệ thống kiểm tra sức chứa của slot; nếu không đủ, báo hết chỗ và gợi ý chọn khung khác.
4. Nếu đủ điều kiện, tạo mã yêu cầu ở trạng thái “Chờ xác nhận”.
5. Lễ tân xem hàng đợi, đối chiếu quy tắc vận hành rồi xác nhận hoặc từ chối kèm lý do.
6. Hệ thống ghi lịch sử thay đổi và gửi kết quả cho khách.
7. Nếu gửi thông báo thất bại, giữ nguyên kết quả đặt bàn, ghi lỗi để nhân viên xử lý lại.

### BPMN cần thể hiện
- Pools: Khách hàng; Nhà hàng. Trong pool Nhà hàng có lanes Lễ tân và Hệ thống.
- Task thuộc người/đơn vị thực hiện; gateway đặt dưới dạng câu hỏi, ví dụ “Dữ liệu hợp lệ?” và “Còn sức chứa?”.
- Sequence flow chỉ đi trong cùng pool; message flow biểu diễn gửi yêu cầu/kết quả giữa khách và nhà hàng.
- Ngoại lệ email lỗi có thể là nhánh xử lý riêng; không làm mất trạng thái đã lưu.

## 3. Truy vết từ pain point đến tiêu chí kiểm thử

| Pain point / mục tiêu | Thay đổi To-Be | Yêu cầu liên quan | Cách nghiệm thu |
|---|---|---|---|
| Giảm bỏ sót yêu cầu | Hàng đợi tập trung và mã yêu cầu | FR-04, FR-07; US-01/02 | Gửi hợp lệ tạo đúng một mã; nhân viên tìm được theo mã/ngày |
| Tránh vượt khả năng nhận | Kiểm tra sức chứa trước khi tạo yêu cầu | FR-03; BRULE-02 | Slot đủ chỗ được gửi; slot thiếu chỗ bị từ chối, không sinh yêu cầu |
| Khách cần biết kết quả | Thông báo khi xác nhận/từ chối | FR-06; US-03 | Kiểm tra email gửi thành công và tình huống lỗi |
| Cần trách nhiệm giải trình | Lưu lịch sử trạng thái | NFR-03; US-02 | Lịch sử có trạng thái cũ/mới, người thao tác, thời điểm |

ID hiện có trong backlog cần được rà soát cùng stakeholder; mapping này là giả thuyết phân tích, không phải phê duyệt.

## 4. Dùng công cụ trong bài này
- **draw.io**: mở `10-Reservation-To-Be.drawio`, bật BPMN 2.0 shapes nếu muốn chỉnh ký hiệu; rà lane, gateways, nhãn nhánh và message flow; lưu phiên bản mới.
- **FigJam**: workshop pain points/gap analysis; ghi mỗi ý lên sticky note và gắn nhãn “bằng chứng”, “giả định”, “câu hỏi”.
- **Jira**: tạo Epic “Đặt bàn trực tuyến” trong project học tập được cấp quyền; chia story gửi yêu cầu, xử lý yêu cầu, thông báo; liên kết story với FR/AC. Connector site đã có, quyền tạo phụ thuộc project.
- **Confluence**: connector đã kết nối tới site Atlassian của tổ chức; quyền tạo/sửa phụ thuộc space. Dùng Markdown trong repo cho tới khi có space học tập được xác nhận.
- **Postman**: sau khi API sẵn sàng, dùng collection mẫu để gửi request hợp lệ/không hợp lệ và so kết quả với AC.
- **Figma**: ở bước sau dựng wireframe form đặt bàn và màn hình hàng đợi lễ tân từ cùng luồng nghiệp vụ.

## Bài tập có đáp án khung
Chọn một pain point trong bảng. Viết: (a) bằng chứng nào cần thu thập, (b) câu hỏi phỏng vấn cho stakeholder, (c) một quy tắc nghiệp vụ cần chốt, (d) một acceptance criterion Given/When/Then. Đáp án chỉ được xem là hoàn tất khi người dùng nghiệp vụ xác nhận giả định.

Ví dụ AC để luyện: Given slot còn đủ sức chứa và thông tin khách hợp lệ, When khách gửi yêu cầu, Then hệ thống tạo một mã duy nhất với trạng thái “Chờ xác nhận”. Thêm trường hợp biên khi slot vừa hết chỗ để kiểm tra không tạo hai đặt chỗ vượt mức.

Muốn làm một lượt từ evidence tới option, To-Be và test, dùng [worksheet Gap Analysis thực hành](./38-Gap-Analysis-Practice-Worksheet.md). Worksheet yêu cầu so sánh cả baseline “chưa đổi”, ghi hypothesis có thể bác bỏ và không đánh dấu test pass khi chưa chạy.

## Kết quả cần lưu
- Sơ đồ `10-Reservation-To-Be.drawio`.
- Gap analysis và open questions (bảng trên, được cập nhật sau workshop).
- Backlog có liên kết pain point → FR/story → AC → test case.

## Tự kiểm tra
1. Vì sao “xác nhận tức thì” chưa được đưa vào To-Be?
2. Vì sao lỗi email không nên xóa trạng thái đặt bàn đã được lưu?
3. Một yêu cầu nào trong bảng còn cần stakeholder hoặc đội kỹ thuật xác nhận?

Trả lời ba câu trên rồi gửi ảnh sơ đồ; mình sẽ review logic quy trình, BPMN và khả năng truy vết.
