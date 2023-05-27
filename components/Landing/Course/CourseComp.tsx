import Image from 'next/image'
import Link from 'next/link'
import React,{useEffect} from 'react'
import {AiOutlineCheck} from "react-icons/ai"
import Slider from "react-slick";
import animateOnShow from "@/lib/intersectionObserver"
const CourseComp = () => {

    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        variableWidth : true,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            }
          ],
    };
    useEffect(()=>{
        animateOnShow();
    },[])

  return (
    <section className='section flex flex-col gap-y-4'>
        <div className='overflow-hidden'>
            
        <Slider {...settings}>
            <div><p className='underline text-sm  relative flex'><Image className='' width={20} height={100} src={"/new-icon.jpg"} alt='new icon'/> <span>Summer Coding Camp Enrollment Now Open!</span></p></div>
            <div><p className='underline text-sm '>Annual Science Fair: Save the Date!</p></div>
            <div><p className='underline text-sm '>Fall Semester Enrollment Open!</p></div>
            <div><p className='underline text-sm '>Fine Arts Workshop: Unleash Your Creativity!</p></div>
            <div><p className='underline text-sm '>Scholarship Application Deadline Approaching!</p></div>
        </Slider>
        </div>
        <div className='observe flex flex-col lg:flex-row select-none gap-y-12 gap-x-10'>
            <div className='px-4 flex flex-col gap-y-4 w-full'>
                <h4>Unlock Your Potential at Shiwansh</h4>
                <div className='flex flex-col gap-y-8'>
                    <p className='text-justify text-sm leading-6'>
                        Welcome to the <i>Shivansh School of Computer Science</i>, where education meets inspiration! At Shivansh, we are dedicated to providing a nurturing and empowering learning environment that cultivates the intellectual growth and creativity of our students. With our team of experienced educators, state-of-the-art facilities, and a comprehensive curriculum, we strive to unlock the full potential of every student who walks through our doors.

                        Our mission is to prepare students for success in the ever-evolving world of computer science. We offer a wide range of courses designed to equip students with the latest industry knowledge and practical skills. From web development and software engineering to data science and artificial intelligence, our curriculum covers the essential domains of computer science. Our courses combine theoretical concepts with hands-on projects, allowing students to apply what they learn in real-world scenarios.

                        At Shivansh, we believe in fostering a collaborative and inclusive learning environment. Our experienced faculty members are passionate about their subjects and committed to guiding students on their educational journey. With small class sizes, personalized attention, and mentorship programs, we ensure that each student receives the support they need to thrive.

                        In addition to academic excellence, we encourage students to explore their creativity, develop critical thinking skills, and embrace innovation. Our state-of-the-art facilities provide the necessary tools and resources for students to experiment, create, and push the boundaries of what is possible in the world of computer science.

                        Whether you are a beginner taking your first steps in the world of coding or an experienced professional looking to expand your skill set, Shivansh School of Computer Science is the place for you. Join us on this exciting educational journey, unlock your potential, and shape your future in the fascinating field of computer science.
                    </p>
                    <div className='relative h-[25rem]'>
                        <Image className='object-cover' src={"/graduate.jpg"} alt='graduate.jpg' fill></Image>
                    </div>
                </div>
            </div>
            <div className='w-full lg:w-[45rem]'>
                <div className="border p-4 flex flex-col gap-y-4">
                    <div className='relative h-[15rem] w-full'>
                        <Image className='object-cover' fill src={"/course-spotlight.jpg"} alt='spotlight image'/>
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h6>Course Spotlight: Web Development and Design</h6>
                    </div>

                    <ul className="p-4 font-semibold italic flex flex-col gap-y-4">
                        <li className='flex gap-x-2 items-center'><AiOutlineCheck className='text-green-500'/> Expert Faculty</li>
                        <li className='flex gap-x-2 items-center'><AiOutlineCheck className='text-green-500'/> Hands-on Learning</li>
                        <li className='flex gap-x-2 items-center'><AiOutlineCheck className='text-green-500'/> State-of-the-Art Facilities</li>
                        <li className='flex gap-x-2 items-center'><AiOutlineCheck className='text-green-500'/> Industry-Relevant Curriculum</li>
                        <li className='flex gap-x-2 items-center'><AiOutlineCheck className='text-green-500'/> Networking Opportunities</li>
                    </ul>
                    <p className="text-sm italic">* Enroll today and unlock your potential at the Shivansh School of Computer Science. Visit our website for more information and to explore our range of courses.</p>
                    <h3 className=''>₹400 <span className='text-xl text-gray-400 line-through'>₹600</span> <span className='text-xl font-normal text-red-500'>20% off</span></h3>
                    <p className="text-sm font-semibold">Limited-Time Offer: Enroll now and get a <span className="discount-percentage">20% discount</span> on the Web Development and Design course! Don't miss out on this opportunity to enhance your skills at an unbeatable price.</p>
                    <Link className='link-button-style-primary' href={"/enroll"}>Enroll Now</Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CourseComp