"use client"

import { useState, useRef, useEffect } from "react"
import { Rocket, CheckCircle, AlertCircle } from "lucide-react"
import Button from "../ui/Button"
import PriceManipulator from "@/app/components/Dashboard/PriceManipulator"
import ProTip from "../ui/ProTip"
import { fetchApi } from "@/config/api"
import { motion, AnimatePresence } from 'framer-motion'
import ReactConfetti from 'react-confetti'

type ApiResponse = {
  success: boolean;
  errors?: Array<{ error: string }>;
  error?: string;
}

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ 
            x: 0,
            y: 0,
            scale: 0,
            opacity: 1
          }}
          animate={{
            x: Math.sin(i) * (Math.random() * 200 + 100),
            y: Math.cos(i) * (Math.random() * 200 + 100),
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            delay: i * 0.05
          }}
        >
          <div className={`w-3 h-3 rounded-full ${
            i % 3 === 0 ? 'bg-[#FF6B00]' : 
            i % 3 === 1 ? 'bg-[#FF8A3D]' : 
            'bg-[#0066CC]'
          }`} />
        </motion.div>
      ))}
    </div>
  )
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
  const [showAnimation, setShowAnimation] = useState(false)

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
    setShowAnimation(true)
    setUrls('')
    
    setTimeout(() => {
      setShowAnimation(false)
    }, 4000)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setShowAnimation(false)
    
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
        {showAnimation && (
          <>
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
              <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                colors={['#FF6B00', '#FF8A3D', '#0066CC', '#ffffff']}
                numberOfPieces={300}
                gravity={0.3}
                initialVelocityY={30}
                recycle={false}
                onConfettiComplete={() => {
                  setShowAnimation(false)
                }}
              />
              <ParticleEffect />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute z-50 text-center"
              >
                <motion.div
                  className="text-5xl font-bold text-[#FF6B00] drop-shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ 
                    y: 0,
                    opacity: 1,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Pubblicazione Completata! 🎉
                </motion.div>
              </motion.div>
            </div>
          </>
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
        
        {success && !showAnimation && (
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
          className={`
            relative overflow-hidden
            bg-gradient-to-r from-[#FF6B00] to-[#FF8A3D]
            ${loading ? 'animate-gradient' : 'hover:from-[#FF8A3D] hover:to-[#FF6B00]'}
            transition-all duration-300
          `}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    animate={{
                      x: '100%',
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "linear"
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <span className="relative z-10">
            {loading ? 'Pubblicazione in corso...' : 'Pubblica su eBay'}
          </span>
        </Button>
      </div>
    </form>
  )
}