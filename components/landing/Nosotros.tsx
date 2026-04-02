'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const beneficios = [
  'Instructores certificados con formación internacional',
  'Instalaciones de primer nivel con piso profesional',
  'Metodología probada y adaptada a cada edad',
  'Grupos reducidos para atención personalizada',
  'Presentaciones regulares en escenario real',
  'Ambiente seguro, disciplinado y motivador',
];

export default function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });

  return (
    <section id="nosotros" className="py-24 px-4 bg-epic-black overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          ref={ref}
          className="relative"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/studio.webp"
              alt="Epic Motion Studio"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-epic-black/40 to-transparent" />
          </div>
          {/* Decoración */}
          <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-epic-gold/30 -z-10" />
        </motion.div>

        {/* Contenido */}
        <div>
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <h2 className="font-montserrat leading-tight">
              <span className="block font-bold text-epic-gold text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
                Dale a tu hijo
              </span>
              <span className="block font-light text-white text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
                el mejor inicio
              </span>
            </h2>
            <div className="w-16 h-px bg-epic-gold mt-6 mb-6" />
            <p className="font-inter text-epic-silver text-sm leading-relaxed">
              En Epic Motion formamos bailarines completos: técnica sólida, disciplina mental y amor genuino por la danza. Cada alumno recibe la atención que merece para desarrollar su máximo potencial.
            </p>
          </motion.div>

          {/* Lista de beneficios */}
          <ul className="space-y-4 mb-10">
            {beneficios.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 20 }}
                animate={titleInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-epic-gold/10 border border-epic-gold flex items-center justify-center mt-0.5">
                  <Check size={11} className="text-epic-gold" strokeWidth={3} />
                </span>
                <span className="font-inter text-sm text-epic-silver leading-snug">{b}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <a
              href="https://wa.me/528712044277?text=Hola%20Epic%20Motion%2C%20quiero%20agendar%20una%20clase%20de%20prueba"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-montserrat font-bold text-xs tracking-[0.25em] px-8 py-4 border border-epic-gold text-epic-gold hover:bg-epic-gold hover:text-epic-black transition-colors duration-300 uppercase"
            >
              Agenda Clase de Prueba
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
