// import clientPromise from './api/auth'
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react'
import { GET_USER, GET_USER_EVENTS } from '../db/quries/events'
import "react-datepicker/dist/react-datepicker.css";
import { getServerSideProps } from '../components/Utils/auth';
import TopMenu from '../components/Menu/TopMenu';
import EventsList from '../components/Events/EventsList';


export default function Events(props) {
  const [name, setName] = useState()
  const { loading, error, data } = useQuery(GET_USER_EVENTS);
  
  console.log('loading', loading)
  console.log('loading', data)
  const eventsCount =  !loading && data?.getUserEvents?.length
  return (
    <>
      <TopMenu />

      <div className="flex flex-col  justify-center ">

        <div className="w-3/4 mx-auto">
 
          <p className="flex justify-start mx-auto">
            <h3 className="text-gray-600 text-sm mb-4 ">{eventsCount} Results</h3>
          </p>
         
          {loading ? 'Loading...' : <EventsList events={data?.getUserEvents} /> }
          
         
        </div>

      </div>
    </>

  )
}
export { getServerSideProps };
