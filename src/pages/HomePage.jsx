import Hero from '../Components/Hero';
import TopicsSection from '../Components/TopicsSection';
import LatestArticles from '../Components/LatestArticles';
import FAQSection from '../Components/FAQSection';
import CTASection from '../Components/CTA';

/**
 * HomePage — wraps all existing landing page sections.
 * Preserves the original UI exactly as designed.
 */
const HomePage = () => {
  return (
    <>
      <Hero />
      <TopicsSection />
      <LatestArticles />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default HomePage;
