import React, {useEffect, useRef, useState} from 'react'
import './WeatherApp.css'
import Search_icon from '../assets/images/Search.png'
import clear_icon from '../assets/images/clear.png'
import cloudy_icon from '../assets/images/cloudy.png'
import drizzle_icon from '../assets/images/drizzle.jpg'
import rain_icon from '../assets/images/rain.png'
import snow_icon from '../assets/images/snow.webp'
import wind_icon from '../assets/images/wind.png'
import humidity_icon from '../assets/images/humidity.png'


const WeatherApp = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "09d": drizzle_icon,
        "09n": drizzle_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
        }

    const Search= async (city) => {
        if(city === ""){
            alert("Enter valid Name of the place");
            return
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            
            if(!response.ok){
                alert(data.message);
                return;
            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        Search("London");
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={Search_icon} alt="" onClick={()=>Search(inputRef.current.value)} />
        </div>
        {weatherData?<>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature} °C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        
        </>:<></>}
        
    </div>
  )
}

export default WeatherApp
