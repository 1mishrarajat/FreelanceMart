"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/image/hero-freelancer.png",
    alt: "Freelancer marketplace banner 1",
    tag: "Your Trusted Freelance Marketplace",
    title: "Find the Right Freelancers", 
    description:
      "Connect with talented professionals, discover quality services, and bring your ideas to life. Find the perfect freelancer for every project.",
    buttonText: "Find Freelancers",
    buttonLink: "/freelancers",
    secondButtonText: "Become a Freelancer",
    secondButtonLink: "/become-a-freelancer",
  },
  {
    id: 2,
    image: "/image/homeslider2.png",
    alt: "Hire professional freelancers",
    tag: "Work With Top Professionals",
    title: "Turn Your Ideas",
    description:
      "Discover skilled freelancers ready to help you build, grow, and achieve your business goals with confidence.",
    buttonText: "Explore Services",
    buttonLink: "/services",
    secondButtonText: "Join as Freelancer",
    secondButtonLink: "/become-a-freelancer",
  },
  {
    id: 3,
    image: "/image/homeslider3.png",
    alt: "Grow your freelance career",
    tag: "Build Your Freelance Career",
    title: "Your Skills & Freelance Career ",
    description:
      "Showcase your talent, connect with potential clients, and discover exciting opportunities to grow your freelance career.",
    buttonText: "Get Started",
    buttonLink: "/register",
    secondButtonText: "Explore Jobs",
    secondButtonLink: "/jobs",
  },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">

      {/* SLIDER CONTAINER */}
      <div className="relative h-[480px]">

        {/* BACKGROUND SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === index
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />

            {/* DARK GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />

            {/* BOTTOM OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        ))}

        {/* LEFT SIDE CONTENT */}
        <div className="absolute inset-0 z-20 flex items-center">

          <div className="mx-auto w-full  py-4 px-10">

            <div
              key={activeSlide}
              className="max-w-2xl animate-[fadeIn_0.8s_ease-in-out]"
            >

              {/* TAG */}
              <div className="mb-5 text-[14px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#ff6035]" />
                {slides[activeSlide].tag}
              </div>

              {/* HEADING */}
              <h1 className="mb-5 text-[48px] font-bold leading-tight text-white">
                {slides[activeSlide].title}
                <span className="block text-[#ff6035]">
                  {slides[activeSlide].highlight}
                </span>
                <span className="block">
                  {slides[activeSlide].subtitle}
                </span>
              </h1>

              {/* DESCRIPTION */}
              <p className="mb-8 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8 lg:text-lg">
                {slides[activeSlide].description}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">

                <a
                  href={slides[activeSlide].buttonLink}
                  className="group inline-flex items-center gap-2 rounded-lg bg-[#ff6035] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#ff6035] sm:px-7 sm:py-4 sm:text-base"
                >
                  {slides[activeSlide].buttonText}
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href={slides[activeSlide].secondButtonLink}
                  className="inline-flex items-center justify-center rounded-lg border border-white/80 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-gray-900 sm:px-7 sm:py-4 sm:text-base"
                >
                  {slides[activeSlide].secondButtonText}
                </a>

              </div>

            </div>
          </div>
        </div>



        {/* PAGINATION DOTS */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5">

          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeSlide === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "w-9 bg-[#ff6035]"
                  : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}