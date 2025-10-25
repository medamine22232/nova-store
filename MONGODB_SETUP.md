# 🍃 Guide Configuration MongoDB pour Nova Store

## 📝 Vue d'ensemble

Nova Store utilise maintenant MongoDB au lieu de SQLite pour une meilleure compatibilité avec les déploiements serverless (Vercel, Netlify, etc.).

## 🚀 Options de Configuration

### Option 1: MongoDB Atlas (Cloud) - Recommandé

#### Avantages
- ✅ Gratuit jusqu'à 512MB
- ✅ Compatible avec tous les hébergeurs
- ✅ Pas d'installation locale nécessaire
- ✅ Sauvegardes automatiques
- ✅ Haute disponibilité

#### Étapes de configuration

1. **Créer un compte Atlas**
   - Allez sur [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Créez un compte gratuit

2. **Créer un cluster**
   - Cliquez sur "Build a Database"
   - Choisissez le plan "M0 Sandbox" (gratuit)
   - Sélectionnez une région proche (ex: Europe)
   - Nom du cluster: `nova-store`

3. **Configurer l'accès**
   - **Utilisateur de base de données**:
     - Username: `nova-admin`
     - Password: Générez un mot de passe sécurisé
     - Permissions: "Read and write to any database"
   
   - **Liste d'adresses IP autorisées**:
     - Ajoutez `0.0.0.0/0` pour autoriser toutes les IP (développement)
     - En production, limitez aux IP spécifiques

4. **Obtenir la chaîne de connexion**
   - Cliquez sur "Connect" sur votre cluster
   - Sélectionnez "Drivers"
   - Copiez la chaîne de connexion
   - Format: `mongodb+srv://nova-admin:<password>@nova-store.xxxxx.mongodb.net/`

5. **Configurer dans Nova Store**
   ```bash
   # Dans votre fichier .env
   DATABASE_URL="mongodb+srv://nova-admin:VOTRE_MOT_DE_PASSE@nova-store.xxxxx.mongodb.net/nova-store?retryWrites=true&w=majority"
   ```

### Option 2: MongoDB Local

#### Avantages
- ✅ Contrôle total
- ✅ Pas de limite de données
- ✅ Fonctionne hors ligne

#### Inconvénients
- ❌ Ne fonctionne pas avec Vercel/Netlify
- ❌ Installation requise

#### Installation Windows

1. **Télécharger MongoDB**
   - Allez sur [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - Téléchargez la version Windows (.msi)

2. **Installer MongoDB**
   - Exécutez le fichier .msi
   - Choisissez "Complete" installation
   - Installez comme service Windows
   - Installez MongoDB Compass (interface graphique optionnelle)

3. **Vérifier l'installation**
   ```powershell
   # Vérifiez que MongoDB fonctionne
   mongosh --version
   ```

4. **Configurer dans Nova Store**
   ```bash
   # Dans votre fichier .env
   DATABASE_URL="mongodb://localhost:27017/nova-store"
   ```

## 🔧 Migration depuis SQLite

### Étapes de migration

1. **Sauvegarder les données existantes (optionnel)**
   ```powershell
   # Si vous avez des données importantes dans SQLite
   # Exportez-les manuellement depuis l'admin panel
   ```

2. **Mettre à jour la configuration**
   ```bash
   # Copiez .env.example vers .env si pas encore fait
   cp .env.example .env
   
   # Modifiez DATABASE_URL dans .env
   DATABASE_URL="mongodb://localhost:27017/nova-store"
   # OU pour Atlas:
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nova-store?retryWrites=true&w=majority"
   ```

3. **Regénérer le client Prisma**
   ```powershell
   npx prisma generate
   ```

4. **Pousser le nouveau schéma**
   ```powershell
   npx prisma db push
   ```

5. **Réinitialiser avec des données de test (optionnel)**
   ```powershell
   npm run seed
   ```

## 🐛 Dépannage

### Erreur de connexion MongoDB

```
Error: P1001: Can't reach database server at localhost:27017
```
**Solution**: Vérifiez que MongoDB est démarré
```powershell
# Windows - démarrer le service
net start MongoDB

# Ou redémarrer
net stop MongoDB
net start MongoDB
```

### Erreur d'authentification Atlas

```
Error: Authentication failed
```
**Solutions**:
1. Vérifiez username/password dans DATABASE_URL
2. Vérifiez que l'IP est autorisée (0.0.0.0/0)
3. Vérifiez que l'utilisateur a les bonnes permissions

### Erreur de réseau Atlas

```
Error: Network timeout
```
**Solutions**:
1. Vérifiez votre connexion Internet
2. Essayez une autre région de cluster
3. Vérifiez les paramètres firewall

## 📊 Comparaison SQLite vs MongoDB

| Caractéristique | SQLite | MongoDB |
|-----------------|--------|---------|
| **Installation** | ✅ Aucune | ❌ Service requis |
| **Fichier local** | ✅ Oui | ❌ Non |
| **Serverless (Vercel)** | ❌ Non compatible | ✅ Compatible |
| **Scalabilité** | ❌ Limitée | ✅ Excellente |
| **Complexité** | ✅ Simple | ⚠️ Moyenne |
| **Performance** | ✅ Rapide (local) | ✅ Rapide (réseau) |

## 🌐 Déploiement

### Vercel avec MongoDB Atlas

1. **Variables d'environnement Vercel**
   ```bash
   # Dans Vercel Dashboard > Settings > Environment Variables
   DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/nova-store
   CLOUDINARY_CLOUD_NAME=dfyeulpm4
   CLOUDINARY_UPLOAD_PRESET=novastore
   CLOUDINARY_API_KEY=232161939884944
   CLOUDINARY_API_SECRET=zZizAIikNAmRDgug7aNPRS6GkCM
   ```

2. **Build Commands**
   ```bash
   # Dans Vercel > Settings > Build & Development
   Build Command: npm run build
   Install Command: npm install
   ```

### Variables d'environnement de production

```bash
# Production .env (Vercel/Netlify)
DATABASE_URL="mongodb+srv://prod-user:secure-password@prod-cluster.mongodb.net/nova-store-prod?retryWrites=true&w=majority"
NEXT_PUBLIC_APP_URL="https://votre-domaine.vercel.app"
CLOUDINARY_CLOUD_NAME="dfyeulpm4"
CLOUDINARY_UPLOAD_PRESET="novastore"
CLOUDINARY_API_KEY="232161939884944"
CLOUDINARY_API_SECRET="zZizAIikNAmRDgug7aNPRS6GkCM"
```

## 💡 Bonnes Pratiques

### Sécurité
- ✅ Utilisez des mots de passe forts pour MongoDB
- ✅ Limitez les IP autorisées en production
- ✅ Utilisez des variables d'environnement pour les credentials
- ✅ Activez l'authentification MongoDB

### Performance
- ✅ Créez des index pour les requêtes fréquentes
- ✅ Utilisez la compression réseau
- ✅ Optimisez les requêtes Prisma

### Monitoring
- ✅ Surveillez l'utilisation de la base de données
- ✅ Configurez des alertes sur Atlas
- ✅ Sauvegardez régulièrement (Atlas le fait automatiquement)

## 📞 Support

### Atlas Support
- [Documentation officielle MongoDB Atlas](https://docs.atlas.mongodb.com/)
- [Communauté MongoDB](https://community.mongodb.com/)

### Prisma + MongoDB
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

---

**Migration réussie! Votre application est maintenant prête pour le cloud! 🚀**