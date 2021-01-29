import { gql } from "@apollo/client";

export const GET_LIMITED_CAPACITY_DATA = gql`
  query GetCapacityData {
    capacity_data(
      order_by: { id: desc, crossing_name: asc, time_of_sailing: asc }
      limit: 10
    ) {
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
`;

export const GET_ENTIRE_DATASET = gql`
  query GetCapacityData {
    capacity_data(
      order_by: { id: asc, crossing_name: asc, time_of_sailing: asc }
    ) {
      id
      crossing_name
      date_of_sailing
      time_of_sailing
      percent_available
      date_recorded
      time_recorded
      created_at
    }
  }
`;

export const GET_ALL_TERMINALS = gql`
  query GetTerminals {
    terminal {
      id
      name
      metadata
      created_at
      updated_at
    }
  }
`;

export const GET_TERMINAL_BY_ID = gql`
  query GetTerminalById($t_id: Int!) {
    terminal(where: { id: { _eq: $t_id } }) {
      id
      name
      metadata
      created_at
      updated_at
    }
  }
`;
