# My supa store — Ateliers Next.js

Boutique Next.js 16 (App Router, Prisma, SQLite) réalisée en TD.

**Commandes utiles :**
```bash
npm run dev        # serveur de développement
npm run db:migrate # migrations Prisma
npm run db:seed    # réinitialise les produits
npx prisma studio  # interface base de données
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

*À venir.*

---

## Atelier Jour 4

*À venir.*

---

## Routes principales

| Route | Description |
|-------|-------------|
| `/` | Accueil + produits sponsorisés + catalogue |
| `/products` | Liste des produits |
| `/products/[slug]` | Fiche produit (PPR, similaires, sponsorisés) |
| `/sponsored` | Catalogue sponsorisé GraphQL |
| `/admin` | Back-office |
| `/demo` | Hub des pages de démo |
| `/demo/rendering` | Comparaison statique / ISR / dynamique |
| `/demo/cache` | Stratégies de cache GraphQL |
| `/demo/parallel-routes/[slug]` | Parallel routes |
