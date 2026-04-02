'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-dancer-desktop.webp"
          alt="Epic Motion dancer"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-epic-black/65" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="font-montserrat leading-none tracking-tight">
            <span className="block text-[clamp(4rem,18vw,14rem)] font-extrabold text-white">
              EPIC
            </span>
            <span className="block text-[clamp(4rem,18vw,14rem)] font-extrabold text-epic-gold -mt-4 md:-mt-8">
              MOTION
            </span>
          </h1>
        </motion.div>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="font-montserrat font-light text-[clamp(0.65rem,2.5vw,1rem)] tracking-[0.3em] text-epic-silver mt-2 uppercase"
        >
          High Performance Dance Studio
        </motion.p>

        {/* Divider dorado */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="w-24 h-px bg-epic-gold my-6 origin-center"
        />

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-montserrat font-light text-[clamp(0.75rem,2vw,1rem)] tracking-[0.2em] text-epic-silver"
        >
          Consciente · Constante · Correcto
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10"
        >
          <a
            href="https://wa.me/528712044277?text=Hola%20Epic%20Motion%2C%20quiero%20agendar%20una%20clase%20de%20prueba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center font-montserrat font-bold text-xs tracking-[0.25em] px-8 py-4 bg-epic-gold text-epic-black hover:bg-white hover:text-epic-black transition-colors duration-300 uppercase"
          >
            Agenda Clase de Prueba
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-epic-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
