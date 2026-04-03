'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

const presentaciones = [
  {
    titulo: 'Presentación de Ballet',
    descripcion: 'Fin de año 2025',
  },
  {
    titulo: 'Presentación de Hip-Hop',
    descripcion: 'Festival Cultural',
  },
  {
    titulo: 'Presentación de Contemporáneo',
    descripcion: 'Recital de primavera',
  },
];

interface VideoCardProps {
  titulo: string;
  descripcion: string;
  index: number;
}

function VideoCard({ titulo, descripcion, index }: VideoCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className="flex flex-col gap-4 bg-white dark:bg-epic-gray border border-gray-200 dark:border-white/10 p-6"
    >
      {/* Área de play */}
      <div className="aspect-video bg-gray-100 dark:bg-epic-black/60 flex items-center justify-center border border-gray-200 dark:border-white/5">
        <div className="flex flex-col items-center gap-3 text-gray-400 dark:text-white/20">
          <div className="w-14 h-14 rounded-full border-2 border-gray-300 dark:border-white/20 flex items-center justify-center">
            <Play size={22} className="ml-1" />
          </div>
          <span className="font-inter text-xs tracking-widest uppercase">Próximamente</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h3 className="font-montserrat font-bold text-sm tracking-wider uppercase text-epic-black dark:text-white">
          {titulo}
        </h3>
        <p className="font-inter text-xs text-gray-500 dark:text-epic-silver">
          {descripcion}
        </p>
      </div>

      {/* Botón outline */}
      <a
        href="https://tiktok.com/@epicmotionds"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center font-montserrat font-bold text-xs tracking-widest px-4 py-2 border border-gray-300 dark:border-white/20 text-gray-600 dark:text-white/50 hover:border-epic-gold hover:text-epic-gold dark:hover:border-epic-gold dark:hover:text-epic-gold transition-colors duration-200 uppercase"
      >
        Próximamente
      </a>
    </motion.div>
  );
}

export default function GaleriaTikTok() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const tiktokRef = useRef(null);
  const tiktokInView = useInView(tiktokRef, { once: true, margin: '-60px' });

  return (
    <section id="galeria" className="py-24 px-4 bg-gray-50 dark:bg-epic-black">
      <div className="max-w-6xl mx-auto">
        {/* Título — alineado izquierda */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="font-montserrat leading-tight">
            <span className="block font-bold text-epic-black dark:text-white text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              Nuestras
            </span>
            <span className="block font-light text-gray-500 dark:text-epic-silver text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              presentaciones
            </span>
          </h2>
          <div className="w-16 h-px bg-epic-gold mt-6" />
        </motion.div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {presentaciones.map((p, i) => (
            <VideoCard key={p.titulo} {...p} index={i} />
          ))}
        </div>

        {/* TikTok follow */}
        <motion.div
          ref={tiktokRef}
          initial={{ opacity: 0, y: 10 }}
          animate={tiktokInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 h-px bg-epic-gold flex-shrink-0" />
          <p className="font-inter text-sm text-gray-500 dark:text-epic-silver">
            Síguenos en TikTok{' '}
            <a
              href="https://tiktok.com/@epicmotionds"
              target="_blank"
              rel="noopener noreferrer"
              className="text-epic-gold hover:underline font-medium"
            >
              @epicmotionds
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
