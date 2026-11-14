"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  Loader2,
  Check,
  Package,
  BadgeCheck,
  Headphones,
  ArrowRight,
  Sparkles,
  Share2,
  Info,
} from "lucide-react";

const ORANGE = "#FF5A1F";

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-7">
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A1F]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}


export default function ProductDetailsPage() {
  const params = useParams();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setProduct(null);
        setQuantity(1);
        setAdded(false);

        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0] || "");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Unable to load product:", error);
          setProduct(null);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    return [...new Set([product.thumbnail, ...(product.images || [])].filter(Boolean))];
  }, [product]);

  if (loading) {
    return (
      <>
   
        <main className="flex min-h-[55vh] items-center justify-center bg-[#faf9f7]">
          <div className="text-center">
            <Loader2 className="mx-auto animate-spin text-[#FF5A1F]" size={38} />
            <p className="mt-4 text-sm font-medium text-slate-500">Loading product details...</p>
          </div>
        </main>
   
      </>
    );
  }

  if (!product) {
    return (
      <>
           <main className="flex min-h-[55vh] items-center justify-center bg-[#faf9f7] px-4">
          <div className="max-w-md text-center">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-[#FF5A1F]">
              <Package size={30} />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-slate-900">Product not found</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This product may have been removed or the link may be incorrect.
            </p>
            <Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e94d15]">
              Back to home <ArrowRight size={16} />
            </Link>
          </div>
        </main>

      </>
    );
  }

  const discount = Math.round(product.discountPercentage || 0);
  const rating = Number(product.rating || 0);
  const originalPrice = discount > 0
    ? product.price / (1 - discount / 100)
    : null;
  const stockAvailable = Number(product.stock || 0) > 0;
  const faqItems = [
    {
      question: "What is included with this product?",
      answer: `You will receive the ${product.title}. Please check the product images and specifications above for the available details and included items.`,
    },
    {
      question: "How long does delivery take?",
      answer: "Delivery estimates depend on your location and the seller's fulfilment time. The delivery details shown during checkout will provide the most accurate estimate for your order.",
    },
    {
      question: "Can I return or exchange this item?",
      answer: product.returnPolicy || "Return and exchange eligibility depends on the product and applicable store policy. Please review the return information before placing your order.",
    },
    {
      question: "Does this product include a warranty?",
      answer: product.warrantyInformation || "Warranty information has not been provided for this product. Please contact customer support if you need confirmation before purchasing.",
    },
    {
      question: "How can I get help with my order?",
      answer: "Visit the Contact Us page and share your order details with the support team. They can help with product, delivery and return-related questions.",
    },
  ];

  const specs = [
    ["Brand", product.brand || "Not specified"],
    ["Category", product.category || "Not specified"],
    ["SKU", product.sku || "Not available"],
    ["Availability", product.availabilityStatus || (stockAvailable ? "In stock" : "Out of stock")],
    ["Stock", stockAvailable ? `${product.stock} units available` : "Currently unavailable"],
    ["Weight", product.weight != null ? `${product.weight} kg` : "Not specified"],
    ["Dimensions", product.dimensions
      ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`
      : "Not specified"],
    ["Warranty", product.warrantyInformation || "Not specified"],
    ["Shipping", product.shippingInformation || "Details at checkout"],
    ["Return policy", product.returnPolicy || "See store policy"],
  ];

const handleAddToCart = () => {
  try {
    const savedCart = JSON.parse(
      localStorage.getItem("freelancemart-cart") || "[]"
    );

    const existingProduct = savedCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = savedCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: Number(item.quantity || 1) + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...savedCart,
        {
          ...product,
          quantity: quantity,
        },
      ];
    }

    localStorage.setItem(
      "freelancemart-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setAdded(true);
  } catch (error) {
    console.error("Unable to add product to cart:", error);
  }
};

  return (
    <>
    

      <main className="min-h-screen bg-[#faf9f7] pb-16">
        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 sm:text-sm">
            <Link href="/" className="transition hover:text-[#FF5A1F]">Home</Link>
            <ChevronRight size={14} />
            <Link href="/Category" className="capitalize transition hover:text-[#FF5A1F]">
              {product.category || "Products"}
            </Link>
            <ChevronRight size={14} />
            <span className="max-w-[220px] truncate text-slate-700">{product.title}</span>
          </nav>

          {/* Main product panel */}
          <section className="grid overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_18px_60px_-35px_rgba(15,23,42,0.22)] lg:grid-cols-[1.05fr_0.95fr]">
            {/* Gallery */}
            <div className="p-4 sm:p-7 lg:p-9">
              <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-[22px] bg-[#f7f6f3] sm:min-h-[510px]">
                <div className="absolute left-5 top-5 z-10 flex flex-col gap-2">
                  {discount > 0 && (
                    <span className="w-fit rounded-full bg-[#FF5A1F] px-3.5 py-2 text-[11px] font-extrabold tracking-wide text-white shadow-lg shadow-orange-500/20">
                      SAVE {discount}%
                    </span>
                  )}
                  {product.tags?.includes("new") && (
                    <span className="w-fit rounded-full bg-slate-900 px-3.5 py-2 text-[11px] font-bold text-white">NEW ARRIVAL</span>
                  )}
                </div>
                <span className="absolute bottom-5 right-5 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500 backdrop-blur">
                  {images.length} images
                </span>
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    alt={product.title}
                    fill
                    priority
                    unoptimized
                    className="object-contain p-8 sm:p-12"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                )}
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === image}
                    onClick={() => setSelectedImage(image)}
                    className={`relative size-[76px] shrink-0 overflow-hidden rounded-2xl border-2 bg-[#f8f7f5] transition sm:size-[88px] ${
                      selectedImage === image
                        ? "border-[#FF5A1F] ring-4 ring-orange-100"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <Image src={image} alt={`${product.title} view ${index + 1}`} fill unoptimized className="object-contain p-2" sizes="88px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product content */}
            <div className="flex flex-col px-5 pb-7 pt-2 sm:px-8 sm:pb-9 lg:px-10 lg:py-10">
              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#FF5A1F]">
                  <Sparkles size={14} />
                  {product.brand || product.category || "Featured product"}
                </p>
                <button
                  type="button"
                  onClick={() => setIsWishlisted((value) => !value)}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  aria-pressed={isWishlisted}
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition ${
                    isWishlisted
                      ? "border-rose-200 bg-rose-50 text-rose-500"
                      : "border-slate-200 text-slate-500 hover:border-rose-200 hover:text-rose-500"
                  }`}
                >
                  <Heart size={19} className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>

              <h1 className="mt-4 text-[27px] font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} className={index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-800">{rating.toFixed(1)}</span>
                <span className="text-xs text-slate-400">({product.reviews?.length || 0} customer reviews)</span>
                <span className="hidden h-4 w-px bg-slate-200 sm:block" />
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${stockAvailable ? "text-emerald-600" : "text-rose-500"}`}>
                  <span className={`size-1.5 rounded-full ${stockAvailable ? "bg-emerald-500" : "bg-rose-500"}`} />
                  {stockAvailable ? "In stock" : "Out of stock"}
                </span>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </span>
                {originalPrice && (
                  <>
                    <span className="pb-1 text-lg text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                    <span className="mb-1 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#FF5A1F]">
                      You save {discount}%
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-400">Inclusive of applicable taxes. Shipping calculated at checkout.</p>

              <p className="mt-6 text-sm leading-7 text-slate-600">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {(product.tags || []).slice(0, 4).map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold capitalize text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#faf9f7] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Quantity</p>
                    <p className="mt-1 text-xs text-slate-400">{stockAvailable ? `${product.stock} available` : "Currently unavailable"}</p>
                  </div>
                  <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">
                    <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={!stockAvailable || quantity <= 1} aria-label="Decrease quantity" className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:text-[#FF5A1F] disabled:opacity-30">
                      <Minus size={16} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold text-slate-900">{quantity}</span>
                    <button type="button" onClick={() => setQuantity((value) => Math.min(Number(product.stock), value + 1))} disabled={!stockAvailable || quantity >= product.stock} aria-label="Increase quantity" className="flex h-full w-11 items-center justify-center text-slate-500 transition hover:text-[#FF5A1F] disabled:opacity-30">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                <button
                  type="button"
                  disabled={!stockAvailable}
                  onClick={handleAddToCart}
                  className="flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#FF5A1F] px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#e94d15] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {added ? <Check size={19} /> : <ShoppingBag size={19} />}
                  {added ? "Added to Cart" : "Add to Cart"}
                </button>
                <button type="button" onClick={() => navigator?.share?.({ title: product.title, url: window.location.href })} className="flex size-14 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#FF5A1F] hover:text-[#FF5A1F]" aria-label="Share product">
                  <Share2 size={19} />
                </button>
              </div>

              {added && (
                <p role="status" className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <Check size={15} /> Added {quantity} item{quantity > 1 ? "s" : ""} to your cart successfully.
                </p>
              )}

              <div className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]"><Truck size={19} /></span>
                  <div><p className="text-xs font-bold text-slate-800">Fast delivery</p><p className="mt-1 text-[11px] text-slate-400">Reliable shipping</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]"><ShieldCheck size={19} /></span>
                  <div><p className="text-xs font-bold text-slate-800">Secure payment</p><p className="mt-1 text-[11px] text-slate-400">Protected checkout</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]"><RotateCcw size={19} /></span>
                  <div><p className="text-xs font-bold text-slate-800">Easy returns</p><p className="mt-1 text-[11px] text-slate-400">Hassle-free support</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Product details tabs */}
          <section className="mt-10 rounded-[26px] border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
              {[
                ["description", "Description"],
                ["specifications", "Specifications"],
                ["reviews", `Reviews (${product.reviews?.length || 0})`],
              ].map(([key, label]) => (
                <button key={key} type="button" onClick={() => setActiveTab(key)} className={`rounded-full px-5 py-2.5 text-xs font-bold transition sm:text-sm ${activeTab === key ? "bg-[#FF5A1F] text-white shadow-md shadow-orange-500/20" : "bg-slate-50 text-slate-500 hover:bg-orange-50 hover:text-[#FF5A1F]"}`}>
                  {label}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <div className="grid gap-8 pt-7 md:grid-cols-[1fr_0.8fr]">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Product overview</h2>
                  <p className="mt-3 text-sm leading-8 text-slate-600">{product.description}</p>
                  <div className="mt-6 flex items-start gap-3 rounded-2xl bg-orange-50/70 p-4">
                    <Info size={18} className="mt-0.5 shrink-0 text-[#FF5A1F]" />
                    <p className="text-xs leading-6 text-slate-600">Product information is provided by the product catalogue. Please review the specifications and store policies before ordering.</p>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#faf9f7] p-5">
                  <h3 className="font-bold text-slate-900">At a glance</h3>
                  <dl className="mt-4 space-y-4">
                    {specs.slice(0, 4).map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 border-b border-slate-200/70 pb-3 text-xs">
                        <dt className="text-slate-500">{label}</dt>
                        <dd className="text-right font-semibold capitalize text-slate-800">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid gap-x-10 pt-5 sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-5 border-b border-slate-100 py-4 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="max-w-[60%] text-right font-semibold capitalize text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="pt-6">
                <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-[#faf9f7] p-5">
                  <div><p className="text-4xl font-extrabold text-slate-900">{rating.toFixed(1)}<span className="text-lg text-slate-400">/5</span></p><div className="mt-2 flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} className={i < Math.round(rating) ? "fill-current" : "text-slate-300"} />)}</div></div>
                  <div><p className="text-sm font-bold text-slate-800">Customer feedback</p><p className="mt-1 text-xs text-slate-500">Based on {product.reviews?.length || 0} available review{product.reviews?.length === 1 ? "" : "s"}.</p></div>
                </div>
                {product.reviews?.length ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {product.reviews.map((review, index) => (
                      <article key={`${review.reviewerEmail || review.reviewerName}-${index}`} className="rounded-2xl border border-slate-100 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div><p className="text-sm font-bold text-slate-900">{review.reviewerName || "Verified customer"}</p><p className="mt-1 text-[11px] text-slate-400">{review.date ? new Date(review.date).toLocaleDateString() : "Customer review"}</p></div>
                          <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600"><Star size={12} className="fill-current" />{review.rating}</span>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-600">{review.comment}</p>
                      </article>
                    ))}
                  </div>
                ) : <p className="text-sm text-slate-500">No written reviews are available for this product yet.</p>}
              </div>
            )}
          </section>

          {/* FAQ accordion */}
          <section className="mt-14">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 text-center">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#FF5A1F]">Need a little help?</p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Frequently asked questions</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">Quick answers to common questions about this product and your order.</p>
              </div>
              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={item.question} className={`overflow-hidden rounded-2xl border bg-white transition ${activeFaq === index ? "border-orange-200 shadow-sm" : "border-slate-100"}`}>
                    <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6">
                      <span className="flex items-center gap-3 text-sm font-bold text-slate-800"><span className={`flex size-8 shrink-0 items-center justify-center rounded-xl text-xs ${activeFaq === index ? "bg-orange-50 text-[#FF5A1F]" : "bg-slate-50 text-slate-400"}`}>{String(index + 1).padStart(2, "0")}</span>{item.question}</span>
                      <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${activeFaq === index ? "rotate-180 text-[#FF5A1F]" : ""}`} />
                    </button>
                    {activeFaq === index && <div className="px-5 pb-5 pl-[4.25rem] sm:px-6 sm:pb-6 sm:pl-[4.75rem]"><p className="text-sm leading-7 text-slate-500">{item.answer}</p></div>}
                  </div>
                ))}
              </div>

            </div>
          </section>
        </div>
      </main>
    </>
  );
}
