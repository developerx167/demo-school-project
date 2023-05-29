import {useState,useEffect, SetStateAction} from "react"

export default function useDebounce<T>(value : T, delay : number, callback : ()=> any){
    const [debounceValue,setDebounceValue] = useState<T>(value);
    useEffect(()=>{
        callback();
        const id = setTimeout(()=>{
            setDebounceValue(value);
        },delay);
        return ()=>{
            clearTimeout(id);
        }
    },[value,delay,callback])
    return debounceValue;
}