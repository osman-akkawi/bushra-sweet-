"use client";

import { useAdmin } from "@/contexts/admin-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

export default function DataSeeder() {
  const { addCategory, addItem, categories } = useAdmin();
  const { toast } = useToast();
  const [seeding, setSeeding] = useState(false);

  const seedData = async () => {
    if (seeding) return;
    setSeeding(true);

    try {
      toast({ title: "Starting to seed data..." });

      const categoryData = [
        {
          nameEn: "Baklava",
          nameAr: "البقلاوة (Baklava)",
          image: "/baklava-category.jpg",
          items: [
            { nameEn: "Plain Baklava", nameAr: "بقلاوة سادة", price: 1000000, priceDisplay: "1,000,000 ل.ل / kilo", image: "/baklava-sada.jpg" },
            { nameEn: "Mixed Baklava", nameAr: "بقلاوة مشكل", price: 1200000, priceDisplay: "1,200,000 ل.ل / kilo", image: "/baklava-mishkal.jpg" },
            { nameEn: "Pistachio Roll", nameAr: "كول و شكور فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / kilo", image: "/barma-pistachio.jpg" },
            { nameEn: "Pistachio Barma", nameAr: "برمة فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / kilo", image: "/barma-pistachio.jpg" },
            { nameEn: "Fingers", nameAr: "اصابع", price: 1200000, priceDisplay: "1,200,000 ل.ل / kilo", image: "/baklava-category.jpg" },
            { nameEn: "Istanbul Pistachio", nameAr: "اسطنبولية فستق", price: 2250000, priceDisplay: "2,250,000 ل.ل / kilo", image: "/baklava-category.jpg" },
            { nameEn: "Walnut Baklava", nameAr: "بقلاوة جوز", price: 1200000, priceDisplay: "1,200,000 ل.ل / kilo", image: "/baklava-walnut.jpg" },
          ]
        },
        {
          nameEn: "Eid Ma'amoul",
          nameAr: "معمول العيد",
          image: "/mamoul-mixed.jpg",
          items: [
            { nameEn: "Walnut Mamoul", nameAr: "معمول جوز", price: 900000, priceDisplay: "900,000 ل.ل", image: "/mamoul-walnut.jpg" },
            { nameEn: "Pistachio Mamoul", nameAr: "معمول فستق", price: 1300000, priceDisplay: "1,300,000 ل.ل", image: "/mamoul-pistachio.jpg" },
            { nameEn: "Mixed Mamoul", nameAr: "معمول مشكل", price: 1000000, priceDisplay: "1,000,000 ل.ل", image: "/mamoul-mixed.jpg" },
            { nameEn: "Tamara", nameAr: "تمارة", price: 750000, priceDisplay: "750,000 ل.ل", image: "/tamara-dates.jpg" },
          ]
        },
        {
          nameEn: "Cream Desserts",
          nameAr: "القشطويات",
          image: "/cream-desserts-category.jpg",
          items: [
            { nameEn: "Knafeh with Cream", nameAr: "كنافة قشطة", price: 700000, priceDisplay: "700,000 ل.ل / kilo", image: "/cream-desserts-category.jpg" },
            { nameEn: "Knafeh with Cheese", nameAr: "كنافة جبنة", price: 750000, priceDisplay: "750,000 ل.ل / kilo", image: "/cream-desserts-category.jpg" },
            { nameEn: "Mafruka", nameAr: "مفروكة", price: 900000, priceDisplay: "900,000 ل.ل / kilo", image: "/cream-desserts-category.jpg" },
          ]
        },
        {
          nameEn: "Chocolate",
          nameAr: "شوكولا",
          image: "/chocolate-category.jpg",
          items: [
            { nameEn: "Sweet Chocolate", nameAr: "شوكولا حلو", price: 1000000, priceDisplay: "1,000,000 ل.ل / kilo", image: "/chocolate-sweet.jpg" },
            { nameEn: "Bitter Chocolate", nameAr: "شوكولا مر", price: 1100000, priceDisplay: "1,100,000 ل.ل / kilo", image: "/chocolate-bitter.jpg" },
            { nameEn: "Chocolate Coated", nameAr: "ملبس شوكولا", price: 1000000, priceDisplay: "1,000,000 ل.ل / kilo", image: "/chocolate-coated.jpg" },
          ]
        },
      ];

      let categoryCount = categories.length;

      for (const cat of categoryData) {
        categoryCount++;
        await addCategory({
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          image: cat.image
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        const currentCategories = [...categories];
        const newCat = currentCategories[currentCategories.length - 1];
        
        if (newCat) {
          for (const item of cat.items) {
            await addItem(newCat.id, {
              ...item,
              image: item.image || cat.image
            });
          }
        }
      }

      toast({ title: "Data seeded successfully! Categories added: " + categoryCount });
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
        <h1 className="text-2xl font-bold mb-4">Seed Menu Data</h1>
        <p className="mb-4 text-gray-600">This will add sample categories and items to your Firebase database.</p>
        <Button onClick={seedData} disabled={seeding} className="bg-blue-600 hover:bg-blue-700">
          {seeding ? "Seeding..." : "Seed Sample Data"}
        </Button>
      </div>
    </div>
  );
}