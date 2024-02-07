# Flami - Jeu sur la Flamme des JO 2024

Bienvenue dans Flami, un jeu en ligne éducatif et ludique basé sur la flamme des Jeux Olympiques 2024.

## Technologies Utilisées

- MongoDB
- Express.js
- React.js
- Node.js

## Installation

### 1. Configuration de MongoDB

Assurez-vous que vous avez MongoDB installé localement ou configurez une instance MongoDB en ligne. 

### 2. Cloner le Repository

```bash
git clone https://github.com/votre-utilisateur/flami-app.git
cd flami-app
```

### 3. Configuration du Backend

```bash
cd server
npm install
```

Créez un fichier `.env` dans le dossier `server` et ajoutez les variables d'environnement suivantes :

```env
PORT=3001
MONGODB_URI=your_mongodb_uri_here
```

### 4. Configuration du Frontend

```bash
cd client
npm install
```

### 5. Lancement de l'Application

- Lancer le backend :

```bash
cd server
npm run dev
```

- Lancer le frontend :

```bash
cd client
npm run dev
```

L'application sera accessible à l'adresse http://localhost:5173 dans votre navigateur.

## Comment Installer MongoDB

Suivez les instructions sur le site officiel de MongoDB pour installer la base de données : [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/)
