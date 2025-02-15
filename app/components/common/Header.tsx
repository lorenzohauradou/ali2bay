"use client"

import { Box, Crosshair, Sparkles } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <Box className="h-8 w-8 text-[#0066CC]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#FF6B00] rounded-full" />
            </div>
            <h1 className="text-2xl font-bold text-[#0066CC]">Ali2Bay</h1>
          </Link>

          <div className="flex items-center gap-4">
            <Link 
              href="/prodotti-vincenti"
              className="px-4 py-2 border border-gray-200 rounded-md flex items-center gap-2 text-gray-600 hover:bg-gray-50/80"
            >
              <Crosshair className="h-4 w-4" />
              <span className="hidden md:inline">Prodotti Vincenti</span>
            </Link>
            <button className="px-4 py-2 bg-[#FF6B00] text-white rounded-md flex items-center gap-2 
              hover:bg-[#FF6B00]/90 transition-colors
              md:scale-100
              origin-right"
            >
              <Sparkles className="h-4 w-4" />
              <span className="hidden md:inline">Connetti a eBay</span>
              <span className="inline md:hidden">Connetti</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}