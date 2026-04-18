"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc,
  addDoc,
  query,
  orderBy 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface MenuItem {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  priceDisplay: string;
  image: string;
}

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  image: string;
  items: MenuItem[];
}

interface AdminContextType {
  categories: Category[];
  loading: boolean;
  isAdmin: boolean;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  addCategory: (category: Omit<Category, "id" | "items">) => Promise<string>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addItem: (categoryId: string, item: Omit<MenuItem, "id">) => Promise<void>;
  updateItem: (categoryId: string, itemId: string, item: Partial<MenuItem>) => Promise<void>;
  deleteItem: (categoryId: string, itemId: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "albochra123"; // Change this password

export function AdminProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "categories"), orderBy("order"));
      const snapshot = await getDocs(q);
      
      const fetchedCategories: Category[] = [];
      
      for (const catDoc of snapshot.docs) {
        const catData = catDoc.data();
        const itemsRef = collection(db, "categories", catDoc.id, "items");
        const itemsSnapshot = await getDocs(itemsRef);
        
        const items: MenuItem[] = itemsSnapshot.docs.map(itemDoc => ({
          id: itemDoc.id,
          ...itemDoc.data()
        } as MenuItem));
        
        fetchedCategories.push({
          id: catDoc.id,
          nameEn: catData.nameEn,
          nameAr: catData.nameAr,
          image: catData.image,
          items
        });
      }
      
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  const addCategory = async (category: Omit<Category, "id" | "items">) => {
    const docRef = await addDoc(collection(db, "categories"), {
      ...category,
      order: categories.length
    });
    await fetchMenu();
    return docRef.id;
  };

  const updateCategory = async (id: string, category: Partial<Category>) => {
    await setDoc(doc(db, "categories", id), category, { merge: true });
    await fetchMenu();
  };

  const deleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
    await fetchMenu();
  };

  const addItem = async (categoryId: string, item: Omit<MenuItem, "id">) => {
    await addDoc(collection(db, "categories", categoryId, "items"), item);
    await fetchMenu();
  };

  const updateItem = async (categoryId: string, itemId: string, item: Partial<MenuItem>) => {
    await setDoc(doc(db, "categories", categoryId, "items", itemId), item, { merge: true });
    await fetchMenu();
  };

  const deleteItem = async (categoryId: string, itemId: string) => {
    await deleteDoc(doc(db, "categories", categoryId, "items", itemId));
    await fetchMenu();
  };

  return (
    <AdminContext.Provider value={{
      categories,
      loading,
      isAdmin,
      adminLogin,
      adminLogout,
      addCategory,
      updateCategory,
      deleteCategory,
      addItem,
      updateItem,
      deleteItem
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}