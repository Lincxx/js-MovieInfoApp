$(document).ready(() =>{
    $('#searchForm').on('submit', (e) =>{
        e.preventDefault();
        let searchText = $('#searchText').val();
        getMoives(searchText);
    })
});

function getMoives(searchText){
    console.log(searchText);
    axios.get('https://api.themoviedb.org/3/search/movie?api_key={API KEY GOES HERE}&query=' + searchText)
        .then((response) => {
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) =>{
                output += `
                    <div class=col-md-3>
                        <div class="well text-center">
                            <img src=" http://image.tmdb.org/t/p/w185/${movie.poster_path}">
                            <h5>${movie.title}</h5>
                            <a onclick="moiveSelected('${movie.id}')" class="btn btn-primary" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output)
        })
        .catch((err) => {
            console.log(err);
        });
}

function moiveSelected(id, movieTitle) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMoive(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key={API KEY GOES HERE}')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}" class="tumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.title}</h2>
                    <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong> ${movie.genres[0].name}</li>
                    <li class="list-group-item"><strong>Release Date:</strong> ${movie.release_date}</li>
                    <li class="list-group-item"><strong>Run Time:</strong> ${movie.runtime}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <h3>Plot</h3>
                ${movie.overview}
                <hr>
                <a href="${movie.homepage}" target="_blank" class="btn btn-primary">Movie Site</a>
                <a href="index.html" class="btn btn-primary">Go Back To Search</a>
            </div>
            `;
            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}
