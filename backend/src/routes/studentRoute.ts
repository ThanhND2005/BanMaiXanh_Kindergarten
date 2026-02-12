import express from 'express'
import { deleteStudent, getStudentList, patchAvatar, patchStudent, postStudent, registerClass } from '~/controllers/studentControllers'
import { uploadAvatar } from '~/middlewares/cloudMiddleware'

const router = express.Router()

router.get('/getStudentList',getStudentList)
router.patch('/deleteStudent/:studentid',deleteStudent)
router.patch('/patchAvatar/:studentid',uploadAvatar.single('avatar'),patchAvatar)
router.post('/postStudent/:parentid',postStudent)
router.patch('/patchStudent/:studentid',patchStudent)
router.post('/registerClass/:studentid',registerClass)
export default router