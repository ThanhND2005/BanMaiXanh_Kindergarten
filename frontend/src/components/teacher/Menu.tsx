import React from "react";
import { Beef, CookingPot, IceCreamBowl, Soup,  } from "lucide-react";
import { useTeacherStore } from "@/stores/useTeacherStore";

const Menu = () => {
  const menuday = useTeacherStore((state) => state.menuday)
  return (
    <div>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {menuday?.map((menu) => (
          <li>
            <div className="rounded-xl shadow-md flex flex-col justify-center p-4" style={{backgroundColor: menu.color}}>
              <div>
                <h1 className="text-4xl mali-bold text-center">
                  Thứ {menu.day}
                </h1>
              </div>
              
              <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu.dish1}</h2>
                  <CookingPot className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu.dish2}</h2>
                  <Soup className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu.dish3}</h2>
                  <IceCreamBowl className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{menu.dish4}</h2>
                  <Beef className="h-6 w-6 text-gray-500" />
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
