import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

interface RegisterPageProps {
  setMode?: (mode: boolean) => void;
  currentLanguage: string;
  setIsLogin: (mode: boolean) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  setMode,
  currentLanguage,
  setIsLogin
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // التحقق من ملء جميع الحقول
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    // التحقق من توافق كلمات المرور
    if (password !== confirmPassword) {
      setError(currentLanguage === 'ar' ? 'كلمة المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    try {
      // إنشاء الحساب في Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // تحديث الاسم للمستخدم
      await updateProfile(user, {
        displayName: name,
        photoURL: '' // يمكنك لاحقًا استخدام صورة افتراضية أو رفع صورة من المستخدم
      });

      // حفظ بيانات المستخدم في Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: name,
        phoneNumber: phone,
        createdAt: new Date(),
        lastLoginAt: null
      });

      // إعادة توجيه المستخدم إلى الصفحة الشخصية
      navigate('/profile');

    } catch (err: any) {
      const errorMessage =
        err.message ||
        (currentLanguage === 'ar'
          ? 'حدث خطأ أثناء التسجيل'
          : 'An error occurred during registration');
      setError(errorMessage);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {currentLanguage === 'ar' ? 'إنشاء حساب' : 'Create Account'}
      </h2>

      {/* رسالة الخطأ */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      {/* نموذج التسجيل */}
      <form onSubmit={handleSignUp} className="space-y-4">
        {/* الاسم */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'الاسم الكامل' : 'Full Name'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={currentLanguage === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* رقم الهاتف */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={currentLanguage === 'ar' ? '+971...' : '+971...'}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* كلمة المرور */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'كلمة المرور' : 'Password'}
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* تأكيد كلمة المرور */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {currentLanguage === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* زر الإرسال */}
        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors"
        >
          {currentLanguage === 'ar' ? 'إنشاء الحساب' : 'Create Account'}
        </button>
      </form>

      {/* رابط تسجيل الدخول إذا كان لديه حساب بالفعل */}
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsLogin(true)}
          className="text-orange-600 hover:underline"
        >
          {currentLanguage === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;