import React from 'react'
import useWeatherApi from '../hooks/useWeatherApi'

interface SearchProps{
    city:string
}

export default function CurrentWeatherCards({city}:SearchProps) {
    const {data, loading} = useWeatherApi(city)
    const currentWeatherCardInfo = [
        {title:"Feels like", value: data?.current?.apparent_temperature},
        {title:"Humidity", value: data?.current?.relative_humidity_2m},
        {title:"Wind", value: data?.current?.wind_speed_10m},
        {title:"Precipitation", value: data?.current?.precipitation},
    
    ]
  return (
    <section className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {currentWeatherCardInfo.map((card) => (
            <div key={card.title} className='bg-neutral-700 p-5 space-y-6 rounded-xl'>
                <p className='text-xl'>{card.title}</p>
                <p className='text-3xl'>{loading ? "-" : (card.value ?? "-")}</p>
            </div>
        ))}
    </section>
  )
}
