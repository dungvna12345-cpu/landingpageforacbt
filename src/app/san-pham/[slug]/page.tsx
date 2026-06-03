"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Flame, 
  Leaf, 
  HelpCircle, 
  Loader, 
  Star, 
  ShoppingBag, 
  CheckCircle2, 
  Zap, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  Info,
  ThumbsUp,
  Sparkles
} from "lucide-react";

function SpiceLevel({ level }: { level: number }) {
  if (level === 0) return <span className="text-xs font-bold text-slate-400">Không cay 🧀</span>;
  return (
    <span className="inline-flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <Flame 
          key={i} 
          size={14} 
          className={i <= level ? "text-red-500 fill-red-500" : "text-slate-200"} 
        />
      ))}
      <span className="text-[10px] text-slate-500 font-bold ml-1">({level}/5)</span>
    </span>
  );
}

export default function ProductDetailPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const slug = params.slug;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [otherProducts, setOtherProducts] = useState<any[]>([]);

  // State for interactive variant selector
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  // State for interactive spice advisor
  const [userSpiceTolerance, setUserSpiceTolerance] = useState(3);

  // FOMO Counter
  const [recentBuyers, setRecentBuyers] = useState(128);

  useEffect(() => {
    // Simulate real-time buyer shifts slightly
    const interval = setInterval(() => {
      setRecentBuyers((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (slug) {
      // Fetch product detail
      fetch(`/api/products/slug/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setProduct(data);
            if (Array.isArray(data.variants) && data.variants.length > 0) {
              setSelectedFlavor(data.variants[0].name);
              setSelectedWeight(data.variants[0].weight);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load product", err);
          setLoading(false);
        });

      // Fetch other products
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setOtherProducts(data.filter((p: any) => p.slug !== slug));
          }
        })
        .catch((err) => console.error("Failed to load other products", err));
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
        <Loader className="animate-spin text-orange-500" size={40} />
        <p className="text-sm font-semibold text-slate-400 mt-2">Đang chuẩn bị trang sản phẩm cực ngon...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFBF7] pt-24">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Sản phẩm không tìm thấy</h1>
          <Link href="/san-pham" className="bg-orange-500 hover:bg-orange-650 text-white px-5 py-2.5 rounded-xl text-xs font-bold inline-block shadow">
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  // Parse Unique Flavors and Weights
  const uniqueFlavors = Array.from(new Set((product.variants as any[] || []).map((v: any) => v.name)));
  const uniqueWeights = Array.from(new Set((product.variants as any[] || []).map((v: any) => v.weight)));

  // Filter available weights for current selected flavor
  const availableWeightsForFlavor = (product.variants as any[] || [])
    .filter((v: any) => v.name === selectedFlavor)
    .map((v: any) => v.weight);

  // Active Variant object
  const activeVariant = Array.isArray(product.variants)
    ? product.variants.find((v: any) => v.name === selectedFlavor && v.weight === selectedWeight) || 
      product.variants.find((v: any) => v.name === selectedFlavor) ||
      product.variants[0]
    : null;

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavor(flavor);
    const weights = (product.variants as any[] || [])
      .filter((v: any) => v.name === flavor)
      .map((v: any) => v.weight);
    if (weights.length > 0) {
      // Keep selected weight if available, otherwise switch to first available
      if (!weights.includes(selectedWeight)) {
        setSelectedWeight(weights[0]);
      }
    }
  };

  const getIngredientEmoji = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes("ớt")) return "🌶️";
    if (lowercase.includes("tỏi")) return "🧄";
    if (lowercase.includes("sả")) return "🌿";
    if (lowercase.includes("gà")) return "🍗";
    if (lowercase.includes("dầu")) return "🧪";
    if (lowercase.includes("phô mai")) return "🧀";
    if (lowercase.includes("hành")) return "🧅";
    if (lowercase.includes("bột mì") || lowercase.includes("gạo")) return "🌾";
    if (lowercase.includes("bảo quản") || lowercase.includes("phẩm màu")) return "🛡️";
    return "✨";
  };

  // Spice tolerance filtration
  const recommendedVariants = Array.isArray(product.variants)
    ? product.variants.filter((v: any) => {
        const level = v.spiceLevel !== undefined ? v.spiceLevel : 0;
        if (userSpiceTolerance === 1) return level <= 1;
        if (userSpiceTolerance === 2) return level === 2;
        if (userSpiceTolerance === 3) return level === 3;
        return level > 3;
      })
    : [];

  const selectVariantFromAdvisor = (flavor: string, weight: string) => {
    setSelectedFlavor(flavor);
    setSelectedWeight(weight);
    
    // Smooth scroll to variant selector
    const el = document.getElementById("variant-selector");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen">
      {/* Hero - Split viewport */}
      <section className="relative min-h-[95vh] flex items-center bg-white border-b border-orange-100/50 py-16 sm:py-24 overflow-hidden">
        {/* Ambient Blur */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-orange-400 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-red-400 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <Link 
            href="/san-pham" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 text-xs sm:text-sm font-black mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> 
            <span>Danh sách sản phẩm</span>
          </Link>
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Details column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-orange-500/10 text-orange-600 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                  <Star size={11} fill="currentColor" />
                  <span>4.9 Đánh Giá Hạng Nhất</span>
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-xl sm:text-2xl text-orange-500 font-extrabold leading-snug">{product.tagline}</p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">{product.description}</p>
              
              {/* Dynamic FOMO banner */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 px-4 py-2.5 rounded-2xl text-xs font-bold animate-pulse-subtle">
                <TrendingUp size={14} className="text-red-500" />
                <span>🔥 {recentBuyers} lượt đặt mua trong 24 giờ qua! Sản phẩm đang được săn lùng cực mạnh.</span>
              </div>

              {/* Interactive Variant selector container */}
              {Array.isArray(product.variants) && product.variants.length > 0 && (
                <div id="variant-selector" className="p-6 rounded-[2rem] bg-orange-50/20 border border-orange-100/40 space-y-5 max-w-xl">
                  {/* Flavors Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">Chọn hương vị:</span>
                    <div className="flex flex-wrap gap-2">
                      {uniqueFlavors.map((flavor: any) => (
                        <button
                          key={flavor}
                          onClick={() => handleFlavorChange(flavor)}
                          className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                            selectedFlavor === flavor
                              ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10"
                              : "bg-white text-slate-700 border-slate-200 hover:border-orange-300"
                          }`}
                        >
                          {flavor}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weight Selector */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">Chọn trọng lượng:</span>
                    <div className="flex flex-wrap gap-2">
                      {uniqueWeights.map((weight: any) => {
                        const isAvailable = availableWeightsForFlavor.includes(weight);
                        return (
                          <button
                            key={weight}
                            disabled={!isAvailable}
                            onClick={() => setSelectedWeight(weight)}
                            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                              selectedWeight === weight
                                ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/10"
                                : isAvailable
                                ? "bg-white text-slate-700 border-slate-200 hover:border-orange-300"
                                : "bg-slate-100/80 text-slate-350 border-slate-150 cursor-not-allowed line-through"
                            }`}
                          >
                            {weight}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Variant Price & Spice Level display */}
                  {activeVariant && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-orange-50 shadow-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mức giá biến thể</p>
                        <span className="text-2xl font-black text-orange-500">{activeVariant.price}</span>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Độ cay</p>
                        <SpiceLevel level={activeVariant.spiceLevel !== undefined ? activeVariant.spiceLevel : 0} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Buying CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                {product.purchaseUrl && (
                  <a 
                    href={product.purchaseUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 text-white px-8 py-4.5 rounded-2xl font-black text-sm sm:text-base shadow-lg shadow-orange-500/15 hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 animate-pulse-subtle"
                  >
                    <ShoppingBag size={18} />
                    <span>Đặt Mua Shopee Mall</span> 
                  </a>
                )}
                <a 
                  href="https://tiktok.com/@batuyethanhvi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-8 py-4.5 rounded-2xl font-black text-sm sm:text-base transition-all hover:-translate-y-0.5 border border-white/10 shadow-md"
                >
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Mua Trên TikTok Shop</span>
                </a>
              </div>
            </motion.div>

            {/* Right Image column with Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.8, delay: 0.2 }} 
              className="lg:col-span-5 flex items-center justify-center relative py-8"
            >
              {/* Glowing backdrop */}
              <div className="absolute w-[350px] h-[350px] rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />

              {/* Main Image Wrapper */}
              <div className="relative w-full aspect-square max-w-[400px] rounded-[3rem] overflow-hidden border border-orange-100 shadow-2xl bg-white p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-[2.2rem]"
                />
              </div>

              {/* Floating Tags (Framer Motion) */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 -left-4 bg-white border border-orange-100 text-orange-650 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-xs font-black"
              >
                <Flame size={14} className="fill-red-500 text-red-500" />
                <span>Siêu Cay Ngon 🔥</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-12 -right-6 bg-white border border-orange-100 text-slate-800 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-xs font-black"
              >
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Chuẩn HACCP</span>
              </motion.div>

              <motion.div 
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-10 bg-white border border-orange-100 text-slate-800 px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-1.5 text-xs font-black"
              >
                <Zap size={14} className="text-amber-500 fill-amber-500 animate-pulse" />
                <span>Ship Hỏa Tốc 2h</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spice Tolerance Advisor Widget */}
      {Array.isArray(product.variants) && product.variants.length > 0 && (
        <section className="py-16 bg-[#FDFBF7] border-b border-orange-100/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-orange-100/50 shadow-sm space-y-6">
              <div className="text-center space-y-2 max-w-xl mx-auto">
                <span className="text-orange-500 text-xs font-black uppercase tracking-wider block">Gợi ý hương vị</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Tư vấn mức độ ăn cay phù hợp</h3>
                <p className="text-slate-500 text-xs sm:text-sm">Chọn mức độ chịu cay của bạn, chúng tôi sẽ gợi ý biến thể tương thích ngay lập tức!</p>
              </div>

              {/* Spiciness Level Slider Selector */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { level: 1, title: "Cay Dịu 🧀", desc: "Phô mai/Không cay" },
                  { level: 2, title: "Cay Ấm 🧄", desc: "Tỏi, Tiêu đen" },
                  { level: 3, title: "Cay Tê 🌶️", desc: "Truyền thống đậm vị" },
                  { level: 4, title: "Siêu Cay 🔥", desc: "Ớt hiểm cay nồng" }
                ].map((item) => (
                  <button
                    key={item.level}
                    onClick={() => setUserSpiceTolerance(item.level)}
                    className={`p-4 rounded-2xl border text-center transition-all duration-300 ${
                      userSpiceTolerance === item.level
                        ? "bg-red-50 border-red-500 text-red-700 shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:border-orange-300"
                    }`}
                  >
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 hidden sm:block">{item.desc}</p>
                  </button>
                ))}
              </div>

              {/* Advisor Recommendations Output */}
              <div className="p-5 rounded-2xl bg-orange-50/20 border border-orange-100/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <Flame size={20} className="text-red-500 fill-red-500 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Đề xuất từ Bà Tuyết:</h4>
                    <p className="text-slate-800 text-sm font-bold">
                      {recommendedVariants.length > 0 
                        ? `Chúng tôi đề xuất ${recommendedVariants.length} lựa chọn phù hợp:` 
                        : "Không tìm thấy biến thể chính xác ở cấp độ này cho sản phẩm này."}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recommendedVariants.map((v: any, vi: number) => (
                    <button
                      key={vi}
                      onClick={() => selectVariantFromAdvisor(v.name, v.weight)}
                      className="px-3.5 py-2 bg-white hover:bg-orange-500 hover:text-white border border-orange-200 rounded-xl text-xs font-black text-orange-600 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{v.name} ({v.weight}) — {v.price}</span>
                      <ChevronRight size={12} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Story Quote */}
      {product.story && (
        <section className="py-20 bg-[#FDFBF7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.7 }} 
              className="relative bg-[#FFFDF9] rounded-[2.5rem] border border-orange-100 p-8 sm:p-12 shadow-[0_12px_40px_rgba(249,115,22,0.04)] overflow-hidden"
            >
              {/* Quote graphic decorations */}
              <div className="absolute top-6 left-6 text-6xl text-orange-500/10 font-serif pointer-events-none select-none">“</div>
              <div className="absolute bottom-6 right-6 text-6xl text-orange-500/10 font-serif pointer-events-none select-none">”</div>
              
              <div className="text-center space-y-6 relative z-10">
                <p className="text-lg sm:text-2xl font-black text-slate-800 leading-relaxed italic font-serif">
                  "{product.story}"
                </p>
                <div className="space-y-1">
                  <p className="text-orange-500 font-black text-xs sm:text-sm uppercase tracking-widest">— Trích Lời Tâm Huyết Bà Tuyết</p>
                  <p className="text-[10px] text-slate-400 font-bold">Người sáng lập thương hiệu Ăn Cùng Bà Tuyết</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Ingredients Grid */}
      {Array.isArray(product.ingredients) && product.ingredients.length > 0 && (
        <section className="py-20 bg-white border-t border-b border-orange-100/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Image column - Agricultural spice ingredients */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className="w-full aspect-square rounded-[3rem] overflow-hidden border border-orange-100 shadow-xl relative bg-orange-50/20 p-3">
                  <img 
                    src="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&auto=format&fit=crop&q=80" 
                    alt="Nguyên liệu gia vị sạch Bà Tuyết" 
                    className="w-full h-full object-cover rounded-[2.5rem]"
                  />
                </div>
              </motion.div>

              {/* Right description & ingredient grid */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.6, delay: 0.2 }} 
                className="lg:col-span-7 space-y-5"
              >
                <span className="bg-orange-500/10 text-orange-650 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider w-fit block">
                  Nguyên liệu sạch
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Tinh hoa nông sản Việt, tẩm ướp tự nhiên</h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  Chúng tôi cam kết sử dụng nguồn nguyên liệu sạch thu hoạch trực tiếp từ các hợp tác xã nông sản Việt đạt tiêu chuẩn VietGAP. Tẩm ướp tự nhiên bằng công thức gia truyền, hoàn toàn không chất bảo quản công nghiệp độc hại hay màu tổng hợp hóa học.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-3.5 pt-4">
                  {(product.ingredients as string[]).map((ingredient, i) => {
                    const emoji = getIngredientEmoji(ingredient);
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className="flex items-center gap-3.5 bg-orange-50/20 hover:bg-orange-50/40 p-4 rounded-2xl border border-orange-100/30 transition-all shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 text-lg shadow-sm">
                          {emoji}
                        </div>
                        <span className="text-slate-800 text-xs sm:text-sm font-bold">{ingredient}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Production Process Stepper */}
      {Array.isArray(product.processSteps) && product.processSteps.length > 0 && (
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          {/* Background matrix mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.06)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="text-center mb-18 space-y-2">
              <span className="text-orange-400 text-xs font-black uppercase tracking-wider">Hành trình khép kín</span>
              <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight">Quy trình sản xuất an toàn vệ sinh</h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto font-medium">Quy trình chế biến khép kín tự động hóa, kiểm định ngặt nghèo từng khâu theo tiêu chuẩn quốc tế HACCP.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {(product.processSteps as any[]).map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-[#09151f] border border-slate-900 rounded-[2rem] p-6 hover:bg-slate-900/60 hover:border-orange-500/20 transition-all duration-350 space-y-4 shadow-xl"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400/20">0{step.step}</span>
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping group-hover:block hidden" />
                  </div>
                  <h3 className="text-base font-extrabold text-white group-hover:text-orange-400 transition-colors">{step.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Product Statistics Banner */}
      {Array.isArray(product.stats) && product.stats.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-orange-500 via-orange-600 to-red-650 text-white shadow-lg relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.08),_transparent_60%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {(product.stats as any[]).map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-center space-y-1"
                >
                  <p className="text-3xl sm:text-5.5xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-orange-100 text-xs sm:text-sm font-black uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spicy / Flavors Variants List */}
      {Array.isArray(product.variants) && product.variants.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 space-y-2">
              <span className="text-orange-500 text-xs font-black uppercase tracking-wider">Hương vị lựa chọn</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Chi tiết các phiên bản</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(product.variants as any[]).map((variant, i) => (
                <motion.button
                  key={`${variant.name}-${variant.weight}`}
                  onClick={() => selectVariantFromAdvisor(variant.name, variant.weight)}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`group flex items-center justify-between p-5.5 rounded-3xl text-left bg-slate-50 border transition-all duration-300 ${
                    selectedFlavor === variant.name && selectedWeight === variant.weight
                      ? "bg-orange-50/30 border-orange-300 ring-2 ring-orange-500/20"
                      : "border-slate-100 hover:bg-orange-50/15 hover:border-orange-200"
                  }`}
                >
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-orange-500 transition-colors">
                      {variant.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{variant.weight}</span>
                      {variant.spiceLevel !== undefined && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-slate-200" />
                          <SpiceLevel level={variant.spiceLevel} />
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-base sm:text-lg font-black text-orange-500 shrink-0 ml-3">{variant.price}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications details */}
      {Array.isArray(product.specs) && product.specs.length > 0 && (
        <section id="specs" className="py-20 bg-[#FDFBF7] border-t border-orange-100/20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Thông số đóng gói chi tiết</h2>
            </div>
            
            <div className="bg-white rounded-[2.5rem] border border-orange-100/40 overflow-hidden shadow-sm">
              {(product.specs as any[]).map((spec, i) => (
                <div 
                  key={spec.label} 
                  className={`flex items-center justify-between px-7 py-4.5 text-xs sm:text-sm ${
                    i < (product.specs as any[]).length - 1 ? "border-b border-orange-50/30" : ""
                  }`}
                >
                  <span className="text-slate-500 font-bold">{spec.label}</span>
                  <span className="font-black text-slate-900 text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to action & Trust badges grid */}
      <section className="py-24 bg-white border-t border-orange-100/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl sm:text-4.5xl font-black text-slate-900 tracking-tight">Đặt mua chính hãng {product.name} ngay!</h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Thưởng thức món ngon chuẩn vị Bà Tuyết, cam kết uy tín tuyệt đối từ nhà sản xuất quốc gia. Đóng gói cẩn thận, giao hàng siêu nhanh.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {product.purchaseUrl && (
                <a 
                  href={product.purchaseUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-650 hover:to-amber-650 text-white px-8 py-4.5 rounded-2xl font-black text-sm shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 transition-all hover:-translate-y-0.5 animate-pulse-subtle"
                >
                  <ShoppingBag size={16} />
                  <span>Mua Tại Shopee Mall</span> 
                </a>
              )}
              <a 
                href="https://tiktok.com/@batuyethanhvi" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 text-white px-8 py-4.5 rounded-2xl font-black text-sm shadow-md transition-all hover:-translate-y-0.5"
              >
                <Sparkles size={16} className="text-amber-400" />
                <span>Mua Tại TikTok Shop</span> 
              </a>
              <Link 
                href="/he-thong-ban" 
                className="group inline-flex items-center gap-2 bg-slate-100 text-slate-800 px-8 py-4.5 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all"
              >
                <span>Tìm cửa hàng gần bạn</span> 
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            
            {/* Trust Cards Grid */}
            <div className="grid sm:grid-cols-3 gap-4 pt-12 border-t border-slate-100 text-left">
              <div className="p-5 rounded-2xl bg-orange-50/20 border border-orange-100/30 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Bảo hiểm PVI 10 tỷ</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Bảo chứng trách nhiệm chất lượng sản phẩm 100% cho sức khỏe người ăn.</p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/20 border border-orange-100/30 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Nguyên liệu VietGAP</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Tuyển lựa 100% từ các nông trại sạch thuần Việt, an toàn không chất bảo quản độc hại.</p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/20 border border-orange-100/30 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center">
                  <HelpCircle size={18} />
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">Nhà máy HACCP chuẩn</h4>
                <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">Sản xuất tự động khép kín quy mô 3.300m² tại Thái Nguyên đảm bảo vô trùng tuyệt đối.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products list */}
      {otherProducts.length > 0 && (
        <section className="py-16 bg-[#FDFBF7] border-t border-orange-100/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight text-center mb-8">
              Khám phá các sản phẩm thơm ngon khác
            </h3>
            
            <div className="grid sm:grid-cols-3 gap-6">
              {otherProducts.slice(0, 3).map((p) => (
                <Link 
                  key={p.id} 
                  href={`/san-pham/${p.slug}`} 
                  className="group flex items-center gap-4 bg-white rounded-[1.8rem] p-4.5 border border-orange-100/30 hover:border-orange-200/60 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm group-hover:text-orange-500 transition-colors truncate">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold truncate mt-0.5">{p.tagline}</p>
                    <p className="text-xs font-black text-orange-500 mt-1">{p.price}</p>
                  </div>
                  <ChevronRight size={14} className="text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
