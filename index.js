'use strict';


'use strict';

 /**
  * @author Brandel Tsagueu
  * @date 12.07.21
  * @version 1.0
  * 
  * i create all necessaries nodes (HTML-Elemente) for 
  * using in User class
  */
  const standort_verwalten = document.querySelector('#standort-verwalten');
  const menu_ctn = document.querySelector('#menu-ctn');
  const menu_header = document.querySelector('.menu-header');
  const menu = document.querySelector('.menu');

  //menu content build
  const cityName = document.createElement('span');
  cityName.id = 'cityName';
  const defaultCity = document.createTextNode( localStorage.getItem('defaultCityName') );
  cityName.appendChild( defaultCity );
  const menu_weather_logo_div = document.createElement('div');
  menu_weather_logo_div.id = 'menu-weather-logo-div'; 
  const menu_weather_logo = document.createElement('img');
  menu_weather_logo.id = 'menu-weather-logo';
  const menu_weather_logo_tmp = document.createElement('span');
  menu_weather_logo_tmp.id = 'menu-weather-logo-temp'; 
  menu_weather_logo_div.append(menu_weather_logo_tmp, menu_weather_logo);
  document.querySelector('.standort').append( cityName , menu_weather_logo_div );


  const getinput = document.createElement('div');
  getinput.id = 'menu-getinput';

  const input = document.createElement('input');
  input.id = 'input-storage';  
  input.required = true;
  input.placeholder = 'Beliebten Standort ändern';

  const submit = document.createElement('input');
  submit.type = "button";
  submit.value = "Ok";
  submit.id = 'btn-storage';

  getinput.append(input, submit);
  menu_header.append(getinput); 
  document.querySelector('#menu-getinput').style.display = 'none';

document.body.style.fontFamily = 'tahoma';

// class WeatherApp 
// {
//     constructor() {

//     }

// }

      
let p = document.createElement('p');
    const p_content = document.createTextNode("Der Stadtname ist falsch");
    p.style.width = '100vw';
    p.style.height = '20px';
    p.style.color = 'white';
    p.style.backgroundColor = 'red';
    p.style.fontFamily = 'tahoma';
    p.style.fontSize = '1rem';
    p.style.position = 'fixed';
    p.style.bottom = '0';
    p.style.textAlign = 'center';
    p.style.display = 'block';
    p.appendChild(p_content);
    document.body.appendChild(p);
//3) ************** PROVIDER **************
function Provider( apiKey )
{
    this.apiKey = apiKey;
}
Provider.prototype.fetchWeatherByCityName = function( cityName ) {

    let fetchedCurrentData = {};
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&lang=de&appid="+ this.apiKey)
    .then( (response) => {
        console.log(response)
        if ( response.ok ) 
            return response.json();
    },
    (reason) => console.log(new Error('fetch failed : ', reason)))
    .then( (data) => {
        fetchedCurrentData = data;
        new WorkData().displayCurrentWeather(data);
        this.fetchWeatherByGeolocation(data.coord.lat, data.coord.lon); 
        document.body.removeChild(p);
        return fetchedCurrentData;
    })
    .catch((reason) => { 
        console.log(reason); 
    });   

}












