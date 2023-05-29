// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import enrollGET from '@/controller/enrollGET';
import enrollPOST from '@/controller/enrollPOST';
import ErrorHandler from '@/lib/ErrorHandler';
import mongoConn from '@/lib/mongoConn';
import tryCatch from '@/lib/tryCatch'
import type { NextApiRequest, NextApiResponse } from 'next'


async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    await mongoConn();
    if(req.method === "GET"){
        return enrollGET(req,res);
    }else if(req.method === "POST"){
        return enrollPOST(req,res);
    }
}

export default tryCatch(handler);

