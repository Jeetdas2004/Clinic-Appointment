"use client"
import React, { useState , useEffect} from 'react'
import { useRouter } from 'next/navigation'
import ClinicLogo from '../../../public/clinicLogo.png'
import Image from 'next/image'
import {DoctorType}  from '../Types'
import { getDoctors } from '../DataFunction/Dctors'
import {SignIn} from '../DataFunction/Other'

const page = () => {
    const [Name,setName]=useState<any>('')
    const [Password,setPassword]=useState<any>('')
    const router=useRouter()
    const [error,setError]=useState<string | null>(null)
    const handleSubmit=(e:any)=>{
        e.preventDefault();
        SignIn({userName:Name,password:Password}).then((res:any)=>{
          if(res){
            if(res.result=="1"){
              localStorage.setItem('user',JSON.stringify(res.user))
              router.push('/Doctor')
           }else{
              setError('Invalid user name or password')
           }
          }
                
        })

    }
   
  return (
    <div className='w-[40%]  mx-auto flex flex-col lg:gap-y-[5px] justify-start items-center lg:py-[90px]'>
          <Image src={ClinicLogo} className='lg:w-[120px] lg:h-[90px] mx-auto' alt="" />
          <h1 className='lg:text-2xl font-semibold text-blue-500'>Sign in to your account</h1>
          <form onSubmit={handleSubmit} action="" className='lg:pt-10 w-full flex flex-col lg:gap-y-5 -translate-y-[20px]'>
              <h4 className='mx-auto text-red-600 font-semibold'>{error}</h4>
             <div className='flex flex-col justify-start items-start lg:gap-y-[10px]'>
                <label className='font-semibold' htmlFor="name">User Name</label>
                <input value={Name} required onChange={(e)=>{setName(e.target.value)}} type="text" className={`w-full px-5 py-1 rounded-lg    ${error?'border-2 border-red-600':'border border-gray-500'}`} />
             </div>
             <div className='flex flex-col justify-start items-start lg:gap-y-[5px]'>
                <label className='font-semibold' htmlFor="Email">Password</label>
                <input value={Password} required onChange={(e)=>{setPassword(e.target.value)}} type="password" className={`w-full px-5 py-1 rounded-lg    ${error?'border-2 border-red-600':'border border-gray-500'}`} />
             </div>
             <button className={` rounded-lg text-white lg:py-2 text-xl font-semibold cursor-pointer w-full ${Name && Password ?'hover:bg-blue-300  bg-blue-500':'bg-gray-500'}`}>Sign in</button>
          </form>
    </div>
  )
}

export default page