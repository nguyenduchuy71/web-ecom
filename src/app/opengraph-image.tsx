import { ImageResponse } from 'next/og';
import { shopName } from '@/lib/config';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OG image fallback — used for the homepage and for any product
 * without photos. Generated on the fly with next/og (no static asset needed).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#18181b',
          backgroundImage: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: 28,
            backgroundColor: '#f4f4f5',
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 76,
              height: 76,
              borderRadius: 9999,
              backgroundColor: '#18181b',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: 40,
                height: 40,
                borderRadius: 9999,
                backgroundColor: '#d97706',
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#fafafa' }}>
          {shopName}
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#d4d4d8', marginTop: 12 }}>
          Máy ảnh cũ đã kiểm tra
        </div>
      </div>
    ),
    { ...size }
  );
}
