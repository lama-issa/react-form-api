import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {//props:عشان بده يستقبل من الاب تبعه وهو app.js 
  //رح يستقبل user={userData}
  return (
    <>
<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" href="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
{
  //يعني مسجل دخولهulاذا كان في داتا جوا البروبس اضهرلي 
  //props.user==null:يعني اذا كان اليوزر مش مسجل دخوله
  props.user?<> 

    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
       <li className="nav-item">
         <Link className="nav-link" to='/home'>Home</Link>
       </li>

       <li className="nav-item">
         <Link className="nav-link" to='/about'>about</Link>
       </li>

       <li className="nav-item">
         <Link className="nav-link active"  to='/home'>contact</Link>
       </li>
     </ul>
     </>:null  //: else
}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      
      {props.user==null?<li className="nav-item">
          <Link className="nav-link" to='/register'>Register</Link>
        </li>:null}

        {props.user==null?<li className="nav-item">
          <Link className="nav-link" to='/login'>Login</Link>
        </li>:null}

       {props.user? <li className="nav-item">
          <span className="nav-link active" aria-current="home" onClick={props.logout}>Logout</span>
        </li>:null}
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}
