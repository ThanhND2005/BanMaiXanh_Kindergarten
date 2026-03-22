
import express from 'express'
import { deleteStudent, deleteTeacher, getMenu, getNotificationList, getTeacherList, patchStudent, patchTeacher, postCheckin, postCheckout, postNotification, postTimeKeeping, verifyTeacherBill, patchAvatar, getStudentList, getAccountBank, getTeacher, getSalaryBills } from '~/controllers/teacherControllers'
import { uploadAvatar } from '~/middlewares/cloudMiddleware'
import { requireRole } from '~/middlewares/authMiddleware'
const router = express.Router()
router.get('/getTeacherList', requireRole('teacher','admin'), getTeacherList)
router.get('/getTeacher/:userid', requireRole('teacher'), getTeacher)
router.patch('/deleteTeacher/:teacherid', requireRole('teacher','admin'), deleteTeacher)
router.patch('/patchTeacher/:teacherid', requireRole('teacher'), patchTeacher)
router.patch('/patchAvatar/:teacherid', requireRole('teacher'), uploadAvatar.single('avatar'), patchAvatar)
router.get('/getNotifications/:teacherid', requireRole('teacher'), getNotificationList)
router.post('/postTimeKeeping/:teacherid', requireRole('teacher'), postTimeKeeping)
router.get('/getMenu/:day', requireRole('teacher','parent'), getMenu)
router.post('/postCheckin/:studentid', requireRole('teacher'), postCheckin)
router.patch('/postCheckout/:attendanceid', requireRole('teacher'), postCheckout)
router.patch('/deleteStudent/:studentid', requireRole('teacher'), deleteStudent)
router.patch('/patchStudent/:studentid', requireRole('teacher'), patchStudent)
router.post('/postNotification/:teacherid', requireRole('teacher'), postNotification)
router.patch('/verifyTeacherBill/:salaryid', requireRole('teacher'), verifyTeacherBill)
router.get('/getStudentList/:teacherid', requireRole('teacher'), getStudentList)
router.get('/getAccountBank/:userid', requireRole('teacher'), getAccountBank)
router.get('/getSalaryBills/:teacherid', requireRole('teacher'), getSalaryBills)
export default router