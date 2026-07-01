# Analyse des bundles

Commande :

```bash
npm run analyze
```

Équivalent : `npx next experimental-analyze`. Ouvre une interface pour explorer la taille des chunks client et serveur.

## Modules souvent les plus lourds (client)

| Module | Pourquoi | Piste d'optimisation |
|--------|----------|----------------------|
| `next/dist` + runtime React | Framework de base | Inévitable, garder les composants client petits |
| `next-auth` / session client | Auth | Limiter les imports client, garder la logique en Server Actions |
| `i18next` | Traductions côté client | Charger uniquement les clés nécessaires, lazy init |
| Composants `"use client"` | JS envoyé au navigateur | Réduire la surface client, préférer les RSC |

## Modules serveur (hors bundle client)

Prisma, `bcryptjs`, accès base : exécutés côté serveur uniquement, ils n'alourdissent pas le bundle navigateur.

## Recommandations pour ce projet

1. **Lazy loading** : charger les sections démo ou admin uniquement quand nécessaire (`dynamic(() => import(...), { ssr: false })` pour du pur client).
2. **Tree shaking** : imports nommés (`import { t } from ...`) plutôt qu'import global de grosses librairies.
3. **Remplacement** : pour i18n minimal, les dictionnaires JSON + helper maison suffisent sans tout i18next côté client.
4. **Images** : continuer à utiliser `next/image` (déjà en place) pour limiter le poids perçu (LCP).
5. **Prefetch A/B** : le variant B réduit le prefetch réseau, pas la taille du bundle.

## Lien avec les Web Vitals

Le bundle client impacte surtout **LCP** (temps de chargement JS) et **INP** (interactivité). Surveiller la console `[Web Vitals]` après navigation pour corréler chunk lourd et métrique dégradée.
