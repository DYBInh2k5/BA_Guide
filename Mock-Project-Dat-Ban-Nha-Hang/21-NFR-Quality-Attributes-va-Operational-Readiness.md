# 21 — NFR, Quality Attributes và Operational Readiness

## Vì sao BA cần quan tâm NFR?

Functional requirement mô tả hệ thống làm gì. Non-functional requirement (NFR) hoặc quality attribute mô tả chất lượng/điều kiện hệ thống phải đạt khi làm việc đó: nhanh đến đâu, ai được truy cập, chịu tải nào, phục hồi ra sao, dữ liệu được bảo vệ thế nào và vận hành có quan sát được không.

NFR mơ hồ tạo rủi ro delivery. “Nhanh”, “an toàn”, “dễ dùng” không thể nghiệm thu nếu không nói phạm vi, điều kiện đo, ngưỡng, owner và bằng chứng. NFR thường áp dụng cho nhiều story/use case; duy trì một catalog và truy vết tới test/release.

## Quality scenario template

Viết NFR theo dạng:

> **Khi** [stimulus/sự kiện] xảy ra, **trong** [environment/load/điều kiện], **hệ thống** [response mong muốn] **với** [measure + threshold] tại [điểm đo], được xác nhận bằng [test/evidence].

Các biến như `[p95 threshold]`, `[concurrent requests]`, `[retention duration]` phải do business/engineering/security xác định, không tự bịa.

### Ví dụ cho đặt bàn — bản nháp cần refinement

> Trong giờ cao điểm với `[concurrent requests]` submit cùng lúc, API tạo booking phản hồi ở p95 ≤ `[latency threshold]` tại server-side metric; mọi response timeout được xử lý để khách không bị tạo booking trùng khi retry; kiểm chứng bằng load test + idempotency/concurrency test và đối soát dữ liệu.

Một NFR hoàn chỉnh còn cần environment, dataset/payload, hành vi lỗi, owner, test evidence và mức ưu tiên. “3 giây ở tải dự kiến” trong backlog hiện thiếu percentile/điểm đo/tải, vì vậy vẫn là mục tiêu nháp, chưa phải acceptance target.

### Tách các chất lượng khác nhau thành tiêu chí có thể truy vết

Tránh nhồi performance, capacity và retry vào một dòng acceptance dài. Chúng liên quan nhưng có điều kiện đo và owner kiểm chứng khác nhau. Có thể tách thành:

| ID nháp | Chất lượng | Scenario / measure còn cần chốt | Evidence chính |
|---|---|---|---|
| NFR-PERF-01 | Performance | Với profile tải đã duyệt `[concurrency]`, p95 của `POST /reservations` tại `[measurement point]` ≤ `[threshold]` trong `[environment]` | Load report có p95/p99, throughput, error rate, cấu hình và timestamp |
| NFR-CAP-01 | Business integrity / capacity | Khi nhiều request cạnh tranh cùng slot, tổng reservation được chấp nhận không vượt capacity theo policy/version đã duyệt | Concurrent test + đối soát capacity/reservation/history; không chỉ kiểm tra từng request một |
| NFR-REL-01 | Reliability / retry safety | Sau timeout ở trạng thái chưa biết, retry cùng logical request không tạo booking thứ hai theo contract/idempotency đã duyệt | Fault/timeout test, correlation/idempotency key, record/history reconciliation |

Các ID trên chỉ là draft minh họa; threshold, load profile, capacity policy, key/TTL và retry behavior chưa được chốt. Operations/Product cung cấp tải/ngữ cảnh và mức rủi ro nghiệp vụ; Engineering đề xuất cách đo/khả thi; sponsor/business owner chấp nhận trade-off; QA/performance tester thiết kế và chạy test trong môi trường phù hợp. BA giữ requirement tách bạch và trace tới đúng test/evidence, không tự chọn số kỹ thuật.
### Ví dụ phân vai cho NFR-01

