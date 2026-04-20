import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api/axios';

// Fallback data shown while API loads or if backend is unavailable
const FALLBACK_POSTS = [
  {
    _id: '1',
    title: 'Understanding Your Rights in a Workplace Dispute',
    category: 'Corporate Law',
    createdAt: '2026-10-12T00:00:00Z',
    author: { name: 'Elena Rodriguez' },
    readTime: '5 min read',
    slug: 'understanding-your-rights-in-a-workplace-dispute',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Workplace disputes can be emotionally draining. Learn the fundamental rights you have as an employee and the first steps you should take.'
  },
  {
    _id: '2',
    title: 'The Modern Guide to Prenuptial Agreements',
    category: 'Family Law',
    createdAt: '2026-10-09T00:00:00Z',
    author: { name: 'David Chen' },
    readTime: '8 min read',
    slug: 'the-modern-guide-to-prenuptial-agreements',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66cb85?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Prenups are no longer just for the ultra-wealthy. Discover how modern couples are using them to set clear financial expectations.'
  },
  {
    _id: '3',
    title: 'What to Do if You Are Pulled Over: A Legal Primer',
    category: 'Criminal Defense',
    createdAt: '2026-10-05T00:00:00Z',
    author: { name: 'Sarah Jenkins' },
    readTime: '6 min read',
    slug: 'what-to-do-if-you-are-pulled-over-a-legal-primer',
    image: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800',
    excerpt: 'A step-by-step guide on how to handle traffic stops safely while protecting your constitutional rights under the law.'
  }
];

const LatestArticles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts?limit=3');
        setPosts(data.length > 0 ? data : FALLBACK_POSTS);
      } catch {
        // If backend is unavailable, show fallback data
        setPosts(FALLBACK_POSTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const displayPosts = loading ? [] : posts;

  return (
    <section id="articles" className="py-24 bg-gray-50">
      <div id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#800000] font-bold tracking-wider uppercase text-sm mb-3">Our Stories</h2>
            <h3 className="text-4xl font-serif font-bold text-[#0a192f] mb-4">Latest Legal Knowledge & Resources</h3>
            <p className="text-gray-600">Educational deep dives into recent legislation, practical guides for common legal questions, and simplified explanations from legal writers.</p>
          </div>
          <Link to="/blog" className="flex items-center text-[#0a192f] font-semibold hover:text-[#800000] transition-colors whitespace-nowrap">
            View All Articles <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-8 space-y-4">
                  <div className="flex gap-4">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-4 bg-gray-200 rounded w-3/5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-[#0a192f] to-[#112a4a] flex items-center justify-center">
                      <span className="text-4xl font-serif text-white/30">{post.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0a192f]">
                    {post.category}
                  </div>
                </div>

                <div className="p-8 flex flex-col grow">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-[#0a192f] mb-3 group-hover:text-[#800000] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#0a192f] text-xs">
                        {post.author?.name?.charAt(0) || 'A'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{post.author?.name || 'Author'}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestArticles;