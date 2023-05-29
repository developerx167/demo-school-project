// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoConn from '@/lib/mongoConn';
import Student from '@/models/Student';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import ErrorHandler from '@/lib/ErrorHandler';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const session = await getServerSession(req, res, authOptions);
    if(!session){
        throw (new ErrorHandler({status : 401}));
    }
    await mongoConn();
    await Student.updateOne({email : session.user.email},{$set : {paid : true}})
    return res.redirect('/profile').end();
}