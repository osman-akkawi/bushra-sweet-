"use client";

import { useState } from "react";
import { useAdmin } from "@/contexts/admin-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function DataSeeder() {
  const { toast } = useToast();
  const [seeding, setSeeding] = useState(false);
  const [status, setStatus] = useState("");

  const seedData = async () => {
    if (seeding) return;
    setSeeding(true);

    try {
      setStatus("Starting...");
      toast({ title: "Starting to seed data..." });

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
            { nameEn: "Walnut Baklava", nameAr: "بقلاوة جوز", price: 1200000, priceDisplay: "1,200,000 ل.ل / كيلو", image: "/baklava-walnut.jpg" },
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
          ]
        },
        {
          nameEn: "Cream Desserts",
          nameAr: "القشطويات",
          image: "/cream-desserts-category.jpg",
          items: [
            { nameEn: "Knafeh Cream", nameAr: "كنافة قشطة", price: 700000, priceDisplay: "700,000 ل.ل / كيلو", image: "/knafeh-cream.jpg" },
            { nameEn: "Knafeh Cheese", nameAr: "كنافة جبنة", price: 750000, priceDisplay: "750,000 ل.ل / كيلو", image: "/knafeh-cheese.jpg" },
          ]
        },
        {
          nameEn: "Chocolate",
          nameAr: "شوكولا",
          image: "/chocolate-category.jpg",
          items: [
            { nameEn: "Sweet Chocolate", nameAr: "شوكولا حلو", price: 1000000, priceDisplay: "1,000,000 ل.ل / كيلو", image: "/chocolate-sweet.jpg" },
            { nameEn: "Bitter Chocolate", nameAr: "شوكولا مر", price: 1100000, priceDisplay: "1,100,000 ل.ل / كيلو", image: "/chocolate-bitter.jpg" },
          ]
        },
        {
          nameEn: "Ice Cream",
          nameAr: "بوظة",
          image: "/ice-cream-category.jpg",
          items: [
            { nameEn: "Small Cone", nameAr: "كورنية صغيرة", price: 100000, priceDisplay: "100,000 ل.ل", image: "/small-cone.jpg" },
            { nameEn: "Cup", nameAr: "كاسة", price: 200000, priceDisplay: "200,000 ل.ل", image: "/ice-cream-cup.jpg" },
          ]
        },
      ];

      let totalItems = 0;

      for (let i = 0; i < allData.length; i++) {
        const cat = allData[i];
        setStatus(`Adding: ${cat.nameAr}...`);
        
        const catRef = await addDoc(collection(db, "categories"), {
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          image: cat.image,
          order: i
        });
        
        for (const item of cat.items) {
          await addDoc(collection(db, "categories", catRef.id, "items"), item);
          totalItems++;
        }
      }

      setStatus(`Done! Added ${allData.length} categories with ${totalItems} items`);
      toast({ title: `Success! Added ${allData.length} categories, ${totalItems} items` });
      
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
      toast({ title: "Error: " + error.message, variant: "destructive" });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Seed Menu Data</h1>
      <p className="mb-4 text-gray-600">Add all menu items to Firebase.</p>
      
      {status && <div className="mb-4 p-3 bg-blue-100 rounded">{status}</div>}
      
      <Button onClick={seedData} disabled={seeding} className="bg-green-600">
        {seeding ? "Adding..." : "Upload All Menu Data"}
      </Button>
    </div>
  );
}