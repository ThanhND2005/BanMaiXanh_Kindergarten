import sql from 'mssql'
import 'dotenv/config'



const sqlConfig : sql.config = {
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASENAME,
  server : process.env.DB_SERVER || 'localhost',
  port : parseInt(process.env.DB_PORT || '1433'),
  pool :{
    max: 10,
    min: 0,
    idleTimeoutMillis:30000
  },
  options: {
    encrypt : false,
    trustServerCertificate : true
  }
}

export const connectDB = async () =>{
  try {
    const pool = await sql.connect(sqlConfig)
    console.log('Kết nối cơ sở dữ liệu thành công')
    return pool
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
export {sql}
