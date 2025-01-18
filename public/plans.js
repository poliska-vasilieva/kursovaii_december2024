$(document).ready(function () {
    let Plans = JSON.parse(localStorage.getItem('Plans')) || [];

    Plans.forEach((item, index) => {
        $('#Plans').append(
            `<li class="second-item">
            <div class="block-cover">
                <div class="book__card">
                    <div class="book__card__info">
                        <img src="img/${item.img}" class="img__book" alt="${item.name}"> ${item.name}
                        <button class="removeFromPlans" data-index="${index}">Удалить</button>
                    </div>
                </div>
            </div>
            </li>`
        );
    });

    if (Plans.length === 0) {
        $('#Plans').append('<li>Книги не добавлены</li>');
    }

    $('#Plans').on('click', '.removeFromPlans', function () {
        const index = $(this).data('index');
        Plans.splice(index, 1);

        localStorage.setItem('Plans', JSON.stringify(Plans));

        $(this).closest('li').remove();

        if (Plans.length === 0) {
            $('#Plans').empty().append('<li>Книги не добавлены</li>');
        }
    });
});
