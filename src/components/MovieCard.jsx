
import RatingSash from "./RatingSash";

function MovieCard({score, img, title}) {
    return(
        <div className="movie-card">
            <RatingSash score={score} />
            <img src={img} alt="poster" />
            <span>{title}</span>
        </div>
    );
}

export default MovieCard;