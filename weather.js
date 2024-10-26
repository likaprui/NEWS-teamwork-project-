// menu
let menu=document.getElementById("menu")
let navbar=document.getElementsByTagName("nav")[0]

menu.addEventListener("click", ()=>{
    if(navbar.style.visibility==="hidden"){
        navbar.style.visibility="visible";
    }
    else{
        navbar.style.visibility="hidden"
        
    }
})

window.addEventListener('resize', ()=>{
    if(window.innerWidth>640){
        navbar.style.visibility="visible"
    }else{
        navbar.style.visibility="hidden"
    }
})

// a News tag drop-down
const newsA=document.getElementById("news-a")
const newsTypesList=document.getElementById("news-types")

newsA.addEventListener("click", function(e){
    e.preventDefault();

    if(newsTypesList.classList.contains("show")){
        newsTypesList.classList.remove("show")
        newsA.classList.remove("open")
    }else{
        newsTypesList.classList.add("show")
        newsA.classList.add("open")
    }
})

document.addEventListener("DOMContentLoaded", () => {
    const defaultLat = 41.7151;
    const defaultLon = 44.8271;

    fetchWeatherData('Tbilisi', 'GE', defaultLat, defaultLon);

    const fetchWeatherBtn = document.getElementById('fetch-weather-btn');
    fetchWeatherBtn.addEventListener('click', () => {
        const cityInput = document.getElementById('location').value;
        if (cityInput.trim() !== "") {
            fetchWeatherData(cityInput);
        }
    });
});

function fetchWeatherData(city, country = 'GE', lat = null, lon = null) {
    DailyApi(city, country)
        .then(displayDailyWeather)
        .catch(error => {
            console.error("Error fetching daily weather:", error);
        });

    if (lat && lon) {
        HourlyApi(lat, lon)
            .then(displayHourlyWeather)
            .catch(error => {
                console.error("Error fetching hourly weather:", error);
            });
    } else {
        getGeolocation(city)
            .then(({ lat, lon }) => {
                HourlyApi(lat, lon)
                    .then(displayHourlyWeather)
                    .catch(error => {
                        console.error("Error fetching hourly weather for city:", error);
                    });
            });
    }
}

function getGeolocation(city) {
    return new Promise((resolve, reject) => {
        fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data && data[0]) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;
                    resolve({ lat, lon });
                } else {
                    reject("City not found");
                }
            })
            .catch(error => {
                console.error("Error fetching geolocation:", error);
                reject(error);
            });
    });
}

//რუკა
var map = L.map('map').setView([41.6941, 44.8337], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let lastMarker = null;

function getAddress(lat, lon) {
    return new Promise((resolve, reject) => {
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.address) {
                    const city = data.address.city || data.address.town || data.address.village || "Unknown city";
                    const country = data.address.country || "Unknown country";
                    lastMarker.setTooltipContent(`Latitude: ${lat}, Longitude: ${lon}<br>City: ${city}<br>Country: ${country}`);
                    lastMarker.openTooltip();
                    resolve({ city, country });
                } else {
                    reject("Location not found");
                }
            })
            .catch(error => {
                console.error("Error fetching address:", error);
                reject(error);
            });
    });
}

map.on('click', function(e) {
    const latLng = e.latlng;

    if (lastMarker) {
        map.removeLayer(lastMarker);
    }

    lastMarker = L.marker([latLng.lat, latLng.lng])
        .addTo(map)
        .bindTooltip(`Latitude: ${latLng.lat}, Longitude: ${latLng.lng}`)
        .openTooltip();

    getAddress(latLng.lat, latLng.lng)
        .then(({ city, country }) => {
            return DailyApi(city, country);
        })
        .then(weatherData => {
            displayDailyWeather(weatherData);

            HourlyApi(latLng.lat, latLng.lng)
                .then(displayHourlyWeather)
                .catch((error) => {
                    console.log("Error fetching hourly weather:", error);
                });
        })
        .catch(error => {
            console.error("Error:", error);
        });
});

