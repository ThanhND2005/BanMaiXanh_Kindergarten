import express from 'express'
import { deleteClass, deleteNotification, deleteStudentBill, deleteTeacherBill, getClassList, getMenu, getNotificationList, getStudentBill, getTeacherBill, patchMenu, postClass, postNotification, postStudentBill, postTeacherBill, verifyStudentBill } from '~/controllers/adminControllers'

const router = express.Router()
router.get('/getNotificationList',getNotificationList)
router.post('/postNotification',postNotification)
router.patch('/deleteNotification',deleteNotification)
router.get('/getClassList',getClassList)
router.post('/postClass',postClass)
router.patch('/deleteClass',deleteClass)
router.get('/getMenu',getMenu)
router.get('/patchMenu/:day',patchMenu)
router.get('/getStudentBill',getStudentBill)
router.get('/getTeacherBill',getTeacherBill)
router.patch('/verifyStudentBill/:tuitionid',verifyStudentBill)
router.patch('/deleteStudentBill/:tuitionid',deleteStudentBill)
router.post('/postStudentBill/:month',postStudentBill)
router.post('/postTeacherBill/:month',postTeacherBill)
router.patch('/deleteTeacherBill/:salaryid',deleteTeacherBill)

export default router