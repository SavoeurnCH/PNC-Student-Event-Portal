# PNC Student Event Portal

A sample React + Vite frontend application for demonstrating **Modern Deployment**.

## Requirements

- Node.js 18+ recommended
- npm

## Run the project locally

```bash
npm install
npm run dev
```

Open the URL displayed by Vite, normally:

```text
http://localhost:5173
```

## Create a production build

```bash
npm run build
```

Vite creates:

```text
dist/
```

The `dist/` directory contains the production-ready static files.

## Deployment concept

```text
Source Code
    ↓
npm install
    ↓
npm run build
    ↓
dist/
    ↓
Apache Web Server
    ↓
events.pnc.local
```

## Apache deployment example

After building the application, copy the contents of `dist/` to the web server directory:

```text
/var/www/pnc-events/
```

This project is intentionally frontend-only. The event data is stored locally in:

```text
src/data/events.js
```

## Suggested learning activities

1. Explore the project structure.
2. Run the application in development mode.
3. Change event information.
4. Run `npm run build`.
5. Compare source files with the generated `dist/` files.
6. Deploy the production files to Apache.
7. Access the application from another computer in the local network.
