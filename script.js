var city=$("#city");
var temp=$("#temp");
var wind=$("#wind");
var humid=$("#humid");

var city1=$("#city1");
var temp1=$("#temp1");
var wind1=$("#wind1");
var humid1=$("#humid1");

var city2=$("#city2");
var temp2=$("#temp2");
var wind2=$("#wind2");
var humid2=$("#humid2");

var city3=$("#city3");
var temp3=$("#temp3");
var wind3=$("#wind3");
var humid3=$("#humid3");

var city4=$("#city4");
var temp4=$("#temp4");
var wind4=$("#wind4");
var humid4=$("#humid4");

var city5=$("#city5");
var temp5=$("#temp5");
var wind5=$("#wind5");
var humid5=$("#humid5");

var current=$("#current");

var day1=$("#day1");
var day2=$("#day2");
var day3=$("#day3");
var day4=$("#day4");
var day5=$("#day5");


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

            current.append(getWeatherIcon(0));
            city.text(data.city.name + " - " + dateFormat(0));
            temp.text("Temp: " + data.list[0].main.temp + " F");
            wind.text("Wind: " + data.list[0].wind.speed + " mph");
            humid.text("Humidity: " + data.list[0].main.humidity + "%");

            day1.append(getWeatherIcon(8))
            city1.text(dateFormat(8));
            temp1.text("Temp: " + data.list[8].main.temp + " F");
            wind1.text("Wind: " + data.list[8].wind.speed + " mph");
            humid1.text("Humidity: " + data.list[8].main.humidity + "%");

            day2.append(getWeatherIcon(16))
            city2.text(dateFormat(16));
            temp2.text("Temp: " + data.list[16].main.temp + " F");
            wind2.text("Wind: " + data.list[16].wind.speed + " mph");
            humid2.text("Humidity: " + data.list[16].main.humidity + "%");

            day3.append(getWeatherIcon(24))
            city3.text(dateFormat(24));
            temp3.text("Temp: " + data.list[24].main.temp + " F");
            wind3.text("Wind: " + data.list[24].wind.speed + " mph");
            humid3.text("Humidity: " + data.list[24].main.humidity + "%");

            day4.append(getWeatherIcon(32))
            city4.text(dateFormat(32));
            temp4.text("Temp: " + data.list[32].main.temp + " F");
            wind4.text("Wind: " + data.list[32].wind.speed + " mph");
            humid4.text("Humidity: " + data.list[32].main.humidity + "%");

            day5.append(getWeatherIcon(39))
            city5.text(dateFormat(39));
            temp5.text("Temp: " + data.list[39].main.temp + " F");
            wind5.text("Wind: " + data.list[39].wind.speed + " mph");
            humid5.text("Humidity: " + data.list[39].main.humidity + "%");

            var a = $('.history').text();
            var b = data.city.name;

            if (a.includes(b)){
                console.log("hello")
                return
            } else {
            var button = $("<button>", { class:"history"});
            button.text(data.city.name);
            favorites.append(button);
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

searchButton.on('click', function (){
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