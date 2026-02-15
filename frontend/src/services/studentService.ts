import api from "@/lib/axios";
import { fi } from "zod/v4/locales";


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
        return res.data
    },
    patchAvatar : async (studentid : string, file: File) =>{
        const formData =new FormData()
        formData.append('avatar',file)
        const res = await api.patch(`/student/patchAvatar/${studentid}`,formData,{withCredentials:true})
        return res.data
    },
    postStudent : async (parentid: string, name: string, dob:Date,gender: string, height: number,weight : number) =>{
        const res = await api.post(`/student/postStudent/${parentid}`,{name,dob,height,weight,gender},{withCredentials:true})
        return res.data
    },
    patchStudent : async (studentid: string, name: string, dob: Date,gender: string, height: number, weight: number) =>{
        const res = await api.patch(`/student/patchStudent/${studentid}`,{name,dob,gender,height,weight},{withCredentials:true})
        return res.data 
    },
    registerClass : async (studentid: string, classid: string) =>{
        const res = await api.post(`/student/registerClass/${studentid}`,{classid},{withCredentials: true})
        return res.data
    }
}