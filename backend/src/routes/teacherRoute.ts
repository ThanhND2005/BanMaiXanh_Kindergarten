
import express from 'express'
import { deleteStudent, deleteTeacher, getMenu, getNotificationList, getTeacherList, patchStudent, patchTeacher, postCheckin, postCheckout, postNotification, postTimeKeeping, verifyTeacherBill,patchAvatar, getStudentList } from '~/controllers/teacherControllers'
import { uploadAvatar } from '~/middlewares/cloudMiddleware'

const router = express.Router()
router.get('/getTeacherList',getTeacherList)
router.patch('/deleteTeacher/:teacherid',deleteTeacher)
router.patch('/patchTeacher/:teacherid',patchTeacher)
router.patch('/patchAvatar/:teacherid',uploadAvatar.single('avatar'),patchAvatar)
router.get('/getNotifications/:teacherid',getNotificationList)
router.post('/postTimeKeeping/:teacherid',postTimeKeeping)
router.get('/getMenu/:day',getMenu)
router.post('/postCheckin/:studentid',postCheckin)
router.patch('/postCheckout/:attendanceid',postCheckout)
router.patch('/deleteStudent/:studentid',deleteStudent)
router.patch('/patchStudent/:studentid',patchStudent)
router.post('/postNotification/:teacherid',postNotification)
router.patch('/verifyTeacherBill/:salaryid',verifyTeacherBill)
router.get('/getStudentList/:teacherid',getStudentList)

export default router