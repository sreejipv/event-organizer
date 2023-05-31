import Head from 'next/head'
// import clientPromise from './api/auth'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '../components/Header'
import TopMenu from '../components/Menu/TopMenu'

export default function Home({ isConnected }) {
  const { data: session, status } = useSession()
    console.log('data',session)
  return (
    <div className=" mx-auto">
      <Header/>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p className="text-center text-3xl">
          Welcome <br/><a >{session?.user?.name}</a>
        </p>
        <p>
      
        </p>

        <>
       {/* <Login/> */}
        </>




      
      </main>

      <footer>
       
      </footer>

     
    </div>
  )
}

