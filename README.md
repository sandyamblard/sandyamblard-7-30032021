PROJET 7 Developpeur web OpenClassRooms : Créer un réseau social d'entreprise : front-end (Vue.js) + back-end (node.js, express, Sequelize, SQL)

# Installer Base de données à partir de groupomaniap7_dev.sql

- soit via ligne de commande : mysql -uroot -p417271 groupomaniap7_dev < groupomaniap7_dev.sql (changer utilisateur et password si besoin)
- soit via phpMyAdmin (bouton : importer)
- Puis la démarrer sur un serveur (Wamp ou équivalent).
- la BDD est déjà remplie avec quelques utilisateurs, messages et commentaires pour mimer un début d'activité sur le réseau. Le compte administrateur est accessible avec : admin@groupomania.com , password : OpcrPro7

# Démarrer serveur frontend :

- cd frontend
- npm install
- npm run serve
- aller sur http://localhost:8080

# Démarrer serveur backend

- ajouter le fichier .env (fourni dans le dossier .zip de la soutenance) au dossier backend. Si l'utilisateur et le password a été changé lors de l'installation de la base de données, et si le port utilisé est autre que 3306 : pensez à le changer dans ce fichier (variable DB_INFOS_SQL), pour mettre à jour les données de connexion.
- cd backend
- npm install
- node server.js
