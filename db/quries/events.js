
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