- **Operations/Product Owner** cung cấp bối cảnh nghiệp vụ: giờ cao điểm, số lượt đặt dự kiến, campaign/mùa vụ, hành trình nào không được chậm; nguồn và độ tin cậy của forecast.
- **Engineering/Architecture** đề xuất tải đại diện, điểm đo (API hay end-to-end), percentile, môi trường test, bottleneck và ngưỡng kỹ thuật khả thi; giải thích chi phí trade-off.
- **QA/Performance tester** thiết kế kịch bản, dữ liệu và cách tái lập; báo cáo percentile, error rate, throughput, cấu hình môi trường và giới hạn test.
- **Sponsor/Product Owner có quyền quyết định** chốt mức chất lượng nghiệp vụ chấp nhận được sau khi hiểu chi phí, rủi ro và lựa chọn. BA điều phối quyết định và ghi rationale; BA không tự bịa target hoặc phê duyệt thay.
- **Security/Operations** xác nhận không đánh đổi bảo mật, logging, stability và support để đạt tốc độ trên một benchmark đơn lẻ.

**Mẫu đã cấu trúc nhưng vẫn chờ số liệu:** “Trong cửa sổ đặt bàn cao điểm [time range], với [concurrent request profile] và payload [size], 95% request `POST /reservations` thành công trong ≤ [target ms], lỗi 5xx ≤ [threshold], và không có booking vượt capacity; đo ở [environment/measurement point] bằng [approved load test]. Nếu timeout, client retry bằng cùng idempotency key không tạo booking thứ hai. Threshold do Product/Sponsor phê duyệt sau khi Engineering/QA đưa benchmark và Operations xác nhận tải.” Đây là khung điền, chưa phải requirement được duyệt.

## Checklist quality attributes cho case đặt bàn

| Nhóm | Câu hỏi phân tích | Ví dụ kiểm chứng / owner cần phối hợp |
|---|---|---|
| Performance | Đo ở browser, API hay cả hành trình? p50/p95/p99? tải đỉnh? | Load test và real-user measurement; engineering + product chốt threshold |
| Capacity & scalability | Đỉnh request/batch booking, nhiều request đồng thời, nhiều bàn/cơ sở? | Concurrency test, boundary test; không oversell capacity |
| Availability & reliability | Lỗi database/email/network ảnh hưởng bước nào? booking có được lưu không? | Failure injection/monitoring, retry policy; không mất quyết định nghiệp vụ |
| Security & authorization | Khách/nhân viên/quản lý nhìn/sửa dữ liệu gì? privilege escalation? | Positive + negative role tests, audit; security owner xác nhận |
| Privacy & data handling | Trường nào cần thiết, mục đích, retention, access/export, log redaction? | Data inventory, retention decision, masking; data/privacy owner |
| Auditability | Ai đổi trạng thái gì, từ đâu sang đâu, lúc nào, reason nào? | Đối chiếu history và quyền xem; log không cho sửa tùy tiện |
| Accessibility & usability | Form lỗi có đọc được bằng keyboard/screen reader? thông điệp dễ hiểu? | Accessibility review/keyboard test/usability session; design + business |
| Compatibility/localization | Mobile/browser nào? timezone, format ngày, ngôn ngữ, daylight saving? | Device/browser matrix, timezone boundary tests; ops + engineering |
| Operability/observability | Có log, metric, alert, dashboard, owner, runbook? | Alert drill, support handoff, lỗi email/capacity visible |
| Recoverability | Backup/restore, RPO/RTO, queue replay và duplicate safety? | Restore/recovery exercise; infrastructure owner |
| Maintainability/configuration | Ai thay giờ mở/capacity, có approval/history, tránh config sai thế nào? | Configuration validation, change log, rollback; admin/ops |
| Interoperability | Contract API/versioning, provider limits, backward compatibility? | Contract tests, sandbox, failure modes; engineering/vendor |

Không phải NFR nào cũng áp dụng. Chọn theo risk/context, không bê nguyên checklist vào backlog.

## NFRs mẫu cần refinement

