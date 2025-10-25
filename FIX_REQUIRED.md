# 🔧 CORRECTION URGENTE - Chemin avec Espace

## ⚠️ Problème Détecté

Le chemin du projet avec un espace (`nova store`) cause des erreurs avec le chargeur CSS de Next.js.

```
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'd:'
```

## ✅ SOLUTION IMMÉDIATE

### Méthode 1: Renommer le Dossier (RECOMMANDÉ) 🎯

1. **Arrêter VS Code complètement**

2. **Ouvrir l'Explorateur Windows**

3. **Aller à** `d:\XAMPP\htdocs\`

4. **Renommer** le dossier:
   - De: `nova store`
   - À: `nova-store` (avec un tiret)

5. **Ouvrir VS Code** dans le nouveau dossier `nova-store`

6. **Ouvrir le terminal** et lancer:
   ```powershell
   cd "d:\XAMPP\htdocs\nova-store"
   npm run dev
   ```

7. **Visiter** `http://localhost:3000`

---

### Méthode 2: Déplacer le Projet (Alternative)

Si vous préférez, déplacez tout le projet dans un chemin sans espace:

```powershell
# Exemple 1: Dans C:
C:\Projects\nova-store

# Exemple 2: Directement dans htdocs avec un tiret
d:\XAMPP\htdocs\nova-store

# Exemple 3: Sans espaces
d:\XAMPP\htdocs\NovaStore
```

---

## 🚀 Après le Renommage

Une fois renommé, tout fonctionnera parfaitement:

```powershell
cd "d:\XAMPP\htdocs\nova-store"
npm run dev
```

Visitez: `http://localhost:3000`

---

## 📝 Pourquoi Ce Problème?

Les espaces dans les chemins de fichiers peuvent causer des problèmes avec:
- Les loaders Webpack
- Certains outils Node.js
- Les URL de fichiers sur Windows

**C'est une limitation connue de Windows + Node.js + certains outils.**

---

## ✅ Checklist Après Renommage

- [ ] Dossier renommé en `nova-store`
- [ ] VS Code ouvert dans le nouveau dossier
- [ ] Terminal ouvert dans le bon chemin
- [ ] `npm run dev` lancé sans erreurs
- [ ] `http://localhost:3000` fonctionne
- [ ] Les produits s'affichent correctement
- [ ] L'admin fonctionne

---

## 🆘 Si Problème Persiste

Si après le renommage vous avez toujours des problèmes:

```powershell
# 1. Supprimer node_modules et .next
rm -r node_modules
rm -r .next

# 2. Réinstaller
npm install

# 3. Relancer
npm run dev
```

---

**Note**: Cette correction est **nécessaire** pour que l'application fonctionne correctement! 🎯
