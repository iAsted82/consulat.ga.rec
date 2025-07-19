# Consulat.ga - Plateforme Diplomatique Gabonaise

## 🌍 Vue d'ensemble

Consulat.ga est une plateforme moderne de digitalisation et de gestion centralisée des services consulaires gabonais dans le monde. Cette application permet aux ressortissants gabonais d'accéder facilement à tous les services consulaires, de gérer leurs documents et de prendre des rendez-vous depuis n'importe où dans le monde.

## 🎨 Charte Graphique

La plateforme respecte une charte graphique stricte inspirée des couleurs nationales gabonaises :

- **Couleur primaire** : Bleu (#0d40af) - Actions principales et éléments de navigation
- **Couleur secondaire** : Bleu foncé (#3b4b6b) - Éléments secondaires
- **Couleur accent** : Or (#ffd733) - Highlights et éléments spéciaux
- **Typographie** : Geist Sans avec fallback system-ui

## 🔧 Stack Technique

- **Frontend** : Next.js 15 (App Router), React 18, TypeScript
- **Styling** : Tailwind CSS, Shadcn/UI personnalisé
- **Authentication** : NextAuth.js
- **State Management** : React Query (TanStack), Zustand
- **Forms** : React Hook Form, Zod validation
- **Icons** : Lucide React

## 👥 Système de Rôles

L'application gère 5 types d'utilisateurs avec des accès différenciés :

1. **SUPER_ADMIN** - Gestion globale de l'écosystème
2. **ADMIN** - Gestion d'un consulat spécifique
3. **COLLABORATEUR** - Traitement des demandes, validation niveau 1
4. **AGENT** - Saisie et traitement opérationnel
5. **USER** - Ressortissants gabonais

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
npm install
npm run dev
```

### Comptes de test (Mode développement)
- **Super Admin** : `superadmin@consulat.ga` / `SuperAdmin2024!`
- **Admin** : `consul.general@consulat.ga` / `ConsulGen2024!`
- **Collaborateur** : `vice.consul@consulat.ga` / `ViceConsul2024!`
- **Agent** : `agent@consulat.ga` / `Agent2024!`
- **User** : `user@consulat.ga` / `User2024!`

## 📱 Fonctionnalités Principales

### Pour les Ressortissants (USER)
- Dashboard avec actions rapides codées par couleur
- Gestion des documents personnels
- Prise de rendez-vous en ligne
- Suivi des demandes en temps réel
- Notifications automatiques

### Pour les Agents Consulaires
- Interface de traitement des demandes
- Gestion des rendez-vous
- Validation des documents
- Reporting et statistiques

### Pour les Administrateurs
- Gestion complète des organisations
- Supervision du personnel
- Analytics et rapports globaux
- Configuration système

### Pour les Super Administrateurs
- **Gestion des utilisateurs** : CRUD complet, suspension/activation, gestion des rôles
- **Analytics avancées** : Tableaux de bord, métriques de performance, graphiques interactifs
- **Paramètres système** : Configuration globale, sécurité, email, sauvegardes
- **Journal d'audit** : Traçabilité complète des actions, monitoring sécuritaire
- **Gestion des organisations** : Vue globale, création, modification des structures diplomatiques
- **Outils de maintenance** : Cache, optimisation BDD, gestion des clés de sécurité

## 🎯 Design System

### Composants Principaux
- **Cards** : Arrondis 12px, ombres prononcées, effets hover
- **Boutons** : Hauteur minimale 44px, animations 200ms
- **Actions rapides** : Code couleur (🔵 Bleu, 🟢 Vert, 🟡 Jaune, 🟣 Violet)
- **Navigation** : Sidebar responsive avec collapse

### Animations
- Toutes les transitions : 200ms ease-in-out
- Hover effects : scale(1.02) et translate-y
- Focus states : ring-2 avec couleur primaire

## 📊 Architecture

```
src/
├── app/                    # Pages Next.js App Router
│   ├── (auth)/            # Pages d'authentification
│   ├── (authenticated)/   # Pages protégées
│   │   └── admin/         # Interface super admin
│   │       ├── users/     # Gestion des utilisateurs
│   │       ├── analytics/ # Tableaux de bord
│   │       ├── settings/  # Configuration système
│   │       └── audit/     # Journal d'audit
│   └── (public)/          # Pages publiques
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── admin/            # Composants admin spécialisés
│   ├── dashboard/        # Dashboards par rôle
│   ├── layout/           # Composants de layout
│   └── sections/         # Sections de pages
├── middleware/           # Middleware de sécurité admin
├── types/               # Définitions TypeScript
├── lib/                  # Utilitaires et configuration
└── api/                 # Points d'accès API
    └── admin/           # API endpoints admin
```

## 🔐 Sécurité

- Authentification basée sur JWT
- Middleware de protection des routes
- Validation des données avec Zod
- Gestion des rôles et permissions
- Variables d'environnement sécurisées
- **Super Admin** : Protection renforcée, audit trail, rate limiting
- **Journalisation** : Traçabilité complète des actions administratives
- **Validation stricte** : Contrôles d'accès multi-niveaux
- **Sécurité réseau** : Headers de sécurité, protection CSRF

## 📱 Responsive Design

- **Mobile First** : Conception adaptée aux écrans mobiles
- **Touch Targets** : Minimum 44px pour tous les éléments interactifs
- **Breakpoints** : sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation** : Sidebar collapsible sur mobile

## 🌐 Internationalisation

- Support multi-langues (Français par défaut)
- Formatage des dates et nombres
- Adaptation RTL prête

## 🔧 Variables d'Environnement

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://localhost:3000
DATABASE_URL=postgresql://...
```

## 🚀 Déploiement

La plateforme est optimisée pour le déploiement sur :
- Vercel (recommandé)
- Netlify
- AWS Amplify

## 📄 Licence

© 2024 République Gabonaise - Tous droits réservés

## 🤝 Contribution

Cette plateforme est développée dans le cadre de la modernisation des services consulaires gabonais. Pour toute question ou suggestion, contactez l'équipe de développement.

---

**Consulat.ga** - Modernisons ensemble les services consulaires gabonais 🇬🇦