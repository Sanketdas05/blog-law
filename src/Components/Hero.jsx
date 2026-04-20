import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  const scrollToTopics = () => {
    const el = document.getElementById('topics');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#topics');
    }
  };

  return (
    <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-10"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#fca580]/20 text-[#800000] font-semibold text-sm mb-6">
              Legal Knowledge For Everyone
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0a192f] leading-tight mb-6">
              We translate the law <br/>
              <span className="text-[#800000]">so you don't have to.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Democratizing legal knowledge through educational articles, practical guides, and community insights. Understand and learn how the law works — for informational purposes only.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0a192f] text-white px-8 py-4 rounded-full font-medium hover:bg-[#112a4a] transition-colors flex items-center gap-2 shadow-xl shadow-[#0a192f]/20"
                onClick={() => navigate('/blog')}
              >
                Start Reading <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#0a192f] border border-gray-200 px-8 py-4 rounded-full font-medium hover:bg-gray-50 transition-colors"
                onClick={scrollToTopics}
              >
                Browse Topics
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image/Design Element */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-125 hidden md:block"
          >
            {/* Background decorative shape mimicking the dribbble shot's tilted aesthetic */}
            <div className="absolute top-0 right-0 w-[120%] h-full  rounded-l-[100px] -rotate-3 transform origin-right overflow-hidden shadow-2xl">
              <img 
                src="/hammer.png" 
                alt="Law Gavel" 
                className="w-full h-full object-cover mix-blend-overlay  scale-110"
              />
            </div>
            
            {/* Floating Card */}
         
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;