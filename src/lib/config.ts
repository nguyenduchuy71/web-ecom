export const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || 'Camera Shop';

/** Base URL for metadataBase, sitemap, absolute OG URLs. Update env for prod domain. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export interface SocialLink {
  key: string;
  label: string;
  url: string;
}

const rawSocialLinks: Array<Omit<SocialLink, 'url'> & { url: string | undefined }> = [
  { key: 'facebook', label: 'Facebook', url: process.env.NEXT_PUBLIC_FACEBOOK_URL },
  { key: 'tiktok', label: 'TikTok', url: process.env.NEXT_PUBLIC_TIKTOK_URL },
  { key: 'instagram', label: 'Instagram', url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  { key: 'zalo', label: 'Zalo', url: process.env.NEXT_PUBLIC_ZALO_URL },
  { key: 'messenger', label: 'Messenger', url: process.env.NEXT_PUBLIC_MESSENGER_URL },
];

export const socialLinks: SocialLink[] = rawSocialLinks.filter(
  (link): link is SocialLink => Boolean(link.url)
);
