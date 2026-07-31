# ✨ Daba Glow — Beauté à domicile à Dakar

Site vitrine de **Daba Glow** (maquillage, manucure, coiffure à domicile),
construit avec Next.js 16, TypeScript et Tailwind CSS v4.
Direction artistique éditoriale : chocolat profond, doré, typographie
Fraunces italique. Réservation via WhatsApp.

Ce projet sert aussi de **template réutilisable** pour des sites de
commerces locaux : tout le contenu est séparé du code.

## 🚀 Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

## ✏️ Modifier le contenu (sans toucher au code)

Tout vit dans le dossier `content/` :

| Fichier                  | Contenu                                            |
| ------------------------ | -------------------------------------------------- |
| `content/site.config.ts` | Nom, slogan, **numéro WhatsApp**, réseaux, zone    |
| `content/prestations.ts` | Prestations, descriptions, prix, durées            |
| `content/realisations.ts`| Galerie : photos et vidéos TikTok                  |
| `content/temoignages.ts` | Avis clientes                                      |

### ⚠️ Avant la mise en ligne

1. **`site.config.ts`** : remplacer le numéro WhatsApp (`221000000000`)
   et les liens Instagram/TikTok par les vrais.
2. **Photos** : le portrait de Daba (`public/portrait.jpg`) est déjà
   en place. Déposer les photos de la galerie dans `public/realisations/`
   et celles des prestations dans `public/prestations/`, puis renseigner
   le champ `image` correspondant dans `content/`. Ajouter
   ses vraies photos dans `public/realisations/` et `public/prestations/`.
3. **Chiffres & atouts** : ajuster `content/atouts.ts` (chiffres honnêtes)
   et les horaires dans `content/site.config.ts`.
4. **Tarifs** : vérifier les prix dans `prestations.ts`.
5. **Partage social** : `public/og-image.jpg` est l'aperçu affiché sur
   WhatsApp/Instagram — le régénérer si le portrait ou le nom changent.

## 🧩 Composants signature

- `Halo` — le portrait dans ses anneaux dorés pulsants (héro)
- `Marquee` — bandeau défilant des prestations
- `GalerieFiltrable` — portfolio polaroid filtrable par catégorie
- `GalerieApercu` — sélection "coup de cœur" mise en avant sur l'accueil
- `TikTokEmbed` — vidéos TikTok en chargement différé (clic pour charger)
- `Reveal` — apparition douce au scroll (IntersectionObserver, zéro dépendance)

Accessibilité incluse : skip-link, focus visible, `prefers-reduced-motion`,
navigation clavier.

## 🌍 Déployer sur Vercel

1. Pousser le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) : **Add New Project** → importer le
   dépôt → Deploy (aucune configuration nécessaire).
3. Mettre à jour `url` dans `site.config.ts` avec l'URL finale.

## 🔁 Réutiliser comme template

Pour un nouveau client : dupliquer le projet, remplacer le dossier
`content/`, ajuster les couleurs dans `app/globals.css` (`@theme`) et
les polices dans `app/layout.tsx`. Le code ne change pas.

---

Conçu et développé par **NPS** — Ndeye Penda Sarr.
