/*
    Izlash: http://www.omdbapi.com/?apikey=249e8962&s= + qidiruv kalit so'zi
    Kino haqida ma'lumot: http://www.omdbapi.com/?apikey=249e8962&i= + kino IDsi
*/ 


let search = '';
let allMovies = [];
let movieDetail = {}
let pagination = {
    total: null,        // Hamma kinolar soni - har doim searchFetch'dan keyin yangilanadi
    eachPage: 10,       // Har bitta pagega kino soni - yangilanmaydi
    pagesCount: null,   // Hamma pagelar soni - har doim searchFetch'dan keyin yangilanadi | Math.ceil(pagination.total / pagination.eachPage)
    currentPage: 1,     // Hozir qaysi page'da turibman - $("button.page") bosilganda | pagination.currentPage = $("button.page").attr("data-id") + searchFetch
};

const elMoviesContainer = $('.movies-container');
const elDetailsContainer = $('.details-container');
const elMovies = $('.movies');
const elDetails = $('.details');

$('.form__container').submit(function(evt) {
    evt.preventDefault();
    let inputValue = $('.form__search').val();
    search = inputValue;
    searchFetch();
    $('.form__search').val("");
    $('.form__search').attr('placeholder', search);
});


// function of FETCH
function searchFetch() {
    startLoader()

    // HTTP + DOMAIN + ROUTE + QUERY
    fetch(`http://www.omdbapi.com/?apikey=249e8962&s=${search}&page=${pagination.currentPage}`)
        .then(res => res.json())
        .then(res => {

            endLoader()
            if (!res.Search) {
                alert('This movie is not a found!!!');
                $('.form__search').val('');
                $('.form__search').attr('placeholder', '');
                elDetails.html("");
                return;
            }

            allMovies = res.Search || [];
            generatePagination(parseInt(res.totalResults));
            renderAllMovies()
            renderPagination()
        })
}

function infoFetch(evt) {
    startLoader()

    const element = $(evt.target);
    const index = element.parent().attr('data-id');
    fetch(`http://www.omdbapi.com/?apikey=249e8962&i=${allMovies[index].imdbID}`)
        .then(res => res.json())
        .then(data => {
            endLoader()

            movieDetail = data;
            renderMovieDetail();
        })
}

function goToPage(evt) {
    const element = $(evt.target);
    const index = element.attr('data-id');
    pagination.currentPage = parseInt(index);
    searchFetch()
}

function generatePagination(total) {
    const eachPage = pagination.eachPage;
    const calculate = Math.ceil(total / eachPage);
    pagination.total = total;
    pagination.pagesCount = calculate;
} 


// function of RENDER
function renderAllMovies() {
    elMovies.html("");
    elMoviesContainer.find('> p').text(`All Result: ${allMovies.length}`);
    allMovies.forEach((movie, index) => {
        let html = $(`
            <div class="search-box d-flex justify-content-between" data-id="${index}">
                <h4 class="search__box-title">${movie.Title}</h4>
                <button onclick="infoFetch(event)" class="search__box-info">Info</button>
            </div>
        `)
        elMovies.append(html);
    })
}

function renderMovieDetail() {
    elDetails.html("");
    let html = $(`
        <div class="info-box text-center">
            <img class="poster" src="${movieDetail.Poster == "N/A" ? "./img/not-found.jpg" : movieDetail.Poster}"></img>
            <h4 class="mt-3">Title:  ${movieDetail.Title}</h4>
            <h5>Genre:  ${movieDetail.Genre}</h5>
            <p>Year:  ${movieDetail.Year}</p>
        </div>
    `)
    console.log(movieDetail.Poster.length);

    elDetails.append(html);
}

function renderPagination() {
    $('.pagination').html("");

    for(let i = 1; i <= pagination.pagesCount; i++) {
        const activeClass = i === pagination.currentPage ? "btn-warning" : ""
        let html = $(`
            <div>
                <button
                    onclick="goToPage(event)"
                    class="pagination-btn btn btn-primary ms-2 ${activeClass}"
                    data-id="${i}">${i}
                </button>
            </div>
        `)

        $('.pagination').append(html);
    }
}





function startLoader() {
    $('.loader__container').css('display', 'block');
}
function endLoader() {
    $('.loader__container').css('display', 'none');
}
// function loader() {
//     document.querySelector('.loader__container').classList.add('fade-out');
// }

// function fadeOut() {
//     setInterval(loader, 3000);
// }

// window.onload = fadeOut();