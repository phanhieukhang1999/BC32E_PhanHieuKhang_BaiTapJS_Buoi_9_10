var mangNhanVien = [];

document.querySelector('#btnThemNV').onclick = function () {
    //Tạo đối tượng
    var nv = new NhanVien();
    console.log(nv);

    //Lấy thông tin người dùng
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;
    var ngayLam = document.querySelector('#datepicker').value;
    nv.ngayLam = moment(ngayLam).format('MM-DD-YYYY');
    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    //Kiểm tra dữ liệu nhân viên có hợp lệ hay không ?
    /*-------------- Kiểm tra rỗng------------------ */
    var valid = true; //mặc định form là hợp lệ

    valid = kiemTraRong(nv.taiKhoan, '#error_required_taiKhoan', 'Tài khoản ') &
        kiemTraRong(nv.hoTen, '#error_required_hoTen', 'Họ và tên ') &
        kiemTraRong(nv.email, '#error_required_Email', 'Email ') &
        kiemTraRong(nv.matKhau, '#error_required_matKhau', 'Mật khẩu ') &
        kiemTraRong(nv.luongCB, '#error_required_luongCB', 'Lương cơ bản ') &
        kiemTraRong(nv.gioLam, '#error_required_gioLam', 'Giờ làm ');

    valid &= kiemTraTatCaKyTu(nv.hoTen, '#error_allLetter_hoTen', 'Họ và tên ');

    valid &= kiemTraKySo(nv.taiKhoan, '#error_allLetter_taiKhoan', 'Tài khoản ') &
        kiemTraKySo(nv.luongCB, '#error_allLetter_luongCB', 'Lương cơ bản ') &
        kiemTraKySo(nv.gioLam, '#error_allLetter_gioLam', 'Giờ làm ') &
        kiemTraEmail(nv.email, '#error_Email', 'Email');

    valid &= kiemTraDoDai(nv.taiKhoan, '#error_max_min_length_taiKhoan', 'Tối đa ', 4, 6) & kiemTraDoDai(nv.matKhau, '#error_max_min_length_matKhau', 'Mật khẩu ', 6, 10) &
        kiemTraMatKhau(nv.matKhau, '#error_matKhau', 'Mật khẩu ');

    // valid &= kiemTraChucVu(nv.chucVu, '#error_chucVu', 'Chức vụ ');

    valid &= kiemTraGiaTri(nv.luongCB, '#error_min_max_value_luongCB', 'Lương CB ', 1000000, 20000000) &
        kiemTraGiaTri(nv.gioLam, '#error_min_max_value_gioLam', 'Giờ làm ', 80, 200)



    // if(!valid) {
    //     return;
    // };

    //Mỗi lần bấm thêm sinh viên sẽ đưa object sinh viên vào mangSinhVien
    mangNhanVien.push(nv);
    console.log('mangNhanVien', mangNhanVien);

    //Gọi hàm từ mảng sinh viên tạo ra html cho table
    renderTableNhanVien(mangNhanVien);

    //Gọi hàm lưu mảng sinh viên vào localStorage
    luuLocalStorage();



    {
        // //Tạo thẻ = js
        // var trNhanVien = document.createElement('tr');
        // //Dom đến 1 thẻ có sẵn trên giao diện (tbody nhúng thẻ tr vào)
        // document.querySelector('#tableDanhSach').appendChild(trNhanVien);
        // //Tạo các thẻ td
        // var tdTaiKhoan = document.createElement('td');
        // tdTaiKhoan.innerHTML = nv.taiKhoan;

        // var tdHoTen = document.createElement('td');
        // tdHoTen.innerHTML = nv.hoTen;

        // var tdEmail = document.createElement('td');
        // tdEmail.innerHTML = nv.email;

        // var tdNgayLam = document.createElement('td');
        // tdNgayLam.innerHTML = nv.ngayLam;

        // var tdChucVu = document.createElement('td');
        // tdChucVu.innerHTML = nv.chucVu;

        // var tdTongLuong = document.createElement('td');
        // tdTongLuong.innerHTML = nv.tinhTongLuong();

        // var tdXepLoai = document.createElement('td');
        // tdXepLoai.innerHTML = nv.xepLoai();

        // //Nhúng thẻ thẻ td vào tr
        // trNhanVien.appendChild(tdTaiKhoan);
        // trNhanVien.appendChild(tdHoTen);
        // trNhanVien.appendChild(tdEmail);
        // trNhanVien.appendChild(tdNgayLam);
        // trNhanVien.appendChild(tdChucVu);
        // trNhanVien.appendChild(tdTongLuong);
        // trNhanVien.appendChild(tdXepLoai);
    }
}

