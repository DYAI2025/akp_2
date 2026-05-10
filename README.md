# AKP Architekten Portfolio

Eine Vite/React-One-Page-Site für AKP Architekten Kauschke + Partner. Das Projekt ist für lokale Entwicklung, CI-Prüfungen und Railway-Deployment vorbereitet.

## Voraussetzungen

- Node.js 22 (siehe CI-Konfiguration)
- npm

## Lokale Entwicklung

```bash
npm ci
npm run dev
```

Die lokale Vite-Entwicklung läuft standardmäßig auf `http://localhost:3000` und bindet an `0.0.0.0`, damit Container-Umgebungen die Vorschau erreichen können.

## Produktionsbuild und Railway-Start

```bash
npm run build
npm run start
```

Der Express-Server liefert den Inhalt aus `dist/`, nutzt `process.env.PORT`, bindet an `0.0.0.0` und stellt `/healthz` als Healthcheck bereit. Deep Links fallen auf die SPA-HTML-Shell zurück; HTML und Healthcheck werden bewusst nicht gecacht, während gebaute Assets langfristig immutable gecacht werden.

## Qualitätssicherung

```bash
npm run lint
npm test
npm run test:frontend
npm run build
npm run test:smoke
```

Oder gebündelt:

```bash
npm run ci
```

Die CI führt Typechecking, Content-/Deployment-Prüfungen, Frontend-Darstellungsprüfungen, Produktionsbuild und einen Smoke-Test des Railway-Servers aus.
