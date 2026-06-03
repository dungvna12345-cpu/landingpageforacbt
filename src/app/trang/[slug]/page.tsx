"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import {
  Loader,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShoppingBag
} from "lucide-react";

interface Block {
  id: string;
  type: "hero" | "text" | "features" | "split" | "products";
  data: any;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  content: Block[];
}

interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  image: string;
  categoryLabel: string;
  purchaseUrl: string;
}

// Icon renderer helper
const DynIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (Icons as any)[name];
  if (!Icon) return <HelpCircle className={className} />;
  return <Icon className={className} />;
};

export default function CustomDynamicPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = use(paramsPromise);
  const slug = params.slug;

  const { token } = useAuth();
  const [page, setPage] = useState<PageData | null>(null);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPageAndProducts();
  }, [slug, token]);

  const fetchPageAndProducts = async () => {
    setLoading(true);
    setError("");
    try {
      // 1. Fetch products
      const prodRes = await fetch("/api/products");
      let prods: Product[] = [];
      if (prodRes.ok) {
        prods = await prodRes.json();
        setProductsList(prods);
      }

      // 2. Fetch page details (attach auth header if exists for drafts)
      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const pageRes = await fetch(`/api/pages/slug/${slug}`, { headers });
      if (pageRes.ok) {
        const pageData = await pageRes.json();
        setPage(pageData);
      } else {
        const errorData = await pageRes.json();
        setError(errorData.error || "Không thể tải trang này");
      }
    } catch (err) {
      console.error("Error loading dynamic page:", err);
      setError("Có lỗi kết nối hệ thống xảy ra");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader className="animate-spin text-orange-500" size={36} />
        <p className="text-sm font-semibold text-slate-400">Đang tải dữ liệu trang...</p>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6 space-y-4">
        <AlertCircle size={48} className="text-red-500 mx-auto" />
        <h1 className="text-2xl font-black text-slate-900">404 — Không tìm thấy trang</h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          {error === "Trang chưa được xuất bản"
            ? "Trang này hiện đang ở trạng thái bản nháp và chưa được công bố rộng rãi."
            : "Đường dẫn tĩnh này không hợp lệ hoặc trang đã được gỡ bỏ."}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-full text-xs transition"
          >
            Quay lại Trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-cream overflow-hidden">
      {/* Draft notice banner for logged-in admins */}
      {page.status === "DRAFT" && (
        <div className="bg-amber-500 text-slate-950 font-black text-xs px-6 py-2 text-center flex items-center justify-center gap-2 select-none border-b border-amber-600 shadow-sm shrink-0">
          <span className="bg-slate-950 text-amber-500 text-[10px] px-2 py-0.5 rounded-full font-extrabold uppercase">PREVIEW DRAFT</span>
          <span>Bạn đang xem trước trang nháp này vì đã đăng nhập quyền quản trị. Khách hàng chưa thấy trang này.</span>
        </div>
      )}

      {/* Render blocks loop */}
      <div className="w-full">
        {(page.content || []).map((block, idx) => {
          return (
            <div key={block.id || idx}>
              
              {/* 1. HERO BLOCK */}
              {block.type === "hero" && (
                <section
                  className="relative min-h-[460px] md:min-h-[580px] flex items-center justify-center bg-cover bg-center py-24 px-6 text-center text-white"
                  style={{
                    backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.65)), url(${block.data.backgroundImage || "/hero-bg-default.jpg"})`
                  }}
                >
                  <div className="max-w-3xl space-y-6">
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow"
                    >
                      {block.data.title || "Tiêu đề trang"}
                    </motion.h1>
                    
                    {block.data.subtitle && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-sm sm:text-base md:text-lg text-slate-200 drop-shadow max-w-2xl mx-auto leading-relaxed"
                      >
                        {block.data.subtitle}
                      </motion.p>
                    )}

                    {block.data.ctaText && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="pt-4"
                      >
                        <Link
                          href={block.data.ctaLink || "#"}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg transition transform hover:scale-105 active:scale-95 duration-200 shadow-orange-500/20"
                        >
                          <span>{block.data.ctaText}</span>
                          <ArrowRight size={16} />
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </section>
              )}

              {/* 2. RICH TEXT BLOCK */}
              {block.type === "text" && (
                <section className={`py-16 px-6 sm:px-12 flex justify-center ${
                  block.data.backgroundColor === "slate-900" ? "bg-slate-900 text-slate-100" :
                  block.data.backgroundColor === "white" ? "bg-white text-slate-900" :
                  "bg-cream text-slate-900"
                }`}>
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`prose prose-orange max-w-3xl w-full text-slate-800 leading-relaxed text-sm md:text-base ${
                      block.data.backgroundColor === "slate-900" ? "prose-invert text-slate-200" : ""
                    }`}
                    dangerouslySetInnerHTML={{ __html: block.data.content || "" }}
                  />
                </section>
              )}

              {/* 3. FEATURES GRID BLOCK */}
              {block.type === "features" && (
                <section className="py-20 px-6 sm:px-12 bg-white">
                  <div className="max-w-6xl mx-auto text-center space-y-12">
                    {block.data.title && (
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-black text-slate-900 tracking-tight"
                      >
                        {block.data.title}
                      </motion.h2>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {(block.data.items || []).map((item: any, fIdx: number) => {
                        return (
                          <motion.div
                            key={fIdx}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: fIdx * 0.1 }}
                            className="bg-cream rounded-3xl border border-slate-100/50 p-8 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition duration-300 group"
                          >
                            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 shadow-sm border border-orange-100/50 group-hover:scale-110 transition duration-300">
                              <DynIcon name={item.icon || "Award"} className="w-5 h-5" />
                            </div>
                            <h3 className="text-base font-extrabold text-slate-950">{item.title}</h3>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

              {/* 4. SPLIT IMAGE/TEXT BLOCK */}
              {block.type === "split" && (
                <section className="py-20 px-6 sm:px-12 bg-cream">
                  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                      initial={{ opacity: 0, x: block.data.imagePosition === "left" ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`space-y-5 ${block.data.imagePosition === "left" ? "md:order-2" : "md:order-1"}`}
                    >
                      <h2 className="text-3xl font-black text-slate-900 leading-tight">{block.data.title}</h2>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">{block.data.description}</p>
                      {block.data.ctaText && (
                        <div className="pt-2">
                          <Link
                            href={block.data.ctaLink || "#"}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl cursor-pointer shadow transition transform active:scale-95 duration-150"
                          >
                            <span>{block.data.ctaText}</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, x: block.data.imagePosition === "left" ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className={`relative aspect-video sm:aspect-square md:aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-lg ${
                        block.data.imagePosition === "left" ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <img
                        src={block.data.imageUrl || "/uploads/process-preview.jpg"}
                        alt={block.data.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </section>
              )}

              {/* 5. FEATURED PRODUCTS BLOCK */}
              {block.type === "products" && (
                <section className="py-20 px-6 sm:px-12 bg-white">
                  <div className="max-w-6xl mx-auto space-y-12">
                    <div className="text-center space-y-3">
                      <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-black text-slate-900 tracking-tight"
                      >
                        {block.data.title}
                      </motion.h2>
                      {block.data.subtitle && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className="text-xs sm:text-sm text-slate-450 font-bold"
                        >
                          {block.data.subtitle}
                        </motion.p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                      {productsList
                        .filter(p => (block.data.productIds || []).includes(p.id))
                        .map((p, pIdx) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: pIdx * 0.1 }}
                            className="bg-cream rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between h-full group hover:shadow-lg transition duration-300"
                          >
                            <div className="relative aspect-square overflow-hidden bg-slate-50 border-b border-slate-100/50">
                              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                              <span className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                {p.categoryLabel}
                              </span>
                            </div>
                            
                            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                              <div className="space-y-1">
                                <Link href={`/san-pham/${p.slug}`}>
                                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-500 transition line-clamp-1 cursor-pointer leading-tight">
                                    {p.name}
                                  </h3>
                                </Link>
                                <p className="text-xs sm:text-sm font-black text-orange-500">{p.price}</p>
                              </div>
                              
                              <Link
                                href={p.purchaseUrl || `/san-pham/${p.slug}`}
                                target={p.purchaseUrl ? "_blank" : undefined}
                                className="w-full text-center bg-slate-900 hover:bg-orange-500 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow"
                              >
                                <ShoppingBag size={13} />
                                <span>Đặt Mua Ngay</span>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                    
                    {productsList.filter(p => (block.data.productIds || []).includes(p.id)).length === 0 && (
                      <div className="text-center text-slate-400 italic text-xs py-10 border border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                        Chưa chọn sản phẩm nào để hiển thị trong khối này.
                      </div>
                    )}
                  </div>
                </section>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}
