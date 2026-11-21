# 42 — UAT Evidence, Defect Triage và Sign-off

## Mục tiêu

Sau bài lab, bạn có thể chuẩn bị một scenario theo phạm vi đã biết, ghi actual result tách khỏi expected result, phân loại lỗi với change request, tạo defect đủ để nhóm delivery tái hiện, và trình bày readiness cho người có quyền quyết định. Bài tập dùng mock data; nó không chứng minh sản phẩm nhà hàng thật.

## Luồng làm việc UAT

1. **Chốt phạm vi:** Use Case, AC, requirement version, môi trường/build và người có quyền nghiệm thu.
2. **Chuẩn bị dữ liệu:** ghi ID test data và cách tạo/reset. Chỉ dùng fixture tổng hợp.
3. **Chạy theo scenario:** thực hiện đúng bước; không sửa expected result sau khi nhìn thấy actual.
4. **Thu bằng chứng:** request/response, ảnh đã khử dữ liệu, thời điểm, build/version và người chạy.
5. **Phân loại:** Pass, Fail hoặc Blocked theo quy ước nhóm; defect là chênh lệch với yêu cầu được duyệt, còn change request đề xuất thay đổi yêu cầu/phạm vi.
6. **Triage:** xác nhận tái hiện, ảnh hưởng nghiệp vụ, mức độ/ưu tiên theo chuẩn đội, owner và quyết định xử lý.
7. **Quyết định nghiệm thu:** BA tổng hợp evidence/gap; Product/business owner hoặc người được governance chỉ định quyết định chấp nhận, điều kiện go/no-go hoặc defer.

Không có một bộ tên trạng thái/severity dùng cho mọi tổ chức. Bảng trong lab là đề xuất cho case study; đổi theo quy ước dự án thật.

## Bài lab UAT-11 — filter không có kết quả

### Chuẩn bị

