'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const valores = [
  {
    titulo: 'Consciente',
    descripcion:
      'Cada movimiento tiene un propósito. Entendemos el cuerpo, la técnica y la música para bailar con intención y presencia plena.',
  },
  {
    titulo: 'Constante',
    descripcion:
      'La excelencia no es un accidente. La práctica sostenida, la dedicación diaria y la perseverancia construyen grandes bailarines.',
  },
  {
    titulo: 'Correcto',
    descripcion:
      'La técnica correcta protege el cuerpo y perfecciona el arte. Formamos bailarines con bases sólidas que duran toda la vida.',
  },
];

export default function ValoresCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Título: cada línea sube desde abajo detrás de su máscara ──
    // overflow-hidden en el wrapper = cortina invisible que oculta la línea
    gsap.from('.valores-title-line', {
      y: '105%',
      stagger: 0.12,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Línea dorada: se dibuja de izquierda a derecha ──
    gsap.from('.valores-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.9,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 72%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Cards: entran con pop (back.out) + stagger ──
    // back.out(1.4) da un ligero overshoot que se siente "vivo"
    gsap.from('.valor-card', {
      y: 70,
      opacity: 0,
      scale: 0.94,
      stagger: 0.14,
      duration: 0.85,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.valores-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });

    // ── Número/índice de cada card: baja desde arriba con retraso ──
    gsap.from('.valor-index', {
      y: -20,
      opacity: 0,
      stagger: 0.14,
      duration: 0.5,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.valores-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="valores"
      className="py-24 px-4 bg-gray-50 dark:bg-epic-black"
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Título con máscara por línea ── */}
        <div className="mb-12">
          <h2 className="font-montserrat leading-tight">
            <div className="overflow-hidden">
              <span className="valores-title-line block font-bold text-epic-black dark:text-white text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
                La disciplina
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="valores-title-line block font-light text-gray-500 dark:text-epic-silver text-[clamp(1.5rem,4vw,2.5rem)] tracking-widest uppercase">
                que nos define
              </span>
            </div>
          </h2>
          <div className="valores-line w-16 h-px bg-epic-gold mt-6" />
        </div>

        {/* ── Grid de cards ── */}
        <div className="valores-grid grid grid-cols-1 md:grid-cols-3 gap-4">
          {valores.map((v, i) => (
            <div
              key={v.titulo}
              className="valor-card group p-8 flex flex-col gap-4 bg-white dark:bg-epic-gray border border-gray-200 dark:border-white/10 hover:border-epic-gold dark:hover:border-epic-gold transition-colors duration-300 cursor-default"
            >
              {/* Índice */}
              <span className="valor-index font-montserrat font-bold text-xs tracking-[0.4em] text-epic-gold/60 group-hover:text-epic-gold transition-colors duration-300">
                0{i + 1}
              </span>

              {/* Título */}
              <h3 className="font-montserrat font-bold text-xl tracking-wider uppercase text-epic-black dark:text-white">
                {v.titulo}
              </h3>

              {/* Divider — se ensancha en hover */}
              <div className="w-8 h-px bg-epic-gold group-hover:w-16 transition-all duration-500" />

              {/* Descripción */}
              <p className="font-inter text-gray-600 dark:text-epic-silver text-sm leading-relaxed">
                {v.descripcion}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
