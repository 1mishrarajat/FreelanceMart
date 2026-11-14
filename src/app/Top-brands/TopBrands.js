
"use client";

import Link from "next/link";
import { Handshake, ArrowUpRight, Sparkles } from "lucide-react";

const brands = [
  {
    name: "Apple",
    logo: "https://cdn.simpleicons.org/apple/000000",

  },
  {
    name: "Samsung",
    logo: "https://cdn.simpleicons.org/samsung/1428A0",

  },
  {
    name: "Nike",
    logo: "https://cdn.simpleicons.org/nike/111111",
    slug: "nike",
  },
  {
    name: "Adidas",
    logo: "https://cdn.simpleicons.org/adidas/000000",

  },
  {
    name: "JBL",
    logo: "https://cdn.simpleicons.org/jbl/FF6600",

  },
  {
    name: "HP",
    logo: "https://cdn.simpleicons.org/hp/0096D6",

  },
  {
    name: "Dell",
    logo: "https://cdn.simpleicons.org/dell/007DB8",
   
  },  
];

export default function TopBrands() {
  return (
    <section className="relative overflow-hidden bg-[#efefef] py-12 sm:py-16">

      {/* BACKGROUND DECORATION */}
      <div className="pointer-events-none absolute -right-20 top-0 size-72 rounded-full bg-orange-50/70 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 size-64 rounded-full bg-orange-50/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">

          <div>
         
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-xl bg-[#FF5A1F] text-white shadow-lg shadow-orange-100">
                <Handshake size={23} strokeWidth={2} />
              </span>

              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-[#101D32] sm:text-3xl">
                  Top Brands You Love
                </h2>

              </div>
            </div>
          </div>

        </div>

        {/* BRAND GRID */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-7">

          {brands.map((brand, index) => (
            <Link
              key={brand.slug}
              href={`#`}
              title={`Explore ${brand.name}`}
              className="group relative flex min-h-[105px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white px-3 py-5 shadow-[0_3px_15px_rgba(16,29,50,0.035)] transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-200 hover:shadow-[0_14px_30px_rgba(16,29,50,0.09)] sm:min-h-[125px] sm:py-6"
            >

              {/* HOVER BACKGROUND */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-orange-50/0 transition-all duration-300 group-hover:from-orange-50/80 group-hover:to-white" />

              {/* TOP ACCENT */}
              <span className="absolute left-1/2 top-0 h-[3px] w-0 -translate-x-1/2 rounded-b-full bg-[#FF5A1F] transition-all duration-300 group-hover:w-16" />

              {/* LOGO */}
              <div className="relative flex h-12 w-full items-center justify-center sm:h-16">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  loading="lazy"
                  className="max-h-10 max-w-[110px] object-contain transition-all duration-300 group-hover:scale-110 sm:max-h-14 sm:max-w-[145px]"
                />
              </div>

              {/* BRAND NAME */}
              <span className="relative mt-3 text-[11px] font-bold text-gray-500 transition-colors duration-300 group-hover:text-[#FF5A1F] sm:text-xs">
                {brand.name}
              </span>

              {/* HOVER ARROW */}
              <span className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-white text-[#FF5A1F] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                <ArrowUpRight size={13} />
              </span>

            </Link>
          ))}  

        </div>



      </div>
    </section>
  );
}
