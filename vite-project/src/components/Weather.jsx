import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import sun_icon from '../assets/sun.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {

    const [city, setCity] = useState('Ekiti')
    const [weatherData, setWeatherData] = useState(null)

    const search = async (cityName) => {

        try {

            const locationUrl =
                `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`

            const locationResponse = await fetch(locationUrl)
            const locationData = await locationResponse.json()

            if (!locationData.results) {
                alert('City not found')
                return
            }

            const latitude = locationData.results[0].latitude
            const longitude = locationData.results[0].longitude
            const name = locationData.results[0].name

            const weatherUrl =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`

            const weatherResponse = await fetch(weatherUrl)
            const data = await weatherResponse.json()

            setWeatherData(data.current)

            setCity(name)

        } catch (error) {

            console.log(error)

        }
    }


    useEffect(() => {

        search('Ekiti')

    }, [])


    return (

        <div className='weather'>

            <div className='search-bar'>

                <input
                    type="text"
                    placeholder="Search for city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <img
                    src={search_icon}
                    onClick={() => search(city)}
                    alt="search"
                />

            </div>


            <img
                src={sun_icon}
                alt="weather"
                className='weather-icon'
            />

            <p className='temperature'>
                {weatherData
                    ? Math.round(weatherData.temperature_2m)
                    : '24'}°C
            </p>


            <p className='location'>
                {city}
            </p>
            <div className='weather-data'>

                <div className='col'>

                    <img
                        src={humidity_icon} alt="humidity"
                    />

                    <div>

                        <p>
                            {weatherData
                                ? weatherData.relative_humidity_2m
                                : '91'}%
                        </p>

                        <span>
                            Humidity
                        </span>

                    </div>

                </div>


                <div className='col'>

                    <img src={wind_icon} alt="wind"
                    />

                    <div>

                        <p>{weatherData
                                ? weatherData.wind_speed_10m
                                : '3.6'} km/h
                        </p>

                        <span>Wind Speed </span>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Weather