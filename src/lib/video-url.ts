export type VideoEmbed =
  | { kind: 'youtube'; embedUrl: string; original: string }
  | { kind: 'tiktok'; original: string };

function toYoutubeEmbedUrl(parsed: URL): string | null {
  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith('/shorts/')) {
      const id = parsed.pathname.split('/')[2];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.pathname.startsWith('/embed/')) {
      return parsed.toString();
    }
  }

  return null;
}

/** Parses a URL into a known video embed, requiring http(s) protocol and an exact host match — never a substring check. */
export function parseVideoUrl(url: string): VideoEmbed | null {
  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return null;
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;

  const host = parsed.hostname.replace(/^www\./, '');

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtu.be') {
    const embedUrl = toYoutubeEmbedUrl(parsed);
    return embedUrl ? { kind: 'youtube', embedUrl, original: parsed.toString() } : null;
  }

  if (host === 'tiktok.com' || host.endsWith('.tiktok.com')) {
    return { kind: 'tiktok', original: parsed.toString() };
  }

  return null;
}

export function isValidVideoUrl(url: string): boolean {
  return parseVideoUrl(url) !== null;
}
