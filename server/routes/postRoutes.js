import express from 'express';
import {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:slug', getPostBySlug);

// Protected routes (author only)
router.post('/', auth, roleCheck('author'), createPost);
router.put('/:id', auth, roleCheck('author'), updatePost);
router.delete('/:id', auth, roleCheck('author'), deletePost);

export default router;
