import Link from 'next/link';
import { shopName } from '@/lib/config';
import { SocialBar } from '@/components/social-bar';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-zinc-900">
          {shopName}
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-accent-700"
          >
            Giới thiệu
          </Link>
          <SocialBar className="hidden sm:flex" />
        </nav>
      </div>
    </header>
  );
}
