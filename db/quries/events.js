
import { gql, useQuery, useLazyQuery } from "@apollo/client";

export const ALL_POSTS_QUERY = gql`
query{
    posts{
      title,
      id,
      content,
      user{
          id
      }
    }
  }
`

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      name
      email
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id ){
      id
      name
      description
      date
    }
  }
`;


export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      name
      sdate
      edate
      venue
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      email
    }
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      token,
      user{
        name
      }
    }
  }
`;

export const GET_USER_EVENTS =  gql`
  query getUserEvents {
    getUserEvents {
      name, 
      description,
      date,
      time,
      id,
      venue
    }
  } 
`;