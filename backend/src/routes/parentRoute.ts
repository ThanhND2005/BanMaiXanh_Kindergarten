import express from 'express'
import { getNotificationList, patchAvatar, patchStudentBill, postNotification } from '~/controllers/parentControllers'
import { uploadAvatar, uploadBill } from '~/middlewares/cloudMiddleware'

const router = express.Router()

router.post('/postNotification/:parentid',postNotification)
router.patch('/patchAvatar/:parentid',uploadAvatar.single('avatar'),patchAvatar)
router.get('/getNotificationList/:parentid',getNotificationList)
router.patch('/patchStudentBill/:tuitionid',uploadBill.single('tuition'),patchStudentBill)
export default router