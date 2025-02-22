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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || (
    process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5001'
      : 'https://api.ali2bay.com'
  );

  useEffect(() => {
    // Controlla i parametri URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('ebay_connected') === 'true') {
      setIsEbayConnected(true);
      // Rimuovi i parametri dall'URL
      window.history.replaceState({}, '', window.location.pathname);
    }
    
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
      console.log("Iniziando connessione eBay...");
      const response = await fetch(`${baseUrl}/collega-ebay`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log("Risposta collega-ebay:", data);
      
      // Salva lo state localmente come backup
      localStorage.setItem('ebay_state', data.state);
      
      // Reindirizza il browser all'URL di autorizzazione eBay
      window.location.href = data.auth_url;
      
    } catch (error) {
      console.error('Errore durante la connessione:', error);
    }
  };

  useEffect(() => {
    console.log("useEffect eseguito");
    console.log("URL corrente:", window.location.href);
    
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    console.log("Parametri URL:", { error, code, state });
    
    if (error) {
        console.error('Errore eBay:', error);
        return;
    }
    
    if (code && state) {
        console.log("Codice e state ricevuti, chiamata callback...");
        
        fetch(`${baseUrl}/ebay-callback?code=${code}&state=${state}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Risposta callback:", data);
            if (data.status === 'success') {
                window.location.href = '/';  // Redirect alla home dopo il successo
            } else {
                console.error('Errore:', data.message);
            }
        })
        .catch(error => {
            console.error('Errore durante il callback:', error);
        });
    }
  }, [baseUrl]);

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
                <span className="md:hidden">Connetti</span>
                <span className="hidden md:inline">Connetti a eBay</span>
              </Button>
            ) : (
              <div className="text-[#0066CC] font-medium flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="md:hidden">Connesso</span>
                <span className="hidden md:inline">Connesso a eBay</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}