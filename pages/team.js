import Head from 'next/head'
// import clientPromise from './api/auth'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '../components/Login'
import { useState } from 'react'
import TeamStart from "../components/TeamStart"
import TeamMembers from "../components/TeamMembers"

export default function Team({}){
   const [start, setStart] = useState(false)
   function showMemberBlock(){
      alert('133')
   }
 
    return (
        <>
  
         <div className="flex flex-col items-center justify-center h-screen ">

            <div className="flex flex-col  shadow-2xl px-8 py-8 ">
            <h1 className="text-center text-lg font-semibold mt-2 pb-7">
             Enter your Event name
             </h1>

             <>
            <p className=" pb-2">Enter your team size</p>
            <input className="pl-2 border-black border py-1 mb-3" 
                  type="text" 
                  placeholder="15"
                  onChange={(e)=>setTeamSize(e.target.value)}
            />
            <button  className="mt-3 bg-black  text-white   py-0.5 px-4 rounded">
                  Next
            </button>
            </>


            </div>
         {start && <TeamMembers />}

         </div>


        </>
     )
}