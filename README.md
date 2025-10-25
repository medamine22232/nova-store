# 🛍️ Nova Store - E-Commerce Platform

Une boutique en ligne professionnelle construite avec Next.js, TypeScript, Prisma et Tailwind CSS.

## ✨ Fonctionnalités

- 🏪 **Boutique en ligne** : Affichage des produits avec images, prix et stock
- 🛒 **Système de commande** : Formulaire de commande avec validation (paiement à la livraison)
- 📱 **Design responsive** : Optimisé pour mobile et desktop
- 🎨 **Design professionnel** : Couleurs personnalisées (Orange #F89520 et Noir)
- 👨‍💼 **Panel Admin** : Interface pour gérer les produits sans coder
- ✅ **Validation des formulaires** : Format de téléphone tunisien
- 💾 **Base de données** : SQLite avec Prisma ORM

## 🚀 Installation

### Prérequis

- Node.js 18+ installé sur votre machine
- npm ou yarn

### Étapes d'installation

1. **Ouvrir le terminal dans le dossier du projet**

```powershell
cd "d:\XAMPP\htdocs\nova store"
```

2. **Installer les dépendances**

```powershell
npm install
```

3. **Initialiser la base de données**

```powershell
npx prisma generate
npx prisma db push
```

4. **Lancer le serveur de développement**

```powershell
npm run dev
```

5. **Ouvrir le navigateur**

Visitez: `http://localhost:3000`

## 📖 Utilisation

### Page Principale (Boutique)
- Accédez à `http://localhost:3000`
- Parcourez tous les produits disponibles
- Cliquez sur un produit pour voir les détails et passer commande

### Page Produit
- Remplissez le formulaire avec:
  - Nom complet
  - Numéro de téléphone tunisien (ex: 20123456 ou +216 20123456)
  - Adresse de livraison complète
  - Quantité désirée
- Cliquez sur "Passer la Commande"
- Vous serez redirigé vers la page de confirmation

### Panel Admin
- Accédez à `http://localhost:3000/admin`
- **Ajouter un produit**: Cliquez sur "Ajouter un Produit"
  - Nom du produit
  - Description
  - Prix (en DT)
  - Stock disponible
  - URL de l'image du produit
- **Modifier un produit**: Cliquez sur "Modifier" sur la carte du produit
- **Supprimer un produit**: Cliquez sur "Supprimer" (avec confirmation)
- **Voir les commandes récentes**: Tableau des dernières commandes

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.ts`:
- Primary (Orange): `#F89520`
- Primary Dark: `#E07A0C`
- Dark (Noir): `#1A1A1A`

### Logo
Remplacez le fichier logo dans le dossier `public/` si nécessaire.

## 📂 Structure du Projet

```
nova store/
├── app/
│   ├── admin/              # Pages admin
│   ├── api/                # Routes API
│   ├── produit/[id]/       # Page détail produit
│   ├── merci/              # Page confirmation
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Page d'accueil (boutique)
│   └── globals.css         # Styles globaux
├── components/
│   ├── admin/              # Composants admin
│   │   ├── ProductForm.tsx
│   │   └── ProductList.tsx
│   └── OrderForm.tsx       # Formulaire de commande
├── lib/
│   └── prisma.ts           # Client Prisma
├── prisma/
│   ├── schema.prisma       # Schéma de base de données
│   └── dev.db              # Base de données SQLite
├── public/                 # Fichiers statiques
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🗄️ Base de Données

### Tables

**Product**
- id (UUID)
- name (String)
- description (String)
- price (Float)
- image (String)
- stock (Int)
- createdAt, updatedAt

**Order**
- id (UUID)
- productId (String)
- fullName (String)
- phoneNumber (String)
- deliveryAddress (String)
- quantity (Int)
- totalPrice (Float)
- status (String)
- createdAt, updatedAt

## 🌐 Déploiement

### Vercel (Recommandé)

1. Push votre code sur GitHub
2. Connectez votre repo à Vercel
3. Configurez les variables d'environnement si nécessaire
4. Déployez!

**Note**: Pour la production, remplacez SQLite par PostgreSQL ou MySQL

## 🛠️ Technologies Utilisées

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Prisma** - ORM pour la base de données
- **SQLite** - Base de données (développement)
- **Lucide React** - Icônes
- **React Hook Form** - Gestion des formulaires
- **React Hot Toast** - Notifications

## 📝 Notes

- Le paiement se fait à la livraison (pas de paiement en ligne)
- Format de téléphone tunisien validé automatiquement
- Interface entièrement en français
- Design adaptatif mobile-first

## 🤝 Support

Pour toute question ou problème, référez-vous à la documentation de:
- [Next.js](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

© 2025 Nova Store. Tous droits réservés.
