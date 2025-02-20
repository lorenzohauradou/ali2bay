import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Header from "@/app/components/common/Header"
import Footer from "@/app/components/common/Footer"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Ali2Bay - Automatizza il Dropshipping da Amazon e AliExpress su eBay",
  description: "Vuoi fare dropshipping su eBay senza perdere tempo? Ali2Bay pubblica automaticamente prodotti da Amazon e AliExpress in pochi secondi. Provalo gratis!",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Ali2Bay - Dropshipping su eBay in 1 Click",
    description: "Ali2Bay è il tool definitivo per il dropshipping su eBay. Pubblica prodotti da Amazon e AliExpress automaticamente e inizia a guadagnare!",
    url: "https://www.ali2bay.com",
    type: "website",
    images: [
      {
        url: "https://www.ali2bay.com/favicon.ico",
        width: 32,
        height: 32,
        alt: "Ali2Bay - Il miglior tool per dropshipping su eBay"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali2Bay - Automatizza il Dropshipping da Amazon e AliExpress su eBay",
    description: "Ali2Bay pubblica automaticamente prodotti da Amazon e AliExpress su eBay. Provalo gratis e inizia a vendere oggi stesso!",
    images: [
      {
        url: "https://www.ali2bay.com/favicon.ico",
        alt: "Ali2Bay - Dropshipping veloce e automatico"
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={geist.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ali2Bay Team" />
        <meta name="keywords" content="dropshipping eBay, dropshipping Amazon eBay, dropshipping AliExpress eBay, tool dropshipping eBay, pubblica prodotti su eBay" />
      </head>
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
        <Footer />
      </body>
    </html>
  )
}