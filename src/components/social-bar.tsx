import { socialLinks } from '@/lib/config';

const ICON_PATHS: Record<string, string> = {
  facebook:
    'M13.5 21v-7.6h2.55l.38-2.95h-2.93V8.56c0-.85.24-1.44 1.46-1.44h1.56V4.5c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.17H8v2.95h2.44V21h3.06Z',
  tiktok:
    'M16.6 5.82c-.98-.72-1.63-1.83-1.75-3.07h-3.05v13.6c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1 0-5.8c.3 0 .58.04.85.12V10.5a5.95 5.95 0 0 0-.85-.06 5.95 5.95 0 1 0 5.95 5.95V9.02a7.6 7.6 0 0 0 4.46 1.43V7.4c-1.02 0-2-.32-2.7-.9Z',
  instagram:
    'M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.5.5.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77a4.9 4.9 0 0 1 1.77-1.16c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 3.35A6.65 6.65 0 1 0 12 18.65 6.65 6.65 0 0 0 12 5.35Zm0 10.97A4.32 4.32 0 1 1 12 7.68a4.32 4.32 0 0 1 0 8.64Zm6.9-11.22a1.55 1.55 0 1 1-3.1 0 1.55 1.55 0 0 1 3.1 0Z',
  zalo: 'M4 4h16v11.2H9.4L5.5 19V15.2H4V4Zm3 3.5v1.2h3.6V7.5H7Zm0 2.6v1.2h6.5v-1.2H7Zm0 2.6v1.2h5V12.7H7Z',
  messenger:
    'M12 2C6.48 2 2 6.15 2 11.27c0 2.92 1.44 5.52 3.7 7.22V22l3.38-1.86c.9.25 1.86.38 2.92.38 5.52 0 10-4.15 10-9.25C22 6.15 17.52 2 12 2Zm1.02 12.47-2.55-2.72-4.98 2.72 5.48-5.82 2.62 2.72 4.9-2.72-5.47 5.82Z',
};

export function SocialBar({ className = '' }: { className?: string }) {
  if (socialLinks.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.key}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 transition-colors hover:bg-accent-100 hover:text-accent-700"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4.5 w-4.5">
            <path d={ICON_PATHS[link.key] ?? ''} />
          </svg>
        </a>
      ))}
    </div>
  );
}
