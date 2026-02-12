import api from "@/lib/axios";


export const studentService = {
    getListStudent : async () =>{
        const res = await api.get('/student/getStudentList',{withCredentials:true})
        return res.data.students 
    }
}