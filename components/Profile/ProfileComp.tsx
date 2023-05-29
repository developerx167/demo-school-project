import { getPincode, getStudentData } from '@/queries/queryFunctions'
import React from 'react'

import {useQuery} from "@tanstack/react-query"
import Image from 'next/image'
import Link from 'next/link'
import Button from '../UI/Button'
import initializeRazorpay from "@/lib/initializedRazorPay"
import { ROrder } from '@/pages/api/order'
const ProfileComp = () => {
  const {data,status} = useQuery({
    queryKey : ["studentData"],
    queryFn : getStudentData,
  })
  // console.log(data.address);
  
  const {data : pincode,isLoading} = useQuery({
    queryKey : [data?.address.zip_postal_code],
    queryFn : ()=>getPincode(data?.address.zip_postal_code)
  })


  const makePayment = async () => {
        const res = await initializeRazorpay();

        if (!res) {
          alert("Razorpay SDK Failed to load");
          return;
        }

        const resp = await fetch("/api/order");
        const order = await resp.json() as ROrder;

        var options = {
          key: process.env.RAZORPAY_API_KEY,
          amount: order.amount,
          currency: order.currency,
          name: "Shiwansh Institute of Computer Science",
          description: "Test Transaction",
          image: `${process.env.DOMAIN}/logo.svg`,
          order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${process.env.DOMAIN}/api/payments`,
          prefill: {
              name: `${data.firstName} ${data.lastName}`,
              email: `${data.email}`,
              contact: "9000090000"
          },
          notes: {
              "address": "Pune, Maharastra"
          },
          theme: {
              "color": "#3399cc"
          }
      };
      // @ts-ignore
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
  };
  console.log(pincode);
  
  return (
    <section className='section flex gap-y-4 flex-col'>
      <div className='border p-4 flex flex-col gap-y-4'>
          <h6>Profile Information : </h6>
          <div className='relative w-[3rem] h-[3rem] border'>
            <Image className='object-cover' src={data?.photo ? `/api/getImage?id=${data.photo}` : "/user.svg"} alt='' fill/>
          </div>
          <div className='flex flex-col gap-y-2'>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>First Name:</span>  {data?.firstName}</p>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>Last Name:</span>  {data?.lastName}</p>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>Email: </span> {data?.email}</p>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>Date of birth: </span> {data?.dob && new Date(data.dob).toLocaleDateString()}</p>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>Status: </span> {data?.paid ? <span className='text-green-500'> paid </span> : <><span className='text-red-500'>unpaid</span><span className='text-gray-500 text-sm'> &#40;pay now to unlock all features&#41;</span></>}</p>
            <p className='line-clamp-1'><span className='font-semibold text-gray-500 text-sm'>Location: </span> { isLoading ? <span className='italic text-sm text-gray-400'>loading...</span> : ( pincode[0].PostOffice ? <span className='text-sm'>{pincode[0]?.PostOffice[0]?.District}&#44; {pincode[0]?.PostOffice[0]?.State}</span> : <span className='text-red-500 text-sm'>something went wrong</span>) }</p>
          </div>
            {!data?.paid && <Button flexButtonProps={{content : "Pay",buttonProps : { onClick : makePayment,className : 'link-button-style-primary w-full'}}}/>}
      </div>
      <div className='border p-4 flex flex-col gap-y-4'>
        <h6>Assignmennts :</h6>
        <p className='underline select-none'>week 1</p>
        <p className='underline select-none'>week 2</p>
        <p className='underline select-none'>week 3</p>
      </div>
    </section>
  )
}

export default ProfileComp