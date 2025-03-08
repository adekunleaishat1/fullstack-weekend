
const usermodel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("../utils/cloudinary")
const Sendemail = require("../utils/mailer")
const SendOtp = require("../utils/otp.mailer")
const generateotp = require("../utils/generator")
const otpmodel = require("../models/otp.model")


 const RegisterUser = async (req, res) =>{
    try {
        const {password, email, name, age} = req.body
        console.log(req.body);
        if (req.body) {
           const hasedpassword = await bcrypt.hash(password, 10)
           console.log(hasedpassword);
           
          const user =  await usermodel.create({
            name,
            age,
            email, 
            password:hasedpassword
          })
          
          if (user) {
            await Sendemail(email, name )
              res.status(201).json({ message: "User created successfully" })
          }else{
             res.status(400).json({ message: "Failed to create user" })
          }
        }
        
        } catch (error) { 
         console.log(error);
         res.status(500).json({ message: error.message })
        }
}


  const LoginUser = async(req, res) =>{
    try {
        console.log(req.body);
        const {email, password} = req.body
        if (!email || !password) {
          res.status(402).json({message:"All fields are mandatory",status:false})
        }else{
           const existuser =  await usermodel.findOne({email:email})
           if (!existuser) {
            return res.status(405).json({message:"This user does not exist, please Register!",status:false})
           }
          const ismatch = await bcrypt.compare(password, existuser.password)
          console.log(ismatch);
          if (!ismatch) {
           return  res.status(407).json({message:"Incorrect Password",status:false})
          }
          const token = await jwt.sign({email},process.env.SCERETKEY,{expiresIn:"1d"})
          console.log(token);
          
          return  res.status(200).json({message:"User login succesful", status:true,token})
        }
        
      } catch (error) {
        res.status(500).json({message:error.message, status:false})
      }
  }
  

  const verifyuser =async (req, res) =>{
    try {
      const token = req.headers.authorization.split(" ")[1]
      console.log(token);
      if (!token) {
        res.status(400).json({message:"Invalid token",status:false})
      }else{
        const decodedtoken = await jwt.verify(token, process.env.SCERETKEY)
        console.log(decodedtoken);
        if (decodedtoken) {
          res.status(200).json({message:"token verification successful",status:true})
        }else{
          res.status(405).json({message:"error verifying token",status:false})
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({message:error.message,status:false})
    }
  } 

  const uploadProfile = async(req, res)=>{
   try {
    const {image} = req.body
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    const decodedtoken = jwt.verify(token, process.env.SCERETKEY)
    console.log(decodedtoken);
    
    if (!decodedtoken) {
      res.status(400).send({message:"invalid token", status:false})
    }else{
     const uploadedimage = await cloudinary.uploader.upload(image)
     console.log(uploadedimage.secure_url);
      const updateimge =  usermodel.findOneAndUpdate(
        {email:decodedtoken.email},
        {$set:{Profileimage:uploadedimage.secure_url}},
        {new:true}
      )
      console.log(updateimge);
      

      if (updateimge) {
        res.status(200).send({message:"profile updated successfully", status:true})
      }else{
        res.status(404).send({message:"error updating profile", status:false})
      }
     
    }
   } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message,status:false})
   }
  }

  const forgotpassword = async (req, res)=>{
     try {
      const {email} = req.body

    const user =  await usermodel.findOne({email})
    console.log(user);
    if (!user) {
      res.status(404).send({message:"user not found", status:false})
    }else{
      const otp = generateotp()
      await otpmodel.create({
        otp,
        email:user.email
      })
     const sentmail = await SendOtp(user.email, user.name,otp)
      if (sentmail) {
       res.status(200).send({message:"otp has been sent to your mail", status:true})
     }
    }
     } catch (error) {
      res.status(500).send({message:error.message, status:false})
     }
  }
  
   const  resetpassword = async (req, res) =>{ 
    try {
      console.log(req.body);
      const {otp, newpassword} = req.body
      const user = await otpmodel.findOne({otp})
      console.log(user);

      if (!user) {
        res.status(404).send({message:"otp is invalid", status:false})
      }else{
        const hashpassword = await bcrypt.hash(newpassword, 10)
        const updateduser = await usermodel.updateOne(
          {email:user.email},
          {$set:{password:hashpassword}}
        )
        if (updateduser) {
         await otpmodel.deleteOne({otp})
          res.status(200).send({message:"password reset successful", status:true})
        }
      }
      
      
    } catch (error) {
      res.status(500).send({message:error.message, status:false})
    }
   }

module.exports = {RegisterUser,LoginUser,verifyuser,uploadProfile, forgotpassword, resetpassword}