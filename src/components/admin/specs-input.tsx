'use client';

import { useId, useState } from 'react';

type SpecRow = { id: string; key: string; value: string };

type Props = {
  value: Record<string, string>;
  onChange: (specs: Record<string, string>) => void;
};

function toRows(specs: Record<string, string>): SpecRow[] {
  return Object.entries(specs).map(([key, value], index) => ({
    id: `${index}-${key}`,
    key,
    value,
  }));
}

function toSpecs(rows: SpecRow[]): Record<string, string> {
  const specs: Record<string, string> = {};
  for (const row of rows) {
    if (row.key.trim()) specs[row.key.trim()] = row.value;
  }
  return specs;
}

export function SpecsInput({ value, onChange }: Props) {
  const [rows, setRows] = useState<SpecRow[]>(() => toRows(value));
  const idSeed = useId();

  const keyCounts = rows.reduce<Record<string, number>>((acc, r) => {
    const trimmed = r.key.trim();
    if (trimmed) acc[trimmed] = (acc[trimmed] ?? 0) + 1;
    return acc;
  }, {});

  function updateRows(next: SpecRow[]) {
    setRows(next);
    onChange(toSpecs(next));
  }

  function handleAdd() {
    updateRows([...rows, { id: `${idSeed}-${rows.length}-${Date.now()}`, key: '', value: '' }]);
  }

  function handleKeyChange(id: string, newKey: string) {
    updateRows(rows.map((r) => (r.id === id ? { ...r, key: newKey } : r)));
  }

  function handleValueChange(id: string, newValue: string) {
    updateRows(rows.map((r) => (r.id === id ? { ...r, value: newValue } : r)));
  }

  function handleRemove(id: string) {
    updateRows(rows.filter((r) => r.id !== id));
  }

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => {
        const trimmedKey = row.key.trim();
        const isDuplicate = trimmedKey.length > 0 && (keyCounts[trimmedKey] ?? 0) > 1;
        return (
          <div key={row.id}>
            <div className="flex items-center gap-2">
              <input
                value={row.key}
                onChange={(e) => handleKeyChange(row.id, e.target.value)}
                placeholder="Tên (VD: Shutter count)"
                aria-label="Tên thông số"
                aria-invalid={isDuplicate || undefined}
                className={`w-2/5 rounded-md border px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none ${
                  isDuplicate ? 'border-red-400' : 'border-zinc-300'
                }`}
              />
              <input
                value={row.value}
                onChange={(e) => handleValueChange(row.id, e.target.value)}
                placeholder="Giá trị (VD: 12.000)"
                aria-label="Giá trị thông số"
                className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-900 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemove(row.id)}
                aria-label="Xóa thông số này"
                className="shrink-0 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white hover:bg-black/80"
              >
                Xóa
              </button>
            </div>
            {isDuplicate && (
              <p className="mt-1 text-xs text-red-600">
                Trùng tên với thông số khác — chỉ giá trị cuối cùng được lưu.
              </p>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleAdd}
        className="self-start rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        + Thêm thông số
      </button>
    </div>
  );
}
