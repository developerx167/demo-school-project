import mongoose from "mongoose";

export default async function mongoConn ()
{
    return await mongoose.connect(`mongodb+srv://developerx167:7lLEJU6DxLX4KPh1@excelholic.6vt4fpq.mongodb.net/test?retryWrites=true&w=majority`);
}