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