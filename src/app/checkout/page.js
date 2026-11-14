
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Lock,
} from "lucide-react";

const STORAGE_KEY = "freelancemart-cart";

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  });

  useEffect(() => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );

      setProducts(Array.isArray(savedCart) ? savedCart : []);
    } catch (error) {
      console.error("Checkout cart error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const subtotal = useMemo(
    () =>
      products.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0
      ),
    [products]
  );

  const discount = useMemo(
    () =>
      products.reduce(
        (sum, item) =>
          sum +
          (Number(item.price || 0) *
            Number(item.quantity || 1) *
            Number(item.discountPercentage || 0)) /
            100,
        0
      ),
    [products]
  );

  const total = subtotal - discount;
  const totalQuantity = products.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!products.length) return;

    setPlacingOrder(true);

    const order = {
      orderId: `FM-${Date.now()}`,
      customer: form,
      products,
      subtotal,
      discount,
      total,
      paymentMethod,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const existingOrders = JSON.parse(
        localStorage.getItem("freelancemart-orders") || "[]"
      );

      localStorage.setItem(
        "freelancemart-orders",
        JSON.stringify([order, ...existingOrders])
      );

      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event("cartUpdated"));

      setOrderPlaced(true);
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Unable to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-9 animate-spin rounded-full border-4 border-orange-100 border-t-[#FF5A1F]" />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FA] px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm">
          <CheckCircle2
            size={65}
            className="mx-auto text-green-500"
          />
          <h1 className="mt-5 text-3xl font-extrabold text-[#101D32]">
            Order Placed!
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Thank you for shopping with FreelanceMart. Your order
            has been saved successfully.
          </p>
          <Link
            href="/products"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF5A1F] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#e94c15]"
          >
            Continue Shopping <ArrowRight size={17} />
          </Link>
        </div>
      </main>
    );
  }

  if (!products.length) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F7F8FA] px-4">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#101D32]">
            Your cart is empty
          </h1>
          <Link
            href="/products"
            className="mt-5 inline-flex rounded-xl bg-[#FF5A1F] px-6 py-3 font-bold text-white"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] pb-16">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl py-4">
  
          <h1 className="mt-1 text-3xl font-extrabold text-[#101D32]">
            Checkout
          </h1>
      
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid items-start gap-7 lg:grid-cols-[1fr_390px]">
            <div className="space-y-6">
              {/* Delivery details */}
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]">
                    <MapPin size={21} />
                  </span>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#101D32]">
                      Delivery Information
                    </h2>
                    <p className="text-xs text-gray-400">
                      Enter your shipping details
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    ["firstName", "First Name", "Enter first name"],
                    ["lastName", "Last Name", "Enter last name"],
                    ["email", "Email Address", "Enter email address", "email"],
                    ["phone", "Contact Number", "Enter phone number", "tel"],
                  ].map(([name, label, placeholder, type = "text"]) => (
                    <div key={name}>
                      <label className="mb-2 block text-sm font-semibold text-[#101D32]">
                        {label} *
                      </label>
                      <input
                        required
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={updateField}
                        placeholder={placeholder}
                        className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-[#101D32]">
                      Street Address *
                    </label>
                    <input
                      required
                      name="address"
                      value={form.address}
                      onChange={updateField}
                      placeholder="House number, street and area"
                      className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                    />
                  </div>

                  {[
                    ["city", "City", "Enter city"],
                    ["state", "State", "Enter state"],
                    ["postalCode", "Post Code", "Enter postal code"],
                    ["country", "Country", "Enter country"],
                  ].map(([name, label, placeholder]) => (
                    <div key={name}>
                      <label className="mb-2 block text-sm font-semibold text-[#101D32]">
                        {label} *
                      </label>
                      <input
                        required
                        name={name}
                        value={form[name]}
                        onChange={updateField}
                        placeholder={placeholder}
                        className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#FF5A1F] focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Payment */}
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-orange-50 text-[#FF5A1F]">
                    <CreditCard size={21} />
                  </span>
                  <div>
                    <h2 className="text-lg font-extrabold text-[#101D32]">
                      Payment Method
                    </h2>
                    <p className="text-xs text-gray-400">
                      Choose how you want to pay
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === "cod" ? "border-[#FF5A1F] bg-orange-50/50" : "border-gray-200"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#FF5A1F]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#101D32]">
                        Cash on Delivery
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Pay when your order arrives
                      </p>
                    </div>
                    <Truck className="text-[#FF5A1F]" size={22} />
                  </label>

                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${paymentMethod === "online" ? "border-[#FF5A1F] bg-orange-50/50" : "border-gray-200"}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={paymentMethod === "online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="accent-[#FF5A1F]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#101D32]">
                        Online Payment
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Card, UPI or Net Banking
                      </p>
                    </div>
                    <CreditCard className="text-[#FF5A1F]" size={22} />
                  </label>
                </div>
              </section>

              <Link
                href="/cart"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#101D32] hover:text-[#FF5A1F]"
              >
                <ArrowLeft size={17} /> Return to Cart
              </Link>
            </div>

            {/* Order summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-5 sm:p-6">
              <h2 className="text-lg font-extrabold text-[#101D32]">
                Your Order
              </h2>

              <div className="mt-5 max-h-72 space-y-4 overflow-y-auto">
                {products.map((product) => (
                  <div key={product.id} className="flex gap-3">
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#F7F8FA] p-2">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="size-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-semibold text-[#101D32]">
                        {product.title}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Qty: {product.quantity || 1}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-[#101D32]">
                      ${(product.price * (product.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-5 border-t border-gray-100" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items ({totalQuantity})</span>
                  <span className="font-semibold text-[#101D32]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount</span>
                  <span className="font-semibold text-green-600">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
              </div>

              <div className="my-5 border-t border-dashed border-gray-200" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#101D32]">Total</span>
                <span className="text-2xl font-extrabold text-[#FF5A1F]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={placingOrder || !products.length}
                className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#FF5A1F] px-4 text-sm font-bold text-white transition hover:bg-[#e94c15] disabled:opacity-60"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
                {!placingOrder && <ArrowRight size={17} />}
              </button>

           <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
  <div className="flex items-center justify-center gap-2">
    <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <Lock size={16} strokeWidth={2.2} />
    </span>

    <div>
      <p className="text-[14px] font-bold text-[#101D32]">
        Secure & Safe Checkout
      </p>
   
    </div>
  </div>

</div>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
}
