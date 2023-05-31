import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION, GET_USER } from '../../db/quries/events'
import { useMutation, useQuery } from "@apollo/client";
import "react-datepicker/dist/react-datepicker.css";
// import GoogleButton from 'react-google-button'
import LogoSvg from '../../assets/images/google_button.svg'
import GoogleButton from './GoogleButton';
import validateEmail from '../Utils';


export default function Login({ page }) {
  const [formData, setFormData] = useState({});
  const [login, {error: loginUserError}] = useMutation(LOGIN_USER_MUTATION)
  const [createUser, { error: createUserError }] = useMutation(CREATE_USER_MUTATION)
  const { loading, error, data } = useQuery(GET_USER);
  const [ formvalid, setFormValid ] = useState(false)
  const [emailError, setEmailError] = useState('');
  const router = useRouter();


  const btnText = page === 'register' ? 'Create an account' : 'Login'

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  function handleBlur(e) {
    const { name, value } = e.target
    if(name === 'email') {
      const isValidEmail =  validateEmail(value)
      setFormValid(isValidEmail)
      if (!isValidEmail) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
    // console.log(name, value)
  }

  function onNext() {
    if(!formvalid) return;

    if(page === 'register') {
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
    }else{
      console.log('signin')
      login({
        variables: {
          input:{
            email: formData.email,
            password: formData.password
          }
        }
      }).then((result) =>{
        console.log('user added', result.data)
        localStorage.setItem('user', JSON.stringify(result?.data?.login?.user));
        // router.push('/home');
      }).catch((error)=>{
        console.error('Error creating user', error)
      })
    }

  }

  return (

    <div className="flex flex-col   px-8  w-96">
      <h1 className=" text-lg font-semibold mt-2 pb-7">
        Sign up and create your events effortlessly
      </h1>

      <GoogleButton />

      <div className="flex items-center justify-center">
        <hr className="border-t border-gray-400 flex-grow mr-3" />
        <span className="text-sm text-gray-500  text-sm">or</span>
        <hr className="border-t border-gray-400 flex-grow ml-3" />
      </div>

      <>
        {page === 'register' && 
        <>
          <p className="text-xs pb-2">Name</p>
          <input className="pl-2 border-grey-800 border py-1 mb-3"
            type="text"
            name="name"
            placeholder=""
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </>}

        <p className="text-xs pb-2">Email</p>
        <input className="pl-2 border-grey-800 border py-1 mb-3"
          type="text"
          name="email"
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}

        />
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        <p className="text-xs pb-2">Password</p>
        <input className="pl-2 border-grey-800 border py-1 mb-3"
          type="password"
          name="password"
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}

        />
      </>
      <div className="flex flex-col justify-between w-100">

        <button onClick={onNext} class="bg-black w-full text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          <div className="flex items-center justify-center">
        
          <span>{btnText}</span>
        </div>
      </button>
     


      <div className="flex items-center justify-center py-2">
       { page === 'register' ?
        <p>
        <span className="text-sm text-gray-500 text-sm">Already have an account?</span>
        <span onClick={onNext} className="text-sm text-gray-500 text-sm font-semibold cursor-pointer"> Login</span>
        </p>:

       <p>
       <span className="text-sm text-gray-500 text-sm">Don't have an account?</span>
        <span onClick={onNext} className="text-sm text-gray-500 text-sm font-semibold cursor-pointer"> Sign up</span>
       </p>
       }
      </div>
      </div>
    </div>


  )
}