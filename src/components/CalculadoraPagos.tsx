'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="relative min-h-screen overflow-hidden bg-white flex flex-col">

      {/* Fondo degradado — igual que home */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[65vw] h-[65vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #a8b8f8 0%, #c5d0fa 40%, transparent 70%)', bottom: '-15%', left: '-12%' }} />
        <div className="absolute w-[58vw] h-[58vw] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, #f08080 0%, #f5a0a0 40%, transparent 70%)', top: '-12%', right: '-10%' }} />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-5 pt-5 pb-2">
        <Link href="/">
          <Image
            src="/assets/LOGO.svg"
            alt="Kivo"
            width={100}
            height={40}
            className="w-20 sm:w-24 h-auto"
          />
        </Link>
        <Link
          href="/herramientas"
          className="flex items-center gap-1.5 text-gray-600 hover:text-black text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
      </header>

      {/* Blob gigante + calculadora encima */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8">

        {/* Blob de fondo — gigante */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/assets/calculadora de pagos.svg"
            alt=""
            width={700}
            height={700}
            className="w-[85vw] max-w-[620px] sm:max-w-[680px] h-auto opacity-100"
            priority
          />
        </div>

        {/* Calculadora — encima del blob */}
        <div className="relative z-10 w-full max-w-md space-y-4 pt-16 sm:pt-20">

          {/* Selectores país / plataforma */}
          <div className="grid grid-cols-2 gap-3">
            <select
              value={paisSeleccionado}
              onChange={(e) => setPaisSeleccionado(e.target.value)}
              className="bg-white border-0 rounded-2xl px-4 py-3 font-bold text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm sm:text-base"
            >
              {PAISES.map((pais) => (
                <option key={pais} value={pais}>{pais}</option>
              ))}
            </select>

            <select
              value={plataformaSeleccionada}
              onChange={(e) => setPlataformaSeleccionada(e.target.value)}
              disabled={cargando || comisiones.length === 0}
              className="bg-white border-0 rounded-2xl px-4 py-3 font-bold text-gray-800 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 text-sm sm:text-base"
            >
              {comisiones.map((c) => (
                <option key={c.plataforma} value={c.plataforma}>{c.plataforma}</option>
              ))}
            </select>
          </div>

          {/* Card principal */}
          <div className="bg-white rounded-3xl p-5 shadow-xl space-y-4">

            {/* Info comisiones */}
            {comisionActual && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-gray-700 text-sm">Comisiones 2026:</span>
                <span className="bg-gray-100 text-gray-800 font-bold px-3 py-1 rounded-lg text-sm">
                  {comisionActual.porcentaje_comision}%
                </span>
                {comisionActual.comision_fija > 0 && (
                  <span className="bg-gray-100 text-gray-800 font-bold px-3 py-1 rounded-lg text-sm">
                    ${comisionActual.comision_fija.toFixed(2)} usd
                  </span>
                )}
              </div>
            )}

            {cargando && (
              <div className="text-center py-2 text-gray-400 text-sm">Cargando...</div>
            )}

            {/* PARA RECIBIR */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Para recibir</span>

              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <span className="font-semibold text-gray-500 text-sm">Para recibir</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={montoRecibir}
                    onChange={(e) => setMontoRecibir(e.target.value)}
                    className="w-20 text-right font-bold text-gray-900 text-base focus:outline-none"
                  />
                  <span className="font-bold text-gray-400 text-sm">USD</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <span className="font-semibold text-gray-500 text-sm">Te deben enviar</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">{resultsParaRecibir.debe_enviar.toFixed(2)}</span>
                  <span className="font-bold text-gray-400 text-sm">USD</span>
                </div>
              </div>

              <div className="bg-red-500 text-white rounded-xl py-2.5 text-center font-bold text-sm tracking-wide">
                COMISIÓN: {resultsParaRecibir.comision_total.toFixed(2)} usd
              </div>
            </div>

            {/* SI ENVÍAS */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Si envías</span>

              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <span className="font-semibold text-gray-500 text-sm">Si envías</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={montoEnviar}
                    onChange={(e) => setMontoEnviar(e.target.value)}
                    className="w-20 text-right font-bold text-gray-900 text-base focus:outline-none"
                  />
                  <span className="font-bold text-gray-400 text-sm">USD</span>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                <span className="font-semibold text-gray-500 text-sm">Llegan</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-base">{resultsSiEnvias.llega.toFixed(2)}</span>
                  <span className="font-bold text-gray-400 text-sm">USD</span>
                </div>
              </div>

              <div className="bg-red-500 text-white rounded-xl py-2.5 text-center font-bold text-sm tracking-wide">
                COMISIÓN: {resultsSiEnvias.comision_total.toFixed(2)} usd
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
