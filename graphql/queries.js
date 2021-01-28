import {gql } from "@apollo/client";

export const GET_LIMITED_CAPACITY_DATA = gql`
query GetCapacityData {
  capacity_data(order_by: {id: desc, crossing_name: asc, date_recorded: asc, time_recorded: asc }, limit: 10) {
    created_at
    crossing_name
    date_recorded
    id
    percent_available
    time_of_sailing
    date_of_sailing
    time_recorded
    updated_at
  }
}
`

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