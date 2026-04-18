"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, updateQuantity, removeItem, checkout } = useCart()

  const totalPrice = items.reduce((sum, item) => sum + item.pricePerKg * item.quantity, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ar-LB").format(price) + " ل.ل"
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-transparent hover:bg-amber-50 border-amber-200 hover:border-amber-300 transition-all duration-200"
        >
          <ShoppingCart className="h-5 w-5 text-amber-700" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-amber-600 hover:bg-amber-700 border-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg bg-gradient-to-b from-amber-50/30 to-white">
        <SheetHeader className="relative pb-6 border-b border-amber-100">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <SheetTitle className="text-right text-xl font-bold text-amber-800 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              سلة التسوق
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">السلة فارغة</p>
              <p className="text-gray-400 text-sm mt-2">أضف بعض المنتجات الشهية!</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 border border-amber-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                      <p className="text-sm text-amber-600 font-medium">{item.price}</p>
                    </div>

                    <div className="flex items-center gap-3 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-amber-100 rounded-md"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3 text-amber-700" />
                        </Button>

                        <span className="w-8 text-center font-semibold text-amber-800">{item.quantity}</span>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 hover:bg-amber-100 rounded-md"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3 text-amber-700" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 mt-6">
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span className="text-amber-800">المجموع الكلي:</span>
                  <span className="text-amber-900">{formatPrice(totalPrice)}</span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => {
                    checkout()
                    setIsOpen(false)
                  }}
                  disabled={items.length === 0}
                >
                  إرسال الطلب عبر واتساب
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
