import api from "@/lib/axios";

export const parentService = {
    postNotification : async(parentid : string, teacherid: string, content: string, title: string,sendername: string) =>{
        const res =await api.post(`/parent/postNotification/${parentid}`,{teacherid,title,content,sendername},{withCredentials:true})
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
        return res.data.notifications 
    },
    patchStudentBill : async (tuitionid : string,file:File) =>{
        const formData = new FormData()
        formData.append('tuition',file)
        const res = await api.patch(`/parent/patchStudentBill/${tuitionid}`,formData,{withCredentials:true})
        return res.data
    },
    patchParent : async (parentid: string, name: string, dob: Date,gender: string, address: string) =>{
        const res = await api.patch(`/parent/patchParent/${parentid}`,{name,dob,gender,address},{withCredentials:true})
        return res.data
    }
}