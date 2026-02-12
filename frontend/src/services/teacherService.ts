import api from "@/lib/axios";

export const teacherService = {
    getListTeacher : async () =>{
        const res  = await api.get('/teacher/getTeacherList',{withCredentials:true})
        return res.data.teachers
    },
    deleteTeacher : async (teacherid : string) =>{
        const res = await api.patch(`/teacher/deleteTeacher/${teacherid}`,{},{withCredentials: true})
        return res.data.teachers
    }
}