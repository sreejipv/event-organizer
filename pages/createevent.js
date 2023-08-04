// import clientPromise from './api/auth'
import { useState } from 'react'
import { useSession, getSession } from "next-auth/react"
import { CREATE_EVENT_MUTATION, GET_USER } from '../db/quries/events'
import { useMutation, useQuery } from "@apollo/client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import { getServerSideProps } from '../components/Utils/auth';
import Register from '../pages/register'
import Loading from '../pages/Loading'

var classNames = require('classnames');

export default function CreateEvent(props) {
    const { loading, error, data } = useQuery(GET_USER);
    const {data: session, status } = useSession()
    const [eventName, setEventName] = useState('')
    const [eventDetails, setEventDetails] = useState('')
    const [eventSize, setEventSize] = useState(0)
    const [eventSDate, setEventSDate] = useState(new Date())
    const [eventEDate, setEventEDate] = useState(new Date())
    const [createEvent] = useMutation(CREATE_EVENT_MUTATION);

    if(status === 'loading'){
        return <Loading/>
    }
    if(status !== 'authenticated'){
        return <Register />
    }
 
    function onNext() {
        const myDate = new Date(eventDate);
        const formattedSDate = myDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, "/");
        const formattedEDate = myDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, "/");

        createEvent({
            variables: {
                input: {
                    name: eventName,
                    sdate: formattedSDate,
                    edate: formattedEDate,
                    count: eventSize,
                    location: locationDetails
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
        <div className="flex flex-col items-center justify-center h-screen bg-[#b4a2f7] ">

            <div className="flex border-[#000000] border-4 rounded-lg flex-col bg-[#f4f2f9] shadow-2xl px-8 py-8 w-96">
                <h1 className=" text-lg font-semibold mt-2 pb-7">
                    Get Started
                </h1>
                <>
                    <p className=" pb-2">Enter your event name?</p>
                    <input className="pl-2 border-black border py-1 mb-3"
                        type="text"
                        value={eventName}
                        placeholder="Teamout march 2023"
                        onChange={(e) => setEventName(e.target.value)}
                    />

                    

                    <p className=" pb-2">Event location</p>
                    <input className="pl-2 border-black border py-1 mb-3"
                        type="text"
                        value={eventDetails}
                        placeholder="Teamout march 2023"
                        onChange={(e) => setEventDetails(e.target.value)}
                    />


                    <div className="flex">
                        <div>
                            <p className="pb-2">Start Date?</p>

                            <DatePicker className="pl-2 border-black border py-1 mb-3"

                                selected={eventSDate} onChange={(date) => setEventSDate(date)} />

                        </div>
                        <div>
                            <p className="pb-2">End Date?</p>

                            <DatePicker className="pl-2 border-black border py-1 mb-3"

                                selected={eventSDate} onChange={(date) => setEventEDate(date)} />

                        </div>
                    </div>
                </>
                <div className="flex flex-row justify-between w-100">


                    <button onClick={onNext} className="w-full mt-3 bg-black  text-white   py-0.5 px-4 rounded">
                        Create event
                    </button>
                </div>
            </div>

        </div>
    )
}
export { getServerSideProps };
