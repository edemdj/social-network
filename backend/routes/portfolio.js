const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post('/portfolio', (req, res) => {
    const { links, theme_id, user_id } = req.body;
    let query, values;
  
    if (theme_id) {
      query = `INSERT INTO portfolios (links, theme_id, user_id) VALUES (?, ?, ?)`;
      values = [links, theme_id, user_id];
    } else {
      query = 'INSERT INTO portfolios (links, user_id) VALUES (?, ?)';
      values = [links, user_id];
    }
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du portfolio:', err);
        res.status(500).send('Erreur lors de la création du portfolio');
      } else {
        res.status(201).send('Portfolio créé avec succès');
      }
    });
  });

  router.get('/portfolio/:id', (req, res) => {
    const portfolioId = req.params.id;
    const query = 'SELECT * FROM portfolios WHERE id = ?';
    db.query(query, [portfolioId], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du portfolio');
      } else if (results.length === 0) {
        res.status(404).send('Portfolio non trouvé');
      } else {
        res.status(200).json(results[0]);
      }
    });
  });

  router.put('/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const { links, theme_id } = req.body;
    const query = 'UPDATE portfolios SET links = ?, theme_id = ? WHERE id = ?';
    db.query(query, [links, theme_id, id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la mise à jour du portfolio');
      } else {
        res.status(200).send('Portfolio mis à jour avec succès');
      }
    });
  });

  router.delete('/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM portfolios WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la suppression du portfolio');
      } else {
        res.status(200).send('Portfolio supprimé avec succès');
      }
    });
  });

  router.get('/search', (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).send('Le paramètre de requête "query" est requis');
    }

    const sqlQuery = 'SELECT * FROM portfolios WHERE title LIKE ? OR description LIKE ?';
    const values = [`%${query}%`, `%${query}%`];

    db.query(sqlQuery, values, (err, results) => {
        if (err) {
            console.error('Erreur lors de la recherche des portfolios:', err);
            return res.status(500).send('Erreur lors de la recherche des portfolios');
        }

        res.status(200).json(results);
    });
});

  // Route pour ajouter un commentaire à un portfolio
  router.post('/portfolio/:id/comment', (req, res) => {
    const portfolioId = req.params.id;
    const { user_id, comment } = req.body;


    console.log('portfolioId:', portfolioId);
    console.log('user_id:', user_id);
    console.log('comment:', comment);

    if (!portfolioId || !user_id || !comment) {
        return res.status(400).send('Les champs portfolioId, user_id et comment sont requis');
    }

    const query = 'INSERT INTO comments (portfolio_id, user_id, content) VALUES (?, ?, ?)';
    const values = [portfolioId, user_id, comment];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du commentaire:', err);
            res.status(500).send('Erreur lors de l\'ajout du commentaire');
        } else {
            res.status(201).send('Commentaire ajouté avec succès');
        }
    });
});

  return router;
};
