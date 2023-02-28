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
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation&start_date=2023-02-28&end_date=2023-03-07`
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
  temperature.textContent = `${Math.round(data.hourly.temperature_2m[0])}°C`;
  console.log(temperature);
}
