import { type adminState } from '@/types/Admin'
import { create } from 'zustand'

import { studentService } from '@/services/studentService'
import { teacherService } from '@/services/teacherService'
import { adminService } from '@/services/adminService'


export const useAdminStore = create<adminState>((set,get) => ({
    loading : false,
    admin : null,
    students: null,
    security : null,
    dishes: null,
    clearState : () =>{
        set({students :null,teachers :null,teacherbills :null,studentbills:null,classes: null,loading:false})
    },
    teachers: null,
    notifications: null,
    classes: null,
    menuday: null,
    studentbills: null,
    teacherbills: null,
    statdishes: null,
    refreshSecurity: async () =>{
        try {
            set({loading: true})
            const security = await adminService.getCode()
            set({security})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading:false})
        }
    },
    setLoading: (loading) =>{
        set({loading})
    },
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
            console.log(notifications)
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
            
            const teacherbills = await adminService.getTeacherBill()
            set({teacherbills})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        
    },
    refreshAdmin: async (userid: string) =>{
        try {
            const admin = await adminService.getAdmin(userid)
            set({admin})
        } catch (error) {
            console.error(error)
        }
    },
    refreshDishes: async () =>{
        try {
            const dishes =  await adminService.getDish()
            set({dishes})
        } catch (error) {
            console.error(error)
        }
    },
    refreshStatDish: async (month: number,year: number) => {
        try {
            const statdishes = await adminService.getStatDish(month,year)
            set({statdishes})
        } catch (error) {
            console.error(error)
        }
    }
}))