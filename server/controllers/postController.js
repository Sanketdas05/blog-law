import Post from '../models/Post.js';

/**
 * GET /api/posts
 * Get all posts (public), sorted by newest first
 * Query params: ?limit=N to restrict count
 */
export const getAllPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;

    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json(posts);
  } catch (error) {
    console.error('GetAllPosts error:', error);
    res.status(500).json({ message: 'Server error fetching posts.' });
  }
};

/**
 * GET /api/posts/:slug
 * Get a single post by slug (public)
 */
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      'author',
      'name email'
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('GetPostBySlug error:', error);
    res.status(500).json({ message: 'Server error fetching post.' });
  }
};

/**
 * POST /api/posts
 * Create a new post (author only)
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, image, readTime } = req.body;

    // Validation
    if (!title || !content || !excerpt || !category) {
      return res.status(400).json({
        message: 'Title, content, excerpt, and category are required.',
      });
    }

    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      image: image || '',
      readTime: readTime || '5 min read',
      author: req.user.id,
    });

    // Populate author for the response
    await post.populate('author', 'name email');

    res.status(201).json(post);
  } catch (error) {
    console.error('CreatePost error:', error);

    // Handle duplicate slug
    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A post with a similar title already exists. Please use a different title.',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error creating post.' });
  }
};

/**
 * PUT /api/posts/:id
 * Update an existing post (author only)
 */
export const updatePost = async (req, res) => {
  try {
    const { title, content, excerpt, category, image, readTime } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Update fields if provided
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (category !== undefined) post.category = category;
    if (image !== undefined) post.image = image;
    if (readTime !== undefined) post.readTime = readTime;

    await post.save(); // This triggers the slug regeneration pre-validate hook
    await post.populate('author', 'name email');

    res.status(200).json(post);
  } catch (error) {
    console.error('UpdatePost error:', error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: 'A post with a similar title already exists.',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error updating post.' });
  }
};

/**
 * DELETE /api/posts/:id
 * Delete a post (author only)
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    console.error('DeletePost error:', error);
    res.status(500).json({ message: 'Server error deleting post.' });
  }
};
