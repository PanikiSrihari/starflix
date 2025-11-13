import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./Webpages/Home/Home";
import Loginpage from "./Webpages/Login/Loginpage";
import Movies from "./Webpages/Movies/Movies";
import TVshows from "./Webpages/Tvshows/TVshows";
import Newsandpopular from "./Webpages/Newsandpopular/Newsandpopular";
import AboutMovie from "./Webpages/aboutmovie/AboutMovie";

import MyAccount from "./Webpages/Account/MyAccount";
function App() {
  return (
     <div className="App">
      <Router>
        <Routes>
          
         
          <Route path="/" element={<Loginpage />} />
          
            <Route path="/Home" element={<Home />} /> 
            <Route path="/Movies" element={<Movies />} />
            <Route path="/TVshows" element={<TVshows />} />
            <Route path="/Newsandpopular" element={<Newsandpopular />} />
            <Route path="/AboutMovie" element={<AboutMovie />} />
             <Route path="/MyAccount" element={<MyAccount />} />
        

        </Routes>
      </Router>
      
      
      
    </div>
  );
}

export default App;
