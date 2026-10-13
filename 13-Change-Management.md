# 13 - Quản Lý Thay Đổi Yêu Cầu

## Tại Sao Change Management Quan Trọng?

Thay đổi yêu cầu là **chắc chắn xảy ra** trong mọi dự án. Vấn đề không phải là "có thay đổi không" mà là "xử lý thay đổi như thế nào".

> **Không có Change Management = Scope Creep = Dự án trễ, vượt budget, team kiệt sức.**

---

## Scope Creep là gì?

**Scope Creep** là hiện tượng phạm vi dự án liên tục mở rộng mà không có sự kiểm soát, thường do:
- Stakeholder thêm yêu cầu mà không qua process
- BA không document rõ scope ban đầu
- Dev tự ý thêm tính năng "tiện thể"
- Thiếu quy trình xử lý thay đổi chính thức

**Hậu quả:**
- Dự án trễ deadline
- Chi phí phát sinh ngoài dự toán
- Team burnout
- Stakeholder không hài lòng (nghịch lý: họ yêu cầu thêm nhưng vẫn không happy)

---

## Change Control Process

### Quy trình chuẩn:

```
Request Change
     │
     ▼
Log Change Request (CR)
     │
     ▼
Impact Analysis
(BA phân tích)
     │
     ▼
     ◇ ─── Approved? ─── No ──→ Reject & Notify
     │ Yes
     ▼
Update Requirements Docs
     │
     ▼
Communicate to Team
     │
     ▼
Implement Change
     │
     ▼
Verify & Close CR
```

---

## Change Request (CR) Template

```markdown
## Change Request: CR-015

**CR ID:** CR-015
**Requested by:** Nguyễn Văn A (Sales Manager)
**Date Submitted:** 13/10/2026
**Priority:** High / Medium / Low

---

### Mô Tả Thay Đổi
**Yêu cầu hiện tại:**
Khách hàng có thể áp dụng 1 mã giảm giá mỗi đơn hàng.

**Yêu cầu mới:**
Khách hàng có thể áp dụng tối đa 2 mã giảm giá mỗi đơn hàng.

**Lý do thay đổi:**
Chiến dịch marketing tháng 11 cần hỗ trợ kết hợp mã ưu đãi thành viên + mã flash sale.

---

### Impact Analysis (BA điền)

**Ảnh hưởng đến Requirements:**
- FR-025 (Apply Coupon) cần update
- FR-026 (Calculate Total) cần update
- Validation logic thay đổi

**Ảnh hưởng đến Thiết Kế:**
- UI checkout cần thêm input field thứ 2
- API endpoint /apply-coupon cần update

**Ảnh hưởng đến Timeline:**
- Ước tính: 5 ngày dev + 2 ngày test
- Nếu trong Sprint hiện tại: cần swap story khác ra

**Ảnh hưởng đến Chi Phí:**
- Ước tính: 7 ngày × [day rate] = X VNĐ

**Rủi Ro:**
- Logic giảm giá phức tạp hơn → nguy cơ bug tính sai tiền
- Cần test kỹ các combination mã giảm giá

---

### Quyết Định

☐ Approved — Implement trong Sprint ___
☐ Approved — Defer to backlog (ưu tiên thấp)
☐ Rejected — Lý do: _______________
☐ Need More Info — Cần làm rõ: _______________

**Approved by:** ____________ Ký: _______ Ngày: _______
```

---

## Impact Analysis — BA Cần Phân Tích Gì?

Khi có yêu cầu thay đổi, BA cần đánh giá:

### 1. Requirements Impact
- Requirement nào bị ảnh hưởng?
- Có requirement nào mâu thuẫn không?
- Có requirement nào phụ thuộc vào cái này không?

### 2. Design Impact
- Có cần thay đổi UI/UX không?
- Có cần thay đổi database schema không?
- Có cần thay đổi API không?

### 3. Schedule Impact
- Mất bao nhiêu ngày để implement?
- Có ảnh hưởng đến deadline không?
- Có cần swap story khác ra không?

### 4. Cost Impact
- Chi phí phát sinh thêm là bao nhiêu?
- Có cần approval budget không?

### 5. Risk Impact
- Thay đổi này tạo ra rủi ro gì mới?
- Có ảnh hưởng đến tính năng đã xong không (regression)?

---

## Change Management Trong Agile vs Waterfall

### Waterfall — Formal Change Control
- Change Request phải được viết và ký duyệt chính thức
- Impact analysis bắt buộc
- Timeline và cost phải được reforecast
- Nặng về documentation

### Agile — Lightweight Change Management
- Thay đổi được đưa vào Product Backlog
- PO/BA ưu tiên theo business value
- Không cần CR form phức tạp
- Nhưng vẫn cần **communicate impact** cho team
- Thay đổi lớn vẫn cần stakeholder approval

---

## Requirements Versioning

Khi requirements thay đổi, BA cần duy trì version history:

### Trong Confluence / Google Docs:
```
Document: FRD - Order Management
Version History:
| Version | Ngày      | Thay đổi                    | Người sửa |
|---------|-----------|----------------------------|-----------|
| 1.0     | 01/09/26  | Initial release             | Minh BA   |
| 1.1     | 15/09/26  | Add coupon feature          | Minh BA   |
| 1.2     | 13/10/26  | Allow 2 coupons (CR-015)    | Minh BA   |
```

### Trong Jira:
- Dùng Labels để đánh dấu stories bị ảnh hưởng bởi change
- Comment trên Story khi có thay đổi acceptance criteria
- Link Story với CR để traceability

---

## Xử Lý Các Tình Huống Khó

### Tình huống 1: Stakeholder thêm yêu cầu "nhỏ" không qua process

**Sai:** Tự ý nói với dev implement
**Đúng:**
```
"Tôi hiểu đây là thay đổi nhỏ, nhưng để đảm bảo 
không ảnh hưởng đến timeline và được track đúng, 
cho tôi log một CR nhanh và confirm với [PM/PO] nhé?"
```

---

### Tình huống 2: C-level thay đổi scope giữa chừng

**Cách xử lý:**
1. Lắng nghe và ghi nhận yêu cầu mới
2. Document rõ yêu cầu mới
3. Thực hiện impact analysis
4. Trình bày impact (thời gian, chi phí, rủi ro) cho C-level
5. Để C-level quyết định: proceed hay defer
6. Nếu proceed: update plan, thông báo team

---

### Tình huống 3: Hai stakeholders muốn 2 thứ khác nhau

**Cách xử lý:**
1. Đừng tự quyết định — BA không phải người có thẩm quyền business
2. Tổ chức meeting với cả hai bên
3. Trình bày tradeoffs của từng phương án
4. Để họ đồng thuận hoặc escalate lên cấp cao hơn
5. Document quyết định cuối cùng và lý do

---

## Communication Plan Khi Có Thay Đổi Lớn

Khi có thay đổi ảnh hưởng nhiều người:

```
Who → What → When → How

Dev Team      → Impact to sprint, technical changes     → Ngay lập tức → Slack + Jira
QA Team       → New/changed test cases                 → Trong ngày   → Email + Jira  
Project Manager → Timeline, cost impact                → Ngay lập tức → Meeting/Email
Stakeholders   → Business impact, new delivery date    → Trong 24h   → Email chính thức
End Users      → (nếu change ảnh hưởng trực tiếp)     → Trước go-live → Release notes
```

---

> ⚠️ **Nguyên tắc vàng**: Không có thứ gọi là "thay đổi nhỏ" trong dự án. Mọi thay đổi đều có impact. BA giỏi không nói "không" với thay đổi — mà nói "được, đây là impact của thay đổi đó".
