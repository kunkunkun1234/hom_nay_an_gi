let listDishes = {};

$(document).ready(function() {
    listDishes = new Dishes();
    getData();

    $('body').on('click', '.btn-primary', function() {
        $(this).prop('disabled', true);

        let time = 0;
        getRandomDish(time);

        $(this).prop('disabled', false);
    });
});

function getRandomDish(time) {

    let item = listDishes.getRandom();

    if ($.isEmptyObject(item)) return;

    $('#DishName').text('Để xem hôm nay ăn gì nào...');

    if ($(`img[data-id=${item.id}]`).length === 0) {
        $('#ListImage').append(`<img src="${item.image}" data-id="${item.id}" width="800" height="600" />`);
    }

    $(`img`).hide();
    $(`img[data-id=${item.id}]`).show();

    if (time > 600) {

        if ($(`.bg-blur[data-id=${item.id}]`).length === 0) {
            $('#BackgroundSection').append(`<div class="position-relative w-100 vh-100 bg-blur" data-id="${item.id}" style='background-image: url("${item.image}");'></div>`);
        }

        $(`.bg-blur`).hide();
        $(`.bg-blur[data-id=${item.id}]`).show();
        $('#DishName').text(item.name);
        return;
    }

    time = (time + 20) * 1.1;
    setTimeout(getRandomDish.bind(null, time), time);

    return;
}

function getData() {
    const url = "https://my-json-server.typicode.com/kunkunkun1234/Hom_nay_an_gi_db/db";
    $.get(url, function(data) {
        if ($.isEmptyObject(data.dishes))
            return alert('Fail to load data!');

        data.dishes.forEach(element => listDishes.push(Object.assign(new Dish(), element)));
    });
};