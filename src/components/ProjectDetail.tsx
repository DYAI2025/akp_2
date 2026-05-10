import {useEffect} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {X} from 'lucide-react';
import type {Project} from '../types';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const DETAIL_FIELDS: Array<{key: keyof Project; label: string}> = [
  {key: 'context', label: 'Kontext'},
  {key: 'task', label: 'Aufgabe'},
  {key: 'solution', label: 'Lösung'},
  {key: 'material', label: 'Material/Konstrukt'},
  {key: 'ecology', label: 'Ökologie/Energie'},
  {key: 'economy', label: 'Wirtschaftlichkeit'},
  {key: 'special', label: 'Besonderheiten'},
];

export default function ProjectDetail({project, onClose}: ProjectDetailProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.button
            type="button"
            aria-label="Projektdetails schließen"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 z-[100] backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-detail-title"
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{type: 'spring', damping: 25, stiffness: 200}}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 bg-stone-50 z-[101] p-8 md:p-24 overflow-y-auto border-l border-stone-300"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-8 right-8 md:top-12 md:right-12 hover:text-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
              aria-label="Projektdetails schließen"
            >
              <X size={32} aria-hidden="true" />
            </button>
            <header className="mb-16 pr-14">
              <p className="uppercase text-xs tracking-widest text-stone-500 mb-4">{project.cat} / {project.location}</p>
              <h1 id="project-detail-title" className="font-serif text-5xl md:text-7xl">{project.title}</h1>
            </header>
            <div className="grid md:grid-cols-2 gap-12 font-sans text-stone-700">
              {DETAIL_FIELDS.map(({key, label}) => {
                const value = project[key];
                if (!value) return null;

                return (
                  <section key={key}>
                    <h3 className="font-serif text-xl mb-4 text-stone-900">{label}</h3>
                    <p>{value}</p>
                  </section>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
