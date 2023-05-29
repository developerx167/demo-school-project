import { getCookie } from "cookies-next";

export default function getCooks(){
    const cook = getCookie("studentData",{});
    if(typeof cook === "string"){
        return JSON.parse(cook)._doc;
    }
    return;
}