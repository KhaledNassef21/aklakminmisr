import React, { useState } from 'react';
import { Menu, X, Globe, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);

  const isAdmin = user?.email === 'nassefkhald@gmail.com';

  const menuItems = [
    { key: 'home', label: t('home') },
    { key: 'menu', label: t('menu') },
    { key: 'about', label: t('about') },
    { key: 'contact', label: t('contact') }
  ];

  const handleLogout = () => {
    auth.signOut();
    navigate('/home');
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-600 font-amiri">
                {language === 'ar' ? 'أكلك من مصر' : 'Your Food from Egypt'}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  to={`/${item.key}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === `/${item.key}`
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language Toggle & Account & Cart */}
            <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>

              {/* زر حساب المستخدم */}
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-orange-600 transition-colors group"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium group-hover:underline">
                      {t('myAccount')}
                    </span>
                  </Link>

                  {/* زر لوحة الإدارة */}
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-orange-600 transition-colors group"
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium group-hover:underline">
                        {t('adminPanel')}
                      </span>
                    </Link>
                  )}

                  {/* زر تسجيل الخروج */}
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-600 hover:underline"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-orange-600 transition-colors group"
                >
                  <span className="text-sm font-medium group-hover:underline">
                    {t('loginSignup')}
                  </span>
                </Link>
              )}

              {/* زر السلة */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={toggleLanguage}
                className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <Globe className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {menuItems.map((item) => (
                  <Link
                    key={item.key}
                    to={`/${item.key}`}
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      location.pathname === `/${item.key}`
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile: Profile / Admin Panel / Login/Logout */}
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    >
                      {t('myAccount')}
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                      >
                        {t('adminPanel')}
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    {t('loginSignup')}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cart Modal */}
        <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>
    </>
  );
};

export default Header;