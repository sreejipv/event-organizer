import { ApolloProvider } from '@apollo/client';
import {SessionProvider} from 'next-auth/react'
import '../components/globals.css';
import { useApollo } from "../apollo-client";
import { getServerSideProps } from '../components/Utils/auth';



export default function App({
    Component,
    pageProps: {session, ...pageProps},
}) 

{
const apolloClient = useApollo(pageProps.initialApolloState);
// const isSignedIn = !!session?.user?.email; // Check if the user is signed in



    return (
        <ApolloProvider client={apolloClient}>

            <SessionProvider session={session}>
                <Component {...pageProps}  />
            </SessionProvider>
            </ApolloProvider>

    )
}
export {getServerSideProps}