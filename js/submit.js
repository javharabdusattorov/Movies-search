
$('form.search-form').submit(function(evt) {
    evt.preventDefault();
    let inputValue = $('.form__search').val();
    search = inputValue;
    searchFetch();
    $('.form__search').val("");
    $('.form__search').attr('placeholder', search);
});