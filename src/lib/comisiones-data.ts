// Datos iniciales de comisiones por país y plataforma
// Estos datos son estimados y pueden cambiar. Se recomienda actualizar regularmente.

export const comisionesData = {
  Argentina: [
    {
      pais: 'Argentina',
      plataforma: 'PayPal',
      porcentaje_comision: 5.4,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Argentina',
      plataforma: 'Stripe',
      porcentaje_comision: 3.9,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Argentina',
      plataforma: 'Wise',
      porcentaje_comision: 1.5,
      comision_fija: 0,
      moneda: 'USD',
    },
  ],
  México: [
    {
      pais: 'México',
      plataforma: 'PayPal',
      porcentaje_comision: 5.4,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'México',
      plataforma: 'Stripe',
      porcentaje_comision: 3.9,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'México',
      plataforma: 'Mercado Pago',
      porcentaje_comision: 4.99,
      comision_fija: 0,
      moneda: 'USD',
    },
  ],
  Colombia: [
    {
      pais: 'Colombia',
      plataforma: 'PayPal',
      porcentaje_comision: 5.4,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Colombia',
      plataforma: 'Stripe',
      porcentaje_comision: 3.9,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Colombia',
      plataforma: 'Wise',
      porcentaje_comision: 1.5,
      comision_fija: 0,
      moneda: 'USD',
    },
  ],
  Perú: [
    {
      pais: 'Perú',
      plataforma: 'PayPal',
      porcentaje_comision: 5.4,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Perú',
      plataforma: 'Stripe',
      porcentaje_comision: 3.9,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Perú',
      plataforma: 'Wise',
      porcentaje_comision: 1.5,
      comision_fija: 0,
      moneda: 'USD',
    },
  ],
  Chile: [
    {
      pais: 'Chile',
      plataforma: 'PayPal',
      porcentaje_comision: 5.4,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Chile',
      plataforma: 'Stripe',
      porcentaje_comision: 3.9,
      comision_fija: 0.30,
      moneda: 'USD',
    },
    {
      pais: 'Chile',
      plataforma: 'Wise',
      porcentaje_comision: 1.5,
      comision_fija: 0,
      moneda: 'USD',
    },
  ],
};

export const paises = Object.keys(comisionesData);

export function getPlataformasPorPais(pais: string): string[] {
  const data = comisionesData[pais as keyof typeof comisionesData];
  if (!data) return [];
  return data.map((c) => c.plataforma);
}

export function getComision(pais: string, plataforma: string) {
  const data = comisionesData[pais as keyof typeof comisionesData];
  if (!data) return null;
  return data.find((c) => c.plataforma === plataforma) || null;
}
