import React, { useState } from 'react'
import joi from "joi";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {

  let navigate = useNavigate();
    let [errorlist,seterrorlist]=useState([]);
    let [user,setuser]=useState({
        email:"",
        password:""
    });

    function getuserdata(e){
        let myuser=user;
        myuser[e.target.name]=e.target.value;
        setuser(myuser);
    }
    async function submitregister(e){
        e.preventDefault();//عشان ما يعمل ريفرش

        let resultvalidation=valedationregisteruser(user);
        if( resultvalidation.error){  
            //list error
            console.log( resultvalidation);
            seterrorlist(resultvalidation.error.details);//
        }else{
          
            let {data} = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",user);
          console.log(data);
            if(data.message=== 'success'){ 
              //token: هاي الباك اند برجعها بتكون فيها بيانات اليوزر الي مسجل دخوله
        localStorage.setItem("userToken",data.token);//بخزن التوكن في اللوكل ستورج
        props.getuserData();//هاد الفنكشن حصل عليه من app.jsx
        //getuserData():بطبعلي الداتا تاعت اليوزر بعد ما يفك تشفيرها 
      
              navigate('/home');//بحول اليوزر على صفحة الهوم بعد ما يعمل لوج ان
            }
             
        }
    }

    function valedationregisteruser(user){
        let schema=joi.object({
            email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
            password: joi.string().required().pattern(/^[A-Z][a-z]{3,8}$/).messages({
              "string.pattern.base": "invalid password pattern",
              "string.empty": "password is empty"
          }),
        })
        return schema.validate(user,{abortEarly:false});
    }

  return (
   <>
   {errorlist.map((err,index)=>
   <div className='alert alert-danger'>
    {err.message}
   </div>
   )}


   <div>
  <form onSubmit={submitregister} className="w-50 m-auto">
 

    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" name='email' onChange={getuserdata} />
    </div>


    <div className="mb-3">
      <label htmlFor="password" className="form-label">password</label>
      <input type="password" className="form-control" id="password"  name='password' onChange={getuserdata} />
    </div>

    
  
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>

   </>
  )
}
