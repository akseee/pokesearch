# React Search Dashboard

A single-page application (SPA) built with TypeScript + React + Redux Toolkit. This is not just a search bar for Pokémon — its a thoughtfully dashboard that blends developer craftsmanship, solid architecture, and a great user experience. Here is what makes it stand out:

### Features

- Search with persistent history (saved in LocalStorage)
- Pagination with current page reflected in the URL
- Master-detail view via React Router
- Save selected items and export as CSV
- Theme switching (light / dark)
- Unit tests with >80% coverage
- ErrorBoundary and error handling
- Experimental FSD-inspired structure for feature isolation

---

### Tech Stack

- **Language**: TypeScript
- **UI**: React (Function components + Hooks)
- **State Management**: Redux Toolkit
- **Router**: React Router
- **Styling**: CSS Modules
- **Testing**: Vitest + Testing Library
- **Build Tool**: Vite

---

### Installation

```bash
git clone git@github.com:akseee/pokesearch.git
cd pokesearch
npm install
```

### Development

```
npm run dev
```

### Testing

```
npm run test
npm run test:coverage
```
