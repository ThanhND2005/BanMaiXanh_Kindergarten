import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger,DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import TeacherCard from "./TeacherCard";





const teachers = [
  {
    userid: "001",
    name: "Nguyen Van An",
    dob: new Date("2005-01-01"),
    gender: "Nam",
    address: "Ha Noi",
    classname: "Vo",
    createdat: new Date("2025-01-02"),
    avatarurl:
      "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    deleted: 'false'
  },
  {
    userid: "002",
    dob: new Date("2005-01-01"),
    name: "Nguyen Thi Van",
    gender: "Nu",
    address: "Nghe An",
    classname: "Mi Thuat",
    createdat: new Date("2025-01-02"),
    avatarurl:
      "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    deleted: 'false'
  },
  {
    userid: "003",
    dob: new Date("2005-01-01"),
    name: "Nguyen Thi Lan",
    gender: "Nu",
    address: "Nghe An",
    classname: "Mam 2",
    createdat: new Date("2025-01-02"),
    avatarurl:
      "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    deleted: 'false'
  },
  {
    userid: "004",
    dob: new Date("2005-01-01"),
    name: "Nguyen Thi Ha",
    gender: "Nu",
    address: "Ha Noi",
    classname: "Choi 1",
    createdat: new  Date("2025-01-02"),
    avatarurl:
      "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    deleted: 'false'
  },
  {
    userid: "005",
    dob: new Date("2005-01-01"),
    name: "Nguyen Thi Van",
    gender: "Nu",
    address: "Nghe An",
    classname: "Am nhac",
    createdat: new Date("2025-01-02"),
    avatarurl:
      "https://i.pinimg.com/1200x/b3/c2/77/b3c2779d6b6195793b72bf73e284b3e8.jpg",
    deleted: 'false'
  },
];
const TeacherManagement = () => {
  
  
  
  return (
    <>
      <h1 className="text-4xl itim-regular mb-4">
        Các giáo viên trong hệ thống:
      </h1>
      <ul className="grid grid-cols-4 gap-8">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.userid} teacher={teacher}/>
        ))}
      </ul>
    </>
  );
};

export default TeacherManagement;
