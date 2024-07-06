import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "Yup"
import GenericPage from '../Components/GenericPage'
import { useAuthorize } from '../Context/AuthContext'
import {useNavigate} from "react-router-dom"

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
    <GenericPage headerTitle="Register" pageId="register-page">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form className="register-form" id="user-form">
          <label>Create a Username:</label>
          <ErrorMessage name="username" component="span"/>
          <Field name="username" className="register-input"/>
          <label>Create a Password:</label>
          <ErrorMessage name="password" component="span"/>
          <Field type="password" name="password" className="register-input"/>
          <button type="submit">Create Account</button>

        </Form>
      </Formik>

    </GenericPage>
  )
}
