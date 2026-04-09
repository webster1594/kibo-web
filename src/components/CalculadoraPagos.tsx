'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface Comision {
  id: string;
  pais: string;
  plataforma: string;
  porcentaje_comision: number;
  comision_fija: number;
  moneda: string;
}

const PAISES = ['Argentina', 'México', 'Colombia', 'Perú', 'Chile'];

export default function CalculadoraPagos() {
  const [paisSeleccionado, setPaisSeleccionado] = useState('Argentina');
  const [plataformaSeleccionada, setPlataformaSeleccionada] = useState('');
  const [comisiones, setComisiones] = useState<Comision[]>([]);
  const [montoRecibir, setMontoRecibir] = useState('100');
  const [montoEnviar, setMontoEnviar] = useState('100');
  const [cargando, setCargando] = useState(true);

  // Cargar comisiones del país seleccionado desde Supabase
  useEffect(() => {
    async function cargarComisiones() {
      setCargando(true);
      const { data, error } = await supabase
        .from('comisiones')
        .select('*')
        .eq('pais', paisSeleccionado)
        .order('plataforma');

      if (!error && data && data.length > 0) {
        setComisiones(data);
        setPlataformaSeleccionada(data[0].plataforma);
      } else {
        setComisiones([]);
        setPlataformaSeleccionada('');
      }
      setCargando(false);
    }
    cargarComisiones();
  }, [paisSeleccionado]);

  const comisionActual = comisiones.find(c => c.plataforma === plataformaSeleccionada) || null;

  const calcularParaRecibir = () => {
    if (!comisionActual) return { debe_enviar: 0, comision_total: 0 };
    const monto = parseFloat(montoRecibir) || 0;
    const comisionPct = (monto * comisionActual.porcentaje_comision) / 100;
    const comisionTotal = comisionPct + comisionActual.comision_fija;
    return { debe_enviar: monto + comisionTotal, comision_total: comisionTotal };
  };

  const calcularSiEnvias = () => {
    if (!comisionActual) return { llega: 0, comision_total: 0 };
    const monto = parseFloat(montoEnviar) || 0;
    const comisionPct = (monto * comisionActual.porcentaje_comision) / 100;
    const comisionTotal = comisionPct + comisionActual.comision_fija;
    return { llega: monto - comisionTotal, comision_total: comisionTotal };
  };

  const resultsParaRecibir = calcularParaRecibir();
  const resultsSiEnvias = calcularSiEnvias();

  return (
    <div className="min-h-screen bg-[#3B9EE0] flex flex-col items-center justify-start pt-6 pb-16 px-4 relative overflow-hidden">
      {/* Forma de nube de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[55%] bg-[#5ABAFF] rounded-b-[60%] -z-0" />

      {/* Logo */}
      <div className="relative z-10 mb-2">
        <Image
          src="/assets/LOGO.svg"
          alt="Kivo"
          width={100}
          height={40}
          className="w-24 h-auto brightness-0 invert"
        />
      </div>

      {/* Personaje principal */}
      <div className="relative z-10 mb-4">
        <Image
          src="/assets/calculadora de pagos.svg"
          alt="Personaje Kivo"
          width={140}
          height={140}
          className="w-36 h-36 drop-shadow-lg"
        />
      </div>

      {/* Card Principal */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-5">

        {/* Selectores */}
        <div className="grid grid-cols-2 gap-3">
          <select
            value={paisSeleccionado}
            onChange={(e) => setPaisSeleccionado(e.target.value)}
            className="border-2 border-gray-200 rounded-xl p-3 font-bold text-gray-800 focus:outline-none focus:border-blue-400 bg-white"
          >
            {PAISES.map((pais) => (
              <option key={pais} value={pais}>{pais}</option>
            ))}
          </select>

          <select
            value={plataformaSeleccionada}
            onChange={(e) => setPlataformaSeleccionada(e.target.value)}
            disabled={cargando || comisiones.length === 0}
            className="border-2 border-gray-200 rounded-xl p-3 font-bold text-gray-800 focus:outline-none focus:border-blue-400 bg-white disabled:opacity-50"
          >
            {comisiones.map((c) => (
              <option key={c.plataforma} value={c.plataforma}>{c.plataforma}</option>
            ))}
          </select>
        </div>

        {/* Comisiones info */}
        {comisionActual && (
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <span className="font-bold text-gray-700 text-sm">Comisiones 2026:</span>
            <span className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded-lg text-sm">
              {comisionActual.porcentaje_comision}%
            </span>
            {comisionActual.comision_fija > 0 && (
              <span className="bg-gray-200 text-gray-800 font-bold px-3 py-1 rounded-lg text-sm">
                ${comisionActual.comision_fija.toFixed(2)} usd
              </span>
            )}
          </div>
        )}

        {cargando && (
          <div className="text-center py-4 text-gray-500">Cargando datos...</div>
        )}

        {/* PARA RECIBIR */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Para recibir</span>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-3">
            <span className="font-semibold text-gray-600 text-sm">Para recibir</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={montoRecibir}
                onChange={(e) => setMontoRecibir(e.target.value)}
                className="w-24 text-right font-bold text-gray-900 text-lg focus:outline-none border-b-2 border-transparent focus:border-blue-400"
              />
              <span className="font-bold text-gray-500 text-sm">USD</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-3">
            <span className="font-semibold text-gray-600 text-sm">Te deben enviar</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-lg">
                {resultsParaRecibir.debe_enviar.toFixed(2)}
              </span>
              <span className="font-bold text-gray-500 text-sm">USD</span>
            </div>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-3 text-center font-bold text-sm">
            COMISIÓN: {resultsParaRecibir.comision_total.toFixed(2)} usd
          </div>
        </div>

        {/* SI ENVÍAS */}
        <div className="bg-gray-50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Si envías</span>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-3">
            <span className="font-semibold text-gray-600 text-sm">Si envías</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={montoEnviar}
                onChange={(e) => setMontoEnviar(e.target.value)}
                className="w-24 text-right font-bold text-gray-900 text-lg focus:outline-none border-b-2 border-transparent focus:border-blue-400"
              />
              <span className="font-bold text-gray-500 text-sm">USD</span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white rounded-xl p-3">
            <span className="font-semibold text-gray-600 text-sm">Llegan</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-lg">
                {resultsSiEnvias.llega.toFixed(2)}
              </span>
              <span className="font-bold text-gray-500 text-sm">USD</span>
            </div>
          </div>

          <div className="bg-red-500 text-white rounded-xl p-3 text-center font-bold text-sm">
            COMISIÓN: {resultsSiEnvias.comision_total.toFixed(2)} usd
          </div>
        </div>
      </div>
    </div>
  );
}
