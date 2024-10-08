import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "Yup"
import GenericPage from '../../Layouts/GenericPage'
import { useAuthorize } from '../../Context/AuthContext'
import {useNavigate} from "react-router-dom"
import "./register.css"
import { NavLink } from 'react-router-dom'
 
export default function Register() {
  const {register} = useAuthorize()
  const navigate = useNavigate()
  
  const initialValues = {
    username: "",
    password: ""
  }
 
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(7).max(15).required(),
    password: Yup.string().min(8).max(20).required()
  })
  
  const onSubmit = async (data) => {
    try {
      await register(data.username, data.password)
      navigate("/")
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <div id="register-page">
      <header className="user-form-header">
        <h1 className="logo">echo</h1>
      </header>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form  className="user-form">
          <h1 className="logreg-message">Welcome To Echo</h1>
          <label>Create a Username
            <ErrorMessage name="username" component="span"/>
            <Field name="username" className="register-input" placeholder="Enter Username"/>
          </label>
          <label>Create a Password
            <ErrorMessage name="password" component="span"/>
            <Field type="password" name="password" className="register-input" placeholder="Enter Password"/>
          </label>
          <button type="submit">Create Account</button>
          <p>Already Have An Account? Login <NavLink to="/login">Here!</NavLink></p>

        </Form>
      </Formik>

    </div>
  )
}
