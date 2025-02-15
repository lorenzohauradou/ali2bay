"use client"

import { Box, Crosshair, Sparkles } from "lucide-react"
import Link from "next/link"
import Button from "../ui/Button"
import { motion } from "framer-motion"

export default function Header() {
  const logoVariants = {
    tap: {
      scale: 0.80,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div whileTap="tap" variants={logoVariants}>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <Box className="h-8 w-8 text-[#0066CC]" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#FF6B00] rounded-full" />
              </div>
              <h1 className="text-2xl font-bold text-[#0066CC]">Ali2Bay</h1>
            </Link>
          </motion.div>

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