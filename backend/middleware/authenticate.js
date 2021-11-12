const jwt = require('jsonwebtoken')
const authUserModel  = require('./../database/db') 

const authenticate = async (req,res,next)=>{
    try{
         const istoken  = req.cookies.jwttoken 
         console.log(istoken)
        const varifytoken =  await jwt.verify(req.cookies.jwttoken,'shashikantkumarmax' )
        const rootuser= await authUserModel.findOne({ _id:varifytoken._id , jwttoken:istoken  })   
       console.log(varifytoken)
        if(!rootuser){ throw new Error('user not found ')}
       req.token= istoken;
       req.currentuser= rootuser 
       req.userId= rootuser._id 
            next()
    }
    catch(err){
         res.status(401).send("unauthorized user ")
         console.log(err)
    }
      

}

 
module.exports= authenticate