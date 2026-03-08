import { Request, Response } from "express"
import { sql } from "~/libs/DB"
export const getStudentList = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const day = new Date()
    const res1 = await request.input('day', sql.Date, day).query(
      `SELECT s.studentid,s.heightChange,s.weightChange, s.dob,s.gender,s.height,s.weight,s.age,s.parentid,p.name as parentname,s.avatarurl,s.name,a.date,a.check_in_time,a.check_out_time,a.attendanceid
      FROM Student s
      LEFT JOIN Parent p on p.userid = s.parentid
      LEFT JOIN Attendance a on a.studentid = s.studentid AND a.date=@day
      WHERE s.deleted ='false'
      ORDER BY s.name DESC`
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
    return res.status(204).send('Xóa học sinh thành công')
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
      return res.status(204).send('Thay ảnh đại diện thành công')
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
    const age = new Date().getFullYear() - new Date(dob).getFullYear()
    const request = new sql.Request()
    await request
      .input('parentid', sql.UniqueIdentifier, parentid)
      .input('name', sql.NVarChar, name)
      .input('dob', sql.Date, dob)
      .input('gender', sql.NVarChar, gender)
      .input('height', sql.Float, height)
      .input('weight', sql.Float, weight)
      .input('age', sql.Int, age)
      .query(
        `INSERT INTO Student (parentid, name, dob,gender,height,weight,age) VALUES (@parentid, @name,@dob,@gender,@height,@weight,@age)`
      )
    return res.status(201).send('Tạo thông tin thành công')
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}

export const patchStudent = async (req: Request, res: Response) => {
  try {
    const { studentid } = req.params
    const { name, dob, gender, height, weight } = req.body
    const age = new Date().getFullYear() - new Date(dob).getFullYear()
    const request0 = new sql.Request()
    const res1 = await request0
    .input('studentid',sql.UniqueIdentifier,studentid)
    .query(
      `SELECT * FROM Student WHERE studentid = @studentid`
    )
    const student = res1.recordset[0]
    const heightChange = ((height - student.height) / student.height) * 100
    const weightChange = ((weight - student.weight) / student.weight) * 100
    console.log(heightChange)
    const request = new sql.Request()
    await request
      .input('studentid', sql.UniqueIdentifier, studentid)
      .input('name', sql.NVarChar, name)
      .input('age',sql.Int,age)
      .input('dob', sql.Date, dob)
      .input('gender', sql.NVarChar, gender)
      .input('height', sql.Float, height)
      .input('weight', sql.Float, weight)
      .input('heightChange',sql.Float,heightChange)
      .input('weightChange',sql.Float,weightChange)
      .query(
        `UPDATE Student SET name=@name,
      dob =@dob,
      gender=@gender,
      height=@height,
      weight=@weight,
      age = @age,
      heightChange = @heightChange,
      weightChange = @weightChange
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
        `INSERT INTO ClassManagement (studentid, classid)
                  SELECT @studentid, @classid
                  FROM Class c
                  WHERE c.classid = @classid 
                    AND c.member > c.currentmember;`
      )
    const request2 = new sql.Request()
    await request2
      .input('classid', sql.UniqueIdentifier, classid)
      .query(
        'UPDATE Class SET currentmember = currentmember+1 WHERE classid = @classid'
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