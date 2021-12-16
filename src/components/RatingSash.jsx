
function RatingSash({score}) {

    let rating = 
        score >= 70 ? "green" :
        score >= 50 ? "yellow" :
        score > 0 ? "red" : "grey";

    return(
        <div className={`${rating}-sash`}><span style={{ backgroundColor:rating }}>{score}</span></div>
    );
}

export default RatingSash;