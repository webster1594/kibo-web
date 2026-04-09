'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sección Hero */}
      <section className="flex-1 flex flex-col items-center justify-center py-20 px-4 sm:py-32">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/assets/LOGO.svg"
              alt="Kivo Logo"
              width={200}
              height={80}
              priority
              className="w-48 h-auto"
            />
          </div>

          {/* Título con badge */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-black text-black">Kivo</h1>
            <div className="bg-yellow-300 text-black font-bold py-2 px-6 inline-block rounded-lg text-sm sm:text-base">
              HERRAMIENTAS PARA FREELANCERS
            </div>
          </div>

          {/* Botón Comenzar */}
          <div className="pt-8">
            <Link
              href="/herramientas"
              className="inline-flex items-center gap-3 bg-black text-white font-bold px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              Comenzar
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Herramientas Grid */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Calculadora de Pagos */}
            <div className="bg-gray-50 p-8 rounded-xl flex items-center gap-6 hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-2">Calculadora de pagos</h3>
                <p className="text-gray-600">Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos</p>
              </div>
              <div className="flex-shrink-0 w-24 h-24">
                <Image
                  src="/assets/calculadora de pagos.svg"
                  alt="Calculadora de pagos"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Creador de Cotizaciones */}
            <div className="bg-gray-50 p-8 rounded-xl flex items-center gap-6 hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-2">Creador de cotizaciones</h3>
                <p className="text-gray-600">Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos</p>
              </div>
              <div className="flex-shrink-0 w-24 h-24">
                <Image
                  src="/assets/creador de cotizaciones.svg"
                  alt="Creador de cotizaciones"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Calculadora de Precios */}
            <div className="bg-gray-50 p-8 rounded-xl flex items-center gap-6 hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-2">Calculadora de precios</h3>
                <p className="text-gray-600">Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos</p>
              </div>
              <div className="flex-shrink-0 w-24 h-24">
                <Image
                  src="/assets/calculadora de precios.svg"
                  alt="Calculadora de precios"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Convertidor de Archivos */}
            <div className="bg-gray-50 p-8 rounded-xl flex items-center gap-6 hover:shadow-lg transition-shadow">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-black mb-2">Convertidor de archivos</h3>
                <p className="text-gray-600">Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos</p>
              </div>
              <div className="flex-shrink-0 w-24 h-24">
                <Image
                  src="/assets/convertidor de archivos.svg"
                  alt="Convertidor de archivos"
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Buscador de Clientes - Full Width */}
          <div className="bg-gray-50 p-8 rounded-xl flex items-center gap-6 hover:shadow-lg transition-shadow">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-black mb-2">Buscador de clientes</h3>
              <p className="text-gray-600">Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos</p>
            </div>
            <div className="flex-shrink-0 w-24 h-24">
              <Image
                src="/assets/buscador de clientes.svg"
                alt="Buscador de clientes"
                width={100}
                height={100}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8 px-4 text-center text-gray-600">
        <p className="max-w-6xl mx-auto">© 2024 Kivo. Herramientas para freelancers en América Latina.</p>
      </footer>
    </div>
  );
}
