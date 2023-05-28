import { signIn } from "next-auth/react"
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import {BsArrowRight} from "react-icons/bs"
import { Provider } from "@/pages/sign-in";

const SignInComp = ({ providers } : Provider) => {
  return (
    <section className='section flex justify-center items-center h-[calc(100vh-5rem)]'>
      <div className='flex flex-col w-[25rem] gap-y-10 p-4 border rounded'>
          <h5 className='flex items-center gap-x-4'>Continue with <BsArrowRight/></h5>
          {
            Object.values(providers).map((provider,key) => (<button key={key} onClick={() => signIn(provider.id)} className='rounded w-full p-4 flex justify-center items-center border font-semibold text-gray-600 gap-x-4'><FcGoogle/> Google</button>))
          }
      </div>
    </section>
  )
}

export default SignInComp


