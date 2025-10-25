# 🚀 Guide de Démarrage Rapide - Nova Store

## ✅ L'application est maintenant en cours d'exécution!

Visitez: **http://localhost:3000**

---

## 📍 Pages Disponibles

### 🏪 Boutique (Page Principale)
- **URL**: `http://localhost:3000`
- Affiche tous les produits disponibles
- Cliquez sur un produit pour commander

### 👨‍💼 Panel Admin
- **URL**: `http://localhost:3000/admin`
- Gérez vos produits sans écrire de code
- Ajoutez, modifiez ou supprimez des produits
- Consultez les commandes récentes

---

## 🎯 Premiers Pas

### 1. Ajouter votre premier produit

1. Allez sur: `http://localhost:3000/admin`
2. Cliquez sur **"Ajouter un Produit"**
3. Remplissez le formulaire:
   - **Nom**: ex. "Smartphone Samsung Galaxy S21"
   - **Description**: ex. "Écran AMOLED 6.2 pouces, 128GB, 8GB RAM"
   - **Prix**: ex. "1299.99" (en Dinars Tunisiens)
   - **Stock**: ex. "10"
   - **URL Image**: Utilisez une URL d'image, par exemple:
     - `https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500`
     - `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500`
     - `https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500`

4. Cliquez sur **"Ajouter"**

### 2. Voir votre boutique

1. Retournez sur la page principale: `http://localhost:3000`
2. Vous verrez votre produit affiché dans une belle carte
3. Cliquez sur le produit pour voir les détails

### 3. Tester une commande

1. Sur la page du produit, remplissez le formulaire:
   - **Nom Complet**: ex. "Ahmed Ben Ali"
   - **Téléphone**: ex. "20123456" ou "+216 20123456"
   - **Adresse**: ex. "123 Avenue Habib Bourguiba, Tunis 1000"
   - **Quantité**: ex. "1"

2. Cliquez sur **"Passer la Commande"**
3. Vous serez redirigé vers une page de confirmation

4. Retournez sur `/admin` pour voir la commande dans le tableau

---

## 🎨 Exemples d'URLs d'Images

Pour vos produits, vous pouvez utiliser ces URLs d'images gratuites:

### Électronique
```
https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500
https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500
https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500
```

### Vêtements
```
https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500
https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500
https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500
```

### Accessoires
```
https://images.unsplash.com/photo-1509941943102-10c232535736?w=500
https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500
https://images.unsplash.com/photo-1611923134239-a9c11b6ad3b5?w=500
```

---

## 💡 Conseils

### Téléphone Tunisien
Le système accepte ces formats:
- `20123456` (8 chiffres commençant par 2-9)
- `+216 20123456`
- `+21620123456`

### Prix
- Entrez les prix en Dinars Tunisiens (DT)
- Utilisez des décimales si nécessaire: `199.99`

### Stock
- Le stock est automatiquement décrémenté après chaque commande
- Si le stock atteint 0, le produit affiche "Épuisé"

---

## 🛠️ Commandes Utiles

### Arrêter le serveur
Appuyez sur `Ctrl + C` dans le terminal

### Relancer le serveur
```powershell
cd "d:\XAMPP\htdocs\nova store"
npm run dev
```

### Réinitialiser la base de données
```powershell
cd "d:\XAMPP\htdocs\nova store"
npx prisma db push --force-reset
```

### Configuration MongoDB (Nouvelle base de données)

Le projet utilise maintenant MongoDB au lieu de SQLite pour une meilleure compatibilité avec le déploiement.

#### Option 1: MongoDB Local
1. Installez MongoDB Community Server depuis [mongodb.com](https://www.mongodb.com/try/download/community)
2. Démarrez le service MongoDB
3. Utilisez cette DATABASE_URL dans `.env`:
   ```
   DATABASE_URL="mongodb://localhost:27017/nova-store"
   ```

#### Option 2: MongoDB Atlas (Cloud - Recommandé pour la production)
1. Créez un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créez un cluster (M0 gratuit)
3. Créez un utilisateur de base de données
4. Obtenez la chaîne de connexion
5. Utilisez cette DATABASE_URL dans `.env`:
   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/nova-store?retryWrites=true&w=majority"
   ```

#### Après configuration MongoDB:
```powershell
cd "d:\XAMPP\htdocs\nova store"
npx prisma generate
npx prisma db push
```

---

## 🎨 Personnalisation

### Modifier les Couleurs

Éditez `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: '#F89520',  // Orange principal
    dark: '#E07A0C',     // Orange foncé
    light: '#FFA940',    // Orange clair
  },
  dark: {
    DEFAULT: '#1A1A1A',  // Noir
    light: '#2D2D2D',    // Gris foncé
  }
}
```

---

## 📱 Tester sur Mobile

1. Trouvez l'adresse IP de votre ordinateur:
   ```powershell
   ipconfig
   ```

2. Cherchez "Adresse IPv4" (ex: `192.168.1.100`)

3. Sur votre téléphone, visitez:
   ```
   http://192.168.1.100:3000
   ```

---

## ✨ Fonctionnalités

✅ Boutique en ligne responsive
✅ Formulaire de commande avec validation
✅ Panel admin complet
✅ Gestion des produits (CRUD)
✅ Gestion du stock automatique
✅ Format téléphone tunisien
✅ Paiement à la livraison
✅ Design professionnel
✅ Interface en français

---

## 🆘 Problèmes Courants

### Le serveur ne démarre pas
```powershell
# Supprimez node_modules et réinstallez
rm -r node_modules
npm install
npm run dev
```

### Erreur de base de données
```powershell
# Réinitialisez la base de données
npx prisma db push --force-reset
npx prisma generate
```

### Images ne s'affichent pas
- Vérifiez que l'URL de l'image est correcte et accessible
- Essayez une autre URL d'image

---

## 📞 Support

Pour plus d'informations, consultez le `README.md` complet.

**Bon développement! 🚀**
