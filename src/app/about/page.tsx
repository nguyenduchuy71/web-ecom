import type { Metadata } from 'next';
import { socialLinks, shopName, siteUrl } from '@/lib/config';
import { ContactButtons } from '@/components/contact-buttons';
import { ScrollReveal } from '@/components/scroll-reveal';

const description = `Câu chuyện, quy trình kiểm tra máy và chính sách bảo hành/đổi trả của ${shopName} — máy ảnh cũ đã kiểm tra kỹ, uy tín.`;

export const metadata: Metadata = {
  title: 'Giới thiệu & chính sách',
  description,
  openGraph: {
    title: `Giới thiệu & chính sách | ${shopName}`,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Giới thiệu & chính sách | ${shopName}`,
    description,
  },
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

const INSPECTION_STEPS = [
  {
    title: 'Kiểm tra ngoại hình',
    detail:
      'Soi kỹ thân máy, ngàm, vòng zoom/focus dưới đèn — phát hiện trầy xước, va đập, dấu hiệu từng rơi hoặc ngấm nước.',
  },
  {
    title: 'Đếm số lần chụp (shutter count)',
    detail:
      'Đọc shutter count qua phần mềm chuyên dụng hoặc file EXIF, đối chiếu với tuổi thọ trung bình của dòng máy để đánh giá độ "còn mới".',
  },
  {
    title: 'Soi cảm biến & ống kính',
    detail:
      'Chụp thử với khẩu nhỏ (f/16-f/22) lên phông trắng để phát hiện bụi, mốc, xước hoặc lóa; kiểm tra ống kính dưới đèn pin ngược sáng.',
  },
  {
    title: 'Test chức năng thực tế',
    detail:
      'Lấy nét tự động/lấy nét tay, đo sáng, chống rung, kết nối thẻ nhớ và cổng sạc/truyền dữ liệu — chụp thử ít nhất một thẻ nhớ đầy để đảm bảo hoạt động ổn định.',
  },
  {
    title: 'Vệ sinh & đóng gói',
    detail:
      'Vệ sinh cảm biến, thân máy, phụ kiện đi kèm trước khi lên kệ; chụp ảnh thực tế (không dùng ảnh mạng) để đăng bán.',
  },
];

const POLICY_ITEMS = [
  {
    title: 'Thời gian bảo hành',
    value: '7 ngày yên tâm — lỗi 1 đổi 1',
    note: 'Ví dụ — số ngày cụ thể do shop xác nhận trước khi đăng. Có vấn đề gì, shop lo hết.',
  },
  {
    title: 'Phạm vi bảo hành',
    value: 'Lỗi kỹ thuật do nhà sản xuất',
    note: 'Không áp dụng với hư hỏng do rơi vỡ, vào nước, hoặc tự ý tháo máy sau khi nhận hàng.',
  },
  {
    title: 'Điều kiện đổi trả',
    value: 'Còn nguyên phụ kiện, tem bảo hành',
    note: 'Máy cần giữ nguyên tình trạng như lúc giao, đầy đủ hộp/phụ kiện đi kèm (nếu có).',
  },
];

const RETURN_STEPS = [
  'Liên hệ Zalo/Messenger trong thời hạn bảo hành, mô tả lỗi kèm hình ảnh/video.',
  'Shop xác nhận lỗi và hẹn lịch nhận máy kiểm tra trực tiếp hoặc qua vận chuyển.',
  'Sau khi xác nhận lỗi thuộc diện bảo hành, đổi máy khác hoặc hoàn tiền theo thỏa thuận.',
];

const FAQ_ITEMS = [
  {
    q: 'Máy có nguồn gốc rõ ràng không?',
    a: 'Có. Mỗi máy đều được thu mua trực tiếp, kiểm tra và ghi rõ tình trạng thực tế trước khi đăng bán — không nhập hàng trôi nổi.',
  },
  {
    q: 'Có xem máy trực tiếp trước khi mua không?',
    a: 'Có, khuyến khích khách xem và test máy trực tiếp tại cửa hàng trước khi thanh toán.',
  },
  {
    q: 'Có hỗ trợ trả góp hoặc thu cũ đổi mới không?',
    a: 'Tùy thời điểm — liên hệ trực tiếp qua Zalo/Messenger để shop tư vấn cụ thể theo dòng máy bạn quan tâm.',
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Nội dung minh hoạ: câu chuyện, quy trình kiểm tra, chính sách bảo hành và FAQ bên dưới
          là ví dụ để tham khảo bố cục — shop cần thay bằng nội dung/con số thật trước khi public. */}
      <div className="mb-8 rounded-xl border border-accent-200 bg-accent-100/60 px-4 py-3 text-xs text-accent-800 sm:text-sm">
        <strong className="font-semibold">Nội dung minh hoạ:</strong> câu chuyện, quy trình kiểm
        tra, chính sách bảo hành và FAQ bên dưới là ví dụ để tham khảo bố cục — vui lòng thay bằng
        nội dung và con số thật của shop trước khi công khai trang này.
      </div>

      {/* 1. Hero / shop story */}
      <section className="grain-overlay overflow-hidden rounded-2xl px-1 py-1">
        <p className="text-sm font-medium uppercase tracking-wide text-accent-700">
          Về {shopName}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Máy ảnh cũ, nhưng không phải "hên xui"
        </h1>
        <div className="mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
          <p>
            {shopName} bắt đầu từ việc mình cũng từng là người đi mua máy ảnh cũ và ngán ngẩm
            với kiểu "máy đẹp 98%" nhưng về nhà mới phát hiện lỗi. Từ đó, tụi mình quyết định
            làm mọi thứ khác đi: mỗi chiếc máy trước khi lên kệ đều được kiểm tra kỹ, mô tả
            đúng tình trạng thật, không tô hồng.
          </p>
          <p>
            Vì là hàng second-hand nên mỗi máy là <strong className="text-zinc-800">một sản phẩm độc nhất</strong> —
            không có chuyện "hết mẫu này còn mẫu khác giống hệt". Ảnh đăng bán là ảnh chụp thật
            của chính chiếc máy đó, kèm tình trạng thực tế để khách yên tâm trước khi quyết định.
          </p>
        </div>
      </section>

      {/* 2. Inspection process */}
      <ScrollReveal className="mt-12 sm:mt-16">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Quy trình kiểm tra máy
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Mỗi máy trải qua 5 bước kiểm tra trước khi được đăng bán — không rút gọn công đoạn nào,
            để bạn yên tâm mỗi khi cầm máy lên tay.
          </p>

          <ol className="mt-6 space-y-4">
            {INSPECTION_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/60 p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-secondary-600/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-secondary-100 font-serif text-sm font-semibold text-accent-secondary-700">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </ScrollReveal>

      {/* 3. Warranty & return policy */}
      <ScrollReveal className="mt-12 sm:mt-16">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Chính sách bảo hành / đổi trả
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Thông tin dưới đây là ví dụ tham khảo — shop sẽ xác nhận con số cụ thể cho từng đơn hàng.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {POLICY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-accent-secondary-100 bg-accent-secondary-50/60 p-4 transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-secondary-600/10"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {item.title}
                </h3>
                <p className="mt-2 font-serif text-lg font-semibold text-accent-700">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{item.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white/60 p-5">
            <h3 className="text-sm font-semibold text-zinc-900">Quy trình đổi trả</h3>
            <ol className="mt-3 space-y-2">
              {RETURN_STEPS.map((step, i) => (
                <li key={step} className="flex gap-3 text-sm text-zinc-600">
                  <span className="font-serif font-semibold text-accent-700">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </ScrollReveal>

      {/* 4. Contact + FAQ */}
      <ScrollReveal className="mt-12 sm:mt-16">
        <section>
          <h2 className="font-serif text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Liên hệ
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Có câu hỏi về máy hoặc muốn xem hàng trực tiếp? Nhắn shop qua Zalo hoặc Messenger — rất
            vui khi được tìm hiểu cùng bạn.
          </p>

          <div className="mt-5 max-w-md">
            <ContactButtons message="Chào shop, mình có vài câu hỏi muốn hỏi trước khi mua máy ạ." />
          </div>

          {socialLinks.length > 0 && (
            <p className="mt-4 text-xs text-zinc-500">
              Hoặc theo dõi shop trên các kênh khác ở phần chân trang.
            </p>
          )}

          {FAQ_ITEMS.length > 0 && (
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-zinc-800">Câu hỏi thường gặp</h3>
              <dl className="mt-3 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white/60">
                {FAQ_ITEMS.map((item) => (
                  <div key={item.q} className="p-4">
                    <dt className="text-sm font-semibold text-zinc-900">{item.q}</dt>
                    <dd className="mt-1 text-sm text-zinc-600">{item.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>
      </ScrollReveal>
    </div>
  );
}
