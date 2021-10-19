// add your API key inside the quotes on line 5
// add the latitude and longitude for your location one lines 6 and 7
// move on to adding your data requests on line 22
function weatherBalloon() {
  var key = 'cc485f034973062500b98979665a7f66';
  var lat = '41.8781';
  var lon = '87.6298';
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + key)  
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    drawWeather(data);
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}

// display weather information
function drawWeather( d ) {
  $('.secondpage .temp').html(convertTemp(d.current.temp));
  // add your specfic weather requests here
  $('.info .windspeed').html(d.current.wind_speed);
  $('.sidebar .moonphase').html(d.daily[0].moon_phase);
  $('.sidebar .icon').html(printGraphic(d.current.weather[0].description));
  
  $('.day1 .dayname').html(displayDay(1));
  $('.day1 .low').html(convertTemp(d.daily[1].temp.min));
  $('.day1 .high').html(convertTemp(d.daily[1].temp.max));
  $('.day1 .icon').html(printGraphic(d.daily[1].weather[0].description));

  $('.day2 .dayname').html(displayDay(2));
  $('.day2 .low').html(convertTemp(d.daily[2].temp.min));
  $('.day2 .high').html(convertTemp(d.daily[2].temp.max));
  $('.day2 .icon').html(printGraphic(d.daily[2].weather[0].description));

  $('.day3 .dayname').html(displayDay(3));
  $('.day3 .low').html(convertTemp(d.daily[3].temp.min));
  $('.day3 .high').html(convertTemp(d.daily[3].temp.max));
  $('.day3 .icon').html(printGraphic(d.daily[3].weather[0].description));

  $('.day4 .dayname').html(displayDay(4));
  $('.day4 .low').html(convertTemp(d.daily[4].temp.min));
  $('.day4 .high').html(convertTemp(d.daily[4].temp.max));
  $('.day4 .icon').html(printGraphic(d.daily[4].weather[0].description));

  $('.day5 .dayname').html(displayDay(5));
  $('.day5 .low').html(convertTemp(d.daily[5].temp.min));
  $('.day5 .high').html(convertTemp(d.daily[5].temp.max));
  $('.day5 .icon').html(printGraphic(d.daily[5].weather[0].description));

  $('.day6 .dayname').html(displayDay(6));
  $('.day6 .low').html(convertTemp(d.daily[6].temp.min));
  $('.day6 .high').html(convertTemp(d.daily[6].temp.max));
  $('.day6 .icon').html(printGraphic(d.daily[6].weather[0].description));
}


/* -----------------------------------------------
   Function for converting temp to fahrenheit
   ----------------------------------------------- */

function convertTemp(t){

  return Math.round(((parseFloat(t)-273.15)*1.8)+32);

}


/* -------------------------------------------------------
   Function for printing weather-specific class on body
   ------------------------------------------------------- */

function changeTheme(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    $('body').addClass('rainy');

  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    $('body').addClass('cloudy');

  // if the description includes the word "sunny"  
  } else if( d.indexOf('sunny') > 0 ) {
    $('body').addClass('sunny');

  // if none of those cases are true, assume it's clear
  } else {
    $('body').addClass('clear');
  }

}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<img src="img/svg/Cloud-Rain.svg" alt="Cloud icon">';
  
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<img src="img/svg/Cloud.svg" alt="Cloud icon">';
  
  // if the description includes the word "sunny"
  } else if( d.indexOf('sunny') > 0 ) {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  
  // if none of those cases are true, assume it's clear
  } else {
    return '<img src="img/svg/Sun.svg" alt="Cloud icon">';
  }

}


/* -----------------------------------------------
   Function for converting time to hours/minutes
   ----------------------------------------------- */

function convertTime(t){

  var unixTimestamp = t;
  // since javascript works in milliseconds, you should convert 
  // the time into milliseconds by multiplying it by 1000.
  var date = new Date(unixTimestamp * 1000);
  // hours part from the timestamp (extra code needed to convert from military)
  var hours = (date.getHours() + 24) % 12 || 12;;
  // minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // seconds part from the timestamp
  var seconds = "0" + date.getSeconds();
  // will display time in 11:10 format
  var formatTime = hours + ':' + minutes.substr(-2);
  // send formatted date back
  return formatTime;

}


/* -----------------------------------------------
   Function for creating day of the week
   ----------------------------------------------- */

// based on a system where 0 = today, 1 = tomorrow, etc.
// note: the number system below does not immediately correlate
// for example, 0 for today does not line up with 0 for Sunday below

// how this works – in the return statement, d.getDay() gets today's date
// as a number (if today is Thursday, d.getDay() will be 4)
// adding "n" to this number gives you how many days from today.
// n is passed as an argument to the displayDay() function
// in the main body of the code above.
// if today is Thursday, the 4th day of the week,
// and the number 2 is passed as an argument, 
// the function will return the number 6. 6 maps to Saturday in the 
// weekday array below.

function displayDay(n){

  var d = new Date();
  var weekday = new Array();

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";

  var dispDay = d.getDay() + n;

  // adjust number system for numbers over 6
  // subtract 7 from totals higher than 6
  // to keep the day numbers in the array range above
  if(dispDay > 6){
    dispDay = dispDay - 7;
  }

  return weekday[ dispDay ];

}

/* --------------------------------------------------
   Event to get weather information when page loads
   -------------------------------------------------- */

window.onload = function() {
  weatherBalloon();
}

$('.firstpage button').click(function(){
  $('.firstpage').addClass('open-sesame');
})

$('.secondpage h1').click(function(){
  $('.firstpage').removeClass('open-sesame');
})

$('.secondpage p').click(function(){
  $('.firstpage').removeClass('open-sesame');
})

$('.secondpage button').click(function(){
  $('.secondpage').addClass('open-sesame');
})

$('.thirdpage').click(function(){
  $('.secondpage').removeClass('open-sesame');
})
