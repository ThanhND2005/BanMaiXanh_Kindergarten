import express from 'express'
import { refresh, signin, signout, signup } from '~/controllers/authControllers'

const router = express.Router()

router.post("/signup",signup)
router.post('/signin',signin)
router.post('/signout',signout)
router.post('refresh',refresh)

export default router