//დღის ამინდი
const dailyIcons = {
    'u00d': 'weatherIcons/rain1.png',
    'u00n': 'weatherIcons/rain1.png',
    'r06d': 'weatherIcons/rain1.png',
    'r06n': 'weatherIcons/rain1.png',
    'r03d': 'weatherIcons/rain1.png',
    'r03n': 'weatherIcons/rain1.png',
    'r02d': 'weatherIcons/rain1.png',
    'r02n': 'weatherIcons/rain1.png',
    'f01d': 'weatherIcons/rain1.png',
    'f01n': 'weatherIcons/rain1.png',
    'r01d': 'weatherIcons/sunrain1.png',
    'r01n': 'weatherIcons/moonrain1.png',
    'r04d': 'weatherIcons/sunrain1.png',
    'r04n': 'weatherIcons/moonrain1.png',
    'r05d': 'weatherIcons/sunrain1.png',
    'r05n': 'weatherIcons/moonrain1.png',
    's01d': 'weatherIcons/snow.png',
    's01n': 'weatherIcons/snow.png',
    's02d': 'weatherIcons/snow.png',
    's02n': 'weatherIcons/snow.png',
    's03d': 'weatherIcons/snow.png',
    's03n': 'weatherIcons/snow.png',
    's04d': 'weatherIcons/snow.png',
    's04n': 'weatherIcons/snow.png',
    's05d': 'weatherIcons/snow.png',
    's05n': 'weatherIcons/snow.png',
    's06d': 'weatherIcons/snow.png',
    's06n': 'weatherIcons/snow.png',
    'd01d': 'weatherIcons/snow.png',
    'd01n': 'weatherIcons/snow.png',
    'd02d': 'weatherIcons/snow.png',
    'd02n': 'weatherIcons/snow.png',
    'd03d': 'weatherIcons/snow.png',
    'd03n': 'weatherIcons/snow.png',
    't01d': 'weatherIcons/thunder1.png',
    't01d': 'weatherIcons/thunder1.png',
    't02d': 'weatherIcons/thunder1.png',
    't02d': 'weatherIcons/thunder1.png',
    't03d': 'weatherIcons/thunder1.png',
    't03d': 'weatherIcons/thunder1.png',
    't04d': 'weatherIcons/thunder1.png',
    't04d': 'weatherIcons/thunder1.png',
    't05d': 'weatherIcons/thunder1.png',
    't05d': 'weatherIcons/thunder1.png',
    'c01d': 'weatherIcons/sun1.png',
    'c01n': 'weatherIcons/moon1.png',
    'c02d': 'weatherIcons/suncloud1.png',
    'c02n': 'weatherIcons/mooncloud1.png',
    'c03d': 'weatherIcons/clouds1.png',
    'c03n': 'weatherIcons/clouds1.png',
    'c04d': 'weatherIcons/clouds1.png',
    'c04n': 'weatherIcons/clouds1.png',
    'a01d': 'weatherIcons/fog.png',
    'a01n': 'weatherIcons/fog.png',
    'a02d': 'weatherIcons/fog.png',
    'a02n': 'weatherIcons/fog.png',
    'a03d': 'weatherIcons/fog.png',
    'a03n': 'weatherIcons/fog.png',
    'a04d': 'weatherIcons/fog.png',
    'a04n': 'weatherIcons/fog.png',
    'a05d': 'weatherIcons/fog.png',
    'a05n': 'weatherIcons/fog.png',
    'a06d': 'weatherIcons/fog.png',
    'a06n': 'weatherIcons/fog.png'
};

