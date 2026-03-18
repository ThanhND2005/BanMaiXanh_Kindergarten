import express from 'express'
import { getNotificationList, getParent, getStudents, getTuitionBill, patchAvatar, patchParent, patchStudentBill, postNotification } from '~/controllers/parentControllers'
import { uploadAvatar, uploadBill } from '~/middlewares/cloudMiddleware'
import { requireRole } from '~/middlewares/authMiddleware'
const router = express.Router()

router.post('/postNotification/:parentid',requireRole('parent'), postNotification)
router.patch('/patchAvatar/:parentid',requireRole('parent'), uploadAvatar.single('avatar'), patchAvatar)
router.get('/getNotificationList/:parentid',requireRole('parent'), getNotificationList)
router.patch('/patchStudentBill/:tuitionid',requireRole('parent'), uploadBill.single('tuition'), patchStudentBill)
router.patch('/patchParent/:parentid',requireRole('parent'), patchParent)
router.get('/getParent/:userid',requireRole('parent'), getParent)
router.get('/getStudents/:parentid',requireRole('parent'), getStudents)
router.get('/getTuitionBill/:parentid',requireRole('parent'),getTuitionBill)
export default router