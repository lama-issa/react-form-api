import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import jwtDecode from "jwt-decode";
import ProtectedRout from './components/ProtectedRout';
import About from './components/About';

export default function App() {
  //userData:معناها اليوزر مش مسجل دخولهnull اذا كانت 
  let [userData,setuserData]=useState(null);
  let navigate=useNavigate();
  //userData:متغير من خلاله بعرف اذا اليوزر مسجل دخوله ولا لا
  //getuserData():userDataهاد الفنكشن يتم استدعائه لما نعمل لوج ان وبكون وظيفته انه يحط معلومات اليوزر جوا 
  //userData==null:اليوزر مش مسجل دخول
  // userData!=null:فيها داتا يعني اليوزر مسجل دخوله
//getuserData():userDataبفك التشفير وبحطه جوا 

  function getuserData(){//عشان يجيب البيانات من اللوكل ستورج بعد ما يفك تشفيرها وهي بيانات اليوزر الي مسجل دخوله 
  let decoded=jwtDecode(localStorage.getItem("userToken"));//لفك التشفير التوكن
  //console.log(decoded);//رح تطبع بيانات اليوزر بعد فك التشفير
  setuserData(decoded);//userData:هيك اليوزر داتا صار فيها معلومات اليوزر الي مسجل دخوله
  }

  useEffect(()=>{//من اول وجديدAppبشتغل لما يتم مناداة 
    //عشان لما اسجل دخول وبعدها اعمل ريفرش ما يرجعني على الفحة الاولى كاني بكون عامل لوج اوت يعني لما اعمل ريفرش هيك رح يخليني بالصفحة الي بكون انا فيها
    if(localStorage.getItem("userToken")){
      getuserData();
    }
  })
  
  function logout(){
    localStorage.removeItem("userToken");
    setuserData(null);
    navigate('/login');
  }

  /**
   *   <Route path='/login' element={<Login getdataforuser={getuserData}/>}></Route>:
   * getuserDataانا بعثت لصفحة اللوج ان فنكشن اسمه 
   * props
   * بالتالي هيك بصفحة اللوج ان بقدر اصل لهاد الفنكشن من خلال 
   * getdataforuser لما تستدعي الكومبونت لوج ان ابعثلي جواه المتغيرg
   */

  /**
   *  <Route  element={<ProtectedRout/>}اي صفحة ما بدي اضهرها لليوزر الي اذا كان عامل لوج ان فبحطها داخل
   * يعني هيك الهوم والاباوت ما يضهرن ولا رح يقدر اي شخص يدخل عليهن الا الشخص الي بكون مسجل دخوله
   * فهيك اليوزر اذا حاول يدخل على الهوم او الاباوت ما رح يقدر رح يرجعه على صفحة اللوج ان
   *  */
  
  return (
    <div className='App'>
      <Navbar user={userData} logout={logout}/>
      <Routes>
        <Route  element={<ProtectedRout/>}>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login getuserData={getuserData} />}></Route>
        
        
      </Routes>
  
    </div>
  );
}