import express from 'express'
import { authMe, refresh, signin, signinAdmin, signinTeacher, signout, signup } from '~/controllers/authControllers'
import { verifyToken } from '~/middlewares/authMiddleware'

const router = express.Router()

router.post('/signup', signup)
router.post('/signinAdmin', signinAdmin)
router.post('/signinTeacher',signinTeacher)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/refresh', refresh)
router.get('/authme', verifyToken, authMe)
export default router
