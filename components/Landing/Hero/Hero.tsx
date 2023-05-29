import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className='h-[calc(100vh-5rem)] min-h-[20rem] bg-[url("/hero.jpg")] bg-fixed bg-cover'>
      <div className='h-full w-full bg-black/60'>
        <div className='section flex flex-col gap-y-10 justify-center h-full'>
          <div className=''>
            <p className='hero-text text-3xl sm:text-6xl font-bold text-white '>Empower your future in the world of technology with Shivansh - Where Aspiring Minds Shape the Digital Frontier.</p>
          </div>
          <Link href={"/enroll"} className='hero-button w-full flex relative hbf select-none'>
            <div className='border-4 w-full p-4 text-center font-black text-white text-xl'>Enroll Now</div>
            <div className=' cursor-pointer transition-all duration-1000 hero-button-c h-full w-full absolute bg-white top-0 left-0 border-4 p-4 text-center font-black text-black text-xl'>Enroll Now</div>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero