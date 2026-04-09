'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HerramientasPage() {
  const herramientas = [
    {
      id: 'calculadora-pagos',
      nombre: 'Calculadora de pagos',
      descripcion: 'Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos',
      imagen: '/assets/calculadora de pagos.svg',
      disponible: true,
    },
    {
      id: 'creador-cotizaciones',
      nombre: 'Creador de cotizaciones',
      descripcion: 'Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos',
      imagen: '/assets/creador de cotizaciones.svg',
      disponible: false,
    },
    {
      id: 'calculadora-precios',
      nombre: 'Calculadora de precios',
      descripcion: 'Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos',
      imagen: '/assets/calculadora de precios.svg',
      disponible: false,
    },
    {
      id: 'convertidor-archivos',
      nombre: 'Convertidor de archivos',
      descripcion: 'Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos',
      imagen: '/assets/convertidor de archivos.svg',
      disponible: false,
    },
    {
      id: 'buscador-clientes',
      nombre: 'Buscador de clientes',
      descripcion: 'Calcula fácilmente las tasas de cambio para enviar y recibir dinero por tus trabajos',
      imagen: '/assets/buscador de clientes.svg',
      disponible: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Image
              src="/assets/LOGO.svg"
              alt="Kivo"
              width={120}
              height={50}
              className="w-32 h-auto"
            />
          </Link>
          <h1 className="text-2xl font-bold text-black">Herramientas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-20 px-4">
        <div className="space-y-6">
          {herramientas.map((herramienta) => (
            <div
              key={herramienta.id}
              className={`flex items-center gap-8 p-8 rounded-xl transition-all ${
                herramienta.disponible
                  ? 'bg-gray-50 hover:shadow-lg cursor-pointer'
                  : 'bg-gray-100 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-black mb-2">
                  {herramienta.nombre}
                </h2>
                <p className="text-gray-600 text-lg">
                  {herramienta.descripcion}
                </p>
                {!herramienta.disponible && (
                  <p className="text-gray-400 text-sm mt-2">Próximamente</p>
                )}
              </div>
              <div className="flex-shrink-0 w-32 h-32">
                <Image
                  src={herramienta.imagen}
                  alt={herramienta.nombre}
                  width={130}
                  height={130}
                  className="w-full h-full"
                />
              </div>
              {herramienta.disponible && (
                <Link
                  href={`/${herramienta.id}`}
                  className="flex-shrink-0 bg-black text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Usar →
                </Link>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8 px-4 text-center text-gray-600 mt-20">
        <p className="max-w-6xl mx-auto">© 2024 Kivo. Herramientas para freelancers en América Latina.</p>
      </footer>
    </div>
  );
}
