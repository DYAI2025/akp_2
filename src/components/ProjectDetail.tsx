import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface Project {
  title: string;
  location: string;
  cat: string;
  context?: string;
  task?: string;
  solution?: string;
  material?: string;
  ecology?: string;
  economy?: string;
  special?: string;
}

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/40 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-2/3 bg-stone-50 z-[101] p-12 md:p-24 overflow-y-auto border-l border-stone-300"
          >
            <button onClick={onClose} className="absolute top-12 right-12 hover:text-stone-500">
              <X size={32} />
            </button>
            <header className="mb-16">
              <p className="uppercase text-xs tracking-widest text-stone-500 mb-4">{project.cat} / {project.location}</p>
              <h1 className="font-serif text-5xl md:text-7xl">{project.title}</h1>
            </header>
            <div className="grid md:grid-cols-2 gap-12 font-sans text-stone-700">
              {project.context && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Kontext</h3><p>{project.context}</p></div>}
              {project.task && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Aufgabe</h3><p>{project.task}</p></div>}
              {project.solution && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Lösung</h3><p>{project.solution}</p></div>}
              {project.material && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Material/Konstrukt</h3><p>{project.material}</p></div>}
              {project.ecology && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Ökologie/Energie</h3><p>{project.ecology}</p></div>}
              {project.economy && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Wirtschaftlichkeit</h3><p>{project.economy}</p></div>}
              {project.special && <div><h3 className="font-serif text-xl mb-4 text-stone-900">Besonderheiten</h3><p>{project.special}</p></div>}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