function renderTableNhanVien(arrNhanVien) {
    var html = '';
    for (var index = 0; index < arrNhanVien.length; index++) {

        var nv = arrNhanVien[index];
        nv.tinhTongLuong = function () {
            var tongLuong = 0;
            if (this.chucVu == 'Sếp') {
                tongLuong = Number(this.luongCB * 3);
            } else if (this.chucVu == 'Trưởng phòng') {
                tongLuong = Number(this.luongCB * 2);
            } else if (this.chucVu == 'Nhân viên') {
                tongLuong = Number(this.luongCB);
            } else {
                tongLuong = 'Mời chọn chức vụ !'
            }
            return tongLuong;
        }
        nv.xepLoai = function () {
            var loai = '';
            if (this.gioLam >= 192) {
                loai = 'Xuất sắc!'
            } else if (this.gioLam >= 176) {
                loai = 'Giỏi!';
            } else if (this.gioLam >= 160) {
                loai = 'Khá!';
            } else if (this.gioLam < 160) {
                loai = 'Trung bình!'
            } else {
                loai = 'Chưa xếp loại !'
            }
            return loai;
        }

        //Tạo ra 1 chuỗi html tr và đưa vào output

        html += `
                <tr>
                    <td>${nv.taiKhoan}</td>
                    <td>${nv.hoTen}</td>
                    <td>${nv.email}</td>
                    <td>${nv.ngayLam}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.tinhTongLuong()}</td>
                    <td>${nv.xepLoai()}</td>
                    <td>
                        <button class ="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
                        <button class ="btn btn-primary" id="btnThem"
                        data-toggle="modal"
                        data-target="#myModal" onclick="chinhSua('${nv.taiKhoan}')">Edit</button>
                    </td>
    
                </tr>
            
            `;
    }

    document.querySelector('#tableDanhSach').innerHTML = html;
    return html;
}



function chinhSua(maNhanVienClick) {
    //Tìm ra vị trí của nhân viên được click trong mảng
    var indexEdit = mangNhanVien.findIndex(nv => nv.taiKhoan === maNhanVienClick);

    //Lấy ra thông tin sinh viên tại vị trí đó
    var nvEdit = mangNhanVien[indexEdit];
    console.log('nvEdit', nvEdit);

    //Khóa lại tài khoản
    document.querySelector('#tknv').disabled = true;
    //Gán giá trị lên giao diện
    document.querySelector('#tknv').value = nvEdit.taiKhoan;
    document.querySelector('#name').value = nvEdit.hoTen;
    document.querySelector('#email').value = nvEdit.email;
    document.querySelector('#password').value = nvEdit.matKhau;
    document.querySelector('#datepicker').value = nvEdit.ngayLam;
    document.querySelector('#luongCB').value = nvEdit.luongCB;
    document.querySelector('#chucvu').value = nvEdit.chucVu;
    document.querySelector('#gioLam').value = nvEdit.gioLam;
}

