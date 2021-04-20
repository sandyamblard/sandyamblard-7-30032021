PROJET 7 Developpeur web OpenClassRooms : Créer un réseau social d'entreprise : front-end (Vue.js) + back-end (node.js, express, Sequelize, SQL)

# Installer Base de données à partir de groupomaniap7_dev.sql

- via ligne de commande (ou phpMyAdmin)
- Puis démarrer sur un serveur (Wamp ou équivalent)
- la BDD est déjà remplie avec quelques utilisateurs, messages et commentaires pour mimer un début d'activité sur le réseau. Le compte administrateur est accessible avec : admin@groupomania.com , password : OpcrPro7

# Démarrer serveur frontend :

- cd frontend
- npm install
- npm run serve
- aller sur http://localhost:8080

# Démarrer serveur backend

- ajouter le fichier .env (fourni dans le dossier .zip de la soutenance) au dossier backend
- cd backend
- npm install
- node server.js
