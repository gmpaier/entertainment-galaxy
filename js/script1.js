//variable and function declaration

var searchData = [];
var seasonData = [];
var episodeData = [];
var storage = [searchData, seasonData, episodeData];
var storageKey = -1;

function searchTmdb (event){
  event.preventDefault();
    $("#result-list").empty();
    var key = "537dc0254ee4eb9747eecc6e3667403f";
    var title = $("#movie-input").val();
    title = title.trim();
    var requestUrl = "https://api.themoviedb.org/3/search/multi?api_key=" + key + "&language=en-US&query=" + title + "&page=1&include_adult=false";

    fetch(requestUrl)
      .then(function (response) {
        if (response.status !== 200){
          throw new Error('network response not okay');
        }
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          var media;
          var id;
          var title;
          var img;
          let j = 0;
          for (let i = 0; i < data.results.length; i++){
            media = data.results[i].media_type;
            id = data.results[i].id;
            if (media === 'movie'){
              title = data.results[i].title;
              appendTitle(id, title, media);
              searchData[j] = {id: id, title: title, media: media};
              j++;
            }
            else if (media === 'tv'){
             title = data.results[i].name;
             appendTitle(id, title, media);
             searchData[j] = {id: id, title: title, media: media};
             j++;
            }
          }
          sessionStorage.setItem("storage", JSON.stringify(storage));
          return data;
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
      })
}   

function getTmdb (){
    storageKey++;
    var key = "537dc0254ee4eb9747eecc6e3667403f";
    var value = JSON.parse(this.value);
    var id = value.id;
    var media = value.media;
    var requestUrl = "https://api.themoviedb.org/3/"+ media + "/" + id + "?api_key=" + key + "&language=en-US";
    fetch(requestUrl)
      .then(function (response) {
        if (response.status !== 200){
          throw new Error('network response not okay');
        }
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          $("#poster").attr("src", "https://image.tmdb.org/t/p/original"+data["poster_path"]);
          $("#overview").text(data.overview);
          $("#back-btn").show();
         if (media === 'movie'){
           $("#title").text(data.title);
          return getMovieMusic(id);
         }
         else if (media === 'tv'){
           $("#title").text(data.name);
          return getSeasons(id);
         }
         else{
           return data;
         }
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
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
          throw new Error('network response not okay');
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);
      
          return displaySongs(data);
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
      })
}   

function getSeasons (id){
  var requestUrl = "https://cors-anywhere.herokuapp.com/https://45fedfc9.api.tunefind.com/api/v2/show/" + id + "?id-type=tmdb";
    fetch(requestUrl, {
        headers: {
          authorization: "Basic NDVmZWRmYzkwNjQ1MzEyZjFlNzJkYzZjNGIzNTk5ZjY6MDYxYWY4Mzg5ZmU1MTQ0ZjI0YTE0Y2MxOGMyZmRkNTI=",
        }
      })
    .then(function (response) {
        if (response.status !== 200){
          throw new Error('network response not okay');
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);
          $("#result-list").empty();
          for (let i = 0; i < data.seasons.length; i++){
            appendSeason(id, i);
            seasonData[i] = id;
          }
          sessionStorage.setItem("storage", JSON.stringify(storage));
          return data;
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
      })
}   

function getEpisode (){
  storageKey++;
  var value = JSON.parse(this.value);
  var id = value.id;
  var season = value.season;
  var requestUrl = "https://cors-anywhere.herokuapp.com/https://45fedfc9.api.tunefind.com/api/v2/show/" + id + "/season-" + season + "?id-type=tmdb";
    fetch(requestUrl, {
        headers: {
          authorization: "Basic NDVmZWRmYzkwNjQ1MzEyZjFlNzJkYzZjNGIzNTk5ZjY6MDYxYWY4Mzg5ZmU1MTQ0ZjI0YTE0Y2MxOGMyZmRkNTI=",
        }
      })
    .then(function (response) {
        if (response.status !== 200){
          throw new Error('network response not okay');
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);
          $("#result-list").empty();
          for (let i = 0; i < data.episodes.length; i++){
            appendEpisode(id, season, i);
            episodeData[i] = {id: id, season: season};
          }
          sessionStorage.setItem("storage", JSON.stringify(storage));
          return data;
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
      })
}

