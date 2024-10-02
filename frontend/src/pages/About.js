import React from 'react';
import '../styles.css';

const About = () => {
  return (
    <div className="about-container">
      <h2>À propos de Nous</h2>
      <section className="mission">
        <h3>Notre Mission</h3>
        <p>Notre mission est de créer un espace où les utilisateurs peuvent se connecter, partager et interagir en toute sécurité.</p>
      </section>
      <section className="team">
        <h3>Notre Équipe</h3>
        <p>Nous sommes une équipe passionnée de développeurs et de designers dédiés à fournir la meilleure expérience utilisateur possible.</p>
      </section>
      <section className="contact">
        <h3>Contactez-Nous</h3>
        <p>Pour toute question ou commentaire, veuillez nous contacter à <a href="mailto:contact@minireseau.com">contact@minireseau.com</a>.</p>
      </section>
    </div>
  );
};

export default About;