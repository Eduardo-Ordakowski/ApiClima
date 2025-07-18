const weatherApiKey = "c390e37c00afe2bec8d0edfb9a27bedb";
const weatherHTML = document.querySelector('.weather');

let map;
document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cityName = document.querySelector('#cityName').value;

    if (!cityName) {
        showAlert
        (`
            Insira uma cidade!
            <img src="icons/rotatingEarthGif.gif">
        `)
    }


    const apiAcess = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${weatherApiKey}&units=metric&lang=pt_br`
    console.log(apiAcess)
    const result = await fetch(apiAcess);
    const json = await result.json();


    if(json.cod === 200)
    {
        showInfos({
            city: json.name,
            country: json.sys.country,

            description: json.weather[0].description,
            icon: json.weather[0].icon,
            
            temp: json.main.temp.toFixed(1),
            feelsLike: json.main.feels_like.toFixed(1),
            tempMin: json.main.temp_min.toFixed(1),
            tempMax: json.main.temp_max.toFixed(1),
            humidity: json.main.humidity,
            windSpeed: json.wind.speed.toFixed(1),
            
            lon: json.coord.lon,
            lat: json.coord.lat
        });
    }
    else
    {
        showAlert
        (`
            Insira uma cidade!
            <img src="icons/rotatingEarthGif.gif">
        `)
    }
});

function showInfos(json)
{
    initMap(json);
    showAlert('');

    let createHTML = 
    `
    <h1>${json.city} - ${json.country}</h1>
        <div id="map"></div>
            <div class="weatherInfos">
                <div class="tempInfos">
                    <div class="tempImg">
                        <img src="https://openweathermap.org/img/wn/${json.icon}.png" alt="img">
                    </div>

                    <div>
                        <p id="tempValue"> ${json.temp}<sup>C°</sup></p>
                        <p id="tempFeelsLike">Sensação Térmica: ${json.feelsLike}<sup>Cº</sup></p>
                        <p id="tempDescription">${json.description}</p>
                    </div>
                </div>

                <div class="dataInfos">

                    <div class="infos">
                        <i id="minTempImg" class="fa-solid fa-temperature-low"></i>
                        <div>
                            <h2>Temp. Min</h2>
                            <p>${json.tempMin}</p>
                        </div>
                    </div>

                    <div class="infos">
                        <i id="maxTempImg" class="fa-solid fa-temperature-high"></i>
                        <div>
                            <h2>Temp. Max</h2>
                            <p>${json.tempMax}</p>
                        </div>
                    </div>

                    <div class="infos">
                        <i id="humidityImg" class="fa-solid fa-droplet"></i>
                        <div>
                            <h2>Umidade</h2>
                            <p>${json.humidity} %</p>
                        </div>
                    </div>

                    <div class="infos">
                        <i id="windImg" class="fa-solid fa-wind"></i>
                        <div>
                            <h2>Vel. do Vento</h2>
                            <p>${json.windSpeed} Km/H</p>
                        </div>
                    </div>

                </div>
            </div>
    `

    weatherHTML.innerHTML = createHTML;
}

function showAlert(alertMsg)
{
    document.querySelector('.alert').innerHTML = alertMsg;
    weatherHTML.innerHTML = ``
}

async function initMap(json)
{
    const position = {lat: json.lat, lng: json.lon }

    const {Map} = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: position,
        mapId: "DEMO_MAP_ID"
    });

    const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

