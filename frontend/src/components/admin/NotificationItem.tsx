import { useAdminStore } from "@/stores/useAdminStore";
import { Button } from "../ui/button";
import type { Notification } from "@/types/Admin";
import { adminService } from "@/services/adminService";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";

interface INotificationProps {
  notification: Notification;
}
const NotificationItem = ({ notification }: INotificationProps) => {
  const [open, setOpen] = useState(false)
  const {refreshNotifications} = useAdminStore()
  const onDelete = async (notificationid : string) => {
    await adminService.deleteNotification(notificationid)
    await refreshNotifications()
    setOpen(false)
  };
  return (
    <div>
      <li className="mb-4">
        <div className="grid grid-cols-2 justify-between gap-6 rounded-2xl w-full shadow-md bg-[#ffffff] px-4 py-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl mali-semibold">
              Tiêu đề: {notification.title}
            </h1>
            <h1 className="text-xl mali-semibold">
              Nội dung: {notification.content}
            </h1>
            <h1 className="text-xl mali-medium text-[#828282]">
              Ngày gửi: {new Date(notification.createdat).toLocaleDateString("vi-VN")}
            </h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex justify-end items-center">
                <Button
                  variant="outline"
                  className="w-20 bg-[#f52121] text-white rounded-2xl shadow-sm hover:bg-[#982410] hover:text-white focus:bg-[#f52121] "
                >
                  Xóa
                </Button>
              </div>

            </DialogTrigger>
            <DialogContent>
              <h1 className="text-2xl mali-bold">Bạn chắc chắn muốn xóa thông báo này ?</h1>
              <div className="w-full flex justify-end">
                <div className="flex justify-between w-35">

              <Button type="button" className="rounded-2xl" onClick={() => setOpen(false)}>Hủy</Button>
              <Button type="button" className=" bg-[#f52121] text-white rounded-2xl shadow-sm hover:bg-[#982410] hover:text-white focus:bg-[#f52121] " onClick={() => onDelete(notification.notificationid)}>Xóa</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </li>
    </div>
  );
};

export default NotificationItem;
