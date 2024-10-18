import React, { useState,  } from 'react';
import './BurgerMenu.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="burger-menu-container">
      <div className={`burger-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <nav className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/login">Connexion</a></li>
          <li><a href="/register">Inscription</a></li>
          <li><a href="/portfolio">Créer Portfolio</a></li>
          <li><a href="/search">Trouver Portfolio</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;