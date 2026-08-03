import { createClient } from '@/lib/supabase/client';

const BUCKET = 'product-images';

/**
 * Upload a single image to the `product-images` bucket.
 * Returns the public URL.
 */
export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const ext = file.name.split('.').pop();
  const path = `${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });

  if (error) {
    throw new Error(`Upload thất bại: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(path);

  void ext;
  return publicUrl;
}

/**
 * Delete an image from Storage given its public URL.
 * Silently no-ops if the URL doesn't belong to our bucket or delete fails.
 */
export async function deleteImage(url: string): Promise<void> {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;

  const path = decodeURIComponent(url.slice(idx + marker.length));
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);

  if (error) {
    console.error('deleteImage error:', error.message);
  }
}
