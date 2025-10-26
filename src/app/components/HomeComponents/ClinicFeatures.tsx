import React, { ReactNode } from 'react'

type Props = {
    children:ReactNode
}

const ClinicFeatures = ({children}: Props) => {
  return (
    <div className='flex justify-start items-start lg:gap-x-[28px] '>
        {children}
    </div>
  )
}

export default ClinicFeatures


export const Feature=({number,information}:{number:string,information:string})=>{
   return <div className='flex flex-col justify-start items-start'>
   <h1 className='font-bold text-white text-3xl '>{number}</h1>
   <p className='text-sm text-white font-semibold lg:pt-[2px]'>{information}</p>

</div>
}
