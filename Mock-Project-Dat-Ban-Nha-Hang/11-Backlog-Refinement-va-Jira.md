# 11 — Refinement, ưu tiên và thực hành Jira

## Mục tiêu
Biến yêu cầu đã khám phá thành backlog đủ rõ để đội phát triển có thể ước lượng và thực hiện. Thứ tự ưu tiên dưới đây là đề xuất cho case study giả lập; Product Owner/người có thẩm quyền phải xác nhận trước khi cam kết MVP.

## 1. Ưu tiên theo giá trị, rủi ro và phụ thuộc
Dùng MoSCoW để thảo luận phạm vi, không coi nhãn là quyết định tự động. Một mục là Must khi thiếu nó khiến mục tiêu MVP không đạt hoặc luồng chính không dùng được.

| ID / backlog item | Ưu tiên đề xuất | Lý do | Phụ thuộc / cần xác nhận |
|---|---|---|---|
| US-01 Gửi yêu cầu đặt bàn hợp lệ | Must | Luồng chính tạo nhu cầu trực tuyến | Giờ hoạt động, quy tắc sức chứa, trường liên hệ bắt buộc |
| US-02 Lễ tân xử lý yêu cầu | Must | Nếu không ai xử lý yêu cầu thì khách không có kết quả cuối | Quyền xác nhận/từ chối, lý do từ chối |
| US-04 Tra cứu yêu cầu theo ngày/mã | Must (đề xuất) | Giúp lễ tân tìm và xử lý queue trong vận hành | Trường tìm kiếm và khối lượng yêu cầu |
| NFR-02 Phân quyền nhân viên | Must | Bảo vệ dữ liệu khách trong chức năng nội bộ | Cách đăng nhập/nhóm quyền do kỹ thuật xác nhận |
| NFR-03 Audit trạng thái | Must (đề xuất) | Cần biết ai đổi trạng thái và lúc nào | Thời hạn lưu, múi giờ, vai trò xem lịch sử |
| US-03 Email kết quả | Should | Giảm khách phải gọi hỏi, nhưng kênh thay thế có thể tồn tại | Nhà cung cấp email, mẫu thư, retry và xử lý lỗi |
| US-05 Hủy đặt bàn | Won't for MVP (tạm thời) | Chính sách hủy chưa được xác định | Phí/phạt, thời hạn, ai được hủy và trạng thái hợp lệ |
| NFR-01 Hiệu năng phản hồi | Must define, target TBD | Chỉ tiêu cần đo và thiết kế giải pháp | Tải dự kiến, điểm đo, percentile/SLO và xác nhận kỹ thuật |

**Chú ý:** Không tự điền điểm story hoặc deadline khi chưa estimate với đội. “3 giây” trong backlog hiện là mục tiêu giả định, chưa có tải dự kiến và cách đo; cần refinement trước khi đưa vào cam kết.

## 2. Chia nhỏ và làm rõ story
Story nên có actor, giá trị, điều kiện nghiệp vụ, lỗi/ngoại lệ và AC kiểm thử được. Với backlog đặt bàn, có thể chia như sau:

| Key tạm | Summary | Loại | Liên kết |
|---|---|---|---|
| EPIC-RES | Đặt bàn trực tuyến | Epic | BR-01, BR-02 |
| RES-01 | Khách nhập thông tin và gửi yêu cầu | Story | FR-01, FR-02, US-01 |
| RES-02 | Hệ thống kiểm tra sức chứa trước khi nhận | Story | FR-03, BRULE-02, US-01 |
| RES-03 | Hệ thống trả mã và trạng thái chờ | Story | FR-04, US-01 |
| RES-04 | Lễ tân xem danh sách yêu cầu | Story | FR-07, US-04 |
| RES-05 | Lễ tân xác nhận hoặc từ chối yêu cầu | Story | FR-05, US-02 |
| RES-06 | Khách nhận email khi có quyết định | Story | FR-06, US-03 |
| RES-07 | Hệ thống lưu lịch sử trạng thái | Story | NFR-03, BRULE-05 |

Key trên chỉ để học, Jira sẽ tự sinh issue key sau khi import/tạo issue. Chưa gán story points vì cần estimation của đội delivery.

## 3. Ví dụ acceptance criteria đủ kiểm thử

