import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus, Search, Book, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext'; // ✅ استيراد UserContext
import { menuData, MenuItem } from '../data/menuData';
import RecipePage from './RecipePage';

const MenuPage: React.FC = () => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  // ⬇️ التمرير للأعلى يحدث هنا عند تغيير selectedRecipe
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedRecipe]);

  const categories = [
    { key: 'all', label: language === 'ar' ? 'الكل' : 'All' },
    { key: 'popular', label: t('popularDishes') },
    { key: 'bakery', label: t('bakery') },
    { key: 'desserts', label: t('desserts') },
    { key: 'beverages', label: t('beverages') }
  ];

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description[language].toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      language === 'ar' 
        ? 'مرحبًا، حابب أشوف المنيو وأطلب'
        : 'Hello, I would like to see the menu and place an order'
    );
    window.open(`https://wa.me/971524081002?text=${message}`, '_blank');
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (selectedRecipe) {
    return (
      <RecipePage 
        recipeId={selectedRecipe} 
        onBack={() => setSelectedRecipe(null)} 
      />
    );
  }

  // ⬇️ مكون زر المفضلة
  const FavoriteButton = ({ item }: { item: MenuItem }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useUser();
    const isFavorited = favorites.includes(item.id);

    const toggleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation(); // منع فتح الوصفة عند الضغط على الزر
      if (isFavorited) {
        removeFromFavorites(item.id);
      } else {
        addToFavorites(item.id);
      }
    };

    return (
      <button
        onClick={toggleFavorite}
        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
          isFavorited
            ? 'bg-red-100 hover:bg-red-200 text-red-600'
            : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`}
          viewBox="0 0 20 20"
          fill={isFavorited ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {isFavorited
            ? language === 'ar'
              ? 'إزالة من المفضلة'
              : 'Remove from Favorites'
            : language === 'ar'
            ? 'أضف للمفضلة'
            : 'Add to Favorites'}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-amiri">
            {language === 'ar' ? 'منيو أكلك من مصر' : 'Your Food from Egypt Menu'}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'اختار من مجموعة واسعة من الأكلات المصرية الأصلية'
              : 'Choose from a wide variety of authentic Egyptian dishes'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={language === 'ar' ? 'ابحث عن الأكلات...' : 'Search for dishes...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 rtl:pr-10 rtl:pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {language === 'ar' 
                ? `تم العثور على ${filteredMenu.length} نتيجة للبحث عن "${searchTerm}"`
                : `Found ${filteredMenu.length} results for "${searchTerm}"`
              }
            </p>
          </div>
        )}

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name[language]}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.name[language]}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {item.description[language]}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    {item.price} {t('aed')}
                  </span>
                  <button
                    onClick={() => setSelectedRecipe(item.id)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
                  >
                    <Book className="h-4 w-4" />
                    <span>{language === 'ar' ? 'الوصفة' : 'Recipe'}</span>
                  </button>
                </div>

                {/* ⬇️ زر المفضلة الجديد */}
                <FavoriteButton item={item} />

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse mt-3"
                >
                  <Plus className="h-5 w-5" />
                  <span>{t('addToCart')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </h3>
            <p className="text-gray-500">
              {language === 'ar' 
                ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة'
                : 'Try searching with different keywords or select a different category'
              }
            </p>
          </div>
        )}

        {/* Order Button */}
        <div className="text-center">
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 rtl:space-x-reverse mx-auto shadow-lg"
          >
            <MessageCircle className="h-7 w-7" />
            <span>{t('orderViaWhatsApp')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;