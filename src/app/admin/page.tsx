'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { deleteProduct, updateStatus } from '@/lib/mutations';
import { formatVnd } from '@/lib/format';
import { StatusBadge } from '@/components/status-badge';
import { AdminNav } from '@/components/admin/admin-nav';
import type { Product, ProductStatus } from '@/lib/types';

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'available', label: 'Còn hàng' },
  { value: 'reserved', label: 'Đang giữ' },
  { value: 'sold', label: 'Đã bán' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (cancelled) return;

      if (error) {
        setError(error.message);
      } else {
        setProducts((data ?? []) as Product[]);
      }
      setLoading(false);
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(product: Product) {
    if (!confirm(`Xóa sản phẩm "${product.name}"? Thao tác này không thể hoàn tác.`)) return;

    try {
      await deleteProduct(product);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Xóa thất bại.');
    }
  }

  async function handleStatusChange(product: Product, status: ProductStatus) {
    try {
      await updateStatus(product.id, status);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, status } : p)));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Đổi trạng thái thất bại.');
    }
  }

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 text-lg font-semibold text-zinc-900">Danh sách sản phẩm</h1>

        {loading && <p className="text-sm text-zinc-500">Đang tải...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && products.length === 0 && !error && (
          <p className="text-sm text-zinc-500">Chưa có sản phẩm nào.</p>
        )}

        {products.length > 0 && (
          <div className="overflow-x-auto rounded-md border border-zinc-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-600">
                <tr>
                  <th className="px-4 py-2 font-medium">Tên</th>
                  <th className="px-4 py-2 font-medium">Hãng</th>
                  <th className="px-4 py-2 font-medium">Giá</th>
                  <th className="px-4 py-2 font-medium">Trạng thái</th>
                  <th className="px-4 py-2 font-medium">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-zinc-200">
                    <td className="px-4 py-2 text-zinc-900">{product.name}</td>
                    <td className="px-4 py-2 text-zinc-600">{product.brand ?? '—'}</td>
                    <td className="px-4 py-2 text-zinc-600">{formatVnd(product.price)}</td>
                    <td className="px-4 py-2">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={product.status}
                          onChange={(e) =>
                            handleStatusChange(product, e.target.value as ProductStatus)
                          }
                          className="rounded-md border border-zinc-300 px-2 py-1 text-xs"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="text-xs font-medium text-zinc-700 hover:underline"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
