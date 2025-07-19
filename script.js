const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
  const APIkey = 'e8eef0c0dfbfd0c9b446c9c38c45ae81';
  const city = document.querySelector('.search-box input').value;

  if (city === '') return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        cityHide.textContent = city;
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      if (cityHide.textContent === city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = '555px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
          container.classList.remove('active');
        }, 2500);

        // Update weather image
        switch (json.weather[0].main) {
          case 'Clear':
            image.src = "images/clear.png";
            break;
          case 'Rain':
            image.src = "images/rain.png";
            break;
          case 'Snow':
            image.src = "images/snow.png";
            break;
          case 'Clouds':
            image.src = 'images/cloud.png';
            break;
          case 'Mist':
          case 'Haze':
            image.src = 'images/mist.png';
            break;
          default:
            image.src = 'images/rain.png';
        }

        // Set data
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        // Clone and display animated info blocks
        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'Clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'Clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'Clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        // Remove previous clones
        const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalCloneInfoWeather = CloneInfoWeather.length;
        const CloneInfoWeatherFirst = CloneInfoWeather[0];

        const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const CloneInfoHumidityFirst = CloneInfoHumidity[0];

        const CloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const CloneInfoWindFirst = CloneInfoWind[0];

        // ...existing code...
        if (totalCloneInfoWeather > 0) {
          // Add null checks before removing classes
          if (CloneInfoWeatherFirst) {
            CloneInfoWeatherFirst.classList.remove('active-clone');
          }
          if (CloneInfoHumidityFirst) {
            CloneInfoHumidityFirst.classList.remove('active-clone');
          }
          if (CloneInfoWindFirst) {
            CloneInfoWindFirst.classList.remove('active-clone');
          }

          setTimeout(() => {
            if (CloneInfoWeatherFirst) CloneInfoWeatherFirst.remove();
            if (CloneInfoHumidityFirst) CloneInfoHumidityFirst.remove();
            if (CloneInfoWindFirst) CloneInfoWindFirst.remove();
          }, 2200);
        }
        // ...existing code...
      }
    });
});