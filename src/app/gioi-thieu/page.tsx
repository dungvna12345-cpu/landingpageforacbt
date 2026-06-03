"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Eye,
  Target,
  Users,
  Trophy,
  Factory,
  ShieldCheck,
  Sparkles,
  Quote,
  ExternalLink,
  BarChart3,
  ShoppingBag,
  MousePointerClick,
  TrendingUp,
  PackageCheck,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

const sources = {
  dantri2026:
    "https://dantri.com.vn/kinh-doanh/an-cung-ba-tuyet-thu-gan-230-ty-dongnam-tren-tiktok-shop-shopee-20260316135047206.htm",
  dantri2025:
    "https://dantri.com.vn/kinh-doanh/an-cung-ba-tuyet-thu-gan-100-ty-dong-tren-tiktok-shop-shopee-sau-nua-nam-20250624123716173.htm",
  znewsFactory:
    "https://znews.vn/an-cung-ba-tuyet-khoe-can-canh-xuong-moi-3300-m2-sau-tin-giai-the-post1563244.html",
  tiktokCase:
    "https://ads.tiktok.com/business/vi/inspiration/an-cung-ba-tuyet",
};

const tempImages = {
  founder:
    "https://images.unsplash.com/photo-1484981138541-3d074aa97716?auto=format&fit=crop&w=1200&q=80",
  product:
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=80",
  factory:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  packaging:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  ecommerce:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80",
  team:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
};

const heroStats = [
  {
    value: "228,6 tỷ",
    label: "doanh thu năm 2025",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2026,
  },
  {
    value: "1,9M+",
    label: "sản phẩm bán ra năm 2025",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2026,
  },
  {
    value: "97%+",
    label: "doanh số từ TikTok Shop",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2026,
  },
];

const values = [
  {
    icon: Target,
    title: "Sứ mệnh",
    text: "Thay đổi cái nhìn về đồ ăn vặt — rõ nguồn gốc hơn, tử tế hơn và đáng tin hơn với người tiêu dùng.",
  },
  {
    icon: Eye,
    title: "Tầm nhìn",
    text: "Trở thành thương hiệu đồ ăn vặt Việt Nam được nhắc đến bằng chất lượng, sự gần gũi và tính minh bạch.",
  },
  {
    icon: Heart,
    title: "Giá trị cốt lõi",
    text: "Chân thật — Chất lượng — Gia đình. Làm sản phẩm như làm cho chính người thân của mình.",
  },
  {
    icon: Users,
    title: "Con người",
    text: "Đội ngũ vận hành, sản xuất, đóng gói và bán hàng cùng xây dựng thương hiệu từ những việc nhỏ nhất.",
  },
];

const highlights = [
  {
    icon: Trophy,
    title: "Dẫn đầu ngành hàng online",
    text: "Theo Dân trí dẫn dữ liệu Metric, thương hiệu đứng đầu ngành hàng đồ ăn vặt trên TikTok Shop và Shopee trong năm 2025.",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2026,
  },
  {
    icon: Factory,
    title: "Mở rộng sản xuất",
    text: "Znews ghi nhận xưởng mới có diện tích 3.300m², gồm 2 tầng, lớn hơn xưởng cũ 2.000m².",
    sourceName: "Znews",
    sourceUrl: sources.znewsFactory,
  },
  {
    icon: ShieldCheck,
    title: "Tăng trưởng nhờ thương mại điện tử",
    text: "TikTok for Business ghi nhận chiến dịch PSA giúp ROAS tăng 8,9 lần, GMV tăng 7 lần và hiển thị hơn 39 triệu lần.",
    sourceName: "TikTok for Business",
    sourceUrl: sources.tiktokCase,
  },
];

