


import { useState } from "react"
import axios from 'axios'
import './Container.css'
const Container = () => {
    const image_url= 'http://openweathermap.org/img/w/'
    const API_ID = 'ae98fb3ff337c0986cdb899ce12b298b'
    // http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID={fe1959779f2721f39e2334c22fa953e3}&units=metric
    
    const [text,setText] = useState('')
    const [weather,setWeather] = useState({
        location: '',
        temp: '20',
        feels_likes: '22',
        weather_main: '',
        weather_description: '',
        weather_icon: 'http://openweathermap.org/img/w/02d.png',
    })

    const getWeather = async (locations)=>{
        try {
            const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${API_ID}&units=metric`)
        
            if(data && data?.statusText ==='OK'){
            
                setWeather({...weather,
                    location: data.data.name,
                    temp: data.data.main.temp,
                    feels_likes: data.data.main.feels_like,
                    weather_main: data.data.weather[0].main,
                    weather_description: data.data.weather[0].description,
                    weather_icon: image_url+data.data.weather[0].icon+'.png'
                })
            
            return data
        }
        } catch(err){
            alert('please enter valid city name')
        }
    }
    //     const data = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=${API_ID}&units=metric`)
    //     // console.log(data)
    //     if(data && data?.statusText ==='OK'){
            
    //         setWeather({...weather,
    //             location: data.data.name,
    //             temp: data.data.main.temp,
    //             feels_likes: data.data.main.feels_like,
    //             weather_main: data.data.weather[0].main,
    //             weather_description: data.data.weather[0].description,
    //             weather_icon: image_url+data.data.weather[0].icon+'.png'
    //         })
            
    //         return data
    //     } else {
    //         return alert('some thing went wrong!')
    //     }
    // }

    const handleClick = ()=>{
        getWeather(text)
        setText('')
    }

    const handleChange = (e)=> {
        setText(e.target.value)
    } 


  return (
    <div>
        <h1 className="weather-heading">Weather App</h1>
        <div className="weather-container">
            <div className="weather-input">
                <input type="text" value={text} placeholder="Type Place..." onChange={handleChange} />
                <button onClick={handleClick}>Search</button>
            </div>
            <div className="weather-card">
                <img src={weather.weather_icon} alt="weather" />
                <p>{weather.location}</p>
                <p>Temprature : {weather.temp} deg Cel</p>
                <p>Temprature feels like: {weather.feels_likes}</p>
                <p>{weather.weather_main}</p>
                <p>{weather.weather_description}</p>
                
            </div>
        </div>
    </div>
  )
}

export default Container