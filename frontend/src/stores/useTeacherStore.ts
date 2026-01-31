import { type teacherState } from "@/types/store";
import { create } from "zustand";


export const useTeacherStore = create<teacherState>((set) => ({
    teacher : {
        userid : '001',
        name :'Nguyễn Thị Vân',
        gender: 'Nữ',
        avatarurl : 'https://i.pinimg.com/736x/f5/7a/78/f57a78b7c7ac4019181a9804ef8e126b.jpg',
        dob : new Date('2005-01-01'),
        address : "Hà Đông",
        classid :"002"
    }
}))