"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+96170190557"
    const message = "مرحباً! أريد الاستفسار عن منتجات حلويات البشرى"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
      size="icon"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  )
}
