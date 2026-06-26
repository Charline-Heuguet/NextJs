# My supa store : Ateliers Next.js

Boutique Next.js 16 (App Router, Prisma, SQLite) réalisée en TD.

**Commandes utiles :**
```bash
npm run dev        # serveur de développement
npm run build      # build production
npm start          # serveur production (prefetch, cache)
npm run db:migrate # migrations Prisma
npm run db:seed    # réinitialise les produits
npx prisma studio  # interface base de données (lire l'URL affichée)
```

---

## Atelier Jour 1

**Objectif :** poser les fondations de l'application (routing, catalogue, panier client, admin, pages de démo).

**Ce qui a été fait :**

**Structure et routing**
- Route groups `(front)` et `(admin)` avec layouts distincts
- Pages : accueil, catalogue, fiche produit, back-office admin
- `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx` (transition de page)

**Catalogue produits**
- Prisma + SQLite, modèle `Product`, seed depuis `products.json` (13 produits)
- Architecture domaine : entité, repository, couche data
- `ProductCard`, `ProductGrid`, liste et fiche produit
- `generateStaticParams` et `generateMetadata` sur `/products/[slug]`
- Onglets description / spécifications via query string (`ProductTabs`)

**Panier (client)**
- `CartProvider` (Context React, état en mémoire)
- `AddToCartButton`, `CartSummary` dans le header

**Admin**
- Layout sidebar sombre
- Page produits avec `ProductsTable` et `<Suspense>`

**API et démo**
- `GET /api/products`
- Pages `/demo`, `/demo/loading` pour tester loading, error et 404

**UI**
- Thème Tailwind (lavender / rose), fonts Geist + Dancing Script
- `Header`, `Footer`

---

## Atelier Jour 2

**Objectif :** comparer les stratégies de rendu, enrichir la fiche produit, consommer GraphQL, maîtriser le cache et le PPR.

**Ce qui a été fait :**

**01 Statique**
- Fiche produit avec `generateStaticParams`
- Onglets déportés dans `ProductTabsClient` (`useSearchParams`, compatible statique)
- Logs de rendu serveur pour mesurer le TTFB

**02 ISR**
- Page démo `/demo/rendering/isr/[slug]` avec `cacheLife({ revalidate: 60 })`
- Testable via Prisma Studio (modifier un prix, observer le cache)

**03 Dynamique**
- Page démo `/demo/rendering/dynamic/[slug]` avec `connection()` et streaming
- Comparateur des trois modes : `/demo/rendering`

**04 Produits similaires et panier**
- Champ `similar` en base + modèles `Cart` / `CartItem`
- `POST /api/cart`, persistance via cookie `cart_session_id`
- Suppression du Context panier : `CartSummary` en RSC, ajout via event client + `router.refresh()`
- Section produits similaires sur la fiche produit

**05 Streaming Suspense**
- Boundaries imbriquées : similaires (delay simulé), sponsorisés, statut panier
- Skeletons dédiés par section

**06 GraphQL (mockShop)**
- Client vers `graphqlstore.julienfroidefond.com/api/2024-01/graphql.json`
- Produits sponsorisés : accueil, `/sponsored`, `/sponsored/[handle]`, fiches produit
- Pas d'ajout au panier sur les produits sponsorisés

**07 Revalidation du cache**
- Stratégies `force-cache`, `no-store`, `revalidate: 3600` avec logs `[mockShop]`
- `revalidateTag` + `revalidatePath` via bouton **Actualiser**
- Page démo : `/demo/cache`

**08 Parallel Routes**
- Démo `/demo/parallel-routes/[slug]` avec slots `@similar` et `@sponsored`
- Chaque slot possède son propre `loading.tsx`

**09 Partial Prerendering**
- `cacheComponents: true` dans `next.config.ts`
- Coquille statique (`CachedProductDetails` + `"use cache"`) + trous dynamiques en Suspense
- Footer avec `"use cache"` (sans `use client`)
- Prisma via `connection()`, fetch GraphQL auto-déterminé pour le PPR

---

## Atelier Jour 3

**Objectif :** implémenter un flux complet sécurisé : auth, proxy, Server Actions, revalidation, gestion d'erreurs et test A/B sur le prefetch.

**Ce qui a été fait :**

**01 Page protégée et auth**
- Modèle Prisma `User` (email, mot de passe hashé, rôle `USER` / `ADMIN`)
- NextAuth v5 (`auth.ts`) avec provider Credentials et session JWT
- Pages `/register`, `/login` et `/account` (protégée)
- Server Actions `register`, `login`, `logout` avec `useActionState`
- Header : trigramme, déconnexion, lien Admin visible uniquement pour les admins
- Promotion admin via Prisma Studio (table `User`, champ `role`)

**02 Proxy d'auth**
- Fichier `proxy.ts` (Next.js 16, ex-middleware)
- Routes `/admin/*` : redirection vers `/` si l'utilisateur n'a pas le rôle `ADMIN`

**03 Formulaire Server Action**
- Page `/admin/products/[slug]/edit` avec formulaire de modification
- Validation Zod dans l'action `updateProduct`
- Progressive enhancement : le formulaire fonctionne sans JavaScript

**04 Cache et revalidation**
- Catalogue home mis en cache via `unstable_cache` (tag `catalog-products`)
- Invalidation via `revalidateTag` après mise à jour d'un produit

**05 Gestion des erreurs**
- Action `updateProduct` : retours `{ error }` / `{ success }`
- Bouton **Tester une erreur** pour simuler un échec
- Messages affichés dans l'UI via `useActionState`

**06 Test A/B dans le proxy**
- Tirage aléatoire 50/50, stocké dans le cookie `ab_prefetch` (variant A ou B)
- Paramètre `?ab_prefetch=A` ou `?ab_prefetch=B` pour forcer le variant

**07 Prefetch conditionnel**
- Composant client `PrefetchLink`
- Variant A : prefetch par défaut sur les liens produits
- Variant B : prefetch au survol (`router.prefetch`)
- Appliqué sur `ProductCard` et `SponsoredProductCard`
- Test en production : `npm run build && npm start` (prefetch peu visible en dev)

**Variables d'environnement (.env)**
- `DATABASE_URL` : connexion SQLite
- `AUTH_SECRET` : secret NextAuth
- `AUTH_TRUST_HOST=true` : requis pour `npm start` en local

---

## Atelier Jour 4

*À venir.*

---

## Routes principales

| Route | Description |
|-------|-------------|
| `/` | Accueil + produits sponsorisés + catalogue (cache `unstable_cache`) |
| `/products` | Liste des produits |
| `/products/[slug]` | Fiche produit (PPR, similaires, sponsorisés) |
| `/sponsored` | Catalogue sponsorisé GraphQL |
| `/login` | Connexion |
| `/register` | Inscription |
| `/account` | Espace personnel (authentifié) |
| `/admin` | Back-office (protégé par proxy) |
| `/admin/products/[slug]/edit` | Modification d'un produit |
| `/demo` | Hub des pages de démo |
| `/demo/rendering` | Comparaison statique / ISR / dynamique |
| `/demo/cache` | Stratégies de cache GraphQL |
| `/demo/parallel-routes/[slug]` | Parallel routes |
