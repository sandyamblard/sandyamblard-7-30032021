-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 20 avr. 2021 à 07:45
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniap7_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` mediumtext NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `userId`, `title`, `content`, `url`, `likes`, `createdAt`, `updatedAt`) VALUES
(1, 7, 'Tout premier post !!', 'Le forum Groupomania est lancé !', 'http://localhost:3000/images/file1618835087122.jpg', 6, '2021-03-30 17:38:45', '2021-04-19 12:24:47'),
(5, 16, 'Match de foot demain soir', 'Une partie de foot demain soir ça vous dit pour fêter l\'inauguration du réseau ? Rendez-vous demain soir 19h pour le plein de convivialité et bonne humeur !', 'http://localhost:3000/images/file1618816525097.jpg', 2, '2021-04-08 10:26:26', '2021-04-20 07:40:25'),
(6, 7, 'Réunion mardi soir', 'Rendez-vous à la salle de réunion du 2ème étage à 19h. A l\'ordre su jour : les préparatifs pour mon départ à la retraite immitente, échange de dossiers etc... ', 'http://localhost:3000/images/file1618834386067.jpg', 2, '2021-04-09 13:29:22', '2021-04-19 12:14:13'),
(7, 12, 'Food Truck', 'Tous les mercredis midis un food truck est présent au parking. Venez nombreux, les hamburgers sont délicieux !', 'http://localhost:3000/images/file1618833802475.jpg', 1, '2021-04-12 12:52:48', '2021-04-19 16:25:08'),
(9, 12, 'Compte-rendu réunion de mardi', 'Voici ce qui a été dit :\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat ducimus quod, adipisci consectetur, dolorem sapiente dolor, molestiae quam sint nulla magni. Reprehenderit, debitis fugiat. Reprehenderit in non, aperiam harum eos quaerat adipisci blanditiis quibusdam, cupiditate laboriosam a? Dolores voluptates excepturi fugit soluta possimus porro doloribus, accusamus inventore commodi, ut, neque dignissimos voluptatibus cum laudantium deserunt eius. Pariatur nam id dolorum.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat ducimus quod, adipisci consectetur, dolorem sapiente dolor, molestiae quam sint nulla magni. Reprehenderit, debitis fugiat. Reprehenderit in non, aperiam harum eos quaerat adipisci blanditiis quibusdam, cupiditate laboriosam a? Dolores voluptates excepturi fugit soluta possimus porro doloribus, accusamus inventore commodi, ut, neque dignissimos voluptatibus cum laudantium deserunt eius. Pariatur nam id dolorum.\nLorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat ducimus quod, adipisci consectetur, dolorem sapiente dolor, molestiae quam sint nulla magni. Reprehenderit, debitis fugiat. Reprehenderit in non, aperiam harum eos quaerat adipisci blanditiis quibusdam, cupiditate laboriosam a? Dolores voluptates excepturi fugit soluta possimus porro doloribus, accusamus inventore commodi, ut, neque dignissimos voluptatibus cum laudantium deserunt eius. Pariatur nam id dolorum.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat ducimus quod, adipisci consectetur, dolorem sapiente dolor, molestiae quam sint nulla magni. Reprehenderit, debitis fugiat. Reprehenderit in non, aperiam harum eos quaerat adipisci blanditiis quibusdam, cupiditate laboriosam a? Dolores voluptates excepturi fugit soluta possimus porro doloribus, accusamus inventore commodi, ut, neque dignissimos voluptatibus cum laudantium deserunt eius. Pariatur nam id dolorum.', NULL, 1, '2021-04-13 08:12:56', '2021-04-19 16:51:06'),
(15, 8, 'Faire-part', 'La joie d\'une mamie : Je suis fière de vous présenter mon nouveau petit-fils Jules ! Parents et bébé en pleine forme ! Que du bonheur ! ', 'http://localhost:3000/images/file1618834871968.jpg', 5, '2021-04-14 16:34:33', '2021-04-19 16:16:15');

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `commContent` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_ibfk_1` (`articleId`),
  KEY `comments_ibfk_2` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `articleId`, `userId`, `commContent`, `createdAt`, `updatedAt`) VALUES
