
import { useAdminStore } from "@/stores/useAdminStore";
import MenuCard from "./MenuCard";


const Menu = () => {
  const menuday = useAdminStore((state) => state.menuday)
  
  return (
    <>
      <ul className="grid grid-cols-3 p-4 gap-8">
        {menuday?.map((menu) => (
          <MenuCard key={menu.day} menu={menu}/>
        ))}
      </ul>
    </>
  );
};

export default Menu;
