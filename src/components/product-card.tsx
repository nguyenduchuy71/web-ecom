import Image from 'next/image';
import Link from 'next/link';
import { formatVnd } from '@/lib/format';
import type { Product } from '@/lib/types';
import { StatusBadge } from '@/components/status-badge';

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images?.[0];
  const isSold = product.status === 'sold';

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-600/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <div className={`h-full w-full ${isSold ? 'opacity-70 grayscale-[35%]' : ''}`}>
          {cover ? (
            <Image
              src={cover}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 will-change-transform group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
              Chưa có ảnh
            </div>
          )}
        </div>
        <div className="absolute left-2 top-2">
          <StatusBadge status={product.status} />
        </div>
      </div>

      <div className="space-y-1 p-3">
        {product.brand && (
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            {product.brand}
          </p>
        )}
        <h3 className="line-clamp-2 font-serif text-sm font-semibold text-zinc-900">
          {product.name}
        </h3>
        <p className="text-base font-bold text-accent-700">{formatVnd(product.price)}</p>
      </div>
    </Link>
  );
}
