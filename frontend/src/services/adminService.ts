import api from "@/lib/axios";

export const adminService = { 
    getClassList : async () =>{
        const res = await api.get('/admin/getClassList',{withCredentials: true})
        return res.data.classes
    },
    getNotificationList : async() =>{
        const res = await api.get('/admin/getNotificationList',{withCredentials:true})
        return res.data.notifications
    },
    getMenu : async() =>{
        const res = await api.get('/admin/getMenu',{withCredentials: true})
        return res.data.menu
    },
    getStudentBill: async() =>{
        const res = await api.get('/admin/getStudentBill',{withCredentials: true})
        return res.data.studentbills
    },
    getTeacherBill: async() =>{
        const res = await api.get('/admin/getTeacherBill',{withCredentials: true})
        return res.data.teacherbills
    }
}