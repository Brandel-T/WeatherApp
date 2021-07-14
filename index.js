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
Provider.prototype.fetchWeatherByGeolocation= function( latitude, longitude ) {

    let fetchedCurrentData = {};
            // https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt={time}&appid=${this.apiKey}
    fetch( `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${this.apiKey}`)
    .then(  (response) => {
        if ( response.ok ) {
            response.json()
            .then( (data) => {
                fetchedCurrentData = data;
                new WorkData().displayDailyForecast(data);
                new WorkData().displayHourlyForecast(data);
            })
        } else {
            console.error("ERROR by getting weather data using geolocation");
        }
    });

    // console.log("par la geolocalisation          ..............", fetchedCurrentData);
    return fetchedCurrentData;
}  




localStorage.setItem( "bool", `false` ); 
class Init
{
    constructor() {
        this.isInitialize = false; 
    }

    getParameter()
    { 
        // const defaultCityName = window.localStorage.getItem('defaultCityName'); 
        const defaultCityName = document.querySelector('#city').value;
        // let bool = new Boolean( localStorage.getItem("bool") );
        // alert( bool instanceof Boolean);
        // bool = false;
        // counter = 1;
        // if ()

        // // if ( localStorage.getItem("bool") === 'false' ) 
        // if (this.isInitialize == false || localStorage.getItem("bool") === 'false')
        // { 
        //     this.isInitialize = true;
        //     // alert("la valeur de 'bool' est  ---> " + this.bool)
        //     fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ new Provider('c9842f587841ab3d8440bdae432a3299').apiKey)
        //     .then ( (res) => {
        //         if ( res.ok ) { //request success
        //             // bool = true;
        //             localStorage.setItem( "bool", `true` ); 
        //             localStorage.setItem("defaultCityName", defaultCityName); 
        //             // document.querySelector('#home').setAttribute('class','home-transition'); 
        //             this.getNextPage();  
        //         }
        //         else {
        //             document.querySelector('.requied').style.display = 'block';
        //             window.setTimeout( function() {
        //                 document.querySelector('.requied').style.display = 'none';
        //             },
        //             5000);
        //         } 
                
        //         }, 
        //         (reason) => {
        //             window.alert('Check your Internet quality');
        //             console.error(reason);
        //     })
        //     .catch((reason)=> console.error(reason));

        // }
        // else if ( localStorage.getItem("bool") === 'true' ) {
        //     this.getNextPage();
        //     document.querySelector('#home').setAttribute('class','home-transition'); 
        // }
        
        if ( localStorage.getItem( 'defaultCityName' ) !== null ) {
            this.closeHomePage();
            this.getNextPage();
            document.querySelector('#home').setAttribute('class','home-transition');  
        }
        else {
            fetch( "http://api.openweathermap.org/data/2.5/weather?q=" + defaultCityName + "&units=metric&lang=de&appid="+ new Provider('c9842f587841ab3d8440bdae432a3299').apiKey)
            .then ( (res) => {
                if ( res.ok ) { 
                    localStorage.setItem("defaultCityName", defaultCityName);  
                    this.getNextPage();  
                }
                else {
                    document.querySelector('.requied').style.display = 'block';
                    window.setTimeout( function() {
                        document.querySelector('.requied').style.display = 'none';
                    },
                    5000);
                } 
                
                }, 
                (reason) => {
                    window.alert('Check your Internet quality');
                    console.error(reason);
            })
            .catch((reason)=> console.error(reason));

        }
    }

    getNextPage() { 

        const home_ctn = document.querySelector('.home-ctn');
        const home_ctn_childs = home_ctn.children;

        for (let i=2; i<home_ctn_childs.length; i++) {
            home_ctn_childs[i].style.transition = '2s ease-in-out';
            home_ctn_childs[i].style.display = 'none';
        }

        setTimeout(() => {
            // document.querySelector('#home').setAttribute('class','home-transition');  
            this.closeHomePage(); 

        }, 2000);

        new Provider( 'c9842f587841ab3d8440bdae432a3299' ).fetchWeatherByCityName( localStorage.getItem("defaultCityName") ); 
        document.querySelector('#cityName').innerText = localStorage.getItem('defaultCityName'); 
        document.querySelector('#city').innerText = localStorage.getItem('defaultCityName');         
    }

