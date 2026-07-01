# Notions clés : Ateliers Jour 3 et Jour 4

Petit aide-mémoire pour comprendre ce qui a été mis en place et pourquoi.

---

# Jour 3

## Server Actions

Fonctions serveur appelées directement depuis un formulaire (`action={maAction}`).

**Pourquoi :** la logique métier reste côté serveur, proche de la base. Le formulaire fonctionne même sans JavaScript.

**Dans le projet :** `register`, `login`, `updateProduct` dans `app/actions/`.

**Avec `useActionState` :** l'action renvoie un état (`error`, `success`) que le composant client affiche sans recharger toute la page.


## Validation Zod

Bibliothèque qui décrit la forme attendue des données et vérifie qu'elles sont valides.

**Pourquoi :** on ne fait jamais confiance au navigateur. Email, prix, stock : tout est revérifié côté serveur avant écriture en base.

**Dans le projet :** `updateProductSchema` et `registerSchema` dans les actions.

**Pattern :** `safeParse(formData)` → si invalide, retourner `{ error: "..." }`.


## NextAuth (Auth.js)

Gère l'authentification : connexion, session, déconnexion.

**Dans le projet :** `auth.ts` + route `/api/auth/[...nextauth]`.

**Session JWT :** les infos utilisateur (id, rôle, trigramme) sont stockées dans un token signé, lu via `auth()` dans les Server Components et actions.

**Credentials :** email + mot de passe vérifiés contre Prisma (`bcrypt` pour comparer le hash).


## Page protégée

Une page accessible uniquement si une session existe.

**Dans le projet :** `/account` appelle `auth()` et redirige vers `/login` si absent.

**Masquer un lien ≠ protéger une route :** le menu peut cacher Admin, mais l'URL reste accessible tant qu'il n'y a pas de garde serveur ou de proxy.


## Proxy (`proxy.ts`)

