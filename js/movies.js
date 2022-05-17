
// function of FETCH
function searchFetch() {
    startLoader()

    // HTTP + DOMAIN + ROUTE + QUERY
    fetch(`${API_URL}/?apikey=249e8962&s=${search}&page=${pagination.currentPage}`)
        .then(res => res.json())
        .then(res => {

            endLoader()
            if (!res.Search) {
                removeHTML()
                return;
            }

            allMovies = res.Search || [];
            generatePagination(parseInt(res.totalResults));
            renderAllMovies()
            renderPagination()
        })
}

function renderAllMovies() {
    elMovies.html("");
    elMoviesContainer.find('> h4').text(`All Result: ${allMovies.length}`);
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

function removeHTML() {
    alert('This movie is not a found!!!');
    $('.form__search').val('');
    $('.form__search').attr('placeholder', 'Movie name');
    elMovies.html("");
    elDetails.html("");
    pagination.total = null;
    pagination.eachPage = 10;
    pagination.pagesCount = null;
    pagination.currentPage = 1;
    renderPagination()
    elMoviesContainer.find('> h4').text('Seach results');
    elDetailsContainer.find('> h4').text('Movie info');
}

// function of PAGINATION
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

elBtnReflash.on('click', function() {
    $('.form__search').val('');
    $('.form__search').attr('placeholder', 'Movie name');
    elMovies.html("");
    elDetails.html("");
    pagination.total = null;
    pagination.eachPage = 10;
    pagination.pagesCount = null;
    pagination.currentPage = 1;
    renderPagination()
    elMoviesContainer.find('> h4').text('Seach results');
    elDetailsContainer.find('> h4').text('Movie info');
})