import { Request, Response } from "express"
import { sql } from "~/libs/DB"
export const postNotification = async (req: Request, res: Response) => {
  try {
    const { parentid } = req.params
    const { teacherid, content, title,sendername} = req.body
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
      .input('senderid', sql.UniqueIdentifier, parentid)
      .input('notificationid', sql.UniqueIdentifier, newNotificationid)
      .input('receiveid', sql.UniqueIdentifier, teacherid)
      .input('sendername',sql.NVarChar,sendername)
      .query(
        `INSERT INTO NotificationManagement (senderid,notificationid,receiveid,sendername) VALUES (@senderid,@notificationid,@receiveid,@sendername)`
      )

    return res.status(201).send('Tạo thông báo thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchAvatar = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const { parentid } = req.params
      const avtarurl = req.file.path
      const request = new sql.Request()
      await request
        .input('parentid', sql.UniqueIdentifier, parentid)
        .input('avatarurl', sql.NVarChar, avtarurl)
        .query(
          `UPDATE Parent SET avatarurl = @avatarurl WHERE userid = @parentid`
        )
      return res.status(204).send('Cập nhập avatar thành công')
    }
    else {
      return res.status(404).send('Không tìm thấy thông tin người gửi')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getNotificationList = async (req: Request, res: Response) => {
  try {
    const { parentid } = req.params
    const request = new sql.Request()
    const res1 = await request
      .input('receiveid', sql.UniqueIdentifier, parentid)
      .query(
        `SELECT nm.senderid,nm.sendername,nm.notificationid,n.title,n.content,n.createdat
      FROM NotificationManagement nm
      JOIN Notification n on n.notificationid = nm.notificationid
      WHERE nm.receiveid = @receiveid AND nm.deleted = 'false'
      ORDER BY n.createdat DESC`
      )
    const notifications = res1.recordset
    return res.status(200).json({ notifications })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const patchStudentBill = async (req: Request, res: Response) => {
  if (req.file) {
    try {
      const { tuitionid } = req.params
      const billurl = req.file.path
      const request = new sql.Request()
      await request
        .input('tuitionid', sql.UniqueIdentifier, tuitionid)
        .input('billurl', sql.VarChar, billurl)
        .query(
          `UPDATE Tuition SET billurl = @billurl WHERE tuitionid=@tuitionid`
        )
      return res.status(204).send('Gửi hóa đơn thành công')
    } catch (error) {
      console.error(error)
      return res.status(500).send('Lỗi hệ thống')
    }
  }
  else {
    return res.send(404)
  }
}
export const patchParent = async (req: Request, res: Response) => {
  const { parentid } = req.params
  const { name, dob, address, gender } = req.body
  try {
    const request1 = new sql.Request()
    await request1
      .input('userid', sql.UniqueIdentifier, parentid)
      .input('name', sql.NVarChar, name)
      .input('dob', sql.Date, dob)
      .input('address', sql.NVarChar, address)
      .input('gender', sql.NVarChar, gender)
      .query('UPDATE Parent SET name=@name, dob=@dob,address=@address,gender=@gender WHERE userid = @userid')
    return res.status(204).send('Thay đổi thông tin thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}