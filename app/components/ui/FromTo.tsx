"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Box } from "lucide-react"

export default function FromTo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-[#0066CC]">
            Fai dropshipping su eBay in un solo click
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Il nostro obiettivo è semplificare il processo di vendita su eBay riducendo 
            al minimo le operazioni necessarie per l&apos;utente.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl mx-auto relative">
          {/* Frecce di flusso */}
          <svg className="absolute top-0 left-0 w-full h-full -z-10" viewBox="0 0 1200 500">
            {/* Freccia da Amazon al logo */}
            <path
              d="M 380,150 Q 480,150 580,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            {/* Freccia da AliExpress al logo */}
            <path
              d="M 380,350 Q 480,350 580,250"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            {/* Frecce dal logo ai box eBay */}
            <path
              d="M 680,250 Q 780,250 880,150"
              stroke="#0066CC"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              className="opacity-20"
            />
            <path
              d="M 680,250 Q 780,250 880,350"
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

          {/* Screenshots a sinistra */}
          <div className="w-full max-w-md space-y-4">
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Image
                src="/images/amazon-screenshot.png"
                alt="Amazon product page"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/images/aliexpress-screenshot.png"
                alt="AliExpress product page"
                width={600}
                height={400}
                className="w-full h-auto"
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