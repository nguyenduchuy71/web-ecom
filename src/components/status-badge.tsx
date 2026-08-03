import type { ProductStatus } from '@/lib/types';

const STATUS_STYLES: Record<ProductStatus, { label: string; className: string }> = {
  available: {
    label: 'Còn hàng',
    className: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
  },
  reserved: {
    label: 'Đang được giữ',
    className: 'bg-accent-100 text-accent-800 ring-accent-600/20',
  },
  sold: {
    label: 'Đã tìm được chủ mới',
    className: 'bg-zinc-200 text-zinc-600 ring-zinc-500/20',
  },
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  const { label, className } = STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}
