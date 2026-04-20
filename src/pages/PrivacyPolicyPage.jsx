import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#800000] font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0a192f] mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 mb-10 border-b border-gray-100 pb-8">
            Last updated: April 2026
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0a192f] prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#800000]">
            <h2>1. Information We Collect</h2>
            <p>
              When you visit The Law Explained, we may collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and pages viewed. If you create an account or subscribe to our newsletter, we collect the information you provide, such as your name and email address.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and improve our website and content</li>
              <li>Send newsletters and updates you have subscribed to</li>
              <li>Respond to your comments, questions, or requests</li>
              <li>Monitor and analyze usage trends to improve user experience</li>
              <li>Protect against unauthorized access and legal liability</li>
            </ul>

            <h2>3. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience. These include essential cookies for site functionality and analytics cookies to understand how visitors interact with our content. You can control cookie preferences through your browser settings.
            </p>

            <h2>4. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share anonymized, aggregated data for analytics purposes. We may disclose your information if required by law or to protect our rights and safety.
            </p>

            <h2>5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any linked websites.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You may also opt out of receiving newsletters by clicking the unsubscribe link in any email. To exercise these rights, contact us at the email address below.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our website is not directed to children under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the website after changes are posted constitutes your acceptance of the updated policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> privacy@thelawexplained.com<br />
              <strong>Website:</strong> thelawexplained.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
