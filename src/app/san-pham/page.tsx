"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ChevronRight, 
  Award, 
  ShieldCheck, 
  Factory, 
  Loader, 
  AlertCircle, 
  Flame, 
  Star, 
  Sparkles, 
  ShoppingBag, 
  CheckCircle2, 
  TrendingUp, 
  Zap 
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

// Card component with interactive cursor light effect (Magnetic Glow)
function MagneticGlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden transition-all duration-500 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(249,115,22,0.18), transparent 32%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}

// Flame levels rendering
function FlameSpiceIndicator({ level }: { level: number }) {
  if (level === 0) return (
    <div className="flex items-center gap-1.5 bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold w-fit">
      <span className="text-[10px] uppercase tracking-wider">Không cay</span>
    </div>
  );
  return (
    <div className="flex items-center gap-1 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold w-fit">
      <span className="text-[10px] uppercase tracking-wider text-red-500">Cấp độ cay:</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame 
            key={i} 
            size={12} 
            className={i < level ? "text-red-500 fill-red-500" : "text-slate-200"} 
          />
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tất cả chủ lực 🍲" },
    { id: "chan-ga", label: "Chân Gà Rút Xương 🔥" },
    { id: "tam-cay", label: "Tăm Cay Hạng Nhất 🌶️" },
    { id: "banh-trang", label: "Bánh Tráng Giòn 🍘" },
    { id: "khac", label: "Ăn Vặt Khác 🍿" }
  ];

  const mainProducts = productsList.filter((p) => p.category !== "khac");
  const otherProductsList = productsList.filter((p) => p.category === "khac");

  const displayedProducts = activeCategory === "all"
    ? mainProducts
    : activeCategory === "khac"
      ? otherProductsList
      : mainProducts.filter((p) => p.category === activeCategory);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProductsList(data);
        } else {
          setProductsList([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

  // Helper properties extraction
  const getSpiceLevel = (product: any) => {
    const variants = Array.isArray(product.variants) ? product.variants : [];
    const levels = variants.map((v: any) => v.spiceLevel).filter((l: any) => l !== undefined);
    if (levels.length === 0) {
      if (product.category === "chan-ga") return 3;
      if (product.category === "tam-cay") return 3;
      if (product.category === "banh-trang") return 2;
      return 0;
    }
    return Math.max(...levels);
  };

  const getRating = (product: any) => {
    const stats = Array.isArray(product.stats) ? product.stats : [];
    const stat = stats.find((s: any) => s.label.includes("Đánh giá"));
    return stat ? stat.value : "4.8★";
  };

  const getSales = (product: any) => {
    const stats = Array.isArray(product.stats) ? product.stats : [];
    const stat = stats.find((s: any) => s.label.includes("Đơn đã bán") || s.label.includes("Đơn thành công"));
    return stat ? stat.value : "100.000+";
  };

  const getBadges = (product: any) => {
    if (product.category === "chan-ga") return "Best-Seller";
    if (product.category === "tam-cay") return "Cực Cay Tê";
    if (product.category === "banh-trang") return "Thơm Giòn";
    return "Mới";
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-[#04111d] text-white relative overflow-hidden">
        {/* Spicy Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] rounded-full bg-orange-600/20 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] rounded-full bg-red-600/15 blur-[130px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 bg-orange-500/25 border border-orange-500/30 text-orange-400 text-xs font-black px-4.5 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_25px_rgba(249,115,22,0.15)]">
            <Sparkles size={12} className="animate-pulse text-amber-400" />
            Thế giới ăn vặt quốc dân
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
            Ngon đỉnh cao,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-red-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.2)]">
              Cay tê mê vị!
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-medium">
            Mỗi gói đồ ăn vặt Bà Tuyết là một kiệt tác ẩm thực đường phố — tuyển chọn nguyên liệu tươi sạch, ướp gia vị tự nhiên độc bản, cam kết an toàn sạch sẽ tuyệt đối.
          </p>
          
          {/* Trust Badges in Hero */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 pt-6 text-[11px] font-bold text-slate-400 border-t border-white/10 max-w-xl mx-auto">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <ShieldCheck size={14} className="text-orange-500" />
              <span>Bảo hiểm trách nhiệm PVI 10 tỷ</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Factory size={14} className="text-orange-500" />
              <span>Nhà máy 3.300m² đạt chuẩn HACCP</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Award size={14} className="text-orange-500" />
              <span>Top 1 TikTok Shop Ngành Ăn Vặt</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Selector */}
      <section className="pt-12 pb-6 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-orange-50/50 p-2 rounded-3xl border border-orange-100/40 w-fit mx-auto shadow-sm backdrop-blur-sm">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-black transition-all duration-300 select-none ${
                activeCategory === cat.id
                  ? "text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:text-orange-500 hover:bg-orange-50/60"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Products List */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader className="animate-spin text-orange-500" size={40} />
            <p className="text-xs font-semibold text-slate-400">Đang tải sản phẩm siêu ngon...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-400 space-y-3 bg-white rounded-[2.5rem] border border-orange-100/30 shadow-sm">
            <AlertCircle size={48} className="mx-auto text-orange-300" />
            <p className="text-sm font-bold text-slate-650">Chưa có sản phẩm nào được hiển thị trong mục này</p>
          </div>
        ) : (
          <div className="space-y-10">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((product, i) => {
                const rating = getRating(product);
                const sales = getSales(product);
                const spiceLevel = getSpiceLevel(product);
                const badgeText = getBadges(product);

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <MagneticGlowCard
                      className="group relative rounded-[2.5rem] overflow-hidden border border-orange-100/40 hover:border-orange-200/80 bg-white hover:shadow-[0_24px_50px_rgba(249,115,22,0.12)] hover:-translate-y-1 transition-all duration-500"
                    >
                      <div className="grid md:grid-cols-12 gap-0 items-stretch">
                        {/* Text Details Column */}
                        <div className="p-8 sm:p-12 md:col-span-7 flex flex-col justify-center space-y-5">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="bg-orange-500/10 text-orange-600 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                              {product.categoryLabel}
                            </span>
                            <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                              {badgeText}
                            </span>
                            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full text-xs font-extrabold">
                              <Star size={12} fill="currentColor" />
                              <span>{rating} ({sales} đã bán)</span>
                            </div>
                          </div>

                          <h2 className="text-2xl sm:text-4.5xl font-black text-slate-900 tracking-tight group-hover:text-orange-500 transition-colors leading-tight">
                            {product.name}
                          </h2>
                          <p className="text-lg sm:text-xl text-orange-500 font-extrabold leading-snug">
                            {product.tagline}
                          </p>
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                            {product.description}
                          </p>

                          {/* Ingredient & Trust Points */}
                          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-slate-600 pt-1">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              <span>Không phẩm màu độc hại</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              <span>100% Sạch tự nhiên</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle2 size={14} className="text-emerald-500" />
                              <span>Chuẩn kiểm định ATTP</span>
                            </div>
                          </div>

                          {/* Spice Level Indicator */}
                          <div className="pt-1">
                            <FlameSpiceIndicator level={spiceLevel} />
                          </div>

                          <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-slate-100">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Giá từ</p>
                              <span className="text-xl sm:text-2xl font-black text-slate-950">
                                {product.priceRange || product.price}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2.5 sm:ml-auto">
                              <Link
                                href={`/san-pham/${product.slug}`}
                                className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-slate-700 hover:text-orange-500 transition-all bg-slate-100 hover:bg-orange-50/50 px-5 py-3 rounded-2xl border border-slate-200/60"
                              >
                                <span>Xem chi tiết</span> 
                                <ChevronRight size={14} />
                              </Link>
                              {product.purchaseUrl && (
                                <a
                                  href={product.purchaseUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/btn inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 transition-all px-6 py-3 rounded-2xl shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 hover:-translate-y-0.5 animate-pulse-subtle"
                                >
                                  <ShoppingBag size={14} />
                                  <span>Đặt Mua Ngay</span>
                                  <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Image Column */}
                        <div className="aspect-[4/3] md:aspect-auto md:col-span-5 relative overflow-hidden bg-orange-50/20 flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-slate-100">
                          <div className="w-full h-full min-h-[260px] md:min-h-[340px] rounded-[2rem] overflow-hidden shadow-lg relative border border-slate-150 bg-white">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Visual Spicy overlay filter on card image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-orange-950/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </div>
                      </div>
                    </MagneticGlowCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Accessories / Other Products List */}
      {activeCategory === "all" && otherProductsList.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader 
              label="Thế giới ăn vặt" 
              title="Sản phẩm đặc sắc khác từ Bà Tuyết" 
              description="Đa dạng hương vị với chất lượng nguyên liệu đạt chuẩn an toàn vệ sinh thực phẩm." 
            />
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
              {otherProductsList.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group bg-[#FDFBF7] hover:bg-white border border-orange-100/30 hover:border-orange-200/60 rounded-[2rem] p-4 text-center hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1 transition-all duration-350 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/san-pham/${product.slug}`} className="block">
                      <div className="aspect-square w-full rounded-2xl overflow-hidden mb-3 border border-slate-100 relative bg-white">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1 text-amber-500 text-[10px] font-black">
                        <Star size={10} fill="currentColor" />
                        <span>4.8</span>
                      </div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">{product.name}</h3>
                    </Link>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-orange-500 font-black text-xs sm:text-sm">{product.price}</p>
                    {product.purchaseUrl && (
                      <a
                        href={product.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1 text-[10px] font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 transition px-2.5 py-2 rounded-xl shadow-sm shadow-orange-500/10"
                      >
                        <ShoppingBag size={10} />
                        <span>Mua ngay</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-14">
              <Link 
                href="/san-pham/bo-suu-tap" 
                className="group inline-flex items-center gap-2 bg-slate-950 hover:bg-orange-500 hover:-translate-y-0.5 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all shadow"
              >
                <span>Xem tất cả bộ sưu tập</span> 
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Product Comparison Section */}
      {!loading && mainProducts.length > 0 && (
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <span className="text-orange-500 text-xs font-black uppercase tracking-wider">Lựa chọn thông thái</span>
            <h3 className="text-2.5xl sm:text-3.5xl font-black text-slate-900 tracking-tight">So sánh sản phẩm chủ lực</h3>
          </div>
          
          <div className="overflow-x-auto rounded-[2.5rem] border border-orange-100/40 shadow-sm bg-white">
            <table className="w-full text-sm text-slate-700">
              <thead>
                <tr className="border-b border-orange-50/80 bg-orange-50/20 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-5 px-6 text-left font-black text-slate-500">Tiêu chí</th>
                  {mainProducts.map((p) => (
                    <th key={p.id} className="py-5 px-6 text-center font-black text-slate-900 text-xs sm:text-sm">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50/30">
                {[
                  { label: "Giá bán từ", key: "price" },
                  { label: "Hương vị", values: mainProducts.map((p) => p.category === "chan-ga" ? "6 vị đa dạng" : p.category === "tam-cay" ? "6 vị đậm đà" : "4 vị giòn rụm") },
                  { label: "Độ cay chủ đạo", values: mainProducts.map((p) => p.category === "chan-ga" ? "Vị cay siêu cấp ớt hiểm" : p.category === "tam-cay" ? "Vị tiêu đen thơm nồng" : "Vị muối ớt truyền thống") },
                  { label: "Chất bảo quản", values: mainProducts.map(() => "Hoàn toàn không") },
                  { label: "Bảo hiểm trách nhiệm PVI", values: mainProducts.map(() => "100% Bảo hiểm") },
                  { label: "Chứng nhận an toàn", values: mainProducts.map(() => "HACCP + ATTP") },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-orange-50/10 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-550 text-xs sm:text-sm">{row.label}</td>
                    {row.key === "price"
                      ? mainProducts.map((p) => (
                          <td key={p.id} className="py-4 px-6 text-center font-black text-orange-500 text-xs sm:text-sm">{p.price}</td>
                        ))
                      : row.values?.map((v, vi) => (
                          <td key={vi} className="py-4 px-6 text-center text-slate-700 text-xs font-semibold">{v}</td>
                        ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
