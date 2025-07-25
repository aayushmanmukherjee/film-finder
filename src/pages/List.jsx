import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import Navigation from "../components/Navigation";
import { Link } from 'react-router-dom'
import { remove } from "../redux/listslice";

const List = () => {
  const allList = useSelector((state) => state.list.lists);
  // console.log(allList)
  const [movieData, setMovieData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
  const fetchAllMovies = async () => {
    const results = await Promise.all(
      allList.map(async (movie) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
          },
        });
        return await res.json();
      })
    );

    setMovieData(results); // where movieData is a local state array
    console.log(results)
  };

  fetchAllMovies();
  
}, [allList]);


function handleRemove(movieid) {
  const list = {
    id:movieid
  }
  dispatch(remove(list))
}

  return (
    <div>

      <div className="w-full bg-black py-2">
        <Navigation/>
      </div>
    <div className="bg-[#1e242d] text-white w-full">
      <div className="flex gap-5 flex-wrap px-20 py-10">
      {allList.length>0 && movieData.map((i)=>(

            <div className="flex flex-col items-start">
           <Link to={`/movie?query=${encodeURIComponent(i.id)}`}><div className="relative w-[150px] h-[200px] group border border-gray-400 rounded-md hover:border hover:border-green-400 hover:scale-105 transition-all duration-200">
          <p className='opacity-0 absolute top-2 group-hover:opacity-100 text-[10px] text-white font-extralight z-10 bg-gray-400'>{i.original_title}</p>
          <img src={`https://image.tmdb.org/t/p/original${i.poster_path}`} className='absolute inset-0 h-[100%] w-[100%] rounded-md' />
          </div></Link>
          <p className="text-[15px] text-gray-400 hover:underline hover:text-red-500 transition-all duration-200 cursor-pointer" onClick={()=>handleRemove(i.id)}>remove</p>
          </div>
       

      ))
      
      }
       </div>
    </div>
    </div>
  )
}

export default List
