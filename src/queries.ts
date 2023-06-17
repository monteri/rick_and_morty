import { gql } from '@apollo/client';

export const CHARACTERS_QUERY = gql`
  query Query($filter: FilterCharacter, $page: Int) {
    characters(filter: $filter, page: $page) {
      info {
        next
      }
      results {
        name
        status
        species
        image
        id
      }
    }
  }
`
