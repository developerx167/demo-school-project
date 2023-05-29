import { StudentData } from "@/sharedTypes/studentType";
import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    country : {type : String, lowercase : true},
    state_province_region : {type : String, lowercase : true},
    city : {type : String, lowercase : true},
    street : {type : String, lowercase : true, maxlength : 20},
    zip_postal_code : {type : String, lowercase : true}
})

const schema = new mongoose.Schema<StudentData>({
    email : {type : String, unique : true},
    address : addressSchema,
    birthCertificate : {type : String},
    firstName : {type : String},
    lastName : {type : String},
    dob : {type : Date},
    photo : {type : String},
    assignments : [{type : String}],
    paid : {type : Boolean, default : false}
},{timestamps : true});
export default mongoose.models.Student || mongoose.model('Student',schema);