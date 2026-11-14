
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Loader2,
  LayoutGrid,
} from "lucide-react";

const ITEMS_PER_PAGE = 8;

const categoryImages = {
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85",
  fragrances:
    "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=85",
  furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85",
  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=85",
  "home-decoration":
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=85",
  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&q=85",
  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85",
  "mens-shirts":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
  "mens-shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
  "mens-watches":
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=900&q=85",
  "mobile-accessories":
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85",
  motorcycle:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
  "skin-care":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=85",
  smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85",
  "sports-accessories":
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85",
  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=85",
  tablets:
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=85",
  tops:
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=85",
  vehicle:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900&q=85",
  "womens-bags":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=85",
  "womens-dresses":
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=900&q=85",
  "womens-jewellery":
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85",
  "womens-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=900&q=85",
  "womens-watches":
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900&q=85",
};

const fallbackImage =
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=900&q=85";

const accents = [
  "#FF5722",
  "#F97316",
  "#E11D48",
  "#7C3AED",
  "#0891B2",
  "#059669",
];

function formatCategory(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );

        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      formatCategory(category)
        .toLowerCase()
        .includes(search.toLowerCase().trim())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(
    filteredCategories.length / ITEMS_PER_PAGE
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    setCurrentPage(page);
    document
      .getElementById("categories-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#F5F7FA]">

      {/* Premium Hero */}
      <section className="relative isolate overflow-hidden bg-[#14243B] px-5 py-12">

        {/* Unsplash Background */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1472851294608-062d824d29cc?w=2000&q=90')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14243B]/95 via-[#14243B]/85 to-[#14243B]/55" />

        {/* Orange light effect */}
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#FF5722]/25 blur-[100px]" />
        <div className="absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-orange-500/10 blur-[100px]" />

 
<div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center">

  <div className="mx-auto max-w-3xl">

    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
      <Sparkles size={20} className="text-[#FF5722]" />
      Your One-Stop Marketplace
    </div>

    <h1 className="text-[42px] font-extrabold leading-[1.15] tracking-tight text-white">
      Discover Products.
    </h1>

  </div>

</div>

      </section>

      {/* Categories Section */}
      <section
        id="categories-grid"
        className="mx-auto max-w-7xl scroll-mt-8 md:px-0 px-5 py-12"
      >

        {/* Section Heading */}
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF5722]">
              Shop by Category
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#14243B] sm:text-4xl">
              Explore All Categories
            </h2>

          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 sm:self-auto">
            <LayoutGrid size={17} className="text-[#FF5722]" />
            {filteredCategories.length} Categories
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-72 items-center justify-center">
            <Loader2 className="animate-spin text-[#FF5722]" size={38} />
          </div>
        )}

        {/* Grid */}
        {!loading && paginatedCategories.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCategories.map((category, index) => {
              const image = categoryImages[category] || fallbackImage;
              const accent =
                accents[((currentPage - 1) * ITEMS_PER_PAGE + index) % accents.length];

              return (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF5722]/30 hover:shadow-xl hover:shadow-slate-200/70"
                >

                  {/* Image */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={image}
                      alt={formatCategory(category)}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14243B]/65 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

                    {/* Category Badge */}
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur-md"
                      style={{ backgroundColor: accent }}
                    >
                      Explore
                    </span>

                    {/* Arrow */}
                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#14243B] shadow-lg transition-all duration-300 group-hover:bg-[#FF5722] group-hover:text-white">
                      <ArrowRight size={18} />
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#14243B] transition-colors group-hover:text-[#FF5722]">
                      {formatCategory(category)}
                    </h3>


                    <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-sm font-semibold text-[#FF5722]">
                        View Collection
                      </span>

                      <ArrowRight
                        size={17}
                        className="text-[#FF5722] transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && paginatedCategories.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
            <Search size={40} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-xl font-bold text-[#14243B]">
              No categories found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try another search keyword.
            </p>
            <button
              onClick={() => setSearch("")}
              className="mt-5 rounded-lg bg-[#FF5722] px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-4  flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-4 sm:flex-row">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-[#14243B]">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>
              {" - "}
              <span className="font-semibold text-[#14243B]">
                {Math.min(
                  currentPage * ITEMS_PER_PAGE,
                  filteredCategories.length
                )}
              </span>
              {" of "}
              <span className="font-semibold text-[#14243B]">
                {filteredCategories.length}
              </span>{" "}
              categories
            </p>

            <div className="flex items-center gap-2">

              {/* Previous */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#14243B] transition hover:border-[#FF5722] hover:text-[#FF5722] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={19} />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition ${
                    currentPage === page
                      ? "bg-[#FF5722] text-white shadow-lg shadow-orange-500/20"
                      : "border border-slate-200 bg-white text-[#14243B] hover:border-[#FF5722] hover:text-[#FF5722]"
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#14243B] transition hover:border-[#FF5722] hover:text-[#FF5722] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
