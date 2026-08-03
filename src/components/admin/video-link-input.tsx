'use client';

import { useId, useState } from 'react';
import { isValidVideoUrl } from '@/lib/video-url';

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
  /** Text currently typed but not yet added to the list — lifted so the parent form can flush it on submit. */
  pendingInput: string;
  onPendingInputChange: (value: string) => void;
};

export function VideoLinkInput({ value, onChange, pendingInput, onPendingInputChange }: Props) {
  const [error, setError] = useState<string | null>(null);
  const errorId = useId();

  function handleAdd() {
    const url = pendingInput.trim();
    if (!url) return;

    if (!isValidVideoUrl(url)) {
      setError('Chỉ chấp nhận link YouTube hoặc TikTok hợp lệ.');
      return;
    }

    if (value.includes(url)) {
      setError('Link này đã có trong danh sách.');
      return;
    }

    setError(null);
    onChange([...value, url]);
    onPendingInputChange('');
  }

  function handleRemove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div>
      {value.length > 0 && (
        <ul className="mb-3 flex flex-col gap-2">
          {value.map((url) => (
            <li
              key={url}
              className="flex items-center justify-between gap-3 rounded-md border border-zinc-200 px-3 py-2 text-sm"
            >
              <span className="truncate text-zinc-700">{url}</span>
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="shrink-0 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white hover:bg-black/80"
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-2">
        <input
          type="url"
          value={pendingInput}
          onChange={(e) => {
            onPendingInputChange(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="Dán link YouTube hoặc TikTok..."
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="shrink-0 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          Thêm
        </button>
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
