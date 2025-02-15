"use client"

import { useState, useRef } from "react"
import { Rocket } from "lucide-react"

export default function ProductForm() {
  const [urls, setUrls] = useState("")
  const [priceRounding, setPriceRounding] = useState(".99")
  const [multiplier, setMultiplier] = useState(2.75)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ urls, priceRounding, multiplier })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="space-y-4">
          <label className="text-lg text-gray-600 font-semibold">
            Link Prodotti - Amazon e/o AliExpress
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
          
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2">
            <div className="text-[#0066CC] mt-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm text-gray-600">
              Pro tip: Aggiungi molteplici URL - il sistema si occuperà di disporli uno per riga
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        {/* Mobile Layout */}
        <div className="md:hidden space-y-8 text-center">
          {/* Moltiplicatore Prezzo */}
          <div className="space-y-4">
            <label className="text-lg text-gray-600 font-semibold">
              Moltiplicatore Prezzo
            </label>
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="range"
                  min={2}
                  max={4}
                  step={0.25}
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer 
                    accent-[#0066CC] hover:accent-[#0066CC]/90
                    focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                  style={{
                    background: `linear-gradient(to right, 
                      #0066CC ${((multiplier - 2) / 2) * 100}%, 
                      #E5E7EB ${((multiplier - 2) / 2) * 100}%)`
                  }}
                />
              </div>
              
              <div className="grid grid-cols-5 text-sm text-gray-600">
                {[2, 2.5, 3, 3.5, 4].map((value) => (
                  <div key={value} 
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setMultiplier(value)}
                  >
                    <span className="font-medium transition-colors group-hover:text-[#0066CC]">
                      x{value.toFixed(2)}
                    </span>
                    <div className="h-2 w-0.5 bg-gray-200 mt-2 transition-colors group-hover:bg-[#0066CC]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arrotonda Prezzo */}
          <div className="space-y-4">
            <label className="text-lg text-gray-600 font-semibold">
              Arrotonda Prezzo
            </label>
            <div className="flex gap-8 justify-center">
              {[".99", ".90"].map((value) => (
                <label key={value} className="group flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    checked={priceRounding === value}
                    onChange={(e) => setPriceRounding(e.target.value)}
                    className="w-4 h-4 
                      appearance-none
                      rounded-full 
                      border-2 border-gray-300
                      checked:border-[#FF6B00]
                      checked:bg-[#FF6B00]
                      hover:border-[#FF6B00]/60
                      checked:hover:bg-[#FF6B00]/90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#FF6B00]/20
                      transition-colors
                      cursor-pointer"
                  />
                  <span className="text-gray-500 text-lg tracking-tight transition-colors
                    group-hover:text-gray-600 
                    peer-checked:text-gray-800">
                    {value}
                    <span className="ml-0.5 text-sm font-medium">€</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row md:gap-12">
          {/* Arrotonda Prezzo */}
          <div className="space-y-4">
            <label className="text-lg text-gray-600 font-semibold">
              Arrotonda Prezzo
            </label>
            <div className="flex gap-8 font-semibold">
              {[".99", ".90"].map((value) => (
                <label key={value} className="group flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value={value}
                    checked={priceRounding === value}
                    onChange={(e) => setPriceRounding(e.target.value)}
                    className="w-4 h-4 
                      appearance-none
                      rounded-full 
                      border-2 border-gray-300
                      checked:border-[#FF6B00]
                      checked:bg-[#FF6B00]
                      hover:border-[#FF6B00]/60
                      checked:hover:bg-[#FF6B00]/90
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#FF6B00]/20
                      transition-colors
                      cursor-pointer"
                  />
                  <span className="text-gray-500 text-lg tracking-tight transition-colors
                    group-hover:text-gray-600 
                    peer-checked:text-gray-800">
                    {value}
                    <span className="ml-0.5 text-sm font-medium">€</span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Moltiplicatore Prezzo */}
          <div className="flex-1 space-y-4">
            <label className="text-lg text-gray-600 font-semibold">
              Moltiplicatore Prezzo
            </label>
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="range"
                  min={2}
                  max={4}
                  step={0.25}
                  value={multiplier}
                  onChange={(e) => setMultiplier(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer 
                    accent-[#0066CC] hover:accent-[#0066CC]/90
                    focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20"
                  style={{
                    background: `linear-gradient(to right, 
                      #0066CC ${((multiplier - 2) / 2) * 100}%, 
                      #E5E7EB ${((multiplier - 2) / 2) * 100}%)`
                  }}
                />
              </div>
              
              <div className="grid grid-cols-9 text-sm text-gray-600 -ml-[11px]">
                {[2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4].map((value) => (
                  <div key={value} 
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setMultiplier(value)}
                  >
                    <span className="font-medium transition-colors group-hover:text-[#0066CC]">
                      x{value.toFixed(2)}
                    </span>
                    <div className="h-2 w-0.5 bg-gray-200 mt-2 transition-colors group-hover:bg-[#0066CC]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-[#FF6B00] text-white rounded-md hover:bg-[#FF6B00]/90 transition-colors"
        >
          <Rocket className="h-5 w-5" />
          Pubblica su eBay
        </button>
      </div>
    </form>
  )
}