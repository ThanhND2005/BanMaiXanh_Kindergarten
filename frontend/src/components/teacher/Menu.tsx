import React from 'react'
const menuday = [
  {day:2, dish1:'Cơm trắng',dish2:'Thịt băm rang',dish3:'Canh bí đỏ',dish4:'Rau cải luộc'},
  {day:3, dish1:'Cơm trắng',dish2:'Thịt bò xào',dish3:'Canh rau cải',dish4:'Rau cải luộc'},
  {day:4, dish1:'Cơm trắng',dish2:'Thịt lợn luộc',dish3:'Canh rau ngót',dish4:'Táo'},
  {day:5, dish1:'Cơm trắng',dish2:'Trứng chiên',dish3:'Canh xương hầm',dish4:'Sữa chua'},
  {day:6, dish1:'Cơm trắng',dish2:'Thịt vịt luộc',dish3:'Canh cà chua',dish4:'Táo'}
]
const Menu = () => {
  return (
    <div>
      <ul className='grid grid-cols-3 p-4 gap-8'>
        {menuday.map((menu) => (
          <li>
            <div className='bg-[#ffffff] rounded-xl shadow-md flex flex-wrap justify-center p-6'>
                <div>
                <h1 className='text-4xl font-bold w-full'>Thứ {menu.day}</h1>

                </div>
                <h2 className='text-2xl font-bold w-full px-10'>Bữa trưa:</h2>
                <h2 className='text-2xl  w-full px-12'>{menu.dish1}</h2>
                <h2 className='text-2xl  w-full px-12'>{menu.dish2}</h2>
                <h2 className='text-2xl  w-full px-12'>{menu.dish3}</h2>
                <h2 className='text-2xl  w-full px-12'>{menu.dish4}</h2>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
