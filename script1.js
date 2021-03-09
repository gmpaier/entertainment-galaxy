function searchTmdb (){
    var key = "537dc0254ee4eb9747eecc6e3667403f";
    var title = $("#movie-input").val();
    title = title.trim();
    var requestUrl = "https://api.themoviedb.org/3/search/multi?api_key=" + key + "&language=en-US&query=" + title + "&page=1&include_adult=false";

    fetch(requestUrl)
      .then(function (response) {
        if (response.status !== 200){
            alert("invalid address");
        }
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          for (let i = 0; i < data.results.length; i++){
            if (data.results[i].media_type === "movie"){
              $("#result-list").append('<li><button type="button" class="list-group-item list-group-item-action short" value="'+ data.results[i].id + ' media='+ data.results[i].media_type + '">' + data.results[i].title + ' (' + data.results[i].media_type + ')</button></li>');
            }
            else if (data.results[i].media_type === "tv"){
              $("#result-list").append('<li><button type="button" class="list-group-item list-group-item-action short" value="'+ data.results[i].id + ' media='+ data.results[i].media_type + '">' + data.results[i].name + ' (' + data.results[i].media_type + ')</button></li>');
            }
          }

          return data;
      })
}   

function getTmdb (){
    var key = "537dc0254ee4eb9747eecc6e3667403f";
    var id = parseInt(this.value);
    var media = this.media;
    var requestUrl = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&language=en-US";
    fetch(requestUrl)
      .then(function (response) {
        if (response.status !== 200){
            alert("invalid address");
        }
        return response.json();
      })
      .then(function (data) {
          console.log(data);
         if (media === 'movie'){
          return getMovieMusic(id);
         }
         else if (media === 'tv'){
          return getShowMusic(id);
         }
      })
}   
    
function getMovieMusic (id){
  var requestUrl = "https://cors-anywhere.herokuapp.com/https://45fedfc9.api.tunefind.com/api/v2/movie/" + id + "?id-type=tmdb";
    fetch(requestUrl, {
        headers: {
          authorization: "Basic NDVmZWRmYzkwNjQ1MzEyZjFlNzJkYzZjNGIzNTk5ZjY6MDYxYWY4Mzg5ZmU1MTQ0ZjI0YTE0Y2MxOGMyZmRkNTI=",
        }
      })
    .then(function (response) {
        if (response.status !== 200){
            alert("invalid address");
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);
      
          return data;
      })
}   

function getShowMusic (id){
  var requestUrl = "https://cors-anywhere.herokuapp.com/https://45fedfc9.api.tunefind.com/api/v2/show/" + id + "?id-type=tmdb";
    fetch(requestUrl, {
        headers: {
          authorization: "Basic NDVmZWRmYzkwNjQ1MzEyZjFlNzJkYzZjNGIzNTk5ZjY6MDYxYWY4Mzg5ZmU1MTQ0ZjI0YTE0Y2MxOGMyZmRkNTI=",
        }
      })
    .then(function (response) {
        if (response.status !== 200){
            alert("invalid address");
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);
      
          return data;
      })
}   

$("#search-btn").on("click", searchTmdb);
$(document).on("click", ".list-group-item", getTmdb);