import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [resetMode, setResetMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // تسجيل الدخول
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // تحديث آخر وقت دخول
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { lastLoginAt: new Date() }, { merge: true });
      }

      navigate('/profile');
    } catch (err: any) {
      const errorMessage =
        language === 'ar'
          ? 'فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.'
          : 'Failed to sign in. Please check your email and password.';
      setError(errorMessage);
    }
  };

  // إنشاء حساب جديد
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError(language === 'ar' ? 'كلمة المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // تحديث الاسم
      await updateProfile(user, {
        displayName: name,
      });

      // حفظ بيانات المستخدم في Firestore
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: name,
        phoneNumber: phone,
        createdAt: new Date(),
        lastLoginAt: new Date()
      });

      // ✅ إرسال رسالة تأكيد البريد الإلكتروني
      await sendEmailVerification(auth.currentUser);

      // ✅ رسالة للمستخدم واعادة التوجيه
      alert(
        language === 'ar'
          ? 'تم التسجيل! تفقد بريدك الإلكتروني للتحقق منه.'
          : 'Registration successful! Please verify your email.'
      );
      navigate('/'); // ⬅️ إعادة التوجيه إلى الصفحة الرئيسية

    } catch (err: any) {
      const errorMessage =
        err.message ||
        (language === 'ar'
          ? 'حدث خطأ أثناء التسجيل'
          : 'An error occurred during registration');
      setError(errorMessage);
    }
  };

  // إعادة تعيين كلمة المرور
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        language === 'ar'
          ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.'
          : 'Password reset link has been sent to your email.'
      );
      setResetMode(false);
    } catch (err: any) {
      const errorMessage =
        language === 'ar'
          ? 'فشل في إرسال الرابط. تأكد من البريد الإلكتروني.'
          : 'Failed to send reset link. Please check the email address.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* اختيار اللغة */}
        <div className="mb-4 flex justify-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 ${
              language === 'ar'
                ? 'font-bold text-orange-600 underline'
                : 'text-gray-600'
            }`}
          >
            عربي
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 ${
              language === 'en'
                ? 'font-bold text-orange-600 underline'
                : 'text-gray-600'
            }`}
          >
            English
          </button>
        </div>

        {/* وضع إعادة تعيين كلمة المرور */}
        {resetMode ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    language === 'ar' ? 'example@example.com' : 'example@example.com'
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors"
              >
                {language === 'ar' ? 'إرسال الرابط' : 'Send Link'}
              </button>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setResetMode(false)}
                  className="text-orange-600 hover:underline"
                >
                  {language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to Sign In'}
                </button>
              </div>
            </form>
          </>
        ) : isLogin ? (
          /* نموذج تسجيل الدخول */
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">
              {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    language === 'ar' ? 'example@example.com' : 'example@example.com'
                  }
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-8 right-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {showPassword ? 'إخفاء' : 'عرض'}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded transition-colors"
              >
                {language === 'ar' ? 'دخول' : 'Sign In'}
              </button>

              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-orange-600 hover:underline"
                >
                  {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                </button>
                <button
                  type="button"
                  onClick={() => setResetMode(true)}
                  className="text-blue-600 hover:underline"
                >
                  {language === 'ar' ? 'هل نسيت كلمة المرور؟' : 'Forgot Password?'}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* نموذج إنشاء الحساب */
          <form onSubmit={handleSignUp} className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {language === 'ar' ? 'إنشاء حساب جديد' : 'Create New Account'}
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={language === 'ar' ? '+971...' : '+971...'}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                className="absolute inset-y-8 right-3 flex items-center text-sm leading-5 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {showRegisterPassword ? 'إخفاء' : 'عرض'}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700">
                {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
              </label>
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
              />
              <button
                type="button"
                disabled
                className="absolute inset-y-8 right-3 flex items-center text-sm leading-5 text-gray-400 cursor-not-allowed"
              >
                {showRegisterPassword ? 'إخفاء' : 'عرض'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
            >
              {language === 'ar' ? 'إنشاء الحساب' : 'Create Account'}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-orange-600 hover:underline"
              >
                {language === 'ar' ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign In'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;