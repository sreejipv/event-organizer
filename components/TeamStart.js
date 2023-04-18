import { useState } from "react"

export default function TeamStart({ onClick }){

   const [teamSize, setTeamSize] = useState(null)

    return(
       <>
        <p className=" pb-2">Enter your team size</p>
        <input className="pl-2 border-black border py-1 mb-3" 
            type="text" 
            value={teamSize} 
            placeholder="15"
            onChange={(e)=>setTeamSize(e.target.value)}
        />
        <button onClick={onClick} className="mt-3 bg-black  text-white   py-0.5 px-4 rounded">
            Next
        </button>
       </>
    )
}
