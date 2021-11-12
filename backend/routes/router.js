const express = require('express')
const router = require('express').Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt') 
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }))
const jwt = require('jsonwebtoken')
const authUserModel  = require('./../database/db') 
const authenticate  = require('./../middleware/authenticate')
var cookieParser = require('cookie-parser');
router.use(cookieParser())



router.post('/register' ,async (req,res)=>{ 

    const { username , email , password } = req.body
  const isuser =await authUserModel.find({ $or: [ {username : username } , { email:email} , { password : password}] }) 
  
  if(isuser!=""){         
    res.send({
        success : 0 ,
        message  : "user already registered " 
   })

  } else{

    let hashpass = await bcrypt.hash(req.body.password , 5 )
    const result = new authUserModel({
       "username" :req.body.username,
       "email": req.body.email,
       "password" : hashpass
  }) 

  if(await result.save() ) {
       console.log( username + "user added ")
       res.send({
            success :  1 ,
            message  : "user registered succesfully "
       })
  }
  else{
                res.send({
                    success :  0 ,    
                    message : "user not registered"
                })
          } 

              } 

})

router.post('/login' ,async(req,res)=>{ 
    var { username , email , password} = req.body
    if(!((email && password) || (username && password)  ) ){
        res.send({
            success :  0 ,    
            message : "please provide username email and password "
        })
    } 
    else{
        const isuser =await authUserModel.find({ $or: [ {username : username } , { email:email}  ] })
        if(isuser!=""){
            console.log(isuser)
           const ispass= await bcrypt.compare(password,isuser[0].password) 
        
            if(ispass==true){
                // logged area 
                let token = await jwt.sign({_id:isuser[0]._id} ,'shashikantkumarmax')   
               const jwtupdate =await authUserModel.findOneAndUpdate({_id:isuser[0]._id } ,{ jwttoken: token })
               res.cookie(`jwttoken` , token , {expire : new Date() + 9999}) 

                if(username==isuser[0].username || email==isuser[0].email ){
                    res.json({
                       success :  1 ,    
                       user :{
                           _id : isuser[0]._id, 
                        username:isuser[0].username,
                        email:isuser[0].email
                       },  
                       message  : "succesfully logged in "    
                   })  
                   // logged in area 
                } 
                else{
                    res.send({
                        success :  0 ,    
                        message : "email and pass incorrect   "    
                    })
                }
                
               }
             else{
                res.send({
                    success :  0 ,    
                    message : "Invalid credentials   "    
                })
             }  
                      
            }
           
        else{
            res.send({
                success :  0 ,    
                message  : "Please signup first "
            })
    
        }
    
    }

})

router.get('/dashboard' , authenticate, (req,res)=>{
  res.send({
       message : "dashboard page" , user:{
           username: req.currentuser.username ,
           email:  req.currentuser.email 
    }
  })
    
})


router.get('/logout' ,(req,res)=> {

    res.clearCookie('jwttoken' )
     res.status(200).send({ loggedout: "logged out " ,success:1})
    
    })





module.exports= router


