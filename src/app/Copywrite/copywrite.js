
import Link from "next/link";

export default function Copywrite() {
  return (
    <section className="w-full border-t border-white/10 bg-[#04101f]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-3  md:flex-row">

        {/* Copyright Text */}
        <p className="text-center text-[14px] leading-6 text-gray-400">
          © {new Date().getFullYear()}{" "}
          <Link
            href="/"
            className="font-semibold text-white transition-colors duration-300 hover:text-[#ff6035]"
          >
            Freelance
            <span className="text-[#ff6035]">Mart</span>
          </Link>
          . All Rights Reserved.
        </p>

        {/* Footer Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">

          <Link
            href="/privacy"
            className="text-[14px] text-gray-400 transition-all duration-300 hover:text-[#ff6035]"
          >
            Privacy Policy
          </Link>

          <span className="h-3 w-px bg-gray-700" />

          <Link
            href="/terms"
            className="text-[14px] text-gray-400 transition-all duration-300 hover:text-[#ff6035]"
          >
            Terms & Conditions
          </Link>

          <span className="h-3 w-px bg-gray-700" />

          <Link
            href="/contact"
            className="text-[14px] text-gray-400 transition-all duration-300 hover:text-[#ff6035]"
          >
            Contact Us
          </Link>

        </div>

      </div>
    </section>
  );
}
