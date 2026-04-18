"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToMenu = () => {
    const element = document.getElementById("menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/arabin-sweet-hero-background.jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance text-[rgba(164,245,34,1)]">
          أهلاً بكم في <span className="text-[rgba(194,230,39,1)]">حلويات البشرى</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 text-pretty max-w-2xl mx-auto">
          استمتعوا بالطعم الأصيل للحلويات الشرقية والحلويات، المحضرة بوصفات تقليدية وأجود المكونات.
        </p>
        <div className="flex justify-center">
          <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToMenu}>
            استكشف قائمتنا
          </Button>
        </div>
      </div>
    </section>
  )
}
