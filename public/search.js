document.querySelector('#book__card__info').oninput = function () {
    let val = this.value.trim().toLowerCase(); // Сразу приводим к нижнему регистру
    // let bookCardItems = document.querySelectorAll('.book__card__info'); // Все карточки
    let cards = document.querySelectorAll('.book__card')

    for (let i = 0; i < cards.length; i++) {
        let isMatch = false
        let name = cards[i].querySelector('.book__name').innerText
        let author = cards[i].querySelector('.book__loginor').innerText
        let about = cards[i].querySelector('.book__about').innerText


        if (name.toLowerCase().includes(val)) {
            isMatch = true
            insertMark(name, name.toLowerCase().indexOf(val), val.length)
        }
        else if (author.toLowerCase().includes(val)) {
            isMatch = true
            insertMark(author, author.toLowerCase().indexOf(val), val.length)
        }
        else if (about.toLowerCase().includes(val)) {
            isMatch = true
            insertMark(about, about.toLowerCase().indexOf(val), val.length)
        }

        if (!isMatch) {
            cards[i].classList.add('hide')
        } else {
            cards[i].classList.remove('hide')
        }

    }

    // bookCardItems.forEach(function (card) {

    //     let blocks = card.querySelectorAll('p'); // Все текстовые блоки в карточке
    //     let hasMatch = false; // Флаг для проверки наличия совпадений

    //     blocks.forEach(function (block) {
    //         let text = block.innerText.toLowerCase(); // Текст блока в нижнем регистре

    //         if (val !== '' && text.includes(val)) {
    //             hasMatch = true; // Нашли совпадение
    //             block.classList.remove('hide');

    //             let startPos = text.indexOf(val); // Индекс найденного текста
    //             block.innerHTML = insertMark(block.innerText, startPos, val.length);
    //         } else {
    //             // block.classList.add('hide');
    //             block.innerHTML = block.innerText; // Восстанавливаем исходный текст
    //         }
    //     });

    //     // Если совпадений нет ни в одном из блоков, скрываем всю карточку
    //     if (hasMatch) {
    //         card.classList.remove('hide');
    //     } else {
    //         card.classList.add('hide');
    //     }
    // });

    // Если поле ввода пустое, показываем все карточки и блоки
    // if (val === '') {
    //     bookCardItems.forEach(function (card) {
    //         card.classList.remove('hide');
    //         let blocks = card.querySelectorAll('p');
    //         blocks.forEach(function (block) {
    //             block.classList.remove('hide');
    //             block.innerHTML = block.innerText; // Восстанавливаем исходный текст
    //         });
    //     });
    // }
};

function insertMark(string, pos, len) {
    return (
        string.slice(0, pos) +
        '<mark>' +
        string.slice(pos, pos + len) +
        '</mark>' +
        string.slice(pos + len)
    );
}


$(document).ready(function () {
    $('.addToPlans').click(function () {
        const bookName = $(this).data('name');
        const bookLoginor = $(this).data('loginor');
        const bookImage = $(this).data('img');

        let Plans = JSON.parse(localStorage.getItem('Plans')) || [];

        Plans.push({ name: bookName, loginor: bookLoginor, img: bookImage });
        localStorage.setItem('Plans', JSON.stringify(Plans));
        alert(`${bookName} добавлено в список "Хочу прочесть"`);
    });
})