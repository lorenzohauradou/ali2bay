"use client"

import { Box, Crosshair, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"
import Button from "../ui/Button"
import { motion } from "framer-motion"
import { fetchApi } from "@/config/api"
import { useState, useEffect } from "react"

export default function Header() {
  const [isEbayConnected, setIsEbayConnected] = useState(false)
  
  // Determina l'URL base in base all'ambiente
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://ali2bay.com'
    : 'http://localhost:5001';

  useEffect(() => {
    const checkEbayStatus = async () => {
      try {
        console.log('Checking eBay status...');
        const response = await fetchApi(`${baseUrl}/check-ebay-status`);
        console.log('eBay status response:', response);
        setIsEbayConnected(response.connected);
      } catch (error) {
        console.error('eBay status check failed:', error);
        setIsEbayConnected(false);
      }
    };
    checkEbayStatus();
  }, [baseUrl]);

  const handleEbayConnect = async () => {
    try {
      console.log('Starting eBay connection...'); 
      
      const response = await fetchApi(`${baseUrl}/collega-ebay`);
      console.log('Response from /collega-ebay:', response);
      
      if (response && response.auth_url && response.state) {
        // Salva lo state
        localStorage.setItem('ebay_oauth_state', response.state);
        
        // Fai il redirect
        window.location.href = response.auth_url;
      } else {
        console.error('Invalid response:', response);
        alert('Errore durante la connessione a eBay. Riprova più tardi.');
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Errore durante la connessione a eBay. Riprova più tardi.');
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
              <Button 
                onClick={handleEbayConnect}
                icon={Sparkles}
                variant="primary"
              >
                Connetti a eBay
              </Button>
            ) : (
              <div className="text-[#0066CC] font-medium flex items-center">
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