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
      className="group relative overflow-hidden"
    >
      {/* Imagen */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imagen}
          alt={titulo}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-epic-black via-epic-black/20 to-transparent" />
      </div>

      {/* Contenido sobre la imagen */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {subtitulo && (
          <p className="font-montserrat font-light text-xs tracking-[0.3em] text-epic-gold uppercase mb-1">
            {subtitulo}
          </p>
        )}
        <h3 className="font-montserrat font-bold text-2xl tracking-widest text-white uppercase mb-3">
          {titulo}
        </h3>
        <div className="w-8 h-px bg-epic-gold mb-3" />
        <p className="font-inter text-sm text-epic-silver leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-24 overflow-hidden transition-all">
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
    <section id="estilos" className="py-24 px-4 bg-epic-gray/20">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat leading-tight">
            <span className="block font-bold text-epic-gold text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              Tres disciplinas,
            </span>
            <span className="block font-light text-white text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              un mismo espíritu
            </span>
          </h2>
          <div className="w-16 h-px bg-epic-gold mx-auto mt-6" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {estilos.map((e, i) => (
            <EstiloCard key={e.titulo} {...e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
