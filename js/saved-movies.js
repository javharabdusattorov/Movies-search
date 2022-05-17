elCountOfLikes.text(likeMovies.length);

elBtnOfLikePage.on('click', function() {
    renderLikeMovies();
})

function clickedLike(evt) {
    if (!isMovieLiked()) {
        likeMovies.push(movieDetail);
    }
    else {
        const index = likeMovies.findIndex( movie => movie.imdbID === movieDetail.imdbID);
        likeMovies.splice(index, 1);
    }

    likeMoviesInfo()
    renderMovieDetail()
    isMovieLiked()
}
 
function isMovieLiked() {
    return likeMovies.some(movie => movie.imdbID === movieDetail.imdbID);
}

elLike_container.hide();
function renderLikeMovies() {
    elLike_container.find('.likee-movies').html("");
    elSearch_container.slideUp();
    elLike_container.slideDown(500);
    likeMovies.forEach( (movies, index) => {
        let html = $(`
        <div class="liked-box text-center mt-4 mb-2 position-relative">
            <img src="${movies.Poster == "N/A" ? "./img/not-found.jpg" : movies.Poster}"></img>
            <button class="remove_save-movie"><i data-id="${index}" onclick="removeLikeMovies(event)" class="fas fa-backspace"></i></button>
            <div class="liked__box-detail">
                <h4>Title:  ${movies.Title}</h4>
                <h5>Genre:  ${movies.Genre}</h5>
                <p>Year:  ${movies.Year}</p>
            </div>
        </div>    
        `)
        $('.liked-container .likee-movies').append(html);
    })
}

// function of delete Movies
function removeLikeMovies(evt) {
    const element = $(evt.target);
    const index = element.attr('data-id');
    likeMovies.splice(index, 1);

    renderLikeMovies()
    likeMoviesInfo()
}

function likeMoviesInfo() {
    $('.like p').text(likeMovies.length);
    localStorage.setItem('like', JSON.stringify(likeMovies));
}

// function of next & prev
elComeBack.on('click', function() {
    $('.search-container').show(500);
    $('.liked-container').hide();
})