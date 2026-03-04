import type { Notification } from "./store"
export interface parentState {
    
    notifications : Notification[] | null
    loading: boolean
    refreshNotification: (parentid : string) => void

}