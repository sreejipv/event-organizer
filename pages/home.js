import Head from 'next/head'
// import clientPromise from './api/auth'
import { useState } from 'react'
import {ALL_POSTS_QUERY, CREATE_EVENT_MUTATION} from '../db/quries/events'
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var classNames = require('classnames');

export default function Home({ }) {
    const [start, setStart] = useState(false)
    const [eventName, setEventName] = useState('')
    const [eventDetails, setEventDetails] = useState('')
    const [eventSize, setEventSize] = useState(0)
    const [eventDate, setEventDate] = useState(new Date())
    // const [currentStep, setCurrentStep] = useState(1);
    const { loading, error, data } = useQuery(ALL_POSTS_QUERY);
    const [startDate, setStartDate] = useState();
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    function onNext() {
        const myDate = new Date(eventDate);
        const formattedDate = myDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, "/");
        
        createEvent({
            variables: {
              input: {
                name: eventName,
                date: formattedDate,
                count: eventSize,
                description: eventDetails,
                userId: "640d90b950dbcbc353a0b642"
              },
            },
          })
            .then((result) => {
              console.log('Event created:', result.data.createEvent);
            })
            .catch((error) => {
              console.error('Error creating event:', error);
            });
        // setCurrentStep(currentStep+1)
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen ">

            <div className="flex flex-col  shadow-2xl px-8 py-8 w-96">
                <h1 className=" text-lg font-semibold mt-2 pb-7">
                    Get Started
                </h1>
                <>
                <p className=" pb-2">Please enter your event name?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={eventName}
                    placeholder="Teamout march 2023"
                    onChange={(e) => setEventName(e.target.value)}
                />

                <p className=" pb-2">Please describe your event?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={eventDetails}
                    placeholder="Teamout march 2023"
                    onChange={(e) => setEventDetails(e.target.value)}
                />


                <p className=" pb-2">Event Date?</p>
             
                    <DatePicker className="pl-2 border-black border py-1 mb-3" 
                    
                    selected={eventDate} onChange={(date) => setEventDate(date)} />

                <p className=" pb-2">Expected Number of Attendees?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={eventSize}
                    placeholder="15"
                    onChange={(e) => setEventSize(e.target.value)}
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