**RES-02 — Kiểm tra sức chứa**
- Given slot đang mở và còn đủ sức chứa cho party size, when khách gửi yêu cầu hợp lệ, then hệ thống có thể chuyển tiếp tới bước tạo yêu cầu.
- Given slot không còn đủ sức chứa, when khách gửi yêu cầu, then hệ thống báo slot không khả dụng và không tạo reservation.
- Given hai yêu cầu đồng thời cùng chiếm các chỗ cuối cùng, when hệ thống xử lý cả hai, then tổng số khách đã nhận không vượt sức chứa. Cách đảm bảo đồng thời cần đội kỹ thuật thiết kế.

**RES-05 — Quyết định của lễ tân**
- Given nhân viên có quyền và yêu cầu đang “Chờ xác nhận”, when nhân viên xác nhận, then trạng thái thành “Đã xác nhận” và lịch sử lưu người thao tác/thời điểm.
- Given yêu cầu đang chờ, when nhân viên từ chối mà chưa nhập lý do bắt buộc, then hệ thống yêu cầu bổ sung lý do và không đổi trạng thái.
- Given trạng thái đã kết thúc, when nhân viên thao tác lại, then hệ thống từ chối chuyển trạng thái không hợp lệ.

AC mô tả hành vi mong muốn, không buộc frontend/backend dùng công nghệ cụ thể.

## 4. Thao tác trong Jira
1. Tạo project kiểu Scrum nếu đội sẽ lập kế hoạch theo sprint; chọn quyền truy cập và project key theo quy ước công ty.
2. Tạo Epic `Đặt bàn trực tuyến`, rồi tạo Story bên dưới theo bảng trên.
3. Trong Description, ghi user story, AC theo Given/When/Then, quy tắc liên quan, open questions và nguồn (FR/BR).
4. Dùng Labels như `reservation`, `mvp` để tìm kiếm; dùng Component cho `Customer web`, `Staff operations`, `Notification` nếu project có Components.
5. Đặt priority theo quy ước team; không dùng Priority để thay cho MoSCoW nếu nhóm chưa thống nhất ý nghĩa.
6. Dùng issue links “blocks/is blocked by” cho phụ thuộc; không mô tả phụ thuộc chỉ trong bình luận.
7. Đưa Story sang sprint chỉ sau Definition of Ready và khi team đã estimate; trạng thái Jira phải phản ánh workflow thật của nhóm.
8. Tạo filter cho Epic hoặc label, sau đó kiểm tra issue có liên kết và AC còn hiển thị rõ.

Jira connector đã kết nối tới site tổ chức, nhưng quyền tạo issue phụ thuộc project. Thực hành trên backlog trong repository cho tới khi có project học tập được cấp quyền; không đưa dữ liệu khách thật vào case study.

### Issue card mẫu để nhập vào project học tập được cấp quyền

Đây là nội dung chuẩn bị trong tài liệu, **không phải issue đã tạo trên Jira**. Field name có thể khác theo cấu hình project; giữ ý nghĩa và traceability khi map sang field tương ứng.

| Field | Giá trị mẫu |
|---|---|
| Issue type | Story |
| Epic / parent | EPIC-RES — Đặt bàn trực tuyến |
| Summary | Kiểm tra khả năng nhận trước khi chấp nhận booking request |
| Description | Là khách hàng, tôi muốn biết slot còn đủ chỗ trước khi gửi request để tránh gửi yêu cầu không thể phục vụ. Bối cảnh: case study giả lập. Nguồn: FR-03, US-01; business rule BRULE-02 còn Draft/TBD. |
| Acceptance criteria | (1) Slot mở và available capacity đủ theo policy đã duyệt: luồng có thể tiếp tục tới tạo request. (2) Slot đóng/không đủ: trả outcome slot-unavailable, không tạo reservation/initial history, occupancy không đổi. (3) Hai request đồng thời không làm tổng số được nhận vượt invariant capacity; cơ chế kỹ thuật cần thiết kế/verify cùng Engineering/QA. |
| Priority | Must — đề xuất, cần Product Owner xác nhận |
| Labels / component | `reservation`, `mvp`; component chỉ nếu project có taxonomy phù hợp |
| Depends on / blocked by | Quyết định capacity unit, giữ chỗ của `PENDING`, nguồn authoritative và API/error contract. Link issue dependency nếu đã có issue tương ứng; nếu chưa thì tạo decision/discovery item, không tạo key giả. |
| Status | Draft / Refinement; không đưa vào sprint cho đến khi các dependency ảnh hưởng acceptance/estimate có owner và cách giải quyết |
| Estimate | Chưa estimate; team delivery mới ước lượng sau refinement |

