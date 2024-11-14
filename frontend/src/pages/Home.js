import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import welcomeImage from '../images/welcome.jpg';

const Home = () => {
  const navigate = useNavigate();


  const handleStartClick = () => {
    navigate('/portfolio');
  };

  const handleLearnMoreClick = () => {
    navigate('/about');
  };

  return (
    <div className="home-container">
      <h2>BIENVENUE DANS VOTRE BIBLIOTHEQUE PRO!</h2>
      <img src={welcomeImage} alt="Bienvenue" className="welcome-image" />
      <section className="intro">
        <p>Ceci est une page dediée à vos experience. Connectez-vous avec vos amis et partagez vos realisations.</p>
      </section>
      <section className="features">
        <h3>Fonctionnalités principales</h3>
        <ul>
          <li>Créer des publications</li>
          <li>Commenter et aimer les publications</li>
          <li>Rechercher des publications par thème</li>
          <li>Consulter les portfolios des autres utilisateurs</li>
          <li>Ajouter et suivre des amis</li>
          <li>Et bien plus encore...</li>
          <li className="highlight">Connectez-vous pour commencer !</li>
        </ul>
      </section>
      <section className="cta">
        <button className="primary-btn" onClick={handleStartClick}>Commencer</button>
        <button className="secondary-btn" onClick={handleLearnMoreClick}>En savoir plus</button>
      </section>
    </div>
  );
};

export default Home;