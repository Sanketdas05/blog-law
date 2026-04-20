import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Trash2, Eye } from 'lucide-react';
import API from '../api/axios';

const CATEGORIES = [
  'Family Law',
  'Corporate Law',
  'Criminal Defense',
  'Civil Rights',
  'Intellectual Property',
  'Real Estate Law',
  'Immigration Law',
  'Tax Law',
];

const AdminEditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Family Law',
    excerpt: '',
    content: '',
    image: '',
    readTime: '5 min read',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch post data if editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        // We need to fetch by ID for editing, but our API uses slug for GET.
        // We'll use a workaround: fetch all and find by ID.
        const { data: posts } = await API.get('/posts');
        const post = posts.find((p) => p._id === id);
        if (post) {
          setFormData({
            title: post.title,
            category: post.category,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image || '',
            readTime: post.readTime || '5 min read',
          });
        } else {
          setError('Post not found.');
        }
      } catch {
        setError('Failed to load post for editing.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (isEditing) {
        await API.put(`/posts/${id}`, formData);
        setSuccess('Article updated successfully!');
      } else {
        const { data } = await API.post('/posts', formData);
        setSuccess('Article published successfully!');
        // Redirect to the published article after a brief delay
        setTimeout(() => navigate(`/blog/${data.slug}`), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      return;
    }
    try {
      await API.delete(`/posts/${id}`);
      navigate('/blog');
    } catch {
      setError('Failed to delete article.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8" />
          <div className="space-y-6">
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-12 bg-gray-200 rounded-xl" />
            <div className="h-32 bg-gray-200 rounded-xl" />
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-[#800000] text-sm font-medium mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>
            <h1 className="text-3xl font-serif font-bold text-[#0a192f]">
              {isEditing ? 'Edit Article' : 'Write New Article'}
            </h1>
          </div>
          {isEditing && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium text-sm border border-red-200 hover:border-red-400 px-4 py-2 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
        </motion.div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl"
          >
            {success}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 p-8 md:p-10 space-y-6"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-[#0a192f] mb-2">
              Article Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Understanding Your Rights in a Workplace Dispute"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] font-serif text-lg placeholder:text-gray-400 placeholder:font-sans placeholder:text-base focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all"
            />
          </div>

          {/* Category + Read Time Row */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-[#0a192f] mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="readTime" className="block text-sm font-semibold text-[#0a192f] mb-2">
                Read Time
              </label>
              <input
                id="readTime"
                name="readTime"
                type="text"
                value={formData.readTime}
                onChange={handleChange}
                placeholder="e.g., 5 min read"
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] placeholder:text-gray-400 focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-semibold text-[#0a192f] mb-2">
              Cover Image URL
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] placeholder:text-gray-400 focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all"
            />
            {formData.image && (
              <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-[#0a192f] mb-2">
              Excerpt *
              <span className="text-gray-400 font-normal ml-2">
                (Brief summary shown on cards — max 500 chars)
              </span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              required
              rows={3}
              maxLength={500}
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A concise summary of the article..."
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] placeholder:text-gray-400 focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-1 text-right">
              {formData.excerpt.length}/500
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-[#0a192f] mb-2">
              Article Content *
              <span className="text-gray-400 font-normal ml-2">(supports HTML)</span>
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={16}
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your article content here. You can use HTML tags for formatting..."
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-[#0a192f] placeholder:text-gray-400 focus:outline-none focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/10 transition-all resize-y font-mono text-sm leading-relaxed"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="flex items-center gap-2 bg-[#0a192f] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#112a4a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Update Article' : 'Publish Article'}
                </>
              )}
            </motion.button>
            <Link
              to="/blog"
              className="text-gray-500 hover:text-[#0a192f] font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AdminEditorPage;
