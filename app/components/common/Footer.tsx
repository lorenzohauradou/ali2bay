"use client"

import Link from "next/link"
import { Box } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column - a tutta larghezza su mobile */}
          <div className="space-y-4 text-center md:text-left col-span-full md:col-span-1">
            <Link href="/" className="inline-flex md:flex items-center gap-3 justify-center md:justify-start">
              <div className="relative">
                <Box className="h-8 w-8 text-[#0066CC]" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#FF6B00] rounded-full" />
              </div>
              <h1 className="text-2xl font-bold text-[#0066CC]">Ali2Bay</h1>
            </Link>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0">
              La piattaforma <span className="font-semibold text-gray-600">più veloce</span> per fare <span className="font-semibold text-gray-600">dropshipping</span> da <span className="font-semibold text-gray-600">Amazon</span> e <span className="font-semibold text-gray-600">AliExpress</span> su <span className="font-semibold text-gray-600">eBay</span>.
            </p>
          </div>

          {/* Links Sections - layout a griglia 2x2 su mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 col-span-full md:col-span-3 gap-8 md:gap-12">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/prodotti-vincenti" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Prodotti Vincenti
                  </Link>
                </li>
                <li>
                  <Link href="/come-funziona" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Come Funziona
                  </Link>
                </li>
                <li>
                  <Link href="/prezzi" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Prezzi
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Supporto</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contatti" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Contattaci
                  </Link>
                </li>
                <li>
                  <Link href="/guida" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Guida
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center md:text-left col-span-2 md:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/termini" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Termini di Servizio
                  </Link>
                </li>
                <li>
                  <Link href="/cookie" className="text-gray-600 hover:text-[#0066CC] transition-colors text-sm md:text-base">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - stack su mobile */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-gray-500 text-xs md:text-sm order-2 md:order-1">
              © {new Date().getFullYear()} Ali2Bay. Tutti i diritti riservati.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 order-1 md:order-2">
              <span className="flex items-center gap-1 text-xs md:text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Sistema operativo
              </span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="text-xs md:text-sm text-gray-500">Made in Italy 🇮🇹</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}