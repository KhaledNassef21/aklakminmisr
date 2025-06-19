import React from 'react';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      language === 'ar' 
        ? 'مرحبًا، عايز أعرف معلومات أكتر عن أكلك من مصر'
        : 'Hello, I would like to know more information about Your Food from Egypt'
    );
    window.open(`https://wa.me/971524081002?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-amiri text-orange-400">
              {language === 'ar' ? 'أكلك من مصر' : 'Your Food from Egypt'}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {language === 'ar' 
                ? 'أشهى الأكلات المصرية الأصلية توصلك لحد باب بيتك في أبوظبي. طبخ بيتي وجودة عالية بوصفات من قلب المطبخ المصري.'
                : 'The most delicious authentic Egyptian dishes delivered to your doorstep in Abu Dhabi. Home cooking and high quality with recipes from the heart of Egyptian kitchen.'
              }
            </p>
            <button
              onClick={handleWhatsAppContact}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 rtl:space-x-reverse"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{language === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
            </button>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">
              {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300" dir="ltr">+971 52 408 1002</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">
                  {language === 'ar' ? 'جميع مناطق أبوظبي' : 'All areas of Abu Dhabi'}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="text-gray-300">
                  {language === 'ar' ? 'يوميًا 10ص - 11م' : 'Daily 10AM - 11PM'}
                </span>
              </div>
            </div>
          </div>

          {/* Service Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-400">
              {language === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <div className="space-y-2 text-gray-300">
              <p>• {t('deliveryOnly')}</p>
              <p>• {t('abuDhabiOnly')}</p>
              <p>• {language === 'ar' ? 'توصيل مجاني للطلبات أكتر من 50 درهم' : 'Free delivery for orders over 50 AED'}</p>
              <p>• {language === 'ar' ? 'الدفع كاش عند الاستلام' : 'Cash payment on delivery'}</p>
              <p>• {language === 'ar' ? 'أكلات مصرية أصلية 100%' : '100% authentic Egyptian dishes'}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {language === 'ar' 
              ? '© 2024 أكلك من مصر. جميع الحقوق محفوظة. صُنع بحب للجالية المصرية في أبوظبي ❤️'
              : '© 2024 Your Food from Egypt. All rights reserved. Made with love for the Egyptian community in Abu Dhabi ❤️'
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;