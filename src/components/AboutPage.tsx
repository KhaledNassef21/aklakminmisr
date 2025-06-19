import React from 'react';
import { Heart, Clock, MapPin, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AboutPage: React.FC = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: Heart,
      title: language === 'ar' ? 'طبخ بيتي أصلي' : 'Authentic Home Cooking',
      description: language === 'ar' 
        ? 'كل أكلاتنا متحضرة بحب وعناية في مطبخ بيتي بالوصفات الأصلية'
        : 'All our dishes are prepared with love and care in a home kitchen with authentic recipes'
    },
    {
      icon: Clock,
      title: language === 'ar' ? 'توصيل سريع' : 'Fast Delivery',
      description: language === 'ar' 
        ? 'نوصلك طلبك في أسرع وقت ممكن عشان توصلك سخنة ولذيذة'
        : 'We deliver your order as fast as possible so it arrives hot and delicious'
    },
    {
      icon: MapPin,
      title: language === 'ar' ? 'خدمة أبوظبي' : 'Abu Dhabi Service',
      description: language === 'ar' 
        ? 'نوصل لكل المناطق داخل إمارة أبوظبي بدون استثناء'
        : 'We deliver to all areas within Abu Dhabi Emirate without exception'
    },
    {
      icon: Users,
      title: language === 'ar' ? 'للجالية المصرية' : 'For Egyptian Community',
      description: language === 'ar' 
        ? 'متخصصين في تقديم الأكل المصري الأصلي للمصريين بالإمارات'
        : 'Specialized in providing authentic Egyptian food for Egyptians in the UAE'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-amiri">
            {t('aboutTitle')}
          </h1>
          <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                alt="Egyptian Food"
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-amiri">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('aboutDescription')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <Heart className="h-6 w-6 text-orange-600 ml-3" />
                  <span>
                    {language === 'ar' 
                      ? 'مكونات طازة وعالية الجودة'
                      : 'Fresh and high-quality ingredients'
                    }
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-6 w-6 text-orange-600 ml-3" />
                  <span>
                    {language === 'ar' 
                      ? 'طبخ يومي ومتجدد'
                      : 'Daily fresh cooking'
                    }
                  </span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-6 w-6 text-orange-600 ml-3" />
                  <span>
                    {language === 'ar' 
                      ? 'توصيل لكل أنحاء أبوظبي'
                      : 'Delivery throughout Abu Dhabi'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0">
                  <feature.icon className="h-10 w-10 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-8 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-amiri">
            {language === 'ar' ? 'رسالتنا' : 'Our Mission'}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            {language === 'ar' 
              ? 'هدفنا إننا نجيب لك طعم البيت المصري الأصلي وانت في بيتك بأبوظبي. عايزين كل مصري بره بلده يحس إنه في البيت لما يأكل أكلنا.'
              : 'Our goal is to bring you the authentic taste of Egyptian home cooking while you are in your home in Abu Dhabi. We want every Egyptian abroad to feel at home when they eat our food.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;