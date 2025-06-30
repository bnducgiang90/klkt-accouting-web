# Quản lý Khách hàng

## Tổng quan
Module quản lý khách hàng cho phép thực hiện các thao tác CRUD (Create, Read, Update, Delete) với dữ liệu khách hàng.

## Các tính năng chính

### 1. Danh sách khách hàng
- Hiển thị danh sách khách hàng dạng bảng
- Tìm kiếm theo MST, MST KH NCC hoặc tên công ty
- Phân trang
- Hiển thị trạng thái hoạt động/vô hiệu

### 2. Thêm mới khách hàng
- Form popup với các trường thông tin:
  - MST (bắt buộc)
  - MST KH NCC
  - Tên công ty (bắt buộc)
  - Dư nợ, Dư có
  - Địa chỉ (bắt buộc)
  - Huyện, Tỉnh
  - Điện thoại
  - Tên giám đốc, Tên kế toán
  - Lĩnh vực kinh doanh
  - Khách hàng (switch)
  - Nhà cung cấp (switch)
  - Tài khoản, Ngân hàng
  - Cấp

### 3. Chỉnh sửa khách hàng
- Form popup tương tự thêm mới
- Tự động điền dữ liệu hiện tại
- Validation các trường bắt buộc

### 4. Xem chi tiết khách hàng
- Dialog hiển thị đầy đủ thông tin khách hàng
- Layout dạng descriptions với 2 cột
- Hiển thị trạng thái bằng tag màu

### 5. Vô hiệu hóa/Kích hoạt khách hàng
- Confirm dialog trước khi thực hiện
- Thay đổi trạng thái từ hoạt động sang vô hiệu và ngược lại
- Button tự động thay đổi text và màu sắc theo trạng thái

## Cấu trúc file

```
dm-khachhang/
├── index.vue                 # Component chính
└── components/
    ├── CustomerForm.vue      # Form thêm/sửa khách hàng
    └── CustomerDetail.vue    # Dialog chi tiết khách hàng
```

## API Endpoints

- `POST /dm/search` - Tìm kiếm khách hàng
- `POST /dm/create` - Tạo mới khách hàng
- `PUT /dm/update` - Cập nhật khách hàng

## Sử dụng

### Import components
```javascript
import CustomerForm from './components/CustomerForm.vue';
import CustomerDetail from './components/CustomerDetail.vue';
```

### Props cho CustomerForm
- `visible`: Boolean - Hiển thị/ẩn dialog
- `isEdit`: Boolean - Chế độ chỉnh sửa
- `customerData`: Object - Dữ liệu khách hàng (cho edit)

### Events cho CustomerForm
- `success`: Khi lưu thành công
- `close`: Khi đóng dialog

### Props cho CustomerDetail
- `visible`: Boolean - Hiển thị/ẩn dialog
- `customerData`: Object - Dữ liệu khách hàng

### Events cho CustomerDetail
- `close`: Khi đóng dialog

## Validation

### Trường bắt buộc
- MST
- Tên công ty
- Địa chỉ

### Format dữ liệu
- Dư nợ, Dư có: Số nguyên
- Cấp: Số nguyên từ 1-10
- Khách hàng, Nhà cung cấp: Boolean

## Responsive
- Dialog width: 800px
- Table responsive với scroll ngang
- Font size tự động điều chỉnh theo màn hình 