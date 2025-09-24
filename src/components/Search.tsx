import React from 'react'
import iconSearch from '/images/icon-search.svg'
export default function Search() {
  return (
    <section className=' flex flex-col gap-3'>
        <div className='bg-neutral-800 flex px-6 py-4 gap-4 items-center rounded-xl'>
         <img src={iconSearch} alt="search icon" className='h-fit' />
        <input type="text" 
        placeholder='Search for a place...'
        className='text-xl leading-[120%] text-neutral-200 cursor-pointer outline-none'/>
        </div>
        <button className='bg-blue-500 text-white text-xl leading-[120%] py-4 rounded-xl'>
            Search
        </button>
    </section>
  )
}
