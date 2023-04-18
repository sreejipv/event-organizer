import { useSession, signIn, signOut } from "next-auth/react"

export default function ChatBot() {
  const { data: session } = useSession()
  return (
    <>
        <p>im chatbot</p>
      
    </>
  )
}
