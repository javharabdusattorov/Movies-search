
$('form.search-form').submit(function(evt) {
    evt.preventDefault();
    $('.header-things h2').text('Movies App');
    let inputValue = $('.form__search').val();
    search = inputValue;
    searchFetch();
    $('.form__search').val("");
    $('.form__search').attr('placeholder', search);
});

let typed = new Typed(".auto-type", {
    strings: ["Search your movie,", " Then click like", "and Watch it in LIKE movies", "THEN enjoy!!!"],
    typeSpeed: 130,
    backSpeed: 70,
    loop: true
})