
"use client";

import Link from "next/link";

import {
  Star,
  ArrowRight,
  BadgeCheck,
  MessageCircle,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Sydney, Australia",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    review:
      "Amazing product quality and super fast delivery. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Daniel Cooper",
    location: "Melbourne, Australia",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    review:
      "Great marketplace! I not only shop here but also hire talented freelancers for my business.",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Watson",
    location: "Brisbane, Australia",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=faces",
    review:
      "Excellent service and a smooth experience. Love the wide range of products and services!",
    rating: 5,
  },
];

export default function CustomerReviews() {
  return (
    <section className="bg-[#efefef] py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="mb-5 flex items-center justify-between gap-3">

          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-orange-50">
              <Star
                size={20}
                fill="currentColor"
                className="text-[#FF9D16]"
              />
            </span>

            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-[#101D32] sm:text-xl">
                What Our Customers Say
              </h2>

              <p className="hidden text-xs text-gray-400 sm:block">
                Real experiences from our community
              </p>
            </div>
          </div>
        </div>

        {/* REVIEW CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="group flex gap-3.5 rounded-2xl border border-gray-200 bg-[#ffffff] p-4 shadow-[0_3px_12px_rgba(16,29,50,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-[0_12px_28px_rgba(16,29,50,0.08)] sm:gap-4 sm:p-4"
            >

              {/* CUSTOMER IMAGE */}
              <div className="shrink-0">
                <img
                  src={review.image}
                  alt={review.name}
                  loading="lazy"
                  className="size-12 rounded-full border-2 border-orange-50 object-cover sm:size-14"
                />
              </div>

              {/* REVIEW CONTENT */}
              <div className="min-w-0 flex-1">

                {/* STARS */}
                <div
                  className="mb-1.5 flex items-center gap-0.5"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={13}
                      fill="#FF9D16"
                      stroke="#FF9D16"
                    />
                  ))}
                </div>

                {/* REVIEW TEXT */}
                <p className="min-h-[40px] text-xs font-medium leading-[1.6] text-[#344054] sm:text-[13px]">
                  "{review.review}"
                </p>

                {/* CUSTOMER DETAILS */}
                <div className="mt-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <h3 className="text-xs font-extrabold text-[#101D32]">
                      {review.name}
                    </h3>

                    <BadgeCheck
                      size={14}
                      fill="#1687F8"
                      stroke="white"
                      aria-label="Verified customer"
                    />
                  </div>

                  <p className="mt-0.5 text-[10px] font-medium text-gray-400 sm:text-[11px]">
                    {review.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
