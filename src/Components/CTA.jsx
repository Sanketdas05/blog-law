import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a192f]"></div>
      {/* Decorative background shape */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#fca580] rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Ready to expand your legal knowledge?
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Join our community of legal educators and writers. Learn, grow, and share knowledge to help others understand how the law works. <span className="text-gray-400 text-sm block mt-2">All content is for informational purposes only.</span>
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#c62525] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#0a192f] transition-colors shadow-lg"
          onClick={() => navigate('/blog')}
        >
          Start Reading Today
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection;