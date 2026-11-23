# 33 — Storyboard portfolio BA trong 5 phút

## Mục đích và giới hạn

Tài liệu này là **storyboard** để luyện trình bày case study khi phỏng vấn. Đã có [deck Figma Slides bản nháp](https://www.figma.com/slides/krV104F5r4J0nAtzKvZ), do trợ lý tạo. Viewer được kiểm tra trực quan ngày 23-11-2026: có 9 slide, slide 9 đang trắng; một số chữ phụ ở slide 2, 3 và 7 có tương phản thấp ở mức zoom 35%. Cần xóa slide trắng và tăng độ tương phản/cỡ chữ trước khi dùng deck; chưa thể sửa trực tiếp khi Figma edit connection chưa được xác nhận. Mọi stakeholder, vấn đề, dữ liệu và quyết định trong dự án đặt bàn đều là giả lập; deck do trợ lý chuẩn bị không chứng minh người học tự thực hiện. Trước khi dùng khi ứng tuyển, thay ví dụ bằng artifact bạn đã tự sửa, tự chạy và có thể giải thích.

**Đối tượng:** người phỏng vấn BA/BA Lead. **Thời lượng:** 5 phút trình bày + phần hỏi đáp. **Mục tiêu:** thể hiện cách tư duy, truy vết và nhận diện giới hạn, không tuyên bố kết quả kinh doanh.


## B?i th?c h?nh Figma: s?a deck v? t? QA

D?ng deck Figma Slides ? tr?n l?m **b?n tham kh?o do tr? l? t?o**. T?o m?t b?n sao trong workspace c?a b?n ?? th?c h?nh; kh?ng ghi nh?n b?n g?c l? s?n ph?m c? nh?n.

1. X?a slide 9 ?ang ?? tr?ng; gi? l?i 8 slide c? n?i dung.
2. S?a ch? ph? tr?n slide 2, 3 v? 7: t?ng c? ch? v? ?? t??ng ph?n ?? ??c ???c khi tr?nh chi?u. Gi? n?i dung trung th?c, kh?ng bi?n gi? thuy?t th?nh d? ki?n.
3. C? nh?n h?a ?t nh?t m?t slide b?ng artifact ho?c ph?n t?ch do ch?nh b?n l?m. G?n nh?n d? li?u gi? l?p v? ghi r? quy?t ??nh n?o c?n m?.
4. Tr?nh chi?u l?i to?n deck v? ki?m tra: ?? 8 slide, kh?ng c?n trang tr?ng, kh?ng tr?n/c?t ch?, th? b?c ti?u ?? nh?t qu?n, ch? ph? ??c ???c ? ch? ?? tr?nh chi?u ho?c m?c zoom 35%.
5. L?u li?n k?t b?n sao ho?c file export, ?nh ch?p tr??c/sau, v? ghi 3?5 d?ng v? thay ??i c?ng l? do thi?t k?.

**Ti?u ch? ho?n t?t:** ng??i kh?c m? ???c b?n c?a b?n, ??c ???c n?i dung, th?y r? ??u l? gi? l?p, v? b?n c? th? gi?i th?ch ?t nh?t m?t trade-off. Ch? t? ch?m k? n?ng sau khi artifact c? nh?n ?? ???c t?o; khi g?i l?i, m?nh s? review theo checklist n?y.

## Slide 1 — Case study đặt bàn nhà hàng

**Thời lượng:** 20 giây

**Trên slide:**

- BA practice case study — Restaurant Reservation
- Mô phỏng cá nhân · không phải dự án khách hàng thật
- Trọng tâm: từ vấn đề giả định đến yêu cầu có thể kiểm chứng

**Gợi ý hình:** ảnh chụp/crop từ BPMN hoặc story map, chỉ dùng sau khi tự mở file và xác minh dễ đọc.

**Lời nói:** “Tôi xin trình bày case study cá nhân để luyện BA end-to-end. Bối cảnh và stakeholder đều giả lập; tôi tập trung trình bày phương pháp phân tích và những gì cần kiểm chứng trước triển khai.”

## Slide 2 — Vấn đề cần kiểm chứng

**Thời lượng:** 40 giây

**Trên slide:**

- Giả thuyết: yêu cầu qua nhiều kênh có thể khó theo dõi trạng thái/bàn giao.
- Rủi ro nghiệp vụ: xử lý chậm, khách hiểu nhầm `PENDING`, sai capacity.
- Bằng chứng thật hiện có: chưa có; cần interview, quan sát, mẫu records và baseline.
- Quyết định chưa đưa ra: có cần sản phẩm số không và phạm vi nào tạo giá trị.

**Lời nói:** “Tôi không coi các pain point trong brief là dữ kiện. Bước đầu là xác minh trường hợp gần nhất, tần suất, tác động, nguồn dữ liệu và quy trình hiện tại.”

## Slide 3 — Cách tôi cấu trúc discovery và giải pháp

**Thời lượng:** 45 giây

**Trên slide:**

```text
Elicitation → As-Is → root cause/evidence → options → To-Be/MVP
```

- Stakeholder map, interview questions, evidence plan.
- BPMN As-Is/To-Be và decision/rule gaps.
- Giải pháp MVP chỉ là option để đánh giá sau khi xác nhận need.

**Lời nói:** “Tôi phân tách vấn đề, nhu cầu và option giải pháp. Tôi sẽ dùng BPMN để thảo luận handoff/exception, rồi so sánh phương án theo giá trị, rủi ro, feasibility và chi phí.”

## Slide 4 — Một lát cắt requirement có traceability

**Thời lượng:** 55 giây

**Trên slide:**

```text
Need (draft): nhân viên nhận biết request cần follow-up
  → FR / Story + BRULE-02 (capacity còn TBD)
  → AC-US01-04: slot unavailable
  → API 409 (contract draft)
  → UAT-05 (assistant-run CLI: 409 / 4 seats; follow-up total 0)
  → mock branch matched; policy UAT Blocked (DEC-01 Open)
```

- Nêu một requirement thực sự đã tự review/thay đổi, nếu có; file do trợ lý chuẩn bị không tính là evidence tự làm.
- Hiển thị một câu hỏi còn mở (ví dụ: `PENDING` có chiếm capacity?).
- Execution UAT-05 ở đây do trợ lý chạy trên mock local; chưa có execution evidence cá nhân của người học.
- Không dùng requirement draft như policy đã được sponsor duyệt.

**Lời nói:** “Tôi giữ trace từ need tới test để change impact có thể truy ra. Với capacity, unit và cách tính `PENDING` vẫn là quyết định cần Product/Operations chốt; mock API chỉ phản ánh một giả định học tập.”

## Slide 5 — Prototype, API, data và UAT

**Thời lượng:** 55 giây

**Trên slide:**

- Prototype: form khách → trạng thái chờ → queue nhân viên; thêm unavailable/error state.
- Postman CLI/mock API: assistant-run health `200` (2 assertions) và UAT-05 `409`, `availableSeats: 4`; follow-up trả `total: 0`. Chỉ xác nhận nhánh mock/no-insert, không xác nhận policy hay UI.
- SQL/Excel: dataset giả lập để luyện quy tắc và phân tích, không phải operating data.
- UAT-08: booking decision và email failure là hai trạng thái riêng; actual result chưa có.
- UAT-08 booking decision/email failure chưa chạy; learner chưa tự thực hành Postman. Giữ actual, expected, issue và sign-off owner tách riêng.

**Lời nói:** “Prototype dùng để lấy phản hồi và làm rõ trạng thái, chưa kết nối backend thật. API mock giúp luyện contract; dữ liệu SQL/Excel đều tổng hợp. Tôi phân biệt UAT business acceptance với performance/security test do QA hoặc chuyên gia phụ trách.”

## Slide 6 — Trade-off, risk và quyết định

**Thời lượng:** 45 giây

**Trên slide:**

- Tranh chỗ đồng thời: UAT request đơn không chứng minh không overbook.
- Retry sau timeout: cần phân tích duplicate/idempotency.
- CR thêm SMS: đánh giá value, cost, privacy, operations, dependencies.
- Decision brief: options, evidence gap, owner, ngày review, điều kiện dừng.

**Lời nói:** “Tôi dùng acceptance criteria để mô tả outcome; Engineering/QA chọn cơ chế và thiết kế concurrency test. Tôi ghi trade-off và người có quyền quyết định thay vì tự chốt policy hoặc ngưỡng NFR.”

## Slide 7 — Kết luận trung thực và bài học

**Thời lượng:** 40 giây

**Trên slide:**

- Đã chuẩn bị: bộ artifact học tập/nháp do trợ lý hỗ trợ, trong đó có system context, BPMN, backlog, API mock, SQL/Excel và UAT walkthrough.
- Chưa có: stakeholder thật, triển khai production, outcome/KPI đã xác nhận.
- Bằng chứng năng lực cá nhân: chưa đánh giá cho tới khi người học tự chỉnh artifact, chạy lab và lưu evidence/review.
- Một điểm tôi học được: requirement tốt phải truy về need, owner, rule và evidence.

**Lời nói:** “Kết quả của tôi ở đây là bộ hồ sơ học tập, không phải tác động kinh doanh. Tôi có thể chỉ ra điều đã tự làm, điều được dựng sẵn, các câu hỏi chưa được giải quyết và cách tôi sẽ kiểm chứng chúng.”

## Chuẩn bị trước khi trình bày

1. Chọn tối đa 3 artifact bạn **đã tự mở, chỉnh và có thể chứng minh**; thêm ảnh chụp/version/link có thể truy cập.
2. Xác minh mọi link, quyền xem, nhãn dữ liệu giả lập và không có PII/secret.
3. Dùng một ví dụ xuyên suốt; không đọc danh sách tool như thể tên tool tự chứng minh năng lực.
4. Tập 5 phút có bấm giờ; bỏ chi tiết nếu quá giờ thay vì thu nhỏ chữ.
5. Chuẩn bị trả lời: “Bạn đã tự làm phần nào?”, “Bạn sẽ xác minh giả định nào đầu tiên?”, “Vì sao chưa thể kết luận solution/KPI?”, “Nếu capacity policy thay đổi thì artifact nào bị ảnh hưởng?”

## Checklist reviewer

| Tiêu chí | Đạt khi |
|---|---|
| Tính trung thực | Nhãn case study giả lập được thấy ngay; không nhận KPI mô phỏng là kết quả thật |
| Tư duy BA | Problem/need/solution tách rõ; có stakeholder/evidence/open question |
| Requirement quality | Có source/ID/owner/status và AC kiểm thử được |
| Traceability | Một luồng cụ thể nối tới UAT/evidence, không chỉ liệt kê tài liệu |
| Giao tiếp delivery | Phân biệt trách nhiệm BA, Product, Engineering, QA/Operations |
| Trình bày | 5 phút, một câu chuyện, artifact đọc được và link mở được |

## Nối với dự án

Tham khảo [Portfolio Case Study](./18-Portfolio-Case-Study.md), [BA Tool Mastery Tracker](./24-BA-Tool-Mastery-Tracker.md), [UAT API](./05-API-and-UAT.md), [lab Context → BPMN](./37-Context-to-BPMN-Bridge-Lab.md), [Gap Analysis worksheet](./38-Gap-Analysis-Practice-Worksheet.md) và [Concurrency/Retry](./31-Concurrency-Idempotency-va-Test-Design.md). Bản trình bày cá nhân cuối cùng chỉ nên đưa claim “tôi đã làm” khi người học có thể mở artifact/version và giải thích evidence.

## Hỏi đáp phỏng vấn sau presentation

Trả lời theo cấu trúc **claim → evidence → limit → next step**. Chỉ điền phần trong ngoặc sau khi có việc tự làm thật.

### “Phần nào bạn trực tiếp làm?”

> “Đây là case study cá nhân giả lập, có AI hỗ trợ tạo bản nháp. Tôi trực tiếp làm [artifact/task cụ thể], sửa [thay đổi cụ thể] vì [lý do], và có thể mở [file/version/evidence] để giải thích. [Phần nào chưa tự làm] là template hoặc draft, nên tôi không tính là bằng chứng năng lực của mình.”

Nếu chưa tự sửa artifact nào, trả lời thẳng: “Tôi chưa thể nhận phần này là kinh nghiệm thực hành độc lập. Hiện tôi đang bắt đầu lab [draw.io/Postman/Excel] và sẽ bổ sung evidence sau.” Không dùng câu chuyện role-play giả lập như interview thật.

### “Vấn đề này đã được khách hàng xác nhận chưa?”

> “Chưa. Bối cảnh và stakeholder trong case study đều giả lập. Tôi xem bỏ lỡ request/handoff là giả thuyết; ngoài dự án học tập, tôi sẽ kiểm tra case gần nhất, quan sát ca làm, hỏi nhiều vai trò và tìm baseline có định nghĩa trước khi chốt problem statement.”

### “Tại sao bạn chọn app đặt bàn?”

> “Trong case này, app là option được dùng để luyện phân tích, chưa phải phương án được duyệt. Tôi sẽ so sánh với chuẩn hóa sổ, inbox chung hoặc queue hiện có theo outcome, rủi ro, vận hành và chi phí; sponsor quyết định sau khi xem evidence.”

### “Tại sao policy capacity/PENDING còn TBD?”

> “Đơn vị capacity, trạng thái nào giữ chỗ và thời hạn giữ ảnh hưởng trực tiếp tới khả năng nhận khách. Tôi ghi open question và owner cần quyết định thay vì tự chọn rule. Sau khi rule được duyệt, tôi sẽ cập nhật BRULE/decision table, API contract, AC, UAT và test dữ liệu/concurrency liên quan.”

### “KPI cho thấy pilot thành công không?”

> “Không. Workbook chứa số liệu giả lập để luyện công thức, không phải pilot hay outcome thật. Muốn kết luận cần baseline/pilot thật, định nghĩa metric nhất quán, nguồn dữ liệu đáng tin, thời gian so sánh phù hợp và xem yếu tố gây nhiễu.”

### “Làm sao chứng minh không overbook khi nhiều khách submit cùng lúc?”

> “UAT đơn request không đủ. Tôi viết invariant business là tổng chỗ cấp không vượt capacity, phối hợp QA/Engineering thiết kế test đồng thời và kiểm tra reservation/history/occupancy sau nhiều lần chạy. Cơ chế kỹ thuật và tải mục tiêu cần owner kỹ thuật/business chốt.”

### “Nếu scope thay đổi, bạn làm gì?”

> “Tôi ghi change request, làm rõ need/value/urgency, truy impact qua BR, requirement, model, API/data, tests, training và operation; đưa option/cost/risk cho decision owner. Tôi không âm thầm sửa baseline nếu chưa có quyết định.”

### “Bạn dùng công cụ nào thành thạo?”

> “Tôi mô tả đúng level theo evidence: [tool], tôi tự làm [nhiệm vụ], tạo [artifact], phát hiện/sửa [vấn đề], reviewer/evidence là [link]. Tôi chưa tuyên bố thành thạo tool chỉ vì đã có file mẫu hoặc đã đọc hướng dẫn.”

### “Bạn sẽ làm gì khác nếu bắt đầu lại?”

> “Tôi sẽ xác minh [assumption quan trọng nhất] sớm hơn bằng [nguồn/hoạt động], vì nó ảnh hưởng [policy/solution/test]. Tôi cũng sẽ thu được evidence cá nhân rõ hơn bằng cách [artifact tự làm/review/actual result].”

## Red flags khi trả lời

- Nói “khách hàng cần app” khi chưa phỏng vấn/quan sát hoặc chưa so sánh options.
- Trình bày số liệu mô phỏng như kết quả pilot.
- Nói “đã test” khi chỉ viết test case mà chưa chạy.
- Nói “thành thạo Jira/Figma/SQL” nhưng không chỉ ra task, artifact và evidence.
- Nhận quyết định capacity, security hoặc architecture thay người có thẩm quyền/chuyên môn.
