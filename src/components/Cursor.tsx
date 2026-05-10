import {useEffect, useState} from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({x: 0, y: 0});
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canUsePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(canUsePointer);
    if (!canUsePointer) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({x: event.clientX, y: event.clientY});

      const target = event.target as HTMLElement;
      const cursorLabel = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      setLabel(cursorLabel || null);
      setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center transition-opacity duration-300"
      style={{
        transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="w-5 h-5 rounded-full border border-stone-600 flex items-center justify-center transition-all duration-300">
        {label && (
          <span className="absolute left-8 bg-stone-950 text-stone-50 px-3 py-1 rounded-full text-xs uppercase tracking-widest whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
