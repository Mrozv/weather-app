const cityName = document.querySelector(".cityName");
const input = document.querySelector(".input");
const send = document.querySelector(".send");
const checkInput = document.querySelector(".checkInput");
const img = document.querySelector(".img");
const weather = document.getElementById("weat");
const temp = document.getElementById("temp");
const humidity = document.getElementById("hum");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=d565c872fcfc31e76ac82a3e0f64abd4";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

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

      temp.textContent = Math.floor(temperature) + "°C";
      humidity.textContent = hum + "%";
      weather.textContent = weat;
      cityName.style.textTransform = "capitalize";
      cityName.textContent = city;

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
    .catch(() => (checkInput.textContent = "Choose correct city name..."));
};

send.addEventListener("click", getWeather);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});
