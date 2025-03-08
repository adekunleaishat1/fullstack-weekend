const express = require("express")
const userrouter = express.Router()
const {RegisterUser,LoginUser,verifyuser ,uploadProfile, forgotpassword, resetpassword} = require("../controllers/user.controller")
const uservalidation = require("../middleware/uservalidation")
const validateform = require("../middleware/validator")


userrouter.post("/user/signup", validateform(uservalidation), RegisterUser)
userrouter.post("/user/login",LoginUser)
userrouter.get("/user/verify",verifyuser)
userrouter.post("/user/upload" , uploadProfile)
userrouter.post("/user/forgotpassword" , forgotpassword)
userrouter.post("/user/resetPassword" , resetpassword)






module.exports = userrouter