function DailyApi(city, country) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=5208bce886dd4d9b94e27f1b0d478391`)
            .then((data) => data.json())
            .then((data) => {
                resolve(data);
            })
            .catch(() => {
                console.log('Fetching Error');
                reject('Fetching Error');
            });
    });
}

const displayDailyWeather = (data) => {
    const weatherDiv = document.getElementById('daily-weather-div');
    const city = data.city_name;
    const country = data.country_code;
    const weatherData = data.data;
    const currentDay = data.data[0];
    
    weatherDiv.innerHTML = '';

    document.getElementById('current-weather-icon').src = dailyIcons[currentDay.weather.icon];
    document.getElementById('current-weather-temp').textContent = `${currentDay.temp}°C`;
    document.getElementById('current-weather-date').textContent = currentDay.valid_date;
    document.getElementById('current-location').textContent = `${city}, ${country}`;
    document.getElementById('current-descrp').textContent = currentDay.weather.description;
    document.getElementById('min').textContent = `Min: ${currentDay.min_temp}°C`;
    document.getElementById('max').textContent = `Max: ${currentDay.max_temp}°C`;

    const currentWindElement = document.getElementById('current-wind');
    currentWindElement.innerHTML = '';
    const windIcon = document.createElement('span');
    const windImage = document.createElement('img');
    windImage.src = 'weatherIcons/wind.png';
    windImage.alt = 'Wind Icon';
    windImage.classList.add('wind-icon');
    windIcon.appendChild(windImage);
    const windText = document.createTextNode(` Wind: ${currentDay.wind_spd} m/s, ${currentDay.wind_cdir_full}`);
    currentWindElement.appendChild(windIcon);
    currentWindElement.appendChild(windText);

    weatherData.forEach((day, index) => {
        const dayContainer = createWeatherDayDiv(day);
        
        if (index >= 4) {
            dayContainer.classList.add('hidden-weather-day');
        }

        weatherDiv.appendChild(dayContainer);
    });

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show More';
    toggleButton.classList.add('daily-toggle-button');

    toggleButton.addEventListener('click', () => {
        const hiddenDays = document.querySelectorAll('.hidden-weather-day');
        const isHidden = hiddenDays[0].style.display === 'none' || hiddenDays[0].style.display === '';

        hiddenDays.forEach((day) => {
            day.style.display = isHidden ? 'flex' : 'none';
        });

        toggleButton.textContent = isHidden ? 'Show Less' : 'Show More';
    });

    weatherDiv.appendChild(toggleButton);
};

const createWeatherDayDiv = (day) => {
    const dayContainer = document.createElement('div');
    dayContainer.classList.add('weather-day');

    const dateElement = document.createElement('h4');
    dateElement.textContent = day.valid_date;
    dayContainer.appendChild(dateElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = day.weather.description;
    dayContainer.appendChild(descriptionElement);

    const iconElement = document.createElement('img');
    iconElement.src = dailyIcons[day.weather.icon] || `https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`;
    dayContainer.appendChild(iconElement);

    const tempElement = document.createElement('p');
    tempElement.textContent = `${day.temp}°C`;
    dayContainer.appendChild(tempElement);

    const tempContainer = document.createElement('div');
    tempContainer.classList.add('temperature-container');
    const maxTempElement = document.createElement('span');
    maxTempElement.textContent = `Max: ${day.max_temp}°C`;
    tempContainer.appendChild(maxTempElement);
    const minTempElement = document.createElement('span');
    minTempElement.textContent = `Min: ${day.min_temp}°C`;
    tempContainer.appendChild(minTempElement);
    dayContainer.appendChild(tempContainer);

    const windElement = document.createElement('p');
    windElement.classList.add('wind-p');
    const windIcon = document.createElement('span');
    const windImage = document.createElement('img');
    windImage.src = 'weatherIcons/wind.png';
    windImage.alt = 'Wind Icon';
    windImage.classList.add('wind-icon');
    windIcon.appendChild(windImage);
    windElement.appendChild(windIcon);
    const windText = document.createElement('span');
    windText.textContent = ` ${day.wind_spd} m/s, ${day.wind_cdir_full}`;
    windElement.appendChild(windText);
    dayContainer.appendChild(windElement);

    return dayContainer;
};

DailyApi()
    .then(displayDailyWeather)
    .catch(() => {
        console.log('Fetching error')
    });

//საათობრივი ამინდი
const weatherIcons = {
    '01d': 'weatherIcons/sun1.png',
    '01n': 'weatherIcons/moon1.png',
    '02d': 'weatherIcons/suncloud1.png',
    '02n': 'weatherIcons/mooncloud1.png',
    '03d': 'weatherIcons/clouds1.png',
    '03n': 'weatherIcons/clouds1.png',
    '04d': 'weatherIcons/clouds1.png',
    '04n': 'weatherIcons/clouds1.png',
    '09d': 'weatherIcons/sunrain1.png',
    '09n': 'weatherIcons/moonrain1.png',
    '10d': 'weatherIcons/rain1.png',
    '10n': 'weatherIcons/rain1.png',
    '11d': 'weatherIcons/thunder1.png',
    '11n': 'weatherIcons/thunder1.png',
    '13d': 'weatherIcons/snow.png',
    '13n': 'weatherIcons/snow.png',
    '50d': 'weatherIcons/fog.png',
    '50n': 'weatherIcons/fog.png'
};

function HourlyApi(lat, lon) { 
    return new Promise((resolve, reject) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ec88c2bc809ccde440f2718c6ba05991`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            console.log('Fetching Error:', error);
            reject('Fetching Error');
        });
    });
}

