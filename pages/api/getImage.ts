// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import fs from "fs"
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const filePath = path.join(process.cwd(), `/public/students/${req.query.id}`)
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader('Content-Type', 'image/*');
    return res.send(imageBuffer);
}
