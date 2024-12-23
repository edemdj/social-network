const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const jwt = require('jsonwebtoken');

const app = express();

// Utilisation de CORS
app.use(cors( {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
} ));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json()); // Pour interpréter les corps de requêtes en JSON

// Middleware de vérification de token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requis pour l\'authentification');

  try {
    const decoded = jwt.verify(token, 'secretkey'); // Utilisez la clé secrète appropriée
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Token invalide');
  }
  return next();
};

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'edem1234',
  database: 'portfolio_social'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('MySQL connecté');

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('quelque chose s\'est mal passé');
  });

  // Lien vers tes routes d'authentification
  app.use('/api/auth', authRoutes(db));
  
  // Utilisation du middleware sur les routes protégées
  app.use('/api/portfolio', portfolioRoutes(db));

  // Lien vers tes routes de portfolio
  app.use('/api', portfolioRoutes(db));

  // Serve les fichiers statiques de React
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Pour toute autre route, retourne le fichier index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });

  const PORT = 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});