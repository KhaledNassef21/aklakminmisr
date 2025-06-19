import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `${language === 'ar' ? 'مرحبًا، أنا' : 'Hello, I am'} ${formData.name}\n${language === 'ar' ? 'رقم الموبايل:' : 'Phone number:'} ${formData.phone}\n\n${formData.message}`
    );
    window.open(`https://wa.me/971524081002?text=${message}`, '_blank');
  };

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      language === 'ar' 
        ? 'مرحبًا، حابب أطلب من منيو أكلك من مصر'
        : 'Hello, I would like to order from Your Food from Egypt menu'
    );
    window.open(`https://wa.me/971524081002?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-amiri">
            {t('contactTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'تواصل معنا بأي وقت عشان نوصلك أشهى الأكلات المصرية'
              : 'Contact us anytime to get the most delicious Egyptian dishes delivered'
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Order */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <MessageCircle className="h-6 w-6 ml-2" />
                {language === 'ar' ? 'اطلب دلوقتي عبر واتساب' : 'Order Now via WhatsApp'}
              </h3>
              <p className="text-green-700 mb-4">
                {language === 'ar' 
                  ? 'الطريقة الأسرع والأسهل للطلب - كلمنا على واتساب مباشرة'
                  : 'The fastest and easiest way to order - contact us directly on WhatsApp'
                }
              </p>
              <button
                onClick={handleWhatsAppOrder}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 rtl:space-x-reverse"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp: +971524081002</span>
              </button>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === 'ar' ? 'رقم الموبايل' : 'Phone Number'}
                    </p>
                    <p className="text-gray-600" dir="ltr">+971 52 408 1002</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </p>
                    <p className="text-gray-600">info@aklakmenmasr.ae</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === 'ar' ? 'منطقة الخدمة' : 'Service Area'}
                    </p>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'جميع مناطق أبوظبي' : 'All areas of Abu Dhabi'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                    </p>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'يوميًا من 10 صباحًا - 11 مساءً' : 'Daily 10 AM - 11 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-orange-800 mb-4">
                {language === 'ar' ? 'معلومات الخدمة' : 'Service Information'}
              </h3>
              <div className="space-y-2 text-orange-700">
                <p>• {t('deliveryOnly')}</p>
                <p>• {t('abuDhabiOnly')}</p>
                <p>• {language === 'ar' ? 'توصيل مجاني للطلبات أكتر من 50 درهم' : 'Free delivery for orders over 50 AED'}</p>
                <p>• {language === 'ar' ? 'الدفع كاش عند الاستلام' : 'Cash payment on delivery'}</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {language === 'ar' ? 'ابعتلنا رسالة' : 'Send us a Message'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={language === 'ar' ? 'اكتب اسمك' : 'Enter your name'}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'رقم الموبايل' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={language === 'ar' ? 'رقم الموبايل' : 'Phone number'}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'ar' ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 rtl:space-x-reverse"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{language === 'ar' ? 'ابعت عبر واتساب' : 'Send via WhatsApp'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;