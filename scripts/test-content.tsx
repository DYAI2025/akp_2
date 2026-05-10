import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import App from '../src/App';
import ProjectDetail from '../src/components/ProjectDetail';
import {AKP_DATA, NAV_ITEMS} from '../src/constants';

const appMarkup = renderToStaticMarkup(<App />);

assert.match(appMarkup, /AKP Architekten Kauschke \+ Partner/, 'Die AKP-Marke muss im initialen Render sichtbar sein.');
assert.equal(NAV_ITEMS.every((item) => appMarkup.includes(`href="#${item.id}"`)), true, 'Alle Navigationspunkte müssen stabile Section-Anker haben.');
assert.equal(appMarkup.includes('TODO:'), false, 'Frontend darf keine TODO-Platzhalter ausgeben.');
assert.equal(appMarkup.includes('Inhalt folgt'), false, 'Frontend darf keine unfertigen Platzhalter ausgeben.');
assert.equal(appMarkup.includes('src="big2284.jpg"'), false, 'Frontend darf kein fehlendes Hero-Bild referenzieren.');
assert.match(appMarkup, /role="img"/, 'Das Hero-Motiv braucht eine zugängliche Bildrolle.');
assert.match(appMarkup, /aria-label="Projekt Pestalozzistraße 45–46 in Berlin-Charlottenburg öffnen"/, 'Projektkarten müssen per Screenreader verständlich sein.');
assert.match(appMarkup, /href="mailto:kontakt@akp-architekten.de"/, 'Kontaktbereich muss eine direkte Anfrage ermöglichen.');

const detailMarkup = renderToStaticMarkup(
  <ProjectDetail project={AKP_DATA.projects[0]} onClose={() => undefined} />,
);

assert.match(detailMarkup, /role="dialog"/, 'Projektdetails müssen als Dialog ausgezeichnet sein.');
assert.match(detailMarkup, /aria-modal="true"/, 'Projektdetails müssen modal ausgezeichnet sein.');
assert.match(detailMarkup, /Projektdetails schließen/, 'Der Modal-Dialog braucht einen zugänglichen Schließen-Button.');
for (const label of ['Kontext', 'Aufgabe', 'Lösung', 'Material\/Konstrukt', 'Ökologie\/Energie', 'Wirtschaftlichkeit', 'Besonderheiten']) {
  assert.match(detailMarkup, new RegExp(label), `Projekt-Detailfeld ${label} fehlt.`);
}

console.log('Content- und Accessibility-Smoke-Tests erfolgreich.');
