const apiKey = '1462cc9261e48cc3b9f290fc2a77373c'; // API KEY (wEATHER)

// GRAB REFERENCES TO ALL THE DOM ELEMENTS
const weatherContainer = document.querySelector('#weatherInfo');
const searchButton = document.querySelector('#searchButton');
const cityNameInput = document.querySelector('#cityName');
const userInfoContainer = document.querySelector('#userInfo');


// FUNCTIONS
// FETCH THE DATA FOR THE GIVEN CITY
function fetchWeatherData(cityName) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching weather data:', error);
            return null;
        });
}

// DISPLAY THE FETCHED DATA
function displayWeatherData(weatherData) {
    if (weatherData) {
        const cityName = weatherData.name;
        const temperature = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;

        weatherContainer.innerHTML = `
            <div class="card">
                <h2>Weather for ${cityName}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            </div>
        `;
    } else {
        weatherContainer.innerHTML = '<p>Failed to fetch weather data.</p>';
    }
}

// FETCH USER DATA
function fetchUserData() {
    const userApiUrl = 'https://randomuser.me/api/';

    return fetch(userApiUrl)
        .then(response => response.json())
        .then(data => data.results[0])
        .catch(error => {
            console.error('Error fetching user data:', error);
            return null;
        });
}

// DISPLAY USER DATA
function displayUserData(userData) {
    if (userData) {
        const firstName = userData.name.first;
        const lastName = userData.name.last;
        const email = userData.email;
        const picture = userData.picture.medium;

        userInfoContainer.innerHTML = `
            <div class="user-card">
                <img src="${picture}" alt="${firstName} ${lastName}">
                <p>Name: ${firstName} ${lastName}</p>
                <p>Email: ${email}</p>
            </div>
        `;
    } else {
        userInfoContainer.innerHTML = '<p>Failed to fetch user data.</p>';
    }
}

// ADD A SUBMIT EVENT LISTENER FOR THE SEARCH FORM
searchButton.addEventListener('click', () => {
    const cityName = cityNameInput.value;
    weatherContainer.innerHTML = '<p>Loading weather...</p>';
    userInfoContainer.innerHTML = '<p>Loading user data...</p>';

    fetchWeatherData(cityName)
        .then(weatherData => {
            displayWeatherData(weatherData);
            return fetchUserData();
        })
        .then(userData => {
            displayUserData(userData);
        });
});
