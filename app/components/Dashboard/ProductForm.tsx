"use client"

import { useState, useRef, useEffect } from "react"
import { Rocket } from "lucide-react"
import Button from "../ui/Button"
import PriceManipulator from "@/app/components/Dashboard/PriceManipulator"
import ProTip from "../ui/ProTip"
import { fetchApi } from "@/config/api"

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

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    
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
        setSuccess(true)
        setUrls('')
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
    <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
      {error && (
        <div className="bg-red-50 p-4 rounded-lg text-red-600 mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 p-4 rounded-lg text-green-600 mb-4">
          Prodotti pubblicati con successo!
        </div>
      )}
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
        />
      </div>

      <div className="flex justify-center">
        <Button 
          icon={Rocket}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Pubblicazione in corso...' : 'Pubblica su eBay'}
        </Button>
      </div>
    </form>
  )
}