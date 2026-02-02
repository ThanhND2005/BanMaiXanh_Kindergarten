import type { Class } from '@/types/Class'
import React from 'react'
import {useForm} from 'react-hook-form'
interface IClassProps {
    class1 : Class
}
import { Button } from '../ui/button'
import { Input } from '../ui/input'
const ClassCard = ({class1} : IClassProps) => {
  const {
      register: reg,
      handleSubmit: had,
      formState: { errors: err, isSubmitting: isSub },
    } = useForm<Class>();
  const onSubmit2 = async (data : Class) =>{

  }
  return (
    <div>
      <li>
            <form onSubmit={had(onSubmit2)} className="rounded-xl bg-[#ffffff] shadow-md flex flex-wrap ">
               <Input type="hidden" id="classid" value={class1.classid} {...reg("classid")}/>
               <div className="w-full h-25 overflow-hidden mb-3">
                  <img src={class1.imageurl} alt="anh lop hoc" className="w-full object-cover"/>
               </div>
               <div className="px-8 gap-4">
      
                     <h2 className="text-md font-bold">Tên lớp: {class1.name}</h2>
                     <h2 className="text-md font-bold">Giáo viên: {class1.teachername}</h2>
                     <h2 className="text-md font-bold">Độ tuổi: {class1.age}</h2>
                     <h2 className="text-md font-bold">Số lượng trẻ: {class1.member}</h2>
                     <h2 className="text-md font-bold">Học phí: {class1.tuition}</h2>
                     <h2 className="text-md font-bold">Tình trạng: {`${class1.currentmember}/${class1.member}`}</h2>
               

               </div>
               <div className="w-full px-8 flex justify-end">
                  <Button type="submit" className="mt-3 mb-3 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all" disabled={isSub}>Xóa</Button>
               </div>
            </form>
          </li>
    </div>
  )
}

export default ClassCard
