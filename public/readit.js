$(document).ready(function () {
    let ReadIt = JSON.parse(localStorage.getItem('ReadIt')) || [];

    ReadIt.forEach((item, index) => {
        $('#ReadIt').append(
            `<div class="second-item">
            <div class="block-cover">
                <div class="book__card">
                    <div class="book__card__info">
                        <img src="img/${item.img}" class="img__book" alt="${item.name}"> ${item.name}
                        <button class="removeFromReadIt" data-index="${index}">Удалить</button>
                    </div>
                </div>
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
