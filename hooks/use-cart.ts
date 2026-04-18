"use client"

import { useState } from "react"
import type { CartItem } from "@/components/cart"

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [toastMessage, setToastMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  const addItem = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })

    setToastMessage(`تم إضافة ${item.name} إلى السلة`)
    setShowToast(true)
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const checkout = () => {
    const orderText = generateWhatsAppMessage(items)
    const phoneNumber = "+96176123456" // Replace with actual phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderText)}`
    window.open(whatsappUrl, "_blank")
  }

  const generateWhatsAppMessage = (cartItems: CartItem[]) => {
    let message = "🍯 طلب جديد من مطعم حلويات البشرى\n\n"

    cartItems.forEach((item) => {
      message += `• ${item.name}\n`
      message += `  الكمية: ${item.quantity} كيلو\n`
      message += `  السعر: ${item.price}\n`
      message += `  المجموع: ${new Intl.NumberFormat("ar-LB").format(item.pricePerKg * item.quantity)} ل.ل\n\n`
    })

    const total = cartItems.reduce((sum, item) => sum + item.pricePerKg * item.quantity, 0)
    message += `💰 المجموع الكلي: ${new Intl.NumberFormat("ar-LB").format(total)} ل.ل\n\n`
    message += "شكراً لكم! 🙏"

    return message
  }

  const hideToast = () => {
    setShowToast(false)
  }

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    checkout,
    toastMessage,
    showToast,
    hideToast,
  }
}
