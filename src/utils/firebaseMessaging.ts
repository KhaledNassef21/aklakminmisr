import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// تأكد من أن لديك هذه البيانات في firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyDqs-NtW6-C5ARRbDgEt6Zh6Hd2CKp4_Mc",
  authDomain: "aklak-men-misr-admin.firebaseapp.com",
  projectId: "aklak-men-misr-admin",
  storageBucket: "aklak-men-misr-admin.firebasestorage.app",
  messagingSenderId: "969812864428",
  appId: "1:969812864428:web:539d5ad89c633718fa9e09",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('تم رفض إذن الإشعارات');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY_HERE' // ← ستحتاج هذا لاحقًا
    });

    return token; // هذا هو device token
  } catch (error) {
    console.error('حدث خطأ أثناء الحصول على التوكن:', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });