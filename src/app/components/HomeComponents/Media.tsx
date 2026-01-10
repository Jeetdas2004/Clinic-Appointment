import React, { ReactNode } from 'react'
import Link from 'next/link'

type Props = {}

const Media = ({children}: {children:ReactNode}) => {
  return (
    <div className='flex justify-start items-center gap-x-[40px] '>
          {children}
    </div>
  )
}

export default Media

export const MediaItem=({children,ref}:{children:ReactNode,ref:string})=>{
    return <Link href={ref} className='text-white'>
       
          {children}
       
    </Link>
        
    
}