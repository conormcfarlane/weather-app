import { useState } from 'react'
import iconSearch from '/images/icon-search.svg'
import useWeatherApi from '../hooks/useWeatherApi'

export default function Search() {

  const [input,setInput] = useState<string>("");
  const [city,setCity] = useState<string>("");
    const {data,loading,error} = useWeatherApi(city)
  const handleSearch = (e: React.FormEvent) =>{
    e.preventDefault();
    setCity(input);
  }

  return (
    <section>
      <form className='flex flex-col gap-3' onSubmit={handleSearch}>
        <div className='bg-neutral-800 flex px-6 py-4 gap-4 items-center rounded-xl'>
          <img src={iconSearch} alt="search icon" className='h-fit' />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for a place...'
            className='text-xl leading-[120%] text-neutral-200 cursor-pointer outline-none'
          />
        </div>
        <button className='bg-blue-500 text-white text-xl leading-[120%] py-4 rounded-xl'>
          Search
        </button>
       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </form>
    </section>
  )
}


