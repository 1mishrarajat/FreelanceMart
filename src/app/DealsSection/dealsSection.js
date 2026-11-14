"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const deals = [
  {
    id: "electronics",
    badge: "Electronics deals",
    title: "Upgrade Your",
    highlight: "Tech Lifestyle",
    description: "Laptops, headphones, smartwatches & more at unbeatable prices.",
    button: "Shop Electronics",
    href: "/categories/smartphones",
    // Tip: swap with a transparent PNG cut-out (laptop + headphones) in /public for the exact banner look
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=85&w=1400&auto=format&fit=crop",
    theme: "dark",
  },
  {
    id: "fashion",
    badge: "Fashion collection",
    title: "Trendy Styles",
    highlight: "Every Season",
    description: "Discover the latest fashion for men, women and more.",
    button: "Shop Fashion",
    href: "/categories/womens-dresses",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=85&w=1400&auto=format&fit=crop",
    theme: "light",
  },
];

const fadeLeft =
  "[mask-image:linear-gradient(to_right,transparent_0%,black_45%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_45%)]";

export default function DealsSection() {
  return (
    <section className="w-full bg-[#ffffff] py-8">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0F2036] sm:text-3xl">
              Shop Our Top Collections
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 sm:text-base">
              Fresh arrivals and everyday deals, picked for you.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-[#FF6035] hover:text-[#FF6035] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6035] sm:inline-flex"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Banners */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {deals.map((deal) => {
            const isDark = deal.theme === "dark";

            return (
              <article
                key={deal.id}
                className={`group relative isolate flex min-h-[260px] items-center overflow-hidden rounded-[28px] sm:min-h-[300px] ${
                  isDark
                    ? "bg-gradient-to-br from-[#030E22] via-[#07224A] to-[#0A3F8F] shadow-[0_20px_50px_-20px_rgba(7,34,74,0.6)]"
                    : "bg-gradient-to-br from-[#FFF4EC] via-[#FFE9DB] to-[#FFD9C2] shadow-[0_20px_50px_-20px_rgba(255,96,53,0.35)]"
                }`}
              >
                {/* Product / model image, faded into the background */}
                <img
                  src={deal.image}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-y-0 right-0 -z-10 h-full w-[68%] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 sm:w-[58%] ${fadeLeft} ${
                    isDark ? "opacity-80" : "opacity-100"
                  }`}
                />

                {/* Decorative glow */}
                {isDark ? (
                  <>
                    <div className="pointer-events-none absolute -right-16 top-1/2 -z-10 h-[420px] w-[420px] -translate-y-1/2 rounded-full border-[3px] border-sky-400/50 shadow-[0_0_70px_12px_rgba(56,140,255,0.45),inset_0_0_60px_rgba(56,140,255,0.25)]" />
                    <div className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                  </>
                ) : (
                  <>
                    <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#FF6035]/15 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-28 left-1/4 -z-10 h-64 w-64 rounded-full bg-white/60 blur-3xl" />
                  </>
                )}

                {/* Content */}
                <div className="relative z-10 w-[64%] max-w-[420px] p-6 sm:p-9 lg:p-10">
                  <span
                    className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md ${
                      isDark
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-[#FF6035]/25 bg-white/70 text-[#C74720]"
                    }`}
                  >
                    {deal.badge}
                  </span>

                  <h3
                    className={`mt-4 text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-[36px] xl:text-[40px] ${
                      isDark ? "text-white" : "text-[#13233A]"
                    }`}
                  >
                    {deal.title}
                    <span
                      className={`block ${
                        isDark ? "text-[#FF7A45]" : "text-[#13233A]"
                      }`}
                    >
                      {deal.highlight}
                    </span>
                  </h3>

                  <p
                    className={`mt-3 max-w-[330px] text-[13px] leading-relaxed sm:text-[15px] ${
                      isDark ? "text-slate-200/90" : "text-slate-600"
                    }`}
                  >
                    {deal.description}
                  </p>

                  <Link
                    href={deal.href}
                    className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF6035] to-[#FF8A3D] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#FF6035]/30 transition-all duration-300 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {deal.button}
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
