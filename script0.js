function getOmdb (){
    var key = "b3238956";
    var title = $("#movie-input").val();
    title = title.trim();
    var requestUrl = "http://www.omdbapi.com/?apikey=" + key + "&t=" + title;

    fetch(requestUrl)
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

$("#search-btn").on("click", getOmdb);

