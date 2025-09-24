import React from 'react'
import Header from "./Header"
import Search from './Search'
export default function Layout() {
  return (
    <div className='px-4'>
      <Header />
      <main className='flex flex-col gap-12'>
        <h1 className='text-[3.25rem] text-center leading-[120%]'>How's the sky looking today? </h1>
        <section>
         <Search/>
        </section>
      </main>
    </div>
  )
}
