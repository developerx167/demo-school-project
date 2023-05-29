import { AlertProps } from "@/components/UI/Alerts/AlertDiv";
import ErrorHandler from "@/lib/ErrorHandler";
import { EnrollData } from "@/sharedTypes/enrollTypes";
import axios,{AxiosError} from "axios";

export async function postEnroll({data,setAlert} : {data : EnrollData, setAlert : React.Dispatch<React.SetStateAction<AlertProps>>}){
    try {
        return (await axios.post("/api/enroll",data)).data;
    } catch (error) {
        const aErr = (error as AxiosError).response?.data as ErrorHandler;
        if('success' in aErr && 'message' in aErr){
            setAlert(prev=>({...prev,variant : "error", alertMessage : aErr.message}));
        }else{
            setAlert(prev=>({...prev,variant : "error", alertMessage : "Something Went Wrong"}));
        }
        throw(error)
    }
}

export async function getPincode(pincode : string){
    try {
        return (await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)).data;
    } catch (error) {
        const aErr = (error as AxiosError).response?.data as ErrorHandler;
        console.log(aErr);
        
    }
}


export async function getStudentData() {
    try {
        return (await axios.get(`/api/student`)).data;
    } catch (error) {
        throw(error)
    }
}


