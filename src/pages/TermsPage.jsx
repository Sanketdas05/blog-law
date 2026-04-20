import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const TermsPage = () => {
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
            Terms of Service
          </h1>
          <p className="text-gray-500 mb-10 border-b border-gray-100 pb-8">
            Last updated: April 2026
          </p>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0a192f] prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#800000]">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using The Law Explained ("the Website"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use this website.
            </p>

            <h2>2. Educational Purpose Only</h2>
            <p>
              All content published on this website is for <strong>educational and informational purposes only</strong>. Nothing on this website constitutes legal advice, and no attorney-client relationship is created between the reader and any author or contributor. The content should not be used as a substitute for competent legal counsel from a licensed attorney in your jurisdiction.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              Certain features of the website may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate information and to update it as necessary.
            </p>

            <h2>4. Content and Intellectual Property</h2>
            <p>
              All articles, graphics, logos, and other content on this website are the intellectual property of The Law Explained or its contributors. You may not reproduce, distribute, or create derivative works without express written permission. Sharing links to articles is encouraged.
            </p>

            <h2>5. User Conduct</h2>
            <p>When using this website, you agree not to:</p>
            <ul>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the website</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Upload malicious code or content</li>
              <li>Impersonate any person or entity</li>
              <li>Harvest or collect personal information of other users</li>
            </ul>

            <h2>6. Accuracy of Information</h2>
            <p>
              While we strive to ensure that all content is accurate and up-to-date, laws change frequently. We make no warranties or representations about the accuracy, completeness, or timeliness of the content. Readers are encouraged to verify all information with qualified legal professionals.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, The Law Explained and its authors, contributors, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or reliance on any content published on this website.
            </p>

            <h2>8. External Links</h2>
            <p>
              This website may contain links to external sites. We do not endorse or assume responsibility for the content, privacy policies, or practices of any third-party websites.
            </p>

            <h2>9. Modifications</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time without prior notice. Changes take effect immediately upon posting. Your continued use of the website after any modifications constitutes acceptance of the updated terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p>
              <strong>Email:</strong> legal@thelawexplained.com<br />
              <strong>Website:</strong> thelawexplained.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
