# 60 — Tính acknowledgement latency bằng SQL

## Mục tiêu

Chuyển metric spec ở [bài 59](./59-Acknowledgement-Latency-Metric-Spec.md) thành query SQLite ở grain request: tính latency, timestamp completeness, valid-latency coverage và tách dữ liệu thiếu khỏi timestamp âm. Đây là fixture tổng hợp để học; không phải log của nhà hàng hay bằng chứng cá nhân.

## Business definition cho lab

- **Grain:** một hàng là một reservation request đã được khử trùng ở lớp chuẩn bị dữ liệu.
- **Cohort:** request không phải test tạo trong tháng 11-2026 theo giờ Việt Nam.
- **Start:** request_received_at.
- **End candidate:** status_rendered_at — proxy cho client đã render trạng thái; không chứng minh khách đã đọc/hiểu.
- **Valid latency:** cả hai timestamp có giá trị và end không sớm hơn start.
- **Timestamp completeness:** cả hai timestamp tồn tại / toàn bộ request trong cohort.
- **Valid latency coverage:** request có latency hợp lệ / toàn bộ request trong cohort. Báo riêng để biết timestamp bị thiếu hoặc sai.
- **Statistics:** median và nearest-rank p90 chỉ trên latency hợp lệ; luôn kèm cỡ mẫu, coverage, missing và invalid.

Trong dự án thật, cohort, timezone, grain/dedup, event semantics và exclusion cần owner duyệt. Ở lab, các quy tắc này chỉ là định nghĩa giả định để query có thể chạy.

## Cách thực hành

1. Mở [Acknowledgement-Latency-Analysis-Lab.sql](./Acknowledgement-Latency-Analysis-Lab.sql) trong DB Browser for SQLite, SQLite CLI hoặc extension phù hợp.
2. Đọc schema và fixture; phân loại trước những request đủ điều kiện, test, thiếu end timestamp và end timestamp sớm hơn start.
3. Tự viết query metric theo cùng definition trên. Báo theo channel nhưng không xếp hạng channel từ mẫu nhỏ.
4. Đối chiếu với phần answer key trong SQL sau khi đã tự viết query.
5. Tạo bản copy query cá nhân, ghi SQLite version, ngày chạy, result, source definition và giới hạn vào execution log. Chỉ bản tự chạy mới là evidence thực hành.

## Tự đối chiếu từ các dòng fixture

Các số dưới đây được đếm/tính trực tiếp từ dữ liệu mẫu để giúp rà query; đây **không phải execution log hay kết quả đã chạy SQLite**.

| Channel | Eligible | Đủ 2 timestamp | Latency hợp lệ | Missing | Invalid | Timestamp completeness | Valid coverage | Median | Nearest-rank p90 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| WEB | 5 | 4 | 3 | 1 | 1 | 80% | 60% | 7 giây | 9 giây |
| PHONE | 4 | 3 | 3 | 1 | 0 | 75% | 75% | 12 giây | 18 giây |

Trong toàn cohort có 9 request; 7 có đủ timestamp, nhưng chỉ 6 có latency hợp lệ. Vì vậy completeness là 7/9 = 77,8%, valid coverage là 6/9 = 66,7%. Bản ghi có timestamp âm vẫn đủ hai timestamp nên góp vào completeness, nhưng không góp vào valid coverage hoặc percentile. Kết quả per-channel chỉ mô tả fixture nhỏ, không đủ kết luận channel nào tốt hơn.

## One-slide readout cho sponsor (mẫu giả lập)

**Finding:** fixture có 9 request; chỉ 6 request có latency hợp lệ. Valid coverage là 60% ở WEB và 75% ở PHONE.

**Ý nghĩa:** chưa đủ căn cứ so sánh thời gian giữa hai channel; thiếu/sai timestamp có thể làm metric lệch. Median/p90 mô tả fixture, không phải baseline production.

**Recommendation:** xác nhận event status_rendered_at đo đúng điều gì, giao owner instrumentation và xem coverage trong pilot trước khi đặt target.

**Decision request:** Product/Engineering/Data duyệt event definition, timezone, grain/dedup, owner và điều kiện baseline đủ tin cậy. Chỉ sau đó mới so sánh phương án như status page, email hoặc SMS.

**Không kết luận:** dữ liệu này không chứng minh SMS làm giảm cuộc gọi, không tạo SLA và không đại diện khách hàng thật.

## Câu hỏi BA trước khi dùng kết quả

- Event status_rendered_at có thực sự đo browser render trạng thái đã duyệt? Có request nào không mở trang kết quả?
- Request trùng và retry đã được khử theo contract nào trước khi tính? Fixture này không kiểm thử quy tắc dedup.
- Coverage có đủ để đại diện cohort không? Missing/invalid có khác nhau theo channel không?
- P90/median của mẫu nhỏ mô tả fixture, không phải target hay SLA. Ai duyệt target sau khi baseline production hợp lệ?

## Portfolio evidence

Lưu query tự viết, ảnh/query output nếu đã tự chạy, định nghĩa metric, số dòng/coverage, caveat, tool/version và ngày. Ghi rõ fixture synthetic; không ghi con số fixture vào CV như kết quả dự án thật.
