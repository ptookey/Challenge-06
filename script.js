var days=[$("#current"),$("#day1"),$("#day2"),$("#day3"),$("#day4"),$("#day5")]
var citys=[$("#city"),$("#city1"),$("#city2"),$("#city3"),$("#city4"),$("#city5")]
var temps=[$("#temp"),$("#temp1"),$("#temp2"),$("#temp3"),$("#temp4"),$("#temp5")];
var winds=[$("#wind"),$("#wind1"),$("#wind2"),$("#wind3"),$("#wind4"),$("#wind5")];
var humids=[$("#humid"),$("#humid1"),$("#humid2"),$("#humid3"),$("#humid4"),$("#humid5")];

var search=$("#search-query");
var searchButton=$("#searchButton");
var favorites=$("#favorites");

function getWeatherAPI (requestWeatherUrl){
    fetch(requestWeatherUrl)
        .then(function (response)
        {
          console.log(response.status);
          return response.json();
        })
        .then(function (data) {
            console.log(data)

            $('img').remove();

            function dateFormat(x) {
                var currentDayForecast_DT=data.list[x].dt_txt
                return dayjs(currentDayForecast_DT).format("MM/DD/YYYY")
            }

            function getWeatherIcon(x) {
                var currentDayForecast_Icon = data.list[x].weather[0].icon;
                var img = $('<img>',
                { src: `https://openweathermap.org/img/wn/${currentDayForecast_Icon}@2x.png`})
                return img
            }


            days[0].append(getWeatherIcon(0));
            citys[0].text(data.city.name + " - " + dateFormat(0));
            temps[0].text("Temp: " + data.list[0].main.temp + " F");
            winds[0].text("Wind: " + data.list[0].wind.speed + " mph");
            humids[0].text("Humidity: " + data.list[0].main.humidity + "%");


            for (var i = 1, x = 1; i<6; i++, x=x+8){
                days[i].append(getWeatherIcon(x));
                citys[i].text(dateFormat(x));
                temps[i].text("Temp: " + data.list[x].main.temp + " F");
                winds[i].text("Wind: " + data.list[x].wind.speed + " mph");
                humids[i].text("Humidity: " + data.list[x].main.humidity + "%");
            }

            var a = $('.history').text();
            var b = data.city.name;

            if (a.includes(b)){
                console.log("hello")
                return
            } else {
            var button = $("<button>", { class:"history"});
            button.text(data.city.name);
            favorites.prepend(button);
            }

        })
  }

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response)
      {
        console.log(response.status);
        return response.json();
      })
      .then(function (data)
      {
        var geoLocationLat=data.city.coord.lat
        var geoLocationLon=data.city.coord.lon
        var requestWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoLocationLat}&lon=${geoLocationLon}&exclude=hourly,daily&units=imperial&appid=71ab6dae80d4e4ec7fa98ea5618e8732`;
        getWeatherAPI(requestWeatherUrl)
      }
      )};


function userSearch() {
    cityName = $(search).val()
    $(search).val("")
    localStorage.setItem('city',cityName);
}

searchButton.on('click', function (event){
    event.preventDefault();
    userSearch();
    var requestGeocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=71ab6dae80d4e4ec7fa98ea5618e8732`;
    getApi(requestGeocodeUrl);
})

favorites.on('click','.history', function(){
    cityName = $(this).text();
    console.log($(this).text());
    var requestGeocodeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=71ab6dae80d4e4ec7fa98ea5618e8732`;
    getApi(requestGeocodeUrl);
})