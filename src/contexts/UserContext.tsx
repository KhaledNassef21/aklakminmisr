import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase"; // تأكد من أن المسار صحيح

// نوع البيانات اللي هنستخدمها
interface UserContextType {
  currentUser: User | null;              // بيانات المستخدم الحالي
  favorites: string[];                  // قائمة الأطباق المفضلة (IDs)
  addToFavorites: (id: string) => void; // إضافة طبق للمفضلة
  removeFromFavorites: (id: string) => void; // حذف طبق من المفضلة
  orders: any[];                         // قائمة الطلبات
  placeOrder: (orderData: any) => void; // إضافة طلب جديد
}

// إنشاء الـ Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider اللي هنلفّ به الموقع علشان نوفر بيانات المستخدم
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // التحقق من حالة المستخدم عند كل تغيير
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // هنا يمكننا لاحقًا تحميل المفضلة والطلبات من Firebase
        console.log("User logged in:", user.email);
      }
    });

    return () => unsubscribe(); // تنظيف عند إغلاق الصفحة
  }, []);

  // إضافة طبق للمفضلة
  const addToFavorites = (id: string) => {
    setFavorites((prev) => [...prev, id]);
  };

  // حذف طبق من المفضلة
  const removeFromFavorites = (id: string) => {
    setFavorites((prev) => prev.filter((itemId) => itemId !== id));
  };

  // تسجيل طلب جديد
  const placeOrder = (orderData: any) => {
    if (!currentUser) {
      alert("يجب تسجيل الدخول أولًا");
      return;
    }

    const newOrder = {
      ...orderData,
      userId: currentUser.uid,
      date: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    // في ما بعد، سنضيف هنا كود لحفظ الطلب في Firebase
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        favorites,
        addToFavorites,
        removeFromFavorites,
        orders,
        placeOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook سهل لاستخدام الـ Context في أي مكون
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside a UserProvider");
  return context;
};