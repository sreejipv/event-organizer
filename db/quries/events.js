
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
export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      id
      name
      description
      date
      count
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
