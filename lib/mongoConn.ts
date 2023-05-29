import mongoose from "mongoose";

export default async function mongoConn ()
{
    return await mongoose.connect(process.env.MONGODB_URI!);
}