import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_EVENT } from '../db/quries/events';
import { useRouter } from 'next/router';
import {initializeApollo} from '../apollo-client';


async function fetchEventData(eventId) {
    const apolloClient = initializeApollo();
  
    const { data } = await apolloClient.query({
      query: GET_EVENT,
      variables: { id: eventId },
    });
  
    const eventData = data.event;
  
    return eventData;
  }
  

export async function getServerSideProps(context) {
  const { eventId } = context.params;
  const event = await fetchEventData(eventId);
  return {
    props: {
        event
    },
  };
}

export default function EventPage({ event }) {

    // const router = useRouter();

    console.log('eventId', event)
  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p> 
      <p>{event.venue}</p> 
    </div>
  );
}
