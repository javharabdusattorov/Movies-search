
// Variables
let search = '';
let allMovies = [];
let likeMovies = JSON.parse(localStorage.getItem("like")) || [];
let libraryMovies = [];
let movieDetail = {}
let pagination = {
    total: null,        // Hamma kinolar soni - har doim searchFetch'dan keyin yangilanadi
    eachPage: 10,       // Har bitta pagega kino soni - yangilanmaydi
    pagesCount: null,   // Hamma pagelar soni - har doim searchFetch'dan keyin yangilanadi | Math.ceil(pagination.total / pagination.eachPage)
    currentPage: 1,     // Hozir qaysi page'da turibman - $("button.page") bosilganda | pagination.currentPage = $("button.page").attr("data-id") + searchFetch
};

// Constantas
const API_URL = 'https://www.omdbapi.com'

// Elements
const elMoviesContainer = $('.movies-container');
const elDetailsContainer = $('.details-container');
const elMovies = $('.movies');
const elDetails = $('.details');
const elCountOfLikes = $('.like p');
const elBtnOfLikePage = $('.like i');
const elBtnReflash = $('.reflash i');
const elComeBack = $('.come_back i');
const elLike_container = $('.liked-container');
const elSearch_container = $('.search-container');
