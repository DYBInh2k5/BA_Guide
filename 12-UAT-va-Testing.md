# 12 - UAT & Hỗ Trợ Testing

## BA Liên Quan Đến Testing Như Thế Nào?

BA **không phải QA** — nhưng BA là người hiểu yêu cầu sâu nhất, nên đóng vai trò quan trọng trong:
- Tạo ra test cases từ acceptance criteria
- Lên kế hoạch và thực hiện **UAT (User Acceptance Testing)**
- Xác nhận bug có phải do lỗi yêu cầu hay lỗi dev
- Quyết định "done" hay "not done" khi review tính năng

---

## UAT là gì?

**User Acceptance Testing (UAT)** là giai đoạn testing cuối cùng, nơi **end users hoặc business stakeholders** kiểm tra xem hệ thống có đáp ứng đúng yêu cầu kinh doanh không — trước khi go-live.

```
Development → Unit Testing → Integration Testing → System Testing → UAT → Go-Live
                (Dev)            (Dev/QA)              (QA)         (BA + Users)
```

---

## Các Loại Testing BA Cần Hiểu

| Loại Testing | Ai làm | Mục đích |
|-------------|--------|----------|
| **Unit Testing** | Developer | Test từng function/component riêng lẻ |
| **Integration Testing** | Dev / QA | Test tích hợp giữa các module |
| **System Testing** | QA | Test toàn bộ hệ thống end-to-end |
| **Regression Testing** | QA | Đảm bảo tính năng cũ không bị vỡ sau thay đổi |
| **UAT** | BA + End Users | Xác nhận hệ thống đáp ứng business requirements |
| **Performance Testing** | QA / DevOps | Test hiệu năng, load, stress |
| **Smoke Testing** | QA | Test nhanh các chức năng cơ bản sau deploy |

---

## BA Tham Gia UAT Như Thế Nào?

### Trước UAT
1. **Chuẩn bị UAT Plan:**
   - Xác định scope: tính năng nào sẽ được test
   - Xác định participants: ai sẽ tham gia UAT
   - Lịch trình UAT
   - Entry/Exit criteria

2. **Tạo UAT Test Cases từ Acceptance Criteria:**
   - Mỗi Acceptance Criteria → ít nhất 1 test case
   - Include positive cases (happy path) và negative cases (edge cases)

3. **Chuẩn bị test data:**
   - Dữ liệu cần thiết để chạy test
   - Môi trường UAT phải gần giống production

### Trong UAT
- Hướng dẫn end users thực hiện test
- Ghi nhận kết quả test (pass/fail)
- Log defects nếu phát hiện vấn đề
- Quyết định defect nào là blocker, cần fix trước go-live

### Sau UAT
- Tổng hợp kết quả UAT
- Sign-off UAT với stakeholders
- List tất cả known issues và cách xử lý
- Quyết định go-live hay hoãn

---

## UAT Test Case Template

```markdown
## Test Case: TC-001

**Test Case ID:** TC-001
**Requirement ID:** BR-002 / FR-010
**Test Case Name:** Khách hàng đặt hàng thành công
**Priority:** High
**Type:** Functional

**Preconditions:**
- User đã đăng nhập
- Có ít nhất 1 sản phẩm trong kho

**Test Steps:**
1. Vào trang danh sách sản phẩm
2. Click "Thêm vào giỏ" cho sản phẩm A
3. Click vào icon giỏ hàng
4. Click "Checkout"
5. Nhập địa chỉ giao hàng hợp lệ
6. Chọn phương thức thanh toán "COD"
7. Click "Xác nhận đặt hàng"

**Expected Result:**
- Hiển thị màn hình "Đặt hàng thành công" với mã đơn hàng
- Email xác nhận được gửi đến email đăng ký
- Số lượng tồn kho giảm đi 1

**Actual Result:** ____________
**Status:** ☐ Pass  ☐ Fail  ☐ Blocked
**Tester:** ____________
**Date:** ____________
**Notes:** ____________
```

---

## Defect Management — BA Xử Lý Bug Như Thế Nào?

