"use client"

import { motion } from "framer-motion"

export default function ProcessingStatus() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-lg p-6 shadow-sm"
    >
      <h3 className="text-xl text-gray-600 font-semibold mb-4">
        Processing Status
      </h3>
      <motion.div
        className="space-y-3 text-base text-gray-600"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.p variants={itemVariants}>
          • URLs to process: 0
        </motion.p>
        <motion.p variants={itemVariants}>
          • Selected price rounding: .99
        </motion.p>
      </motion.div>
    </motion.div>
  )
}