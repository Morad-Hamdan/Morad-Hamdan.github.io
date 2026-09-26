<div align="center">

# 👋 Mor@D — Portfolio

### *Portfolio personnel · Développeur logiciel*

**Site statique · HTML / CSS / JS pur · Hébergé sur GitHub Pages**

[![GitHub](https://img.shields.io/badge/GitHub-Morad--Hamdan-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Morad-Hamdan)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/fr/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/fr/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**🌐 En ligne :** **https://morad-hamdan.github.io**

</div>

---

## 📋 À propos

Site vitrine personnel. **Aucun framework, aucune étape de build** : trois fichiers
statiques servis directement par GitHub Pages.

Le site met en avant :

- 🎯 **Hero animé** — effet machine à écrire, fond particules canvas, terminal interactif
- 📊 **Stats GitHub en direct** — dépôts, étoiles et ancienneté récupérés via l'API GitHub au chargement
- 🗂️ **Projets** — cartes générées à partir des dépôts réels, mises à jour automatiquement
- 🛠️ **Compétences** — groupes de technologies + barres de progression animées
- 📱 **Responsive** — menu burger sous 860px, grille adaptative
- ♿ **Accessible** — navigation clavier, `prefers-reduced-motion` respecté, contrastes soignés

---

## 🗂️ Structure

```
.
├── index.html            # Structure + contenu
├── style.css             # Thème dark néon (variables CSS, grid, animations)
├── script.js             # Typewriter · nav · reveal · canvas · API GitHub
├── .nojekyll             # Désactive le générateur Jekyll de GitHub Pages
├── README.md
└── LICENSE
```

> `_test_desktop.html` est un **harnais de test local** (exclu du dépôt par
> `.gitignore`). Il affiche la page dans une iframe de 1400 px pour vérifier le
> layout desktop sans redimensionner la fenêtre du navigateur.

---

## 🚀 Démarrage rapide

### En local

```bash
# N'importe quel serveur statique fait l'affaire
python -m http.server 8000
# puis ouvrir http://localhost:8000
```

Ouvrir `index.html` directement en `file://` fonctionne aussi, mais l'API GitHub
peut être bloquée par la politique CORS de certains navigateurs. **Préférer un serveur local.**

---

## ⚙️ Personnalisation

Tout se trouve dans `index.html` — pas de générateur, pas de template.

| À modifier | Où |
|---|---|
| Vos projets | Section `#projets` dans `index.html` |
| Vos compétences | Section `#competences` dans `index.html` |
| Les rôles du typewriter | Tableau `roles` dans `script.js` |
| L'utilisateur GitHub analysé | Constante `USER` dans `script.js` |
| Les couleurs du thème | Bloc `:root` en haut de `style.css` |

### Thème — variables CSS

```css
:root{
  --bg:      #0A0C10;   /* fond */
  --cyan:    #00E5FF;   /* accent principal */
  --violet:  #7C4DFF;   /* accent secondaire */
  --pink:    #FF4D9D;   /* accent tertiaire */
  --grad:    linear-gradient(120deg,#00E5FF,#7C4DFF,#FF4D9D);
}
```

Changer ces 4 valeurs rethème tout le site.

---

## 🌐 Déploiement sur GitHub Pages

1. Créer le dépôt **`Morad-Hamdan.github.io`** (le nom est imposé par GitHub Pages)
2. Pousser sur la branche `main`
3. `Settings → Pages → Build and deployment → Source: Deploy from a branch`
4. Branche `main`, dossier `/ (root)` → **Save**
5. Le site est en ligne sous **https://morad-hamdan.github.io** (génération ~1 min)

> ⚠️ Le dépôt doit s'appeler **exactement** `<username>.github.io` pour que le site
> soit servi à la racine du domaine. Sinon l'URL serait `/nom-du-repo/`.

---

## 📈 API GitHub utilisée

Le site interroge deux endpoints **publics, sans authentification** :

| Endpoint | Usage |
|---|---|
| `GET /users/{user}` | Nombre de dépôts, date de création |
| `GET /users/{user}/repos` | Étoiles, langages, forks par projet |

**Rate-limit non authentifié :** 60 requêtes/heure/IP. Le site en émet **2 par
chargement**, soit ~1 700 visites/heure avant limite. En cas de dépassement, le
site reste fonctionnel : les chiffres affichent simplement `—`.

Pour lever la limite, il faudrait un token — inutile pour un portfolio statique.

---

## ✅ Qualité

- **0 erreur console**
- **0 dépendance externe** hors Google Fonts (avec repli `system-ui`)
- **`prefers-reduced-motion`** : toutes les animations se coupent pour les utilisateurs sensibles
- **Pause automatique** du canvas quand l'onglet est masqué (économie batterie)
- **Responsive testé** de 320 px à 1440 px

---

## 📄 Licence

Distributed under the [MIT License](LICENSE).

---

<div align="center">

Conçu &amp; codé par **Morad Hamdan**

⭐ *Si ce portfolio vous plaît, faites un tour sur [mes dépôts](https://github.com/Morad-Hamdan?tab=repositories) !*

</div>
