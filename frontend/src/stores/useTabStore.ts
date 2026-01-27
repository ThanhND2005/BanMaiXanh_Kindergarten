import {create} from 'zustand'
import type { tabAdminState } from '@/types/store'
export const useTabAdminStore = create<tabAdminState>((set) =>({
    tabActive: 'dashboard',
    setTabActive : (tab) =>{
        set({tabActive : tab})
    }
}))