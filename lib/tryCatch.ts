import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import logger from "./logger"

export default function tryCatch(handler : NextApiHandler){
    return (req : NextApiRequest , res : NextApiResponse<{success : 0, message : string, at? : string}>)=>{
        return Promise.resolve(handler(req,res)).
        catch((error : any | unknown)=>{
            if(!error.external){
                if(error.message === "jwt malformed"){
                    return res.status(400).json({success : 0, message : 'Bad Request.'});
                }
                if(error.message === "jwt expired"){
                    return res.status(400).json({success : 0, message : 'Bad Request.'});
                }
                if(error.code === 11000){
                    return res.status(400).json({success : 0, message : 'Email address alreay exist.', at : error.at});
                }
                logger(error);
                return res.status(500).json({success : 0, message : 'Internal Server Error', at : error.at});
            }
            return res.status(error.status).json({success : 0, message : error.message, at : error.at});
        })
    }
}