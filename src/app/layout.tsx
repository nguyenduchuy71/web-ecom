import type { Metadata } from "next";
import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import "./globals.css";
import { shopName, siteUrl } from "@/lib/config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
});

const description = `${shopName} chuyên máy ảnh, ống kính second-hand đã kiểm tra kỹ, uy tín, giá tốt.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${shopName}`,
    default: `${shopName} — Máy ảnh cũ đã kiểm tra`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: shopName,
    title: `${shopName} — Máy ảnh cũ đã kiểm tra`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${shopName} — Máy ảnh cũ đã kiểm tra`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-zinc-900">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
