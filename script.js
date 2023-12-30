const cityName = document.querySelector(".cityName");
const input = document.querySelector(".input");
const send = document.querySelector(".send");
const checkInput = document.querySelector(".checkInput");
const img = document.querySelector(".img");
const weather = document.getElementById("weat");
const temp = document.getElementById("temp");
const humidity = document.getElementById("hum");
const windsp = document.getElementById("windsp");
const press = document.getElementById("press");
const vis = document.getElementById("vis");
const currentLanguage = document.querySelector(".name");
const plFlag = document.getElementById("pl");
const engFlag = document.getElementById("eng");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=d565c872fcfc31e76ac82a3e0f64abd4";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

  const language = () => {
    if (currentLanguage.textContent === "Aplikacja pogodowa") {
      checkInput.textContent = "Wprowadź poprawną nazwę miasta...";
    } else {
      checkInput.textContent = "Check your city name...";
    }
  };

  checkInput.textContent = "";
  input.value = "";

  axios
    .get(URL)
    .then((res) => {
      console.log(res.data);
      const temperature = res.data.main.temp;
      const hum = res.data.main.humidity;
      const weat = res.data.weather[0].main;
      const id = res.data.weather[0].id;
      const windSpeed = res.data.wind.speed;
      const pressure = res.data.main.pressure;
      const visibility = res.data.visibility;
      const windDirection = res.data.wind.deg;

      temp.textContent = Math.floor(temperature) + "°C";
      humidity.textContent = hum + "%";
      weather.textContent = weat;
      cityName.style.textTransform = "capitalize";
      cityName.textContent = city;
      press.textContent = pressure + " hPa";
      vis.textContent = visibility + " m";

      if (windDirection === 0) {
        windsp.textContent = windSpeed + " m/s " + "N";
      } else if (windDirection > 0 && windDirection < 90) {
        windsp.textContent = windSpeed + " m/s " + "NE";
      } else if (windDirection === 90) {
        windsp.textContent = windSpeed + " m/s " + "E";
      } else if (windDirection > 90 && windDirection < 180) {
        windsp.textContent = windSpeed + " m/s " + "SE";
      } else if (windDirection === 180) {
        windsp.textContent = windSpeed + " m/s " + "S";
      } else if (windDirection > 180 && windDirection < 270) {
        windsp.textContent = windSpeed + " m/s " + "SW";
      } else if (windDirection === 270) {
        windsp.textContent = windSpeed + " m/s " + "W";
      } else if (
        (windDirection > 270 && windDirection < 360) ||
        (windDirection > 270 && windDirection < 0)
      ) {
        windsp.textContent = windSpeed + " m/s " + "NW";
      } else {
        windsp.textContent = windSpeed + " m/s";
      }

      if (id == "800") {
        img.setAttribute("src", "assets/sun.png");
      } else if (id == "500") {
        img.setAttribute("src", "assets/rain.png");
      } else if (id == "200") {
        img.setAttribute("src", "assets/thunderstorm.png");
      } else if (id == "803") {
        img.setAttribute("src", "assets/cloud.png");
      } else if (id == "300") {
        img.setAttribute("src", "assets/drizzle.png");
      } else if (id == "741") {
        img.setAttribute("src", "assets/fog.png");
      } else {
        img.setAttribute("src", "assets/unknown.png");
      }
    })
    .catch(() => language());
};

send.addEventListener("click", getWeather);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

const flag = () => {
  if (currentLanguage.textContent === "Aplikacja pogodowa") {
    engFlag.style.filter = "grayscale(1)";
    plFlag.style.filter = "grayscale(0)";
  } else {
    plFlag.style.filter = "grayscale(1)";
    engFlag.style.filter = "grayscale(0)";
  }
};

flag();
