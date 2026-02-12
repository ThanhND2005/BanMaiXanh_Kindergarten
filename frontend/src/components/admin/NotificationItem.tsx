import { useAdminStore } from "@/stores/useAdminStore";
import { Button } from "../ui/button";
import type { Notification } from "@/types/Admin";
import { adminService } from "@/services/adminService";

interface INotificationProps {
  notification: Notification;
}
const NotificationItem = ({ notification }: INotificationProps) => {
  const {refreshNotifications} = useAdminStore()
  const onDelete = async (notificationid : string,receiverid : string) => {
    await adminService.deleteNotification(notificationid,receiverid)
    await refreshNotifications()
  };
  return (
    <div>
      <li className="mb-4">
        <div className="grid grid-cols-2 justify-between gap-6 rounded-2xl w-full shadow-md bg-[#ffffff] px-4 py-2">
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-medium text-[#828282]">
              Người nhận: {notification.receiveid}
            </h1>
            <h1 className="text-xl font-medium">
              Tiêu đề: {notification.title}
            </h1>
            <h1 className="text-xl font-medium">
              Nội dung: {notification.content}
            </h1>
            <h1 className="text-xl font-medium text-[#828282]">
              ngày gửi: {new Date(notification.createdat).toLocaleDateString("vi-VN")}
            </h1>
          </div>
          <div className="flex justify-end items-center">
            <Button
              type="button"
              className="w-20 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
              onClick={() => onDelete(notification.notificationid,notification.receiveid)}
            >
              Xóa
            </Button>
          </div>
        </div>
      </li>
    </div>
  );
};

export default NotificationItem;
