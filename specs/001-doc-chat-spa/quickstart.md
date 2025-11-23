# quickstart.md — Document Chat SPA (prototype)

Prerequisites
- Node 18+ (recommended)
- npm (or yarn)

Install & run (PowerShell)

```powershell
# from repo root
cd frontend
npm install
# start the dev server
npx ng serve --open
```

Notes
- The frontend is an Angular 20 app using Angular Material. If the `frontend` project is not yet scaffolded, run:

```powershell
# scaffold a new angular app under `frontend` (interactive)
npx @angular/cli@20 new frontend --defaults --routing --style=scss
cd frontend
npm install @angular/material @ngrx/signals parquetjs-lite
```

- For prototype demos, sample `.parquet` files are encouraged. If browser parsing fails due to polyfills, the app will fall back to a mocked preview.
