import { useSession, signIn, signOut } from "next-auth/react"
import TopMenu from "./Menu/TopMenu"

export default function Header() {
  const { data: session } = useSession()
  // console.log('data', session)
  return (
    <>
    <TopMenu/>
        <div className="flex-row flex justify-end	">
          {session ? <button onClick={() => signOut()}>Sign out</button> :
          <button onClick={() => signIn('google', { callbackUrl: '/team' })}>Sign in with Email</button> }
        </div>
      
    </>
  )
}
