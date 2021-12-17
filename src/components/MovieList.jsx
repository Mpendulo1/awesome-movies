import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import axios from "axios";

import MovieCard from "./MovieCard";

function MovieList() {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => { 
        try {
            let response = await axios({
                   method: "get",
                   url: "https://api.themoviedb.org/3/movie/popular?api_key=d4f7b87d7cedfdfbbb297f46aa3e8779&language=en-US&page=1"
            });
            
            const data = await response.data.results;
            setMovies(data);
     } catch (error) {
            console.log(error);
     }
    }

    useEffect( () => {
        fetchMovies();
    }, []);
 
    return( 
        <ul className="movie-list">
        {
            movies.map( movie => (
                <li key={movie.id}>
                    <Link to={`/movies/${movie.id}`}>
                    <MovieCard 
                        score={10*movie.vote_average} 
                        img={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        title={movie.title} 
                    />
                    </Link>
              </li>
            ))
        }
        </ul>
    );
}

export default MovieList;