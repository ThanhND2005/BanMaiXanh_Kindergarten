import { Request, Response } from "express"
import { sql } from "~/libs/DB"
export const getStudentList = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const res1 = await request.query(
      `SELECT s.studentid, s.dob,s.gender,s.height,s.weight,s.age,s.parentid,p.name as parentname,s.avatarurl,s.name,a.date,a.check_in_time,a.check_out_time
      FROM Student s
      LEFT JOIN Parent p on p.userid = s.parentid
      LEFT JOIN Attendance a on a.studentid = s.studentid AND date=GETDATE()
      WHERE deleted ='false'`
    )
    const students = res1.recordset
    return res.status(200).json({ students })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .query(
        `UPDATE Student SET deleted = 'true' WHERE studentid = @studentid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchAvatar = async (req: Request, res: Response) => {
  if (req.file) {
    const avatarUrl = req.file.path
    const { studentid } = req.params
    try {
      const request = new sql.Request()
      await request
        .input('avatarurl', sql.VarChar, avatarUrl)
        .input('studentid', sql.UniqueIdentifier, studentid)
        .query(
          `UPDATE Student SET avatarurl=@avatarurl WHERE studentid=@studentid`
        )
      return res.sendStatus(204)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Lỗi hệ thống')
    }
  }
  else {
    return res.status(400).send('Không tìm thấy thông tin học sinh')
  }
}

export const postStudent = async (req: Request, res: Response) => {
  try {
    const { parentid } = req.params
    const { name, dob, gender, height, weight } = req.body
    const request = new sql.Request()
    await request
      .input('parentid', sql.UniqueIdentifier, parentid)
      .input('name', sql.NVarChar, name)
      .input('dob', sql.Date, dob)
      .input('gender', sql.NVarChar, gender)
      .input('height', sql.Float, height)
      .input('weight', sql.Float, weight)
      .query(
        `INSERT INTO Student (parentid, name, dob,gender,height,weight) VALUES (@parentid, @name,@dob,@gender,@height,@weight)`
      )
    return res.sendStatus(201)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { name, dob, gender, height, weight } = req.body
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('name', sql.NVarChar, name)
      .input('dob', sql.Date, dob)
      .input('gender', sql.NVarChar, gender)
      .input('height', sql.Float, height)
      .input('weight', sql.Float, weight)
      .query(
        `UPDATE Student SET name=@name,
      dob =@dob,
      gender=@gender,
      height=@height,
      weight=@weight
      WHERE studentid = @studentid`
      )
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const registerClass = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { classid } = req.body
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('classid', sql.UniqueIdentifier, classid)
      .query(
        `INSERT INTO ClassManagement (studentid, classid) VALUES (@studentid, @classid)`
      )
    return res.send(201)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const getClass = async (req: Request, res: Response) => {
  const { studentid } = req.params
  try {
    const request = new sql.Request()
    const res1 = await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .query(
        `SELECT c.classid, c.name FROM Class c
      JOIN ClassManagement cm on cm.classid = c.classid
      JOIN Student s on s.studentid = cm.studentid
      WHERE s.studentid = @studentid`
      )
    const classes = res1.recordset
    return res.status(200).json({ classes })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}