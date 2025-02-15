"use client"

import { motion } from "framer-motion"
import ProductForm from "./ProductForm"
import Features from "../ui/Features"

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto space-y-8"
      >
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-[#0066CC]">
            Il modo più veloce per fare dropshipping su eBay
          </h2>
          <p className="text-xl text-gray-600">
            Risparmia tempo e vendi di più. Pubblica prodotti da Amazon e AliExpress su eBay in un solo click:
            <span className="font-semibold text-[#FF6B00] ml-2">
              facile, veloce e automatico!
            </span>
          </p>
        </motion.div>

        <ProductForm />
        <Features />
      </motion.div>
    </main>
  )
}