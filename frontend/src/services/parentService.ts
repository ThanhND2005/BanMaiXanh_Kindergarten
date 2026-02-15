import api from "@/lib/axios";

export const parentService = {
    postNotification : async(parentid : string, teacherid: string, content: string, title: string) =>{
        const res =await api.post(`/parent/postNotification/${parentid}`,{teacherid,title,content},{withCredentials:true})
        return res.data
    },
    patchAvatar : async (file : File, parentid: string) =>{
        const formData =  new FormData()
        formData.append('avatar',file)
        const res = await api.patch(`/parent/patchAvatar/${parentid}`,formData,{withCredentials:true})
        return res.data
    },
    getNotificationList : async (parentid : string) =>{
        const res = await api.get(`/parent/getNotificationList/${parentid}`,{withCredentials:true})
        return res.data.notificatons 
    },
    patchStudentBill : async (tuitionid : string,file:File) =>{
        const formData = new FormData()
        formData.append('tuition',file)
        const res = await api.patch(`/parent/patchStudentBill/${tuitionid}`,formData,{withCredentials:true})
        return res.data
    }
}