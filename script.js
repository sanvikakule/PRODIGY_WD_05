const apiKey = "e45c858ef47b048dd9a9326283099e87";

function displayWeather(data) {
  document.getElementById("weather").classList.remove("hidden");
  document.getElementById("city").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temperature").textContent = `🌡 Temp: ${Math.round(data.main.temp)} °C`;
  document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `🌬 Wind Speed: ${data.wind.speed} m/s`;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  updateBackground(data.weather[0].main);

}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name!");

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
      alert(error.message);
      console.error("Fetch Error:", error);
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
        .then(response => {
          if (!response.ok) throw new Error("Unable to fetch location weather");
          return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => {
          alert(error.message);
          console.error("Geo Error:", error);
        });
    });
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}
function updateBackground(condition) {
  const body = document.body;

  let imageName = "default.jpg"; // fallback image

  switch (condition.toLowerCase()) {
    case "clear":
      imageName = "clear.jpg";
      break;
    case "clouds":
      imageName = "clouds.jpg";
      break;
    case "rain":
      imageName = "rain.jpg";
      break;
    case "thunderstorm":
      imageName = "storm.jpg";
      break;
    case "snow":
      imageName = "snow.jpg";
      break;
    case "mist":
    case "fog":
    case "haze":
      imageName = "mist.jpg";
      break;
  }

  body.style.backgroundImage = `url('${imageName}')`;
}
