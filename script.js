const apiKey = '88589623e4fe40b48e15523b83ce2736';

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('result');

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${city},India&key=${apiKey}`;


  try {
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultDiv.innerText = 'City not found!';
      document.body.style.background = '#f4f4f4';
      return;
    }

    const { lat, lng } = geoData.results[0].geometry;

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const weather = weatherData.current_weather;
    const temp = weather.temperature;

   // Set background image based on temperature
let message = '';
let bgImage = '';

if (temp >= 30) {
  message = '☀️ It\'s Sunny & Hot';
  bgImage = 'url("https://img.freepik.com/free-photo/natural-landscape-sunflowers-field-sunny-day_2829-9257.jpg?t=st=1744192650~exp=1744196250~hmac=250e3fd8feb7e865f4cdc40ad28592dd72c2c895f0199ffe32e00757c29576ba&w=1380")';
} else if (temp >= 20) {
  message = '🌤 Pleasant Weather';
  bgImage = 'url("https://cdn.pixabay.com/photo/2022/04/09/19/34/hut-7122148_1280.jpg")';
} else if (temp >= 10) {
  message = '🌧 Rainy or Cool';
  bgImage = 'url("https://wallpapercave.com/wp/wp6225101.jpg")';
} else {
  message = '❄️ Cold Weather';
  bgImage = 'url("https://thumbs.dreamstime.com/z/people-walking-new-york-city-manhattan-street-strong-snow-storm-blizzard-cold-weather-81721287.jpg?ct=jpeg")';
}

document.body.style.backgroundImage = bgImage;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';


    // Show weather result
    resultDiv.innerHTML = `
      <div class="card mx-auto shadow" style="max-width: 400px;">
        <div class="card-body">
          <h4 class="card-title">${city}</h4>
          <p class="card-text">Temperature: <strong>${temp}°C</strong></p>
          <p class="card-text">Windspeed: ${weather.windspeed} km/h</p>
          <p class="card-text">${message}</p>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Error:', error);
    resultDiv.innerText = 'Something went wrong.';
    document.body.style.background = '#f4f4f4';
  }
}
