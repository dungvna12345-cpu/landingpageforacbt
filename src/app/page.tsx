"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Factory,
  TrendingUp,
  Sparkles,
  Users,
  Play,
  CheckCircle2,
  ShoppingBag,
  Star,
  Leaf,
  Truck,
  Clock3,
  BadgeCheck,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

type Product = {
  id?: string | number;
  slug?: string;
  name?: string;
  image?: string;
  category?: string;
  categoryLabel?: string;
  tagline?: string;
  priceRange?: string;
  price?: string;
};

type HeroProduct = Product & {
  orbitImage?: string;
  purchaseUrl?: string;
  proof?: string;
  facts?: string[];
  stats?: { label: string; value: string }[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function MagneticGlowCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(249,115,22,0.22), transparent 32%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ==========================================
// 1. HERO SECTION - NHÂN VẬT + SẢN PHẨM BAY
// ==========================================
const HERO_CHARACTER_IMAGE = "/hero/ba-tuyet-character.png";

const showcaseHeroProductsFallback: HeroProduct[] = [
  {
    slug: "chan-ga-rut-xuong",
    category: "chan-ga",
    name: "Chân Gà Rút Xương",
    tagline:
      "Giòn sần sật, đậm đà vị cay tê, hợp gu ăn vặt cay ngon.",
    price: "89.000đ",
    priceRange: "45.000đ - 189.000đ",
    image: "/hero/chan-ga-plate.png",
    orbitImage: "/hero/chan-ga-plate.png",
    purchaseUrl: "https://shopee.vn/nmtvlog99",
    proof: "Hồ sơ sản phẩm, thông tin bao bì và quy trình kiểm soát chất lượng.",
    stats: [{ label: "Đơn đã bán", value: "2.000.000+" }],
    facts: ["Chủ lực", "Vị cay đậm", "Có hồ sơ kiểm định"],
  },
  {
    slug: "chan-ga-ba-tuyet",
    category: "chan-ga",
    name: "Chân Gà Bà Tuyết",
    tagline:
      "Bao bì nổi bật, nhận diện mạnh, hợp làm visual chính trên trang chủ.",
    price: "Liên hệ",
    priceRange: "Theo combo",
    image: "/hero/chan-ga-poster.png",
    orbitImage: "/hero/chan-ga-poster.png",
    purchaseUrl: "https://shopee.vn/nmtvlog99",
    proof: "Minh chứng bằng bao bì, hình ảnh sản phẩm và nội dung truyền thông.",
    stats: [{ label: "Sản phẩm", value: "Nổi bật" }],
    facts: ["Bao bì mạnh", "Dễ nhận diện", "Hợp hero banner"],
  },
  {
    slug: "dui-ga-pho-mai",
    category: "dui-ga",
    name: "Đùi Gà Phô Mai",
    tagline:
      "Vị béo thơm, màu sắc bắt mắt, phù hợp làm sản phẩm bay quanh nhân vật.",
    price: "Liên hệ",
    priceRange: "Theo hũ",
    image: "/hero/dui-ga-pho-mai.png",
    orbitImage: "/hero/dui-ga-pho-mai.png",
    purchaseUrl: "https://shopee.vn/nmtvlog99",
    proof: "Thông tin in trên bao bì và hồ sơ sản phẩm.",
    stats: [{ label: "Dạng", value: "Hũ tiện lợi" }],
    facts: ["Vị phô mai", "Đóng hũ", "Visual nổi bật"],
  },
  {
    slug: "tam-cay",
    category: "tam-cay",
    name: "Tăm Cay Bà Tuyết",
    tagline:
      "Cay đã miệng, bao bì rực lửa, hợp phong cách trẻ và viral.",
    price: "35.000đ",
    priceRange: "15.000đ - 99.000đ",
    image: "/hero/tam-cay-pack.png",
    orbitImage: "/hero/tam-cay-pack.png",
    purchaseUrl: "https://shopee.vn/nmtvlog99",
    proof: "Hồ sơ sản phẩm, hình ảnh bao bì và thông tin bán hàng.",
    stats: [{ label: "Đơn đã bán", value: "1.500.000+" }],
    facts: ["Cay mạnh", "Bao bì lửa", "Dễ viral"],
  },
  {
    slug: "banh-trang-rong-bien",
    category: "banh-trang",
    name: "Snack Bánh Tráng Vị Rong Biển",
    tagline:
      "Giòn thơm, vị rong biển dễ ăn, hình ảnh bao bì sáng và sạch.",
    price: "29.000đ",
    priceRange: "12.000đ - 79.000đ",
    image: "/hero/banh-trang-rong-bien.png",
    orbitImage: "/hero/banh-trang-rong-bien.png",
    purchaseUrl: "https://shopee.vn/nmtvlog99",
    proof: "Thông tin bao bì, hồ sơ sản phẩm và quy cách đóng gói.",
    stats: [{ label: "Đơn đã bán", value: "800.000+" }],
    facts: ["Giòn thơm", "Vị rong biển", "Bao bì sạch"],
  },
];

const orbitSlots = [
  { x: "9%", y: "16%", size: 132, delay: 0, side: "left" },
  { x: "83%", y: "17%", size: 132, delay: 0.18, side: "right" },
  { x: "3%", y: "50%", size: 164, delay: 0.36, side: "left" },
  { x: "90%", y: "52%", size: 150, delay: 0.54, side: "right" },
  { x: "23%", y: "78%", size: 132, delay: 0.72, side: "left" },
  { x: "74%", y: "78%", size: 132, delay: 0.9, side: "right" },
];

function HeroSection() {
  const [products, setProducts] = useState<HeroProduct[]>(
    showcaseHeroProductsFallback
  );
  const [activeProduct, setActiveProduct] = useState<HeroProduct>(
    showcaseHeroProductsFallback[0]
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mergedProducts = showcaseHeroProductsFallback.map(
            (fallback) => {
              const matched = data.find((p: HeroProduct) => {
                const bySlug = p.slug && p.slug === fallback.slug;
                const byCategory = p.category && p.category === fallback.category;
                const byName =
                  p.name &&
                  fallback.name &&
                  p.name.toLowerCase().includes(fallback.name.toLowerCase());

                return bySlug || byCategory || byName;
              });

              return {
                ...fallback,
                ...(matched || {}),
                image: fallback.image,
                orbitImage: fallback.orbitImage,
                tagline: matched?.tagline || fallback.tagline,
                price: matched?.price || fallback.price,
                priceRange: matched?.priceRange || fallback.priceRange,
                purchaseUrl: matched?.purchaseUrl || fallback.purchaseUrl,
                proof: matched?.proof || fallback.proof,
                facts: matched?.facts || fallback.facts,
              };
            }
          );

          setProducts(mergedProducts);
          setActiveProduct(mergedProducts[0]);
          setLoading(false);
          return;
        }

        setProducts(showcaseHeroProductsFallback);
        setActiveProduct(showcaseHeroProductsFallback[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load hero products from DB", err);
        setProducts(showcaseHeroProductsFallback);
        setActiveProduct(showcaseHeroProductsFallback[0]);
        setLoading(false);
      });
  }, []);

  const productSlots = useMemo(() => {
    return products.slice(0, 6).map((product, index) => ({
      ...product,
      _slot: orbitSlots[index % orbitSlots.length],
    }));
  }, [products]);

  const activeTheme = useMemo(() => {
    const key = `${activeProduct?.category || ""} ${activeProduct?.slug || ""
      }`;

    if (key.includes("tam-cay")) {
      return {
        glow: "rgba(239,68,68,0.34)",
        gradient: "from-red-600 via-orange-500 to-red-700",
        accent: "text-red-300",
        badge: "bg-red-500",
        border: "border-red-400/30",
        shadow: "shadow-red-500/25",
      };
    }

    if (key.includes("banh-trang")) {
      return {
        glow: "rgba(245,158,11,0.34)",
        gradient: "from-amber-500 via-yellow-400 to-orange-500",
        accent: "text-amber-300",
        badge: "bg-amber-500",
        border: "border-amber-400/30",
        shadow: "shadow-amber-500/25",
      };
    }

    return {
      glow: "rgba(249,115,22,0.36)",
      gradient: "from-orange-500 via-amber-400 to-orange-600",
      accent: "text-orange-300",
      badge: "bg-orange-500",
      border: "border-orange-400/30",
      shadow: "shadow-orange-500/25",
    };
  }, [activeProduct]);

  const salesCount = useMemo(() => {
    if (activeProduct?.stats && Array.isArray(activeProduct.stats)) {
      const sale = activeProduct.stats.find(
        (s) =>
          s.label === "Đơn đã bán" ||
          s.label === "Đơn thành công" ||
          s.label === "Sản phẩm" ||
          s.label === "Dạng"
      );

      if (sale) return sale.value;
    }

    return "Đang cập nhật";
  }, [activeProduct]);

  const activeFacts = Array.isArray(activeProduct?.facts)
    ? activeProduct.facts
    : ["Có hồ sơ sản phẩm", "Nguồn gốc rõ ràng", "Đóng gói chỉn chu"];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#031018] pt-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-12%] top-[-18%] h-[620px] w-[620px] rounded-full blur-[150px] transition-all duration-700"
          style={{ backgroundColor: activeTheme.glow }}
        />
        <div className="absolute bottom-[-18%] right-[-10%] h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#031018_78%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-20 sm:px-6 lg:grid-cols-[0.88fr_1.12fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-orange-300 shadow-[0_0_30px_rgba(249,115,22,0.15)] backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-amber-300" />
            Trải nghiệm sản phẩm tương tác
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-[5.6rem]"
          >
            Muốn ăn vặt
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.22)]">
              Thì phải ăn cùng Bà Tuyết
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl text-base font-medium leading-8 text-slate-300 sm:text-lg"
          >
            “ Yêu thương và niềm tin là chìa khóa sẽ mở ra cánh cửa hạnh phúc ”
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid max-w-xl grid-cols-3 gap-3"
          >
            {[
              { label: "Sản phẩm", value: `${productSlots.length}+` },
              { label: "An Toàn", value: "Bảo hiểm PVI" },
              { label: "Quy mô", value: "3300m2" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/5 bg-white/[0.04] p-4 backdrop-blur-xl transition hover:bg-white/[0.07]"
              >
                <p className="text-xl font-black text-white sm:text-2xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 sm:text-xs">
                  {item.label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/san-pham"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-sm font-black text-white shadow-[0_12px_40px_rgba(249,115,22,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(249,115,22,0.45)]"
            >
              <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
              <span className="relative">Khám phá menu</span>
              <ArrowRight
                size={18}
                className="relative transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href={activeProduct?.purchaseUrl || "https://shopee.vn/nmtvlog99"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-8 py-4 text-sm font-black text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
            >
              Mua sản phẩm đang chọn
              <ShoppingBag size={17} />
            </a>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative mx-auto min-h-[500px] w-full max-w-[820px] lg:min-h-[600px]">
            <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[56%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-300/15" />
            <div
              className={`absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${activeTheme.gradient} opacity-20 blur-[80px] transition-all duration-500`}
            />

            <div className="absolute left-1/2 top-2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 backdrop-blur-xl">
              {loading ? "Đang lấy sản phẩm..." : "Hover vào sản phẩm để xem"}
            </div>

            <div className="pointer-events-none absolute left-1/2 top-[50%] z-20 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="absolute bottom-4 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-black/45 blur-2xl" />
                <div className="absolute inset-x-8 bottom-16 h-72 rounded-full bg-orange-400/10 blur-[55px]" />
                <img
                  src={HERO_CHARACTER_IMAGE}
                  alt="Nhân vật Bà Tuyết"
                  className="relative z-10 h-[380px] w-auto object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.55)] sm:h-[460px] lg:h-[500px]"
                />
              </motion.div>
            </div>

            {productSlots.map((product, index) => {
              const slot = product._slot;
              const isActive =
                (activeProduct?.slug ||
                  activeProduct?.id ||
                  activeProduct?.name) ===
                (product.slug || product.id || product.name);

              return (
                <div
                  key={product.id || product.slug || product.name || index}
                  className="absolute z-30"
                  style={{
                    left: slot.x,
                    top: slot.y,
                    width: `clamp(86px, ${slot.size / 7}vw, ${slot.size}px)`,
                  }}
                >
                  <motion.div
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setActiveProduct(product)}
                    onFocus={() => setActiveProduct(product)}
                    onClick={() => setActiveProduct(product)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setActiveProduct(product);
                      }
                    }}
                    initial={{ opacity: 0, scale: 0.72, y: 24 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -13, 0],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      opacity: { duration: 0.45, delay: slot.delay },
                      scale: { duration: 0.45, delay: slot.delay },
                      y: {
                        duration: 4.2 + slot.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 5 + slot.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className={`group relative cursor-pointer outline-none transition-all duration-300 ${isActive ? "z-50 scale-110" : "hover:z-50 hover:scale-110"
                      }`}
                  >
                    <div
                      className={`relative rounded-[1.8rem] border bg-white/[0.08] p-2 shadow-2xl backdrop-blur-xl transition-all duration-300 ${isActive
                        ? `${activeTheme.border} ${activeTheme.shadow} shadow-2xl`
                        : "border-white/10 shadow-black/30 group-hover:border-orange-300/35"
                        }`}
                    >
                      <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-br from-white/18 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <img
                        src={product.orbitImage || product.image}
                        alt={product.name || "Sản phẩm"}
                        className="relative z-10 aspect-square w-full object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-110"
                      />

                      {isActive && (
                        <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                          <CheckCircle2 size={16} />
                        </div>
                      )}
                    </div>

                    <div
                      className={`pointer-events-none absolute top-1/2 hidden w-60 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#06121a]/95 p-4 text-left opacity-0 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 group-hover:opacity-100 lg:block ${slot.side === "left"
                        ? "left-full ml-3"
                        : "right-full mr-3"
                        }`}
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-300">
                        Sản phẩm
                      </p>
                      <h3 className="mt-1 text-base font-black text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-300">
                        {product.tagline}
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                        <span className="text-xs font-bold text-slate-400">
                          Giá từ
                        </span>
                        <span className="text-sm font-black text-amber-300">
                          {product.priceRange || product.price || "Liên hệ"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="w-[min(94%,590px)] z-30 mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={
                  activeProduct?.slug || activeProduct?.id || activeProduct?.name
                }
                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -14, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#06121a]/88 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="hidden h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-white/[0.08] p-2 sm:block">
                    <img
                      src={activeProduct?.orbitImage || activeProduct?.image}
                      alt={activeProduct?.name || "Sản phẩm"}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full ${activeTheme.badge} px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white`}
                      >
                        {salesCount}
                      </span>
                      <span className="rounded-full bg-emerald-500 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                        Minh chứng rõ ràng
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="text-2xl font-black tracking-[-0.04em] text-white">
                          {activeProduct?.name}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-300">
                          {activeProduct?.tagline}
                        </p>
                      </div>

                      <div className="shrink-0 text-left sm:text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                          Giá từ
                        </p>
                        <p className={`text-xl font-black ${activeTheme.accent}`}>
                          {activeProduct?.priceRange ||
                            activeProduct?.price ||
                            "Liên hệ"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeFacts.slice(0, 3).map((fact) => (
                        <span
                          key={fact}
                          className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold text-slate-300"
                        >
                          {fact}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                      <p className="text-xs leading-5 text-slate-300">
                        <span className="font-black text-white">
                          Minh chứng:
                        </span>{" "}
                        {activeProduct?.proof ||
                          "Hồ sơ sản phẩm, thông tin bao bì, chứng nhận chất lượng."}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      <a
                        href={
                          activeProduct?.purchaseUrl ||
                          "https://shopee.vn/nmtvlog99"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff4d00] to-[#ff7a00] px-4 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/15 transition hover:-translate-y-0.5 hover:shadow-orange-500/30"
                      >
                        <ShoppingBag size={15} />
                        Đặt Shopee
                      </a>

                      <a
                        href="https://www.tiktok.com/@batuyethanhvi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
                      >
                        <Play size={13} className="fill-white" />
                        TikTok Shop
                      </a>

                      <Link
                        href={
                          activeProduct?.slug
                            ? `/san-pham/${activeProduct.slug}`
                            : "/san-pham"
                        }
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
                      >
                        Xem chi tiết
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 2. STATS SECTION
// ==========================================
function StatsSection() {
  const stats: {
    value: string;
    label: string;
    desc: string;
    icon: LucideIcon;
  }[] = [
      {
        value: "3.2M+",
        label: "Followers TikTok",
        desc: "Cộng đồng yêu thích ăn vặt",
        icon: Users,
      },
      {
        value: "6.2M+",
        label: "Đơn thành công",
        desc: "Minh chứng bằng doanh số thật",
        icon: TrendingUp,
      },
      {
        value: "3.300m²",
        label: "Nhà máy chuẩn",
        desc: "Quy trình sản xuất khép kín",
        icon: Factory,
      },
      {
        value: "100%",
        label: "Bảo hiểm PVI",
        desc: "Bảo chứng an tâm cho khách hàng",
        icon: ShieldCheck,
      },
    ];

  return (
    <section className="relative z-20 -mt-16 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white bg-white/85 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.13)] backdrop-blur-2xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
                className="group rounded-[2rem] border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_20px_50px_rgba(249,115,22,0.12)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <p className="text-4xl font-black tracking-[-0.05em] text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-black uppercase tracking-wider text-slate-800">
                  {stat.label}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 3. FEATURED PRODUCTS
// ==========================================
function ProductHoverCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const href = `/san-pham/${product.slug || product.id || ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={href} className="group block h-full">
        <MagneticGlowCard className="h-full rounded-[2.4rem] border border-slate-100 bg-white p-3 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_35px_90px_rgba(249,115,22,0.18)]">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-100">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={
                  product.image ||
                  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&auto=format&fit=crop&q=85"
                }
                alt={product.name || "Sản phẩm"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-900 backdrop-blur-xl">
                {product.categoryLabel || "Ăn vặt"}
              </span>
              <span className="rounded-full bg-orange-500 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                Hot
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="flex items-center justify-between rounded-2xl border border-white/15 bg-white/15 p-3 text-white backdrop-blur-xl">
                <span className="text-sm font-black">Xem chi tiết</span>
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>

          <div className="px-4 pb-4 pt-5">
            <div className="mb-3 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>

            <h3 className="line-clamp-1 text-xl font-black tracking-[-0.03em] text-slate-950 transition-colors group-hover:text-orange-500">
              {product.name || "Sản phẩm nổi bật"}
            </h3>

            <p className="mt-2 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
              {product.tagline ||
                "Món ăn vặt được tuyển chọn kỹ, chuẩn vị, đóng gói đẹp và an toàn."}
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Giá từ
                </p>
                <p className="text-lg font-black text-slate-950">
                  {product.priceRange || product.price || "Liên hệ"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-all duration-300 group-hover:bg-orange-500">
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </MagneticGlowCard>
      </Link>
    </motion.div>
  );
}

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed", err);
        setLoading(false);
      });
  }, []);

  const displayProducts = useMemo(() => {
    return featuredProducts
      .filter((p) => p.category !== "khac")
      .slice(0, 3);
  }, [featuredProducts]);

  return (
    <section className="relative overflow-hidden bg-[#fbfaf7] py-32">
      <div className="absolute left-0 top-20 h-80 w-80 rounded-full bg-orange-200/35 blur-[100px]" />
      <div className="absolute bottom-10 right-0 h-96 w-96 rounded-full bg-amber-200/40 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            label="Sản phẩm nổi bật"
            title="Tuyệt phẩm ăn vặt"
            description="Những món bán chạy, dễ nghiện, đóng gói đẹp và giữ trọn vị ngon đặc trưng."
          />

          <Link
            href="/san-pham"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-black text-orange-600 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-400 hover:shadow-[0_16px_40px_rgba(249,115,22,0.14)]"
          >
            Xem tất cả menu
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 md:grid-cols-3"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[470px] animate-pulse rounded-[2.4rem] bg-white shadow-sm"
                />
              ))}
            </motion.div>
          ) : displayProducts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-[2rem] border border-dashed border-slate-200 bg-white p-12 text-center"
            >
              <p className="text-slate-500">Chưa có sản phẩm nổi bật.</p>
            </motion.div>
          ) : (
            <motion.div
              key="products"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-8 md:grid-cols-3"
            >
              {displayProducts.map((product, i) => (
                <ProductHoverCard
                  key={product.id || product.slug || i}
                  product={product}
                  index={i}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ==========================================
// 4. WHY CHOOSE US - BENTO GRID
// ==========================================
function WhyChooseUs() {
  const bentoItems: {
    colSpan: string;
    icon: LucideIcon;
    title: string;
    desc: string;
    className: string;
    iconClass: string;
    large?: boolean;
    image: string;
  }[] = [
      {
        colSpan: "lg:col-span-2 lg:row-span-2",
        icon: Factory,
        title: "Nhà máy chuẩn HACCP 3.300m²",
        desc: "Không gian sản xuất lớn, quy trình kiểm soát chất lượng khép kín, tập trung vào độ sạch, độ ổn định và sự an tâm.",
        className: "text-white",
        iconClass: "text-orange-400",
        large: true,
        image: "/bento/bento-factory.png",
      },
      {
        colSpan: "lg:col-span-1",
        icon: ShieldCheck,
        title: "Bảo hiểm PVI",
        desc: "Gia tăng niềm tin bằng cam kết bảo vệ khách hàng.",
        className: "text-white",
        iconClass: "text-orange-400",
        image: "/bento/bento-insurance.png",
      },
      {
        colSpan: "lg:col-span-1",
        icon: Leaf,
        title: "Nguyên liệu bản địa",
        desc: "Tập trung vào nguồn nguyên liệu rõ ràng, gần gũi và dễ kiểm soát.",
        className: "text-white",
        iconClass: "text-orange-400",
        image: "/bento/bento-ingredients.png",
      },
      {
        colSpan: "lg:col-span-2",
        icon: TrendingUp,
        title: "Top ngành ăn vặt trên TikTok Shop",
        desc: "Lượng đơn lớn, cộng đồng mạnh và khả năng bán hàng qua livestream là lợi thế thương hiệu nổi bật.",
        className: "text-white",
        iconClass: "text-orange-400",
        image: "/bento/bento-tiktok.png",
      },
    ];

  return (
    <section className="bg-[#fbfaf7] py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          label="Lý do chọn chúng tôi"
          title="Không chỉ ngon, mà còn đáng tin"
          description="Ăn Cùng Bà Tuyết mang lại trải nghiệm ẩm thực chất lượng hàng đầu bằng quy trình sạch, an toàn vệ sinh và cam kết vững chắc vì sức khỏe người ăn."
        />

        <div className="mt-16 grid auto-rows-[230px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bentoItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`${item.colSpan} ${item.className} bg-slate-900 group relative overflow-hidden rounded-[2.4rem] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.18)]`}
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                />

                {/* Dark Gradient Overlay for perfect readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25 transition-opacity duration-300 z-10" />

                {item.large && (
                  <div className="absolute right-8 top-8 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-orange-300 z-20 backdrop-blur-md">
                    Chất lượng hàng đầu
                  </div>
                )}

                <div className="relative z-20 flex h-full flex-col justify-between">
                  <Icon
                    size={item.large ? 46 : 34}
                    className={item.iconClass}
                    strokeWidth={1.8}
                  />

                  <div>
                    <h3
                      className={`font-black tracking-[-0.04em] ${item.large ? "text-4xl" : "text-2xl"
                        }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-xl leading-7 ${item.large ? "text-slate-300" : "text-slate-200"
                        }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 5. PROCESS RAIL
// ==========================================
function ProcessSection() {
  const steps = [
    {
      title: "Chọn nguyên liệu",
      desc: "Ưu tiên nguồn rõ ràng, kiểm tra đầu vào trước khi sản xuất.",
      icon: Leaf,
    },
    {
      title: "Sản xuất sạch",
      desc: "Kiểm soát quy trình, hạn chế rủi ro và giữ chất lượng ổn định.",
      icon: Factory,
    },
    {
      title: "Đóng gói chuẩn",
      desc: "Bao bì gọn, đẹp, dễ vận chuyển và giữ vị tốt hơn.",
      icon: PackageCheck,
    },
    {
      title: "Giao toàn quốc",
      desc: "Kết nối sàn thương mại điện tử để khách đặt hàng nhanh.",
      icon: Truck,
    },
  ];

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-orange-600">
              <Clock3 size={14} />
              Quy trình
            </p>

            <h2 className="text-4xl font-black tracking-[-0.05em] text-slate-950 sm:text-5xl">
              Từ nguyên liệu đến tay khách
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-500">
              Mỗi sản phẩm từ khi chọn nguyên liệu đến khi đóng gói đều được
              kiểm soát để giữ chất lượng ổn định và an toàn hơn.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-8 bottom-8 hidden w-px bg-gradient-to-b from-orange-500 via-orange-200 to-transparent md:block" />

            <div className="space-y-5">
              {steps.map((step, i) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.08 }}
                    className="relative rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1 hover:border-orange-200"
                  >
                    <div className="flex gap-5">
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-[0_14px_40px_rgba(249,115,22,0.28)]">
                        <Icon size={25} />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-orange-500">
                          Bước 0{i + 1}
                        </p>
                        <h3 className="mt-1 text-2xl font-black tracking-[-0.04em] text-slate-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 leading-7 text-slate-500">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. BRAND STORY
// ==========================================
function BrandStory() {
  const milestones = [
    {
      year: "2022",
      event:
        "Bắt đầu từ đam mê ẩm thực và những nội dung gần gũi với cộng đồng.",
    },
    {
      year: "2023",
      event:
        "Phát triển thương hiệu Ăn Cùng Bà Tuyết với định hướng đồ ăn vặt sạch.",
    },
    {
      year: "2024",
      event:
        "Mở rộng trên TikTok Shop, xây dựng cộng đồng khách hàng trung thành.",
    },
    {
      year: "2025",
      event: "Đẩy mạnh nhà máy, quy trình và tiêu chuẩn hóa sản phẩm.",
    },
  ];

  return (
    <section
      id="brand-story"
      className="relative overflow-hidden bg-[#031018] py-32 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-orange-500/15 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-orange-300">
            <BadgeCheck size={14} />
            Brand story
          </span>

          <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">
            Từ món ăn quen thuộc đến thương hiệu có cá tính riêng
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Hành trình mang thương hiệu Ăn Cùng Bà Tuyết lan tỏa đến mọi thế
            hệ, lưu giữ hương vị truyền thống kết hợp quy trình sản xuất hiện
            đại.
          </p>

          <Link
            href="/gioi-thieu"
            className="group mt-8 inline-flex items-center gap-3 border-b-2 border-orange-500 pb-1 text-sm font-black text-white transition-colors hover:text-orange-300"
          >
            Đọc toàn bộ câu chuyện
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/60 via-white/10 to-transparent" />

          <div className="space-y-8 pl-10">
            {milestones.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-90px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[42px] top-8 h-4 w-4 rounded-full border-4 border-[#031018] bg-orange-500 shadow-[0_0_24px_rgba(249,115,22,0.8)]" />

                <div
                  className={`rounded-[2.2rem] border p-8 transition-all duration-300 hover:-translate-y-1 ${i === milestones.length - 1
                    ? "border-orange-400/35 bg-orange-500/10"
                    : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08]"
                    }`}
                >
                  <p className="text-6xl font-black tracking-[-0.08em] text-white/15">
                    {item.year}
                  </p>
                  <p className="mt-4 text-lg font-semibold leading-8 text-slate-200">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. CTA SECTION
// ==========================================
function CTASection() {
  return (
    <section className="bg-[#031018] px-4 py-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[3.2rem] bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 px-6 py-20 text-center shadow-[0_0_100px_rgba(249,115,22,0.35)] sm:px-16">
        <div className="absolute right-[-10%] top-[-40%] h-[520px] w-[520px] rounded-full bg-white/15 blur-[80px]" />
        <div className="absolute bottom-[-35%] left-[-8%] h-[420px] w-[420px] rounded-full bg-amber-200/25 blur-[70px]" />

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl">
            <Sparkles size={14} />
            Chốt đơn ngay
          </p>

          <h2 className="text-4xl font-black leading-tight tracking-[-0.05em] text-white sm:text-6xl">
            Thèm ăn vặt?
            <br />
            Đặt ngay cho nóng.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base font-medium leading-8 text-white/90 sm:text-lg">
            Sản phẩm chính hãng, đóng gói đẹp, giao hàng toàn quốc qua các nền
            tảng quen thuộc.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://tiktok.com/@batuyethanhvi"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#031018] px-8 py-5 text-sm font-black text-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(3,16,24,0.25)]"
            >
              Mua qua TikTok Shop
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="https://shopee.vn/nmtvlog99"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-5 text-sm font-black text-orange-600 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)]"
            >
              Đặt hàng Shopee
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN EXPORT
// ==========================================
export default function HomePage() {
  return (
    <main className="antialiased selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <StatsSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ProcessSection />
      <BrandStory />
      <CTASection />
    </main>
  );
}