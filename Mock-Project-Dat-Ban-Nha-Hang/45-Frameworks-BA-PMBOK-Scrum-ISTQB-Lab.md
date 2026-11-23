# 45 — Lab áp dụng BABOK, PMBOK, Scrum và ISTQB vào một thay đổi

## Mục tiêu

Dùng các framework như những lăng kính bổ trợ để phân tích một thay đổi xuyên suốt case đặt bàn. Bài này không thay bản gốc, syllabus, chứng chỉ hay quy trình riêng của tổ chức. Không cần thuộc thuật ngữ; cần giải thích bạn dùng lăng kính nào để trả lời câu hỏi nào.

## Tình huống thống nhất

Sau khi MVP đã có baseline giả lập, sponsor đề xuất gửi SMS mỗi khi yêu cầu đặt bàn đổi trạng thái. Chưa có quyết định về ngân sách, nhà cung cấp, consent/opt-out, retry, delivery status, retention hay hỗ trợ khi gửi lỗi. Product muốn đánh giá value trước khi mở rộng scope. Kỹ thuật cần contract và dependencies để ước tính. Lễ tân cần biết ai xử lý số điện thoại sai.

Đây là yêu cầu thay đổi chưa được phê duyệt. Không viết nó thành requirement đã duyệt, không giả định policy pháp lý cụ thể, và không kết luận ROI nếu thiếu dữ liệu.

## Lab A — Bản đồ BABOK: câu hỏi BA nào cần trả lời?

Dùng sáu knowledge areas của BABOK làm coverage map. Điền owner/source/next action cho từng dòng; không cần tạo một tài liệu riêng cho mỗi khu vực.

| Knowledge area | Câu hỏi trên tình huống SMS | Artifact/evidence liên quan | Việc tiếp theo / owner |
|---|---|---|---|
| Business Analysis Planning and Monitoring | Phạm vi phân tích, stakeholder, cách phê duyệt và quản lý thay đổi là gì? | BA plan, RACI, change log |  |
| Elicitation and Collaboration | Cần hỏi sponsor, lễ tân, Product, kỹ thuật, privacy/operations điều gì? | Interview/workshop notes, source labels |  |
| Requirements Life Cycle Management | CR liên kết với requirement hiện tại, traceability, version và approval thế nào? | Change record, RTM, decision log |  |
| Strategy Analysis | Need/business objective nào cần xác minh; options và outcome measure nào phù hợp? | Problem statement, options, business case |  |
| Requirements Analysis and Design Definition | Consent, delivery state, failure/retry, data, API, UI và NFR nào cần đặc tả? | Story/AC, process, sequence, data/API, NFR |  |
| Solution Evaluation | Sau pilot sẽ đo adoption, delivery/failure, repeat contact, cost và outcome ra sao? | Baseline, metric definition, evaluation plan |  |

**Review:** đủ sáu khu vực không có nghĩa phải làm sáu gói tài liệu. Chọn artifact gọn nhất đủ giúp quyết định và phối hợp.

## Lab B — Bản đồ PMBOK: phối hợp với quản trị dự án

Không dùng PMBOK thay quy trình quản trị thực tế. Ghi những tác động cần PM/project sponsor/team đánh giá cùng BA:

| Chủ đề dự án | Tác động cần làm rõ | Ai sở hữu quyết định/ước tính? | Evidence còn thiếu |
|---|---|---|---|
| Governance / approval | Ai duyệt scope, privacy, spend, release gate? |  |  |
| Scope / dependencies | Provider, consent, callback, support, data changes có nằm trong scope không? |  |  |
| Schedule / resources | Ước tính phụ thuộc kỹ thuật, procurement và review nào? |  |  |
| Risk / uncertainty | Sai số điện thoại, timeout, duplicate, opt-out, provider downtime |  |  |
| Value / benefits | Outcome nào được đo; chi phí mỗi tin và baseline nào cần có? |  |  |

