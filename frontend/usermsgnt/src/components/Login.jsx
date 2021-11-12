import axios from 'axios'
import React , {useState} from 'react'
import { Link,useHistory } from 'react-router-dom'
import './styling/style.css'
import swal from 'sweetalert'

export default function Login() {
  let history = useHistory();
    const [user,setUser] = useState({
        email : "" ,
       password: ""
    })
  
   

  const onchangeinput =(e)=>{
      setUser( { ...user , [e.target.name]: e.target.value }  )
      console.log(user)
    }
 const signin =(e)=>{
   e.preventDefault()
   try{
   const { email , password } = user ;
   console.log()  
  axios.post('/login' , { email , password } ) .then(res=>{ 
   console.log( res)
    if(res.data.success==0) { 
      swal("ops!", res.data.message, "error")

   }
   if(res.data.success==1){ 
    swal("hurray!", res.data.message, "success")
    history.push('/dashboard')
   }
    
  }).catch(err=>{ 
    swal("warning!", err, "warning")
  })

 }catch(err){
  swal("Error!", err, "error")
 }
  
 }



  return (
        <>
             <div id="login-box">
  <div class="left">
    <h1>Login</h1>
     <form   method="post"  > 
    <input type="text" name="email" placeholder="userne or email" onChange={onchangeinput}  />
    <input type="password" name="password" placeholder="Password"  onChange={onchangeinput} />    
    <input type="submit" name="signup_submit"  onClick={signin} value= "Sign in " />
    <Link  to="/" className="btn btn-block " >Sign up  </Link>
    </form>
  </div>
  
  <div class="right">
    <span class="loginwith">Sign in with<br />social network</span>
    
    <button class="social-signin facebook">Log in with facebook</button>
    <button class="social-signin twitter">Log in with Twitter</button>
    <button class="social-signin google">Log in with Google+</button>
  </div>
  <div class="or">OR</div>
</div>
          
        </>
    )
}
