import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/queries';
import { ProductForm } from '@/components/admin/product-form';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-lg font-semibold text-zinc-900">Sửa sản phẩm</h1>
      <ProductForm product={product} />
    </div>
  );
}
