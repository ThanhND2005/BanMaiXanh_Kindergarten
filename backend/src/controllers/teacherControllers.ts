import { Request, Response } from "express";
import { VarChar } from "mssql";
import { sql } from "~/libs/DB";

export const getTeacherList = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const dates = new Date()
    const res1 = await request
      .input('date', sql.Date, dates)
      .query(
        `SELECT t.userid, t.name,t.dob,t.gender,t.address,c.name as classname,c.classid,t.createdat,t.avatarurl,tk.date as timekeeping
        FROM Teacher t 
        LEFT JOIN Class c on c.teacherid = t.userid
        LEFT JOIN TimeKeeping tk on tk.teacherid = t.userid AND tk.date = @date
        JOIN Account a on a.userid = t.userid AND a.deleted = 'false'
        WHERE t.deleted = 'false'
        ORDER t.name DESC`
      )
    const teachers = res1.recordset
    return res.status(200).json({ teachers })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const deleteTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherid } = req.params
    const request = new sql.Request()
    await request
      .input('userid', sql.UniqueIdentifier, teacherid)
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

export const patchTeacher = async (req: Request, res: Response) => {
  try {
    const { teacherid } = req.params
    const { name, dob, gender, address,bank,accountbank } = req.body
    const request = new sql.Request()
    await request
      .input('userid', sql.UniqueIdentifier, teacherid)
      .input('name', sql.NVarChar, name)
      .input('dob', sql.Date, dob)
      .input('gender', sql.NVarChar, gender)
      .input('address', sql.NVarChar, address)
      .input('bank',sql.VarChar,bank)
      .input('accountbank',sql.VarChar,accountbank)
      .query(
        `UPDATE Teacher SET name=@name, dob=@dob,gender=@gender,address=@address,bank=@bank,accountbank = @accountbank
      WHERE userid=@userid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchAvatar = async (req: Request, res: Response) => {
  if (req.file) {
    try {
      const { teacherid } = req.params
      const avatarurl = req.file.path
      const request = new sql.Request()
      await request
        .input('userid', sql.UniqueIdentifier, teacherid)
        .input('avatarurl', sql.VarChar, avatarurl)
        .query(
          `UPDATE Teacher SET avatarurl = @avatarurl WHERE userid=@userid`
        )
      return res.sendStatus(204)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Lỗi hệ thống')
    }
  }
  else {
    return res.sendStatus(404)
  }
}

export const getNotificationList = async (req: Request, res: Response) => {
  try {
    const { teacherid } = req.params
    const request = new sql.Request()
    const res1 = await request
      .input('receiveid', sql.UniqueIdentifier, teacherid)
      .query(
        `SELECT nm.senderid,nm.notificationid,nm.sendername,n.title,n.content,n.createdat
      FROM NotificationManagement nm
      JOIN Notification n on n.notificationid = nm.notificationid AND nm.deleted = 'false'
      WHERE nm.receiveid = @receiveid
      ORDER BY n.createdat DESC`
      )
    const notifications = res1.recordset
    return res.status(200).json({ notifications })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postTimeKeeping = async (req: Request, res: Response) => {
  try {
    const { teacherid } = req.params
    const { code } = req.body
    const today = new Date()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const request = new sql.Request()
    await request
      .input('teacherid', sql.UniqueIdentifier, teacherid)
      .input('code', sql.NVarChar, code)
      .input('month', sql.Int, month)
      .input('day', sql.Date, today)
      .input('year',sql.Int,year)
      .query(
        `IF EXISTS (SELECT 1 FROM Security s WHERE s.code = @code AND s.date = @day AND teacherid = @teacherid)
                  BEGIN
                      INSERT INTO TimeKeeping (teacherid, date, month,year) 
                      VALUES (@teacherid, GETDATE(), @month,@year);
                  END
        `
      )
    return res.status(201).send('Điểm danh thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const getMenu = async (req: Request, res: Response) => {
  try {
    const { day } = req.params
    const request = new sql.Request()
    const res1 = await request
      .input('day', sql.Int, day)
      .query(`SELECT * FROM MENU WHERE day = @day`)
    const menu = res1.recordset[0]
    return res.status(200).json({ menu })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postCheckin = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { classid } = req.body
    const getTime = new Date()
    const getDate = new Date()
    const month = Number(getDate.toISOString().slice(5, 7))
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('classid', sql.UniqueIdentifier, classid)
      .input('date', sql.Date, getDate)
      .input('time', sql.Time, getTime)
      .input('month', sql.Int, month)
      .query(
        `INSERT INTO Attendance (studentid, classid, date,check_in_time,month) VALUES (@studentid, @classid,@date,@time,@month)`
      )
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const postCheckout = async (req: Request, res: Response) => {
  try {
    const { attendanceid } = req.params
    const getTime = new Date()
    const request = new sql.Request()
    await request
      .input('attendanceid', sql.UniqueIdentifier, attendanceid)
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

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { classid } = req.body
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('classid', sql.UniqueIdentifier, classid)
      .query(
        `UPDATE ClassManagement SET deleted ='true' WHERE studentid = @studentid AND classid = @classid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { height, weight } = req.body
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('height', sql.Float, height)
      .input('weight', sql.Float, weight)
      .query(
        `UPDATE Student SET height=@height, weight=@weight WHERE studentid =@studentid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postNotification = async (req: Request, res: Response) => {
  try {
    const { teacherid } = req.params
    const { parentid, content, title, sendername } = req.body
    const request1 = new sql.Request()
    const res1 = await request1
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .query(
        `INSERT INTO Notification (title, content) OUTPUT INSERTED.notificationid VALUES (@title,@content)`
      )
    const newNotificationid = res1.recordset[0].notificationid
    const request2 = new sql.Request()
    const res2 = await request2
      .input('senderid', sql.UniqueIdentifier, teacherid)
      .input('notificationid', sql.UniqueIdentifier, newNotificationid)
      .input('sendername', sql.NVarChar, sendername)
      .input('receiveid', sql.UniqueIdentifier, parentid)
      .query(
        `INSERT INTO NotificationManagement (senderid,notificationid,receiveid,sendername) VALUES (@senderid,@notificationid,@receiveid,@sendername)`
      )
    return res.status(201).send('Tạo thông báo thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const verifyTeacherBill = async (req: Request, res: Response) => {
  try {
    const { salaryid } = req.params
    const request = new sql.Request()
    await request
      .input('salaryid', sql.UniqueIdentifier, salaryid)
      .query(
        `UPDATE Salary SET status='Đã hoàn thành' WHERE salaryid = @salaryid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getStudentList = async (req: Request, res: Response) => {
  const { teacherid } = req.params
  try {
    const day = new Date()
    const request = new sql.Request()
    const res1 = await request
      .input('teacherid', sql.UniqueIdentifier, teacherid)
      .input('date', sql.Date, day)
      .query(
        `SELECT s.studentid, s.dob,s.gender,s.height,s.weight,s.age,s.parentid,p.name as parentname,s.avatarurl,s.name,a.date,a.check_in_time,a.check_out_time,a.attendanceid
      FROM Student s
      JOIN Parent p on p.userid = s.parentid
      LEFT JOIN Attendance a on a.studentid = s.studentid AND date = @date
      JOIN ClassManagement cm on cm.studentid = s.studentid 
      JOIN Class c on c.classid = cm.classid 
      JOIN Teacher t on c.teacherid = t.userid
      WHERE s.deleted ='false' AND t.userid = @teacherid AND cm.deleted = 'false' `
      )
    const students = res1.recordset
    return res.status(200).json({ students })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getAccountBank = async (req: Request, res: Response) => {
  const userid = req.params.userid
  console.log(userid)
  try {
    const request = new sql.Request()
    const res1 = await request
      .input('userid', sql.UniqueIdentifier, userid)
      .query(
        `SELECT bank,accountbank FROM Teacher WHERE userid = @userid AND deleted ='false'`
      )
    const account = res1.recordset[0]
    return res.status(200).json({ account })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}