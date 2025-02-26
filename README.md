# API Université Internationale de Cocody

## Introduction
API Express connectée à MongoDB pour la gestion des étudiants et des utilisateurs.

## Installation et démarrage

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/hackolwyn/BackendUIC.git
   cd BackendUIC
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez le fichier `.env` (voir ci-dessous).

4. Lancez l'application :
   ```bash
   npm start
   ```

## Fichier .env
```
MONGO_URI=mongodb://localhost:27017/Universite_Internationale_de_Cocody
JWT_SECRET=your_jwt_secret_key
```

## Test des endpoints avec Postman

### Endpoint d'accueil
- **Méthode** : GET  
- **URL** : `http://localhost:3000/api/`  
- **Résultat attendu** :  
  Un message "Bienvenue sur l'API de l'université internationale de Cocody !"

### Documentation Swagger
- Ouvrez dans votre navigateur :  
  `http://localhost:3000/api/docs`

### Endpoint étudiants

#### Récupération de tous les étudiants
- **Méthode** : GET  
- **URL** : `http://localhost:3000/api/students`  
- **Résultat attendu** :  
  Une liste d'étudiants, sous forme d'un tableau JSON.

#### Création d'un étudiant
- **Méthode** : POST  
- **URL** : `http://localhost:3000/api/students`  
- **Header** :  
  `Content-Type: application/json`  
- **Body (raw JSON)** :
  ```json
  {
    "name": "John Doe",
    "age": 25,
    "email": "john@example.com"
  }
  ```
- **Résultat attendu** :  
  Un objet JSON avec un message de succès et les données de l'étudiant créé.

#### Récupération d'un étudiant par ID
- **Méthode** : GET  
- **URL** : `http://localhost:3000/api/students/ID_DE_VOTRE_ETUDIANT`  
- **Résultat attendu** :  
  Les données de l'étudiant correspondant à l'ID fourni.

#### Mise à jour d'un étudiant
- **Méthode** : PUT  
- **URL** : `http://localhost:3000/api/students/ID_DE_VOTRE_ETUDIANT`  
- **Header** :  
  `Content-Type: application/json`  
- **Body (raw JSON)** :
  ```json
  {
    "name": "John Updated",
    "age": 26,
    "email": "johnupd@example.com"
  }
  ```
- **Résultat attendu** :  
  Les données mises à jour de l'étudiant.

#### Suppression d'un étudiant
- **Méthode** : DELETE  
- **URL** : `http://localhost:3000/api/students/ID_DE_VOTRE_ETUDIANT`  
- **Résultat attendu** :  
  Un message indiquant que l'étudiant a bien été supprimé.

### Endpoint utilisateurs
Pour le moment, certaines méthodes de l'API utilisateur utilisent des stubs. Testez en envoyant une requête GET, POST, PUT, DELETE sur `http://localhost:3000/api/users` et vérifiez le message renvoyé (par exemple "getUserById not implemented").

---

Ces instructions devraient vous permettre de vérifier l'ensemble de vos endpoints à l'aide de Postman.

Contenu de la branche locale
Contenu de la branche distante
