"use client"

import { Heart, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/bouchra-sweets-logo.jpg"
                alt="حلويات البشرى"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">حلويات البشرى</h3>
                <span className="text-background/80 text-sm">+961 70190557</span>
              </div>
            </div>
            <p className="text-background/80 mb-4 text-pretty">
              نقدم لكم الطعم الأصيل للحلويات الشرقية والحلويات منذ عام 1970. مصنوعة بحب، تُقدم بفخر.
            </p>
            <div className="flex items-center text-sm text-background/60">
              <span>صُنعت بـ</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>في قلب المدينة</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-primary transition-colors">
                  القائمة
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">تابعونا</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <a href="https://www.facebook.com/share/1GciCXtJgo/" className="hover:text-primary transition-colors">
                  فيسبوك
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@bouchraswet?_t=ZS-8zfMRQqof5A&_r=1"
                  className="hover:text-primary transition-colors"
                >
                  تيك توك
                </a>
              </li>
              <li>
                <a href="https://wa.me/96170190557" className="hover:text-primary transition-colors">
                  واتساب - +961 70190557
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-primary transition-colors text-xs opacity-50">
                  Admin
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-sm">موقعنا</h5>
              <a
                href="https://maps.google.com/?q=34.433300,35.848800&entry=gps&g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-background/80 hover:text-primary transition-colors text-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>عرض الموقع على الخريطة</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 حلويات البشرى. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}