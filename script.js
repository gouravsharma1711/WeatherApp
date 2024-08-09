let day=new Date();
document.querySelector("#WeekDay").innerHTML=day.toLocaleDateString('en-IN',{weekday:'long'});
document.querySelector("#todayDate").innerHTML=day.toLocaleDateString('en-IN',{ day: '2-digit', month: 'long', year: 'numeric' });
document.addEventListener('DOMContentLoaded',()=>{
    let input=document.querySelector("#inputField").value;
    FetchApi("delhi");
})


let apiUrl="https://api.openweathermap.org/data/2.5/weather?&appid=5f4eb1e09a83abef6ace8f96060c09f7&units=metric&q=";
let value=document.querySelectorAll(".value");
let CityName=value[0];
let temp=value[1];
let maxTemp=value[2];
let minTemp=value[3];
let humidity=value[4];
let wind=value[5];
let sunrise=value[6];
let sunset=value[7];
let pressure=value[8];
let temp2=document.querySelector("#temp2");
let weather=document.querySelector("#weather");
let logo=document.getElementsByClassName("Image");
async function FetchApi(input) {
    try {
        let response=await fetch(apiUrl+`${input}`);
        if(response.ok){
            let data=await response.json();
            CityName.innerHTML=data.name;
            temp.innerHTML=data.main.temp+" °C";
            maxTemp.innerHTML=data.main.temp_max+" °C";
            minTemp.innerHTML=data.main.temp_min+" °C";
            humidity.innerHTML=data.main.humidity+" %";
            sunrise.innerHTML=new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN',{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            sunset.innerHTML=new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN',{ hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
            wind.innerHTML=(data.wind.speed * 3.6).toFixed(2)+" Km/h";
            pressure.innerHTML=data.main.pressure+" hPa";
            temp2.innerHTML=Math.round(data.main.temp)+" °C";
            weather.innerHTML=data.weather[0].main;

            // logo
            let weatherCondition = data.weather[0].main.toLowerCase(); 
            console.log(weatherCondition + `.png`);

            if (logo.length > 0) {
                logo[0].src = weatherCondition + `.png`; 
            }
        } else {
            alert("Failed to fetch weather data. Please check the city name and try again.");
        }
    }catch(error){
        console.error("Fetch error:", error);
        alert("An error occurred while fetching the weather data. Please try again.");
    }
}
document.querySelector("#searchButton").addEventListener('click',()=>{
    let input=document.querySelector("#inputField").value;
    FetchApi(input);
})
