import { AddressType } from "./addressType";
export interface EnrollData{
    email :  string,
    address : AddressType,
    birthCertificate? : File,
    firstName : string,
    lastName : string,
    dob : Date,
    photo? :  File,
}