import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import About from './components/About/About';
import Home from './components/Home/Home'; 
import Events from './components/Events/Events';
import Team from './components/Team/Team.jsx';
import Gallery from './components/Gallery/Gallery';
import Collabs from './components/Collabs/Collabs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />            
        <Route path="/about" element={<About />} />       
        <Route path="/events" element={<Events />} />     
        <Route path="/team" element={<Team />} />         
        <Route path="/gallery" element={<Gallery />} />   
        <Route path="/collabs" element={<Collabs />} />    
      </Routes>
    </Router>
  );
}

export default App;
