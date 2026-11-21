# 31 — Booking đồng thời, retry và thiết kế kiểm thử

## Mục tiêu

Phân tích điều gì có thể sai khi hai khách cùng đặt chỗ cuối, hoặc khách gửi lại request sau timeout; viết yêu cầu và test có thể truy vết; xác định phần nào BA cần làm rõ với Product, Engineering, QA và Operations.

Case study giả lập. Capacity policy, ngưỡng tải và hành vi khi retry trong tài liệu này là câu hỏi/đề xuất để học, chưa phải quyết định production.

## 1. Vì sao UAT đơn request chưa đủ?

Giả sử chỉ còn 4 chỗ và hai khách, mỗi khách đặt 3 chỗ, gửi gần như cùng lúc:

1. Request A đọc available = 4.
2. Request B cũng đọc available = 4.
3. Cả hai đều thấy đủ chỗ nếu chỉ kiểm tra trước khi ghi.
4. Nếu cả hai cùng được tạo, hệ thống giữ 6 chỗ trong khi chỉ còn 4.

Đây là race condition: kết quả đúng của từng request riêng lẻ không bảo đảm tổng kết quả đúng khi chạy đồng thời. UAT-05 ở `05-API-and-UAT.md` chỉ kiểm tra một request bị từ chối; nó không chứng minh tính đúng đắn khi concurrency.

Một vấn đề khác là timeout: server có thể đã lưu booking nhưng response bị mất trên đường truyền. Khách bấm gửi lại; hệ thống cần tránh tạo booking thứ hai ngoài ý muốn. Đây là bài toán retry/idempotency, khác với race condition.

## 2. Hỏi để chốt yêu cầu trước khi viết giải pháp

### Với capacity/concurrency

- “Còn chỗ” được tính theo ghế, bàn, khu vực hay tổ hợp bàn có thể ghép?
- Trạng thái nào chiếm chỗ: `PENDING`, `CONFIRMED`, khách đã đến? Khi nào hết giữ chỗ?
- Nếu hai yêu cầu cùng tranh chỗ cuối, ưu tiên theo thời điểm nhận, thao tác xác nhận của staff hay quy tắc khác?
- Có cho phép một yêu cầu bị từ chối dù người dùng vừa thấy slot còn chỗ không? Thông điệp và bước tiếp theo là gì?
- Tải đỉnh dự kiến là bao nhiêu request/giây và bao nhiêu request đồng thời? Nguồn forecast và owner?
- “Không overbook” áp dụng mỗi cơ sở, mỗi khu vực hay từng slot? Ai được phép override và audit thế nào?

### Với timeout/retry

- Người dùng nhìn thấy trạng thái nào khi không nhận được response?
- Cách tra cứu xem request trước đã được ghi hay chưa? Có mã tham chiếu không?
- Retry cùng một lần submit có nhận lại kết quả cũ hay tạo request mới?
- Cùng khách gửi một yêu cầu mới có chủ ý trong cùng slot được phân biệt ra sao?
- Thời gian lưu khóa chống trùng là bao lâu? Điều này cần Engineering/Security/Operations tư vấn theo thiết kế và rủi ro.

BA ghi câu trả lời thành business rule, decision log và acceptance criteria. BA không nên tự chỉ định database lock, transaction isolation hay thuật toán khóa.

## 3. Yêu cầu và acceptance criteria mẫu

**BRULE-08 — Capacity không vượt ngưỡng:** Khi nhiều request được xử lý đồng thời cho cùng resource/slot, tổng số booking chiếm chỗ sau xử lý không vượt capacity đã duyệt. Cần Product/Operations xác nhận định nghĩa “chiếm chỗ”; Engineering đề xuất kiểm soát nhất quán.

**BRULE-09 — Retry an toàn:** Khi cùng một thao tác submit được gửi lại do timeout, hệ thống không tạo thêm booking cho cùng một lần submit và trả kết quả có thể đối chiếu. Cách nhận diện/TTL của request token là quyết định kỹ thuật cần review.

