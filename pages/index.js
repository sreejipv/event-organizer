
import { useEffect, useState } from 'react'
import Head from 'next/head'
// import clientPromise from './api/auth'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '../components/Header'
import TopMenu from '../components/Menu/TopMenu'

export default function Home({ isConnected }) {
  const { data: session, status } = useSession()
    console.log('data',session)
    const [activeIndex, setActiveIndex] = useState(0);

    const spanItems = ['Trips', 'Get together', 'Meetup'];

    useEffect(() => {
      const timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % spanItems.length);
    }, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container mx-auto">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header/> */}


      <main>
      <div className="flex">
      <div className="w-3/4 pt-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 relative overflow-hidden">
      Effortlessly Organize{' '}
      <span className="inline-block overflow-hidden">
        {spanItems.map((item, index) => (
          <span
            key={index}
            className={`animate-scroll-fade ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ animationDuration: '1s' }}
          >
            {item}
          </span>
        ))}
      </span>
      - A Smooth Experience for All!
    </h1>
      </div>
      <div className="w-1/4 pt-10">
        Content for the right side (25% width)
      </div>
    </div>



        <>
       {/* <Login/> */}
        </>




      
      </main>

      <footer>
       
      </footer>

     
    </div>
  )
}

