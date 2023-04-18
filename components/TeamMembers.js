import { useState } from "react"

export default function TeamMembers({}){

   const [teamSize, setTeamSize] = useState(null)
   const [member, setMember] = useState({
       name: "",
       email:"",
       phone:"",
       dob:"",
       location:""
   })

    function handleInput(e) {
        const {name, value} = e.target
        setMember({...member, [name]:value}) 
        console.log('handleInput', e?.target?.name)
    }
    return(
       <>
        <div className="flex flex-row justify-center w-full">
            <div className="align-center px-2 ">
                

                <ul className="">
                    <li className="flex justify-end">
                        <label>Name</label> 
                        <input type="text" 
                            name="name"
                            onChange={(e)=>handleInput(e)}
                            placeholder="John Perera" 
                            className="border border-grey px-1 mx-1 rounded"/>
                    </li>
                    <div className="pt-2"/>
                    <li className="flex justify-end">
                        <label>Email</label> 
                        <input  
                            name="email"
                            onChange={(e)=>handleInput(e)}
                            placeholder="john@Perera.com" 
                            className="border border-grey px-1 mx-1 rounded"/>
                    </li>
                    <div className="pt-2"/>

                    <li className="flex justify-end">
                        <label>Phone</label> 
                        <input 
                        name="phone"
                        onChange={(e)=>handleInput(e)}
                        placeholder="09595959585" 
                        className="border border-grey px-1 mx-1 rounded"/>
                    </li>
                    <div className="pt-2"/>

                    <li className="flex justify-end">
                        <label>Dob</label> 
                        <input 
                        name="dob"
                        onChange={(e)=>handleInput(e)}
                        placeholder="10/10/1991" 
                        className="border border-grey px-1 mx-1 rounded"/>
                    </li>
                    <div className="pt-2"/>

                    <li className="flex justify-end">
                        <label>Location</label> 
                        <input 
                        name="location"
                        onChange={(e)=>handleInput(e)}
                        placeholder="Attingal"
                        className="border border-grey px-1 mx-1 rounded"/>
                    </li>
                </ul>

              

                <div className="flex justify-end">
                <button 
                onClick={()=>console.log('member', member)}
                className="mt-3 bg-black text-white py-0.5 px-4 rounded">
                Add Member
                 </button>
                </div>
            </div>
        </div>
      
       </>
    )
}
