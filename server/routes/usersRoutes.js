import express from 'express'
import {loginUser, createUser, getMyProfile, showAllUsers, getUserProfile} from '../controllers/userController.js'

import { protect } from '../middleware/authMiddleware.js'


const router = express.Router()

router.route('/').get(showAllUsers).post(createUser)
router.get('/:name', getUserProfile)
router.post('/login', loginUser)
router.get('/my-profile', protect, getMyProfile)

export default router