Trước khi lưu vào Jira, hãy sửa issue card theo policy thực được xác nhận; không copy một assumption vào ticket rồi coi đó là quyết định. Nếu blocker chưa ảnh hưởng lát cắt có thể bắt đầu, ghi rõ phần nào tiếp tục song song và tiêu chí dừng.

**Phân biệt ba loại liên kết:** `relates to` nêu ngữ cảnh; `blocks / is blocked by` thể hiện thứ tự hoặc điều kiện thực sự chặn; requirement/test links bảo toàn truy vết. Chỉ tạo dependency khi có lập luận rằng công việc kia không thể hoàn thành/được chấp nhận trước nó.

### Walkthrough AC-RES-02-02 — slot không đủ chỗ

**Given** khách gửi request với dữ liệu hợp lệ, slot đang mở, và capacity evaluation theo policy đã duyệt trả về số chỗ khả dụng nhỏ hơn party size, **when** khách gửi request, **then** hệ thống báo slot không khả dụng, không tạo reservation hay initial history event, và occupancy không đổi.

Đây là ví dụ hoàn chỉnh về **kết quả cần quan sát**, không phải cam kết HTTP status riêng. API `409 SLOT_UNAVAILABLE` là contract draft trong case. Trace đề xuất: `RES-02 → BRULE-02 (Draft/TBD) → AC-US01-04 → UAT-05`. Trước khi test tích hợp, chốt policy `PENDING` có giữ chỗ không và xác định nguồn capacity authoritative; nếu chưa, dùng capacity stub chỉ để kiểm tra nhánh response, đánh dấu test giới hạn/Blocked cho quy tắc capacity thật.

**Test design chưa chạy:** seed slot có available capacity = 2 theo fixture đã khai báo; gửi request party size = 3; kiểm tra outcome slot-unavailable, không có reservation/initial history mới và occupancy trước/sau bằng nhau. Lưu sanitized request/response, test-data ID, build/environment và truy vấn/ảnh kiểm tra. Không ghi Pass khi chưa thực thi.

## 5. Jira → Confluence → Postman: mạch truy vết
- Jira Story RES-02 liên kết BRULE-02 và mô hình To-Be.
- Confluence/Markdown ghi quy tắc sức chứa, quyết định stakeholder, glossary và câu hỏi mở.
- Postman kiểm tra API tương ứng bằng dữ liệu giả, rồi liên kết kết quả test tới AC/issue.
- UAT xác nhận luồng theo ngôn ngữ nghiệp vụ; defect cần chỉ ra AC nào chưa đạt.

## Bài tập
1. Chọn thứ tự hai Story bạn sẽ làm đầu tiên và giải thích theo mục tiêu, rủi ro, phụ thuộc.
2. Viết thêm một AC cho RES-01 khi khách nhập ngày ở quá khứ.
3. Xác định ai có quyền chốt: giờ hoạt động, sức chứa, lý do từ chối và retention dữ liệu.
4. Nếu một developer báo RES-02 phụ thuộc API sức chứa chưa có, hãy cập nhật dependency và đề xuất việc có thể làm song song.

### Đáp án tham khảo ngắn
- Có thể ưu tiên RES-01 và RES-02 trước vì form không có ý nghĩa nếu hệ thống nhận khung giờ quá khả năng; nhưng RES-03 cần theo ngay để khách biết yêu cầu đã được ghi nhận. Thứ tự cuối cùng tùy kiến trúc và team.
- AC ngày quá khứ: Given ngày đặt trước ngày hiện tại theo múi giờ nghiệp vụ, when khách gửi form, then hệ thống báo ngày không hợp lệ và không tạo yêu cầu.
- Người phê duyệt phải được xác định theo quyền quyết định thực tế, không suy ra từ chức danh.
- Tạo issue/API dependency hoặc spike; song song có thể làm form, validation phía giao diện, contract/schema draft và test cases, miễn là giả định được đánh dấu.

## Tự kiểm tra Definition of Ready
Mỗi Story có mục tiêu rõ, actor, AC, rule, ngoại lệ, phụ thuộc, dữ liệu mẫu, nguồn truy vết và câu hỏi mở. Nếu thiếu điều kiện ảnh hưởng estimate hoặc thiết kế, giữ ở backlog refinement thay vì kéo vào sprint.

