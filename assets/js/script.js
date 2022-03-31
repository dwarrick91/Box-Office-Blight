var apiKey = "f9f4dca9"
 var ombdUrl = `http://www.omdbapi.com/?i=tt3896198&apiKey=${apiKey}&t=${title}`
var boxOffice = document.querySelector("#boxOffice")

 

 fetch(ombdUrl)
    .then(function (response)  {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
      
    