const gallery = [
  {
    src: tempImages.founder,
    label: "Người sáng lập / ảnh minh hoạ",
  },
  {
    src: tempImages.product,
    label: "Sản phẩm ăn vặt / ảnh minh hoạ",
  },
  {
    src: tempImages.factory,
    label: "Xưởng sản xuất / ảnh minh hoạ",
  },
  {
    src: tempImages.packaging,
    label: "Đóng gói & kho hàng / ảnh minh hoạ",
  },
  {
    src: tempImages.ecommerce,
    label: "Kênh bán hàng online / ảnh minh hoạ",
  },
  {
    src: tempImages.team,
    label: "Đội ngũ vận hành / ảnh minh hoạ",
  },
];

const timeline = [
  {
    year: "10/2023",
    title: "Triển khai Product Shopping Ads",
    description:
      "TikTok for Business ghi nhận Ăn Cùng Bà Tuyết triển khai Product Shopping Ads để tăng GMV và tối ưu quảng cáo mua sắm.",
    sourceName: "TikTok for Business",
    sourceUrl: sources.tiktokCase,
  },
  {
    year: "18/06/2025",
    title: "Đạt 96 tỷ trong gần 6 tháng",
    description:
      "Theo Dân trí dẫn dữ liệu Metric, từ đầu năm đến 18/6/2025, thương hiệu đạt 96 tỷ đồng doanh thu với hơn 868.000 sản phẩm bán ra.",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2025,
  },
  {
    year: "06/2025",
    title: "Công bố xưởng mới 3.300m²",
    description:
      "Znews ghi nhận xưởng mới có diện tích 3.300m², 2 tầng; tầng 1 đã hoàn thành và đi vào hoạt động.",
    sourceName: "Znews",
    sourceUrl: sources.znewsFactory,
  },
  {
    year: "2025",
    title: "Doanh thu năm đạt 228,6 tỷ",
    description:
      "Theo Dân trí dẫn dữ liệu Metric, năm 2025 thương hiệu đạt khoảng 228,6 tỷ đồng doanh thu, hơn 1,9 triệu sản phẩm bán ra.",
    sourceName: "Dân trí / Metric",
    sourceUrl: sources.dantri2026,
  },
];

