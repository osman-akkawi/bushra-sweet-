import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "حلويات البشرى - حلويات شرقية أصيلة",
  description: "استمتع بأفضل الحلويات الشرقية والحلويات في حلويات البشرى. وصفات تقليدية ونكهات أصيلة.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <CartProvider>
          <AdminProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </AdminProvider>
        </CartProvider>
      </body>
    </html>
  )
}
