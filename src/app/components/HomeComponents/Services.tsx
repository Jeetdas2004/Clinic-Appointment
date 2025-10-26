"use client"
import React,{ReactNode , useMemo} from 'react'
import Image from 'next/image'
import clinicLogo from '../../../../public/clinicLogo.png'
import { useDispatch, useSelector } from 'react-redux'
import ServiceActions from '../../../redux/ClinicServiceSlice'
import ServicesDeatlis ,{Service} from './ServiceDeatlis'
import { ServiceType } from '@/app/Types'

const Services = ({children}: {children:ReactNode}) => {
  const services=useSelector((state:any)=>state.service.services)
  const displayServices=useMemo(()=>{
     return services.map((service:ServiceType,ind:number)=>{
        return <Service key={ind} index={ind+1} title={service.name} description={service.description}  >
        <img src={service.logo} alt=""className='w-[29%] h-[200px] rounded-tl-xl rounded-bl-xl ' />
       </Service>
     })
          
  },[services])
  return (
    <div className='w-full lg:px-[70px]  lg:pt-[20px] 'id='services'>
        <div className='flex justify-center items-center lg:gap-x-[10px] w-full'>
            <Image src={clinicLogo} alt='' className='lg:w-[120px] lg:w-[90px]' />
            <h1 className='font-bold lg:text-3xl text-blue-500'>Our Services</h1>
        </div>
        <div className='flex justify-center items-center gap-x-[50px] lg:pt-[30px] w-[70%] mx-auto'>
        {children}
        </div>
        <ServicesDeatlis>
           {displayServices}
        </ServicesDeatlis>

    </div>
  )
}

export default Services

export const ServiceItem=({children,information,index}:{children:ReactNode,information:string,index:number})=>{
    const service=useSelector((state:any)=>state.service.currentService)
    const dispatch=useDispatch();
    return <div className={`col-span-1 flex flex-col justify-center items-center lg:gap-y-[10px] rounded-tr-xl rounded-bl-xl   lg:pt-[15px] cursor-pointer ${service==index?'bg-blue-500 text-white':'text-blue-500'} lg:px-[15px] hover:bg-blue-200`} onClick={()=>{dispatch(ServiceActions.actions.updateService(index))}}>
             <div className={`${service==index?' text-white':'text-blue-500'} `}>{children}</div>
         <h1 className='font-bold '>{information}</h1>
    </div>
}