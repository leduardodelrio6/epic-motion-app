'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

interface EstiloCardProps {
  imagen: string;
  titulo: string;
  subtitulo?: string;
  descripcion: string;
  index: number;
}

function EstiloCard({ imagen, titulo, subtitulo, descripcion, index }: EstiloCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="group flex flex-col"
    >
      {/* Imagen cuadrada */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={imagen}
          alt={titulo}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Texto debajo de la imagen */}
      <div className="pt-5 pb-2 flex flex-col gap-2">
        {subtitulo && (
          <p className="font-montserrat font-light text-xs tracking-[0.3em] text-epic-gold uppercase">
            {subtitulo}
          </p>
        )}
        <h3 className="font-montserrat font-bold text-xl tracking-widest uppercase text-epic-black dark:text-white">
          {titulo}
        </h3>
        <div className="w-8 h-px bg-epic-gold" />
        <p className="font-inter text-sm text-gray-600 dark:text-epic-silver leading-relaxed mt-1">
          {descripcion}
        </p>
      </div>
    </motion.div>
  );
}

export default function EstilosGrid() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const estilos = [
    {
      imagen: '/images/ballet.webp',
      titulo: 'Ballet',
      subtitulo: 'Técnica clásica',
      descripcion: 'La base de toda danza. Técnica rigurosa, postura perfecta y elegancia que se traslada a cualquier estilo.',
    },
    {
      imagen: '/images/hiphop.webp',
      titulo: 'Urbano',
      subtitulo: 'Hip-Hop',
      descripcion: 'Energía, actitud y autenticidad. Movimientos libres que expresan identidad con técnica y flow.',
    },
    {
      imagen: '/images/contemporaneo.webp',
      titulo: 'Contemporáneo',
      descripcion: 'La fusión del pasado y el presente. Libertad expresiva con dominio técnico para contar historias con el cuerpo.',
    },
  ];

  return (
    <section id="estilos" className="py-24 px-4 bg-white dark:bg-epic-black">
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
              Tres disciplinas,
            </span>
            <span className="block font-light text-gray-500 dark:text-epic-silver text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              un mismo espíritu
            </span>
          </h2>
          <div className="w-16 h-px bg-epic-gold mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {estilos.map((e, i) => (
            <EstiloCard key={e.titulo} {...e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