**AC-CONC-01 — tranh chỗ cuối**

```gherkin
Given slot có 4 chỗ khả dụng theo capacity policy đã duyệt
And hai request độc lập, mỗi request cần 3 chỗ
When cả hai request được xử lý đồng thời
Then không quá một request được chấp nhận đủ 3 chỗ
And tổng capacity đã giữ không vượt capacity của slot
And request không được chấp nhận nhận mã/lý do có thể hiển thị cho khách
And trạng thái của từng request có thể truy vết trong audit/history
```

**AC-RETRY-01 — response timeout sau khi ghi**

```gherkin
Given submit request K đã được lưu nhưng client chưa nhận response
When client retry cùng request K theo cơ chế đã thống nhất
Then hệ thống không tạo booking thứ hai cho K
And response retry cho phép client đối chiếu với kết quả đã lưu
And booking vẫn chỉ chiếm capacity một lần
```

Các AC nêu outcome nghiệp vụ; Engineering/QA bổ sung protocol, test harness, mức tải và cách đồng bộ thời điểm trong test. Cần review cả trường hợp retry đồng thời cùng key và cùng payload khác key.

## 4. Ma trận test tối thiểu

| ID | Loại | Setup | Kết quả cần quan sát | Ai phối hợp |
|---|---|---|---|---|
| T-CONC-01 | Boundary | Còn 4; một request 4 chỗ | Chấp nhận đúng theo policy; occupancy không vượt capacity | BA/QA/PO |
| T-CONC-02 | Boundary | Còn 4; một request 5 chỗ | Từ chối; không tạo booking chiếm chỗ | BA/QA |
| T-CONC-03 | Concurrent | Còn 4; hai request độc lập × 3 chỗ cùng lúc | Tổng chỗ cấp không quá 4; kết quả nhất quán | QA/Engineering |
| T-CONC-04 | Concurrent | Nhiều request nhỏ cùng slot; barrier đồng bộ | Invariant capacity đúng sau mọi request | QA/Engineering |
| T-RETRY-01 | Timeout | Server commit; client timeout trước response | Retry cùng request không tạo bản ghi thứ hai | QA/Engineering |
| T-RETRY-02 | Duplicate delivery | Cùng idempotency key gửi đồng thời | Một kết quả nghiệp vụ duy nhất; response đối chiếu được | QA/Engineering |
| T-RETRY-03 | Key misuse | Cùng key nhưng payload khác | Hành vi được định nghĩa rõ, không âm thầm đổi booking | Product/Engineering/QA |
| T-AUDIT-01 | Reconciliation | Chạy bộ concurrency nhiều lượt | Reservation, history và occupancy đối soát được | QA/Operations |

Một kịch bản Postman gửi tuần tự phù hợp kiểm tra contract, validation và luồng đơn. Nó không tự chứng minh concurrency; cần runner/test harness có thể điều phối request song song và môi trường test được QA/Engineering kiểm soát.

## 5. Evidence và tiêu chí kết luận

Với mỗi lần chạy, lưu:

- build/commit, môi trường, seed và capacity policy/version;
- số request, payload tổng hợp không chứa thông tin cá nhân thật, thời điểm bắt đầu/kết thúc;
- request correlation/idempotency reference đã che dữ liệu nhạy cảm;
- response/status của từng request, latency/error rate và log liên quan;
- số booking được ghi, số chỗ đã giữ trước/sau, history event;
- kết luận: pass/fail/inconclusive, người chịu trách nhiệm và issue link.

Không kết luận “an toàn đồng thời” chỉ từ một lần chạy thành công. Test phải lặp lại, có nhiều mức tải, cùng dữ liệu/seed được kiểm soát và kiểm tra invariant sau chạy. Threshold performance do business chốt sau khi Engineering/QA cung cấp phương án và evidence; xem NFR-01 trong module 21.

## 6. Tool lab — dùng công cụ đúng việc

