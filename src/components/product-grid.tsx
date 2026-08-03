import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';
import { ScrollReveal } from '@/components/scroll-reveal';

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-20 text-center">
        <p className="text-lg font-semibold text-zinc-700">Chưa có sản phẩm nào</p>
        <p className="mt-1 max-w-sm text-sm text-zinc-500">
          Cửa hàng đang cập nhật máy ảnh cũ. Quay lại sau hoặc liên hệ trực tiếp để hỏi hàng nhé!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ScrollReveal key={product.id} delay={(index % 4) * 60}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}
