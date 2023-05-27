import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {FaUserGraduate} from "react-icons/fa"
import {FiLogIn} from "react-icons/fi"
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
const Navbar = () => {

const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false);
useEffect(()=>{
    if(isMenuOpen){
        disablePageScroll();
    }else{
        enablePageScroll();
    }
},[isMenuOpen])

function windowResizeHandler(){
    if(window.innerWidth > 640){
        setIsMenuOpen(false);
    }
}

useEffect(()=>{
    window.addEventListener("resize",windowResizeHandler);
    return ()=>{
        window.removeEventListener("resize",windowResizeHandler);
    }
},[])

  return (
    <div className='sticky bg-gray-100/40 backdrop-blur-lg top-0 border-b z-50'>
        <nav className='section h-[5rem] px-4 py-2 flex relative'>
            <Link href={"/"}>
                <div className='h-full relative w-[5rem]'>
                    <Image src={"/logo.svg"} alt='' fill></Image>
                </div>
            </Link>

            <ul className='hidden md:flex ml-auto items-center gap-x-10 text-sm font-semibold text-gray-600 hover:text-black cursor-pointer'>
                <li><Link href={"/about"} className='w-full'>About</Link></li>
                <li><Link href={"/contact"} className='w-full'>Contact</Link></li>
                <li><Link href={"/admission"} className='w-full'>Admission</Link></li>
                <li>
                    <Link className='link-button-style-secondary' href={'/sign-in'}><FiLogIn/>Sign In</Link>
                </li>
                <li>
                    <Link className='link-button-style-primary' href={'/enroll'}><FaUserGraduate/>Enroll</Link>
                </li>
            </ul>

            <div className='md:hidden w-full flex items-center'>
                <div onClick={()=>setIsMenuOpen(prev=>!prev)} tabIndex={0} className='focus:outline-2 cursor-pointer ml-auto w-fit flex flex-col justify-between h-[2rem]'>
                    <div className={` transition-all duration-500 ${isMenuOpen ? 'rotate-45 -translate-y-[0.2rem]' : ''} bg-gray-500 hover:bg-gray-600 origin-top-left h-[.2rem] w-[3rem]`}></div>
                    <div className={` transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'opacity-100'} bg-gray-500 hover:bg-gray-600 translate-x-0 origin-top-right h-[.2rem] w-[3rem]`}></div>
                    <div className={` transition-all duration-500 ${isMenuOpen ? '-rotate-45 translate-y-[0.1rem]' : ''} bg-gray-500 hover:bg-gray-600 origin-top-left h-[.2rem] w-[3rem]`}></div>
                </div>
            </div>
            <div className={`overflow-hidden md:hidden transition-all duration-500 ${isMenuOpen ? 'h-[calc(100vh-5rem)]' : 'h-0'} bg-white absolute top-[5rem] left-0 w-full`}>
                <ul className='px-4 py-10 flex flex-col ml-auto items-center gap-y-10 text-sm font-semibold text-gray-600 hover:text-black cursor-pointer'>
                    <li className='w-full'><Link href={"/about"} className='w-full'>About</Link></li>
                    <li className='w-full'><Link href={"/contact"} className='w-full'>Contact</Link></li>
                    <li className='w-full'><Link href={"/admission"} className='w-full'>Admission</Link></li>
                    <li className='w-full'>
                        <Link className='link-button-style-secondary' href={'/sign-in'}><FiLogIn/>Sign In</Link>
                    </li>
                    <li className='w-full'>
                        <Link className='link-button-style-primary' href={'/enroll'}><FaUserGraduate/>Enroll</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar