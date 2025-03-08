import React from 'react'
import {useFormik} from 'formik'
import * as yup from "yup"

const Formik = () => {
    const formik = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
        },
        validationSchema:yup.object({
          name:yup.string().min(4, "name cannot be less than 4 characters").max(15,"we dont which name be that one").required("name is required"),
           email:yup.string().email("Must be a valid email").required("email is required"),
           password:yup.string().min(6, "password cannot be less than 6 characters").matches(`(?=.*[A-Z])`, "Must have at least one uppercase letter").required("password cannot be empty")
        }),
        onSubmit:(vale)=>{
           console.log(vale);
           
        }
    })

    console.log(formik.errors);
    
  return (
    <div>
        <form className='w-50 mx-auto px-3 py-3 mt-3' onSubmit={formik.handleSubmit} action="">
            <h1>Form</h1>
            <input className='form-control mt-3' onChange={formik.handleChange} name='name' type="text" />
            <p className='text-danger'>{formik.errors.name}</p>
            <input className='form-control mt-3' onChange={formik.handleChange} name='email' type="text" />
            <p className='text-danger'>{formik.errors.email}</p>
            <input className='form-control mt-3' onChange={formik.handleChange} name='password' type="text" />
            <p className='text-danger'>{formik.errors.password}</p>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Formik