(1, 1, 10, 'Vraiment top ce nouveau réseau !!', '2021-04-01 14:29:35', '2021-04-11 15:53:37'),
(2, 1, 8, 'Contente que ce projet vous plaise, n\'hésitez pas à communiquer ! ', '2021-04-01 14:41:02', '2021-04-01 14:41:02'),
(6, 1, 3, 'Merci, c\'est super !', '2021-04-02 13:41:19', '2021-04-20 07:41:43'),
(7, 5, 7, 'Super Idée', '2021-04-08 16:24:13', '2021-04-08 16:24:13'),
(8, 6, 7, 'Ce sera suivi d\'un pot de l\'amitié', '2021-04-09 13:29:53', '2021-04-19 12:14:48'),
(13, 6, 10, 'C\'est noté', '2021-04-11 17:13:35', '2021-04-19 13:47:32'),
(17, 6, 16, 'J\'amène des amuses-bouches pour le pot !', '2021-04-15 16:18:53', '2021-04-19 13:48:13'),
(26, 7, 7, 'Miam !', '2021-04-16 13:28:54', '2021-04-16 13:28:54'),
(29, 15, 12, 'Félicitations ! ', '2021-04-19 12:06:38', '2021-04-19 12:06:38'),
(30, 5, 12, 'J\'y serais sans faute !', '2021-04-19 12:07:07', '2021-04-19 12:07:07'),
(31, 1, 12, 'Une super initiative', '2021-04-19 12:07:43', '2021-04-19 12:07:43'),
(32, 15, 8, 'La famile s\'aggrandit ! Bienvenue au bébé', '2021-04-19 12:46:40', '2021-04-19 12:46:40'),
(33, 15, 16, 'Quelle jolie photo pleine d\'amour', '2021-04-19 13:21:54', '2021-04-19 16:19:53'),
(34, 7, 17, 'C\'est noté dans mon agenda, j\'y serais tous les mercredi, lol ! ', '2021-04-19 13:42:34', '2021-04-19 13:42:34'),
(35, 5, 17, 'Je sais pas jouer mais je viens faire le fan club', '2021-04-19 13:43:04', '2021-04-19 13:43:04');

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isLike` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `likes_ibfk_1` (`articleId`),
  KEY `likes_ibfk_2` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `articleId`, `userId`, `isLike`, `createdAt`, `updatedAt`) VALUES
(15, 1, 10, 1, '2021-03-31 15:35:56', '2021-03-31 15:35:56'),
(16, 1, 15, 1, '2021-04-08 14:49:08', '2021-04-08 14:49:08'),
(17, 1, 16, 1, '2021-04-08 14:49:14', '2021-04-08 14:49:14'),
(18, 1, 9, 1, '2021-04-08 14:49:20', '2021-04-08 14:49:20'),
(26, 6, 12, 1, '2021-04-11 13:24:49', '2021-04-11 13:24:49'),
(28, 6, 11, 1, '2021-04-12 07:30:56', '2021-04-12 07:30:56'),
(29, 5, 11, 1, '2021-04-12 07:36:53', '2021-04-12 07:36:53'),
(30, 1, 12, 1, '2021-04-13 09:10:22', '2021-04-13 09:10:22'),
(31, 1, 8, 1, '2021-04-13 09:46:18', '2021-04-13 09:46:18'),
(43, 15, 8, 1, '2021-04-19 12:46:22', '2021-04-19 12:46:22'),
(44, 15, 16, 1, '2021-04-19 14:40:37', '2021-04-19 14:40:37'),
(45, 15, 12, 1, '2021-04-19 14:41:00', '2021-04-19 14:41:00'),
(46, 15, 17, 1, '2021-04-19 14:41:32', '2021-04-19 14:41:32'),
(47, 15, 11, 1, '2021-04-19 14:42:23', '2021-04-19 14:42:23'),
(48, 7, 16, 1, '2021-04-19 16:25:08', '2021-04-19 16:25:08'),
(49, 9, 16, 1, '2021-04-19 16:51:06', '2021-04-19 16:51:06'),
(50, 5, 12, 1, '2021-04-20 07:40:25', '2021-04-20 07:40:25');

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20210329161524-create-user.js'),
('20210329161812-create-article.js'),
('20210331161524-create-like.js'),
('20210401161623-create-comment.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `birthdate`, `password`, `imageUrl`, `description`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(3, 'bbb7087c22df1e37947fdd59a662765f6ce8dd9b6fabdf7ecb56924aa97dabccd7586cd62c7aa635a9220712682ccf11b7d8b548732e23e6290464a825cb9ef7', 'Grégory', 'Forestier', NULL, '$2b$10$ulJm0gtC0XXVXsT.VeIbCO.8Ap9nDcAr5xMbBdGIClYV1LanvR5i.', 'http://localhost:3000/images/file1618836185582.jpg', '   Responsable marketing', 0, '2021-03-30 09:23:11', '2021-04-19 12:43:05'),
(7, '9e0d4a3eecdc5c787e8c847eb6de73af6165426a72629a8b4723651efa8cfc8d6efa22fb97522eb5e0ba13b03e4b7aa013570924dd8ee592a0f309e5105dfcc8', 'Colette', 'Dupuis', '1955-04-04', '$2b$10$PopWPz/IMZnq/CisLAVGIeIkVqXdtd6dTXoONasik9MvfJa8..LSC', 'http://localhost:3000/images/file1618476800283.jpg', 'Bientôt retraitée, donc la plus expérimentée de tous !', 0, '2021-03-30 15:12:47', '2021-04-15 08:53:20'),
(8, '98e7d7d4ce7966986cc4ba7ad120b740f565c89d54e939c06ddac8c2da4358293121515448958dc727d169b1fb25aaa762bd9342d3511dee4cfd7376ed28c0c2', 'Chargé', 'de communication', NULL, '$2b$10$wNc727n/jE1WTu1v6ErUJ.znRReUNe7toddtz6Aqc4cJwq1Bgz2s6', 'http://localhost:3000/images/file1618835107628.jpg', 'je suis l\'administrateur, attention à ce que vous écrivez ! Je veille !', 1, '2021-03-31 08:47:58', '2021-04-19 12:25:07'),
(9, 'e936dc12ccf3eceba1c42e6e8affeb01169a06df1854c7886ad0c9d2d2162b373a86fab4d4d5a72c6bc39614d21d51df6e2c60b535db03a8e3493c084f259b2e', 'Jean', 'Durant', '1978-09-03', '$2b$10$l5.P9p9OahzjHs682sRV9urwZNjEgGgnBY05KZr0oSs2afnOZUR7u', 'http://localhost:3000/images/file1618478920603.jpg', 'Grand timide...', 0, '2021-03-31 10:00:43', '2021-04-15 09:28:40'),
(10, '407480f71de394c19cb03205645f5df5497f9e87be3e43173313aea8657dd46c8696e9476069a4d876492fefa7a95553576634421134aa84796493a34872c60a', 'Sandy', 'Amblard', '1983-07-06', '$2b$10$69XYBX3gnxRexNn4xFo/oeXtSjTD94TAsi5PsRJnJLiBpb8dO/s6m', 'http://localhost:3000/images/file1618834215707.jpg', 'Carpe Diem !', 0, '2021-03-31 14:26:12', '2021-04-19 12:10:15'),
(11, '6364af30ee343e0959e51ceb3e89549e9c46b8ccab935503e51b94f834e7090278c4c646a565f224ea8ee7625586039bced4ccbf460b1dc15cc6178014cffcf1', 'Marie', 'Dupont', NULL, '$2b$10$/Ka5r2f/RdxwaunDGj1QBugyAQZQ3pmrBy79BPbZjxO7HT8pbw19C', NULL, '', 0, '2021-04-07 10:12:56', '2021-04-15 09:45:38'),
(12, '1f78c0ace50bda70ba04c50697efd982a5ab12809750af608aa5d0a92a7a48cd4ab00c26c088e1884efe2cf4d1031cee85c5c7c535a29174e966a02e96e3c553', 'John', 'Doe', '1991-08-07', '$2b$10$QPe66FMMRBY78QcIpJFUDOo5hhtlFIxq3uEoHMc3knkfE9h8.i/ti', 'http://localhost:3000/images/file1618476324480.jpg', 'Tout nouveau dans l\'entreprise !', 0, '2021-04-07 12:17:00', '2021-04-15 08:45:24'),
(13, '1f0d6de85b19b8f856136029c8016de3364f7463c70b38b409f0a1a1e8286cf1e4b77c65467312956ee7ef3c05ea9a4d9ed8748f1eb9912710e3527f924f35ae', 'Treizieme', 'Utilisateur', '1973-02-01', '$2b$10$s4eXGTX6Tmh3X62Zn8Ds6.Oki8qywmqRgLXXZ5VZ3.6WM8pdI6Ywq', NULL, 'Chiffre porte-bonheur : 13', 0, '2021-04-07 12:22:54', '2021-04-09 16:13:48'),
(15, '7671ea5ee442c26843c4dc38ccec1c4ce74c8c7238021224cc118cf81c2b4eae0fa6b8d311ca8da08fd87ba7053250f6a29c67f3e22c6a32430b9a079f73cc97', 'Nicolas', 'Martin', '1995-12-01', '$2b$10$1gfbGm61p3sqCZucdkp.H.VcLwVpDw3s0sKl7y7NlCSqwNigPrmKe', NULL, 'Bio', 0, '2021-04-07 13:46:53', '2021-04-16 08:55:53'),
(16, '8a854a1865eb72137e0bd78e85716865d0a7b6936ab3525252d1f1c29d1a8588392eba600bebac3e1f86b8fee7299269791f91cbc04b002bd4cb967d6f90134b', 'Julie', 'Morin', NULL, '$2b$10$LirrAqbQp5fn6TBsJgXlAexdN2XVj3U1gFiP/k6PUTqTGWF15Zza6', 'http://localhost:3000/images/file1618817909864.jpg', 'Allez les bleues !', 0, '2021-04-07 13:53:46', '2021-04-19 13:50:20'),
(17, '67df83bfe75e110da35dc1f199a97a2475ce5c3bba9cffcd65652b520554c06fd315cfceff06631340b40b3cc9d5a7436e1ab1d30da406b78d7c778797039006', 'Lou', 'Garcia', '2000-04-13', '$2b$10$7Fyzhh20Cc5ieSZ.fSdoTunMo.LQD9gNWeIKUj6B/3UaixJcOy4tS', 'http://localhost:3000/images/file1618419991480.jpg', '   ', 0, '2021-04-14 17:06:31', '2021-04-16 13:39:29');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`articleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
