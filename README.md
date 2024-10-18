# social-network

Introduction

Bienvenue dans le projet de réseau social. Ce référentiel contient le code d'un site de réseautage social où les utilisateurs peuvent interagir par le biais de publications et de commentaires.

Caractéristiques

Gestion des utilisateurs : Les utilisateurs peuvent créer des profils, créer des publications et commenter des publications.

Gestion des messages : Les utilisateurs peuvent créer et gérer leurs messages.

Gestion des commentaires : Les utilisateurs peuvent commenter les publications.

Gestion des thèmes : Les messages peuvent être associés à différents thèmes.

Installation

Pour installer le projet, procédez comme suit :

Cloner le référentiel : git clone https://github.com/edemdj/social-network.git

Accédez au répertoire du projet : cd social-network

Installer les dépendances : npm install

Utilisation

Pour démarrer le projet :

Exécutez le serveur backend : npm run start

Ouvrez votre navigateur et accédez à http://localhost:3000

Schéma de la base de données

Le schéma de la base de données se compose des tableaux suivants :

Utilisateurs : Stocke les informations sur les utilisateurs et leurs relations avec les publications et les commentaires.

Publications : Stocke les informations de publication et leurs relations avec les commentaires.

Commentaires : Stocke les commentaires faits par les utilisateurs sur les publications.

Thèmes : stocke les thèmes et leurs relations avec les publications.

Diagrammes Relationnels Visuels

Travail futur

Mise en œuvre d'une authentification utilisateur plus robuste.

Ajouter plus d'interactions sociales comme les likes et les partages.

Améliorer l'interface utilisateur/UX pour une meilleure expérience utilisateur.
  
  •••••••••••••••••••••••••••••••••••••••••••••••••••••••@


Tables Principales

users

Colonnes:
id: INT, clé primaire, auto-incrémentée
username: VARCHAR(255), non null
email: VARCHAR(255), non null
password: VARCHAR(255), non null
portfolios

Colonnes:
id: INT, clé primaire, auto-incrémentée
links: TEXT, nullable
user_id: INT, nullable, clé étrangère référencée à users(id)
theme_id: INT, nullable
Relation:
Chaque portfolio appartient à un utilisateur (user_id).
comments

Colonnes:
id: INT, clé primaire, auto-incrémentée
portfolio_id: INT, clé étrangère référencée à portfolios(id)
user_id: INT, clé étrangère référencée à users(id)
content: TEXT, non null
created_at: TIMESTAMP, valeur par défaut CURRENT_TIMESTAMP
Relations:
Chaque commentaire appartient à un utilisateur (user_id).
Chaque commentaire est lié à un portfolio (portfolio_id).
themes

Colonnes:
id: INT, clé primaire, auto-incrémentée
name: VARCHAR(255), non null
portfolio_themes

Colonnes:
portfolio_id: INT, clé étrangère référencée à portfolios(id)
theme_id: INT, clé étrangère référencée à themes(id)
Relation:
Cette table de liaison relie les portfolios aux thèmes.
Diagramme Relationnel

users (id) <------ portfolios (user_id)
users (id) <------ comments (user_id)
portfolios (id) <------ comments (portfolio_id)
portfolios (id) <------ portfolio_themes (portfolio_id)
themes (id) <------ portfolio_themes (theme_id)

Ce diagramme montre comment les utilisateurs, les portfolios, les commentaires et les thèmes interagissent entre eux dans votre base de données. Les clés étrangères (user_id, portfolio_id, theme_id) établissent des liens entre les différentes tables pour maintenir l'intégrité des données et permettre des jointures efficaces pour les requêtes.