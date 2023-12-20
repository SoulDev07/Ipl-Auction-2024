import React from 'react';
import './styles/index.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import Search from './Components/Search';
import Calculator from './Components/Calculator';
import Leaderboard from './Components/Leaderboard';
import OtherTeams from './Components/OtherTeams';
import Login from './Components/Login';
import Admin from './Components/Admin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path='/calculator' element={<Calculator />} />
        <Route exact path='/leaderboard' element={<Leaderboard />} />
        <Route exact path='/otherteams/:name' element={<OtherTeams />} />
        <Route exact path='/admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;