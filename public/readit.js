$(document).ready(function () {
    let ReadIt = JSON.parse(localStorage.getItem('ReadIt')) || [];

    ReadIt.forEach((item, index) => {
        $('#ReadIt').append(
            `<div class="book__card__readit">
                <div class="book__card__info__readit">
                    ${item.name} </br> ${item.loginor}
                    <button class="removeFromReadIt" data-index="${index}">Удалить</button>
                </div>
            </div>`
        );
    });

    if (ReadIt.length === 0) {
        $('#ReadIt').append('<p>Книги не добавлены</p>');
    }

    $('#ReadIt').on('click', '.removeFromReadIt', function () {
        const index = $(this).data('index');
        ReadIt.splice(index, 1);

        localStorage.setItem('ReadIt', JSON.stringify(ReadIt));

        $(this).closest('li').remove();

        if (ReadIt.length === 0) {
            $('#ReadIt').empty().append('<p>Книги не добавлены</p>');
        }
    });
});
