import { type teacherState } from "@/types/Teacher";
import { create } from "zustand";


export const useTeacherStore = create<teacherState>((set) => ({
    teacher: {
        userid: '001',
        name: 'Nguyễn Thị Vân',
        gender: 'Nữ',
        avatarurl: 'https://i.pinimg.com/736x/6c/af/27/6caf27294b0da5dd8bdd290e4d47e23c.jpg',
        dob: new Date('2005-01-01'),
        address: "Hà Đông",
        classname: 'Mầm 1',
        timekeeping: null,
        createdat: new Date('2020-01-01'),
        deleted: 'false'
    },
    notifications: [
        {
            notificationid: '001',
            senderName: 'Admin',
            title: 'Lịch nghỉ tết',
            content: "Kính gửi các giáo viên, lịch nghỉ tết của chúng ta sẽ bắt đầu tự ngày 31/12 cho tới 2/1 nhé.",
            createdat: new Date('2025-12-30')
        },
        {
            notificationid: '002',
            senderName: 'Phụ huynh bé Bảo Hân',
            title: 'Lưu ý',
            content: "Cô ơi, bé hôm qua vừa ngã đang bị đau chân nên cô hạn chế cho bé vẫn động giúp em ạ.",
            createdat: new Date('2025-12-30')
        },
    ],
    setTeacher: (teacher) => {
        set({ teacher: teacher })
    },
    refreshNotifications: (notifications) =>{
        set({notifications})
    }
}))