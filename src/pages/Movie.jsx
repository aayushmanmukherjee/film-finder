import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { useDispatch } from 'react-redux';
import { addToList } from "../redux/listslice";

const Movie = () => {
    
     const [movie, setMovie] = useState();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const dispatch = useDispatch();

    useEffect(()=>{
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
          },
        };
    
        fetch(
          `https://api.themoviedb.org/3/movie/${query}`,
          options
        )
          .then((response) => response.json())
          .then((data)=>{
            setMovie(data)
            console.log(data)
        })
          
        },[query])


        if(!movie) {
          return (
      <div className="w-full h-screen flex justify-center items-center bg-[#1e242d] text-white text-xl">
        Loading...
      </div>
    );
        }

        function handleList(movieid) {
    const list = {
      id:movieid
    }
    dispatch(addToList(list))
  }
      
  return (
    <div>
      <div className='bg-[#1e242d] h-screen w-screen'>
      <div className="w-full bg-black py-2">
        <Navigation />
      </div>
      
        <div className="w-full bg-[#1e242d] py-10 md:px-20 px-5">
            <div className="flex flex-col items-center justify-center gap-4 border-t border-b py-4">
                <div className="flex justify-center items-center gap-4">
                  <div className="md:w-[50%] w-[100%]">
                    {movie.backdrop_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        alt={movie?.title}
                        className="w-full border"
                      />
                    )}
                  </div>
                  </div>
                  <div className="md:w-[50%] w-[100%] flex flex-col items-start justify-center gap-2">
                    <h2 className="text-white font-extrabold text-2xl">
                      {movie?.original_title}
                    </h2>
                    <span className="text-white text-sm">
                      Original Language - {movie?.original_language}
                    </span>
                    <span className="text-white text-sm">
                      Release Date - {movie?.release_date}
                    </span>
                    <p className="text-gray-400">{movie.overview}</p>
                    <button className="text-white font-bold text-[12px]  border rounded-3xl py-1 px-2  bg-gray-700  hover:bg-gray-500 transition-all duration-200" onClick={()=>handleList(movie?.id)}>Add to Personal List</button>
        </div>
      </div>

    </div>
    </div>
    </div>
  )
}

export default Movie
