"use client"

import { Box, Crosshair, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"
import Button from "../ui/Button"
import { motion } from "framer-motion"
import { fetchApi } from "@/config/api"
import { useState, useEffect } from "react"

export default function Header() {
  const [isEbayConnected, setIsEbayConnected] = useState(false)

  useEffect(() => {
    // Verifica stato connessione all'avvio
    const checkEbayStatus = async () => {
      try {
        const response = await fetchApi('/check-ebay-status')
        setIsEbayConnected(response.connected)
      } catch (error) {
        console.error('Errore verifica stato eBay:', error)
      }
    }
    checkEbayStatus()
  }, [])

  const handleEbayConnect = async () => {
    try {
      const response = await fetchApi('/collega-ebay');
      if (response.auth_url) {
        // Salva lo state in localStorage per verificarlo al callback
        localStorage.setItem('ebay_oauth_state', response.state);
        window.location.href = response.auth_url;
      }
    } catch (error) {
      console.error('Errore durante la connessione a eBay:', error);
    }
  };

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
            {!isEbayConnected ? (
              <button
                onClick={handleEbayConnect}
                className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                <span className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Connetti a eBay
                </span>
              </button>
            ) : (
              <div className="text-green-600 font-medium flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Connesso a eBay
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}