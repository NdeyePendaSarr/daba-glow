# ✨ Daba Glow — Beauté à domicile à Mbour

Site vitrine de **Daba Glow** (maquillage, manucure, coiffure à domicile),
construit avec Next.js 16, TypeScript et Tailwind CSS v4.
Direction artistique éditoriale : chocolat profond, doré, typographie
Fraunces italique. Réservation via WhatsApp.

Ce projet sert aussi de **template réutilisable** pour des sites de
commerces locaux : tout le contenu est séparé du code.

> **🔗 Démo en ligne : [daba-glow.vercel.app](https://daba-glow.vercel.app/)**

## 🖼️ Aperçu

| Accueil | Réalisations coup de cœur |
| :---: | :---: |
| ![Page d'accueil de Daba Glow](screenshots/accueil.png) | ![Galerie des réalisations](screenshots/realisations.png) |

Le portfolio par catégorie, en polaroïds — maquillage et coiffure :

| Réalisations maquillage | Réalisations coiffure |
| :---: | :---: |
| ![Réalisations maquillage](screenshots/prestations-maquillage.png) | ![Réalisations coiffure](screenshots/prestations-coiffure.png) |

## 🚀 Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes :

```bash
npm test           # tests unitaires (Vitest)
npm run lint       # ESLint
npx tsc --noEmit   # vérification des types
npm run build      # build de production
```

## ✏️ Modifier le contenu (sans toucher au code)

Tout le contenu vit dans le dossier `content/`, séparé du code :

| Fichier                   | Contenu                                         |
| ------------------------- | ----------------------------------------------- |
| `content/site.config.ts`  | Nom, slogan, **numéro WhatsApp**, réseaux, zone |
| `content/prestations.ts`  | Prestations, descriptions, prix, durées         |
| `content/realisations.ts` | Galerie : photos et vidéos TikTok               |
| `content/atouts.ts`       | Chiffres clés et atouts                         |

## 🧩 Composants signature

- `Halo` — le portrait dans ses anneaux dorés pulsants (héro)
- `Marquee` — bandeau défilant des prestations
- `GalerieCategorie` — portfolio polaroïd d'une catégorie (photos + TikTok, lightbox clavier)
- `GalerieApercu` — sélection "coup de cœur" mise en avant sur l'accueil
- `TikTokEmbed` — vidéos TikTok en chargement différé (clic pour charger)
- `Reveal` — apparition douce au scroll (IntersectionObserver, zéro dépendance)

Accessibilité incluse : skip-link, focus visible, `prefers-reduced-motion`,
navigation clavier.

## ✅ Qualité & tests

- **TypeScript strict**, **ESLint** (config plate Next 16) et build : zéro erreur.
- **Tests unitaires (Vitest)** sur le helper de formatage et surtout sur
  **l'intégrité du contenu** : chaque prestation/réalisation a ses champs, des
  clés uniques, une catégorie valide, et **chaque image référencée existe bien
  dans `public/`**. Idéal pour un template : une faute de frappe dans un nom de
  fichier est attrapée par la CI, pas par la visiteuse.
- **Intégration continue** (GitHub Actions) : lint + types + tests + build à
  chaque push et pull request (`.github/workflows/ci.yml`).
- **Accessibilité** : skip-link, focus visible, navigation clavier (lightbox,
  menu), `prefers-reduced-motion`, attributs ARIA sur les dialogues.

## 🔁 Réutiliser comme template

Pour un nouveau commerce : dupliquer le projet, remplacer le dossier
`content/`, ajuster les couleurs dans `app/globals.css` (`@theme`) et les
polices dans `app/layout.tsx`. Le code ne change pas.

---

Conçu et développé par **Ndeye Penda Sarr**.