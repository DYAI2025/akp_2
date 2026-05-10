import { useState } from 'react';
import { AKP_DATA } from './constants';
import Cursor from './components/Cursor';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="min-h-screen bg-stone-50 cursor-none">
      <Cursor />
      <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200 p-6 flex justify-between items-center font-sans uppercase tracking-widest text-xs">
        <span>AKP Architekten</span>
        <div className="flex gap-8 flex-wrap">
          {["Büro", "Leistungen", "Projekte", "Kompetenzen", "Geschichte", "Publikationen", "Netzwerk", "Kontakt"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-stone-500 transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section className="p-12 md:p-24 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <img src="big2284.jpg" alt="Projektbild: AKP Referenz" className="w-full h-auto object-cover border border-stone-300" />
          <div>
            <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-tight">{AKP_DATA.hero.title}</h1>
            <p className="text-xl mb-12 text-stone-700">{AKP_DATA.hero.claim}</p>
            <div className="flex flex-wrap gap-6 uppercase tracking-widest text-xs border-t border-stone-300 pt-6">
              {AKP_DATA.hero.meta.map(m => <span key={m}>{m}</span>)}
            </div>
            <div className="mt-12">
               <button data-cursor="Inquire" className="px-8 py-3 border border-stone-900 uppercase text-xs tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors">
                  Generalplanung anfragen
               </button>
            </div>
          </div>
        </section>

        <section id="büro" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Büro & Haltung</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {AKP_DATA.philosophy.map((p, i) => (
              <div key={i} className="border border-stone-300 p-8">
                <h3 className="font-serif text-2xl mb-4">{p.title}</h3>
                <p className="text-stone-600 font-sans">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="leistungen" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Leistungen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {AKP_DATA.leistungen.map((l, i) => (
               <div key={i} className="border border-stone-300 p-6 text-sm font-sans">
                 {i + 1 < 10 ? `0${i+1}` : i+1}. {l}
               </div>
             ))}
          </div>
        </section>

        <section id="projekte" className="p-12 md:p-24 border-t border-stone-300">
             <h2 className="font-serif text-4xl mb-12">Projekte</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {AKP_DATA.projects.map((p, i) => (
                  <div key={i} data-cursor="Project" onClick={() => setSelectedProject(p)} className="border border-stone-300 p-8 hover:bg-stone-100 transition-colors cursor-none">
                    <p className="uppercase text-xs tracking-widest mb-2 text-stone-500">{p.cat}</p>
                    <h3 className="font-serif text-3xl mb-2">{p.title}</h3>
                    <p className="font-sans text-sm text-stone-600">{p.location}</p>
                  </div>
                ))}
              </div>
        </section>

        <section id="kompetenzen" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Kompetenzen</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {AKP_DATA.kompetenzen.map((k, i) => (
              <div key={i} className="border border-stone-300 p-8">
                <h3 className="font-serif text-2xl mb-4">{k.title}</h3>
                <p className="text-stone-600 font-sans">{k.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="geschichte" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Geschichte</h2>
          <p className="text-stone-600 font-sans">Inhalt folgt...</p>
        </section>

        <section id="publikationen" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Publikationen</h2>
          <p className="text-stone-600 font-sans">Inhalt folgt...</p>
        </section>

        <section id="netzwerk" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Netzwerk</h2>
          <p className="text-stone-600 font-sans">Inhalt folgt...</p>
        </section>

        <section id="kontakt" className="p-12 md:p-24 border-t border-stone-300">
          <h2 className="font-serif text-4xl mb-12">Kontakt</h2>
          <p className="text-stone-600 font-sans">Inhalt folgt...</p>
        </section>
      </main>
      
      <footer className="p-12 border-t border-stone-300 text-xs text-stone-500">
        &copy; 2026 AKP Architekten Kauschke + Partner.
      </footer>
    </div>
  );
}

