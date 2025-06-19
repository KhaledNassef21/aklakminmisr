import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { menuData } from '../data/menuData';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
  status: string; // <-- العمود الجديد
}

const ProfilePage = () => {
  const { currentUser, favorites } = useUser();
  const { language, t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      try {
        const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
          status: doc.data().status || 'pending' // <-- جلب الحالة من Firestore
        })) as Order[];

        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'غير مسجل الدخول' : 'Not Logged In'}</h2>
          <p className="mb-6">{language === 'ar' ? 'يرجى تسجيل الدخول أولاً' : 'Please log in first'}</p>
          <button
            onClick={() => window.location.href = '/auth'}
            className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </div>
      </div>
    );
  }

  const favoriteItems = menuData.filter(item => favorites.includes(item.id));

  // تحويل الحالة إلى نص عربي
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'preparing':
        return 'جارٍ التجهيز';
      case 'delivering':
        return 'في الطريق';
      case 'delivered':
        return 'تم التسليم';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-2xl font-bold">
              {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{currentUser.displayName || t('guest')}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'ar' ? 'عضو منذ' : 'Member since'}{' '}
                {currentUser.metadata.creationTime}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => auth.signOut()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </button>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'المفضلة' : 'Favorites'}</h2>
          {favoriteItems.length === 0 ? (
            <p className="text-gray-500 italic">
              {language === 'ar' ? 'لا يوجد أطباق في المفضلة' : 'No dishes in favorites yet'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-gray-800">{item.name[language]}</h3>
                  <p className="text-sm text-gray-600">{item.description[language]}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Orders History */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">{language === 'ar' ? 'طلباتي' : 'My Orders'}</h2>
          {loading ? (
            <p>{language === 'ar' ? 'جارٍ التحميل...' : 'Loading orders...'}</p>
          ) : orders.length === 0 ? (
            <p className="text-gray-500 italic">
              {language === 'ar' ? 'لم يتم تقديم طلبات بعد' : 'No orders placed yet'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">{t('date')}</th>
                    <th className="px-4 py-2 text-left">{t('dish')}</th>
                    <th className="px-4 py-2 text-left">{t('quantity')}</th>
                    <th className="px-4 py-2 text-left">{t('price')}</th>
                    <th className="px-4 py-2 text-left">{t('total')}</th>
                    <th className="px-4 py-2 text-left">{t('status')}</th> {/* العمود الجديد */}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {order.timestamp.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                      </td>
                      <td className="border px-4 py-2">
                        {order.items?.map((item, idx) => (
                          <div key={idx}>
                            <strong>{item.name}</strong> - {item.quantity} x {item.price} AED
                          </div>
                        ))}
                      </td>
                      <td className="border px-4 py-2">
                        {order.items?.reduce((total, item) => total + item.quantity, 0)}
                      </td>
                      <td className="border px-4 py-2">
                        {order.items?.reduce((total, item) => total + item.quantity * item.price, 0)} AED
                      </td>
                      <td className="border px-4 py-2">{order.total} AED</td>
                      <td className="border px-4 py-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-white ${
                            order.status === 'pending'
                              ? 'bg-yellow-500'
                              : order.status === 'preparing'
                              ? 'bg-blue-500'
                              : order.status === 'delivering'
                              ? 'bg-indigo-500'
                              : order.status === 'delivered'
                              ? 'bg-green-500'
                              : 'bg-gray-500'
                          }`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {orders.length > 0 && (
            <p className="mt-4 font-bold text-gray-800">
              {language === 'ar' ? 'المجموع الكلي للطلبات:' : 'Total Orders Amount:'}
              {orders.reduce((total, order) => total + order.total, 0)} AED
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;