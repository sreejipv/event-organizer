import { useSession, signIn, signOut } from "next-auth/react"

export default function TopMenu() {
  const { data: session } = useSession()

    return (
        <div className="flex justify-between items-between p-4 ">
            <ul>
                <li>
                    
                    <a className="text-black " href="/">Logo</a>
                </li>
            </ul>
            <ul className="flex">
                <li className="mr-6">
                    <a className="text-black" href="/">Home</a>
                </li>
                <li className="mr-6">
                    <a className="text-black" href="#">Events</a>
                </li>
                <li className="mr-6">
                    <a className="text-black" href="#">Teams</a>
                </li>
                <li className="mr-6">
                    <a className="text-black" href="#">Account</a>
                </li>
                <li>
                    <a>
                    <div className="flex-row flex justify-end	">
                {session ?
                <a className="text-black" href="#" onClick={() => signOut()}>Sign out</a>
                
                :
                <a className="text-black" href="/signin">Sign in</a>

                 }
              </div>
                    </a>
                </li>
            </ul>
        </div>
 
            
    )
}