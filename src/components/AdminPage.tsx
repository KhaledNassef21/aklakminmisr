import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// أنواع البيانات
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
}

interface User {
  uid: string;
  email: string;
  displayName: string | null;
  createdAt: Date;
}

const AdminPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [topDishes, setTopDishes] = useState<{ dishName: string; count: number }[]>([]);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [ordersPerHour, setOrdersPerHour] = useState<{ hour: string; count: number }[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]); // ✅ قائمة المستخدمين
  const [loadingUsers, setLoadingUsers] = useState(true);

  if (!user || user.email !== 'nassefkhald@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-4">غير مصرح لك بالوصول</h2>
          <p>هذا الموقع محمي، فقط المشرف يمكنه الوصول إليه.</p>
        </div>
      </div>
    );
  }

  // جلب البيانات
  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ جلب عدد المستخدمين والمستخدمين
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            uid: doc.id,
            email: data.email || "غير متوفر",
            displayName: data.displayName || "مستخدم جديد",
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date()
          };
        }) as User[];

        setUsersList(usersData);
        setTotalUsers(usersData.length);
        setLoadingUsers(false);

        // ✅ جلب الطلبات
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const allOrders = ordersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            items: data.items || [],
            total: data.total || 0,
            timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
          };
        }) as Order[];

        setTotalOrders(allOrders.length);
        setTotalSales(allOrders.reduce((sum, order) => sum + order.total, 0));

        // ✅ أكثر الأطباق طلبًا
        const dishCount: Record<string, number> = {};
        allOrders.forEach(order => {
          if (order.items && Array.isArray(order.items)) {
            order.items.forEach(item => {
              if (item && item.name && typeof item.quantity === 'number') {
                dishCount[item.name] = (dishCount[item.name] || 0) + item.quantity;
              }
            });
          }
        });

        const topDishesList = Object.entries(dishCount)
          .map(([name, count]) => ({ dishName: name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        setTopDishes(topDishesList);

        // ✅ أوقات الطلب (بالساعة)
        const hourlyCount: Record<string, number> = {};
        allOrders.forEach(order => {
          const hour = order.timestamp.getHours();
          hourlyCount[hour] = (hourlyCount[hour] || 0) + 1;
        });

        const hourlyData = Object.entries(hourlyCount)
          .map(([hour, count]) => ({ hour: `${hour}:00`, count }))
          .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

        setOrdersPerHour(hourlyData);

      } catch (error) {
        console.error("فشل في جلب البيانات:", error);
      }
    };

    fetchData();
  }, []);

  // حذف مستخدم مع رسالة تأكيد
  const handleDeleteUser = async (uid: string) => {
    const confirmMessage = "هل أنت متأكد من حذف هذا المستخدم؟";
    if (!window.confirm(confirmMessage)) return;

    try {
      // ✅ حذف المستخدم من Firestore
      await deleteDoc(doc(db, 'users', uid));

      // ✅ (اختياري) حذف الطلبات المرتبطة به
      const ordersQuery = query(collection(db, 'orders'), where('userId', '==', uid));
      const ordersSnapshot = await getDocs(ordersQuery);
      const batch = db.batch();

      ordersSnapshot.forEach(doc => {
        batch.delete(doc.ref);
      });

      await batch.commit();

      // تحديث القائمة بعد الحذف
      setUsersList(usersList.filter(u => u.uid !== uid));

      alert("تم حذف المستخدم بنجاح");
    } catch (error) {
      console.error("فشل في حذف المستخدم:", error);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">لوحة تحكم الإدارة</h1>
<div className="text-center mb-6">
  <a 
    href="/admin/orders" 
    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
  >
    إدارة الطلبات
  </a>
</div>

        {/* Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">عدد المستخدمين</h2>
            <p className="text-3xl font-bold text-orange-600">{totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">عدد الطلبات</h2>
            <p className="text-3xl font-bold text-green-600">{totalOrders}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">إجمالي المبيعات</h2>
            <p className="text-3xl font-bold text-blue-600">{totalSales} AED</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">متوسط قيمة الطلب</h2>
            <p className="text-3xl font-bold text-purple-600">
              {totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0} AED
            </p>
          </div>
        </div>

        {/* عرض المستخدمين */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto mb-8">
          <h2 className="text-xl font-bold mb-4">قائمة المستخدمين</h2>
          {loadingUsers ? (
            <p>جارٍ التحميل...</p>
          ) : usersList.length === 0 ? (
            <p className="italic text-gray-500">لا يوجد مستخدمين بعد</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">البريد الإلكتروني</th>
                  <th className="px-4 py-2 text-left">الاسم</th>
                  <th className="px-4 py-2 text-left">تاريخ الإنشاء</th>
                  <th className="px-4 py-2 text-right">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.displayName || 'غير محدد'}</td>
                    <td className="border px-4 py-2">
                      {user.createdAt.toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.uid)}
                        className="text-red-600 hover:text-red-900"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Top Dishes & Orders Per Hour */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* أكثر الأطباق طلبًا */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">أكثر الأطباق طلبًا</h2>
            <ul className="space-y-3">
              {topDishes.length > 0 ? (
                topDishes.map((dish, index) => (
                  <li key={index} className="flex justify-between border-b pb-2">
                    <span>{dish.dishName}</span>
                    <span className="font-semibold">{dish.count} مرة</span>
                  </li>
                ))
              ) : (
                <p>لا يوجد بيانات بعد</p>
              )}
            </ul>
          </div>

          {/* أوقات الطلب */
          /* يمكنك لاحقًا استخدام Chart.js */
          }
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">أوقات تقديم الطلبات</h2>
            <ul className="space-y-3">
              {ordersPerHour.length > 0 ? (
                ordersPerHour.map((item, index) => (
                  <li key={index} className="flex justify-between border-b pb-2">
                    <span>{item.hour}</span>
                    <span className="font-semibold">{item.count} طلب</span>
                  </li>
                ))
              ) : (
                <p>لا يوجد بيانات بعد</p>
              )}
            </ul>
          </div>
        </div>

        {/* Raw Data Table (اختياري) */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">جميع الطلبات</h2>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">الوقت</th>
                <th className="px-4 py-2 text-left">الأطباق</th>
                <th className="px-4 py-2 text-right">المجموع</th>
              </tr>
            </thead>
            <tbody>
              {ordersPerHour.length > 0 &&
                Array.from({ length: 24 }).map((_, hour) => {
                  const orderInHour = ordersPerHour.find(o => o.hour === `${hour}:00`);
                  return (
                    <tr key={hour}>
                      <td className="border px-4 py-2">{hour}:00</td>
                      <td className="border px-4 py-2">
                        {orderInHour ? `${orderInHour.count} طلب` : "لا يوجد"}
                      </td>
                      <td className="border px-4 py-2"></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;