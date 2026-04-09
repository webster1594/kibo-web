import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Comision {
  id: string;
  pais: string;
  plataforma: string;
  porcentaje_comision: number;
  comision_fija: number;
  moneda: string;
  actualizado_en: string;
}

export async function getComisiones(pais: string): Promise<Comision[]> {
  const { data, error } = await supabase
    .from('comisiones')
    .select('*')
    .eq('pais', pais)
    .order('plataforma');

  if (error) {
    console.error('Error fetching comisiones:', error);
    return [];
  }

  return data || [];
}

export async function getAllComisiones(): Promise<Comision[]> {
  const { data, error } = await supabase
    .from('comisiones')
    .select('*')
    .order('pais')
    .order('plataforma');

  if (error) {
    console.error('Error fetching all comisiones:', error);
    return [];
  }

  return data || [];
}

export async function updateComision(
  id: string,
  updates: Partial<Comision>
): Promise<boolean> {
  const { error } = await supabase
    .from('comisiones')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error updating comision:', error);
    return false;
  }

  return true;
}

export async function createComision(comision: Omit<Comision, 'id' | 'actualizado_en'>): Promise<Comision | null> {
  const { data, error } = await supabase
    .from('comisiones')
    .insert([comision])
    .select()
    .single();

  if (error) {
    console.error('Error creating comision:', error);
    return null;
  }

  return data;
}

export async function deleteComision(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('comisiones')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting comision:', error);
    return false;
  }

  return true;
}
