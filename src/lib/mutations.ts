import { createClient } from '@/lib/supabase/client';
import { deleteImage } from '@/lib/storage';
import type { Product, ProductStatus } from '@/lib/types';

export type ProductInput = {
  name: string;
  brand: string | null;
  price: number;
  description: string | null;
  specs: Record<string, unknown>;
  condition: string | null;
  status: ProductStatus;
  images: string[];
  video_urls: string[];
};

export async function createProduct(input: ProductInput): Promise<Product> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .insert(input)
    .select()
    .single();

  if (error) throw new Error(`Tạo sản phẩm thất bại: ${error.message}`);
  return data as Product;
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`Cập nhật sản phẩm thất bại: ${error.message}`);
  return data as Product;
}

export async function deleteProduct(product: Product): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('products').delete().eq('id', product.id);

  if (error) throw new Error(`Xóa sản phẩm thất bại: ${error.message}`);

  await Promise.all(product.images.map((url) => deleteImage(url)));
}

export async function updateStatus(id: string, status: ProductStatus): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from('products').update({ status }).eq('id', id);

  if (error) throw new Error(`Đổi trạng thái thất bại: ${error.message}`);
}
