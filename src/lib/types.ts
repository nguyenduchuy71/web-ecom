export type ProductStatus = 'available' | 'sold' | 'reserved';

export interface Product {
  id: string;
  name: string;
  brand: string | null;
  price: number;
  description: string | null;
  specs: Record<string, unknown>;
  condition: string | null;
  status: ProductStatus;
  images: string[];
  video_urls: string[];
  created_at: string;
  updated_at: string;
}
