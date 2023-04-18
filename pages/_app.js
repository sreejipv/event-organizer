import { ApolloProvider } from '@apollo/client';
import {SessionProvider} from 'next-auth/react'
import '../components/globals.css';
import { useApollo } from "../apollo-client";



export default function App({
    Component,
    pageProps: {session, ...pageProps},
}) 

{
const apolloClient = useApollo(pageProps.initialApolloState);

    return (
        <ApolloProvider client={apolloClient}>

            <SessionProvider session={session}>
                <Component {...pageProps}/>
            </SessionProvider>
            </ApolloProvider>

    )
}