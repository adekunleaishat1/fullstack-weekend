import React ,{useState}from 'react'
import axios from 'axios'
import {ToastContainer, toast} from "react-toastify"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    const Loginuser = () => {
        if(email === "" || password === "") {
            toast.error("Please fill all the fields");
        }else{
            console.log(email, password);
            axios.post("https://fullstack-weekend.onrender.com/user/login",{email, password})
            .then((res)=>{
                console.log(res);
                localStorage.setItem("token", res.data.token)
                toast.success(res.data.message)
                navigate("/dashboard")
            }).catch((err)=>{
                console.log(err);
                
            })
        }
    }
  return (
    <div>
        <div className='mx-auto w-50 shadow px-3 py-3'> 
            <h1> Login Page </h1>
            <div className='form-group'>
                <label htmlFor="">Email</label>
               <input onChange={(e)=> setemail(e.target.value)} className='form-control' type="text" />
            </div>
           <div  className='form-group mt-3'>
            <label htmlFor="">Password</label>
            <input onChange={(e)=> setpassword(e.target.value)} className='form-control'  type="password" />
           </div>
           <div className='mt-3'>
            <button onClick={Loginuser} className='btn btn-dark'>Login</button>
            <ToastContainer/>
           </div>
        </div>
    </div>
  )
}

export default Login