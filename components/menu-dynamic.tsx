"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import { ToastNotification } from "@/components/toast-notification";
import { useAdmin, Category, MenuItem } from "@/contexts/admin-context";

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addItem, toastMessage, showToast, hideToast } = useCart();
  const { categories, loading } = useAdmin();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (categoryIndex: number) => {
    setSelectedCategory(selectedCategory === categoryIndex ? null : categoryIndex);
  };

  const handleAddToCart = (item: any, categoryIndex: number) => {
    const cartItem = {
      id: `${categoryIndex}-${item.id}`,
      name: item.nameAr,
      price: item.priceDisplay,
      pricePerKg: item.price,
    };
    addItem(cartItem);
  };

  if (loading) {
    return (
      <section id="menu" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p>جاري التحميل...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <ToastNotification message={toastMessage} isVisible={showToast} onClose={hideToast} />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">قائمة الطعام اللذيذة</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            اكتشف حلوياتنا اللبنانية الأصيلة والحلويات المصنوعة بوصفات تقليدية متوارثة عبر الأجيال.
          </p>
        </div>

        <div className="relative mb-12">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-lg"
            >
              <span className="text-lg">‹</span>
            </Button>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="flex-shrink-0 cursor-pointer group"
                  onClick={() => handleCategoryClick(index)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.nameAr}
                      className="w-64 h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-75" />
                    <div className="absolute bottom-4 left-4 right-4 bg-black rounded-lg p-3">
                      <h3 className="text-white font-bold text-lg text-balance text-right">{category.nameAr}</h3>
                      <p className="text-white text-sm text-right">{category.items.length} عنصر</p>
                    </div>
                    {selectedCategory === index && (
                      <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded-lg" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-lg"
            >
              <span className="text-lg">›</span>
            </Button>
          </div>
        </div>

        <div className="space-y-16">
          {selectedCategory !== null ? (
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">{categories[selectedCategory].nameAr}</h3>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                <Button variant="outline" onClick={() => setSelectedCategory(null)} className="mt-4">
                  عرض جميع الفئات
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {categories[selectedCategory].items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white group shadow-md hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative h-40 md:h-44 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.nameAr}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <CardHeader className="p-4 space-y-4">
                      <CardTitle className="text-sm md:text-base font-bold text-gray-800 text-right leading-relaxed text-balance">
                        {item.nameAr}
                      </CardTitle>

                      <div className="flex items-center justify-between gap-3">
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item, selectedCategory)}
                          style={{ backgroundColor: "#f59e0b", color: "#1f2937" }}
                          className="flex-1 hover:bg-amber-600 font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
                        >
                          <span className="text-base ml-2" style={{ color: "#1f2937" }}>
                            +
                          </span>
                          أضف إلى السلة
                        </Button>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 text-emerald-800 font-bold px-3 py-2 rounded-xl shadow-sm text-xs whitespace-nowrap">
                          {item.priceDisplay}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            categories.map((category, categoryIndex) => (
              <div key={category.id}>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-2">{category.nameAr}</h3>
                  <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white group shadow-md hover:shadow-2xl hover:-translate-y-1"
                    >
                      <div className="relative h-40 md:h-44 overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.nameAr}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <CardHeader className="p-4 space-y-4">
                        <CardTitle className="text-sm md:text-base font-bold text-gray-800 text-right leading-relaxed text-balance">
                          {item.nameAr}
                        </CardTitle>

                        <div className="flex items-center justify-between gap-3">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item, categoryIndex)}
                            style={{ backgroundColor: "#f59e0b", color: "#1f2937" }}
                            className="flex-1 hover:bg-amber-600 font-semibold py-2.5 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-0"
                          >
                            <span className="text-base ml-2" style={{ color: "#1f2937" }}>
                              +
                            </span>
                            أضف إلى السلة
                          </Button>
                          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 text-emerald-800 font-bold px-3 py-2 rounded-xl shadow-sm text-xs whitespace-nowrap">
                            {item.priceDisplay}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}