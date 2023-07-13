import React from 'react'
import { Link } from 'react-router-dom'

function NotFound404() {
  return (
      <section className='flex flex-col justify-center items-center'>
        <h3 className='text-5xl font-bold m-2'>404</h3>
        <p className='text-xl m-2 font-semibold'>Page not found</p>
        <button className='bg-primaryDark p-3 rounded-md m-2'>
            <Link className='text-white' to='/'>Back to home!</Link>
        </button>
      </section>
  )
}

export default NotFound404