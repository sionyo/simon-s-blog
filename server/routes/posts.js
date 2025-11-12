import express from 'express';
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:slug', getPostBySlug);

// Protected routes (admin only)
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;