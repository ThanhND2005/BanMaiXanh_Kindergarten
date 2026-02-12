import { Request, Response } from "express";
import { sql } from "~/libs/DB";

export const getTeacherList = async (req : Request, res : Response) =>{
  try {
      const request = new sql.Request()
      const dates = new Date()
      const res1 = await request
      .input('date',sql.Date,dates)
      .query(
        `SELECT t.userid, t.name,t.dob,t.gender,t.address,c.name as classname,c.classid,t.createdat,t.avatarurl,tk.date as timekeeping
        FROM Teacher t 
        LEFT JOIN Class c on c.teacherid = t.userid
        LEFT JOIN TimeKeeping tk on tk.teacherid = t.userid AND tk.date = @date
        WHERE t.deleted = 'false'`
      )
      const teachers  = res1.recordset
      return res.status(200).json({teachers})
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const deleteTeacher = async (req: Request, res: Response) =>{
  try {
    const {teacherid} = req.params
    const request = new sql.Request()
    await request
    .input('userid',sql.UniqueIdentifier,teacherid)
    .query(
      `UPDATE Teacher SET deleted='true' WHERE userid = @userid
      UPDATE Account SET deleted = 'true' WHERE userid=@userid`
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchTeacher = async (req : Request, res: Response ) =>{
  try {
    const {teacherid} = req.params
    const {name, dob, gender,address} = req.body
    const request =  new sql.Request()
    await request
    .input('userid',sql.UniqueIdentifier, teacherid)
    .input('name',sql.NVarChar,name)
    .input('dob',sql.Date,dob)
    .input('gender',sql.NVarChar,gender)
    .input('address',sql.NVarChar,address)
    .query(
      `UPDATE Teacher SET name=@name, dob=@dob,gender=@gender,address=@address 
      WHERE userid=@userid` 
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchAvatar = async (req : Request, res : Response) =>{
  if(req.file)
  {
    try {
      const {teacherid} =req.params
      const avatarurl = req.file.path
      const request = new sql.Request()
      await request
      .input('userid',sql.UniqueIdentifier,teacherid)
      .input('avatarurl',sql.VarChar,avatarurl)
      .query(
        `UPDATE Teacher SET avatarurl = @avatarurl WHERE userid=@userid`
      )
      return res.sendStatus(204)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Lỗi hệ thống')
    }
  }
  else
  {
    return res.sendStatus(404)
  }
}

export const getNotificationList = async (req : Request, res : Response) =>{
  try {
    const {teacherid} = req.params
    const request = new sql.Request()
    const res1 = await request
    .input('receiveid',sql.UniqueIdentifier,teacherid)
    .query(
      `SELECT nm.senderid,nm.notificationid,n.title,n.content,n.createdat
      FROM NotificationManagement nm
      JOIN Notification n on n.notificationid = nm.notificationid
      WHERE nm.receiveid = @receiveid`
    )
    const notifications = res1.recordset
    return res.status(200).json({notifications})
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postTimeKeeping = async (req : Request, res : Response) =>{
  try {
    const {teacherid} = req.params
    const request = new sql.Request()
    await request
    .input('teacherid',sql.UniqueIdentifier,teacherid)
    .query(
      `INSERT INTO TimeKeeping (teacherid, date, month) VALUES (@teacherid, GETDATE(), 2)`
    )
    return res.status(201).send('Điểm danh thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const getMenu = async (req : Request, res : Response) =>{
  try {
    const {day} = req.params 
    const request =  new sql.Request()
    const res1 = await request
    .input('day',sql.Int,day)
    .query(`SELECT * FROM MENU WHERE day = @day`)
    const menu = res1.recordset[0]
    return res.status(200).json({menu})
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postCheckin = async (req : Request, res : Response) =>{
  try {
    const {studentid}= req.params
    const {classid} =req.body
    const getTime = new Date()
    const getDate = new Date()
    const month = Number(getDate.toISOString().slice(5,7))
    const request = new sql.Request()
    await request
    .input('studentid', sql.UniqueIdentifier,studentid)
    .input('classid',sql.UniqueIdentifier,classid)
    .input('date',sql.Date,getDate)
    .input('time',sql.Time,getTime)
    .input('month',sql.Int,month)
    .query(
      `INSERT INTO Attendance (studentid, classid, date,check_in_time,month) VALUES (@studentid, @classid,@date,@time,@month)`
    )
    return res.sendStatus(201)  
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const postCheckout = async (req: Request ,res: Response) =>{
  try {
    const {attendanceid} = req.params 
    const getTime = new Date()
    const request =  new sql.Request()
    await request 
    .input('attendanceid',sql.UniqueIdentifier,attendanceid)
    .input('time', sql.Time, getTime)
    .query(
      `UPDATE Attendance SET check_out_time = @time WHERE attendanceid = @attendanceid`
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const deleteStudent = async (req : Request, res : Response) =>{
  try {
    const {studentid} = req.params
    const {classid} =req.body
    const request = new sql.Request()
    await request 
    .input('studentid',sql.UniqueIdentifier,studentid)
    .input('classid',sql.UniqueIdentifier,classid)
    .query(
      `UPDATE ClassManagement SET deleted ='true' WHERE studentid = @studentid AND classid = @classid`
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchStudent = async (req : Request, res : Response) =>{
  try {
    const {studentid} = req.params
    const {height, weight} = req.body
    const request = new sql.Request()
    await request
    .input('studentid',sql.UniqueIdentifier,studentid)
    .input('height', sql.Float,height)
    .input('weight',sql.Float,weight)
    .query(
      `UPDATE Student SET height=@height, weight=@weight WHERE studentid =@studentid`
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postNotification = async (req : Request, res: Response) =>{
  try {
    const {teacherid} = req.params
    const {parentid,content,title} = req.body
    const request1 = new sql.Request()
    const res1 = await request1
    .input('title',sql.NVarChar,title)
    .input('content',sql.NVarChar,content)
    .query(
      `INSERT INTO Notification (title, content) OUTPUT INSERTED.notificationid VALUES (@title,@content)`
    )
    const newNotificationid = res1.recordset[0].notificationid 
    const request2 = new sql.Request()
    const res2 = await request2
    .input('senderid',sql.UniqueIdentifier,teacherid)
    .input('notificationid',sql.UniqueIdentifier,newNotificationid)
    .input('receiveid',sql.UniqueIdentifier,parentid)
    .query(
      `INSERT INTO NotificationManagement (senderid,notificationid,receiveid) VALUES (@senderid,@notificationid,@receiveid)`
    )
    return res.status(201).send('Tạo thông báo thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const verifyTeacherBill = async (req : Request, res: Response) =>{
  try {
    const {salaryid} = req.params
    const request =  new sql.Request()
    await request
    .input('salaryid',sql.UniqueIdentifier,salaryid)
    .query(
      `UPDATE Salary SET status='Đã hoàn thành' WHERE salaryid = @salaryid`
    )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}