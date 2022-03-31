movieStoredList = [];

var Onward = {
    title: "Onward",
    releaseDate: '2020-03-06',
    budget: 175
};

var theBanker = {
    title: "The Banker",
    releaseDate: '2020-03-06',
    budget: 11
}

var theWretched = {
    title: "The Wretched",
    releaseDate: '2020-05-01',
    budget: .066
}

var theVastOfNight = {
    title: "The Vast of Night",
    releaseDate: '2020-05-29',
    budget: .7
}

var Followed = {
    title: "Followed",
    releaseDate: '2020-06-19',
    budget: .081
}

var missJuneteenth = {
    title: "Miss Juneteenth",
    releaseDate: '2020-06-19',
    budget: 11
}

var Relic = {
    title: "Relic",
    releaseDate: '2020-07-10',
    budget: 70
}

var taxCollector = {
    title: "Tax Collector",
    releaseDate: '2020-08-20',
    budget: 30
}

var Tenet = {
    title: "Tenet",
    releaseDate: '2020-09-03',
    budget: 200
}

var theBrokenHeartsGallery = {
    title: "The Broken Hearts Gallery",
    releaseDate: '2020-09-11',
    budget: 8
}

var theWarWithGrandpa = {
    title: "The War with Grandpa",
    releaseDate: '2020-10-09',
    budget: 11
}

var honestThief = {
    title: "Honest Thief",
    releaseDate: '2020-10-16',
    budget: 30
}

var letHimGo = {
    title: "Let Him Go",
    releaseDate: '2020-11-20',
    budget: 8
}

var freaky = {
    title: "Freaky",
    releaseDate: '2020-13-20',
    budget: 11
}

var wonderWoman1984 = {
    title: "Wonder Woman 1984",
    releaseDate: '2020-12-25',
    budget: 200
}

var respect = {
    title: "Respect",
    releaseDate: '2021-01-21',
    budget: 55
}

var mortalKombat = {
    title: "Mortal Kombat",
    releaseDate: '2021-01-21',
    budget: 55
}

var  tomAndJerry = {
    title: "Tom and Jerry",
    releaseDate: '2021-02-21',
    budget: 79
}

filmList = [Onward,theBanker, theWretched,theVastOfNight,Followed,missJuneteenth,Relic,taxCollector,Tenet,theBrokenHeartsGallery,theWarWithGrandpa,honestThief,letHimGo,freaky,wonderWoman1984,respect,mortalKombat,tomAndJerry]



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
        console.log(data);
        for (i=(data.data.length-55); i>=0; i--) {
            newDataList = dataList.push(data.data[i].cases.total.calculated.seven_day_change_percent);
            newDateList = dateList.push(data.data[i].date)
        }
        for (i=0; i<366; i++) {
            newColorList = colorList.push('rgba(54, 162, 235, 0.2)');
        }

        console.log(dateList);
        console.log((colorList));
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
      
     boxOffice.textContent




function printList() {
if (localStorage.getItem("cityList") === null) {
    return
}
else {
    movieStoredList = JSON.parse(localStorage.getItem('storedList'));
    // for (i=0; i<cityStoredList.length; i++) {
    //     var listEl = $('<li>');
    //     listEl.addClass('list-group-item select-city-btn').text(cityStoredList[i]);
    //     listEl.appendTo(cityList);
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

}