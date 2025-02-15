import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Header from "@/app/components/common/Header"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Ali2Bay - Amazon & AliExpress to eBay Lister",
  description: "List products from Amazon or AliExpress to eBay automatically",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-[#FAFBFF] overflow-x-hidden">
        <div className="fixed inset-0 -z-10">
          {/* Pattern sottile */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f8f9ff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Gradienti delicati */}
          <div className="absolute right-0 top-0 -z-10 h-[500px] w-[500px] opacity-20 bg-gradient-radial from-[#0066CC]/30 to-transparent" />
          <div className="absolute left-0 bottom-0 -z-10 h-[500px] w-[500px] opacity-20 bg-gradient-radial from-[#FF6B00]/30 to-transparent" />
          
          {/* Overlay per ammorbidire */}
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>
        
        <Header />
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  )
}