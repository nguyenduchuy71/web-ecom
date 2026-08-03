'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct, type ProductInput } from '@/lib/mutations';
import { ImageUploader } from '@/components/admin/image-uploader';
import { VideoLinkInput } from '@/components/admin/video-link-input';
import { SpecsInput } from '@/components/admin/specs-input';
import { isValidVideoUrl } from '@/lib/video-url';
import type { Product, ProductStatus } from '@/lib/types';

type Props = {
  product?: Product;
};

const STATUS_OPTIONS: { value: ProductStatus; label: string }[] = [
  { value: 'available', label: 'Còn hàng' },
  { value: 'reserved', label: 'Đang giữ' },
  { value: 'sold', label: 'Đã bán' },
];

export function ProductForm({ product }: Props) {
  const router = useRouter();
  const isEdit = Boolean(product);

  const [name, setName] = useState(product?.name ?? '');
  const [brand, setBrand] = useState(product?.brand ?? '');
  const [price, setPrice] = useState(product?.price?.toString() ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [specs, setSpecs] = useState<Record<string, string>>(() => {
    const entries = Object.entries(product?.specs ?? {});
    return Object.fromEntries(
      entries.map(([k, v]) => [
        k,
        typeof v === 'string' ? v : typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v),
      ])
    );
  });
  const [condition, setCondition] = useState(product?.condition ?? '');
  const [status, setStatus] = useState<ProductStatus>(product?.status ?? 'available');
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [videoUrls, setVideoUrls] = useState<string[]>(product?.video_urls ?? []);
  const [pendingVideoInput, setPendingVideoInput] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const priceValue = Number(price);

    if (!trimmedName) {
      setError('Tên sản phẩm là bắt buộc.');
      return;
    }
    if (!price || Number.isNaN(priceValue) || priceValue <= 0) {
      setError('Giá phải là số dương.');
      return;
    }

    const pendingUrl = pendingVideoInput.trim();
    const finalVideoUrls =
      pendingUrl && isValidVideoUrl(pendingUrl) && !videoUrls.includes(pendingUrl)
        ? [...videoUrls, pendingUrl]
        : videoUrls;

    const input: ProductInput = {
      name: trimmedName,
      brand: brand.trim() || null,
      price: priceValue,
      description: description.trim() || null,
      specs,
      condition: condition.trim() || null,
      status,
      images,
      video_urls: finalVideoUrls,
    };

    setSaving(true);
    try {
      if (isEdit && product) {
        await updateProduct(product.id, input);
      } else {
        await createProduct(input);
      }
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lưu sản phẩm thất bại.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-700">
          Tên sản phẩm *
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="brand" className="mb-1 block text-sm font-medium text-zinc-700">
          Hãng
        </label>
        <input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="price" className="mb-1 block text-sm font-medium text-zinc-700">
          Giá (VNĐ) *
        </label>
        <input
          id="price"
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="condition" className="mb-1 block text-sm font-medium text-zinc-700">
          Tình trạng
        </label>
        <input
          id="condition"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="VD: 95% như mới"
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-zinc-700">
          Mô tả
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
      </div>

      <div>
        <p className="mb-1 block text-sm font-medium text-zinc-700">Thông số kỹ thuật</p>
        <SpecsInput value={specs} onChange={setSpecs} />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-sm font-medium text-zinc-700">
          Trạng thái
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ProductStatus)}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-1 block text-sm font-medium text-zinc-700">Hình ảnh</p>
        <ImageUploader value={images} onChange={setImages} />
      </div>

      <div>
        <p className="mb-1 block text-sm font-medium text-zinc-700">Video (YouTube/TikTok)</p>
        <VideoLinkInput
          value={videoUrls}
          onChange={setVideoUrls}
          pendingInput={pendingVideoInput}
          onPendingInputChange={setPendingVideoInput}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Tạo sản phẩm'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}
