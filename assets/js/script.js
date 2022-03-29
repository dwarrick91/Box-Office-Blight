var queryURL = "https://api.covidtracking.com/v2/states/ca/daily.json"
//make sure to use v.2. The above gets data for California. Will need to convert state into 2-letter state code
dataList = [];
dateList = [];

fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (i=(data.data.length-8); i>=0; i--) {
            console.log(dataList);
            console.log("hi");
            newDataList = dataList.push(data.data[i].cases.total.calculated.change_from_prior_day);
            console.log(newDataList);
            newDateList = dateList.push(data.data[i].date)
            console.log(dateList);
        }

        // logList = logConvert(dataList);
        // console.log(logList);
        console.log(dateList);

        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dateList,
                datasets: [{
                    label: 'Dates',
                    // data: logList,
                    data: dataList,
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



