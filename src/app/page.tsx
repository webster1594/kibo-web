'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const FLOATING_ICONS = [
  { src: '/assets/calculadora de pagos.svg', alt: 'Calculadora', size: 70, x: 8, y: 15, speed: 0.03 },
  { src: '/assets/creador de cotizaciones.svg', alt: 'Cotizaciones', size: 55, x: 78, y: 10, speed: 0.045 },
  { src: '/assets/calculadora de precios.svg', alt: 'Precios', size: 60, x: 85, y: 60, speed: 0.025 },
  { src: '/assets/convertidor de archivos.svg', alt: 'Archivos', size: 50, x: 12, y: 65, speed: 0.04 },
  { src: '/assets/buscador de clientes.svg', alt: 'Clientes', size: 65, x: 55, y: 80, speed: 0.035 },
];

export default function Home() {
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const animate = () => {
      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        const speed = FLOATING_ICONS[i].speed;
        const dx = mouseRef.current.x * 40 * speed * 100;
        const dy = mouseRef.current.y * 40 * speed * 100;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">

      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-white">
        {/* Mancha azul - abajo izquierda */}
        <div
          className="absolute w-[55vw] h-[55vw] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)',
            bottom: '-10%',
            left: '-10%',
          }}
        />
        {/* Mancha roja/rosada - arriba derecha */}
        <div
          className="absolute w-[50vw] h-[50vw] rounded-full opacity-45"
          style={{
            background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)',
            top: '-10%',
            right: '-8%',
          }}
        />
      </div>

      {/* Íconos flotantes con efecto de mouse */}
      {FLOATING_ICONS.map((icon, i) => (
        <div
          key={icon.src}
          ref={(el) => { iconsRef.current[i] = el; }}
          className="absolute transition-transform duration-75 ease-out pointer-events-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: icon.size,
            height: icon.size,
          }}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.size}
            height={icon.size}
            className="w-full h-full drop-shadow-md"
          />
        </div>
      ))}

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Logo + personaje principal */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Logo a la izquierda del personaje */}
          <div className="absolute -left-32 sm:-left-44 top-1/2 -translate-y-1/2">
            <Image
              src="/assets/LOGO.svg"
              alt="Kivo Logo"
              width={130}
              height={52}
              priority
              className="w-28 sm:w-36 h-auto"
            />
          </div>

          {/* Personaje principal */}
          <Image
            src="/assets/personaje principal.svg"
            alt="Personaje Kivo"
            width={260}
            height={260}
            priority
            className="w-52 sm:w-64 h-auto drop-shadow-xl"
          />
        </div>

        {/* Badge amarilla */}
        <div className="bg-yellow-300 text-black font-black py-2 px-6 rounded-lg text-sm sm:text-base tracking-wide mb-10 uppercase">
          Herramientas para freelancers
        </div>

        {/* Botón Comenzar */}
        <Link
          href="/herramientas"
          className="inline-flex items-center gap-3 bg-black text-white font-bold px-8 py-4 rounded-xl hover:bg-gray-800 active:scale-95 transition-all text-lg shadow-lg"
        >
          Comenzar
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
