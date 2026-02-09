import { Request,Response } from "express"
import { sql } from "~/libs/DB"
export const postNotification = async (req : Request, res: Response) =>{
  try {
    const {parentid} = req.params
    const {teacherid,content,title} = req.body
    const request1 = new sql.Request()
    const res1 = await request1
    .input('title',sql.NVarChar,title)
    .input('content',sql.NVarChar,content)
    .query(
      `INSERT INTO Notification (title, content) OUTPUT INSERTED.notificationid (@title,@content)`
    )
    const newNotificationid = res1.recordset[0].notificationid 
    const request2 = new sql.Request()
    const res2 = await request2
    .input('senderid',sql.UniqueIdentifier,parentid)
    .input('notificationid',sql.UniqueIdentifier,newNotificationid)
    .input('receiveid',sql.UniqueIdentifier,teacherid)
    .query(
      `INSERT INTO NotificationManagement (senderid,notificationid,receiveid) (@senderid,@notificationid,@receiveid)`
    )
    const notification = res2.recordset[0]
    return res.status(201).send({notification})
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchAvatar = async (req: Request, res: Response) =>{
  try {
    if(req.file)
    {
      const {parentid} = req.params
      const avtarurl = req.file.path
      const request = new sql.Request()
      await request
      .input('parentid',sql.UniqueIdentifier,parentid)
      .input('avatarurl',sql.NVarChar,avtarurl)
      .query(
        `UPDATE Parent SET avatarurl = @avatarurl WHERE userid = @parentid`
      )
      return res.sendStatus(204)
    }
    else{
      return res.status(404).send('Không tìm thấy thông tin người gửi')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getNotificationList = async (req : Request, res : Response) =>{
  try {
    const {parentid} = req.params
    const request = new sql.Request()
    const res1 = await request
    .input('receiveid',sql.UniqueIdentifier,parentid)
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
export const patchStudentBill=  async (req : Request, res : Response ) =>{
  if(req.file)
  {
    try {
      const {tuitionid} = req.params
      const billurl= req.file.path
      const request  = new sql.Request()
      await request
      .input('tuitionid',sql.UniqueIdentifier,tuitionid)
      .input('billurl',sql.VarChar,billurl)
      .query(
        `UPDATE Tuition SET billurl = @billurl WHERE tuitionid=@tuitionid`
      )
      return res.sendStatus(204)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Lỗi hệ thống')
    }
  }
  else{
    return res.send(404)
  }
}