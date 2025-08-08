# Plateforme de Traduction de Documents Web

## 📋 Description

Cette plateforme web a été développée dans le cadre d'un projet de fin d'études en informatique à l'Université de l'Ouest de Timișoara. Elle facilite la communication et l'échange de documents entre clients et administrateurs pour les services de traduction scientifique, particulièrement dans le domaine de la biologie.

## ✨ Fonctionnalités Principales

### Pour les Clients
- **Page d'Accueil** : Affichage des dernières actualités et réalisations
- **Page Profil** : Gestion des informations personnelles
- **Page Services** : Soumission de documents pour traduction
- **Page Reçus/Envoyés** : Suivi de l'historique des documents
- **Chat en Direct** : Communication en temps réel avec les administrateurs
- **Chatbot Traducteur** : Services de traduction rapide

### Types de Services Disponibles
- **Traduction** : Langue source/Langue cible
- **Méthodologie** : Type de référencement requis
- **Statistiques** : Analyses statistiques
- **Bioinformatique** : Séquençage ADN

### Pour les Administrateurs
- Réception et traitement des demandes de traduction
- Acceptation ou rejet des requêtes
- Communication directe avec les clients
- Gestion du contenu (actualités, réalisations)

## 🏗️ Architecture Technique

### Frontend
- **Framework** : Angular
- **Langage** : TypeScript
- **Interface** : Composants réactifs et intuitifs
- **Communication** : HTTP Client pour les API REST

### Backend
- **Framework** : Java Spring Boot
- **Sécurité** : Spring Security avec authentification
- **API** : RESTful endpoints
- **Temps réel** : WebSocket pour le chat

### Base de Données
- **SGBD** : SQL Server
- **ORM** : Spring Data JPA
- **Tables principales** :
  - `card` : Cartes de services
  - `definition` : Section actualités
  - `homePage` : Section réalisations

## 🚀 Installation et Configuration

### Prérequis

#### Backend
- Java 8 ou supérieur
- IntelliJ IDEA (recommandé)
- SQL Server

#### Frontend
- Node.js
- Visual Studio Code (recommandé)
- Angular CLI

### Dépendances Backend (Spring Boot)

```xml
<!-- Web Starter -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- JDBC Support -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>

<!-- Web Services -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web-services</artifactId>
</dependency>

<!-- Dev Tools -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
</dependency>

<!-- Lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

### Dépendances Frontend (Angular)

```json
{
  "dependencies": {
    "@angular/core": "^15.0.0",
    "@angular/common": "^15.0.0",
    "@angular/platform-browser": "^15.0.0",
    "@angular/material": "^15.0.0"
  }
}
```

### Configuration de la Base de Données

1. Installer SQL Server
2. Créer une base de données pour l'application
3. Configurer les paramètres de connexion dans `application.properties`

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=translation_db
spring.datasource.username=votre_username
spring.datasource.password=votre_password
spring.jpa.hibernate.ddl-auto=update
```

## 🔧 Démarrage de l'Application

### Backend
1. Ouvrir le projet dans IntelliJ IDEA
2. Exécuter la classe principale Spring Boot
3. L'API sera disponible sur `http://localhost:8080`

### Frontend
```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
ng serve

# L'application sera disponible sur http://localhost:4200
```

## 📊 Diagrammes et Architecture

Le projet inclut plusieurs diagrammes techniques :
- **Diagramme d'Activité** : Processus métier de soumission et traitement
- **Diagramme de Séquence** : Interactions entre utilisateur, interface et backend
- **Diagramme de Classes** : Structure des entités et relations
- **Diagramme de Cas d'Usage** : Fonctionnalités disponibles

## 🔐 Sécurité

- **Authentification** : Spring Security avec chiffrement des mots de passe
- **Autorisation** : Contrôle d'accès basé sur les rôles
- **Communication** : HTTPS pour les données sensibles
- **Validation** : Validation côté client et serveur

## 🧪 Tests

### Tests de Fonctionnalité
- **Chatbot** : Gestion des requêtes utilisateur
- **Upload de fichiers** : Support de différents formats
- **Interface administrateur** : Révision et traitement des demandes
- **Communication temps réel** : Messagerie instantanée

### Tests de Sécurité
- Évaluation des vulnérabilités
- Protection des données
- Authentification et autorisation
- Réponse aux incidents

## 📝 Utilisation

### Pour les Clients
1. **Inscription/Connexion** : Créer un compte ou se connecter
2. **Sélection du Service** : Choisir le type de traduction souhaité
3. **Upload du Document** : Télécharger le fichier à traduire
4. **Suivi** : Suivre le statut de la demande
5. **Téléchargement** : Récupérer le document traduit

### Pour les Administrateurs
1. **Réception des Demandes** : Notifications automatiques
2. **Révision** : Analyse des documents soumis
3. **Traitement** : Acceptation ou rejet des demandes
4. **Communication** : Contact direct avec les clients

## 🤝 Contribution

Ce projet a été développé par **Abdelhak Haddadi** sous la supervision de **Dr. Florin Rosu** dans le cadre du programme de Bachelor en Informatique en anglais à l'Université de l'Ouest de Timișoara.

## 📄 Licence

Projet académique - Université de l'Ouest de Timișoara, 2023
