import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


function MovieDetails({img}) {

    const [movie, setMovie] = useState({ genres:[]});
    const [fields, setFields] = useState({
        name:"",
        surname:"",
        email:"",
        phonenumber:""
    });
    let {id} = useParams();
    id = id.split(':')[1];
    
    let trelloAPIkey = "46d10c03f5670992ba29317d90b08afb";
    let trelloAPItoken = "9ad726f1a745713871cc0ebbf67925536255e95e1721238994dc1f64731c3237";
    let trelloBoardID = "61bbbb0ceb02508d900abd6a";
    let trelloCardID = "5ffc20b406528c399a348b65";


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

    const handleChange = (e) => {
        const field = e.target.name;
        const fieldValue = e.target.value;
        setFields({...fields, [field]:fieldValue});
    }

    const handleSubmit = async () => {
        let formData = await axios({
            method: "put",
            url: `https://api.trello.com/1/card/${trelloCardID}/customField/${trelloBoardID}/item`,
            data: {fields}
        });
    }

    useEffect( () => {
        fetchMovie();
    }, []);

    return(
        <div className="movie-details">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
            <div className="info">
                <h1>{movie.title}({movie.release_date})</h1>
                <p>{movie.tagline}</p>
                <span>Rating: {10 * movie.vote_average}</span>
                <h1>Overview</h1>
                <p>{movie.overview}</p>
                <h1>Genres</h1>
                <p>{movie.genres.map( (genre, index) => `${genre.name}, ` )}</p>
            </div>
            <form>
                <input 
                    type="text" 
                    name="name" 
                    value={fields.name} 
                    placeholder="First Name*" 
                    onChange={ (e) => handleChange(e)}
                />
                <input 
                    type="text" 
                    name="surname" 
                    value={fields.surname} 
                    placeholder="Surname*" 
                    onChange={ (e) => handleChange(e)}
                />
                <input 
                    type="text" 
                    name="email" 
                    value={fields.email} 
                    placeholder="Email Address*" 
                    onChange={ (e) => handleChange(e)}
                />
                <input 
                    type="text" 
                    name="phonenumber" 
                    value={fields.phonenumber} 
                    placeholder="Phone Number*" 
                    onChange={ (e) => handleChange(e)}
                />
            </form>
            <button type="submit" onSubmit={handleSubmit}>Get movie</button>
        </div>
    );
}

export default MovieDetails;