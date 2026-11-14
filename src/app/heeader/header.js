
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  ChevronDown,
  ChevronRight,
  X,
  Loader2,
  Grid2X2,
  Smartphone,
  Laptop,
  Shirt,
  Watch,
  Sofa,
  Home,
  BookOpen,
  Car,
  Bike,
  ShoppingBasket,
  Sparkles,
  Footprints,
  Dumbbell,
  Camera,
  Headphones,
  Gamepad2,
  Gem,
  BriefcaseBusiness,
  SprayCan,
  Utensils,
  Baby,
  PawPrint,
  Tag,
  Monitor,
  Flower2,
  CircleDot,
} from "lucide-react";

const API_URL = "https://dummyjson.com/products/category-list";

/* =========================================
   CATEGORY NAME FORMATTER
========================================= */

const formatCategory = (category = "") =>
  category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

/* =========================================
   CATEGORY ICONS
========================================= */

const getCategoryIcon = (category = "") => {
  const value = category.toLowerCase();

  if (value.includes("phone")) return Smartphone;
  if (value.includes("laptop")) return Laptop;
  if (value.includes("computer")) return Monitor;
  if (value.includes("shirt") || value.includes("clothing")) return Shirt;
  if (value.includes("watch")) return Watch;
  if (value.includes("furniture")) return Sofa;
  if (value.includes("home") || value.includes("decoration")) return Home;
  if (value.includes("book")) return BookOpen;
  if (value.includes("car") || value.includes("vehicle")) return Car;
  if (value.includes("bike") || value.includes("motorcycle")) return Bike;
  if (value.includes("grocery")) return ShoppingBasket;
  if (value.includes("food")) return Utensils;
  if (value.includes("beauty") || value.includes("skin")) return Sparkles;
  if (value.includes("shoe") || value.includes("footwear")) return Footprints;
  if (value.includes("sport") || value.includes("fitness")) return Dumbbell;
  if (value.includes("camera") || value.includes("photo")) return Camera;
  if (value.includes("audio") || value.includes("headphone")) return Headphones;
  if (value.includes("game")) return Gamepad2;
  if (value.includes("jewel") || value.includes("ring")) return Gem;
  if (value.includes("office") || value.includes("business")) return BriefcaseBusiness;
  if (value.includes("fragrance") || value.includes("perfume")) return SprayCan;
  if (value.includes("kitchen")) return Utensils;
  if (value.includes("baby") || value.includes("toy")) return Baby;
  if (value.includes("pet")) return PawPrint;
  if (value.includes("flower")) return Flower2;
  if (value.includes("accessories")) return CircleDot;

  return Tag;
};

/* =========================================
   CATEGORY IMAGE MAPPING
========================================= */

const categoryImages = {
  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=85",

  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000&q=85",

  "home-decoration":
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",

  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1000&q=85",

  "mens-shirts":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000&q=85",

  "mens-shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=85",

  "mens-watches":
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=85",

  "mobile-accessories":
    "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=1000&q=85",

  motorcycle:
    "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1000&q=85",

  "skin-care":
    "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1000&q=85",

  smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=85",

  "sports-accessories":
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=85",

  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=85",

  tablets:
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1000&q=85",

  tops:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=85",

  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1000&q=85",

  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1000&q=85",

  furniture:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85",

  "womens-bags":
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&q=85",

  "womens-dresses":
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1000&q=85",

  "womens-jewellery":
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1000&q=85",

  "womens-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1000&q=85",

  vehicle:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=85",
};

const getCategoryImage = (category) => {
  return (
    categoryImages[category?.toLowerCase()] ||
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=85"
  );
};

const getCategoryDescription = (category) => {
  const name = formatCategory(category);

  return `Discover popular ${name.toLowerCase()}, new arrivals and great deals selected for you.`;
};