1. **Jira/Markdown backlog:** tạo story/requirement cho BRULE-08/09, link AC-CONC-01 và AC-RETRY-01; giữ câu hỏi policy ở trạng thái open cho tới khi owner quyết định.
2. **Postman:** lưu happy path, insufficient capacity, timeout/duplicate contract nếu mock hỗ trợ. Ghi rõ test nào chỉ chạy đơn tuần tự.
3. **QA/load test tool:** cùng QA thiết kế đồng bộ request, lặp nhiều vòng, tải được phê duyệt; BA review liệu test chứng minh đúng business invariant.
4. **SQL/data:** tạo query đối soát số reservation và occupancy sau test trên cùng môi trường/test dataset; không đối chiếu nhầm mock memory với database fixture độc lập.
5. **Figma/FigJam:** mô tả trạng thái “đang xử lý”, “không biết request đã ghi chưa”, “đã nhận yêu cầu” và “slot vừa hết chỗ”; nội dung không hứa thành công trước khi server xác nhận.
6. **Decision log:** ghi policy PENDING/capacity, ưu tiên tranh chỗ, retry token và người phê duyệt; để TBD khi chưa có bằng chứng.

## 7. Bài tập học viên

Với tình huống còn 5 chỗ và ba khách cùng gửi lần lượt 2, 3 và 4 chỗ:

1. Viết một câu hỏi cho PO về quy tắc ưu tiên.
2. Viết một business invariant không phụ thuộc công nghệ.
3. Tạo hai test concurrency và một test timeout/retry; nêu setup và evidence.
4. Tách điều gì thuộc acceptance criteria, điều gì cần NFR/engineering decision.
5. Nêu một trường hợp inconclusive và cần thu thập gì thêm.

**Gợi ý tự chấm:** requirement nói outcome có thể quan sát; test setup tái lập được; test đồng thời không bị nhầm với request tuần tự; không tự đặt capacity policy/threshold; kết luận có evidence và owner.

### Ví dụ hướng dẫn: 5 chỗ và các request 2, 3, 4

**Câu hỏi cho PO:** “Khi các request đến gần như đồng thời và tổng số chỗ họ yêu cầu vượt 5, nhà hàng muốn cấp chỗ theo thời điểm hệ thống nhận request, theo thứ tự staff xử lý, hay theo một chính sách ưu tiên khác? ‘Thời điểm nhận’ được ghi nhận ở đâu và hai request cùng thời điểm được xử lý thế nào?”

**Invariant nghiệp vụ:** “Sau khi xử lý mọi request cho cùng slot, tổng số chỗ đã được giữ theo capacity policy được duyệt không vượt quá 5.” Đây là kết quả cần bảo đảm; câu này chưa chỉ định lock, transaction hay thuật toán.

**Bằng chứng cho quy tắc “ai đến trước”:** cần truy được mỗi request thuộc slot nào, cần bao nhiêu chỗ, được hệ thống nhận lúc nào, được xử lý lúc nào, quyết định cuối cùng là gì và decision/policy version nào áp dụng. Phải phân biệt `received_at` (thời điểm hệ thống nhận), `processed_at` (thời điểm xử lý) và timestamp do thiết bị khách gửi; giờ thiết bị khách không đủ tin cậy để tự phân xử. Đồng hồ/timezone/độ chính xác và cách xử lý hai request trùng thời điểm phải được thống nhất với Engineering. BA mô tả audit outcome và nhu cầu giải quyết tranh chấp; không tự quy định database sequence hay cơ chế lưu.

Evidence nên dùng reservation/request reference và correlation ID; chỉ lưu contact data tối thiểu cần thiết, hạn chế quyền xem log và đặt retention theo policy. Khi review tranh chấp, cần đối chiếu event nhận request, state transition, kết quả cấp capacity và response trả về; timestamp đơn lẻ hoặc screenshot phía client không đủ chứng minh thứ tự xử lý.

**AC-CONC-02 — thứ tự request và trường hợp không phân định được (Draft, phụ thuộc decision):**

