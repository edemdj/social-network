Social Network

Introduction

Bienvenue dans le projet Social Network. Ce référentiel contient le code d'un réseau social où les utilisateurs peuvent partager leurs portfolios, interagir par le biais de publications et de commentaires, et découvrir des contenus classés par thèmes.

Caractéristiques

Gestion des utilisateurs : Les utilisateurs peuvent créer un profil, se connecter, publier des portfolios, et commenter les publications des autres utilisateurs.
Portfolios : Les utilisateurs peuvent créer des portfolios et les classer par thèmes.
Commentaires : Les utilisateurs peuvent commenter les portfolios publiés.
Thèmes : Les portfolios peuvent être associés à différents thèmes pour faciliter la recherche.
Installation

Suivez les étapes ci-dessous pour installer et exécuter le projet en local.

Clonez le référentiel :
git clone https://github.com/edemdj/social-network.git
Accédez au répertoire du projet :
cd social-network
Installez les dépendances :
npm install
Utilisation

Pour démarrer le projet :

Exécutez le serveur backend :
npm run start
Ouvrez votre navigateur et accédez à http://localhost:3000 pour voir l'application en action.
Schéma de la Base de Données

Le schéma de la base de données se compose des tables suivantes :

Tables Principales
users

id : INT, clé primaire, auto-incrémentée
username : VARCHAR(255), non null
email : VARCHAR(255), non null
password : VARCHAR(255), non null
portfolios

id : INT, clé primaire, auto-incrémentée
links : TEXT, nullable
user_id : INT, clé étrangère (référence users(id))
theme_id : INT, nullable
comments

id : INT, clé primaire, auto-incrémentée
portfolio_id : INT, clé étrangère (référence portfolios(id))
user_id : INT, clé étrangère (référence users(id))
content : TEXT, non null
created_at : TIMESTAMP, valeur par défaut CURRENT_TIMESTAMP
themes

id : INT, clé primaire, auto-incrémentée
name : VARCHAR(255), non null
portfolio_themes

portfolio_id : INT, clé étrangère (référence portfolios(id))
theme_id : INT, clé étrangère (référence themes(id))
Diagramme Relationnel
Le schéma suivant montre comment les utilisateurs, les portfolios, les commentaires et les thèmes interagissent dans la base de données :

users (id) <------ portfolios (user_id)
users (id) <------ comments (user_id)
portfolios (id) <------ comments (portfolio_id)
portfolios (id) <------ portfolio_themes (portfolio_id)
themes (id) <------ portfolio_themes (theme_id)
Les clés étrangères (user_id, portfolio_id, theme_id) établissent des relations entre les différentes tables pour maintenir l'intégrité des données.

Diagrammes Relationnels Visuels

Vous pouvez créer des diagrammes visuels pour mieux comprendre les relations de la base de données en utilisant un outil comme dbdiagram.io.

Travail Futur

Amélioration de l'authentification : Mettre en œuvre une authentification utilisateur plus robuste.
Nouvelles interactions : Ajouter des fonctionnalités de likes et de partages pour enrichir l'expérience utilisateur.
Améliorations de l'interface : Optimiser l'interface utilisateur (UI) et l'expérience utilisateur (UX) pour un meilleur confort.
Contribution

Les contributions sont les bienvenues ! Pour contribuer :

Forkez ce dépôt.
Créez une branche pour votre fonctionnalité (git checkout -b feature/NouvelleFonctionnalite).
Committez vos changements (git commit -m 'Ajouter nouvelle fonctionnalité').
Pushez vers la branche (git push origin feature/NouvelleFonctionnalite).
Ouvrez une pull request pour révision.
