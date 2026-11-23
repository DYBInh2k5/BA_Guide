# 51 — Chuẩn bị backlog để nhập vào Jira

## Mục tiêu

Thực hành chuyển backlog đã refinement thành dữ liệu có thể nhập vào Jira hoặc công cụ tương đương, đồng thời giữ được nội dung BA quan trọng và tránh tạo issue giả trong workspace thật.

## Tệp thực hành

Mở [Jira-Backlog-Import-Staging.csv](./Jira-Backlog-Import-Staging.csv). Đây là dữ liệu giả lập có 1 Epic và 5 Story thuộc case đặt bàn. Tệp chưa được nhập vào Jira; chưa có project key, issue key, owner hay estimate thực.

## Cấu trúc CSV

| Cột | Cách xử lý khi nhập |
|---|---|
| Issue Type | Ánh xạ tới issue type tương ứng trong project; kiểm tra project có Epic/Story không |
| Summary | Ánh xạ tới Summary |
| Description | Ánh xạ tới Description; gồm user story, AC, priority đề xuất, source, dependency và open question |
| Labels | Ánh xạ tới Labels nếu project cho phép; labels chỉ để tìm kiếm, không thay thế decision log |
| Planned Parent (manual link) | Trường staging để người nhập biết story thuộc Epic nào; không ánh xạ vào field nếu importer không hỗ trợ đúng quan hệ parent |

Trước khi import, xác nhận quyền project, issue type, component/label convention và field bắt buộc. Nếu import tool không hỗ trợ tạo parent-child liên kết trong cùng đợt, tạo Epic trước, nhập Stories sau, rồi gắn đúng Epic bằng UI/API theo cấu hình project. Không đoán tên custom field hoặc issue key.

## Quy trình luyện tập

1. Mở CSV bằng Excel hoặc Sheets, kiểm tra delimiter, dấu tiếng Việt, dòng/column count và không có dữ liệu thật.
2. Đọc từng Description; xác nhận có actor/value, AC quan sát được, requirement source, assumption và dependency.
3. Tạo bản copy để sửa. Không ghi đè file mẫu; đặt tên có ngày và initials.
4. Khi Jira/Atlassian được kết nối và đã chọn project phù hợp, nhập bản copy vào project học tập. Nếu chưa kết nối, mô phỏng bằng bảng CSV và đánh dấu bước external import là chưa thực hiện.
5. Sau import, kiểm tra một Epic và một Story: issue type, Description, AC, labels, encoding và parent association. Sửa mapping nếu nội dung bị cắt hoặc field sai.
6. Link `blocks / is blocked by` chỉ sau khi xác nhận dependency thật. Trong tệp, dependency được ghi bằng requirement/decision ID, không phải issue key Jira đã tồn tại.
7. Lưu ảnh hoặc export sau nhập và ghi lại ngày, project học tập, số issue, mapping, lỗi import và cách xử lý. Không lưu token/API key hay PII vào portfolio.

## Ranh giới giữa dữ liệu mẫu và quyết định

- Các priority là **đề xuất mô phỏng** trong một release giả định; cần Product Owner/team xác nhận.
- MoSCoW trong Description không tự động ánh xạ sang Jira Priority. Team cần định nghĩa cách dùng trước.
- `PENDING` chưa đồng nghĩa với confirmed; giữ ngôn ngữ này nhất quán trong issue và prototype.
- `BRULE-02`, `FR-01`... là requirement/decision ID trong repo, không phải Jira issue key.
- Không tự gán story point, sprint, assignee hoặc due date. Team delivery ước lượng và chọn sprint; quyền project quyết định owner.

## Evidence để review mức thành thạo

Để đạt level 1, nhập theo hướng dẫn và lưu artifact/evidence. Để đạt level 2, tự tạo batch mới từ brief khác, giải thích mapping, chỉnh AC/dependency, kiểm tra kết quả sau import và ghi trade-off. File mẫu do trợ lý chuẩn bị không được tính là bằng chứng người học đã thực hành.
