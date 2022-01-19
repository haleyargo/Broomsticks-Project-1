// add your API key inside the quotes on line 5
// add the latitude and longitude for your location one lines 6 and 7
// move on to adding your data requests on line 22
function weatherBalloon() {
  var key = 'dc54aaadf6711aaef89838711ab7907a';
  var lat = '41.825226';
  var lon = '-71.418884';
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
  $('.info .windspeed').html(convertToMph(d.current.wind_speed)+' mph');
  $('.sidebar .moonphase').html(printMoonText(d.daily[0].moon_phase));
  $('.sidebar .icon').html(printGraphic(d.current.weather[0].description));
  $('.info .humidity').html( convertPop(d.daily[0].pop)+' %' );
  
  $('.day1 .dayname').html(displayDay(1));
  $('.day1 .low').html(convertTemp(d.daily[1].temp.min));
  $('.day1 .high').html(convertTemp(d.daily[1].temp.max));
  $('.day1 .icon').html(printGraphic(d.daily[1].weather[0].description));
  $('.day1 .moonicon').html(printMoonGraphic(d.daily[1].moon_phase));

  $('.day2 .dayname').html(displayDay(2));
  $('.day2 .low').html(convertTemp(d.daily[2].temp.min));
  $('.day2 .high').html(convertTemp(d.daily[2].temp.max));
  $('.day2 .icon').html(printGraphic(d.daily[2].weather[0].description));
  $('.day2 .moonicon').html(printMoonGraphic(d.daily[2].moon_phase));

  $('.day3 .dayname').html(displayDay(3));
  $('.day3 .low').html(convertTemp(d.daily[3].temp.min));
  $('.day3 .high').html(convertTemp(d.daily[3].temp.max));
  $('.day3 .icon').html(printGraphic(d.daily[3].weather[0].description));
  $('.day3 .moonicon').html(printMoonGraphic(d.daily[3].moon_phase));

  $('.day4 .dayname').html(displayDay(4));
  $('.day4 .low').html(convertTemp(d.daily[4].temp.min));
  $('.day4 .high').html(convertTemp(d.daily[4].temp.max));
  $('.day4 .icon').html(printGraphic(d.daily[4].weather[0].description));
  $('.day4 .moonicon').html(printMoonGraphic(d.daily[4].moon_phase));

  $('.day5 .dayname').html(displayDay(5));
  $('.day5 .low').html(convertTemp(d.daily[5].temp.min));
  $('.day5 .high').html(convertTemp(d.daily[5].temp.max));
  $('.day5 .icon').html(printGraphic(d.daily[5].weather[0].description));
  $('.day5 .moonicon').html(printMoonGraphic(d.daily[5].moon_phase));

  $('.day6 .dayname').html(displayDay(6));
  $('.day6 .low').html(convertTemp(d.daily[6].temp.min));
  $('.day6 .high').html(convertTemp(d.daily[6].temp.max));
  $('.day6 .icon').html(printGraphic(d.daily[6].weather[0].description));
  $('.day6 .moonicon').html(printMoonGraphic(d.daily[6].moon_phase));
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
 function changeText(d){

  if(d.indexOf('rain')>0){
    $('don').addClass('red');
  } else {
    $('don').addClass('blue');
  }
 }



function convertPop(t){

  return t * 100;

}


function convertToMph(t){

  return Math.round(t * 2.236936);

}


/* -----------------------------------------------
   Function for printing weather-specific graphic
   ----------------------------------------------- */

function printGraphic(d){
  
  // if the description includes the word "rain"
  if( d.indexOf('rain') > 0 ) {
    return '<i class="fas fa-cloud-rain">';
  
  // if the description includes the word "cloud"
  } else if( d.indexOf('cloud') > 0 ) {
    return '<i class="fas fa-cloud">';

      // if the description includes the word "snow"
  } else if( d.indexOf('snow') > 0 ) {
    return '<i class="far fa-snowflake">';
  
  // if none of those cases are true, assume it's clear
  } else {
    return '<i class = "fas fa-sun">';
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

function printMoonGraphic(d){
  
  // .5 is a full moon
  if( d == .5 ) {
    return '<img src="img/svg/Moon-Full.svg" alt="Moon icon">';
  
  // .25 is a new moon
  } else if( d == .25 ) {
    return '<img src="img/svg/Moon-New.svg" alt="Moon icon">';
  
  // .75 is a last quarter moon
  } else if( d == .75 ) {
    return '<img src="img/svg/Moon-Last-Quarter.svg" alt="Moon icon">';

  // less than .25 is a waxing crescent moon
  } else if( d < .25 ) {
    return '<img src="img/svg/Moon-Waxing-Crescent.svg" alt="Moon icon">';

  // greater than .25 but less than .5 is a waxing gibbous moon
  } else if( d > .25 || d < .5 ) {
    return '<img src="img/svg/Moon-Waxing-Gibbous.svg" alt="Moon icon">';

  // greater than .5 but less than .75 is a waning gibbous moon
  } else if( d > .5 || d < .75 ) {
    return '<img src="img/svg/Moon-Waning-Gibbous.svg" alt="Moon icon">';

  // greater than .75 but less than 1 is a waning crescent moon
  } else if( d > .75 || d < 1 ) {
    return '<img src="img/svg/Moon-Waning-Crescent.svg" alt="Moon icon">';
  
  }

}

function printMoonText(d){
  
  // .5 is a full moon
  if( d == .5 ) {
    return '<p>Full Moon</p>';
  
  // .25 is a new moon
  } else if( d == .25 ) {
    return '<p>New Moon</p>';
  
  // .75 is a last quarter moon
  } else if( d == .75 ) {
    return '<p>Last Quarter</p>';

  // less than .25 is a waxing crescent moon
  } else if( d < .25 ) {
    return '<p>Waxing Crescent</p>';

  // greater than .25 but less than .5 is a waxing gibbous moon
  } else if( d > .25 || d < .5 ) {
    return '<p>Waxing Gibbous</p>';

  // greater than .5 but less than .75 is a waning gibbous moon
  } else if( d > .5 || d < .75 ) {
    return '<p>Waning Gibbous</p>';

  // greater than .75 but less than 1 is a waning crescent moon
  } else if( d > .75 || d < 1 ) {
    return '<p>Waning Crescent</p>';
  
  }

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

$('.secondpage .location i').click(function(){
  $('.firstpage').removeClass('open-sesame');
})

$('.secondpage button').click(function(){
  $('.secondpage').addClass('open-sesame');
})

$('.thirdpage').click(function(){
  $('.secondpage').removeClass('open-sesame');
})
