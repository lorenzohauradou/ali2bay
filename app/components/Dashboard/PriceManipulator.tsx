'use client'

interface PriceManipulatorProps {
  priceRounding: string
  setPriceRounding: (value: string) => void
  multiplier: number
  setMultiplier: (value: number) => void
  quantity: string
  setQuantity: (value: string) => void
}

export default function PriceManipulator({
  priceRounding,
  setPriceRounding,
  multiplier,
  setMultiplier,
  quantity,
  setQuantity
}: PriceManipulatorProps) {

  const desktopValues = [2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4]
  const mobileValues = [2, 2.5, 3, 3.5, 4]

  return (
    <div className="flex flex-col md:flex-row md:gap-12">
      <div className="flex-1 space-y-4 order-first md:order-last">
        <label className="text-lg text-gray-600 font-semibold block text-center md:text-left">
          Moltiplicatore Prezzo
        </label>
        <div className="space-y-4 md:space-y-6">
          {/* Range slider */}
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

          {/* Grid dei valori - 5 su mobile, 9 su desktop */}
          <div className="hidden md:grid grid-cols-9 text-sm text-gray-600 -ml-[11px]">
            {desktopValues.map((value) => (
              <div key={value} 
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setMultiplier(value)}
              >
                <span className="font-medium transition-colors group-hover:text-[#0066CC] text-sm">
                  x{value.toFixed(2)}
                </span>
                <div className="h-2 w-0.5 bg-gray-200 mt-2 transition-colors group-hover:bg-[#0066CC]" />
              </div>
            ))}
          </div>

          {/* Grid mobile con 5 valori */}
          <div className="grid md:hidden grid-cols-5 text-sm text-gray-600 -ml-[11px]">
            {mobileValues.map((value) => (
              <div key={value} 
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setMultiplier(value)}
              >
                <span className="font-medium transition-colors group-hover:text-[#0066CC] text-[11px]">
                  x{value.toFixed(2)}
                </span>
                <div className="h-2 w-0.5 bg-gray-200 mt-1 transition-colors group-hover:bg-[#0066CC]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arrotonda Prezzo + Quantità in un unico blocco */}
      <div className="space-y-4 md:space-y-4 text-center md:text-left mb-6 mt-6 md:mt-0 md:mb-0 order-last md:order-first">
        {/* Arrotonda Prezzo */}
        <div className="mb-6">
          <label className="text-lg text-gray-600 font-semibold block">
            Arrotonda Prezzo
          </label>
          <div className="flex justify-center md:justify-start gap-8 font-semibold">
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

        {/* Quantità Disponibile */}
        <div>
          <label className="text-lg text-gray-600 font-semibold block mb-2">
            Quantità Disponibile
          </label>
          <div className="flex justify-center items-center gap-7">
            <div className="flex items-center text-gray-500">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-7 h-7"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
            </div>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-20 px-2 py-1.5
                text-gray-600
                border border-gray-300
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-[#FF6B00]/20
                focus:border-[#FF6B00]
                transition-colors"
              placeholder="1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}