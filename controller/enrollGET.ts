import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import ErrorHandler from "@/lib/ErrorHandler";
import Student from "@/models/Student";

export default async function enrollGET(req : NextApiRequest, res : NextApiResponse){
    const session = await getServerSession(req, res, authOptions);
    if(!session){
        throw (new ErrorHandler({status : 401}));
    }
    const student = await Student.findOne({email : session.user?.email});
    if(!student){
        throw (new ErrorHandler({status : 404}));
    }
    return res.status(200);
}