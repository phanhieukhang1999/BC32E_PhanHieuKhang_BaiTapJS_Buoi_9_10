function NhanVien() {
    this.taiKhoan = '';
    this.hoTen = '';
    this.email = '';
    this.matKhau = '';
    this.ngayLam = '';
    this.luongCB = 0;
    this.chucVu = '';
    this.gioLam = 0;
    this.tinhTongLuong = function() {
        var tongLuong = 0;
        if(this.chucVu == 'Sếp') {
            tongLuong = Number(this.luongCB * 3);
        }else if(this.chucVu == 'Trưởng phòng') {
            tongLuong = Number(this.luongCB * 2);
        }else if(this.chucVu == 'Nhân viên'){
            tongLuong = Number(this.luongCB);
        }else {
            tongLuong = 'Mời chọn chức vụ !'
        }
        return tongLuong;
    }

    this.xepLoai = function() {
        var loai = '';
        if(this.gioLam >= 192) {
            loai = 'Xuất sắc!'
        } else if(this.gioLam >= 176) {
            loai = 'Giỏi!';
        } else if(this.gioLam >= 160) {
            loai = 'Khá!';
        } else {
            loai = 'Trung bình!'
        }
        return loai;
    }
}