import React from 'react'
import TeacherCard from './TeacherCard';
 const teachers = [
    {
      userid: "001",
      name: "Nguyen Van An",
      exp : 2,
      age: 23,
      gender: "Nam",
      classname: "Võ thuật",
      phone: '089345333',
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    {
      userid: "002",
      name: "Nguyen Thi Van",
      gender: "Nu",
      classname: "Mi Thuat",
      age: 22,
      exp: 1,
      phone:'0222322554',
      avatarurl:
        "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    },
    
  ];

const Teacher = () => {
  return (
    <div>
      <ul className='flex flex-col space-y-4 p-4'>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.userid} teacher={teacher}/>
        ))}
      </ul>
    </div>
  )
}

export default Teacher
