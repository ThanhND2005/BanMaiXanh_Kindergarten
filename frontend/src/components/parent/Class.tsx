import React from 'react'
import ClassCard from './ClassCard'
import { useAdminStore } from '@/stores/useAdminStore'

const Class = () => {
  const classes = useAdminStore((state) => state.classes)
  return (
    <div className='p-4'>
      <h1 className='text-4xl itim-regular'>Các lớp học chính khóa:</h1>
      <ul className='grid grid-cols-3 gap-4'>
        {classes.filter(mainclass => mainclass.type === 'Chính khóa').map((mainclass) =>(
          <ClassCard key={mainclass.classid} classinfor={mainclass}/>
        ))}
      </ul>
       <h1 className='text-4xl itim-regular mt-3'>Các lớp học năng khiếu:</h1>
       <ul className='grid grid-cols-3 gap-4'>
        {classes.filter(mainclass => mainclass.type==='Năng khiếu').map((extraclass) =>(
          <ClassCard key={extraclass.classid} classinfor={extraclass}/>
        ))}
      </ul>
    </div>
  )
}

export default Class
