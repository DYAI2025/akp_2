import {AKP_DATA} from './constants';
import Cursor from './components/Cursor';
import ProjectDetail from './components/ProjectDetail';
import {useState} from 'react';
import type {Project} from './types';

const navigationItems = [
  {label: 'Büro', id: 'buero'},
  {label: 'Leistungen', id: 'leistungen'},
  {label: 'Projekte', id: 'projekte'},
  {label: 'Kompetenzen', id: 'kompetenzen'},
  {label: 'Geschichte', id: 'geschichte'},
  {label: 'Publikationen', id: 'publikationen'},
  {label: 'Netzwerk', id: 'netzwerk'},
  {label: 'Kontakt', id: 'kontakt'},
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 cursor-auto md:cursor-none">
      <Cursor />
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />

      <nav aria-label="Hauptnavigation" className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 p-4 md:p-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center font-sans uppercase tracking-widest text-xs">
        <a href="#top" className="font-medium hover:text-stone-500 transition-colors">AKP Architekten</a>
        <div className="flex gap-x-6 gap-y-3 flex-wrap">
          {navigationItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="hover:text-stone-500 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-4">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main id="top">
        <section className="p-8 md:p-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="relative min-h-[22rem] overflow-hidden border border-stone-300 bg-stone-200" aria-label="Abstrakte Architekturvisualisierung">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#e7e5e4_0%,#fafaf9_38%,#a8a29e_100%)]" />
            <div className="absolute left-8 top-8 h-4/5 w-1/3 border-l border-t border-stone-500/70" />
            <div className="absolute right-10 bottom-10 grid grid-cols-4 gap-3">
              {Array.from({length: 16}).map((_, index) => (
                <span key={index} className="block h-10 w-10 border border-stone-500/50 bg-stone-50/25" />
              ))}
            </div>
          </div>
          <div>
            <h1 className="font-serif text-5xl md:text-8xl mb-8 leading-tight">{AKP_DATA.hero.title}</h1>
            <p className="text-xl mb-6 text-stone-700">{AKP_DATA.hero.claim}</p>
            <p className="mb-12 text-stone-600">{AKP_DATA.hero.description}</p>
            <div className="flex flex-wrap gap-6 uppercase tracking-widest text-xs border-t border-stone-300 pt-6">
              {AKP_DATA.hero.meta.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="mt-12">
              <a href="mailto:kontakt@akp-architekten.de?subject=Anfrage%20Generalplanung" data-cursor="Anfragen" className="inline-flex px-8 py-3 border border-stone-900 uppercase text-xs tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-4">
                Generalplanung anfragen
              </a>
            </div>
          </div>
        </section>

        <section id="buero" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Büro & Haltung</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {AKP_DATA.philosophy.map((item) => (
              <article key={item.title} className="border border-stone-300 p-8">
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-stone-600 font-sans">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="leistungen" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Leistungen</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {AKP_DATA.leistungen.map((item, index) => (
              <div key={item} className="border border-stone-300 p-6 text-sm font-sans">
                {String(index + 1).padStart(2, '0')}. {item}
              </div>
            ))}
          </div>
        </section>

        <section id="projekte" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Projekte</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {AKP_DATA.projects.map((project) => (
              <button key={project.title} type="button" data-cursor="Projekt" onClick={() => setSelectedProject(project)} className="border border-stone-300 p-8 text-left hover:bg-stone-100 transition-colors cursor-auto md:cursor-none focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-4">
                <span className="block uppercase text-xs tracking-widest mb-2 text-stone-500">{project.cat}</span>
                <span className="block font-serif text-3xl mb-2">{project.title}</span>
                <span className="block font-sans text-sm text-stone-600">{project.location}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="kompetenzen" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Kompetenzen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {AKP_DATA.kompetenzen.map((item) => (
              <article key={item.title} className="border border-stone-300 p-8">
                <h3 className="font-serif text-2xl mb-4">{item.title}</h3>
                <p className="text-stone-600 font-sans">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="geschichte" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Geschichte</h2>
          <p className="max-w-3xl text-stone-600 font-sans">Seit 1991 steht AKP für kontinuierliche Planungspraxis, persönliche Bauherrenbetreuung und die Verbindung von Entwurf, Genehmigung und Realisierung.</p>
        </section>

        <section id="publikationen" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Publikationen</h2>
          <p className="max-w-3xl text-stone-600 font-sans">Projektberichte, Wettbewerbsbeiträge und redaktionelle Veröffentlichungen werden als kuratierte Referenzen für Bauherren, Partner und Presse aufbereitet.</p>
        </section>

        <section id="netzwerk" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Netzwerk</h2>
          <p className="max-w-3xl text-stone-600 font-sans">Ein belastbares Netzwerk aus Fachplanern, Gutachtern und ausführenden Unternehmen ermöglicht koordinierte Planung über komplexe Projektphasen hinweg.</p>
        </section>

        <section id="kontakt" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Kontakt</h2>
          <p className="text-stone-600 font-sans">Für Projektanfragen erreichen Sie AKP Architekten Kauschke + Partner per E-Mail.</p>
          <a href="mailto:kontakt@akp-architekten.de" className="mt-6 inline-flex border-b border-stone-900 pb-1 text-sm uppercase tracking-widest hover:text-stone-500">kontakt@akp-architekten.de</a>
        </section>
      </main>

      <footer className="p-8 md:p-12 border-t border-stone-300 text-xs text-stone-500">
        &copy; 2026 AKP Architekten Kauschke + Partner.
      </footer>
    </div>
  );
}
