import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import './styles.css';

function App() {
  return (
    <Router>
      <header>
        <h1>Bienvenue sur Mon Mini Réseau Social</h1>
        <nav>
          <ul>
            <li><NavLink to="/" exact activeClassName="active">Accueil</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">À propos</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Connexion</NavLink></li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Mon Mini Réseau Social</p>
      </footer>
    </Router>
  );
}

export default App;