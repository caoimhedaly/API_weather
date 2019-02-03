let xhr = new XMLHttpRequest();

let APIKEY = "1bf03af2";


function submitTitle() {
    let Title = document.getElementById("TitleForm")["Title"].value;
    xhr.open("GET", 'https://www.omdbapi.com/?apikey=' + APIKEY + '&s=' + Title);


    xhr.send();
}





function displayNicely(apiData) {
    apiData = JSON.parse(apiData);
    console.log(apiData);
    let movies = apiData.Search;
    let output = "";

    for (let i in movies) {
        
        output += `<div class = 'col-sm-12 col-md-3'>
        <div class = 'well text-center'>
        <img src = "${movies[i].Poster}">
        <h5>${movies[i].Title}</h5>
        <a onclick = "movieSelected('${movies[i].imdbID}')" class = 'btn btn-primary' href = '#'>Movie Details</a>
        
        </div>
        </div>`;
    }
    
document.getElementById("movies").innerHTML = output;
    

}



xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        displayNicely(this.responseText);
    }
    else if (this.status == 404) {
            document.getElementById("weatherData").innerHTML = "<h2>Movie not found! Please try again.</h2>";
        }
};






function movieSelected(id){
    sessionStorage.setItem('movieID', id);
    window.location = 'api2.html';
    return false;
    
}


function getMovie(){
    let movieID = sessionStorage.getItem('movieID');
     xhr.open("GET", 'https://www.omdbapi.com/?apikey=' + APIKEY + '&i=' + movieID);


    xhr.send();
    
}



// function displayMovie(movie){
//     movie = JSON.parse(movie);
//     console.log(movie);
    
//     let output = `<div class = 'row'>
//     <div class = 'col-md-4'>
//     <img src = '${movie.Poster}' class = 'thumbnail'>
    
//         </div>
//         <div class = 'col-md-8'>
//         <h2>${movie.Title}</h2>
//         <ul class = 'list-group'></ul>
//         <li class = 'list-group-item'><strong>Genre:</strong> ${movie.Genre}</li>
//         <li class = 'list-group-item'><strong>Released:</strong> ${movie.Released}</li>
//         <li class = 'list-group-item'><strong>Rated:</strong> ${movie.Rated}</li>
//         <li class = 'list-group-item'><strong>ImDB rating:</strong> ${movie.imdbRating}</li>
//         <li class = 'list-group-item'><strong>Director:</strong> ${movie.Director}</li>
//         <li class = 'list-group-item'><strong>Writer:</strong> ${movie.writer}</li>
//         <li class = 'list-group-item'><strong>Actors:</strong> ${movie.actors}</li>
//         </div>
//         <div class = 'row'>
//         <div class = 'col-md-12'>
//         &nbsp
//         </div>
//         </div>
//         <div class = 'row'>
//         <div class = 'well'>
        
//         <h3>Plot</h3>
//         <h5>${movie.Plot}</h5>
//         <hr>
//         <a href = "http://imdb.com/title/${movie.imdbID}" target = 'blank' class = 'btn btn-primary'>View IMDB</a>
//         <a href = "api1.html" class = "btn btn-secondary" >Go back to Search</a>
//         </div>
//         </div>`;
    
    
    
// document.getElementById("movie").innerHTML = output;   
// }














// xhr.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             displayMovie(this.responseText);
//         }
        
// };



function generatePaginationButtons(next, prev){
    if (next && prev){
        return `<button onClick = "writeToDocument('${next}')">Previous</button>
       <button onClick = "writeToDocument('${prev}')">Next</button>`;
    }
    else if (next && !prev){
      return  `<button onClick = "writeToDocument('${next}')">Next</button>`;
        
    }
    else if (!next && prev){
        return `<button onClick = "writeToDocument('${prev}')">Previous</button>`;
}




}


