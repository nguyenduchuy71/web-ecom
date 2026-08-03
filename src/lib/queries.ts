import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/types';

/**
 * List all products, `available` first, then newest first.
 * Sort order is applied client-side (JS) since Postgres can't easily
 * order an enum by custom priority without a CASE expression via PostgREST.
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getProducts error:', error.message);
    return [];
  }

  const products = (data ?? []) as Product[];
  const statusOrder: Record<Product['status'], number> = {
    available: 0,
    reserved: 1,
    sold: 2,
  };

  return [...products].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('getProductById error:', error.message);
    return null;
  }

  return (data as Product) ?? null;
}
