import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    menu: 'المنيو',
    about: 'عنّا',
    contact: 'تواصل معنا',
    
    // Home Page
    heroTitle: 'أكلك من مصر',
    heroSubtitle: 'كل الأكلات اللي بتحبها... توصلك لحد باب بيتك في أبوظبي',
    orderNow: 'اطلب دلوقتي',
    viewMenu: 'شوف المنيو',
    
    // Menu Categories
    popularDishes: 'الأكلات الشعبية المصرية',
    bakery: 'المخبوزات والفطير',
    desserts: 'الحلويات الشرقية',
    beverages: 'المشروبات',
    
    // Cart
    cart: 'السلة',
    addToCart: 'أضف للسلة',
    emptyCart: 'السلة فارغة',
    total: 'المجموع',
    clearCart: 'إفراغ السلة',
    orderViaWhatsApp: 'اطلب عبر واتساب',
    
    // Common
    price: 'السعر',
    aed: 'درهم',
    whatsappOrder: 'اطلب عبر واتساب',
    
    // About
    aboutTitle: 'عن أكلك من مصر',
    aboutDescription: 'أكلك من مصر هو مشروع منزلي يوفر أكلات مصرية أصلية للمصريين المقيمين في أبوظبي. طبخ بيتي، جودة عالية، وصفات من قلب المطبخ المصري باستخدام مكونات طازة، والتوصيل سريع يوميًا داخل أبوظبي.',
    
    // Contact
    contactTitle: 'تواصل معنا',
    delivery: 'توصيل يومي لأبوظبي',
    nobranchs: 'بدون فروع - يتم الطلب عبر الموقع أو واتساب',
    
    // Footer
    deliveryOnly: 'خدمة التوصيل المنزلي فقط',
    abuDhabiOnly: 'نوصل لكل أنحاء أبوظبي'
  },
  en: {
    // Navigation
    home: 'Home',
    menu: 'Menu',
    about: 'About Us',
    contact: 'Contact',
    
    // Home Page
    heroTitle: 'Your Food from Egypt',
    heroSubtitle: 'All your favorite Egyptian dishes delivered right to your door in Abu Dhabi',
    orderNow: 'Order Now',
    viewMenu: 'View Menu',
    
    // Menu Categories
    popularDishes: 'Popular Egyptian Dishes',
    bakery: 'Bakery & Feteer',
    desserts: 'Oriental Desserts',
    beverages: 'Beverages',
    
    // Cart
    cart: 'Cart',
    addToCart: 'Add to Cart',
    emptyCart: 'Cart is empty',
    total: 'Total',
    clearCart: 'Clear Cart',
    orderViaWhatsApp: 'Order via WhatsApp',
    
    // Common
    price: 'Price',
    aed: 'AED',
    whatsappOrder: 'Order via WhatsApp',
    
    // About
    aboutTitle: 'About Your Food from Egypt',
    aboutDescription: 'Your Food from Egypt is a home-based project providing authentic Egyptian cuisine to Egyptians living in Abu Dhabi. Home-style cooking, high quality, recipes from the heart of Egyptian kitchen using fresh ingredients, with fast daily delivery throughout Abu Dhabi.',
    
    // Contact
    contactTitle: 'Contact Us',
    delivery: 'Daily delivery to Abu Dhabi',
    nobranchs: 'No branches - order via website or WhatsApp',
    
    // Footer
    deliveryOnly: 'Home delivery service only',
    abuDhabiOnly: 'We deliver throughout Abu Dhabi'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    // Set initial language attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    
    // Update page title based on language
    const title = newLang === 'ar' 
      ? 'أكلك من مصر - الأكلات المصرية الأصلية في أبوظبي'
      : 'Your Food from Egypt - Authentic Egyptian Cuisine in Abu Dhabi';
    document.title = title;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};