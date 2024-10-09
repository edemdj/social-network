import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h2>Bienvenue sur la page d'accueil !</h2>
      <section className="intro">
        <p>Ceci est une introduction à votre mini réseau social. Connectez-vous avec vos amis et partagez des moments mémorables.</p>
      </section>
      <section className="features">
        <h3>Fonctionnalités principales</h3>
        <ul>
          <li>Créer des publications</li>
          <li>trouver des portfolios</li>
          <li>Commenter et aimer les publications</li>
          <li>Ajouter et suivre des amis</li>
        </ul>
      </section>
      <section className="cta">
        <button className="primary-btn">Commencer</button>
        <button className="secondary-btn">En savoir plus</button>
      </section>
    </div>
  );
};

export default Home;