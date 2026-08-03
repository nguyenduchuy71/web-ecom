'use client';

import { useState } from 'react';
import Image from 'next/image';
import { parseVideoUrl, type VideoEmbed } from '@/lib/video-url';

type MediaItem =
  | { type: 'image'; src: string }
  | ({ type: 'video' } & VideoEmbed);

function buildMediaList(images: string[], videoUrls: string[]): MediaItem[] {
  const videos = videoUrls
    .map(parseVideoUrl)
    .filter((v): v is VideoEmbed => v !== null)
    .map((v): MediaItem => ({ type: 'video', ...v }));

  return [...images.map((src): MediaItem => ({ type: 'image', src })), ...videos];
}

export function ProductGallery({
  images,
  videoUrls = [],
  name,
}: {
  images: string[];
  videoUrls?: string[];
  name: string;
}) {
  const media = buildMediaList(images, videoUrls);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = media.length > 0 ? media[activeIndex] : null;

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-100">
        {!active && (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Chưa có ảnh
          </div>
        )}

        {active?.type === 'image' && (
          <Image
            key={active.src}
            src={active.src}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="animate-fade-in object-cover"
          />
        )}

        {active?.type === 'video' && active.kind === 'youtube' && (
          <iframe
            key={active.original}
            src={active.embedUrl}
            title={`Video sản phẩm — ${name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )}

        {active?.type === 'video' && active.kind === 'tiktok' && (
          <a
            key={active.original}
            href={active.original}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-full w-full flex-col items-center justify-center gap-2 bg-zinc-50 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current" aria-hidden="true">
              <path d="M16.6 5.82c-1.02-.9-1.64-2.2-1.64-3.65h-3.14v13.9c0 1.63-1.33 2.96-2.96 2.96a2.96 2.96 0 0 1 0-5.92c.28 0 .55.04.8.11v-3.19a6.14 6.14 0 0 0-.8-.05A6.11 6.11 0 0 0 2.75 15.9a6.11 6.11 0 0 0 6.11 6.11 6.11 6.11 0 0 0 6.11-6.11V9.01a7.83 7.83 0 0 0 4.57 1.46V7.33a4.85 4.85 0 0 1-2.94-1.51z" />
            </svg>
            Xem trên TikTok
          </a>
        )}
      </div>

      {media.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((item, index) => {
            const key = item.type === 'image' ? item.src : item.original;
            const isActive = index === activeIndex;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={
                  item.type === 'image' ? `Xem ảnh ${index + 1}` : `Xem video ${index + 1}`
                }
                aria-current={isActive}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-colors ${
                  isActive ? 'ring-accent-600' : 'ring-transparent hover:ring-zinc-300'
                }`}
              >
                {item.type === 'image' ? (
                  <Image src={item.src} alt="" fill sizes="80px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 fill-white"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
