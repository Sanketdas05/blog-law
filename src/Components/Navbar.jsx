import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isAuthor, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const scrollToTopics = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('topics');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('topics');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className=" p-2 rounded-lg">
              <img src="/logo.png" alt="LexBlog Logo" className="w-30 h-30  object-" />
            </div>
            <span className="font-serif font-bold text-2xl text-[#0a192f]">The Law Explained</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#0a192f] font-medium transition-colors">Home</Link>
            <button onClick={scrollToTopics} className="text-gray-600 hover:text-[#0a192f] font-medium transition-colors">Topics</button>
            <Link to="/blog" className="text-gray-600 hover:text-[#0a192f] font-medium transition-colors">Articles</Link>
            <Link to="/disclaimer" className="text-gray-600 hover:text-[#0a192f] font-medium transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => navigate('/blog')} className="p-2 text-gray-400 hover:text-[#0a192f] transition-colors" title="Search articles">
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated && isAuthor ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/admin/editor')}
                  className="bg-[#0a192f] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#112a4a] transition-colors"
                >
                  Write Article
                </motion.button>
                <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#0a192f] to-[#112a4a] flex items-center justify-center text-white font-bold text-xs">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-[#0a192f] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#112a4a] transition-colors"
              >
                Author Login
              </motion.button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-4 shadow-lg">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#fca580] hover:bg-gray-50 rounded-md">Home</Link>
              <button onClick={() => { scrollToTopics(); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#fca580] hover:bg-gray-50 rounded-md">Topics</button>
              <Link to="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#fca580] hover:bg-gray-50 rounded-md">Articles</Link>
              <Link to="/disclaimer" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#fca580] hover:bg-gray-50 rounded-md">About</Link>
              <button onClick={() => { navigate('/blog'); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-base font-medium text-[#0a192f] bg-gray-50 rounded-md flex items-center gap-2">
                <Search className="w-4 h-4" /> Search
              </button>

              {isAuthenticated && isAuthor ? (
                <>
                  <button
                    onClick={() => { navigate('/admin/editor'); setIsOpen(false); }}
                    className="w-full mt-4 bg-[#0a192f] text-white px-6 py-3 rounded-md font-medium"
                  >
                    Write Article
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 text-red-500 font-medium py-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="w-full mt-4 bg-[#0a192f] text-white px-6 py-3 rounded-md font-medium"
                >
                  Author Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;