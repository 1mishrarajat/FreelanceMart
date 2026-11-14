
import {
  MapPin,
  ChevronDown,
  Headphones,
  Store,
  Sparkles,
  Phone,
} from "lucide-react";

export default function TopHeader() {
  return (
    <div className="w-full bg-gradient-to-r from-[#101D32] via-[#172942] to-[#101D32] text-white border-b border-white/10">

      <div className="max-w-[1400px] mx-auto px-5 min-h-[42px] flex items-center justify-between gap-4">

        {/* Left: Location */}
        <button
          className="group flex items-center gap-2 text-[14px] font-medium text-gray-200 hover:text-[#FF7138] transition-all duration-300"
        >
          <MapPin
            size={15}
            className="text-[#FF7138] group-hover:scale-110 transition-transform"
          />

          <span>Deliver to</span>

          <span className="font-semibold text-white">
            Australia
          </span>

          <ChevronDown
            size={13}
            className="text-gray-400 group-hover:text-[#FF7138] transition"
          />
        </button>

        {/* Center: Promotional Message */}
        <div className="hidden md:flex items-center gap-2 text-[14px] font-medium">
          <Sparkles size={14} className="text-[#FF7138]" />

          <p className="text-gray-200">
            Shop smarter. Work better.
            <span className="text-[#FF7138] font-semibold ml-1">
              One Marketplace, Endless Possibilities!
            </span>
          </p>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-[14px] font-medium">

          <a
            href="/support"
            className="flex items-center gap-1.5 text-gray-200 hover:text-[#FF7138] transition-colors duration-300"
          >
            <Headphones size={14} />
            <span>Help & Support</span>
          </a>

          <span className="hidden sm:block h-4 w-px bg-white/20" />

          <a
            href="/contact"
            className="hidden sm:flex items-center gap-1.5 text-gray-200 hover:text-[#FF7138] transition-colors duration-300"
          >
            <Phone size={14} />
            <span>Contact Us</span>
          </a>

        </div>

      </div>
    </div>
  );
}
