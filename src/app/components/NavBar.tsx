"use client"
import React, { ReactNode, useEffect } from 'react'
import clinicLogo from '../../../public/clinicLogo.png'
import Image from 'next/image'
import Link from 'next/link'
import { createContext } from 'react'
import { useSelector,UseDispatch, useDispatch } from 'react-redux'
import { navItemActions } from '@/redux/navItemSlice'

type Props = {
children:ReactNode
}

const NavBar = ({children}: Props) => {
  return (
    <div className='w-full flex justify-between items-center py-3  px-[70px]  '>
            <div className='flex justify-start items-center gap-x-[2px]'>
                  <Image src={clinicLogo} alt='' className='w-[120px] h-[50px] ' />
                  <div className='flex justify-start items-center gap-x-[20px] pl-[5px]'>
                     {children}
                  </div>
            </div>
            
            <Link href={'/SignIn'} className='lg:px-[14px] lg:py-[6px] rounded-lg font-semibold text-md bg-blue-500 text-white hover:bg-blue-600'>
                 Login
            </Link>
    </div>
  )
}

export default NavBar

export const NavItem=({item}:{item:string})=>{
    const dispatch=useDispatch();
    const itemName=useSelector((state:any)=>state.navItem.name)
    return <Link href={`/#${item}`} className={`text-lg font-semibold ${itemName==item ?'text-blue-500':'text-gray-800'} cursor-pointer hover:text-gray-600` } onClick={()=>{dispatch(navItemActions.updateItem(item))}}>
        {item}
    </Link>
}