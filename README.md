# social-network

Table users

Relation avec posts : Chaque utilisateur peut avoir plusieurs publications. Cette relation est représentée par une clé étrangère user_id dans la table posts qui réfère à id dans la table users.
Relation avec comments : Chaque utilisateur peut également avoir plusieurs commentaires. Cette relation est représentée par une clé étrangère user_id dans la table comments qui réfère à id dans la table users.
Table posts

Relation avec comments : Chaque publication peut avoir plusieurs commentaires. Cette relation est représentée par une clé étrangère post_id dans la table comments qui réfère à id dans la table posts.
Table post_themes

Relation avec posts : Cette table de liaison contient les relations entre les publications et les thèmes. Chaque enregistrement dans post_themes a une clé étrangère post_id qui réfère à id dans la table posts.
Relation avec themes : Chaque enregistrement dans post_themes a également une clé étrangère theme_id qui réfère à id dans la table themes.
Table themes

Relation avec post_themes : Chaque thème peut être associé à plusieurs publications via la table de liaison post_themes.
Diagramme Relationnel Visuel

users (id) <------ portfolios (user_id)
        \             |
         `--> comments (user_id)
         `--> comments (portfolio_id)
portfolios (id) <------ post_themes (portfolio_id)
themes (id) <----- post_themes (theme_id)


En résumé, ce diagramme montre comment les utilisateurs, les publications, les commentaires et les thèmes interagissent entre eux dans votre base de données. Les clés étrangères (user_id, post_id, theme_id) établissent des liens entre les différentes tables pour maintenir l'intégrité des données et permettre des jointures efficaces pour les requêtes.