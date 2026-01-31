import React from 'react'
import ClassCard from './ClassCard'
const mainclasses = [
    {
        classid :'001',
        className:'Mầm 1',
        teacherName:'Nguyễn Thị Vân',
        age: 3,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Từ thứ 2 đến thứ 7',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    },
    {
        classid :'002',
        className:'Mầm 2',
        teacherName:'Phạm Hà Anh',
        age: 4,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Từ thứ 2 đến thứ 7',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    },
    {
        classid :'003',
        className:'Chồi 1',
        teacherName:'Nguyễn Thảo Linh',
        age: 5,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Từ thứ 2 đến thứ 7',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    }
]
const extraclasses = [
    {
        classid :'001',
        className:'Hội họa',
        teacherName:'Nguyễn Lan Anh',
        age: 4,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Thứ 4',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    },
    {
        classid :'002',
        className:'Ca nhạc',
        teacherName:'Phạm Hà Anh',
        age: 4,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Thứ 2',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    },
    {
        classid :'003',
        className:'MC',
        teacherName:'Nguyễn Thảo Linh',
        age: 5,
        members:16,
        currentmember :12,
        tuition : 3000000,
        schedule: 'Thứ 6',
        avatarurl:'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769583472/51758c8655e6dbb882f7_dqoijs.jpg'
    }
]
const Class = () => {
  return (
    <div className='p-4'>
      <h1 className='text-4xl itim-regular'>Các lớp học chính khóa:</h1>
      <ul className='grid grid-cols-3 gap-4'>
        {mainclasses.map((mainclass) =>(
          <ClassCard key={mainclass.classid} classinfor={mainclass}/>
        ))}
      </ul>
       <h1 className='text-4xl itim-regular mt-3'>Các lớp học năng khiếu:</h1>
       <ul className='grid grid-cols-3 gap-4'>
        {extraclasses.map((extraclass) =>(
          <ClassCard key={extraclass.classid} classinfor={extraclass}/>
        ))}
      </ul>
    </div>
  )
}

export default Class
