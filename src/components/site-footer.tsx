import Link from 'next/link';
import { shopName } from '@/lib/config';
import { SocialBar } from '@/components/social-bar';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center sm:px-6">
        <p className="text-sm font-semibold text-zinc-800">{shopName}</p>
        <p className="text-xs text-zinc-500">Chuyên máy ảnh cũ đã kiểm tra kỹ, uy tín, giá tốt.</p>
        <Link href="/about" className="text-xs font-medium text-accent-700 hover:underline">
          Giới thiệu &amp; chính sách bảo hành
        </Link>
        <SocialBar />
        <p className="mt-2 text-xs text-zinc-400">
          © {year} {shopName}. Đã bao gồm mọi quyền.
        </p>
      </div>
    </footer>
  );
}
