import React from 'react'
import Image from 'next/image'
import clinicLogo from '../../../../public/clinicLogo.png'
type Props = {}

const About = (props: Props) => {
  return (
    <div className='w-full lg:px-[130px] flex justify-center gap-x-[50px] items-start lg:pb-[50px] lg:pt-[120px] lg:text-2xl relative' id='about us'>
       <div className='absolute flex justify-center items-center gap-x-[20px] top-[20px]'>
        <Image src={clinicLogo} alt='' className='lg:w-[120px] lg:w-[90px]' />
            <h1 className=' font-bold lg:text-3xl text-blue-500 '>About Us</h1>
        </div> 
        <div className='relative lg:w-[55%] lg:pt-[20px]'>
            <p className='font-bold text-gray-800 lg:text-4xl' > <span className='text-blue-500'>AY-Clinic</span> is a team of experienced medical professionals , that offer online services</p>
            <p className="text-sm absolute bottom-[5px] text-gray-600" >

            </p>
        </div>
        <img src={'https://i.pinimg.com/736x/c1/4f/50/c14f5087274290911a9c9de757b759f1.jpg'} alt="" className='w-[26%] h-[180px] rounded-tr-xl rounded-br-xl' />

    </div>
  )
}

export default About