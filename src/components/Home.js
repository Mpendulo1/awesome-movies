import { Link } from "react-router-dom";

const Home = () => {
	return (
        <div className="sec__one">
	        <h1>Welcome to Awesome Movies</h1>
                <Link to="/movies">Browse movies</Link>
        </div>
       )
}
export default Home
