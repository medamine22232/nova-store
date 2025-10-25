# ⚠️ Note Importante sur le Chemin du Projet

## Problème Potentiel

Le chemin actuel du projet contient un espace:
```
d:\XAMPP\htdocs\nova store
```

Cela peut causer des problèmes avec certains outils Node.js/Next.js sur Windows.

## ✅ Solution Recommandée

Renommez le dossier sans espace:

### Option 1: Utiliser un tiret
```
d:\XAMPP\htdocs\nova-store
```

### Option 2: Utiliser un underscore
```
d:\XAMPP\htdocs\nova_store
```

### Option 3: Utiliser PascalCase
```
d:\XAMPP\htdocs\NovaStore
```

## 🔧 Comment Renommer

1. **Arrêter le serveur** (Ctrl+C dans le terminal)

2. **Fermer VS Code**

3. **Renommer le dossier** dans l'explorateur Windows:
   - De: `d:\XAMPP\htdocs\nova store`
   - À: `d:\XAMPP\htdocs\nova-store`

4. **Rouvrir VS Code** dans le nouveau dossier

5. **Relancer le serveur**:
   ```powershell
   cd "d:\XAMPP\htdocs\nova-store"
   npm run dev
   ```

## 🎯 Si Vous Préférez Garder le Nom Actuel

Si vous voulez absolument garder le nom avec un espace, assurez-vous de:
- Toujours utiliser des guillemets dans les commandes PowerShell
- Être conscient que certains outils peuvent ne pas fonctionner correctement

---

**Recommandation**: Renommez le dossier pour éviter tout problème futur! 🚀
