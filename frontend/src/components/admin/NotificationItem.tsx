import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface Notification {
  notificationid: string;
  receiver: string;
  title: string;
  content: string;
  createdat: Date;
}
interface INotificationProps {
  notification: Notification;
}
const NotificationItem = ({ notification }: INotificationProps) => {
  const {
    register: reg,
    handleSubmit: had,
    formState: { errors: err, isSubmitting: isSub },
  } = useForm<Notification>({
    defaultValues: {
      notificationid: notification.notificationid,
      title: notification.title,
      content: notification.content,
      createdat: notification.createdat,
      receiver: notification.receiver,
    },
  });
  const onSubmit1 = async (data: Notification) => {};
  return (
    <div>
      <li className="mb-4">
        <form
          className="grid grid-cols-2 justify-between gap-6 rounded-2xl w-full shadow-md bg-[#ffffff] px-4 py-2"
          onSubmit={had(onSubmit1)}
        >
          <div>
            <h1 className="text-xl font-medium block">
              Người nhận: {notification.receiver}
            </h1>
            <h1 className="text-xl font-medium block">
              Tiêu đề: {notification.title}
            </h1>
            <h1 className="text-xl font-medium block">
              Nội dung: {notification.content}
            </h1>
            <h1 className="text-xl font-medium block">
              ngày gửi: {notification.createdat.toLocaleDateString("vi-VN")}
            </h1>
          </div>
          <div className="flex justify-end items-center">
            <Button
              type="submit"
              className="w-20 bg-[#f52121] rounded-2xl shadow-sm hover:bg-[#9E0C0C] focus:bg-[#f52121] transition all"
              disabled={isSub}
            >
              Xóa
            </Button>
          </div>
        </form>
      </li>
    </div>
  );
};

export default NotificationItem;
