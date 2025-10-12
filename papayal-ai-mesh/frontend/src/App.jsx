import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ComoFunciona from './pages/ComoFunciona';
import PorQue from './pages/PorQue';
import ParaQue from './pages/ParaQue';
import Foro from './pages/Foro';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/como-funciona" element={<ComoFunciona />} />
                    <Route path="/por-que" element={<PorQue />} />
                    <Route path="/para-que" element={<ParaQue />} />
                    <Route path="/foro" element={<Foro />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
