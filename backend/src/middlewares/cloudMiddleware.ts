import cloudinary from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.v2.config({
  cloud_name: 'dhylrhxsa',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const publicStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params :{
    folder: 'Public',
    allowed_formats : ['jpg','jpeg','png']    
  } as any
})
const billStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params :{
    folder: 'BillUrl',
    allowed_formats : ['jpg','jpeg','png']    
  } as any 
})
const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params:{
    folder: 'UserAvatar',
    allowed_formats : ['jpg','jpeg','png']    
  } as any
})
export const qrStorage = async (qrurl : string) =>{
  try {
    const result  = await cloudinary.v2.uploader.upload(qrurl,{
      folder: 'BillUrl',
      allowed_formats: ['jpg','png','jpeg']
    })
    return result.secure_url
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const uploadPublic = multer({storage : publicStorage})
export const uploadBill = multer({storage : billStorage})
export const uploadAvatar = multer({storage : avatarStorage})