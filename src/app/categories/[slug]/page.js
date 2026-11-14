
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import Header from "@/app/heeader/header";
import TopHeader from "@/app/topheader/topheader";

import {
  ShoppingBag,
  Star,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpRight,
  RefreshCw,
  Package,
} from "lucide-react";

const API_URL = "https://dummyjson.com/products/category";

// CATEGORY NAME
const getCategoryName = (slug) => {
  if (!slug) return "Products";

  const labels = {
    "womens-bags": "Women's Bags",
    "womens-dresses": "Women's Dresses",
    "womens-jewellery": "Women's Jewellery",
    "womens-shoes": "Women's Shoes",
    "womens-watches": "Women's Watches",
    "mens-shirts": "Men's Shirts",
    "mens-shoes": "Men's Shoes",
    "mens-watches": "Men's Watches",
    "mobile-accessories": "Mobile Accessories",
    "sports-accessories": "Sports Accessories",
    "home-decoration": "Home Decoration",
    "kitchen-accessories": "Kitchen Accessories",
    "skin-care": "Skin Care",
  };

  return (
    labels[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

// PRODUCT CARD
function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const image = product.thumbnail || product.images?.[0];

  const rating = Math.max(
    0,
    Math.min(5, Number(product.rating) || 0)
  );

  const originalPrice =
    product.discountPercentage > 0 &&
    product.discountPercentage < 100
      ? product.price / (1 - product.discountPercentage / 100)
      : null;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_3px_15px_rgba(0,0,0,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-100 hover:shadow-[0_15px_35px_rgba(0,0,0,0.09)]"
    >
      {/* PRODUCT IMAGE */}
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#f7f7f6] sm:h-64 lg:h-[270px]">

        {image && !imageError ? (
          <img
            src={image}
            alt={product.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-contain p-5 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ShoppingBag size={45} className="text-gray-300" />
          </div>
        )}

        {/* DISCOUNT BADGE */}
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-md bg-[#FF5A1F] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            {Math.round(product.discountPercentage)}% OFF
          </span>
        )}

        {/* OUT OF STOCK */}
        {product.stock === 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white">
            Out of Stock
          </span>
        )}

        {/* VIEW ICON */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-[#FF5A1F] opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={19} />
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-4 sm:p-5">

        {/* BRAND / CATEGORY */}
        <p className="mb-2 truncate text-[10px] font-bold uppercase tracking-[1.6px] text-[#FF5A1F]">
          {product.brand || product.category}
        </p>

        {/* PRODUCT NAME */}
        <h3 className="line-clamp-2 min-h-[44px] text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-[#FF5A1F] sm:text-base">
          {product.title}
        </h3>

        {/* STAR RATING */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={
                  index < Math.floor(rating)
                    ? "fill-[#FF5A1F] text-[#FF5A1F]"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>

          <span className="text-xs font-medium text-gray-500">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-bold text-gray-900 sm:text-lg">
              ${Number(product.price).toFixed(2)}
            </span>

            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#FF5A1F] transition-colors group-hover:bg-[#FF5A1F] group-hover:text-white">
            <ShoppingBag size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// PRODUCT LOADING SKELETON
function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
      <div className="h-52 animate-pulse bg-gray-100 sm:h-64 lg:h-[270px]" />

      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="mt-4 h-5 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
}

// MAIN CATEGORY PAGE
export default function CategoryPage() {
  const params = useParams();

  const slug = Array.isArray(params?.slug)
    ? params.slug[0]
    : params?.slug;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("default");
  const [retry, setRetry] = useState(0);

  const categoryName = getCategoryName(slug);

  // FETCH CATEGORY PRODUCTS
  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        setProducts([]);

        const response = await fetch(
          `${API_URL}/${encodeURIComponent(slug)}?limit=0`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch products.");
        }

        const data = await response.json();

        if (!controller.signal.aborted) {
          setProducts(data.products || []);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Products API Error:", err);
          setError("We couldn't load the products. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [slug, retry]);

  // SORT PRODUCTS
  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, sort]);

  return (
    <>
 

      <main className="min-h-screen bg-white">

        {/* CATEGORY HERO */}
        <section className="relative overflow-hidden border-b border-gray-100 bg-[#edddd6]">
          <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8">

            {/* BREADCRUMB */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <Link
                href="/"
                className="transition hover:text-[#FF5A1F]"
              >
                Home
              </Link>

              <ChevronRight size={14} />

              <Link
                href="/categories"
                className="transition hover:text-[#FF5A1F]"
              >
                Categories
              </Link>

              <ChevronRight size={14} />

              <span className="font-medium text-gray-900">
                {categoryName}
              </span>
            </nav>

            {/* CATEGORY CONTENT */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div className="max-w-2xl">
                      <h1 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl lg:text-5xl">
                  {categoryName}
                  <span className="text-[#FF5A1F]">.</span>
                </h1>
              </div>

            </div>
          </div>
        </section>

        {/* PRODUCT LISTING */}
        <section className="bg-[#f8f8f7] py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* COLLECTION HEADER */}
            <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-[2px] w-7 rounded-full bg-[#FF5A1F]" />

                  <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#FF5A1F]">
                    Our Selection
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
                  Explore Products
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Find your favorites from our curated collection.
                </p>
              </div>

              {/* PRODUCT COUNT + SORT */}
              <div className="flex items-center justify-between gap-3 sm:justify-end">

                <span className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-600 shadow-sm">
                  {loading ? "Loading..." : `${sortedProducts.length} Products`}
                </span>

                <div className="relative">
                  <SlidersHorizontal
                    size={15}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#FF5A1F]"
                  />

                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-xs font-semibold text-gray-700 shadow-sm outline-none transition hover:border-[#FF5A1F] focus:border-[#FF5A1F] sm:text-sm"
                  >
                    <option value="default">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* PRODUCT GRID CONTAINER */}
            <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_5px_30px_rgba(0,0,0,0.035)] sm:p-5 lg:p-6">

              {/* LOADING STATE */}
              {loading && (
                <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              )}

              {/* ERROR STATE */}
              {!loading && error && (
                <div className="rounded-xl bg-red-50 px-5 py-16 text-center">
                  <p className="text-lg font-bold text-gray-800">
                    Something went wrong
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {error}
                  </p>

                  <button
                    onClick={() => setRetry((value) => value + 1)}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </button>
                </div>
              )}

              {/* EMPTY STATE */}
              {!loading && !error && sortedProducts.length === 0 && (
                <div className="py-20 text-center">
                  <ShoppingBag
                    size={48}
                    className="mx-auto mb-4 text-gray-300"
                  />

                  <h3 className="text-xl font-bold text-gray-900">
                    No Products Available
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    There are currently no products in this collection.
                  </p>

                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                  >
                    Explore More
                    <ChevronRight size={17} />
                  </Link>
                </div>
              )}

              {/* PRODUCTS */}
              {!loading && !error && sortedProducts.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* BOTTOM INFORMATION */}
            {!loading && !error && sortedProducts.length > 0 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-center sm:flex-row sm:text-left">

                <p className="text-xs text-gray-500 sm:text-sm">
                  Showing all{" "}
                  <span className="font-bold text-gray-800">
                    {sortedProducts.length}
                  </span>{" "}
                  products in{" "}
                  <span className="font-semibold text-[#FF5A1F]">
                    {categoryName}
                  </span>
                </p>

                <p className="text-xs font-medium text-gray-400">
                  Discover something you love.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
