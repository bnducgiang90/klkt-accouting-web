# Quản lý Danh mục Chung

## Tổng quan
Module quản lý danh mục chung bao gồm các tính năng quản lý chi phí trả trước và tài khoản với đầy đủ chức năng CRUD.

## Tính năng chính

### 1. Quản lý Chi phí Trả trước (`dm-chiphi-tratruoc`)

#### Các chức năng:
- **Xem danh sách**: Hiển thị danh sách chi phí trả trước với phân trang
- **Tìm kiếm**: Tìm kiếm theo MST, số hiệu TK, mã kho hoặc tên tài sản
- **Thêm mới**: Thêm chi phí trả trước mới
- **Chỉnh sửa**: Cập nhật thông tin chi phí trả trước
- **Xem chi tiết**: Hiển thị thông tin chi tiết
- **Vô hiệu hóa/Kích hoạt**: Thay đổi trạng thái hoạt động

#### Cấu trúc file:
```
dm-chiphi-tratruoc/
├── index.vue                    # Trang chính
└── components/
    ├── ChiphiTratruocForm.vue   # Form thêm/sửa
    └── ChiphiTratruocDetail.vue # Chi tiết
```

#### Các trường thông tin:
- MST, Số hiệu TK, Mã kho, Mã nhóm
- Mã tài sản, Tên tài sản, Đơn vị tính
- Ngày lập thẻ, Đơn vị quản lý
- Nguồn vốn, Số lượng đầu kỳ
- Đơn giá, Nguyên giá, Hao mòn lũy kế
- Giá trị còn lại, Số tháng phân bổ
- Kỳ phân bổ, TK phân bổ
- Mã kho CT, Mã nhóm CT
- Chi tiết TK phân bổ, Công đoạn sản xuất

### 2. Quản lý Tài khoản (`dm-taikhoan`)

#### Các chức năng:
- **Xem danh sách**: Hiển thị danh sách tài khoản với phân trang
- **Tìm kiếm**: Tìm kiếm theo số hiệu hoặc tên tài khoản
- **Thêm mới**: Thêm tài khoản mới
- **Chỉnh sửa**: Cập nhật thông tin tài khoản (luôn được enable)
- **Xem chi tiết**: Hiển thị thông tin chi tiết
- **Vô hiệu hóa/Kích hoạt**: Thay đổi trạng thái hoạt động

#### Cấu trúc file:
```
dm-taikhoan/
├── index.vue           # Trang chính
└── components/
    ├── AccountForm.vue # Form thêm/sửa
    └── AccountDetail.vue # Chi tiết
```

#### Các trường thông tin:
- MST, Số hiệu TK, Tên tài khoản
- Dư nợ đầu kỳ, Dư có đầu kỳ
- Ghi chú, Trạng thái

## Đặc điểm kỹ thuật

### 1. Giao diện
- Sử dụng Element UI cho giao diện
- Responsive design
- Popup dialog cho form và detail
- Loading state khi xử lý dữ liệu

### 2. Xử lý dữ liệu
- Validation form với rules
- Format số tiền theo định dạng Việt Nam
- Format ngày tháng theo locale Việt Nam
- Xử lý lỗi và hiển thị thông báo

### 3. API Integration
- Sử dụng service từ `@/utils/request`
- Endpoint base: `process.env.VUE_APP_KLKT_APP_BASE_API`
- Table codes:
  - Chi phí trả trước: `tbldmchiphi_tratruoc`
  - Tài khoản: `tbldmtaikhoan`

### 4. Trạng thái
- **Hoạt động**: `trang_thai = 1`
- **Vô hiệu**: `trang_thai = 0`
- Nút Edit luôn được enable
- Nút Disable/Enable thay đổi theo trạng thái

## Hướng dẫn sử dụng

### Thêm mới
1. Click nút "Thêm mới" trên trang chính
2. Điền đầy đủ thông tin bắt buộc
3. Click "Thêm mới" để lưu

### Chỉnh sửa
1. Click nút "Edit" trên dòng cần sửa
2. Chỉnh sửa thông tin
3. Click "Cập nhật" để lưu

### Xem chi tiết
1. Click nút "Detail" trên dòng cần xem
2. Xem thông tin chi tiết trong popup
3. Click "Đóng" để thoát

### Vô hiệu hóa/Kích hoạt
1. Click nút "Disable" hoặc "Enable"
2. Xác nhận trong dialog
3. Hệ thống sẽ thay đổi trạng thái

### Tìm kiếm
1. Nhập từ khóa vào ô tìm kiếm
2. Click "Search" hoặc nhấn Enter
3. Kết quả sẽ được lọc theo từ khóa

## Lưu ý
- Tất cả các thao tác đều có xác nhận trước khi thực hiện
- Form validation đảm bảo dữ liệu hợp lệ
- Loading state hiển thị trong quá trình xử lý
- Thông báo thành công/lỗi rõ ràng
- Phân trang tự động cập nhật khi có thay đổi dữ liệu 