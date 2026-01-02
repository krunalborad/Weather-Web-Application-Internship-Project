
document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = "Loading...";

    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!response.ok) {
            throw new Error("City not found or API error.");
        }
        const data = await response.json();

        const current = data.current_condition[0];
        const tempC = current.temp_C;
        const weatherDesc = current.weatherDesc[0].value;
        const humidity = current.humidity;
        const windSpeed = current.windspeedKmph;

        weatherInfo.innerHTML = `
            <h2>${city.toUpperCase()}</h2>
            <p>Temperature: ${tempC}°C</p>
            <p>Condition: ${weatherDesc}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} km/h</p>
        `;
    } catch (error) {
        weatherInfo.innerHTML = "Error: " + error.message;
    }
}