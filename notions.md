# Notions clés : Atelier Jour 3

Petit aide-mémoire pour comprendre ce qui a été mis en place et pourquoi.


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
