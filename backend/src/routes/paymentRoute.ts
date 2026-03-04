import express from "express";
import { Request, Response } from "express";
import { sql } from "~/libs/DB";
const router = express.Router()
const SEPAY_API_KEY = process.env.SEPAY_API_KEY
router.post('/sepay', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.includes(SEPAY_API_KEY as string)) {
      return res.sendStatus(401)
    }
    const { id, code, transferAmount, content } = req.body
    
    const tuitionid = (content as string).split(' ')[0]
    
    const tuitionid2 = tuitionid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
    
   
    const request = new sql.Request()
    await request
      .input('tuitionid', sql.UniqueIdentifier, tuitionid2)
      .input('amount', sql.Int, transferAmount)
      .query(
        `UPDATE Tuition SET status='Đã hoàn thành' WHERE tuitionid = @tuitionid AND amount=@amount`
      )
    return res.sendStatus(200)
  } catch (error) {
    console.error(error)
    return res.status(500).send('Lỗi hệ thống')
  }
})


export default router