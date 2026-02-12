import express from 'express'
import { authMe, refresh, signin, signout, signup } from '~/controllers/authControllers'
import { protectedRoute } from '~/middlewares/authMiddleware'

const router = express.Router()

router.post("/signup", signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/refresh', refresh)
router.get('/authme', protectedRoute, authMe)
export default router
