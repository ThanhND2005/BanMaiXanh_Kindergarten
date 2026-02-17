import React from "react";
import { UtensilsCrossed } from "lucide-react";
import { useAdminStore } from "@/stores/useAdminStore";

const Menu = () => {
  const menuday = useAdminStore((state) => state.menuday)
  return (
    <div>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {menuday?.map((menu) => (
          <li>
            <div className="bg-[#ffffff] rounded-xl shadow-md flex flex-col justify-center p-4">
              <div>
                <h1 className="text-4xl font-bold text-center">
                  Thứ {menu.day}
                </h1>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Bữa trưa:</h2>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl ">{menu.dish1}</h2>
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl ">{menu.dish2}</h2>
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl ">{menu.dish3}</h2>
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl ">{menu.dish4}</h2>
                <UtensilsCrossed className="h-6 w-6" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
