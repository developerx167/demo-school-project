// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Formidable from "formidable"
import path from 'path';
import ErrorHandler from '@/lib/ErrorHandler';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import tryCatch from '@/lib/tryCatch';
import mongoConn from '@/lib/mongoConn';
import Student from '@/models/Student';

export const config = {
    api: {
      bodyParser: false
    }
  }

export default tryCatch(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    await mongoConn();
    const session = await getServerSession(req, res, authOptions);
    if(!session){
        throw (new ErrorHandler({status : 401}));
    }
    let filename
    const form =  new Formidable.IncomingForm({maxFileSize : 100 * 1024 * 1024, uploadDir : path.join(process.cwd(),'/public/students'), keepExtensions : true, filename : (name,ext,part,form)=>{ 
        filename = (req.query._id as string)+ext;
        return filename;
     }});
     
     const files : Formidable.Files = await (new Promise((resolve,reject)=>{
        form.parse(req,(err,fields,files)=>{
            if(err){
                return reject(err)
            }
            return resolve(files);
        })
    }))
    
    await Student.updateOne({email : session.user.email},{$set : {photo : filename}});
    return res.status(200).end();
})