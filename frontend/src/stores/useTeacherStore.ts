import { adminService } from "@/services/adminService";
import { teacherService } from "@/services/teacherService";
import { type teacherState } from "@/types/Teacher";
import { create } from "zustand";


export const useTeacherStore = create<teacherState>((set,get) => ({
    teacher : null,
    students : null, 
    notifications : null,
    salarybills: null,
    loading : false,
    menuday : null,
    clearState : () =>{
        set({students : null, notifications : null, loading : false})
    },
    refreshNotifications : async (teacherid : string) =>{
        try {
            set({loading : true})
            const notifications = await teacherService.getNotifications(teacherid)
            set({notifications})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading : false})
        }
    },
    refreshStudents : async (teacherid : string) =>{
        try {
            set({loading : true})
            const students = await teacherService.getStudentList(teacherid)
            set({students})

        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading : false})
        }
    },
    refreshMenu : async () =>{
        try {
            set({loading : true})
            const menuday = await adminService.getMenu()
            set({menuday})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading : false})
        }
    },
    refreshTeacher: async (userid : string) =>{
        try {
            set({loading: true})
            const teacher = await teacherService.getTeacher(userid)
            set({teacher})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally{
            set({loading:false})
        }
    },
    refreshSalaryBills: async (teacherid: string) =>{
        try {
            set({loading : true})
            const salarybills = await teacherService.getSalaryBills(teacherid)
            set({salarybills})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading : false})
        }
    }
}))