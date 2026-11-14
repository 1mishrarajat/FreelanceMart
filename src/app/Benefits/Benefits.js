import {
  Truck,
  ShieldCheck,
  Headset,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $50",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "100% Safe & Encrypted",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Always here for you",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "Hassle-free within 7 days",
  },
  {
    icon: BadgeCheck,
    title: "Buyer Protection",
    description: "Shop with confidence",
  },
];

export default function BenefitsBar() {
  return (
    <section className="relative z-30 mx-auto -mt-1 w-full max-w-7xl px-4">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg sm:grid-cols-2 lg:grid-cols-5">

        {benefits.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="relative flex items-center gap-3 px-5 py-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#ff6035]">
                <Icon size={23} strokeWidth={2} />
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-0.5 text-[13px] capitalize text-gray-500">
                  {item.description}
                </p>
              </div>

              {index !== benefits.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-9 -translate-y-1/2 border-r border-gray-200 lg:block" />
              )}
            </div>
          );
        })}

      </div>
    </section>
  );
}