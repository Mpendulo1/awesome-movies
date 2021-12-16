import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function MovieDetails({img}) {

    const [movie, setMovie] = useState({ genres:[]});
    let {id} = useParams();
    id = id.split(':')[1];

    const fetchMovie = async () => { 
        try {
            let response = await axios({
                   method: "get",
                   url: `https://api.themoviedb.org/3/movie/${id}?api_key=d4f7b87d7cedfdfbbb297f46aa3e8779&language=en-US`
            });
            
            const data = await response.data;
            setMovie( prevState => data );
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        fetchMovie();
    }, []);

    return(
        <div className="movie-details">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
            <div className="info">
                <h1>{movie.title}</h1>
                <p>{movie.tagline}</p>
                <span>{10 * movie.vote_average}</span>
                <h1>Overview</h1>
                <p>{movie.overview}</p>
                <h1>Genres</h1>
                <p>{movie.genres.map( (genre, index) => `${genre.name}, ` )}</p>
            </div>
        </div>
    );
}

export default MovieDetails;