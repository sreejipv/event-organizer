import { useEffect, useState } from 'react'
import { CREATE_USER_MUTATION, CREATE_EVENT_MUTATION, GET_USER } from '../db/quries/events'
import { useMutation, useQuery } from "@apollo/client";
import { getServerSideProps } from '../components/Utils/auth';
import "react-datepicker/dist/react-datepicker.css";
import LoginContainer from '../components/Auth/LoginContainer';
import { useRouter } from 'next/router';
import TopMenu from '../components/Menu/TopMenu'

export default function SignIn(props) {
  const [formData, setFormData] = useState({});
  const [createUser, { error: createUserError }] = useMutation(CREATE_USER_MUTATION)
  const { loading, error, data } = useQuery(GET_USER);
  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }
  const router = useRouter();

  useEffect(()=>{
    if(props?.isSignedIn){
        router.push('/team');
    } 
  },[ router]);

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
        <TopMenu/>
      
    {
      !props?.isSignedIn ?
        <LoginContainer /> : <p>Loading....</p> 
       
    }
      
    </div>
  )
}

export { getServerSideProps };
