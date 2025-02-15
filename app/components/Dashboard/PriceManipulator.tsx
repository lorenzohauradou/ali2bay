'use client'

interface PriceManipulatorProps {
  priceRounding: string
  setPriceRounding: (value: string) => void
  multiplier: number
  setMultiplier: (value: number) => void
}

export default function PriceManipulator({
  priceRounding,
  setPriceRounding,
  multiplier,
  setMultiplier
}: PriceManipulatorProps) {
  return (
    <div className="flex flex-col md:flex-row md:gap-12">
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
  )
}