Fichier exécuté **avant** le rendu de la page (Next.js 16, remplace l'ancien `middleware.ts`).

**Rôle ici :**
1. **Auth admin :** `/admin/*` → redirection `/` si pas rôle `ADMIN`
2. **A/B test :** tirage ou forçage du cookie `ab_prefetch`

**Limite :** le proxy fait des vérifications légères (cookie, JWT). La vraie sécurité des actions reste dans les Server Actions (`auth()` + contrôle du rôle).


## Rôles utilisateur

Champ `role` en base : `USER` ou `ADMIN`.

**USER :** accès au site, compte, pas d'admin.

**ADMIN :** lien Admin visible + accès `/admin/*` (proxy + actions).

**Changement de rôle :** Prisma Studio → table `User` → se déconnecter / reconnecter pour rafraîchir la session.


## Cache : `unstable_cache` et `revalidateTag`

**`unstable_cache` :** met en cache le résultat d'une fonction (ex. liste produits home) avec un **tag** (`catalog-products`).

**`revalidateTag` :** invalide ce cache après une mutation (ex. édition produit).

**Pourquoi :** la home est rapide (données en cache) mais reste à jour après modification admin.

**Différence avec `"use cache"` (Jour 2) :** ici on tague explicitement pour pouvoir invalider à la demande.


## Gestion d'erreurs dans les actions

Les actions ne lancent pas forcément une exception visible par l'utilisateur.

**Pattern :** retourner `{ error: "message" }` ou `{ success: "message" }`.

**UI :** `useActionState` reçoit cet état et affiche le bandeau dans le formulaire.

**Bouton test :** simule un échec sans toucher à la base, pour valider l'UX.


## Test A/B (prefetch)

Deux comportements pour le chargement anticipé des liens produits :

| Variant | Comportement |
|---------|--------------|
| **A** | Prefetch automatique (défaut Next.js) |
| **B** | Pas de prefetch auto, déclenché au **survol** |

**Cookie :** `ab_prefetch` = `A` ou `B`, posé par `proxy.ts`.

**Forçage test :** `?ab_prefetch=A` ou `?ab_prefetch=B` dans l'URL.

**Où observer :** DevTools → Application (cookie) et Network (requêtes prefetch).


## `PrefetchLink`

Composant **client** qui enveloppe `<Link>`.

**Pourquoi client :** `router.prefetch()` et `onMouseEnter` nécessitent le navigateur.

**Pourquoi séparé :** `ProductCard` reste un Server Component (lit le cookie côté serveur, passe les props à `PrefetchLink`).


## Dev vs production

| | `npm run dev` | `npm run build` + `npm start` |
|---|---|---|
| Usage | Coder, déboguer | Tester comme en prod |
| Prefetch A/B | Peu fiable | Comportement réel |
| Auth local | Fonctionne | Nécessite `AUTH_TRUST_HOST=true` |

**Règle pratique :** auth, formulaires, admin → dev suffit. Prefetch et cache fin → build + start.


## Fichiers à connaître

| Fichier | Rôle |
|---------|------|
| `auth.ts` | Config NextAuth |
| `proxy.ts` | Garde admin + cookie A/B |
| `app/actions/auth.ts` | Inscription, connexion |
| `app/actions/products.ts` | Update produit + Zod + revalidation |
| `lib/cache/products.ts` | Cache catalogue home |
| `components/layout/PrefetchLink.tsx` | Prefetch conditionnel |
| `components/layout/AuthNav.tsx` | Trigramme, admin, déconnexion |

---

# Jour 4

## Web Vitals

Métriques de performance perçue par l'utilisateur : LCP (chargement), INP (réactivité), CLS (stabilité visuelle).

**Dans le projet :** `WebVitalsReporter` utilise `useReportWebVitals` et logue chaque métrique en console.

**Analyse :** comparer les valeurs et le `rating` (`good`, `needs-improvement`, `poor`). En e-commerce, **LCP** est souvent la plus visible (hero, images, JS).

**Où observer :** console navigateur + onglet Performance des DevTools.


## SEO et `generateMetadata`

Next.js génère `<title>` et balises `<meta>` côté serveur, par page.

**Statique :** métadonnées dans `layout.tsx` (défaut + template `%s · My supa store`).

**Dynamique :** `generateMetadata` sur `/products/[slug]` avec title, description, keywords, robots, openGraph.

**`metadataBase` :** URL absolue requise pour les images Open Graph.

**Vérification :** DevTools → Elements → `<head>`.


## Variables d'environnement

| Préfixe | Où ça tourne | Exemple |
|---------|--------------|---------|
| `NEXT_PUBLIC_*` | Client + serveur (inliné au build) | `NEXT_PUBLIC_SITE_NAME` |
| Sans préfixe | Serveur uniquement | `STORE_REGION`, `AUTH_SECRET` |

**Règle :** ne jamais exposer un secret via `NEXT_PUBLIC_`.

**Dans le projet :** `SiteNameBanner` (client) vs route `/api/server-env` (serveur).

**Page démo :** `/demo/env`.


## Analyse des bundles

Le bundle client = JavaScript envoyé au navigateur. Plus il est lourd, plus LCP et INP peuvent souffrir.

**Commande :** `npm run analyze` (`next experimental-analyze`).

**Pistes d'optimisation :** lazy loading, imports nommés (tree shaking), réduire les composants `"use client"`, éviter de charger des librairies lourdes côté client.

**Synthèse projet :** `docs/analyse-bundles.md`.


## PWA (Progressive Web App)

Rend l'app installable et utilisable hors ligne partiellement.

**`manifest.json` :** nom, icônes, couleurs, mode standalone. Référencé dans les métadonnées du layout.

**Service worker (`sw.js`) :** script interceptant les requêtes réseau. Ici : **network-first** (réseau d'abord, cache en fallback).

**Enregistrement :** composant client `ServiceWorkerRegister` appelle `navigator.serviceWorker.register('/sw.js')`.

**Test :** `npm run build && npm start` (instable en dev à cause du HMR).

**Vérification :** DevTools → Application → Service Workers / Cache Storage.


## Debug front et back

**Front :** `debugger;` dans un composant client pause l'exécution si DevTools ouverts (`/demo/debug`).

**Back :** `NODE_OPTIONS='--inspect' npm run dev` puis `chrome://inspect` pour inspecter Node.js (variables, pile d'appels).

**Usage :** comprendre un flux, pas laisser `debugger` en production.


## Internationalisation (i18n)

Traduction du site sans changer l'URL : la langue est stockée dans un **cookie** (`NEXT_LOCALE`).

**Architecture :**
- Dictionnaires JSON (`lib/i18n/locales/fr.json`, `en.json`)
- Helper serveur `t("nav.home")` lit le cookie et retourne la traduction
- `LanguageSwitcher` (client) met à jour le cookie + `router.refresh()`
- **i18next** initialisé côté client pour le switcher

**Bonus proxy :** si pas de cookie, déduction via header `Accept-Language`.

**Limite :** le contenu produit (Prisma) reste en français : seule l'UI (nav, footer) est traduite.


## Tests

**Vitest + RTL (unitaires) :** fonctions pures (`isInStock`, `formatPrice`) et composants isolés (`LanguageSwitcher`). Rapides, sans navigateur.

**Playwright (E2E) :** simule un vrai utilisateur (liste produits, navigation, switch langue). Plus lent, plus proche de la prod.

**Commandes :** `npm test`, `npm run test:e2e`.

**Emplacement :** `*.test.ts` à côté du code, scénarios dans `e2e/`.


## Fichiers Jour 4

| Fichier | Rôle |
|---------|------|
| `components/observability/WebVitalsReporter.tsx` | Logs Web Vitals |
| `components/env/SiteNameBanner.tsx` | Variable publique client |
| `app/api/server-env/route.ts` | Variable serveur exposée via API |
| `public/manifest.json` | Config PWA |
| `public/sw.js` | Service worker network-first |
| `components/pwa/ServiceWorkerRegister.tsx` | Enregistrement SW |
| `lib/i18n/` | Dictionnaires + helpers traduction |
| `components/i18n/LanguageSwitcher.tsx` | Switch fr/en |
| `docs/analyse-bundles.md` | Synthèse analyse bundles |
| `vitest.config.ts` / `playwright.config.ts` | Config tests |
