var convertButton = '<br><button id="convert" class="btn btn-primary">convert temperature</button>';
var tempType = "fahrenheit";
var temp = 0;
function CtoF(celsius) {
  return celsius * 9/5 + 32;
}

function FtoC(fahrenheit) {
  return (fahrenheit - 32) * 5/9;
}

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $.ajax( {
        url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long,
        success: function(data) {
          console.log(data);
          temp = data["main"]["temp"];
          var iconUrl = data["weather"][0]["icon"];
          var weather = data["weather"][0]["main"].toLowerCase();
          weather = "cloud";
          //backgroound image
          document.body.style.backgroundRepeat = "no-repeat";
          if (weather.includes("rain")) {
            document.body.style.backgroundImage = "url('images/rain.jpg')";
          }
          else if (weather.includes("snow")) {
            document.body.style.backgroundImage = "url('images/snow.jpg')";
          }
          else {
            document.body.style.backgroundImage = "url('images/cloudy.jpg')";
          }

          //weaather info
          $("#icon").html('<img class="img-responsive" src="' + iconUrl + '">' );
          $("#temperature").html(temp + " F ");
          document.getElementById("convert").style.visibility = "visible";
          $("#city").html(data["name"]);
          $("#condition").html(data["weather"][0]["description"]);
          $("#wind").html("wind speed: " + data["wind"]["speed"] + "m/s deg: " + data["wind"]["deg"]);
        },
        cache: false
      });
    });
  }
  
  $("#convert").on("click", function() {
    if (tempType === "fahrenheit") {
      temp = FtoC(temp);
      $("#temperature").html(temp + " C ");
      tempType = "celsius";
    }
    else {
      temp = CtoF(temp);
      $("#temperature").html(temp + " F ");
      tempType = "fahrenheit";
    }
  });

  document.getElementById("convert").style.visibility = "hidden";
});