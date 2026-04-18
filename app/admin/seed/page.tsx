"use client";

import { useAdmin } from "@/contexts/admin-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function DataSeeder() {
  const { addCategory, addItem, categories } = useAdmin();
  const { toast } = useToast();
  const [seeding, setSeeding] = useState(false);
  const [status, setStatus] = useState("");

  const seedData = async () => {
    if (seeding) return;
    setSeeding(true);

    try {
      setStatus("Starting...");
      toast({ title: "Starting to seed data..." });

      const currentCats = [...categories];

      const allData = [
        {
          nameEn: "Baklava",
          nameAr: "البقلاوة",
          image: "/baklava-category.jpg",
          items: [
            { nameEn: "Plain Baklava", nameAr: "بقلاوة سادة", price: 1000000, priceDisplay: "1,000,000 ل.ل / كيلو", image: "/baklava-sada.jpg" },
            { nameEn: "Mixed Baklava", nameAr: "بقلاوة مشكل", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/baklava-mishkal.jpg" },
            { nameEn: "Pistachio Roll", nameAr: "كول و شكور فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / كيلو", image: "/barma-pistachio.jpg" },
            { nameEn: "Pistachio Barma", nameAr: "برمة فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / كيلو", image: "/barma-pistachio.jpg" },
            { nameEn: "Fingers", nameAr: "أصابع", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/baklava-category.jpg" },
            { nameEn: "Istanbul Pistachio", nameAr: "إسطنبولية فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / كيلو", image: "/istanbuliya-pistachio.jpg" },
            { nameEn: "Istanbul Cashew", nameAr: "إسطنبولية كاجو", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/istanbuliya-cashew.jpg" },
            { nameEn: "Walnut Baklava", nameAr: "بقلاوة جوز", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/baklava-walnut.jpg" },
            { nameEn: "White Mixed", nameAr: "مشكّل أبيض", price: 1100000, priceDisplay: "1,100,000 ل.ل / كيلو", image: "/white-mixed-sweets.jpg" },
          ]
        },
        {
          nameEn: "Eid Ma'amoul",
          nameAr: "معمول العيد",
          image: "/mamoul-mixed.jpg",
          items: [
            { nameEn: "Walnut Mamoul", nameAr: "معمول جوز", price: 900000, priceDisplay: "900,000 ل.ل", image: "/mamoul-walnut.jpg" },
            { nameEn: "Small Pistachio Mamoul", nameAr: "معمول فستق صغير", price: 1300000, priceDisplay: "1,300,000 ل.ل", image: "/mamoul-pistachio.jpg" },
            { nameEn: "Small Mamoul", nameAr: "معمول صغير", price: 700000, priceDisplay: "700,000 ل.ل", image: "/mamoul-small.jpg" },
            { nameEn: "Mixed Mamoul", nameAr: "معمول مشكل", price: 1000000, priceDisplay: "1,000,000 ل.ل", image: "/mamoul-mixed.jpg" },
            { nameEn: "Tamara", nameAr: "تمارة", price: 750000, priceDisplay: "750,000 ل.ل", image: "/tamara-dates.jpg" },
            { nameEn: "Large Mamoul", nameAr: "معمول كبير", price: 0, priceDisplay: "حسب الطلب", image: "/mamoul-mixed.jpg" },
          ]
        },
        {
          nameEn: "Mamoul",
          nameAr: "المعمول",
          image: "/mamoul-category.jpg",
          items: [
            { nameEn: "Walnut Mamoul", nameAr: "معمول مد جوز", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/mamoul-walnut.jpg" },
            { nameEn: "Dates Mamoul", nameAr: "معمول مد تمر", price: 600000, priceDisplay: "600,000 ل.ل / كيلو", image: "/mamoul-dates.jpg" },
            { nameEn: "Pistachio Mamoul", nameAr: "معمول مد فستق", price: 800000, priceDisplay: "800,000 ل.ل / كيلو", image: "/mamoul-pistachio.jpg" },
            { nameEn: "Namoura", nameAr: "نمورة", price: 400000, priceDisplay: "400,000 ل.ل / كيلو", image: "/namoura.jpg" },
            { nameEn: "Sufuf", nameAr: "صفوف", price: 400000, priceDisplay: "400,000 ل.ل / كيلو", image: "/mafrouka.jpg" },
          ]
        },
        {
          nameEn: "Cream Desserts",
          nameAr: "القشطويات",
          image: "/cream-desserts-category.jpg",
          items: [
            { nameEn: "Knafeh with Cream", nameAr: "كنافة قشطة", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/knafeh-cream.jpg" },
            { nameEn: "Knafeh with Cheese", nameAr: "كنافة جبنة", price: 750000, priceDisplay: "750,000 ل.ل / كيلو", image: "/knafeh-cheese.jpg" },
            { nameEn: "Mafruka", nameAr: "مفروكة", price: 900000, priceDisplay: "900,000 ل.ل / كيلو", image: "/mafrouka.jpg" },
            { nameEn: "Ward El Sham", nameAr: "ورد الشام", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/ward-el-sham.jpg" },
            { nameEn: "Basma", nameAr: "بصمة", price: 700000, priceDisplay: "700,000 ل.ل / kilo", image: "/basma.jpg" },
            { nameEn: "Khalaj", nameAr: "كلاج", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/cream-desserts-category.jpg" },
            { nameEn: "Regular Halawa", nameAr: "حلاوة عادي", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/halawa-regular.jpg" },
            { nameEn: "Rolled Halawa", nameAr: "حلاوة لف", price: 800000, priceDisplay: "800,000 ل.ل / كيلو", image: "/halawa-rolled.jpg" },
            { nameEn: "Rice Halawa", nameAr: "حلاوة الرز", price: 500000, priceDisplay: "500,000 ل.ل / كيلو", image: "/halawa-rice.jpg" },
            { nameEn: "Zanood El Set", nameAr: "زنود الست", price: 800000, priceDisplay: "800,000 ل.ل / كيلو", image: "/middle-eastern-specialty-desserts-knafeh.jpg" },
            { nameEn: "Cream Extension", nameAr: "مد قشطة", price: 650000, priceDisplay: "650,000 ل.ل / كيلو", image: "/cream-extension.jpg" },
            { nameEn: "Qataif", nameAr: "قطايف", price: 600000, priceDisplay: "600,000 ل.ل / كيلو", image: "/cream-desserts-category.jpg" },
            { nameEn: "Namoura with Cream", nameAr: "نمورة بالقشطة", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/namoura-qishta.jpg" },
          ]
        },
        {
          nameEn: "Premium Cold Mix",
          nameAr: "مشكل براد أكسترا",
          image: "/premium-cold-category.jpg",
          items: [
            { nameEn: "Regular Cream Mix", nameAr: "مشكل قشطة عادي", price: 800000, priceDisplay: "800,000 ل.ل / كيلو", image: "/mixed-cream-regular.jpg" },
            { nameEn: "Cold Mix", nameAr: "مشكل براد", price: 1000000, priceDisplay: "1,000,000 ل.ل / كيلو", image: "/mixed-cold-tray.jpg" },
            { nameEn: "Cold with Pistachio", nameAr: "براد مع فستق", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/cold-pistachio.jpg" },
            { nameEn: "Daqawiya", nameAr: "داعقوية", price: 2000000, priceDisplay: "2,000,000 ل.ل / كيلو", image: "/daaqouiya.jpg" },
          ]
        },
        {
          nameEn: "Pieces & Plates",
          nameAr: "قطع و صحون",
          image: "/pieces-plates-category.jpg",
          items: [
            { nameEn: "Knafeh Cream Cake", nameAr: "كعكة كنافة قشطة", price: 120000, priceDisplay: "120,000 ل.ل / الصحن", image: "/knafeh-cream-cake.jpg" },
            { nameEn: "Knafeh Cheese Cake", nameAr: "كعكة كنافة جبنة", price: 120000, priceDisplay: "120,000 ل.ل / الصحن", image: "/knafeh-cheese-cake.jpg" },
            { nameEn: "Square Lahem", nameAr: "لحم بعجين مربع", price: 75000, priceDisplay: "75,000 ل.ل", image: "/lahem-baajin-square.jpg" },
            { nameEn: "Round Lahem", nameAr: "لحم بعجين مدور", price: 75000, priceDisplay: "75,000 ل.ل", image: "/lahem-baajin-round.jpg" },
            { nameEn: "Mafruka Cake", nameAr: "كعكة مفروكة", price: 150000, priceDisplay: "150,000 ل.ل", image: "/mafrouka-cake.jpg" },
            { nameEn: "Rice Halawa Cream Cake", nameAr: "كعكة حلاوة الرز مع قشطة", price: 120000, priceDisplay: "120,000 ل.ل", image: "/rice-halawa-cream-cake.jpg" },
            { nameEn: "Walnut Pie", nameAr: "فطيرة جوز", price: 100000, priceDisplay: "100,000 ل.ل", image: "/walnut-pie.jpg" },
            { nameEn: "Cream Pie", nameAr: "فطيرة قشطة", price: 120000, priceDisplay: "120,000 ل.ل", image: "/cream-pie.jpg" },
            { nameEn: "Marshmallow", nameAr: "مارشميلو", price: 100000, priceDisplay: "100,000 ل.ل", image: "/marshmallow-dessert.jpg" },
            { nameEn: "Cheesecake", nameAr: "تشيز كيك", price: 100000, priceDisplay: "100,000 ل.ل", image: "/cheesecake.jpg" },
            { nameEn: "Oreo", nameAr: "أوريو", price: 100000, priceDisplay: "100,000 ل.ل", image: "/oreo-dessert.jpg" },
            { nameEn: "Tiramisu", nameAr: "تيراميسو", price: 100000, priceDisplay: "100,000 ل.ل", image: "/tiramisu.jpg" },
            { nameEn: "Cream Sweets Plate", nameAr: "صحن قشطويات", price: 200000, priceDisplay: "200,000 ل.ل", image: "/cream-sweets-plate.jpg" },
            { nameEn: "Baklava Plate", nameAr: "صحن بقلاوة أو مشكل", price: 250000, priceDisplay: "250,000 ل.ل", image: "/baklava-mixed-plate.jpg" },
            { nameEn: "Daqawiya Plate", nameAr: "صحن داعقوية", price: 400000, priceDisplay: "400,000 ل.ل", image: "/daqawiya-plate-new.jpg" },
          ]
        },
        {
          nameEn: "Nuts",
          nameAr: "المكسرات",
          image: "/nuts-category.jpg",
          items: [
            { nameEn: "Regular Nuts", nameAr: "مكسرات عادي", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/nuts-regular.jpg" },
            { nameEn: "Sesame & Abida", nameAr: "سمسية وعبيدة", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/sesame-abida.jpg" },
            { nameEn: "Extra Nuts", nameAr: "مكسرات أكسترا", price: 1300000, priceDisplay: "1,300,000 ل.ل / كيلو", image: "/nuts-extra.jpg" },
          ]
        },
        {
          nameEn: "Chocolate",
          nameAr: "شوكولا",
          image: "/chocolate-category.jpg",
          items: [
            { nameEn: "Sweet Chocolate", nameAr: "شوكولا حلو", price: 1000000, priceDisplay: "1,000,000 ل.ل / كيلو", image: "/chocolate-sweet.jpg" },
            { nameEn: "Bitter Chocolate", nameAr: "شوكولا مر", price: 1100000, priceDisplay: "1,100,000 ل.ل / كيلو", image: "/chocolate-bitter.jpg" },
            { nameEn: "Chocolate Coated", nameAr: "ملبس شوكولا", price: 1000000, priceDisplay: "1,000,000 ل.ل / كيلو", image: "/chocolate-coated.jpg" },
            { nameEn: "Coated Almonds", nameAr: "لوز بالقشطة", price: 1000000, priceDisplay: "1,000,000 ل.ل / kilo", image: "/chocolate-coated-almonds.jpg" },
            { nameEn: "Bonbon", nameAr: "بنبون", price: 550000, priceDisplay: "550,000 ل.ل / كيلو", image: "/bonbon.jpg" },
            { nameEn: "Chocolate Halawa", nameAr: "شوكولا حلاوة", price: 550000, priceDisplay: "550,000 ل.ل / kilo", image: "/chocolate-halawa.jpg" },
            { nameEn: "Gift Bag", nameAr: "كيس هدية", price: 100000, priceDisplay: "100,000 ل.ل", image: "/gift-bag.jpg" },
            { nameEn: "Empty Tray", nameAr: "صينية هدية فارغة", price: 350000, priceDisplay: "350,000 ل.ل", image: "/empty-gift-tray.jpg" },
          ]
        },
        {
          nameEn: "Ice Cream",
          nameAr: "بوظة / آيس كريم",
          image: "/ice-cream-category.jpg",
          items: [
            { nameEn: "Small Cone", nameAr: "كورنية صغيرة", price: 100000, priceDisplay: "100,000 ل.ل", image: "/small-cone.jpg" },
            { nameEn: "Large Cone", nameAr: "كورنية كبيرة", price: 150000, priceDisplay: "150,000 ل.ل", image: "/large-ice-cream-cone.jpg" },
            { nameEn: "Cup", nameAr: "كاسة", price: 200000, priceDisplay: "200,000 ل.ل", image: "/ice-cream-cup.jpg" },
            { nameEn: "1 KG", nameAr: "واحد كغ", price: 850000, priceDisplay: "850,000 ل.ل", image: "/one-kg-ice-cream.jpg" },
            { nameEn: "1 KG Premium", nameAr: "1 كغ (قشطة أو فستق أو أفوكادو)", price: 1350000, priceDisplay: "1,350,000 ل.ل", image: "/premium-ice-cream-1kg.jpg" },
          ]
        },
        {
          nameEn: "Bottles",
          nameAr: "قناني",
          image: "/bottles-category.jpg",
          items: [
            { nameEn: "Large Tin", nameAr: "تنك كبيرة", price: 180000, priceDisplay: "180,000 ل.ل", image: "/large-tin.jpg" },
            { nameEn: "Medium Tin", nameAr: "تنك وسط", price: 100000, priceDisplay: "100,000 ل.ل", image: "/medium-tin.jpg" },
            { nameEn: "Small Tin", nameAr: "تنك صغير", price: 80000, priceDisplay: "80,000 ل.ل", image: "/small-tin.jpg" },
            { nameEn: "Rose Water", nameAr: "ماء ورد", price: 1080000, priceDisplay: "1,080,000 ل.ل", image: "/rose-water.jpg" },
            { nameEn: "Orange Blossom Water", nameAr: "ماء زهر", price: 1350000, priceDisplay: "1,350,000 ل.ل", image: "/orange-blossom-water.jpg" },
            { nameEn: "Pomegranate Molasses", nameAr: "دبس رمان", price: 1620000, priceDisplay: "1,620,000 ل.ل", image: "/pomegranate-molasses.jpg" },
            { nameEn: "Oak Honey", nameAr: "عسل سنديان", price: 3150000, priceDisplay: "3,150,000 ل.ل", image: "/oak-honey.jpg" },
          ]
        },
      ];

      let totalAdded = 0;

      for (const cat of allData) {
        setStatus(`Adding category: ${cat.nameAr}...`);
        
        await addCategory({
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          image: cat.image
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        const { categories: currentCats } = useAdmin();
        const newCat = currentCats[currentCats.length - 1];
        
        if (newCat && newCat.id) {
          for (const item of cat.items) {
            setStatus(`Adding item: ${item.nameAr}...`);
            await addItem(newCat.id, {
              nameEn: item.nameEn,
              nameAr: item.nameAr,
              price: item.price,
              priceDisplay: item.priceDisplay,
              image: item.image
            });
            await new Promise(resolve => setTimeout(resolve, 300));
            totalAdded++;
          }
        }
      }

      setStatus(`Done! Added ${totalAdded} items.`);
      toast({ title: `Success! Added ${totalAdded} items in ${allData.length} categories` });
    } catch (error) {
      console.error(error);
      toast({ title: "Error seeding data", variant: "destructive" });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Seed All Menu Data</h1>
        <p className="mb-4 text-gray-600">This will add ALL your products to Firebase database.</p>
        
        {status && (
          <div className="mb-4 p-3 bg-blue-100 rounded text-blue-800">{status}</div>
        )}
        
        <Button onClick={seedData} disabled={seeding} className="bg-green-600 hover:bg-green-700">
          {seeding ? "Seeding..." : "Upload All Menu Data"}
        </Button>
        
        <p className="mt-4 text-sm text-gray-500">
          Categories: Baklava, Eid Mamoul, Mamoul, Cream Desserts, Premium Cold Mix, 
          Pieces & Plates, Nuts, Chocolate, Ice Cream, Bottles = 10 categories
        </p>
      </div>
    </div>
  );
}