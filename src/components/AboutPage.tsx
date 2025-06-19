import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

interface AuthPageProps {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const navigate = useNavigate();

  // الحقول الأساسية
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [resetMode, setResetMode] = useState(false);

  // عرض كلمة المرور
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  // OTP
  const [otpSent, setOtpSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState<string | null>(null);

  // تسجيل الدخول العادي
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (err: any) {
      const errorMessage =
        language === 'ar'
          ? 'فشل تسجيل الدخول. تأكد من البريد وكلمة المرور.'
          : 'Failed to sign in. Please check your email and password.';
      setError(errorMessage);
    }
  };

  // إنشاء حساب مع OTP
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

    if (!verificationId) {
      setError(language === 'ar' ? 'يجب إرسال رمز التحقق أولًا' : 'Verification code must be sent first');
      return;
    }

    if (!verificationCode) {
      setError(language === 'ar' ? 'يرجى إدخال رمز التحقق' : 'Please enter verification code');
      return;
    }

    try {
      // التحقق من الرمز
      const credential = auth.PhoneAuthProvider.credential(verificationId, verificationCode);

      // إنشاء المستخدم
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // تحديث الاسم
      await updateProfile(user, { displayName: name });

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

      // إرسال رسالة التأكيد
      await sendEmailVerification(auth.currentUser);

      // إعادة التوجيه
      alert(
        language === 'ar'
          ? 'تم التسجيل! تفقد بريدك الإلكتروني للتحقق منه.'
          : 'Registration successful! Please verify your email.'
      );
      navigate('/');
    } catch (err: any) {
      const errorMessage =
        err.message ||
        (language === 'ar'
          ? 'حدث خطأ أثناء التسجيل'
          : 'An error occurred during registration');
      setError(errorMessage);
    }
  };

  // إرسال رمز التحقق (OTP)
  const sendVerificationCode = async () => {
    if (!phone) {
      setError(language === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Please enter phone number');
      return;
    }

    try {
      // التأكد من وجود الحاوية
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (!recaptchaContainer) {
        throw new Error("reCAPTCHA container not found");
      }

      // إعداد reCAPTCHA
      const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        { size: 'invisible' },
        auth
      );

      // إرسال الرمز
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setVerificationId(confirmation.verificationId);
      setOtpSent(true);
      setError('');
    } catch (err: any) {
      console.error("OTP Error:", err);
      const errorMessage =
        err.message ||
        (language === 'ar'
          ? 'فشل في إرسال الرمز. تأكد من رقم الهاتف.'
          : 'Failed to send verification code. Please check the phone number.');
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

  // تدمير reCAPTCHA عند تغيير الصفحة
  useEffect(() => {
    return () => {
      const container = document.getElementById('recaptcha-container');
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* اختيار اللغة */}
        <div className="mb-4 flex justify-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 ${
              language === 'ar' ? 'font-bold text-orange-600 underline' : 'text-gray-600'
            }`}
          >
            عربي
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 ${
              language === 'en' ? 'font-bold text-orange-600 underline' : 'text-gray-600'
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
              <div className="flex">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={language === 'ar' ? '+971...' : '+971...'}
                  className="w-full px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={otpSent}
                />
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={sendVerificationCode}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r transition-colors"
                  >
                    {language === 'ar' ? 'إرسال الرمز' : 'Send Code'}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded-r cursor-not-allowed"
                    disabled
                  >
                    {language === 'ar' ? 'تم الإرسال' : 'Sent'}
                  </button>
                )}
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'ar' ? 'رمز التحقق (OTP)' : 'Verification Code'}
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="123456"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}

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

        {/* حاوية reCAPTCHA */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default AuthPage;