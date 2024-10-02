import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Portfolio from './pages/Portfolio';
import BurgerMenu from './components/BurgerMenu';
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
            <li><NavLink to="/" exact activeClassName="active">Accueil</NavLink></li>
            <li><NavLink to="/about" activeClassName="active">À propos</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Connexion</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Inscription</NavLink></li>

          </ul>
        </nav>
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