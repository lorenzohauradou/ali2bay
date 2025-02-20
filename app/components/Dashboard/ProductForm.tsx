"use client"

import { useState, useRef, useEffect } from "react"
import { Rocket, CheckCircle, AlertCircle } from "lucide-react"
import Button from "../ui/Button"
import PriceManipulator from "@/app/components/Dashboard/PriceManipulator"
import ProTip from "../ui/ProTip"
import { fetchApi } from "@/config/api"
import { motion, AnimatePresence } from 'framer-motion'

type ApiResponse = {
  success: boolean;
  errors?: Array<{ error: string }>;
  error?: string;
}

export default function ProductForm() {
  const [urls, setUrls] = useState("")
  const [priceRounding, setPriceRounding] = useState(".99")
  const [multiplier, setMultiplier] = useState(2.75)
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isEbayConnected, setIsEbayConnected] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const checkEbayStatus = async () => {
      try {
        const response = await fetchApi('/check-ebay-status', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        })
        
        console.log('eBay status response:', response)
        
        if (response && typeof response.connected === 'boolean') {
          setIsEbayConnected(response.connected)
        } else {
          console.error('Risposta non valida:', response)
          setIsEbayConnected(false)
        }
      } catch (error) {
        console.error('Errore verifica stato eBay:', error)
        setIsEbayConnected(false)
      }
    }
    checkEbayStatus()
  }, [])

  const handleSuccess = () => {
    setSuccess(true)
    setShowSuccess(true)
    setUrls('')
    
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setShowSuccess(false)
    
    if (!isEbayConnected) {
      setError('Devi prima connetterti a eBay')
      return
    }

    if (!urls.trim()) {
      setError('Inserisci almeno un URL')
      return
    }

    setLoading(true)
    try {
      const response: ApiResponse = await fetchApi('/scrape', {
        method: 'POST',
        body: JSON.stringify({ 
          urls: urls.split('\n').map(url => url.trim()).filter(Boolean),
          price_settings: {
            multiplier: parseFloat(multiplier.toString()),
            rounding: priceRounding
          }
        })
      })

      if (response.success) {
        handleSuccess()
        if (response.errors && response.errors.length > 0) {
          setError(`Alcuni prodotti non sono stati pubblicati: ${response.errors.map(err => err.error).join(', ')}`)
        }
      } else {
        setError(response.error || 'Errore durante la pubblicazione')
      }
    } catch (error) {
      console.error('Errore:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Errore di connessione')
      }
    } finally {
      setLoading(false)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    
    const pastedText = e.clipboardData.getData('text')
    const cursorPosition = e.currentTarget.selectionStart || 0
    const textBeforeCursor = urls.substring(0, cursorPosition)
    const textAfterCursor = urls.substring(cursorPosition)
    
    const newValue = textBeforeCursor + pastedText + '\n\n' + textAfterCursor
    setUrls(newValue)

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight
      }
    }, 0)
  }

  return (
    <form className="space-y-6 relative">
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              className="w-20 h-20 bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0px rgba(255, 107, 0, 0.2)",
                  "0 0 0 40px rgba(255, 107, 0, 0)",
                ]
              }}
              transition={{ duration: 0.8 }}
            >
              <motion.svg
                className="w-10 h-10 text-white"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-lg border border-red-100 bg-gradient-to-r from-red-50 to-red-50/50"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-600 font-medium text-sm">
              {error}
            </p>
          </motion.div>
        )}
        
        {success && !showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-4 rounded-lg border border-[#FF6B00]/10 
              bg-gradient-to-r from-[#FF6B00]/10 to-[#FF8A3D]/10"
          >
            <CheckCircle className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
            <p className="text-[#FF6B00] font-medium text-sm">
              Ottimo! I tuoi prodotti sono stati pubblicati con successo su eBay 🚀
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="space-y-4">
          <label className="text-lg text-gray-600 font-semibold">
            Link Prodotti - Amazon / AliExpress
          </label>
          <textarea
            ref={textareaRef}
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            onPaste={handlePaste}
            placeholder="Incolla gli URL delle pagine dei prodotti da pubblicare su eBay..."
            className="w-full min-h-[200px] p-4 border border-gray-200 rounded-lg 
              text-gray-600 placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC]
              whitespace-pre-wrap"
            style={{
              lineHeight: '1.5',
            }}
          />
          <ProTip>
            Pro tip: Aggiungi molteplici URL - il sistema si occuperà di disporli uno per riga
          </ProTip>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <PriceManipulator 
          priceRounding={priceRounding}
          setPriceRounding={setPriceRounding}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <div className="flex justify-center md:scale-110">
        <Button 
          icon={Rocket}
          onClick={handleSubmit}
          disabled={loading}
          className="bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D] hover:from-[#FF8A3D] hover:to-[#FF6B00] transition-all duration-300"
        >
          {loading ? 'Pubblicazione in corso...' : 'Pubblica su eBay'}
        </Button>
      </div>
    </form>
  )
}