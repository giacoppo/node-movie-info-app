$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    var apiKey = '&apikey=thewdb';
    axios.get('http://www.omdbapi.com?s=' + searchText + apiKey)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                        <div class="card card-body text-center mb-4">
                            <img src="${movie.Poster}">
                            <h6>${movie.Title}</h6>
                            <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
            $('#movies').html(noMovie);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie';
    return false;
}

function getMovie() {
    var apiKey = '&apikey=thewdb';
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i=' + movieId + apiKey)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="img-thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="container">
                        <div class="">
                            <h3>Plot</h3>
                            ${movie.Plot}
                        </div>
                        <hr class="hr-light">
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View iMDB</a>
                        <a href="/" class="btn btn-secondary">Go Back To Search</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}