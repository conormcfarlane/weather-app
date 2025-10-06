import React from 'react'
import useWeatherApi from '../hooks/useWeatherApi'
import { getWeatherIcons } from '../utils/getWeatherIcon'
import bgTodaySmall from "/images/bg-today-small.svg"


// !! to deconstruct props
type SearchProps = {
  city: string;
} 
export default function MainTempHero({city}:SearchProps) {
    const {data} = useWeatherApi(city)
  return (
    <section className="bg-center rounded-xl flex flex-col items-center px-6 py-12"style={{backgroundImage: `url(${bgTodaySmall})`}}>
        {data && (<div className='bg-orange-500 flex flex-col items-center text-white'>
          
            <p className='font-bold'>{city}, {data?.country}</p>
            <p>
          {data &&
            new Date(data.weather.current.time).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
    </p>
        </div>)}
        <div className='bg-green-400 flex items-center w-full justify-between'>
            <img src={getWeatherIcons(data?.weather?.current?.weather_code)} alt="" className='max-w-30' />
            <p className='text-8xl text-white'>{data?.weather?.current?.temperature_2m} </p>
        </div>
    </section>
  )
}
