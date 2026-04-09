import CalculadoraPagos from '@/components/CalculadoraPagos';
import Link from 'next/link';

export const metadata = {
  title: 'Calculadora de Pagos - Kivo',
  description: 'Calcula fácilmente las comisiones de plataformas de pago en América Latina',
};

export default function CalculadoraPagosPage() {
  return (
    <main>
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Volver
        </Link>
      </div>
      <CalculadoraPagos />
    </main>
  );
}
