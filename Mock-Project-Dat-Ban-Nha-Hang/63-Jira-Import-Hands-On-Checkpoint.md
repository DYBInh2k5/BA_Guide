# 63 — Jira CSV import: bài thực hành cá nhân

## Mục tiêu

Tự kiểm tra một work item trước và sau bước import, phân biệt hierarchy với dependency, và ghi lại bằng chứng do chính người học tạo. Đây là bài mô phỏng trên CSV; không cần tạo issue trong Jira của tổ chức.

## Chuẩn bị

- Đọc [lab CSV staging](./51-Jira-CSV-Backlog-Staging-Lab.md).
- Tạo bản sao của [CSV mẫu](./Jira-Backlog-Import-Staging.csv); giữ nguyên file gốc.
- Chọn dòng `Work item ID=3` — Story “Hệ thống đánh giá khung giờ và sức chứa”. Dùng dữ liệu giả lập.

## Phần A — Review trước import

Điền câu trả lời vào bản sao hoặc ghi trong tài liệu cá nhân:

| Câu hỏi review | Ghi chú của người học |
|---|---|
| Actor, mục tiêu và giá trị trong user story là gì? | |
| Có bao nhiêu AC? Mỗi AC có thể quan sát/kiểm tra được không? | |
| Nguồn requirement nào được nêu? | |
| Quyết định hoặc assumption nào đang mở? Ai cần xác nhận? | |
| `Parent=1` thể hiện điều gì? Nó có chứng minh dependency không? | |
| Trước import, cần xác nhận field/work type nào trong project đích? | |
| Nếu chưa có sandbox được cấp, trạng thái nào là trung thực để ghi? | |

## Phần B — Mapping và QA sau import (mô phỏng nếu không có sandbox)

Lập bảng mapping; tên field Jira có thể khác theo project:

| Cột CSV | Field đích dự kiến | Cách xác minh sau import |
|---|---|---|
| Work item ID |  |  |
| Work type |  |  |
| Summary |  |  |
| Description |  |  |
| Labels |  |  |
| Parent |  |  |

Sau đó ghi checklist kết quả:

- Story xuất hiện đúng một lần: `Chưa thử / Đạt / Không đạt`
- Work type và summary đúng: `Chưa thử / Đạt / Không đạt`
- AC, source, open decision không bị mất/cắt: `Chưa thử / Đạt / Không đạt`
- Parent trỏ đến đúng Epic: `Chưa thử / Đạt / Không đạt`
- Dependency chỉ được thêm riêng sau khi team xác nhận: `Chưa thử / Đạt / Không đạt`
- Nơi lưu bằng chứng, ngày, lỗi/mapping cần sửa: `Chưa có / ghi đường dẫn hoặc mô tả`

## Quy tắc kết luận

- Chỉ đánh dấu `Đạt` khi đã quan sát được item trong sandbox; CSV hợp lệ không chứng minh import thành công.
- Nếu không có sandbox, ghi `Chưa thử — sandbox/quyền chưa có`; hoàn thành phần review và mapping vẫn là tiến bộ, nhưng chưa tính là evidence thao tác Jira.
- Không bịa issue key, assignee, estimate, sprint, approval hoặc kết quả import.
- Story này phụ thuộc quyết định capacity đang mở. Không đổi Draft/TBD thành policy đã duyệt.

## Evidence và tự đánh giá

| Ngày | Artifact tự tạo | Phần đã tự làm | Blocker/feedback | Mức hiện tại |
|---|---|---|---|---|
|  |  |  |  | Chưa đánh giá |

Mức 1 cần bản review/mapping do bạn tự điền. Mức 2 cần batch khác do bạn tự chuẩn bị, kiểm tra trên sandbox được cấp và giải thích field mapping, hierarchy, dependency cùng giới hạn. File mẫu hoặc câu trả lời do trợ lý soạn không tính là evidence cá nhân.
