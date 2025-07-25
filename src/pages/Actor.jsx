import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";

const Actor = () => {
  const { id } = useParams();
  const [actor, setActor] = useState();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
      },
    };
    fetch(`https://api.themoviedb.org/3/person/${id}`, options)
      .then((response) => response.json())
      .then((data) => {
        setActor(data);
        // console.log(data)
      });
  }, [id]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
      },
    };

    fetch(`https://api.themoviedb.org/3/person/${id}/credits`, options)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        // console.log(data);
      });
  }, [id]);

  if (!actor || !movies) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#1e242d] text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="w-screen h-screen bg-[#1e242d]">
      <div className="w-full bg-black py-2">
        <Navigation />
      </div>

      <div className="flex gap-5 md:px-10 px-4 py-8 bg-[#1e242d]">
        <div>
          <div className="flex md:gap-5 gap-2 justify-start flex-wrap">
            {movies?.cast
              ?.filter((i) => i.poster_path)
              .map((i) => (
                <Link to={`/movie?query=${encodeURIComponent(i.id)}`}>
                  <div className="border border-gray-400 rounded-md md:w-[130px] w-[70px] md:h-[190px] h-[100px] relative group hover:border hover:border-green-400 hover:scale-105 transition-all duration-200">
                    <p className="opacity-0 absolute -top-5 group-hover:opacity-100 md:text-[7px] text-[4px] py-[1px] px-[2px] text-white font-extralight z-10 bg-gray-400 rounded-md">as {i.character}</p>
                    <p className="opacity-0 absolute top-2 group-hover:opacity-100 md:text-[10px] text-[6px] text-white font-extralight z-10 bg-gray-400">
                      {i.original_title}
                    </p>
                    <img
                      src={`https://image.tmdb.org/t/p/original${i.poster_path}`}
                      className="absolute inset-0 h-[100%] w-[100%] rounded-md"
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <div className="md:pr-10 pr-1">
          <div className="flex flex-col items-start justify-center gap-3 md:w-[250px] w-[100px]">
            {actor?.profile_path && (
              <div className="border rounded-sm">
                <img
                  src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                  alt={actor.name}
                  className="md:w-[250px] w-[100px] md:h-[350px] h-[150px] rounded-sm"
                />
              </div>
            )}
            <h3 className="text-white text-2xl font-bold">{actor?.name}</h3>
            <p className="text-gray-400 text-sm">
              <span className="text-white mr-1">Birthday</span>{" "}
              {actor?.birthday}
            </p>
            <p className="text-gray-400 text-sm">
              <span className="text-white mr-1">Place of Birth</span>{" "}
              {actor?.place_of_birth}
            </p>
            <p className="text-gray-400 text-sm">{actor?.biography}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Actor;
