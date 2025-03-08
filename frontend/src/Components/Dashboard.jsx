import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    const navigate = useNavigate()
   const token = localStorage.getItem("token")
   const [image, setimage] = useState("")

   useEffect(() => {
     axios.get("http://localhost:7008/user/verify",{
        headers:{
            Authorization:`bearer ${token}`
        },      
     }).then((res)=>{
          console.log(res);
          
     }).catch((err)=>{
        if(err.response.data.message == "jwt expired"){
            localStorage.removeItem("token")
            navigate("/login")
        }else{
            navigate("/login") 
        }     
     })

   }, [])
   
   const handlefilechange = (e) =>{
    const imagefile = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(imagefile)
    reader.onload = (e)=>{
       setimage(e.target.result)
    }
   }

   const Uploadimage = () =>{
    axios.post("http://localhost:7008/user/upload",{image},{
        headers:{
            Authorization:`bearer ${token}`
        },     
    })
    .then((res)=>{
        console.log(res);
        
    }).catch((err)=>{
        console.log(err);
        
    })
   }
   
  return (
    <div>
        <div>
            <h1>This is your Dashboard</h1>
            <input onChange={handlefilechange} type="file" />
            <button onClick={Uploadimage}>Upload</button>
        </div>
    </div>
  )
}

export default Dashboard