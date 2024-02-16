const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const changeTemperature = document.querySelector('#convertTemp')
var measurementType = `metric`;

changeTemperature.addEventListener('change', checkbox => {

    if(checkbox.target.checked === false){
        measurementType = `metric`
    }else if (checkbox.target.checked === true){
        measurementType = `imperial`
    }
});

search.addEventListener('click', () => {

    const APIKey = '6950a84c971aa557cb38bd8c4e9a1754';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=`+ measurementType +`&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '500px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }

            if (measurementType === 'metric'){
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                wind.innerHTML = `${parseInt(json.wind.speed)}mps`;
            } else if(measurementType === 'imperial'){
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°F</span>`;
                wind.innerHTML = `${parseInt(json.wind.speed)}mph`;
            }

            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        }
    );
});
