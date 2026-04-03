'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: conectar con NextAuth
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-epic-black flex">
      {/* Panel izquierdo — imagen (solo desktop) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/hero-dancer-desktop.webp"
          alt="Epic Motion"
          fill
          className="object-cover object-center grayscale"
          priority
        />
        <div className="absolute inset-0 bg-epic-black/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-montserrat font-extrabold text-white text-7xl leading-none">
              EPIC
            </h2>
            <h2 className="font-montserrat font-light text-epic-silver text-7xl leading-none -mt-2">
              MOTION
            </h2>
            <div className="w-16 h-px bg-epic-gold my-6" />
            <p className="font-montserrat font-light text-xs tracking-[0.4em] text-epic-silver/70 uppercase">
              High Performance Dance Studio
            </p>
          </motion.div>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20">
        {/* Volver a inicio */}
        <a
          href="/"
          className="inline-flex items-center gap-2 font-montserrat text-xs tracking-widest text-epic-silver/50 hover:text-epic-gold transition-colors mb-12 self-start"
        >
          <ArrowLeft size={14} />
          INICIO
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm"
        >
          {/* Logo mobile */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Image
              src="/logo.png"
              alt="Epic Motion"
              width={140}
              height={46}
              className="h-10 w-auto object-contain"
            />
          </div>

          <h1 className="font-montserrat font-bold text-white text-2xl tracking-tight mb-2">
            Iniciar Sesión
          </h1>
          <p className="font-inter text-sm text-epic-silver/50 mb-10">
            Ingresa con tu cuenta para continuar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-montserrat text-xs tracking-widest text-epic-silver/60 uppercase">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="correo@ejemplo.com"
                className="bg-white/5 border border-white/10 text-white placeholder:text-white/20 font-inter text-sm px-4 py-3 outline-none focus:border-epic-gold transition-colors"
              />
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1.5">
              <label className="font-montserrat text-xs tracking-widest text-epic-silver/60 uppercase">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 font-inter text-sm px-4 py-3 pr-11 outline-none focus:border-epic-gold transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-epic-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Recuperar */}
            <div className="flex justify-end -mt-2">
              <a
                href="/recuperar"
                className="font-montserrat text-xs tracking-wider text-epic-silver/40 hover:text-epic-gold transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-epic-gold text-epic-black font-montserrat font-bold text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <p className="mt-10 font-inter text-xs text-white/20 text-center">
            © {new Date().getFullYear()} Epic Motion · Torreón, Coahuila
          </p>
        </motion.div>
      </div>
    </div>
  );
}
