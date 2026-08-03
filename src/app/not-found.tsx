import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">404</p>
      <h1 className="mt-2 text-2xl font-bold text-zinc-900 sm:text-3xl">
        Không tìm thấy trang này
      </h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        Có thể sản phẩm đã bán hoặc đường dẫn không còn tồn tại. Quay lại trang chủ để xem các máy
        ảnh khác nhé.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
