import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='w-full relative pt-20'>
      <div className='w-full absolute bottom-0 bg-black flex flex-col justify-center items-center sm:px-20 px-10 py-5'>
 <p className='sm:text-xl text-white mb-1'>a Aayushman Mukherjee production</p>
        <Link to={'https://github.com/aayushmanmukherjee'} target='_blank'><div className='flex items-center gap-1'><p className='text-sm text-white'>Github</p></div></Link>
    
      </div>
      
    </div>
  )
}

export default Footer
