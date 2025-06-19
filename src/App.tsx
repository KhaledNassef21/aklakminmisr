import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import AuthPage from './components/AuthPage';
import AdminPage from './components/AdminPage';
import ProfilePage from './components/ProfilePage';
import AdminOrdersPage from './components/AdminOrdersPage'; // ✅ استيراد صفحة إدارة الطلبات

// Contexts
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop'; // ⬅️ مكون لتحديث الصفحة عند التنقل
import ScrollToTopButton from './components/ScrollToTopButton'; // الزر الصغير اللي يظهر بعد التمرير لأسفل

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <>
            <Header />

            {/* ⬇️ هذا المكون بيبدأ الصفحة من الأعلى */}
            <ScrollToTop /> 

            {/* ⬇️ وهذا الزر الصغير اللي يظهر بعد التمرير لأسفل */}
            <ScrollToTopButton /> 

            <main className="flex-grow">
              <Routes>
                {/* تحويل تلقائي من / إلى /home */}
                <Route path="/" element={<Navigate to="/home" replace />} />

                {/* المسارات العادية */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} /> {/* ✅ صفحة إدارة الطلبات */}

                {/* صفحة 404 - اختياري */}
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
            </main>

            <Footer />
          </>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;