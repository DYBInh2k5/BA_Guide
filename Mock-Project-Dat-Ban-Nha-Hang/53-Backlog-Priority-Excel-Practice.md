# 53 — Thực hành ưu tiên backlog bằng Excel

## Mục tiêu

Tự phân tích một đề xuất backlog trong release cụ thể, ghi rõ lý do, dependency, evidence còn thiếu và người có thẩm quyền. Kết quả là bản nháp để review, không phải quyết định release.

## Bài tập

Mở workbook [Backlog Priority Practice](./outputs/priority-practice-20261123/Backlog-Priority-Practice.xlsx) bằng Excel và lưu một bản sao cá nhân trước khi điền. Case giả lập là MVP đặt bàn trực tuyến; mục `C-02` đề xuất hiển thị khung giờ có thể nhận yêu cầu. Quy tắc sức chứa, đơn vị capacity và việc `PENDING` có giữ chỗ hay không đang mở.

Điền các ô vàng. Chọn một nhãn MoSCoW cho release đang xét, nhưng nếu chưa thể kết luận thì ghi rõ điều kiện/thiếu quyết định trong phần lý do. Trả lời câu hỏi thay đổi tình huống nếu policy xác nhận `PENDING` giữ capacity. Ô tự kiểm chỉ xác nhận đã điền đủ trường; nó không chấm chất lượng BA.

## Cách lập luận

- MoSCoW mô tả phạm vi của một release. `Must` cần gắn với mục tiêu đã xác nhận hoặc một điều kiện bắt buộc; tiếng nói lớn hay chức danh cao không tự làm một yêu cầu thành Must.
- Tách dependency thật khỏi thứ tự quen làm. Nếu chưa rõ một quy tắc nghiệp vụ thì có thể cần discovery/decision trước khi story đủ sẵn sàng để build hoặc test.
- BA làm rõ evidence, trade-off và tác động. Product Owner hoặc decision authority được xác định trong governance mới chốt scope/priority.
- MoSCoW không tự ánh xạ thành trường Jira Priority. Chỉ nhập backlog vào workspace sau khi xác nhận đúng project, loại issue, field mapping và quyền.

## Evidence học tập

Giữ bản gốc nguyên trạng; lưu bản copy đã tự điền, kèm một đoạn giải thích ngắn về điều bạn chưa thể kết luận và evidence nào có thể làm đổi priority. Gửi bản copy hoặc dán câu trả lời vào hội thoại để được review. Workbook mẫu do trợ lý chuẩn bị không phải bằng chứng người học đã thực hành; tracker năng lực chỉ cập nhật sau khi xem bài làm cá nhân.

## Liên kết

- [Bài 50 — khung phân tích ưu tiên](./50-Backlog-Prioritization-Decision-Lab.md)
- [Bài 51 — chuẩn bị CSV cho Jira](./51-Jira-CSV-Backlog-Staging-Lab.md)
- [Bài 52 — Confluence và decision log](./52-Confluence-Decision-Log-and-Canonical-Page.md)
- [CSV backlog staging](./Jira-Backlog-Import-Staging.csv)
