import type { Notification } from "./store"
export interface parentState {
    
    notifications : Notification[] | null
    refreshNotification: (parentid : string) => void

}