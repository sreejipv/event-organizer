import Head from 'next/head'
// import clientPromise from './api/auth'
import { useState } from 'react'

var classNames = require('classnames');

export default function Survay({ }) {
    const [start, setStart] = useState(false)
    const [eventName, setEventName] = useState('')
    const [teamSize, setTeamSize] = useState('')
    const [currentStep, setCurrentStep] = useState(1);


    function showMemberBlock() {
        alert('133')
    }

    function onNext() {
        setCurrentStep(currentStep+1)
    }
    function onPrev() {
        setCurrentStep(currentStep-1)

    }

    let badgeClass = 'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  dark:text-gray-400 border border-gray-500 w-fit'
    const StepOne = () => {
        return (
            <>
                <p className=" pb-2">Please enter your event name?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={eventName}
                    placeholder="Teamout march 2023"
                    onChange={(e) => setEventName(e.target.value)}
                />


                <p className=" pb-2">Event Date?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={eventName}
                    placeholder="Teamout march 2023"
                    onChange={(e) => setEventName(e.target.value)}
                />

                <p className=" pb-2">Expected Number of Attendees?</p>
                <input className="pl-2 border-black border py-1 mb-3"
                    type="text"
                    value={teamSize}
                    placeholder="15"
                    onChange={(e) => setTeamSize(e.target.value)}
                />
            </>
        )
    }

    const StepTwo = () => {
        return (
            <>             
              <p className=" pb-2">Have you already decided on a location for the event??</p>
              <div className="flex flex-row">
                <span className={badgeClass}>Yes</span>
                <span className={badgeClass}>No</span>
            </div>

            <p className=" pb-2">Do you need to take a survay from your attendees? </p>
              <div className="flex flex-row">
                <span className={badgeClass}>Yes</span>
                <span className={badgeClass}>No</span>
            </div>

            <p className=" pb-2">Event Location Preferences?</p>
            <div className="flex flex-row">
                <span className={badgeClass}>Indoor</span>
                <span className={badgeClass}>Outdoor</span>
                <span className={badgeClass}>City</span>
                <span className={badgeClass}>Rural</span>

            </div>
            </>
        )
    }
    const StepThree = () => {
        return (
            <>
           
            </>
        )
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen ">

            <div className="flex flex-col  shadow-2xl px-8 py-8 w-96">
                <h1 className=" text-lg font-semibold mt-2 pb-7">
                    Get Started
                </h1>
                {currentStep === 1 && <StepOne />}
                {currentStep === 2 && <StepTwo />}
                {currentStep === 3 && <StepThree />}
                <div className="flex flex-row justify-between w-100">
               
               <button onClick={onPrev} className="mt-3 bg-black  text-white   py-0.5 px-4 rounded">
                   Prev
               </button>

               <button onClick={onNext} className="mt-3 bg-black  text-white   py-0.5 px-4 rounded">
                   Next
               </button>
           </div>
            </div>
         
        </div>
    )
}