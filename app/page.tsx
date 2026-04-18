import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import Menu from "@/components/menu-dynamic"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Menu />
      <Location />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
