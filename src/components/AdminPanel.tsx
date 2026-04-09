'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Admin usa service_role key para poder escribir
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Comision {
  id: string;
  pais: string;
  plataforma: string;
  porcentaje_comision: number;
  comision_fija: number;
  moneda: string;
  actualizado_en: string;
}

const PAISES = ['Argentina', 'México', 'Colombia', 'Perú', 'Chile'];

const formVacio = {
  pais: 'Argentina',
  plataforma: '',
  porcentaje_comision: 0,
  comision_fija: 0,
  moneda: 'USD',
};

export default function AdminPanel() {
  const [comisiones, setComisiones] = useState<Comision[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [formData, setFormData] = useState(formVacio);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  const mostrarMensaje = (tipo: 'ok' | 'error', texto: string) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), 3000);
  };

  const cargarComisiones = async () => {
    setCargando(true);
    const { data, error } = await supabaseAdmin
      .from('comisiones')
      .select('*')
      .order('pais')
      .order('plataforma');
    if (!error && data) setComisiones(data);
    setCargando(false);
  };

  useEffect(() => { cargarComisiones(); }, []);

  const handleAgregar = () => {
    setEditandoId(null);
    setFormData(formVacio);
    setMostrarForm(true);
  };

  const handleEditar = (c: Comision) => {
    setEditandoId(c.id);
    setFormData({
      pais: c.pais,
      plataforma: c.plataforma,
      porcentaje_comision: c.porcentaje_comision,
      comision_fija: c.comision_fija,
      moneda: c.moneda,
    });
    setMostrarForm(true);
  };

  const handleGuardar = async () => {
    if (!formData.plataforma.trim()) {
      mostrarMensaje('error', 'El nombre de la plataforma es obligatorio');
      return;
    }
    setGuardando(true);
    if (editandoId) {
      const { error } = await supabaseAdmin
        .from('comisiones')
        .update({ ...formData, actualizado_en: new Date().toISOString() })
        .eq('id', editandoId);
      if (error) {
        mostrarMensaje('error', 'Error al actualizar: ' + error.message);
      } else {
        mostrarMensaje('ok', 'Comisión actualizada correctamente');
        setMostrarForm(false);
        cargarComisiones();
      }
    } else {
      const { error } = await supabaseAdmin
        .from('comisiones')
        .insert([formData]);
      if (error) {
        mostrarMensaje('error', 'Error al crear: ' + error.message);
      } else {
        mostrarMensaje('ok', 'Comisión creada correctamente');
        setMostrarForm(false);
        cargarComisiones();
      }
    }
    setGuardando(false);
  };

  const handleEliminar = async (id: string, pais: string, plataforma: string) => {
    if (!confirm(`¿Eliminar ${plataforma} de ${pais}?`)) return;
    const { error } = await supabaseAdmin
      .from('comisiones')
      .delete()
      .eq('id', id);
    if (error) {
      mostrarMensaje('error', 'Error al eliminar: ' + error.message);
    } else {
      mostrarMensaje('ok', 'Eliminado correctamente');
      cargarComisiones();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Ir al sitio</Link>
          <h1 className="text-2xl font-bold">Panel Admin — Kivo</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4">

        {/* Mensaje de estado */}
        {mensaje && (
          <div className={`mb-6 px-5 py-3 rounded-xl font-medium ${
            mensaje.tipo === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {mensaje.texto}
          </div>
        )}

        {/* Botón agregar */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Comisiones ({comisiones.length} registros)
          </h2>
          <button
            onClick={handleAgregar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            + Agregar comisión
          </button>
        </div>

        {/* Formulario */}
        {mostrarForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-5">
              {editandoId ? 'Editar comisión' : 'Nueva comisión'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">País</label>
                <select
                  value={formData.pais}
                  onChange={(e) => setFormData({ ...formData, pais: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                >
                  {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Plataforma</label>
                <input
                  type="text"
                  value={formData.plataforma}
                  onChange={(e) => setFormData({ ...formData, plataforma: e.target.value })}
                  placeholder="Ej: PayPal, Stripe, Wise"
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">% Comisión</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.porcentaje_comision}
                  onChange={(e) => setFormData({ ...formData, porcentaje_comision: parseFloat(e.target.value) || 0 })}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Comisión fija ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.comision_fija}
                  onChange={(e) => setFormData({ ...formData, comision_fija: parseFloat(e.target.value) || 0 })}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1.5">Moneda</label>
                <select
                  value={formData.moneda}
                  onChange={(e) => setFormData({ ...formData, moneda: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl p-3 focus:outline-none focus:border-blue-400"
                >
                  <option value="USD">USD</option>
                  <option value="ARS">ARS</option>
                  <option value="MXN">MXN</option>
                  <option value="COP">COP</option>
                  <option value="PEN">PEN</option>
                  <option value="CLP">CLP</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleGuardar}
                disabled={guardando}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                {guardando ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                onClick={() => setMostrarForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-6 py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {cargando ? (
            <div className="text-center py-16 text-gray-500">Cargando...</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-5 font-bold text-gray-700 text-sm">País</th>
                  <th className="text-left py-4 px-5 font-bold text-gray-700 text-sm">Plataforma</th>
                  <th className="text-center py-4 px-5 font-bold text-gray-700 text-sm">% Comisión</th>
                  <th className="text-center py-4 px-5 font-bold text-gray-700 text-sm">Fija</th>
                  <th className="text-center py-4 px-5 font-bold text-gray-700 text-sm">Moneda</th>
                  <th className="text-center py-4 px-5 font-bold text-gray-700 text-sm">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {comisiones.map((c, idx) => (
                  <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="py-4 px-5 font-medium text-gray-800">{c.pais}</td>
                    <td className="py-4 px-5 text-gray-700">{c.plataforma}</td>
                    <td className="py-4 px-5 text-center font-bold text-gray-800">{c.porcentaje_comision}%</td>
                    <td className="py-4 px-5 text-center text-gray-700">${c.comision_fija.toFixed(2)}</td>
                    <td className="py-4 px-5 text-center text-gray-600">{c.moneda}</td>
                    <td className="py-4 px-5">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditar(c)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleEliminar(c.id, c.pais, c.plataforma)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!cargando && comisiones.length === 0 && (
            <div className="text-center py-16 text-gray-500">No hay comisiones registradas</div>
          )}
        </div>
      </main>
    </div>
  );
}
