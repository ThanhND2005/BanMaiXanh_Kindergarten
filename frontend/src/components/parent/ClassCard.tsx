import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {ChevronsUpDown} from 'lucide-react'
import { Command, CommandEmpty, CommandItem, CommandList } from '../ui/command'
import { CommandGroup } from 'cmdk'
interface Class {
        classid :string,
        className:string,
        teacherName:string,
        age: number,
        members:number,
        currentmember :number,
        tuition : number,
        schedule: string,
        avatarurl: string,
}
interface IClassProps {
    classinfor : Class
}
const students = [
  {
    studentid :'001',
    age:6,
    gender: 'Nữ',
    dob: '01/01/2020',
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
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
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
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
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
    age:6,
    dob: '01/01/2020',
    gender: 'Nữ',
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
const ClassCard = ({classinfor} : IClassProps) => {
  const [open, setOpen] = useState(false)
  const [studentid, setStudentId] = useState('')
  const onRegister = async(studentid, classid) =>{
  }
  return (
    <div className='mt-4'>
      <li className='bg-white flex flex-col justify-center rounded-2xl shadow-md'>
        <div className='w-full rounded-2xl overflow-hidden h-auto'>
            <img src={classinfor.avatarurl} alt="avatar" />
        </div>
        <div className='space-y-2 p-4'>
            <h2 className='text-lg font-bold'>Tên lớp: {classinfor.className}</h2>
            <h2 className='text-lg font-bold'>Giáo viên: {classinfor.teacherName}</h2>
            <h2 className='text-lg font-bold'>Độ tuổi: {classinfor.age}</h2>
            <h2 className='text-lg font-bold'>Số lượng: {classinfor.members}</h2>
            <h2 className='text-lg font-bold'>Trạng thái: {classinfor.currentmember}/{classinfor.members}</h2>
            <h2 className='text-lg font-bold'>Học phí: {classinfor.tuition}</h2>
            <h2 className='text-lg font-bold'>Lịch học: {classinfor.schedule}</h2>
        </div>
        <div className='flex justify-center mb-3'>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' className='w-60 rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988]'>Đăng ký</Button>
            </DialogTrigger>
            <DialogContent>
                <h2 className='w-full text-center text-2xl font-bold'>Chọn học sinh muốn đăng ký</h2>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant='outline' role='combobox' aria-expanded={open}>
                            {studentid ? students.find((student) => student.studentid === studentid)?.name : 'Chọn học sinh ...'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />    
                        </Button>    
                    </PopoverTrigger>
                    <PopoverContent>
                        <Command>
                            <CommandList>
                                <CommandEmpty>Không có thông tin học sinh</CommandEmpty>
                                <CommandGroup>
                                    {students.map((student)=>(
                                        <CommandItem key={student.studentid} value={student.studentid} onSelect={(currentStudentId) =>{ setStudentId(currentStudentId === studentid ? "" : currentStudentId)
                                            setOpen(false)}}>{student.name}</CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className='gap-3 flex justify-center'>
                    <Button type='button' onClick={() => onRegister(studentid,classinfor.classid)} className='w-50 rounded-2xl bg-[#05D988] text-[#ffffff] hover:bg-[#02B671] focus:bg-[#05D988]'>Đăng ký</Button>
                </div>
            </DialogContent>
        </Dialog>
        </div>
      </li>
    </div>
  )
}

export default ClassCard
