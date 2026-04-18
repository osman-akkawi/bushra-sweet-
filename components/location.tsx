import { MapPin } from "lucide-react"

export function Location() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">موقعنا</h2>
          <p className="text-muted-foreground">زوروا متجرنا واستمتعوا بأفضل الحلويات الشرقية</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-background rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.8!2d35.8488!3d34.4333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI1JzU5LjkiTiAzNcKwNTAnNTUuNyJF!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع حلويات البشرى"
              />
            </div>

            <div className="p-6 bg-background">
              <div className="flex items-center justify-center gap-4">
                <MapPin className="h-5 w-5 text-green-600" />
                <a
                  href="https://maps.google.com/?q=34.433300,35.848800&entry=gps&g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  عرض الموقع على خرائط جوجل
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
