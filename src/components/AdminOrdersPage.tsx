import React, { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
} from 'firebase/firestore';
import { db, auth } from '../firebase'; // تأكد من أن لديك `auth` في ملف firebase.ts

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  timestamp: Date;
  status: string;
  orderNumber: number; // رقم الطلب
}

  const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);




  // جلب الطلبات من Firestore
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const ordersList = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
        })) as Order[];

        // إضافة اسم المستخدم والبريد الإلكتروني
        const updatedOrders = await Promise.all(
          ordersList.map(async order => {
            const userDetails = await getUserDetails(order.userId);
            return {
              ...order,
              userName: userDetails.name,
              userEmail: userDetails.email,
            };
          })
        );

        setOrders(updatedOrders);
        setLoading(false);
      } catch (error) {
        console.error("فشل في جلب الطلبات:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // دالة لجلب تفاصيل المستخدم
  const getUserDetails = async (userId: string): Promise<{ name: string; email: string }> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const data = userDoc.data();
        return {
          name: data.displayName || 'مستخدم جديد',
          email: data.email || 'غير محدد',
        };
      } else {
        return { name: 'غير محدد', email: 'غير محدد' };
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return { name: 'غير محدد', email: 'غير محدد' };
    }
  };

  // تحويل الحالة إلى نص عربي
  const statusLabel = (status: string): string => {
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

  // تحديث حالة الطلب
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });

      // تحديث واجهة المستخدم
      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      alert('✅ تم تحديث الحالة بنجاح');
    } catch (error) {
      console.error('❌ فشل في تحديث الحالة:', error);
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* زر العودة */}
        <div className="mb-4 flex justify-start">
          <a
            href="/admin"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            ← العودة إلى لوحة الأدمن
          </a>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">إدارة الطلبات</h1>

        {/* جدول الطلبات */}
        {loading ? (
          <p>جارٍ التحميل...</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">رقم الطلب</th>
                  <th className="px-4 py-2 text-left">المستخدم</th>
                  <th className="px-4 py-2 text-left">البريد الإلكتروني</th>
                  <th className="px-4 py-2 text-left">الأطباق</th>
                  <th className="px-4 py-2 text-left">التاريخ</th>
                  <th className="px-4 py-2 text-left">المجموع</th>
                  <th className="px-4 py-2 text-left">الحالة</th>
                  <th className="px-4 py-2 text-right">تعديل الحالة</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      لا يوجد طلبات بعد
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2">{order.orderNumber}</td>
                      <td className="border px-4 py-2">{order.userName}</td>
                      <td className="border px-4 py-2">{order.userEmail}</td>
                      <td className="border px-4 py-2">
                        {order.items.map((item, idx) => (
                          <div key={idx}>
                            {item.name} × {item.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="border px-4 py-2">
                        {order.timestamp.toLocaleString()}
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
                          {statusLabel(order.status)}
                        </span>
                      </td>
                      <td className="border px-4 py-2 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="border rounded px-3 py-1"
                        >
                          <option value="pending">قيد الانتظار</option>
                          <option value="preparing">جارٍ التجهيز</option>
                          <option value="delivering">في الطريق</option>
                          <option value="delivered">تم التسليم</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* زر العودة - أسفل الصفحة */}
        <div className="mt-6 flex justify-start">
          <a
            href="/admin"
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            ← العودة إلى لوحة الأدمن
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;