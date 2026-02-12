import { type adminState } from '@/types/Admin'
import { create } from 'zustand'

import { studentService } from '@/services/studentService'
import { teacherService } from '@/services/teacherService'
import { adminService } from '@/services/adminService'


export const useAdminStore = create<adminState>((set,get) => ({
    loading : false,
    students: null,
    clearState : () =>{
        set({students :null,teachers :null,teacherbills :null,studentbills:null,classes: null,loading:false})
    },
    teachers: null,
    notifications: null,
    classes: null,
    menuday: null,
    studentbills: null,
    teacherbills: null,
    
    refreshTeachers: async () => {
        try {
            set({loading: true})
            const teachers = await teacherService.getListTeacher()
            set({teachers})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally{
            set({loading: false})
        }
    },
    refreshNotifications: async () => {
        try {
            set({loading: true})
            const notifications = await adminService.getNotificationList()
            set({notifications})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally{
            set({loading : false})
        }
    },
    refreshClasses: async () => {
        try {
            set({loading : true})
            const classes = await adminService.getClassList()
            set({classes})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading:false})
        }
    },
    refreshMenu: async () => {
        try {
            set({loading : true})
            const menu = await adminService.getMenu()
            set({menuday : menu})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading : false})
        }
    },
    refreshStudents: async () => {
        try {
            set({loading : true})
            const students = await studentService.getListStudent()
            set({students})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally {
            set({loading : false})
        }
    },
    refreshStudentBills: async () => {
        try {
            set({loading: true})
            const studentbills = await adminService.getStudentBill()
            set({studentbills})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading: false})
        }
    },
    refreshTeacherBills: async () => {
        try {
            set({loading : true})
            const teacherbills = await adminService.getTeacherBill()
            set({teacherbills})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading: false})
        }
    }

}))