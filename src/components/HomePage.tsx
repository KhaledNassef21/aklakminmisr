import React from 'react';
import { Link } from 'react-router-dom'; // ⬅️ الاستيراد الجديد
import { Phone, MessageCircle, Star, Clock, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { language, t } = useLanguage();

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      language === 'ar' 
        ? 'مرحبًا، حابب أطلب من منيو أكلك من مصر'
        : 'Hello, I would like to order from Your Food from Egypt menu'
    );
    window.open(`https://wa.me/971524081002?text=${message}`, '_blank');
  };

  const featuredDishes = [
    {
      name: language === 'ar' ? 'كشري مصري' : 'Egyptian Koshari',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      price: language === 'ar' ? '25 درهم' : '25 AED'
    },
    {
      name: language === 'ar' ? 'ملوخية باللحمة' : 'Molokhia with Meat',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      price: language === 'ar' ? '35 درهم' : '35 AED'
    },
    {
      name: language === 'ar' ? 'فطير مشلتت' : 'Feteer Meshaltet',
      image: 'https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg',
      price: language === 'ar' ? '15 درهم' : '15 AED'
    },
    {
      name: language === 'ar' ? 'أم علي' : 'Om Ali',
      image: 'https://images.pexels.com/photos/5946965/pexels-photo-5946965.jpeg',
      price: language === 'ar' ? '20 درهم' : '20 AED'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-amiri">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleWhatsAppOrder}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 rtl:space-x-reverse shadow-lg"
              >
                <MessageCircle className="h-6 w-6" />
                <span>{t('orderNow')}</span>
              </button>

              {/* زر "عرض المنيو" بعد التعديل */}
              <Link
                to="/menu"
                className="bg-white text-orange-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
              >
                {t('viewMenu')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {language === 'ar' ? 'توصيل سريع' : 'Fast Delivery'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'نوصلك في أسرع وقت ممكن داخل أبوظبي'
                  : 'We deliver as fast as possible within Abu Dhabi'
                }
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <Star className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {language === 'ar' ? 'جودة عالية' : 'High Quality'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'مكونات طازة ووصفات أصلية من المطبخ المصري'
                  : 'Fresh ingredients and authentic recipes from Egyptian kitchen'
                }
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
              <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {language === 'ar' ? 'كل أبوظبي' : 'All Abu Dhabi'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'نوصل لكل المناطق داخل إمارة أبوظبي'
                  : 'We deliver to all areas within Abu Dhabi Emirate'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-amiri">
              {language === 'ar' ? 'أشهى الأكلات المصرية' : 'Most Delicious Egyptian Dishes'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'اكتشف مجموعة واسعة من الأكلات المصرية الأصلية المحضرة بحب ومهارة'
                : 'Discover a wide variety of authentic Egyptian dishes prepared with love and skill'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredDishes.map((dish, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{dish.name}</h3>
                  <p className="text-orange-600 font-bold">{dish.price}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            {/* زر آخر لـ "عرض المنيو" */}
            <Link
              to="/menu"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
            >
              {t('viewMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-amiri">
            {language === 'ar' ? 'جاهز تطلب؟' : 'Ready to Order?'}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تواصل معنا عبر واتساب وهنوصلك طلبك في أسرع وقت'
              : 'Contact us via WhatsApp and we will deliver your order as soon as possible'
            }
          </p>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 rtl:space-x-reverse mx-auto shadow-lg"
          >
            <MessageCircle className="h-7 w-7" />
            <span>
              {language === 'ar' ? 'اطلب دلوقتي عبر واتساب' : 'Order Now via WhatsApp'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;