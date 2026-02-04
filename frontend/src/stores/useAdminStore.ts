import { type adminState } from '@/types/Admin'
import { create } from 'zustand'


export const useAdminStore = create<adminState>((set) => ({
    admin: { userid: '000', name: 'Nguyễn Danh Thành', email: 'nguyendanht2005@gmail.com' },
    teachers: [
        {
            userid: "001",
            name: "Nguyen Van An",
            dob: new Date("2005-01-01"),
            gender: "Nam",
            address: "Ha Noi",
            classid:'001',
            classname: "Vo",
            createdat: new Date("2025-01-02"),
            avatarurl:
                "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
            deleted: 'false',
            timekeeping: null,
        },
        {
            userid: "002",
            dob: new Date("2005-01-01"),
            name: "Nguyen Thi Van",
            gender: "Nu",
            address: "Nghe An",
            classname: "Mi Thuat",
            classid:'002',
            createdat: new Date("2025-01-02"),
            avatarurl:
                "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
            deleted: 'false',
            timekeeping: null,
        },
        {
            userid: "003",
            dob: new Date("2005-01-01"),
            name: "Nguyen Thi Lan",
            gender: "Nu",
            address: "Nghe An",
            classname: "Mam 2",
            classid:'003',
            createdat: new Date("2025-01-02"),
            avatarurl:
                "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
            deleted: 'false',
            timekeeping: null,
        },
        {
            userid: "004",
            dob: new Date("2005-01-01"),
            name: "Nguyen Thi Ha",
            gender: "Nu",
            address: "Ha Noi",
            classname: "Choi 1",
            classid:'004',
            createdat: new Date("2025-01-02"),
            avatarurl:
                "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
            deleted: 'false',
            timekeeping: new Date('2026-02-01'),
        },
        {
            userid: "005",
            dob: new Date("2005-01-01"),
            name: "Nguyen Thi Van",
            gender: "Nu",
            address: "Nghe An",
            classname: "Am nhac",
            classid:'005',
            createdat: new Date("2025-01-02"),
            avatarurl:
                "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
            deleted: 'false',
            timekeeping: new Date('2026-02-01'),
        }
    ],
    notifications: [
        {
            notificationid: '001',
            receiver: 'phụ huynh',
            title: 'Đóng tiền học',
            content: 'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
            createdat: new Date('2026-01-01')
        },
        {
            notificationid: '002',
            receiver: 'phụ huynh',
            title: 'Đóng tiền học',
            content: 'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
            createdat: new Date('2026-01-01')
        },
        {
            notificationid: '003',
            receiver: 'phụ huynh',
            title: 'Đóng tiền học',
            content: 'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
            createdat: new Date('2026-01-01')
        },
        {
            notificationid: '004',
            receiver: 'phụ huynh',
            title: 'Đóng tiền học',
            content: 'Hiện đã đến kì đóng tiền học, yêu cầu phụ huynh nhanh chóng đóng tiền cho con về phía nhà trường a',
            createdat: new Date('2026-01-01')
        },
    ],
    classes: [
        {
            classid: "001",
            name: "Mam 1",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teachername: "Nguyen Thi Van",
            teacherid: '001',
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Chính khóa',
            deleted: 'false'
        },
        {
            classid: "002",
            name: "Mam 1",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teacherid: '002',
            teachername: "Nguyen Thi Van",
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Chính khóa',
            deleted: 'false'
        },
        {
            classid: "003",
            name: "Mam 1",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teacherid: '003',
            teachername: "Nguyen Thi Van",
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Chính khóa',
            deleted: 'false'
        },
        {
            classid: "004",
            name: "Mam 1",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teachername: "Nguyen Thi Van",
            teacherid: '004',
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Chính khóa',
            deleted: 'false'
        },
        {
            classid: "005",
            name: "Võ thuật",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teachername: "Nguyen Thi Van",
            teacherid: '001',
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Năng khiếu',
            deleted: 'false'
        },
        {
            classid: "006",
            name: "Mĩ thuật",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teacherid: '002',
            teachername: "Nguyen Thi Van",
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Năng khiếu',
            deleted: 'false'
        },
        {
            classid: "007",
            name: "Âm nhạc",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teacherid: '003',
            teachername: "Nguyen Thi Van",
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Năng khiếu',
            deleted: 'false'
        },
        {
            classid: "008",
            name: "Tiếng anh",
            age: 3,
            member: 16,
            currentmember: 12,
            tuition: 1600000,
            teachername: "Nguyen Thi Van",
            teacherid: '004',
            imageurl:
                "https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg",
            schedule: 'Thứ 2 đến thức 6',
            type: 'Năng khiếu',
            deleted: 'false'
        }
    ],
    menuday: [
        {
            day: 2,
            dish1: "Cơm trắng",
            dish2: "Thịt băm rang",
            dish3: "Canh bí đỏ",
            dish4: "Rau cải luộc",
        },
        {
            day: 3,
            dish1: "Cơm trắng",
            dish2: "Thịt bò xào",
            dish3: "Canh rau cải",
            dish4: "Rau cải luộc",
        },
        {
            day: 4,
            dish1: "Cơm trắng",
            dish2: "Thịt lợn luộc",
            dish3: "Canh rau ngót",
            dish4: "Táo",
        },
        {
            day: 5,
            dish1: "Cơm trắng",
            dish2: "Trứng chiên",
            dish3: "Canh xương hầm",
            dish4: "Sữa chua",
        },
        {
            day: 6,
            dish1: "Cơm trắng",
            dish2: "Thịt vịt luộc",
            dish3: "Canh cà chua",
            dish4: "Táo",
        },
    ],
    students: [
        {
            studentid: "001",
            gender: 'Nữ',
            height: 0.8,
            weight: 10,
            parentname: 'Nguyễn Hà Trang',
            avatarUrl: "https://i.pinimg.com/736x/f2/f4/23/f2f423b704aea4e2b33eaf5ea4639020.jpg",
            name: "Thanh Hà",
            classid: '001',
            parentid:'001',
            classname: "Mầm 1",
            date: new Date('2026-01-01'),
            checkin: '10:00',
            checkout: null
        },
        {
            studentid: "002",
            name: "Bảo Trâm",
            classid: '001',
            classname: "Mầm 1",
            avatarUrl:
                "https://i.pinimg.com/736x/85/03/e5/8503e58686c89343f93895276e3897ae.jpg",
            gender: "Nữ",
            height: 0.8,
            weight: 10,
            parentname: 'Nguyễn Hà Trang',
            parentid:'001',
            date: new Date('2026-01-01'),
            checkin: null,
            checkout: null
        },
        {
            studentid: "003",
            name: "Gia Khánh",
            classid: '001',
            classname: "Mầm 1",
            avatarUrl:
                "https://i.pinimg.com/736x/fc/98/cd/fc98cd3240edbe858acd8333e57eb0bb.jpg",
            gender: 'Nam',
            height: 0.8,
            weight: 16,
            parentid:'002',
            parentname: 'Nguyễn Thành Nhân',
            date: new Date('2026-01-01'),
            checkin: '10:00',
            checkout: '17:00'
        },
        {
            studentid: "004",
            name: "Quốc Thái",
            classid: '002',
            classname: "Mầm 2",
            avatarUrl:
                "https://i.pinimg.com/736x/05/11/fe/0511fe22bc2a77c01d8fb7e2871c764c.jpg",
            gender: 'Nam',
            height: 0.8,
            weight: 16,
            parentname: 'Nguyễn Thanh Vân',
            parentid:'003',
            date: new Date('2026-01-01'),
            checkin: null,
            checkout: null
        },
        {
            studentid: "005",
            name: "Hà Linh",
            classid: '002',
            classname: "Mầm 2",
            avatarUrl:
                "https://i.pinimg.com/736x/cf/ce/05/cfce05fbe0eb3cd49a6baf3f663da0f8.jpg",
            gender: 'Name',
            height: 1,
            weight: 10,
            parentname: 'Nguyễn Thị Thanh',
            parentid:'004',
            date: new Date('2026-01-01'),
            checkin: '10:00',
            checkout: null
        },
    ],
    studentbills: [
        {
            tuitionid: '001',
            month: 12,
            parentName: 'Nguyễn Thị Thắm',
            studentName: 'Nguyễn Gia Hân',
            dob: new Date('2021-01-01'),
            gender: 'Nữ',
            className: 'Mầm 1',
            attendance: 23,
            tuition: 3000000,
            status: 'Đã hoàn thành',
            avatarUrl: 'https://i.pinimg.com/1200x/af/6b/13/af6b1344fc3a40799fcff65832f53af4.jpg',
            billUrl: 'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769681751/526e6a2c-0d51-44db-8465-75610de7ebc6_xipwh6.jpg',
            qrurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769957733/vpbank-0354445956-print_u5m5bf.png'
        },
        {
            tuitionid: '002',
            month: 1,
            parentName: 'Nguyễn Hồng Vân',
            studentName: 'Phạm Yến Nhi',
            dob: new Date('2021-01-01'),
            gender: 'Nữ',
            className: 'Chồi 2',
            attendance: 23,
            tuition: 4000000,
            status: 'Đang thực hiện',
            avatarUrl: 'https://i.pinimg.com/736x/55/98/6c/55986c6b13f28e0a87085243d5bc5b57.jpg',
            billUrl: null,
            qrurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769957733/vpbank-0354445956-print_u5m5bf.png'
        },
    ],
    teacherbills: [
        {
            salaryid: '001',
            teacherid: '001',
            month:1,
            teacherName: 'Phạm Thị Vân',
            dob: new Date('2005-01-01'),
            gender: 'Nữ',
            address: 'Hà Đông',
            className: 'Mầm 1',
            timekeeping: 23,
            allowance: 200000,
            salary: 400000 * 23,
            amount: 400000 * 23 + 200000,
            status: 'Đang thực hiện',
            avatarUrl: 'https://i.pinimg.com/736x/f1/d5/ac/f1d5ac5e5275f1c7b7e9696a10b7ebb6.jpg'
        },
        {
            salaryid: '002',
            teacherid:'002',
            month:1,
            teacherName: 'Vũ Hải Thanh',
            dob: new Date('2005-01-01'),
            gender: 'Nữ',
            address: 'Hà Đông',
            className: 'Chồi 2',
            timekeeping: 27,
            allowance: 200000,
            salary: 400000 * 23,
            amount: 400000 * 23 + 200000,
            status: 'Đang thực hiện',
            avatarUrl: 'https://i.pinimg.com/736x/7d/78/d5/7d78d5e2016f277d6e5174d55e8395ba.jpg'
        }, {
            salaryid: '003',
            teacherid:'003',
            month:1,
            teacherName: 'Nguyễn Vân Anh',
            dob: new Date('2005-01-01'),
            gender: 'Nữ',
            address: 'Hà Đông',
            className: 'Âm nhạc',
            timekeeping: 4,
            allowance: 200000,
            salary: 400000 * 4,
            amount: 400000 * 4 + 200000,
            status: 'Đã hoàn thành',
            avatarUrl: 'https://i.pinimg.com/736x/a9/ff/38/a9ff38124bec46a1b5d09cbb9bcfa94c.jpg'
        },
    ],
    setAdmin: (admin) => {
        set({ admin })
    },
    refreshTeachers: (teachers) => {
        set({ teachers })
    },
    refreshNotifications: (notifications) => {
        set({ notifications })
    },
    refreshClasses: (classes) => {
        set({ classes })
    },
    refreshMenu: (menuday) => {
        set({ menuday })
    },
    refreshStudents: (students) => {
        set({ students })
    },
    refreshStudentBills: (studentbills) => {
        set({ studentbills })
    },
    refreshTeacherBills: (teacherbills) => {
        set({ teacherbills })
    }

}))