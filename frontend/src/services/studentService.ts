import api from "@/lib/axios";


export const studentService = {
    getListStudent : async () =>{
        const res = await api.get('/student/getStudentList',{withCredentials:true})
        return res.data.students 
    },
    getClass : async (studentid : string) =>{
        const res = await api.get(`/student/getClass/${studentid}`,{withCredentials: true})
        return res.data.classes
    },
    deleteStudent : async (studentid : string) =>{
        const res = await api.patch(`/student/deleteStudent/${studentid}`,{},{withCredentials: true})
    }
}