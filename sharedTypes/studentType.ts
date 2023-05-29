import { EnrollData } from "./enrollTypes";

export interface StudentData extends EnrollData{
    assignments : string[],
    paid? : boolean
}