
import Link from "next/link";

import {
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

// Footer navigation links
const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Deals & Offers", href: "/deals" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
    ],
  },
  {
    title: "For Freelancers",
    links: [
      { label: "Find Freelancers", href: "/freelancers" },
      { label: "Post a Project", href: "/projects/create" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Freelancer Support", href: "/support" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

// Social media links
const socialLinks = [
  { name: "Facebook", href: "#", icon: FaFacebookF },
  { name: "Instagram", href: "#", icon: FaInstagram },
  { name: "Twitter", href: "#", icon: FaTwitter },
  { name: "Youtube", href: "#", icon: FaYoutube },
  { name: "LinkedIn", href: "#", icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#07182e] text-white">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ff6035]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">

          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">

            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-2"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6035] shadow-lg shadow-[#ff6035]/20 transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110">
                <ShoppingBag
                  size={21}
                  strokeWidth={2.5}
                  className="text-white"
                />
              </span>

              <span className="text-xl font-extrabold tracking-tight">
                Freelance
                <span className="text-[#ff6035]">Mart</span>
              </span>
            </Link>

            <p className="max-w-[375px] text-[14px] leading-7 text-gray-400">
              Shop quality products and connect with talented freelancers.
              Everything you need, all in one place.
            </p>

            {/* Social Icons */}
            <div className="mt-6">
         
              <div className="flex items-center gap-2.5">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      aria-label={social.name}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#ff6035] hover:bg-[#ff6035] hover:text-white hover:shadow-lg hover:shadow-[#ff6035]/20"
                    >
                      <Icon size={15} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="group">

              <h3 className="mb-5 text-sm font-bold tracking-wide text-white">
                {section.title}
                <span className="mt-2 block h-[2px] w-7 rounded-full bg-[#ff6035] transition-all duration-300 group-hover:w-12" />
              </h3>

              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link inline-flex items-center gap-1 text-[14px] text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-[#ff6035]"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-all duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>


      </div>
    </footer>
  );
}
