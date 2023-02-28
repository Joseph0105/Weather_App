const loader = document.querySelector(".loader");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const longitude = location.coords.longitude;
      const latitude = location.coords.latitude;

      getWeatherData(longitude, latitude);
    },
    () => {
      loader.textContent =
        "Vous avez refusez la géolocalisation, activez la pour profiter de l'application";
    }
  );
}

async function getWeatherData(longitude, latitude) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7197931893803327fe9bee5cbcac7991`
    );

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    populateMainInfo(data);

    loader.classList.add("fade-out");
  } catch (error) {
    loader.textContent = `${error}`;
    loader.style.display = "none";
  }
}

const position = document.querySelector(".postion");
const temperature = document.querySelector(".temperature");
const weatherImage = document.querySelector("img");
const curentHour = new Date().getHours();

function populateMainInfo(data) {
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  console.log(temperature);

  position.textContent = data.name;

  if (curentHour >= 6 && curentHour < 21) {
    weatherImage.src = `ressources/jour/${data.weather[0].icon}.svg`;
  } else {
    weatherImage.src = `ressources/nuit/${data.weather[0].icon}.svg`;
  }
}
