import api from "@/lib/axios";

export const teacherService = {
    getListTeacher : async () =>{
        const res  = await api.get('/teacher/getTeacherList',{withCredentials:true})
        return res.data.teachers
    },
    deleteTeacher : async (teacherid : string) =>{
        const res = await api.patch(`/teacher/deleteTeacher/${teacherid}`,{},{withCredentials: true})
        return res.data.teachers
    },
    patchAvatar : async (file : File,teacherid : string) =>{
        const formData = new FormData()
        formData.append('avatar',file)
        const res =  await api.patch(`/teacher/patchAvatar/${teacherid}`,formData,{withCredentials:true})
        return res.data
    },
    getNotifications : async (teacherid: string) =>{
        const res = await api.get(`/teacher/getNotifications/${teacherid}`,{withCredentials:true})
        return res.data.notifications 
    },
    postTimeKeeping : async (teacherid : string) =>{
        const res = await api.post(`/teacher/postTimeKeeping/${teacherid}`,{},{withCredentials:true})
        return res.data
    },
    getMenu : async (day : number) =>{
        const res = await api.get(`/teacher/getMenu/${day}`,{withCredentials:true})
        return res.data.menu 
    },
    postCheckin : async (studentid : string,classid : string ) =>{
        const res = await api.post(`/teacher/postCheckin/${studentid}`,{classid},{withCredentials:true})
        return res.data
    },
    postCheckout : async (attendanceid : string) =>{
        const res = await api.patch(`/teacher/postCheckout/${attendanceid}`,{},{withCredentials:true})
        return res.data
    },
    deleteStudent : async (studentid: string,classid : string) =>{
        const res = await api.patch(`/teacher/deleteStudent/${studentid}`,{classid},{withCredentials:true})
        return res.data 
    },
    patchStudent : async (studentid: string, height : number,weight : number) =>{
        const res = await api.patch(`/teacher/patchStudent/${studentid}`,{height,weight},{withCredentials: true})
        return res.data
    },
    postNotification : async (teacherid: string, parentid: string, content: string, title: string) =>{
        const res = await api.post(`/teacher/postNotification/${teacherid}`,{parentid,title,content},{withCredentials:true})
        return res.data
    },
    verifyTeacherBill : async (salaryid : string) =>{
        const res = await api.patch(`/teacher/verifyTeacherBill/${salaryid}`,{},{withCredentials : true})
        return res.data
    },
    patchTeacher : async (teacherid: string,name: string, dob: Date,address : string, gender: string) =>{
        const res =  await api.patch(`/teacher/patchTeacher/${teacherid}`,{name,dob,address,gender})
        return res.data
    },
    getStudentList : async (teacherid : string) =>{
        const res = await api.get(`/teacher/getStudentList/${teacherid}`,{withCredentials: true})
        return res.data.students
    }
}