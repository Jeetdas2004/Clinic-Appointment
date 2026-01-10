"use client"

import React, { ReactNode , useEffect } from 'react'
import { Provider , useDispatch } from 'react-redux'
import store from '../../../src/redux/index'
import { getDoctors } from '../DataFunction/Dctors'



const WrapComponent = ({children}: {children:ReactNode}) => {



  return (
    <div>
      <Provider store={store}>
         {children}
      </Provider>
    </div>
  )
}

export default WrapComponent

