import type { parentState } from '@/types/Parent'
import {create} from 'zustand'

export const useParentStore = create<parentState>((set) => ({
    parent :{
        userid:'001',
        name:'Nguyễn Hà Trang',
        dob : new Date('1998-01-01'),
        gender:'Nữ',
        address: 'Hà Đông',
        avatarurl:'https://i.pinimg.com/1200x/39/9e/e5/399ee5efd7768a6975a2e15ff06cd23e.jpg',

    },
    teachers:[
        {
      userid: "001",
      name: "Nguyen Van An",
      dob: new Date('2005-01-01'),
      gender: "Nam",
      classname: "Võ thuật",
      classid:'001',
      address:'Hà Đông',
      createdat: new Date('2024-01-01'),
      deleted:'false',
      timekeeping:null,
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "002",
      name: "Nguyen Thi Van",
      gender: "Nu",
      classname: "Mi Thuat",
      dob: new Date('2002-01-01'),
      classid:'002',
      address:'Hà Đông',
      createdat: new Date('2024-01-01'),
      deleted:'false',
      timekeeping:null,
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    ],
    setParent : (parent) => {
        set({parent})
    },
    refreshTeacher : (teachers) => 
    {
        set({teachers})
    }
}))