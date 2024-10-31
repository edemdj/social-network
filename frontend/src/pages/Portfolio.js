import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLink] = useState('');
  const [theme, setTheme] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Vérifier et récupérer l'user_id au chargement
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    console.log('storedUserId:', storedUserId);
    if (storedUserId) {
      setUserId(storedUserId); // Met à jour l'état avec l'user_id
    } else {
      alert("Veuillez vous connecter pour créer un portfolio.");
      navigate("/login"); // Redirige si l'user_id n'est pas trouvé
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier si userId est défini
    if (!userId) {
      alert("Vous devez être connecté pour soumettre un portfolio.");
      return;
    }

    console.log('userId:', userId); // Vérifier l'ID utilisateur

    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, links, theme, user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement');
      }

      alert('Portfolio enregistré avec succès');
      navigate('/'); // Rediriger vers la page d'accueil
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      alert('Erreur lors de la connexion au serveur');
    }
  };

  return (
    <div className="container">
      <h2>Créer un Portfolio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre :</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="links">Lien :</label>
          <input type="url" className="form-control" id="links" value={links} onChange={(e) => setLink(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="themes">theme :</label>
          <select className="form-control" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} required>
            <option value="">Sélectionner un theme</option>
            <option value="1">Développeur Frontend</option>
            <option value="2">Développeur Backend</option>
            <option value="3">Développeur Full Stack</option>
            <option value="4">cybersécurité</option>
            <option value="5">Intélligence Artificielle</option>
            <option value="6">AR VR</option>
            <option value="7">Blochain</option>
            
          
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  );
}

export default Portfolio;
