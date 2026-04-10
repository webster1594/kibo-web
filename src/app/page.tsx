'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// Posición fija (% de pantalla) + parámetros de oscilación independientes para X e Y
const ICONS = [
  {
    src: '/assets/calculadora de pagos.svg', alt: 'Calculadora', size: 70,
    baseX: 18, baseY: 22,
    ampX: 8, ampY: 10, freqX: 0.0008, freqY: 0.0006, phaseX: 0, phaseY: 1.2,
  },
  {
    src: '/assets/creador de cotizaciones.svg', alt: 'Cotizaciones', size: 60,
    baseX: 72, baseY: 18,
    ampX: 10, ampY: 8, freqX: 0.0007, freqY: 0.0009, phaseX: 2.1, phaseY: 0.5,
  },
  {
    src: '/assets/calculadora de precios.svg', alt: 'Precios', size: 65,
    baseX: 78, baseY: 65,
    ampX: 9, ampY: 12, freqX: 0.0006, freqY: 0.0007, phaseX: 1.0, phaseY: 2.8,
  },
  {
    src: '/assets/convertidor de archivos.svg', alt: 'Archivos', size: 58,
    baseX: 16, baseY: 70,
    ampX: 11, ampY: 9, freqX: 0.0009, freqY: 0.0005, phaseX: 3.5, phaseY: 1.8,
  },
  {
    src: '/assets/buscador de clientes.svg', alt: 'Clientes', size: 64,
    baseX: 50, baseY: 80,
    ampX: 8, ampY: 11, freqX: 0.0005, freqY: 0.0008, phaseX: 1.7, phaseY: 0.3,
  },
];

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 28;
const LERP = 0.04; // suavizado: más bajo = más lento y suave

export default function Home() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
  // Offset de repulsión actual (interpolado suavemente) para cada ícono
  const repelCurrent = useRef(ICONS.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { mouse.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let raf: number;
    const loop = (t: number) => {
      ICONS.forEach((icon, i) => {
        const el = iconRefs.current[i];
        if (!el) return;

        // Oscilación orgánica: X e Y con frecuencias y fases distintas
        const ox = Math.sin(t * icon.freqX + icon.phaseX) * icon.ampX;
        const oy = Math.cos(t * icon.freqY + icon.phaseY) * icon.ampY;

        // Posición base en pantalla
        const baseScreenX = (icon.baseX / 100) * window.innerWidth;
        const baseScreenY = (icon.baseY / 100) * window.innerHeight;
        const ix = baseScreenX + ox;
        const iy = baseScreenY + oy;

        // Repulsión objetivo (cuánto debería alejarse)
        let targetRx = 0, targetRy = 0;
        const dx = ix - mouse.current.x;
        const dy = iy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          targetRx = (dx / dist) * force * REPEL_STRENGTH;
          targetRy = (dy / dist) * force * REPEL_STRENGTH;
        }

        // Lerp: suavizar el movimiento de repulsión
        const cur = repelCurrent.current[i];
        cur.x += (targetRx - cur.x) * LERP;
        cur.y += (targetRy - cur.y) * LERP;

        el.style.left = `${icon.baseX}%`;
        el.style.top = `${icon.baseY}%`;
        el.style.transform = `translate(calc(-50% + ${ox + cur.x}px), calc(-50% + ${oy + cur.y}px))`;
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
        <div className="absolute w-[65vw] h-[65vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)', bottom: '-15%', left: '-12%' }} />
        <div className="absolute w-[58vw] h-[58vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)', top: '-12%', right: '-10%' }} />
      </div>

      {/* Íconos flotantes — posición fija + oscilación */}
      {ICONS.map((icon, i) => (
        <div
          key={icon.src}
          ref={(el) => { iconRefs.current[i] = el; }}
          className="absolute pointer-events-none"
          style={{ width: icon.size, height: icon.size }}
        >
          <Image src={icon.src} alt={icon.alt} width={icon.size} height={icon.size} className="w-full h-full" />
        </div>
      ))}

      {/* Contenido central — z-index alto para estar siempre encima */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">

        {/* Logo: texto KiVO + elefante lado a lado */}
        <div className="flex items-center justify-center gap-1 mb-8 select-none">
          <Image
            src="/assets/LOGO.svg"
            alt="Kivo"
            width={260}
            height={104}
            priority
            className="w-52 sm:w-64 md:w-72 h-auto"
          />
          <Image
            src="/assets/personaje principal.svg"
            alt="Personaje Kivo"
            width={180}
            height={180}
            priority
            className="w-36 sm:w-44 md:w-52 h-auto drop-shadow-lg -ml-3"
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
