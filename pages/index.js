import Head from 'next/head'
// import clientPromise from './api/auth'
import { useSession, signIn, signOut } from "next-auth/react"
import Login from '../components/Login'
import Header from '../components/Header'

export default function Home({ isConnected }) {
  const { data: session, status } = useSession()
    console.log('data',session)
  return (
    <div className="container mx-auto">
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

// export async function getServerSideProps(context) {
//   try {
//     await clientPromise
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands

//     return {
//       props: { isConnected: true },
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
// }
