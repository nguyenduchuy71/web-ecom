export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <div className="mb-6">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-zinc-200 sm:h-9 sm:w-80" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-zinc-100" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
          >
            <div className="aspect-[4/3] w-full animate-pulse bg-zinc-200" />
            <div className="space-y-2 p-3">
              <div className="h-3 w-16 animate-pulse rounded bg-zinc-100" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-200" />
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
