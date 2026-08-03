'use client';
import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductGrid } from '@/components/product-grid';

export function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('');

  const brands = useMemo(
    () => Array.from(new Set(products.map((p) => p.brand).filter((b): b is string => !!b))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery = !q || p.name.toLowerCase().includes(q);
      const matchesBrand = !brand || p.brand === brand;
      return matchesQuery && matchesBrand;
    });
  }, [products, query, brand]);

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên máy..."
          aria-label="Tìm sản phẩm theo tên"
          className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-accent-600 focus:outline-none sm:max-w-xs"
        />
        {brands.length > 0 && (
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            aria-label="Lọc theo hãng"
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm focus:border-accent-600 focus:outline-none sm:w-48"
          >
            <option value="">Tất cả hãng</option>
            {brands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        )}
      </div>
      <div aria-live="polite">
        {filtered.length === 0 && products.length > 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center text-sm text-zinc-500">
            Không tìm thấy sản phẩm phù hợp.
          </p>
        ) : (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  );
}
