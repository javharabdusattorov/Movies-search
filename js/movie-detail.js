
function renderMovieDetail() {
    elDetails.html("");
    elDetailsContainer.find('> h4').text(`${movieDetail.Title} info`)
    const likedClass = isMovieLiked() ? "fas fa-heart" : "far fa-heart"

    let html = $(`
        <div class="info-box text-center position-relative">
            <img class="poster" src="${movieDetail.Poster == "N/A" ? "./img/not-found.jpg" : movieDetail.Poster}"></img>
            <button type="button" class="clickLike"><i onclick="clickedLike(event)" class="${likedClass}"></i></button>
            <div class="movie__detail-bottom">
                <h4>Title:  ${movieDetail.Title}</h4>
                <h5>Genre:  ${movieDetail.Genre}</h5>
                <p>Year:  ${movieDetail.Year}</p>
            </div>
        </div>
    `)

    elDetails.append(html);
}

function infoFetch(evt) {
    startLoader()

    const element = $(evt.target);
    const index = element.parent().attr('data-id');
    fetch(`${API_URL}/?apikey=249e8962&i=${allMovies[index].imdbID}`)
        .then(res => res.json())
        .then(data => {
            endLoader()

            movieDetail = data;
            renderMovieDetail();
        })
}