/* =========================================
   HEADER COMPONENT
========================================= */

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [categorySearch, setCategorySearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [search, setSearch] = useState("");
const CART_STORAGE_KEY = "freelancemart-cart";

const [cartCount, setCartCount] = useState(0);

useEffect(() => {  
  const updateCartCount = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      const cartItems = savedCart ? JSON.parse(savedCart) : [];

      const totalItems = Array.isArray(cartItems)
        ? cartItems.reduce(
            (total, item) => total + Number(item.quantity || 1),
            0
          )
        : 0;

      setCartCount(totalItems);
    } catch (error) {
      console.error("Cart count error:", error);
      setCartCount(0);
    }
  };

  updateCartCount();

  window.addEventListener("cartUpdated", updateCartCount);
  window.addEventListener("storage", updateCartCount);

  return () => {
    window.removeEventListener("cartUpdated", updateCartCount);
    window.removeEventListener("storage", updateCartCount);
  };
}, []);
  /* =========================================
     FETCH DYNAMIC CATEGORIES
  ========================================= */

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        setCategoryLoading(true);
        setCategoryError(false);

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load categories");
        }

        const data = await response.json();

        const categoryList = Array.isArray(data) ? data : [];

        setCategories(categoryList);
        setActiveCategory(categoryList[0] || "");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Category API Error:", error);
          setCategoryError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCategoryLoading(false);
        }
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  /* =========================================
     FILTER CATEGORIES
  ========================================= */

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      formatCategory(category)
        .toLowerCase()
        .includes(categorySearch.toLowerCase().trim())
    );
  }, [categories, categorySearch]);

  // Only first 10categories in desktop navigation
  const topCategories = categories.slice(0, 10);

  // Selected preview category
  const previewCategory = filteredCategories.includes(activeCategory)
    ? activeCategory
    : filteredCategories[0] || "";

  /* =========================================
     SEARCH HANDLER
  ========================================= */

  const handleSearch = (event) => {
    event.preventDefault();

    if (!search.trim()) return;

    window.location.href = `/products?search=${encodeURIComponent(
      search.trim()
    )}`;
  };

  /* =========================================
     CATEGORY URL
  ========================================= */

  const categoryHref = (category) =>
    `/categories/${encodeURIComponent(category)}`;

  /* =========================================
     CLOSE MENU
  ========================================= */

  const closeCategories = () => {
    setCategoryOpen(false);
    setCategorySearch("");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCategoryOpen(false);
  };

  /* =========================================
     CATEGORY LIST ITEM
  ========================================= */

  const CategoryItem = ({ category, mobile = false }) => {
    const CategoryIcon = getCategoryIcon(category);
    const isActive = activeCategory === category;

    return (
      <Link
        href={categoryHref(category)}
        onMouseEnter={() => setActiveCategory(category)}
        onFocus={() => setActiveCategory(category)}
        onClick={() => {
          setActiveCategory(category);
          closeCategories();

          if (mobile) {
            closeMobileMenu();
          }
        }}
        className={`group flex min-w-0 items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
          isActive
            ? "border-orange-200 bg-orange-50"
            : "border-transparent hover:border-orange-100 hover:bg-gray-50"
        }`}
      >
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
            isActive
              ? "bg-[#FF5A1F] text-white"
              : "bg-orange-50 text-[#FF5A1F] group-hover:bg-[#FF5A1F] group-hover:text-white"
          }`}
        >
          <CategoryIcon size={18} strokeWidth={1.8} />
        </span>

        <span
          className={`min-w-0 flex-1 text-[12px] font-semibold leading-5 ${
            isActive
              ? "text-[#FF5A1F]"
              : "text-gray-600 group-hover:text-[#101D32]"
          }`}
        >
          {formatCategory(category)}
        </span>

        <ChevronRight
          size={15}
          className={`shrink-0 transition ${
            isActive
              ? "translate-x-0.5 text-[#FF5A1F]"
              : "text-gray-300 group-hover:translate-x-0.5"
          }`}
        />
      </Link>
    );
  };

  /* =========================================
     MAIN JSX
  ========================================= */

  return (
    <header className="relative z-50 w-full border-b border-gray-100 bg-white text-[#101D32]">

      {/* =====================================
          MAIN HEADER
      ===================================== */}

      <div className="mx-auto max-w-[1400px] px-4 sm:px-5">
        <div className="flex min-h-[72px] items-center justify-between gap-4">

          {/* LOGO */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <ShoppingBag
              size={30}
              strokeWidth={2.3}
              className="text-[#FF5A1F]"
            />

            <span className="text-xl font-extrabold tracking-tight sm:text-[22px]">
              Freelance
              <span className="text-[#FF5A1F]">Mart</span>
            </span>
          </Link>

          {/* DESKTOP SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden h-11 max-w-[530px] flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-sm transition focus-within:border-[#FF5A1F] focus-within:shadow-orange-100 md:flex"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, services or freelancers..."
              className="min-w-0 flex-1 px-4 text-sm outline-none"
            />

            <button
              type="submit"
              aria-label="Search"
              className="flex w-12 items-center justify-center bg-[#FF5A1F] text-white transition hover:bg-[#e94c15]"
            >
              <Search size={19} />
            </button>
          </form>

          {/* HEADER ACTIONS */}
          <div className="flex items-center gap-3 sm:gap-5">

            <Link
              href="/wishlist"
              className="flex items-center gap-1.5 transition hover:text-[#FF5A1F]"
            >
              <Heart size={21} strokeWidth={1.8} />

              <span className="hidden text-sm lg:block">
                Wishlist
              </span>
            </Link>

            <div className="hidden h-6 w-px bg-gray-100 sm:block" />

            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 transition hover:text-[#FF5A1F]"
            >
              <ShoppingCart size={22} strokeWidth={1.8} />

             {cartCount > 0 && (
  <span className="absolute -right-2 -top-2 flex min-w-4 h-4 items-center justify-center rounded-full bg-[#FF5A1F] px-1 text-[10px] font-bold text-white">
    {cartCount > 99 ? "99+" : cartCount}
  </span>
)}

              <span className="hidden text-sm lg:block">
                Cart
              </span>
            </Link>

            <div className="hidden h-6 w-px bg-gray-100 sm:block" />

            <Link
              href="/login"
              className="flex items-center gap-1.5 transition hover:text-[#FF5A1F]"
            >
              <UserRound size={21} strokeWidth={1.8} />

              <span className="hidden text-sm sm:block">
                Sign In / Register
              </span>
            </Link>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex items-center justify-center rounded-lg p-2 transition hover:bg-orange-50 md:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================
          DESKTOP CATEGORY NAVIGATION
      ===================================== */}

      <div className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex h-[54px] max-w-[1400px] items-center gap-5 px-5">

          {/* ALL CATEGORIES MEGA MENU */}
          <div
            className="relative flex h-full items-center"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            {/* ALL CATEGORIES BUTTON */}
            <button
              type="button"
              onClick={() => {
                setCategoryOpen((prev) => !prev);
                setCategorySearch("");
              }}
              onFocus={() => setCategoryOpen(true)}
              aria-expanded={categoryOpen}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition duration-200 ${
                categoryOpen
                  ? "bg-[#e94c15]"
                  : "bg-[#FF5A1F] hover:bg-[#e94c15]"
              }`}
            >
              <Grid2X2 size={17} />

              All Categories

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* MEGA MENU */}
            {categoryOpen && (
              <div
                className="absolute left-0 top-full z-[100] w-[1120px] pt-2"
                onMouseEnter={() => setCategoryOpen(true)}
              >
                <div className="grid grid-cols-[1.15fr_0.85fr] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_60px_rgba(16,29,50,0.16)]">

                  {/* LEFT CATEGORY PANEL */}
                  <div className="min-w-0 p-5">

                    {/* TITLE */}
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-[#101D32]">
                          Shop by Category
                        </h3>
                   
                      </div>
                    </div>


                    {/* CATEGORY LIST */}
                    <div className="grid max-h-[355px] grid-cols-2 gap-2 overflow-y-auto pr-1">

                      {categoryLoading ? (
                        <div className="col-span-2 flex items-center justify-center gap-2 py-12 text-sm text-gray-500">
                          <Loader2
                            size={19}
                            className="animate-spin text-[#FF5A1F]"
                          />
                          Loading categories...
                        </div>
                      ) : categoryError ? (
                        <div className="col-span-2 py-10 text-center">
                          <p className="text-sm text-red-500">
                            Unable to load categories.
                          </p>

                          <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-2 text-sm font-semibold text-[#FF5A1F]"
                          >
                            Try again
                          </button>
                        </div>
                      ) : filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                          <CategoryItem
                            key={category}
                            category={category}
                          />
                        ))
                      ) : (
                        <p className="col-span-2 py-10 text-center text-sm text-gray-400">
                          No categories found.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT IMAGE PREVIEW PANEL */}
                  <div className="relative min-h-[480px] overflow-hidden bg-[#101D32]">

                    {previewCategory ? (
                      <>
                        <img
                          key={previewCategory}
                          src={getCategoryImage(previewCategory)}
                          alt={formatCategory(previewCategory)}
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover transition-all duration-500"
                        />

                        {/* IMAGE OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#101D32] via-[#101D32]/40 to-transparent" />

                        {/* IMAGE TOP LABEL */}
                        <div className="absolute left-5 top-5">
                          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#101D32] px-3 py-2 text-[13px] font-semibold text-white backdrop-blur-md">
                            <Sparkles size={13} />
                            Featured Collection
                          </span>
                        </div>

                        {/* IMAGE CONTENT */}
                        <div className="absolute inset-x-0 bottom-0 p-7 text-white">

                          <p className="mb-2 text-xs font-semibold uppercase tracking-[2px] text-orange-300">
                            Discover More
                          </p>

                          <h3 className="mb-3 text-3xl font-extrabold leading-tight">
                            {formatCategory(previewCategory)}
                          </h3>

                          <p className="mb-6 max-w-[280px] text-sm leading-6 text-white/80">
                            {getCategoryDescription(previewCategory)}
                          </p>

                          <Link
                            href={categoryHref(previewCategory)}
                            onClick={closeCategories}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-5 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-[#101D32]"
                          >
                            Explore Now
                            <ChevronRight size={17} />
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full min-h-[480px] items-center justify-center p-8 text-center text-white">
                        <div>
                          <Grid2X2
                            size={42}
                            className="mx-auto mb-4 text-orange-400"
                          />

                          <p className="font-semibold">
                            Select a category
                          </p>

                          <p className="mt-2 text-sm text-white/60">
                            Search for a category to explore its collection.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* FIRST 10 API CATEGORIES */}
          <nav className="flex min-w-0 flex-1 items-center justify-between gap-3 overflow-hidden text-[12px] font-semibold lg:gap-5 lg:text-[14px]">

            {categoryLoading ? (
              <span className="text-xs font-medium text-gray-400">
                Loading categories...
              </span>
            ) : categoryError ? (
              <span className="text-xs font-medium text-red-400">
                Categories unavailable
              </span>
            ) : (
              topCategories.map((category) => (
                <Link
                  key={category}
                  href={categoryHref(category)}
                  className="whitespace-nowrap transition hover:text-[#FF5A1F]"
                  title={formatCategory(category)}
                >
                  {formatCategory(category)}
                </Link>
              ))
            )}
          </nav>
        </div>
      </div>

      {/* =====================================
          MOBILE SEARCH
      ===================================== */}

      <div className="px-4 pb-3 md:hidden">
        <form
          onSubmit={handleSearch}
          className="flex h-10 overflow-hidden rounded-lg border border-gray-200 focus-within:border-[#FF5A1F]"
        >
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or freelancers..."
            className="min-w-0 flex-1 px-3 text-xs outline-none"
          />

          <button
            type="submit"
            aria-label="Search"
            className="bg-[#FF5A1F] px-4 text-white"
          >
            <Search size={18} />
          </button>
        </form>
      </div>

      {/* =====================================
          MOBILE NAVIGATION
      ===================================== */}

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full z-[100] max-h-[75vh] w-full overflow-y-auto border-t border-gray-100 bg-white p-5 shadow-xl md:hidden">

          <nav className="flex flex-col gap-1">

            <Link
              href="/products"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-[#FF5A1F]"
            >
              Shop Products
            </Link>

            <Link
              href="/freelancers"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-[#FF5A1F]"
            >
              Hire Freelancers
            </Link>

            <Link
              href="/services"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-[#FF5A1F]"
            >
              Explore Services
            </Link>

            <Link
              href="/deals"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold text-[#FF5A1F] transition hover:bg-orange-50"
            >
              Deals & Offers
            </Link>

            <Link
              href="/new-arrivals"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-[#FF5A1F]"
            >
              New Arrivals
            </Link>

            <Link
              href="/best-sellers"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-3 text-sm font-semibold transition hover:bg-orange-50 hover:text-[#FF5A1F]"
            >
              Best Sellers
            </Link>
          </nav>

          {/* MOBILE CATEGORIES */}
          <div className="mt-5 border-t border-gray-100 pt-5">

            <button
              type="button"
              onClick={() => setCategoryOpen((prev) => !prev)}
              className="flex w-full items-center justify-between py-2 text-sm font-bold text-[#101D32]"
              aria-expanded={categoryOpen}
            >
              <span className="flex items-center gap-2">
                <Grid2X2
                  size={18}
                  className="text-[#FF5A1F]"
                />

                Browse All Categories
              </span>

              <ChevronDown
                size={18}
                className={`transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <div className="mt-3">

                {/* MOBILE CATEGORY SEARCH */}
                <div className="mb-3 flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 focus-within:border-[#FF5A1F]">
                  <Search size={15} className="text-gray-400" />

                  <input
                    type="search"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full text-xs outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">

                  {categoryLoading ? (
                    <p className="col-span-2 py-5 text-center text-xs text-gray-500">
                      Loading categories...
                    </p>
                  ) : categoryError ? (
                    <p className="col-span-2 py-5 text-center text-xs text-red-500">
                      Unable to load categories.
                    </p>
                  ) : filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <CategoryItem
                        key={category}
                        category={category}
                        mobile
                      />
                    ))
                  ) : (
                    <p className="col-span-2 py-5 text-center text-xs text-gray-400">
                      No categories found.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
  