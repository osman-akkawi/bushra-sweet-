"use client";

import { useState } from "react";
import { useAdmin } from "@/contexts/admin-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, LogOut } from "lucide-react";

export default function AdminPanel() {
  const { 
    isAdmin, 
    adminLogin, 
    adminLogout, 
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem
  } = useAdmin();
  
  const [password, setPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(!isAdmin);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const { toast } = useToast();

  const [categoryForm, setCategoryForm] = useState({
    nameEn: "",
    nameAr: "",
    image: ""
  });

  const [itemForm, setItemForm] = useState({
    nameEn: "",
    nameAr: "",
    price: 0,
    priceDisplay: "",
    image: ""
  });

  const [lang, setLang] = useState<"en" | "ar">("ar");

  const handleLogin = async () => {
    const success = await adminLogin(password);
    if (success) {
      setShowPasswordModal(false);
      toast({ title: "تم تسجيل الدخول بنجاح" });
    } {
      toast({ title: "كلمة المرور خاطئة", variant: "destructive" });
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory(categoryForm);
      setIsCategoryDialogOpen(false);
      setCategoryForm({ nameEn: "", nameAr: "", image: "" });
      toast({ title: "تمت إضافة الفئة بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory) return;
    try {
      await updateCategory(editingCategory.id, categoryForm);
      setIsCategoryDialogOpen(false);
      setEditingCategory(null);
      setCategoryForm({ nameEn: "", nameAr: "", image: "" });
      toast({ title: "تم التحديث بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return;
    try {
      await deleteCategory(id);
      toast({ title: "تم الحذف بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleAddItem = async () => {
    if (!selectedCategoryId) return;
    try {
      await addItem(selectedCategoryId, itemForm);
      setIsItemDialogOpen(false);
      setItemForm({ nameEn: "", nameAr: "", price: 0, priceDisplay: "", image: "" });
      toast({ title: "تمت إضافة المنتج بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleUpdateItem = async () => {
    if (!selectedCategoryId || !editingItem) return;
    try {
      await updateItem(selectedCategoryId, editingItem.id, itemForm);
      setIsItemDialogOpen(false);
      setEditingItem(null);
      setItemForm({ nameEn: "", nameAr: "", price: 0, priceDisplay: "", image: "" });
      toast({ title: "تم التحديث بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleDeleteItem = async (categoryId: string, itemId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    try {
      await deleteItem(categoryId, itemId);
      toast({ title: "تم الحذف بنجاح" });
    } catch {
      toast({ title: "حدث خطأ", variant: "destructive" });
    }
  };

  const handleImageUrl = (url: string) => {
    if (isEditingMode && editingCategory) {
      setCategoryForm({ ...categoryForm, image: url });
    } else if (editingItem) {
      setItemForm({ ...itemForm, image: url });
    } else {
      setItemForm({ ...itemForm, image: url });
    }
  };

  const openItemDialog = (categoryId: string, item?: any) => {
    setSelectedCategoryId(categoryId);
    setIsEditingMode(!!item);
    setEditingItem(item || null);
    if (item) {
      setItemForm({
        nameEn: item.nameEn,
        nameAr: item.nameAr,
        price: item.price,
        priceDisplay: item.priceDisplay,
        image: item.image
      });
    } else {
      setItemForm({ nameEn: "", nameAr: "", price: 0, priceDisplay: "", image: "" });
    }
    setIsItemDialogOpen(true);
  };

  const openCategoryDialog = (category?: any) => {
    setIsEditingMode(!!category);
    setEditingCategory(category || null);
    if (category) {
      setCategoryForm({
        nameEn: category.nameEn,
        nameAr: category.nameAr,
        image: category.image
      });
    } else {
      setCategoryForm({ nameEn: "", nameAr: "", image: "" });
    }
    setIsCategoryDialogOpen(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">لوحة الإدارة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>كلمة المرور</Label>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                تسجيل الدخول
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">لوحة التحكم - Boutique Sweets</h1>
          <div className="flex gap-2">
            <Button 
              variant={lang === "ar" ? "default" : "outline"} 
              onClick={() => setLang("ar")}
            >
              العربية
            </Button>
            <Button 
              variant={lang === "en" ? "default" : "outline"} 
              onClick={() => setLang("en")}
            >
              English
            </Button>
            <Button variant="destructive" onClick={adminLogout}>
              <LogOut className="w-4 h-4 ml-2" />
              خروج
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openCategoryDialog()}>
                <Plus className="w-4 h-4 ml-2" />
                {lang === "ar" ? "إضافة فئة جديدة" : "Add New Category"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {isEditingMode 
                    ? (lang === "ar" ? "تعديل فئة" : "Edit Category")
                    : (lang === "ar" ? "إضافة فئة جديدة" : "Add New Category")
                  }
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>{lang === "ar" ? "الاسم بالإنجليزية" : "Name in English"}</Label>
                  <Input 
                    value={categoryForm.nameEn} 
                    onChange={(e) => setCategoryForm({...categoryForm, nameEn: e.target.value})}
                    placeholder="Baklava"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{lang === "ar" ? "الاسم بالعربية" : "Name in Arabic"}</Label>
                  <Input 
                    value={categoryForm.nameAr} 
                    onChange={(e) => setCategoryForm({...categoryForm, nameAr: e.target.value})}
                    placeholder="بقلاوة"
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{lang === "ar" ? "رابط الصورة" : "Image URL"}</Label>
                  {categoryForm.image && (
                    <img src={categoryForm.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                  )}
                  <Input 
                    value={categoryForm.image} 
                    onChange={(e) => setCategoryForm({...categoryForm, image: e.target.value})}
                    placeholder="/baklava-category.jpg"
                  />
                  <p className="text-xs text-gray-500">Images in /public folder (e.g. /baklava-category.jpg, /mamoul-mixed.jpg)</p>
                </div>
                <Button onClick={isEditingMode ? handleUpdateCategory : handleAddCategory} className="w-full">
                  {isEditingMode 
                    ? (lang === "ar" ? "حفظ" : "Save")
                    : (lang === "ar" ? "إضافة" : "Add")
                  }
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-20">جاري التحميل...</div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img 
                      src={category.image} 
                      alt={category.nameAr} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <CardTitle>{lang === "ar" ? category.nameAr : category.nameEn}</CardTitle>
                      <p className="text-sm text-gray-500">
                        {category.items.length} {lang === "ar" ? "منتج" : "items"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openItemDialog(category.id)}
                    >
                      <Plus className="w-4 h-4 ml-2" />
                      {lang === "ar" ? "إضافة منتج" : "Add Item"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openCategoryDialog(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {category.items.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.nameAr} 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-3">
                          <p className="font-bold text-sm text-right" dir="rtl">
                            {lang === "ar" ? item.nameAr : item.nameEn}
                          </p>
                          <p className="text-sm text-gray-500">{item.priceDisplay}</p>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openItemDialog(category.id, item)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteItem(category.id, item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {isEditingMode 
                  ? (lang === "ar" ? "تعديل منتج" : "Edit Item")
                  : (lang === "ar" ? "إضافة منتج جديد" : "Add New Item")
                }
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>{lang === "ar" ? "الاسم بالإنجليزية" : "Name in English"}</Label>
                <Input 
                  value={itemForm.nameEn} 
                  onChange={(e) => setItemForm({...itemForm, nameEn: e.target.value})}
                  placeholder="Baklava"
                />
              </div>
              <div className="space-y-2">
                <Label>{lang === "ar" ? "الاسم بالعربية" : "Name in Arabic"}</Label>
                <Input 
                  value={itemForm.nameAr} 
                  onChange={(e) => setItemForm({...itemForm, nameAr: e.target.value})}
                  placeholder="بقلاوة سادة"
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label>{lang === "ar" ? "السعر" : "Price"}</Label>
                <Input 
                  type="number"
                  value={itemForm.price} 
                  onChange={(e) => setItemForm({...itemForm, price: Number(e.target.value)})}
                  placeholder="1000000"
                />
              </div>
              <div className="space-y-2">
                <Label>{lang === "ar" ? "عرض السعر" : "Price Display"}</Label>
                <Input 
                  value={itemForm.priceDisplay} 
                  onChange={(e) => setItemForm({...itemForm, priceDisplay: e.target.value})}
                  placeholder="1,000,000 ل.ل / كيلو"
                  dir="rtl"
                />
              </div>
              <div className="space-y-2">
                <Label>{lang === "ar" ? "رابط الصورة" : "Image URL"}</Label>
                {itemForm.image && (
                  <img src={itemForm.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
                <Input 
                  value={itemForm.image} 
                  onChange={(e) => setItemForm({...itemForm, image: e.target.value})}
                  placeholder="/baklava-sada.jpg"
                />
                <p className="text-xs text-gray-500">Example: /baklava-sada.jpg, /chocolate-sweet.jpg</p>
              </div>
              <Button onClick={isEditingMode ? handleUpdateItem : handleAddItem} className="w-full">
                {isEditingMode 
                  ? (lang === "ar" ? "حفظ" : "Save")
                  : (lang === "ar" ? "إضافة" : "Add")
                }
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}