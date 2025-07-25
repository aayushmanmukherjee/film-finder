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
    <div className='flex justify-evenly items-center w-full text-white'>
      <NavLink to="/"><h1 className='text-5xl font-extrabold cursor-pointer'>MovieFinder</h1></NavLink>
      <div>
        <ul className='flex justify-center items-center gap-4'>
            <NavLink to="/list"><li className='font-semibold cursor-pointer'>PERSONAL LIST</li></NavLink>
            <li className='relative flex justify-center items-center'> <input type="text" placeholder='Search' onKeyDown={handleSearch} onChange={(e)=>setTitle(e.target.value)} className='bg-transparent rounded-3xl text-sm border border-gray-500 pl-2 py-1 pr-9 placeholder:text-white outline-none' /> <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white absolute left-[80%]" /> </li>
        </ul>
      </div>
    </div>
  )
}

export default Navigation
