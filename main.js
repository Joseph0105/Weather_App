const loader = document.querySelector(".loader");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (location) => {
      const longitude = location.coords.longitude;
      const latitude = location.coords.latitude;

      getWeatherData(longitude, latitude);
      getWeatherForecast(longitude, latitude);
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
    handleHour(data.hourly);

    loader.classList.add("fade-out");
  } catch (error) {
    loader.textContent = `${error}`;
    loader.style.display = "none";
  }
}

const position = document.querySelector(".postion");
const temperature = document.querySelector(".temperature");
const weatherImage = document.querySelector("img");
const currentHour = new Date().getHours();

function populateMainInfo(data) {
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  console.log(temperature);

  position.textContent = data.name;

  if (currentHour >= 6 && currentHour < 20) {
    weatherImage.src = `ressources/jour/${data.weather[0].icon}.svg`;
  } else {
    weatherImage.src = `ressources/nuit/${data.weather[0].icon}.svg`;
  }
}

async function getWeatherForecast(longitude, latitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=America%2FNew_York&start_date=2023-02-28&end_date=2023-03-07`
    );

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const dataForecast = await response.json();
    console.log(dataForecast);
    handleHour(dataForecast.hourly);

    loader.classList.add("fade-out");
  } catch (error) {
    loader.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function handleHour(dataForecast) {
  const hourNameBlock = document.querySelectorAll(".hour-name");
  const hourTemp = document.querySelectorAll(".hour-temp");

  hourNameBlock.forEach((block, index) => {
    const incrementedHour = currentHour + index * 3;

    if (incrementedHour > 24) {
      const calcul = incrementedHour - 24;
      hourNameBlock[index].textContent = `${calcul === 24 ? "00" : calcul}h`;
    } else if (incrementedHour === 24) {
      hourNameBlock[index].textContent = "00h";
    } else {
      hourNameBlock[index].textContent = `${incrementedHour}h`;
    }
    hourTemp[index].textContent = `${Math.trunc(
      dataForecast.temperature_2m[index * 3]
    )}°C`;
  });
  handleDays(dataForecast);
}

const weekDays = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

const currentDay = new Date().toLocaleDateString("fr-FR", { weekday: "long" });

const forecastDays = weekDays
  .slice(weekDays.indexOf(currentDay) + 1)
  .concat(weekDays.slice(0, weekDays.indexOf(currentDay) + 1));

const daysName = document.querySelectorAll(".day-name");
const perDayTemperature = document.querySelectorAll(".day-temp");

function handleDays(dataForecast) {
  forecastDays.forEach((day, index) => {
    daysName[index].textContent =
      forecastDays[index].charAt(0).toUpperCase() +
      forecastDays[index].slice(1, 3);

    perDayTemperature[index].textContent = `${Math.trunc(
      dataForecast.temperature_2m[index * 3]
    )}°C`;
  });
}
