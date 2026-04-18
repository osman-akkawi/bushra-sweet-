"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"

interface ToastNotificationProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function ToastNotification({ message, isVisible, onClose }: ToastNotificationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-full">
      <CheckCircle className="h-5 w-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  )
}
