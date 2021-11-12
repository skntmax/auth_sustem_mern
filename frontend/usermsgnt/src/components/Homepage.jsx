import react from 'react'
import React , {useState} from 'react'
import { useHistory  , Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import swal from 'sweetalert'
import './styling/style.css'

export default function Homepage() {
    const history = useHistory()
    const submit = ( e) =>{ 
        e.preventDefault()
    }
    const [user,setUser] = useState({
        username:" " ,
        email: "" ,
        password: " " 
    })
  
 const onchangeinput =(e)=>{
    setUser( { ...user , [e.target.name]: e.target.value }  )
 }

const signup = (e)=>{
    e.preventDefault()
    try{
      const {username ,email , password } = user; 
      axios.post('/register', {username ,email , password } ).then(res=>{
          console.log(res.data.success) 
           if(res.data.success==1){
                swal("Congratulations!", res.data.message, "success")
                history.push('/login')
              }

             else{
              swal("Error!", res.data.message, "error")
             } 

      }).catch(err=>{ 
        swal("Ops!", err, "error")
      })
   }
   
   catch(err){
        alert("error >>>> " + err)
      }
   }

    return (
        <>
            <div id="login-box">
  <div class="left">
    <h1>Sign up</h1>
     <form   method="post"  > 
    <input type="text" name="username" onChange={onchangeinput} placeholder="Username" />
    <input type="text" name="email" placeholder="E-mail" onChange={onchangeinput}  />
    <input type="password" name="password" placeholder="Password"  onChange={onchangeinput} />    
    <input type="submit" name="signup_submit"  onClick={signup} value = "Sign me up" />
    <Link  to="/login" className="btn btn-block " >Login  </Link>

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
