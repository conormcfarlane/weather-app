import React from 'react'
import { useState } from 'react'
import Header from './Header'
import MainTempHero from './MainTempHero'
import CurrentWeatherCards from './CurrentWeatherCards'
import Search from './Search'
import DailyForecast from './DailyForecast'
import HourlyForecast from './HourlyForecast'

export default function layout() {
   const [city,setCity] = useState<string>("Berlin")
  return (
    <div className='bg-neutral-800 text-white px-4'>
      <h1 className="text-[3.25rem] text-center mb-3"> How's the sky looking today?</h1> 
      <Search city={city} setCity={setCity}/>
      <MainTempHero city={city} />
      <CurrentWeatherCards city={city} />
      <DailyForecast city={city} />
      <HourlyForecast city={city} />

    </div>
  )
}
