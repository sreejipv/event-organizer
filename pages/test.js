import { useState } from 'react'
import { CREATE_USER_MUTATION, CREATE_EVENT_MUTATION} from '../db/quries/events'
import {useMutation } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";

var classNames = require('classnames');

export default function Test({ }) {
    const [name, setName] = useState('')
    const [eventDetails, setEventDetails] = useState('')
    const [formData, setFormData] = useState({});
    const [createUser, { error: createUserError }] = useMutation(CREATE_USER_MUTATION)
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    function handleChange(e) {
        const {name, value} = e.target
        setFormData((prevData)=> ({ ...prevData, [name]: value}))
    }
    function onNext() {
      
        createUser({
          variables:{
            input:{
              name: formData.name, // use the name value from formData
              email: formData.email, // use the email value from formData
              password: formData.password, // use the password value from formData
            }
          }
        })
          .then((result)=> {
            console.log('user added', result.data)
          })
          .catch((error)=>{
            console.error('Error creating user:', error);
          })
      }
      
    return (
        <div className="flex flex-col items-center justify-center h-screen ">

            <div className="flex flex-col  shadow-2xl px-8 py-8 w-96">
                <h1 className=" text-lg font-semibold mt-2 pb-7">
                    Register with us
                </h1>
                <>
                <p className=" pb-2">Enter your name?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    name="name"
                    placeholder=""
                    onChange={handleChange}
                />

                <p className=" pb-2">Enter your email id?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    name="email"
                    placeholder=""
                    onChange={handleChange}
                    
                />


                <p className=" pb-2">Enter your Password?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    name="password"
                    placeholder=""
                    onChange={handleChange}

                />               
            </>
                <div className="flex flex-row justify-between w-100">
               

               <button onClick={onNext} className="mt-3 bg-black  text-white   py-0.5 px-4 rounded">
                   Submit
               </button>
           </div>
            </div>
         
        </div>
    )
}