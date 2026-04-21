import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthor } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/posts/${slug}`);
        setPost(data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Article not found.' : 'Failed to load article.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="h-80 bg-gray-200 rounded-2xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-serif font-bold text-[#0a192f] mb-4">404</h1>
          <p className="text-gray-600 text-lg mb-8">{error}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-[#0a192f] text-white px-6 py-3 rounded-full font-medium hover:bg-[#112a4a] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#800000] font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
        </motion.div>

        {/* Category + Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[#fca580]/20 text-[#800000] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            {isAuthor && (
              <button
                onClick={() => navigate(`/admin/editor/${post._id}`)}
                className="text-xs text-gray-400 hover:text-[#0a192f] font-medium border border-gray-200 px-3 py-1 rounded-full transition-colors"
              >
                Edit
              </button>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0a192f] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#0a192f] to-[#112a4a] flex items-center justify-center text-white font-bold text-sm">
                {post.author?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <p className="text-[#0a192f] font-semibold">{post.author?.name || 'Author'}</p>
                <p className="text-xs text-gray-400">{post.author?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-[#0a192f]
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-[#800000] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0a192f]
            prose-blockquote:border-l-[#800000] prose-blockquote:bg-gray-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Disclaimer */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4">
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong>Disclaimer:</strong> This article is for <strong>educational and informational purposes only</strong> and does not constitute legal advice. The information presented may not reflect the most current legal developments. No attorney-client relationship is formed by reading this content. Please consult a qualified legal professional for advice regarding your specific situation.
          </p>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[#800000] font-semibold hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> More Articles
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailPage;
