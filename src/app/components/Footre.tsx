import React, { ReactNode } from 'react'
import ClinicLogo from '../../../public/clinicLogo.png'
import Image from 'next/image'
import { FaXTwitter ,FaFacebook, FaInstagram,FaVoicemail, FaTwitter,FaPhone,FaMessage} from "react-icons/fa6";
import Links from './HomeComponents/FooterComponents/Links';
import Link from 'next/link';
type Props = {}

const Footre = (props: Props) => {
  return (
    <div className='w-[90%] mx-auto lg:px-[20px] pb-5 flex justify-between items-start rounded-xl bg-blue-50 lg:pt-[40px]'>
        <LeftFooter >
            <FaTwitter className='text-3xl text-black hover:scale-[120%] cursor-pointer transition-all duration-300 ' />
            <FaFacebook className='text-3xl text-black hover:scale-[120%] cursor-pointer transition-all duration-300' />
            <FaInstagram className='text-3xl text-black hover:scale-[120%] cursor-pointer transition-all duration-300' />
            <FaTwitter className='text-3xl text-black hover:scale-[120%] cursor-pointer transition-all duration-300' />
        </LeftFooter>
        <CenterFooter/>
        <div className=' '>
        <Chapters title='Contact us'>
            <div  className='flex justify-start items-center lg:gap-x-[10px] hover:text-blue-500 group'>
                   <FaPhone className='text-xl text-black group-hover:text-blue-500 ' />
                   <h2 className=''>+213 656149785</h2>
            </div>
            <div  className='flex justify-start items-center lg:gap-x-[10px] hover:text-blue-500 group translate-y-5'>
                  <FaMessage className='text-xl text-black group-hover:text-blue-500' />
                  <h2 className=''>AY-Clinic@gmail.com</h2>
            </div>
        </Chapters>
        </div>
        
        
        
    </div>
  )
}

export default Footre

const LeftFooter=({children}:{children:ReactNode})=>{
  return <div className='flex flex-col justify-between items-start lg:w-[30%] lg:gap-y-[15px]'>
          <div className='flex justify-start items-center '>
              <Image src={ClinicLogo} alt='' className='lg:w-[120px] lg:h-[80px]'/>
              <h1 className='lg:text-2xl  font-semibold text-blue-500'>AY-Clinic</h1>
          </div>
          <p className='text-sm text-gray-600 '>Ay-Clinic offers comprehensive virtual healthcare services, connecting patients with qualified medical professionals through secure online consultations. Access expert medical advice, prescriptions, and follow-ups from the comfort of your home .</p>
          <div className='flex justify-start items-center lg:gap-x-[25px]'>
             
                  {children}
            
          </div>
  </div>
}


const CenterFooter=()=>{
    return <div className='flex justify-center items-start  lg:gap-x-[100px]'>
        <Chapters title='Links'>
          <Link href={'/Home'} className='hover:text-blue-500'>Home</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Services</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>About us</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Doctors</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Contact</Link>
        </Chapters>
        <Chapters title='Supports'>
          <Link href={'/Home'} className='hover:text-blue-500'>Help center</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Tweet @ us</Link>
         
          <Link href={'/Home'} className='hover:text-blue-500'>FeedBack</Link>
          
        </Chapters>
        <Chapters title='AY-Clinic'>
          <Link href={'/Home'} className='hover:text-blue-500'>Home</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Services</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>About us</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Doctors</Link>
          <Link href={'/Home'} className='hover:text-blue-500'>Contact</Link>
        </Chapters>

    </div>
}



const Chapters=({children,title}:{children:ReactNode,title:string})=>{
         return <div className='flex flex-col justify-start items-start gap-y-6'>
                  <h2 className='text-xl font-bold text-blue-500'>{title}</h2>
                 <div className='flex flex-col justify-start items-start   gap-y-1 cursor-pointer  '>
                    {children}
                 </div>
</div>

}