document.querySelector('#btnCapNhat').onclick = function () {
    var nv = new NhanVien();
    console.log(nv);

    //Lấy thông tin người dùng
    nv.taiKhoan = document.querySelector('#tknv').value;
    nv.hoTen = document.querySelector('#name').value;
    nv.email = document.querySelector('#email').value;
    nv.matKhau = document.querySelector('#password').value;

    var ngayLam = document.querySelector('#datepicker').value;
    nv.ngayLam = moment(ngayLam).format('MM-DD-YYYY');

    nv.luongCB = document.querySelector('#luongCB').value;
    nv.chucVu = document.querySelector('#chucvu').value;
    nv.gioLam = document.querySelector('#gioLam').value;

    //Tìm ra thằng trong mảng chỉnh sửa
    var indexEdit = mangNhanVien.findIndex(nhanVien => nhanVien.taiKhoan === nv.taiKhoan);

    mangNhanVien[indexEdit].hoTen = nv.hoTen;
    mangNhanVien[indexEdit].email = nv.email;
    mangNhanVien[indexEdit].matKhau = nv.matKhau;
    mangNhanVien[indexEdit].luongCB = nv.luongCB;
    mangNhanVien[indexEdit].chucVu = nv.chucVu;
    mangNhanVien[indexEdit].gioLam = nv.gioLam;

    //Tạo lại mảng nhân viên mới sau khi thay đổi
    renderTableNhanVien(mangNhanVien);
    //Mở lại nút mã nhân viên
    document.querySelector('#tknv').disabled = false;

    //Lưu localstorage sau khi sửa
    luuLocalStorage();


}

function xoaNhanVien(maNhanVienClick) {
    var indexDel = mangNhanVien.findIndex(
        nhanVien => nhanVien.taiKhoan === maNhanVienClick
    );
    if (indexDel !== 1) {
        mangNhanVien.splice(indexDel, 1)
    }

    renderTableNhanVien(mangNhanVien);


    luuLocalStorage(mangNhanVien)
}


function timKiemTheoLoai() {
    var loai = document.querySelector('#chonNhanVien').value;
    var arrXepLoai = document.querySelectorAll('#tableDanhSach td:nth-child(7)');
    var html = '';

    for (var index = 0; index < arrXepLoai.length; index++) {
        var table = `
                <tr>
                    <td>${nv.taiKhoan}</td>
                    <td>${nv.hoTen}</td>
                    <td>${nv.email}</td>
                    <td>${nv.ngayLam}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.tinhTongLuong()}</td>
                    <td>${nv.xepLoai()}</td>
                    <td>
                        <button class ="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
                        <button class ="btn btn-primary" id="btnThem"
                        data-toggle="modal"
                        data-target="#myModal" onclick="chinhSua('${nv.taiKhoan}')">Edit</button>
                    </td>
    
                </tr>
            
            `;
        if (arrXepLoai === ('Xuất sắc!')) {
            arrXepLoai = html;
            html += table;
        } else if (arrXepLoai === 'Giỏi!') {
            arrXepLoai = html;
            html += table;
        } else if (arrXepLoai === 'Khá!') {
            arrXepLoai = html;
            html += table;
        } else if (arrXepLoai === 'Trung bình!') {
            arrXepLoai = html;
            html += table;
        } else {
            html = 'Ko tìm thấy!'
        }
        document.querySelector('#tableDanhSach').innerHTML = html;
        return html;
    }
}
    document.querySelector('#btnTimNV').onclick = timKiemTheoLoai;




function luuLocalStorage() {

    //Biến đổi mảng thành => string
    var sMangNhanVien = JSON.stringify(mangNhanVien)
    //Sau đó dùng string lưu vào localstorage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

function layLocalStorage() {
    //check xem storage có dữ liệu đó hay không
    if (localStorage.getItem('mangNhanVien')) {
        //Lấy ra

        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        //Lấy mangNhanVien gán = chuỗi được lấy từ localstorage ra (phải dùng hàm JSON.parse để chuyển về mảng lại)
        mangNhanVien = JSON.parse(sMangNhanVien);

        //Tạo ra table sinh viên từ mảng
        renderTableNhanVien(mangNhanVien);
    }
}

//Gọi hàm lấy localstorage khi trang vừa load
window.onload = function () {
    //Browser vừa load lên làm gì thì sẽ code ở đây
    layLocalStorage();
}