    closeHomePage() {
        document.querySelector('#home').style.display = 'none';    
        document.querySelector('#main-bloc').style.display = 'block';
        document.querySelector('.bloc-prevision').style.display = 'flex';
        document.querySelector('.container').style.display = 'block'; 

        localStorage.setItem("bool", 'true');

        // localStorage.setItem( "bool", 'false' ); 
        console.log( 'typeof :  localStorage.getItem("bool")' ,typeof localStorage.getItem("bool") );
        // this.getNextPage();  
    }
}

document.querySelector('#home-btn').addEventListener('click', function(){
    new Init().getParameter();
});
document.querySelector('#city').addEventListener('keyup', function(event) {
    if (event.key == "Enter")  
        new Init().getParameter();  
}); 

if ( window.localStorage.getItem('bool') == 'true' ) {
    new Init().closeHomePage()
}

if ( localStorage.getItem( 'defaultCityName' ) !== null ) {
    new Init().closeHomePage();
    new Init().getNextPage();
    document.querySelector('#home').setAttribute('class','home-transition'); 
    console.log('yesssss')
}







//1) ****** TIMER *****
function Reorganizer( days , months )
{ 
    this.days = days; // []  
    this.months = months ; // []  
} 

Reorganizer.prototype.displayDaysInorder = function()
{
    let daysInOrder, today, options, current_day;  
    today = new Date(); 
    options = {weekday: 'long'}; 
    current_day = today.toLocaleDateString('de-DE', options);      
    current_day = current_day.charAt(0).toUpperCase() + current_day.slice(1); 
    daysInOrder = this.days.slice( this.days.indexOf(current_day)+1 ).concat( this.days.slice(0, this.days.indexOf(current_day)+1)); 

    //print days in order in Forecast
    let day = document.querySelectorAll('.day');
    for (let i=0; i<day.length; i++) {
        day[i].innerText = daysInOrder[i];
    } 

    return daysInOrder; 
}


Reorganizer.prototype.changeHour = function( days_ordered ) 
{ 
    setInterval( 
        function () { 
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
            const d = new Date();
            // let sec = d.getSeconds();
            let min = d.getMinutes();
            let h = d.getHours();
    
            // if ( d.getSeconds() < 10 ) sec = `0${d.getSeconds()}`; 
            if ( d.getMinutes() < 10 ) min = `0${d.getMinutes()}`;
            if ( d.getHours() < 10 ) h = `0${d.getHours()}`;
            document.querySelector('p.hour').innerHTML = days_ordered[days_ordered.length-1] + ", "+ d.getDate() + " " + months[d.getMonth()]+ " " + d.getFullYear()+ `, <strong> ${h}:${min} </strong>` ;
        },
        1000
    );
}
const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
const reorganizeDays = new Reorganizer( days, months );
let daysInOrder = reorganizeDays.displayDaysInorder();  // default daysInOrder
reorganizeDays.changeHour( daysInOrder );






//2) ********  MENU_BAR_INTERACTIONS  *********
function MenuBarInteractions( openMenuBtn, closeMenuBtn ) 
{
    this.openMenuBtn = openMenuBtn;
    this.closeMenuBtn = closeMenuBtn;
}

MenuBarInteractions.prototype.openMenu = function openMenu() {  
    this.openMenuBtn.addEventListener('click', () => {
        document.querySelector('.menu').style.width = '350px'; 
        document.body.style.transition = '.3s ease-in-out'; 
        document.querySelector('.menu-header').style.display = 'block'; 
        document.querySelector('#standort-verwalten').style.display = 'block';
    });
}
MenuBarInteractions.prototype.closeMenu = function closeMenu() {
    this.closeMenuBtn.addEventListener('click', () => {
        document.querySelector('.menu').style.width = '0px'; 
        document.body.style.transition = '.3s ease-in-out';  
        document.querySelector('.menu-header').style.display = 'none';
        document.querySelector('#standort-verwalten').style.display = 'none';
    });
}
const menuInteraction = new MenuBarInteractions( document.querySelector('.menu-icon'), document.querySelector('.toclose-icon') );
menuInteraction.openMenu();
menuInteraction.closeMenu();








