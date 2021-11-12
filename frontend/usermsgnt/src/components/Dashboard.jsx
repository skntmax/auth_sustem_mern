import axios from 'axios'
import React ,{useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './styling/dashboard.css'
export default function Dashboard() {
    const [userdata,setUserData] =useState({
        username: "" ,
        email: "" ,
     })

     
  useEffect(()=>{
  try{
console.log("use effect called ")
axios.get('/dashboard').then(res=>{
      setUserData({ 
          username: res.data.user.username,
          email: res.data.user.email,
       })
})
}catch(err){
     alert(err)
}

       
  } ,[])






    return (
        <>      
<script src=""></script>
<div id="throbber" style={{"display":"none", "min-height":"120px"}} ></div>
<div id="noty-holder"></div>
<div id="wrapper">
    {/* <!-- Navigation --> */}
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">{userdata.email}</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="https://bryanrojasq.wordpress.com">
                <img src="http://placehold.it/200x50&text=LOGO" alt="LOGO" />
            </a>
        </div>
        <ul className="nav navbar-right top-nav">
            <Link className="btn btn-primary" to="/logout">Logout </Link>
        </ul>
       
    </nav>

    <div id="page-wrapper">
        <div className="container-fluid">
            <div className="row" id="main" >
                <div className="col-sm-12 col-md-12 well" id="content">
                    <h1>Welcome {userdata.username}</h1>
                </div>
            </div>
        </div>
    </div>
</div> 
            
        </>
    )
}
