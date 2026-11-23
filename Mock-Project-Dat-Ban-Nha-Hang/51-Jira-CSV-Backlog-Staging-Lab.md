# 51 — Chuẩn bị backlog để nhập vào Jira

## Mục tiêu

Thực hành chuyển backlog đã refinement thành dữ liệu có thể nhập vào Jira hoặc công cụ tương đương, đồng thời giữ được nội dung BA quan trọng và tránh tạo issue giả trong workspace thật.

## Tệp thực hành

Mở [Jira-Backlog-Import-Staging.csv](./Jira-Backlog-Import-Staging.csv). Đây là dữ liệu giả lập có 1 Epic, 5 Story và 1 Task khám phá thuộc case đặt bàn. Tệp chưa được nhập vào Jira; chưa có Jira work item key, owner hay estimate thực. `Work item ID` chỉ là ID tạm trong file import.

## Cấu trúc CSV

| Cột | Cách xử lý khi nhập |
|---|---|
| Work item ID | ID duy nhất trong file để tạo hierarchy; không phải Jira work item key |
| Work type | Ánh xạ tới loại work item khả dụng trong destination; kiểm tra Epic/Story/Task |
| Summary | Ánh xạ tới Summary |
| Description | Ánh xạ tới Description; có thể gồm user story/AC hoặc mục đích/tiêu chí hoàn tất của discovery Task, source, dependency và open question |
| Labels | Ánh xạ tới Labels nếu project cho phép; labels chỉ để tìm kiếm, không thay thế decision log |
| Parent | ID `Work item ID` của parent trong cùng file; các Story/Task trong CSV trỏ tới Epic có ID `1` |

Trong Jira Cloud importer hỗ trợ hierarchy, map ba cột `Work item ID`, `Work type`, `Parent` vào các field tương ứng. Parent phải đứng trước child và mỗi ID phải duy nhất. Mapping loại work item phụ thuộc destination. Atlassian phân biệt CSV External System Import với bulk “Create work items using CSV”: flow bulk không map quan hệ parent-child. Nếu chọn flow không hỗ trợ hierarchy, dùng importer hỗ trợ hierarchy hoặc nhập parent trước rồi gắn child theo cấu hình Jira. Không dùng `Parent` để thể hiện dependency.

## Quy trình luyện tập

1. Mở CSV bằng Excel hoặc Sheets, kiểm tra delimiter, dấu tiếng Việt, dòng/column count và không có dữ liệu thật.
2. Đọc từng Description; xác nhận có actor/value, AC quan sát được, requirement source, assumption và dependency.
3. Tạo bản copy để sửa. Không ghi đè file mẫu; đặt tên có ngày và initials.
4. Khi Jira được kết nối và đã chọn destination phù hợp, xác nhận quyền, importer và work type khả dụng; nhập bản copy vào project/space học tập. Nếu chưa kết nối, mô phỏng bằng bảng CSV và đánh dấu bước import là chưa thực hiện.
5. Sau import, kiểm tra một Epic, một Story và discovery Task: issue type, Description, AC/tiêu chí hoàn tất, labels, encoding và parent association. Sửa mapping nếu nội dung bị cắt hoặc field sai.
6. `Parent` biểu diễn hierarchy (Epic chứa Story/Task). `blocks / is blocked by` biểu diễn dependency/sequence giữa hai work item; tạo link đó sau import khi có key thật và team xác nhận dependency.
7. Lưu ảnh hoặc export sau nhập và ghi lại ngày, project học tập, số issue, mapping, lỗi import và cách xử lý. Không lưu token/API key hay PII vào portfolio.

### Checklist QA sau import

Import hoàn tất chỉ xác nhận bước tạo dữ liệu; hãy kiểm tra cấu trúc và nội dung trước khi gọi backlog usable.

