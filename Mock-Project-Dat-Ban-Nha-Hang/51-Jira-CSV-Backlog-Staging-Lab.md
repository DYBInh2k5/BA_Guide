# 51 — Chuẩn bị backlog để nhập vào Jira

## Mục tiêu

Thực hành chuyển backlog đã refinement thành dữ liệu có thể nhập vào Jira hoặc công cụ tương đương, đồng thời giữ được nội dung BA quan trọng và tránh tạo issue giả trong workspace thật.

## Tệp thực hành

Mở [Jira-Backlog-Import-Staging.csv](./Jira-Backlog-Import-Staging.csv). Đây là dữ liệu giả lập có 1 Epic, 5 Story và 1 Task khám phá thuộc case đặt bàn. Tệp chưa được nhập vào Jira; chưa có project key, issue key, owner hay estimate thực.

## Cấu trúc CSV

| Cột | Cách xử lý khi nhập |
|---|---|
| Issue Type | Ánh xạ tới issue type tương ứng trong project; kiểm tra project có Epic/Story không |
| Summary | Ánh xạ tới Summary |
| Description | Ánh xạ tới Description; có thể gồm user story/AC hoặc mục đích/tiêu chí hoàn tất của discovery Task, source, dependency và open question |
| Labels | Ánh xạ tới Labels nếu project cho phép; labels chỉ để tìm kiếm, không thay thế decision log |
| Planned Parent (manual link) | Trường staging để người nhập biết story thuộc Epic nào; không ánh xạ vào field nếu importer không hỗ trợ đúng quan hệ parent |

Trước khi import, xác nhận quyền project, các issue type `Epic`, `Story`, `Task`, component/label convention và field bắt buộc. Nếu project không có `Task`, dừng để map sang loại work item được team cho phép; không âm thầm biến discovery item thành user story. Nếu importer không hỗ trợ parent-child trong cùng đợt, tạo Epic trước, nhập Stories/Task sau, rồi gắn đúng Epic bằng UI/API theo cấu hình project. Không đoán tên custom field hoặc issue key.

## Quy trình luyện tập

1. Mở CSV bằng Excel hoặc Sheets, kiểm tra delimiter, dấu tiếng Việt, dòng/column count và không có dữ liệu thật.
2. Đọc từng Description; xác nhận có actor/value, AC quan sát được, requirement source, assumption và dependency.
3. Tạo bản copy để sửa. Không ghi đè file mẫu; đặt tên có ngày và initials.
4. Khi Jira/Atlassian được kết nối và đã chọn project phù hợp, nhập bản copy vào project học tập. Nếu chưa kết nối, mô phỏng bằng bảng CSV và đánh dấu bước external import là chưa thực hiện.
5. Sau import, kiểm tra một Epic, một Story và discovery Task: issue type, Description, AC/tiêu chí hoàn tất, labels, encoding và parent association. Sửa mapping nếu nội dung bị cắt hoặc field sai.
6. Link `blocks / is blocked by` chỉ sau khi xác nhận dependency thật. Trong tệp, dependency được ghi bằng requirement/decision ID, không phải issue key Jira đã tồn tại.
7. Lưu ảnh hoặc export sau nhập và ghi lại ngày, project học tập, số issue, mapping, lỗi import và cách xử lý. Không lưu token/API key hay PII vào portfolio.

## Ranh giới giữa dữ liệu mẫu và quyết định

- Các priority là **đề xuất mô phỏng** trong một release giả định; cần Product Owner/team xác nhận.
- MoSCoW trong Description không tự động ánh xạ sang Jira Priority. Team cần định nghĩa cách dùng trước.
- `PENDING` chưa đồng nghĩa với confirmed; giữ ngôn ngữ này nhất quán trong issue và prototype.
- `BRULE-02`, `FR-01`... là requirement/decision ID trong repo, không phải Jira issue key.
- Không tự gán story point, sprint, assignee hoặc due date. Team delivery ước lượng và chọn sprint; quyền project quyết định owner.

## Worked example — discovery Task cho C-02

Dòng `Task — Xác nhận quy tắc sức chứa để refinement C-02` trong CSV theo dõi công việc cần làm rõ. Nó có tiêu chí hoàn tất riêng: quyết định `DEC-01` phải ghi rule, evidence, authority và phiên bản đã duyệt. Story C-02 vẫn là work item mô tả giá trị khách hàng; chưa thể chốt AC capacity khi rule còn mở.

`Planned Parent` chỉ giúp người học biết Epic dự kiến. Sau khi import, kiểm tra project hỗ trợ issue type `Task`, tạo quan hệ Epic đúng cấu hình, rồi link discovery Task `blocks` story C-02 nếu team xác nhận dependency. `BRULE-02`, `DEC-01` và `RES-02` là ID tài liệu cục bộ, không phải Jira key.

Nếu authority chưa đưa ra quyết định, Task vẫn Blocked với action owner và ngày review do team xác nhận. Không ghi một policy mới vào Description rồi gọi đó là decision; cập nhật nguồn chuẩn trước, sau đó refine requirement/test theo phiên bản đã duyệt.

## Evidence để review mức thành thạo

Để đạt level 1, nhập theo hướng dẫn và lưu artifact/evidence. Để đạt level 2, tự tạo batch mới từ brief khác, giải thích mapping, chỉnh AC/dependency, kiểm tra kết quả sau import và ghi trade-off. File mẫu do trợ lý chuẩn bị không được tính là bằng chứng người học đã thực hành.
