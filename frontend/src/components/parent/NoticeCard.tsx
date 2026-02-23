import { useAdminStore } from "@/stores/useAdminStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useTabParentStore } from "@/stores/useTabStore";
import React from "react";

const NoticeCard = () => {
  const parent = useAuthStore((state) => state.user);
  const { student } = useTabParentStore();
  
  return <div></div>;
};

export default NoticeCard;