function SourceLink({
  name,
  url,
  dark = false,
}: {
  name: string;
  url: string;
  dark?: boolean;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-4 transition-colors ${dark
          ? "text-primary-light hover:text-white"
          : "text-primary hover:text-primary-dark"
        }`}
    >
      Nguồn: {name}
      <ExternalLink size={12} />
    </a>
  );
}

function BrandImage({
  src,
  label,
  className = "",
  ratio = "aspect-[4/3]",
}: {
  src: string;
  label: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/20 via-orange-100 to-cream ${ratio} ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
        style={{ backgroundImage: `url("${src}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute left-5 right-5 bottom-5">
        <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-neutral backdrop-blur">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center bg-neutral text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-32 w-[620px] h-[620px] rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-orange-400/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-primary-light text-sm font-semibold uppercase tracking-wider">
                <Sparkles size={16} />
                Câu chuyện thương hiệu Việt
              </span>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mt-6 leading-[0.95]">
                Từ căn bếp quê
                <br />
                đến thương hiệu
                <br />
                <span className="text-primary-light">trăm tỷ.</span>
              </h1>

              <p className="text-gray-300 text-lg mt-7 leading-relaxed max-w-xl">
                Ăn Cùng Bà Tuyết là câu chuyện về một thương hiệu đồ ăn vặt lớn
                lên nhờ nội dung gần gũi, thương mại điện tử và sức mua thật từ
                hàng triệu sản phẩm đã bán ra.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-2xl">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/10 border border-white/10 p-4 backdrop-blur"
                  >
                    <p className="text-3xl font-extrabold text-primary-light">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
                    <div className="mt-3">
                      <SourceLink
                        name={stat.sourceName}
                        url={stat.sourceUrl}
                        dark
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <BrandImage
                  src={tempImages.founder}
                  label="Người sáng lập / ảnh minh hoạ"
                  ratio="aspect-[3/4]"
                  className="mt-12"
                />
                <div className="space-y-4">
                  <BrandImage
                    src={tempImages.product}
                    label="Sản phẩm bán chạy / ảnh minh hoạ"
                    ratio="aspect-square"
                  />
                  <BrandImage
                    src={tempImages.factory}
                    label="Xưởng sản xuất / ảnh minh hoạ"
                    ratio="aspect-square"
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 right-6 bg-white text-neutral rounded-3xl p-5 shadow-2xl hidden sm:block">
                <p className="text-sm text-gray-500">Thông điệp</p>
                <p className="text-xl font-extrabold leading-snug">
                  Nói bằng hình ảnh, chứng minh bằng số liệu.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-bold uppercase tracking-wider text-sm">
                Không chỉ là đồ ăn vặt
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral mt-4 leading-tight">
                Một thương hiệu lớn lên từ nội dung, sản phẩm và niềm tin.
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mt-6">
                Thay vì chỉ kể chuyện bằng vài dòng giới thiệu, trang này dùng
                ảnh, số liệu và nguồn dẫn rõ ràng để khách hàng có thể tự kiểm
                chứng.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <BrandImage
                src={tempImages.packaging}
                label="Đóng gói sản phẩm / ảnh minh hoạ"
                ratio="aspect-square"
              />
              <BrandImage
                src={tempImages.ecommerce}
                label="Kênh bán hàng / ảnh minh hoạ"
                ratio="aspect-square"
                className="mt-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Proof Stats */}
      <section className="py-24 bg-neutral text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-orange-400/15 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-end mb-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-primary-light text-sm font-semibold uppercase tracking-wider">
                <BarChart3 size={16} />
                Số liệu có nguồn
              </span>

              <h2 className="text-4xl sm:text-5xl font-extrabold mt-5 leading-tight">
                Không kể hay.
                <br />
                <span className="text-primary-light">Đưa bằng chứng.</span>
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              Thay vì xếp số liệu thành bảng khô cứng, phần này biến dữ liệu
              thành một câu chuyện tăng trưởng: doanh thu, sản phẩm bán ra, kênh
              bán hàng, xưởng sản xuất và hiệu quả quảng cáo — tất cả đều có
              nguồn kiểm chứng.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Big feature card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 rounded-[2rem] bg-white text-neutral overflow-hidden shadow-2xl"
            >
              <div className="grid sm:grid-cols-2 min-h-[420px]">
                <div className="p-8 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Trophy className="text-primary" size={28} />
                    </div>

                    <p className="text-sm font-bold text-primary uppercase tracking-wider">
                      Cột mốc doanh thu
                    </p>

                    <h3 className="text-6xl sm:text-7xl font-extrabold mt-4 leading-none">
                      228,6
                      <span className="block text-3xl sm:text-4xl mt-2 text-primary">
                        tỷ đồng
                      </span>
                    </h3>

                    <p className="text-gray-500 mt-6 leading-relaxed">
                      Doanh thu năm 2025 theo Dân trí dẫn dữ liệu Metric, tăng
                      304% so với năm trước.
                    </p>
                  </div>

                  <div className="mt-8">
                    <SourceLink
                      name="Dân trí / Metric"
                      url={sources.dantri2026}
                    />
                  </div>
                </div>

                <div className="relative min-h-[280px] sm:min-h-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${tempImages.product}")`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute left-6 right-6 bottom-6">
                    <p className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-neutral backdrop-blur">
                      Sản phẩm ăn vặt / ảnh minh hoạ
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Side cards */}
            <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="rounded-[2rem] bg-white/10 border border-white/10 p-8 backdrop-blur"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-primary-light text-sm font-bold uppercase tracking-wider">
                      Sức mua thật
                    </p>
                    <h3 className="text-5xl font-extrabold mt-4">1,9M+</h3>
                    <p className="text-gray-300 mt-3 leading-relaxed">
                      Sản phẩm bán ra trong năm 2025, theo Dân trí dẫn dữ liệu
                      Metric.
                    </p>
                  </div>

                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary/20 flex items-center justify-center">
                    <PackageCheck className="text-primary-light" size={28} />
                  </div>
                </div>

                <div className="mt-8">
                  <SourceLink
                    name="Dân trí / Metric"
                    url={sources.dantri2026}
                    dark
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="rounded-[2rem] bg-primary text-white p-8 relative overflow-hidden"
              >
                <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-white/20 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                    <ShoppingBag className="text-white" size={28} />
                  </div>

                  <p className="text-white/80 text-sm font-bold uppercase tracking-wider">
                    Kênh bán chủ lực
                  </p>

                  <h3 className="text-5xl font-extrabold mt-4">97%+</h3>

                  <p className="text-white/85 mt-3 leading-relaxed">
                    Doanh số đến từ TikTok Shop, theo Dân trí dẫn dữ liệu
                    Metric.
                  </p>

                  <div className="mt-8">
                    <SourceLink
                      name="Dân trí / Metric"
                      url={sources.dantri2026}
                      dark
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom dashboard */}
            <div className="lg:col-span-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-2">
              {[
                {
                  icon: ShoppingBag,
                  value: "96 tỷ",
                  label: "gần 6 tháng đầu 2025",
                  note: "Tính từ đầu năm đến 18/6/2025.",
                  sourceName: "Dân trí / Metric",
                  sourceUrl: sources.dantri2025,
                },
                {
                  icon: PackageCheck,
                  value: "868.000+",
                  label: "sản phẩm gần 6 tháng",
                  note: "Ghi nhận trên TikTok Shop và Shopee.",
                  sourceName: "Dân trí / Metric",
                  sourceUrl: sources.dantri2025,
                },
                {
                  icon: Factory,
                  value: "3.300m²",
                  label: "xưởng mới",
                  note: "Znews ghi nhận xưởng mới có 2 tầng.",
                  sourceName: "Znews",
                  sourceUrl: sources.znewsFactory,
                },
                {
                  icon: MousePointerClick,
                  value: "39M+",
                  label: "lượt hiển thị PSA",
                  note: "Theo case study TikTok for Business.",
                  sourceName: "TikTok for Business",
                  sourceUrl: sources.tiktokCase,
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={`${item.value}-${item.label}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07 }}
                    className="rounded-[1.75rem] bg-white/10 border border-white/10 p-6 backdrop-blur hover:bg-white/[0.14] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Icon className="text-primary-light" size={24} />
                      </div>

                      <span className="text-xs font-bold text-gray-300">
                        0{i + 1}
                      </span>
                    </div>

                    <p className="text-4xl font-extrabold">{item.value}</p>
                    <h3 className="font-bold mt-2">{item.label}</h3>
                    <p className="text-gray-300 text-sm mt-3 leading-relaxed">
                      {item.note}
                    </p>

                    <div className="mt-6">
                      <SourceLink
                        name={item.sourceName}
                        url={item.sourceUrl}
                        dark
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Ad performance strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="lg:col-span-12 rounded-[2rem] bg-white text-neutral p-6 sm:p-8 mt-2"
            >
              <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
                <div>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider">
                    Hiệu quả quảng cáo
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-extrabold mt-3">
                    Product Shopping Ads không chỉ tạo hiển thị, mà còn kéo tăng
                    GMV.
                  </h3>
                  <div className="mt-5">
                    <SourceLink
                      name="TikTok for Business"
                      url={sources.tiktokCase}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-cream p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-500">ROAS</p>
                      <TrendingUp className="text-primary" size={24} />
                    </div>
                    <p className="text-5xl font-extrabold mt-5">8,9x</p>
                    <p className="text-gray-500 text-sm mt-3">
                      Tăng theo case study TikTok for Business.
                    </p>
                  </div>

                  <div className="rounded-3xl bg-neutral text-white p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-300">GMV</p>
                      <TrendingUp className="text-primary-light" size={24} />
                    </div>
                    <p className="text-5xl font-extrabold mt-5">7x</p>
                    <p className="text-gray-300 text-sm mt-3">
                      So với khoảng thời gian tương đương trước chiến dịch.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Hình ảnh minh hoạ"
            title="Cho khách hàng nhìn thấy thương hiệu"
            description="Ảnh sản phẩm, xưởng, đóng gói và đội ngũ giúp trang giới thiệu có cảm giác thật hơn rất nhiều. Khi có ảnh thật, chỉ cần thay URL trong biến tempImages."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {gallery.map((image, i) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <BrandImage src={image.src} label={image.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group rounded-3xl bg-white p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-black/5"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                    <Icon
                      className="text-primary group-hover:text-white transition-colors"
                      size={26}
                    />
                  </div>
                  <h3 className="font-extrabold text-neutral text-xl">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Dấu ấn nổi bật"
            title="Có thành tích thì phải có nguồn"
            description="Mỗi điểm nổi bật đều đi kèm bài viết hoặc case study để tăng độ tin cậy."
          />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {highlights.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-[2rem] bg-neutral text-white p-8 relative overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                      <Icon className="text-primary-light" size={28} />
                    </div>
                    <h3 className="text-2xl font-extrabold">{item.title}</h3>
                    <p className="text-gray-300 mt-4 leading-relaxed">
                      {item.text}
                    </p>
                    <div className="mt-6">
                      <SourceLink
                        name={item.sourceName}
                        url={item.sourceUrl}
                        dark
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeader
            label="Hành trình có đối chiếu"
            title="Mốc nào quan trọng, mốc đó có nguồn"
            description="Không dùng timeline kiểu kể chuyện suông. Các mốc bên dưới đều có liên kết chứng minh."
          />

          <div className="relative mt-14">
            <div className="absolute left-5 sm:left-1/2 top-0 bottom-0 w-px bg-primary/20 sm:-translate-x-px" />

            {timeline.map((item, i) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative flex items-start gap-6 mb-10 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
              >
                <div
                  className={`hidden sm:block sm:w-1/2 ${i % 2 === 0 ? "text-right pr-10" : "text-left pl-10"
                    }`}
                >
                  <p className="text-5xl font-extrabold text-primary/20">
                    {item.year}
                  </p>
                </div>

                <div className="absolute left-5 sm:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-cream -translate-x-1/2 mt-8 z-10" />

                <div
                  className={`ml-12 sm:ml-0 sm:w-1/2 ${i % 2 === 0 ? "sm:pl-10" : "sm:pr-10"
                    }`}
                >
                  <div className="rounded-3xl bg-white p-6 shadow-sm border border-black/5">
                    <p className="inline-flex text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                      {item.year}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-neutral">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 mt-3 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-5">
                      <SourceLink
                        name={item.sourceName}
                        url={item.sourceUrl}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 bg-neutral text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
              <Quote className="text-primary-light" size={34} />
            </div>

            <blockquote className="text-2xl sm:text-4xl font-extrabold leading-relaxed">
              &ldquo;Một thương hiệu muốn đi xa không thể chỉ nói hay. Phải có
              sản phẩm thật, hình ảnh thật và bằng chứng thật.&rdquo;
            </blockquote>

            <p className="text-gray-400 mt-6 font-medium">
              — Tinh thần Ăn Cùng Bà Tuyết
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-bold uppercase tracking-wider text-sm">
              Tiếp tục khám phá
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral mt-4 leading-tight">
              Xem sản phẩm và quy trình phía sau thương hiệu.
            </h2>

            <p className="text-gray-500 mt-5 leading-relaxed">
              Trang giới thiệu tạo niềm tin, nhưng trang sản phẩm và quy trình
              sản xuất mới là nơi khách hàng ra quyết định.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-9">
              <Link
                href="/quy-trinh"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Xem quy trình sản xuất <ArrowRight size={18} />
              </Link>

              <Link
                href="/san-pham"
                className="inline-flex items-center gap-2 bg-gray-100 text-neutral px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Xem sản phẩm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}