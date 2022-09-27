import './Weather.css'
import { useState, useEffect } from "react"
import axios from "axios"
import GetImageWeather from './getImageWeather'
import windy from './images/windy.svg'
import humidity from './images/humidity.svg'
import { WeatherParams } from './@types/weather'

function Weather() {
    const [weather, setWeather] = useState<WeatherParams>({
        temp: 0,
        date: 'string',
        time: 'string',
        condition_code: 'string',
        description: 'string',
        currently: 'string',
        cid: 'string',
        city: 'string',
        img_id: 'string',
        humidity: 0,
        wind_speedy: 'string',
        sunrise: 'string',
        sunset: 'string',
        condition_slug: 'string',
        city_name: 'string',
        forecast: [
            {
            date: 'string',
            weekday: 'string',
            max: 0,
            min: 0,
            description: 'string',
            condition: 'string',
            length: 0
          },
          {
            date: 'string',
            weekday: 'string',
            max: 0,
            min: 0,
            description: 'string',
            condition: 'string',
            length: 0
          },
    ] 
    })
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + 450
        if (x > 0) {
            x = 0
        }
        setScrollX(x)
    }
    const handleRightArrow = () => {
        let x = scrollX - 450
        let listW = weather.forecast.length * 70
        if ((450 - listW) > x) {
            x = (450 - listW) - 148
        }
        setScrollX(x)
    }

    useEffect(() => {
        async function GetWeather() {
            const req = await axios(`https://api.hgbrasil.com/weather?format=json-cors&key=b42c8103&locale=pt&city_name=Porto Velho,RO`)
            setWeather(req.data.results)
        }
        GetWeather()
    }, [])

    return (
        <>
            {weather.temp !== 0 &&
                <div className="container">
                    <header>
                        <h3>{weather.city_name}</h3>
                    </header>
                    <div className="contain-grade">
                        <div className="grade">
                            <div className="grade__weekday">{weather.forecast[1].weekday}, {weather.forecast[1].date}</div>
                            <div className="grade__temperature">
                                <p className="description">{weather.forecast[1].description}</p>
                                <h2>{weather.temp}º</h2>
                                <GetImageWeather condition={weather.forecast[1].condition} description={weather.forecast[1].description} />
                            </div>
                        </div>
                        <div className="grade__card">
                            <div className="card__info">
                                <img src={windy} alt="núvem com vento, representando a ventania" />
                                <p>{weather.wind_speedy}</p>
                                <p>Windy</p>
                            </div>
                            <div className="card__info">
                                <img src={humidity} alt="núvem com água, representando a umidade" />
                                <p>{weather.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>

                    <div className="week">
                        <h4>Próximos dias</h4>
                        <div className="week__card">
                            <div className="weatherRow--left" onClick={handleLeftArrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </div>
                            <div className="weatherRow--right" onClick={handleRightArrow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </div>
                            <div className="week__list" style={{
                                marginLeft: scrollX,
                                width: weather.forecast.length * 70
                            }}>
                                {weather.forecast.map((item, index) =>
                                    <div className={item.date == weather.date.substring(0, 5) ? 'card-weather active' : 'card-weather'} key={index}>
                                        <p>{item.min}º {item.max}º</p>
                                        <GetImageWeather condition={item.condition} description={item.description} />
                                        <p>{item.weekday}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Weather