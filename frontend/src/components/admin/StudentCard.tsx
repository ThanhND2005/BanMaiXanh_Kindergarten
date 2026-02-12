import type { Student } from '@/types/Student'
import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useStudentStore } from '@/stores/useStudentStore'
import { adminService } from '@/services/adminService'
import { studentService } from '@/services/studentService'
import { useAdminStore } from '@/stores/useAdminStore'

interface IStudentProps {
    student : Student
}
const StudentCard = ({student} : IStudentProps) => {
  const {classes,refreshClasses} = useStudentStore()
  const {refreshStudents} = useAdminStore()
  const onDelete = async (studentid: string) => {
    await studentService.deleteStudent(studentid)
    await refreshStudents()
  };
  const getClass = async (studentid: string) =>{
    await refreshClasses(studentid)
  }
  return (
    <div>

      <li >
          <Dialog>
            <DialogTrigger asChild>
              <button onClick={() => getClass(student.studentid)} className='w-full h-full'>
            <div
          
              className="h-full rounded-xl bg-[#ffffff] shadow-md px-4 flex flex-col justify-between items-center"
            >
              <div className='flex flex-col items-center'>

              <div className="w-24 h-24 rounded-full overflow-hidden">
                <img
                  src={student.avatarurl}
                  alt="hinhdaidien"
                  
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold ">Bé {student.name}</h1>
              </div>
              </div>
              
              <div>
                <Button
                  type="button"
                  className="mt-3 mb-3 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
                  onClick={() =>onDelete(student.studentid)}
                >
                  Xóa
                </Button>
              </div>
            </div>

              </button>
            </DialogTrigger>
            <DialogContent>
                <div className='flex flex-col justify-center items-center gap-3 p-4'>
                  <div className='rounded-full w-30 h-30 overflow-hidden'>
                    <img src={student.avatarurl} alt="avatar" />
                  </div>
                  <div className='w-full'>
                    <Label htmlFor='name' className='text-sm block'>Tên</Label>
                    <Input id='name'  placeholder={student.name} className='rounded-2xl' readOnly/>
                  </div>
                  <div className='w-full'>
                    <Label htmlFor='gender' className='text-sm block'>Giới tính</Label>
                    <Input id='gender'  placeholder={student.gender} className='rounded-2xl' readOnly/>
                  </div>
                   <div className='w-full'>
                    <Label htmlFor='parentname' className='text-sm block'>Họ tên phụ huynh</Label>
                    <Input id='parentname'  placeholder={student.parentname} className='rounded-2xl' readOnly/>
                  </div>
                  <div className='w-full'>
                    <Label htmlFor='classes' className='text-sm block '>Lớp học đang tham gia</Label>
                    <ul id='classes' className='space-y-1'>
                      {classes?.map((class1) => (
                        <li key={class1.classid}>
                          <Input placeholder={class1.name} className='rounded-2xl' readOnly/>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
            </DialogContent>
          </Dialog>
          </li>
    </div>
  )
}

export default StudentCard
