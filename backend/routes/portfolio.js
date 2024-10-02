
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.post('/portfolio', async (req, res) => {
    const { title, description, link, theme } = req.body;

    try {
      // Insérez les données du portfolio dans la base de données
      db.query('INSERT INTO portfolios (title, description, link, theme) VALUES (?, ?, ?, ?)', [title, description, link, theme], (err, result) => {
        if (err) {
          console.error('Erreur de requête SQL:', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        res.status(201).json({ message: 'Portfolio enregistré avec succès' });
      });
    } catch (err) {
      console.error('Erreur serveur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  return router;
};
