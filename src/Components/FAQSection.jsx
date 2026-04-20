import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What should I do if I am served with a lawsuit?",
    answer: "Contact an attorney immediately. You have a limited amount of time (usually 20-30 days) to file a formal response with the court. Ignoring it can result in a default judgment against you."
  },
  {
    question: "How do personal injury contingency fees work?",
    answer: "In a contingency fee arrangement, your lawyer only gets paid if you win your case or reach a settlement. Their fee is a predetermined percentage (typically 33% to 40%) of the final payout."
  },
  {
    question: "Do I really need a lawyer, or can I represent myself?",
    answer: "While you have the right to represent yourself (pro se), the legal system has strict procedural rules. Having an experienced attorney helps protect your rights and significantly improves your chances of a favorable outcome."
  },
  {
    question: "What is the difference between civil and criminal law?",
    answer: "Civil law deals with disputes between individuals or entities (like breach of contract or family law), typically resulting in financial compensation. Criminal law involves the government prosecuting someone for breaking the law, which can result in fines or imprisonment."
  }
];
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white relative border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#800000] font-bold tracking-wider uppercase text-sm mb-3">Common Questions</h2>
          <h3 className="text-4xl font-serif font-bold text-[#0a192f] mb-6">Frequently Asked Legal Questions</h3>
          <p className="text-gray-600 text-lg">Clear answers to the questions we hear most often from our clients.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-[#800000] transition-colors duration-300">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
              >
                <span className="font-bold text-[#0a192f] text-lg pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50"
                >
                  <ChevronDown className="w-5 h-5 text-[#fca580]" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 bg-white text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQSection;