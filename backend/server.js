
const express = require('express')
const app = express();
const port =  5000 || process.env.PORT
 app.use(require('./routes/router'))
 app.use(require('./database/db'))
app.get('/' , (req,res)=>{
     res.send('home')
})


app.listen(port,()=>{
console.log(`server connected at ${port} port `)

})