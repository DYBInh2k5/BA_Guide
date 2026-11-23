# 54 — Hướng dẫn phân tích ưu tiên backlog bằng Excel

## Mục tiêu

Sau bài này, bạn có thể phân biệt mức ưu tiên trong phạm vi một release, nêu evidence còn thiếu, ghi điều kiện quyết định và cập nhật một bản sao workbook mà không biến giả định thành quyết định đã duyệt.

Đây là bài bổ trợ cho [Bài 53 — Thực hành ưu tiên backlog bằng Excel](./53-Backlog-Priority-Excel-Practice.md). Case đặt bàn là mô phỏng. Ví dụ dưới đây là cách lập luận để tham khảo, không phải đáp án duy nhất hay quyết định của Product Owner.

## Nhắc nhanh: MoSCoW

- **Must**: mục cần có để release đạt mục tiêu đã thống nhất hoặc đáp ứng điều kiện bắt buộc. Nếu thiếu, release không thể được xem là khả dụng theo mục tiêu đó.
- **Should**: có giá trị cao, nhưng có thể phát hành khi thiếu nếu có cách xử lý tạm thời chấp nhận được.
- **Could**: có ích nhưng mức độ cấp thiết thấp hơn trong release đang xét.
- **Won't this release**: không làm trong release này. Ghi rõ đây là hoãn có chủ đích, không phải bỏ vĩnh viễn.

MoSCoW áp dụng cho phạm vi release cụ thể. Nhãn này không tự động là Jira Priority và không thay thế quyết định của người chịu trách nhiệm về scope.

## Cách phân tích C-02

**Đề xuất:** hiển thị khung giờ có thể nhận yêu cầu đặt bàn.

Trước khi gán nhãn, làm rõ ba điều:

1. Mục tiêu MVP đã duyệt có yêu cầu khách tự chọn giờ trực tuyến hay chỉ gửi yêu cầu để nhân viên xác nhận?
2. Khung giờ hiển thị lấy từ nguồn nào, cập nhật lúc nào, và ai chịu trách nhiệm dữ liệu đó?
3. Khách có thể gửi yêu cầu khi hệ thống chưa chứng minh được chỗ còn trống không?

### Lập luận tham khảo

Nếu mục tiêu MVP là khách tự chọn khung giờ có thể nhận yêu cầu và luồng trực tuyến không có phương án thay thế, C-02 **có thể là Must**. Cần xác nhận mục tiêu này với Product Owner hoặc sponsor, đồng thời thống nhất nguồn dữ liệu và cách biểu thị trạng thái để khách không hiểu nhầm là đã được xác nhận.

Nếu release chỉ cần tiếp nhận yêu cầu để nhân viên xác nhận thủ công, C-02 **có thể là Should hoặc Could**. Khi đó, nhóm cần nêu phương án thay thế, ví dụ khách gửi yêu cầu không chọn giờ hoặc nhân viên liên hệ lại. Product Owner quyết định mức chấp nhận được của trải nghiệm tạm thời.

Trong cả hai trường hợp, BA ghi evidence, điều kiện, dependency và người ra quyết định. BA không tự phê duyệt scope thay cho người có thẩm quyền.

## Tác động nếu PENDING giữ chỗ

Nếu người có thẩm quyền xác nhận đơn `PENDING` giữ chỗ, các yêu cầu đang chờ sẽ làm giảm số chỗ có thể nhận. C-02 khi đó cần hiển thị thông tin dựa trên quy tắc sức chứa đã thống nhất, nếu không khách hoặc nhân viên có thể nhận thông tin lỗi thời.

Trước khi đổi priority hoặc tuyên bố hệ thống an toàn, hãy kiểm tra:

- Đơn vị sức chứa là ghế hay bàn; nguồn và thời điểm cập nhật.
- Thời hạn giữ chỗ, cách giải phóng chỗ khi hết hạn hoặc bị từ chối.
- Hành vi khi hai yêu cầu đến đồng thời.
- Người có thẩm quyền phê duyệt quy tắc và các trường hợp biên.

Việc xác nhận quy tắc có thể làm C-02 cấp thiết hơn, đồng thời tạo dependency với business rule, API, dữ liệu, acceptance criteria, UAT và kiểm thử đồng thời. Đây là tác động cần truy vết; không tự kết luận feature phải thành Must nếu release goal chưa được xác nhận.

## Bài thực hành trong Excel

1. Mở workbook [Backlog Priority Practice](./outputs/priority-practice-20261123/Backlog-Priority-Practice.xlsx) và lưu một bản sao cá nhân.
2. Điền các ô được đánh dấu cho C-02: nhãn MoSCoW, lý do, dependency, evidence còn thiếu và decision owner.
3. Ghi một câu điều kiện rõ ràng, ví dụ: “Nếu mục tiêu MVP là tự chọn giờ trực tuyến và PO xác nhận không có workaround, đề xuất Must; nếu nhân viên xác nhận thủ công là phương án được chấp nhận, xem xét Should.”
4. Trả lời kịch bản `PENDING` giữ chỗ bằng cách nêu tác động lên requirement/test, không tự gán quy tắc mới.
5. Lưu bản sao với tên có ngày và ghi 3–5 câu giải thích điều gì có thể khiến bạn đổi nhãn.

### Checklist tự review

| Tiêu chí | Câu hỏi kiểm tra |
|---|---|
| Phạm vi | Nhãn có gắn với một release cụ thể không? |
| Mục tiêu | Bạn có nối nhãn với mục tiêu hoặc điều kiện đã được xác nhận không? |
| Evidence | Bạn tách fact, assumption và câu hỏi mở chưa? |
| Quyền quyết định | Có owner phù hợp để xác nhận scope và business rule không? |
| Dependency | Bạn đã chỉ ra rule, nguồn dữ liệu, API, AC hoặc test bị ảnh hưởng chưa? |
| Trung thực | Bạn có ghi rõ đề xuất chưa được phê duyệt không? |

## Tiếp nối sang công cụ khác

- Sau khi lập luận xong, dùng [Bài 51 — chuẩn bị CSV cho Jira](./51-Jira-CSV-Backlog-Staging-Lab.md) để kiểm tra trường và dependency trước khi import.
- Ghi quyết định và owner trong [Bài 52 — Confluence và decision log](./52-Confluence-Decision-Log-and-Canonical-Page.md). Giữ trạng thái Draft cho tới khi người có thẩm quyền xác nhận.
- Không nhập dữ liệu vào workspace Jira thật cho tới khi project đích, field mapping và quyền đã được xác nhận.

## Evidence học tập

Workbook mẫu do trợ lý chuẩn bị chỉ là tài liệu tham khảo. Để ghi nhận kỹ năng của bạn, lưu bản copy tự làm, giải thích vì sao chọn nhãn, cho biết evidence nào còn thiếu và nêu điều gì có thể làm bạn đổi quyết định. Chưa có bản làm của bạn thì tracker năng lực vẫn ở trạng thái chưa đánh giá.
