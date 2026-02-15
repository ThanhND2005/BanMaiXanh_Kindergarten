import { teacherService } from "@/services/teacherService";
import { type teacherState } from "@/types/Teacher";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";


export const useTeacherStore = create<teacherState>((set,get) => ({
    students : null, 
    notifications : null,
    loading : false,
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
    }
}))