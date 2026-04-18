"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  pricePerKg: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  checkout: () => void
  toastMessage: string
  showToast: boolean
  hideToast: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
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
    const phoneNumber = "+96170190557" // Updated phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderText)}`
    window.open(whatsappUrl, "_blank")
  }

  const generateWhatsAppMessage = (cartItems: CartItem[]) => {
    let message = "🍯 طلب جديد من مطعم حلويات البشرى\n\n"

    cartItems.forEach((item) => {
      message += `• ${item.name}\n`
      message += `  الكمية: ${item.quantity} كيلو\n`
      if (item.pricePerKg === 0) {
        message += `  السعر: غير مسعر بعد\n`
        message += `  المجموع: غير مسعر بعد\n\n`
      } else {
        message += `  السعر: ${item.price}\n`
        message += `  المجموع: ${new Intl.NumberFormat("ar-LB").format(item.pricePerKg * item.quantity)} ل.ل\n\n`
      }
    })

    const pricedItems = cartItems.filter((item) => item.pricePerKg > 0)
    const unpricedItems = cartItems.filter((item) => item.pricePerKg === 0)

    if (pricedItems.length > 0) {
      const total = pricedItems.reduce((sum, item) => sum + item.pricePerKg * item.quantity, 0)
      message += `💰 المجموع الكلي للمنتجات المسعرة: ${new Intl.NumberFormat("ar-LB").format(total)} ل.ل\n`
    }

    if (unpricedItems.length > 0) {
      message += `📝 يوجد ${unpricedItems.length} منتج غير مسعر - سيتم تحديد السعر عند التواصل\n`
    }

    message += "\nشكراً لكم! 🙏"

    return message
  }

  const hideToast = () => {
    setShowToast(false)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        checkout,
        toastMessage,
        showToast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
