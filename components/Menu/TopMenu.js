import { useSession, signIn, signOut } from "next-auth/react"

export default function TopMenu() {
  const { data: session } = useSession()

    return (
        <div className="flex justify-between items-between p-4 border-b border-gray-200">
            <ul>
                <li>
                    
                    <a className="text-blue-500 hover:text-blue-800" href="/">Logo</a>
                </li>
            </ul>
            <ul className="flex">
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="/">Home</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="#">Events</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="#">Teams</a>
                </li>
                <li className="mr-6">
                    <a className="text-blue-500 hover:text-blue-800" href="#">Account</a>
                </li>
                <li>
                    <a>
                    <div className="flex-row flex justify-end	">
                {session ?
                <a className="text-blue-500 hover:text-blue-800" href="#" onClick={() => signOut()}>Sign out</a>
                
                :
                <a className="text-blue-500 hover:text-blue-800" href="/signin">Sign in</a>

                 }
              </div>
                    </a>
                </li>
            </ul>
        </div>
 
            
    )
}