import FlexInput from 'rd-flexinput'
import React,{useEffect, useState} from 'react'
import Button from '../UI/Button'
import { EnrollData } from '@/sharedTypes/enrollTypes'
import {AlertDiv, AlertProps} from '../UI/Alerts/AlertDiv'
import {useMutation,useQuery, useQueryClient} from "@tanstack/react-query"
import { getPincode, postEnroll } from '@/queries/queryFunctions'
import moment from "moment"
import useDebounce from '@/lib/useDebounce'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import validator from "validator";
import Image from 'next/image';
import { useRouter } from 'next/router'
type DOB = {year? : number, month? : number, day? : number}





const InputLoading : React.FC = () =>{
  return (
    <div className='bg-white/70 h-full w-full absolute top-0 left-0 flex justify-center items-center'>
      <AiOutlineLoading3Quarters className='text-gray-400 h-full animate-spin' size={"2rem"}/>
    </div>
  )
}

const EnrollComp = () => {
  const [alert,setAlert] = useState<AlertProps>({
    id : 'EnrollAlert',
  })
  const queryClient = useQueryClient();
    const router = useRouter();
    const [dob, setDob] = useState<DOB>();
    const [pincode,setPincode] = useState<string>("");
    const pincodeDebounce = useDebounce(pincode,1000,()=>{});
    const [data,setData] = useState<EnrollData>({
      address : {
        zip_postal_code : ""
      },
      dob : new Date(),
      email : "",
      firstName : "",
      lastName : "",
    });
    const {mutate : mutateEnroll,isSuccess ,isLoading, data : mutationData,error, status} = useMutation({
      onSuccess :()=> queryClient.invalidateQueries(["studentData"]),
      mutationFn : postEnroll,
    })

    async function upload() {
      const {_id} = mutationData;
      const {photo} = data;
      const fd = new FormData();
      if(photo){
        fd.append(_id,photo);
      }
      return await fetch(`/api/imageUpload?_id=${_id}`,{method : "POST",body : fd});
    }
    if(isSuccess){
      upload();
      router.push("/profile");
    }

    const {data : pincodeData, isLoading : pincodeDataLoading} = useQuery({
      queryKey : [data.address.zip_postal_code],
      queryFn : ()=>getPincode(data.address.zip_postal_code as string),
    })
    
    useEffect(()=>{
      setData(prev=>({...prev,address :{ zip_postal_code : pincodeDebounce}}));
    },[pincodeDebounce])

    function checkAndSetDate(){
      const d = new Date(`${dob?.year}-${dob?.month}-${dob?.day}`);
      if(!moment(d).isValid()){
        const dateP = document.getElementById("date-error") as HTMLParagraphElement;
        dateP.textContent = "** Invalid date"
        return true;
      }else{
        const mDOB = moment(d.toISOString());
        if(!mDOB.isBefore()){
          const dateP = document.getElementById("date-error") as HTMLParagraphElement;
          dateP.textContent = "** Date should be before"
          return true;
        }else{
          const dateP = document.getElementById("date-error") as HTMLParagraphElement;
          dateP.textContent = ""
          setData((prev)=>({...prev,dob : mDOB.toDate()}));
        }
      }
    }
    function checkPincode(){
      const pp = document.getElementById("pincode-error") as HTMLParagraphElement;
      if(!pincodeDataLoading && pincodeData && ((pincodeData[0].Status === "Error") || (pincodeData[0].Status === "404"))){
          pp.textContent = "** Invalid pincode"
          return true;
        }else{
          pp.textContent = ""
        }
    }
    if(!isLoading && data.address.zip_postal_code){
      checkPincode();
    }
    
    
    function checkName(str : string, id : string, name : "firstName" | "lastName"){
      if(validator.isAlpha(str,undefined,{ignore : " "})){
        str = str.replaceAll(/\s+/g," ").trim();
        setData(prev=>({...prev, [name] : str}));
        const p = document.getElementById(id) as HTMLParagraphElement;
        p.textContent = ""
      }else{
        const p = document.getElementById(id) as HTMLParagraphElement;
        p.textContent = "Invalid name"
        return true;
      }
    }
    function checkFile(){
      const pp = document.getElementById("photo-error") as HTMLParagraphElement;
      const bp = document.getElementById("birthCertificate-error") as HTMLParagraphElement;
      if(!data.photo || !data.birthCertificate){
        if(!data.photo){
          pp.textContent = "Invalid Photo"
        }
        if(!data.birthCertificate){
          bp.textContent = "Invalid Certificate"
        }
        return true;
      }else{
        pp.textContent = ""
        bp.textContent = ""
      }
    }
    async function submitHandler(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      const fname = checkName(data.firstName,"firstName-error","firstName");
      const lname = checkName(data.lastName,"lastName-error","lastName");
      const pcode = checkPincode();
      const d = checkAndSetDate();
      const f = checkFile();
      if(!(fname||lname||pcode||f||d)){ 
        mutateEnroll({data,setAlert});
      }
    }

    function changeHandler(e : React.ChangeEvent<HTMLInputElement>){
      if(e.target.name === "year" || e.target.name === "month" || e.target.name === "day"){
        setDob(prev=>({...prev,[ e.target.name] : e.target.value}));
        const dateP = document.getElementById("date-error") as HTMLParagraphElement;
        dateP.textContent = ""
      }else if(e.target.name === "zip_postal_code"){
        setPincode(e.target.value)
      }else if(e.target.name === "firstName" || e.target.name === "lastName"){
        setData(prev=>({...prev, [e.target.name] : e.target.value}))
        const p = document.getElementById(`${e.target.name}-error`) as HTMLParagraphElement;
        p.textContent = ""
      }else if(e.target.name === "photo" || e.target.name === "birthCertificate"){
        const file = e.target.files && e.target.files[0]
        if(file){
          setData((prev)=>({...prev, [e.target.name] : file}));
        }
      }
    }

    

    return (
      <section className='section select-none'>
        <form encType='multipart/form-data' onSubmit={submitHandler} className='flex flex-col gap-y-4 max-w-[25rem] w-full mx-auto py-10'>
          <AlertDiv {...alert}/>
          <div className='flex flex-col gap-y-2'>
            <FlexInput inputProps={{  value : data.firstName,onChange : changeHandler ,name : "firstName",minLength : 3,maxLength : 20 ,placeholder : "First Name",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
            <p className='text-sm text-red-600' id='firstName-error'></p>
          </div>

          <div className='flex flex-col gap-y-2'>
              <FlexInput inputProps={{  value : data.lastName,onChange : changeHandler ,name : "lastName",minLength : 3,maxLength : 20 ,placeholder : "Last Name",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
              <p className='text-sm text-red-600' id='lastName-error'></p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <FlexInput disabledOverlayElememt={pincodeDataLoading ? <InputLoading/> : undefined} inputProps={{  value : pincode,onChange : changeHandler ,name : "zip_postal_code",minLength : 6,maxLength : 6,placeholder : "Pin Code",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
            {  <p id='pincode-error' className='text-sm text-red-600'></p>}
          </div>
          <div className='flex flex-col gap-y-2'>
            <p className='text-gray-400'>Date of Birth : </p>
            <div className=' gap-x-4 gap-y-4 grid grid-cols-3'>
              <FlexInput inputProps={{type : "number",value : dob?.year,onChange : changeHandler ,name : "year",placeholder : "year",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='w-full transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
              <FlexInput inputProps={{type : "number",value : dob?.month,onChange : changeHandler ,name : "month",placeholder : "month",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='w-full transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
              <FlexInput inputProps={{type : "number",value : dob?.day,onChange : changeHandler ,name : "day",placeholder : "day",className : "p-4 bg-transparent w-full"}} wrapperClassName='w-full' containerClassName='w-full transition-color duration-500' blurContainerClassName='bg-gray-100' focusContainerClassName='bg-white'/>
            </div>
            <p className='text-sm text-red-600' id='date-error'></p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <p className='text-gray-400'>Photo : </p>
            { 
              data.photo &&
              <div className='h-32 w-32 relative'>
                <Image className='object-cover' src={URL.createObjectURL(data.photo)} alt='' fill />
              </div>
            }
            <div tabIndex={0} className='transition-colors duration-500 w-full text-gray-400 bg-gray-100 focus:bg-white flex border-transparent border-2 focus:border-black'>
              <input onChange={changeHandler} name='photo' type="file" className='hidden' id='photo' />
              <label htmlFor="photo" className='focus:bg-gray-100 p-4 h-full w-full line-clamp-1'>{ data.photo ? data.photo.name :'Choose a file'}</label>
            </div>
            <p className='text-sm text-red-600' id='photo-error'></p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <p className='text-gray-400'>Birth Certificate : </p>
            <div tabIndex={0} className='transition-colors duration-500 w-full text-gray-400 bg-gray-100 focus:bg-white flex border-transparent border-2 focus:border-black'>
              {/* todo preview */}
              <input onChange={changeHandler} name='birthCertificate' type="file" className='hidden' id='birthCertificate' />
              <label htmlFor="birthCertificate" className='focus:bg-gray-100 p-4 h-full w-full line-clamp-1 whitespace-nowrap'>{data.birthCertificate ? data.birthCertificate.name : 'Choose a file'}</label>
            </div>
            <p className='text-sm text-red-600' id='birthCertificate-error'></p>
          </div>
          <Button flexButtonProps={{containerClassName : "mt-4",content : "Submit", buttonProps : {className : "link-button-style-primary w-full"}}} loading={isLoading}/>
        </form>
      </section>
    )
}

export default EnrollComp