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
    },
    postNotification : async (title : string, content : string, receiver : string) =>{
        const res = await api.post('/admin/postNotification',{title,content,receiver},{withCredentials:true})
        return res.data
    },
    deleteNotification : async (notificationid : string, receiverid : string) =>{
        const res = await api.patch('/admin/deleteNotification',{notificationid,receiverid},{withCredentials:true})
        return res.data
    },
    postClass : async (teacherid : string, age : number, member : number ,tuition: number,schedule: string, name: string, type: string) =>{
        const res = await api.post('/admin/postClass',{teacherid,age,member,tuition,schedule,name,type},{withCredentials: true})
        return res.data
    },
    deleteClass : async (classid : string) =>{
        const res = await api.patch('/admin/deleteClass',{classid},{withCredentials: true})
        return res.data
    },
    patchMenu : async (day : number, dish1: string, dish2 : string, dish3: string, dish4: string) =>{
        const res = await api.patch(`/admin/patchMenu/${day}`,{dish1,dish2,dish3,dish4},{withCredentials: true})
        return res.data
    },
    verifyStudentBill : async (tuitionid : string) =>{
        const res = await api.patch(`/admin/verifyStudentBill/${tuitionid}`,{},{withCredentials: true})
        return res.data
    },
    deleteStudentBill : async (tuitionid :string) =>{
        const res = await api.patch(`/admin/deleteStudentBill/${tuitionid}`,{},{withCredentials: true})
        return res.data
    },
    postStudentBill : async (month : number) =>{
        const res = await api.post(`/admin/postStudentBill/${month}`,{},{withCredentials: true})
        return res.data
    },
    postTeacherBill : async (month : number) =>{
        const res = await api.post(`/admin/postTeacherBill/${month}`,{},{withCredentials: true})
        return res.data
    },
    deleteTeacherBill : async (salaryid : string) =>{
        const res = await api.patch(`/deleteTeacherBill/${salaryid}`,{},{withCredentials: true})
        return res.data
    }
}