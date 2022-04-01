movieStoredList = [];
selectEl = $('#filmDropDown')
$(document).ready(function(){
    $('select').formSelect();
  });


var Onward = {
    title: "Onward",
    releaseDate: '2020-03-06',
    budget: 175,
    value: "1"
};

var theBanker = {
    title: "The Banker",
    releaseDate: '2020-03-06',
    budget: 11,
    value: "2"
}

var theWretched = {
    title: "The Wretched",
    releaseDate: '2020-05-01',
    budget: .066,
    value: "3"
}

var theVastOfNight = {
    title: "The Vast of Night",
    releaseDate: '2020-05-29',
    budget: .7,
    value: "4"
}

var Followed = {
    title: "Followed",
    releaseDate: '2020-06-19',
    budget: .081,
    value: "5"
}

var missJuneteenth = {
    title: "Miss Juneteenth",
    releaseDate: '2020-06-19',
    budget: 11,
    value: "6"
}

var Relic = {
    title: "Relic",
    releaseDate: '2020-07-10',
    budget: 70,
    value: "7"
}

var taxCollector = {
    title: "Tax Collector",
    releaseDate: '2020-08-20',
    budget: 30,
    value: "8"
}

var Tenet = {
    title: "Tenet",
    releaseDate: '2020-09-03',
    budget: 200,
    value: "9"
}

var theBrokenHeartsGallery = {
    title: "The Broken Hearts Gallery",
    releaseDate: '2020-09-11',
    budget: 8,
    value: "10"
}

var theWarWithGrandpa = {
    title: "The War with Grandpa",
    releaseDate: '2020-10-09',
    budget: 11,
    value: "11"
}

var honestThief = {
    title: "Honest Thief",
    releaseDate: '2020-10-16',
    budget: 30,
    value: "12"
}

var letHimGo = {
    title: "Let Him Go",
    releaseDate: '2020-11-20',
    budget: 8,
    value: "13"
}

var freaky = {
    title: "Freaky",
    releaseDate: '2020-13-20',
    budget: 11,
    value: "14"
}

var wonderWoman1984 = {
    title: "Wonder Woman 1984",
    releaseDate: '2020-12-25',
    budget: 200,
    value: "15"
}

var respect = {
    title: "Respect",
    releaseDate: '2021-01-21',
    budget: 55,
    value: "16"
}

var mortalKombat = {
    title: "Mortal Kombat",
    releaseDate: '2021-01-21',
    budget: 55,
    value: "17"
}

var  tomAndJerry = {
    title: "Tom and Jerry",
    releaseDate: '2021-02-21',
    budget: 79,
    value: "18"
}

filmList = [Onward,theBanker, theWretched,theVastOfNight,Followed,missJuneteenth,Relic,taxCollector,Tenet,theBrokenHeartsGallery,theWarWithGrandpa,honestThief,letHimGo,freaky,wonderWoman1984,respect,mortalKombat,tomAndJerry]

searchFilms();
printList();

