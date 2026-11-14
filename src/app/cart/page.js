
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Tag,
  ShieldCheck,
  Truck,
  Loader2,
  ShoppingBasket,
  X,
} from "lucide-react";

const CART_API = "https://dummyjson.com/carts/101";
const STORAGE_KEY = "freelancemart-cart";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [clearing, setClearing] = useState(false);

useEffect(() => {
  const loadCart = () => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("freelancemart-cart") || "[]"
      );

      setProducts(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Cart loading error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  loadCart();

  window.addEventListener("cartUpdated", loadCart);

  return () => {
    window.removeEventListener("cartUpdated", loadCart);
  };
}, []);

const saveCart = (updatedProducts) => {
  setProducts(updatedProducts);

  localStorage.setItem(
    "freelancemart-cart",
    JSON.stringify(updatedProducts)
  );

  window.dispatchEvent(new Event("cartUpdated"));
};

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price || 0);

const updateQuantity = (id, change) => {
  const updated = products.map((product) =>
    product.id === id
      ? {
          ...product,
          quantity: Math.max(
            1,
            Number(product.quantity || 1) + change
          ),
        }
      : product
  );

  saveCart(updated);
};

  // Remove only the selected product.
  const removeProduct = (id) => {
    setDeletingId(id);

    const updated = products.filter((product) => product.id !== id);
    saveCart(updated);

    setDeletingId(null);
  };

  // Delete the complete cart.
  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) {
      return;
    }

    setClearing(true);

    try {
      await fetch(CART_API, {
        method: "DELETE",
      });

      saveCart([]);
    } catch (err) {
      console.error("Cart deletion error:", err);
      saveCart([]);
    } finally {
      setClearing(false);
    }
  };

  const summary = useMemo(() => {
    const subtotal = products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    const discount = products.reduce(
      (sum, product) =>
        sum +
        (product.price *
          product.quantity *
          (product.discountPercentage || 0)) /
          100,
      0
    );

    return {
      subtotal,
      discount,
      total: subtotal - discount,
      quantity: products.reduce(
        (sum, product) => sum + product.quantity,
        0
      ),
    };
  }, [products]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-[#FF5A1F]" size={35} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="font-semibold text-gray-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-xl bg-[#FF5A1F] px-6 py-3 font-bold text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] pb-16">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-[1300px] items-center justify-between px-4 py-7 sm:px-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#FF5A1F]">
              Your Shopping
            </p>
            <h1 className="text-2xl font-extrabold text-[#101D32] sm:text-3xl">
              Shopping Cart
            </h1>
          </div>

          <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]">
            <ShoppingCart size={24} />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-20 text-center shadow-sm">
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-orange-50 text-[#FF5A1F]">
              <ShoppingBasket size={38} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold text-[#101D32]">
              Your cart is empty
            </h2>

            <Link
              href="/Allcategories"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF5A1F] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#e94c15]"
            >
              Continue Shopping
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold text-[#101D32]">
                {products.length} Products
                <span className="ml-2 font-normal text-gray-400">
                  ({summary.quantity} items)
                </span>
              </p>

            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_350px]">
              <div className="space-y-4">
                {products.map((product) => {
                  const itemTotal = product.price * product.quantity;
                  const finalTotal =
                    itemTotal -
                    (itemTotal * (product.discountPercentage || 0)) / 100;

                  return (
                    <div
                      key={product.id}
                      className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7F8FA] p-2 sm:size-32"
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="size-full object-contain mix-blend-multiply"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#FF5A1F]">
                                {product.category?.replaceAll("-", " ")}
                              </p>

                              <Link
                                href={`/products/${product.id}`}
                                className="line-clamp-2 text-sm font-bold text-[#101D32] hover:text-[#FF5A1F] sm:text-base"
                              >
                                {product.title}
                              </Link>

                            </div>

                            <button
                              type="button"
                              onClick={() => removeProduct(product.id)}
                              disabled={deletingId === product.id}
                              aria-label={`Remove ${product.title}`}
                              className="flex size-9 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>

                          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                            <div>
                              <p className="text-[14px] text-gray-400">
                                Unit Price
                              </p>
                              <p className="mt-1 font-bold text-[#101D32]">
                                {formatPrice(product.price)}
                              </p>
                            </div>

                            <div>
                              <p className="mb-1.5 text-[14px] text-gray-400">
                                Quantity
                              </p>

                              <div className="flex h-9 items-center rounded-lg border border-gray-200">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.id, -1)}
                                  disabled={product.quantity <= 1}
                                  className="flex size-9 items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-[#FF5A1F] disabled:opacity-30"
                                >
                                  <Minus size={14} />
                                </button>

                                <span className="min-w-9 text-center text-sm font-bold text-[#101D32]">
                                  {product.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() => updateQuantity(product.id, 1)}
                                  className="flex size-9 items-center justify-center text-gray-500 hover:bg-orange-50 hover:text-[#FF5A1F]"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>

                            <div className="text-right">
                              <p className="text-[14px] text-gray-400">
                                Item Total
                              </p>
                              <p className="mt-1 text-base font-extrabold text-[#FF5A1F]">
                                {formatPrice(finalTotal)}
                              </p>

                              {product.discountPercentage > 0 && (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(itemTotal)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                
              </div>

              <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-5">
                <h2 className="text-lg font-extrabold text-[#101D32]">
                  Order Summary
                </h2>

                <div className="my-5 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Products</span>
                    <span className="font-bold text-[#101D32]">
                      {products.length}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Quantity</span>
                    <span className="font-bold text-[#101D32]">
                      {summary.quantity}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-[#101D32]">
                      {formatPrice(summary.subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-green-600">
                      <Tag size={14} />
                      Discount
                    </span>
                    <span className="font-bold text-green-600">
                      -{formatPrice(summary.discount)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-[#101D32]">
                      Total Amount
                    </span>
                    <span className="text-2xl font-extrabold text-[#FF5A1F]">
                      {formatPrice(summary.total)}
                    </span>
                  </div>
                </div>

                <Link
  href="/checkout"
  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#FF5A1F] text-sm font-bold text-white transition hover:bg-[#e94c15]"
>
  Proceed to Checkout
  <ArrowRight size={17} />
</Link>

    
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
