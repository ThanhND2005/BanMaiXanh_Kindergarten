import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {ChevronsUpDown} from 'lucide-react'
import { Command, CommandEmpty, CommandItem, CommandList } from '../ui/command'
import { CommandGroup } from 'cmdk'
import type { Class } from '@/types/Class'
import { useParentStore } from '@/stores/useParentStore'
import { useAdminStore } from '@/stores/useAdminStore'
interface IClassProps {
    classinfor : Class
}

const ClassCard = ({classinfor} : IClassProps) => {
  const parent = useParentStore((state) => state.parent)
  const students = useAdminStore((state) => state.students).filter(student => student.parentid === parent.userid)
  const [open, setOpen] = useState(false)
  const [studentid, setStudentId] = useState('')
  const onRegister = async(studentid, classid) =>{
  }
  return (
    <div className='mt-4'>
      <li className='bg-white flex flex-col justify-center rounded-2xl shadow-md'>
        <div className='w-full rounded-2xl overflow-hidden h-auto'>
            <img src={classinfor.imageurl} alt="avatar" />
        </div>
        <div className='space-y-2 p-4'>
            <h2 className='text-lg font-bold'>Tên lớp: {classinfor.name}</h2>
            <h2 className='text-lg font-bold'>Giáo viên: {classinfor.teachername}</h2>
            <h2 className='text-lg font-bold'>Độ tuổi: {classinfor.age}</h2>
            <h2 className='text-lg font-bold'>Số lượng: {classinfor.member}</h2>
            <h2 className='text-lg font-bold'>Trạng thái: {classinfor.currentmember}/{classinfor.member}</h2>
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
