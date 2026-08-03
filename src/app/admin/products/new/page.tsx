import { ProductForm } from '@/components/admin/product-form';

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-lg font-semibold text-zinc-900">Thêm sản phẩm</h1>
      <ProductForm />
    </div>
  );
}
