import React, { FC } from 'react'
import FlexButton from "rd-flexbutton"
import type { FlexButtonProps } from 'rd-flexbutton/dist/FlexButton/type'
import {AiOutlineLoading3Quarters} from "react-icons/ai"

type ButtonProps = {
    flexButtonProps : FlexButtonProps,
    loading? : boolean,
}

const Loading : FC = () =>{
  return (
    <div className='absolute w-full h-full bg-white/70 top-0 left-0 flex justify-center items-center'>
        <AiOutlineLoading3Quarters className=' text-white h-full animate-spin' size={"2rem"}/>
    </div>
  )
}
const Disabled : FC = () =>{
  return (
    <div className='absolute w-full h-full bg-white/70 top-0 left-0 flex justify-center items-center'>
    </div>
  )
}


const Button : FC<ButtonProps> = ({flexButtonProps,loading}) => {
  return (
        <FlexButton {...flexButtonProps} disabledOverlayElement={loading ? <Loading/> : (flexButtonProps.buttonProps?.disabled ? <Disabled/> : undefined)}  />
  )
}

export default Button