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

newSearch(Onward);
searchFilms();

var queryURL = "https://api.covidtracking.com/v2/us/daily.json"
// make sure to use v.2. The above gets data for California. Will need to convert state into 2-letter state code
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

        colorData = colorDate('2020-12-08', dateList, colorList);
        console.log((colorData));


        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateList,
                datasets: [{
                    label: 'Dates',
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


function movieGrossCharat() {


}

// var newQueryURL = "http://www.omdbapi.com/?y=2020&apikey=c3d2c14c"

// fetch(newQueryURL)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function(data){
//         console.log(data);
//     })

      





function printList() {
if (localStorage.getItem("cityList") === null) {
    return
}
else {
    movieStoredList = JSON.parse(localStorage.getItem('storedList'));
    for (i=0; i<cityStoredList.length; i++) {
        var listEl = $('<li>');
        listEl.addClass('list-group-item select-city-btn').text(cityStoredList[i]);
        listEl.appendTo(cityList);
    };
    return movieStoredList;
};
};

function newSearch(searchItem) {
    movieStoredList.splice(0,0,searchItem)
    if (movieStoredList.length > 6) {
        movieStoredList = movieStoredList.slice[5];
    }
    localStorage.setItem("storedList", JSON.stringify(movieStoredList));
    var film = $('<option>');
    var selectEl = $('#stored-movies');
    film.attr('value', searchItem.value).text(searchItem.title);
    film.appendTo(selectEl);
}

newSearch(Onward);

$(document).ready(function(){
    $('select').formSelect();
  });

//Function to generate the dropdown list of films to search
  function searchFilms(){
    var selectEl = $('#filmDropDown');
    for (i=0; i<filmList.length; i++) {
    var film = $('<option>');
    film.attr('value', filmList[i].value).text(filmList[i].title);
    film.appendTo(selectEl);
    }
}


     
var handleDropDownSelect = function (event) {
    console.log('hi!');
    var filmInput = $('#filmDropDown').val();
    console.log(filmInput);
    if (filmInput === "Choose a film") {
        console.log('You need to choose a film!');
        return;
    }
    for (i=0; i<filmList.length; i++) {
        console.log('hi!');
        if (filmInput === filmList[i].title) {
            //Add functionality to populate search bars
            newSearch(filmList[i])
        }
    }
    
    printCity(cityInput);
    clearPrevData();
    getWeatherApi(cityInput);
    cityID.val('');
};

selectEl.on('change', handleDropDownSelect, false);

