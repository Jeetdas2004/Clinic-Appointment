"use client"
import Link from 'next/link'
import React, { ReactNode, useState,useContext,createContext, useEffect  } from 'react'
import { FaAddressCard , FaHornbill } from "react-icons/fa";
import { MdFilterVintage , MdHomeRepairService} from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import { UseDispatch , useSelector} from 'react-redux';
import {createAppointment} from '../DataFunction/Appointment';
import { ToastContainer,toast } from 'react-toastify';
import { DoctorType, ServiceType } from '../Types';

const Appointments = ({visible,setVisible}:{visible:boolean,setVisible:any}) => {


  const doc:DoctorType[]=useSelector((state:any)=>state.doctors)
  const services:ServiceType[]=useSelector((state:any)=>state.service.services)
  console.log(services)

  const showSuccessAlert = () => {
    toast.success(`Appointment registered successfully! Date ${formData.date}`, {
      position: "top-left",
      autoClose: 5000,
      style: { 
        background: "white",
        fontFamily: "'Poppins', sans-serif",
        borderRadius: "10px",
        width:"100%"
      },
       
    });
  };
 
    const [information, setInformation] = useState(1)
    const [alert,setAlert]=useState({show:false,message:'your appointment has been seccessfully created ',type:'success'})
    const [formData, setFormData] = useState({
      fullName: "",
      IdentityNumber:'',
      Age: 0,
      email: "",
      illness:"",
      service:"Dental",
      doctor:"680a514afc433c7c18b33fa6",
      date:new Date()
    })

    useEffect(()=>{
      console.log(formData.date)
    }
    ,[formData.date])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent< HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if( formData.illness!=''){
      createAppointment({patientName:formData.fullName,patientId:formData.IdentityNumber,doctor:formData.doctor,age:formData.Age,illness:formData.illness,date:formData.date})
      setInformation(1)
      showSuccessAlert()

      setTimeout(()=>{
        setVisible(false)
      },5000)
      handleCancel();

     
    }
    
  }

  const Next=()=>{
    if(formData.fullName && formData.email && formData.Age && formData.IdentityNumber){
      setInformation(2)
    }
  }

  const Previouse=()=>{
    setInformation(1)

  }
  const handleCancel=()=>{

    formData.fullName='';
    formData.IdentityNumber='';
    formData.Age=0;
    formData.illness='';
    formData.service='';
    formData.email='';
    formData.doctor='';
    

  }
  return (
    <div className={`flex items-center py-12  px-12 rounded-xl   justify-center  bg-white  absolute z-10 left-[50%] -translate-x-[50%] top-[50%] transition-all duration-800 shadow-lg border-2 border-blue-500 ${visible ? "-translate-y-[47%]" : "-translate-y-[1000px]"}` }>
    <div className="w-full max-w-md  rounded-lg text-black ">
     <ToastContainer className={'w-full'}/>
      <button onClick={()=>{setInformation(1),setVisible(false);handleCancel()}} className="absolute right-5 top-5 rounded-md lg:px-3 lg:py-1 text-white bg-red-600 hover:px-4 transition-all duration-700 cursor-pointer">Cancel</button>
      <form onSubmit={handleSubmit} className="space-y-2 ">
        <div className={`space-y-2 ${information===1?'block':'hidden'}`}>
            <label htmlFor="IdentityNumber" className="block text-sm">
             Identity Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <FaAddressCard />
                  
              </div>
              <input
                type="Number"
                id="IdentityNumber"
                name="IdentityNumber"
                value={formData.IdentityNumber}
                onChange={handleChange}
                placeholder="Identity number"
                className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              />
            </div>
          

          
        </div>


        <div className={`space-y-2 ${information===1?'block':'hidden'}`}>         
            <label htmlFor="fullName" className="block text-sm">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              />
            </div>
          

          
        </div>


        <div className={`space-y-2 ${information===1?'block':'hidden'}`}>
                      <label htmlFor="Age" className="block text-sm">
             Age
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
                <MdFilterVintage />
                  
              </div>
              <input
                type="number"
                id="Age"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                placeholder="Your age"
                className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
                required
              />
            </div>
          

          
        </div>

        

        <div className={`space-y-2 ${information===1?'block':'hidden'}`}>     
               <label htmlFor="email" className="block text-sm">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
              required
            />
          </div>
        </div>
       


        <div className={`space-y-2 ${information===2?'block':'hidden'}`}>
          <label htmlFor="doctor" className="block text-sm">
            Service
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
            <MdHomeRepairService />

            </div>
            <select
              
              id="service"
              name="service"
              onChange={handleChange}
              value={formData.service}
              className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
              required
            >
              <option value="">Select a service</option>
              
              {services.map((service:any,index:number)=><option key={index} value={service._id}>{service.name}</option>)}

              </select>
          </div>
        </div>
        
        <div className={`space-y-2 ${information===2?'block':'hidden'}`}>     
               <label htmlFor="email" className="block text-sm">
            Illness
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
            <input
              type="text"
              id="illness"
              name="illness"
              value={formData.illness}
              onChange={handleChange}
              placeholder="illness"
              className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
              required
            />
          </div>
        </div>

        <div className={`space-y-2 ${information===2?'block':'hidden'}`}>
          <label htmlFor="doctor" className="block text-sm">
            Doctor
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
            <FaUserDoctor />

            </div>
            <select
              
              id="doctor"
              value={formData.doctor}
              name="doctor"
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
              required
            >
                            <option value="">Select a doctor</option>
                            {doc.map((doctor:any,index:number)=><option key={index} value={doctor._id}>{doctor.name}</option>)}

              </select>
          </div>
        </div>

        <div className={`space-y-2 ${information===2?'block':'hidden'}`}>
          <label htmlFor="date" className="block text-sm">
            Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
            <BsCalendar2DateFill />

            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={(formData.date).toString()}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 bg-white border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-neutral-700"
              required
            />
          </div>
        </div>

        

      
   

        <p className="text-xs text-neutral-500 mt-1">
          By creating an account, you agree to the{" "}
          <Link href="/terms" className="text-neutral-400 hover:underline">
            Terms of Service
          </Link>
          . We'll occasionally send you account-related emails.
        </p>
      </form>
      <button
          onClick={Next}
          className={`w-full py-1 mt-4  text-black font-medium rounded transition-colors  ${formData.fullName && formData.email && formData.Age && formData.IdentityNumber?'bg-blue-500 hover:bg-blue-400 cursor-pointer':'bg-gray-400 '} ${information===1?'block':'hidden'}`}
        >
           Next     
   </button>
   <div className='w-full flex justify-between items-center'>
   <button
          onClick={Previouse}
          className={`w-1/3 py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors cursor-pointer  ${information===2?'block':'hidden'}`}
        >
           Back     
   </button>
   <button
          type="submit"
          onClick={handleSubmit}
          className={`w-1/3 py-1 mt-4 bg-amber-400  text-black font-medium rounded transition-colors  ${formData.date && formData.illness   ?'bg-yellow-400 hover:bg-yellow-500 cursor-pointer':'bg-gray-400 '}  ${information===2?'block':'hidden'}`}
        >
           Confirm     
   </button>
   </div>

      
    </div>
  </div>
  )

}

export default Appointments

