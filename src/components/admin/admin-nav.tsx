'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export function AdminNav() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
      <Link href="/admin" className="text-sm font-semibold text-zinc-900">
        Quản trị sản phẩm
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/admin/products/new" className="text-sm text-zinc-600 hover:text-zinc-900">
          + Thêm sản phẩm
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
