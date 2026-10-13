# 14 - Chuẩn Bị Phỏng Vấn BA

## Cấu Trúc Buổi Phỏng Vấn BA Thường Gặp

```
Round 1: HR Screening (30 phút)
  → Kinh nghiệm tổng quan, motivation, mức lương kỳ vọng

Round 2: Technical Interview với BA Lead (60–90 phút)
  → Kiến thức BA, kỹ thuật, tình huống thực tế

Round 3: Case Study / Practical Test (60 phút hoặc take-home)
  → Phân tích tình huống thực tế, viết yêu cầu

Round 4: Panel Interview với Stakeholders (60 phút)
  → Cultural fit, communication skills, soft skills
```

---

## Câu Hỏi Thường Gặp — Và Cách Trả Lời

### Nhóm 1: Về Kiến Thức BA

**Q: BA là gì theo bạn? BA khác PM ở chỗ nào?**

Gợi ý trả lời:
> "BA tập trung vào **what** — xác định đúng vấn đề và yêu cầu. PM tập trung vào **how** — quản lý timeline, resource, delivery. Trong nhiều dự án BA và PM overlap, nhưng core của BA là đảm bảo team xây dựng đúng thứ, trong khi PM đảm bảo team xây dựng đúng cách."

---

**Q: Vòng đời yêu cầu (Requirements Life Cycle) là gì?**

Gợi ý trả lời:
> "Requirements đi qua các giai đoạn: Elicitation → Analysis → Specification → Validation → Management. Trong đó Elicitation là thu thập từ stakeholders, Specification là document hóa rõ ràng, Validation là confirm đúng nhu cầu, và Management là track + handle thay đổi suốt dự án."

---

**Q: Phân biệt Functional và Non-Functional Requirements?**

Gợi ý trả lời:
> "Functional là **hệ thống làm gì** — ví dụ 'user có thể đặt hàng online'. Non-Functional là **hệ thống hoạt động như thế nào** — ví dụ 'response time < 2 giây, uptime 99.9%'. Cả hai đều quan trọng như nhau — nhiều dự án thất bại vì bỏ qua NFR."

---

### Nhóm 2: Về Kỹ Thuật & Tình Huống

**Q: Bạn xử lý thế nào khi stakeholders có yêu cầu mâu thuẫn nhau?**

Gợi ý trả lời:
> "Đầu tiên, tôi sẽ lắng nghe cả hai phía để hiểu root cause của mâu thuẫn — đôi khi họ muốn cùng một điều nhưng diễn đạt khác nhau. Nếu thực sự mâu thuẫn, tôi tổ chức meeting chung, trình bày tradeoffs của từng phương án một cách trung lập, và để họ đồng thuận. Nếu không đồng thuận được ở cấp họ, tôi sẽ escalate lên người có thẩm quyền cao hơn. Quan trọng là mọi quyết định đều được document."

---

**Q: Mô tả quy trình thu thập yêu cầu của bạn?**

Gợi ý trả lời:
> "Tôi thường bắt đầu bằng stakeholder analysis để xác định ai cần phỏng vấn. Sau đó kết hợp nhiều kỹ thuật: phỏng vấn 1-1 với key stakeholders, workshop với nhóm để khám phá yêu cầu phức tạp, và review tài liệu hiện có. Tôi luôn paraphrase và confirm lại những gì nghe được, sau đó document thành User Stories hoặc BRD tùy context. Quan trọng nhất là luôn hỏi 'tại sao' để hiểu business need thực sự, không chỉ dừng lại ở feature request."

---

**Q: Bạn xử lý thế nào khi stakeholder yêu cầu thêm tính năng giữa dự án?**

Gợi ý trả lời:
> "Tôi không từ chối thẳng. Tôi sẽ ghi nhận yêu cầu, sau đó thực hiện impact analysis để đánh giá ảnh hưởng đến timeline, chi phí và các tính năng khác. Sau đó trình bày impact cho stakeholder và project manager. Để business owner quyết định: implement ngay (và adjust scope/timeline), defer vào backlog, hoặc trade-off bằng cách bỏ tính năng khác. Tôi document quyết định đó để có reference sau này."

