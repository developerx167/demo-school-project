import React from 'react'

const Footer = () => {
  return (
    <footer className='py-10 bg-gray-800 mt-20'>
        <div className='section grid grid-cols-2 sm:grid-cols-3 gap-x-4 text-white/40 text-sm sm:justify-items-center'>

            <div className="contact-info flex flex-col gap-y-4">
                <p><strong>Contact Information:</strong></p>
                <p>Address: 123 Main Street, City Name, State, Zip Code</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@shiwanshtech.edu</p>
            </div>
  
            <div className="useful-links flex flex-col gap-y-4">
                <p><strong>Useful Links:</strong></p>
                <ul className='flex flex-col gap-y-2'>
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Programs</a></li>
                <li><a href="#">Admissions</a></li>
                <li><a href="#">Faculty & Staff</a></li>
                <li><a href="#">Research</a></li>
                <li><a href="#">News & Events</a></li>
                <li><a href="#">Contact Us</a></li>
                </ul>
            </div>
  
            <div className="social-media flex flex-col gap-y-4">
                <p><strong>Social Media:</strong></p>
                <ul className='flex flex-col gap-y-2'>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">YouTube</a></li>
                </ul>
            </div>

        </div>
    </footer>
  )
}

export default Footer