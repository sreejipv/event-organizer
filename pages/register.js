import { useState } from 'react'
import { CREATE_USER_MUTATION, CREATE_EVENT_MUTATION, GET_USER } from '../db/quries/events'
import { useMutation, useQuery } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
import LoginContainer from '../components/Auth/LoginContainer';

export default function Register({ }) {
  const [formData, setFormData] = useState({});
  const [createUser, { error: createUserError }] = useMutation(CREATE_USER_MUTATION)
  const { loading, error, data } = useQuery(GET_USER);
  console.log('data', data)
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  function onNext() {

    createUser({
      variables: {
        input: {
          name: formData.name, // use the name value from formData
          email: formData.email, // use the email value from formData
          password: formData.password, // use the password value from formData
        }
      }
    })
      .then((result) => {
        console.log('user added', result.data)
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      })
  }

  return (
    <div>
      <LoginContainer page="register" />
    </div>
  )
}