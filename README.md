# Camera Shop Landing

Landing page giới thiệu máy ảnh cũ (hàng độc nhất) — Next.js + Tailwind CSS, dữ liệu qua Supabase (Postgres + Storage + Auth). Không có giỏ hàng/thanh toán — khách xem sản phẩm rồi liên hệ mua qua Zalo/Messenger.

## Tech Stack

- **Next.js** (App Router, TypeScript) + **Tailwind CSS v4**
- **Supabase**: Postgres (bảng `products`), Storage (ảnh sản phẩm), Auth (1 admin, email/password)
- Deploy: **Vercel**

## Cấu trúc

```
src/
├── app/
│   ├── page.tsx                 # Trang chủ — grid sản phẩm
│   ├── products/[id]/page.tsx   # Chi tiết sản phẩm
│   ├── admin/                   # Trang quản trị (login, list, thêm/sửa)
│   ├── sitemap.ts, robots.ts    # SEO
│   └── opengraph-image.tsx      # OG image mặc định
├── components/                  # UI components (grid, gallery, social bar...)
│   └── admin/                   # Form, upload ảnh, nav admin
├── lib/
│   ├── supabase/                # Client Supabase (browser + server)
│   ├── queries.ts                # Đọc sản phẩm (public)
│   ├── mutations.ts              # Ghi sản phẩm (admin, cần auth)
│   ├── storage.ts                # Upload/xóa ảnh
│   ├── types.ts, format.ts, config.ts
└── middleware.ts                 # Bảo vệ /admin/*
supabase/schema.sql               # Schema + RLS + Storage policy (đã áp dụng)
docs/deployment.md                # Hướng dẫn deploy Vercel
```

## Chạy local

1. Cài dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` → `.env.local`, điền `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Supabase Dashboard → Settings → API), social links, tên shop.

3. Chạy dev server:

   ```bash
   npm run dev
   ```

   Mở [http://localhost:3000](http://localhost:3000).

4. Admin: vào `/admin/login`, đăng nhập bằng tài khoản admin đã tạo trong Supabase Auth.

## Database

Schema, RLS policies, Storage bucket đã được setup và lưu ở `supabase/schema.sql` (chạy lại được nếu cần tái tạo project). RLS: public chỉ đọc (`select`), chỉ user đã đăng nhập (`authenticated`) mới ghi được — hệ thống chỉ có 1 admin.

## Deploy

Xem hướng dẫn đầy đủ ở [`docs/deployment.md`](docs/deployment.md): push GitHub, import Vercel, set env vars, cấu hình Supabase Auth redirect URL, checklist smoke test production.

## Build

```bash
npm run build
```
