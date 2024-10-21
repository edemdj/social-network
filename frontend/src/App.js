import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import BurgerMenu from './components/BurgerMenu';
import PortfolioSearch from './components/PortfolioSearch';
import './styles.css';

function App() {
  return (
    <Router>
      <header className="header">
        <div className="header-title">
          <h1>Bienvenue sur Mon Mini Réseau Social</h1>
        </div>
        <nav>
          <BurgerMenu />
          <ul>
            <li><NavLink to="/" exact="true" activeclassname="active">Accueil</NavLink></li>
            <li><NavLink to="/about" activeclassname="active">À propos</NavLink></li>
            <li><NavLink to="/login" activeclassname="active">Connexion</NavLink></li>
            <li><NavLink to="/register" activeclassname="active">Inscription</NavLink></li>
          </ul>
        </nav>
        <PortfolioSearch />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Mon Mini Réseau Social</p>
      </footer>
    </Router>
  );
}

export default App;