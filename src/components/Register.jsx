import React, { useState } from 'react'
import joi from "joi";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
//بدنا نبعث داتا للباك اند
//بدي ابعث داتا من الفرونت للباك وهاد الداتا رح تنضاف على الداتا بيس

//بكون في نوعين من الفاليديش ايرور اشي من الباك واشي من الفرونت
export default function Register() {

  let navigate = useNavigate();
    let [errorlist,seterrorlist]=useState([]);
    let [user,setuser]=useState({
      //عرفنا اوبجكت اسمه يوزر
        name:"",
        email:"",
        age:0,
        password:""
    });

    function getuserdata(e){
        let myuser=user;
        myuser[e.target.name]=e.target.value;
        setuser(myuser);
    }
    async function submitregister(e){
        e.preventDefault();//عشان ما يعمل ريفرش

//validation from front end
        let resultvalidation=valedationregisteruser(user);//بشوف اذا في غلط في القيم المرسلة بناء على القوانين الي حددتله اياهن مثلا ممنوع الاسم يقل عن 4 احرف
        if( resultvalidation.error){//اذا كان في ايرور
            //list error
            console.log(resultvalidation);
            seterrorlist(resultvalidation.error.details);//اريه بحط فيها كل الايرور
        }else{
          //go to back end
          //اذا ما في ولا ايرور اطبع اوك عشان بعدها نروح نشتغل على الباك اند
          //https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup:هاد الرابط من الباك اند الي بدي ابعث عليه المعلومات 
          //user:الداتا
            
            //{data}الرد من الرابط رح نخزنه في 
            //{data}:رح يتخزن فيه الرد تبع الباك اند
            let {data} = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",user);
            console.log(data);
            if(data.message=== 'success'){//يعني الداتا تخزنت بالداتا بيس بشكل صح (يعني عشان اتاكد انه عامل لوج ان صح)
              //message:'success':هاي الرسالة من الباك هو الي بحطها اذا وصلت الداتا وتخزنت بالداتا بيس بشكل صح لكن مش شرط تكون هيك حسب شو الباك بسمي 
              navigate('/login');//بدي احول اليوزر على صفحة اللوج ان
              
              //login:نفس الي ب الباث
            }
            //هيك انا البيانات الي رح ادخلها بالفورم من الفرونت اند رح تنبعث للباك اند وتتخزن هاي البيانات في الداتا بيس
      //https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers: هاد الرابط من الباك رح تنضاف عليه كل البيانات الي دخلتها بالفورم من الفرونت 
        }
    }

    function valedationregisteruser(user){
        let schema=joi.object({
            name:joi.string().min(4).max(20).required(),
            email:joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}),
            age:joi.number().min(20).max(80).required(),
            password: joi.string().required().pattern(/^[A-Z][a-z]{3,8}$/).messages({
              "string.pattern.base": "invalid password pattern",
              "string.empty": "password is empty"
          }),
            cPassword: joi.valid(joi.ref('password')).required()//لازم يكون الباسورد نفس كونفيرم باسورد  
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
 
  <form onSubmit={submitregister} className=" w-50 m-auto">
  <div className="mb-3">
      <label htmlFor="name" className="form-label" >Name</label>
      <input  className="form-control" name='name' type="name" id='name' onChange={getuserdata}/>
    </div> 

    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" id="email" name='email' onChange={getuserdata} />
    </div>

    <div className="mb-3">
      <label htmlFor="age" className="form-label">Age</label>
      <input type="number" className="form-control" id="age" name='age' onChange={getuserdata} />
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">password</label>
      <input type="password" className="form-control" id="password"  name='password' onChange={getuserdata} />
    </div>

    <div className="mb-3">
    <label htmlFor="password" className="form-label">confarm password</label>
    <input  name="cPassword"  type="password" className="form-control" id="password2"  onChange={getuserdata}/>
  </div>
  
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
</div>

   </>
  )
}
