# 🛍️ Nova Store - Simple Landing Page# 🛍️ Nova Store - E-Commerce Platform



A simple, clean product landing page that sends orders directly to Telegram.Une boutique en ligne professionnelle construite avec Next.js, TypeScript, Prisma et Tailwind CSS.



## ✨ Features## ✨ Fonctionnalités



- **Single Product Display**: Show one product with name, price, description, and stock- 🏪 **Boutique en ligne** : Affichage des produits avec images, prix et stock

- **Order Form**: Simple form to collect customer details- 🛒 **Système de commande** : Formulaire de commande avec validation (paiement à la livraison)

- **Telegram Integration**: Orders sent directly to your Telegram chat- 📱 **Design responsive** : Optimisé pour mobile et desktop

- **Mobile Responsive**: Works perfectly on all devices- 🎨 **Design professionnel** : Couleurs personnalisées (Orange #F89520 et Noir)

- **No Database**: No complex database setup required- 👨‍💼 **Panel Admin** : Interface pour gérer les produits sans coder

- ✅ **Validation des formulaires** : Format de téléphone tunisien

## 🚀 Quick Setup- 💾 **Base de données** : SQLite avec Prisma ORM



### 1. Clone & Install## 🚀 Installation

```bash

git clone https://github.com/medamine22232/nova-store.git### Prérequis

cd nova-store

npm install- Node.js 18+ installé sur votre machine

```- npm ou yarn



### 2. Configure Telegram Bot### Étapes d'installation

1. Message @BotFather on Telegram

2. Create a new bot with `/newbot`1. **Ouvrir le terminal dans le dossier du projet**

3. Get your bot token

4. Add the bot to your chat/group```powershell

5. Get your chat IDcd "d:\XAMPP\htdocs\nova store"

```

### 3. Set Environment Variables

Copy `.env.example` to `.env` and update:2. **Installer les dépendances**

```bash

NEXT_PUBLIC_APP_URL="http://localhost:3000"```powershell

TELEGRAM_BOT_TOKEN="your-bot-token-here"npm install

TELEGRAM_CHAT_ID="your-chat-id-here"```

```

3. **Initialiser la base de données**

### 4. Customize Your Product

Edit the product data in `app/page.tsx`:```powershell

```javascriptnpx prisma generate

const PRODUCT = {npx prisma db push

  id: '1',```

  name: 'Your Product Name',

  description: 'Your product description here...',4. **Lancer le serveur de développement**

  price: 999.99,

  image: 'https://your-image-url.com/image.jpg',```powershell

  stock: 10npm run dev

};```

```

5. **Ouvrir le navigateur**

### 5. Run the Application

```bashVisitez: `http://localhost:3000`

npm run dev

```## 📖 Utilisation



Visit `http://localhost:3000` to see your landing page!### Page Principale (Boutique)

- Accédez à `http://localhost:3000`

## 📱 How It Works- Parcourez tous les produits disponibles

- Cliquez sur un produit pour voir les détails et passer commande

1. **Customer visits** your landing page

2. **Views product** details (name, price, description, stock)### Page Produit

3. **Fills order form** with their details- Remplissez le formulaire avec:

4. **Submits order** - gets confirmation message  - Nom complet

5. **You receive** order details in Telegram instantly  - Numéro de téléphone tunisien (ex: 20123456 ou +216 20123456)

  - Adresse de livraison complète

## 🎨 Customization  - Quantité désirée

- Cliquez sur "Passer la Commande"

### Change Product Details- Vous serez redirigé vers la page de confirmation

Edit the `PRODUCT` object in `app/page.tsx` to update:

- Product name### Panel Admin

- Description  - Accédez à `http://localhost:3000/admin`

- Price (in DT - Tunisian Dinars)- **Ajouter un produit**: Cliquez sur "Ajouter un Produit"

- Image URL  - Nom du produit

- Stock quantity  - Description

  - Prix (en DT)

### Update Styling  - Stock disponible

- Colors and fonts are in `tailwind.config.ts`  - URL de l'image du produit

- Main styling uses Tailwind CSS classes- **Modifier un produit**: Cliquez sur "Modifier" sur la carte du produit

- Orange theme with clean, modern design- **Supprimer un produit**: Cliquez sur "Supprimer" (avec confirmation)

- **Voir les commandes récentes**: Tableau des dernières commandes

### Telegram Message Format

The Telegram message includes:## 🎨 Personnalisation

- 📦 Product name and price

- 📊 Quantity ordered### Couleurs

- 💳 Total priceLes couleurs sont définies dans `tailwind.config.ts`:

- 👤 Customer details (name, phone, address)- Primary (Orange): `#F89520`

- 📅 Order timestamp- Primary Dark: `#E07A0C`

- Dark (Noir): `#1A1A1A`

## 🌐 Deployment

### Logo

### Vercel (Recommended)Remplacez le fichier logo dans le dossier `public/` si nécessaire.

1. Push code to GitHub

2. Connect to Vercel## 📂 Structure du Projet

3. Add environment variables:

   - `NEXT_PUBLIC_APP_URL` = your vercel app URL```

   - `TELEGRAM_BOT_TOKEN` = your bot tokennova store/

   - `TELEGRAM_CHAT_ID` = your chat ID├── app/

4. Deploy!│   ├── admin/              # Pages admin

│   ├── api/                # Routes API

### Environment Variables for Production│   ├── produit/[id]/       # Page détail produit

```bash│   ├── merci/              # Page confirmation

NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"│   ├── layout.tsx          # Layout principal

TELEGRAM_BOT_TOKEN="your-telegram-bot-token"│   ├── page.tsx            # Page d'accueil (boutique)

TELEGRAM_CHAT_ID="your-telegram-chat-id"│   └── globals.css         # Styles globaux

```├── components/

│   ├── admin/              # Composants admin

## 📞 Support│   │   ├── ProductForm.tsx

│   │   └── ProductList.tsx

Simple and lightweight - no complex database, no admin panel, just a clean landing page that sends orders to Telegram.│   └── OrderForm.tsx       # Formulaire de commande

├── lib/

Perfect for:│   └── prisma.ts           # Client Prisma

- Single product sales├── prisma/

- Pre-orders and launches  │   ├── schema.prisma       # Schéma de base de données

- Simple e-commerce needs│   └── dev.db              # Base de données SQLite

- Quick setup and deployment├── public/                 # Fichiers statiques

├── package.json

---├── tsconfig.json

└── tailwind.config.ts

**Ready to sell! 🚀**```

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
