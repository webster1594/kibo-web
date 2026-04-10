'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const ICONS = [
  { src: '/assets/calculadora de pagos.svg',    alt: 'Calculadora',  size: 70,  baseX: 18, baseY: 22, ampX: 8,  ampY: 10, freqX: 0.0008, freqY: 0.0006, phaseX: 0,   phaseY: 1.2 },
  { src: '/assets/creador de cotizaciones.svg', alt: 'Cotizaciones',  size: 60,  baseX: 72, baseY: 18, ampX: 10, ampY: 8,  freqX: 0.0007, freqY: 0.0009, phaseX: 2.1, phaseY: 0.5 },
  { src: '/assets/calculadora de precios.svg',  alt: 'Precios',       size: 65,  baseX: 78, baseY: 65, ampX: 9,  ampY: 12, freqX: 0.0006, freqY: 0.0007, phaseX: 1.0, phaseY: 2.8 },
  { src: '/assets/convertidor de archivos.svg', alt: 'Archivos',      size: 58,  baseX: 16, baseY: 70, ampX: 11, ampY: 9,  freqX: 0.0009, freqY: 0.0005, phaseX: 3.5, phaseY: 1.8 },
  { src: '/assets/buscador de clientes.svg',    alt: 'Clientes',      size: 64,  baseX: 50, baseY: 80, ampX: 8,  ampY: 11, freqX: 0.0005, freqY: 0.0008, phaseX: 1.7, phaseY: 0.3 },
];

const REPEL_RADIUS = 120;
const REPEL_STRENGTH = 28;
const LERP = 0.04;

interface Props {
  titulo: string;
}

export default function ProximamentePage({ titulo }: Props) {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999 });
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

        const ox = Math.sin(t * icon.freqX + icon.phaseX) * icon.ampX;
        const oy = Math.cos(t * icon.freqY + icon.phaseY) * icon.ampY;

        const baseScreenX = (icon.baseX / 100) * window.innerWidth;
        const baseScreenY = (icon.baseY / 100) * window.innerHeight;
        const ix = baseScreenX + ox;
        const iy = baseScreenY + oy;

        let targetRx = 0, targetRy = 0;
        const dx = ix - mouse.current.x;
        const dy = iy - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          targetRx = (dx / dist) * force * REPEL_STRENGTH;
          targetRy = (dy / dist) * force * REPEL_STRENGTH;
        }

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
    <div className="relative min-h-screen overflow-hidden bg-white flex flex-col">

      {/* Fondo degradado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[65vw] h-[65vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)', bottom: '-15%', left: '-12%' }} />
        <div className="absolute w-[58vw] h-[58vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)', top: '-12%', right: '-10%' }} />
      </div>

      {/* Íconos flotantes */}
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

      {/* Header flotante */}
      <div className="relative z-20 px-4 pt-4">
        <header className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <Image src="/assets/LOGO.svg" alt="Kivo" width={110} height={44} className="w-24 sm:w-28 h-auto" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-gray-600 hover:text-black font-medium text-sm sm:text-base transition-colors">Blog</Link>
            <Link href="/nosotros" className="text-gray-600 hover:text-black font-medium text-sm sm:text-base transition-colors">Nosotros</Link>
          </nav>
        </header>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 -mt-16">

        <div className="flex items-center justify-center gap-1 mb-8 select-none">
          <Image src="/assets/LOGO.svg" alt="Kivo" width={160} height={64} priority className="w-32 sm:w-40 h-auto" />
          <Image src="/assets/personaje principal.svg" alt="Personaje Kivo" width={110} height={110} priority className="w-24 sm:w-28 h-auto -ml-2" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">{titulo}</h1>
        <p className="text-gray-500 text-base sm:text-lg mb-8">Estamos trabajando en esto. ¡Vuelve pronto!</p>

        <div className="bg-yellow-300 text-black font-black py-2 px-6 rounded-lg text-sm uppercase tracking-wide mb-10">
          Próximamente
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
