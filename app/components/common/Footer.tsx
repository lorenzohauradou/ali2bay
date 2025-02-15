"use client"

import Link from "next/link"
import { Box } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Box className="h-8 w-8 text-[#0066CC]" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#FF6B00] rounded-full" />
              </div>
              <h1 className="text-2xl font-bold text-[#0066CC]">Ali2Bay</h1>
            </Link>
            <p className="text-gray-600">
              La piattaforma più veloce per fare dropshipping da Amazon e AliExpress su eBay.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/prodotti-vincenti" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Prodotti Vincenti
                </Link>
              </li>
              <li>
                <Link href="/come-funziona" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Come Funziona
                </Link>
              </li>
              <li>
                <Link href="/prezzi" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Prezzi
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Supporto</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contatti" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Contattaci
                </Link>
              </li>
              <li>
                <Link href="/guida" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Guida
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/termini" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link href="/cookie" className="text-gray-600 hover:text-[#0066CC] transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Ali2Bay. Tutti i diritti riservati.
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                Sistema operativo
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">Made in Italy 🇮🇹</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}