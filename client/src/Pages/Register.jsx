import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "Yup"
import axios from "axios"

export default function Register() {

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
      const response = await axios.post("http://localhost:3001/user/register", data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className="register-page">
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Form className="register-form">
          <label>Create a Username:</label>
          <ErrorMessage name="username" component="span"/>
          <Field name="username" className="register-input"/>
          <label>Create a Password:</label>
          <ErrorMessage name="password" component="span"/>
          <Field type="password" name="password" className="register-input"/>
          <button type="submit">Create Account</button>

        </Form>
      </Formik>

    </div>
  )
}
