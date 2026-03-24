import { useAdminStore } from "@/stores/useAdminStore";
import { Beef, CookingPot, IceCreamBowl, Soup } from "lucide-react";
import React from "react";

const Stat = () => {
  const statdishes = useAdminStore((state) => state.statdishes);
  return (
    <div>
      <h1 className="text-4xl mali-bold text-[#006f44]">Các bữa ăn trong tháng:</h1>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {statdishes?.map((stat) => (
          <li
            key={stat.id}
            className="flex flex-col p-4 gap-3 justify-center rounded-2xl shadow-md"
            style={{ backgroundColor: stat.color }}
          >
            <span className="text-4xl mali-bold">
              Ngày {new Date(stat.date).toLocaleDateString("vi-VN")}
            </span>
            <div>
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{stat.dish1}</h2>
                  <CookingPot className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{stat.dish2}</h2>
                  <Soup className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{stat.dish3}</h2>
                  <IceCreamBowl className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl mali-semibold">{stat.dish4}</h2>
                  <Beef className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stat;
