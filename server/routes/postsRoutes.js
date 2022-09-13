import express from 'express'
const router = express.Router()
import {getAllPosts, createPost, updatePost, deletePost, likePost, dislikePost, getPostsByUser} from '../controllers/postController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(getAllPosts).post(protect, createPost)
router.route('/:id').delete(protect, deletePost).patch(protect, updatePost)
router.route('/:id/like').patch(protect, likePost)
router.route('/:id/dislike').patch(protect, dislikePost)
router.get("/user-posts/:nickname", getPostsByUser)

export default router






