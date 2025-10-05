import React, { useState} from 'react'
import iconSearch from '/images/icon-search.svg'
import useWeatherApi from '../hooks/useWeatherApi'


// !! to deconstruct props
type SearchProps = {
  city: string;
  setCity: (city:string) => void
} 
export default function Search({city,setCity}: SearchProps) {
  const [input,setInput] = useState<string>("")
  const handleSearch = (e:React.FormEvent) => {
    e.preventDefault();
    setCity(input)
  }
  const {data,loading,error} = useWeatherApi(city)
  return (
    <section>
      <form className='flex flex-col gap-3' onSubmit={handleSearch} >
        <div className='bg-neutral-800 flex px-6 py-4 gap-4 items-center rounded-xl'>
          <img src={iconSearch} alt="search icon" className='h-fit' />
          <input
            type="text"
            value={input}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            placeholder='Search for a place...'
            className='text-xl leading-[120%] text-neutral-200 cursor-pointer outline-none'
          />
        </div>
        <button type='submit' className='bg-blue-500 text-white text-xl leading-[120%] py-4 rounded-xl'>
          Search
        </button>
       
      </form>
      {loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}
{data && (
  <div>
    <h2>Weather Data</h2>
    {data && console.log(data)}
    <p>{data.current?.temperature_2m}</p>
  </div>
)}
    </section>
  )
}


