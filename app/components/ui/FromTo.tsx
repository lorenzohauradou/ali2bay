"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Box } from "lucide-react"

export default function FromTo() {
  return (
    <section className="py-0">
      <div className="container mx-auto px-4">


        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto relative">
          {/* SVG per le linee di collegamento */}
          <svg className="absolute top-0 right-12 w-full h-full -z-10" viewBox="0 0 1200 500">
            {/* Linea dal cerchio superiore al logo */}
            <path
              d="M 480,180 Q 550,180 620,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            {/* Linea dal cerchio in basso a sinistra al logo */}
            <path
              d="M 480,320 Q 550,320 620,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            {/* Linea dal cerchio in basso a destra al logo */}
            <path
              d="M 480,320 Q 550,320 620,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            {/* Linee dal logo ai box eBay */}
            <path
              d="M 680,250 Q 750,250 820,150"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            <path
              d="M 680,250 Q 750,250 820,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            <path
              d="M 680,250 Q 750,250 820,350"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            
            {/* Definizione della punta della freccia */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#0066CC"
                  className="opacity-20"
                />
              </marker>
            </defs>
          </svg>

          {/* Cerchi con foto prodotto a sinistra */}
          <div className="w-full max-w-md grid grid-cols-2 gap-8 relative py-8">
            {/* Primo cerchio in alto */}
            <motion.div
              className="col-span-2 justify-self-center w-48 h-48 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-4 border-white bg-white flex items-center justify-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/product2.jpg"
                alt="Product 1"
                width={192}
                height={192}
                className="w-[90%] h-[90%] object-contain"
              />
            </motion.div>
            {/* Secondo cerchio in basso a sinistra */}
            <motion.div
              className="w-40 h-40 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-4 border-white bg-white ml-8 flex items-center justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/product1.jpg"
                alt="Product 2"
                width={160}
                height={160}
                className="w-[90%] h-[90%] object-contain"
              />
            </motion.div>
            {/* Terzo cerchio in basso a destra */}
            <motion.div
              className="w-40 h-40 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-4 border-white bg-white mr-8 flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/images/product3.jpg"
                alt="Product 3"
                width={160}
                height={160}
                className="w-[90%] h-[90%] object-contain"
              />
            </motion.div>
          </div>

          {/* Logo centrale */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <Box className="h-16 w-16 md:h-24 md:w-24 text-[#0066CC]" />
              <div className="absolute -top-1 -right-1 h-3 w-3 md:h-6 md:w-6 bg-[#FF6B00] rounded-full" />
            </div>
          </motion.div>

          {/* Griglia destra - eBay listings */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="col-span-2 bg-white rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={80}
                height={40}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={80}
                height={40}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="col-span-2 bg-white rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={80}
                height={40}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="bg-white rounded-lg p-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <Image
                src="/images/ebay.png"
                alt="eBay"
                width={80}
                height={40}
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}