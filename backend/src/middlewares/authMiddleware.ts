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

export const verifyToken = (req : Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  if(!token){
    return res.status(401).send('Không tìm thấy token !')
  }
  try {
    const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET as string) as DecodeToken
    (req as any).user = {
      userid: decoded.userid,
      role: decoded.role
    }
    next()
  } catch (error) {
    return res.status(403).send('Token không hợp lệ hoặc đã hết hạn !')
  }
}
export const requireRole = (...allowRoles: string[]) =>{
  return (req : Request, res : Response, next : NextFunction) =>{
    if(!(req as any).user || !allowRoles.includes((req as any).user.role))
    {
      return res.status(403).send('Bạn không có quyền thực hiện hành động này !')
    }
    next()
  }
}