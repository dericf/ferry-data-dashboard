import {gql } from "@apollo/client";

export const GET_ALL_TERMINALS = gql`query GetTerminals {
terminal {
    id
    name
    metadata
    created_at
    updated_at
  }
}
`

export const GET_TERMINAL_BY_ID = gql`query GetTerminalById($t_id: Int!) {
  terminal(where: {id: {_eq: $t_id}}) {
    id
    name
    metadata
    created_at
    updated_at
  }
}
`