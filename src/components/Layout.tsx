import React from 'react'
import { useState } from 'react'
import Header from "./Header"
import Search from './Search'
import MainTempHero from './MainTempHero'
import DailyForecast from './DailyForecast'
import CurrentWeatherCards from './CurrentWeatherCards'
export default function Layout() {
  const [city,setCity] = useState<string>("Berlin")
  return (
    <div className='px-4'>
      <Header />
      <main className='flex flex-col gap-12'>
        <h1 className='text-[3.25rem] text-center leading-[120%]'>How's the sky looking today? </h1>
        <section>
         <Search city={city} setCity={setCity}/>
        </section>
        <MainTempHero city={city}/>
        <CurrentWeatherCards city={city} />
        <DailyForecast city={city} /> 
      </main>
    </div>
  )
}
