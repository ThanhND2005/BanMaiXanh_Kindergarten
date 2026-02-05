import jwt,{JwtPayload} from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { sql } from '~/libs/DB'
interface DecodeToken extends JwtPayload {
  userid : string,
  role: string,
}
interface AuthRequest extends Request {
  user?: any 
}

export const protectedRoute = async (req : Request , res : Response,next : NextFunction) =>{
  try {
    
    const Headers = req.headers['authorization']
    const token = Headers && Headers.split(" ")[1]
    if(!token)
    {
      return res.status(401).send('Không tìm thấy accesstoken')
    }
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string, async(err, decodeUser) =>{
      if (err){
        console.error(err)
        return res.status(403).send('Token không hợp lệ hoặc đã hết hạn')
      }
      const payload = decodeUser as DecodeToken
      const request1 = new sql.Request()
      if(payload.role === 'admin')
      {
        const res1 = await request1
        .input('userid',sql.UniqueIdentifier,payload.userid)
        .query(`SELECT * FROM Admin WHERE userid = @userid`)
        const user = res1.recordset[0]
        if(!user){
          return res.status(404)
        }
        (req as any).user = user
        next()
      }
      else if (payload.role === 'teacher')
      {
        const res1 = await request1
        .input('userid',sql.UniqueIdentifier,payload.userid)
        .query(`SELECT * FROM Teacher WHERE userid = @userid`)
        const user = res1.recordset[0]
        if(!user){
          return res.status(404)
        }
        (req as any).user = user
        next()
      }
      else{
        const res1 = await request1
        .input('userid',sql.UniqueIdentifier,payload.userid)
        .query(`SELECT * FROM Parent WHERE userid = @userid`)
        const user = res1.recordset[0]
        if(!user){
          return res.status(404)
        }
        (req as any).user = user
        next()
      }
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
}