# 🦢 Goose Game Frontend

A modern browser game where players compete to tap a virtual goose as fast as possible!  
This is the frontend for the tech task ["The Last of Guss"](https://github.com/round-squares/tech-task-for-interview/wiki#%D0%BC%D0%BE%D0%BA%D0%B0%D0%BF%D1%8B).

---

## 🚀 Tech Stack

- **React 19** + **TypeScript** — UI and logic
- **Vite** — Lightning-fast build tool
- **Redux Toolkit** — State management
- **Redux-Saga** — Side effects and async flows
- **Material-UI (MUI)** — Beautiful, accessible UI components
- **Axios** — HTTP client for API requests
- **React Router DOM** — Routing and protected routes
- **JS-Cookie** — Cookie utilities for session persistence

---

## 🎮 Game Description

Players compete in rounds to tap the goose and score points.  
- Each round has a start and end time, with a configurable cooldown before it begins.
- **1 tap = 1 point**, every 11th tap gives **10 points**.
- Only active rounds accept taps.
- Special rules for users named "Nikita" (their taps don't count) and "admin" (can create rounds).

See the [original task and mockups (RU)](https://github.com/round-squares/tech-task-for-interview/wiki#%D0%BC%D0%BE%D0%BA%D0%B0%D0%BF%D1%8B) for more details.

---

## ✨ Features

- **Authentication**: Login, session persistence via cookies, role-based access (admin/survivor/nikita)
- **Rounds List**: View all rounds, their status (active, cooldown, finished), and details
- **Admin Controls**: Admins can create new rounds
- **Game Round UI**: Tap the goose, see your score update in real time, live countdowns
- **Round Details**: View winner, total points, and your own score after each round
- **Responsive & Beautiful**: Built with Material-UI, mobile-friendly, and visually appealing
- **Robust State Management**: Redux Toolkit + Saga for scalable, maintainable logic
- **API Integration**: All data fetched from a REST API backend (see `src/config/api.ts`)

---

## 🌐 Live Demo

> **Try it now:** [goose-fe.vercel.app](https://goose-fe.vercel.app/)

### Test Users
- **Admin:** `admin` / `admin`
- **Nikita:** `nikita` / `nikita`
- **Any other user:** `other` / `other`

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### 3. Build for production

```bash
npm run build
```

### 4. Lint the code

```bash
npm run lint
```

---

## 📁 Project Structure

```
src/
  components/      # React components (RoundsList, LoginForm, RoundDetails, etc.)
  config/          # API config and endpoints
  store/           # Redux store, slices, sagas, hooks
  utils/           # Utility functions (date formatting, cookies, etc.)
  assets/          # Static assets (images, etc.)
  App.tsx          # Main app component
  main.tsx         # Entry point
```

---

## 🔗 Useful Links

- [Task & Mockups (RU)](https://github.com/round-squares/tech-task-for-interview/wiki#%D0%BC%D0%BE%D0%BA%D0%B0%D0%BF%D1%8B)
- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux-Saga](https://redux-saga.js.org/)
- [Vite](https://vitejs.dev/)

---

_Made with ❤️ for the Goose Game tech task_