- Đọc [AC-US02-04 trong backlog](./03-Requirements-Backlog.md) và [UAT-11 walkthrough](./13-Use-Case-Data-Flow-UAT.md#uat-11-walkthrough--queue-rỗng).
- Khởi động mock API theo [Postman Practice Lab](./15-Postman-Practice-Lab.md). Dùng Local Mode và fixture giả; không dùng dữ liệu khách thật.
- Trong Postman mở `GET http://127.0.0.1:3000/api/reservations?date=2026-12-06`, thêm header `X-Training-Staff: demo`, gửi request.
- Ghi **actual** từ lần chạy của chính bạn. Expected theo mock contract là `200`, `total: 0`, `items: []`; nếu kết quả khác, lưu nguyên response và điều kiện chạy, đừng sửa actual cho khớp expected.
- Mở prototype/build để xem UI với cùng filter. API rỗng không thay thế bằng chứng UI. Nếu không có màn hình rỗng được review, đánh dấu phần UI Blocked/Open và nêu quyết định/owner cần thiết.

### Execution log — tự điền

| Field | Your result |
|---|---|
| Test ID / AC | UAT-11 / AC-US02-04 |
| Người chạy / ngày giờ |  |
| Mock server / build hoặc commit |  |
| Request URL / header / filter |  |
| Test data / cách reset |  |
| Expected API result | `200`; `total=0`; `items=[]` |
| Actual API status/body |  |
| API verdict (Pass/Fail/Blocked) |  |
| Prototype/frame/version |  |
| Expected UI state theo decision đã duyệt |  |
| Actual UI state / evidence link |  |
| UI verdict và lý do |  |
| Giới hạn / open question / người cần quyết định |  |

Ghi verdict riêng cho API và UI nếu chúng kiểm chứng phần khác nhau. Không dùng `Linked` hoặc “đã viết test” như bằng chứng test đã Pass.

### Worked example — verdict khác nhau giữa API và UI

**Tình huống dưới đây hoàn toàn giả lập để học cách suy luận; không phải lần chạy Postman thật và không được dùng làm execution evidence.**

| Phần | Thông tin trong fixture học tập |
|---|---|
| Source | AC-US02-04, hiện còn Draft; exact copy/CTA `TBD` |
| API expected | Theo mock contract: `200`, `total: 0`, `items: []` cho filter ngày không có record |
| API result giả lập | `200`, `total: 0`, `items: []` |
| UI evidence | Chưa có frame/build được duyệt làm oracle cho empty state |

**Kết luận đúng cho fixture:** API sample có vẻ khớp expected nhưng verdict thực tế phải là `Not run` vì chưa có request run record. Không ghi Pass từ fixture. UI là `Blocked/Open`, vì chưa có expected state đã duyệt để so sánh. Không mở defect về copy/CTA ở giai đoạn này; tạo decision/action cho Product + UX xác nhận hai trạng thái “queue thật sự rỗng” và “filter không có kết quả”, thông điệp/hành động và version thiết kế. Sau khi baseline được chốt, chạy lại trên build cụ thể. Nếu actual khác baseline và tái hiện được, khi đó mới tạo defect với bước tái hiện/evidence.

**Bài học BA:** thiếu expected oracle là blocker kiểm thử, không tự động là defect. API `200` chỉ chứng minh phản hồi HTTP thành công; nó không chứng minh actor hiểu tình trạng hay tìm được hành động tiếp theo. Khi có run thật, thay fixture bằng actual, người chạy, timestamp, environment/build và response đã khử dữ liệu.

## Nếu phát hiện chênh lệch: defect hay change request?

Ví dụ bên dưới là tình huống giả định để phân loại, không phải lỗi đã quan sát trong mock:

> Có AC được duyệt yêu cầu hướng dẫn người dùng khi filter không có kết quả. Khi chạy prototype version đã ghi, bảng không có dòng nhưng cũng không có empty-state message; người test không biết nên đổi filter hay xóa bộ lọc.

Nếu AC đó thật sự được duyệt và test tái hiện được trên build xác định, có thể ghi defect. Nếu copy/CTA chưa được chốt, chưa đủ căn cứ để gọi thiếu copy là defect: mở decision/change để Product/UX thống nhất trước. Nếu stakeholder muốn bổ sung CTA sau khi baseline đã duyệt, đó có thể là change request. Luôn kiểm tra baseline, version và authority trước khi phân loại.

### Defect record — template

```text
Defect ID / title:
Environment + build/version:
Related requirement / AC / UAT ID:
Preconditions + synthetic data:
Steps to reproduce:
Expected result + source/version:
Actual result:
Frequency / reproducibility:
Business impact / affected users:
Severity + priority (theo quy ước team):
Evidence links (đã khử dữ liệu):
Owner / triage decision / due date:
Status + retest result:
```

Severity mô tả mức ảnh hưởng; priority sắp thứ tự xử lý. Không tự gán nhãn Critical/High nếu chưa có rubric hoặc triage owner. Một workaround, affected scope và tần suất tái hiện giúp quyết định, nhưng không thay quyền phê duyệt.

### Triage worksheet — tự điền

| Câu hỏi | Ghi nhận |
|---|---|
| Có thể tái hiện trên cùng build/test data không? |  |
| Yêu cầu/AC baseline nào bị vi phạm? |  |
| Ảnh hưởng tới actor, quy trình và dữ liệu nào? |  |
| Severity/priority theo rubric nào? |  |
| Có workaround an toàn không? |  |
| Defect, open decision hay change request? Vì sao? |  |
| Ai quyết định và cần evidence gì thêm? |  |

## Sign-off và go/no-go

UAT sign-off có nghĩa người được ủy quyền chấp nhận phạm vi/evidence đã trình bày theo governance dự án; nó không tự chứng minh security, performance, privacy hay operational readiness. Nếu còn blocked scenario hoặc risk chấp nhận có điều kiện, ghi rõ owner, hạn xử lý và approver.

### Ba quyết định liên tiếp, ba loại bằng chứng

| Gate | Câu hỏi | Bằng chứng/owner chính |
|---|---|---|
| UAT acceptance | Luồng nghiệp vụ và tiêu chí đã duyệt đạt không? | Scenario, expected/actual, defect disposition; business approver |
| Release readiness | Có thể vận hành an toàn trong phạm vi rollout không? | Support/runbook, security/ops review, monitoring, training, rollback, stop criteria; release approver và owners chuyên môn |
| Benefit review | Sau thời gian sử dụng, outcome có cải thiện không? | Baseline/pilot data với định nghĩa và denominator nhất quán, caveat/causal limits; sponsor/Product/data owner |

Một gate đạt không tự động làm hai gate còn lại đạt. Sau UAT, tiếp tục [Operational Readiness](./21-NFR-Quality-Attributes-va-Operational-Readiness.md) và governance release ở [BA Planning](./23-BA-Planning-va-Governance.md); sau khi giải pháp được dùng, đánh giá outcome theo [Solution Evaluation & Benefit Realization](./16-Solution-Evaluation-va-Benefit-Realization.md). Workbook KPI giả lập là bài luyện công thức, không phải bằng chứng pilot.

### Readiness summary — tự điền

```text
Build/environment:
UAT scenarios: total / pass / fail / blocked / not run
Defect theo severity/priority và triage status:
Requirement/AC chưa có test hoặc evidence:
Risk còn lại + owner + mitigation:
Các kiểm tra ngoài UAT còn cần (QA/security/ops/performance):
Recommendation của BA (kèm evidence và caveat):
Quyết định go/no-go/defer:
Decision maker + ngày + điều kiện:
```

BA tổng hợp và khuyến nghị dựa trên evidence. BA không ký thay business owner, QA, Security hoặc Operations.

## Handoff bằng công cụ

| Tool | Việc làm | Evidence đầu ra |
|---|---|---|
| Postman Local Mode | Lưu request/response cho filter ngày không có record; ghi environment và actual | Collection run hoặc ảnh đã khử dữ liệu; response body/status |
| Markdown/issue tracker | Tạo defect hoặc decision với AC/UAT link, reproduction steps, owner và status | Issue link/ID hoặc defect log; Jira chưa kết nối thì dùng bảng Markdown |
| RTM Excel | Cập nhật verification link/evidence state sau khi chạy; giữ status requirement Draft nếu chưa được duyệt | Row có test ID, evidence link và actual state; không đặt Verified chỉ từ test design |
| Figma/FigJam | Review riêng UX empty state hoặc ghi unresolved decision | Frame/version hoặc decision sticky có owner/date |

## Bài tập portfolio

Tạo một trang ngắn gồm: mục tiêu UAT-11, điều kiện/data, ảnh Postman response do bạn chạy, ảnh/frame prototype nếu có, verdict riêng API/UI, một defect hoặc open decision (nếu có), và giới hạn của mock. Chỉ đưa artifact tự làm vào phần năng lực cá nhân; ghi rõ phần nào là template/dữ liệu giả lập.

### Tự review

- [ ] Expected và actual được ghi tách biệt.
- [ ] Mỗi kết luận có environment/build, test data và evidence link.
- [ ] API result không bị diễn giải thành UI/UX pass.
- [ ] Defect gắn với baseline đã duyệt; phần policy/UX chưa chốt được giữ Open.
- [ ] Severity/priority theo rubric/triage owner, không phải phỏng đoán cá nhân.
- [ ] Sign-off nêu đúng decision maker và các risk ngoài phạm vi UAT.
- [ ] Tôi có thể giải thích test này chứng minh gì và không chứng minh gì.

Chỉ sau khi tự làm và được review mới cập nhật level UAT/API trên [BA Tool Mastery Tracker](./24-BA-Tool-Mastery-Tracker.md). Artifact mẫu của trợ lý không được tính là evidence năng lực người học.
