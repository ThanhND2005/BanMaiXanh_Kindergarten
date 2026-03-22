import express from 'express'
import { deleteClass, deleteNotification, deleteStudentBill, deleteTeacherBill, getCode, getClassList, getMenu, getNotificationList, getStudentBill, getTeacherBill, patchMenu, postClass, postNotification, postStudentBill, postTeacherBill, verifyStudentBill, getAdmin, acceptTeacher } from '~/controllers/adminControllers'
import { requireRole } from '~/middlewares/authMiddleware'
const router = express.Router()
router.get('/getNotificationList', requireRole('admin'), getNotificationList)
router.get('/getcode', requireRole('admin'), getCode)
router.post('/postNotification', requireRole('admin'), postNotification)
router.patch('/deleteNotification', requireRole('admin'), deleteNotification)
router.get('/getClassList', requireRole('admin', 'parent'), getClassList)
router.post('/postClass', requireRole('admin'), postClass)
router.patch('/deleteClass', requireRole('admin'), deleteClass)
router.get('/getMenu', requireRole('admin', 'teacher', 'parent'), getMenu)
router.patch('/patchMenu/:day', requireRole('admin'), patchMenu)
router.get('/getStudentBill', requireRole('admin'), getStudentBill)
router.get('/getTeacherBill', requireRole('admin'), getTeacherBill)
router.patch('/verifyStudentBill/:tuitionid', requireRole('admin'), verifyStudentBill)
router.patch('/deleteStudentBill/:tuitionid', requireRole('admin'), deleteStudentBill)
router.post('/postStudentBill/:month', requireRole('admin'), postStudentBill)
router.post('/postTeacherBill/:month', requireRole('admin'), postTeacherBill)
router.patch('/deleteTeacherBill/:salaryid', requireRole('admin'), deleteTeacherBill)
router.get('/getAdmin/:userid', requireRole('admin'), getAdmin)
router.patch('/acceptTeacher/:userid',requireRole('admin'),acceptTeacher)
export default router