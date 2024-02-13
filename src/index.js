function showTempData(response) {
  let city = document.querySelector("#city");
  city.innerHTML = `${response.data.city}`;

  let date = new Date(response.data.time * 1000);
  let dateElement = document.querySelector("#date-element");
  dateElement.innerHTML = showDate(date);

  let condition = document.querySelector("#condition");
  condition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let tempValue = document.querySelector("#temp-value");
  tempValue.innerHTML = Math.round(response.data.temperature.current);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img class="icon" src="${response.data.condition.icon_url}">`;

  getForecastData(response.data.city);
}

function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}


function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  updateCity(cityName.value);
}

function updateCity(city) {
  let apiKey = "a6a6a4b703t4o07f59125c740d4c5bf3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showTempData);
}

function getForecastData(city) {
  apiKey = "a6a6a4b703t4o07f59125c740d4c5bf3";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
function showDay(newTime) {
  let date = new Date(newTime * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function showForecast(response) {
  let forecastElement = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastElement =
        forecastElement +
        `<div class="forecast-day">
                    <div>
                        ${showDay(day.time)}
                    </div>
                    <div>
                        <img class="forecast-icon" src="${day.condition.icon_url
        }" />
                    </div>
                    <div class="forecast-temp">
                        <div><strong>${Math.round(
          day.temperature.maximum
        )}°</strong></div>
                        <div>${Math.round(day.temperature.minimum)}°</div>
                    </div>
                </div>`;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastElement;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);


updateCity("Sydney");

