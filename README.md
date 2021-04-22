PROJET 7 Developpeur web OpenClassRooms : Créer un réseau social d'entreprise : front-end (Vue.js) + back-end (node.js, express, Sequelize, SQL)

# Installer Base de données à partir de groupomaniap7_dev.sql

- soit via ligne de commande : mysql -u????? -pxxxxxxxx groupomaniap7_dev < groupomaniap7_dev.sql (choisir utilisateur et password souhaité)
- soit via phpMyAdmin (bouton : importer)
- Puis la démarrer sur un serveur (Wamp ou équivalent).
- la BDD est déjà remplie avec quelques utilisateurs, messages et commentaires pour mimer un début d'activité sur le réseau. Le compte administrateur est accessible avec : admin@groupomania.com , password : OpcrPro7

# Démarrer serveur frontend :

Dans un terminal :

- cd frontend
- npm install
- npm run serve
- aller sur http://localhost:8080

# Démarrer serveur backend

- ajouter le fichier .env (fourni dans le dossier .zip de la soutenance) au dossier backend.
- Mettre à jour la variable DB_INFOS_SQL avec utilisateur et password choisi lors de l'installation de la bdd et le port utilisé (si différent de 3306) pour mettre à jour les données de connexion.

Puis dans un nouveau terminal :

- cd backend
- npm install
- node server.js
