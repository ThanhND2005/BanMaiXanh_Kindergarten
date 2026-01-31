import React from 'react'
import { map } from 'zod'
import SalaryItem from './SalaryItem'
const salarybills = [
  {
   salaryid: '001', 
    month: 12,
    className: 'Mầm 1', 
    timekeeping: 23,
    salary : 2600000, 
    alowance: 200000,
    amount: 2800000,
    status: 'Đã xác nhận',
  },
  {
    salaryid: '002', 
    month: 1,
    className: 'Mầm 1', 
    timekeeping: 27,
    salary : 2600000, 
    alowance: 200000,
    amount: 2800000,
    status: null,
  },
]
const Salary = () => {
  return (
    <div>
      <ul className='space-y-4 p-4'>
        {salarybills.map((salary) => (
          <SalaryItem key={salary.salaryid} salary={salary}/> 
        ))}
      </ul>
    </div>
  )
}

export default Salary
