const express = require('express');
const router = express.Router();

// Export de la fonction qui accepte l'objet `db` pour exécuter les requêtes de base de données
module.exports = (db) => {

  // Route pour créer un nouveau portfolio
  router.post('/portfolio', (req, res) => {
    const { links, theme, user_id } = req.body; // `theme` est déjà l'ID du thème
    
    // Insertion du portfolio avec l'ID du thème
    const query = `INSERT INTO portfolios (links, theme_id, user_id) VALUES (?, ?, ?)`;
    const values = [links, theme, user_id];
  
    // Exécution de la requête d'insertion
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Erreur lors de la création du portfolio:', err);
        return res.status(500).send('Erreur lors de la création du portfolio');
      }
      res.status(201).send('Portfolio créé avec succès');
    });
  });
  
  // Route pour récupérer un portfolio par son ID
  router.get('/portfolio/:id', (req, res) => {
    const portfolioId = req.params.id;
    const query = 'SELECT * FROM portfolios WHERE id = ?';

    // Exécution de la requête de récupération
    db.query(query, [portfolioId], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la récupération du portfolio');
      } else if (results.length === 0) {
        res.status(404).send('Portfolio non trouvé'); // Si aucun résultat n'est trouvé
      } else {
        res.status(200).json(results[0]); // Envoie du portfolio trouvé en réponse
      }
    });
  });

  // Route pour mettre à jour un portfolio par son ID
  router.put('/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const { links, theme_id } = req.body;
    const query = 'UPDATE portfolios SET links = ?, theme_id = ? WHERE id = ?';

    // Exécution de la requête de mise à jour
    db.query(query, [links, theme_id, id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la mise à jour du portfolio');
      } else {
        res.status(200).send('Portfolio mis à jour avec succès');
      }
    });
  });

  // Route pour supprimer un portfolio par son ID
  router.delete('/portfolio/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM portfolios WHERE id = ?';

    // Exécution de la requête de suppression
    db.query(query, [id], (err, results) => {
      if (err) {
        res.status(500).send('Erreur lors de la suppression du portfolio');
      } else {
        res.status(200).send('Portfolio supprimé avec succès');
      }
    });
  });

  // Route pour rechercher des portfolios par thème
  router.get('/search', async (req, res) => {
    const { theme } = req.query;
  
    if (!theme) {
      return res.status(400).send('Le paramètre de requête "theme" est requis');
    }
  
    try {
      // Récupérer l'ID du thème correspondant au nom fourni
      const themeQuery = "SELECT id FROM themes WHERE name = ?";
      const themeResults = await new Promise((resolve, reject) => {
        db.query(themeQuery, [theme], (err, results) => {
          if (err) {
            console.error('Erreur lors de la récupération de l\'ID du thème:', err);
            return reject('Erreur lors de la récupération de l\'ID du thème');
          }
          resolve(results);
        });
      });
  
      if (themeResults.length === 0) {
        return res.status(404).send('Thème non trouvé');
      }
  
      const themeId = themeResults[0].id;
  
      // Récupérer les portfolios associés à l'ID du thème
      const portfolioQuery = 'SELECT * FROM portfolios WHERE theme_id = ?';
      const portfolios = await new Promise((resolve, reject) => {
        db.query(portfolioQuery, [themeId], (err, results) => {
          if (err) {
            console.error('Erreur lors de la récupération des portfolios:', err);
            return reject('Erreur lors de la récupération des portfolios');
          }
          resolve(results);
        });
      });
  
      res.status(200).json(portfolios); // Envoie de la liste des portfolios trouvés
  
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Route pour ajouter un commentaire à un portfolio
  router.post('/portfolio/:id/comment', (req, res) => {
    const portfolioId = req.params.id;
    const { user_id, comment } = req.body;

    // Vérification des champs requis
    if (!portfolioId || !user_id || !comment) {
        return res.status(400).send('Les champs portfolioId, user_id et comment sont requis');
    }

    // Requête pour insérer le commentaire dans la base de données
    const query = 'INSERT INTO comments (portfolio_id, user_id, content) VALUES (?, ?, ?)';
    const values = [portfolioId, user_id, comment];

    // Exécution de la requête d'insertion du commentaire
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
