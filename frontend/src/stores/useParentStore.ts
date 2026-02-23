import { parentService } from '@/services/parentService'
import type { parentState } from '@/types/Parent'
import {create} from 'zustand'

export const useParentStore = create<parentState>((set,get) => ({
    notifications : null,
    refreshNotification : async (parentid) => {
        const notifications = await parentService.getNotificationList(parentid)
        set({notifications})
    }
}))