---

**Q: Bạn làm gì khi requirement không rõ ràng?**

Gợi ý trả lời:
> "Tôi không assume hay tự điền vào chỗ trống. Tôi sẽ liệt kê các câu hỏi cụ thể, sắp xếp gặp stakeholder liên quan để làm rõ. Nếu cần ra quyết định nhanh mà stakeholder không available, tôi sẽ document assumption của mình, flag rõ là assumption, và confirm lại sớm nhất có thể. Leaving assumptions undocumented là một trong những nguyên nhân phổ biến nhất gây ra rework."

---

**Q: Waterfall và Agile khác nhau thế nào? Bạn thích làm môi trường nào?**

Gợi ý trả lời:
> "Waterfall phù hợp với dự án requirements ổn định, rõ ràng từ đầu, thường trong regulated industries. Agile phù hợp khi requirements có thể thay đổi, cần delivery nhanh và nhận feedback sớm. Tôi có kinh nghiệm cả hai — trong Agile tôi tập trung vào User Stories và backlog grooming; trong Waterfall tôi viết BRD/FRD đầy đủ hơn. Tôi thích Agile vì được validate assumptions sớm và điều chỉnh kịp thời."

---

### Nhóm 3: Câu Hỏi Tình Huống (STAR Method)

**Dùng STAR Method để trả lời:**
- **S**ituation — Bối cảnh là gì?
- **T**ask — Nhiệm vụ của bạn là gì?
- **A**ction — Bạn làm gì?
- **R**esult — Kết quả ra sao?

---

**Q: Kể về một lần bạn thuyết phục thành công stakeholder thay đổi ý kiến?**

Ví dụ STAR:
> "S: Trong dự án ERP, stakeholder muốn custom hoàn toàn module báo cáo, ước tính 3 tháng dev.
> T: Tôi cần tìm giải pháp tối ưu về thời gian và chi phí.
> A: Tôi phân tích 80% nhu cầu báo cáo đã được đáp ứng bởi module standard. Tôi demo cho stakeholder thấy điều này, và đề xuất dùng standard + configure thêm 20% custom. Tôi trình bày rõ tiết kiệm 2 tháng và $X chi phí.
> R: Stakeholder đồng ý. Dự án hoàn thành đúng hạn và stakeholder hài lòng với kết quả."

---

**Q: Kể về tình huống dự án bạn gặp khó khăn và cách bạn xử lý?**

Ví dụ STAR:
> "S: Halfway dự án, chúng tôi phát hiện 2 stakeholders chính có hiểu biết hoàn toàn khác nhau về cùng một tính năng, dẫn đến dev team bị blocken.
> T: Tôi cần resolve conflict nhanh để không trễ Sprint.
> A: Tôi tổ chức emergency meeting với cả hai, mang theo tài liệu gốc đã được ký duyệt. Tôi đặt câu hỏi để xác định đâu là assumption của mỗi người. Sau khi hiểu rõ, tôi vẽ 2 phương án lên bảng với pros/cons rõ ràng.
> R: Họ đồng thuận được phương án A trong 30 phút. Tôi cập nhật tài liệu ngay và dev team unblocked trong ngày."

---

## Case Study Thường Gặp Trong Phỏng Vấn

### Dạng 1: Phân tích vấn đề
> "Công ty bán lẻ phản ánh tỷ lệ abandon cart cao (70%). Là BA, bạn sẽ làm gì?"

**Cách tiếp cận tốt:**
1. Đặt câu hỏi làm rõ: Abandon ở bước nào? Trên device nào? Thời điểm nào?
2. Thu thập data: Analytics, user feedback, session recording
3. Phỏng vấn: Khách hàng, CS team, Sales team
4. Root cause: Shipping cost surprise? Complicated checkout? Trust issues?
5. Đề xuất giải pháp theo từng root cause + đo lường success metric

