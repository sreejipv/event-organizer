import { useState } from 'react'
import { CREATE_USER_MUTATION, CREATE_EVENT_MUTATION, GET_USER } from '../../db/quries/events'
import { useMutation, useQuery } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
// import GoogleButton from 'react-google-button'
import LogoSvg from '../../assets/images/google_button.svg'
import GoogleButton from './GoogleButton';


export default function Login({ }) {
  console.log('LogoSvg', LogoSvg)
  const [formData, setFormData] = useState({});
  const [createUser, { error: createUserError }] = useMutation(CREATE_USER_MUTATION)
  const { loading, error, data } = useQuery(GET_USER);
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

    <div className="flex flex-col   px-8  w-96">
      <h1 className=" text-lg font-semibold mt-2 pb-7">
        Sign up and create your events effortlessly
      </h1>

      <GoogleButton />

      <div class="flex items-center justify-center">
        <hr class="border-t border-gray-400 flex-grow mr-3" />
        <span class="text-sm text-gray-500  text-sm">or</span>
        <hr class="border-t border-gray-400 flex-grow ml-3" />
      </div>

      <>
        <p className="text-xs pb-2">Name</p>
        <input className="pl-2 border-grey-800 border py-1 mb-3"
          type="text"
          name="name"
          placeholder=""
          onChange={handleChange}
        />

        <p className="text-xs pb-2">Email</p>
        <input className="pl-2 border-grey-800 border py-1 mb-3"
          type="text"
          name="email"
          placeholder=""
          onChange={handleChange}

        />


        <p className="text-xs pb-2">Password</p>
        <input className="pl-2 border-grey-800 border py-1 mb-3"
          type="text"
          name="password"
          placeholder=""
          onChange={handleChange}

        />
      </>
      <div className="flex flex-col justify-between w-100">

        <button onClick={onNext} class="bg-black w-full text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <div class="flex items-center justify-center">
        
          <span>Create an account</span>
        </div>
      </button>
     

      <div class="flex items-center justify-center">
        <hr class="border-t border-gray-400 flex-grow mr-3" />
        <span class="text-sm text-gray-500 text-sm">Already have an account?</span>
        <hr class="border-t border-gray-400 flex-grow ml-3" />
      </div>


      <button onClick={onNext} class="bg-black w-full text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        <div class="flex items-center justify-center">
        
          <span>Login</span>
        </div>
      </button>

      </div>
    </div>


  )
}