"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const CATEGORY_API = "https://dummyjson.com/products/category-list";
const PRODUCT_API = "https://dummyjson.com/products/category";

const categoryLabels = {
  "mens-shirts": "Men's Shirts",
  "mens-shoes": "Men's Shoes",
  "mens-watches": "Men's Watches",
  "womens-bags": "Women's Bags",
  "womens-dresses": "Women's Dresses",
  "womens-jewellery": "Women's Jewellery",
  "womens-shoes": "Women's Shoes",
  "womens-watches": "Women's Watches",
  "mobile-accessories": "Mobile Accessories",
  "sports-accessories": "Sports Accessories",
  "home-decoration": "Home Decoration",
  "kitchen-accessories": "Kitchen Accessories",
  "skin-care": "Skin Care",
};

const getCategoryName = (slug) => {
  return (
    categoryLabels[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sliderRef = useRef(null);
  const isHovered = useRef(false);

  // FETCH ALL CATEGORIES AND THEIR PRODUCT IMAGES
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        // Get all category slugs
        const response = await fetch(CATEGORY_API, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }

        const categorySlugs = await response.json();

        // Fetch one real product image for each category
        const categoryResults = await Promise.all(
          categorySlugs.map(async (slug) => {
            try {
              const productResponse = await fetch(
                `${PRODUCT_API}/${encodeURIComponent(slug)}?limit=1`,
                {
                  signal: controller.signal,
                  cache: "no-store",
                }
              );

              if (!productResponse.ok) {
                return {
                  slug,
                  name: getCategoryName(slug),
                  image: "",
                  productTitle: "",
                };
              }

              const productData = await productResponse.json();
              const product = productData.products?.[0];

              return {
                slug,
                name: getCategoryName(slug),
                image:
                  product?.thumbnail ||
                  product?.images?.[0] ||
                  "",
                productTitle: product?.title || "",
              };
            } catch (err) {
              if (err.name === "AbortError") throw err;

              return {
                slug,
                name: getCategoryName(slug),
                image: "",
                productTitle: "",
              };
            }
          })
        );

        if (!controller.signal.aborted) {
          setCategories(categoryResults);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Categories could not be loaded. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  // NEXT SLIDE
  const nextSlide = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: slider.clientWidth * 0.8,
        behavior: "smooth",
      });
    }
  };

  // PREVIOUS SLIDE
  const prevSlide = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (slider.scrollLeft <= 5) {
      slider.scrollTo({
        left: maxScroll,
        behavior: "smooth",
      });
    } else {
      slider.scrollBy({
        left: -(slider.clientWidth * 0.8),
        behavior: "smooth",
      });
    }
  };

  // AUTO SLIDER
  useEffect(() => {
    if (loading || error || categories.length <= 4) return;

    const interval = setInterval(() => {
      if (!isHovered.current) {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [loading, error, categories.length]);

  return (
    <section className="w-full overflow-hidden bg-[#fafafa] py-10 md:py-14">
      <div className=" px-10">

        {/* SECTION HEADER */}
        <div className="mb-7 flex items-end justify-between gap-3">

          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles
                size={21}
                className="fill-[#ff6035] text-[#ff6035]"
              />

   

            <h2 className="text-2xl font-bold tracking-tight text-[#15263d] sm:text-3xl md:text-[34px]">
              Shop by Category
            </h2>
         </div>
          </div>

          {/* NAVIGATION ARROWS */}
          <div className="flex shrink-0 items-center gap-2">

            <Link
              href="/Allcategories"
              className="mr-2 hidden items-center gap-1 text-sm font-semibold text-[#ff6035] hover:text-orange-700 sm:flex"
            >
              View All
              <ArrowRight size={16} />
            </Link>  

            {!loading && categories.length > 4 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous categories"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#ff6035] hover:bg-[#ff6035] hover:text-white sm:h-10 sm:w-10"
                >
                  <ChevronLeft size={21} />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next categories"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#ff6035] hover:bg-[#ff6035] hover:text-white sm:h-10 sm:w-10"
                >
                  <ChevronRight size={21} />
                </button>
              </>
            )}

          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-[calc(50%-8px)] shrink-0 overflow-hidden rounded-2xl bg-white shadow-sm sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
              >
                <div className="h-36 animate-pulse bg-gray-200 sm:h-48 md:h-56" />
                <div className="p-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-full animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl bg-white py-10 text-center text-sm text-red-500">
            {error}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No categories found.
          </div>
        ) : (

          /* CATEGORY SLIDER */
          <div
            className="relative mx-auto max-w-7xl"
            onMouseEnter={() => {
              isHovered.current = true;
            }}
            onMouseLeave={() => {
              isHovered.current = false;
            }}
          >

            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
              }}
            >

              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="w-[calc(50%-8px)] shrink-0 snap-start sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
                >

                  <Link
                    href={`/categories/${category.slug}`}
                    title={category.name}
                    className="group block h-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl"
                  >

                    {/* PRODUCT IMAGE */}
                    <div className="relative h-36 overflow-hidden bg-gray-100 sm:h-48 md:h-56">

                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          loading="lazy"
                          draggable="false"
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-orange-50">
                          <span className="text-4xl font-bold text-[#ff6035]">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* IMAGE OVERLAY */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* CATEGORY LABEL */}
                      <span className="absolute top-3 left-2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold text-gray-800 shadow-sm sm:text-xs">
                        Explore Collection
                      </span>

                    </div>

                    {/* CATEGORY DETAILS */}
                    <div className="flex min-h-[75px] items-center justify-between gap-2 p-3 sm:p-4">

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-gray-900 transition-colors group-hover:text-[#ff6035] sm:text-base">
                          {category.name}
                        </h3>

                        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                          {category.productTitle || "Explore our collection"}
                        </p>
                      </div>

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#ff6035] transition-all duration-300 group-hover:bg-[#ff6035] group-hover:text-white">
                        <ArrowRight size={16} />
                      </div>

                    </div>

                  </Link>
                </div>
              ))}

            </div>
          </div>
        )}

        {/* MOBILE VIEW ALL */}
        <div className="mt-5 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6035]"
          >
            View All Categories
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>

  );
}