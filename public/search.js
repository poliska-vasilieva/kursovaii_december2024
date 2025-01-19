document.querySelector('#book__card__info').oninput = debounce(function () {
    let val = this.value.trim().toLowerCase();
    let cards = document.querySelectorAll('.book__card');

    if (!val) {
        cards.forEach(card => {
            card.style.display = '';
            card.querySelector('.book__card__img').style.display = '';
            removeHighlight(card);
        });
        return;
    }

    let regex = new RegExp(val, 'i');

    cards.forEach(card => {
        let name = card.querySelector('.book__name').innerText.toLowerCase();
        let author = card.querySelector('.book__loginor').innerText.toLowerCase();
        let about = card.querySelector('.book__about').innerText.toLowerCase();
        let image = card.querySelector('.book__card__img');

        if (regex.test(name) || regex.test(author) || regex.test(about)) {
            card.style.display = '';
            image.style.display = '';
            highlightMatch(card.querySelector('.book__name'), regex);
            highlightMatch(card.querySelector('.book__loginor'), regex);
            highlightMatch(card.querySelector('.book__about'), regex);
        } else {
            card.style.display = 'none';
            image.style.display = 'none';
            removeHighlight(card);
        }
    });
}, 300);

function highlightMatch(element, regex) {
    if (!element) return;
    const originalText = element.textContent;
    const highlightedText = originalText.replace(regex, match => `<mark>${match}</mark>`);
    element.innerHTML = highlightedText;
}

function removeHighlight(card) {
    ['.book__name', '.book__loginor', '.book__about'].forEach(selector => {
        const element = card.querySelector(selector);
        if (element) {
            element.innerHTML = element.textContent;
        }
    });
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
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
});

$(document).ready(function () {
    $('.addToReadIt').click(function () {
        const bookName = $(this).data('name');
        const bookLoginor = $(this).data('loginor');
        const bookImage = $(this).data('img');

        let ReadIt = JSON.parse(localStorage.getItem('ReadIt')) || [];

        ReadIt.push({ name: bookName, loginor: bookLoginor, img: bookImage });
        localStorage.setItem('ReadIt', JSON.stringify(ReadIt));
        alert(`${bookName} добавлено в список "Хочу прочесть"`);
    });
});
