import {useState} from 'react';
import {AKP_DATA, NAV_ITEMS} from './constants';
import Cursor from './components/Cursor';
import ProjectDetail from './components/ProjectDetail';
import type {Project} from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-stone-50">
      <Cursor />
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />

      <nav className="sticky top-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200 p-4 md:p-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center font-sans uppercase tracking-widest text-xs">
        <a href="#top" className="font-medium hover:text-stone-500 transition-colors">AKP Architekten</a>
        <div className="flex gap-4 md:gap-8 flex-wrap">
          {NAV_ITEMS.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="hover:text-stone-500 transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main id="top">
        <section className="p-8 md:p-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div
            className="relative min-h-[24rem] overflow-hidden border border-stone-300 bg-stone-200"
            role="img"
            aria-label="Abstrakte architektonische Fassadenstudie als AKP Referenzmotiv"
          >
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(68,64,60,0.08)_0,rgba(68,64,60,0.08)_1px,transparent_1px,transparent_42px),linear-gradient(90deg,rgba(41,37,36,0.16),transparent_38%),linear-gradient(180deg,#fafaf9,#d6d3d1)]" />
            <div className="absolute bottom-0 left-1/4 h-4/5 w-1/2 border-x border-t border-stone-500/50 bg-stone-50/40" />
            <div className="absolute bottom-0 left-1/3 grid h-2/3 w-1/3 grid-cols-3 grid-rows-5 gap-3 p-6">
              {Array.from({length: 15}).map((_, index) => (
                <span key={index} className="border border-stone-500/40 bg-stone-100/60" />
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
              <a data-cursor="Kontakt" href="#kontakt" className="inline-flex px-8 py-3 border border-stone-900 uppercase text-xs tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors">
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
            {AKP_DATA.leistungen.map((leistung, index) => (
              <div key={leistung} className="border border-stone-300 p-6 text-sm font-sans">
                {String(index + 1).padStart(2, '0')}. {leistung}
              </div>
            ))}
          </div>
        </section>

        <section id="projekte" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-12">Projekte</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {AKP_DATA.projects.map((project) => (
              <button
                key={project.title}
                type="button"
                data-cursor="Projekt"
                onClick={() => setSelectedProject(project)}
                className="border border-stone-300 p-8 text-left hover:bg-stone-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900 transition-colors"
                aria-label={`Projekt ${project.title} in ${project.location} öffnen`}
              >
                <p className="uppercase text-xs tracking-widest mb-2 text-stone-500">{project.cat}</p>
                <h3 className="font-serif text-3xl mb-2">{project.title}</h3>
                <p className="font-sans text-sm text-stone-600">{project.location}</p>
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
          <h2 className="font-serif text-4xl mb-6">Geschichte</h2>
          <p className="max-w-3xl text-stone-600 font-sans">{AKP_DATA.history}</p>
        </section>

        <section id="publikationen" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-6">Publikationen</h2>
          <p className="max-w-3xl text-stone-600 font-sans">{AKP_DATA.publications}</p>
        </section>

        <section id="netzwerk" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-6">Netzwerk</h2>
          <p className="max-w-3xl text-stone-600 font-sans">{AKP_DATA.network}</p>
        </section>

        <section id="kontakt" className="p-8 md:p-24 border-t border-stone-300 scroll-mt-28">
          <h2 className="font-serif text-4xl mb-6">Kontakt</h2>
          <p className="max-w-3xl text-stone-600 font-sans mb-6">{AKP_DATA.contact.text}</p>
          <a className="inline-flex border border-stone-900 px-6 py-3 uppercase tracking-widest text-xs hover:bg-stone-900 hover:text-stone-50 transition-colors" href={`mailto:${AKP_DATA.contact.email}`}>
            {AKP_DATA.contact.email}
          </a>
        </section>
      </main>

      <footer className="p-8 md:p-12 border-t border-stone-300 text-xs text-stone-500">
        &copy; 2026 AKP Architekten Kauschke + Partner.
      </footer>
    </div>
  );
}
