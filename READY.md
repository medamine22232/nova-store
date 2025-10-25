#  NOVA STORE - PRÊT À UTILISER!

##  Tous les Problèmes Résolus

### 1. Erreur CSS Build - CORRIGÉE 
- Projet déplacé vers: `d:\XAMPP\htdocs\nova-store`
- L'espace dans le chemin causait l'erreur `ERR_UNSUPPORTED_ESM_URL_SCHEME`
- Tout fonctionne maintenant parfaitement!

### 2. Notifications Telegram - ACTIVÉES   
- Bot configuré: `7489339186:AAEgTUwyI_ayQsqrRFNnl5EqRvG0WSMUdwU`
- Groupe: `-4809800938`
- Chaque commande enverra automatiquement un message détaillé

---

##  DÉMARRAGE RAPIDE

### Option 1: Script Automatique
```powershell
powershell -ExecutionPolicy Bypass -File "d:\XAMPP\htdocs\nova-store\start.ps1"
```

### Option 2: Commandes Directes
```powershell
cd "d:\XAMPP\htdocs\nova-store"
npm run dev
```

**Visitez ensuite**: `http://localhost:3000`

---

##  Test des Notifications Telegram

1. Ouvrez `http://localhost:3000`
2. Cliquez sur un produit (6 produits d'exemple déjà disponibles)
3. Remplissez le formulaire de commande
4. Soumettez la commande
5. Vérifiez votre groupe Telegram - vous recevrez:
   - Nom du produit
   - Prix et quantité
   - Informations du client
   - Adresse de livraison
   - ID de commande
   - Date et heure

---

##  Structure du Projet

```
d:\XAMPP\htdocs\nova-store\     NOUVEAU CHEMIN (sans espace)
 app/
    api/
       orders/route.ts     Intégration Telegram
       products/
    admin/                  Panel admin
    produit/[id]/           Page produit
    merci/                  Page confirmation
    page.tsx                Boutique
 lib/
    prisma.ts
    telegram.ts             Nouveau! Notifications
 components/
    OrderForm.tsx
    admin/
 prisma/
    schema.prisma
    dev.db                  6 produits déjà ajoutés
    seed.js
 .env                        Config Telegram
 start.ps1                   Script de démarrage
 README.md

Ancien dossier: d:\XAMPP\htdocs\nova store\   Peut être supprimé
```

---

##  Fonctionnalités

###  Boutique E-Commerce
- Page d'accueil avec grille de produits
- Design professionnel orange/noir
- 100% responsive (mobile + desktop)
- Interface entièrement en français

###  Gestion des Commandes
- Formulaire avec validation
- Téléphone tunisien (20123456 ou +216 20123456)
- Gestion automatique du stock
- Paiement à la livraison
- Page de confirmation

###  Panel Admin (Sans Code!)
- `/admin` - Dashboard avec stats
- Ajouter/Modifier/Supprimer des produits
- Interface visuelle simple
- Aperçu des images en temps réel
- Liste des commandes récentes

###  Notifications Telegram (NOUVEAU!)
- Message automatique à chaque commande
- Format professionnel et lisible
- Toutes les infos nécessaires
- Emoji pour meilleure lisibilité

---

##  Base de Données

6 produits d'exemple déjà en base:
1. Smartphone Samsung Galaxy S23 - 2499.99 DT
2. Laptop HP Pavilion 15 - 3299.00 DT
3. Casque Sony WH-1000XM5 - 899.99 DT
4. Apple Watch Series 9 - 1599.00 DT
5. iPad Air 2024 - 2199.00 DT
6. Canon EOS R50 - 2799.00 DT

---

##  Variables d'Environnement (.env)

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Telegram Bot
TELEGRAM_BOT_TOKEN="7489339186:AAEgTUwyI_ayQsqrRFNnl5EqRvG0WSMUdwU"
TELEGRAM_CHAT_ID="-4809800938"
```

---

##  Commandes Utiles

### Démarrer le serveur
```powershell
cd "d:\XAMPP\htdocs\nova-store"
npm run dev
```

### Réinitialiser la base de données
```powershell
cd "d:\XAMPP\htdocs\nova-store"
node prisma/seed.js
```

### Nettoyer le cache
```powershell
cd "d:\XAMPP\htdocs\nova-store"
Remove-Item -Recurse -Force .next
npm run dev
```

### Réinstaller les dépendances
```powershell
cd "d:\XAMPP\htdocs\nova-store"
Remove-Item -Recurse -Force node_modules
npm install
```

---

##  Pages Disponibles

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Boutique (liste des produits) |
| `http://localhost:3000/produit/[id]` | Page détail produit + formulaire |
| `http://localhost:3000/merci` | Page de confirmation |
| `http://localhost:3000/admin` | Panel d'administration |
| `http://localhost:3000/admin/produit/nouveau` | Ajouter un produit |
| `http://localhost:3000/admin/produit/[id]` | Modifier un produit |

---

##  Dépannage

### Erreur au démarrage
```powershell
cd "d:\XAMPP\htdocs\nova-store"
Remove-Item -Recurse -Force .next, node_modules
npm install
npm run dev
```

### Telegram ne reçoit pas les messages
1. Vérifiez que le bot est membre du groupe
2. Vérifiez le `.env`
3. Testez le bot: `https://api.telegram.org/bot7489339186:AAEgTUwyI_ayQsqrRFNnl5EqRvG0WSMUdwU/getMe`

### Port 3000 déjà utilisé
```powershell
# Arrêtez le processus ou changez le port
$env:PORT=3001
npm run dev
```

---

##  RÉSUMÉ

 **Application fonctionnelle** - Plus d'erreurs CSS!
 **Telegram intégré** - Notifications automatiques
 **6 produits** - Prêts pour les tests
 **Admin opérationnel** - Gérez sans coder
 **Design pro** - Orange/Noir responsive
 **Tout en français** - Interface complète

---

##  Prochaines Étapes

1. **Testez l'application** sur `http://localhost:3000`
2. **Passez une commande test** pour vérifier Telegram
3. **Ajoutez vos propres produits** via `/admin`
4. **Personnalisez** si nécessaire (couleurs, textes, etc.)
5. **Déployez** sur Vercel quand vous êtes prêt!

---

** Votre boutique Nova Store est prête à l'emploi!**

**Lien direct**: http://localhost:3000
**Admin**: http://localhost:3000/admin