//Function performs API call to COVID Tracker, creates chart, shows release date of film in bright red.
function displayCOVIDChart(filmDate) {
    var chart = $('#myChart');
    chart.remove();
    var newChart = $('<canvas>');
    var placement = $('#chartPlacement');
    newChart.attr("id", "myChart").attr("width", "400").attr("height","400")
    newChart.appendTo(placement);
    var queryURL = "https://api.covidtracking.com/v2/us/daily.json"
    dataList = [];
    dateList = [];
    colorList = [];
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            for (i=(data.data.length-55); i>=0; i--) {
                newDataList = dataList.push(data.data[i].cases.total.calculated.seven_day_change_percent);
                newDateList = dateList.push(data.data[i].date)
            }
            for (i=0; i<366; i++) {
                newColorList = colorList.push('rgba(54, 162, 235, 0.2)');
            }
            logList = logConvert(dataList);

            colorData = colorDate(filmDate, dateList, colorList);


            const ctx = document.getElementById('myChart');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dateList,
                    datasets: [{
                        label: 'Natural Logarithm of Cumulative 7-day percent increase in COVID Confirmed Cases',
                        data: logList,
                        backgroundColor: colorData,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
}

//API call to OMDb
function displayMovieData(filmInput) {
    
    var movieTitle = filmList[filmInput-1].title
    console.log(movieTitle);
    var apiKey = "f9f4dca9"
     var newQueryURL = `http://www.omdbapi.com/?t=${movieTitle}&y=2020&apikey=${apiKey}`
     var selectedMovieTitle = document.querySelector("#title")
     var movieSummeryEl = document.querySelector("#summery")
     console.log(selectedMovieTitle);
     fetch(newQueryURL)
         .then(function (response) {
             return response.json();
         })
         .then(function(data){
         console.log(data.Plot);
             console.log(data);
             movieSummeryEl.textContent = data.Plot
         })
   selectedMovieTitle.textContent = movieTitle
   }

//convert to log-base-2
function logConvert(dataList) {
    logList = [];
    for (i=0; i<dataList.length; i++) {
        logList.push(Math.log(dataList[i]))
    }
    return logList;
}

//To recolor data point for date of movie release in theaters
function colorDate(date, dateList, colorList) {
    for (i=0; i<dateList.length; i++) {
        if (date === dateList[i]) {
            colorList.splice(i,0,'rgba(255, 10, 32, 3.8)')
            colorList.splice(i+1,1);
        }
    }
    return colorList;
}
 


function printList() {
if (localStorage.getItem("storedList") === null) {
    return
}
else {
    movieStoredList = JSON.parse(localStorage.getItem('storedList'));
    var selectEl = $('#stored-movies')
    for (i=0; i<movieStoredList.length; i++) {
        var listEl = $('<option>');
        listEl.attr('value', movieStoredList[i].value).text(movieStoredList[i].title)
        listEl.appendTo(selectEl);
    };
    return movieStoredList;
};
};

//Generating drop down list of recent searches to store in local storage
function storedSearch(searchItem) {
    movieStoredList.splice(0,0,searchItem)
    if (movieStoredList.length > 5) {
        movieStoredList.splice(0,1);
        var toClear = $("#stored-movies").children().eq(1)
        toClear.remove();
    }
    localStorage.setItem("storedList", JSON.stringify(movieStoredList));
    var selectEl2 = $('#stored-movies');
    var film2 = $('<option>');
    film2.attr('value', searchItem.value).text(searchItem.title)
    film2.appendTo(selectEl2);
    $(document).ready(function(){
        $('select').formSelect();
      });  
}

$(document).ready(function(){
    $('select').formSelect();
  });

//Function to generate the dropdown list of films to search
  function searchFilms(){
    var selectEl = $('#filmDropDown');
    for (i=0; i<filmList.length; i++) {
        var film = $('<option>');
        film.attr('value', filmList[i].value).text(filmList[i].title)
        film.appendTo(selectEl);
    }
}

//Event listener for first dropdown menu
selectEl.on('change', (event) => {
    var filmInput = event.target.value;
    console.log(filmInput);
    if (filmInput === "Choose a film") {
        console.log('You need to choose a film!');
        return;
    }
    for (i=0; i<filmList.length; i++) {
        if (filmInput === filmList[i].value) {
            //Add functionality to populate search bars
            storedSearch(filmList[i])
        }
        
    }
    displayMovieData(filmInput)
    displayCOVIDChart(filmList[filmInput-1].releaseDate)
  });
  
  
//Event listener for stored searches dropdown menu
$('#stored-movies').on('change', (event) => {
    var filmInput = event.target.value;
    for (i=0; i<filmList.length; i++) {
        if (filmInput === filmList[i].value) {
            displayMovieData(filmInput)
            displayCOVIDChart(filmList[filmInput-1].releaseDate)
        }
    }
});