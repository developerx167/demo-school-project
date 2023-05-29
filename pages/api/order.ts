// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Razorpay from 'razorpay';
import {Orders} from 'razorpay/dist/types/orders';


export interface ROrder extends Orders.RazorpayOrder {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ROrder>
) {
    let instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY!,
        key_secret: process.env.RAZORPAY_API_SECRET!,
    });

    const order = await instance.orders.create({amount : 400 * 100, currency : "INR"});
    return res.status(200).json(order)
}