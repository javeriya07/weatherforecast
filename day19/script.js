// Function to set background based on weather condition
function init(weatherData) {
  document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    switch (weatherData.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = "url('./images/clear.jpg')";
            break;
        case 'Clouds':
            document.body.style.backgroundImage = "url('./images/cloudy.jpeg')";
            break;
        case 'Rain':
            document.body.style.backgroundImage = "url('./images/rain.jpeg')";
            break;
        case 'Drizzle':
            document.body.style.backgroundImage = "url('./images/drizzle.jpg')";
            break;
        case 'Mist':
            document.body.style.backgroundImage = "url('./images/mist.jpeg')";
            break;    
        case 'Thunderstorm':
            document.body.style.backgroundImage = "url('./images/strom.jpeg')";
            break;
        case 'Snow':
            document.body.style.backgroundImage = "url('./images/snow.jpeg')";
            break;
        default:
            // Default background or no change
            break;
    }
}

// Weather fetching function
async function getWeather(city) {
    const API_KEY = "4767455b1ffd7c81c6ee5ee22627c7d2";
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if(!res.ok) {
            throw new Error("HTTP error! Status: ${res.status}");
        }

        const data = await res.json();
        
        // Update weather display
        document.getElementById("weatherOutput").textContent =` Temperature: ${data.main.temp}°C`;
        document.getElementById("weatherOutput1").textContent =`pressure: ${data.main.pressure} hPa`;
        document.getElementById("weatherOutput2").textContent =`Humidity: ${data.main.humidity}%`;
        document.getElementById("weatherOutput3").textContent = `WindSpeed: ${data.wind.speed} m/s`;
        
        // Call init to change background
        init(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById("weatherOutput").textContent = 'Error: ' + error.message;
    }
}

// Event listener
document.getElementById('button').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    getWeather(city);
});