import React, { useState } from 'react';

function Portfolio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, link, theme }),
    });

    if (response.ok) {
      alert('Portfolio enregistré avec succès');
    } else {
      alert('Erreur lors de l\'enregistrement du portfolio');
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
          <label htmlFor="link">Lien :</label>
          <input type="url" className="form-control" id="link" value={link} onChange={(e) => setLink(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="theme">Thème :</label>
          <select className="form-control" id="theme" value={theme} onChange={(e) => setTheme(e.target.value)} required>
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </form>
    </div>
  );
}

export default Portfolio;