| Kiểm tra | Kỳ vọng với CSV mẫu | Nếu không khớp |
|---|---|---|
| Số work item | 7 dòng: 1 Epic, 5 Story, 1 Task | Đối chiếu import log và các item thực tế; không import lại mù quáng vì có thể tạo bản trùng |
| Work type | Epic/Story/Task được map đúng theo destination | Xem lại mapping type; nhất là discovery Task không được âm thầm biến thành Story hoặc loại khác |
| Parent hierarchy | 6 item con nằm dưới Epic được tạo từ Work item ID `1` | Kiểm tra đã map `Work item ID` / `Parent`, đúng thứ tự parent trước child và đúng field hierarchy |
| Nội dung C-02/Task | `BRULE-02`, `DEC-01`, open question và Draft/TBD còn nguyên; không có Jira key giả | Sửa file copy/mapping rồi lập kế hoạch sửa dữ liệu import hiện hữu trước lần import khác |
| Dependency | Quan hệ `blocks` chỉ xuất hiện khi team xác nhận; không suy ra từ `Parent=1` | Tạo link riêng bằng work item key thật sau khi import; rà lại dependency với owner |

Jira cung cấp import log chi tiết để tìm mapping/lỗi. Lưu log đã khử thông tin nhạy cảm cùng checklist; không coi import log thay cho việc mở work item để xác nhận hierarchy và description.

## Ranh giới giữa dữ liệu mẫu và quyết định

- Các priority là **đề xuất mô phỏng** trong một release giả định; cần Product Owner/team xác nhận.
- MoSCoW trong Description không tự động ánh xạ sang Jira Priority. Team cần định nghĩa cách dùng trước.
- `PENDING` chưa đồng nghĩa với confirmed; giữ ngôn ngữ này nhất quán trong issue và prototype.
- `BRULE-02`, `FR-01`... là requirement/decision ID trong repo, không phải Jira issue key.
- Không tự gán story point, sprint, assignee hoặc due date. Team delivery ước lượng và chọn sprint; quyền project quyết định owner.

## Worked example — discovery Task cho C-02

Dòng `Task — Xác nhận quy tắc sức chứa để refinement C-02` trong CSV theo dõi công việc cần làm rõ. Nó có tiêu chí hoàn tất riêng: quyết định `DEC-01` phải ghi rule, evidence, authority và phiên bản đã duyệt. Story C-02 vẫn là work item mô tả giá trị khách hàng; chưa thể chốt AC capacity khi rule còn mở.

`Parent=1` đặt Task dưới Epic trong hierarchy của file import. Sau khi import, kiểm tra destination hỗ trợ work type `Task` và quan hệ parent được tạo đúng; rồi link discovery Task `blocks` story C-02 nếu team xác nhận dependency. `BRULE-02`, `DEC-01`, `RES-02` và số trong `Work item ID` là ID tài liệu/file cục bộ, không phải Jira key.

Nếu authority chưa đưa ra quyết định, Task vẫn Blocked với action owner và ngày review do team xác nhận. Không ghi một policy mới vào Description rồi gọi đó là decision; cập nhật nguồn chuẩn trước, sau đó refine requirement/test theo phiên bản đã duyệt.

## Tài liệu Atlassian

- [Import data from a CSV file](https://support.atlassian.com/jira-cloud-administration/docs/import-data-from-a-csv-file/) — `Work item ID` / `Work type` / `Parent` và parent đứng trước child.
- [Map column data to work types](https://support.atlassian.com/jira-software-cloud/docs/map-column-data-to-issue-types/) — map loại work item và hierarchy trong trải nghiệm import mới.
- [Create work items using the CSV importer](https://support.atlassian.com/jira-software-cloud/docs/create-issues-using-the-csv-importer/) — bulk importer không tạo hierarchy parent-child.

## Evidence để review mức thành thạo

Để đạt level 1, nhập theo hướng dẫn và lưu artifact/evidence. Để đạt level 2, tự tạo batch mới từ brief khác, giải thích mapping, chỉnh AC/dependency, kiểm tra kết quả sau import và ghi trade-off. File mẫu do trợ lý chuẩn bị không được tính là bằng chứng người học đã thực hành.
