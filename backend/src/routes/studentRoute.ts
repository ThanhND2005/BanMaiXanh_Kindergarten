import express from 'express'
import { deleteStudent, getClass, getStudentList, patchAvatar, patchStudent, postStudent, registerClass } from '~/controllers/studentControllers'
import { getTeacher } from '~/controllers/teacherControllers'
import { uploadAvatar } from '~/middlewares/cloudMiddleware'

const router = express.Router()

router.get('/getStudentList',getStudentList)
router.patch('/deleteStudent/:studentid',deleteStudent)
router.patch('/patchAvatar/:studentid',uploadAvatar.single('avatar'),patchAvatar)
router.post('/postStudent/:parentid',postStudent)
router.patch('/patchStudent/:studentid',patchStudent)
router.post('/registerClass/:studentid',registerClass)
router.get('/getClass/:studentid',getClass)
router.post('/getTeacher',getTeacher)
export default router