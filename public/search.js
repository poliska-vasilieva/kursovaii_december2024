document.querySelector('#book__card__info').oninput = function () {
    let val = this.value.trim();
    let bookCardInfoItems = document.querySelectorAll('.book__card__info p');

    if (val !== '') {
        bookCardInfoItems.forEach(function (elem) {
            let text = elem.innerText.toLowerCase();
            let searchVal = val.toLowerCase();

            if (text.search(searchVal) === -1) {
                elem.classList.add('hide');
                elem.innerHTML = elem.innerText; // Восстановление оригинального текста
            } else {
                elem.classList.remove('hide');
                let str = elem.innerText;
                elem.innerHTML = insertMark(str, text.search(searchVal), val.length);
            }
        });
    } else {
        bookCardInfoItems.forEach(function (elem) {
            elem.classList.remove('hide');
            elem.innerHTML = elem.innerText; // Восстановление оригинального текста
        });
    }
}

function insertMark(string, pos, len) {
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
}