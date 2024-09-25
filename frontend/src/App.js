// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Assure-toi que Routes est bien importé
import Home from './pages/Home'; // Vérifie que le chemin est correct
import Login from './pages/Login'; // Vérifie également pour Login

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                {/* Ajoute d'autres routes ici si nécessaire */}
            </Routes>
        </Router>
    );
}

export default App;
