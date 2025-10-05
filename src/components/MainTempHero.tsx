import React from 'react'
import useWeatherApi from '../hooks/useWeatherApi'


// !! to deconstruct props
type SearchProps = {
  city: string;
} 
export default function MainTempHero({city}:SearchProps) {
    const {data} = useWeatherApi(city)
  return (
    <section>
        <div>
            <p>{city},{data?.country}</p>
            <p>Date</p>
        </div>
        <div>
            <img src="" alt="" />
            <p>degrees</p>
        </div>
    </section>
  )
}
