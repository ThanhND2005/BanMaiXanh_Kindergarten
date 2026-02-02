import React from 'react'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useTeacherStore } from '@/stores/useTeacherStore'
import StudentItem from './StudentItem'


const students = [
  {
    studentid :'001',
    name :'Trần Hà Anh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl :'https://i.pinimg.com/736x/7d/78/d5/7d78d5e2016f277d6e5174d55e8395ba.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :'17:00'
  },
  {
    studentid :'002',
    name :'Nguyễn Vân Anh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl:'https://i.pinimg.com/736x/ca/df/db/cadfdb55f90859315a604ff316b775c4.jpg',
    date : '2005-01-01',
    checkin :null,
    checkout :null
  },
  {
    studentid :'003',
    name :'Nguyễn Thảo Linh',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl:'https://i.pinimg.com/736x/3f/0c/ae/3f0cae6ef757529c0ad31a255879a07e.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :null
  },
  {
    studentid :'004',
    name :'Phạm Bảo Hân',
    height: 0.8,
    weight: 9,
    parentName:'Nguyễn Văn An',
    avatarurl: 'https://i.pinimg.com/736x/4b/9e/de/4b9ede583bcba788cffe46beaad3cb58.jpg',
    date : '2005-01-01',
    checkin :'10:00',
    checkout :'17:00'
  },
]
const Class = () => {
  
  
  
  return (
    <div className='p-4'>
      <ul className='space-y-6'>
        {students.map((student) => (
          <StudentItem key={student.studentid} student={student}/>
        ))}
      </ul>
    </div>
  )
}

export default Class