function getEpisodeMusic (){
  storageKey++
  var value = JSON.parse(this.value);
  var id = value.id;
  var season = value.season;
  var episode = value.episodes
  var requestUrl = "https://cors-anywhere.herokuapp.com/https://45fedfc9.api.tunefind.com/api/v2/show/" + id + "/season-" + season + "/" + episode + "?id-type=tmdb";
    fetch(requestUrl, {
        headers: {
          authorization: "Basic NDVmZWRmYzkwNjQ1MzEyZjFlNzJkYzZjNGIzNTk5ZjY6MDYxYWY4Mzg5ZmU1MTQ0ZjI0YTE0Y2MxOGMyZmRkNTI=",
        }
      })
    .then(function (response) {
        if (response.status !== 200){
          throw new Error('network response not okay');
        }

        return response.json();
    })
      .then(function (data) {
          console.log(data);      
          return displaySongs(data);
      })
      .catch(function (error) {
        console.error('There has been a problem with your fetch operation:', error);
      })
}

function displaySongs (data){
  $("#result-list").empty();
  $("#song-list").empty();
  var album;
  $("#song-list").append("<thead><tr><th>Name</th><th>Artist</th><th>Album</th></tr></thead><tbody>");
  for (let i = 0; i < data.songs.length; i++){
    album = data.songs[i].album;
    if (album === ""){
      album = "n/a";
    }
    $("#song-list").append("<tr><td>" + data.songs[i].name + "</td><td>" + data.songs[i].artist.name + "</td><td>" + album + "</td></tr>") 
  }
  $("#song-list").append("</tbody>");
}

function appendTitle(id, title, media){
  $("#result-list").append('<li><button type="button" class="result" value=\'{"id": "'+ id + '", "media": "'+ media + '"}\'>' + title + ' (' + media + ')</button></li>');
}

function appendSeason(id, i){
  $("#result-list").append('<li><button type="button" class="season" value=\'{"id": "'+ id + '", "season": "'+ (i+1) + '"}\'> Season: ' + (i+1) + '</button></li>');
}

function appendEpisode(id, season, i){
  $("#result-list").append('<li><button type="button" class="episode" value=\'{"id": "'+ id + '", "season": "'+ season + '", "episodes": "'+ (i+1) + '"}\'> Episodes: ' + (i+1) + '</button></li>');
}

function goBack(){
  let storedData = JSON.parse(sessionStorage.getItem("storage"));
  console.log(storedData);
  let data = storedData[storageKey];
  $("#result-list").empty();
  switch (storageKey) {
    case 0:
      $("#back-btn").hide();
      $("#song-list").empty();
      $("#title").text("");
      $("#overview").text("");
      $("#poster").removeAttr("src");
      for (let i = 0; i < data.length; i++){
        let id = data[i].id;
        let title = data[i].title;
        let media = data[i].media;
        appendTitle(id, title, media);
      }
      storageKey--;
      break;
    case 1:
      for (let i = 0; i < data.length; i++){
        let id = data[i]
        appendSeason(id, i);
      }
      storageKey--;
      break;
    case 2:
      for (let i = 0; i < data.length; i++){
        let id = data[i].id;
        let season = data[i].season;
        appendEpisode(id, season, i);
      }
      storageKey--;
      break;
    default:
  }
}

//runtime
$("#back-btn").hide();
$("#search-btn").on("click", searchTmdb);
$(document).on("click", ".result", getTmdb);
$(document).on("click", ".season", getEpisode);
$(document).on("click", ".episode", getEpisodeMusic);
$(document).on("click", "#back-btn", goBack)