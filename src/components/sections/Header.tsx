"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

const navigation = [
  {
    name: "Products",
    href: "#products",
    items: [
      {
        name: "Ledger Stax",
        description: "Premium from every angle",
        href: "#",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/ledger-stax-face.webp?v=1738140795"
      },
      {
        name: "Ledger Flex",
        description: "The new standard",
        href: "#",
        badge: "New Colors",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/flex_magenta_front_desktop.webp?v=1760980832"
      },
      {
        name: "Ledger Nano Gen5",
        description: "As unique as you are",
        href: "#",
        badge: "New",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/lng5_desktop.webp?v=1760980866"
      },
      {
        name: "Ledger Nano Classics",
        description: "Reliable backup protection",
        href: "#",
        badge: "New Colors",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/classic_nanos_desktop.webp?v=1760980844"
      }
    ]
  },
  {
    name: "Apps and Services",
    href: "#apps",
    items: [
      {
        name: "Ledger Wallet",
        description: "Our crypto wallet app and web3 gateway",
        href: "#",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/ledger-live-app-face.webp?v=1738140795"
      },
      {
        name: "Recovery Solutions",
        description: "Stay safe with a combination of backups",
        href: "#",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/recovery_solutions_desktop.webp?v=1760980844"
      },
      {
        name: "Ledger Multisig",
        description: "The new standard for Multisig Security",
        href: "#",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/multisig_desktop.webp?v=1760980696"
      },
      {
        name: "Card",
        description: "Spend crypto or use it as collateral",
        href: "#",
        image: "https://cdn.shopify.com/s/files/1/2974/4858/files/ledger-card-face.webp?v=1738140795"
      }
    ]
  },
  { name: "Learn", href: "#learn" },
  { name: "For Business", href: "#business" }
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
            <svg viewBox="0 0 100 100" className="h-8 w-8" fill="currentColor">
              <circle cx="50" cy="50" r="45" fill="currentColor"/>
              <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold">L</text>
            </svg>
            <span className="text-xl font-bold">Ledger</span>
          </a>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative"
              onMouseEnter={() => item.items && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <a
                href={item.href}
                className="flex items-center gap-1 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
              >
                {item.name}
                {item.items && <ChevronDown className="h-4 w-4" />}
              </a>
              
              {item.items && openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {item.items.map((subItem) => (
                      <div
                        key={subItem.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <img
                          src={subItem.image}
                          alt={subItem.name}
                          className="h-12 w-12 flex-none rounded-lg"
                        />
                        <div className="flex-auto">
                          <div className="flex items-center gap-2">
                            <a href={subItem.href} className="block font-semibold text-gray-900">
                              {subItem.name}
                            </a>
                            {subItem.badge && (
                              <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {subItem.badge}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-gray-600">{subItem.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button variant="default" className="bg-black text-white hover:bg-gray-800">
            Buy Now
          </Button>
        </div>
      </nav>
      
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-3xl sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <svg viewBox="0 0 100 100" className="h-8 w-8" fill="currentColor">
                  <circle cx="50" cy="50" r="45" fill="currentColor"/>
                  <text x="50" y="65" textAnchor="middle" fill="white" fontSize="40" fontWeight="bold">L</text>
                </svg>
                <span className="text-xl font-bold">Ledger</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Button variant="default" className="w-full bg-black text-white hover:bg-gray-800">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}