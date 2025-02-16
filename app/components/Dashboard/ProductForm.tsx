"use client"

import { useState, useRef, useEffect } from "react"
import { Rocket } from "lucide-react"
import Button from "../ui/Button"
import PriceManipulator from "@/app/components/Dashboard/PriceManipulator"
import ProTip from "../ui/ProTip"
import { fetchApi } from "@/config/api"

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
    // Verifica stato connessione
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

  const handleSubmit = async (e: React.FormEvent) => {
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
      const response = await fetchApi('/scrape', {
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
      } else {
        setError(response.error || 'Errore durante la pubblicazione')
      }
    } catch (err) {
      console.error('Errore:', err)
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            onPaste={(e) => {
              e.preventDefault()
              
              const pastedText = e.clipboardData.getData('text')
              const cursorPosition = e.currentTarget.selectionStart
              const textBeforeCursor = urls.substring(0, cursorPosition)
              const textAfterCursor = urls.substring(cursorPosition)
              
              const newValue = textBeforeCursor + pastedText + '\n\n' + textAfterCursor
              setUrls(newValue)

              setTimeout(() => {
                if (textareaRef.current) {
                  textareaRef.current.scrollTop = textareaRef.current.scrollHeight
                }
              }, 0)
            }}
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
        >
          {loading ? 'Pubblicazione in corso...' : 'Pubblica su eBay'}
        </Button>
      </div>
    </form>
  )
}