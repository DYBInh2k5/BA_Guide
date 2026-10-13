# 06 - Tài Liệu BA Tạo Ra

## Tổng Quan Các Loại Tài Liệu

| Tài liệu | Viết tắt | Giai đoạn | Môi trường |
|----------|----------|-----------|------------|
| Business Requirements Document | BRD | Đầu dự án | Waterfall / Agile |
| Functional Requirements Document | FRD | Sau BRD | Waterfall |
| Software Requirements Specification | SRS | Design | Waterfall |
| User Stories + Acceptance Criteria | — | Sprint | Agile |
| Use Case Document | — | Analysis | Waterfall / Agile |
| Process Flow (As-Is / To-Be) | — | Analysis | Cả hai |
| Requirements Traceability Matrix | RTM | Testing | Cả hai |
| Business Case | — | Pre-project | Cả hai |

---

## 1. Business Requirements Document (BRD)

### Là gì?
Tài liệu mô tả **nhu cầu kinh doanh cấp cao** — tại sao dự án tồn tại, mục tiêu là gì, phạm vi là gì.

### Cấu trúc BRD điển hình:
```
1. Executive Summary
2. Business Objectives
3. Project Scope (In-scope / Out-of-scope)
4. Stakeholder List
5. Business Requirements (danh sách BR-001, BR-002...)
6. Constraints & Assumptions
7. Dependencies
8. Glossary
9. Approval Sign-off
```

### Ví dụ Business Requirement:
```
BR-001: Hệ thống phải cho phép khách hàng đặt hàng online
BR-002: Hệ thống phải tích hợp với cổng thanh toán hiện tại
BR-003: Báo cáo doanh thu phải xuất được dưới dạng Excel
```

---

## 2. Functional Requirements Document (FRD)

### Là gì?
Tài liệu mô tả **hệ thống làm gì** — chi tiết các chức năng cần phát triển.

### Cấu trúc FRD:
```
1. Introduction
2. Overall Description
3. Functional Requirements
   - Module 1: User Management
     FR-001: User có thể đăng ký tài khoản
     FR-002: User có thể đăng nhập bằng email/password
   - Module 2: Order Management
     FR-010: User có thể tạo đơn hàng mới
     ...
4. Non-Functional Requirements
5. Interface Requirements (UI, API, Hardware)
6. Constraints
```

### Phân biệt BRD vs FRD:
| | BRD | FRD |
|--|-----|-----|
| **Đối tượng đọc** | C-level, Business stakeholders | Dev, QA, Technical team |
| **Mức độ chi tiết** | Cấp cao | Chi tiết |
| **Ví dụ** | "Cần hệ thống đặt hàng" | "Form đặt hàng gồm các field: tên, địa chỉ, SĐT..." |

---

## 3. User Story

### Format:
```
Title: [Tên ngắn gọn]
As a [loại user],
I want [hành động],
So that [lợi ích].

Acceptance Criteria:
- Given [bối cảnh], When [hành động], Then [kết quả]
- Given [bối cảnh], When [hành động], Then [kết quả]

Priority: Must Have / Should Have / Could Have
Story Points: [1 / 2 / 3 / 5 / 8 / 13]
```

### Ví dụ đầy đủ:
```
Title: Xem lịch sử đơn hàng

As a registered customer,
I want to view my complete order history,
So that I can track past purchases and reorder items easily.

Acceptance Criteria:
- Given I am logged in, When I navigate to "My Orders", 
  Then I see all orders sorted by date (newest first)
- Given I have 50+ orders, When I view order history, 
  Then orders are paginated with 10 per page
- Given I click on an order, When the page loads, 
  Then I see order details including items, price, and status

Priority: Must Have
Story Points: 5
```

---

## 4. Use Case Document

### Khi nào dùng:
- Cần mô tả chi tiết luồng tương tác phức tạp
- Dự án Waterfall cần tài liệu chính thức

### Template:

