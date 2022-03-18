// function to update clock and display date 
function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";
        // 24-hour to 12-hour format conversion
        if(hou >= 12){
          pe = "PM";
        }
        if(hou == 0){
          hou = 12;
        }
        if(hou > 12){
          hou = hou - 12;
        }
        // updating 
        Number.prototype.pad = function(digits){
          for(var n = this.toString(); n.length < digits; n = 0 + n);
          return n;
        }
        // months and week update
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2), yr, hou.pad(2), min.pad(2), sec.pad(2), pe];
        for(var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
}
// function to initialize clock (referenced in <body onload="initClock()">)
function initClock(){
    updateClock();
    window.setInterval("updateClock()", 1);
  }

  
// function to fetch current current weather conditions
let weather={ 
    // apiKey from "openweathermap api"
    "apiKey":"b9bbb5e19db1dc65e9e04ceb51d187cb", 
    fetchWeather:function(city){
        // fetching current weather condition of the city in metric units
        fetch(
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city
            +"&units=metric&appid="
            + this.apiKey
        ) // return promising response in json format
        .then((response)=>response.json())
        // storing the received response in the "data" variable
        .then((data)=>this.displayWeather(data));
    },
    // function to display the fetched weather
    displayWeather:function(data){
        /* get the data for city name, condition(description),
           temperature, humidity and wind speed */
        const{name}=data;
        const{icon,description}=data.weather[0];
        const{temp,humidity}=data.main;
        const{speed}=data.wind;
        console.log(name,icon,description,temp,humidity,speed);
        // display city name
        document.querySelector(".city").innerText="Weather in "+name;
        // display weather condition icon
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+".png";
        // display weather condition
        document.querySelector(".description").innerText=description;
        // display temperature
        document.querySelector(".temp").innerText=temp+"°C";
        // display humidity
        document.querySelector(".humidity").innerText="Humidity: "+humidity+"%";
        // display wind speed
        document.querySelector(".wind").innerText="Wind Speed: "+speed+"km/h";
        // display message as "loading..." while fetching data
        document.querySelector(".weather").classList.remove("loading");
        /* changes background to a picture of the city searched (used image from unsplash website),
           unsplash images allow dynamic search by just changing the extension (city name in this case) */
        document.body.style.backgroundImage="url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    // function to respond to search
    search:function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
// Event listener for search button
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
});
// Event listener incase user pressed "Enter" key
document.querySelector(".search-bar").addEventListener("keyup",function(){
    if(event.key=="Enter"){
        weather.search();
    }
});
// set default weather to "Delhi"
weather.fetchWeather("Delhi");


