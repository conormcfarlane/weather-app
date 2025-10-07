import React from 'react'
import useWeatherApi from '../hooks/useWeatherApi'
//   deconstruct props
type SearchProps = {
    city : string
}
export default function CurrentWeatherCards({city}: SearchProps) {
    const {data} = useWeatherApi(city)
    const currentWeatherDetails = [
        {title: "Feels like",value:  data?.weather?.current?.apparent_temperature },
        {title: "Humidity",value:  data?.weather?.current?.relative_humidity_2m },
        {title: "Wind",value:  data?.weather?.current?.wind_speed_10m },
        {title: "Precipitation",value:  data?.weather?.current?.precipitation }

    ]
  return (
    <div className='bg-red-400 flex gap-4 flex-wrap'>
        {currentWeatherDetails.map((weatherCard) => (
            <div key={weatherCard.title} className='bg-blue-200 flex-1 min-w-4/10 p-5'>
                <p className='mb-6 text-lg'>{weatherCard.title}</p>
                <p className='text-3xl'>{weatherCard.value}</p>
            </div>
        ))}
    </div>
  )
}
//