const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  // Route pour la connexion utilisateur
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Tentative de connexion pour:', email);

    try {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
          console.error('Erreur de requête SQL:', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        if (results.length === 0) {
          console.log('Utilisateur non trouvé:', email);
          return res.status(400).json({ message: 'Utilisateur non trouvé' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.log('Mot de passe incorrect pour:', email);
          return res.status(400).json({ message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ userId: user.id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, user_id: user.id });
      });
    } catch (err) {
      console.error('Erreur serveur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  // Route pour la connexion invité
  router.post('/guest-login', async (req, res) => {
    try {
      const guestUser = { id: 'guest', role: 'guest' };
      const token = jwt.sign(guestUser, 'secretkey', { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Erreur serveur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  // Route pour la création d'utilisateur
  router.post('/register', async (req, res) => {
    const { email, password, username } = req.body;

    try {
      // Hache le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insère l'utilisateur avec le mot de passe haché
      db.query('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username], (err, result) => {
        if (err) {
          console.error('Erreur de requête SQL:', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }

        const token = jwt.sign({ userId: result.insertId }, 'secretkey', { expiresIn: '1h' });
        res.json({ token });
      });
    } catch (err) {
      console.error('Erreur serveur:', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

  return router;
};