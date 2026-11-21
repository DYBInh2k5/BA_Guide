# 01 - Giới Thiệu Business Analysis

## Business Analysis là gì?

Theo IIBA, **Business Analysis là thực hành giúp tạo ra thay đổi bằng cách xác định nhu cầu và đề xuất giải pháp tạo giá trị cho stakeholder trong một bối cảnh**. BA không chỉ áp dụng cho dự án phần mềm: thay đổi có thể liên quan tới quy trình, con người, sản phẩm, công nghệ, mô hình kinh doanh hoặc năng lực tổ chức.

Một cách nhớ theo BACCM của IIBA là sáu khái niệm liên kết với nhau: **Change, Need, Solution, Stakeholder, Value, Context**. BA làm rõ điều gì cần thay đổi, nhu cầu nào đang tồn tại, ai liên quan, giá trị được hiểu ra sao và bối cảnh nào ảnh hưởng tới lựa chọn giải pháp. ([IIBA — Business Analysis Core Concept Model](https://www.iiba.org/knowledgehub/the-business-analysis-core-concept-model/), [IIBA — Business Analysis Standard](https://www.iiba.org/knowledgehub/the-business-analysis-standard/2-understanding-business-analysis/2-2-a-model-for-effective-analysis-baccm/))

Gọi BA là “cầu nối business–technology” có thể dễ hình dung trong dự án IT, nhưng đó chỉ là một phần công việc. BA còn giúp các stakeholder thống nhất vấn đề, so sánh phương án, quản lý thay đổi, xác nhận giải pháp và đánh giá giá trị sau triển khai.

---

## Business Analyst làm gì?

### Vai trò chính
- Lập kế hoạch phân tích phù hợp với bối cảnh và cách delivery
- Khám phá nhu cầu, quy trình hiện tại, vấn đề, cơ hội, ràng buộc và stakeholder
- Mô hình hóa lựa chọn; xác định yêu cầu, quy tắc, tiêu chí kiểm chứng và mối liên kết
- Làm rõ quyết định, thay đổi, ưu tiên và tác động với các stakeholder
- Phối hợp với đội delivery để xác minh giải pháp và hỗ trợ nghiệm thu
- Đánh giá hiệu quả, giá trị và giới hạn của giải pháp sau khi đưa vào sử dụng

BA có thể viết tài liệu, user story, use case, mô hình hoặc acceptance criteria khi chúng giúp người liên quan ra quyết định hoặc xây dựng/kiểm chứng giải pháp. Đầu ra cần thiết phụ thuộc dự án; viết nhiều tài liệu không tự chứng minh phân tích tốt.

### Trong dự án, BA thường làm việc với:
| Đối tượng | Mục đích |
|-----------|----------|
| **Product Owner / Product Manager** | Thống nhất mục tiêu sản phẩm, value và ưu tiên theo accountability của tổ chức |
| **Developers** | Giải thích yêu cầu, làm rõ logic nghiệp vụ |
| **Testers (QA)** | Cộng tác để làm yêu cầu có thể kiểm chứng và phân tích kết quả test |
| **End Users** | Thu thập nhu cầu thực tế |
| **Operations / Support / Compliance** | Làm rõ vận hành, rủi ro, quy định và readiness |
| **Stakeholders** | Xác nhận nhu cầu, tác động, quyết định và giá trị |

Tên vai trò và ranh giới trách nhiệm thay đổi theo tổ chức. BA có thể chia sẻ một số việc với PO/PM, QA, UX hoặc architect; không mặc định một chức danh luôn sở hữu mọi quyết định yêu cầu.

---

## Phân loại Business Analyst

| Loại BA | Mô tả |
|---------|-------|
| **IT BA** | Tập trung vào hệ thống và phần mềm |
| **Business Process BA** | Tối ưu hóa quy trình nghiệp vụ |
| **Data BA** | Phân tích dữ liệu để ra quyết định |
| **System BA** | Giao tiếp giữa hệ thống và người dùng |
| **BA trong team Agile/Product** | Làm rõ discovery, backlog, yêu cầu và phản hồi trong vòng lặp delivery; BA và Product Owner là các vai trò khác nhau dù có thể chồng lấn một phần trách nhiệm ở một số tổ chức |

Các nhãn này là những trọng tâm thường gặp, không phải taxonomy chuẩn duy nhất; một BA có thể cần nhiều trọng tâm cùng lúc.

---

## BA trong môi trường Waterfall vs Agile

### Waterfall
- Thường lập kế hoạch và baseline chi tiết sớm hơn, với các gate review/approval theo governance
- Phân tích có thể đi trước delivery nhiều hơn; yêu cầu vẫn có thể thay đổi qua change control
- Tài liệu và độ chi tiết phù hợp với rủi ro, hợp đồng, quy định và người dùng đầu ra

### Agile
- Discovery, refinement, delivery và phản hồi diễn ra lặp lại; mức chi tiết tăng khi gần quyết định/build/test
- BA có thể hỗ trợ hiểu nhu cầu, phân rã backlog, story/AC và trace; Product Owner vẫn giữ accountability theo Scrum Guide và cơ cấu tổ chức
- BA cộng tác với Product Owner, Developers, QA, UX, Operations và stakeholder khi cần
- Planning, ưu tiên, tài liệu và quản lý thay đổi vẫn tồn tại; cách thức và thời điểm thực hiện khác với bối cảnh predictive

### Hybrid
- Kết hợp baseline/gate ở một số phần với delivery lặp ở phần khác
- Cần nói rõ phần nào được cố định, phần nào còn discovery, cách quyết định thay đổi và tiêu chí chuyển gate

Không có phương pháp nào đảm bảo mọi yêu cầu phải “chốt hết” trước khi delivery. Chọn approach theo mức độ ổn định, rủi ro, phụ thuộc, quy định, năng lực team và tốc độ phản hồi cần thiết.

---

## BA tạo giá trị bằng cách nào?

- Làm rõ nhu cầu và bối cảnh để tránh giải quyết nhầm vấn đề
- So sánh nhiều giải pháp, gồm cả thay đổi quy trình hoặc không thay đổi ngay
- Làm yêu cầu đủ rõ để delivery và kiểm chứng, đồng thời để lộ assumption/risk còn mở
- Giúp stakeholder và team phát hiện sai lệch sớm, quản lý thay đổi có kiểm soát
- Đánh giá giá trị hữu hình/vô hình và những rủi ro hoặc tổn thất được giảm thiểu

Không nên hứa rằng BA luôn ngăn được thất bại hay mọi vấn đề có thể phát hiện sớm; kết quả phụ thuộc bằng chứng, quyền quyết định, cách delivery và bối cảnh.

---

## Kỹ năng cốt lõi cần có

- **Tư duy phân tích** — Phân biệt evidence, symptom, cause hypothesis và need
- **Tư duy hệ thống** — Nhìn stakeholder, process, data, technology và context liên quan
- **Giao tiếp** — Nói chuyện được với cả business lẫn technical
- **Lắng nghe chủ động** — Hiểu điều stakeholder thực sự muốn
- **Viết tài liệu** — Rõ ràng, súc tích, không mơ hồ
- **Quản lý xung đột** — Hòa giải khi stakeholders có ý kiến trái chiều

---

## Bài tập 5 phút

Stakeholder nói: “Cần làm app vì nhiều yêu cầu đặt bàn bị thất lạc.” Hãy phân loại trước khi đề xuất giải pháp:

| Câu nói | Phân loại ban đầu | Điều BA cần làm rõ |
|---|---|---|
| “Cần làm app” | Solution proposal | Vấn đề nào app cần giải quyết? Có phương án quy trình khác không? |
| “Nhiều yêu cầu bị thất lạc” | Claim/problem hypothesis; chưa phải metric | “Thất lạc” nghĩa là gì, trong kênh/thời gian nào, nguồn nào chứng minh? |
| Ai bị ảnh hưởng và giá trị cần đạt | Chưa rõ | Khách, nhân viên, quản lý hay nhiều nhóm? Stakeholder định nghĩa kết quả tốt là gì? |

Một câu hỏi elicitation mở có thể là: **“Anh/chị kể lại trường hợp gần nhất được xem là thất lạc, từ lúc khách gửi yêu cầu tới khi phát hiện, và mình có thể đối chiếu hồ sơ nào để xác nhận từng bước?”** Sau đó ghi nguồn và đánh dấu phần nào là `Reported`, `Observed`, `Measured`, `Inferred` hoặc `Open`.

> **Tóm lại:** BA giúp xác định need trong context, cộng tác với stakeholder để đề xuất solution có giá trị, rồi kiểm chứng giá trị đó. Viết code, quản lý dự án hay làm cầu nối giữa các nhóm có thể xuất hiện trong một vị trí BA cụ thể, nhưng không phải định nghĩa đầy đủ của nghề.
