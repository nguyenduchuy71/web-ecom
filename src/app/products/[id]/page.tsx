import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductById } from '@/lib/queries';
import { formatVnd } from '@/lib/format';
import { ProductGallery } from '@/components/product-gallery';
import { ContactButtons } from '@/components/contact-buttons';
import { StatusBadge } from '@/components/status-badge';
import { ScrollReveal } from '@/components/scroll-reveal';
import { siteUrl } from '@/lib/config';

type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return {};

  const description =
    product.description ??
    [product.condition, formatVnd(product.price)].filter(Boolean).join(' · ');
  const ogImage = product.images?.[0] ?? `${siteUrl}/opengraph-image`;

  return {
    title: `${product.name} — ${formatVnd(product.price)}`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [{ url: ogImage, width: 1200, height: 900, alt: product.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const specEntries = Object.entries(product.specs ?? {});

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <Link href="/" className="mb-4 inline-block text-sm text-zinc-500 hover:text-zinc-800">
        ← Về trang chủ
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
        <ScrollReveal>
          <ProductGallery
            images={product.images ?? []}
            videoUrls={product.video_urls ?? []}
            name={product.name}
          />
        </ScrollReveal>

        <ScrollReveal delay={100} className="flex flex-col gap-5 lg:sticky lg:top-6">
          <div>
            {product.brand && (
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                {product.brand}
              </p>
            )}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-2xl font-semibold text-zinc-900 sm:text-3xl">
                {product.name}
              </h1>
              <StatusBadge status={product.status} />
            </div>

            {product.status === 'available' && (
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-secondary-50 px-3 py-1 text-xs font-semibold text-accent-secondary-700 ring-1 ring-inset ring-accent-secondary-100">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
                  <path d="M10 1.5l2.29 4.64 5.12.74-3.7 3.61.87 5.1L10 13.1l-4.58 2.5.87-5.1-3.7-3.61 5.12-.74z" />
                </svg>
                Hàng độc nhất — một chiếc duy nhất
              </span>
            )}

            <p className="mt-3 text-3xl font-bold text-accent-700">{formatVnd(product.price)}</p>
            {product.status === 'sold' && (
              <p className="mt-1 text-sm text-zinc-500">Đã tìm được chủ nhân mới.</p>
            )}
          </div>

          {product.condition && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Tình trạng</h2>
              <p className="mt-1 text-sm text-zinc-600">{product.condition}</p>
            </div>
          )}

          <ContactButtons productName={product.name} />

          {product.description && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Mô tả</h2>
              <p className="mt-1 whitespace-pre-line text-sm text-zinc-600">
                {product.description}
              </p>
            </div>
          )}

          {specEntries.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-zinc-800">Thông số</h2>
              <dl className="mt-2 divide-y divide-zinc-100 rounded-2xl border border-zinc-200">
                {specEntries.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 px-3 py-2 text-sm">
                    <dt className="text-zinc-500">{key}</dt>
                    <dd className="text-right font-medium text-zinc-800">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="rounded-2xl border border-accent-secondary-100 bg-accent-secondary-50 px-4 py-3 text-xs text-accent-secondary-700 sm:text-sm">
            Mỗi máy đều được kiểm tra kỹ trước khi lên kệ — xem chi tiết quy trình ở trang{' '}
            <Link href="/about" className="font-medium underline underline-offset-2">
              Giới thiệu &amp; chính sách
            </Link>
            .
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
