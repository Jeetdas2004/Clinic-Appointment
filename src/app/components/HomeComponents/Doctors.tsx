"use client"
import React,{ReactNode, useEffect, useMemo, useState} from 'react'
import Image from 'next/image'
import ClinicLogo from '../../../../public/clinicLogo.png'
import { doctorType } from '@/type'
import { DocumentType } from 'next/dist/shared/lib/utils'
import { CiLocationOn,CiStar } from "react-icons/ci";
import { FaRankingStar } from "react-icons/fa6";
import Link from 'next/link'
import { DoctorType } from '@/app/Types'
import {getDoctors} from '../../DataFunction/Dctors'
import { useDispatch, useSelector } from 'react-redux'
import { doctorAcrtions } from '@/redux/doctorSlice'



const Doctors = () => {
  const [doctors,setDoctors]=useState<DoctorType[]>([])
 
    const doctors_= useSelector((state:any)=>state.doctors)
    useEffect(()=>{setDoctors(doctors_)},[doctors_])
 
  return (
    <div className='w-full lg:px-[150px] lg:pb-[50px]'id='doctors'>
        <div className='w-full flex justify-center items-center'>
           <Image src={ClinicLogo} alt='' className='lg:w-[120px] '/>
           <h1 className='lg:text-3xl font-bold text-blue-500'>Our Doctors</h1>
        </div>
        <DisplayDoctors doctors={doctors} />
    </div>
  )
}

export default Doctors


const DisplayDoctors=({doctors}:{doctors:DoctorType[]})=>{
    const display=useMemo(()=>{
        return doctors.map((doctor,index)=>{
            return <DoctorCard key={index}  doctor={doctor} id={doctor._id} />
        })
    },[doctors])
    return <div className='grid grid-cols-4 gap-[30px] w-full mt-5'>
       {display}
    </div>
}


const DoctorCard=({doctor,id}:{doctor:DoctorType,id:String | undefined})=>{
    return <div  className=''>
                  <img src="https://i.pinimg.com/736x/cb/9b/f9/cb9bf95149d36cb6397c1fabd1a892b0.jpg" className='w-full h-[200px]' alt="" />

        <div className="w-full flex justify-between items-center  lg:my-3 lg:px-[5px]">
             <h1 className='lg:text-lg  text-blue-500  '>{doctor.name}</h1>

            <button className='rounded-lg lg:px-[10px] lg:py-[2px] text-white bg-blue-500 flex justify-center items-center lg:gap-x-[3px]'>
                    <CiStar className='text-white text-lg'/>
                    <p className='text-lg text-white'>150</p>
            </button>
            </div>

            <div className='lg:px-[5px] flex flex-col gap-y-[6px] justify-start items-start'>
            <Information information={doctor.service.name+" service"}>
                    <CiLocationOn className='text-gray-800 text-lg'/>
                   </Information>
                   <Information information={(doctor.age).toString()+" years"}>
                    <CiLocationOn className='text-gray-800 text-lg'/>
                   </Information>
                   <Information information={doctor.location}>
                    <CiLocationOn className='text-gray-800 text-lg'/>
                   </Information>
                   <Information information={doctor.email}>
                    <CiLocationOn className='text-gray-800 text-lg'/>
                   </Information>
                   <Information information={"0"+(doctor.phone).toString()}>
                    <CiLocationOn className='text-gray-800 text-lg'/>
                   </Information>
                  
            </div>
           
            <Link href={''} className=' w-full flex justify-center lg:mt-3 lg:py-[4px] text-blue-800 bg-blue-100 text-lg mx-auto'>Make appointment</Link>

         
            
        
    </div>
}

const Information=({children,information}:{children:ReactNode,information:String})=>{
    return <div className='flex justify-start items-center lg:gap-x-[5px] font-sans'>
            {children}
           <p className='text-gray-800 '>{information}</p>
    </div>
}

