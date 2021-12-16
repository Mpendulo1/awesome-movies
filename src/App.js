import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home';
import About from './components/About';
import Popular from './components/Popular';
import MovieDetails from "./components/MovieDetails";
import Navbarmenu from './components/menu/Navbarmenu';

function App() {
  return (
    <div>
      <Router basename="/">

        {/* Add Menu Component */}
        <Navbarmenu />
        
        <Routes> 
          <Route exact path="/" element={<Home />} />
          <Route path="/movies" element={<Popular />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/about" element={<About />} />   
        </Routes>
      </Router>

    </div>
  );
}

export default App;
