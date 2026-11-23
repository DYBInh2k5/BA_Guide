# 52 — Confluence: trang chuẩn và decision log

## Mục tiêu

Tổ chức thông tin để stakeholder biết nội dung nào là quyết định hiện hành, ai đã phê duyệt, căn cứ nào được dùng, và backlog/test nào bị ảnh hưởng. Đây là kỹ năng knowledge management có thể áp dụng trong Confluence, SharePoint, Notion hoặc wiki khác.

## Nguyên tắc vận hành

- Mỗi loại thông tin có một nguồn chuẩn: yêu cầu/decision log không bị rải thành nhiều bản copy cùng chỉnh sửa.
- Trang phải có owner, trạng thái, ngày review và phạm vi; “draft” không được trình bày như policy đã chấp thuận.
- Capture workshop ở FigJam/Miro là đầu vào. BA tổng hợp, xác thực và ghi quyết định ở nơi được nhóm quy định là nguồn chuẩn.
- Jira quản lý work item và trạng thái thực thi; wiki lưu bối cảnh, rationale, policy/glossary và liên kết về issue. Không chép nguyên cả backlog sang wiki.
- Link requirement/decision đến issue/test bằng ID hoặc link thật. Không tạo key giả rồi coi là issue tồn tại.

## Bài tập case: sức chứa và trạng thái PENDING

Case đặt bàn hiện có các câu hỏi chưa được quyết định:

1. Một yêu cầu `PENDING` có giữ chỗ không?
2. Capacity đo theo số ghế, số bàn hay một đơn vị khác?
3. Nguồn nào là authoritative khi nhiều nhân viên nhận yêu cầu gần đồng thời?
4. Ai được xác nhận/từ chối và cần lưu audit event nào?

**Chưa có câu trả lời đã được stakeholder phê duyệt trong case study.** Các options bên dưới là câu hỏi discovery, không phải khuyến nghị chính sách.

## Mẫu trang Confluence để copy

```markdown
# [Tên chủ đề / business rule]

Status: Draft | In review | Approved | Superseded
Owner: [người chịu trách nhiệm duy trì nội dung]
Decision authority: [người/role có quyền phê duyệt]
Version: [số phiên bản hoặc page history]
Effective from: [ngày, nếu áp dụng]
Last reviewed: [ngày]
Scope: [sản phẩm/quy trình/release]
Sensitivity: [public/internal/confidential; theo policy công ty]

## Purpose and context
[Vấn đề hoặc outcome; liên kết nguồn evidence và stakeholder]

## Current approved rule
[Chỉ ghi khi đã có quyết định; nếu chưa, ghi “Chưa được phê duyệt”]

## Decision log
| ID | Question | Options considered | Decision/status | Rationale/evidence | Decision owner | Date | Impacted items |
|---|---|---|---|---|---|---|---|

## Open questions and actions
| ID | Question/action | Owner | Due/review date | Blocks | Status |
|---|---|---|---|---|---|

## Traceability
- Requirements: [ID/link]
- Jira issues: [real issue link or “chưa tạo”]
- Process/data/API models: [versioned links]
- Acceptance tests: [ID/link]

## Glossary
| Term | Meaning in this project | Source/owner | Status |
|---|---|---|---|

## Change history
| Version/date | Change | Author | Reviewer/approval |
|---|---|---|---|
```

## Bản nháp minh họa cho DEC-01

| Trường | Giá trị minh họa |
|---|---|
| ID | DEC-01 |
| Question | `PENDING` có giữ chỗ trong sức chứa không? |
| Options considered | A: không giữ chỗ; B: giữ tạm trong thời hạn; C: giữ tới khi nhân viên xử lý |
| Decision/status | Open — chưa có quyết định |
| Evidence needed | Quan sát quy trình vận hành, tỷ lệ hủy/không đến, khối lượng yêu cầu đồng thời, khả năng xử lý của nhân viên |
| Decision owner | Chủ nhà hàng/Product Owner — cần xác định người cụ thể |
| Impacted items | `BRULE-02`, `RES-02`, capacity API, occupancy metric, UAT concurrency scenarios |

Không chọn option chỉ vì dễ implement. Hãy ghi cost/risk của từng lựa chọn, ai chịu hậu quả và điều kiện review sau pilot. Nếu stakeholder chọn một option trong workshop, kiểm tra lại quyền quyết định và xác nhận bằng kênh/project record đã thống nhất trước khi đổi status sang Approved.

## Chuyển kết quả workshop thành nguồn chuẩn

1. Thu thập lời nói, ảnh board, số liệu và artifacts; đánh dấu fact, report, assumption, proposal.
2. Ghi lại câu hỏi, các options, trade-off và điểm bất đồng. Không xóa bất đồng chỉ để trang trông gọn.
3. Xác định decision owner và cách xác nhận; chờ họ chốt hoặc ghi rõ quyết định còn mở.
4. Cập nhật một bản chuẩn, tăng version/history, liên kết tới source và các work item bị ảnh hưởng.
5. Thông báo thay đổi theo quy trình nhóm; kiểm tra ticket và test dùng đúng policy/version hiện hành.

## Checklist chất lượng

- Người mới vào dự án hiểu ngay status và owner không?
- Có thể phân biệt report, evidence, assumption, proposal và approved decision không?
- Decision log có lý do, evidence, ngày, authority và impacted items không?
- Open question có owner và mốc review, hay chỉ là câu hỏi vô chủ?
- Page có links tới work/test hiện hữu, hay chứa ID chưa được xác minh?
- Có tránh copy backlog/AC vào wiki rồi để lệch khỏi Jira không?
- Thông tin nhạy cảm có đúng policy lưu trữ và quyền truy cập của tổ chức không?

## Bằng chứng portfolio

Để luyện, tạo bản copy của template, điền một business rule chưa rõ trong case, thêm 2 options, evidence còn thiếu, owner cần xác nhận và danh sách impacted requirement/test. Lưu page export hoặc screenshot sau khi nhập vào wiki. Ghi rõ đây là case study mô phỏng; không tự nhận phê duyệt thật hay kinh nghiệm triển khai khách hàng.
