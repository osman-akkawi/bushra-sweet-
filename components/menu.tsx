"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { useCart } from "@/contexts/cart-context"
import { ToastNotification } from "@/components/toast-notification"

const menuCategories = [
  {
    name: "البقلاوة (Baklava)",
    image: "/baklava-category.jpg",
    items: [
      {
        name: "بقلاوة سادة",
        price: "1,000,000 ل.ل / كيلو",
        pricePerKg: 1000000,
        image: "/images/d8-a8-d9-82-d9-84-d8-a7-d9-88-d8-a9-20-d8-b3-d8-a7-d8-af-d8-a9.jpeg",
      },
      {
        name: "بقلاوة مشكل",
        price: "1,200,000 ل.ل / كيلو",
        pricePerKg: 1200000,
        image: "/images/d9-85-d8-b4-d9-83-d9-84.jpeg",
      },
      {
        name: "كول و شكور فستق",
        price: "2,250,000 ل.ل / كيلو",
        pricePerKg: 2250000,
        image: "/images/d9-83-d9-88-d9-84-20-d9-88-20-d8-b4-d9-83-d9-88-d8-b1-20-d9-83-d8-a7-d8-ac-d9-88.jpeg",
      },
      {
        name: "برمة فستق",
        price: "2,250,000 ل.ل / كيلو",
        pricePerKg: 2250000,
        image: "/images/d8-a8-d8-b1-d9-85-d8-a9-20-d9-81-d8-b3-d8-aa-d9-82.jpeg",
      },
      {
        name: "أصابع",
        price: "1,200,000 ل.ل / كيلو",
        pricePerKg: 1200000,
        image: "/images/d8-a3-d8-b5-d8-a7-d8-a8-d8-b9.jpeg",
      },
      {
        name: "إسطنبولية فستق",
        price: "2,250,000 ل.ل / كيلو",
        pricePerKg: 2250000,
        image: "/images/d8-a7-d8-b3-d8-b7-d9-86-d8-a8-d9-88-d9-84-d9-8a-d8-a9.jpeg",
      },
      {
        name: "إسطنبولية كاجو",
        price: "1,200,000 ل.ل / كيلو",
        pricePerKg: 1200000,
        image: "/images/d8-a7-d8-b3-d8-b7-d9-86-d8-a8-d9-88-d9-84-d9-8a-d8-a9.jpeg",
      },
      {
        name: "بقلاوة جوز",
        price: "1,200,000 ل.ل / كيلو",
        pricePerKg: 1200000,
        image: "/baklava-walnut.jpg",
      },
      {
        name: "مشكّل أبيض",
        price: "1,100,000 ل.ل / كيلو",
        pricePerKg: 1100000,
        image: "/white-mixed-sweets.jpg",
      },
    ],
  },
  {
    name: "معمول العيد (Eid Ma'amoul)",
    image: "/mamoul-mixed.jpg",
    items: [
      {
        name: "معمول جوز",
        price: "900,000 ل.ل",
        pricePerKg: 900000,
        image: "/mamoul-walnut.jpg",
      },
      {
        name: "معمول فستق صغير",
        price: "1,300,000 ل.ل",
        pricePerKg: 1300000,
        image: "/mamoul-pistachio.jpg",
      },
      {
        name: "معمول صغير",
        price: "700,000 ل.ل",
        pricePerKg: 700000,
        image: "/mamoul-small.jpg",
      },
      {
        name: "معمول مشكل",
        price: "1,000,000 ل.ل",
        pricePerKg: 1000000,
        image: "/mamoul-mixed.jpg",
      },
      {
        name: "تمارة",
        price: "750,000 ل.ل",
        pricePerKg: 750000,
        image: "/tamara-dates.jpg",
      },
      {
        name: "معمول كبير",
        price: "حسب الطلب",
        pricePerKg: 0,
        image: "/mamoul-mixed.jpg",
      },
    ],
  },
  {
    name: "المعمول (Mamoul)",
    image: "/mamoul-category.jpg",
    items: [
      {
        name: "معمول مد جوز",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/images/images-20-281-29.jpeg",
      },
      {
        name: "معمول مد تمر",
        price: "600,000 ل.ل / كيلو",
        pricePerKg: 600000,
        image: "/images/images-20-282-29.jpeg",
      },
      {
        name: "معمول مد فستق",
        price: "800,000 ل.ل / كيلو",
        pricePerKg: 800000,
        image: "/images/d9-85-d8-b9-d9-85-d9-88-d9-84-20-d9-85-d8-af-20-d9-81-d8-b3-d8-aa-d9-82.jpeg",
      },
      {
        name: "نمورة",
        price: "400,000 ل.ل / كيلو",
        pricePerKg: 400000,
        image: "/images/d9-86-d9-85-d9-88-d8-b1-d8-a9.jpeg",
      },
      {
        name: "صفوف",
        price: "400,000 ل.ل / كيلو",
        pricePerKg: 400000,
        image: "/images/d8-b5-d9-81-d9-88-d9-81.jpeg",
      },
    ],
  },
  {
    name: "القشطويات (Cream Desserts)",
    image: "/cream-desserts-category.jpg",
    items: [
      {
        name: "كنافة قشطة",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/images/d9-83-d9-86-d8-a7-d9-81-d8-a9-20-d9-82-d8-b4-d8-b7-d8-a9.jpeg",
      },
      {
        name: "كنافة جبنة",
        price: "750,000 ل.ل / كيلو",
        pricePerKg: 750000,
        image: "/images/d9-83-d9-86-d8-a7-d9-81-d8-a9-20-d8-ac-d8-a8-d9-86-d8-a9.jpeg",
      },
      {
        name: "مفروكة",
        price: "900,000 ل.ل / كيلو",
        pricePerKg: 900000,
        image: "/images/images-20-284-29.jpeg",
      },
      {
        name: "ورد الشام",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/ward-el-sham.jpg",
      },
      {
        name: "بصمة",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/images/d8-a8-d8-b5-d9-85-d8-a9.jpeg",
      },
      {
        name: "كلاج",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/images/d9-83-d9-84-d8-a7-d8-ac.jpeg",
      },
      {
        name: "حلاوة عادي",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/images/d8-ad-d9-84-d8-a7-d9-88-d8-a9-20-d8-b9-d8-a7-d8-af-d9-8a.jpeg",
      },
      {
        name: "حلاوة لف",
        price: "800,000 ل.ل / كيلو",
        pricePerKg: 800000,
        image: "/images/d8-ad-d9-84-d8-a7-d9-88-d8-a9-20-d9-84-d9-81.jpeg",
      },
      {
        name: "حلاوة الرز",
        price: "500,000 ل.ل / كيلو",
        pricePerKg: 500000,
        image: "/images/d8-ad-d9-84-d8-a7-d9-88-d8-a9-20-d8-a7-d9-84-d8-b1-d8-b2.jpeg",
      },
      {
        name: "زنود الست",
        price: "800,000 ل.ل / كيلو",
        pricePerKg: 800000,
        image: "/images/images-20-289-29.jpeg",
      },
      {
        name: "مد قشطة",
        price: "650,000 ل.ل / كيلو",
        pricePerKg: 650000,
        image: "/cream-extension.jpg",
      },
      {
        name: "قطايف",
        price: "600,000 ل.ل / كيلو",
        pricePerKg: 600000,
        image: "/images/images-20-288-29.jpeg",
      },
      {
        name: "نمورة بالقشطة",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/namoura-qishta.jpg",
      },
    ],
  },
  {
    name: "مشكل براد أكسترا (Premium Cold Mix)",
    image: "/premium-cold-category.jpg",
    items: [
      {
        name: "مشكل قشطة عادي",
        price: "800,000 ل.ل / كيلو",
        pricePerKg: 800000,
        image: "/mixed-cream-regular.jpg",
      },
      {
        name: "مشكل براد",
        price: "1,000,000 ل.ل / كيلو",
        pricePerKg: 1000000,
        image: "/mixed-cold-tray.jpg",
      },
      {
        name: "براد مع فستق",
        price: "1,200,000 ل.ل / كيلو",
        pricePerKg: 1200000,
        image: "/images/d8-a8-d8-b1-d8-a7-d8-af-20-d9-85-d8-b9-20-d9-81-d8-b3-d8-aa-d9-82.jpeg",
      },
      {
        name: "داعقوية",
        price: "2,000,000 ل.ل / كيلو",
        pricePerKg: 2000000,
        image: "/images/hq720.jpeg",
      },
    ],
  },
  {
    name: "قطع و صحون (Pieces & Plates)",
    image: "/pieces-plates-category.jpg",
    items: [
      {
        name: "كعكة كنافة قشطة",
        price: "120,000 ل.ل / الصحن",
        pricePerKg: 120000,
        image: "/knafeh-cream-cake.jpg",
      },
      {
        name: "كعكة كنافة جبنة",
        price: "120,000 ل.ل / الصحن",
        pricePerKg: 120000,
        image: "/knafeh-cheese-cake-new.jpg",
      },
      {
        name: "لحم بعجين مربع (الحبة)",
        price: "75,000 ل.ل",
        pricePerKg: 75000,
        image: "/lahem-baajin-square.jpg",
      },
      {
        name: "لحم بعجين مدور (الحبة)",
        price: "75,000 ل.ل",
        pricePerKg: 75000,
        image: "/lahem-baajin-round.jpg",
      },
      {
        name: "كعكة مفروكة",
        price: "150,000 ل.ل",
        pricePerKg: 150000,
        image: "/mafruka-cake-new.jpg",
      },
      {
        name: "كعكة حلاوة الرز مع قشطة",
        price: "120,000 ل.ل",
        pricePerKg: 120000,
        image: "/rice-halawa-cream-cake.jpg",
      },
      {
        name: "فطيرة جوز",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/walnut-pie.jpg",
      },
      {
        name: "فطيرة قشطة",
        price: "120,000 ل.ل",
        pricePerKg: 120000,
        image: "/cream-pie.jpg",
      },
      {
        name: "مارشميلو",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/marshmallow-dessert.jpg",
      },
      {
        name: "تشيز كيك",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/images/d8-aa-d8-b4-d9-8a-d8-b2-20-d9-83-d9-8a-d9-83.jpeg",
      },
      {
        name: "أوريو",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/images/d8-a3-d9-88-d8-b1-d9-8a-d9-88.jpeg",
      },
      {
        name: "تيراميسو",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/tiramisu.jpg",
      },
      {
        name: "صحن قشطويات (أي نوع)",
        price: "200,000 ل.ل",
        pricePerKg: 200000,
        image: "/cream-sweets-plate.jpg",
      },
      {
        name: "صحن بقلاوة أو مشكل",
        price: "250,000 ل.ل",
        pricePerKg: 250000,
        image: "/baklava-mixed-plate-new.jpg",
      },
      {
        name: "صحن داعقوية",
        price: "400,000 ل.ل",
        pricePerKg: 400000,
        image: "/daqawiya-plate-new.jpg",
      },
    ],
  },
  {
    name: "المكسرات (Nuts)",
    image: "/nuts-category.jpg",
    items: [
      {
        name: "مكسرات عادي",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/nuts-regular.jpg",
      },
      {
        name: "سمسية وعبيدة",
        price: "700,000 ل.ل / كيلو",
        pricePerKg: 700000,
        image: "/sesame-abida.jpg",
      },
      {
        name: "مكسرات أكسترا",
        price: "1,300,000 ل.ل / كيلو",
        pricePerKg: 1300000,
        image: "/nuts-extra.jpg",
      },
    ],
  },
  {
    name: "شوكولا (Chocolate)",
    image: "/chocolate-category.jpg",
    items: [
      {
        name: "شوكولا حلو",
        price: "1,000,000 ل.ل / كيلو",
        pricePerKg: 1000000,
        image: "/chocolate-sweet.jpg",
      },
      {
        name: "شوكولا مر",
        price: "1,100,000 ل.ل / كيلو",
        pricePerKg: 1100000,
        image: "/chocolate-bitter.jpg",
      },
      {
        name: "ملبس شوكولا",
        price: "1,000,000 ل.ل / كيلو",
        pricePerKg: 1000000,
        image: "/chocolate-coated-almonds.jpg",
      },
      {
        name: "بنبون",
        price: "550,000 ل.ل / كيلو",
        pricePerKg: 550000,
        image: "/images/d8-a8-d9-86-d8-a8-d9-88-d9-86.jpeg",
      },
      {
        name: "كيس هدية",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/AL-BOCHRA-SWEETS-gift-bag.jpg",
      },
      {
        name: "صينية هدية فارغة",
        price: "350,000 ل.ل",
        pricePerKg: 350000,
        image: "/empty-gift-tray.jpg",
      },
    ],
  },
  {
    name: "بوظة / آيس كريم (Ice Cream)",
    image: "/ice-cream-category.jpg",
    items: [
      {
        name: "كورنية صغيرة",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/small-cone.jpg",
      },
      {
        name: "كورنية كبيرة",
        price: "150,000 ل.ل",
        pricePerKg: 150000,
        image: "/large-ice-cream-cone.jpg",
      },
      {
        name: "كاسة",
        price: "200,000 ل.ل",
        pricePerKg: 200000,
        image: "/ice-cream-cup.jpg",
      },
      {
        name: "واحد كغ",
        price: "850,000 ل.ل",
        pricePerKg: 850000,
        image: "/one-kg-ice-cream.jpg",
      },
      {
        name: "1 كغ (قشطة أو فستق أو أفوكادو)",
        price: "1,350,000 ل.ل",
        pricePerKg: 1350000,
        image: "/premium-ice-cream-1kg.jpg",
      },
    ],
  },
  {
    name: "قناني (Bottles)",
    image: "/bottles-category.jpg",
    items: [
      {
        name: "تنك كبيرة",
        price: "180,000 ل.ل",
        pricePerKg: 180000,
        image: "/large-tin.jpg",
      },
      {
        name: "تنك وسط",
        price: "100,000 ل.ل",
        pricePerKg: 100000,
        image: "/medium-tin.jpg",
      },
      {
        name: "تنك صغير",
        price: "80,000 ل.ل",
        pricePerKg: 80000,
        image: "/small-tin.jpg",
      },
      {
        name: "ماء ورد",
        price: "1,080,000 ل.ل",
        pricePerKg: 1080000,
        image: "/rose-water.jpg",
      },
      {
        name: "ماء زهر",
        price: "1,350,000 ل.ل",
        pricePerKg: 135000,
        image: "/orange-blossom-water.jpg",
      },
      {
        name: "دبس رمان",
        price: "1,620,000 ل.ل",
        pricePerKg: 1620000,
        image: "/pomegranate-molasses.jpg",
      },
      {
        name: "عسل سنديان",
        price: "3,150,000 ل.ل",
        pricePerKg: 3150000,
        image: "/oak-honey.jpg",
      },
    ],
  },
]

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { addItem, toastMessage, showToast, hideToast } = useCart()

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  const handleCategoryClick = (categoryIndex: number) => {
    setSelectedCategory(selectedCategory === categoryIndex ? null : categoryIndex)
  }

  const handleAddToCart = (item: any, categoryIndex: number) => {
    const cartItem = {
      id: `${categoryIndex}-${item.name}`,
      name: item.name,
      price: item.price,
      pricePerKg: item.pricePerKg,
    }
    addItem(cartItem)
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
              {menuCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 cursor-pointer group"
                  onClick={() => handleCategoryClick(index)}
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-64 h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-75" />
                    <div className="absolute bottom-4 left-4 right-4 bg-black rounded-lg p-3">
                      <h3 className="text-white font-bold text-lg text-balance text-right">{category.name}</h3>
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
            // Show only selected category
            <div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-foreground mb-2">{menuCategories[selectedCategory].name}</h3>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
                <Button variant="outline" onClick={() => setSelectedCategory(null)} className="mt-4">
                  عرض جميع الفئات
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {menuCategories[selectedCategory].items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white group shadow-md hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="relative h-40 md:h-44 overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                    <CardHeader className="p-4 space-y-4">
                      <CardTitle className="text-sm md:text-base font-bold text-gray-800 text-right leading-relaxed text-balance">
                        {item.name}
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
                          {item.price}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Show all categories
            menuCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-foreground mb-2">{category.name}</h3>
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
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      </div>
                      <CardHeader className="p-4 space-y-4">
                        <CardTitle className="text-sm md:text-base font-bold text-gray-800 text-right leading-relaxed text-balance">
                          {item.name}
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
                            {item.price}
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
  )
}
