import { Link } from 'react-router-dom';
import { Users, Briefcase, Gavel, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  { id: 1, name: 'Family Law', icon: Users, description: 'Insights on marriage, child arrangements, and family disputes.' },
  { id: 2, name: 'Corporate Law', icon: Briefcase, description: 'Navigating business contracts, compliance, and corporate structures.' },
  { id: 3, name: 'Criminal Defense', icon: Gavel, description: 'Understanding your rights, procedures, and legal defense.' },
  { id: 4, name: 'Civil Rights', icon: ShieldCheck, description: 'Protecting individual liberties and fighting discrimination.' },
];

const TopicsSection = () => {
  return (
    <section id="topics" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#800000] font-bold tracking-wider uppercase text-sm mb-3">Fields of Knowledge</h2>
          <h3 className="text-4xl font-serif font-bold text-[#0a192f] mb-6">Explore Legal Topics & Resources</h3>
          <p className="text-gray-600 text-lg">We organize our educational articles by practice area so you can easily find the specific knowledge you need. <span className="text-gray-500 text-sm italic">For informational purposes only — not legal advice.</span></p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => (
            <Link
              key={category.id}
              to={`/blog?category=${encodeURIComponent(category.name)}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer p-8 rounded-2xl border border-gray-100 hover:border-[#800000] hover:shadow-xl hover:shadow-[#fca580]/10 transition-all duration-300 bg-white h-full"
              >
                <div className="w-14 h-14 bg-gray-50 group-hover:bg-[#fca580]/10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <category.icon className="w-7 h-7 text-[#0a192f] group-hover:text-[#800000] transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-bold text-[#0a192f] mb-3">{category.name}</h4>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center text-[#800000] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Read Articles <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;