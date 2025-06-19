import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext'; // ✅ من UserContext
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCart();
  const { language, t } = useLanguage();
  const { currentUser } = useUser(); // ✅ حالة المستخدم من UserContext

  const [showPassword, setShowPassword] = useState(false); // عرض كلمة المرور (غير مستخدم هنا لكن ممكن يُستخدم في صفحات أخرى)

  if (!isOpen) return null;

  const handleWhatsAppOrder = async () => {
    if (cart.length === 0) return;

    let message = 'مرحبًا، حابب أطلب:\n\n';
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name.ar} - الكمية: ${item.quantity} - ${item.price * item.quantity} درهم\n`;
    });
    message += `\nالمجموع الكلي: ${getTotalPrice()} درهم`;

    const encodedMessage = encodeURIComponent(message);

    try {
      // ✅ حفظ الطلب في Firebase
      if (currentUser) {
        const ordersRef = collection(db, 'orders');
        await addDoc(ordersRef, {
          userId: currentUser.uid,
          items: cart.map(item => ({
            id: item.id,
            name: item.name.ar,
            quantity: item.quantity,
            price: item.price
          })),
          total: getTotalPrice(),
          timestamp: new Date()
        });

        clearCart();
        onClose();

        window.open(`https://wa.me/971524081002?text=${encodedMessage}`, '_blank');
      }
    } catch (error) {
      console.error("Error saving order to Firebase:", error);
      alert(language === 'ar'
        ? 'فشل في حفظ الطلب. يرجى المحاولة مرة أخرى.'
        : 'Failed to save order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2 rtl:space-x-reverse">
            <ShoppingCart className="h-6 w-6 text-orange-600" />
            <span>{t('cart')}</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items with Scroll */}
        <div className="max-h-[400px] overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">{t('emptyCart')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name[language]}</h3>
                    <p className="text-orange-600 font-bold">{item.price} {t('aed')}</p>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>{t('total')}:</span>
              <span className="text-orange-600">{getTotalPrice()} {t('aed')}</span>
            </div>
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                onClick={clearCart}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {t('clearCart')}
              </button>
              <button
                onClick={() => {
                  if (!currentUser) {
                    alert(language === 'ar'
                      ? 'يجب تسجيل الدخول أولًا لإتمام الطلب'
                      : 'You need to log in first to place an order');
                    return;
                  }
                  handleWhatsAppOrder();
                }}
                className={`flex-1 ${
                  !currentUser ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                } text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 rtl:space-x-reverse`}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('orderViaWhatsApp')}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;