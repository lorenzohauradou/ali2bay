"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

type Product = {
  id: string
  title: string
  price: string
  imageUrl: string
  soldQuantity: string
  ebayUrl: string
}

export default function Winning() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      title: "Costume Carnevale",
      price: "29.90",
      imageUrl: "/images/Costume.jpg",
      soldQuantity: "70+",
      ebayUrl: "https://ebay.com/..."
    },
    // altri prodotti di esempio...
  ])

  // Dati di esempio - da sostituire con dati reali da API
  const categories: Category[] = [
    {
      id: "electronics",
      name: "Elettronica",
      subcategories: [
        { id: "smartphones", name: "Smartphone" },
        { id: "tablets", name: "Tablet" },
      ]
    },
    // Altre categorie...
  ]

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    // chiama l'API per ottenere i prodotti della categoria
    setProducts(currentProducts => {
      return currentProducts
    })
  }

  const handleSearch = () => {
    if (selectedCategory && selectedSubcategory) {
      // Logica per la ricerca dei prodotti
      console.log('Ricerca prodotti...')
    }
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-[#0066CC]">
            Prodotti Vincenti
          </h2>
          <p className="text-xl text-gray-600">
            Diventa un <span className="font-semibold text-gray-600">Cecchino</span> del <span className="font-semibold text-gray-600">Dropshipping:</span> trova e vendi solo i <span className="font-semibold text-gray-600">prodotti più acquistati</span> e conquista eBay <span className="font-semibold text-gray-600">prima della concorrenza!</span>
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-lg text-gray-600 font-semibold mb-2">
                Categoria
              </label>
              <select 
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-600 
                  bg-white hover:border-gray-300 focus:border-[#0066CC] 
                  focus:ring-1 focus:ring-[#0066CC] outline-none"
              >
                <option value="">Seleziona categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-lg text-gray-600 font-semibold mb-2">
                Sottocategoria
              </label>
              <select 
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
                className="w-full px-4 py-2 border border-gray-200 rounded-md text-gray-600 
                  bg-white hover:border-gray-300 focus:border-[#0066CC] 
                  focus:ring-1 focus:ring-[#0066CC] outline-none
                  disabled:bg-gray-50 disabled:cursor-not-allowed"
              >
                <option value="">Seleziona sottocategoria</option>
                {categories
                  .find(cat => cat.id === selectedCategory)
                  ?.subcategories.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              disabled={!selectedCategory || !selectedSubcategory}
              onClick={() => handleSearch()}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${(!selectedCategory || !selectedSubcategory) 
                  ? 'bg-gray-400/80 text-white cursor-not-allowed'
                  : 'bg-[#0066CC] text-white hover:bg-[#0066CC]/90 active:scale-[0.98]'
                }
              `}
            >
              Cerca Prodotti
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} 
              className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm 
                hover:shadow-md transition-shadow group"
            >
              <div className="relative w-full h-64">
                <Image 
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[56px]">
                  {product.title}
                </h3>

                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-semibold text-gray-800">€{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                      Venduti: {product.soldQuantity}
                    </p>
                  </div>

                  <Link 
                    href={product.ebayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-6 py-2.5 bg-[#0066CC] text-white rounded-lg 
                      hover:bg-[#0066CC]/90 transition-colors text-sm font-medium"
                  >
                    Vai <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}