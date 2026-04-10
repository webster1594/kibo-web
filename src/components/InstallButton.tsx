'use client';

import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [showAndroid, setShowAndroid] = useState(false);
  const [showIOS, setShowIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Detectar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
      return;
    }

    // Android / Chrome — capturar el evento de instalación
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> });
      setShowAndroid(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    // iOS Safari — detectar manualmente
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isSafari = /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
    if (isIOS && isSafari) {
      setShowIOS(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowAndroid(false);
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (installed || (!showAndroid && !showIOS)) return null;

  return (
    <>
      {/* Botón de instalación */}
      <button
        onClick={showAndroid ? handleAndroidInstall : () => setShowIOSModal(true)}
        className="flex items-center gap-2 bg-black text-white font-bold px-5 py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition-all text-sm shadow-lg mt-4"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Agregar a mi pantalla
      </button>

      {/* Modal instrucciones iOS */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 bg-black/40" onClick={() => setShowIOSModal(false)}>
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-black text-gray-900 mb-4">Agregar a inicio</h3>
            <ol className="space-y-4 text-gray-700 text-sm">
              <li className="flex items-start gap-3">
                <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                <span>Toca el botón <strong>Compartir</strong> en la barra del navegador
                  <span className="inline-block ml-1 text-base">⎙</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                <span>Desplázate y toca <strong>"Agregar a pantalla de inicio"</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                <span>Toca <strong>"Agregar"</strong> para confirmar</span>
              </li>
            </ol>
            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full bg-black text-white font-bold py-3 rounded-xl text-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
