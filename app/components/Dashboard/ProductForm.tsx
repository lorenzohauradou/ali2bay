"use client"

import { useState, useRef } from "react"
import { Rocket } from "lucide-react"
import Button from "../ui/Button"
import PriceManipulator from "@/app/components/Dashboard/PriceManipulator"

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
        <PriceManipulator 
          priceRounding={priceRounding}
          setPriceRounding={setPriceRounding}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
        />
      </div>

      <div className="flex justify-center">
      <Button icon={Rocket}>
        Pubblica su eBay
      </Button>
      </div>
    </form>
  )
}