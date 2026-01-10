"use client"
import React from 'react'
import Link from 'next/link'
import ClinicFeatures, { Feature } from './ClinicFeatures'
import doctor from '../../../../public/doctor.png'
import Image from 'next/image'
import Media, { MediaItem } from './Media'
import { FaXTwitter ,FaInstagram,FaFacebook ,FaPhone} from 'react-icons/fa6';
import { FaNotesMedical } from "react-icons/fa";
import { CiMedicalCross } from "react-icons/ci";
import { IoIosMedkit } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { FaClinicMedical } from "react-icons/fa";

type Props = {}

const Landing = ({setVisible,visible}:{setVisible:any,visible:boolean}) => {
  return (
    <div className={`h-[530px] w-[92%] mx-auto bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 rounded-xl pt-[100px] lg:px-[90px] flex flex-col gap-y-[15px] relative ${visible ?'opacity-2':'opacity-100'} `}>
         <div className='lg:text-4xl text-white w-[35%]  font-bold flex flex-col gap-y-[12px]  '>
             <h1 className='font-black'> The Best Medical</h1>
             <h1>and Tratment center</h1> 
              <h1>for you</h1> 
         </div>
         <div className='w-[32%] text-sm text-gray-300 font-bold  '>
              We understand that and acute pain can happen unexpectly , Our energy         
         </div>
       
         <ClinicFeatures>
            <Feature number={'24/7'} information='Emergency Services' />
            <Feature number={'80+'} information='Spetialist Doctor' />
            <Feature number={'100K+'} information='Happy Patient' />
          </ClinicFeatures>

          <Media>
           <MediaItem ref={''} >
             <FaXTwitter className='text-3xl'/>
            </MediaItem>
            <MediaItem ref={''} >
             <FaInstagram className='text-3xl'/>
            </MediaItem>
            <MediaItem ref={''} >
             <FaFacebook className='text-3xl'/>
            </MediaItem>
            <MediaItem ref={''} >
             <FaPhone className='text-3xl'/>
            </MediaItem>
          </Media>
          <button onClick={()=>{setVisible(true)}}  className='cursor-pointer lg:py-[7px] bg-yellow-500 hover:bg-yellow-400 text-white  rounded-lg w-[15%] flex justify-center flex-col items-center font-semibold  text-sm lg:mt-[30px]'>
            Make appointment
         </button>
          <Image src={doctor} alt='' className='lg:w-[400px] lg:h-[400px] absolute top-[80px] right-[170px]' />
           <FaNotesMedical className='absolute text-white lg:text-5xl lg:top-[200px]  lg:right-[600px]' />
           <IoIosMedkit className='absolute text-white lg:text-5xl lg:top-[55px]  lg:right-[500px]' />
           <FaUserDoctor className='absolute text-white lg:text-5xl lg:bottom-[100px]  lg:right-[640]' />
           <FaClinicMedical className='absolute text-white lg:text-5xl lg:top-[100px]  lg:right-[650]' />

           
           
    </div>
  )
}


export default Landing

