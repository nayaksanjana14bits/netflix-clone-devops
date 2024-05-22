import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  
import Netflix from './pages/Netflix';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShow';
import UserListedMovies from './pages/UserListedMovies';


const App = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<Login />} />
    {/* <Route path="/signup" element={<Signup />} /> */}
    <Route path="/player" element={<Player />} />
    <Route path="/movies" element={<Movies />} />
    <Route path="/tv" element={<TVShows />} />
    <Route path="/mylist" element={<UserListedMovies />} />
    <Route path="/home" element={<Netflix />} />
    <Route path="/" element={<Signup />} />
    
   </Routes>   
  </BrowserRouter> );
};

export default App;
