import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component'; 

import MovieCard from "./MovieCard";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    const fetchMovies = async () => { 
        try {
            let response = await axios({
                   method: "get",
                   url: `https://api.themoviedb.org/3/movie/popular?api_key=d4f7b87d7cedfdfbbb297f46aa3e8779&language=en-US&page=${pageCount}`
            });
            
            const data = await response.data.results;
            setMovies([...movies, ...data]);
            setPageCount( pageCount + 1);
     } catch (error) {
            console.log(error);
     }
    }

    useEffect( () => {
        fetchMovies();
    }, []);
 
    return( 
        <ul className="movie-list">
        <InfiniteScroll
         className="movie-list"
            dataLength={movies.length} //This is important field to render the next data
            next={fetchMovies}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>
            }
            >
                
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
        </InfiniteScroll>
        </ul>
    );
}

export default MovieList;