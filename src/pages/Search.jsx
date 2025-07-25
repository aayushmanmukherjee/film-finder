import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

import { Link, useSearchParams } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useDispatch } from "react-redux";
import { addToList } from "../redux/listslice";

const Search = () => {
  const [movie, setMovie] = useState(null);
  const [person, setPerson] = useState(null);
  const [castData, setCastData] = useState({});

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setMovie(data.results);
          // setPerson(null);
        }

        fetch(
          `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(
            query
          )}&language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((personData) => {
            if (personData.results && personData.results.length > 0) {
              setPerson(personData.results);
              // setMovie(null);
            }
          });
      });
  }, [query]);

  useEffect(() => {
    if (!movie || movie.length === 0) {
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTZkZjVhZWYxMzY5ZTkwODJkYmU1YzgyYTczNWUyZSIsIm5iZiI6MTc1MzI4NjM4MC44NzUsInN1YiI6IjY4ODEwNmVjMmI5MzBmYjZkNTUyOWJhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w1he9HJtXxNNGIHA4hDceUoSvFoDcD3RFAUV7YUQWyE",
      },
    };
    let getCast = async () => {
      const castMap = {};

      for (const i of movie) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${i?.id}/credits`,
          options
        );
        const data = await response.json();
        castMap[i.id] = data;
      }
      // console.log(castMap)
      setCastData(castMap);
    };
    getCast();
  }, [movie]);

  if (movie === null && person === null) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#1e242d] text-white text-xl">
        Loading...
      </div>
    );
  }
  if (!movie && !person) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#1e242d] text-white text-xl">
        No results found.
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
      <div className="w-screen h-screen bg-[#1e242d]">
      <div className="w-full bg-black py-2">
        <Navigation />
      </div>

      <div>
        {person && (
          <div className="w-full bg-[#1e242d] py-10 md:px-20 px-5">
            <h2 className="text-white font-extrabold md:text-5xl text-xl mb-8">People</h2>
            <div className="flex justify-start items-center gap-4 flex-wrap">
              {person
                .filter((p) => p.profile_path)
                .map((p) => (
                  <Link
                    to={`/${
                      p.known_for_department === "Acting" ? "actor" : "director"
                    }/${p.id}`}
                    key={p.id}
                  >
                    <div className="border rounded-sm border-gray-400 relative group md:w-[150px] w-[70px] md:h-[220px] h-[140px] overflow-hidden">
                      <p className="opacity-0 absolute top-2 group-hover:opacity-100 text-[10px] text-white font-extralight z-10 bg-gray-400 px-1 rounded-sm">
                        {p.name}
                      </p>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${p.profile_path}`}
                        alt={p?.name}
                        className="rounded-sm w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {movie &&
          movie
            .filter((i) => i.backdrop_path)
            .map((i) => {
              const cast = castData[i.id];
              return (
                <div className="w-full bg-[#1e242d] py-10 md:px-20 px-5" key={i.id}>
                  <div className="flex flex-col items-center justify-center gap-4 border-t border-b py-4">
                    <div className="flex md:flex-row flex-col justify-center items-center gap-4">
                      <div className="md:w-[50%] w-[100%]">
                        {i.backdrop_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/original/${i.backdrop_path}`}
                            alt={i?.title}
                            className="w-full border"
                          />
                        )}
                      </div>
                      <div className="md:w-[50%] w-[100%] flex flex-col md:items-start items-center justify-center gap-2">
                        <h2 className="text-white font-extrabold md:text-2xl text-xl">
                          {i?.original_title}
                        </h2>
                        <span className="text-white text-sm">
                          Original Language - {i?.original_language}
                        </span>
                        <span className="text-white text-sm">
                          Release Date - {i?.release_date}
                        </span>
                        <p className="text-gray-400">{i.overview}</p>
                        <div>
                          <h3 className="text-gray-400 md:text-2xl text-xl font-bold">
                            Cast
                          </h3>
                          <ul>
                            {cast?.cast ? (
                              cast.cast.slice(0, 5).map((i) => (
                                <li
                                  className="flex justify-start items-center gap-2"
                                  key={i.id}
                                >
                                  <Link to={`/actor/${i?.id}`}>
                                    <span className="text-white md:text-xl text-[12px] hover:underline hover:text-gray-400 cursor-pointer transition-all duration-200">
                                      {i?.original_name || "Unknown"}
                                    </span>
                                  </Link>
                                  <span className="text-gray-400 text-[10px] md:text-sm">as</span>
                                  <span className="text-gray-400 text-[12px] md:text-sm">
                                    {i?.character || "Unknown"}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="text-gray-400">Loading cast...</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start w-[100%] items-center gap-10">
                    <div className="bg-[#1e242d] gap-8">
                      <span className="text-gray-400 text-[10px] md:text-sm">
                        Director
                        {cast?.crew ? (
                          <Link
                            to={`/director/${
                              cast.crew.find(
                                (member) => member.job === "Director"
                              )?.id
                            }`}
                          >
                            <button className="text-white border bg-gray-700 p-2 rounded-3xl md:text-sm text-[10px] ml-2  hover:bg-gray-500 transition-all duration-200">
                              {cast.crew.find(
                                (member) => member.job === "Director"
                              )?.name || "Unknown"}
                            </button>
                          </Link>
                        ) : (
                          <span className="text-gray-400 ml-2">
                            Loading director...
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button className="text-white font-bold md:text-[12px] text-[10px]  border rounded-3xl py-1 px-2  bg-gray-700  hover:bg-gray-500 transition-all duration-200" onClick={()=>handleList(i?.id)}>Add to Personal List</button>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
      </div>
    </div>
  );
};

export default Search;
