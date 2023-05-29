import fs from 'fs'
import path from 'path'
export default function logger(error : any | unknown){
    if(process.env.NODE_ENV === 'development') console.log(error);
    fs.writeFile(path.join(process.cwd(),'nextjs_error.log'),new Date()+(error.stack ? error.stack : 'unknown stack')+'\n\n', { flag : 'a' }, ()=>{})
}