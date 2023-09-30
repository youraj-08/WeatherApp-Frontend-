import React, { useState } from 'react';
import './WeatherApp.css';
import search_icon from "../Assets/search.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const Weatherapp = () => {

    const [query, setQuery] = useState('');

    const [temp, setTemp] = useState('0.0');
    const [weatherDes, setweatherDes] = useState('Weather Description');
    const [icon, setIcon] = useState('02d');
    const [humidity, setHumidity] = useState('0');
    const [speed, setSpeed] = useState('0');
    const [name, setName] = useState('Location');
    const [code, setCode] = useState(200);



    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:9000/weather', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (response.ok) {
                const data = await response.json();
                setTemp(data.temp);
                setweatherDes(data.weatherDes);
                setIcon(data.icon);
                setHumidity(data.humidity);
                setSpeed(data.speed);
                setName(data.name);
                setCode(data.code);
            } else {
                console.error('Failed to fetch data from the server');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    var link = `http://openweathermap.org/img/wn/${icon}@2x.png`
    var description = weatherDes.charAt(0).toUpperCase() + weatherDes.slice(1);


    return (
        <div className='container' >

            <div className='top-bar'>
                <input
                    type='text'
                    className='cityInput'
                    placeholder='Search'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className='search-icon' onClick={() => handleSubmit()}>
                    <img src={search_icon} alt='' />
                </div>
            </div>

            <div className='weather-image'>
                <img src={link} alt=''
                    style={{ width: '220px', height: '200px' }}
                />
            </div>

            <div className='weather-temp'> {temp}°C </div>
            <div className='weather-location'>{(code === 200) ? `${name}` : "Error! :("}</div>

            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} className='icon' alt='' />
                    <div className='data'>
                        <div className='humidity-percent'>{humidity}%</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>

                <div className='element'>
                    <img src={wind_icon} className='icon' alt='' />
                    <div className='data'>
                        <div className='humidity-percent'>{speed}m/s</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
            <div className='weather-description'> {description}</div>
        </div>
    )
}

export default Weatherapp;