```gherkin
Given hai request cho cùng slot có tổng số chỗ yêu cầu vượt capacity còn lại
And Product/Operations đã duyệt quy tắc ưu tiên, tie-breaker và fallback khi không phân định được thứ tự
When hệ thống xử lý các request
Then quyết định nhận/từ chối/chờ xử lý tuân theo policy đã duyệt
And tổng số chỗ được giữ không vượt capacity
And audit cho phép đối chiếu request reference, slot, số chỗ yêu cầu,
    thời điểm nhận/xử lý, quyết định, lý do và phiên bản policy
And nếu không phân định được thứ tự, hệ thống áp dụng fallback đã duyệt
    thay vì tự chọn người thắng
```

AC này vẫn **Draft và chưa testable hoàn toàn** cho đến khi fallback được chốt; không thể ghi “pass” chỉ với invariant capacity vì chưa biết kết quả nào người dùng mong đợi khi hòa.

**Nếu PO duyệt quy tắc first-received, all-or-nothing và thứ tự là 2 → 3 → 4:** request 2 được nhận, request 3 được nhận, request 4 bị từ chối vì không còn đủ chỗ. Đây chỉ là ví dụ theo một policy giả định, không phải policy mặc định của dự án. Nếu thứ tự nhận khác, người thắng có thể khác; BA phải làm rõ tie-breaker trước khi biến thành expected result cố định.

| Kiểm tra | Setup | Expected result / evidence |
|---|---|---|
| T-CONC-05 — Oversubscription | Capacity 5; gửi đồng thời request 2, 3, 4 cho cùng slot bằng barrier; chạy lặp trên seed cố định | Invariant đúng sau mỗi lượt; lưu correlation ID, response từng request, reservation/state và occupancy trước/sau. Nếu chưa duyệt priority, chỉ đánh giá invariant và ghi rõ winner là chưa kết luận |
| T-CONC-06 — Priority theo policy | Cùng setup, PO đã duyệt thứ tự/tie-breaker và quy tắc nhận toàn bộ hay một phần | Winner/loser và lý do khớp policy đã duyệt; capacity không vượt 5; lưu version decision, log và kết quả đối soát |
| T-CONC-07 — Audit thứ tự nhận / AC-CONC-02 | Hai request cùng slot đến gần nhau; kiểm tra request reference, received/processed time, timezone/precision, state transition và policy version | QA/Operations có thể tái dựng thứ tự theo quy tắc đã duyệt; nếu độ phân giải không phân biệt được, kiểm tra fallback đã duyệt; nếu policy/fallback chưa chốt thì ghi blocked/inconclusive, không tự chọn winner |
| T-RETRY-04 — Timeout sau commit | Một submit được lưu; cố ý làm client timeout trước khi nhận response; gửi lại cùng một thao tác theo contract đã duyệt | Không tăng số booking/occupancy lần hai; response cho phép đối chiếu kết quả cũ; lưu request reference đã che thông tin nhạy cảm và hai response |

**Phân vai:** BA/PO chốt đơn vị capacity, trạng thái nào giữ chỗ, quy tắc ưu tiên và kết quả người dùng nhìn thấy. Engineering chọn cơ chế đảm bảo invariant và giới hạn kỹ thuật; QA chọn cách đồng bộ request, lặp tải và kiểm tra dữ liệu. Một lần Postman gửi tuần tự có thể kiểm tra API contract, nhưng không chứng minh được xử lý tranh chỗ đồng thời.

**Inconclusive:** nếu log không cho biết request nào được nhận trước, hoặc occupancy không đối soát được với reservation state, chưa thể kết luận policy priority hay invariant đã đạt; cần correlation/timestamp đủ độ chính xác và dữ liệu trạng thái từ cùng một lần chạy.

## Liên kết trong case study

Trace mở rộng: FN-03 → BRULE-08 → AC-CONC-01 → test concurrency/evidence → NFR-01/operational readiness. Retry: submit flow → BRULE-09 → AC-RETRY-01 → API contract/audit/reconciliation. Dùng cùng glossary và decision log để các module không mâu thuẫn.
