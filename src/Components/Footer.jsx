import { Link } from 'react-router-dom';
import { Scale } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050d1a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Scale className="text-[#800000] w-8 h-8" />
              <span className="font-serif font-bold text-2xl">TheLawExplained</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We make legal concepts accessible through clear, educational content — helping you understand how the law works.
            </p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] hover:text-[#0a192f] cursor-pointer transition-all">
                <span className="font-bold text-sm">in</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] hover:text-[#0a192f] cursor-pointer transition-all">
                <span className="font-bold text-sm">tw</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-[#800000] transition-colors">Home</Link></li>
              <li><Link to="/blog" className="hover:text-[#800000] transition-colors">Articles</Link></li>
              <li><Link to="/login" className="hover:text-[#800000] transition-colors">Author Login</Link></li>
              <li><Link to="/disclaimer" className="hover:text-[#800000] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Topics</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/blog?category=Family%20Law" className="hover:text-[#800000] transition-colors">Family Law</Link></li>
              <li><Link to="/blog?category=Corporate%20Law" className="hover:text-[#800000] transition-colors">Corporate Law</Link></li>
              <li><Link to="/blog?category=Criminal%20Defense" className="hover:text-[#800000] transition-colors">Criminal Defense</Link></li>
              <li><Link to="/blog?category=Civil%20Rights" className="hover:text-[#800000] transition-colors">Civil Rights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to receive the latest educational legal articles.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const email = e.target.elements.email.value;
                if (email) {
                  alert('Thank you for subscribing! You will receive our latest articles at ' + email);
                  e.target.reset();
                }
              }}
              className="flex flex-col gap-3"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#800000] focus:bg-white/20 transition-colors"
              />
              <button
                type="submit"
                className="bg-[#e9ecef] text-[#0a192f] font-bold rounded-lg px-4 py-3 hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 border-t border-white/10 mb-6">
          <p className="text-gray-500 text-xs leading-relaxed">
            <strong>Legal Disclaimer:</strong> The information provided on The Law Explained is for general educational and informational purposes only and does not constitute legal advice. No attorney-client relationship is formed by reading or acting on content published here. Always consult a qualified legal professional for advice regarding your specific circumstances.
          </p>
        </div>

        {/* Copyright & Legal Links */}
        <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 TheLawExplained. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;