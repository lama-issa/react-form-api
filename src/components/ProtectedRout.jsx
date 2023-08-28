import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRout() {

   if(!localStorage.getItem("userToken")){//مش مسجل دخوله
    return <Navigate to='/login' />
   }else{
    return <Outlet/>//urlوديني على الصفحة الي بطلبها اليوزر في 
    //يعني اذا بده يدخل على الهوم بدخله عليها
   }
  
}
