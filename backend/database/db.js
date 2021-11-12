const  mongoose  = require("mongoose")

mongoose.connect("mongodb://localhost:27017/authentication", {
    useNewUrlParser: true,
     useUnifiedTopology: true
 }).then(()=>{
      console.log('authentication databse connected ')
 }).catch(err=>{ 
     console.log(err)
 })

 const authUserModel = mongoose.model('user' , {
 username : {
      type:String ,
    required :true

 },
 email : {
    type:String,
    required :true

}, 
password: {
    type:String ,
    required :true
},
jwttoken: {
    type:String 
     
}
 
     
})

module.exports = authUserModel