import { time } from "console";
import { Request, Response, NextFunction } from "express"
import { sql } from "~/libs/DB"
import { qrStorage } from "~/middlewares/cloudMiddleware";
import { Account } from '~/type';
import { randomUUID } from "crypto";
export const getNotificationList = async (req: Request, res: Response) => {
  try {
    const userid = (req as any).user.userid
    const request = new sql.Request()
    const result = await request
      .input('userid', sql.UniqueIdentifier, userid)
      .query(`WITH RankedNotifications AS (
    SELECT 
        m.senderid, 
        m.receiveid, 
        m.notificationid,
        n.title, 
        n.content,
        n.createdat,
        
        ROW_NUMBER() OVER(
            PARTITION BY m.notificationid 
            ORDER BY n.createdat DESC
        ) as rn
    FROM NotificationManagement m
    JOIN Account a ON a.userid = m.senderid 
    JOIN Notification n ON n.notificationid = m.notificationid 
    WHERE a.userid = @userid AND m.deleted = 'false' 
)

SELECT 
    senderid, 
    receiveid, 
    notificationid, 
    title, 
    content, 
    createdat 
FROM RankedNotifications
WHERE rn = 1
ORDER BY createdat DESC;`)
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
    const userid = (req as any).user.userid
    const { title, content, receiver } = req.body
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
          .input('sendername', sql.NVarChar, 'Nhà trường')
          .query(`INSERT INTO NotificationManagement (senderid, notificationid, receiveid,sendername) VALUES (@userid, @notificationid, @receiverid,@sendername)`)

      })
      await Promise.all(insertPromise)
      return res.status(201).send('Tạo thông báo thành công')
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
          .input('sendername', sql.NVarChar, 'Nhà trường')
          .input('notificationid', sql.UniqueIdentifier, notificationid)
          .query(
            `INSERT INTO NotificationManagement (senderid, notificationid, receiveid,sendername) VALUES (@userid,  @notificationid,@receiverid,@sendername)`
          )

      })
      await Promise.all(insertPromise)
      return res.status(201).send('Tạo thông báo thành công')
    }
    else if (receiver === 'Tất cả') {
      const request2 = new sql.Request()
      const res2 = await request2.query(`SELECT * FROM Account WHERE userrole != 'admin' AND deleted = 'false'`)
      const users = res2.recordset
      const insertPromise = users.map(async (user: Account) => {
        const request3 = new sql.Request()
        return request3
          .input('userid', sql.UniqueIdentifier, userid)
          .input('receiverid', sql.UniqueIdentifier, user.userid)
          .input('sendername', sql.NVarChar, 'Nhà trường')
          .input('notificationid', sql.UniqueIdentifier, notificationid)
          .query(
            `INSERT INTO NotificationManagement (senderid, notificationid, receiveid,sendername) VALUES (@userid, @notificationid, @receiverid,@sendername)`
          )

      })
      await Promise.all(insertPromise)
      return res.status(201).send('Tạo thông báo thành công')
    }
    else {
      return res.status(404).send('Không tìm thấy đối tượng')
    }

  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }

}
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const userid = (req as any).user.userid
    const { notificationid } = req.body
    const request1 = new sql.Request()
    await request1
      .input('userid', sql.UniqueIdentifier, userid)
      .input('notificationid', sql.UniqueIdentifier, notificationid)
      .query(
        `UPDATE NotificationManagement SET deleted = 'true' WHERE notificationid = @notificationid`
      )
    return res.status(204).send('Xóa thông báo thành công')
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
        `SELECT c.classid, t.name as teachername, c.teacherid, c.age,c.member, c.currentmember, c.tuition,c.schedule,c.name as classname, c.type,c.deleted FROM Class c
      JOIN Teacher t on t.userid = c.teacherid WHERE c.deleted = 'false' `
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
    return res.status(201).send('Tạo lớp học mới thành công')
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
    return res.status(204).send('Xóa thông báo thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getMenu = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const res1 = await request.query(`SELECT * FROM Menu`)
    const menu = res1.recordset
    return res.status(200).json({ menu })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchMenu = async (req: Request, res: Response) => {
  try {
    const day = req.params.day
    const { dish1, dish2, dish3, dish4 } = req.body
    const request = new sql.Request()
    const res1 = await request
      .input('day', sql.Int, day)
      .input('dish1', sql.NVarChar, dish1)
      .input('dish2', sql.NVarChar, dish2)
      .input('dish3', sql.NVarChar, dish3)
      .input('dish4', sql.NVarChar, dish4)
      .query(
        `UPDATE Menu set dish1 = @dish1, dish2 = @dish2, dish3 = @dish3, dish4 = @dish4 WHERE day = @day`
      )
    return res.status(204).send('Chỉnh sửa thực đơn thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getStudentBill = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const res1 = await request.query(
      ` SELECT t.tuitionid, 
      t.studentid, 
      t.amount as tuition, 
      t.billurl, 
      t.qrurl, 
      t.createdat, 
      t.month, 
      t.year,
      p.userid as parentid,
      p.name as parentName, 
      s.name as studentName, 
      s.dob,
      s.gender,
      t.status,
      s.avatarurl,
      t.attendance,
      t.classes
      FROM Tuition t
      JOIN Student s on t.studentid = s.studentid AND s.deleted= 'false'
      JOIN Parent p on p.userid = s.parentid AND p.deleted='false'
      WHERE t.deleted = 'false'
      ORDER BY t.createdat DESC
      `
    )
    const studentbills = res1.recordset
    return res.status(200).json({ studentbills })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const getTeacherBill = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const res1 = await request.query(
      `SELECT
      t.salaryid,
      t.teacherid,
      t.month,
      tc.name as teacherName,
      tc.userid,
      tc.dob,
      tc.gender,
      tc.address,
      c.name as className,
      t.allowance,
      t.status,
      tc.avatarurl,
      t.amount,
      t.timekeeping,
      t.qrurl
      FROM Salary t
      JOIN Teacher tc on t.teacherid = tc.userid AND tc.deleted ='false'
      JOIN Class c on c.teacherid = tc.userid AND c.deleted='false'
      WHERE t.deleted = 'false'
      ORDER BY t.paidat DESC
      `
    )
    const teacherbills = res1.recordset
    return res.status(200).json({ teacherbills })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const verifyStudentBill = async (req: Request, res: Response) => {
  try {
    const { tuitionid } = req.params
    const request1 = new sql.Request()
    await request1
      .input('tuitionid', sql.UniqueIdentifier, tuitionid)
      .query(`UPDATE Tuition SET status = 'Đã hoàn thành' WHERE tuitionid = @tuitionid`)
    return res.status(204).send('Xác nhận hóa đơn thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const deleteStudentBill = async (req: Request, res: Response) => {
  try {
    const { tuitionid } = req.params
    const request = new sql.Request()
    await request
      .input('tuitionid', sql.UniqueIdentifier, tuitionid)
      .query(`UPDATE Tuition SET deleted ='true' WHERE tuitionid = @tuitionid`)
    return res.status(204).send('Xóa hóa đơn thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const postStudentBill = async (req: Request, res: Response) => {
  try {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const request1 = new sql.Request()
    const res1 = await request1.query(`SELECT studentid,name FROM Student WHERE deleted ='false'`)
    const students = res1.recordset
    for (let i = 0; i < students.length; i++) {
      const request2 = new sql.Request()
      const res2 = await request2
        .input('month', sql.Int, month)
        .input('year', sql.Int, year)
        .input('studentid', sql.UniqueIdentifier, students[i].studentid)
        .query(
          `SELECT COUNT(*) as attendance FROM Attendance WHERE month=@month AND year=@year AND studentid = @studentid`
        )
      const attendance = res2.recordset[0].attendance
      const request3 = new sql.Request()
      const res3 = await request3
        .input('studentid', sql.UniqueIdentifier, students[i].studentid)
        .query(
          `SELECT cm.classid, c.name, c.tuition FROM ClassManagement cm 
        JOIN Class c on c.classid = cm.classid AND c.deleted = 'false'
        WHERE cm.deleted = 'false' AND studentid = @studentid`
        )
      const classes = res3.recordset
      let classnames: string = ''
      let amount: number = 0
      for (let i = 0; i < classes.length; i++) {
        classnames += `${classes[i].name} : ${classes[i].tuition} vnđ,`
        amount += classes[i].tuition
      }
      if (attendance < 9) {
        amount /= 2
      }
      if (attendance == 0) {
        continue
      }
      const tuitionid = randomUUID()
      const url = `https://img.vietqr.io/image/mbbank-0334477715-print.png?amount=${amount}&addInfo=${tuitionid}&accountName=MAM%20NON%20BAN%20MAI%20XANH`
      const qrUrl = await qrStorage(url)
      const request4 = new sql.Request()
      await request4
        .input('studentid', sql.UniqueIdentifier, students[i].studentid)
        .input('amount', sql.Int, amount)
        .input('qrurl', sql.NVarChar, qrUrl)
        .input('month', sql.Int, month)
        .input('year', sql.Int, year)
        .input('classes', sql.NVarChar, classnames)
        .input('attendance', sql.Int, attendance)
        .input('tuitionid',sql.UniqueIdentifier,tuitionid)
        .query(
          `INSERT INTO Tuition (tuitionid,studentid, amount, qrurl, month, year, classes, attendance) VALUES (@tuitionid,@studentid, @amount, @qrurl,@month,@year,@classes,@attendance)`
        )
    }
    return res.status(201).send('Tạo hóa đơn học phí thành công')

  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const postTeacherBill = async (req: Request, res: Response) => {
  try {
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()
    const request1 = new sql.Request()
    const res1 = await request1.query(
      `SELECT * FROM Class WHERE deleted ='false'`
    )
    const classes = res1.recordset
    for (let i = 0; i < classes.length; i++) {
      const request2 = new sql.Request()
      const res2 = await request2
        .input('teacherid', sql.UniqueIdentifier, classes[i].teacherid)
        .input('month', sql.Int, month)
        .input('year', sql.Int, year)
        .query(
          `SELECT COUNT(*) as timekeeping FROM TimeKeeping WHERE teacherid = @teacherid AND month=@month AND year = @year `
        )
      const timekeeping = res2.recordset[0].timekeeping
      if (timekeeping == 0) {
        continue
      }
      const request4 = new sql.Request()
      const res4 = await request4
        .input('userid', sql.UniqueIdentifier, classes[i].teacherid)
        .query(
          'SELECT * FROM Teacher WHERE userid = @userid'
        )
      const teacher = res4.recordset[0]
      if (teacher.bank === null || teacher.accountbank === null) {
        continue
      }
      const salaryid = randomUUID()
      const allowance = 2000
      const amount = 2000 * timekeeping + allowance
      const url = `https://img.vietqr.io/image/${teacher.bank}-${teacher.accountbank}-print.png?amount=${amount}&addInfo=${salaryid}&accountName=${teacher.name}`
      const qrUrl = await qrStorage(url)
      const request3 = new sql.Request()
      await request3
        .input('teacherid', sql.UniqueIdentifier, classes[i].teacherid)
        .input('allowance', sql.Int, allowance)
        .input('amount', sql.Int, amount)
        .input('timekeeping', sql.Int, timekeeping)
        .input('month', sql.Int, month)
        .input('year', sql.Int, year)
        .input('qrurl', sql.VarChar, qrUrl)
        .input('salaryid',sql.UniqueIdentifier,salaryid)
        .query(
          `INSERT INTO Salary (salaryid,teacherid, allowance, amount, timekeeping, month,year,qrurl) VALUES (@salaryid,@teacherid, @allowance, @amount, @timekeeping, @month,@year,@qrurl)`
        )
    }

    return res.status(201).send('Tạo hóa đơn thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const deleteTeacherBill = async (req: Request, res: Response) => {
  try {
    const { salaryid } = req.params
    const request = new sql.Request()
    await request
      .input('salaryid', sql.UniqueIdentifier, salaryid)
      .query(
        `UPDATE Salary SET deleted = 'true' WHERE salaryid = @salaryid`
      )
    return res.status(204).send('Xóa hóa đơn thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getCode = async (req: Request, res: Response) => {
  try {

    const today = new Date()
    const request = new sql.Request()
    const res0 = await request.query(`SELECT userid FROM Teacher WHERE deleted ='false'`)
    const teachers = res0.recordset
    for (let i = 0; i < teachers.length; i++) {
      const request1 = new sql.Request()
      const code = (Math.floor(Math.random() * 9000) + 1000).toString()
      await request1
        .input('code', sql.NVarChar, code)
        .input('day', sql.Date, today)
        .input('teacherid', sql.UniqueIdentifier, teachers[i].userid)
        .query(
          `IF NOT EXISTS(
        SELECT 1 FROM Security WHERE date = @day AND teacherid = @teacherid
      )
      BEGIN
        INSERT INTO Security (code,date,teacherid) VALUES (@code,@day,@teacherid)
      END`
        )
    }
    const request2 = new sql.Request()
    const res1 = await request2
      .input('day', sql.Date, today)
      .query(
        'SELECT * FROM Security WHERE date = @day'
      )
    const security = res1.recordset
    return res.status(200).json({ security })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}