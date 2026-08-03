import { getProducts } from '@/lib/queries';
import { ProductSearch } from '@/components/product-search';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="grain-overlay mb-6 overflow-hidden rounded-2xl px-1 py-1">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Máy ảnh cũ đã kiểm tra
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Máy ảnh và ống kính second-hand, tình trạng rõ ràng, giá hợp lý.
        </p>
      </div>
      <ProductSearch products={products} />
    </div>
  );
}
