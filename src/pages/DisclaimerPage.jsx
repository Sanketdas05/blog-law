import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const DisclaimerPage = () => {
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
            Legal Disclaimer
          </h1>
          <p className="text-gray-500 mb-10 border-b border-gray-100 pb-8">
            Last updated: April 2026
          </p>

          {/* Prominent Disclaimer Banner */}
          <div className="mb-10 bg-amber-50 border-2 border-amber-300 rounded-2xl px-8 py-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 mt-1 shrink-0" />
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2">Not Legal Advice</h2>
                <p className="text-amber-800 leading-relaxed">
                  The information provided on The Law Explained is for <strong>general educational and informational purposes only</strong>. It is not intended to be, and should not be construed as, legal advice. <strong>Sharing legal advice online without proper authorization is a criminal offence</strong> under the Advocates Act, 1961 and related regulations in India.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0a192f] prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#800000]">
            <h2>1. No Attorney-Client Relationship</h2>
            <p>
              No attorney-client, solicitor-client, or any other professional-client relationship is created between you and The Law Explained, its authors, editors, or contributors by accessing or reading any content on this website. Reading articles or any other content on this website does not create a privileged or confidential relationship.
            </p>

            <h2>2. Educational Content Only</h2>
            <p>
              All articles, guides, explanations, and other materials published on this website are strictly for educational purposes. They are intended to help readers develop a general understanding of legal concepts and principles. This content:
            </p>
            <ul>
              <li>Does <strong>not</strong> constitute legal advice or legal opinion</li>
              <li>Does <strong>not</strong> replace consultation with a qualified, licensed attorney</li>
              <li>Does <strong>not</strong> create any form of professional-client relationship</li>
              <li>Should <strong>not</strong> be used as the basis for any legal decision or action</li>
            </ul>

            <h2>3. No Guarantee of Accuracy</h2>
            <p>
              While we make every effort to ensure that the content is accurate, complete, and current, laws and regulations change frequently and can vary by jurisdiction. We make no warranties or representations regarding the accuracy, completeness, reliability, or timeliness of any content. Errors or omissions may exist.
            </p>

            <h2>4. Consult a Qualified Professional</h2>
            <p>
              If you require legal advice or have a legal issue, you should immediately consult a qualified, licensed legal professional in your jurisdiction. Do not delay seeking professional advice because of something you have read on this website.
            </p>

            <h2>5. Jurisdiction-Specific Information</h2>
            <p>
              Legal information provided on this website may be based on laws applicable in specific jurisdictions (primarily India). Laws differ from state to state and country to country. The information may not be applicable to your particular situation or jurisdiction.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Under no circumstances shall The Law Explained, its founders, authors, editors, contributors, or affiliates be held liable for any loss, damage, or injury — whether direct, indirect, incidental, special, or consequential — arising from your use of or reliance on any content on this website. This includes, but is not limited to, any errors or omissions in any content, or any actions taken or not taken as a result of using any content.
            </p>

            <h2>7. External Resources</h2>
            <p>
              Any references to external laws, statutes, case studies, or legal resources are provided for informational purposes. We do not guarantee the accuracy of external sources and are not responsible for the content of linked websites.
            </p>

            <h2>8. User Responsibility</h2>
            <p>
              By using this website, you acknowledge and agree that:
            </p>
            <ul>
              <li>You are responsible for evaluating the accuracy, completeness, and usefulness of all content</li>
              <li>You will not treat any content as a substitute for professional legal counsel</li>
              <li>You assume full responsibility for any actions taken based on content found on this website</li>
            </ul>

            <h2>9. Contact</h2>
            <p>
              If you have questions about this disclaimer or our content policies, contact us at:
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

export default DisclaimerPage;
