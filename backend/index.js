const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userrouter = require("./routes/user.route")
const cors = require("cors")
require("dotenv").config()

app.use(cors({origin:"*"}))
app.use(express.json({extented:true, limit:"50mb"}))
app.use("/",userrouter)










const uri = "mongodb+srv://aishatadekunle877:aishat@cluster0.t92x8pf.mongodb.net/weekend?retryWrites=true&w=majority&appName=Cluster0"

const connect = () =>{
    try {
      const connection =  mongoose.connect(uri)
      if (connection) {
        console.log("connection to database successful")
      }
    } catch (error) {
        console.log(error);
        
    }
}
connect()  



const port = 7008
app.listen(port,()=>{
    console.log(`App started at port ${port}`);
    
})