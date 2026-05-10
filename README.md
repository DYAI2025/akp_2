# AKP Architekten Kauschke + Partner

Deployfähige Vite/React-Single-Page-App für AKP Architekten. Die Anwendung ist als statische Frontend-App mit produktionsfähigem Preview-Server für Railway vorbereitet.

## Lokale Entwicklung

**Voraussetzungen:** Node.js 22 oder neuer.

```bash
npm ci
npm run dev
```

Der Dev-Server läuft standardmäßig auf `http://localhost:3000` und bindet an `0.0.0.0`, damit Container- und Railway-Umgebungen ihn erreichen können.

## Qualitätssicherung

```bash
npm run lint          # TypeScript-Typecheck
npm run test          # Typecheck + Content-/A11y-Smoke-Test + Railway-Konfigurationscheck
npm run build         # Produktionsbundle erstellen
npm run smoke:preview # Gebautes Bundle über den Start-Befehl ausliefern und Assets prüfen
npm run ci            # Vollständige lokale CI-Kette
```

## Railway-Deployment

Das Repository enthält eine `railway.json` für Nixpacks:

- Build: `npm ci && npm run build`
- Start: `npm run start`
- Healthcheck: `/`

Railway setzt im Deployment die Umgebungsvariable `PORT`. Das Start-Script bindet Vite Preview an `0.0.0.0` und verwendet `${PORT:-4173}`, sodass die App lokal und auf Railway sauber startet.

## Projektstruktur

```text
src/
  App.tsx                    Hauptseite und Sections
  constants.ts               Navigations-, Inhalts- und Projektdaten
  types.ts                   Geteilte TypeScript-Typen
  components/
    Cursor.tsx               Desktop-only Custom Cursor
    ProjectDetail.tsx        Zugänglicher Projekt-Dialog
scripts/
  test-content.tsx           SSR-basierte Frontend-/A11y-Smoke-Tests
  test-railway-config.ts     Deployment-Konfigurationscheck
  smoke-preview.mjs          Produktionsserver-Smoke-Test
.github/workflows/ci.yml     CI-Pipeline für saubere Deployments
railway.json                 Railway-Konfiguration
```
