function kiemTraRong(value, selectorError, name) {
    //.trim(): Loại bỏ khoảng trống đầu và cuối của chuỗi
    //      abc     =>  abc
    if (value.trim() !== '') {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + 'không được bỏ trống !';
    return false;
}

function kiemTraKySo(value, selectorError, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + 'tất cả là số  !';
    return false;
}

function kiemTraTatCaKyTu(value, selectorError, name) {
    var regexLetter = /^[A-Za-z]+$/;
    if (regexLetter.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + 'tất cả là chữ  !';
    return false;
}

function kiemTraDoDai(value, selectorError, name, minLength, maxlength) {
    var lengthValue = value.length;
    if (length > maxlength || lengthValue < minLength) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minLength + ' đến ' + maxlength;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
}

function kiemTraMatKhau(value, selectorError, name) {
    var regexMatKhau = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    if (regexMatKhau.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + 'bao gồm: chữ hoa, số và ký tự đặc biệt !';
    return false;

}
function kiemTraEmail(value, selectorError, name) {
    var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexEmail.test(value)) {
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    document.querySelector(selectorError).innerHTML = name + 'không đúng định dạng !';
    return false;
}

function kiemTraGiaTri(value, selectorError, name, minValue, maxValue) {
    value = Number(value);
    if (value > maxValue || value < minValue) {
        document.querySelector(selectorError).innerHTML = name + ' từ ' + minValue + ' đến ' + maxValue;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}

// function kiemTraNgay (value, selectorError, name) {
//     var regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
//     if(regexDate.test(value)) {
//         document.querySelector(selectorError).innerHTML = '';
//         return true;
//     }
//     document.querySelector(selectorError).innerHTML = name + 'không đúng định dạng ngày !';
//     return false;

// }
// function kiemTraChucVu(value, selectorError, name) {
//     var regexChucVu = document.querySelector('#chucvu').value;
//     if (regexChucVu.test(value)) {
//         document.querySelector(selectorError).innerHTML = '';

//         return true;
//     }
//     document.querySelector(selectorError).innerHTML = name + 'không đúng!';
//     return false;
// }