import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <div className='h-screen w-screen flex flex-col gap-5 justify-center items-center'>
      <h1 className='text-red-600 font-extrabold text-7xl'>Page Not Found</h1>
      <Link to="/"><button className='p-1 border rounded-md text-3xl hover:bg-red-300 hover:scale-105 transition-all duration-200'>Go to Home</button></Link>
    </div>
  )
}

export default Notfound
