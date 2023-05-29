// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import Student from '@/models/Student';
import mongoConn from '@/lib/mongoConn';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        await mongoConn();
    const session = await getServerSession(req, res, authOptions);
    if(!session){
        return res.status(200).json({});
    }else{
        const student = await Student.findOne({email : session.user.email});
        return res.status(200).json(student);
    }
}   