const displayHourlyWeather = (data) => {
    console.log(data);

    const weatherDiv = document.getElementById('houly-weather-div');
    const weatherData = data.list;
    weatherDiv.innerHTML = '';

    const allHourContainers = document.createDocumentFragment();

    weatherData.forEach((hour, index) => {
        const hourContainer = document.createElement('div');
        hourContainer.classList.add('hourly-weather-hour');

        const timeElement = document.createElement('p');
        const hourTime = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        timeElement.textContent = `${hourTime}`;
        hourContainer.appendChild(timeElement);

        const tempElement = document.createElement('p');
        const tempCelsius = (hour.main.temp - 273.15).toFixed(1);
        tempElement.textContent = `${tempCelsius}°C`;
        hourContainer.appendChild(tempElement);

        const iconElement = document.createElement('img');
        const iconCode = hour.weather[0].icon;
        const customIcon = weatherIcons[iconCode];

        if (customIcon) {
            iconElement.src = customIcon;
        } else {
            iconElement.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        }
        iconElement.alt = hour.weather[0].description;
        hourContainer.appendChild(iconElement);

        const conditionElement = document.createElement('p');
        const weatherDescription = hour.weather[0].description;
        conditionElement.textContent = `${weatherDescription}`;
        hourContainer.appendChild(conditionElement);

        const precipElement = document.createElement('p');
        precipElement.classList.add('humidity-p');
        const precipIcon = document.createElement('span');
        const precipImage = document.createElement('img');
        precipImage.src = 'weatherIcons/humidity.png';
        precipImage.alt = 'Precipitation Icon';
        precipImage.classList.add('precip-icon');
        precipIcon.appendChild(precipImage);
        const precipitation = hour.rain ? `${hour.rain['3h']} mm` : '0 mm';
        precipElement.appendChild(document.createTextNode(precipitation));
        hourContainer.appendChild(precipElement);

        allHourContainers.appendChild(hourContainer);

        if (index >= 6) {
            hourContainer.classList.add('hidden-hour');
        }
    });

    weatherDiv.appendChild(allHourContainers);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Show More';
    toggleButton.classList.add('hour-toggle-button');

    toggleButton.addEventListener('click', () => {
        const hiddenHours = document.querySelectorAll('.hidden-hour');
        const isHidden = hiddenHours[0].style.display === 'none' || hiddenHours[0].style.display === '';

        hiddenHours.forEach((hour) => {
            hour.style.display = isHidden ? 'flex' : 'none';
        });

        toggleButton.textContent = isHidden ? 'Show Less' : 'Show More';
    });

    weatherDiv.appendChild(toggleButton);
};

HourlyApi()
    .then(displayHourlyWeather)
    .catch(() => {
        console.log('Fetching error')
    });