```markdown
## Use Case: UC-001 — Đặt hàng online

**Actor:** Khách hàng đã đăng nhập
**Goal:** Hoàn thành đơn hàng thành công
**Preconditions:**
- User đã đăng nhập
- Giỏ hàng có ít nhất 1 sản phẩm

**Main Success Scenario:**
1. User vào trang giỏ hàng
2. User xem lại danh sách sản phẩm
3. User nhập địa chỉ giao hàng
4. User chọn phương thức thanh toán
5. User xác nhận đơn hàng
6. Hệ thống tạo order và gửi email xác nhận
7. User được redirect đến trang "Đặt hàng thành công"

**Alternative Flows:**
- 4a. Thanh toán thất bại:
  - 4a.1 Hệ thống hiển thị lỗi
  - 4a.2 User chọn phương thức khác → tiếp tục từ bước 4
- 3a. Địa chỉ không hợp lệ:
  - 3a.1 Hệ thống highlight field lỗi
  - 3a.2 User sửa lại → tiếp tục từ bước 3

**Postconditions:** Đơn hàng được lưu trong DB, email xác nhận được gửi
```

---

## 5. Process Flow Documents (As-Is / To-Be)

### As-Is Process (Quy trình hiện tại):
- Mô tả quy trình đang xảy ra trong thực tế
- Vẽ bằng BPMN hoặc flowchart
- Mục đích: Hiểu vấn đề, tìm bottleneck

### To-Be Process (Quy trình tương lai):
- Mô tả quy trình sau khi cải thiện/có hệ thống mới
- Dựa trên As-Is nhưng đã loại bỏ điểm yếu
- Mục đích: Đây là target state cần đạt được

---

## 6. Requirements Traceability Matrix (RTM)

### Mục đích:
- Đảm bảo mọi yêu cầu đều được implement và test
- Không có yêu cầu nào bị bỏ sót
- Theo dõi trạng thái từng yêu cầu

### Template RTM:

| Req ID | Mô tả yêu cầu | Nguồn | Module | Use Case | Test Case | Status | Ghi chú |
|--------|--------------|-------|--------|----------|-----------|--------|---------|
| BR-001 | Đăng nhập SSO | Stakeholder A | Auth | UC-001 | TC-001, TC-002 | ✅ Done | |
| BR-002 | Xem lịch sử đơn | User research | Orders | UC-005 | TC-010 | 🔵 In Dev | Sprint 3 |
| BR-003 | Export Excel | Manager | Report | UC-008 | TC-020 | ⏳ Pending | Sprint 4 |

---

## 7. Business Case

### Là gì?
Tài liệu thuyết phục ban lãnh đạo **phê duyệt dự án**, bao gồm phân tích lợi ích và chi phí.

### Cấu trúc:
```
1. Executive Summary
2. Problem Statement — Vấn đề hiện tại là gì?
3. Proposed Solution — Giải pháp đề xuất
4. Business Benefits — Lợi ích kỳ vọng (định tính + định lượng)
5. Cost Estimate — Chi phí dự kiến
6. ROI Analysis — Return on Investment
7. Risks — Rủi ro nếu làm / không làm
8. Recommendation — Đề xuất có làm không
9. Timeline
```

---

## Tips Viết Tài Liệu Tốt

- **Rõ ràng, không mơ hồ:** Tránh từ như "nhanh", "dễ dùng" — hãy dùng số: "phản hồi trong < 2 giây"
- **Atomic:** Mỗi requirement chỉ nói về 1 thứ
- **Testable:** Mỗi requirement phải có thể kiểm tra được
- **Consistent:** Dùng cùng thuật ngữ xuyên suốt tài liệu
- **Có version control:** Ghi rõ ngày sửa, người sửa, lý do sửa

---

> 📌 **Nhớ**: Tài liệu BA không phải để "đẹp" hay "nhiều trang" — mà để đội ngũ hiểu đúng và làm đúng. Viết đủ, không viết thừa.
