"use client"

import { Box, Crosshair, Sparkles } from "lucide-react"
import Link from "next/link"
import Button from "../ui/Button"
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
            <Button 
              variant="outline" 
              icon={Crosshair}
              href="/prodotti-vincenti"
            >
              <span className="hidden md:inline">Prodotti Vincenti</span>
            </Button>
            <Button 
              icon={Sparkles}
            >
              <span className="hidden md:inline">Connetti a eBay</span>
              <span className="inline md:hidden">Connetti</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}