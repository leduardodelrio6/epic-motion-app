'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ValorCardProps {
  numero: string;
  titulo: string;
  descripcion: string;
  destacado?: boolean;
  index: number;
}

function ValorCard({ numero, titulo, descripcion, destacado, index }: ValorCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      className={`
        relative p-8 flex flex-col gap-4
        ${destacado
          ? 'border border-epic-gold bg-epic-gray'
          : 'border border-white/10 bg-epic-gray/40 hover:border-white/20'
        }
        transition-colors duration-300
      `}
    >
      {destacado && (
        <div className="absolute top-0 left-0 right-0 h-px bg-epic-gold" />
      )}

      {/* Número */}
      <span className="font-montserrat font-light text-4xl text-epic-gold/40 leading-none">
        {numero}
      </span>

      {/* Título */}
      <h3 className={`font-montserrat font-bold text-2xl tracking-wider uppercase ${destacado ? 'text-epic-gold' : 'text-white'}`}>
        {titulo}
      </h3>

      {/* Divider */}
      <div className={`w-8 h-px ${destacado ? 'bg-epic-gold' : 'bg-white/30'}`} />

      {/* Descripción */}
      <p className="font-inter text-epic-silver text-sm leading-relaxed">
        {descripcion}
      </p>
    </motion.div>
  );
}

export default function ValoresCards() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  const valores = [
    {
      numero: '01',
      titulo: 'Consciente',
      descripcion: 'Cada movimiento tiene un propósito. Entendemos el cuerpo, la técnica y la música para bailar con intención y presencia plena.',
    },
    {
      numero: '02',
      titulo: 'Constante',
      descripcion: 'La excelencia no es un accidente. La práctica sostenida, la dedicación diaria y la perseverancia construyen grandes bailarines.',
      destacado: true,
    },
    {
      numero: '03',
      titulo: 'Correcto',
      descripcion: 'La técnica correcta protege el cuerpo y perfecciona el arte. Formamos bailarines con bases sólidas que duran toda la vida.',
    },
  ];

  return (
    <section className="py-24 px-4 bg-epic-black">
      <div className="max-w-6xl mx-auto">
        {/* Título de sección */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-montserrat leading-tight">
            <span className="block font-bold text-epic-gold text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              La disciplina
            </span>
            <span className="block font-light text-white text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
              que nos define
            </span>
          </h2>
          <div className="w-16 h-px bg-epic-gold mx-auto mt-6" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {valores.map((v, i) => (
            <ValorCard key={v.numero} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
