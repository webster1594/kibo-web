'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Cada ícono tiene su propia órbita: radio, velocidad, fase inicial
const ICONS = [
  { src: '/assets/calculadora de pagos.svg',    alt: 'Calculadora',  size: 58, radius: 160, speed: 0.0004, phase: 0 },
  { src: '/assets/creador de cotizaciones.svg', alt: 'Cotizaciones',  size: 48, radius: 140, speed: 0.0006, phase: Math.PI * 0.4 },
  { src: '/assets/calculadora de precios.svg',  alt: 'Precios',       size: 52, radius: 170, speed: 0.0005, phase: Math.PI * 0.8 },
  { src: '/assets/convertidor de archivos.svg', alt: 'Archivos',      size: 44, radius: 145, speed: 0.00045, phase: Math.PI * 1.3 },
  { src: '/assets/buscador de clientes.svg',    alt: 'Clientes',      size: 54, radius: 155, speed: 0.00055, phase: Math.PI * 1.7 },
];

const REPEL_RADIUS = 120; // px — distancia a la que el mouse repele
const REPEL_STRENGTH = 40; // cuánto se alejan

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf: number;
    const loop = (t: number) => {
      const container = containerRef.current;
      if (!container) { raf = requestAnimationFrame(loop); return; }

      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      ICONS.forEach((icon, i) => {
        const el = iconRefs.current[i];
        if (!el) return;

        // Posición orbital base (elipse levemente achatada verticalmente)
        const angle = icon.phase + t * icon.speed;
        let ox = Math.cos(angle) * icon.radius;
        let oy = Math.sin(angle) * icon.radius * 0.55;

        // Posición absoluta del ícono
        const ix = cx + ox;
        const iy = cy + oy;

        // Repulsión del mouse
        const dx = ix - mouse.current.x;
        const dy = iy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          ox += (dx / dist) * force * REPEL_STRENGTH;
          oy += (dy / dist) * force * REPEL_STRENGTH;
        }

        el.style.transform = `translate(${ox}px, ${oy}px)`;
      });

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">

      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-white pointer-events-none">
        <div className="absolute w-[60vw] h-[60vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)', bottom: '-15%', left: '-12%' }} />
        <div className="absolute w-[55vw] h-[55vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)', top: '-12%', right: '-10%' }} />
      </div>

      {/* Contenedor central — íconos orbitan alrededor de este punto */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Punto de referencia para las órbitas */}
        <div ref={containerRef} className="relative flex items-center justify-center mb-8">

          {/* Íconos flotantes — posicionados en el centro y movidos por JS */}
          {ICONS.map((icon, i) => (
            <div
              key={icon.src}
              ref={(el) => { iconRefs.current[i] = el; }}
              className="absolute pointer-events-none"
              style={{ width: icon.size, height: icon.size, marginLeft: -icon.size / 2, marginTop: -icon.size / 2 }}
            >
              <Image src={icon.src} alt={icon.alt} width={icon.size} height={icon.size} className="w-full h-full drop-shadow-md" />
            </div>
          ))}

          {/* Logo: texto KiVO + elefante lado a lado */}
          <div className="flex items-center gap-2 select-none">
            <Image
              src="/assets/LOGO.svg"
              alt="Kivo"
              width={180}
              height={72}
              priority
              className="w-36 sm:w-48 h-auto"
            />
            <Image
              src="/assets/personaje principal.svg"
              alt="Personaje Kivo"
              width={130}
              height={130}
              priority
              className="w-28 sm:w-36 h-auto drop-shadow-lg -ml-2"
            />
          </div>
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