- **NFR-01 performance:** thay “3 giây” bằng target p95/p99, điểm đo, giờ/load, payload và môi trường; business chốt mức chấp nhận, engineering đề xuất khả năng.
- **NFR-02 authorization:** xác định role matrix, action/view scope, least privilege, session/expiry và kết quả khi không quyền; chỉ login là chưa đủ.
- **NFR-03 audit:** trường log gồm actor ID, old/new state, timestamp timezone chuẩn, source/correlation ID, reason khi bắt buộc; chốt retention và ai xem.
- **NFR-04 privacy:** inventory dữ liệu, mục đích, access, retention/deletion, export, masking/logging và quy trình sự cố; cần owner theo policy của tổ chức, không suy diễn pháp luật từ bài tập.
- **NFR-05 reliability:** khi email provider lỗi, booking state vẫn nhất quán; lỗi được quan sát; retry không gửi duplicate quá mức; nhân viên có fallback.
- **NFR-06 accessibility:** xác định standard/policy áp dụng và kiểm tra keyboard, focus, labels, error announcements, contrast, zoom; không dựa riêng vào màu.
- **NFR-07 recovery:** kỹ thuật/ops đề xuất RPO/RTO và restore test cho dữ liệu booking, quản lý phê duyệt mức gián đoạn chấp nhận được.

## Từ NFR tới evidence và traceability

| NFR | Actor/flow | Artifact | Acceptance / test | Evidence |
|---|---|---|---|---|
| NFR-01 | UC-01 submit | API contract + sequence | p95 under agreed load | Load report, timestamped metrics |
| NFR-02 | UC-02/03 staff | Role matrix + screen/API | unauthenticated/unauthorized request bị chặn; payload không rò rỉ | Postman negative tests + audit log |
| NFR-03 | UC-02 state change | Data model/history | actor/old-new/timestamp/reason đúng | DB query + audit record |
| NFR-05 | UC-04 email fail | sequence + runbook | booking persisted; failure visible; retry bounded | provider sandbox response + staff workflow |
| NFR-06 | Form/error states | Figma + content | keyboard/focus/error accessible | accessibility checklist + user review |

**UAT và quality verification khác nhau:** UAT xác nhận quy trình/đầu ra phù hợp nhu cầu nghiệp vụ. Load, penetration, recovery, accessibility hoặc contract tests thường cần chuyên môn kỹ thuật/QA; BA giúp định nghĩa intent, điều kiện và evidence, nhưng không tự ký thay owner chuyên môn.

## Operational readiness checklist trước pilot/release

- Quy trình và owner cho support, escalation, email failure, overbooking, duplicate request và configuration error.
- Role/permission đã được review; tài khoản test và production tách biệt.
- Log/metric/alert có người nhận, runbook, ngưỡng đã chốt và tránh dữ liệu cá nhân không cần thiết.
- Backup/restore và incident response được kiểm tra theo mức quan trọng.
- Đào tạo, FAQ, customer/staff communication và contact channel sẵn sàng.
- Data migration/retention/deletion, export và access approval rõ.
- Feature flag/rollout/rollback hoặc phương án giảm tác động đã thống nhất.
- Go/no-go approver, release window, success/stop criteria, review date rõ.

## Bài tập

1. Viết lại NFR-01 dưới dạng quality scenario. Nêu thông tin nào cần kỹ thuật cung cấp và ai là người chốt target.
2. Với role “lễ tân”, liệt kê 3 hành động được phép và 2 hành động không được phép; viết một negative test.
3. Nếu email lỗi sau khi booking đã xác nhận, mô tả consistency, log/alert, retry và fallback cần thấy.
4. Chọn 4 readiness item quan trọng nhất cho pilot và giải thích rủi ro nếu thiếu.
5. Phân loại bằng chứng nào thuộc UAT, QA/security/ops; ai chịu trách nhiệm kết luận.

## Công cụ thực hành

- **Jira:** NFR ticket, priority, owner, linked stories/tests; không gắn một NFR chung vào mọi story nếu không có traceability.
- **Confluence/Markdown:** NFR catalog, role matrix, glossary, decision/retention log, operational runbook.
- **Figma:** thiết kế error/focus/accessibility state, không chỉ happy path.
- **Postman:** auth/permission/validation/error contract và correlation ID; không để secret thật trong collection.
- **SQL:** kiểm tra audit record, state transition và dữ liệu trùng/thiếu.
- **Excel/BI:** tổng hợp SLA/failure theo định nghĩa đã chuẩn hóa; phân biệt metric giải pháp với metric delivery.
- **draw.io:** sequence/failure flow, dependency và fallback; cập nhật version sau quyết định.

## Portfolio evidence

Đưa một NFR catalog có owner/threshold/status, một trace NFR → acceptance test → evidence, role matrix và release readiness decision. Ghi `TBD` khi target chưa chốt và nêu người cần xác nhận.

