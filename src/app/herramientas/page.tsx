'use client';

import Link from 'next/link';
import Image from 'next/image';

const herramientas = [
  {
    id: 'calculadora-pagos',
    nombre: 'Calculadora de pagos',
    descripcion: 'Calcula fácilmente cuánto cobrar o enviar según las comisiones de cada plataforma',
    imagen: '/assets/calculadora de pagos.svg',
    disponible: true,
  },
  {
    id: 'creador-cotizaciones',
    nombre: 'Creador de cotizaciones',
    descripcion: 'Genera cotizaciones profesionales para tus clientes en segundos',
    imagen: '/assets/creador de cotizaciones.svg',
    disponible: false,
  },
  {
    id: 'calculadora-precios',
    nombre: 'Calculadora de precios',
    descripcion: 'Descubre el precio justo para tus servicios según el mercado',
    imagen: '/assets/calculadora de precios.svg',
    disponible: false,
  },
  {
    id: 'convertidor-archivos',
    nombre: 'Convertidor de archivos',
    descripcion: 'Convierte tus archivos de trabajo al formato que necesites',
    imagen: '/assets/convertidor de archivos.svg',
    disponible: false,
  },
  {
    id: 'buscador-clientes',
    nombre: 'Buscador de clientes',
    descripcion: 'Encuentra clientes potenciales para hacer crecer tu negocio',
    imagen: '/assets/buscador de clientes.svg',
    disponible: false,
  },
];

export default function HerramientasPage() {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">

      {/* Fondo degradado — igual que home */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[65vw] h-[65vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)', bottom: '-15%', left: '-12%' }} />
        <div className="absolute w-[58vw] h-[58vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)', top: '-12%', right: '-10%' }} />
      </div>

      {/* Header flotante sobre el fondo */}
      <div className="relative z-10 px-4 pt-4">
        <header className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/LOGO.svg"
              alt="Kivo"
              width={110}
              height={44}
              className="w-24 sm:w-28 h-auto"
            />
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            <Link href="/blog" className="text-gray-600 hover:text-black font-medium text-sm sm:text-base transition-colors">
              Blog
            </Link>
            <Link href="/nosotros" className="text-gray-600 hover:text-black font-medium text-sm sm:text-base transition-colors">
              Nosotros
            </Link>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto py-10 px-4">

        {/* Botón volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-black text-sm font-medium mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>

        {/* Lista de herramientas */}
        <div className="space-y-4">
          {herramientas.map((h) =>
            h.disponible ? (
              <Link
                key={h.id}
                href={`/${h.id}`}
                className="flex items-center gap-5 p-5 sm:p-7 rounded-2xl bg-gray-50 hover:shadow-md hover:bg-white border border-transparent hover:border-gray-100 transition-all group"
              >
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                  <Image src={h.imagen} alt={h.nombre} width={80} height={80} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-2xl font-bold text-black mb-1 leading-tight">{h.nombre}</h2>
                  <p className="text-gray-500 text-xs sm:text-base leading-snug">{h.descripcion}</p>
                </div>
                <div className="flex-shrink-0 bg-black text-white font-bold px-3 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm group-hover:bg-gray-800 transition-colors whitespace-nowrap">
                  Usar →
                </div>
              </Link>
            ) : (
              <div
                key={h.id}
                className="flex items-center gap-5 p-5 sm:p-7 rounded-2xl bg-gray-100 opacity-55 cursor-not-allowed"
              >
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                  <Image src={h.imagen} alt={h.nombre} width={80} height={80} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base sm:text-2xl font-bold text-black mb-1 leading-tight">{h.nombre}</h2>
                  <p className="text-gray-500 text-xs sm:text-base leading-snug">{h.descripcion}</p>
                </div>
                <span className="flex-shrink-0 text-gray-400 text-xs sm:text-sm font-medium whitespace-nowrap">
                  Próximamente
                </span>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