### Phân loại defect:

| Severity | Mô tả | Ví dụ |
|----------|-------|-------|
| **Critical** | Hệ thống crash, không dùng được | Không thể login |
| **High** | Tính năng chính không hoạt động | Không thể thanh toán |
| **Medium** | Tính năng phụ lỗi | Filter sản phẩm không đúng |
| **Low** | UI/UX issue nhỏ | Typo, màu sắc sai |

### Bug Report Template:
```markdown
**Bug ID:** BUG-042
**Title:** Không thể thanh toán bằng thẻ Visa khi số tiền > 10 triệu
**Severity:** High
**Priority:** High
**Reported by:** [Tên BA]
**Date:** 13/10/2026

**Environment:** UAT | Browser: Chrome 119 | OS: Windows 11

**Steps to Reproduce:**
1. Đăng nhập với tài khoản test@example.com
2. Thêm sản phẩm có giá 12 triệu vào giỏ
3. Checkout và chọn thanh toán Visa
4. Nhập thông tin thẻ hợp lệ
5. Click "Thanh toán"

**Expected:** Thanh toán thành công, tạo đơn hàng
**Actual:** Hệ thống báo lỗi "Transaction failed" không rõ nguyên nhân

**Screenshot/Video:** [đính kèm]
**Frequency:** Luôn xảy ra (100%)
```

---

## Khi Nào BA Quyết Định Pass hay Fail?

BA là người quyết định cuối cùng trong UAT dựa trên:

### ✅ Pass (chấp nhận)
- Tính năng hoạt động đúng theo acceptance criteria
- Defects nhỏ (low/medium) đã được acknowledged
- Business risk thấp khi go-live

### ❌ Fail (từ chối, yêu cầu fix)
- Tính năng không đáp ứng acceptance criteria
- Có critical/high defect chưa được fix
- Business risk cao nếu đưa lên production

### ⚠️ Conditional Pass (chấp nhận có điều kiện)
- Pass nhưng với danh sách known issues
- Cam kết fix trong sprint tiếp theo
- Phải được stakeholder sign-off

---

## UAT Sign-Off Template

```markdown
# UAT Sign-Off Document

**Project:** [Tên dự án]
**Version:** v1.2.0
**UAT Period:** 01/10/2026 – 10/10/2026

## Kết Quả UAT

| Hạng mục | Số lượng |
|----------|----------|
| Total Test Cases | 87 |
| Passed | 80 |
| Failed | 5 |
| Blocked | 2 |
| Pass Rate | 91.9% |

## Known Issues (Accepted)
| Bug ID | Mô tả | Severity | Dự kiến fix |
|--------|-------|----------|-------------|
| BUG-040 | Typo trên trang cảm ơn | Low | Sprint 5 |
| BUG-041 | Sort sản phẩm chậm khi >1000 items | Medium | Sprint 5 |

## Decision: ✅ GO-LIVE Approved

**Business Analyst:** ____________ Ký: _______ Ngày: _______
**Product Owner:** ______________ Ký: _______ Ngày: _______
**Project Manager:** ____________ Ký: _______ Ngày: _______
```

---

## Sự Khác Biệt Giữa BA và QA

| | Business Analyst | QA Engineer |
|--|-----------------|-------------|
| **Mục tiêu** | Đảm bảo đúng yêu cầu kinh doanh | Đảm bảo chất lượng kỹ thuật |
| **Tạo test cases từ** | Acceptance Criteria (business) | Test design techniques (technical) |
| **Phát hiện** | Sai requirement, thiếu feature | Bug, defect, performance issue |
| **Quyết định** | Pass/Fail UAT | Pass/Fail system/regression test |
| **Báo cáo cho** | Business stakeholders | Dev team, PM |

---

> 💡 **Tip thực tế**: BA giỏi không đợi đến cuối Sprint mới test — hãy **validate ngay** khi dev hoàn thành từng tính năng nhỏ (desk check). Phát hiện sớm = tiết kiệm thời gian cho cả team.
