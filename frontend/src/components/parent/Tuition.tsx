import React from 'react'
import TuitionCard from './TuitionCard'
const tuitions = [
  {
    tuitionid : '001',
    studentname: 'Nguyễn Bảo Hân',
    classname: 'Mầm 1',
    amount : 2600000,
    status: 'Đang thực hiện',
    qrurl: 'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769957733/vpbank-0354445956-print_u5m5bf.png',
    billurl : null,
    month : 1,
    attendance: 26,
  },
  {
    tuitionid : '002',
    studentname: 'Nguyễn Bảo Hân',
    classname: 'Mầm 1',
    amount : 2600000,
    status: 'Đã hoàn thành',
    qrurl: 'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769957733/vpbank-0354445956-print_u5m5bf.png',
    billurl : 'https://res.cloudinary.com/dhylrhxsa/image/upload/v1769681751/526e6a2c-0d51-44db-8465-75610de7ebc6_xipwh6.jpg',
    month : 12,
    attendance: 26,
  },
]
const Tuition = () => {
  return (
    <div>
      <ul className='flex flex-col gap-4 p-4'>
        {tuitions.map((tuition) =>(
          <TuitionCard key={tuition.tuitionid} tuition={tuition}/>
        ))}
      </ul>
    </div>
  )
}

export default Tuition
