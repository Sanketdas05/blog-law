import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Search, AlertTriangle } from 'lucide-react';
import API from '../api/axios';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await API.get('/posts');
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const categories = ['All', ...new Set(posts.map((p) => p.category))];

  const handleCategoryChange = (cat) => {
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-56 bg-gray-200" />
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-serif font-bold text-[#0a192f] mb-4">
            {selectedCategory !== 'All' ? selectedCategory : 'Legal Insights & Articles'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {selectedCategory !== 'All'
              ? `Educational articles and resources about ${selectedCategory}.`
              : 'Educational resources, practical guides, and the latest developments in law — written for everyone.'}
          </p>
        </motion.div>

        {/* Disclaimer Banner */}
        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-amber-800 text-sm">
            <strong>Disclaimer:</strong> The content on this website is for <strong>educational and informational purposes only</strong>. It does not constitute legal advice. Please consult a qualified attorney for advice specific to your situation.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[#0a192f] focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0a192f] text-white shadow-lg shadow-[#0a192f]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#800000] hover:text-[#800000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              {selectedCategory !== 'All'
                ? `No articles found under "${selectedCategory}" yet.`
                : 'No articles found matching your search.'}
            </p>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => handleCategoryChange('All')}
                className="mt-4 text-[#800000] font-semibold hover:underline"
              >
                View all articles →
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.08 }}
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
                    <div className="w-full h-full bg-gradient-to-br from-[#0a192f] to-[#112a4a] flex items-center justify-center">
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

                  <h2 className="text-xl font-serif font-bold text-[#0a192f] mb-3 group-hover:text-[#800000] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#0a192f] text-xs">
                        {post.author?.name?.charAt(0) || 'A'}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {post.author?.name || 'Author'}
                      </span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-[#800000] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
