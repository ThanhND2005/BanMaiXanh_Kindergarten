import { Input } from '@/components/ui/input';
import { Request, Response, NextFunction } from "express"
import { sql } from "~/libs/DB"
import { Account } from '~/type';

export const getNotificationList = async (req: Request, res: Response) => {
  try {
    const userid = (req as any).user.userid
    const request = new sql.Request()
    const result = await request
      .input('userid', sql.UniqueIdentifier, userid)
      .query(`SELECT m.senderid, m.receiveid ,m.notificationid,n.title, n.content,n.createdat from NotificationManagement m
  join Account a on a.@userid = m.senderid 
  join Notification n  on n.notificationid  = m.notificationid 
  where m.deleted = 'false'`)
    const notifications = result.recordset
    if (!notifications) {
      return res.status(404).send('Không có thông báo liên quan đến đối tượng')
    }
    return res.status(200).json({ notifications })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const postNotification = async (req: Request, res: Response) => {
  try {
    const { userid, title, content, receiver } = req.body
    const request1 = new sql.Request()
    const res1 = await request1
      .input('title', sql.NVarChar, title)
      .input('content', sql.NVarChar, content)
      .query(`INSERT INTO Notification (title, content) OUTPUT INSERTED.notificationid VALUES(@title,@content)`)
    const notificationid = res1.recordset[0].notificationid

    if (receiver === 'Giáo viên') {
      const request2 = new sql.Request()
      const res2 = await request2.query(`SELECT * FROM Account WHERE userrole = 'teacher' AND deleted = 'false'`)
      const users = res2.recordset
      const insertPromise = users.map(async (user: Account) => {
        const request3 = new sql.Request()
        return request3
          .input('userid', sql.UniqueIdentifier, userid)
          .input('receiverid', sql.UniqueIdentifier, user.userid)
          .input('notificationid', sql.UniqueIdentifier, notificationid)
          .query(`INSERT INTO NotificationManagement (senderid, notificationid, receiveid) VALUES (@userid, @receiverid, @notificationid)`)

      })
      await Promise.all(insertPromise)
      return res.sendStatus(201)
    }
    if (receiver === 'Phụ huynh') {
      const request2 = new sql.Request()
      const res2 = await request2.query(`SELECT * FROM Account WHERE userrole = 'parent' AND deleted = 'false'`)
      const users = res2.recordset
      const insertPromise = users.map(async (user: Account) => {
        const request3 = new sql.Request()
        return request3
          .input('userid', sql.UniqueIdentifier, userid)
          .input('receiverid', sql.UniqueIdentifier, user.userid)
          .input('notificationid', sql.UniqueIdentifier, notificationid)
          .query(
            `INSERT INTO NotificationManagement (senderid, notificationid, receiveid) VALUES (@userid, @receiverid, @notificationid)`
          )

      })
      await Promise.all(insertPromise)
      return res.sendStatus(201)
    }
    else {
      const request2 = new sql.Request()
      const res2 = await request2.query(`SELECT * FROM Account WHERE userrole != 'admin' AND deleted = 'false'`)
      const users = res2.recordset
      const insertPromise = users.map(async (user: Account) => {
        const request3 = new sql.Request()
        return request3
          .input('userid', sql.UniqueIdentifier, userid)
          .input('receiverid', sql.UniqueIdentifier, user.userid)
          .input('notificationid', sql.UniqueIdentifier, notificationid)
          .query(
            `INSERT INTO NotificationManagement (senderid, notificationid, receiveid) VALUES (@userid, @receiverid, @notificationid)`
          )

      })
      await Promise.all(insertPromise)
      return res.sendStatus(201)
    }

  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }

}
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { userid, receiverid, notificationid } = req.body
    const request1 = new sql.Request()
    await request1
      .input('userid', sql.UniqueIdentifier, userid)
      .input('receiverid', sql.UniqueIdentifier, receiverid)
      .input('notificationid', sql.UniqueIdentifier, notificationid)
      .query(
        `UPDATE NotificationManagement SET deleted = 'true' WHERE senderid = @userid AND receiveid = @receiverid AND notificationid = @notificationid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const getClassList = async (req: Request, res: Response) => {
  try {
    const request1 = new sql.Request()
    const res1 = await request1
      .query(
        `SELECT c.classid, t.teachername, c.teacherid, c.age,c.member, c.currentmember, c.tuition,c.schedule,c.name, c.type,c.deleted FROM Class c
      JOIN Teacher t on t.userid = c.teacherid WHERE deleted = 'false'`
      )
    const classes = res1.recordset
    return res.status(200).json({ classes })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const postClass = async (req: Request, res: Response) => {
  const { teacherid, age, member, tuition, schedule, name, type } = req.body
  try {
    const request1 = new sql.Request()
    await request1
      .input('teacherid', sql.UniqueIdentifier, teacherid)
      .input('age', sql.Int, age)
      .input('member', sql.Int, member)
      .input('tuition', sql.Int, tuition)
      .input('schedule', sql.NVarChar, schedule)
      .input('name', sql.NVarChar, name)
      .input('type', sql.NVarChar, type)
      .query(
        `INSERT INTO Class (teacherid, age, member,currentmember,tuition,schedule,name,type) VALUES (@teacherid,@age,@member,0,@tuition,@schedule,@name,@type)`
      )
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const deleteClass = async (req: Request, res: Response) => {
  try {
    const { classid } = req.body
    const request1 = new sql.Request()
    await request1
      .input('classid', sql.UniqueIdentifier, classid)
      .query(
        `BEGIN TRANSACTION;
          BEGIN TRY
          UPDATE ClassManagement SET deleted = 'true' WHERE classid =@classid 
          UPDATE Class SET deleted ='true' WHERE classid = @classid 
          COMMIT TRANSACTION;
          END TRY
          BEGIN CATCH            
            ROLLBACK TRANSACTION;
            THROW; 
          END CATCH`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}