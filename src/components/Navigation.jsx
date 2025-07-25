import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';

const Navigation = () => {

  const navsearch = useNavigate();
  const [title,setTitle] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navsearch(`/search?query=${encodeURIComponent(title)}`)
    }
  }

  return (
    <div className='flex md:justify-evenly justify-between gap-1 items-center w-full text-white'>
      <NavLink to="/"><h1 className='md:text-5xl font-extrabold cursor-pointer text-[15px]'>MovieFinder</h1></NavLink>
      <div>
        <ul className='flex justify-center items-center md:gap-4 gap-1'>
            <NavLink to="/list"><li className='font-semibold cursor-pointer text-[10px] md:text-lg'>PERSONAL LIST</li></NavLink>
            <li className='relative flex justify-center items-center'> <input type="text" placeholder='Search' onKeyDown={handleSearch} onChange={(e)=>setTitle(e.target.value)} className='bg-transparent rounded-3xl text-sm border border-gray-500 pl-2 py-1 md:pr-9 pr-2 placeholder:text-white outline-none' /> <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white absolute left-[80%]" /> </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
