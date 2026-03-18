import { parentService } from '@/services/parentService'
import type { parentState } from '@/types/Parent'
import {create} from 'zustand'

export const useParentStore = create<parentState>((set,get) => ({
    parent: null,
    students:null,
    notifications : null,
    tuitionbills: null,
    loading :false,
    clearState: () =>{
        set({loading: false,parent:null})
    },
    refreshNotification : async (parentid) => {
        const notifications = await parentService.getNotificationList(parentid)
        set({notifications})
    },
    refreshParent: async (userid : string) => {
        try {
            set({loading : true})
            const parent = await parentService.getParent(userid)
            set({parent})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally{
            set({loading: false})
        }
    },
    refreshStudent: async (parentid: string) =>{
        try {
            set({loading : true})
            const students = await parentService.getStudents(parentid)
            set({students})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading: false})
        }
    },
    refreshTuitionBill : async(parentid :string) =>{
        try {
            set({loading: true})
            const tuitionbills = await parentService.getTuitionBill(parentid)
            set({tuitionbills})
        } catch (error) {
            console.error(error)
            get().clearState()
        }
        finally
        {
            set({loading:false})
        }
    }
}))