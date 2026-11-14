
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  ArrowUpRight,
  Loader2,
  Tag,
  ShieldCheck,
  Truck,
} from "lucide-react";

const API_URL =
  "https://dummyjson.com/products/search?q=phone&limit=5";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Featured Products Error:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-[##ffffff] py-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-[#FF5A1F]" />

              <span className="text-xs font-bold uppercase tracking-[2px] text-[#FF5A1F]">
                Our Collection
              </span>
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#101D32] sm:text-3xl lg:text-4xl">
              Featured Products
            </h2>

   
          </div>
        </div>


        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center gap-3 rounded-2xl bg-white">
            <Loader2
              size={26}
              className="animate-spin text-[#FF5A1F]"
            />

            <span className="text-sm font-medium text-gray-500">
              Loading featured products...
            </span>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white py-16 text-center">
            <p className="font-semibold text-gray-700">
              Unable to load products.
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-bold text-[#FF5A1F]"
            >
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center text-gray-500">
            No featured products found.
          </div>
        ) : (

          /* PRODUCT GRID */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5">

            {products.map((product) => {
              const discount = product.discountPercentage || 0;

              const discountedPrice =
                product.price - (product.price * discount) / 100;

              const rating = Math.min(
                5,
                Math.max(0, Number(product.rating) || 0)
              );

              const reviewCount = product.reviews?.length || 4;

              return (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-100 hover:shadow-[0_18px_45px_rgba(16,29,50,0.10)]"
                >

                  {/* PRODUCT IMAGE */}
                  <div className="relative overflow-hidden bg-[#F7F7F7]">

                    <Link
                      href={`/products/${product.id}`}
                      className="relative flex aspect-[4/4.2] items-center justify-center overflow-hidden p-5 sm:p-6"
                    >
                      {/* DISCOUNT */}
                      {discount > 0 && (
                        <span className="absolute left-3 top-3 z-10 rounded-md bg-[#FF5A1F] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-sm">
                          {Math.round(discount)}% OFF
                        </span>
                      )}

                      {/* IMAGE */}
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </Link>

                    {/* WISHLIST */}
                    <button
                      type="button"
                      aria-label="Add to wishlist"
                      aria-pressed={wishlist.includes(product.id)}
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:scale-110 ${
                        wishlist.includes(product.id)
                          ? "text-[#FF5A1F]"
                          : "text-gray-500 hover:text-[#FF5A1F]"
                      }`}
                    >
                      <Heart
                        size={17}
                        fill={
                          wishlist.includes(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    {/* QUICK VIEW */}
                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View ${product.title}`}
                      className="absolute bottom-3 right-3 flex size-9 translate-y-3 items-center justify-center rounded-full bg-white text-[#101D32] opacity-0 shadow-md transition-all duration-300 hover:bg-[#FF5A1F] hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="p-3.5 sm:p-4">
                 {/* TITLE */}
<Link href={`/products/${product.id}`}>
  <h3 className="truncate text-sm font-bold leading-5 text-[#101D32] transition-colors hover:text-[#FF5A1F]">
    {product.title}
  </h3>
</Link>
  
                    {/* STAR REVIEWS */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">

                      <div
                        className="flex items-center gap-0.5"
                        aria-label={`${rating.toFixed(1)} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            strokeWidth={1.5}
                            fill={
                              star <= Math.round(rating)
                                ? "#F5A623"
                                : "none"
                            }
                            className={
                              star <= Math.round(rating)
                                ? "text-[#F5A623]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>

                    </div>

                    {/* PRICE */}
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-lg font-extrabold tracking-tight text-[#101D32]">
                        {formatPrice(discountedPrice)}
                      </span>

                      {discount > 0 && (
                        <span className="text-xs font-medium text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* PRODUCT BUTTON */}
                    <Link
                      href={`/products/${product.id}`}
                      className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#101D32] px-2 text-xs font-bold text-white transition-all duration-300 hover:bg-[#FF5A1F]"
                    >
                      <ShoppingCart size={15} />
                      View Product
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}



      </div>
    </section>  
  );
}
