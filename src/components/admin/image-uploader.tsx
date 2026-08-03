'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { uploadImage, deleteImage } from '@/lib/storage';

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    try {
      const urls = await Promise.all(Array.from(files).map((file) => uploadImage(file)));
      onChange([...value, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload thất bại.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  async function handleRemove(url: string) {
    onChange(value.filter((u) => u !== url));
    await deleteImage(url);
  }

  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((url) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-md border border-zinc-200">
            <Image src={url} alt="" fill className="object-cover" sizes="150px" />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              className="absolute right-1 top-1 rounded-full bg-black/60 px-1.5 py-0.5 text-xs text-white opacity-0 transition group-hover:opacity-100"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        disabled={uploading}
        className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-800"
      />

      {uploading && <p className="mt-1 text-xs text-zinc-500">Đang tải ảnh lên...</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
