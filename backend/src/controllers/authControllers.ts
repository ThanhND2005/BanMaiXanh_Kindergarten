import { Request, Response } from "express";
import cryto from 'crypto'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sql } from '../libs/DB'


export const signup = async (req: Request, res: Response) => {
  const transaction = new sql.Transaction()
  try {

    const { name, address, dob, gender, username, password, role } = req.body
    const request = new sql.Request(transaction)
    await transaction.begin()
    const result = await request.input('username', sql.NVarChar, username).query('SELECT * FROM Account WHERE username = @username')
    const duplicate = result.recordset[0]
    if (duplicate) {
      return res.status(409).json({ message: 'Tài khoản đã tồn tại' })
    }
    const hashPassWord = await bcrypt.hash(password, 10)
    const request2 = new sql.Request()
    const res1 = await request2
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashPassWord)
      .input('userrole', sql.VarChar, role)
      .query(`INSERT INTO Account (username,hashpassword,userrole) OUTPUT INSERTED.userid VALUES(@username,@password,@userrole)`)
    const newAccountid = res1.recordset[0].userid
    const dateDob = new Date(dob)
    const request3 = new sql.Request()
    if (role === 'parent') {

      await request3
        .input('userid', sql.UniqueIdentifier, newAccountid)
        .input('name', sql.NVarChar, name)
        .input('gender', sql.NVarChar, gender)
        .input('address', sql.NVarChar, address)
        .input('dob', sql.Date, dateDob)
        .query(`INSERT INTO Parent (userid,name,dob, gender,address) VALUES(@userid,@name,@dob,@gender,@address)`)
    }
    else {
      await request3
        .input('userid', sql.UniqueIdentifier, newAccountid)
        .input('name', sql.NVarChar, name)
        .input('gender', sql.NVarChar, gender)
        .input('address', sql.NVarChar, address)
        .input('dob', sql.Date, dateDob)
        .query(`INSERT INTO Teacher (userid,name,dob, gender,address  ) VALUES(@userid, @name,@dob,@gender,@address)`)
    }
    await transaction.commit()
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const request = new sql.Request()
    const res1 = await request
      .input('username', sql.VarChar, username)
      .query(`SELECT * FROM Account WHERE username = @username AND deleted ='false'`)
    const account = res1.recordset[0]
    if (!account) {
      return res.status(401).send('Thông tin tài khoản hoặc mật khẩu không chính xác !')
    }
    const passwordCorrect = await bcrypt.compare(password, account.hashpassword)
    if (!passwordCorrect) {
      return res.status(401).send('Thông tin tài khoản hoặc mật khẩu không chính xác !')
    }
    const accessToken = jwt.sign({ userid: account.userid, role: account.userrole }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' })
    const refreshToken = cryto.randomBytes(64).toString('hex')
    const expireAt = new Date()
    expireAt.setTime(expireAt.getTime() + (8 * 60 * 60 * 1000))
    await request
      .input('refreshtoken', sql.VarChar, refreshToken)
      .input('userid', sql.UniqueIdentifier, account.userid)
      .input('expireat', sql.DateTime, expireAt)
      .input('createdat', sql.DateTime, new Date())
      .query(`INSERT INTO Session (userid, refreshtoken,expireat, createdat) VALUES(@userid, @refreshtoken,@expireat,@createdat)`)
    res.cookie('refreshtoken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 8 * 60 * 60 * 1000
    })
    return res.status(200).json({ message: "đăng nhập thành công", accessToken })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const refresh = async (req: Request, res: Response) => {
  try {
    const request1 = new sql.Request()
    const refreshToken = req.cookies?.refreshtoken
    if (!refreshToken) {
      return res.status(401).send('Token không tồn tại')
    }
    const res1 = await request1.input('refreshtoken', sql.VarChar, refreshToken)
      .query(`SELECT * FROM Session WHERE refreshtoken = @refreshtoken`)
    const session = res1.recordset[0]
    if (!session) {
      return res.status(403).send('token không hợp lệ')
    }
    if (session.expireat < new Date()) {
      return res.status(403).send('token đã hết hạn')
    }
    const request2 = new sql.Request()
    const res2 = await request2
      .input('userid', sql.UniqueIdentifier, session.userid)
      .query(`SELECT * FROM Account WHERE userid = @userid`)
    const account = res2.recordset[0]
    const accessToken = jwt.sign({ userid: session.userid, role: account.userrole }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30m' })
    return res.status(200).json({ accessToken })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const signout = async (req: Request, res: Response) => {
  try {
    const request = new sql.Request()
    const refreshtoken = req.cookies.refreshtoken
    await request
      .input('refreshtoken', sql.VarChar, refreshtoken)
      .query(`DELETE FROM Session WHERE refreshtoken = @refreshtoken`)
    res.clearCookie('refreshtoken')
    return res.sendStatus(204)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
export const authMe = async (req : Request , res : Response) =>{
  try {
    const user = (req as any).user 
    return res.status(200).json({user})
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}
