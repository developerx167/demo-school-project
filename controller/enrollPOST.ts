import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import ErrorHandler from "@/lib/ErrorHandler";
import User from "@/models/Student";
import Student from "@/models/Student";
import {getCookie,setCookie} from "cookies-next"

export default async function enrollPOST(req : NextApiRequest, res : NextApiResponse){
    const session = await getServerSession(req, res, authOptions);
    if(!session){
        throw (new ErrorHandler({status : 401}));
    }
    console.log(req.body);
    
    const student = await Student.create({
        email : session.user?.email,
        address : {
            zip_postal_code : req.body.address.zip_postal_code,
        },
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        dob : req.body.dob,
    });
    // setCookie("studentData",JSON.stringify({...student}),{req,res});
    return res.status(201).json(student);
}