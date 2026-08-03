import { socialLinks } from '@/lib/config';

function buildContactUrl(baseUrl: string, key: string, message: string): string {
  if (key === 'messenger') {
    // Messenger deep link supports a `ref` query param to pass context to the page.
    try {
      const url = new URL(baseUrl);
      url.searchParams.set('ref', message);
      return url.toString();
    } catch {
      return baseUrl;
    }
  }

  if (key === 'zalo') {
    // Zalo personal/OA links don't support prefilled text reliably; keep plain link.
    return baseUrl;
  }

  return baseUrl;
}

interface ContactButtonsProps {
  /** Product name to prefill in the contact message. */
  productName?: string;
  /** Overrides the auto-built product message with a fixed message (e.g. for a general contact CTA not tied to a product). */
  message?: string;
}

export function ContactButtons({ productName, message }: ContactButtonsProps) {
  const contacts = socialLinks.filter((link) => link.key === 'zalo' || link.key === 'messenger');
  const finalMessage =
    message ?? `Chào shop, mình muốn hỏi mua máy "${productName}" còn không ạ?`;

  if (contacts.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Muốn xem hoặc hỏi thêm về sản phẩm này? Liên hệ trực tiếp cửa hàng nhé.
      </p>
    );
  }

  // Zalo is the default primary channel Vietnamese buyers expect from local sellers,
  // rendered filled and larger; the first configured channel wins "primary" otherwise
  // (e.g. only Messenger configured) so the copy/style never implies a missing alternative.
  return (
    <div className="flex flex-col gap-2.5">
      {contacts.map((link, index) => {
        const isPrimary = index === 0;
        return (
          <a
            key={link.key}
            href={buildContactUrl(link.url, link.key, finalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-2 rounded-2xl px-5 font-semibold transition ${
              isPrimary
                ? 'py-3.5 text-base text-white bg-sky-600 shadow-sm hover:bg-sky-700'
                : 'py-2.5 text-sm text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {isPrimary ? `Nhắn ${link.label} hỏi mua ngay` : `Hoặc nhắn qua ${link.label}`}
          </a>
        );
      })}
    </div>
  );
}