BA cung cấp analysis, traceability, options và impact. Người có thẩm quyền về schedule/budget/scope đưa quyết định theo governance dự án; BA không tự phê duyệt thay họ.

## Lab C — Bản đồ Scrum: quản lý công việc trong team

Nếu team dùng Scrum, mô tả cách đưa discovery/change vào trao đổi của team mà không tự thêm vai trò Scrum mới:

- Ai có thể làm rõ Product Goal/ưu tiên và value?
- Những câu hỏi nào cần được xử lý trước khi Developers forecast một Product Backlog Item?
- Cách làm nào giúp acceptance criteria/testability được hiểu chung?
- Khi nào nên tạo spike/discovery item thay vì giả vờ rằng integration đã sẵn sàng?
- Definition of Done/quality bar nào áp dụng; ai chịu trách nhiệm chất lượng increment?

Phân biệt rõ accountabilities được Scrum Guide định nghĩa với công việc BA mà cá nhân đang hỗ trợ trong team. Không mặc định BA luôn là Product Owner, Scrum Master hay người phê duyệt.

## Lab D — Bản đồ ISTQB: biến requirement thành test basis

Chọn một requirement draft về thông báo trạng thái. Trước khi viết test, điền:

```text
Requirement ID + version/status:
Nguồn/decision cần có:
Test basis (AC, rule, interface, NFR):
Test conditions cần kiểm tra:
Equivalence classes / boundary values (nếu phù hợp):
Positive, negative, error/recovery scenarios:
Expected result có authority/source không?
Test data/environment:
Coverage link / test ID:
Defect evidence cần ghi nếu actual khác expected:
```

Tạo tối thiểu các condition sau ở mức khái niệm: opt-in/opt-out, trạng thái không cần gửi, provider success/failure, timeout rồi retry, callback trễ hoặc lặp, số điện thoại sai. Không chốt hành vi expected nếu business/security/privacy decision còn mở: ghi `Blocked/Open` và nêu owner.

**Ranh giới vai trò:** BA có thể tăng testability, phân tích acceptance và phối hợp test basis. Test design, test management và quality ownership theo cấu trúc đội; việc đọc lab không tạo chứng chỉ ISTQB Advanced.

## Tổng hợp một trang

Luyện trực tiếp trên [workbook CR-SMS Options, Impact and Traceability](./outputs/cr-sms-framework-practice-20261123/CR-SMS-Options-Impact-Traceability.xlsx). Workbook để trống trọng số và điểm để bạn tự phân tích; ví dụ trace duy nhất được gắn nhãn giả lập, `Draft/Not run`.

Nộp một trang `CR-SMS Framework Map` gồm:

1. một câu mô tả need chưa kiểm chứng;
2. options/no-change cùng decision maker;
3. 3 decision/open question có owner;
4. BABOK coverage gọn;
5. PM/project dependency và risk;
6. Scrum backlog/discovery approach nếu team dùng Scrum;
7. test basis/conditions và phần bị block;
8. trace `Need → CR → requirement/AC → test condition → evidence/status`;
9. điều gì cần xác minh trước khi đưa vào portfolio.

## Tự review

- [ ] Framework dùng để đặt câu hỏi/kiểm tra coverage, không làm checklist tài liệu máy móc.
- [ ] Draft, assumption, change proposal và approved baseline được tách riêng.
- [ ] Có owner/authority cho các quyết định policy, privacy, budget, scope và test.
- [ ] Expected result có nguồn; thiếu oracle thì chưa kết luận Pass/Fail.
- [ ] Không tuyên bố BA thay PM, Product Owner, Scrum Master, QA/Test Manager hay privacy/security specialist.
- [ ] Evidence mô phỏng được gắn nhãn; CV/portfolio không ngụ ý dự án production hoặc chứng chỉ.

Gửi trang tổng hợp và một hàng trace cho review. Reviewer có thể kiểm tra cách bạn áp dụng framework; scorecard không tự tăng chỉ vì đã đọc hoặc hoàn tất worksheet.
