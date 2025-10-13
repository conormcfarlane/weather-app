import React from 'react'
import Header from './Header'
import MainTempHero from './MainTempHero'
import Search from './Search'

export default function layout() {
  return (
    <div className='bg-neutral-800 text-white px-4'>
      <h1 className="text-[3.25rem] text-center mb-3"> How's the sky looking today?</h1> 
      <Search />
      <MainTempHero />
    </div>
  )
}