---

### Dạng 2: Viết User Story tại chỗ
> "Viết User Story cho tính năng đặt lại mật khẩu"

**Câu trả lời mẫu:**
```
Title: Đặt lại mật khẩu qua email

As a registered user who forgot my password,
I want to reset my password via email verification,
So that I can regain access to my account securely.

Acceptance Criteria:
- Given I click "Forgot Password", 
  When I enter my registered email,
  Then I receive a reset link within 2 minutes

- Given I click the reset link,
  When the link is less than 24 hours old,
  Then I can set a new password

- Given I click the reset link,
  When the link is more than 24 hours old,
  Then I see "Link expired" and option to request new link

- Given I set a new password,
  When I submit,
  Then my old password is invalidated immediately
  And I receive a confirmation email
```

---

### Dạng 3: Vẽ process flow
> "Vẽ quy trình xử lý đơn hàng hoàn trả"

**Cách tiếp cận:**
1. Hỏi làm rõ scope: hoàn trả với lý do gì? Ai approve?
2. Vẽ As-Is nếu đã có quy trình
3. Identify các actor: Customer, CS Agent, Warehouse, Finance
4. Vẽ từng bước theo BPMN/flowchart cơ bản
5. Note các edge cases, exception flows

---

## Câu Hỏi Bạn Nên Hỏi Nhà Tuyển Dụng

Cuối buổi phỏng vấn, **luôn có câu hỏi** — đây là dấu hiệu bạn quan tâm thực sự:

- "Team BA hiện tại có bao nhiêu người? BA report cho ai?"
- "Công ty dùng Agile hay Waterfall? Dùng tools gì chính?"
- "Một ngày làm việc điển hình của BA ở đây trông như thế nào?"
- "Những thách thức lớn nhất mà BA trong team đang gặp là gì?"
- "Cơ hội học hỏi và phát triển cho BA ở đây như thế nào?"
- "Success trong role này trong 6 tháng đầu trông như thế nào?"

---

## CV BA — Những Điều Cần Có

### Kỹ năng cần list:
```
Technical Skills:
- Requirements: BRD, FRD, User Stories, Use Cases
- Modeling: BPMN, UML (Use Case, Activity, Sequence)
- Tools: Jira, Confluence, draw.io, Figma (Wireframe)
- Data: SQL, Excel (Pivot, VLOOKUP), Power BI
- Methodology: Agile/Scrum, Waterfall

Domain Knowledge:
- [Lĩnh vực bạn đã làm: E-commerce, Banking, Healthcare...]
```

### Project descriptions hay:
```
❌ Tệ: "Worked on e-commerce project"

✅ Tốt: "Led requirements analysis for e-commerce platform 
       serving 50,000 users. Elicited 120+ user stories across 
       8 modules, facilitated weekly workshops with 5 stakeholders, 
       and reduced requirements rework by 30% through structured 
       acceptance criteria framework."
```

---

## Checklist Trước Ngày Phỏng Vấn

- [ ] Nghiên cứu kỹ về công ty, sản phẩm, domain của họ
- [ ] Chuẩn bị 3–5 câu chuyện STAR từ kinh nghiệm thực tế
- [ ] Ôn lại các định nghĩa BABOK core
- [ ] Chuẩn bị ví dụ User Story và Use Case để demo
- [ ] Biết mình muốn mức lương bao nhiêu và lý do
- [ ] Chuẩn bị 5 câu hỏi cho nhà tuyển dụng
- [ ] Mang portfolio nếu có (sample documents, diagrams)

---

> 💡 **Bí quyết**: Phỏng vấn BA không chỉ test kiến thức — người ta muốn thấy bạn **suy nghĩ** như thế nào. Khi gặp câu hỏi khó, hãy nói to cách bạn tiếp cận vấn đề thay vì im lặng tìm câu trả lời hoàn hảo.
